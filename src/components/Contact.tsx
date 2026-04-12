import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSettings } from '../hooks/useSettings';

const contactSchema = z.object({
  name: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  service: z.string().min(1, 'Lütfen bir hizmet seçiniz'),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [geo, setGeo] = useState({ lat: 36.7667, lng: 28.8000 }); // Default fallback
  const { settings } = useSettings();

  const contactInfo = settings?.contactInfo || {};
  const address = contactInfo.address || "Merkez Mah. Turgut reis 10. Sokak No:1 Dalaman Muğla";
  const phone = contactInfo.phone || "0535 776 09 94";
  const email = contactInfo.email || "info@orhanlarhafriyat.com";

  // Extract geo coordinates from JSON-LD schema
  useEffect(() => {
    try {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'LocalBusiness' && data.geo && data.geo.latitude && data.geo.longitude) {
          setGeo({ lat: data.geo.latitude, lng: data.geo.longitude });
        }
      });
    } catch (e) {
      console.error("Error parsing JSON-LD for map coordinates", e);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!captchaToken) {
      setErrorMsg('Lütfen robot olmadığınızı doğrulayın.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, captchaToken }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error("Error submitting form", error);
      setErrorMsg('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
              Bize Ulaşın
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-8">
              Sorularınız İçin <br />
              <span className="text-brand-orange">Yanınızdayız</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">Adresimiz</h4>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">Telefon</h4>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">E-Posta</h4>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">Çalışma Saatleri</h4>
                  <p className="text-gray-600">Pzt - Cmt: 08:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* Google Map Dynamic Embed */}
            <div className="rounded-3xl overflow-hidden h-64 shadow-inner border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d797.8063743058065!2d28.812758683258796!3d36.76857205418607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sdalaman%20orhanlar!5e1!3m2!1str!2str!4v1775999614158!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-10 md:p-16 rounded-[3rem] shadow-sm relative overflow-hidden"
          >
            <h3 className="text-2xl font-bold text-brand-dark mb-8">Hızlı Teklif Formu</h3>
            
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 left-0 w-full bg-green-500 text-white p-4 flex items-center justify-center font-bold z-10"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Mesajınız başarıyla gönderildi!
                </motion.div>
              )}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 left-0 w-full bg-red-500 text-white p-4 flex items-center justify-center font-bold z-10"
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">Adınız Soyadınız</label>
                  <input
                    {...register('name')}
                    type="text"
                    className={`w-full px-6 py-4 bg-white rounded-2xl border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20'} focus:ring-2 outline-none transition-all`}
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">E-Posta Adresiniz</label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-6 py-4 bg-white rounded-2xl border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20'} focus:ring-2 outline-none transition-all`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email.message}</p>}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">Telefon Numaranız</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className={`w-full px-6 py-4 bg-white rounded-2xl border ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20'} focus:ring-2 outline-none transition-all`}
                    placeholder="05xx xxx xx xx"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">Hizmet Türü</label>
                  <select 
                    {...register('service')}
                    className={`w-full px-6 py-4 bg-white rounded-2xl border ${errors.service ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20'} focus:ring-2 outline-none transition-all appearance-none`}
                  >
                    <option value="">Seçiniz...</option>
                    <option value="Hafriyat ve Kazı">Hafriyat ve Kazı</option>
                    <option value="Kepçe Kiralama">Kepçe Kiralama</option>
                    <option value="Yıkım Hizmetleri">Yıkım Hizmetleri</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.service.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">Mesajınız</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className={`w-full px-6 py-4 bg-white rounded-2xl border ${errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20'} focus:ring-2 outline-none transition-all resize-none`}
                  placeholder="Projeniz hakkında kısa bilgi verin..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.message.message}</p>}
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-dark text-white font-bold rounded-2xl hover:bg-brand-orange transition-all flex items-center justify-center group shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Gönder
                    <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { getGallery } from '../services/galleryService';
import { useSettings } from '../hooks/useSettings';

export default function About() {
  const { settings } = useSettings();
  const [galleryImage, setGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const gallery = await getGallery();
        if (gallery.length > 0) {
          setGalleryImage(gallery[0].url);
        }
      } catch (error) {
        console.error('Error fetching gallery for about:', error);
      }
    };
    fetchGallery();
  }, []);

  const defaultFeatures = [
    '23+ Yıllık Sektör Tecrübesi',
    'Geniş ve Modern Makine Parkuru',
    'Zamanında Teslimat Garantisi',
    'Uygun Fiyat Politikası',
    'İş Sağlığı ve Güvenliği Standartları',
    'Müşteri Odaklı Çözümler',
  ];

  const title = settings?.aboutTitle || "Dalaman Hafriyat Sektörünün En Güvenilir İsmi: Orhanlar Dalaman";
  const subtitle = settings?.aboutSubtitle || "Orhanlar Hafriyat - Dalaman Kazı İşleri ve Kepçeci";
  const description1 = settings?.aboutDescription1 || "Orhanlar Hafriyat olarak, Muğla ve Dalaman bölgesinde uzun yıllardır inşaat projelerinin vazgeçilmezi olan profesyonel Dalaman kazı işleri ve hafriyat hizmetleri sunuyoruz. Deneyimli dalaman kepçeci operatörlerimiz ve geniş makine filomuzla temel kazısı, tesviye ve kiralık iş makineleri ihtiyaçlarınızda her zaman yanınızdayız.";
  const description2 = settings?.aboutDescription2 || "Dalaman Orhanlar güvencesiyle yaptığımız tüm işlerde, müşteri memnuniyetini, dürüst ticareti ve iş güvenliğini üst düzeyde tutuyor, Dalaman'ın yapısını sağlam ellerle şekillendiriyoruz.";
  const image = settings?.aboutImage || 'https://res.cloudinary.com/orhanlar/image/upload/v1776005952/huzog36hnnmcvjz5ns5c.jpg';
  const experience = settings?.aboutExperience || "23+";
  const features = settings?.aboutFeatures || defaultFeatures;

  return (
    <section id="hakkimizda" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-gray-200 aspect-[4/3]">
              {image ? (
                <img
                  src={image}
                  alt="Construction site"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Görsel bekleniyor...
                </div>
              )}
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -right-10 z-20 bg-brand-orange text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-5xl font-black mb-1">{experience}</div>
              <div className="text-sm font-bold uppercase tracking-widest">Yıllık Tecrübe</div>
            </div>
            {/* Decorative Background */}
            <div className="absolute top-10 -left-10 w-full h-full border-8 border-gray-100 rounded-3xl -z-0"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: title.replace('Orhanlar Dalaman', '<span class="text-brand-orange">Orhanlar Dalaman</span>') }}>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {description1}
            </p>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              {description2}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span className="font-bold text-brand-dark">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

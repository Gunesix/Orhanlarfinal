import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useSettings } from '../hooks/useSettings';

export default function Hero() {
  const { settings } = useSettings();

  const title = settings?.heroTitle || "Orhanlar Dalaman Hafriyat: Dalaman Kazı İşleri & Kepçeci Sektör Lideri";
  const subtitle = settings?.heroSubtitle || "Orhanlar Dalaman: Hizmette Güven";
  const description = settings?.heroDescription || "Muğla Dalaman Orhanlar Hafriyat olarak profesyonel makine parkurumuz, uzman dalaman kepçeci kadromuz ve tecrübemizle; dalaman kazı işleri, dolgu, yıkım ve kepçe kiralama hizmetlerinde her ölçekteki projeyi tam vaktinde teslim ediyoruz.";
  const image = settings?.heroImage || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80";

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Excavator working on site"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-extrabold tracking-widest text-white uppercase bg-brand-orange rounded-full">
              {subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6" dangerouslySetInnerHTML={{ __html: title.replace('Güvenilir', '<span class="text-brand-orange">Güvenilir</span>') }}>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${settings?.contactInfo?.phone?.replace(/\s/g, '') || '+905357760994'}`}
                className="flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg group"
              >
                <Phone className="w-5 h-5 mr-3" />
                Hemen Ara
                <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
              <a
                href={`https://wa.me/${settings?.contactInfo?.whatsapp || '905357760994'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-4 bg-brand-whatsapp text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                WhatsApp’tan Teklif Al
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-24 bg-brand-orange transform skew-x-[-45deg] translate-x-1/2 hidden lg:block"></div>
    </section>
  );
}

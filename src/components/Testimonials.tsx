import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useSettings } from '../hooks/useSettings';

export default function Testimonials() {
  const { settings } = useSettings();

  const defaultReviews = [
    {
      name: 'Mehmet Yılmaz',
      role: 'İnşaat Mühendisi',
      text: 'Dalaman bölgesindeki birçok projemizde Orhanlar Hafriyat ile çalıştık. Hem ekipman kalitesi hem de operatörlerin profesyonelliği bizi her zaman memnun etti. Zamanlama konusunda çok titizler.',
      rating: 5,
    },
    {
      name: 'Ayşe Demir',
      role: 'Villa Sahibi',
      text: 'Evimizin temel kazısı ve bahçe düzenlemesi için kendilerini tercih ettik. Çok temiz ve hızlı bir iş çıkardılar. Fiyatları da oldukça makul.',
      rating: 5,
    },
  ];

  const title = settings?.testimonialsTitle || "Sizlerden Gelen Yorumlar";
  const subtitle = settings?.testimonialsSubtitle || "Müşteri Deneyimleri";
  const reviews = settings?.testimonials || defaultReviews;

  return (
    <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6" dangerouslySetInnerHTML={{ __html: title.replace('Yorumlar', '<span class="text-brand-orange">Yorumlar</span>') }}>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review: any, index: number) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-orange opacity-20" />
              <div className="flex mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-orange fill-brand-orange" />
                ))}
              </div>
              <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">
                "{review.comment || review.text}"
              </p>
              <div>
                <h4 className="text-xl font-bold text-white">{review.name}</h4>
                <p className="text-brand-orange text-sm font-semibold">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { HardHat, Truck, Shovel, Building2, Layers, Pickaxe } from 'lucide-react';
import { motion } from 'motion/react';
import { useSettings } from '../hooks/useSettings';

const iconMap: Record<string, any> = {
  'Pickaxe': Pickaxe,
  'Shovel': Shovel,
  'Truck': Truck,
  'Building2': Building2,
  'Layers': Layers,
  'HardHat': HardHat
};

export default function Services() {
  const { settings } = useSettings();

  const defaultServices = [
    {
      title: 'Hafriyat ve Kazı',
      description: 'Bina temelleri, yol yapımı ve kanal kazıları için profesyonel çözümler.',
      icon: 'Pickaxe',
    },
    {
      title: 'Kepçe Kiralama',
      description: 'Operatörlü veya operatörsüz, ihtiyacınıza uygun modern iş makinesi kiralama.',
      icon: 'Shovel',
    },
    {
      title: 'Kum & Çakıl Temini',
      description: 'İnşaatlarınız için kaliteli kum, çakıl ve stabilize malzeme tedariği.',
      icon: 'Truck',
    },
    {
      title: 'Yıkım Hizmetleri',
      description: 'Eski yapıların güvenli ve kontrollü bir şekilde yıkılması ve moloz nakliyesi.',
      icon: 'Building2',
    },
    {
      title: 'Dolgu & Tesviye',
      description: 'Arazi düzenleme, dolgu işleri ve hassas zemin tesviye işlemleri.',
      icon: 'Layers',
    },
    {
      title: 'Çevre Düzenleme',
      description: 'Peyzaj öncesi zemin hazırlığı ve bahçe düzenleme hafriyat işleri.',
      icon: 'HardHat',
    },
  ];

  const title = settings?.servicesTitle || "Profesyonel Hizmetlerimiz";
  const subtitle = settings?.servicesSubtitle || "Neler Yapıyoruz?";
  const services = settings?.services || defaultServices;

  return (
    <section id="hizmetler" className="py-24 bg-gray-50">
      <div className="container-custom text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6" dangerouslySetInnerHTML={{ __html: title.replace('Hizmetlerimiz', '<span class="text-brand-orange">Hizmetlerimiz</span>') }}>
          </h2>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
        </motion.div>
      </div>

      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => {
            const IconComponent = typeof service.icon === 'string' ? iconMap[service.icon] || Pickaxe : service.icon;
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange transition-colors">
                <IconComponent className="w-8 h-8 text-brand-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getGallery } from '../services/galleryService';
import { useSettings } from '../hooks/useSettings';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { settings } = useSettings();
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const gallery = await getGallery();
        setGalleryItems(gallery);
      } catch (error) {
        console.error('Error fetching gallery for projects:', error);
      }
    };
    fetchGallery();
  }, []);

  const defaultProjects = [
    {
      title: 'Dalaman Havalimanı Yolu',
      category: 'Yol Yapımı & Altyapı',
      image: '/images/gallery/1.jpeg',
      description: 'Dalaman Havalimanı bağlantı yollarının genişletilmesi ve altyapı yenileme çalışmaları kapsamında 5 km\'lik yolun kazı, dolgu ve asfalt hazırlık işlemleri başarıyla tamamlanmıştır. Proje, yoğun trafiği aksatmadan gece gündüz vardiyalı çalışılarak hedeflenen süreden önce teslim edilmiştir.',
      completionDate: 'Ağustos 2023',
      additionalImages: []
    },
    {
      title: 'Lüks Villa Temel Kazısı',
      category: 'Hafriyat ve Kazı',
      image: '/images/gallery/13.jpeg',
      description: 'Göcek bölgesinde yer alan 4 adet lüks villanın temel kazısı, çevre düzenlemesi ve istinat duvarı dolgu işlemleri gerçekleştirilmiştir. Kayalık zemin yapısına rağmen özel kırıcı ataşmanlı iş makinelerimizle çevreye zarar vermeden güvenli bir şekilde tamamlanmıştır.',
      completionDate: 'Kasım 2023',
      additionalImages: []
    },
    {
      title: 'Sanayi Bölgesi Tesviye',
      category: 'Endüstriyel Alan',
      image: '/images/gallery/2.jpeg',
      description: 'Yeni kurulan sanayi sitesi için 20.000 metrekarelik alanın zemin tesviyesi, kot ayarlaması ve stabilize malzeme serimi yapılmıştır. Lazerli nivo sistemleri kullanılarak milimetrik hassasiyetle zemin beton dökümüne hazır hale getirilmiştir.',
      completionDate: 'Ocak 2024',
      additionalImages: []
    },
    {
      title: 'Eski Fabrika Yıkımı',
      category: 'Yıkım Hizmetleri',
      image: '/images/gallery/5.jpeg',
      description: 'Kullanım ömrünü tamamlamış eski zeytinyağı fabrikasının çevre güvenliği alınarak kontrollü yıkımı gerçekleştirilmiştir. Çıkan molozlar ayrıştırılarak geri dönüşüm tesislerine ve döküm sahalarına nakledilmiştir.',
      completionDate: 'Şubat 2024',
      additionalImages: []
    },
    {
      title: 'Toplu Konut Altyapısı',
      category: 'Yol Yapımı & Altyapı',
      image: '/images/gallery/4.jpeg',
      description: '120 dairelik toplu konut projesinin kanalizasyon, yağmur suyu ve içme suyu hatları için derin kazı işlemleri yapılmıştır. İş güvenliği standartlarına uygun olarak iksa sistemleri kullanılmış ve boru döşeme sonrası kum dolgusu yapılmıştır.',
      completionDate: 'Aralık 2023',
      additionalImages: []
    },
    {
      title: 'Otel Havuz Kazısı',
      category: 'Hafriyat ve Kazı',
      image: '/images/gallery/3.jpeg',
      description: 'Sarıgerme bölgesindeki 5 yıldızlı bir otelin yarı olimpik yüzme havuzu ve çocuk havuzu için kademeli kazı işlemleri gerçekleştirilmiştir. Dar alanda mini ekskavatörler kullanılarak çevre peyzajına zarar verilmeden işlem tamamlanmıştır.',
      completionDate: 'Mart 2024',
      additionalImages: []
    }
  ];

  const title = settings?.projectsTitle || "Tamamlanan Projelerimiz";
  const subtitle = settings?.projectsSubtitle || "Başarı Hikayelerimiz";
  const baseProjects = settings?.projects || defaultProjects;
  
  const projects = baseProjects.map((project: any) => {
    return {
      ...project,
      isVideo: project.image ? (project.image.endsWith('.mp4')) : false
    };
  });

  const categories = ['Tümü', ...Array.from(new Set(projects.map((p: any) => p.category)))];

  const filteredProjects = activeFilter === 'Tümü' 
    ? projects 
    : projects.filter((p: any) => p.category === activeFilter);

  // Prevent scrolling when modal is open
  if (typeof window !== 'undefined') {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <section id="projeler" className="py-24 bg-white relative">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark" dangerouslySetInnerHTML={{ __html: title.replace('Projelerimiz', '<span class="text-brand-orange">Projelerimiz</span>') }}>
            </h2>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category: any) => (
            <button
              key={category as string}
              onClick={() => setActiveFilter(category as string)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === category
                  ? 'bg-brand-dark text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category as string}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer bg-gray-200"
                onClick={() => setSelectedProject(project)}
              >
                {project.image ? (
                  project.isVideo ? (
                    <video
                      src={project.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 p-4 text-center">
                    Görsel bekleniyor...
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <button className="flex items-center text-white text-sm font-bold group-hover:text-brand-orange transition-colors">
                    Detayları İncele <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 flex flex-col"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md hover:bg-white rounded-full text-brand-dark transition-colors shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="h-64 sm:h-80 relative flex-shrink-0 bg-gray-200">
                {selectedProject.image ? (
                  selectedProject.isVideo ? (
                    <video 
                      src={selectedProject.image} 
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                    />
                  ) : (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer" 
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Görsel bekleniyor...
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full pointer-events-none">
                  <span className="inline-block px-3 py-1 bg-brand-orange text-white text-xs font-bold uppercase tracking-widest rounded-lg mb-3">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-10 flex-grow">
                <div className="flex items-center text-gray-600 mb-8 font-semibold bg-gray-50 inline-flex px-4 py-2 rounded-xl border border-gray-100">
                  <Calendar className="w-5 h-5 mr-3 text-brand-orange" />
                  Tamamlanma Tarihi: <span className="ml-2 text-brand-dark">{selectedProject.completionDate}</span>
                </div>
                
                <div className="mb-10">
                  <h4 className="text-xl font-bold text-brand-dark mb-4 border-b border-gray-100 pb-2">Proje Detayları</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.additionalImages && selectedProject.additionalImages.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-brand-dark mb-4 border-b border-gray-100 pb-2">Proje Galerisi</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.additionalImages.map((img: string, idx: number) => (
                        <div key={idx} className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-sm border border-gray-100">
                          <img 
                            src={img} 
                            alt={`${selectedProject.title} detay ${idx + 1}`} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { getGallery } from '../services/galleryService';
import { X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const gallery = await getGallery();
        setImages(gallery);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(1);
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(-1);
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  // Prevent scrolling when modal is open
  if (typeof window !== 'undefined') {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  if (loading) {
    return null; // Or a loading spinner
  }

  if (images.length === 0) {
    return null; // Hide gallery if no images
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="galeri" className="py-24 bg-gray-50 relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
              Çalışmalarımızdan Kareler
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6">
              Resim <span className="text-brand-orange">Galerisi</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-sm hover:shadow-xl transition-all"
                onClick={() => setSelectedIndex(index)}
              >
                {img.type === 'video' || img.url.endsWith('.mp4') ? (
                  <video
                    src={img.url}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img
                    src={img.url}
                    alt={img.title || "Galeri Resmi"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-colors duration-300 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
                </div>
                {img.title && (
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-sm truncate">{img.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && images[selectedIndex] && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
              onClick={() => setSelectedIndex(null)}
            />
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
              {/* Header: Counter & Close */}
              <div className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-50 pointer-events-auto">
                <div className="text-white font-bold bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
                  {selectedIndex + 1} / {images.length}
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto hidden sm:block"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div className="relative max-w-5xl w-full flex-1 flex flex-col items-center justify-center pointer-events-auto overflow-hidden px-4">
                <AnimatePresence initial={false} custom={direction}>
                  {images[selectedIndex].type === 'video' || images[selectedIndex].url.endsWith('.mp4') ? (
                    <motion.video 
                      key={selectedIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          handleNext();
                        } else if (swipe > swipeConfidenceThreshold) {
                          handlePrev();
                        }
                      }}
                      src={images[selectedIndex].url} 
                      className="absolute max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
                      controls
                      autoPlay
                    />
                  ) : (
                    <motion.img 
                      key={selectedIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          handleNext();
                        } else if (swipe > swipeConfidenceThreshold) {
                          handlePrev();
                        }
                      }}
                      src={images[selectedIndex].url} 
                      alt={images[selectedIndex].title || "Galeri Resmi"} 
                      className="absolute max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
                      referrerPolicy="no-referrer" 
                    />
                  )}
                </AnimatePresence>
              </div>
              
              {/* Title */}
              <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none z-50">
                {images[selectedIndex].title && (
                  <motion.div 
                    key={`title-${selectedIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-center bg-black/50 px-6 py-2 rounded-full backdrop-blur-md"
                  >
                    <p className="text-lg font-bold">{images[selectedIndex].title}</p>
                  </motion.div>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto hidden sm:block"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Thumbnails Strip */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto flex justify-center overflow-x-auto">
                <div className="flex gap-2 px-4">
                  {images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => {
                        setDirection(idx > selectedIndex ? 1 : -1);
                        setSelectedIndex(idx);
                      }}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                        idx === selectedIndex 
                          ? 'ring-2 ring-brand-orange scale-110 z-10' 
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      {img.type === 'video' || img.url.endsWith('.mp4') ? (
                        <video src={img.url} className="w-full h-full object-cover" />
                      ) : (
                        <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

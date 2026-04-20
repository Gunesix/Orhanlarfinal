import { motion } from 'motion/react';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const currentPosts = sortedPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">
              Bilgi Paylaşımı
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6">
              Güncel <span className="text-brand-orange">Blog Yazılarımız</span>
            </h2>
          </motion.div>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Henüz blog yazısı bulunmamaktadır.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
                >
                  <Link to={`/blog/${post.slug || post.id}`} className="flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center text-xs font-bold text-brand-dark">
                        <Calendar className="w-3 h-3 mr-2 text-brand-orange" />
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 rounded-lg text-xs font-bold">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <span className="flex items-center text-brand-dark font-bold text-sm group-hover:text-brand-orange transition-colors mt-auto">
                        Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="p-3 rounded-xl bg-white border border-gray-200 text-brand-dark hover:bg-gray-50 hover:border-brand-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  aria-label="Önceki Sayfa"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="text-sm font-bold text-gray-600 min-w-[4rem] text-center">
                  Sayfa {page} / {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="p-3 rounded-xl bg-white border border-gray-200 text-brand-dark hover:bg-gray-50 hover:border-brand-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  aria-label="Sonraki Sayfa"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

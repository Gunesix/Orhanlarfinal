import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { Link } from 'react-router';

export default function Footer() {
  const { settings } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımızda', href: '/#hakkimizda' },
    { name: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
    { name: 'Projelerimiz', href: '/#projeler' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-8 hover:opacity-90 transition-opacity">
              <div className="bg-brand-orange p-2 rounded-lg mr-2">
                <div className="w-6 h-6 border-4 border-white rounded-sm transform rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tighter">
                ORHANLAR<span className="text-brand-orange">HAFRİYAT</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {settings?.aboutDescription1?.substring(0, 150) || "Muğla Dalaman bölgesinde profesyonel hafriyat ve kazı çözümleri sunuyoruz. Güçlü makine parkurumuz ve uzman ekibimizle hizmetinizdeyiz."}...
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-orange transition-all border border-white/10"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-brand-orange pl-4">Hızlı Menü</h4>
            <ul className="space-y-4 text-gray-400">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-brand-orange transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3 opacity-0 group-hover:opacity-100"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-brand-orange pl-4">Hizmetlerimiz</h4>
            <ul className="space-y-4 text-gray-400">
              {['Hafriyat ve Kazı', 'Kepçe Kiralama', 'Kum & Çakıl Temini', 'Yıkım Hizmetleri', 'Dolgu & Tesviye', 'Çevre Düzenleme'].map((item) => (
                <li key={item}>
                  <Link to="/hizmetlerimiz" className="hover:text-brand-orange transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-brand-orange pl-4">Bülten</h4>
            <p className="text-gray-400 mb-6 text-sm">
              En yeni projelerimizden ve duyurulardan haberdar olmak için bültenimize abone olun.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-brand-orange transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-orange px-4 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all">
                Kayıt Ol
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-sm text-center w-full">
            © {new Date().getFullYear()} Orhanlar Hafriyat. Tüm Hakları Saklıdır. <br className="md:hidden" />
            <span className="hidden md:inline mx-2">|</span> 
            Dalaman, Muğla
            <br />
            <a href="https://www.instagram.com/_gunesibrahim" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Güneş</a> tarafından ❤️ ile oluşturuldu
          </p>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
}

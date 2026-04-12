import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../hooks/useSettings';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();

  const phone = settings?.contactInfo?.phone || "0535 776 09 94";
  const whatsapp = settings?.contactInfo?.whatsapp || "905357760994";

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hizmetler', href: '/#hizmetler' },
    { name: 'Projeler', href: '/#projeler' },
    { name: 'Galeri', href: '/#galeri' },
    { name: 'Blog', href: '/#blog' },
    { name: 'İletişim', href: '/#iletisim' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-brand-orange p-2 rounded-lg mr-2">
              <div className="w-8 h-8 border-4 border-white rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-extrabold tracking-tighter text-brand-dark">
              ORHANLAR<span className="text-brand-orange">HAFRİYAT</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-brand-dark hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center text-sm font-bold text-brand-dark hover:text-brand-orange transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-brand-orange" />
              {phone}
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-whatsapp text-white px-4 py-2 rounded-full text-sm font-bold flex items-center hover:bg-opacity-90 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-brand-dark hover:text-brand-orange transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-brand-dark hover:text-brand-orange"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-4">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center text-lg font-bold text-brand-dark"
                >
                  <Phone className="w-5 h-5 mr-3 text-brand-orange" />
                  {phone}
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-whatsapp text-white px-6 py-3 rounded-xl text-center font-bold flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  WhatsApp'tan Teklif Al
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

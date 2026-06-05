import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>İletişim & Teklif Al - Orhanlar Hafriyat Dalaman</title>
        <meta name="description" content="Dalaman kazı işleri fiyatları ve dalaman kepçeci kiralama teklifleri için Orhanlar Dalaman Hafriyat ile hemen iletişime geçin. 7/24 kesintisiz hizmet hattımız." />
        <meta name="keywords" content="dalaman kepçeci telefon, dalaman hafriyat iletişim, dalaman kazı işleri teklif, orhanlar dalaman telefon" />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-50 pt-10">
          <div className="container-custom">
            <h1 className="text-4xl font-black text-brand-dark">İletişim</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Projeleriniz için teklif almak veya aklınıza takılan soruları sormak için bizimle iletişime geçin.
            </p>
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

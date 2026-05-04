import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
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

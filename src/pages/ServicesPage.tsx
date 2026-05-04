import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-50 pt-10">
          <div className="container-custom">
            <h1 className="text-4xl font-black text-brand-dark">Hizmetlerimiz</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Muğla Dalaman ve çevresinde gerçekleştirdiğimiz tüm profesyonel hafriyat, yıkım ve peyzaj hizmetlerimiz.
            </p>
          </div>
        </div>
        <Services />
      </main>
      <Footer />
    </div>
  );
}

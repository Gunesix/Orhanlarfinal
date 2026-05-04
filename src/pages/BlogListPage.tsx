import Header from '../components/Header';
import Blog from '../components/Blog';
import Footer from '../components/Footer';

export default function BlogListPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-50 pt-10">
          <div className="container-custom">
            <h1 className="text-4xl font-black text-brand-dark">Blog ve Haberler</h1>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Hafriyat, kazı işleri, iş makineleri ve güncel sektör haberleri hakkında faydalı bilgiler.
            </p>
          </div>
        </div>
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

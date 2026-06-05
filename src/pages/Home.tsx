import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Orhanlar Dalaman Hafriyat | Dalaman Kazı İşleri & Kepçeci</title>
        <meta name="description" content="Orhanlar Dalaman Hafriyat olarak profesyonel Dalaman kazı işleri, dalaman kepçeci kiralama ve harfiyat hizmetleri sunuyoruz. Güvenilir ve hızlı saha hazırlığı." />
        <meta name="keywords" content="dalaman kazı işleri, dalaman kepçeci, Orhanlar Dalaman, Orhanlar Hafriyat, dalaman kiralık kepçe, hafriyat dalaman, Muğla hafriyat, Ortaca kazı işleri" />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

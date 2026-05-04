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
        <title>Muğla Dalaman Hafriyat & Kepçe Kiralama | Orhanlar Hafriyat</title>
        <meta name="description" content="Dalaman ve Muğla bölgesinde profesyonel hafriyat, kazı, bina yıkımı ve saatlik/günlük kepçe kiralama hizmetleri. Ücretsiz keşif ve fiyat teklifi için arayın!" />
        <meta name="keywords" content="Dalaman Orhanlar, Orhanlar Dalaman, Dalaman hafriyat, Muğla hafriyat, Ortaca hafriyat, Göcek hafriyat" />
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

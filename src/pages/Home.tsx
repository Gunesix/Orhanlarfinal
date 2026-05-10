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
        <title>Orhanlar Dalaman Hafriyat | En İyi Kazı ve Kepçe Kiralama</title>
        <meta name="description" content="Orhanlar Dalaman hafriyat olarak güvenilir, hızlı ve profesyonel hizmet sunuyoruz. Muğla, Dalaman ve Ortaca bölgesinde kiralık kepçe ve hafriyat çalışmaları." />
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

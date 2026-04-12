import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Gallery />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

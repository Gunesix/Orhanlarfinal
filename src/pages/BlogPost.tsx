import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Markdown from 'react-markdown';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug || p.id === slug);

  useEffect(() => {
    if (post) {
      // SEO Optimization
      const title = `${post.title} | Orhanlar Hafriyat`;
      const description = post.excerpt;
      
      document.title = title;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);
      
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', post.image);

      // JSON-LD Structured Data
      let script = document.querySelector('#json-ld-article');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'json-ld-article');
        document.head.appendChild(script);
      }
      
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": [post.image],
        "datePublished": post.createdAt,
        "dateModified": post.createdAt,
        "author": [{
          "@type": "Organization",
          "name": "Orhanlar Hafriyat",
          "url": window.location.origin
        }],
        "publisher": {
          "@type": "Organization",
          "name": "Orhanlar Hafriyat",
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`
          }
        },
        "description": description
      };
      script.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      // Cleanup SEO tags when leaving the page
      document.title = 'Orhanlar Hafriyat';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'Muğla Dalaman bölgesinde profesyonel hafriyat, kazı, yıkım ve altyapı hizmetleri.');
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.remove();
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.remove();
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.remove();
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.remove();
      
      const jsonLdScript = document.querySelector('#json-ld-article');
      if (jsonLdScript) jsonLdScript.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-3xl font-bold text-brand-dark mb-4">Yazı bulunamadı.</h1>
          <Link to="/#blog" className="text-brand-orange font-bold hover:underline">Blog'a Dön</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 px-4">
        <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-64 md:h-96 w-full relative">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-brand-orange text-white px-4 py-2 rounded-xl font-bold text-sm">
              {post.category}
            </div>
          </div>
          <div className="p-8 md:p-12">
            <Link to="/#blog" className="inline-flex items-center text-brand-orange font-bold mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Blog'a Dön
            </Link>
            <h1 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center text-gray-500 mb-10 font-semibold">
              <Calendar className="w-5 h-5 mr-2 text-brand-orange" />
              {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <Markdown>{post.content}</Markdown>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

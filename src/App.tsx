import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hizmetlerimiz" element={<ServicesPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </ErrorBoundary>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import ErrorBoundary from './components/ErrorBoundary';
import { SettingsProvider } from './hooks/useSettings';

export default function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetlerimiz" element={<ServicesPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

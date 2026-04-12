import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import ErrorBoundary from './components/ErrorBoundary';
import { SettingsProvider } from './hooks/useSettings';

export default function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { SettingsProvider } from './hooks/useSettings';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

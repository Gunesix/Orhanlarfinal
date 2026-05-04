import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { SettingsProvider } from './hooks/useSettings';

export function render(url: string, helmetContext: any) {
  return renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <SettingsProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </SettingsProvider>
      </HelmetProvider>
    </StrictMode>
  );
}

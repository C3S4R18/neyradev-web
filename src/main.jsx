import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { I18nProvider } from './i18n'
import { INITIAL_LANG } from './i18n/config'
import { loadLocale } from './i18n/loaders'
import { ThemeProvider } from './theme'
import { CurrencyProvider } from './currency'

// Se espera al idioma antes del primer render. Cargarlo después obligaría a
// pintar algo vacío o en otro idioma y corregirlo a continuación.
const initialMessages = await loadLocale(INITIAL_LANG)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider initialMessages={initialMessages}>
        <CurrencyProvider>
          <App />
          {/* Analítica de Vercel: sin cookies y sin datos personales, así que
              no necesita banner de consentimiento. Hay que activarla también
              en el panel de Vercel; hasta entonces no envía nada. */}
          <Analytics />
        </CurrencyProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'
import { CurrencyProvider } from './currency'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)

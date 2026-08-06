import { createContext, useContext } from "react";

// El contexto y el hook viven aparte del provider: react-refresh exige que un
// archivo de componentes exporte solo componentes para que el HMR funcione.
export const I18nContext = createContext(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n debe usarse dentro de <I18nProvider>");
  return ctx;
}

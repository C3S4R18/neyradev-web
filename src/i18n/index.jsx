import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, INITIAL_LANG, LANGUAGES, storeLang } from "./config";
import { I18nContext } from "./context";

import es from "./locales/es";
import eu from "./locales/eu";
import ca from "./locales/ca";
import gl from "./locales/gl";
import en from "./locales/en";
import fr from "./locales/fr";
import pt from "./locales/pt";
import de from "./locales/de";
import it from "./locales/it";

const LOCALES = { es, eu, ca, gl, en, fr, pt, de, it };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(INITIAL_LANG);

  // Mantiene <html lang> en sincronía: lo usan lectores de pantalla,
  // el corrector ortográfico y los traductores automáticos.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLang = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLang(code);
    storeLang(code);
  }, []);

  const value = useMemo(
    () => ({ lang, t: LOCALES[lang] ?? LOCALES[DEFAULT_LANG], changeLang }),
    [lang, changeLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}


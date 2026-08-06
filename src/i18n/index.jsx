import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_LANG, LANGUAGES, pathForLang, langFromPath, storeLang } from "./config";
import { I18nContext } from "./context";
import { loadLocale, peekLocale } from "./loaders";

export function I18nProvider({ initialMessages, children }) {
  const [lang, setLang] = useState(INITIAL_LANG);
  const [messages, setMessages] = useState(initialMessages);

  // Mantiene <html lang> en sincronía: lo usan lectores de pantalla,
  // el corrector ortográfico y los traductores automáticos.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Botones atrás/adelante del navegador: la URL manda.
  useEffect(() => {
    const onPop = async () => {
      const code = langFromPath() ?? INITIAL_LANG;
      setMessages(peekLocale(code) ?? (await loadLocale(code)));
      setLang(code);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const changeLang = useCallback(async (code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;

    // Se cargan los textos ANTES de cambiar el idioma: si se hiciera al revés,
    // habría un parpadeo con la interfaz a medio traducir.
    const next = peekLocale(code) ?? (await loadLocale(code));
    setMessages(next);
    setLang(code);
    storeLang(code);

    // pushState en vez de recargar: la dirección queda compartible y el
    // historial funciona, pero no se vuelve a descargar la página.
    const path = pathForLang(code);
    if (window.location.pathname !== path) {
      window.history.pushState({ lang: code }, "", path + window.location.search + window.location.hash);
    }
  }, []);

  const value = useMemo(() => ({ lang, t: messages, changeLang }), [lang, messages, changeLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

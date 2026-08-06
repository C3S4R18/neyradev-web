import { DEFAULT_LANG } from "./config";

// Un `import()` por idioma: Vite parte cada uno en su propio archivo y el
// navegador solo descarga el que hace falta. Antes los nueve viajaban en el
// paquete principal (~48 kB comprimidos de traducciones que nadie leía).
const LOADERS = {
  es: () => import("./locales/es"),
  eu: () => import("./locales/eu"),
  ca: () => import("./locales/ca"),
  gl: () => import("./locales/gl"),
  en: () => import("./locales/en"),
  fr: () => import("./locales/fr"),
  pt: () => import("./locales/pt"),
  de: () => import("./locales/de"),
  it: () => import("./locales/it"),
};

const cache = new Map();

/** Carga (y memoriza) los textos de un idioma. */
export async function loadLocale(code) {
  const key = LOADERS[code] ? code : DEFAULT_LANG;
  if (!cache.has(key)) {
    cache.set(key, (await LOADERS[key]()).default);
  }
  return cache.get(key);
}

/** Devuelve los textos ya cargados, o undefined si aún no se han pedido. */
export const peekLocale = (code) => cache.get(code);

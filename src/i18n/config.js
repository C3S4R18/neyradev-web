// Idiomas disponibles. `code` es el prefijo ISO-639-1 que llega en
// navigator.languages ("eu-ES" -> "eu", "pt-BR" -> "pt").
//
// No usamos banderas: euskera, catalán y gallego no tienen emoji de bandera, y
// asociar un idioma a un país es incorrecto de todas formas (el castellano no
// es solo España, el francés no es solo Francia). Usamos el código como badge.
export const LANGUAGES = [
  { code: "es", native: "Castellano", english: "Spanish" },
  { code: "eu", native: "Euskara", english: "Basque" },
  { code: "ca", native: "Català", english: "Catalan" },
  { code: "gl", native: "Galego", english: "Galician" },
  { code: "en", native: "English", english: "English" },
  { code: "fr", native: "Français", english: "French" },
  { code: "pt", native: "Português", english: "Portuguese" },
  { code: "de", native: "Deutsch", english: "German" },
  { code: "it", native: "Italiano", english: "Italian" },
];

export const DEFAULT_LANG = "es";
export const STORAGE_KEY = "neyradev:lang";

const isSupported = (code) => LANGUAGES.some((l) => l.code === code);

// localStorage falla en modo privado de algunos navegadores y con cookies
// bloqueadas: nunca debe tumbar la página.
export function readStoredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && isSupported(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function storeLang(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Sin persistencia: la elección dura lo que dure la pestaña.
  }
}

/**
 * Idioma sugerido a partir de las preferencias del navegador.
 *
 * Ojo: el navegador expone IDIOMA, no región dentro de un país. Alguien en
 * Bilbao con el navegador en castellano manda "es-ES" igual que alguien en
 * Madrid — son indistinguibles sin geolocalización por IP (servicio externo).
 * Por eso euskera/catalán/gallego solo se detectan si el usuario los tiene
 * configurados como idioma, y siempre queda el selector manual.
 */
export function detectLang() {
  const prefs =
    typeof navigator !== "undefined" && navigator.languages?.length
      ? navigator.languages
      : [typeof navigator !== "undefined" ? navigator.language : DEFAULT_LANG];

  for (const pref of prefs) {
    if (!pref) continue;
    const base = String(pref).toLowerCase().split("-")[0];
    if (isSupported(base)) return base;
  }
  return DEFAULT_LANG;
}

// --- URL POR IDIOMA ---
//
// Cada idioma tiene su propia dirección: "/" en castellano y "/en/", "/fr/"…
// para el resto. Sin esto Google solo indexaba una versión, porque el idioma se
// decidía en JavaScript y el buscador nunca veía las otras ocho traducciones.
//
// El castellano va sin prefijo para no romper los enlaces que ya existen.
export const SITE_URL = "https://neyradev-web.vercel.app";

export const pathForLang = (code) => (code === DEFAULT_LANG ? "/" : `/${code}/`);
export const urlForLang = (code) => `${SITE_URL}${pathForLang(code)}`;

/** Idioma que indica la ruta actual, o null si la ruta no lleva prefijo. */
export function langFromPath(pathname = typeof location !== "undefined" ? location.pathname : "/") {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isSupported(first) ? first : null;
}

// Se resuelve una sola vez al cargar el módulo, fuera de React: leer
// localStorage o navigator durante el render es impuro.
// El idioma que sugiere el navegador, al margen de lo que haya elegido el
// visitante después. El modal marca este como "detectado"; sin esta constante
// la etiqueta saltaba a cualquier opción que se pulsara, lo cual era falso.
export const DETECTED_LANG = detectLang();

export const URL_LANG = langFromPath();
export const STORED_LANG = readStoredLang();

// La URL manda sobre todo lo demás: si alguien comparte "/fr/", quien lo abra
// debe ver francés aunque tenga otro idioma guardado.
export const INITIAL_LANG = URL_LANG ?? STORED_LANG ?? DETECTED_LANG;

// Entrar por una URL con idioma ya es una elección: no preguntamos.
export const HAS_CHOSEN_LANG = URL_LANG !== null || STORED_LANG !== null;

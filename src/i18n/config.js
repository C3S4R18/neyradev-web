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

// Se resuelve una sola vez al cargar el módulo, fuera de React: leer
// localStorage o navigator durante el render es impuro.
export const STORED_LANG = readStoredLang();
export const INITIAL_LANG = STORED_LANG ?? detectLang();
export const HAS_CHOSEN_LANG = STORED_LANG !== null;

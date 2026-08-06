export const THEMES = ["dark", "light"];
export const STORAGE_KEY = "neyradev:theme";

// El color de la barra del navegador en móvil debe seguir al tema.
export const THEME_COLORS = { dark: "#030014", light: "#f9f9fd" };

export function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Sin persistencia: la elección dura lo que dure la pestaña.
  }
}

export function systemTheme() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

// Se resuelve al cargar el módulo, fuera de React (leer localStorage o
// matchMedia durante el render es impuro).
export const STORED_THEME = readStoredTheme();
export const INITIAL_THEME = STORED_THEME ?? systemTheme();

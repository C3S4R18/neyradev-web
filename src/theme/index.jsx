import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_THEME, STORED_THEME, THEME_COLORS, storeTheme } from "./config";
import { ThemeContext } from "./context";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(INITIAL_THEME);
  // Mientras nadie toque el interruptor, mandan las preferencias del sistema.
  const [userChose, setUserChose] = useState(STORED_THEME !== null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);

  // Sigue los cambios del sistema (p. ej. el modo oscuro automático al anochecer)
  // hasta que el visitante elige a mano.
  useEffect(() => {
    if (userChose) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => setTheme(e.matches ? "light" : "dark");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [userChose]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setUserChose(true);
    storeTheme(next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

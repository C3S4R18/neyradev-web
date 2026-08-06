/** @type {import('tailwindcss').Config} */

// Sin `safelist`: las clases de acento que antes se construían en runtime
// (`bg-${color}-500`) ahora son literales dentro de los mapas ACCENT de
// App.jsx, así que Tailwind las encuentra escaneando el código.
// El safelist anterior generaba ~3000 clases y casi ninguna se usaba.

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tokens semánticos. El valor real vive en src/index.css como triplete
      // RGB, para que <alpha-value> pueda aplicar opacidad.
      colors: {
        page: "rgb(var(--page) / <alpha-value>)",
        "page-alt": "rgb(var(--page-alt) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-deep": "rgb(var(--surface-deep) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--ink-faint) / <alpha-value>)",
        veil: "rgb(var(--veil) / <alpha-value>)",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
}

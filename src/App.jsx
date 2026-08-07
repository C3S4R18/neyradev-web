import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useSpring, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaReact, FaAndroid, FaNodeJs, FaRocket, FaExternalLinkAlt, FaBars, FaTimes, FaBoxOpen, FaMobileAlt, FaArrowUp, FaBrain, FaRobot, FaBolt, FaStar, FaLaptopCode, FaCommentDots, FaCheckCircle, FaSearch, FaFilter, FaBuilding, FaChevronLeft, FaChevronRight, FaCode, FaChartLine, FaDatabase, FaServer, FaLayerGroup, FaImages, FaEye, FaPaperPlane, FaUser, FaEnvelope, FaPen, FaRegPaperPlane, FaDownload, FaGamepad, FaMicrochip, FaTerminal, FaSkull, FaLeaf, FaHammer, FaGhost, FaBiohazard, FaBug, FaDragon, FaCheck, FaGlobe, FaChevronDown, FaSun, FaMoon, FaCoins } from 'react-icons/fa';
import { SiTailwindcss, SiKotlin, SiMysql, SiSupabase, SiPhp, SiVercel, SiNextdotjs, SiTypescript, SiPostgresql, SiFirebase, SiFigma, SiNintendoswitch } from "react-icons/si";
import { useI18n } from './i18n/context';
import { DETECTED_LANG, HAS_CHOSEN_LANG, LANGUAGES } from './i18n/config';
import Flag from './i18n/Flag';
import { SOCIAL_LINKS, CONTACT_EMAIL } from './data/social';

// Endpoint del formulario (Formspree, Web3Forms, Resend...). Sin esta variable
// el formulario abre el correo del visitante, que es lo que hacía antes.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
import { useTheme } from './theme/context';
import { useCurrency } from './currency/context';
import { CURRENCIES, formatPrice } from './currency/config';

// Rellena marcadores tipo {name} en las cadenas traducidas.
const fill = (template, values) =>
  Object.entries(values).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, value), template);

// --- DATOS ---


// --- DATOS NO TRADUCIBLES ---
// Iconos, colores, imágenes, precios y nombres de tecnología viven aquí.
// Todo el texto visible está en src/i18n/locales/*.js, enlazado por `key`.

// --- ACENTOS DE COLOR ---
// Clases literales, no plantillas: Tailwind escanea el código y no puede
// resolver `bg-${color}-500`. Antes esto se cubría con un safelist de ~3000
// clases; ahora solo existen las que se usan de verdad.

const SERVICE_ACCENT = {
  indigo: "bg-indigo-500/20 text-indigo-400 shadow-indigo-500/10",
  fuchsia: "bg-fuchsia-500/20 text-fuchsia-400 shadow-fuchsia-500/10",
  cyan: "bg-cyan-500/20 text-cyan-400 shadow-cyan-500/10",
};

const TESTIMONIAL_ACCENT = {
  cyan: { border: "hover:border-cyan-500/40", glow: "bg-cyan-600/10", quote: "text-cyan-500/40", avatar: "from-cyan-500" },
  purple: { border: "hover:border-purple-500/40", glow: "bg-purple-600/10", quote: "text-purple-500/40", avatar: "from-purple-500" },
  fuchsia: { border: "hover:border-fuchsia-500/40", glow: "bg-fuchsia-600/10", quote: "text-fuchsia-500/40", avatar: "from-fuchsia-500" },
  indigo: { border: "hover:border-indigo-500/40", glow: "bg-indigo-600/10", quote: "text-indigo-500/40", avatar: "from-indigo-500" },
  blue: { border: "hover:border-blue-500/40", glow: "bg-blue-600/10", quote: "text-blue-500/40", avatar: "from-blue-500" },
  pink: { border: "hover:border-pink-500/40", glow: "bg-pink-600/10", quote: "text-pink-500/40", avatar: "from-pink-500" },
};

const PLAN_ACCENT = {
  cyan: { title: "text-cyan-400", border: "border-cyan-500", badge: "bg-cyan-600", check: "text-cyan-500", grad: "from-cyan-600/10", glow: "bg-cyan-500/20" },
  blue: { title: "text-blue-400", border: "border-blue-500", badge: "bg-blue-600", check: "text-blue-500", grad: "from-blue-600/10", glow: "bg-blue-500/20" },
  indigo: { title: "text-indigo-400", border: "border-indigo-500", badge: "bg-indigo-600", check: "text-indigo-500", grad: "from-indigo-600/10", glow: "bg-indigo-500/20" },
  fuchsia: { title: "text-fuchsia-400", border: "border-fuchsia-500", badge: "bg-fuchsia-600", check: "text-fuchsia-500", grad: "from-fuchsia-600/10", glow: "bg-fuchsia-500/20" },
  pink: { title: "text-pink-400", border: "border-pink-500", badge: "bg-pink-600", check: "text-pink-500", grad: "from-pink-600/10", glow: "bg-pink-500/20" },
  purple: { title: "text-purple-400", border: "border-purple-500", badge: "bg-purple-600", check: "text-purple-500", grad: "from-purple-600/10", glow: "bg-purple-500/20" },
  violet: { title: "text-violet-400", border: "border-violet-500", badge: "bg-violet-600", check: "text-violet-500", grad: "from-violet-600/10", glow: "bg-violet-500/20" },
};

const SERVICES_META = [
  { key: "backend", icon: <SiPhp />, tags: ["PHP", "Node.js", "MySQL"], color: "indigo" },
  { key: "mobile", icon: <FaMobileAlt />, tags: ["Kotlin", "Android Studio", "Material Design"], color: "fuchsia" },
  { key: "web", icon: <SiNextdotjs />, tags: ["Next.js", "React", "SEO"], color: "cyan" },
];

const PRICING_META = [
  {
    key: "web",
    price: "600",
    color: "cyan",
    popular: false,
    tiers: [
      { key: "webInfo", price: "600", color: "cyan", popular: false },
      { key: "webDyn", price: "1200", color: "blue", popular: true },
      { key: "webShop", price: "2500", color: "indigo", popular: false },
    ],
  },
  {
    key: "app",
    price: "800",
    color: "fuchsia",
    popular: false,
    tiers: [
      { key: "appBasic", price: "800", color: "pink", popular: false },
      { key: "appInter", price: "1800", color: "fuchsia", popular: true },
      { key: "appComplex", price: "3500", color: "purple", popular: false },
    ],
  },
  {
    key: "fullstack",
    price: "1500",
    color: "purple",
    popular: true,
    tiers: [
      { key: "fsStart", price: "1500", color: "violet", popular: false },
      { key: "fsPro", price: "3000", color: "purple", popular: true },
      { key: "fsEnterprise", price: "5500", color: "indigo", popular: false },
    ],
  },
];

// Claves de filtro: el texto visible sale de t.projects.filters[clave].
const FILTERS = ["todos", "empresarial", "fullstack", "web", "movil"];

const PROJECTS_META = [
  {
    key: "ruag",
    title: "Ruag",
    category: "empresarial",
    badge: "current",
    link: "https://ruag-app-web.vercel.app/",
    gallery: [
      "/img-proyectos/Ruag-System-Banner.png",
      "/img-proyectos/ruag-login.webp",
      "/img-proyectos/ruag-dashboard.webp",
      "/img-proyectos/ruag-movil1.jpeg",
      "/img-proyectos/ruag-movil2.jpeg",
      "/img-proyectos/ruag-movil3.jpeg",
      "/img-proyectos/ruag-movil4.jpeg",
      "/img-proyectos/ruag-movil5.jpeg",
      "/img-proyectos/ruag-movil6.jpeg",
      "/img-proyectos/ruag-movil7.jpeg",
      "/img-proyectos/ruag-movil8.jpeg",
    ],
    stack: ["Next.js 14 (App Router)", "TypeScript", "Vercel Edge Functions", "SWR"],
    techStackIcons: [<SiNextdotjs key="next" />, <SiTypescript key="ts" />, <SiVercel key="vercel" />, <SiTailwindcss key="tw" />],
    gradient: "from-blue-900 to-slate-900",
    icon: <FaBuilding className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "jormard",
    title: "Bodega Jormard",
    category: "fullstack",
    badge: "success",
    link: "#",
    gallery: [
      "/img-proyectos/logo-jormard.webp",
      "/img-proyectos/jormard-DashAdmin.webp",
      "/img-proyectos/jormard-DashCliente.webp",
      "/img-proyectos/jormar-movil.webp",
    ],
    stack: ["Next.js", "Supabase Auth & DB", "PostgreSQL", "Android (Kotlin)"],
    techStackIcons: [<SiSupabase key="supa" />, <SiPostgresql key="pg" />, <SiNextdotjs key="next" />, <SiKotlin key="kt" />],
    gradient: "from-green-900 to-emerald-900",
    icon: <SiSupabase className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "aldia",
    title: "Aldia Express",
    category: "web",
    badge: null,
    link: "#",
    gallery: ["/img-proyectos/ADE-Logo.webp", "/img-proyectos/ADE-DashAdmin.webp", "/img-proyectos/ADE-DashCliente.webp"],
    stack: ["PHP 8", "MySQL", "Bootstrap 5", "JQuery"],
    techStackIcons: [<SiPhp key="php" />, <SiMysql key="sql" />, <FaServer key="srv" />],
    gradient: "from-orange-900 to-red-900",
    icon: <FaBoxOpen className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "esaf",
    title: "App Móvil ESAF",
    category: "movil",
    badge: null,
    link: "#",
    gallery: [
      "/img-proyectos/Esaf-logo.webp",
      "/img-proyectos/Esaf-movil-1.webp",
      "/img-proyectos/Esaf-movil-2.webp",
      "/img-proyectos/Esaf-movil-3.webp",
    ],
    stack: ["Kotlin", "Room Database", "Retrofit", "Coroutines"],
    techStackIcons: [<SiKotlin key="kt" />, <FaAndroid key="android" />, <FaDatabase key="db" />],
    gradient: "from-purple-900 to-indigo-900",
    icon: <FaMobileAlt className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "cinnamo",
    title: "CinnamoDiary",
    category: "movil",
    badge: "personal",
    link: "#",
    gallery: [
      "/img-proyectos/cinnamo-1.webp",
      "/img-proyectos/cinnamo-2.webp",
      "/img-proyectos/cinnamo-3.webp",
      "/img-proyectos/cinnamo-4.webp",
      "/img-proyectos/cinnamo-5.webp",
      "/img-proyectos/cinnamo-6.webp",
      "/img-proyectos/cinnamo-7.webp",
      "/img-proyectos/cinnamo-8.webp",
    ],
    stack: ["Kotlin", "Supabase", "Material You", "Coroutines"],
    techStackIcons: [<SiKotlin key="kt" />, <FaAndroid key="android" />, <FaDatabase key="db" />],
    gradient: "from-pink-900 to-purple-900",
    icon: <FaMobileAlt className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "led",
    title: "Letrero LED Pro",
    category: "movil",
    badge: null,
    link: "#",
    gallery: ["/img-proyectos/led-1.webp", "/img-proyectos/led-2.webp", "/img-proyectos/led-3.webp", "/img-proyectos/led-4.webp"],
    stack: ["Kotlin", "Canvas API", "Android Studio", "Custom Views"],
    techStackIcons: [<SiKotlin key="kt" />, <FaAndroid key="android" />, <FaLaptopCode key="code" />],
    gradient: "from-red-900 to-yellow-900",
    icon: <FaBolt className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "spin",
    title: "SpinLoryx",
    category: "movil",
    badge: null,
    link: "#",
    gallery: [
      "/img-proyectos/spin-1.webp",
      "/img-proyectos/spin-2.webp",
      "/img-proyectos/spin-3.webp",
      "/img-proyectos/spin-4.webp",
      "/img-proyectos/spin-5.webp",
    ],
    stack: ["Kotlin", "Android Animation Framework", "UX/UI Design"],
    techStackIcons: [<SiKotlin key="kt" />, <FaAndroid key="android" />, <FaGamepad key="game" />],
    gradient: "from-blue-900 to-purple-900",
    icon: <FaStar className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "jornada",
    title: "Ruag Jornada",
    category: "fullstack",
    badge: "corporate",
    link: "#",
    gallery: [
      "/img-proyectos/Ruag-Jornada-Banner.png",
      "/img-proyectos/Ruag-Jornada-App1.jpeg",
      "/img-proyectos/Ruag-Jornada-App2.jpeg",
      "/img-proyectos/Ruag-Jornada-App3.jpeg",
      "/img-proyectos/Ruag-Jornada-App4.jpeg",
      "/img-proyectos/Ruag-Jornada-App5.jpeg",
      "/img-proyectos/Ruag-Jornada-App6.jpeg",
      "/img-proyectos/Ruag-Jornada-App7.jpeg",
    ], // TODO (César): /img-proyectos/jornada-*.png
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    techStackIcons: [<SiNextdotjs key="next" />, <SiTypescript key="ts" />, <SiSupabase key="supa" />, <SiPostgresql key="pg" />],
    gradient: "from-sky-900 to-blue-900",
    icon: <FaCheckCircle className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "ssoma",
    title: "Ruag SSOMA Files",
    category: "web",
    badge: "corporate",
    link: "#",
    gallery: [
      "/img-proyectos/Banner-SsomaFiles.webp",
      "/img-proyectos/SsomaFiles-Web-Pwa.png",
      "/img-proyectos/SsomaFiles-1.jpeg",
      "/img-proyectos/SsomaFiles-2.jpeg",
      "/img-proyectos/SsomaFiles-3.jpeg",
      "/img-proyectos/SsomaFiles-4.jpeg",
    ], // /img-proyectos/ssoma-*.png
    stack: ["Next.js", "TypeScript", "Supabase Storage", "Tailwind CSS"],
    techStackIcons: [<SiNextdotjs key="next" />, <SiTypescript key="ts" />, <SiSupabase key="supa" />, <SiTailwindcss key="tw" />],
    gradient: "from-emerald-900 to-teal-900",
    icon: <FaLayerGroup className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
  {
    key: "cubo",
    title: "El Cubo",
    ruag: true, // parte del ecosistema Ruag
    category: "fullstack",
    badge: "wip",
    link: "#",
    gallery: [], // TODO (César): /img-proyectos/cubo-*.png
    stack: ["Next.js", "TypeScript", "Supabase"],
    techStackIcons: [<SiNextdotjs key="next" />, <SiTypescript key="ts" />, <SiSupabase key="supa" />],
    gradient: "from-fuchsia-900 to-purple-900",
    icon: <FaBoxOpen className="text-6xl text-white relative z-10 drop-shadow-lg" />,
  },
];

// Las reseñas de abajo son TEXTO DE MUESTRA, no opiniones reales: llevan nombre,
// cargo y empresa que suenan verificables. Publicarlas como si fueran reales es
// un riesgo de reputación (y en España, publicidad engañosa), así que la sección
// queda apagada.
//
// Para encenderla: consigue reseñas reales, cámbialas en los 9 archivos de
// src/i18n/locales/ (clave `testimonials.items`) y pon esto en true.
const SHOW_TESTIMONIALS = false;

const TESTIMONIALS_META = [
  { key: "jorge", name: "Jorge Ramírez", initials: "JR", rating: 5, color: "cyan" },
  { key: "maria", name: "María Delgado", initials: "MD", rating: 5, color: "purple" },
  { key: "luis", name: "Luis Ferrer", initials: "LF", rating: 5, color: "fuchsia" },
  { key: "ana", name: "Ana Torres", initials: "AT", rating: 5, color: "indigo" },
  { key: "diego", name: "Diego Salas", initials: "DS", rating: 5, color: "blue" },
  { key: "carla", name: "Carla Mendoza", initials: "CM", rating: 5, color: "pink" },
];

const TIMELINE_META = [
  { key: "ruag", active: true },
  { key: "freelance", active: false },
  { key: "backend", active: false },
];

// --- PANTALLA DE ENTRADA ---
//
// La anterior era una consola falsa de 3,3 s ("Bypassing UI security
// protocols... [SUCCESS]") que se veía en cada visita. Tres problemas: retrasa
// el contenido en la métrica que Google mide, el tono de hacker no encaja con
// vender software a empresas, y repetirla en cada carga cansa.
//
// Esta dura 1,3 s, sale una vez por sesión, sigue el tema claro/oscuro y se
// salta entera si el visitante pidió menos animación.
const SPLASH_SESSION_KEY = "neyradev:splash-shown";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const splashAlreadyShown = () => {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

const markSplashShown = () => {
  try {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
  } catch {
    // Sin sessionStorage se volverá a ver; no es grave.
  }
};

// Se decide al cargar el módulo, fuera del render.
const SHOULD_SHOW_SPLASH = !splashAlreadyShown() && !prefersReducedMotion();

const SplashScreen = ({ onComplete }) => {
  const { t } = useI18n();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    markSplashShown();
    // El desmontaje lo manda el temporizador, no el final de una animación:
    // si la animación no corre, la pantalla se quita igual.
    const fade = setTimeout(() => setLeaving(true), 950);
    const done = setTimeout(onComplete, 1450);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] bg-page flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Retrato con anillo que se dibuja */}
        <div className="relative w-28 h-28 splash-pop">
          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgb(var(--veil) / 0.12)" strokeWidth="3" />
            <circle
              cx="60" cy="60" r="56" fill="none" strokeWidth="3" strokeLinecap="round"
              stroke="url(#splashRing)" className="splash-ring"
            />
            <defs>
              <linearGradient id="splashRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <img
            src="/mi-foto.webp"
            alt=""
            className="absolute inset-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)] rounded-full object-cover"
          />
        </div>

        <h1 className="mt-7 text-3xl md:text-4xl font-black tracking-[0.25em] text-ink splash-rise">
          NEYRA<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">DEV</span>
        </h1>

        <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.3em] text-ink-soft splash-rise splash-rise-delay">
          {t.hero.roles[0]}
        </p>

        <div className="mt-8 w-40 h-px bg-veil/15 overflow-hidden rounded-full">
          <div className="h-full w-full bg-gradient-to-r from-purple-500 to-cyan-400 splash-bar"></div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES UI ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);
  
  return (
    <motion.div
      className="cursor-ring fixed top-0 left-0 w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  );
};

const Counter = ({ from, to }) => {
  const nodeRef = useRef();
  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        if (node) node.textContent = value.toFixed(0);
      }
    });
    return () => controls.stop();
  }, [from, to]);
  return <span ref={nodeRef} />;
};

const NeonButton = ({ children, icon, href, primary = true, onClick, disabled = false, className = "" }) => {
  const baseClass = `relative flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold rounded-full transition-all overflow-hidden group z-10 text-sm md:text-base cursor-pointer select-none ${className}`;
  const styles = primary 
    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:bg-purple-500 hover:scale-105"
    : "bg-transparent border border-veil/20 text-ink hover:bg-veil/10 hover:border-veil/50 hover:scale-105";

  const content = (
    <span className="relative z-10 flex items-center gap-2">{icon && <span className="text-lg">{icon}</span>} {children}</span>
  );

  // Sin `href` es un botón: `onClick` si lo hay, y si no el submit del formulario.
  if (onClick || !href) {
    return (
      <motion.button
        whileTap={disabled ? undefined : { scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} ${styles} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`${baseClass} ${styles}`}>
      {content}
    </motion.a>
  );
};

// --- TERMINAL COMPONENT (SCROLLING CODE) ---
const CodeTerminal = ({ logs, colorClass }) => {
    const scrollRef = useRef(null);
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className={`h-full w-full bg-black/60 p-4 font-mono text-xs ${colorClass} overflow-y-auto custom-scrollbar`} ref={scrollRef}>
            {logs.map((log, i) => (
                <div key={i} className="mb-1">
                    <span className="opacity-50">[{new Date().toLocaleTimeString().split(' ')[0]}]</span> 
                    <span className="font-bold ml-2">{`>>`}</span> {log}
                </div>
            ))}
            <div className="animate-pulse">_</div>
        </div>
    );
};

// --- MODAL DE INSTALACIÓN DE CV (ULTIMATE GACHA EDITION - RESPONSIVE) ---
const CV_THEMES = [
    {
      id: 'dev',
      name: 'SENIOR_DEV.exe',
      color: 'text-green-400',
      border: 'border-green-500',
      bgGradient: 'from-green-900/90 to-black',
      barColor: 'bg-green-500',
      icon: <FaTerminal className="text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]" />,
    },
    {
      id: 'kratos',
      name: 'SPARTAN_PROTOCOL',
      color: 'text-red-500',
      border: 'border-red-600',
      bgGradient: 'from-red-950/90 to-black',
      barColor: 'bg-red-600',
      icon: <FaHammer className="text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse" />, 
    },
    {
      id: 'mario',
      name: 'MUSHROOM_KINGDOM_OS',
      color: 'text-yellow-400',
      border: 'border-blue-500',
      bgGradient: 'from-blue-900/90 to-black',
      barColor: 'bg-yellow-400',
      icon: <SiNintendoswitch className="text-6xl md:text-8xl text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-bounce" />,
    },
    {
      id: 'tlou',
      name: 'FIREFLY_NETWORK',
      color: 'text-lime-400',
      border: 'border-lime-600',
      bgGradient: 'from-stone-900/90 to-black',
      barColor: 'bg-lime-500',
      icon: <FaLeaf className="text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(163,230,53,0.8)]" />,
    },
    {
      id: 'cyber',
      name: 'NETRUNNER_V77',
      color: 'text-cyan-400',
      border: 'border-cyan-500',
      bgGradient: 'from-slate-900/90 to-black',
      barColor: 'bg-cyan-400',
      icon: <FaMicrochip className="text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-spin-slow" />,
    }
];

// El tema se sortea en el manejador del clic y llega por props, para no llamar
// a Math.random() durante el render.
const CVInstallerModal = ({ theme, onClose }) => {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const doneText = t.cv.done;
  const themeId = theme?.id;
  const commands = useMemo(() => (themeId ? t.cv.themes[themeId] : []), [themeId, t]);

  useEffect(() => {
    if (!theme) return;

    let value = 0;
    const timers = [];

    const interval = setInterval(() => {
      value = Math.min(100, value + 1.5);
      setProgress(value);

      if (value < 100) {
        if (Math.random() > 0.7) {
          setLogs(prev => [...prev, commands[Math.floor(Math.random() * commands.length)]]);
        }
        return;
      }

      clearInterval(interval);
      setLogs(prev => [...prev, doneText]);

      timers.push(setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/cv-cesar-neyra.pdf';
        link.download = 'CV_Cesar_Neyra_FullStack.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        timers.push(setTimeout(onClose, 2500));
      }, 800));
    }, 50);

    // Si el usuario cierra antes de acabar, no se dispara la descarga ni onClose.
    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [theme, onClose, commands, doneText]);

  if (!theme) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="force-dark fixed inset-0 z-[10002] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div 
         initial={{ scale: 0.8, rotateX: 10 }} 
         animate={{ scale: 1, rotateX: 0 }} 
         exit={{ scale: 0.8, opacity: 0 }}
         className={`w-full max-w-3xl h-auto md:h-[500px] bg-gradient-to-br ${theme.bgGradient} border-2 ${theme.border} rounded-xl overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative`}
         style={{ boxShadow: `0 0 40px ${theme.border.replace('border-', 'var(--tw-colors-')}` }}
      >
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden bg-black/30 min-h-[200px]">
            <div className="absolute inset-0 opacity-20 bg-noise"></div>
            
            <div className={`relative z-10 ${theme.color} mb-4 md:mb-6`}>
               {theme.icon}
            </div>
            
            <h3 className={`text-xl font-black ${theme.color} uppercase text-center tracking-widest`}>
                {theme.name}
            </h3>
            <p className="text-gray-500 text-xs text-center mt-2 font-mono">
                {t.cv.integrity}
            </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-col p-6 relative">
             <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                 <span className={`font-mono text-sm ${theme.color} font-bold flex items-center gap-2`}>
                    <FaTerminal /> INSTALL_WIZARD_V4
                 </span>
                 <button onClick={onClose} className="text-gray-500 hover:text-white"><FaTimes/></button>
             </div>

             <div className="flex-grow h-40 md:h-auto bg-black/50 rounded-lg p-4 mb-4 border border-white/5 font-mono text-xs text-gray-300 relative overflow-hidden">
                 <CodeTerminal logs={logs} colorClass={theme.color} />
             </div>

             <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold text-white uppercase">
                     <span>{t.cv.progress}</span>
                     <span>{Math.round(progress)}%</span>
                 </div>
                 <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/10">
                     <motion.div 
                        className={`h-full ${theme.barColor} relative`}
                        style={{ width: `${progress}%` }}
                     >
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] opacity-50"></div>
                     </motion.div>
                 </div>
             </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENTE GALERÍA INDEPENDIENTE (LIGHTBOX) ---
const GalleryModal = ({ images, onClose }) => {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  const next = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };
  const prev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="force-dark fixed inset-0 z-[10001] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl p-2 hover:text-red-500 transition-colors z-50"><FaTimes/></button>
      
      <div className="w-full h-full flex items-center justify-center relative p-4 md:p-10" onClick={(e) => e.stopPropagation()}>
         <AnimatePresence mode='wait'>
            <motion.img 
              key={index}
              src={images[index]}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              decoding="async"
              className="max-w-full max-h-full object-contain shadow-2xl"
              alt={`${t.projects.modal.galleryAlt} ${index + 1}/${images.length}`}
            />
         </AnimatePresence>

         {images.length > 1 && (
           <>
             <button onClick={prev} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all"><FaChevronLeft size={24}/></button>
             <button onClick={next} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all"><FaChevronRight size={24}/></button>
             
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white font-mono text-sm backdrop-blur-sm">
               {index + 1} / {images.length}
             </div>
           </>
         )}
      </div>
    </motion.div>
  );
};

// --- MODAL PRINCIPAL DE PROYECTO (INFO) ---
const ProjectModal = ({ project, onClose }) => {
    const { t } = useI18n();
    const [viewMode, setViewMode] = useState('business');
    const [showGallery, setShowGallery] = useState(false);

    if (!project) return null;

    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                    className="bg-surface-deep border border-purple-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/50 transition-colors">
                        <FaTimes />
                    </button>

                    <div className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20 bg-noise"></div>
                        <div className="text-6xl md:text-7xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-500">
                          {project.icon}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col">
                        <div className="text-center mb-6">
                             <div className="flex justify-center items-center gap-2 mb-2">
                               <span className="bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full">{t.projects.filters[project.category]}</span>
                               {project.badge && <span className="bg-green-600/20 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><FaBolt/> {t.projects.badges[project.badge]}</span>}
                             </div>
                             <h3 className="text-3xl font-black text-ink leading-tight mb-1">{project.title}</h3>
                             <p className="text-ink-soft font-medium">{project.copy.subtitle}</p>
                        </div>

                        <div className="bg-veil/5 p-1 rounded-xl flex mb-6 border border-veil/10 relative">
                            <button 
                              onClick={() => setViewMode('business')}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all z-10 ${viewMode === 'business' ? 'text-white' : 'text-ink-soft hover:text-ink'}`}
                            >
                              <FaChartLine /> {t.projects.modal.tabBusiness}
                            </button>
                            <button 
                              onClick={() => setViewMode('tech')}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all z-10 ${viewMode === 'tech' ? 'text-white' : 'text-ink-soft hover:text-ink'}`}
                            >
                              <FaCode /> {t.projects.modal.tabTech}
                            </button>
                            <motion.div 
                              animate={{ x: viewMode === 'business' ? '0%' : '100%' }}
                              className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-purple-600 rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar min-h-[200px]">
                            <AnimatePresence mode='wait'>
                                {viewMode === 'business' ? (
                                    <motion.div 
                                      key="biz" 
                                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                      className="space-y-4"
                                    >
                                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                          <h4 className="text-red-400 font-bold text-sm mb-1">🔴 {t.projects.modal.problem}</h4>
                                          <p className="text-ink-soft text-sm leading-relaxed">{project.copy.problem}</p>
                                        </div>
                                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                                          <h4 className="text-green-400 font-bold text-sm mb-1">🟢 {t.projects.modal.solution}</h4>
                                          <p className="text-ink-soft text-sm leading-relaxed mb-2">{project.copy.solution}</p>
                                          <div className="mt-3 pt-3 border-t border-green-500/20">
                                             <p className="text-ink font-bold text-sm flex items-start gap-2"><FaStar className="text-yellow-400 mt-1 flex-shrink-0"/> {project.copy.impact}</p>
                                          </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                      key="tech"
                                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                      className="space-y-5"
                                    >
                                        <div>
                                          <h4 className="text-purple-300 font-bold text-sm mb-2 flex items-center gap-2"><FaLayerGroup/> {t.projects.modal.architecture}</h4>
                                          <p className="text-ink-soft text-sm bg-veil/5 p-3 rounded-lg border-l-2 border-purple-500">{project.copy.architecture}</p>
                                        </div>
                                        
                                        <div>
                                          <h4 className="text-cyan-300 font-bold text-sm mb-2 flex items-center gap-2"><FaDatabase/> {t.projects.modal.stack}</h4>
                                          <div className="flex flex-wrap gap-2 mb-3">
                                              {project.techStackIcons.map((icon, i) => (
                                                <span key={i} className="text-2xl text-ink-soft bg-veil/5 p-2 rounded-lg border border-veil/10">{icon}</span>
                                              ))}
                                          </div>
                                          <div className="grid grid-cols-2 gap-2">
                                            {project.stack.map((item, i) => (
                                              <div key={i} className="flex items-center gap-2 text-xs text-ink-soft font-mono bg-veil/5 px-2 py-1 rounded">
                                                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> {item}
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                                           <h4 className="text-blue-300 font-bold text-xs mb-1 uppercase flex items-center gap-2"><FaBrain/> {t.projects.modal.challenge}</h4>
                                           <p className="text-ink-soft text-xs">{project.copy.challenges}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 pt-6 border-t border-veil/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {project.gallery.length > 0 && (
                               <NeonButton onClick={() => setShowGallery(true)} primary={false} icon={<FaImages/>}>
                                 {t.projects.modal.gallery}
                               </NeonButton>
                             )}

                             {project.link !== "#" ? (
                                  <NeonButton href={project.link} className="justify-center" icon={<FaExternalLinkAlt/>}>{t.projects.modal.visit}</NeonButton>
                             ) : (
                                  <NeonButton href={SOCIAL_LINKS.whatsapp} className="justify-center" icon={<FaRocket/>}>{t.projects.modal.quote}</NeonButton>
                             )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* LIGHTBOX DE GALERÍA (ENCIMA DEL MODAL) */}
            <AnimatePresence>
               {showGallery && <GalleryModal images={project.gallery} onClose={() => setShowGallery(false)} />}
            </AnimatePresence>
        </>
    );
};

// --- NUEVO FORMULARIO DE CONTACTO (CORREGIDO INPUTS & GMAIL) ---
const ContactForm = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // idle -> sending -> (sent | mail | error)
  const [status, setStatus] = useState('idle');
  const [focusedField, setFocusedField] = useState(null);
  const timers = useRef([]);
  const isSubmitting = status === 'sending';

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const f = t.contact.form;
    const subject = fill(f.subject, { name: formData.name });

    // Con endpoint configurado el mensaje llega de verdad al buzón. Sin él,
    // seguimos abriendo el correo del visitante: es lo único posible sin
    // servidor, pero depende de que esa persona pulse enviar.
    if (CONTACT_ENDPOINT) {
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...formData, subject, _subject: subject }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }

    const body = `${f.bodyName}: ${formData.name}\n${f.bodyEmail}: ${formData.email}\n\n${f.bodyMessage}:\n${formData.message}`;
    const query = `su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&${query}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const timer = setTimeout(() => {
      // Si el navegador bloquea la ventana emergente, window.open devuelve null
      // y el mensaje se perdía en silencio. Ahí caemos al cliente de correo
      // del sistema, que no depende de tener sesión en Gmail.
      const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = mailtoUrl;
      setStatus('mail');
    }, 600);

    timers.current.push(timer);
  };

  const reset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClasses = "w-full bg-transparent border-none text-ink placeholder-transparent focus:outline-none focus:ring-0 peer relative z-10 pt-2";
  const labelClasses = "absolute left-0 top-1 text-xs text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-ink-faint peer-placeholder-shown:top-6 peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-400 flex items-center gap-2 pointer-events-none z-0";
  const containerClasses = (field) => `relative border-b border-veil/20 pt-6 pb-2 focus-within:border-purple-500 transition-all overflow-hidden group ${focusedField === field ? 'shadow-[0_4px_20px_-5px_rgba(168,85,247,0.5)]' : ''}`;

  if (status === 'sent' || status === 'mail' || status === 'error') {
    return <ContactSent status={status} onReset={reset} />;
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-surface/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-purple-500/20 w-full shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>
       <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/30 rounded-full blur-[80px] pointer-events-none animate-pulse delay-700"></div>

      <div className="space-y-6 relative z-10">
        <div className={containerClasses('name')} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}>
           <input 
             type="text" id="name" name="name" required placeholder={t.contact.form.name}
             value={formData.name} onChange={handleChange}
             className={inputClasses}
           />
           <label htmlFor="name" className={labelClasses}>
             <FaUser/> {t.contact.form.name}
           </label>
           <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
        </div>

        <div className={containerClasses('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}>
           <input 
             type="email" id="email" name="email" required placeholder={t.contact.form.email}
             value={formData.email} onChange={handleChange}
             className={inputClasses}
           />
           <label htmlFor="email" className={labelClasses}>
             <FaEnvelope/> {t.contact.form.email}
           </label>
           <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
        </div>

        <div className={containerClasses('message')} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}>
           <textarea 
             id="message" name="message" required rows="4" placeholder={t.contact.form.message}
             value={formData.message} onChange={handleChange}
             className={`${inputClasses} resize-none`}
           ></textarea>
           <label htmlFor="message" className={labelClasses}>
             <FaPen/> {t.contact.form.message}
           </label>
           <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <NeonButton className="w-full justify-center relative overflow-hidden group" disabled={isSubmitting} primary={true}>
          {isSubmitting ? (
             <span className="flex items-center gap-2"><FaCheckCircle className="animate-bounce text-green-300"/> {t.contact.form.sending}</span>
          ) : (
             <span className="flex items-center gap-2">{t.contact.form.send} <FaRegPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform animate-pulse"/></span>
          )}
        </NeonButton>
      </div>
    </motion.form>
  );
};

// Nunca afirmamos "mensaje enviado": lo único que sabemos es que hemos abierto
// el cliente de correo. Quien envía es el visitante.
// Tres desenlaces distintos, y cada uno dice la verdad: "enviado" solo cuando
// el servidor lo confirmó, "hemos abierto tu correo" cuando depende del
// visitante, y el error cuando falló.
const ContactSent = ({ status, onReset }) => {
  const { t } = useI18n();
  const f = t.contact.form;
  const failed = status === 'error';

  const heading = failed ? f.errorTitle : status === 'sent' ? f.sentTitle : f.okTitle;
  const body = failed ? f.errorBody : status === 'sent' ? f.sentBody : f.okBody;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      role={failed ? 'alert' : 'status'}
      className={`bg-surface/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border w-full relative overflow-hidden text-center ${
        failed
          ? 'border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.15)]'
          : 'border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.15)]'
      }`}
    >
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none ${failed ? 'bg-red-500/20' : 'bg-green-500/20'}`}></div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
          failed ? 'bg-red-500/15 border-red-500/30' : 'bg-green-500/15 border-green-500/30'
        }`}>
          {failed ? <FaTimes className="text-3xl text-red-400" /> : <FaCheckCircle className="text-3xl text-green-400" />}
        </div>
        <h3 className="text-2xl font-bold text-ink">{heading}</h3>
        <p className="text-ink-soft text-sm leading-relaxed max-w-sm">{body}</p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-sm underline underline-offset-4 break-all"
        >
          <FaEnvelope className="flex-shrink-0" /> {f.writeTo} {CONTACT_EMAIL}
        </a>

        <button
          onClick={onReset}
          className="mt-2 text-ink-faint hover:text-ink text-sm transition-colors underline underline-offset-4"
        >
          {f.again}
        </button>
      </div>
    </motion.div>
  );
};

// Clases completas (Tailwind no puede resolver `bg-${color}-600/20` en runtime).
const CARD_COLORS = {
    purple:  { glow: "bg-purple-600/20",  hover: "group-hover:bg-purple-500/30",  card: "" },
    indigo:  { glow: "bg-indigo-600/20",  hover: "group-hover:bg-indigo-500/30",  card: "hover:bg-indigo-900/20" },
    fuchsia: { glow: "bg-fuchsia-600/20", hover: "group-hover:bg-fuchsia-500/30", card: "hover:bg-fuchsia-900/20" },
    cyan:    { glow: "bg-cyan-600/20",    hover: "group-hover:bg-cyan-500/30",    card: "hover:bg-cyan-900/20" },
};

const Card = ({ children, className = "", color = "purple", onClick }) => {
    const c = CARD_COLORS[color] || CARD_COLORS.purple;

    return (
        <div className="h-full" onClick={onClick}>
            <div className={`bg-surface/60 backdrop-blur-xl border border-veil/10 p-6 rounded-3xl relative overflow-hidden group flex flex-col h-full shadow-2xl transition-all duration-300 cursor-pointer ${className} ${c.hover} ${c.card}`}>
                <div className={`absolute -right-10 -top-10 w-32 h-32 ${c.glow} rounded-full blur-3xl transition-colors pointer-events-none ${c.hover}`}></div>
                <div className="relative z-10 flex flex-col h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

const TypewriterText = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Todo cambio de estado ocurre dentro del timeout, nunca en el cuerpo del
  // efecto (evita renders en cascada).
  useEffect(() => {
    const current = texts[index] ?? "";

    if (!reverse && subIndex >= current.length) {
      const t = setTimeout(() => setReverse(true), 1000);
      return () => clearTimeout(t);
    }
    if (reverse && subIndex === 0) {
      const t = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, texts]);

  useEffect(() => {
    const timeout2 = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(timeout2);
  }, []);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-mono min-h-[1.5em] inline-block font-bold">
      {texts[index].substring(0, subIndex)}
      <span className={`text-ink ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
};

// Partículas precalculadas a nivel de módulo: nada de Math.random() ni window
// durante el render (impuro y rompe con renderizado concurrente).
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
    // Secuencia de baja discrepancia: reparte sin agrupar y es determinista.
    const frac = (n) => (i * n) % 1;
    return {
        left: frac(0.6180339887) * 100,
        top: frac(0.7548776662) * 100,
        opacity: 0.1 + frac(0.4142135624) * 0.5,
        drift: -40 - frac(0.3027756377) * 60,
        duration: 10 + frac(0.5436890127) * 10,
    };
});

const BackgroundParticles = () => (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
            <motion.div
                key={i}
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
                initial={{ y: 0, opacity: p.opacity }}
                animate={{ y: p.drift, opacity: 0 }}
                transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
                className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
        ))}
    </div>
);

const ScrollToTopButton = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setShowButton(latest > 0.1);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none"
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- ASISTENTE IA MEJORADO (MODERNO Y ANIMADO) ---
const TypingIndicator = () => (
  <div className="flex gap-1 px-3 py-2.5 bg-veil/10 rounded-2xl rounded-tl-sm w-fit">
    {[0, 0.15, 0.3].map((delay) => (
      <motion.span
        key={delay}
        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.9, repeat: Infinity, delay }}
        className="w-1.5 h-1.5 bg-purple-400 rounded-full"
      />
    ))}
  </div>
);

// Panel de contacto rápido. Antes imitaba un chat con IA ("NeyraBot AI",
// "Online & Ready") pero no tenía dónde escribir: parecía roto. Ahora el campo
// de texto funciona de verdad — abre WhatsApp con el mensaje ya redactado — y
// el encabezado dice lo que realmente pasa.
const SmartAssistant = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, showTyping]);

  // Saludo por pasos, con los cambios de estado dentro de los temporizadores.
  useEffect(() => {
    if (!open || messages.length > 0) return;
    const timers = [];
    timers.push(setTimeout(() => {
      setMessages([{ from: "bot", text: t.chat.greeting1 }]);
      timers.push(setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: t.chat.greeting2 }]);
        setShowTyping(false);
        inputRef.current?.focus();
      }, 700));
    }, 500));
    return () => timers.forEach(clearTimeout);
  }, [open, messages.length, t]);

  // Escape cierra el panel; es lo que espera cualquiera que use teclado.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleOpen = () => {
    if (!open && messages.length === 0) setShowTyping(true);
    setOpen(!open);
  };

  const sendDraft = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "me", text }, { from: "note", text: t.chat.sentNote }]);
    setDraft("");
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const quickActions = [
    { icon: <FaLaptopCode />, text: t.chat.actions.services, onClick: () => goTo("servicios") },
    { icon: <FaStar />, text: t.chat.actions.experience, onClick: () => goTo("proyectos") },
    { icon: <FaRocket />, text: t.chat.actions.pricing, onClick: () => goTo("planes") },
    { icon: <FaWhatsapp />, text: t.chat.actions.quote, link: SOCIAL_LINKS.whatsapp },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[99999]">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label={t.chat.title}
            // La entrada no toca la opacidad: si la animación no corre, el
            // panel se ve igual en vez de quedarse invisible.
            initial={{ y: 14, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{ transformOrigin: "bottom left" }}
            className="absolute bottom-[4.5rem] left-0 w-[min(92vw,22rem)] bg-surface/95 backdrop-blur-2xl border border-veil/10 rounded-3xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(88,28,135,0.55)] flex flex-col"
          >
            {/* Cabecera */}
            <div className="flex items-center gap-3 p-4 border-b border-veil/10">
              <div className="relative flex-shrink-0">
                <img src="/mi-foto.webp" alt="César Neyra" width="44" height="44" loading="lazy" decoding="async" className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/40" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full"></span>
              </div>
              <div className="min-w-0 flex-grow">
                <h4 className="font-bold text-ink text-sm leading-tight truncate">{t.chat.title}</h4>
                <p className="text-[11px] text-ink-soft truncate">{t.chat.subtitle}</p>
              </div>
              <button
                onClick={toggleOpen}
                aria-label={t.projects.modal.close}
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-ink-soft hover:text-ink hover:bg-veil/10 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Conversación */}
            <div className="px-4 py-4 max-h-64 overflow-y-auto flex flex-col gap-2.5 custom-scrollbar">
              {messages.map((msg, i) => {
                if (msg.from === "note") {
                  return (
                    <p key={i} className="text-[11px] text-ink-faint leading-relaxed text-center px-2 py-1">
                      {msg.text}
                    </p>
                  );
                }
                const mine = msg.from === "me";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      mine
                        ? "bg-purple-600 text-white rounded-br-sm self-end"
                        : "bg-veil/10 text-ink rounded-tl-sm self-start"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                );
              })}
              {showTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Accesos rápidos */}
            <div className="px-4 pb-3">
              <p className="text-[10px] text-ink-soft font-bold uppercase tracking-wider mb-2">{t.chat.suggestions}</p>
              <div className="flex flex-wrap gap-1.5">
                {quickActions.map((qa, i) => {
                  const cls = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-veil/5 hover:bg-purple-500/15 border border-veil/10 hover:border-purple-500/40 text-xs text-ink-soft hover:text-ink transition-colors";
                  return qa.link ? (
                    <a key={i} href={qa.link} target="_blank" rel="noreferrer" className={cls}>
                      <span className="text-purple-400">{qa.icon}</span> {qa.text}
                    </a>
                  ) : (
                    <button key={i} onClick={qa.onClick} className={cls}>
                      <span className="text-purple-400">{qa.icon}</span> {qa.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Escribir: el texto se envía por WhatsApp, no se queda en el aire */}
            <form onSubmit={sendDraft} className="flex items-center gap-2 p-3 border-t border-veil/10 bg-veil/5">
              <label htmlFor="chat-draft" className="sr-only">{t.chat.inputPlaceholder}</label>
              <input
                id="chat-draft"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.chat.inputPlaceholder}
                className="flex-grow min-w-0 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none px-2 py-1.5"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label={t.chat.send}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-600 text-white transition-all hover:bg-purple-500 disabled:opacity-40 disabled:pointer-events-none"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleOpen}
        aria-label={t.chat.title}
        aria-expanded={open}
        className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-colors shadow-[0_8px_30px_-6px_rgba(147,51,234,0.7)] ${
          open ? "bg-surface text-purple-500 border border-veil/15" : "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
        }`}
      >
        {open ? <FaTimes className="text-lg" /> : <FaCommentDots className="text-2xl" />}
        {!open && <span className="absolute inset-0 rounded-full border border-purple-400/40 animate-ping"></span>}
      </motion.button>
    </div>
  );
};

// --- SECCIÓN DE TESTIMONIOS (MARQUEE ANIMADO) ---
const TestimonialCard = ({ person, copy }) => {
  const a = TESTIMONIAL_ACCENT[person.color] ?? TESTIMONIAL_ACCENT.purple;
  return (
  <div className={`relative w-[340px] md:w-[400px] flex-shrink-0 bg-surface/80 backdrop-blur-xl border border-veil/10 rounded-3xl p-6 mx-4 overflow-hidden group ${a.border} transition-colors duration-300`}>
    <div className={`absolute -top-16 -right-16 w-40 h-40 ${a.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
    <FaCommentDots className={`text-3xl ${a.quote} mb-4`} />
    <p className="text-ink-soft text-sm leading-relaxed mb-6 relative z-10">"{copy.text}"</p>
    <div className="flex items-center gap-3 relative z-10">
      <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${a.avatar} to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-lg flex-shrink-0`}>
        {person.initials}
      </div>
      <div className="min-w-0">
        <h5 className="text-ink font-bold text-sm truncate">{person.name}</h5>
        <p className="text-ink-faint text-xs truncate">{copy.role}</p>
      </div>
      <div className="ml-auto flex gap-0.5 text-yellow-400 text-xs">
        {[...Array(person.rating)].map((_, i) => <FaStar key={i} />)}
      </div>
    </div>
  </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useI18n();
  const half = Math.ceil(TESTIMONIALS_META.length / 2);
  const rowA = TESTIMONIALS_META.slice(0, half);
  const rowB = TESTIMONIALS_META.slice(half);

  return (
    <section id="testimonios" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-14 relative z-10">
        <div className="text-center">
          <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{t.testimonials.label}</span>
          <h4 className="text-4xl md:text-5xl font-bold mt-4">{t.testimonials.heading}</h4>
          <p className="text-ink-soft mt-4 max-w-2xl mx-auto">{t.testimonials.sub}</p>
        </div>
      </div>

      {/* Difuminado en los bordes */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-page to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-page to-transparent z-20 pointer-events-none"></div>

      <div className="marquee-pause space-y-6 relative z-10">
        {/* Fila 1 */}
        <div className="flex w-max animate-marquee">
          {[...rowA, ...rowA].map((person, i) => <TestimonialCard key={`a-${i}`} person={person} copy={t.testimonials.items[person.key]} />)}
        </div>
        {/* Fila 2 (sentido opuesto) */}
        <div className="flex w-max animate-marquee-reverse">
          {[...rowB, ...rowB].map((person, i) => <TestimonialCard key={`b-${i}`} person={person} copy={t.testimonials.items[person.key]} />)}
        </div>
      </div>
    </section>
  );
};

// --- SECCIÓN DE PRECIOS DINÁMICA ---
const PricingSection = () => {
    const { t } = useI18n();
    const { currency } = useCurrency();
    // Guardamos solo la clave: al cambiar de idioma la vista sigue siendo válida.
    const [selectedKey, setSelectedKey] = useState(null);
    const selectedCategory = selectedKey ? PRICING_META.find(p => p.key === selectedKey) : null;
    const selectedCopy = selectedKey ? t.pricing.categories[selectedKey] : null;

    // Los mensajes de WhatsApp llevan el precio ya convertido a la moneda del visitante.
    const quoteLink = (msg, price) =>
        `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(fill(msg, { price: formatPrice(price, currency) }))}`;

    return (
        <section id="planes" className="py-24 px-6 relative min-h-screen flex flex-col justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="text-center mb-16">
                   <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{t.pricing.label}</span>
                   <h4 className="text-4xl md:text-5xl font-bold mt-4">
                       {selectedCopy ? fill(t.pricing.headingDetail, { category: selectedCopy.title }) : t.pricing.heading}
                   </h4>
                   <p className="text-ink-soft mt-4 max-w-2xl mx-auto">
                       {selectedCopy ? t.pricing.subDetail : t.pricing.sub}
                   </p>
                   <div className="mt-6 flex justify-center">
                       <CurrencySwitcher />
                   </div>
                </div>

                <AnimatePresence mode="wait">
                    {!selectedCategory ? (
                        /* VISTA 1: CATEGORÍAS PRINCIPALES */
                        <motion.div
                            key="main-categories"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                        >
                            {PRICING_META.map((plan) => {
                              const copy = t.pricing.categories[plan.key];
                              const a = PLAN_ACCENT[plan.color] ?? PLAN_ACCENT.purple;
                              return (
                                <motion.div
                                    key={plan.key}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className={`relative h-full group ${plan.popular ? 'md:-mt-8 md:mb-8' : ''}`}
                                >
                                    {plan.popular && <div className={`absolute inset-0 ${a.glow} blur-2xl rounded-3xl animate-pulse`}></div>}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${a.grad} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                                    <div className={`h-full bg-surface/80 backdrop-blur-xl border ${plan.popular ? `${a.border} shadow-[0_0_30px_rgba(168,85,247,0.3)]` : 'border-veil/10'} p-8 rounded-3xl relative overflow-hidden flex flex-col transition-colors`}>
                                        {plan.popular && (
                                            <div className={`absolute top-0 right-0 ${a.badge} text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-lg uppercase tracking-widest animate-pulse`}>
                                                {t.pricing.popular}
                                            </div>
                                        )}
                                        <h3 className={`text-2xl font-bold ${a.title} mb-1`}>{copy.title}</h3>
                                        <p className="text-ink-soft text-sm mb-6">{copy.subtitle}</p>
                                        <div className="mb-6 border-b border-veil/10 pb-6">
                                            <span className="block text-sm text-ink-faint font-bold uppercase tracking-wider">{t.pricing.from}</span>
                                            <span className="block text-4xl md:text-5xl font-black text-ink tracking-tighter mt-1 break-words">{formatPrice(plan.price, currency)}</span>
                                        </div>
                                        <p className="text-ink-soft text-sm mb-8 leading-relaxed h-16">{copy.description}</p>
                                        <ul className="space-y-4 mb-8 flex-grow">
                                            {copy.features.map((feat, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                                                    <FaCheck className={`${a.check} mt-1 flex-shrink-0 group-hover:scale-125 transition-transform`} />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <NeonButton
                                            onClick={() => setSelectedKey(plan.key)}
                                            primary={plan.popular}
                                            className="w-full justify-center mt-auto"
                                            icon={<FaEye/>}
                                        >
                                            {copy.actionText}
                                        </NeonButton>
                                    </div>
                                </motion.div>
                              );
                            })}
                        </motion.div>
                    ) : (
                        /* VISTA 2: SUB-NIVELES (TIERS) */
                        <motion.div
                            key="detail-tiers"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            <button
                                onClick={() => setSelectedKey(null)}
                                className="text-ink-soft hover:text-ink flex items-center gap-2 mb-8 transition-colors group px-4 py-2 bg-veil/5 rounded-full border border-veil/10 mx-auto md:mx-0"
                            >
                                <FaChevronLeft className="group-hover:-translate-x-1 transition-transform"/> {t.pricing.back}
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                {selectedCategory.tiers.map((tier) => {
                                  const tierCopy = t.pricing.tiers[tier.key];
                                  const ta = PLAN_ACCENT[tier.color] ?? PLAN_ACCENT.purple;
                                  return (
                                    <motion.div
                                        key={tier.key}
                                        whileHover={{ scale: 1.05, y: -10 }}
                                        className={`relative h-full group ${tier.popular ? 'md:-mt-8 md:mb-8' : ''}`}
                                    >
                                        {tier.popular && <div className={`absolute inset-0 ${ta.glow} blur-2xl rounded-3xl animate-pulse`}></div>}
                                        <div className={`absolute inset-0 bg-gradient-to-b ${ta.grad} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                                        <div className={`h-full bg-surface/80 backdrop-blur-xl border ${tier.popular ? `${ta.border} shadow-[0_0_30px_rgba(168,85,247,0.3)]` : 'border-veil/10'} p-8 rounded-3xl relative overflow-hidden flex flex-col transition-colors`}>
                                            {tier.popular && (
                                                <div className={`absolute top-0 right-0 ${ta.badge} text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-lg uppercase tracking-widest animate-pulse`}>
                                                    {t.pricing.recommended}
                                                </div>
                                            )}
                                            <h3 className={`text-2xl font-bold ${ta.title} mb-1`}>{tierCopy.title}</h3>
                                            <p className="text-ink-soft text-sm mb-6">{tierCopy.subtitle}</p>
                                            <div className="mb-6 border-b border-veil/10 pb-6">
                                                <span className="block text-4xl md:text-5xl font-black text-ink tracking-tighter break-words">{formatPrice(tier.price, currency)}</span>
                                            </div>
                                            <p className="text-ink-soft text-sm mb-8 leading-relaxed h-16">{tierCopy.description}</p>
                                            <ul className="space-y-4 mb-8 flex-grow">
                                                {tierCopy.features.map((feat, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                                                        <FaCheck className={`${ta.check} mt-1 flex-shrink-0 group-hover:scale-125 transition-transform`} />
                                                        <span>{feat}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <NeonButton
                                                href={quoteLink(tierCopy.whatsappMsg, tier.price)}
                                                primary={tier.popular}
                                                className="w-full justify-center mt-auto"
                                                icon={<FaWhatsapp/>}
                                            >
                                                {t.pricing.quote}
                                            </NeonButton>
                                        </div>
                                    </motion.div>
                                  );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {currency !== "PEN" && (
                    <p className="text-ink-faint text-xs text-center max-w-2xl mx-auto mt-10 leading-relaxed">
                        {t.pricing.approxNote}
                    </p>
                )}
            </div>
        </section>
    );
};

// --- SELECTOR DE IDIOMA ---

// Los id de sección son fijos: no se traducen ni cambian con el idioma.
const SECTION_IDS = ['servicios', 'proyectos', 'testimonios', 'planes', 'trayectoria', 'contacto'];

// Conservamos el índice original para no desalinear las etiquetas de t.nav.links
// cuando alguna sección está oculta.
const NAV_SECTIONS = SECTION_IDS
  .map((id, i) => ({ id, i }))
  .filter(({ id }) => SHOW_TESTIMONIALS || id !== 'testimonios');

const LanguageSwitcher = ({ className = "" }) => {
  const { lang, t, changeLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cierra al hacer clic fuera o con Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.lang.switcherAria}
        aria-expanded={open}
        className="flex items-center gap-2 bg-veil/5 hover:bg-veil/10 border border-veil/10 hover:border-purple-500/40 px-3 py-2 rounded-full text-sm font-bold transition-all"
      >
        <Flag code={lang} className="w-5 h-3.5" />
        <span className="uppercase tracking-wider">{lang}</span>
        <FaChevronDown className={`text-[10px] text-ink/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 max-h-[60vh] overflow-y-auto custom-scrollbar bg-surface/95 backdrop-blur-xl border border-purple-500/25 rounded-2xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] p-1.5 z-50"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => { changeLang(l.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                    l.code === lang ? 'bg-purple-600/25 text-ink' : 'text-ink-soft hover:bg-veil/5 hover:text-ink'
                  }`}
                >
                  <Flag code={l.code} className="w-5 h-3.5" />
                  <span className="flex-grow truncate">{l.native}</span>
                  {l.code === lang && <FaCheck className="text-purple-400 text-xs flex-shrink-0" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <span className="sr-only">{current?.native}</span>
    </div>
  );
};

const ThemeToggle = ({ className = "" }) => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const { toggleTheme } = useTheme();
  const goingLight = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={goingLight ? t.theme.toLight : t.theme.toDark}
      title={goingLight ? t.theme.toLight : t.theme.toDark}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full bg-veil/5 hover:bg-veil/10 border border-veil/10 hover:border-purple-500/40 transition-all ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {goingLight ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-purple-400 text-lg" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

// Los precios base están en soles; esto solo cambia cómo se muestran.
const CurrencySwitcher = () => {
  const { t } = useI18n();
  const { currency, changeCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center gap-2 bg-veil/5 border border-veil/10 rounded-full px-2 py-1.5">
      <FaCoins className="text-purple-400 ml-1.5 flex-shrink-0" aria-hidden="true" />
      <label htmlFor="currency" className="sr-only">{t.currency.switcherAria}</label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => changeCurrency(e.target.value)}
        aria-label={t.currency.switcherAria}
        className="bg-transparent text-ink text-sm font-bold pr-1 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded cursor-pointer"
      >
        {Object.keys(CURRENCIES).map((code) => (
          <option key={code} value={code} className="bg-surface text-ink">
            {code}
          </option>
        ))}
      </select>
    </div>
  );
};

// Se muestra solo en la primera visita (después, la elección vive en localStorage).
const LanguageModal = ({ onClose }) => {
  const { lang, t, changeLang } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100001] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-lg bg-surface/95 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_-15px_rgba(168,85,247,0.6)] relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <FaGlobe className="text-2xl text-purple-400" />
            <h2 className="text-2xl md:text-3xl font-black text-ink">{t.lang.modalTitle}</h2>
          </div>
          <p className="text-ink-soft text-sm mb-6">{t.lang.modalSubtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 max-h-[45vh] overflow-y-auto custom-scrollbar pr-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                aria-pressed={l.code === lang}
                className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-left transition-all ${
                  l.code === lang
                    ? 'bg-purple-600/25 border-purple-500 text-ink shadow-[0_0_20px_-5px_rgba(168,85,247,0.6)]'
                    : 'bg-veil/5 border-veil/10 text-ink-soft hover:border-veil/30 hover:bg-veil/10'
                }`}
              >
                <Flag code={l.code} className="w-7 h-5" />
                <span className="min-w-0 flex-grow">
                  <span className="block font-bold text-sm truncate">{l.native}</span>
                  {/* La etiqueta va en el idioma que propuso el navegador, no en
                      el seleccionado: antes saltaba a cualquier opción pulsada. */}
                  {l.code === DETECTED_LANG && (
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-purple-400 leading-tight">
                      {t.lang.detected}
                    </span>
                  )}
                </span>
                {l.code === lang && <FaCheck className="text-purple-400 text-xs shrink-0" />}
              </button>
            ))}
          </div>

          <NeonButton onClick={onClose} icon={<FaCheck />} className="w-full justify-center">
            {t.lang.confirm}
          </NeonButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MENÚ MÓVIL (FULLSCREEN, FUERA DEL NAV) ---
const MobileMenu = ({ open, onClose, onNavigate }) => {
  const { t } = useI18n();

  // Bloquea scroll del body mientras el menú está abierto
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100000] md:hidden flex flex-col bg-page/95 backdrop-blur-2xl overflow-hidden"
        >
          {/* Blobs de fondo */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/25 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Cabecera */}
          <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-veil/10">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-purple-500/50">
                <img src="/mi-foto.webp" alt="César Neyra" width="36" height="36" decoding="async" className="w-full h-full object-cover" />
              </div>
              <span>NeyraDev</span>
            </div>
            <button aria-label={t.nav.closeMenu} onClick={onClose} className="w-11 h-11 flex items-center justify-center rounded-full bg-veil/5 border border-veil/10 text-ink/70 hover:text-ink hover:bg-veil/10 transition-colors">
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Items */}
          <nav className="relative z-10 flex-grow flex flex-col justify-center px-6 gap-1">
            {NAV_SECTIONS.map(({ id, i }, index) => (
              <motion.button
                key={id}
                onClick={() => onNavigate(id)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + index * 0.06 }}
                className="group flex items-center justify-between py-4 border-b border-veil/5 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-purple-500/70 w-6">0{index + 1}</span>
                  <span className="text-3xl font-black text-ink group-hover:text-purple-400 group-active:text-purple-400 transition-colors">{t.nav.links[i]}</span>
                </span>
                <FaChevronRight className="text-ink/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </nav>

          {/* Footer: CTA + redes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 px-6 pb-10 pt-4 space-y-6"
          >
            <div className="flex justify-center items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-colors"
            >
              <FaWhatsapp className="text-xl" /> {t.nav.whatsappCta}
            </a>
            <div className="flex justify-center gap-8">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-3xl text-ink-soft hover:text-ink transition-colors"><FaGithub /></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-3xl text-ink-soft hover:text-blue-500 transition-colors"><FaLinkedin /></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-3xl text-ink-soft hover:text-pink-500 transition-colors"><FaInstagram /></a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- APP PRINCIPAL ---
function App() {
  const { t, lang } = useI18n();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvTheme, setCvTheme] = useState(null);
  const [showSplash, setShowSplash] = useState(SHOULD_SHOW_SPLASH);
  // Solo en la primera visita: si ya hay idioma guardado, no se pregunta.
  const [showLangModal, setShowLangModal] = useState(!HAS_CHOSEN_LANG);
  const closeSplash = useCallback(() => setShowSplash(false), []);
  const openCVModal = () => setCvTheme(CV_THEMES[Math.floor(Math.random() * CV_THEMES.length)]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("todos");

  const blockScroll = showSplash || showLangModal;
  useEffect(() => {
    document.body.style.overflow = blockScroll ? 'hidden' : 'auto';
  }, [blockScroll]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const isRuag = (p) => p.ruag || p.title.toLowerCase().startsWith("ruag");
  const filteredProjects = (activeFilter === "todos"
    ? PROJECTS_META
    : PROJECTS_META.filter(p => p.category === activeFilter)
  )
    // Todo lo de Ruag primero (orden estable dentro de cada grupo)
    .slice()
    .sort((a, b) => (isRuag(b) ? 1 : 0) - (isRuag(a) ? 1 : 0));

  // Une la ficha del proyecto (iconos, imágenes) con sus textos del idioma activo.
  const withCopy = (project) => ({ ...project, copy: t.projects.items[project.key] });

  return (
    <div className="relative min-h-screen bg-page text-ink font-sans selection:bg-purple-500 selection:text-ink overflow-x-hidden">
      
      {/* Pantalla de entrada. Sin AnimatePresence a propósito: se desmonta por
          temporizador, no al terminar una animación de salida. Si esa animación
          se quedase a medias, taparía la web entera. */}
      {showSplash && <SplashScreen onComplete={closeSplash} />}

      {/* Elección de idioma: solo la primera visita, y después del splash */}
      <AnimatePresence>
        {!showSplash && showLangModal && <LanguageModal onClose={() => setShowLangModal(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <ScrollToTopButton />
      <SmartAssistant />
      
      <AnimatePresence>
        {selectedProject && <ProjectModal project={withCopy(selectedProject)} onClose={() => setSelectedProject(null)} />}
        {cvTheme && <CVInstallerModal theme={cvTheme} onClose={() => setCvTheme(null)} />}
      </AnimatePresence>

      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 origin-left z-[100] shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
      
      <div className="fixed inset-0 z-0 bg-noise opacity-20 brightness-100 contrast-150"></div>
      <motion.div style={{ x: mouseX, y: mouseY }} className="pointer-glow fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] z-[-1] pointer-events-none"/>
      <BackgroundParticles />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-page/80 border-b border-veil/5">
        <motion.div 
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="text-xl md:text-2xl font-bold flex items-center gap-2 cursor-pointer z-50 group"
          onClick={() => scrollToSection('hero')}
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:rotate-12 transition-transform border-2 border-purple-500/50">
             <img src="/mi-foto.webp" alt="César Neyra" width="40" height="40" decoding="async" className="w-full h-full object-cover"/>
          </div>
          <span className="tracking-tight group-hover:text-purple-400 transition-colors">NeyraDev</span>
        </motion.div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-ink-soft">
          {NAV_SECTIONS.map(({ id, i }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="hover:text-purple-400 transition-colors relative group">
              {t.nav.links[i]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {[
              { icon: FaGithub, link: SOCIAL_LINKS.github },
              { icon: FaLinkedin, link: SOCIAL_LINKS.linkedin },
              { icon: FaInstagram, link: SOCIAL_LINKS.instagram }
          ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noreferrer" className="hover:text-purple-400 hover:-translate-y-1 transition-all text-xl"><item.icon/></a>
          ))}
          
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-veil/5 hover:bg-green-600/20 hover:text-green-400 border border-veil/10 px-4 py-2 rounded-full text-sm font-bold transition-all ml-2 group">
             <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform"/> 
             <span className="hidden lg:inline">{t.nav.chat}</span>
          </a>
        </div>

        <ThemeToggle className="hidden md:flex ml-2" />
        <LanguageSwitcher className="hidden md:block" />

        <ThemeToggle className="md:hidden" />

        <button aria-label={t.nav.openMenu} className="md:hidden z-[99999] p-2 relative cursor-pointer text-ink" onClick={() => setMenuOpen(true)}>
            <FaBars className="text-2xl relative z-[99999]"/>
        </button>
      </nav>

      {/* --- MENÚ MÓVIL (fuera del nav: fixed relativo al viewport) --- */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={scrollToSection} />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20 overflow-hidden">
        
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-pink-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        <motion.div 
            // Antes arrancaba en scale 0 con giro de 180°: si la animación no
            // llegaba a ejecutarse, la foto quedaba invisible. Es lo primero
            // que se ve de la página, así que ahora el estado inicial ya es
            // legible y la animación solo la remata.
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1.1, bounce: 0.35 }}
            className="mb-8 relative"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-50 rounded-full"></div>
           <div className="relative z-10 p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
               <img
                src="/mi-foto.webp"
                alt="César Neyra"
                width="160"
                height="160"
                fetchPriority="high"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-page shadow-2xl object-cover"
               />
           </div>
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="absolute -bottom-2 -right-2 bg-green-500 text-[#030014] text-xs font-bold px-3 py-1 rounded-full border-4 border-page z-20"
           >
             {t.hero.badge}
           </motion.div>
        </motion.div>

        <h2 className="text-lg md:text-2xl text-ink-soft font-medium mb-6 flex justify-center items-center gap-2 bg-veil/5 px-6 py-2 rounded-full border border-veil/5 backdrop-blur-sm">
          <span>{t.hero.greeting}</span>
          <TypewriterText key={lang} texts={t.hero.roles} />
        </h2>

        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight relative z-10">
          {t.hero.titleLine} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            {t.hero.titleAccent}
          </span>
        </h1>

        <p className="max-w-2xl text-ink-soft text-base md:text-xl mb-10 leading-relaxed px-4">
          {t.hero.desc} <br className="hidden md:block"/>
          {t.hero.specialtiesIntro}{" "}
          <span className="text-purple-400 font-bold">{t.hero.specialties[0]}</span>,{" "}
          <span className="text-cyan-400 font-bold">{t.hero.specialties[1]}</span>,{" "}
          <span className="text-pink-400 font-bold">{t.hero.specialties[2]}</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6 z-10">
          <NeonButton onClick={openCVModal} icon={<FaDownload/>}>{t.hero.ctaCV}</NeonButton>
          <NeonButton onClick={() => scrollToSection('proyectos')} primary={false} icon={<FaExternalLinkAlt/>}>{t.hero.ctaPortfolio}</NeonButton>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-veil/10 pt-8">
            <div className="text-center">
                <div className="text-3xl font-black text-ink flex justify-center"><Counter from={0} to={3}/>+</div>
                <div className="text-xs text-ink-faint uppercase tracking-widest">{t.hero.stats.years}</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-black text-ink flex justify-center"><Counter from={0} to={15}/>+</div>
                <div className="text-xs text-ink-faint uppercase tracking-widest">{t.hero.stats.projects}</div>
            </div>
            <div className="text-center hidden md:block">
                <div className="text-3xl font-black text-ink flex justify-center">100%</div>
                <div className="text-xs text-ink-faint uppercase tracking-widest">{t.hero.stats.clients}</div>
            </div>
        </div>
      </section>

      {/* --- TECH STACK (Infinito) --- */}
      <section className="py-10 bg-gradient-to-r from-page via-purple-500/5 to-page border-y border-purple-500/20 overflow-hidden relative">
         <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-page to-transparent z-10"></div>
         <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-page to-transparent z-10"></div>
         
         <motion.div 
           animate={{ x: [0, -1000] }}
           transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
           className="flex gap-16 w-max text-ink-soft opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 px-4"
         >
            {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                    <FaReact className="text-5xl hover:text-cyan-400 hover:scale-110 transition-transform" title="React"/>
                    <SiNextdotjs className="text-5xl hover:text-ink hover:scale-110 transition-transform" title="Next.js"/>
                    <SiTypescript className="text-5xl hover:text-blue-500 hover:scale-110 transition-transform" title="TypeScript"/>
                    <SiSupabase className="text-5xl hover:text-green-400 hover:scale-110 transition-transform" title="Supabase"/>
                    <FaNodeJs className="text-5xl hover:text-green-500 hover:scale-110 transition-transform" title="Node.js"/>
                    <SiKotlin className="text-5xl hover:text-purple-500 hover:scale-110 transition-transform" title="Kotlin"/>
                    <FaAndroid className="text-5xl hover:text-green-400 hover:scale-110 transition-transform" title="Android"/>
                    <SiPostgresql className="text-5xl hover:text-blue-400 hover:scale-110 transition-transform" title="PostgreSQL"/>
                    <SiFirebase className="text-5xl hover:text-yellow-400 hover:scale-110 transition-transform" title="Firebase"/>
                    <SiFigma className="text-5xl hover:text-pink-400 hover:scale-110 transition-transform" title="Figma"/>
                    <SiTailwindcss className="text-5xl hover:text-cyan-500 hover:scale-110 transition-transform" title="Tailwind"/>
                </React.Fragment>
            ))}
         </motion.div>
      </section>

      {/* --- SERVICIOS CON GLOSARIO --- */}
      <section id="servicios" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
           <div className="mb-16 text-center">
              <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{t.services.label}</span>
              <h4 className="text-4xl md:text-5xl font-bold mt-4">{t.services.heading}</h4>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES_META.map((service) => {
                const copy = t.services.items[service.key];
                return (
                <Card key={service.key} color={service.color}>
                  <div className={`w-14 h-14 bg-${service.color}-500/20 text-${service.color}-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-${service.color}-500/10`}>
                    {service.icon}
                  </div>
                  <h5 className="text-2xl font-bold mb-3">{copy.title}</h5>
                  
                  {/* Descripción Dual */}
                  <div className="space-y-4 mb-6">
                      <p className="text-ink text-base leading-relaxed">{copy.descSimple}</p>
                      <p className="text-ink-soft text-xs font-mono border-l-2 border-veil/20 pl-3 italic">
                         <span className="font-bold text-ink-soft not-italic">{t.services.techSpec}</span> {copy.descTech}
                      </p>
                  </div>
                  
                  {/* Business Value Highlight */}
                  <div className="bg-veil/5 border-l-2 border-purple-500 p-3 mb-6 rounded-r-lg">
                    <p className="text-xs text-purple-200 font-medium italic">"{copy.businessValue}"</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-veil/5 flex gap-2 flex-wrap">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-veil/5 px-2 py-1 rounded">{tag}</span>
                      ))}
                  </div>
                </Card>
                );
              })}
           </div>
        </div>
      </section>

      {/* --- PROYECTOS (GALERÍA AVANZADA) --- */}
      <section id="proyectos" className="py-24 px-6 bg-page-alt">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-veil/10 pb-8">
             <div>
                <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm">{t.projects.label}</span>
                <h4 className="text-3xl md:text-5xl font-bold mt-2">{t.projects.heading}</h4>
                <p className="text-ink-soft mt-2 text-sm">{t.projects.sub}</p>
             </div>
             
             {/* Filtros */}
             <div className="flex flex-wrap gap-2">
                {FILTERS.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        aria-pressed={activeFilter === filter}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                            activeFilter === filter
                            ? 'bg-purple-600 border-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                            : 'bg-veil/5 border-veil/15 text-ink-soft hover:text-ink hover:bg-veil/10 hover:border-veil/40'
                        }`}
                    >
                        {t.projects.filters[filter]}
                    </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sin AnimatePresence: con `mode="popLayout"` las tarjetas arrancaban en
                opacity 0 y, si la animación de entrada no llegaba a correr, el grid se
                quedaba en blanco al filtrar. La rejilla se remonta con la clave del
                filtro y las tarjetas entran escalonadas; el estado final es visible
                aunque la animación no se ejecute. */}
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${activeFilter}-${project.key}`}
                // Solo se anima el desplazamiento, nunca la opacidad: si la
                // animación no llega a ejecutarse, la tarjeta se ve igual.
                initial={{ y: 18 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
              >
                  <Card className="!p-0 !overflow-hidden h-full" onClick={() => setSelectedProject(project)}>
                     <div 
                       className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden rounded-t-2xl -mx-6 -mt-6 mb-6 group-hover:h-60 transition-all duration-500`}
                     >
                        {project.gallery.length > 0 && (
                          // <img> en vez de background-image: así el navegador
                          // puede aplazar la descarga con loading="lazy". Con
                          // CSS no hay forma de decírselo.
                          <img
                            src={project.gallery[0]}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            width="640"
                            height="360"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-110 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors z-0"></div> 
                        
                        {/* Overlay con icono de búsqueda */}
                        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold flex items-center gap-2 text-sm"><FaSearch/> {t.projects.viewDetails}</span>
                            <span className="text-[10px] text-gray-200 bg-black/50 px-2 py-1 rounded">{t.projects.clickHint}</span>
                        </div>

                        <div className="group-hover:opacity-0 transition-opacity duration-300">
                          {project.icon}
                        </div>
                     </div>
                     <div className="flex flex-col h-full relative z-10">
                         {project.badge && (
                           <div className="self-start mb-2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                             <FaBolt /> {t.projects.badges[project.badge]}
                           </div>
                         )}
                         <h4 className="text-2xl font-bold text-ink mb-1 group-hover:text-purple-400 transition-colors">{project.title}</h4>
                         <p className="text-purple-400 text-xs font-bold uppercase mb-4">{t.projects.items[project.key].subtitle}</p>
                         
                         {/* Resumen corto */}
                         <p className="text-ink-soft text-sm mb-6 flex-grow line-clamp-3">{t.projects.items[project.key].solution}</p>
                         
                         <div className="flex gap-2 text-[10px] font-mono text-ink-soft flex-wrap">
                            {project.stack.slice(0,3).map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-veil/10 rounded border border-veil/20">{tag}</span>
                            ))}
                            {project.stack.length > 3 && <span className="px-2 py-1 bg-veil/10 rounded border border-veil/20">+{project.stack.length - 3}</span>}
                         </div>
                     </div>
                  </Card>
              </motion.div>
            ))}
          </div>
          
           <div className="mt-12 flex justify-center md:hidden">
                 <NeonButton href={SOCIAL_LINKS.github} primary={false} icon={<FaGithub/>}>{t.projects.viewGithub}</NeonButton>
           </div>
        </div>
      </section>

      {/* --- TESTIMONIOS (apagados: ver SHOW_TESTIMONIALS) --- */}
      {SHOW_TESTIMONIALS && <TestimonialsSection />}

      {/* --- NUEVA SECCIÓN: PLANES DE INVERSIÓN (PRICING DINÁMICO) --- */}
      <PricingSection />

      {/* --- TRAYECTORIA --- */}
      <section id="trayectoria" className="py-24 px-6 relative bg-page-alt">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                 <h4 className="text-3xl md:text-4xl font-bold">{t.timeline.heading}</h4>
                 <p className="text-ink-soft mt-2">{t.timeline.sub}</p>
             </div>

             <div className="space-y-12 relative border-l-2 border-purple-500/20 ml-4 md:ml-10 pl-8 md:pl-12">
                 {TIMELINE_META.map((entry, i) => {
                   const copy = t.timeline.items[entry.key];
                   return (
                     <motion.div
                       key={entry.key}
                       initial={{opacity:0, x:-20}}
                       whileInView={{opacity:1, x:0}}
                       viewport={{once:true}}
                       transition={{delay: i * 0.2}}
                       className="relative"
                     >
                       <div className={`absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 rounded-full border-4 border-page ${
                         entry.active ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-ink-faint'
                       }`}></div>
                       <span className={`font-bold font-mono text-sm ${entry.active ? 'text-purple-400' : 'text-ink-faint'}`}>{copy.period}</span>
                       <h5 className="text-xl font-bold text-ink mt-1">{copy.role}</h5>
                       <p className="text-ink-soft text-sm mt-2">{copy.desc}</p>
                     </motion.div>
                   );
                 })}
             </div>
          </div>
      </section>

      {/* --- CONTACTO MEJORADO (ULTRA MODERNO) --- */}
      <section id="contacto" className="py-24 px-6 relative overflow-hidden">
         {/* Fondo animado de la sección */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Lado Izquierdo: Info Animada */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  className="text-left space-y-8"
                >
                    <div>
                      <span className="text-purple-400 font-bold tracking-widest uppercase text-sm bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">{t.contact.label}</span>
                      <h2 className="text-4xl md:text-6xl font-black text-ink leading-tight mt-4">
                          {t.contact.headingLine} <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">{t.contact.headingAccent}</span>
                      </h2>
                    </div>
                    <p className="text-lg text-ink-soft leading-relaxed backdrop-blur-sm bg-veil/5 p-4 rounded-2xl border border-veil/10">
                        {t.contact.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-2">
                        <NeonButton href={SOCIAL_LINKS.whatsapp} icon={<FaWhatsapp/>}>{t.contact.ctaWhatsapp}</NeonButton>
                        <NeonButton href={SOCIAL_LINKS.linkedin} primary={false} icon={<FaLinkedin/>}>{t.contact.ctaLinkedin}</NeonButton>
                    </div>
                </motion.div>

                {/* Lado Derecho: Formulario Ultra Moderno */}
                <div>
                    <ContactForm />
                </div>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 border-t border-veil/5 bg-page-alt text-center relative z-10 text-ink-faint text-sm">
          <div className="flex justify-center gap-6 mb-4">
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink transition-colors hover:scale-125 transform"><FaGithub size={24}/></a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-blue-500 transition-colors hover:scale-125 transform"><FaLinkedin size={24}/></a>
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-pink-500 transition-colors hover:scale-125 transform"><FaInstagram size={24}/></a>
          </div>
          <p>© {new Date().getFullYear()} <span className="text-purple-500 font-bold">NeyraDev</span>. {t.footer.rights}</p>
      </footer>

    </div>
  );
}

export default App;
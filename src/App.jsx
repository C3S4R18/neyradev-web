import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaReact, FaAndroid, FaNodeJs, FaRocket, FaExternalLinkAlt, FaBars, FaTimes, FaBoxOpen, FaMobileAlt, FaArrowUp, FaBrain, FaRobot, FaBolt, FaStar, FaLaptopCode, FaCommentDots, FaCheckCircle, FaSearch, FaFilter, FaBuilding, FaChevronLeft, FaChevronRight, FaCode, FaChartLine, FaDatabase, FaServer, FaLayerGroup, FaImages, FaEye, FaPaperPlane, FaUser, FaEnvelope, FaPen, FaRegPaperPlane, FaDownload, FaGamepad, FaMicrochip, FaTerminal, FaSkull, FaLeaf, FaHammer, FaGhost, FaBiohazard, FaBug, FaDragon } from 'react-icons/fa';
import { SiTailwindcss, SiKotlin, SiMysql, SiSupabase, SiPhp, SiVercel, SiNextdotjs, SiTypescript, SiPostgresql, SiFirebase, SiFigma, SiNintendoswitch } from "react-icons/si";

// --- DATOS ---
const SOCIAL_LINKS = {
  github: "https://github.com/NeyraDev", 
  linkedin: "https://www.linkedin.com/in/cesar-neyra-a8792228a/",
  instagram: "https://www.instagram.com/neyradev/",
  whatsapp: "https://wa.me/51947327420?text=Hola%20NeyraDev,%20vi%20tu%20portafolio%20y%20quiero%20cotizar%20un%20proyecto."
};

const SERVICES_DATA = [
  {
    icon: <SiPhp />,
    title: "Backend & Arquitectura",
    descSimple: "Construyo los cimientos invisibles que hacen que tu aplicación sea segura y rápida.",
    descTech: "Diseño de APIs RESTful escalables, gestión de bases de datos relacionales y autenticación segura (JWT).",
    businessValue: "Tus datos estarán seguros y tu sistema no se caerá.",
    tags: ["PHP", "Node.js", "MySQL"],
    color: "indigo"
  },
  {
    icon: <FaMobileAlt />,
    title: "Desarrollo Móvil Nativo",
    descSimple: "Creo apps que tus clientes pueden descargar en Play Store. Rápidas y funcionan incluso sin internet.",
    descTech: "Desarrollo Android nativo con Kotlin, Arquitectura MVVM, Room Database para persistencia local y Coroutines.",
    businessValue: "Presencia directa en el bolsillo de tus clientes.",
    tags: ["Kotlin", "Android Studio", "Material Design"],
    color: "fuchsia"
  },
  {
    icon: <SiNextdotjs />,
    title: "Webs de Alto Rendimiento",
    descSimple: "Páginas web modernas que cargan al instante y aparecen primero en Google.",
    descTech: "Desarrollo Frontend con Next.js (SSR/ISR), optimización de Core Web Vitals y diseño responsive con Tailwind CSS.",
    businessValue: "Mayor visibilidad y conversión de ventas.",
    tags: ["Next.js", "React", "SEO Avanzado"],
    color: "cyan"
  }
];

const PROJECTS_DATA = [
  {
    id: 0,
    title: "Ruag",
    subtitle: "Web App de Gestión Agroindustrial",
    category: "Empresarial",
    badge: "EMPRESA ACTUAL",
    link: "https://ruag-app-web.vercel.app/",
    gallery: [
      "/img-proyectos/ruag-logo.png",
      "/img-proyectos/ruag-login.png", 
      "/img-proyectos/ruag-dashboard.png",
      "/img-proyectos/ruag-movil1.jpeg",
      "/img-proyectos/ruag-movil2.jpeg"
    ],
    business: {
      problem: "La empresa necesitaba controlar la producción en campo y oficina simultáneamente, eliminando el uso de papel y errores humanos.",
      solution: "Una plataforma centralizada donde la web administrativa y las apps de los operarios se sincronizan al instante.",
      impact: "Reducción del 40% en tiempos administrativos y control total del inventario en tiempo real."
    },
    tech: {
      architecture: "Monorepo con Frontend en Next.js y Backend Services.",
      stack: ["Next.js 14 (App Router)", "TypeScript", "Vercel Edge Functions", "SWR"],
      challenges: "Sincronización de datos masivos en tiempo real y manejo de estados complejos en formularios dinámicos.",
      highlight: "Implementación de Server Side Rendering para reportes instantáneos."
    },
    techStackIcons: [<SiNextdotjs/>, <SiTypescript/>, <SiVercel/>, <SiTailwindcss/>],
    gradient: "from-blue-900 to-slate-900",
    icon: <FaBuilding className="text-6xl text-white relative z-10 drop-shadow-lg" />
  },
  {
    id: 1,
    title: "Bodega Jormard",
    subtitle: "Ecosistema de Inventario Real-Time",
    category: "Full Stack",
    badge: "CASO DE ÉXITO",
    gallery: [
      "/img-proyectos/logo-jormard.jpg",
      "/img-proyectos/jormard-DashAdmin.png",
      "/img-proyectos/jormard-DashCliente.png",
      "/img-proyectos/jormar-movil.jpeg"
    ],
    business: {
      problem: "El dueño sufría de 'robo hormiga' y no sabía cuánto stock tenía hasta hacer inventario manual cada mes.",
      solution: "Un sistema que descuenta el stock automáticamente con cada venta. El dueño puede ver las ventas desde su celular en vivo.",
      impact: "Eliminación de pérdidas por robo y automatización del 100% del cuadre de caja."
    },
    tech: {
      architecture: "Arquitectura Serverless con Supabase (Backend as a Service).",
      stack: ["Next.js", "Supabase Auth & DB", "PostgreSQL", "Android (Kotlin)"],
      challenges: "Conectar una App nativa Android con una Web React compartiendo la misma base de datos en tiempo real.",
      highlight: "Uso de Supabase Realtime Subscriptions para actualizar el stock sin recargar la página."
    },
    techStackIcons: [<SiSupabase/>, <SiPostgresql/>, <SiNextdotjs/>, <SiKotlin/>],
    gradient: "from-green-900 to-emerald-900",
    icon: <SiSupabase className="text-6xl text-white relative z-10 drop-shadow-lg" />
  },
  {
    id: 2,
    title: "Aldia Express",
    subtitle: "Plataforma Logística",
    category: "Web",
    gallery: [
      "/img-proyectos/ADE-Logo.png",
      "/img-proyectos/ADE-DashAdmin.png",
      "/img-proyectos/ADE-DashCliente.png"
    ],
    business: {
      problem: "La gestión de paquetes y rutas de entrega se hacía en Excel, causando retrasos y paquetes perdidos.",
      solution: "Un panel administrativo robusto para asignar rutas, rastrear estados y generar guías de remisión.",
      impact: "Optimización de rutas de entrega y trazabilidad completa del paquete."
    },
    tech: {
      architecture: "MVC (Modelo-Vista-Controlador) Monolítico.",
      stack: ["PHP 8", "MySQL", "Bootstrap 5", "JQuery"],
      challenges: "Gestión eficiente de miles de registros en MySQL y generación de PDFs dinámicos.",
      highlight: "Consultas SQL optimizadas e índices para reportes rápidos."
    },
    techStackIcons: [<SiPhp/>, <SiMysql/>, <FaServer/>],
    gradient: "from-orange-900 to-red-900",
    icon: <FaBoxOpen className="text-6xl text-white relative z-10 drop-shadow-lg" />
  },
  {
    id: 3,
    title: "App Móvil ESAF",
    subtitle: "Educación Financiera Android",
    category: "Móvil",
    gallery: [
      "/img-proyectos/Esaf-logo.png",
      "/img-proyectos/Esaf-movil-1.jpeg",
      "/img-proyectos/Esaf-movil-2.jpeg",
      "/img-proyectos/Esaf-movil-3.jpeg"
    ],
    business: {
      problem: "Necesidad de una herramienta accesible para usuarios con poca conectividad.",
      solution: "Una aplicación Android nativa, ligera y capaz de funcionar sin internet.",
      impact: "Alta retención de usuarios gracias a una experiencia fluida y diseño intuitivo."
    },
    tech: {
      architecture: "MVVM (Model-View-ViewModel) Clean Architecture.",
      stack: ["Kotlin", "Room Database", "Retrofit", "Coroutines"],
      challenges: "Implementación de 'Offline-First': sincronizar datos cuando vuelve la conexión.",
      highlight: "Uso de LiveData y ViewBinding para una UI reactiva y segura."
    },
    techStackIcons: [<SiKotlin/>, <FaAndroid/>, <FaDatabase/>],
    gradient: "from-purple-900 to-indigo-900",
    icon: <FaMobileAlt className="text-6xl text-white relative z-10 drop-shadow-lg" />
  }
];

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
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
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

const NeonButton = ({ children, icon, href, primary = true, onClick, className = "" }) => {
  const baseClass = `relative flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold rounded-full transition-all overflow-hidden group z-10 text-sm md:text-base cursor-pointer select-none ${className}`;
  const styles = primary 
    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:bg-purple-500 hover:scale-105"
    : "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105";

  const content = (
    <span className="relative z-10 flex items-center gap-2">{icon && <span className="text-lg">{icon}</span>} {children}</span>
  );

  if (onClick) return <motion.button whileTap={{ scale: 0.95 }} onClick={onClick} className={`${baseClass} ${styles}`}>{content}</motion.button>;

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
const CVInstallerModal = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState(null);
  const [logs, setLogs] = useState([]);
  
  // TEMAS ÉPICOS
  const THEMES = [
    {
      id: 'dev',
      name: 'SENIOR_DEV.exe',
      color: 'text-green-400',
      border: 'border-green-500',
      bgGradient: 'from-green-900/90 to-black',
      barColor: 'bg-green-500',
      icon: <FaTerminal className="text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]" />,
      commands: ["npm install experience...", "git commit -m 'Senior Skills'", "Optimizing React builds...", "Compiling TypeScript...", "Deploying to Production..."]
    },
    {
      id: 'kratos',
      name: 'SPARTAN_PROTOCOL',
      color: 'text-red-500',
      border: 'border-red-600',
      bgGradient: 'from-red-950/90 to-black',
      barColor: 'bg-red-600',
      icon: <FaHammer className="text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse" />, 
      commands: ["Afilando Hacha Leviatán...", "Invocando ira espartana...", "Derrotando bugs mitológicos...", "Abriendo cofre legendario...", "Ragnarök detenido."]
    },
    {
      id: 'mario',
      name: 'MUSHROOM_KINGDOM_OS',
      color: 'text-yellow-400',
      border: 'border-blue-500',
      bgGradient: 'from-blue-900/90 to-black',
      barColor: 'bg-yellow-400',
      icon: <SiNintendoswitch className="text-6xl md:text-8xl text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-bounce" />,
      commands: ["Entrando a la tubería...", "Recolectando 100 monedas...", "Saltando sobre bugs...", "Rescatando el código...", "Power-up obtenido!"]
    },
    {
      id: 'tlou',
      name: 'FIREFLY_NETWORK',
      color: 'text-lime-400',
      border: 'border-lime-600',
      bgGradient: 'from-stone-900/90 to-black',
      barColor: 'bg-lime-500',
      icon: <FaLeaf className="text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(163,230,53,0.8)]" />,
      commands: ["Escaneando entorno...", "Crafteando soluciones...", "Evitando errores infectados...", "Buscando la luz...", "Sincronizando red..."]
    },
    {
      id: 'cyber',
      name: 'NETRUNNER_V77',
      color: 'text-cyan-400',
      border: 'border-cyan-500',
      bgGradient: 'from-slate-900/90 to-black',
      barColor: 'bg-cyan-400',
      icon: <FaMicrochip className="text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-spin-slow" />,
      commands: ["Hackeando la mainframe...", "Bypassing firewalls...", "Subiendo código neuronal...", "Desencriptando datos...", "Conexión establecida."]
    }
  ];

  useEffect(() => {
    setTheme(THEMES[Math.floor(Math.random() * THEMES.length)]);
  }, []);

  useEffect(() => {
    if (!theme) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (Math.random() > 0.7) {
             setLogs(prevLogs => [...prevLogs, theme.commands[Math.floor(Math.random() * theme.commands.length)]]);
        }
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [theme]);

  useEffect(() => {
    if (progress === 100) {
      setLogs(prev => [...prev, "¡DESCARGA COMPLETADA!"]);
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/cv-cesar-neyra.pdf'; 
        link.download = 'CV_Cesar_Neyra_FullStack.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(onClose, 2500);
      }, 800);
    }
  }, [progress, onClose]);

  if (!theme) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10002] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div 
         initial={{ scale: 0.8, rotateX: 10 }} 
         animate={{ scale: 1, rotateX: 0 }} 
         exit={{ scale: 0.8, opacity: 0 }}
         // CORRECCIÓN RESPONSIVE: h-auto en móvil, altura fija en desktop. flex-col en móvil.
         className={`w-full max-w-3xl h-auto md:h-[500px] bg-gradient-to-br ${theme.bgGradient} border-2 ${theme.border} rounded-xl overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative`}
         style={{ boxShadow: `0 0 40px ${theme.border.replace('border-', 'var(--tw-colors-')}` }}
      >
        {/* LADO IZQUIERDO: PERSONAJE / AVATAR */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden bg-black/30 min-h-[200px]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className={`relative z-10 ${theme.color} mb-4 md:mb-6`}>
               {theme.icon}
            </div>
            
            <h3 className={`text-xl font-black ${theme.color} uppercase text-center tracking-widest`}>
                {theme.name}
            </h3>
            <p className="text-gray-500 text-xs text-center mt-2 font-mono">
                System Integrity: 100%
            </p>
        </div>

        {/* LADO DERECHO: CONSOLA DE CÓDIGO */}
        <div className="w-full md:w-2/3 flex flex-col p-6 relative">
             <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                 <span className={`font-mono text-sm ${theme.color} font-bold flex items-center gap-2`}>
                    <FaTerminal /> INSTALL_WIZARD_V4
                 </span>
                 <button onClick={onClose} className="text-gray-500 hover:text-white"><FaTimes/></button>
             </div>

             {/* Consola: Altura ajustada para móvil */}
             <div className="flex-grow h-40 md:h-auto bg-black/50 rounded-lg p-4 mb-4 border border-white/5 font-mono text-xs text-gray-300 relative overflow-hidden">
                 <CodeTerminal logs={logs} colorClass={theme.color} />
             </div>

             <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold text-white uppercase">
                     <span>Progress</span>
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
      className="fixed inset-0 z-[10001] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl p-2 hover:text-red-500 transition-colors z-50"><FaTimes/></button>
      
      <div className="w-full h-full flex items-center justify-center relative p-4 md:p-10" onClick={(e) => e.stopPropagation()}>
         <AnimatePresence mode='wait'>
            <motion.img 
              key={index}
              src={images[index]}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-full max-h-full object-contain shadow-2xl"
              alt="Gallery"
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
                    className="bg-[#0f0c29] border border-purple-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/50 transition-colors">
                        <FaTimes />
                    </button>

                    {/* HEADER TIPO LOGO */}
                    <div className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        <div className="text-6xl md:text-7xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-500">
                          {project.icon}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col">
                        <div className="text-center mb-6">
                             <div className="flex justify-center items-center gap-2 mb-2">
                               <span className="bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full">{project.category}</span>
                               {project.badge && <span className="bg-green-600/20 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><FaBolt/> {project.badge}</span>}
                             </div>
                             <h3 className="text-3xl font-black text-white leading-tight mb-1">{project.title}</h3>
                             <p className="text-gray-400 font-medium">{project.subtitle}</p>
                        </div>

                        {/* SWITCH TOGGLE */}
                        <div className="bg-white/5 p-1 rounded-xl flex mb-6 border border-white/10 relative">
                            <button 
                              onClick={() => setViewMode('business')}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all z-10 ${viewMode === 'business' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                              <FaChartLine /> Negocio
                            </button>
                            <button 
                              onClick={() => setViewMode('tech')}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all z-10 ${viewMode === 'tech' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                              <FaCode /> Técnico
                            </button>
                            <motion.div 
                              animate={{ x: viewMode === 'business' ? '0%' : '100%' }}
                              className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-purple-600 rounded-lg shadow-lg"
                            />
                        </div>

                        {/* CONTENIDO DINÁMICO */}
                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar min-h-[200px]">
                            <AnimatePresence mode='wait'>
                                {viewMode === 'business' ? (
                                    <motion.div 
                                      key="biz" 
                                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                      className="space-y-4"
                                    >
                                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                          <h4 className="text-red-400 font-bold text-sm mb-1">🔴 El Problema</h4>
                                          <p className="text-gray-300 text-sm leading-relaxed">{project.business.problem}</p>
                                        </div>
                                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                                          <h4 className="text-green-400 font-bold text-sm mb-1">🟢 La Solución</h4>
                                          <p className="text-gray-300 text-sm leading-relaxed mb-2">{project.business.solution}</p>
                                          <div className="mt-3 pt-3 border-t border-green-500/20">
                                             <p className="text-white font-bold text-sm flex items-start gap-2"><FaStar className="text-yellow-400 mt-1 flex-shrink-0"/> {project.business.impact}</p>
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
                                          <h4 className="text-purple-300 font-bold text-sm mb-2 flex items-center gap-2"><FaLayerGroup/> Arquitectura</h4>
                                          <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg border-l-2 border-purple-500">{project.tech.architecture}</p>
                                        </div>
                                        
                                        <div>
                                          <h4 className="text-cyan-300 font-bold text-sm mb-2 flex items-center gap-2"><FaDatabase/> Stack Tecnológico</h4>
                                          <div className="flex flex-wrap gap-2 mb-3">
                                              {project.techStackIcons.map((icon, i) => (
                                                <span key={i} className="text-2xl text-gray-300 bg-white/5 p-2 rounded-lg border border-white/10">{icon}</span>
                                              ))}
                                          </div>
                                          <div className="grid grid-cols-2 gap-2">
                                            {project.tech.stack.map((item, i) => (
                                              <div key={i} className="flex items-center gap-2 text-xs text-gray-400 font-mono bg-black/20 px-2 py-1 rounded">
                                                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> {item}
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                                           <h4 className="text-blue-300 font-bold text-xs mb-1 uppercase flex items-center gap-2"><FaBrain/> Reto Principal</h4>
                                           <p className="text-gray-300 text-xs">{project.tech.challenges}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ACCIONES */}
                        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <NeonButton onClick={() => setShowGallery(true)} primary={false} icon={<FaImages/>}>
                               Ver Capturas
                             </NeonButton>
                             
                             {project.link ? (
                                  <NeonButton href={project.link} className="justify-center" icon={<FaExternalLinkAlt/>}>Visitar Web App</NeonButton>
                             ) : (
                                  <NeonButton href={SOCIAL_LINKS.whatsapp} className="justify-center" icon={<FaRocket/>}>Cotizar</NeonButton>
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      // LOGICA PARA ABRIR GMAIL WEB DIRECTAMENTE
      const subject = `Nuevo Mensaje de Portafolio: ${formData.name}`;
      const body = `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=neyrajcf@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(gmailUrl, '_blank');
      
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const inputClasses = "w-full bg-transparent border-none text-white placeholder-transparent focus:outline-none focus:ring-0 peer relative z-10 pt-2";
  
  // CORREGIDO: La etiqueta está "arriba" por defecto (top-1) y baja (top-6) SOLO si no hay foco y no hay texto.
  const labelClasses = "absolute left-0 top-1 text-xs text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-6 peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-400 flex items-center gap-2 pointer-events-none z-0";
  
  const containerClasses = (field) => `relative border-b border-white/20 pt-6 pb-2 focus-within:border-purple-500 transition-all overflow-hidden group ${focusedField === field ? 'shadow-[0_4px_20px_-5px_rgba(168,85,247,0.5)]' : ''}`;

  return (
    <motion.form 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-[#0a0a1a]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-purple-500/20 w-full shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>
       <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/30 rounded-full blur-[80px] pointer-events-none animate-pulse delay-700"></div>

      <div className="space-y-6 relative z-10">
        {/* Input Nombre */}
        <div className={containerClasses('name')} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}>
           <input 
             type="text" id="name" name="name" required placeholder="Nombre"
             value={formData.name} onChange={handleChange}
             className={inputClasses}
           />
           <label htmlFor="name" className={labelClasses}>
             <FaUser/> Tu Nombre
           </label>
           <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Input Email */}
        <div className={containerClasses('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}>
           <input 
             type="email" id="email" name="email" required placeholder="Email"
             value={formData.email} onChange={handleChange}
             className={inputClasses}
           />
           <label htmlFor="email" className={labelClasses}>
             <FaEnvelope/> Tu Correo
           </label>
           <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Textarea Mensaje */}
        <div className={containerClasses('message')} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}>
           <textarea 
             id="message" name="message" required rows="4" placeholder="Mensaje"
             value={formData.message} onChange={handleChange}
             className={`${inputClasses} resize-none`}
           ></textarea>
           <label htmlFor="message" className={labelClasses}>
             <FaPen/> Cuéntame tu idea
           </label>
           <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <NeonButton className="w-full justify-center relative overflow-hidden group" onClick={() => {}} primary={true}>
          {isSubmitting ? (
             <span className="flex items-center gap-2"><FaCheckCircle className="animate-bounce text-green-300"/> Abriendo Gmail...</span>
          ) : (
             <span className="flex items-center gap-2">Enviar Mensaje <FaRegPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform animate-pulse"/></span>
          )}
        </NeonButton>
      </div>
    </motion.form>
  );
};

const Card = ({ children, className = "", color = "purple", onClick }) => {
    const colorClasses = {
        purple: "group-hover:bg-purple-500/30",
        indigo: "group-hover:bg-indigo-500/30 hover:bg-indigo-900/20",
        fuchsia: "group-hover:bg-fuchsia-500/30 hover:bg-fuchsia-900/20",
        cyan: "group-hover:bg-cyan-500/30 hover:bg-cyan-900/20",
    };

    return (
        <div className="h-full" onClick={onClick}>
            <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group flex flex-col h-full shadow-2xl transition-all duration-300 cursor-pointer ${className} ${colorClasses[color] || ""}`}>
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${color}-600/20 rounded-full blur-3xl transition-colors pointer-events-none ${colorClasses[color].split(' ')[0]}`}></div>
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

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  useEffect(() => {
    const timeout2 = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(timeout2);
  }, []);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-mono min-h-[1.5em] inline-block font-bold">
      {texts[index].substring(0, subIndex)}
      <span className={`text-white ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
};

const BackgroundParticles = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: Math.random() * 0.5 + 0.1 }}
                    animate={{ y: [null, Math.random() * -100], opacity: [null, 0] }}
                    transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
            ))}
        </div>
    )
}

const ScrollToTopButton = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
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
  <div className="flex gap-1 p-2 bg-white/10 rounded-xl w-fit mb-2">
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-purple-400 rounded-full"></motion.div>
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-purple-400 rounded-full"></motion.div>
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-purple-400 rounded-full"></motion.div>
  </div>
);

const SmartAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll al final del chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  // Secuencia de inicio del bot
  useEffect(() => {
    if (open && messages.length === 0) {
      setShowTyping(true);
      // Mensaje 1
      setTimeout(() => {
        setMessages([{ type: 'bot', text: '¡Hola! Soy NeyraBot 🤖' }]);
        setShowTyping(true);
        
        // Mensaje 2
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: '¿En qué puedo ayudarte hoy?' }]);
          setShowTyping(false);
        }, 1000);
        
      }, 1000);
    }
  }, [open]);

  const toggleOpen = () => setOpen(!open);

  const quickActions = [
    { icon: <FaStar />, text: "Ver Experiencia Ruag", action: () => document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' }) },
    { icon: <FaWhatsapp />, text: "Cotizar ahora", link: SOCIAL_LINKS.whatsapp },
    { icon: <FaLaptopCode />, text: "Mis servicios", action: () => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-[999]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-80 bg-[#0a0a1a]/95 backdrop-blur-xl border border-purple-500/30 overflow-hidden rounded-3xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] flex flex-col"
          >
            {/* Header del Chat */}
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-4 flex items-center gap-3 border-b border-white/10">
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg relative">
                    <FaRobot className="text-white text-lg" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a1a] rounded-full"></span>
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm leading-tight">NeyraBot AI</h4>
                    <p className="text-[10px] text-purple-200 flex items-center gap-1">Online & Ready</p>
                </div>
                <button onClick={toggleOpen} className="ml-auto text-white/50 hover:text-white transition-colors"><FaTimes/></button>
            </div>
            
            {/* Cuerpo del Chat */}
            <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3 bg-gradient-to-b from-transparent to-black/20 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-sm ${msg.type === 'bot' ? 'bg-white/10 text-gray-100 rounded-tl-none self-start' : 'bg-purple-600 text-white rounded-tr-none self-end'}`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                
                {showTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Opciones Rápidas */}
            <div className="p-3 bg-black/40 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-wider ml-1">Sugerencias</p>
                <div className="flex flex-col gap-2">
                  {quickActions.map((qa, i) => (
                      qa.link ? (
                          <a key={i} href={qa.link} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 transition-all text-xs cursor-pointer group">
                              <span className="text-purple-400 group-hover:scale-110 transition-transform">{qa.icon}</span>
                              <span className="text-gray-300 group-hover:text-white">{qa.text}</span>
                          </a>
                      ) : (
                          <div key={i} onClick={() => { qa.action(); setOpen(false); }} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 transition-all text-xs cursor-pointer group">
                              <span className="text-purple-400 group-hover:scale-110 transition-transform">{qa.icon}</span>
                              <span className="text-gray-300 group-hover:text-white">{qa.text}</span>
                          </div>
                      )
                  ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botón del Chat */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all relative overflow-hidden group flex items-center justify-center z-50 ${open ? 'bg-white text-purple-600 rotate-90' : 'bg-gradient-to-tr from-purple-600 to-blue-600 text-white'}`}
      >
        {open ? <FaTimes className="text-xl" /> : <FaCommentDots className="text-2xl" />}
        
        {/* Onda de "llamada" */}
        {!open && (
           <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></span>
        )}
      </motion.button>
    </div>
  );
};

// --- APP PRINCIPAL ---
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Estados para la galería y el modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = activeFilter === "Todos" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  const filters = ["Todos", "Empresarial", "Full Stack", "Web", "Móvil"];

  return (
    <div className="relative min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden cursor-none md:cursor-auto">
      <CustomCursor />
      <ScrollToTopButton />
      <SmartAssistant />
      
      {/* Modals Globales */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        {showCVModal && <CVInstallerModal onClose={() => setShowCVModal(false)} />}
      </AnimatePresence>

      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 origin-left z-[100] shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
      
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <motion.div style={{ x: mouseX, y: mouseY }} className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] z-[-1] pointer-events-none mix-blend-screen"/>
      <BackgroundParticles />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#030014]/80 border-b border-white/5">
        <motion.div 
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="text-xl md:text-2xl font-bold flex items-center gap-2 cursor-pointer z-50 group"
          onClick={() => scrollToSection('hero')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:rotate-12 transition-transform">ND</div>
          <span className="tracking-tight group-hover:text-purple-400 transition-colors">NeyraDev</span>
        </motion.div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {['Servicios', 'Proyectos', 'Trayectoria', 'Contacto'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-purple-400 transition-colors relative group">
              {item}
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
          
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-green-600/20 hover:text-green-400 border border-white/10 px-4 py-2 rounded-full text-sm font-bold transition-all ml-2 group">
             <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform"/> 
             <span className="hidden lg:inline">Chat</span>
          </a>
        </div>

        <div className="md:hidden z-50 p-2 relative cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl relative z-[1001]"/>
        </div>

        {/* --- MENÚ MÓVIL --- */}
        <AnimatePresence>
            {menuOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-[#030014] z-[1000] flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-4 text-white/50 hover:text-white">
                        <FaTimes className="text-4xl"/>
                    </button>

                    {['Servicios', 'Proyectos', 'Trayectoria', 'Contacto'].map((item) => (
                        <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-3xl font-bold hover:text-purple-400 transition-colors">{item}</button>
                    ))}
                    <div className="flex gap-8 mt-8">
                          <a href={SOCIAL_LINKS.github} className="text-4xl text-gray-400 hover:text-white"><FaGithub/></a>
                          <a href={SOCIAL_LINKS.linkedin} className="text-4xl text-gray-400 hover:text-blue-500"><FaLinkedin/></a>
                          <a href={SOCIAL_LINKS.instagram} className="text-4xl text-gray-400 hover:text-pink-500"><FaInstagram/></a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20 overflow-hidden">
        
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-pink-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        <motion.div 
            initial={{ scale: 0, rotate: -180 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ type: "spring", duration: 1.5, bounce: 0.5 }} 
            className="mb-8 relative"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-50 rounded-full"></div>
           <div className="relative z-10 p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
               <img 
                src={`https://ui-avatars.com/api/?name=Neyra+Dev&background=0f172a&color=fff&size=200&bold=true`} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#030014] shadow-2xl"
                alt="Logo"
               />
           </div>
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="absolute -bottom-2 -right-2 bg-green-500 text-[#030014] text-xs font-bold px-3 py-1 rounded-full border-4 border-[#030014] z-20"
           >
             OPEN TO WORK
           </motion.div>
        </motion.div>

        <h2 className="text-lg md:text-2xl text-gray-400 font-medium mb-6 flex justify-center items-center gap-2 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
          <span>👋 Hola, soy</span>
          <TypewriterText texts={["Ingeniero de Software", "Desarrollador Full Stack", "Especialista Web & Móvil"]} />
        </h2>

        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight relative z-10">
          Creo Software <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Inteligente
          </span>
        </h1>

        <p className="max-w-2xl text-gray-400 text-base md:text-xl mb-10 leading-relaxed px-4">
          Transformo necesidades de negocio en código de alto rendimiento. <br className="hidden md:block"/>
          Especializado en <span className="text-purple-400 font-bold"> Escalabilidad</span>, <span className="text-cyan-400 font-bold">Seguridad</span> y <span className="text-pink-400 font-bold">Experiencia de Usuario</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6 z-10">
          <NeonButton onClick={() => setShowCVModal(true)} icon={<FaDownload/>}>Descargar CV</NeonButton>
          <NeonButton onClick={() => scrollToSection('proyectos')} primary={false} icon={<FaExternalLinkAlt/>}>Ver Portafolio</NeonButton>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-8">
            <div className="text-center">
                <div className="text-3xl font-black text-white flex justify-center"><Counter from={0} to={3}/>+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Años Exp.</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-black text-white flex justify-center"><Counter from={0} to={15}/>+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Proyectos Exitosos</div>
            </div>
            <div className="text-center hidden md:block">
                <div className="text-3xl font-black text-white flex justify-center">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Clientes Satisfechos</div>
            </div>
        </div>
      </section>

      {/* --- TECH STACK (Infinito) --- */}
      <section className="py-10 bg-gradient-to-r from-[#030014] via-purple-900/10 to-[#030014] border-y border-purple-500/20 overflow-hidden relative">
         <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030014] to-transparent z-10"></div>
         <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030014] to-transparent z-10"></div>
         
         <motion.div 
           animate={{ x: [0, -1000] }}
           transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
           className="flex gap-16 w-max opacity-60 grayscale hover:grayscale-0 transition-all duration-500 px-4"
         >
            {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                    <FaReact className="text-5xl hover:text-cyan-400 hover:scale-110 transition-transform" title="React"/>
                    <SiNextdotjs className="text-5xl hover:text-white hover:scale-110 transition-transform" title="Next.js"/>
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
              <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">Mis Servicios</span>
              <h4 className="text-4xl md:text-5xl font-bold mt-4">Soluciones Digitales 360°</h4>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES_DATA.map((service, index) => (
                <Card key={index} color={service.color}>
                  <div className={`w-14 h-14 bg-${service.color}-500/20 text-${service.color}-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-${service.color}-500/10`}>
                    {service.icon}
                  </div>
                  <h5 className="text-2xl font-bold mb-3">{service.title}</h5>
                  
                  {/* Descripción Dual */}
                  <div className="space-y-4 mb-6">
                      <p className="text-white text-base leading-relaxed">{service.descSimple}</p>
                      <p className="text-gray-400 text-xs font-mono border-l-2 border-white/20 pl-3 italic">
                         <span className="font-bold text-gray-300 not-italic">Tech Spec:</span> {service.descTech}
                      </p>
                  </div>
                  
                  {/* Business Value Highlight */}
                  <div className="bg-white/5 border-l-2 border-purple-500 p-3 mb-6 rounded-r-lg">
                    <p className="text-xs text-purple-200 font-medium italic">"{service.businessValue}"</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex gap-2 flex-wrap">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded">{tag}</span>
                      ))}
                  </div>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* --- PROYECTOS (GALERÍA AVANZADA) --- */}
      <section id="proyectos" className="py-24 px-6 bg-[#050214]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
             <div>
                <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm">Portafolio</span>
                <h4 className="text-3xl md:text-5xl font-bold mt-2">Mis Mejores Trabajos</h4>
                <p className="text-gray-400 mt-2 text-sm">Proyectos reales con impacto real.</p>
             </div>
             
             {/* Filtros */}
             <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                            activeFilter === filter 
                            ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                            : 'bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
              >
                  <Card className="!p-0 !overflow-hidden h-full" onClick={() => setSelectedProject(project)}>
                     <div 
                       className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden rounded-t-2xl -mx-6 -mt-6 mb-6 group-hover:h-60 transition-all duration-500`}
                     >
                        <div 
                          className="absolute inset-0 bg-cover bg-center opacity-40 hover:scale-110 transition-transform duration-700"
                          style={{ backgroundImage: `url(${project.gallery[0]})` }}
                        ></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors z-0"></div> 
                        
                        {/* Overlay con icono de búsqueda */}
                        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold flex items-center gap-2 text-sm"><FaSearch/> Ver Detalles</span>
                            <span className="text-[10px] text-gray-300 bg-black/50 px-2 py-1 rounded">Click para ver galería y código</span>
                        </div>

                        <div className="group-hover:opacity-0 transition-opacity duration-300">
                          {project.icon}
                        </div>
                     </div>
                     <div className="flex flex-col h-full relative z-10">
                         {project.badge && (
                           <div className="self-start mb-2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                             <FaBolt /> {project.badge}
                           </div>
                         )}
                         <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{project.title}</h4>
                         <p className="text-purple-400 text-xs font-bold uppercase mb-4">{project.subtitle}</p>
                         
                         {/* Resumen corto */}
                         <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">{project.business.solution}</p>
                         
                         <div className="flex gap-2 text-[10px] font-mono text-gray-300 flex-wrap">
                            {project.tech.stack.slice(0,3).map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-white/10 rounded border border-white/20">{tag}</span>
                            ))}
                            {project.tech.stack.length > 3 && <span className="px-2 py-1 bg-white/10 rounded border border-white/20">+{project.tech.stack.length - 3}</span>}
                         </div>
                     </div>
                  </Card>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
          
           <div className="mt-12 flex justify-center md:hidden">
                 <NeonButton href={SOCIAL_LINKS.github} primary={false} icon={<FaGithub/>}>Ver GitHub</NeonButton>
           </div>
        </div>
      </section>

      {/* --- TRAYECTORIA --- */}
      <section id="trayectoria" className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                 <h4 className="text-3xl md:text-4xl font-bold">Mi Trayectoria</h4>
                 <p className="text-gray-400 mt-2">Evolución constante en cada línea de código</p>
             </div>

             <div className="space-y-12 relative border-l-2 border-purple-500/20 ml-4 md:ml-10 pl-8 md:pl-12">
                 
                 {/* Item 1: RUAG (Actualidad) */}
                 <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="relative">
                     <div className="absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-[#030014] shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                     <span className="text-purple-400 font-bold font-mono text-sm">2026 - ACTUALIDAD</span>
                     <h5 className="text-xl font-bold text-white mt-1">Software Engineer en Ruag S.A.C.</h5>
                     <p className="text-gray-400 text-sm mt-2">Liderando la transformación digital de la empresa. Diseño y desarrollo de arquitectura escalable en <span className="text-white font-bold">Next.js</span> y sincronización en tiempo real con Apps Android nativas.</p>
                 </motion.div>

                 {/* Item 2: Bodega Jormard */}
                 <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.2}} className="relative">
                     <div className="absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 bg-gray-700 rounded-full border-4 border-[#030014]"></div>
                     <span className="text-gray-500 font-bold font-mono text-sm">2025 - 2026</span>
                     <h5 className="text-xl font-bold text-white mt-1">Full Stack Freelance</h5>
                     <p className="text-gray-400 text-sm mt-2">Creación de ecosistema digital para <span className="text-white font-bold">Bodega Jormard</span>. Implementación de CI/CD, bases de datos en tiempo real con Supabase y arquitectura Serverless.</p>
                 </motion.div>

                 {/* Item 3: Inicios */}
                 <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.4}} className="relative">
                     <div className="absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 bg-gray-700 rounded-full border-4 border-[#030014]"></div>
                     <span className="text-gray-500 font-bold font-mono text-sm">2024</span>
                     <h5 className="text-xl font-bold text-white mt-1">Backend Developer (Legacy Systems)</h5>
                     <p className="text-gray-400 text-sm mt-2">Mantenimiento y refactorización de sistemas críticos en PHP y Java para <span className="text-white font-bold">Aldia Express</span>. Optimización de consultas SQL complejas.</p>
                 </motion.div>
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
                      <span className="text-purple-400 font-bold tracking-widest uppercase text-sm bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">Contacto</span>
                      <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mt-4">
                          Hablemos de tu <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">Próximo Proyecto</span>
                      </h2>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-2xl border border-white/5">
                        ¿Tienes una idea innovadora o necesitas escalar tu sistema actual? Estoy listo para unirme a tu equipo y aportar valor desde el día uno. Trato directo, sin intermediarios.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-2">
                        <NeonButton href={SOCIAL_LINKS.whatsapp} icon={<FaWhatsapp/>}>WhatsApp Directo</NeonButton>
                        <NeonButton href={SOCIAL_LINKS.linkedin} primary={false} icon={<FaLinkedin/>}>LinkedIn</NeonButton>
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
      <footer className="py-8 border-t border-white/5 bg-[#02010a] text-center relative z-10 text-gray-600 text-sm">
          <div className="flex justify-center gap-6 mb-4">
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-125 transform"><FaGithub size={24}/></a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors hover:scale-125 transform"><FaLinkedin size={24}/></a>
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors hover:scale-125 transform"><FaInstagram size={24}/></a>
          </div>
          <p>© 2026 <span className="text-purple-500 font-bold">NeyraDev</span>. Ingeniería de Software de Alto Nivel.</p>
      </footer>

    </div>
  );
}

export default App;
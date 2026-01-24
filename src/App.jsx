import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaReact, FaAndroid, FaNodeJs, FaRocket, FaExternalLinkAlt, FaBars, FaTimes, FaBoxOpen, FaMobileAlt, FaArrowUp, FaBrain, FaRobot, FaBolt, FaStar, FaLaptopCode, FaCommentDots } from 'react-icons/fa';
import { SiTailwindcss, SiKotlin, SiMysql, SiSupabase, SiPhp, SiVercel } from "react-icons/si";

// --- DATOS ---
const SOCIAL_LINKS = {
  github: "https://github.com/C3S4R18",
  linkedin: "https://www.linkedin.com/in/cesar-neyra-a8792228a/",
  instagram: "https://www.instagram.com/neyradev/",
  whatsapp: "https://wa.me/51947327420?text=Hola%20NeyraDev,%20me%20gustaría%20cotizar%20un%20proyecto."
};

const SERVICES_DATA = [
  {
    icon: <SiPhp />,
    title: "Backend Robusto",
    description: "Arquitectura de servidores segura y escalable con PHP & MySQL. APIs REST optimizadas para conectar todos tus dispositivos.",
    tags: ["API Rest", "Seguridad"],
    color: "indigo"
  },
  {
    icon: <FaMobileAlt />,
    title: "Apps Nativas",
    description: "Desarrollo móvil en Android Studio con Kotlin. Experiencia de usuario (UX) fluida, notificaciones push y GPS integrado.",
    tags: ["Play Store", "Kotlin"],
    color: "fuchsia"
  },
  {
    icon: <FaReact />,
    title: "Web Moderna",
    description: "Frontend interactivo con React.js y Tailwind. Dashboards administrativos en tiempo real conectados con Supabase.",
    tags: ["SPA", "Vercel"],
    color: "cyan"
  }
];

const PROJECTS_DATA = [
  {
    title: "Bodega Jormard",
    subtitle: "Sistema Real-Time",
    description: "Ecosistema digital completo. Web en React conectada en tiempo real con App Android mediante Supabase. Gestión de inventario instantánea.",
    tags: ["React", "Supabase", "Android"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80",
    icon: <SiSupabase className="text-6xl text-white relative z-10 drop-shadow-lg" />,
    gradient: "from-green-900 to-emerald-900",
    badge: "MÁS RECIENTE"
  },
  {
    title: "Aldia Express",
    subtitle: "Logística & Paquetería",
    description: "Plataforma integral de gestión de envíos. Panel administrativo robusto para seguimiento de paquetes y rutas optimizadas.",
    tags: ["PHP", "Java", "MySQL"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    icon: <FaBoxOpen className="text-6xl text-white relative z-10 drop-shadow-lg" />,
    gradient: "from-orange-900 to-red-900"
  },
  {
    title: "App Móvil ESAF",
    subtitle: "Android Nativo",
    description: "Aplicación móvil enfocada en la experiencia de usuario (UI/UX). Diseño limpio, navegación fluida y alto rendimiento.",
    tags: ["Kotlin", "Material UI"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
    icon: <FaMobileAlt className="text-6xl text-white relative z-10 drop-shadow-lg" />,
    gradient: "from-blue-900 to-indigo-900"
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

const NeonButton = ({ children, icon, href, primary = true, onClick }) => {
  const baseClass = "relative flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold rounded-full transition-all overflow-hidden group z-10 text-sm md:text-base cursor-pointer select-none";
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

const Card = ({ children, className = "", color = "purple" }) => {
    const colorClasses = {
        purple: "group-hover:bg-purple-500/30",
        indigo: "group-hover:bg-indigo-500/30 hover:bg-indigo-900/20",
        fuchsia: "group-hover:bg-fuchsia-500/30 hover:bg-fuchsia-900/20",
        cyan: "group-hover:bg-cyan-500/30 hover:bg-cyan-900/20",
    };

    return (
        <div className="h-full">
            <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group flex flex-col h-full shadow-2xl transition-all ${className} ${colorClasses[color] || ""}`}>
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

// --- ASISTENTE IA MEJORADO ---
const TypingIndicator = () => (
  <div className="flex gap-1 p-2 bg-white/10 rounded-xl w-fit mb-2">
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-purple-400 rounded-full"></motion.div>
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-purple-400 rounded-full"></motion.div>
    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-purple-400 rounded-full"></motion.div>
  </div>
);

const SmartAssistant = () => {
  const [open, setOpen] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (open) {
      setShowTyping(true);
      const timer = setTimeout(() => setShowTyping(false), 1500); // Simula escribir por 1.5s
      return () => clearTimeout(timer);
    }
  }, [open]);

  const toggleOpen = () => setOpen(!open);

  const quickActions = [
    { icon: <FaStar />, text: "Ver mejor proyecto", action: () => document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' }) },
    { icon: <FaWhatsapp />, text: "Cotizar ahora", link: SOCIAL_LINKS.whatsapp },
    { icon: <FaLaptopCode />, text: "Mis servicios", action: () => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-[999]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 overflow-hidden rounded-3xl shadow-2xl flex flex-col"
          >
            {/* Header del Chat */}
            <div className="bg-purple-600/20 p-4 flex items-center gap-3 border-b border-purple-500/20">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaRobot className="text-white text-sm" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm leading-tight">NeyraBot AI</h4>
                    <p className="text-[10px] text-purple-300 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> En línea</p>
                </div>
                <button onClick={toggleOpen} className="ml-auto text-gray-400 hover:text-white"><FaTimes/></button>
            </div>
            
            {/* Cuerpo del Chat */}
            <div className="p-4 flex flex-col gap-2 bg-gradient-to-b from-transparent to-black/20">
                {showTyping ? (
                  <TypingIndicator />
                ) : (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-white/10 p-3 rounded-xl rounded-tl-none text-sm text-gray-200 self-start max-w-[85%] shadow-sm">
                    ¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?
                  </motion.div>
                )}
            </div>

            {/* Opciones Rápidas */}
            <div className="p-4 pt-2 flex flex-col gap-2 bg-black/20">
                <p className="text-xs text-gray-500 font-bold mb-1">OPCIONES RÁPIDAS</p>
                {quickActions.map((qa, i) => (
                    qa.link ? (
                        <a key={i} href={qa.link} target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-purple-600/10 hover:bg-purple-600/30 border border-purple-500/10 transition-all text-sm cursor-pointer group">
                            <span className="text-purple-400 group-hover:scale-110 transition-transform">{qa.icon}</span>
                            <span className="text-gray-200 group-hover:text-white">{qa.text}</span>
                        </a>
                    ) : (
                        <div key={i} onClick={() => { qa.action(); setOpen(false); }} className="flex items-center gap-3 p-3 rounded-xl bg-purple-600/10 hover:bg-purple-600/30 border border-purple-500/10 transition-all text-sm cursor-pointer group">
                             <span className="text-purple-400 group-hover:scale-110 transition-transform">{qa.icon}</span>
                             <span className="text-gray-200 group-hover:text-white">{qa.text}</span>
                        </div>
                    )
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botón del Chat */}
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all relative overflow-hidden group flex items-center justify-center ${open ? 'bg-white text-purple-600 rotate-90' : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'}`}
      >
        {open ? <FaTimes className="text-xl relative z-10" /> : <FaCommentDots className="text-2xl relative z-10" />}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </motion.button>
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [menuOpen, setMenuOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  return (
    <div className="relative min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden cursor-none md:cursor-auto">
      <CustomCursor />
      <ScrollToTopButton />
      <SmartAssistant />

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
              <a key={i} href={item.link} target="_blank" className="hover:text-purple-400 hover:-translate-y-1 transition-all text-xl"><item.icon/></a>
          ))}
          
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" className="flex items-center gap-2 bg-white/5 hover:bg-green-600/20 hover:text-green-400 border border-white/10 px-4 py-2 rounded-full text-sm font-bold transition-all ml-2 group">
             <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform"/> 
             <span className="hidden lg:inline">Chat</span>
          </a>
        </div>

        <div className="md:hidden z-50 p-2 relative cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl relative z-[1001]"/>
        </div>

        {/* --- MENÚ MÓVIL ARREGLADO --- */}
        <AnimatePresence>
            {menuOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-[#030014] z-[1000] flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    {/* Botón de Cerrar Gigante */}
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
          <TypewriterText texts={["Desarrollador Web", "Experto en Android", "Full Stack Dev"]} />
        </h2>

        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight relative z-10">
          Creo Software <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Inteligente
          </span>
        </h1>

        <p className="max-w-2xl text-gray-400 text-base md:text-xl mb-10 leading-relaxed px-4">
          Experto en construir puentes entre web y móvil. Especializado en sistemas 
          <span className="text-purple-400 font-bold"> React + PHP </span> 
          y aplicaciones 
          <span className="text-purple-400 font-bold"> Android Nativas</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6 z-10">
          <NeonButton href={SOCIAL_LINKS.whatsapp} icon={<FaRocket/>}>Iniciar Proyecto</NeonButton>
          <NeonButton onClick={() => scrollToSection('proyectos')} primary={false} icon={<FaExternalLinkAlt/>}>Ver Portafolio</NeonButton>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-8">
            <div className="text-center">
                <div className="text-3xl font-black text-white flex justify-center"><Counter from={0} to={3}/>+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Años Exp.</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-black text-white flex justify-center"><Counter from={0} to={10}/>+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Proyectos</div>
            </div>
            <div className="text-center hidden md:block">
                <div className="text-3xl font-black text-white flex justify-center">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Compromiso</div>
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
                    <FaReact className="text-5xl hover:text-cyan-400 hover:scale-110 transition-transform"/>
                    <SiPhp className="text-5xl hover:text-indigo-400 hover:scale-110 transition-transform"/>
                    <SiSupabase className="text-5xl hover:text-green-400 hover:scale-110 transition-transform"/>
                    <FaNodeJs className="text-5xl hover:text-green-500 hover:scale-110 transition-transform"/>
                    <SiKotlin className="text-5xl hover:text-purple-500 hover:scale-110 transition-transform"/>
                    <FaAndroid className="text-5xl hover:text-green-400 hover:scale-110 transition-transform"/>
                    <SiMysql className="text-5xl hover:text-blue-400 hover:scale-110 transition-transform"/>
                    <SiVercel className="text-5xl hover:text-white hover:scale-110 transition-transform"/>
                    <SiTailwindcss className="text-5xl hover:text-cyan-500 hover:scale-110 transition-transform"/>
                </React.Fragment>
            ))}
         </motion.div>
      </section>

      {/* --- SERVICIOS --- */}
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
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>
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

      {/* --- PROYECTOS --- */}
      <section id="proyectos" className="py-24 px-6 bg-[#050214]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
             <div>
                <span className="text-purple-400 font-bold tracking-widest uppercase mb-2 text-sm">Portafolio</span>
                <h4 className="text-3xl md:text-5xl font-bold mt-2">Proyectos Destacados</h4>
             </div>
             <div className="hidden md:block">
                 <NeonButton href={SOCIAL_LINKS.github} primary={false} icon={<FaGithub/>}>Ver GitHub</NeonButton>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS_DATA.map((project, index) => (
              <Card key={index} className="!p-0 !overflow-hidden h-full">
                 <div 
                    className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden rounded-t-2xl -mx-6 -mt-6 mb-6`}
                 >
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/30 z-0"></div> 
                    {project.icon}
                 </div>
                 <div className="flex flex-col h-full relative z-10">
                     {/* ARREGLADO: Etiqueta dentro del contenido, encima del título */}
                     {project.badge && (
                       <div className="self-start mb-2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                         <FaBolt /> {project.badge}
                       </div>
                     )}
                     <h4 className="text-2xl font-bold text-white mb-1">{project.title}</h4>
                     <p className="text-purple-400 text-xs font-bold uppercase mb-4">{project.subtitle}</p>
                     <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                     <div className="flex gap-2 text-[10px] font-mono text-gray-300 flex-wrap">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded border border-white/20">{tag}</span>
                        ))}
                     </div>
                 </div>
              </Card>
            ))}
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
                 <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="relative">
                     <div className="absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-[#030014] shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                     <span className="text-purple-400 font-bold font-mono text-sm">2026 - ACTUALIDAD</span>
                     <h5 className="text-xl font-bold text-white mt-1">Full Stack & Real-time Systems</h5>
                     <p className="text-gray-400 text-sm mt-2">Desarrollo de <span className="text-white font-bold">Bodega Jormard</span>. Integración de React, Vercel y Supabase con Android para sincronización de datos en tiempo real.</p>
                 </motion.div>

                 <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.2}} className="relative">
                     <div className="absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 bg-gray-700 rounded-full border-4 border-[#030014]"></div>
                     <span className="text-gray-500 font-bold font-mono text-sm">2025</span>
                     <h5 className="text-xl font-bold text-white mt-1">Especialización Móvil</h5>
                     <p className="text-gray-400 text-sm mt-2">Lanzamiento de <span className="text-white font-bold">ESAF</span>. Enfoque profundo en Kotlin, arquitectura MVVM y diseño de interfaces móviles avanzadas (Material Design).</p>
                 </motion.div>

                 <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.4}} className="relative">
                     <div className="absolute -left-[43px] md:-left-[59px] top-0 w-6 h-6 bg-gray-700 rounded-full border-4 border-[#030014]"></div>
                     <span className="text-gray-500 font-bold font-mono text-sm">2024</span>
                     <h5 className="text-xl font-bold text-white mt-1">Inicios Backend & Web</h5>
                     <p className="text-gray-400 text-sm mt-2">Desarrollo de <span className="text-white font-bold">Aldia Express</span>. Creación de sistemas monolíticos con PHP, MySQL y Java. Bases sólidas de programación.</p>
                 </motion.div>
             </div>
          </div>
      </section>

      {/* --- CONTACTO --- */}
      <section id="contacto" className="py-24 px-6 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
         
         <div className="max-w-3xl mx-auto text-center relative z-10 bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Tienes una idea en mente?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              No dejes que se quede solo en un pensamiento. Escríbeme y analicemos cómo llevar tu proyecto al siguiente nivel.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <NeonButton href={SOCIAL_LINKS.whatsapp} icon={<FaWhatsapp/>}>WhatsApp Directo</NeonButton>
                <NeonButton href={SOCIAL_LINKS.instagram} primary={false} icon={<FaInstagram/>}>Instagram</NeonButton>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 border-t border-white/5 bg-[#02010a] text-center relative z-10 text-gray-600 text-sm">
          <div className="flex justify-center gap-6 mb-4">
             <a href={SOCIAL_LINKS.github} target="_blank" className="text-gray-400 hover:text-white transition-colors hover:scale-125 transform"><FaGithub size={24}/></a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" className="text-gray-400 hover:text-blue-500 transition-colors hover:scale-125 transform"><FaLinkedin size={24}/></a>
             <a href={SOCIAL_LINKS.instagram} target="_blank" className="text-gray-400 hover:text-pink-500 transition-colors hover:scale-125 transform"><FaInstagram size={24}/></a>
          </div>
          <p>© 2026 <span className="text-purple-500 font-bold">NeyraDev</span>. Creado con pasión y mucho café.</p>
      </footer>

    </div>
  );
}

export default App;
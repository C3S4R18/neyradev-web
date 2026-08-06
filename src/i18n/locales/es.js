// Castellano — locale de referencia.
//
// Los demás idiomas copian EXACTAMENTE esta forma. Si añades una clave aquí,
// añádela en los 8 restantes o el texto saldrá `undefined`.
//
// Lo que NO vive aquí (está en App.jsx porque no se traduce): nombres propios
// de proyectos, nombres de tecnologías, precios, colores, iconos e imágenes.

export default {
  nav: {
    links: ["Servicios", "Proyectos", "Testimonios", "Planes", "Trayectoria", "Contacto"],
    chat: "Chat",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    whatsappCta: "Cotizar por WhatsApp",
  },

  lang: {
    label: "Idioma",
    switcherAria: "Cambiar idioma",
    modalTitle: "Elige tu idioma",
    modalSubtitle: "Hemos detectado este idioma en tu navegador. Puedes cambiarlo cuando quieras desde el menú.",
    detected: "Detectado",
    confirm: "Continuar",
  },

  hero: {
    badge: "OPEN TO WORK",
    greeting: "👋 Hola, soy",
    roles: ["Ingeniero de Software", "Desarrollador Full Stack", "Especialista Web & Móvil"],
    titleLine: "Creo Software",
    titleAccent: "Inteligente",
    desc: "Transformo necesidades de negocio en código de alto rendimiento.",
    specialtiesIntro: "Especializado en",
    specialties: ["Escalabilidad", "Seguridad", "Experiencia de Usuario"],
    ctaCV: "Descargar CV",
    ctaPortfolio: "Ver Portafolio",
    stats: {
      years: "Años Exp.",
      projects: "Proyectos Exitosos",
      clients: "Clientes Satisfechos",
    },
  },

  services: {
    label: "Mis Servicios",
    heading: "Soluciones Digitales 360°",
    techSpec: "Tech Spec:",
    items: {
      backend: {
        title: "Backend & Arquitectura",
        descSimple: "Construyo los cimientos invisibles que hacen que tu aplicación sea segura y rápida.",
        descTech: "Diseño de APIs RESTful escalables, gestión de bases de datos relacionales y autenticación segura (JWT).",
        businessValue: "Tus datos estarán seguros y tu sistema no se caerá.",
      },
      mobile: {
        title: "Desarrollo Móvil Nativo",
        descSimple: "Creo apps que tus clientes pueden descargar en Play Store. Rápidas y funcionan incluso sin internet.",
        descTech: "Desarrollo Android nativo con Kotlin, Arquitectura MVVM, Room Database para persistencia local y Coroutines.",
        businessValue: "Presencia directa en el bolsillo de tus clientes.",
      },
      web: {
        title: "Webs de Alto Rendimiento",
        descSimple: "Páginas web modernas que cargan al instante y aparecen primero en Google.",
        descTech: "Desarrollo Frontend con Next.js (SSR/ISR), optimización de Core Web Vitals y diseño responsive con Tailwind CSS.",
        businessValue: "Mayor visibilidad y conversión de ventas.",
      },
    },
  },

  projects: {
    label: "Portafolio",
    heading: "Mis Mejores Trabajos",
    sub: "Proyectos reales con impacto real.",
    viewDetails: "Ver Detalles",
    clickHint: "Click para ver galería y código",
    viewGithub: "Ver GitHub",
    filters: {
      todos: "Todos",
      empresarial: "Empresarial",
      fullstack: "Full Stack",
      web: "Web",
      movil: "Móvil",
    },
    badges: {
      current: "EMPRESA ACTUAL",
      success: "CASO DE ÉXITO",
      personal: "PROYECTO PERSONAL",
      corporate: "SISTEMA CORPORATIVO",
      wip: "EN DESARROLLO",
    },
    modal: {
      tabBusiness: "Negocio",
      tabTech: "Técnico",
      problem: "El Problema",
      solution: "La Solución",
      architecture: "Arquitectura",
      stack: "Stack Tecnológico",
      challenge: "Reto Principal",
      gallery: "Ver Capturas",
      visit: "Visitar Web App",
      quote: "Cotizar",
      close: "Cerrar",
      galleryAlt: "Captura del proyecto",
    },
    items: {
      ruag: {
        subtitle: "Web App de Gestión Agroindustrial",
        problem: "La empresa necesitaba controlar la producción en campo y oficina simultáneamente, eliminando el uso de papel y errores humanos.",
        solution: "Una plataforma centralizada donde la web administrativa y las apps de los operarios se sincronizan al instante.",
        impact: "Reducción del 40% en tiempos administrativos y control total del inventario en tiempo real.",
        architecture: "Monorepo con Frontend en Next.js y Backend Services.",
        challenges: "Sincronización de datos masivos en tiempo real y manejo de estados complejos en formularios dinámicos.",
        highlight: "Implementación de Server Side Rendering para reportes instantáneos.",
      },
      jormard: {
        subtitle: "Ecosistema de Inventario Real-Time",
        problem: "El dueño sufría de 'robo hormiga' y no sabía cuánto stock tenía hasta hacer inventario manual cada mes.",
        solution: "Un sistema que descuenta el stock automáticamente con cada venta. El dueño puede ver las ventas desde su celular en vivo.",
        impact: "Eliminación de pérdidas por robo y automatización del 100% del cuadre de caja.",
        architecture: "Arquitectura Serverless con Supabase (Backend as a Service).",
        challenges: "Conectar una App nativa Android con una Web React compartiendo la misma base de datos en tiempo real.",
        highlight: "Uso de Supabase Realtime Subscriptions para actualizar el stock sin recargar la página.",
      },
      aldia: {
        subtitle: "Plataforma Logística",
        problem: "La gestión de paquetes y rutas de entrega se hacía en Excel, causando retrasos y paquetes perdidos.",
        solution: "Un panel administrativo robusto para asignar rutas, rastrear estados y generar guías de remisión.",
        impact: "Optimización de rutas de entrega y trazabilidad completa del paquete.",
        architecture: "MVC (Modelo-Vista-Controlador) Monolítico.",
        challenges: "Gestión eficiente de miles de registros en MySQL y generación de PDFs dinámicos.",
        highlight: "Consultas SQL optimizadas e índices para reportes rápidos.",
      },
      esaf: {
        subtitle: "Educación Financiera Android",
        problem: "Necesidad de una herramienta accesible para usuarios con poca conectividad.",
        solution: "Una aplicación Android nativa, ligera y capaz de funcionar sin internet.",
        impact: "Alta retención de usuarios gracias a una experiencia fluida y diseño intuitivo.",
        architecture: "MVVM (Model-View-ViewModel) Clean Architecture.",
        challenges: "Implementación de 'Offline-First': sincronizar datos cuando vuelve la conexión.",
        highlight: "Uso de LiveData y ViewBinding para una UI reactiva y segura.",
      },
      cinnamo: {
        subtitle: "App Móvil de Diario Personal",
        problem: "Falta de una plataforma privada y estéticamente atractiva para el registro emocional y recuerdos diarios.",
        solution: "Aplicación móvil altamente estética e intuitiva con herramientas de seguimiento de estado de ánimo.",
        impact: "Mejora en el hábito de escritura de los usuarios gracias a una interfaz amigable y relajante.",
        architecture: "Clean Architecture MVVM enfocado en UI/UX interactivo.",
        challenges: "Implementación de temas dinámicos y animaciones fluidas manteniendo el alto rendimiento.",
        highlight: "Diseño 100% personalizado con persistencia de datos local ultra rápida.",
      },
      led: {
        subtitle: "Señalización Digital Móvil",
        problem: "Los usuarios requerían una forma rápida de transmitir mensajes a distancia en entornos ruidosos o eventos masivos.",
        solution: "Aplicación que convierte la pantalla de cualquier dispositivo en un letrero LED programable y dinámico.",
        impact: "Facilita la comunicación visual instantánea en conciertos, aeropuertos y vitrinas comerciales.",
        architecture: "Arquitectura nativa enfocada en rendimiento de renderizado gráfico.",
        challenges: "Mantener 60fps constantes mientras se dibujan y mueven cientos de píxeles LED simulados en pantalla.",
        highlight: "Uso avanzado del Canvas de Android para animaciones de texto fluidas.",
      },
      spin: {
        subtitle: "Gamificación & Entretenimiento",
        problem: "Necesidad de una herramienta digital, interactiva y personalizable para la toma de decisiones al azar.",
        solution: "Aplicación de ruletas personalizables con mecánicas de juego realistas, ideal para sorteos y dinámicas grupales.",
        impact: "Aumento en la retención de usuarios debido a la excelente respuesta táctil y diversión visual.",
        architecture: "Arquitectura orientada a eventos para el control físico de animaciones.",
        challenges: "Calcular matemáticamente la fricción, peso y desaceleración para asegurar que la ruleta sea 100% aleatoria.",
        highlight: "Integración de físicas realistas y feedback háptico inmersivo.",
      },
      jornada: {
        subtitle: "Control de Jornada Laboral",
        problem: "El control de horarios y turnos del personal se llevaba de forma manual, generando descuadres y falta de trazabilidad.",
        solution: "Plataforma para planificar jornadas, registrar entradas/salidas y consolidar reportes automáticos para RRHH.",
        impact: "Gestión centralizada de la jornada laboral y reportes de horas sin trabajo manual.",
        architecture: "Arquitectura Cliente-Servidor con base de datos centralizada.",
        challenges: "Consolidar registros de asistencia y calcular horas/turnos de forma confiable.",
        highlight: "Reportes automáticos de jornada listos para nómina.",
      },
      ssoma: {
        subtitle: "Gestión Documental SSOMA",
        problem: "La documentación de Seguridad, Salud Ocupacional y Medio Ambiente estaba dispersa y era difícil de auditar.",
        solution: "Repositorio digital centralizado para subir, organizar y consultar los archivos SSOMA con control de acceso.",
        impact: "Documentación ordenada, disponible al instante y lista para auditorías.",
        architecture: "Aplicación web con almacenamiento en la nube y control de permisos.",
        challenges: "Manejo seguro de archivos y permisos por rol dentro de la organización.",
        highlight: "Búsqueda y organización de documentos SSOMA en un solo lugar.",
      },
      // TODO (César): este proyecto sigue con textos de relleno. Rellénalo o
      // quítalo de PROJECTS_META en App.jsx antes de publicar.
      cubo: {
        subtitle: "Proyecto en Desarrollo",
        problem: "Proyecto en fase inicial: el planteamiento del problema se publicará al cerrar el alcance.",
        solution: "Proyecto actualmente en construcción. Próximamente más detalles.",
        impact: "Resultados pendientes de medir tras la primera entrega.",
        architecture: "Arquitectura en definición.",
        challenges: "Retos técnicos por documentar conforme avance el desarrollo.",
        highlight: "Proyecto en desarrollo activo.",
      },
    },
  },

  testimonials: {
    label: "Testimonios",
    heading: "Lo que dicen mis clientes",
    sub: "Resultados reales de negocios reales. Trato directo, entregas a tiempo.",
    // TODO (César): estos textos son de muestra, no son reseñas reales.
    // Sustitúyelos por reseñas verificables o retira la sección antes de publicar.
    items: {
      jorge: {
        role: "Gerente General · Ruag S.A.C.",
        text: "César digitalizó toda nuestra operación de campo. Redujimos los tiempos administrativos casi a la mitad y hoy controlamos el inventario en tiempo real desde el celular.",
      },
      maria: {
        role: "Dueña · Bodega Jormard",
        text: "Antes no sabía cuánto stock tenía hasta fin de mes. Ahora las ventas se descuentan solas y veo todo en vivo. Se acabaron las pérdidas por robo hormiga.",
      },
      luis: {
        role: "Coordinador Logístico · Aldia Express",
        text: "Pasamos de gestionar rutas en Excel a un panel donde rastreamos cada paquete. Entregas más rápidas y cero paquetes perdidos.",
      },
      ana: {
        role: "Coordinadora · Proyecto ESAF",
        text: "La app funciona incluso sin internet, que era justo lo que necesitábamos. Trabajo limpio, entregado a tiempo y con un diseño impecable.",
      },
      diego: {
        role: "Emprendedor · Startup E-commerce",
        text: "Comunicación directa y sin vueltas. Entendió el negocio antes de escribir una línea de código. La web carga al instante y ya rankea en Google.",
      },
      carla: {
        role: "Product Owner · Fintech",
        text: "Profesional de primer nivel. Arquitectura escalable, código ordenado y siempre proponiendo mejoras. Volvería a trabajar con él sin dudarlo.",
      },
    },
  },

  pricing: {
    label: "Inversión",
    heading: "Planes a tu medida",
    headingDetail: "Opciones: {category}",
    sub: "Soluciones escalables desarrolladas con las mejores prácticas de la industria. Elige una categoría para ver opciones.",
    subDetail: "Selecciona el nivel de desarrollo que tu proyecto necesita para escalar al siguiente nivel.",
    from: "Desde",
    back: "Volver a Categorías",
    popular: "Más Popular",
    recommended: "Recomendado",
    quote: "Cotizar Plan",
    approxNote: "Precios orientativos convertidos desde soles peruanos (S/). El importe final se acuerda antes de empezar.",
    categories: {
      web: {
        title: "Web Moderna",
        subtitle: "Presencia Digital",
        description: "Ideal para negocios que buscan captar clientes y tener una vitrina profesional 24/7.",
        features: [
          "Diseño UI/UX Personalizado",
          "Desarrollo ultrarrápido (Next.js)",
          "Optimización SEO para Google",
          "Panel Autoadministrable básico",
          "Diseño 100% Responsivo (Celular/PC)",
        ],
        actionText: "Ver Opciones Web",
      },
      app: {
        title: "App Móvil Nativa",
        subtitle: "La experiencia definitiva",
        description: "Aplicación Android fluida y robusta, lista para publicarse en la Google Play Store.",
        features: [
          "Desarrollo Nativo (Kotlin)",
          "Arquitectura de alto rendimiento",
          "Funcionamiento Offline (Sin internet)",
          "Notificaciones Push",
          "Subida a Google Play Store",
        ],
        actionText: "Ver Opciones Móviles",
      },
      fullstack: {
        title: "Sistema Full Stack",
        subtitle: "Solución Empresarial",
        description: "Ecosistema digital completo. App Móvil conectada a un Panel Web en tiempo real.",
        features: [
          "Todo lo del Plan Web + App Móvil",
          "Base de Datos Cloud (Supabase)",
          "Sincronización Real-Time",
          "Autenticación Avanzada de Usuarios",
          "Arquitectura Escalable",
        ],
        actionText: "Ver Opciones Full Stack",
      },
    },
    tiers: {
      webInfo: {
        title: "Informativa",
        subtitle: "Landing Page Esencial",
        description: "Perfecta para presentar tus servicios, captar leads y tener presencia oficial.",
        features: ["Diseño One-Page moderno", "Formulario de contacto", "Botón directo a WhatsApp", "SEO Básico inicial", "Adaptable a Celulares"],
        whatsappMsg: "Hola NeyraDev, me interesa cotizar una Web Informativa (Desde {price}).",
      },
      webDyn: {
        title: "Web Dinámica",
        subtitle: "Autoadministrable",
        description: "Web con varias secciones y panel administrador para gestionar tu contenido.",
        features: ["Múltiples vistas (Inicio, Nosotros...)", "Panel de Administrador seguro", "Base de Datos", "Gestión de Blog o Portafolio", "Dashboard básico de métricas"],
        whatsappMsg: "Hola NeyraDev, me interesa cotizar una Web Dinámica con Panel (Desde {price}).",
      },
      webShop: {
        title: "E-Commerce",
        subtitle: "Tienda Virtual Completa",
        description: "Vende en línea 24/7 con carrito de compras y pasarela de pagos.",
        features: ["Pasarela de pagos (Tarjetas/Yape)", "Carrito de compras dinámico", "Gestión de inventario y pedidos", "Perfiles de clientes", "Buscador avanzado y filtros"],
        whatsappMsg: "Hola NeyraDev, me interesa cotizar un E-Commerce / Tienda Virtual (Desde {price}).",
      },
      appBasic: {
        title: "App Básica",
        subtitle: "Catálogo / Herramienta",
        description: "Ideal para mostrar catálogos, noticias o herramientas útiles sin requerir login.",
        features: ["Desarrollo Nativo (Kotlin)", "Consumo de API", "Modo Offline Básico", "Animaciones fluidas", "UI/UX intuitiva"],
        whatsappMsg: "Hola NeyraDev, me interesa cotizar una App Básica (Desde {price}).",
      },
      appInter: {
        title: "App Interactiva",
        subtitle: "Gestión y Usuarios",
        description: "App con registro de usuarios, interacción en tiempo real y perfiles.",
        features: ["Autenticación segura (Google/Email)", "Base de datos en la nube", "Subida de imágenes/archivos", "Notificaciones Push", "Panel de configuración"],
        whatsappMsg: "Hola NeyraDev, me interesa cotizar una App Interactiva con Usuarios (Desde {price}).",
      },
      appComplex: {
        title: "App Compleja",
        subtitle: "Geolocalización / E-commerce",
        description: "Aplicaciones avanzadas con mapas, tracking o pasarelas de pago integradas.",
        features: ["GPS y Mapas en vivo", "Integración de Pagos Móviles", "Arquitectura escalable MVVM", "Múltiples tipos de usuarios", "Soporte y subida a Play Store"],
        whatsappMsg: "Hola NeyraDev, me interesa cotizar una App Compleja/Avanzada (Desde {price}).",
      },
      fsStart: {
        title: "Plan Inicial",
        subtitle: "App + Web Administrativa",
        description: "Un panel web para el administrador y una aplicación móvil para los usuarios.",
        features: ["App Android Nativa", "Panel Web en Next.js", "Base de Datos Centralizada", "Gestión de roles simple", "Despliegue inicial"],
        whatsappMsg: "Hola NeyraDev, me interesa el Sistema Full Stack Inicial (Desde {price}).",
      },
      fsPro: {
        title: "Plan Profesional",
        subtitle: "Sincronización Total",
        description: "Ecosistema robusto con interacción en tiempo real entre todas las plataformas.",
        features: ["Sincronización Real-Time completa", "Roles y Permisos avanzados", "Reportes y Gráficos Web", "Notificaciones Multi-plataforma", "Soporte Técnico extendido"],
        whatsappMsg: "Hola NeyraDev, me interesa el Sistema Full Stack Profesional (Desde {price}).",
      },
      fsEnterprise: {
        title: "Plan Enterprise",
        subtitle: "Escalabilidad a Medida",
        description: "Arquitectura compleja para startups, software corporativo o sistemas de alta demanda.",
        features: ["Múltiples Apps (Ej. Cliente/Repartidor)", "APIs Personalizadas (Node.js/PHP)", "Integración de facturación/pagos", "Infraestructura Cloud Segura", "Mantenimiento Continuo"],
        whatsappMsg: "Hola NeyraDev, busco una Solución Enterprise Full Stack a medida (Desde {price}).",
      },
    },
  },

  timeline: {
    heading: "Mi Trayectoria",
    sub: "Evolución constante en cada línea de código",
    items: {
      ruag: {
        period: "2026 - ACTUALIDAD",
        role: "Software Engineer en Ruag S.A.C.",
        desc: "Liderando la transformación digital de la empresa. Diseño y desarrollo de arquitectura escalable en Next.js y sincronización en tiempo real con Apps Android nativas.",
      },
      freelance: {
        period: "2025 - 2026",
        role: "Full Stack Freelance",
        desc: "Creación de ecosistema digital para Bodega Jormard. Implementación de CI/CD, bases de datos en tiempo real con Supabase y arquitectura Serverless.",
      },
      backend: {
        period: "2024",
        role: "Backend Developer (Legacy Systems)",
        desc: "Mantenimiento y refactorización de sistemas críticos en PHP y Java para Aldia Express. Optimización de consultas SQL complejas.",
      },
    },
  },

  contact: {
    label: "Contacto",
    headingLine: "Hablemos de tu",
    headingAccent: "Próximo Proyecto",
    desc: "¿Tienes una idea innovadora o necesitas escalar tu sistema actual? Estoy listo para unirme a tu equipo y aportar valor desde el día uno. Trato directo, sin intermediarios.",
    ctaWhatsapp: "WhatsApp Directo",
    ctaLinkedin: "LinkedIn",
    form: {
      name: "Tu Nombre",
      email: "Tu Correo",
      message: "Cuéntame tu idea",
      send: "Enviar Mensaje",
      sending: "Abriendo tu correo...",
      okTitle: "Hemos abierto tu correo",
      okBody: "Revisa la ventana nueva y pulsa enviar. Si no se abrió nada, escríbeme directamente:",
      writeTo: "Escribir a",
      again: "Enviar otro mensaje",
      subject: "Nuevo Mensaje de Portafolio: {name}",
      bodyName: "Nombre",
      bodyEmail: "Email",
      bodyMessage: "Mensaje",
    },
  },

  chat: {
    title: "Chat directo",
    subtitle: "Normalmente respondo en unas horas",
    greeting1: "¡Hola! Soy César 👋",
    greeting2: "Cuéntame qué necesitas o elige una opción.",
    suggestions: "Accesos rápidos",
    inputPlaceholder: "Escribe tu mensaje...",
    send: "Enviar",
    sentNote: "Abrimos WhatsApp con tu mensaje escrito. Solo pulsa enviar.",
    actions: {
      experience: "Ver Experiencia Ruag",
      quote: "Cotizar ahora",
      services: "Mis servicios",
      pricing: "Ver planes y precios",
    },
  },

  cv: {
    progress: "Progreso",
    integrity: "System Integrity: 100%",
    done: "¡DESCARGA COMPLETADA!",
    themes: {
      dev: ["npm install experience...", "git commit -m 'Senior Skills'", "Optimizando builds de React...", "Compilando TypeScript...", "Desplegando a Producción..."],
      kratos: ["Afilando Hacha Leviatán...", "Invocando ira espartana...", "Derrotando bugs mitológicos...", "Abriendo cofre legendario...", "Ragnarök detenido."],
      mario: ["Entrando a la tubería...", "Recolectando 100 monedas...", "Saltando sobre bugs...", "Rescatando el código...", "¡Power-up obtenido!"],
      tlou: ["Escaneando entorno...", "Crafteando soluciones...", "Evitando errores infectados...", "Buscando la luz...", "Sincronizando red..."],
      cyber: ["Hackeando la mainframe...", "Saltando cortafuegos...", "Subiendo código neuronal...", "Desencriptando datos...", "Conexión establecida."],
    },
  },

  currency: {
    label: "Moneda",
    switcherAria: "Cambiar moneda",
  },

  theme: {
    toLight: "Cambiar a modo claro",
    toDark: "Cambiar a modo oscuro",
  },

  footer: {
    rights: "Ingeniería de Software de Alto Nivel.",
  },
};

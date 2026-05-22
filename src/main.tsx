import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Languages,
  Layers3,
  Mail,
  Menu,
  Rocket,
  Send,
  Sparkles,
  Target,
  TerminalSquare,
  Trophy,
  RotateCcw,
  Users,
  X,
} from 'lucide-react';
import './styles.css';

type Lang = 'es' | 'en';

type Project = {
  title: string;
  category: 'frontend' | 'fullstack' | 'ui' | 'backend';
  label: string;
  description: string;
  impact: string;
  stack: string[];
  demo: string;
  repo: string;
  gradient: string;
};

type Tech = {
  name: string;
  icon: string;
};

const copy = {
  es: {
    nav: ['Inicio', 'Sobre mí', 'Habilidades', 'Terminal', 'Proyectos', 'Experiencia', 'Contacto'],
    cv: 'Descargar CV',
    status: 'Desarrollador Full Stack',
    heroTitle: 'Construyo soluciones digitales que generan',
    heroHighlight: 'impacto',
    heroText: 'Desarrollador Full Stack en formación, enfocado en aplicaciones web modernas, funcionales, responsivas y escalables.',
    seeProjects: 'Ver mis proyectos',
    contactMe: 'Contáctame',
    available: 'Disponible para nuevos proyectos',
    aboutEyebrow: '01 / Sobre mí',
    aboutTitle: 'Sobre',
    aboutHighlight: 'mí',
    aboutText: 'Desarrollador Full Stack en formación con enfoque práctico en la creación de soluciones web funcionales, claras y escalables. Tengo experiencia construyendo interfaces responsive, conectando APIs REST y organizando lógica de negocio con buenas prácticas.',
    opportunities: 'Abierto a nuevas oportunidades',
    techEyebrow: '02 / Stack tecnológico',
    techTitle: 'Tecnologías',
    learning: 'Siempre aprendiendo algo nuevo',
    projectsCount: '5+',
    projectsLabel: 'Proyectos desarrollados',
    hours: '500+',
    hoursLabel: 'Horas de código',
    techCount: '9+',
    techLabel: 'Tecnologías dominadas',
    constant: 'Constante',
    constantLabel: 'Aprendizaje y mejora',
    terminalEyebrow: '03 / Experiencia interactiva',
    terminalTitle: 'Modo',
    terminalHighlight: 'developer',
    terminalText: 'Una sección diferente para que el visitante interactúe con el portafolio como si estuviera usando una terminal real.',
    realCommands: 'Comandos reales',
    challenge: 'Mini reto técnico',
    memorable: 'Experiencia memorable',
    quickQuiz: 'Mini quiz',
    quickChallenge: 'Reto técnico rápido',
    reset: 'Reiniciar reto',
    run: 'Ejecutar',
    placeholder: 'Escribe help, projects, skills, contact...',
    projectEyebrow: '04 / Proyectos',
    projectTitle: 'Trabajos',
    projectHighlight: 'destacados',
    liveDemo: 'Live Demo',
    code: 'Código',
    experienceEyebrow: '05 / Experiencia',
    experienceTitle: 'Formación y',
    experienceHighlight: 'práctica',
    contactTitle: '¿Tienes un proyecto en mente?',
    contactSubtitle: 'Hablemos y hagámoslo realidad.',
    whatsapp: 'Hablemos por WhatsApp',
    footer: '© 2026 Todos los derechos reservados.',
    langLabel: 'EN',
  },
  en: {
    nav: ['Home', 'About', 'Skills', 'Terminal', 'Projects', 'Experience', 'Contact'],
    cv: 'Download CV',
    status: 'Full Stack Developer',
    heroTitle: 'I build digital solutions that create',
    heroHighlight: 'impact',
    heroText: 'Full Stack Developer in training, focused on modern, functional, responsive and scalable web applications.',
    seeProjects: 'View projects',
    contactMe: 'Contact me',
    available: 'Available for new projects',
    aboutEyebrow: '01 / About me',
    aboutTitle: 'About',
    aboutHighlight: 'me',
    aboutText: 'Full Stack Developer in training with a practical focus on creating clear, scalable and functional web solutions. I build responsive interfaces, connect REST APIs and organize business logic with good practices.',
    opportunities: 'Open to new opportunities',
    techEyebrow: '02 / Tech stack',
    techTitle: 'Technologies',
    learning: 'Always learning something new',
    projectsCount: '5+',
    projectsLabel: 'Completed projects',
    hours: '500+',
    hoursLabel: 'Coding hours',
    techCount: '9+',
    techLabel: 'Technologies mastered',
    constant: 'Constant',
    constantLabel: 'Learning and improvement',
    terminalEyebrow: '03 / Interactive experience',
    terminalTitle: 'Developer',
    terminalHighlight: 'mode',
    terminalText: 'A different section where visitors can interact with the portfolio as if they were using a real terminal.',
    realCommands: 'Real commands',
    challenge: 'Mini tech challenge',
    memorable: 'Memorable experience',
    quickQuiz: 'Mini quiz',
    quickChallenge: 'Quick technical challenge',
    reset: 'Reset challenge',
    run: 'Run',
    placeholder: 'Type help, projects, skills, contact...',
    projectEyebrow: '04 / Projects',
    projectTitle: 'Featured',
    projectHighlight: 'work',
    liveDemo: 'Live Demo',
    code: 'Code',
    experienceEyebrow: '05 / Experience',
    experienceTitle: 'Training and',
    experienceHighlight: 'practice',
    contactTitle: 'Do you have a project in mind?',
    contactSubtitle: 'Let’s talk and make it real.',
    whatsapp: 'Chat on WhatsApp',
    footer: '© 2026 All rights reserved.',
    langLabel: 'ES',
  },
};

const projects: Project[] = [
  {
    title: 'Orígenes Colombia',
    category: 'fullstack',
    label: 'E-commerce cultural',
    description: 'Tienda online para promocionar productos inspirados en la cultura colombiana, con catálogo, experiencia visual moderna y navegación clara.',
    impact: 'Catálogo, carrito, filtros e integración frontend-backend.',
    stack: ['Java', 'Spring Boot', 'JavaScript', 'PostgreSQL', 'REST API'],
    demo: 'https://luisjaviersalgado.github.io/proyecto-origenes/',
    repo: 'https://github.com/luisjaviersalgado/proyecto-origenes',
    gradient: 'from-amber to-orange',
  },
  {
    title: 'Mini Tienda',
    category: 'frontend',
    label: 'Carrito de compras',
    description: 'Proyecto frontend interactivo que simula una tienda con productos, carrito, cálculo de totales y experiencia responsive.',
    impact: 'Interacción directa con JavaScript y lógica de compra.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    demo: 'https://luisjaviersalgado.github.io/Mini-Tienda-con-Carrito-de-Compras/',
    repo: 'https://github.com/luisjaviersalgado/Mini-Tienda-con-Carrito-de-Compras',
    gradient: 'from-yellow to-green',
  },
  {
    title: 'Hackathon Project',
    category: 'ui',
    label: 'Reto colaborativo',
    description: 'Solución construida en equipo durante hackathon, enfocada en maquetación, diseño visual, comunicación clara y entrega rápida.',
    impact: 'Trabajo colaborativo, prototipado rápido y presentación funcional.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub'],
    demo: 'https://luisjaviersalgado.github.io/HACKATON/',
    repo: 'https://github.com/luisjaviersalgado/HACKATON',
    gradient: 'from-blue to-purple',
  },
  {
    title: 'Portfolio Backend API',
    category: 'backend',
    label: 'API REST profesional',
    description: 'Backend base creado para alimentar el portafolio con información de perfil, proyectos, tecnologías y contacto.',
    impact: 'Arquitectura limpia, endpoints REST, DTOs y configuración lista para evolucionar.',
    stack: ['Java', 'Spring Boot', 'REST API', 'DTOs'],
    demo: '#backend',
    repo: '#backend',
    gradient: 'from-green to-blue',
  },
  {
    title: 'Terminal Portfolio',
    category: 'frontend',
    label: 'Experiencia interactiva',
    description: 'Sección tipo terminal donde el visitante ejecuta comandos, consulta skills, proyectos y datos de contacto.',
    impact: 'React state, eventos, UX interactiva y experiencia memorable para reclutadores.',
    stack: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    demo: '#terminal',
    repo: '#terminal',
    gradient: 'from-purple to-blue',
  },
];

const technologies: Tech[] = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ui', label: 'UI / Reto' },
];

const terminalResponses: Record<Lang, Record<string, string[]>> = {
  es: {
    help: ['Comandos disponibles:', 'about     -> Conoce mi perfil profesional', 'skills    -> Ver mi stack principal', 'projects  -> Abrir resumen de proyectos', 'backend   -> Ver la API creada para este portafolio', 'contact   -> Ver canales de contacto', 'hire me   -> Mensaje para reclutadores o clientes', 'clear     -> Limpiar terminal'],
    about: ['Luis Javier Salgado | Desarrollador Full Stack en formación.', 'Construyo interfaces modernas y APIs REST con enfoque práctico, visual y funcional.'],
    skills: ['Frontend: React, JavaScript, HTML5, CSS3, Bootstrap.', 'Backend: Java, Spring Boot, REST API, PostgreSQL.', 'Herramientas: Git, GitHub, Figma y buenas prácticas de desarrollo.'],
    projects: ['Proyectos destacados:', '1. Orígenes Colombia -> E-commerce cultural full stack.', '2. Mini Tienda -> Carrito de compras interactivo.', '3. Hackathon Project -> Solución colaborativa.', '4. Portfolio Backend API -> REST API con Spring Boot.', '5. Terminal Portfolio -> Experiencia interactiva en React.'],
    backend: ['Backend incluido en la carpeta portfolio-backend-api.', 'Endpoints disponibles: /api/profile, /api/projects, /api/technologies y /api/contact.'],
    contact: ['Email: luisjaviersalgadoguzman@gmail.com', 'WhatsApp: +57 310 568 9138', 'LinkedIn: luis-salgado-guzman-desarrollo-full-stack-java'],
    'hire me': ['Disponible para proyectos Frontend, Backend y Full Stack.', 'Puedo ayudarte a convertir una idea en una aplicación clara, moderna y funcional.'],
  },
  en: {
    help: ['Available commands:', 'about     -> Read my professional profile', 'skills    -> View my main stack', 'projects  -> Open projects summary', 'backend   -> View the API included in this portfolio', 'contact   -> View contact channels', 'hire me   -> Message for recruiters or clients', 'clear     -> Clear terminal'],
    about: ['Luis Javier Salgado | Full Stack Developer in training.', 'I build modern interfaces and REST APIs with a practical, visual and functional approach.'],
    skills: ['Frontend: React, JavaScript, HTML5, CSS3, Bootstrap.', 'Backend: Java, Spring Boot, REST API, PostgreSQL.', 'Tools: Git, GitHub, Figma and development best practices.'],
    projects: ['Featured projects:', '1. Orígenes Colombia -> Full stack cultural e-commerce.', '2. Mini Tienda -> Interactive shopping cart.', '3. Hackathon Project -> Collaborative challenge solution.', '4. Portfolio Backend API -> Spring Boot REST API.', '5. Terminal Portfolio -> Interactive React experience.'],
    backend: ['Backend included in the portfolio-backend-api folder.', 'Available endpoints: /api/profile, /api/projects, /api/technologies and /api/contact.'],
    contact: ['Email: luisjaviersalgadoguzman@gmail.com', 'WhatsApp: +57 310 568 9138', 'LinkedIn: luis-salgado-guzman-desarrollo-full-stack-java'],
    'hire me': ['Available for Frontend, Backend and Full Stack projects.', 'I can help turn an idea into a clear, modern and functional application.'],
  },
};

const challengeQuestions = [
  { question: '¿Qué tecnología se usa principalmente para construir interfaces dinámicas en este portafolio?', options: ['React', 'Excel', 'Photoshop'], answer: 'React' },
  { question: '¿Qué framework backend aparece en el stack profesional?', options: ['Spring Boot', 'WordPress', 'Laravel'], answer: 'Spring Boot' },
  { question: '¿Qué base de datos aparece en los proyectos?', options: ['PostgreSQL', 'PowerPoint', 'Notepad'], answer: 'PostgreSQL' },
  { question: '¿Qué herramienta se usa para control de versiones?', options: ['Git', 'Figma', 'Slack'], answer: 'Git' },
  { question: '¿Qué lenguaje se usa principalmente en el frontend?', options: ['JavaScript', 'Python', 'C++'], answer: 'JavaScript' },
  { question: '¿Qué librería ayuda con animaciones en React?', options: ['Framer Motion', 'JUnit', 'Hibernate'], answer: 'Framer Motion' },
  { question: '¿Qué tecnología se usa para estilos responsive?', options: ['Bootstrap', 'MongoDB', 'Docker'], answer: 'Bootstrap' },
  { question: '¿Qué plataforma se usa para diseño UI/UX?', options: ['Figma', 'Postman', 'Redis'], answer: 'Figma' },
];

function sectionId(label: string) {
  const map: Record<string, string> = {
    Inicio: 'inicio', Home: 'inicio',
    'Sobre mí': 'sobre-mí', About: 'sobre-mí',
    Habilidades: 'habilidades', Skills: 'habilidades',
    Terminal: 'terminal',
    Proyectos: 'proyectos', Projects: 'proyectos',
    Experiencia: 'experiencia', Experience: 'experiencia',
    Contacto: 'contacto', Contact: 'contacto',
  };
  return map[label] ?? 'inicio';
}

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let width = 0;
    let height = 0;
    let animationId = 0;
    const particles = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, radius: Math.random() * 1.8 + 0.8 }));
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        particle.x += particle.vx / width;
        particle.y += particle.vy / height;
        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
        const x = particle.x * width;
        const y = particle.y * height;
        context.beginPath();
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(251, 191, 36, 0.75)';
        context.fill();
        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const nx = next.x * width;
          const ny = next.y * height;
          const distance = Math.hypot(x - nx, y - ny);
          if (distance < 135) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(nx, ny);
            context.strokeStyle = `rgba(251, 191, 36, ${0.18 - distance / 900})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}

function Header({ lang, setLang }: { lang: Lang; setLang: React.Dispatch<React.SetStateAction<Lang>> }) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const goTo = (label: string) => {
    document.getElementById(sectionId(label))?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };
  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio"><Code2 size={30} /><span>Luis Javier <strong>Salgado</strong></span></a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X /> : <Menu />}</button>
      <nav className={`nav ${open ? 'is-open' : ''}`}>
        {t.nav.map((item) => <button key={item} type="button" onClick={() => goTo(item)}>{item}</button>)}
        <button className="language-toggle" type="button" onClick={() => setLang((current) => current === 'es' ? 'en' : 'es')}><Languages size={16} /> {t.langLabel}</button>
        <a className="cv-button" href={`${import.meta.env.BASE_URL}assets/cv-luis-javier-salgado.pdf`} target="_blank" rel="noreferrer" download>{t.cv} <Download size={16} /></a>
      </nav>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 110]);
  return (
    <section id="inicio" className="hero section-shell">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="status-pill">{t.status} <span /></span>
        <h1>{t.heroTitle} <strong>{t.heroHighlight}</strong></h1>
        <p>{t.heroText}</p>
        <div className="hero-actions"><a href="#proyectos" className="primary-action">{t.seeProjects} <ArrowRight size={20} /></a><a href="#contacto" className="secondary-action">{t.contactMe} <Send size={18} /></a></div>
        <div className="social-row"><a href="https://github.com/luisjaviersalgado" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a><a href="https://www.linkedin.com/in/luis-salgado-guzman-desarrollo-full-stack-java" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="mailto:luisjaviersalgadoguzman@gmail.com" aria-label="Email"><Mail /></a></div>
      </motion.div>
      <motion.div className="hero-visual" style={{ y }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="portrait-ring"><img src={`${import.meta.env.BASE_URL}assets/profile.jpg`} alt="Foto de perfil de Luis Javier Salgado" onError={(event) => { event.currentTarget.src = `${import.meta.env.BASE_URL}assets/profile.svg`; }} /></div>
        <FloatingIcon className="float-one" icon={<Code2 />} /><FloatingIcon className="float-two" icon={<Database />} /><FloatingIcon className="float-three" icon={<Rocket />} /><FloatingIcon className="float-four" icon={<Layers3 />} />
        <div className="availability"><span /> {t.available}</div>
      </motion.div>
    </section>
  );
}

function FloatingIcon({ icon, className }: { icon: React.ReactNode; className: string }) {
  return <motion.div className={`floating-icon ${className}`} animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity }}>{icon}</motion.div>;
}

function SectionHeading({ eyebrow, title, highlight }: { eyebrow: string; title: string; highlight?: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title} {highlight && <em>{highlight}</em>}</h2></div>;
}

function About({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const cards = [
    { title: 'Frontend', icon: <Code2 />, text: lang === 'es' ? 'Interfaces atractivas, responsivas y orientadas al usuario.' : 'Attractive, responsive and user-focused interfaces.' },
    { title: 'Backend', icon: <Database />, text: lang === 'es' ? 'APIs REST con Java, Spring Boot y persistencia de datos.' : 'REST APIs with Java, Spring Boot and data persistence.' },
    { title: lang === 'es' ? 'Colaboración' : 'Collaboration', icon: <Users />, text: lang === 'es' ? 'Git, GitHub, trabajo en equipo y aprendizaje continuo.' : 'Git, GitHub, teamwork and continuous learning.' },
    { title: lang === 'es' ? 'Enfoque' : 'Focus', icon: <Rocket />, text: lang === 'es' ? 'Código limpio, buenas prácticas y mejora constante.' : 'Clean code, best practices and continuous improvement.' },
  ];
  return (
    <section id="sobre-mí" className="section-shell about-section">
      <div className="about-copy"><SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} highlight={t.aboutHighlight} /><p>{t.aboutText}</p><div className="opportunity-pill"><Users size={22} /> {t.opportunities} <span /></div></div>
      <div className="about-cards">{cards.map((card) => <motion.article className="feature-card" key={card.title} whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}><div className="feature-icon">{card.icon}</div><h3>{card.title}</h3><p>{card.text}</p></motion.article>)}</div>
    </section>
  );
}

function Technologies({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section id="habilidades" className="section-shell tech-panel">
      <div className="tech-header"><SectionHeading eyebrow={t.techEyebrow} title={t.techTitle} /><div className="learning-badge"><Sparkles size={18} /> {t.learning}</div></div>
      <div className="tech-grid">{technologies.map((tech) => <motion.div className="tech-card" key={tech.name} whileHover={{ y: -8, scale: 1.04 }}><img src={tech.icon} alt={tech.name} /><strong>{tech.name}</strong></motion.div>)}</div>
      <div className="stats-panel"><Stat icon={<Code2 />} value={t.projectsCount} label={t.projectsLabel} /><Stat icon={<Target />} value={t.hours} label={t.hoursLabel} /><Stat icon={<Layers3 />} value={t.techCount} label={t.techLabel} /><Stat icon={<Rocket />} value={t.constant} label={t.constantLabel} /></div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div className="stat"><div>{icon}</div><strong>{value}</strong><span>{label}</span></div>;
}

function InteractiveTerminal({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [history, setHistory] = useState<string[]>(lang === 'es' ? ['Bienvenido al modo interactivo de Luis Javier.', 'Escribe help para ver los comandos disponibles.'] : ['Welcome to Luis Javier interactive mode.', 'Type help to see available commands.']);
  const [command, setCommand] = useState('');
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(lang === 'es' ? ['Idioma cambiado a español.', 'Escribe help para ver los comandos disponibles.'] : ['Language changed to English.', 'Type help to see available commands.']);
  }, [lang]);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const runCommand = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedCommand = command.trim().toLowerCase();
    if (!normalizedCommand) return;
    if (normalizedCommand === 'clear') {
      setHistory([lang === 'es' ? 'Terminal limpia. Escribe help para iniciar otra vez.' : 'Terminal cleared. Type help to start again.']);
      setCommand('');
      return;
    }
    const response = terminalResponses[lang][normalizedCommand] ?? [`${lang === 'es' ? 'Comando no reconocido' : 'Unknown command'}: ${normalizedCommand}`, lang === 'es' ? 'Sugerencia: prueba con help, projects, backend, skills o contact.' : 'Tip: try help, projects, backend, skills or contact.'];
    setHistory((current) => [...current, `> ${command}`, ...response]);
    setCommand('');
  };

  const answerQuestion = (question: string, option: string, answer: string) => {
    if (answered.includes(question)) return;
    const isCorrect = option === answer;
    setAnswered((current) => [...current, question]);
    setScore((current) => current + (isCorrect ? 1 : 0));
    setHistory((current) => [...current, `> challenge: ${option}`, isCorrect ? 'Respuesta correcta. Buen ojo técnico.' : `Respuesta incorrecta. La respuesta era: ${answer}.`]);
  };

  const resetChallenge = () => {
    setScore(0);
    setAnswered([]);
    setHistory((current) => [...current, '> reset challenge', lang === 'es' ? 'Reto reiniciado. Intenta conseguir 3/3.' : 'Challenge reset. Try to score 3/3.']);
  };

  return (
    <section id="terminal" className="section-shell interactive-section">
      <div className="interactive-copy"><SectionHeading eyebrow={t.terminalEyebrow} title={t.terminalTitle} highlight={t.terminalHighlight} /><p>{t.terminalText}</p><div className="interactive-highlights"><span><TerminalSquare size={18} /> {t.realCommands}</span><span><Trophy size={18} /> {t.challenge}</span><span><Sparkles size={18} /> {t.memorable}</span></div></div>
      <div className="interactive-grid">
        <motion.div className="terminal-card" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="terminal-topbar"><div><i /><i /><i /></div><strong>luis@portfolio:~</strong><span>online</span></div>
          <div className="terminal-body" ref={terminalRef}>{history.map((line, index) => <p key={`${line}-${index}`} className={line.startsWith('>') ? 'command-line' : ''}>{line}</p>)}</div>
          <form className="terminal-input" onSubmit={runCommand}><span>$</span><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder={t.placeholder} aria-label="Comando de terminal" /><button type="submit">{t.run}</button></form>
        </motion.div>
        <motion.div className="challenge-card" initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="challenge-header"><div><span>{t.quickQuiz}</span><h3>{t.quickChallenge}</h3></div><strong>{score}/{challengeQuestions.length}</strong></div>
          <div className="questions-list">{challengeQuestions.map((item) => <article key={item.question}><p>{item.question}</p><div>{item.options.map((option) => <button key={option} type="button" disabled={answered.includes(item.question)} onClick={() => answerQuestion(item.question, option, item.answer)}>{option}</button>)}</div></article>)}</div>
          <button className="reset-challenge" type="button" onClick={resetChallenge}><RotateCcw size={16} /> {t.reset}</button>
        </motion.div>
      </div>
    </section>
  );
}

function Projects({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = useMemo(() => projects.filter((project) => activeFilter === 'all' || project.category === activeFilter), [activeFilter]);
  return (
    <section id="proyectos" className="section-shell projects-section">
      <div className="projects-top"><SectionHeading eyebrow={t.projectEyebrow} title={t.projectTitle} highlight={t.projectHighlight} /><div className="filters">{filters.map((filter) => <button key={filter.id} className={activeFilter === filter.id ? 'active' : ''} onClick={() => setActiveFilter(filter.id)} type="button">{filter.label}</button>)}</div></div>
      <div className="project-showcase">{filteredProjects.map((project, index) => <motion.article className={`project-card ${project.gradient}`} key={project.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: index * 0.08 }}><div className="project-info"><span>{project.label}</span><h3>{project.title}</h3><p>{project.description}</p><div className="impact"><Sparkles size={17} /> {project.impact}</div><div className="project-stack">{project.stack.map((tech) => <small key={tech}>{tech}</small>)}</div><div className="project-actions"><a href={project.demo} target={project.demo.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{t.liveDemo} <ExternalLink size={16} /></a><a href={project.repo} target={project.repo.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{t.code} <Code2 size={16} /></a></div></div><div className="browser-preview"><div className="browser-bar"><i /><i /><i /><strong>{project.title}</strong></div>{project.demo.startsWith('http') ? <iframe src={project.demo} title={`Demo de ${project.title}`} loading="lazy" /> : <div className="local-preview"><Code2 size={48} /><strong>{project.title}</strong><span>{project.stack.join(' • ')}</span></div>}<div className="preview-glow" /></div></motion.article>)}</div>
    </section>
  );
}

function Experience({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section id="experiencia" className="section-shell experience-section">
      <SectionHeading eyebrow={t.experienceEyebrow} title={t.experienceTitle} highlight={t.experienceHighlight} />
      <div className="timeline"><article><span>{lang === 'es' ? 'En curso' : 'In progress'}</span><h3>{lang === 'es' ? 'Desarrollador Fullstack en formación' : 'Full Stack Developer in training'}</h3><p>{lang === 'es' ? 'Generation Colombia. Construcción de proyectos web completos usando frontend, backend, Git, APIs REST y bases de datos.' : 'Generation Colombia. Building complete web projects using frontend, backend, Git, REST APIs and databases.'}</p></article><article><span>{lang === 'es' ? 'En curso' : 'In progress'}</span><h3>{lang === 'es' ? 'Ingeniería de Sistemas' : 'Systems Engineering'}</h3><p>{lang === 'es' ? 'Formación profesional enfocada en análisis, desarrollo y solución de problemas tecnológicos.' : 'Professional training focused on analysis, development and technology problem solving.'}</p></article><article><span>2025</span><h3>{lang === 'es' ? 'Tecnólogo en Gestión de Sistemas de Información' : 'Information Systems Management Technologist'}</h3><p>{lang === 'es' ? 'Bases sólidas en gestión tecnológica, desarrollo y administración de sistemas de información.' : 'Strong foundations in technology management, development and information systems administration.'}</p></article></div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <section id="contacto" className="section-shell contact-section"><div><h2>{t.contactTitle}</h2><p>{t.contactSubtitle}</p></div><a className="whatsapp-cta" href="https://wa.me/573105689138?text=Hola%20Luis%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20contigo." target="_blank" rel="noreferrer"><span>💬</span><div><small>{t.whatsapp}</small><strong>310 568 9138</strong></div><ArrowRight /></a></section>;
}

function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('portfolio-lang') as Lang) || 'es');
  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = copy[lang];
  return (
    <>
      <ParticlesCanvas />
      <div className="site-glow" />
      <Header lang={lang} setLang={setLang} />
      <main><Hero lang={lang} /><About lang={lang} /><Technologies lang={lang} /><InteractiveTerminal lang={lang} /><Projects lang={lang} /><Experience lang={lang} /><Contact lang={lang} /></main>
      <footer className="footer"><div className="brand"><Code2 size={28} /><span>Luis Javier <strong>Salgado</strong></span></div><p>{t.footer}</p><a href="#inicio" aria-label="Volver arriba">↑</a></footer>
      <a className="whatsapp-floating" href="https://wa.me/573105689138?text=Hola%20Luis%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20contigo." target="_blank" rel="noreferrer">WhatsApp</a>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);

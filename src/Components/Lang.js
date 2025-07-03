// lang.js
// Lógica de traducción centralizada para múltiples páginas

import React, { createContext, useContext, useState } from 'react';

const translations = {
    es: {
        'page-title': 'Rincón Creativo de Salonas (◕⩊◕)',
        'header-title-index': 'Home & Bio ╰(￣ω￣╰)',
        'header-title-skills': 'Habilidades (˶˃ᆺ˂˶)',
        'header-title-projects': 'Mis proyectos ≽(•⩊ •)≼',
        'header-title-contact': 'Contacto ٩(ˊᗜˋ )و',
        'nav-home': 'Home & Bio',
        'nav-skills': 'Habilidades',
        'nav-projects': 'Proyectos',
        'nav-contact': 'Contacto',
        'welcome-title': '¡Bienvenido a mi sitio web!',
        'about-title': 'Sobre mí',
        'about-desc': '¡Hola! Soy <strong>Salonas</strong> <span style="font-size:0.8em;">(Él)</span>, estudiante de ingeniería informática de Concepción, Chile.',
        'journey-title': 'Mi Trayectoria',
        'journey-desc': 'No crecí soñando con ser programador. De hecho, no logré entrar a la escuela de música y terminé en programación de casualidad, pero curiosamente, me gustó.<br />Actualmente me sumerjo de lleno en el desarrollo web, aprendiendo sobre la marcha y avanzando poco a poco hacia ser fullstack.<br />Hago apps web simples (por ahora) que ojalá no se caigan, y pixel art que parece salido del cuaderno de un adolescente.<br />Queda mucho camino, pero disfruto el caos y el momento. No soy un mago del código, solo alguien que tropezó con la programación y se quedó porque le permite crear cosas que se sienten propias.',
        'journey-quote': 'Mi trabajo no es perfecto, pero es honesto. Y eso cuenta.',
        'interests-title': 'Intereses',
        'interests-desc': 'Soy fan de <strong>FromSoftware</strong>, sus mundos son raros, silenciosos y bellamente rotos, como mi propio proceso creativo.<br />Disfruto sobre todo los RPG y juegos de estrategia, pero me gusta cualquier cosa con buena historia o que me sorprenda.',
        'community-title': 'Comunidad',
        'community-desc': 'Orgulloso miembro de las comunidades LGBTQ+ y furry, siempre abierto a conectar, compartir y crecer juntos.',
        'community-quote': '¡Mis DMs siempre están abiertos, ya sea para colaborar, charlar o solo saludar!',
        'footer-title': '¿Te perdiste?',
        'footer-desc': 'No te preocupes, pasa seguido.',
        'footer-top-btn': '↑ Volver arriba ≽(˵> ω <˵)≼',
        'footer-copyright': '© 2025 Salonas | Todos los derechos reservados',
        'music-toggle-btn': '¿Música de fondo? Eww',
        'music-stop-btn': 'Suficiente tortura, detenla',
        // Contact page translations
        'contact-title': '¡Pongamonos en contacto!',
        'contact-info-title': 'Información de Contacto',
        'contact-form-title': 'Formulario de Contacto',
        'contact-email-label': 'Correo',
        'contact-github-label': 'GitHub',
        'contact-discord-label': 'Discord',
        'contact-form-name-label': 'Nombre',
        'contact-form-email-label': 'Correo electrónico',
        'contact-form-message-label': 'Mensaje',
        'contact-form-send-btn': 'Enviar mensaje',
        'contact-modal-title': '¡Mensaje enviado!',
        'contact-modal-message': 'Tu mensaje ha sido enviado exitosamente. ¡Gracias por contactarme!',
        'contact-modal-close': 'Cerrar',
        // Skills page translations
        'skills-title': 'Habilidades',
        'skills-languages': 'Lenguajes de Programación',
        'skill-python': 'Python',
        'skill-java': 'Java',
        'skill-csharp': 'C#',
        'skill-js': 'JavaScript (ES6+)',
        'skills-technologies': 'Tecnologías',
        'skill-react': 'React',
        'skill-node': 'Node.js',
        'skill-tailwind': 'Tailwind CSS',
        'skill-htmlcss': 'HTML5 y CSS3',
        'skills-creativity': 'Creatividad',
        'skill-pixelart': 'Pixel Art',
        'skill-uiux': 'Diseño UI/UX',
        'skill-sketching': 'Dibujo Digital',
        'skills-other': 'Otras Habilidades',
        'skill-teamwork': 'Trabajo en equipo',
        'skill-problem': 'Resolución creativa de problemas',
        'skill-selflearning': 'Autodidacta',
        // Projects page translations
        'projects-title': 'Proyectos',
        'project-orquesta-title': 'OrquestaDeCobquecuraWEB',
        'project-orquesta-subtitle': 'Orquesta Juvenil de Cobquecura - Sistema Web',
        'project-orquesta-status': 'Estado: En desarrollo (WIP)',
        'project-orquesta-desc-title': 'Descripción:',
        'project-orquesta-desc': 'Sistema web diseñado para apoyar la gestión administrativa y académica de la Orquesta Juvenil de Cobquecura. Permite gestionar estudiantes, profesores, instrumentos, eventos y noticias, facilitando el seguimiento académico y el control de inventario.',
        'project-orquesta-features-title': 'Características principales:',
        'feature-admin': 'Panel de administración (gestión de usuarios, profesores y eventos)',
        'feature-academic': 'Sistema académico (horarios, asistencia, evaluaciones, progreso estudiantil)',
        'feature-instruments': 'Gestión de instrumentos (inventario, préstamos y mantención)',
        'feature-news': 'Publicación de noticias y eventos',
        'feature-roles': 'Acceso por roles para estudiantes, profesores y administradores',
        'project-orquesta-tech-title': 'Tecnologías utilizadas:',
        'tech-frontend': 'Frontend: React 18, Tailwind CSS, React Router DOM',
        'tech-backend': 'Backend: Node.js, Express.js, MySQL, JWT, Multer',
        'project-orquesta-db-title': 'Base de datos:',
        'project-orquesta-db-desc': 'Estructura de base de datos MySQL optimizada con scripts públicos, diseñada para escalabilidad y automatización, sin incluir datos sensibles.',
        'project-orquesta-link': 'Ver repositorio en GitHub'
    },
    en: {
        'page-title': "Salonas' Creative Corner (◕⩊◕)",
        'header-title-index': 'Home & Bio ╰(￣ω￣╰)',
        'header-title-skills': 'Skills (˶˃ᆺ˂˶)',
        'header-title-projects': 'My Projects ≽(•⩊ •)≼',
        'header-title-contact': 'Contact ٩(ˊᗜˋ )و',
        'nav-home': 'Home & Bio',
        'nav-skills': 'Skills',
        'nav-projects': 'My Projects',
        'nav-contact': 'Contact',
        'welcome-title': 'Welcome to my website!',
        'about-title': 'About Me',
        'about-desc': "Hi! I'm <strong>Salonas</strong> <span style=\"font-size:0.8em;\">(He/Him)</span>, a computer engineering student from Concepción, Chile.",
        'journey-title': 'My Journey',
        'journey-desc': "I didn't grew up dreaming of becoming a programmer. Honestly, I failed to get into music school and kind of tripped into programming last minute, but weirdly, it clicked.<br />Right now I'm diving headfirst into web development, learning as I go and slowly working my way toward becoming a fullstack dev.<br />I build simple web apps (for now) that hopefully don't crash, and make pixel art that looks like it fell out of a teenager's sketchbook.<br />There's a long way to go, but I'm enjoying the mess and the moment. I'm not some code wizard, I'm just someone who stumbled into programming and stuck with it because it gave me a way to build things that feel like me.",
        'journey-quote': "My work's not perfect, but it's honest. And I think that counts.",
        'interests-title': 'Interests',
        'interests-desc': "I'm a big fan of <strong>FromSoftware</strong>, their worlds are weird, quiet, and beautifully broken, kind of like my own creative process.<br />I mostly enjoy RPGs and strategy games, but I'm open to just about anything that tells a good story or surprises me.",
        'community-title': 'Community',
        'community-desc': 'Proud member of the LGBTQ+ and furry communities, always open to connect, share, and grow together.',
        'community-quote': 'DMs are always open, whether for collabs, chats, or just to say hi!',
        'footer-title': 'Lost your way?',
        'footer-desc': "Don't worry, it happens.",
        'footer-top-btn': '↑ Back to the Top ≽(˵> ω <˵)≼',
        'footer-copyright': '© 2025 Salonas | All Rights Reserved',
        'music-toggle-btn': 'Turn on tha radio?',
        'music-stop-btn': "Nah, Fuck it turn it off!",
        // Contact page translations
        'contact-title': "Let's get in touch!",
        'contact-info-title': 'Contact Info',
        'contact-form-title': 'Contact Form',
        'contact-email-label': 'Email',
        'contact-github-label': 'GitHub',
        'contact-discord-label': 'Discord',
        'contact-form-name-label': 'Name',
        'contact-form-email-label': 'Email',
        'contact-form-message-label': 'Message',
        'contact-form-send-btn': 'Send Message',
        'contact-modal-title': 'Message sent!',
        'contact-modal-message': 'Your message has been sent successfully. Thank you for reaching out!',
        'contact-modal-close': 'Close',
        // Skills page translations
        'skills-title': 'My Skills',
        'skills-languages': 'Programming Languages',
        'skill-python': 'Python',
        'skill-java': 'Java',
        'skill-csharp': 'C#',
        'skill-js': 'JavaScript (ES6+)',
        'skills-technologies': 'Technologies',
        'skill-react': 'React',
        'skill-node': 'Node.js',
        'skill-tailwind': 'Tailwind CSS',
        'skill-htmlcss': 'HTML5 & CSS3',
        'skills-creativity': 'Creativity',
        'skill-pixelart': 'Pixel Art',
        'skill-uiux': 'UI/UX Design',
        'skill-sketching': 'Digital Sketching',
        'skills-other': 'Other Skills',
        'skill-teamwork': 'Teamwork',
        'skill-problem': 'Creative Problem Solving',
        'skill-selflearning': 'Self-Learning',
        // Projects page translations
        'projects-title': 'Projects',
        'project-orquesta-title': 'OrquestaDeCobquecuraWEB',
        'project-orquesta-subtitle': 'Cobquecura Youth Orchestra - Web System',
        'project-orquesta-status': 'Status: Work in Progress (WIP)',
        'project-orquesta-desc-title': 'Description:',
        'project-orquesta-desc': 'Web system designed to support the administrative and academic operations of the Cobquecura Youth Orchestra. It enables the management of students, teachers, instruments, events, and news—streamlining academic tracking and inventory control.',
        'project-orquesta-features-title': 'Main Features:',
        'feature-admin': 'Admin panel (user, teacher, and event management)',
        'feature-academic': 'Academic system (schedules, attendance, evaluations, student progress)',
        'feature-instruments': 'Instrument management (inventory, loans, and maintenance)',
        'feature-news': 'News and event publishing',
        'feature-roles': 'Role-based access for students, teachers, and administrators',
        'project-orquesta-tech-title': 'Technologies Used:',
        'tech-frontend': 'Frontend: React 18, Tailwind CSS, React Router DOM',
        'tech-backend': 'Backend: Node.js, Express.js, MySQL, JWT, Multer',
        'project-orquesta-db-title': 'Database:',
        'project-orquesta-db-desc': 'An optimized MySQL database structure with public scripts designed for scalability and automation, while excluding any sensitive data.',
        'project-orquesta-link': 'View GitHub repository'
    }
};

// Crear el contexto de idioma
const LanguageContext = createContext();

// Hook personalizado para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState(() => {
        // Cargar idioma desde localStorage al inicializar
        return localStorage.getItem('lang') || 'en';
    });

    const toggleLanguage = () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setCurrentLang(newLang);
        localStorage.setItem('lang', newLang);
    };

    const t = (key) => {
        return translations[currentLang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ currentLang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default translations;

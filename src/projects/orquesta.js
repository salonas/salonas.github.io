export default {
  slug: 'orquesta',
  featured: true,
  title: 'OrquestaDeCobquecuraWEB',
  shortTitle: 'Orquesta',
  type: { es: 'WEB', en: 'WEB' },
  status: 'paused',
  state: { es: 'EN PAUSA', en: 'ON HIATUS' },
  cover: 'cover.jpg',
  coverVideo: 'screen-1.mp4',
  coverAlt: {
    es: 'Pantalla de inicio del sistema de la Orquesta Juvenil de Cobquecura',
    en: 'Landing screen of the Cobquecura Youth Orchestra system'
  },
  year: 2025,
  roles: { es: 'Desarrollo fullstack', en: 'Fullstack development' },
  tools: 'React · Node.js · Express · MySQL',
  repo: 'https://github.com/salonas/OrquestaDeCobquecuraWEB',
  summary: {
    es: 'Sistema web de gestión administrativa y académica para la Orquesta Juvenil de Cobquecura.',
    en: 'Web system for the administrative and academic management of the Cobquecura Youth Orchestra.'
  },
  sections: [
    {
      kind: 'loops',
      title: { es: 'Capturas', en: 'Screens' },
      items: [ 'screen-1.mp4', 'screen-2.mp4' ]
    },
    {
      kind: 'text',
      title: { es: 'Descripción', en: 'Description' },
      body: {
        es: 'Permite gestionar estudiantes, profesores, instrumentos, eventos y noticias, facilitando el seguimiento académico y el control de inventario. El desarrollo quedó inconcluso y está en pausa.',
        en: 'It manages students, teachers, instruments, events and news, supporting academic tracking and inventory control. Development is unfinished and on hiatus.'
      }
    },
    {
      kind: 'list',
      title: { es: 'Características principales', en: 'Main features' },
      items: {
        es: [
          'Panel de administración (usuarios, profesores y eventos)',
          'Sistema académico (horarios, asistencia, evaluaciones, progreso)',
          'Gestión de instrumentos (inventario, préstamos y mantención)',
          'Publicación de noticias y eventos',
          'Acceso por roles para estudiantes, profesores y administración'
        ],
        en: [
          'Admin panel (users, teachers and events)',
          'Academic system (schedules, attendance, grading, progress)',
          'Instrument management (inventory, loans and maintenance)',
          'News and events publishing',
          'Role-based access for students, teachers and staff'
        ]
      }
    },
    {
      kind: 'list',
      title: { es: 'Tecnologías', en: 'Tech stack' },
      items: {
        es: [
          'Frontend: React 18, Tailwind CSS, React Router DOM',
          'Backend: Node.js, Express.js, MySQL, JWT, Multer'
        ],
        en: [
          'Frontend: React 18, Tailwind CSS, React Router DOM',
          'Backend: Node.js, Express.js, MySQL, JWT, Multer'
        ]
      }
    }
  ]
}

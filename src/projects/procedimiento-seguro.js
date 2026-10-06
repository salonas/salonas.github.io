const VENJYY = '[[Venjyy|https://github.com/Venjyy]]'

export default {
  slug: 'procedimiento-seguro',
  featured: true,
  title: 'Procedimiento Seguro',
  type: { es: 'WEB', en: 'WEB' },
  status: 'live',
  state: { es: 'EN LÍNEA · PILOTO GRATUITO', en: 'LIVE · FREE PILOT' },
  cover: 'cover.jpg',
  coverAlt: {
    es: 'Portada de Procedimiento Seguro, con un teléfono que muestra una declaración a medio llenar',
    en: 'Procedimiento Seguro landing page, with a phone showing a half-filled statement'
  },
  year: 2026,
  roles: { es: 'Cofundador · Infraestructura y despliegue', en: 'Co-founder · Infrastructure and deployment' },
  tools: 'Azure · Linux · PostgreSQL · Cloudflare',
  code: { es: 'Privado', en: 'Private' },
  site: 'https://procedimientoseguro.cl',
  summary: {
    es: 'Aplicación web en producción para que funcionarios policiales de Chile armen actas y declaraciones desde el celular.',
    en: 'A web app in production that lets police officers in Chile put together reports and statements from their phone.'
  },
  sections: [
    {
      kind: 'shots',
      title: { es: 'Capturas', en: 'Screens' },
      items: [
        { src: 'what.jpg', alt: { es: 'Qué es Procedimiento Seguro', en: 'What Procedimiento Seguro is' } },
        { src: 'modules.jpg', alt: { es: 'Módulos disponibles', en: 'Available modules' } },
        { src: 'how.jpg', alt: { es: 'Cómo funciona, en cuatro pasos', en: 'How it works, in four steps' } }
      ]
    },
    { kind: 'video', title: { es: 'Presentación', en: 'Presentation' }, src: 'presentacion.mp4' },
    {
      kind: 'text',
      title: { es: 'Sobre el proyecto', en: 'About the project' },
      body: {
        es: 'Un funcionario termina el procedimiento y empieza el papeleo. Procedimiento Seguro lo resuelve en el teléfono: se llena el formulario en terreno, se revisa el documento y se descarga en PDF o Word. Está en línea desde el 2 de octubre de 2026, en piloto gratuito, en [[procedimientoseguro.cl|https://procedimientoseguro.cl]].',
        en: 'An officer finishes the procedure and the paperwork begins. Procedimiento Seguro handles it on the phone: the form is filled in the field, the document is reviewed and it downloads as PDF or Word. It has been live since October 2, 2026, as a free pilot, at [[procedimientoseguro.cl|https://procedimientoseguro.cl]].'
      }
    },
    {
      kind: 'text',
      title: { es: 'Equipo', en: 'Team' },
      body: {
        es: `Somos dos socios. ${VENJYY} desarrolló la aplicación completa. Yo me encargo de la infraestructura y los servidores. Su portafolio está en [[venjyy.github.io|https://venjyy.github.io/venjy-page/]].`,
        en: `We are two partners. ${VENJYY} built the whole application. I take care of the infrastructure and the servers. His portfolio is at [[venjyy.github.io|https://venjyy.github.io/venjy-page/]].`
      }
    },
    {
      kind: 'items',
      title: { es: 'Mi parte', en: 'My part' },
      items: [
        {
          name: { es: 'Servidor', en: 'Server' },
          text: {
            es: 'La aplicación corre en una máquina Linux en Azure, como servicio de systemd.',
            en: 'The app runs on a Linux machine in Azure, as a systemd service.'
          }
        },
        {
          name: { es: 'Sin puertos abiertos', en: 'No open ports' },
          text: {
            es: 'El tráfico entra por un túnel de Cloudflare, así que el servidor no expone puertos web.',
            en: 'Traffic comes in through a Cloudflare tunnel, so the server exposes no web ports.'
          }
        },
        {
          name: { es: 'Respaldos', en: 'Backups' },
          text: {
            es: 'Respaldos diarios y cifrados de la base de datos.',
            en: 'Daily, encrypted backups of the database.'
          }
        },
        {
          name: { es: 'Acta de tránsito', en: 'Traffic report' },
          text: {
            es: 'Diseñé el acta en seis tableros y un prototipo navegable, para probar el flujo con usuarios antes de programarlo.',
            en: 'I designed the report in six boards and a clickable prototype, to try the flow with users before it was coded.'
          }
        },
        {
          name: { es: 'Vuelta atrás', en: 'Rollback' },
          text: {
            es: 'Si una actualización falla, el despliegue vuelve solo a la versión anterior.',
            en: 'If an update breaks, the deployment goes back to the previous version by itself.'
          }
        }
      ]
    },
    {
      kind: 'list',
      title: { es: 'Qué hace', en: 'What it does' },
      items: {
        es: [
          'Funciona sin señal y se instala como app desde el navegador',
          'Las actas se guardan solo en el teléfono: el servidor no recibe su contenido',
          'El perfil y la firma se cargan solos en cada documento',
          'Declaraciones, denuncias, actas de tránsito con croquis, medidas cautelares y fijación fotográfica',
          'Un procedimiento con detenido genera de 3 a 7 actas de una vez',
          'Documentos en PDF y Word, listos para compartir'
        ],
        en: [
          'Works offline and installs as an app from the browser',
          'Reports stay on the phone only: the server never receives their content',
          'Profile and signature load by themselves into every document',
          'Statements, complaints, traffic reports with a sketch, precautionary measures and photo records',
          'A procedure with a detainee produces 3 to 7 reports at once',
          'Documents in PDF and Word, ready to share'
        ]
      }
    },
    {
      kind: 'list',
      title: { es: 'Tecnologías', en: 'Tech stack' },
      items: {
        es: [
          'Aplicación: Next.js, TypeScript, Prisma, PostgreSQL, Tailwind, Zod',
          'Infraestructura: Azure, Linux, systemd, Cloudflare Tunnel'
        ],
        en: [
          'Application: Next.js, TypeScript, Prisma, PostgreSQL, Tailwind, Zod',
          'Infrastructure: Azure, Linux, systemd, Cloudflare Tunnel'
        ]
      }
    }
  ]
}

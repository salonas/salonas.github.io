const SITE = { href: 'https://github.com/salonas/salonas.github.io', label: { es: 'en este sitio', en: 'on this site' } }

export const toolbox = [
  {
    title: { es: 'Código', en: 'Code' },
    tools: [
      { name: 'C#', to: 'agami' },
      { name: '.NET' },
      { name: 'Java + Android', to: 'guide' },
      { name: 'JavaScript' },
      { name: { es: 'HTML y CSS', en: 'HTML and CSS' } },
      { name: 'React', to: 'orquesta' },
      { name: 'Node.js + Express', to: 'orquesta' },
      { name: 'Tailwind CSS', to: 'orquesta' },
      { name: 'Vite + React Router', ...SITE },
      { name: { es: 'Pruebas con Vitest', en: 'Testing with Vitest' }, ...SITE },
      { name: 'Gemini API', to: 'guide' },
      { name: 'Python' },
      { name: { es: 'Programación orientada a objetos', en: 'Object-oriented programming' } },
      { name: { es: 'Patrones de diseño', en: 'Design patterns' } },
      { name: { es: 'Git y GitHub', en: 'Git and GitHub' } },
    ],
  },
  {
    title: { es: 'Datos y sistemas', en: 'Data and systems' },
    tools: [
      { name: 'SQL' },
      { name: 'MySQL', to: 'orquesta' },
      { name: 'PostgreSQL', to: 'procedimiento-seguro' },
      { name: 'Firebase', to: 'guide' },
      { name: { es: 'Diseño de bases de datos', en: 'Database design' } },
      { name: { es: 'Servidores Linux en Azure', en: 'Linux servers on Azure' }, to: 'procedimiento-seguro' },
      { name: 'Cloudflare Tunnel', to: 'procedimiento-seguro' },
      { name: { es: 'GitHub Actions y Pages', en: 'GitHub Actions and Pages' }, ...SITE },
      { name: { es: 'Windows y GNU/Linux', en: 'Windows and GNU/Linux' } },
      { name: { es: 'Soporte de equipos y hardware', en: 'Hardware and PC support' } },
      { name: 'ESP8266 + MQTT', to: 'plantochi' },
    ],
  },
  {
    title: { es: 'Arte', en: 'Art' },
    tools: [
      { name: 'Aseprite', to: 'agami' },
      { name: { es: 'Pixel art y animación', en: 'Pixel art and animation' }, to: 'agami' },
      { name: { es: 'Dibujo digital', en: 'Digital drawing' } },
      { name: { es: 'Modelado 3D y rigging en Blender', en: '3D modeling and rigging in Blender' }, to: 'sailing' },
    ],
  },
  {
    title: { es: 'Juegos y música', en: 'Games and music' },
    image: {
      src: '/img/bass-cat.png',
      alt: { es: 'Gato tocando un bajo, dibujado por Salonas', en: 'A cat playing a bass, drawn by Salonas' },
    },
    tools: [
      { name: 'Unity 6', to: 'agami' },
      { name: { es: 'Composición musical', en: 'Music composition' }, to: 'agami' },
      {
        name: { es: 'Arreglos sacados a oído', en: 'Arrangements by ear' },
        href: 'https://youtu.be/YOYFk65Kr_4',
        label: { es: '«World in My Eyes» en YouTube', en: 'World in My Eyes on YouTube' },
      },
      { name: { es: 'Efectos de sonido', en: 'Sound effects' }, to: 'agami' },
      { name: { es: 'Bajo eléctrico', en: 'Electric bass' } },
      {
        name: { es: 'Más en mi Instagram', en: 'More on my Instagram' },
        href: 'https://www.instagram.com/salobass/',
        label: '@salobass',
      },
    ],
  },
]

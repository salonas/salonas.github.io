export default {
  slug: 'chord-analyzer',
  title: 'Salonas Chord Analyzer',
  shortTitle: 'Chord Analyzer',
  type: { es: 'WEB', en: 'WEB' },
  status: 'live',
  state: { es: 'EN LÍNEA', en: 'LIVE' },
  year: 2026,
  cover: 'cover.jpg',
  coverAlt: {
    es: 'Análisis de un turnaround en Do mayor: los 4 acordes con su grado, función y tensión y los patrones que reconoce, sobre una hoja de cuaderno, y el teclado debajo',
    en: 'Analysis of a turnaround in C major: the 4 chords with their degree, function and tension and the patterns it recognizes, on a notebook sheet, with the keyboard below'
  },
  roles: { es: 'Diseño y desarrollo', en: 'Design and development' },
  tools: 'JavaScript · Vite · Web Audio · Vitest',
  repo: 'https://github.com/salonas/chord-analyzer',
  site: '/chord-analyzer/',
  summary: {
    es: 'Piano roll y analizador de acordes en el navegador. Nombra los acordes, analiza la progresión, les da expresión según el sentimiento y el instrumento, abre un .mid con todas sus pistas y exporta a MIDI y a texto para FL Studio.',
    en: 'A piano roll and chord analyzer in the browser. It names the chords, analyzes the progression, shapes the expression by feeling and instrument, opens a .mid with all its tracks and exports to MIDI and text for FL Studio.'
  },
  sections: [
    {
      kind: 'shots',
      title: { es: 'Capturas', en: 'Screens' },
      items: [
        { src: 'roll.jpg', alt: { es: 'Piano roll con la franja de acordes, las notas de la progresión y la velocity de cada una', en: 'Piano roll with the chord strip, the notes of the progression and the velocity of each one' } },
        { src: 'pistas.jpg', alt: { es: 'Proyecto con pestañas, patterns y el panel de pistas del pattern, con instrumento y silencio por pista', en: 'Project with tabs, patterns and the pattern tracks panel, with an instrument and a mute for each track' } },
        { src: 'analisis.jpg', alt: { es: 'Análisis de la progresión en una hoja de cuaderno: tonalidad, grados y función de cada acorde', en: 'Progression analysis on a notebook sheet: key, degrees and function of each chord' } },
        { src: 'expresion.jpg', alt: { es: 'Pestaña Expresión, con velocity, sensibilidad, acentos y humanizar', en: 'Expression tab, with velocity, sensitivity, accents and humanize' } },
        { src: 'bateria.jpg', alt: { es: 'Pestaña Batería, para generar un groove y ver el mapa de la plantilla', en: 'Drums tab, to generate a groove and see the template map' } },
        { src: 'texto.jpg', alt: { es: 'Pestaña Texto, para exportar e importar el pattern como texto', en: 'Text tab, to export and import the pattern as text' } }
      ]
    },
    {
      kind: 'text',
      title: { es: 'Sobre el proyecto', en: 'About the project' },
      body: {
        es: 'Funciona en el navegador, sin servidor ni cuentas. El proyecto, las preferencias y la biblioteca de acordes se guardan solo en ese navegador. Un .mid con varias pistas se abre como un proyecto propio y como un solo pattern con una pista por pista del archivo, y suena completo. Las pistas que fijan un instrumento General MIDI suenan con un soundfont que el navegador descarga la primera vez que se usa. Está en español y en inglés, y recuerda el idioma que elegiste en este sitio. Está inspirado en varios sitios del mismo tipo, pero sobre todo en [[Oolimo|https://www.oolimo.com/en/guitar-chords/analyze]].',
        en: 'It runs in the browser, with no server or accounts. The project, the preferences and the chord library are kept only in that browser. A .mid with several tracks opens as its own project and as a single pattern with a track for each track in the file, and it plays in full. Tracks that set a General MIDI instrument sound with a soundfont that the browser downloads the first time it is used. It is in Spanish and English, and it remembers the language you picked on this site. It is inspired by several sites of the same kind, but mostly by [[Oolimo|https://www.oolimo.com/en/guitar-chords/analyze]].'
      }
    },
    {
      kind: 'list',
      title: { es: 'Qué hace', en: 'What it does' },
      items: {
        es: [
          'Nombra acordes de C0 a C10 entre 44 tipos, con inversiones y pentagrama',
          'Estima la tonalidad y los grados de una progresión',
          'Piano roll con patterns, velocity por nota, cuantizar y bucle',
          'Expresión por sentimiento e instrumento, con un humanizar que se repite igual',
          'Abre un .mid multipista como un pattern con una pista por pista, cada una con su instrumento',
          'Varios proyectos abiertos a la vez, en pestañas, y piano roll a pantalla completa',
          'Separa melodía, acordes y bajo de un .mid importado',
          'Modo batería con 8 grooves',
          'Exporta MIDI por pattern, un pack .zip y texto que se vuelve a importar'
        ],
        en: [
          'Names chords from C0 to C10 among 44 types, with inversions and a staff',
          'Estimates the key and the degrees of a progression',
          'Piano roll with patterns, per-note velocity, quantize and loop',
          'Expression by feeling and instrument, with a humanize that repeats the same way',
          'Opens a multitrack .mid as one pattern with a track for each track, each with its instrument',
          'Several projects open at once, in tabs, and a full screen piano roll',
          'Splits melody, chords and bass from an imported .mid',
          'Drum mode with 8 grooves',
          'Exports MIDI per pattern, a .zip pack and text that imports back'
        ]
      }
    },
    {
      kind: 'list',
      title: { es: 'Tecnologías', en: 'Tech stack' },
      items: {
        es: [
          'JavaScript sin framework, en módulos ES',
          'Vite para el build y Vitest para las pruebas',
          'Web Audio para el sonido',
          'MIDI y .zip escritos sin librerías'
        ],
        en: [
          'JavaScript with no framework, in ES modules',
          'Vite for the build and Vitest for the tests',
          'Web Audio for the sound',
          'MIDI and .zip written without libraries'
        ]
      }
    },
    {
      kind: 'list',
      title: { es: 'Agradecimientos', en: 'Thanks' },
      items: {
        es: [
          'Coro, Lead, Campana y Chiptune suenan con soundfonts de otras personas: Musyng Kite, Just t4 (de Milton Paredes, MP factory studios y RolandKnight) y el Famicom Multichip Soundfont V2G de stgiga y colaboradores. Gracias a todos sus autores',
          'El modo General MIDI usa FluidR3 GM, de Frank Wen, en el render de Benjamin Gleitzman',
          'El resto de los sonidos sale de bibliotecas abiertas: Karoryfer Samples, VSCO 2 Community Edition y Versilian Community Sample Library',
          'Las fuentes MGPixel y Notepen, de jeti, y GNU Unifont',
          'La lista completa de autores y licencias está en CREDITS.md del repositorio'
        ],
        en: [
          'Choir, Lead, Bell and Chiptune sound from other people\'s soundfonts: Musyng Kite, Just t4 (by Milton Paredes, MP factory studios and RolandKnight) and the Famicom Multichip Soundfont V2G by stgiga and contributors. Thanks to all their authors',
          'The General MIDI mode uses FluidR3 GM, by Frank Wen, in the render by Benjamin Gleitzman',
          'The rest of the sounds come from open libraries: Karoryfer Samples, VSCO 2 Community Edition and the Versilian Community Sample Library',
          'The MGPixel and Notepen fonts, by jeti, and GNU Unifont',
          'The full list of authors and licenses is in CREDITS.md in the repository'
        ]
      }
    }
  ]
}

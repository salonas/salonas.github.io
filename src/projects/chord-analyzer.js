export default {
  slug: 'chord-analyzer',
  title: 'Salonas Chord Analyzer',
  shortTitle: 'Chord Analyzer',
  type: { es: 'WEB', en: 'WEB' },
  status: 'live',
  state: { es: 'EN LÍNEA', en: 'LIVE' },
  year: 2026,
  roles: { es: 'Diseño y desarrollo', en: 'Design and development' },
  tools: 'JavaScript · Vite · Web Audio · Vitest',
  repo: 'https://github.com/salonas/chord-analyzer',
  site: '/chord-analyzer/',
  summary: {
    es: 'Piano roll y analizador de acordes en el navegador. Nombra los acordes, analiza la progresión, les da expresión según el sentimiento y el instrumento, y exporta a MIDI y a texto para FL Studio.',
    en: 'A piano roll and chord analyzer in the browser. It names the chords, analyzes the progression, shapes the expression by feeling and instrument, and exports to MIDI and text for FL Studio.'
  },
  sections: [
    {
      kind: 'text',
      title: { es: 'Sobre el proyecto', en: 'About the project' },
      body: {
        es: 'Funciona en el navegador, sin servidor ni cuentas. El proyecto, las preferencias y la biblioteca de acordes se guardan solo en ese navegador. Está en español y en inglés, y recuerda el idioma que elegiste en este sitio.',
        en: 'It runs in the browser, with no server or accounts. The project, the preferences and the chord library are kept only in that browser. It is in Spanish and English, and it remembers the language you picked on this site.'
      }
    },
    {
      kind: 'list',
      title: { es: 'Qué hace', en: 'What it does' },
      items: {
        es: [
          'Nombra acordes de C0 a C10 entre 42 tipos, con inversiones y pentagrama',
          'Estima la tonalidad y los grados de una progresión',
          'Piano roll con patterns, velocity por nota, cuantizar y bucle',
          'Expresión por sentimiento e instrumento, con un humanizar que se repite igual',
          'Separa melodía, acordes y bajo de un .mid importado',
          'Modo batería con 8 grooves',
          'Exporta MIDI por pattern, un pack .zip y texto que se vuelve a importar'
        ],
        en: [
          'Names chords from C0 to C10 among 42 types, with inversions and a staff',
          'Estimates the key and the degrees of a progression',
          'Piano roll with patterns, per-note velocity, quantize and loop',
          'Expression by feeling and instrument, with a humanize that repeats the same way',
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
    }
  ]
}

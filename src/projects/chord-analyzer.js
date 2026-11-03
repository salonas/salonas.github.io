export default {
  slug: 'chord-analyzer',
  title: 'Salonas Chord Analyzer',
  shortTitle: 'Chord Analyzer',
  type: { es: 'WEB', en: 'WEB' },
  status: 'live',
  state: { es: 'EN LÍNEA', en: 'LIVE' },
  year: 2026,
  cover: 'cover.png',
  coverAlt: {
    es: 'Hoja de análisis de una progresión que modula de C mayor a G mayor, con el acorde pivote Am y el porqué de cada tonalidad',
    en: 'Analysis sheet of a progression that modulates from C major to G major, with the pivot chord Am and why each key was chosen'
  },
  roles: { es: 'Diseño y desarrollo', en: 'Design and development' },
  tools: 'JavaScript · Vite · Web Audio · Vitest',
  repo: 'https://github.com/salonas/chord-analyzer',
  site: '/chord-analyzer/',
  summary: {
    es: 'Piano roll que nombra los acordes y analiza la progresión: tonalidad, grados, función, cadencias y modulaciones. Explica por qué elige cada lectura y cuál era la alternativa, si la hay.',
    en: 'A piano roll that names the chords and analyzes the progression: key, degrees, function, cadences and modulations. It explains why it picks each reading and what the alternative was, if there is one.'
  },
  stats: {
    es: '1148 tests · 647 comprobaciones de teoría · 2 corpus con análisis humanos',
    en: '1148 tests · 647 theory checks · 2 corpora with human analyses'
  },
  sections: [
    {
      kind: 'shots',
      title: { es: 'Capturas', en: 'Screens' },
      items: [
        { src: 'analisis.png', alt: { es: 'Hoja de análisis: modula de C mayor a G mayor por el pivote Am (vi = ii), con el porqué de cada tonalidad', en: 'Analysis sheet: it modulates from C major to G major through the pivot Am (vi = ii), with why each key was chosen' } },
        { src: 'inspector.png', alt: { es: 'Inspector del acorde F A D♯ con un C arriba: Ger⁺⁶, sus notas desde el bajo y F7 entre los posibles nombres', en: 'Inspector for the chord F A D♯ with a C above: Ger⁺⁶, its notes from the bass and F7 among the possible names' } },
        { src: 'alberti.png', alt: { es: 'Piano roll con la franja C, F/C, G7/B, C y el Alberti bajo la melodía', en: 'Piano roll with the strip C, F/C, G7/B, C and the Alberti under the melody' } },
        { src: 'texto.png', alt: { es: 'Pestaña Texto con la armonía y la melodía: el F5 sobre E7 sale como ♭9, escapada', en: 'Text tab with the harmony and the melody: the F5 over E7 comes out as ♭9, escape tone' } },
        { src: 'expresion.png', alt: { es: 'Pestaña Expresión, con velocity, sensibilidad, acentos y humanizar', en: 'Expression tab, with velocity, sensitivity, accents and humanize' } }
      ]
    },
    {
      kind: 'loops',
      title: { es: 'Video', en: 'Video' },
      items: ['modulacion.mp4'],
      captions: [{ es: 'El pattern 1 sonando, con el cursor hasta la modulación', en: 'Pattern 1 playing, with the cursor up to the modulation' }]
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
      kind: 'text',
      title: { es: 'Cómo sé que el análisis es correcto', en: 'How I know the analysis is right' },
      body: {
        es: 'Al principio mis pruebas pasaban casi todas, pero contra análisis hechos por personas la app acertaba más o menos la mitad de los acordes. Desde ahí cada regla se midió contra dos corpus: TAVERN, con variaciones para piano de Mozart y Beethoven, y el Rock Corpus, con 200 canciones. Una parte de cada uno quedó apartada como prueba y se miró una sola vez por etapa. En esa parte acierta la inversión en un 94,7 %, la ortografía de las notas (C♯ o D♭) en un 95,2 %, el acorde de cada tramo en un 73,7 %, la tonalidad en un 80,0 % en TAVERN y la tónica en un 70,5 % en rock. Donde la cifra no es alta, la app lo presenta como una estimación. Cada etiqueta se rastrea hasta una regla escrita y un test, y la app no se publica si empeora alguna de las 11 cifras que se miden en el resto del corpus.',
        en: 'At first almost all my tests passed, but against analyses made by people the app got about half of the chords right. From then on every rule was measured against two corpora: TAVERN, with piano variations by Mozart and Beethoven, and the Rock Corpus, with 200 songs. Part of each one was set aside as a test set and looked at only once per stage. On that part it gets the inversion right 94.7% of the time, the spelling of the notes (C♯ or D♭) 95.2%, the chord of each span 73.7%, the key 80.0% in TAVERN and the tonic 70.5% in rock. Where the figure is not high, the app presents it as an estimate. Every label traces back to a written rule and a test, and the app is not published if any of the 11 figures measured on the rest of the corpus gets worse.'
      }
    },
    {
      kind: 'list',
      title: { es: 'Decisiones de teoría', en: 'Theory decisions' },
      items: {
        es: [
          'C, D7, G se lee en Sol mayor: D7 es el V7 de Sol, así que esa lectura gana con margen y no muestra alternativa. Con D sin séptima gana Do mayor por poco, y Sol queda como alternativa',
          'F A D♯ con un C en la melodía se nombra Ger⁺⁶, sexta aumentada alemana, y no F7, que suena igual. F7 queda entre los posibles nombres',
          'Prefiere no inventar modulaciones. Una regla que encontraba el doble de cambios reales inventaba 68 en vez de 5, y se descartó',
          'Una nota grave que se mueve bajo un acorde, como un bajo caminante, sigue siendo el bajo y no abre otro acorde. En un Alberti, el acompañamiento no se confunde con la melodía'
        ],
        en: [
          'C, D7, G is read in G major: D7 is the V7 of G, so that reading wins by a margin and shows no alternative. With D and no seventh, C major wins by a little, and G stays as the alternative',
          'F A D♯ with a C in the melody is named Ger⁺⁶, the German augmented sixth, and not F7, which sounds the same. F7 stays among the possible names',
          'It prefers not to invent modulations. A rule that found twice as many real changes invented 68 instead of 5, and it was dropped',
          'A low note that moves under a chord, like a walking bass, is still the bass and does not open another chord. In an Alberti bass, the accompaniment is not mistaken for the melody'
        ]
      }
    },
    {
      kind: 'list',
      title: { es: 'Qué hace', en: 'What it does' },
      groups: [
        {
          title: { es: 'Escribir', en: 'Write' },
          items: {
            es: [
              'Piano roll con patterns, velocity por nota, cuantizar y bucle',
              'Varios proyectos abiertos a la vez, en pestañas, y piano roll a pantalla completa',
              'Expresión por sentimiento e instrumento, con un humanizar que se repite igual',
              'Modo batería con 8 grooves'
            ],
            en: [
              'Piano roll with patterns, per-note velocity, quantize and loop',
              'Several projects open at once, in tabs, and a full screen piano roll',
              'Expression by feeling and instrument, with a humanize that repeats the same way',
              'Drum mode with 8 grooves'
            ]
          }
        },
        {
          title: { es: 'Analizar', en: 'Analyze' },
          items: {
            es: [
              'Nombra acordes de C0 a C10 entre 44 tipos, con inversiones y pentagrama',
              'Estima la tonalidad y los grados, y explica por qué eligió esa tonalidad y cuál era la alternativa',
              'Divide la progresión en regiones de tonalidad, con el acorde pivote entre ellas',
              'Da el rol de cada nota de la melodía: paso, bordadura, apoyatura o retardo',
              'Mide la tensión de cada acorde'
            ],
            en: [
              'Names chords from C0 to C10 among 44 types, with inversions and a staff',
              'Estimates the key and the degrees, and explains why it chose that key and what the alternative was',
              'Splits the progression into key regions, with the pivot chord between them',
              'Gives the role of each melody note: passing tone, neighbor tone, appoggiatura or suspension',
              'Measures the tension of each chord'
            ]
          }
        },
        {
          title: { es: 'Abrir y exportar', en: 'Open and export' },
          items: {
            es: [
              'Abre un .mid multipista como un pattern con una pista por pista, cada una con su instrumento',
              'Separa melodía, acordes y bajo de un .mid importado',
              'Exporta MIDI por pattern, un pack .zip y texto que se vuelve a importar'
            ],
            en: [
              'Opens a multitrack .mid as one pattern with a track for each track, each with its instrument',
              'Splits melody, chords and bass from an imported .mid',
              'Exports MIDI per pattern, a .zip pack and text that imports back'
            ]
          }
        }
      ]
    },
    {
      kind: 'list',
      title: { es: 'Tecnologías', en: 'Tech stack' },
      items: {
        es: [
          'JavaScript sin framework, en módulos ES',
          'Vite para el build',
          'Web Audio para el sonido',
          'MIDI y .zip escritos sin librerías',
          '1148 tests con Vitest y GitHub Actions, que no publica si una cifra del análisis empeora'
        ],
        en: [
          'JavaScript with no framework, in ES modules',
          'Vite for the build',
          'Web Audio for the sound',
          'MIDI and .zip written without libraries',
          '1148 tests with Vitest and GitHub Actions, which does not publish if a figure of the analysis gets worse'
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
          'Las cifras del análisis se miden con [[TAVERN|https://github.com/jcdevaney/TAVERN]], de Johanna Devaney, Claire Arthur, Nathaniel Condit-Schultz y Kirsten Nisula (ISMIR 2015), bajo [[CC BY-SA 4.0|https://creativecommons.org/licenses/by-sa/4.0/]], y con el [[Rock Corpus|https://rockcorpus.midside.com/]], de Trevor de Clercq y David Temperley, con Ethan Lustig e Ivan Tan, bajo [[CC BY 4.0|https://creativecommons.org/licenses/by/4.0/]]. Los dos se usan adaptados',
          'Los autores y licencias de los sonidos están en CREDITS.md, y los de los corpus en sus avisos dentro del repositorio'
        ],
        en: [
          'Choir, Lead, Bell and Chiptune sound from other people\'s soundfonts: Musyng Kite, Just t4 (by Milton Paredes, MP factory studios and RolandKnight) and the Famicom Multichip Soundfont V2G by stgiga and contributors. Thanks to all their authors',
          'The General MIDI mode uses FluidR3 GM, by Frank Wen, in the render by Benjamin Gleitzman',
          'The rest of the sounds come from open libraries: Karoryfer Samples, VSCO 2 Community Edition and the Versilian Community Sample Library',
          'The MGPixel and Notepen fonts, by jeti, and GNU Unifont',
          'The figures of the analysis are measured with [[TAVERN|https://github.com/jcdevaney/TAVERN]], by Johanna Devaney, Claire Arthur, Nathaniel Condit-Schultz and Kirsten Nisula (ISMIR 2015), under [[CC BY-SA 4.0|https://creativecommons.org/licenses/by-sa/4.0/]], and with the [[Rock Corpus|https://rockcorpus.midside.com/]], by Trevor de Clercq and David Temperley, with Ethan Lustig and Ivan Tan, under [[CC BY 4.0|https://creativecommons.org/licenses/by/4.0/]]. Both are used in adapted form',
          'The authors and licenses of the sounds are in CREDITS.md, and those of the corpora in their notices inside the repository'
        ]
      }
    }
  ]
}

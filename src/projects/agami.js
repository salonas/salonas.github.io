export default {
  slug: 'agami',
  featured: true,
  title: "Agami's Alley",
  type: { es: 'JUEGO', en: 'GAME' },
  status: 'done',
  state: { es: 'DEMO TÉCNICA · COMPLETADA', en: 'TECH DEMO · COMPLETE' },
  year: 2026,
  cover: 'title.png',
  pixel: true,
  coverAlt: {
    es: "Portada de Agami's Alley: un gato gris con bufanda roja y dos globos",
    en: "Agami's Alley cover: a grey cat with a red scarf and two balloons"
  },
  roles: { es: 'Código · Arte · Música', en: 'Code · Art · Music' },
  tools: 'Unity 6 · C# · Aseprite · sforzando',
  code: { es: 'No público', en: 'Not public' },
  summary: {
    es: 'Action-survival en perspectiva top-down. Controlas a un felino que defiende su territorio en un callejón urbano hostil.',
    en: 'Top-down action-survival. You play a cat defending its territory in a hostile urban alley.'
  },
  sections: [
    { kind: 'video', title: { es: 'Gameplay', en: 'Gameplay' }, src: 'gameplay.mp4' },
    {
      kind: 'items',
      title: { es: 'Mecánicas', en: 'Mechanics' },
      items: [
        {
          name: 'Mouselook',
          text: {
            es: 'El personaje siempre mira hacia el cursor: atacas en una dirección mientras te mueves en otra.',
            en: 'The character always faces the cursor: attack one way while moving another.'
          }
        },
        {
          name: 'Slash',
          text: {
            es: 'Ataque de garras direccional con empuje.',
            en: 'Directional claw attack with knockback.'
          }
        },
        {
          name: 'Dash',
          text: {
            es: 'Salto rápido hacia el mouse para esquivar, con frames de invulnerabilidad.',
            en: 'Quick leap toward the mouse to dodge, with invulnerability frames.'
          }
        },
        {
          name: 'Growl',
          text: {
            es: 'Habilidad de área que limpia el espacio alrededor cuando te acorralan.',
            en: 'Area skill that clears the space around you when cornered.'
          }
        }
      ]
    },
    {
      kind: 'text',
      title: { es: 'Música', en: 'Music' },
      body: {
        es: 'La música es mía. La compuse con sforzando y la soundfont de Rockman & Forte de SNES (Mega Man & Bass).',
        en: 'The music is mine. I composed it with sforzando and the soundfont from Rockman & Forte on SNES (Mega Man & Bass).'
      }
    },
    {
      kind: 'audio',
      title: { es: 'Temas', en: 'Tracks' },
      tracks: [
        { title: { es: 'Tema del menú', en: 'Menu theme' }, src: 'menu.mp3' },
        { title: { es: 'Nivel 1', en: 'Level 1' }, src: 'level1.mp3' }
      ]
    },
    {
      kind: 'shots',
      sketch: true,
      title: { es: 'Bocetos', en: 'Sketches' },
      items: [
        {
          src: 'sketch-1.jpg',
          alt: {
            es: 'Hoja de diseño de Agami y de los enemigos',
            en: 'Design sheet for Agami and the enemies'
          }
        },
        {
          src: 'sketch-2.jpg',
          alt: { es: 'Bocetos de poses de Agami', en: 'Pose sketches of Agami' }
        }
      ]
    }
  ]
}

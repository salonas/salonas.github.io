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
  tools: 'Unity 6 · C# · Aseprite · FL Studio',
  code: { es: 'No público', en: 'Not public' },
  summary: {
    es: 'Action-survival en perspectiva top-down. Controlas a un felino que intenta sobrevivir en un callejón urbano hostil.',
    en: 'Top-down action-survival. You play a cat trying to survive in a hostile urban alley.'
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
        es: 'La música es mía. La compuse en FL Studio con Sforzando 2 y la soundfont de Rockman & Forte de SNES (Mega Man & Bass).',
        en: 'The music is mine. I composed it in FL Studio with Sforzando 2 and the soundfont from Rockman & Forte on SNES (Mega Man & Bass).'
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
      kind: 'items',
      title: { es: 'Inspiración', en: 'Inspiration' },
      items: [
        {
          name: 'The Legend of Zelda: A Link to the Past',
          text: {
            es: 'La perspectiva, el diseño del mundo y la claridad visual de los sprites de 16 bits.',
            en: 'The perspective, the world design and the visual clarity of 16-bit sprites.'
          }
        },
        {
          name: 'The Binding of Isaac',
          text: {
            es: 'La fórmula viene del primer The Legend of Zelda de NES, pero este estilo de juego lo popularizó The Binding of Isaac. De ahí tomé la vista top-down, con una interfaz más limpia.',
            en: 'The formula comes from the first The Legend of Zelda on NES, but this style of play was popularised by The Binding of Isaac. I took the top-down view from it, with a cleaner interface.'
          }
        },
        {
          name: 'Primus',
          text: {
            es: 'El video de [[«Tommy the Cat»|https://www.youtube.com/watch?v=r4OhIU-PmB8]] es otra de las inspiraciones del juego.',
            en: 'The video for [["Tommy the Cat"|https://www.youtube.com/watch?v=r4OhIU-PmB8]] is another inspiration for the game.'
          }
        },
        {
          name: { es: 'Los Aristogatos', en: 'The Aristocats' },
          text: {
            es: 'Thomas O’Malley y los gatos callejeros de la película. El callejón del título es una referencia directa a «O’Malley the alley cat».',
            en: 'Thomas O’Malley and the alley cats from the film. The alley in the title is a direct nod to "O’Malley the alley cat".'
          }
        }
      ]
    },
    {
      kind: 'list',
      title: { es: 'Bugs conocidos y curiosidades', en: 'Known bugs and fun facts' },
      items: {
        es: [
          'Bug conocido: algunos enemigos pueden aparecer dentro de objetos con colisión y quedar sin poder moverse.',
          'El nombre Agami mezcla los nombres de cuatro gatos: Agata y Mina, que son míos, y Mila y Gala, de Venjyy.',
          'La idea inicial era un juego más grande. Terminé desarrollándolo yo solo, porque me gustaba más la idea.'
        ],
        en: [
          'Known bug: some enemies can spawn inside objects with collision and end up unable to move.',
          'The name Agami blends the names of four cats: Agata and Mina, who are mine, and Mila and Gala, who are Venjyy’s.',
          'The first idea was a bigger game. I ended up building it on my own, because I liked the idea more.'
        ]
      }
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

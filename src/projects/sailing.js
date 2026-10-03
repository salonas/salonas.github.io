export default {
  slug: 'sailing',
  title: 'Sailing the Seas of Cheese',
  type: { es: 'JUEGO', en: 'GAME' },
  status: 'failed',
  state: { es: 'DEMO TÉCNICA · NO CONFORME', en: 'TECH DEMO · FELL SHORT' },
  year: 2026,
  cover: 'cover.jpg',
  coverAlt: {
    es: 'Un barco navegando un océano de queso junto a un jefe gigante',
    en: 'A ship sailing an ocean of cheese next to a giant boss'
  },
  roles: { es: 'Código · Modelado 3D', en: 'Code · 3D modeling' },
  tools: 'Unity 6 · C# · Blender',
  code: { es: 'No público', en: 'Not public' },
  summary: {
    es: 'Boss rush en los Mares de Queso: controlas un barco con físicas para sobrevivir al asedio de un jefe. Quedó como demo técnica, sin el pulido que buscaba.',
    en: 'Boss rush in the Seas of Cheese: you steer a physics-driven ship to survive a boss. It stayed a tech demo, short of the polish I was after.'
  },
  sections: [
    { kind: 'video', title: { es: 'Gameplay', en: 'Gameplay' }, src: 'gameplay.mp4' },
    {
      kind: 'text',
      title: { es: 'Qué faltó', en: 'What was missing' },
      body: {
        es: 'Fue una evaluación con poco plazo de entrega. Ese tiempo no alcanzó para desarrollar el modelado 3D como quería ni para sumar más jefes y mecánicas, así que quedó sin el pulido que tenía como objetivo.',
        en: 'It was a graded assignment with a short deadline. That time was not enough to develop the 3D modeling the way I wanted or to add more bosses and mechanics, so it ended up without the polish I was aiming for.'
      }
    },
    {
      kind: 'items',
      title: { es: 'Mecánicas', en: 'Mechanics' },
      items: [
        {
          name: { es: 'Navegación física', en: 'Physics sailing' },
          text: {
            es: 'Movimiento por fuerzas continuas sobre un Rigidbody y rotación con Input Actions.',
            en: 'Movement from continuous forces on a Rigidbody, rotation through Input Actions.'
          }
        },
        {
          name: { es: 'Artillería lateral', en: 'Broadside cannons' },
          text: {
            es: 'Disparo independiente por babor y estribor.',
            en: 'Independent fire from port and starboard.'
          }
        },
        {
          name: { es: 'Munición limitada', en: 'Limited ammo' },
          text: {
            es: 'Dos balas por cañón, para obligar a moverse con estrategia.',
            en: 'Two shots per cannon, to force strategic movement.'
          }
        },
        { name: 'Dash', text: { es: 'Impulso de velocidad.', en: 'Speed boost.' } }
      ]
    },
    {
      kind: 'items',
      title: { es: 'Comportamiento del jefe', en: 'Boss behaviour' },
      items: [
        {
          name: { es: 'Persecución', en: 'Chase' },
          text: { es: 'Acorta la distancia con avance frontal.', en: 'Closes the distance head-on.' }
        },
        {
          name: { es: 'Flanqueo', en: 'Flank' },
          text: {
            es: 'A rango medio se desplaza de lado para acorralar al barco.',
            en: 'At mid range it strafes to corner the ship.'
          }
        },
        {
          name: { es: 'Ataque', en: 'Attack' },
          text: {
            es: 'A rango corto elige al azar entre cuatro ataques.',
            en: 'At close range it picks one of four attacks at random.'
          }
        }
      ]
    },
    {
      kind: 'shots',
      title: { es: 'Modelado 3D', en: '3D modeling' },
      items: [
        {
          src: 'poseidon-1.jpg',
          alt: {
            es: 'Modelo completo de Cheese Poseidon en Blender',
            en: 'Full Cheese Poseidon model in Blender'
          }
        },
        {
          src: 'poseidon-2.jpg',
          alt: { es: 'Detalle del rostro y la barba', en: 'Close-up of the face and beard' }
        },
        {
          src: 'poseidon-3.jpg',
          alt: {
            es: 'El arma del jefe: una caracola sobre un asta',
            en: 'The boss weapon: a seashell on a staff'
          }
        }
      ]
    },
    {
      kind: 'text',
      title: { es: 'Sobre el modelo', en: 'About the model' },
      body: {
        es: 'En el material original estos personajes no tienen nombre, así que a este lo bauticé Cheese Poseidon. Lo modelé y le hice el rig en Blender, con mapas de color, normales y rugosidad para el cuerpo, la barba y el pelo.',
        en: 'These characters have no names in the source material, so I named this one Cheese Poseidon. I modeled and rigged it in Blender, with colour, normal and roughness maps for the body, beard and hair.'
      }
    },
    {
      kind: 'shots',
      sketch: true,
      title: { es: 'Bocetos', en: 'Sketches' },
      items: [
        {
          src: 'sketch.jpg',
          alt: {
            es: 'Boceto a lápiz del jefe y de dos criaturas',
            en: 'Pencil sketch of the boss and two creatures'
          }
        }
      ]
    },
    {
      kind: 'text',
      title: { es: 'Inspiración', en: 'Inspiration' },
      body: {
        es: 'Está basado en el video musical de [[«Jerry Was a Race Car Driver»|https://youtu.be/LBQ2305fLeA?t=200]] y en la portada del [[álbum Sailing the Seas of Cheese|https://en.wikipedia.org/wiki/Sailing_the_Seas_of_Cheese#/media/File:1991_Sailing_the_Seas_of_Cheese.jpg]], de [[Primus|https://en.wikipedia.org/wiki/Primus_(band)]]. Usa un par de canciones de la banda, por eso el video se publica sin audio.',
        en: 'It is based on the music video for [["Jerry Was a Race Car Driver"|https://youtu.be/LBQ2305fLeA?t=200]] and on the cover of [[the album Sailing the Seas of Cheese|https://en.wikipedia.org/wiki/Sailing_the_Seas_of_Cheese#/media/File:1991_Sailing_the_Seas_of_Cheese.jpg]], by [[Primus|https://en.wikipedia.org/wiki/Primus_(band)]]. It uses a couple of songs by the band, which is why the video is published without audio.'
      }
    }
  ]
}

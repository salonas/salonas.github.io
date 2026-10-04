export default {
  slug: 'plantochi',
  title: 'Plantochi',
  type: { es: 'IOT', en: 'IOT' },
  status: 'done',
  state: { es: 'PROYECTO DE CURSO · COMPLETADO', en: 'COURSE PROJECT · COMPLETE' },
  year: 2025,
  cover: 'cover.png',
  coverAlt: {
    es: 'Pantalla de Plantochi con la planta feliz y sus lecturas',
    en: 'Plantochi screen with the happy plant and its readings'
  },
  roles: { es: 'Desarrollo en dupla', en: 'Two-person development' },
  tools: 'ESP8266 · MQTT · Node-RED · React',
  repo: 'https://github.com/salonas/Plantochi',
  summary: {
    es: 'Riego inteligente con alma de Tamagotchi: una planta que se pone feliz, sedienta o ahogada según sus sensores, y que puedes regar desde la web.',
    en: 'Smart watering with a Tamagotchi soul: a plant that gets happy, thirsty or drowned depending on its sensors, and that you can water from the web.'
  },
  sections: [
    {
      kind: 'shots',
      title: { es: 'Capturas', en: 'Screens' },
      items: [
        { src: 'happy.png', alt: { es: 'Planta feliz, con el suelo húmedo', en: 'Happy plant, with moist soil' } },
        { src: 'thirsty.png', alt: { es: 'Planta sedienta, con el suelo muy seco', en: 'Thirsty plant, with very dry soil' } },
        { src: 'drowning.png', alt: { es: 'Planta ahogada, con el suelo encharcado', en: 'Drowned plant, with waterlogged soil' } },
        {
          src: 'empty.png',
          alt: {
            es: 'Alerta de tanque vacío, con el botón de riego bloqueado',
            en: 'Empty tank alert, with the watering button locked'
          }
        }
      ]
    },
    {
      kind: 'text',
      title: { es: 'Sobre el proyecto', en: 'About the project' },
      body: {
        es: 'Es mi primer proyecto de IoT. Lo hicimos con [[Venjy|https://github.com/Venjyy]] para el curso de Internet de las Cosas. No soy experto en electrónica, pero lo más entretenido fueron los visuales: una planta con cara y ánimo. El servidor del curso ya no está en línea, así que las capturas usan datos de ejemplo.',
        en: 'It is my first IoT project. I built it with [[Venjy|https://github.com/Venjyy]] for the Internet of Things course. I am no electronics expert, but the most fun part was the visuals: a plant with a face and a mood. The course server is no longer online, so the screens use sample data.'
      }
    },
    {
      kind: 'text',
      title: { es: 'Cómo funciona', en: 'How it works' },
      body: {
        es: 'Un NodeMCU lee la temperatura, la humedad del aire, la humedad del suelo y el nivel del tanque, y publica todo por MQTT cada 30 segundos. Node-RED recibe los datos, los guarda en MariaDB y define el ánimo de la planta. La web consulta ese estado cada 5 segundos y permite regar a distancia.',
        en: 'A NodeMCU reads temperature, air humidity, soil moisture and the tank level, and publishes everything over MQTT every 30 seconds. Node-RED receives the data, stores it in MariaDB and sets the mood of the plant. The web app checks that state every 5 seconds and lets you water remotely.'
      }
    },
    {
      kind: 'items',
      title: { es: 'Qué hace', en: 'What it does' },
      items: [
        {
          name: { es: 'Ánimo de la planta', en: 'Plant mood' },
          text: {
            es: 'Feliz, sedienta o ahogada, según la humedad del suelo.',
            en: 'Happy, thirsty or drowned, depending on soil moisture.'
          }
        },
        {
          name: { es: 'Riego doble', en: 'Two ways to water' },
          text: {
            es: 'Automático cuando el suelo se seca y manual desde la web.',
            en: 'Automatic when the soil dries out and manual from the web.'
          }
        },
        {
          name: { es: 'Cuidado del tanque', en: 'Tank guard' },
          text: {
            es: 'Si el tanque está vacío, avisa y bloquea la bomba para no dañarla.',
            en: 'If the tank is empty, it warns you and locks the pump to protect it.'
          }
        }
      ]
    },
    {
      kind: 'shots',
      title: { es: 'Circuito', en: 'Circuit' },
      items: [
        {
          src: 'circuit.jpg',
          alt: {
            es: 'Diagrama del circuito: NodeMCU, sensores, relay, bomba y baterías',
            en: 'Circuit diagram: NodeMCU, sensors, relay, pump and batteries'
          }
        }
      ]
    },
    {
      kind: 'list',
      title: { es: 'Tecnologías', en: 'Tech stack' },
      items: {
        es: [
          'Hardware: NodeMCU (ESP8266), DHT11, sensor de humedad de suelo, sensor de nivel de agua, relay y mini bomba',
          'Backend: MQTT con Mosquitto, Node-RED y MariaDB, en una máquina virtual de Azure con Docker',
          'Frontend: React con CSS propio de estilo pixel art'
        ],
        en: [
          'Hardware: NodeMCU (ESP8266), DHT11, soil moisture sensor, water level sensor, relay and mini pump',
          'Backend: MQTT with Mosquitto, Node-RED and MariaDB, on an Azure virtual machine with Docker',
          'Frontend: React with custom pixel art CSS'
        ]
      }
    }
  ]
}

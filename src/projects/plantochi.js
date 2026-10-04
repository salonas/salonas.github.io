export default {
  slug: 'plantochi',
  title: 'Plantochi',
  type: { es: 'IOT', en: 'IOT' },
  alsoIn: ['WEB'],
  status: 'done',
  state: { es: 'PROYECTO DE CURSO · COMPLETADO', en: 'COURSE PROJECT · COMPLETE' },
  year: 2025,
  cover: 'cover.png',
  coverAlt: {
    es: 'Pantalla de Plantochi con la planta feliz y sus lecturas',
    en: 'Plantochi screen with the happy plant and its readings'
  },
  roles: { es: 'Diseño del sistema IoT · Pixel art', en: 'IoT system design · Pixel art' },
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
        { src: 'drowning.png', alt: { es: 'Planta ahogada, con el suelo encharcado', en: 'Drowned plant, with waterlogged soil' } }
      ]
    },
    {
      kind: 'text',
      title: { es: 'Sobre el proyecto', en: 'About the project' },
      body: {
        es: 'Es mi primer proyecto de IoT, hecho en equipo para el curso de Internet de las Cosas. Yo me encargué del diseño del sistema y de los dibujos de la web. [[Venjyy|https://github.com/Venjyy]] se encargó de los sensores, su recepción y lectura. El servidor ya no está en línea, así que las capturas usan datos de ejemplo.',
        en: 'It is my first IoT project, built as a team for the Internet of Things course. I handled the system design and the drawings for the web app. [[Venjyy|https://github.com/Venjyy]] handled the sensors, receiving and reading them. The server is no longer online, so the screens use sample data.'
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
          name: { es: 'Riego a distancia', en: 'Remote watering' },
          text: {
            es: 'Desde la web o con un botón físico en el circuito.',
            en: 'From the web or with a physical button on the circuit.'
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
      title: { es: 'Sprites', en: 'Sprites' },
      items: [
        {
          src: 'sprites.png',
          alt: {
            es: 'Los cuatro dibujos de la planta: feliz, sedienta, ahogada y crítica',
            en: 'The four drawings of the plant: happy, thirsty, drowned and critical'
          }
        }
      ]
    },
    {
      kind: 'shots',
      title: { es: 'Prototipo y diagrama preliminar', en: 'Prototype and preliminary diagram' },
      items: [
        {
          src: 'prototype.jpg',
          alt: {
            es: 'El prototipo armado: protoboard, sensores, relay, bomba y manguera',
            en: 'The assembled prototype: breadboard, sensors, relay, pump and hose'
          }
        },
        {
          src: 'circuit.jpg',
          alt: {
            es: 'Diagrama preliminar del circuito: NodeMCU, sensores, relay, bomba y baterías',
            en: 'Preliminary circuit diagram: NodeMCU, sensors, relay, pump and batteries'
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

export default {
  slug: 'guide',
  title: 'Guide',
  type: { es: 'APP ANDROID', en: 'ANDROID APP' },
  status: 'paused',
  state: { es: 'DEMO TÉCNICA · DESCONTINUADA', en: 'TECH DEMO · DISCONTINUED' },
  year: 2025,
  cover: 'cover.jpg',
  coverAlt: { es: 'Pantallas de inicio de sesión y de chat de Guide', en: 'Guide login and chat screens' },
  roles: { es: 'Desarrollo Android', en: 'Android development' },
  tools: 'Java · Android · Firebase · Gemini API',
  code: { es: 'No público', en: 'Not public' },
  summary: {
    es: 'Asistente para Terraria en Android: guía de jefes, ítems, builds y logros, chat en tiempo real y un chatbot con Google Gemini.',
    en: 'A Terraria assistant for Android: a guide to bosses, items, builds and achievements, real-time chat and a Google Gemini chatbot.'
  },
  sections: [
    {
      kind: 'shots',
      title: { es: 'Capturas', en: 'Screens' },
      items: [
        { src: 'login.jpg', alt: { es: 'Pantalla de inicio de sesión', en: 'Login screen' } },
        { src: 'chat.jpg', alt: { es: 'Chat con el asistente', en: 'Chat with the assistant' } }
      ]
    },
    {
      kind: 'list',
      title: { es: 'Qué hace', en: 'What it does' },
      items: {
        es: [
          'Chatbot con Google Gemini que responde preguntas sobre el juego',
          'Guía de jefes, ítems y logros, con filtros',
          'Builds por clase: Melee, Ranged, Magic y Summoner',
          'Chat en tiempo real entre usuarios',
          'Inicio de sesión y registro con Firebase',
          'Notificaciones push y sincronización en la nube'
        ],
        en: [
          'Google Gemini chatbot that answers questions about the game',
          'Guide to bosses, items and achievements, with filters',
          'Builds per class: Melee, Ranged, Magic and Summoner',
          'Real-time chat between users',
          'Login and sign-up with Firebase',
          'Push notifications and cloud sync'
        ]
      }
    },
    {
      kind: 'list',
      title: { es: 'Tecnologías', en: 'Tech stack' },
      items: {
        es: [
          'Java para Android, con Material Design, RecyclerView y CardView',
          'Firebase: Authentication, Realtime Database, Firestore y Cloud Messaging',
          'Google Gemini API',
          'OkHttp, Gson y Glide'
        ],
        en: [
          'Java for Android, with Material Design, RecyclerView and CardView',
          'Firebase: Authentication, Realtime Database, Firestore and Cloud Messaging',
          'Google Gemini API',
          'OkHttp, Gson and Glide'
        ]
      }
    }
  ]
}

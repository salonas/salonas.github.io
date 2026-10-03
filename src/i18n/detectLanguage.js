export function detectLanguage(languages) {
  const first = languages?.[0] ?? ''
  return first.toLowerCase().startsWith('es') ? 'es' : 'en'
}

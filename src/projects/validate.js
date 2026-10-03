const STATUSES = ['done', 'paused', 'failed']

function bilingual(value, name) {
  if (!value || typeof value !== 'object') return [`${name}: missing`]
  return ['es', 'en'].filter((l) => typeof value[l] !== 'string' || !value[l]).map((l) => `${name}: missing ${l}`)
}

const KINDS = {
  video: (s) => (s.src ? [] : ['src: missing']),
  loops: (s) => (Array.isArray(s.items) && s.items.length ? [] : ['items: missing']),
  shots: (s) =>
    Array.isArray(s.items)
      ? s.items.flatMap((x, i) => [...(x.src ? [] : [`items[${i}].src: missing`]), ...bilingual(x.alt, `items[${i}].alt`)])
      : ['items: missing'],
  text: (s) => bilingual(s.body, 'body'),
  list: (s) =>
    Array.isArray(s.items?.es) && Array.isArray(s.items?.en) && s.items.es.length === s.items.en.length
      ? []
      : ['items: es and en lists must match'],
  items: (s) =>
    Array.isArray(s.items)
      ? s.items.flatMap((x, i) => [
          ...(typeof x.name === 'string' && x.name ? [] : bilingual(x.name, `items[${i}].name`)),
          ...bilingual(x.text, `items[${i}].text`),
        ])
      : ['items: missing'],
  audio: (s) =>
    Array.isArray(s.tracks)
      ? s.tracks.flatMap((x, i) => [...(x.src ? [] : [`tracks[${i}].src: missing`]), ...bilingual(x.title, `tracks[${i}].title`)])
      : ['tracks: missing'],
}

export function validateProject(p) {
  const problems = []
  for (const key of ['slug', 'title', 'tools']) if (!p[key]) problems.push(`${key}: missing`)
  if (!STATUSES.includes(p.status)) problems.push('status: must be done, paused or failed')
  for (const key of ['type', 'state', 'roles', 'summary']) problems.push(...bilingual(p[key], key))
  if (p.cover) problems.push(...bilingual(p.coverAlt, 'coverAlt'))
  if (!p.repo) problems.push(...bilingual(p.code, 'code'))
  if (!Array.isArray(p.sections)) return [...problems, 'sections: missing']
  p.sections.forEach((s, i) => {
    const at = `sections[${i}]`
    if (!KINDS[s.kind]) {
      problems.push(`${at}: unknown kind ${s.kind}`)
      return
    }
    problems.push(...bilingual(s.title, 'title').map((m) => `${at}.${m}`), ...KINDS[s.kind](s).map((m) => `${at}.${m}`))
  })
  return problems
}

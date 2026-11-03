import { existsSync } from 'node:fs'
import { projects, findProject, mediaUrl } from './index'
import { validateProject } from './validate'
import { toolbox } from '../data/toolbox'

function allMediaFiles(list) {
  return list.flatMap((p) => {
    const files = [p.cover, p.coverVideo]
    for (const s of p.sections) {
      if (s.src) files.push(s.src)
      if (s.kind === 'loops') files.push(...s.items)
      if (s.kind === 'shots') files.push(...s.items.map((x) => x.src))
      if (s.kind === 'audio') files.push(...s.tracks.map((x) => x.src))
    }
    return files.filter(Boolean).map((f) => mediaUrl(p.slug, f))
  })
}

it('lists the projects in order', () => {
  expect(projects.map((p) => p.slug)).toEqual(['procedimiento-seguro', 'chord-analyzer', 'agami', 'guide', 'orquesta', 'plantochi', 'sailing'])
})

it.each(projects)('$slug is a valid project', (p) => {
  expect(validateProject(p)).toEqual([])
})

it('rejects a text that lacks a language', () => {
  expect(validateProject({ ...findProject('agami'), summary: { es: 'solo' } })).toContain('summary: missing en')
})

it('rejects an unknown status and an unknown section kind', () => {
  const agami = findProject('agami')
  expect(validateProject({ ...agami, status: 'wip' })).toContain('status: must be live, done, paused or failed')
  expect(validateProject({ ...agami, sections: [{ kind: 'carousel', title: { es: 'a', en: 'a' } }] })).toContain(
    'sections[0]: unknown kind carousel',
  )
})

it.each(allMediaFiles(projects))('%s exists in public', (path) => {
  expect(existsSync('public' + path)).toBe(true)
})

it('never carries an API key', () => {
  expect(JSON.stringify([projects, toolbox])).not.toMatch(/AIza/)
})

it('puts the sforzando note on Agami, not on Sailing', () => {
  expect(JSON.stringify(findProject('agami'))).toMatch(/sforzando/i)
  expect(JSON.stringify(findProject('sailing'))).not.toMatch(/sforzando/i)
})

it('says the Sailing video has no audio', () => {
  expect(JSON.stringify(findProject('sailing'))).toMatch(/sin audio/)
})

it('links every toolbox entry to a project that exists', () => {
  const targets = toolbox.flatMap((g) => g.tools.map((x) => x.to).filter(Boolean))
  expect(targets.length).toBeGreaterThan(0)
  for (const slug of targets) expect(findProject(slug)).toBeDefined()
})

const ORDER = [
  ['Demo jugable'],
  ['Gameplay', 'Capturas', 'Presentación', 'Video'],
  ['Sobre el proyecto', 'Qué faltó', 'Cómo funciona', 'Equipo'],
  ['Cómo sé que el análisis es correcto', 'Decisiones de teoría'],
  ['Mecánicas', 'Mi parte', 'Qué hace', 'Comportamiento del jefe'],
  ['Tecnologías'],
  ['Música', 'Temas', 'Modelado 3D', 'Sobre el modelo', 'Sprites', 'Prototipo y diagrama preliminar'],
  ['Inspiración'],
  ['Bugs conocidos y curiosidades'],
  ['Bocetos'],
  ['Agradecimientos'],
]

it.each(projects)('keeps the sections of $slug in the shared order', (p) => {
  const ranks = p.sections.map((s) => ORDER.findIndex((group) => group.includes(s.title.es)))
  expect(ranks).not.toContain(-1)
  expect(ranks).toEqual([...ranks].sort((a, b) => a - b))
})

it('ships a résumé for each language', () => {
  for (const lang of ['ES', 'EN']) expect(existsSync(`public/cv/CV_Joaquin_Salinas_${lang}.pdf`)).toBe(true)
})

it('describes the current chord analyzer: 44 chord types, tracks and the General MIDI soundfont', () => {
  const text = JSON.stringify(findProject('chord-analyzer'))
  expect(text).toMatch(/44 tipos/)
  expect(text).toMatch(/44 types/)
  expect(text).not.toMatch(/42 (tipos|types)/)
  expect(text).toMatch(/FluidR3/)
})

it('shows the chord analyzer with lossless screens of its analysis and a clip of the modulation', () => {
  const p = findProject('chord-analyzer')
  expect(p.cover).toBe('cover.png')
  expect(p.sections.find((s) => s.kind === 'shots').items.map((x) => x.src)).toEqual(['analisis.png', 'inspector.png', 'alberti.png', 'texto.png', 'expresion.png'])
  expect(p.sections.find((s) => s.kind === 'loops').items).toEqual(['modulacion.mp4'])
})

it('credits the two corpora the analysis is measured against, with their licenses', () => {
  const thanks = findProject('chord-analyzer').sections.find((s) => s.title.es === 'Agradecimientos')
  for (const lang of ['es', 'en']) {
    const text = thanks.items[lang].join(' ')
    expect(text).toMatch(/TAVERN.*Devaney.*Arthur.*Condit-Schultz.*Nisula.*ISMIR 2015.*CC BY-SA 4\.0/)
    expect(text).toMatch(/Rock Corpus.*de Clercq.*Temperley.*Lustig.*Tan.*CC BY 4\.0/)
  }
})

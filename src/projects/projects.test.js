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
  expect(projects.map((p) => p.slug)).toEqual(['agami', 'guide', 'orquesta', 'plantochi', 'sailing'])
})

it.each(projects)('$slug is a valid project', (p) => {
  expect(validateProject(p)).toEqual([])
})

it('rejects a text that lacks a language', () => {
  expect(validateProject({ ...findProject('agami'), summary: { es: 'solo' } })).toContain('summary: missing en')
})

it('rejects an unknown status and an unknown section kind', () => {
  const agami = findProject('agami')
  expect(validateProject({ ...agami, status: 'wip' })).toContain('status: must be done, paused or failed')
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
  ['Gameplay', 'Capturas'],
  ['Sobre el proyecto', 'Descripción', 'Qué faltó', 'Cómo funciona'],
  ['Mecánicas', 'Qué hace', 'Características principales', 'Comportamiento del jefe'],
  ['Tecnologías'],
  ['Música', 'Temas', 'Modelado 3D', 'Sobre el modelo', 'Sprites', 'Prototipo y diagrama preliminar'],
  ['Inspiración'],
  ['Bugs conocidos y curiosidades'],
  ['Bocetos'],
]

it.each(projects)('keeps the sections of $slug in the shared order', (p) => {
  const ranks = p.sections.map((s) => ORDER.findIndex((group) => group.includes(s.title.es)))
  expect(ranks).not.toContain(-1)
  expect(ranks).toEqual([...ranks].sort((a, b) => a - b))
})

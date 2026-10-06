import agami from './agami'
import guide from './guide'
import orquesta from './orquesta'
import plantochi from './plantochi'
import procedimientoSeguro from './procedimiento-seguro'
import sailing from './sailing'

export const projects = [procedimientoSeguro, agami, guide, orquesta, plantochi, sailing]

export function findProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export const sectionId = (i) => 'section-' + i

export const loopCaption = (section, i, L) => (section.captions ? L(section.captions[i]) : `${L(section.title)} ${i + 1}`)

export function mediaUrl(slug, file) {
  return `/media/${slug}/${file}`
}

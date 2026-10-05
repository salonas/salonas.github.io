import agami from './agami'
import guide from './guide'
import orquesta from './orquesta'
import plantochi from './plantochi'
import sailing from './sailing'

export const projects = [agami, guide, orquesta, plantochi, sailing]

export function findProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export const sectionId = (i) => 'section-' + i

export const loopCaption = (title, i) => `${title} ${i + 1}`

export function mediaUrl(slug, file) {
  return `/media/${slug}/${file}`
}

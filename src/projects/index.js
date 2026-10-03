import agami from './agami'
import guide from './guide'
import orquesta from './orquesta'
import sailing from './sailing'

export const projects = [agami, guide, orquesta, sailing]

export function findProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export function mediaUrl(slug, file) {
  return `/media/${slug}/${file}`
}

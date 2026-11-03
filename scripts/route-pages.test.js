import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { routePages, writeRoutePages } from './route-pages'
import { projects } from '../src/projects'

const shell = readFileSync('index.html', 'utf8')
const head = (html, prop) => html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`))?.[1]

it('gives every route its own page, so GitHub Pages answers 200 instead of the 404 fallback', () => {
  const files = routePages(shell).map((p) => p.file)
  expect(files).toEqual(expect.arrayContaining(['index.html', 'toolbox.html', 'projects.html', 'projects/index.html', 'contact.html']))
  for (const p of projects) expect(files).toContain(`projects/${p.slug}.html`)
})

it('names each project in the title and the link preview, with its cover as the image', () => {
  const page = routePages(shell).find((p) => p.file === 'projects/chord-analyzer.html').html
  expect(page).toMatch(/<title>Salonas Chord Analyzer · [^<]+<\/title>/)
  expect(head(page, 'og:title')).toBe('Salonas Chord Analyzer')
  expect(head(page, 'og:image')).toBe('https://salonas.github.io/media/chord-analyzer/cover.jpg')
  expect(head(page, 'og:url')).toBe('https://salonas.github.io/projects/chord-analyzer')
  expect(page).toContain('<link rel="canonical" href="https://salonas.github.io/projects/chord-analyzer" />')
  expect(page).toMatch(/<meta name="description" content="Piano roll/)
  expect(page.match(/<meta name="description"/g)).toHaveLength(1)
  expect(page.match(/<title>/g)).toHaveLength(1)
})

it('keeps the app and the escaped text intact in every page', () => {
  for (const { html } of routePages(shell)) {
    expect(html).toContain('<div id="root"></div>')
    expect(html).toContain('<script type="module" src="/src/main.jsx"></script>')
    expect(head(html, 'og:image')).toMatch(/^https:\/\/salonas\.github\.io\//)
    for (const [, value] of html.matchAll(/content="([^"]*)"/g)) expect(value).not.toMatch(/[<>]/)
  }
  const agami = routePages(shell).find((p) => p.file === 'projects/agami.html').html
  expect(head(agami, 'og:image:alt')).toBe("Portada de Agami's Alley: un gato gris con bufanda roja y dos globos")
  const sailing = routePages(shell).find((p) => p.file === 'projects/sailing.html').html
  expect(sailing.match(/<meta name="description" content="([^"]*)"/)[1]).not.toContain('[[')
})

it('writes the pages next to the built app', () => {
  const dir = mkdtempSync(join(tmpdir(), 'route-pages-'))
  writeFileSync(join(dir, 'index.html'), shell)
  mkdirSync(join(dir, 'projects'))
  writeRoutePages(dir)
  expect(existsSync(join(dir, 'projects', 'sailing.html'))).toBe(true)
  expect(head(readFileSync(join(dir, 'index.html'), 'utf8'), 'og:url')).toBe('https://salonas.github.io/')
})

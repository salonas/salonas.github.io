import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { mediaUrl, projects } from '../src/projects/index.js'
import en from '../src/i18n/en.js'

const ORIGIN = 'https://salonas.github.io'
// Link previews are read without running the app, so each page carries a single language.
const t = en

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const plain = (s) => s.replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, '$1')
const titled = (name) => `${name} · ${t['page-title']}`

function pages() {
  const site = { description: t['hero-lead'], image: '/img/header.png', imageAlt: '' }
  return [
    { ...site, file: 'index.html', path: '/', title: t['page-title'], name: t['page-title'] },
    { ...site, file: 'toolbox.html', path: '/toolbox', title: titled(t['nav-tools']), name: t['nav-tools'], description: t['tools-lead'] },
    { ...site, file: 'projects.html', path: '/projects', title: titled(t['nav-projects']), name: t['nav-projects'] },
    { ...site, file: 'projects/index.html', path: '/projects', title: titled(t['nav-projects']), name: t['nav-projects'] },
    { ...site, file: 'contact.html', path: '/contact', title: titled(t['nav-contact']), name: t['nav-contact'], description: t['contact-title'] },
    ...projects.map((p) => ({
      file: `projects/${p.slug}.html`,
      path: `/projects/${p.slug}`,
      title: titled(p.title),
      name: p.title,
      description: plain(p.summary.en),
      image: mediaUrl(p.slug, p.cover),
      imageAlt: p.coverAlt.en
    }))
  ]
}

function render(shell, page) {
  const url = ORIGIN + page.path
  const meta = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(t['page-title'])}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escape(page.name)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ORIGIN + page.image}" />`,
    ...(page.imageAlt ? [`<meta property="og:image:alt" content="${escape(page.imageAlt)}" />`] : []),
    `<meta name="twitter:card" content="summary_large_image" />`
  ].join('\n    ')
  return shell
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, () => `<meta name="description" content="${escape(page.description)}" />\n    ${meta}`)
}

export function routePages(shell) {
  return pages().map((page) => ({ file: page.file, html: render(shell, page) }))
}

export function writeRoutePages(dir) {
  const shell = readFileSync(join(dir, 'index.html'), 'utf8')
  for (const { file, html } of routePages(shell)) {
    mkdirSync(dirname(join(dir, file)), { recursive: true })
    writeFileSync(join(dir, file), html)
  }
}

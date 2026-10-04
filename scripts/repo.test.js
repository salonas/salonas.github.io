import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

const ignored = (file) => {
  try {
    execFileSync('git', ['check-ignore', '-q', file])
    return true
  } catch {
    return false
  }
}

it('keeps the build and test configuration in git', () => {
  expect(ignored('vite.config.js')).toBe(false)
})

it('keeps local secrets out of git', () => {
  expect(ignored('.env')).toBe(true)
})

it('uses its own cursors, none taken from a game', () => {
  expect(readdirSync('public/cursors').sort()).toEqual(['arrow.png', 'pointer.png', 'text.png'])
  const css = readFileSync('src/styles/tokens.css', 'utf8') + readFileSync('src/styles/site.css', 'utf8')
  for (const [, file] of css.matchAll(/url\(\/cursors\/([^)]+)\)/g)) {
    expect(existsSync('public/cursors/' + file)).toBe(true)
  }
  expect(css).not.toMatch(/webfishing/i)
})

it('uses the cat drawing as the site icon, with every icon file in place', () => {
  const html = readFileSync('index.html', 'utf8')
  const manifest = JSON.parse(readFileSync('public/site.webmanifest', 'utf8'))
  const icons = [...html.matchAll(/href="\/([^"]+\.(?:png|ico|svg))"/g)].map((m) => m[1])
  expect(icons).toEqual(['favicon.ico', 'favicon-96x96.png', 'apple-touch-icon.png'])
  for (const file of [...icons, ...manifest.icons.map((i) => i.src.slice(1))]) {
    expect(existsSync('public/' + file)).toBe(true)
  }
  expect(existsSync('public/favicon.svg')).toBe(false)
})

it('draws every face symbol with the bundled pixel font', () => {
  const css = readFileSync('src/styles/site.css', 'utf8')
  const [, file, range] = css.match(/font-family:'Unifont';src:url\(\/fonts\/([^)]+)\)[^}]*unicode-range:([^;}]+)/) ?? []
  expect(existsSync('public/fonts/' + file)).toBe(true)
  const covered = range.split(',').map((u) => parseInt(u.replace('U+', ''), 16))
  for (const symbol of '≽≼⩊ω˵◕╰￣˶˃ᆺ˂٩ˊᗜˋو') expect(covered).toContain(symbol.codePointAt(0))
  expect(readFileSync('src/styles/tokens.css', 'utf8')).toMatch(/--display:'MGPixel','Unifont'/)
})

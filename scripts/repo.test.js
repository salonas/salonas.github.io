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
  const icons = [...html.matchAll(/rel="(?:icon|apple-touch-icon)" href="\/([^"]+\.(?:png|ico|svg))"/g)].map((m) => m[1])
  expect(icons).toEqual(['favicon.ico', 'favicon-96x96.png', 'apple-touch-icon.png'])
  for (const file of [...icons, ...manifest.icons.map((i) => i.src.slice(1))]) {
    expect(existsSync('public/' + file)).toBe(true)
  }
  expect(existsSync('public/favicon.svg')).toBe(false)
})

it('draws every face symbol with the bundled pixel font', () => {
  const css = readFileSync('src/styles/site.css', 'utf8')
  const faces = [...css.matchAll(/font-family:'Unifont';src:url\(\/fonts\/([^)]+)\)[^}]*unicode-range:([^;}]+)/g)]
  for (const [, file] of faces) expect(existsSync('public/fonts/' + file)).toBe(true)
  const covered = faces.flatMap(([, , range]) => range.split(',').map((u) => parseInt(u.replace('U+', ''), 16)))
  for (const symbol of '≽≼⩊ω˵◕╰￣˶˃ᆺ˂٩ˊᗜˋو・') expect(covered).toContain(symbol.codePointAt(0))
  expect(readFileSync('src/styles/tokens.css', 'utf8')).toMatch(/--display:'MGPixel','Unifont'/)
})

it('sizes the viewer image without percentages, so the sheet hugs wide images', () => {
  const css = readFileSync('src/styles/site.css', 'utf8')
  const [, width] = css.match(/\.zframe img,\.zframe video\{max-width:([^;]+);/)
  expect(width).not.toContain('%')
})

it('writes the footer bubble in the ink of the drawing', () => {
  const css = readFileSync('src/styles/site.css', 'utf8')
  const [bubble] = css.match(/\.bubble\{[^}]+\}/)
  expect(bubble).toContain('color:#1a1a1a')
})

it('keeps the switched-off screen black, away from the paper browns', () => {
  const css = readFileSync('src/styles/site.css', 'utf8')
  const [off] = css.match(/\.gcover\.off\{[^}]+\}/)
  expect(off).not.toMatch(/--ink|--brown/)
})

it('fetches the display font early and never paints text in a stand-in font', () => {
  const html = readFileSync('index.html', 'utf8')
  expect(html).toMatch(/<link rel="preload" href="\/fonts\/MGPixel\.woff2" as="font" type="font\/woff2" crossorigin \/>/)
  const css = readFileSync('src/styles/site.css', 'utf8')
  const faces = css.match(/@font-face\{[^}]+\}/g)
  for (const face of faces) expect(face).toContain('font-display:block')
})

it('ships the two big fonts compressed, with nothing pointing at a missing file', () => {
  const css = readFileSync('src/styles/site.css', 'utf8')
  const files = [...css.matchAll(/url\(\/fonts\/([^)]+)\)/g)].map((m) => m[1])
  expect(files).toContain('MGPixel.woff2')
  expect(files).toContain('Notepen.woff2')
  for (const file of files) expect(existsSync('public/fonts/' + file)).toBe(true)
  expect(readdirSync('public/fonts').sort()).toEqual([...new Set(files)].sort())
})

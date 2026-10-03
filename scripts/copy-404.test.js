import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

it('ships the app as 404.html so GitHub Pages serves it for unknown paths', () => {
  const dir = mkdtempSync(join(tmpdir(), 'copy-404-'))
  mkdirSync(join(dir, 'dist'))
  writeFileSync(join(dir, 'dist', 'index.html'), '<!doctype html><title>app</title>')
  execFileSync(process.execPath, [resolve('scripts/copy-404.mjs')], { cwd: dir })
  expect(readFileSync(join(dir, 'dist', '404.html'), 'utf8')).toBe('<!doctype html><title>app</title>')
})

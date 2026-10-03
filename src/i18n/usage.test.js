import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import es from './es'

function sources(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sources(path)
    return /\.jsx?$/.test(name) && !/\.test\./.test(name) && !/^(es|en)\.js$/.test(name) ? [path] : []
  })
}

it('has no translation nobody uses', () => {
  const code = sources('src')
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')
  const unused = Object.keys(es).filter((key) => !code.includes(`'${key}'`))
  expect(unused).toEqual([])
})

import { render } from '@testing-library/react'
import Paper, { cornerOf } from './Paper'

const sheet = (props) => render(<Paper {...props}>hola</Paper>).container.firstChild

it('stays a plain pinned sheet when no kind is asked for', () => {
  const el = sheet({ tilt: 'l' })
  expect(el).toHaveClass('paper', 'tl')
  expect(el.children).toHaveLength(0)
})

it('punches holes and a perforation into a notebook sheet, hidden from readers', () => {
  const el = sheet({ sheet: 'notebook' })
  expect(el).toHaveClass('nb')
  expect(el.querySelector('.holes')).toHaveAttribute('aria-hidden', 'true')
  expect(el.querySelector('.perf')).toBeInTheDocument()
})

it('rules a text sheet and frames it with the dotted line', () => {
  const el = sheet({ sheet: 'text' })
  expect(el).toHaveClass('ts')
  expect(el.querySelector('.bg .lines')).toBeInTheDocument()
  expect(el.querySelector('.fr')).toBeInTheDocument()
  expect(el.querySelector('.ear')).not.toBeInTheDocument()
})

it('folds a corner only when the corner says so', () => {
  expect(sheet({ sheet: 'text', corner: 'right' }).querySelector('.ear')).toBeInTheDocument()
  expect(sheet({ sheet: 'text', corner: 'left' })).toHaveClass('fold-l')
  expect(sheet({ sheet: 'text', corner: 'cut' }).querySelector('.ear')).not.toBeInTheDocument()
})

it('frames a photo without holes or rules', () => {
  const el = sheet({ sheet: 'photo' })
  expect(el).toHaveClass('foto')
  expect(el.children).toHaveLength(0)
})

it('varies the corners so neighbours never match and some stay flat', () => {
  const run = Array.from({ length: 20 }, (_, i) => cornerOf(i))
  run.forEach((c, i) => i && expect(c).not.toBe(run[i - 1]))
  expect(run.filter((c) => c === 'flat').length).toBeGreaterThan(run.filter((c) => c === 'left').length)
  expect(new Set(run)).toEqual(new Set(['flat', 'right', 'left', 'cut']))
})

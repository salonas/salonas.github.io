import { screen } from '@testing-library/react'
import { renderAt } from '../test/render'

it('hangs the title from two braided ropes drawn on the pixel grid', async () => {
  renderAt('/')
  const sign = (await screen.findByRole('heading', { level: 1 })).closest('.sign')
  const ropes = sign.querySelectorAll('svg.rope')
  expect(ropes).toHaveLength(2)
  for (const rope of ropes) {
    expect(rope.querySelector('line')).toBeNull()
    const numbers = [...rope.querySelectorAll('path')].flatMap((p) => p.getAttribute('d').match(/-?\d+(\.\d+)?/g))
    expect(numbers.length).toBeGreaterThan(0)
    for (const n of numbers) expect(Math.abs(Number(n)) % 3).toBe(0)
  }
})

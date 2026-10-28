import { screen } from '@testing-library/react'
import { renderAt } from './test/render'

it.each(['/', '/toolbox', '/projects', '/projects/orquesta', '/contact'])(
  'opens every outside link on %s in a new tab',
  (path) => {
    renderAt(path)
    const outside = screen.getAllByRole('link').filter((a) => /^https?:/.test(a.getAttribute('href')))
    for (const a of outside) {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel')).toMatch(/noopener/)
    }
  },
)

it('opens the chord analyzer in the same tab, as a page of this site', () => {
  renderAt('/projects/chord-analyzer')
  const open = screen.getByRole('link', { name: 'Abrir el sitio' })
  expect(open).toHaveAttribute('href', '/chord-analyzer/')
  expect(open).not.toHaveAttribute('target')
})

it('finds outside links where they are expected', () => {
  renderAt('/contact')
  const outside = screen.getAllByRole('link').filter((a) => /^https?:/.test(a.getAttribute('href')))
  expect(outside.length).toBe(3)
})

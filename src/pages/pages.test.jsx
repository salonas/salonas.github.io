import { screen, within } from '@testing-library/react'
import es from '../i18n/es'
import { projects } from '../projects'
import { renderAt } from '../test/render'

const main = () => screen.getByRole('main')
const projectLinks = () =>
  within(main())
    .getAllByRole('link')
    .map((a) => a.getAttribute('href'))
    .filter((h) => h.startsWith('/projects/'))

it('lists every project on the projects page', () => {
  renderAt('/projects')
  expect(projectLinks()).toEqual(projects.map((p) => '/projects/' + p.slug))
})

it('shows the hint to open a project', () => {
  renderAt('/projects')
  expect(within(main()).getByText(es['proj-hint'])).toBeInTheDocument()
})

it('shows each status in words on its card', () => {
  renderAt('/projects')
  for (const p of projects) expect(within(main()).getByText(p.state.es)).toBeInTheDocument()
})

it('features only the flagged projects on home', () => {
  renderAt('/')
  expect(projectLinks()).toEqual(['/projects/agami', '/projects/orquesta'])
})

it('introduces Salonas on home with the highlighted quote', () => {
  renderAt('/')
  expect(within(main()).getByRole('heading', { name: es['hero-title'] })).toBeInTheDocument()
  expect(within(main()).getByText(es['journey-quote'])).toHaveClass('quote')
})

it('links each tool to the project where it was used', () => {
  renderAt('/toolbox')
  expect(projectLinks()).toContain('/projects/guide')
  expect(projectLinks()).toContain('/projects/sailing')
  expect(within(main()).getByRole('link', { name: /World in My Eyes/ })).toHaveAttribute(
    'href',
    'https://youtu.be/YOYFk65Kr_4',
  )
})

it.each(['/', '/toolbox', '/projects'])('%s does not mention school or a CV', (path) => {
  renderAt(path)
  expect(document.body.textContent).not.toMatch(/cursando|En la carrera|\bCV\b|videojuegos/i)
})

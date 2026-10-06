import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  expect(projectLinks()).toEqual(['/projects/procedimiento-seguro', '/projects/agami'])
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

it('gives every status label the same look', () => {
  renderAt('/projects')
  for (const p of projects) expect(within(main()).getByText(p.state.es).className).toBe('state')
})

it('filters the projects by type', async () => {
  renderAt('/projects')
  await userEvent.click(within(main()).getByRole('button', { name: 'JUEGO' }))
  expect(projectLinks()).toEqual(['/projects/agami', '/projects/sailing'])
  expect(within(main()).getByRole('button', { name: 'JUEGO' })).toHaveAttribute('aria-pressed', 'true')
  await userEvent.click(within(main()).getByRole('button', { name: es['filter-all'] }))
  expect(projectLinks()).toEqual(projects.map((p) => '/projects/' + p.slug))
})

it('lists a project under every type it belongs to', async () => {
  renderAt('/projects')
  await userEvent.click(within(main()).getByRole('button', { name: 'WEB' }))
  expect(projectLinks()).toEqual(['/projects/procedimiento-seguro', '/projects/orquesta', '/projects/plantochi'])
})

it('fills the empty spot with a note only when every project is shown', async () => {
  renderAt('/projects')
  const odd = projects.length % 2 === 1
  expect(within(main()).queryAllByText(es['proj-soon'])).toHaveLength(odd ? 1 : 0)
  await userEvent.click(within(main()).getByRole('button', { name: 'IOT' }))
  expect(projectLinks()).toHaveLength(1)
  expect(main().querySelectorAll('.row > .card')).toHaveLength(2)
  expect(within(main()).queryByText(es['proj-soon'])).not.toBeInTheDocument()
  await userEvent.click(within(main()).getByRole('button', { name: es['filter-reset'] }))
  expect(projectLinks()).toEqual(projects.map((p) => '/projects/' + p.slug))
})

it('always offers the filter reset, centred when the row is full', async () => {
  renderAt('/projects')
  await userEvent.click(within(main()).getByRole('button', { name: 'JUEGO' }))
  expect(within(main()).getByRole('button', { name: es['filter-reset'] })).toHaveClass('alone')
  await userEvent.click(within(main()).getByRole('button', { name: 'IOT' }))
  expect(within(main()).getByRole('button', { name: es['filter-reset'] })).not.toHaveClass('alone')
})

it('tags a project with every type it belongs to', () => {
  renderAt('/projects')
  const card = within(main()).getByRole('link', { name: /Plantochi/ })
  expect([...card.querySelectorAll('.tag')].map((x) => x.textContent)).toEqual(['IOT', 'WEB'])
})

it('shows type and status on the featured cards too', () => {
  renderAt('/')
  const card = within(main()).getByRole('link', { name: /Agami/ })
  expect(within(card).getByText('JUEGO')).toHaveClass('tag')
  expect(card.querySelector('.state')).toBeInTheDocument()
})

it.each(['/', '/projects'])('stamps the playable demo on its card at %s', (path) => {
  renderAt(path)
  expect(within(within(main()).getByRole('link', { name: /Agami/ })).getByText(es['demo-badge'])).toHaveClass('stamp')
  expect(within(main()).getAllByText(es['demo-badge'])).toHaveLength(1)
})

it('pins the project cards as notebook sheets', () => {
  renderAt('/projects')
  const card = within(main()).getByRole('link', { name: /Agami's Alley/ })
  expect(card).toHaveClass('nb', 'card')
  expect(card.querySelector('.holes')).toBeInTheDocument()
})

it('writes the home story on text sheets, the long one without a fold', () => {
  renderAt('/')
  const story = within(main()).getByRole('heading', { name: es['journey-title'] }).closest('.paper')
  expect(story).toHaveClass('ts', 'big')
  expect(story.querySelector('.ear')).not.toBeInTheDocument()
  expect(within(main()).getByRole('heading', { name: es['interests-title'] }).closest('.paper')).toHaveClass('ts')
})

it('rules the toolbox lists like notebook pages', () => {
  renderAt('/toolbox')
  const list = within(main()).getByRole('heading', { name: 'Arte' }).closest('.paper')
  expect(list).toHaveClass('nb')
  expect(list.querySelector('.rows .lines')).toBeInTheDocument()
})

it('keeps the contact form on a notebook sheet and the channels on small sheets', () => {
  renderAt('/contact')
  expect(within(main()).getByRole('heading', { name: es['form-title'] }).closest('.paper')).toHaveClass('nb')
  expect(within(main()).getByRole('link', { name: /GitHub/ })).toHaveClass('ts', 'contact')
})

it('offers the résumé in the language of the page', async () => {
  renderAt('/contact')
  const cv = () => within(main()).getByRole('link', { name: /Currículum|Résumé/ })
  expect(cv()).toHaveAttribute('href', '/cv/CV_Joaquin_Salinas_ES.pdf')
  expect(cv()).toHaveAttribute('download')
  await userEvent.click(screen.getByRole('button', { name: 'English' }))
  expect(cv()).toHaveAttribute('href', '/cv/CV_Joaquin_Salinas_EN.pdf')
})

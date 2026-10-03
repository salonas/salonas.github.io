import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import es from '../i18n/es'
import { projects } from '../projects'
import { renderAt } from '../test/render'

const main = () => screen.getByRole('main')

it.each(projects)('renders $slug with every section title', (p) => {
  renderAt('/projects/' + p.slug)
  expect(within(main()).getByRole('heading', { level: 2, name: p.title })).toBeInTheDocument()
  for (const s of p.sections) {
    expect(within(main()).getByRole('heading', { level: 3, name: s.title.es })).toBeInTheDocument()
  }
})

it('shows role, tools and year in the facts strip', () => {
  renderAt('/projects/agami')
  expect(within(main()).getByText('Código · Arte · Música')).toBeInTheDocument()
  expect(within(main()).getByText('Unity 6 · C# · Aseprite · sforzando')).toBeInTheDocument()
  expect(within(main()).getByText('2026')).toBeInTheDocument()
})

it('links to the repository only when the project has one', () => {
  renderAt('/projects/orquesta')
  expect(within(main()).getByRole('link', { name: es['repo'] })).toHaveAttribute(
    'href',
    'https://github.com/salonas/OrquestaDeCobquecuraWEB',
  )
})

it('says the code is not public when there is no repository', () => {
  renderAt('/projects/agami')
  expect(within(main()).queryByRole('link', { name: es['repo'] })).not.toBeInTheDocument()
  expect(within(main()).getByText('No público')).toBeInTheDocument()
})

it('shows a not-found message for an unknown project', () => {
  renderAt('/projects/nope')
  expect(within(main()).getByText(es['proj-missing'])).toBeInTheDocument()
  expect(within(main()).getByRole('link', { name: es['back'] })).toHaveAttribute('href', '/projects')
})

it('pauses the background music when a track starts', async () => {
  renderAt('/projects/agami')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
  await userEvent.click(within(main()).getByRole('button', { name: `${es['play']}: Tema del menú` }))
  expect(await screen.findByRole('button', { name: es['music-on'] })).toBeInTheDocument()
})

it('opens the viewer on the clicked image and walks across sections', async () => {
  renderAt('/projects/sailing')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  const zoomButtons = within(main()).getAllByRole('button', { name: new RegExp('^' + es['zoom']) })
  expect(zoomButtons).toHaveLength(4)
  await userEvent.click(zoomButtons[2])
  const viewer = screen.getByRole('dialog')
  expect(within(viewer).getByText('3 / 4')).toBeInTheDocument()
  await userEvent.click(within(viewer).getByRole('button', { name: es['next'] }))
  expect(within(viewer).getByText('4 / 4')).toBeInTheDocument()
})

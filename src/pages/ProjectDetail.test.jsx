import { screen, within } from '@testing-library/react'
import { vi } from 'vitest'
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
  expect(within(main()).getByText('Unity 6 · C# · Aseprite · FL Studio')).toBeInTheDocument()
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

it('links the inspirations of Sailing to their sources, in a new tab', () => {
  renderAt('/projects/sailing')
  const link = (name) => within(main()).getByRole('link', { name })
  expect(link(/Jerry Was a Race Car Driver/)).toHaveAttribute('href', 'https://youtu.be/LBQ2305fLeA?t=200')
  expect(link(/Sailing the Seas of Cheese/)).toHaveAttribute(
    'href',
    'https://en.wikipedia.org/wiki/Sailing_the_Seas_of_Cheese#/media/File:1991_Sailing_the_Seas_of_Cheese.jpg',
  )
  expect(link('Primus')).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Primus_(band)')
  expect(link('Primus')).toHaveAttribute('target', '_blank')
})

it('shows no link markup as plain text', () => {
  renderAt('/projects/sailing')
  expect(main().textContent).not.toMatch(/\]\(|\[/)
})

it('describes Sailing as set in the Seas of Cheese', () => {
  renderAt('/projects/sailing', 'en')
  expect(within(main()).getByText(/^Boss rush in the Seas of Cheese:/)).toBeInTheDocument()
})

it('says how the music of Agami was made and what inspired the game', () => {
  renderAt('/projects/agami')
  expect(within(main()).getByText(/FL Studio con Sforzando 2/)).toBeInTheDocument()
  expect(within(main()).getByRole('heading', { level: 4, name: 'The Legend of Zelda: A Link to the Past' })).toBeInTheDocument()
  expect(within(main()).getByRole('heading', { level: 4, name: 'The Binding of Isaac' })).toBeInTheDocument()
})

it('offers an index that jumps to each section on long pages', async () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  renderAt('/projects/agami')
  const index = within(main()).getByRole('navigation', { name: es['index-label'] })
  const agami = projects.find((p) => p.slug === 'agami')
  expect(within(index).getAllByRole('button').map((b) => b.textContent)).toEqual(agami.sections.map((s) => s.title.es))
  await userEvent.click(within(index).getByRole('button', { name: 'Bocetos' }))
  const [target] = window.HTMLElement.prototype.scrollIntoView.mock.contexts
  expect(within(target).getByRole('heading', { name: 'Bocetos' })).toBeInTheDocument()
})

it.each(projects)('gives $slug its section index', (p) => {
  renderAt('/projects/' + p.slug)
  const index = within(main()).getByRole('navigation', { name: es['index-label'] })
  expect(within(index).getAllByRole('button')).toHaveLength(p.sections.length)
})

it('turns links inside item texts into real links', () => {
  renderAt('/projects/agami')
  expect(within(main()).getByRole('link', { name: /Tommy the Cat/ })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=r4OhIU-PmB8')
})

it('opens the looping clips in the viewer too', async () => {
  renderAt('/projects/orquesta')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  const zoomButtons = within(main()).getAllByRole('button', { name: new RegExp('^' + es['zoom']) })
  expect(zoomButtons).toHaveLength(2)
  await userEvent.click(zoomButtons[1])
  const viewer = screen.getByRole('dialog')
  expect(within(viewer).getByText('2 / 2')).toBeInTheDocument()
  expect(viewer.querySelector('video')).toHaveAttribute('src', '/media/orquesta/screen-2.mp4')
})

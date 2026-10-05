import { screen, waitFor } from '@testing-library/react'
import es from './i18n/es'
import { renderAt } from './test/render'

it.each([
  ['/', 'title-home'],
  ['/toolbox', 'title-tools'],
  ['/projects', 'title-projects'],
  ['/projects/agami', 'title-projects'],
  ['/contact', 'title-contact'],
])('shows the page title for %s', (path, key) => {
  renderAt(path)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(es[key])
})

it.each([
  ['/Skills', '/toolbox'],
  ['/Projects', '/projects'],
  ['/Contact', '/contact'],
])('redirects %s to %s', async (from, to) => {
  renderAt(from)
  await waitFor(() => expect(window.location.pathname).toBe(to))
})

it('marks the current page in the navigation', () => {
  renderAt('/toolbox')
  expect(screen.getByRole('link', { name: es['nav-tools'] })).toHaveAttribute('aria-current', 'page')
  expect(screen.getByRole('link', { name: es['nav-home'] })).not.toHaveAttribute('aria-current')
})

it('shows a not-found page for an unknown route', () => {
  renderAt('/nope')
  expect(screen.getByText(es['nf-title'])).toBeInTheDocument()
  expect(screen.getByRole('link', { name: es['nf-back'] })).toHaveAttribute('href', '/')
})

it('opens in English for a non-Spanish browser', () => {
  renderAt('/', null)
  expect(document.documentElement.lang).toBe('en')
})

it.each(['es', 'en'])('writes the same thought in the footer bubble in %s', (lang) => {
  renderAt('/', lang)
  expect(screen.getByRole('contentinfo')).toHaveTextContent('404Page not found?')
})

it('names the browser tab in the current language', () => {
  renderAt('/')
  expect(document.title).toBe('Rincón Creativo de Salonas (◕⩊◕)')
})

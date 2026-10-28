import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from './LanguageProvider'

function Probe() {
  const { lang, toggle } = useLanguage()
  return (
    <button type="button" onClick={toggle}>
      {lang}
    </button>
  )
}

const mount = (initial) =>
  render(
    <LanguageProvider initial={initial}>
      <Probe />
    </LanguageProvider>,
  )

it('opens in the language saved by the site or the chord analyzer', () => {
  expect(navigator.language).toMatch(/^en/)
  localStorage.setItem('salonas.lang', 'es')
  mount()
  expect(screen.getByRole('button')).toHaveTextContent('es')
  expect(document.documentElement.lang).toBe('es')
})

it('ignores a saved value that is not es or en', () => {
  localStorage.setItem('salonas.lang', 'fr')
  mount('es')
  expect(screen.getByRole('button')).toHaveTextContent('es')
})

it('saves the language when it is switched', async () => {
  mount('es')
  await userEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('button')).toHaveTextContent('en')
  expect(localStorage.getItem('salonas.lang')).toBe('en')
})

it('follows a switch made in another tab', () => {
  mount('es')
  act(() => {
    localStorage.setItem('salonas.lang', 'en')
    window.dispatchEvent(new StorageEvent('storage', { key: 'salonas.lang', newValue: 'en' }))
  })
  expect(screen.getByRole('button')).toHaveTextContent('en')
})

it('reads it again when the page comes back from the history cache', () => {
  mount('es')
  act(() => {
    localStorage.setItem('salonas.lang', 'en')
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }))
  })
  expect(screen.getByRole('button')).toHaveTextContent('en')
})

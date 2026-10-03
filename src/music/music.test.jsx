import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import es from '../i18n/es'
import en from '../i18n/en'
import { renderAt } from '../test/render'

const play = () => window.HTMLMediaElement.prototype.play

it('stays off and shows the notice when the browser blocks autoplay', async () => {
  play().mockImplementation(() => Promise.reject(new Error('blocked')))
  renderAt('/')
  expect(await screen.findByRole('dialog')).toHaveTextContent(es['m-music-msg'])
  await waitFor(() => expect(play()).toHaveBeenCalled())
  expect(screen.getByRole('button', { name: es['music-on'] })).toBeInTheDocument()
})

it('starts the music when the notice is closed', async () => {
  play().mockImplementationOnce(() => Promise.reject(new Error('blocked')))
  renderAt('/')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
})

it('plays at once when autoplay is allowed', async () => {
  play().mockImplementation(() => Promise.resolve())
  renderAt('/')
  expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
})

it('turns the music off from the sidebar', async () => {
  play().mockImplementation(() => Promise.resolve())
  renderAt('/')
  await userEvent.click(await screen.findByRole('button', { name: es['music-off'] }))
  expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled()
  expect(screen.getByRole('button', { name: es['music-on'] })).toBeInTheDocument()
})

it('switches language from the sidebar', async () => {
  renderAt('/')
  await userEvent.click(screen.getByRole('button', { name: es['lang-btn'] }))
  expect(document.documentElement.lang).toBe('en')
  expect(screen.getByRole('link', { name: en['nav-projects'] })).toBeInTheDocument()
})

it('keeps keyboard focus on a sidebar button after it is pressed with Enter', async () => {
  renderAt('/')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  const button = screen.getByRole('button', { name: es['lang-btn'] })
  button.focus()
  await userEvent.keyboard('{Enter}')
  expect(screen.getByRole('button', { name: en['lang-btn'] })).toHaveFocus()
})

const bgm = () => document.querySelector('audio[src="/music/meh.mp3"]')

it('shows the music as off when the browser pauses it', async () => {
  renderAt('/')
  await screen.findByRole('button', { name: es['music-off'] })
  fireEvent.pause(bgm())
  expect(await screen.findByRole('button', { name: es['music-on'] })).toBeInTheDocument()
})

it('resumes the music when the visitor comes back to the page', async () => {
  renderAt('/')
  await screen.findByRole('button', { name: es['music-off'] })
  fireEvent.pause(bgm())
  await screen.findByRole('button', { name: es['music-on'] })
  fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }))
  expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
})

it('does not resume music the visitor turned off before leaving', async () => {
  renderAt('/')
  await userEvent.click(await screen.findByRole('button', { name: es['music-off'] }))
  fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }))
  await new Promise((r) => setTimeout(r, 20))
  expect(screen.getByRole('button', { name: es['music-on'] })).toBeInTheDocument()
})

const setHidden = (hidden) => {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden })
  fireEvent(document, new Event('visibilitychange'))
}
const pausedElements = () => window.HTMLMediaElement.prototype.pause.mock.contexts
const playedElements = () => play().mock.contexts

describe('when the page goes to the background', () => {
  afterEach(() => setHidden(false))

  it('silences the music while another window has the focus', async () => {
    renderAt('/')
    await screen.findByRole('button', { name: es['music-off'] })
    fireEvent.blur(window)
    expect(pausedElements()).toContain(bgm())
    expect(await screen.findByRole('button', { name: es['music-on'] })).toBeInTheDocument()
    fireEvent.focus(window)
    expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
  })

  it('silences the music while the page is hidden or the screen is locked', async () => {
    renderAt('/')
    await screen.findByRole('button', { name: es['music-off'] })
    setHidden(true)
    expect(pausedElements()).toContain(bgm())
    expect(await screen.findByRole('button', { name: es['music-on'] })).toBeInTheDocument()
    setHidden(false)
    expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
  })

  it('does not start music the visitor had turned off', async () => {
    renderAt('/')
    await userEvent.click(await screen.findByRole('button', { name: es['music-off'] }))
    fireEvent.blur(window)
    fireEvent.focus(window)
    await new Promise((r) => setTimeout(r, 20))
    expect(screen.getByRole('button', { name: es['music-on'] })).toBeInTheDocument()
  })

  it('pauses a playing video or track and resumes it on return', async () => {
    renderAt('/projects/agami')
    await screen.findByRole('button', { name: es['music-off'] })
    const video = document.querySelector('video[data-media]')
    Object.defineProperty(video, 'paused', { configurable: true, get: () => false })
    await userEvent.click(video.closest('.vplayer').querySelector('.pbtn'))
    fireEvent.blur(window)
    expect(pausedElements()).toContain(video)
    play().mockClear()
    fireEvent.pause(video)
    await new Promise((r) => setTimeout(r, 20))
    expect(play()).not.toHaveBeenCalled()
    fireEvent.focus(window)
    expect(playedElements()).toContain(video)
    expect(playedElements()).not.toContain(bgm())
  })
})

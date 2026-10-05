import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import es from '../i18n/es'
import { startGame } from '../game/unity'
import { renderAt } from '../test/render'

vi.mock('../game/unity', () => ({ startGame: vi.fn() }))

const main = () => screen.getByRole('main')
const pointer = (fine) => {
  window.matchMedia = (query) => ({ matches: query.includes('pointer: fine') ? fine : false, addEventListener() {}, removeEventListener() {} })
}

async function openAgami() {
  renderAt('/projects/agami')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
}

beforeEach(() => {
  pointer(true)
  startGame.mockReset()
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

it('downloads nothing until the visitor asks to play', async () => {
  await openAgami()
  expect(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) })).toBeInTheDocument()
  expect(startGame).not.toHaveBeenCalled()
})

it('starts the game, silences the site music and closes on request', async () => {
  const quit = vi.fn(() => Promise.resolve())
  startGame.mockResolvedValue({ Quit: quit, SetFullscreen: vi.fn() })
  await openAgami()
  window.HTMLMediaElement.prototype.pause.mockClear()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  expect(startGame).toHaveBeenCalledWith('agami', expect.any(HTMLCanvasElement), expect.any(Function), 0.25)
  expect(window.HTMLMediaElement.prototype.pause.mock.contexts).toContain(document.querySelector('audio[src="/music/meh.mp3"]'))
  await userEvent.click(await within(main()).findByRole('button', { name: es['demo-close'] }))
  expect(quit).toHaveBeenCalled()
  expect(await within(main()).findByRole('button', { name: new RegExp(es['demo-play']) })).toBeInTheDocument()
})

it('says so when the game cannot load', async () => {
  startGame.mockRejectedValue(new Error('no webgl'))
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  expect(await within(main()).findByRole('alert')).toHaveTextContent(es['demo-error'])
})

it('explains that the demo needs a computer on touch devices', async () => {
  pointer(false)
  await openAgami()
  expect(within(main()).getByText(es['demo-desktop'])).toBeInTheDocument()
  expect(within(main()).queryByRole('button', { name: new RegExp(es['demo-play']) })).not.toBeInTheDocument()
})

it('shows a switched-off screen with a way to the video on touch devices', async () => {
  pointer(false)
  await openAgami()
  expect(main().querySelector('.gcover.off')).toHaveTextContent(es['demo-off'])
  expect(main().querySelector('.gframe img')).not.toBeInTheDocument()
  expect(within(main()).queryByRole('list', { name: es['demo-controls'] })).not.toBeInTheDocument()
  expect(within(main()).queryByText(es['demo-fallback'])).not.toBeInTheDocument()
  await userEvent.click(within(main()).getByRole('button', { name: es['demo-video'] }))
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
})

it('points to the gameplay video as a fallback', async () => {
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: es['demo-video'] }))
  const [target] = window.HTMLElement.prototype.scrollIntoView.mock.contexts
  expect(within(target).getByRole('heading', { name: 'Gameplay' })).toBeInTheDocument()
})

it('stops the game when the visitor leaves the page', async () => {
  const quit = vi.fn(() => Promise.resolve())
  startGame.mockResolvedValue({ Quit: quit })
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  await within(main()).findByRole('button', { name: es['demo-close'] })
  await userEvent.click(screen.getByRole('link', { name: es['nav-contact'] }))
  await waitFor(() => expect(quit).toHaveBeenCalled())
})

it('closes the demo when the game quits from its own Exit button', async () => {
  const instance = { Quit: vi.fn(() => Promise.resolve()) }
  startGame.mockResolvedValue(instance)
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  await within(main()).findByRole('button', { name: es['demo-close'] })
  instance.onClosed()
  expect(await within(main()).findByRole('button', { name: new RegExp(es['demo-play']) })).toBeInTheDocument()
  expect(instance.Quit).not.toHaveBeenCalled()
})

it('shows a preview of the game behind the play button', async () => {
  await openAgami()
  expect(main().querySelector('.gframe img')).toHaveAttribute('src', '/media/agami/demo.jpg')
})

it('starts quiet and lets the visitor change the volume', async () => {
  const setVolume = vi.fn()
  startGame.mockResolvedValue({ Quit: vi.fn(() => Promise.resolve()), setVolume })
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  const slider = await within(main().querySelector('.game')).findByRole('slider', { name: new RegExp(es['vol']) })
  expect(slider).toHaveValue('25')
  expect(setVolume).toHaveBeenLastCalledWith(0.25)
  fireEvent.change(slider, { target: { value: '60' } })
  expect(setVolume).toHaveBeenLastCalledWith(0.6)
})

it('lists the controls of the game', async () => {
  await openAgami()
  expect(within(main()).getByRole('heading', { name: es['demo-controls'] })).toBeInTheDocument()
  const controls = within(main()).getByRole('list', { name: es['demo-controls'] })
  expect(within(controls).getAllByRole('listitem')).toHaveLength(6)
  expect(within(controls).getByText(/Slash/)).toBeInTheDocument()
})

it('mutes and restores the game from the control bar', async () => {
  const setVolume = vi.fn()
  startGame.mockResolvedValue({ Quit: vi.fn(() => Promise.resolve()), setVolume })
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  const bar = within(main().querySelector('.gbar'))
  await userEvent.click(await bar.findByRole('button', { name: new RegExp(es['mute']) }))
  expect(setVolume).toHaveBeenLastCalledWith(0)
  await userEvent.click(bar.getByRole('button', { name: new RegExp(es['mute']) }))
  expect(setVolume).toHaveBeenLastCalledWith(0.25)
})

it('keeps the site music off while the game runs, even after switching windows', async () => {
  const setVolume = vi.fn()
  startGame.mockResolvedValue({ Quit: vi.fn(() => Promise.resolve()), setVolume })
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  await within(main()).findByRole('button', { name: es['demo-close'] })
  window.HTMLMediaElement.prototype.play.mockClear()
  fireEvent.blur(window)
  expect(setVolume).toHaveBeenLastCalledWith(0)
  fireEvent.focus(window)
  expect(setVolume).toHaveBeenLastCalledWith(0.25)
  await new Promise((r) => setTimeout(r, 20))
  expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
})

it('does not bring the music back when a video stops under a running game', async () => {
  startGame.mockResolvedValue({ Quit: vi.fn(() => Promise.resolve()) })
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  await within(main()).findByRole('button', { name: es['demo-close'] })
  window.HTMLMediaElement.prototype.play.mockClear()
  fireEvent.pause(document.querySelector('video[data-media]'))
  await new Promise((r) => setTimeout(r, 20))
  expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
  await userEvent.click(within(main()).getByRole('button', { name: es['demo-close'] }))
  await waitFor(() => expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled())
})

it('carries the brand of the TV set', async () => {
  await openAgami()
  expect(main().querySelector('.tv .brand')).toHaveTextContent('Salonas-TV')
})

it('leaves full screen when the game quits by itself', async () => {
  const instance = { Quit: vi.fn(() => Promise.resolve()) }
  startGame.mockResolvedValue(instance)
  document.exitFullscreen = vi.fn(() => Promise.resolve())
  await openAgami()
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp(es['demo-play']) }))
  await within(main()).findByRole('button', { name: es['demo-close'] })
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => main().querySelector('canvas') })
  instance.onClosed()
  expect(document.exitFullscreen).toHaveBeenCalled()
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => null })
})

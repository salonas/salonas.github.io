import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import es from '../i18n/es'
import { renderAt } from '../test/render'

const main = () => screen.getByRole('main')

async function openAgamiWithMusic() {
  renderAt('/projects/agami')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  await screen.findByRole('button', { name: es['music-off'] })
}

const playTrack = () => userEvent.click(within(main()).getByRole('button', { name: `${es['play']}: Tema del menú` }))
const track = () => main().querySelector('audio[data-media]')

it('brings the music back when the track stops', async () => {
  await openAgamiWithMusic()
  await playTrack()
  expect(await screen.findByRole('button', { name: es['music-on'] })).toBeInTheDocument()
  fireEvent.pause(track())
  expect(await screen.findByRole('button', { name: es['music-off'] })).toBeInTheDocument()
})

it('does not bring back music the visitor had turned off', async () => {
  await openAgamiWithMusic()
  await userEvent.click(screen.getByRole('button', { name: es['music-off'] }))
  await playTrack()
  fireEvent.pause(track())
  expect(screen.getByRole('button', { name: es['music-on'] })).toBeInTheDocument()
})

it('pauses a playing track when the music is turned on', async () => {
  await openAgamiWithMusic()
  await playTrack()
  const audio = track()
  audio.pause = vi.fn()
  await userEvent.click(await screen.findByRole('button', { name: es['music-on'] }))
  expect(audio.pause).toHaveBeenCalled()
})

it('puts the video and its own controls in full screen together', async () => {
  await openAgamiWithMusic()
  const video = main().querySelector('video[data-media]')
  const frame = video.closest('.vplayer')
  frame.requestFullscreen = vi.fn(() => Promise.resolve())
  await userEvent.click(within(main()).getByRole('button', { name: new RegExp('^' + es['fs']) }))
  expect(frame.requestFullscreen).toHaveBeenCalled()
  expect(within(frame).getByRole('button', { name: `${es['play']}: Gameplay` })).toBeInTheDocument()
})

it('loops the tracks but not the video', async () => {
  await openAgamiWithMusic()
  for (const audio of main().querySelectorAll('audio[data-media]')) expect(audio.loop).toBe(true)
  expect(main().querySelector('video[data-media]').loop).toBe(false)
})

describe('on a touch screen', () => {
  const original = window.matchMedia
  beforeEach(() => {
    window.matchMedia = (query) => ({ matches: query.includes('pointer: coarse'), addEventListener() {}, removeEventListener() {} })
  })
  afterEach(() => {
    window.matchMedia = original
  })

  const player = () => main().querySelector('audio[data-media]').nextElementSibling

  it('keeps the volume slider behind the sound button, which mutes on the second tap', async () => {
    await openAgamiWithMusic()
    const bar = within(player())
    expect(bar.queryByRole('slider', { name: new RegExp('^' + es['vol']) })).toBeNull()
    expect(bar.getByRole('slider', { name: new RegExp('^' + es['seek']) })).toBeInTheDocument()

    await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['vol']) }))
    expect(bar.getByRole('slider', { name: new RegExp('^' + es['vol']) })).toBeInTheDocument()
    expect(bar.queryByRole('slider', { name: new RegExp('^' + es['seek']) })).toBeNull()
    expect(track().muted).toBe(false)

    await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['mute']) }))
    expect(track().muted).toBe(true)
  })

  it('goes back to the seek bar once muted, and the next tap brings the sound and its slider back', async () => {
    await openAgamiWithMusic()
    const bar = within(player())
    await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['vol']) }))
    await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['mute']) }))
    expect(bar.getByRole('slider', { name: new RegExp('^' + es['seek']) })).toBeInTheDocument()
    expect(bar.queryByRole('slider', { name: new RegExp('^' + es['vol']) })).toBeNull()

    await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['vol']) }))
    expect(track().muted).toBe(false)
    expect(bar.getByRole('slider', { name: new RegExp('^' + es['vol']) })).not.toHaveValue('0')
  })

  it('puts the seek bar back when the visitor taps elsewhere', async () => {
    await openAgamiWithMusic()
    const bar = within(player())
    await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['vol']) }))
    await userEvent.click(main().querySelector('h1,h2'))
    expect(bar.getByRole('slider', { name: new RegExp('^' + es['seek']) })).toBeInTheDocument()
  })
})

it('shows the volume slider next to the sound button when there is a mouse', async () => {
  await openAgamiWithMusic()
  const bar = within(main().querySelector('audio[data-media]').nextElementSibling)
  expect(bar.getByRole('slider', { name: new RegExp('^' + es['vol']) })).toBeInTheDocument()
  await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['mute']) }))
  expect(track().muted).toBe(true)
})

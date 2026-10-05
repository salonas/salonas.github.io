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

  const seekBar = (bar) => bar.queryByRole('slider', { name: new RegExp('^' + es['seek']) })
  const volumeBar = (bar) => bar.queryByRole('slider', { name: new RegExp('^' + es['vol']) })
  const sound = (bar, key) => bar.getByRole('button', { name: new RegExp('^' + es[key]) })

  it('opens the volume in its own box by the sound button and leaves the seek bar alone', async () => {
    await openAgamiWithMusic()
    const bar = within(player())
    expect(volumeBar(bar)).toBeNull()

    await userEvent.click(sound(bar, 'vol'))
    expect(volumeBar(bar).closest('.volpop')).not.toBeNull()
    expect(seekBar(bar)).toBeInTheDocument()
    expect(track().muted).toBe(false)
  })

  it('mutes on the next tap and brings the same volume back on the one after', async () => {
    await openAgamiWithMusic()
    const bar = within(player())
    await userEvent.click(sound(bar, 'vol'))
    fireEvent.change(volumeBar(bar), { target: { value: '40' } })

    await userEvent.click(sound(bar, 'mute'))
    expect(track().muted).toBe(true)
    expect(seekBar(bar)).toBeInTheDocument()

    await userEvent.click(sound(bar, 'mute'))
    expect(track().muted).toBe(false)
    expect(track().volume).toBeCloseTo(0.4)
    expect(volumeBar(bar)).toHaveValue('40')
  })

  it('closes the volume box when the visitor taps elsewhere', async () => {
    await openAgamiWithMusic()
    const bar = within(player())
    await userEvent.click(sound(bar, 'vol'))
    await userEvent.click(main().querySelector('h1,h2'))
    expect(volumeBar(bar)).toBeNull()
    expect(seekBar(bar)).toBeInTheDocument()
  })
})

it('shows the volume slider next to the sound button when there is a mouse', async () => {
  await openAgamiWithMusic()
  const bar = within(main().querySelector('audio[data-media]').nextElementSibling)
  expect(bar.getByRole('slider', { name: new RegExp('^' + es['vol']) })).toBeInTheDocument()
  await userEvent.click(bar.getByRole('button', { name: new RegExp('^' + es['mute']) }))
  expect(track().muted).toBe(true)
})

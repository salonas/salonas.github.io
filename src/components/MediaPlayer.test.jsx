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

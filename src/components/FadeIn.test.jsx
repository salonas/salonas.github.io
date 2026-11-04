import { fireEvent, render, screen, within } from '@testing-library/react'
import FadeIn from './FadeIn'
import { findProject } from '../projects'
import { renderAt } from '../test/render'

it('keeps an image hidden until it loads', () => {
  render(<FadeIn src="/a.png" alt="a" />)
  const img = screen.getByAltText('a')
  expect(img).toHaveClass('loading')
  fireEvent.load(img)
  expect(img).not.toHaveClass('loading')
})

it('shows an image that fails to load', () => {
  render(<FadeIn src="/missing.png" alt="a" />)
  fireEvent.error(screen.getByAltText('a'))
  expect(screen.getByAltText('a')).not.toHaveClass('loading')
})

it('keeps a video hidden until its first frame arrives', () => {
  const { container } = render(<FadeIn as="video" src="/a.mp4" muted />)
  const video = container.querySelector('video')
  expect(video).toHaveClass('loading')
  fireEvent.loadedData(video)
  expect(video).not.toHaveClass('loading')
})

it('hides the image again when its source changes', () => {
  const { rerender } = render(<FadeIn src="/a.png" alt="a" />)
  fireEvent.load(screen.getByAltText('a'))
  rerender(<FadeIn src="/b.png" alt="a" />)
  expect(screen.getByAltText('a')).toHaveClass('loading')
})

it('fades in the screens and the looping clips of a project', () => {
  renderAt('/projects/chord-analyzer')
  const main = screen.getByRole('main')
  const shot = findProject('chord-analyzer').sections[0].items[0]
  expect(within(main).getByAltText(shot.alt.es)).toHaveClass('loading')
  expect(main.querySelector('.film video')).toHaveClass('loading')
})

it('fades in the cat on home', () => {
  renderAt('/')
  expect(screen.getByAltText('Gato en pixel art dibujado por Salonas')).toHaveClass('px', 'loading')
})

it('fades in the doodles in the toolbox', () => {
  renderAt('/toolbox')
  const doodles = screen.getByRole('main').querySelectorAll('img.doodle')
  expect(doodles.length).toBeGreaterThan(0)
  for (const img of doodles) expect(img).toHaveClass('loading')
})

import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ImageViewer from './ImageViewer'
import { LanguageProvider } from '../i18n/LanguageProvider'
import es from '../i18n/es'

const three = [
  { src: '/a.jpg', alt: 'Primera' },
  { src: '/b.jpg', alt: 'Segunda' },
  { src: '/c.jpg', alt: 'Tercera', sketch: true },
]

function Harness({ images, onClose = () => {} }) {
  const [index, setIndex] = useState(0)
  return (
    <LanguageProvider initial="es">
      <ImageViewer images={images} index={index} onIndex={setIndex} onClose={onClose} />
    </LanguageProvider>
  )
}

it('steps through images and wraps around', async () => {
  render(<Harness images={three} />)
  expect(screen.getByText('1 / 3')).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Primera' })).toHaveAttribute('src', '/a.jpg')
  await userEvent.click(screen.getByRole('button', { name: es['next'] }))
  await userEvent.click(screen.getByRole('button', { name: es['next'] }))
  expect(screen.getByText('3 / 3')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: es['next'] }))
  expect(screen.getByText('1 / 3')).toBeInTheDocument()
  await userEvent.keyboard('{ArrowLeft}')
  expect(screen.getByText('3 / 3')).toBeInTheDocument()
  await userEvent.keyboard('{ArrowRight}')
  expect(screen.getByText('1 / 3')).toBeInTheDocument()
})

it('shows the caption of the current image', async () => {
  render(<Harness images={three} />)
  await userEvent.click(screen.getByRole('button', { name: es['next'] }))
  expect(screen.getByText('Segunda', { selector: 'p' })).toBeInTheDocument()
})

it('hides navigation for a single image', () => {
  render(<Harness images={three.slice(0, 1)} />)
  expect(screen.queryByRole('button', { name: es['next'] })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: es['prev'] })).not.toBeInTheDocument()
  expect(screen.queryByText('1 / 1')).not.toBeInTheDocument()
})

it('closes on Escape and on the close button', async () => {
  const onClose = vi.fn()
  render(<Harness images={three} onClose={onClose} />)
  await userEvent.keyboard('{Escape}')
  await userEvent.click(screen.getByRole('button', { name: es['m-sent-close'] }))
  expect(onClose).toHaveBeenCalledTimes(2)
})

it('covers the whole page, outside any scrolling container', () => {
  render(
    <div id="host">
      <Harness images={three} />
    </div>,
  )
  expect(screen.getByRole('dialog').parentElement.parentElement).toBe(document.body)
})

const zoomIn = () => screen.getByRole('button', { name: es['zoom-in'] })
const zoomOut = () => screen.getByRole('button', { name: es['zoom-out'] })

it('starts fitted to the screen and cannot zoom out further', () => {
  render(<Harness images={three} />)
  expect(screen.getByText('100%')).toBeInTheDocument()
  expect(zoomOut()).toBeDisabled()
})

it('zooms in and out in steps, up to 400%', async () => {
  render(<Harness images={three} />)
  await userEvent.click(zoomIn())
  expect(screen.getByText('150%')).toBeInTheDocument()
  await userEvent.click(zoomIn())
  await userEvent.click(zoomIn())
  await userEvent.click(zoomIn())
  expect(screen.getByText('400%')).toBeInTheDocument()
  expect(zoomIn()).toBeDisabled()
  await userEvent.click(zoomOut())
  expect(screen.getByText('300%')).toBeInTheDocument()
})

it('toggles the zoom by clicking the image, without changing image', async () => {
  render(<Harness images={three} />)
  await userEvent.click(screen.getByRole('img', { name: 'Primera' }))
  expect(screen.getByText('200%')).toBeInTheDocument()
  expect(screen.getByText('1 / 3')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('img', { name: 'Primera' }))
  expect(screen.getByText('100%')).toBeInTheDocument()
})

it('zooms with the keyboard', async () => {
  render(<Harness images={three} />)
  await userEvent.keyboard('+')
  expect(screen.getByText('150%')).toBeInTheDocument()
  await userEvent.keyboard('-')
  expect(screen.getByText('100%')).toBeInTheDocument()
})

it('goes back to fitted when the image changes', async () => {
  render(<Harness images={three} />)
  await userEvent.click(zoomIn())
  await userEvent.click(screen.getByRole('button', { name: es['next'] }))
  expect(screen.getByText('100%')).toBeInTheDocument()
})

it('holds the page still behind it and lets it go on closing', () => {
  const { unmount } = render(<Harness images={three} />)
  expect(document.documentElement.style.overflow).toBe('hidden')
  unmount()
  expect(document.documentElement.style.overflow).toBe('')
})

it('gives the stepping and closing buttons a drawn icon next to the word, for narrow screens', () => {
  render(<Harness images={three} />)
  for (const key of ['prev', 'next', 'm-sent-close']) {
    const button = screen.getByRole('button', { name: es[key] })
    expect(button.querySelector('svg')).not.toBeNull()
    expect(button.querySelector('.word')).toHaveTextContent(es[key])
  }
})

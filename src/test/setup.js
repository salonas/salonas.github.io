import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom has no media playback: every test starts from a fresh, permissive element.
beforeEach(() => {
  window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
  window.HTMLMediaElement.prototype.pause = vi.fn()
  window.HTMLMediaElement.prototype.load = vi.fn()
  window.scrollTo = vi.fn()
})

afterEach(() => {
  cleanup()
  window.history.pushState({}, '', '/')
})

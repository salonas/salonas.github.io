import es from './es'
import en from './en'
import { detectLanguage } from './detectLanguage'

it('opens in Spanish only for Spanish browsers', () => {
  expect(detectLanguage(['es-CL', 'en'])).toBe('es')
  expect(detectLanguage(['en-US'])).toBe('en')
  expect(detectLanguage(['pt-BR'])).toBe('en')
  expect(detectLanguage(undefined)).toBe('en')
  expect(detectLanguage([])).toBe('en')
})

it('has the same keys in both languages', () => {
  expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort())
})

it('keeps the original music strings', () => {
  expect(es['music-on']).toBe('¿Música de fondo? Eww')
  expect(en['music-off']).toBe('Nah, F##k it turn it off!')
})

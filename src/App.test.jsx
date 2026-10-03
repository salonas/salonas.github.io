import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the site navigation', () => {
  render(<App />)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})

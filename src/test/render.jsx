import { render } from '@testing-library/react'
import App from '../App'

export function renderAt(path, lang = 'es') {
  window.history.pushState({}, '', path)
  return render(<App lang={lang} />)
}

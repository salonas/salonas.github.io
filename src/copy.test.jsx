import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import es from './i18n/es'
import en from './i18n/en'
import { projects } from './projects'
import { renderAt } from './test/render'

const SYMBOLS = /[←→↑↓…;—–]/
const pages = ['/', '/toolbox', '/projects', '/contact', '/nope', ...projects.map((p) => '/projects/' + p.slug)]

it.each(pages.flatMap((p) => [[p, 'es'], [p, 'en']]))('%s in %s has no arrows, semicolons or long dashes', (path, lang) => {
  renderAt(path, lang)
  expect(document.body.textContent).not.toMatch(SYMBOLS)
})

it('has none in the image viewer either', async () => {
  renderAt('/projects/sailing')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  await userEvent.click(within(screen.getByRole('main')).getAllByRole('button', { name: new RegExp('^' + es['zoom']) })[0])
  expect(screen.getByRole('dialog').textContent).not.toMatch(SYMBOLS)
})

it('has none in any translation', () => {
  for (const text of [...Object.values(es), ...Object.values(en)]) expect(text).not.toMatch(SYMBOLS)
})

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import emailjs from '@emailjs/browser'
import es from '../i18n/es'
import { renderAt } from '../test/render'

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }))

const main = () => screen.getByRole('main')

async function openContact() {
  renderAt('/contact')
  await userEvent.click(await screen.findByRole('button', { name: es['m-music-close'] }))
}

async function fillAndSubmit() {
  await userEvent.type(screen.getByLabelText(es['f-name']), 'Ana')
  await userEvent.type(screen.getByLabelText(es['f-mail']), 'ana@example.com')
  await userEvent.type(screen.getByLabelText(es['f-msg']), 'Hola Salonas')
  await userEvent.click(screen.getByRole('button', { name: es['f-send'] }))
}

beforeEach(() => {
  emailjs.send.mockReset()
  vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public-key')
  vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service-id')
  vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template-id')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

it('sends the three fields and shows the sent modal', async () => {
  emailjs.send.mockResolvedValue({ status: 200 })
  await openContact()
  await fillAndSubmit()
  expect(emailjs.send).toHaveBeenCalledWith(
    'service-id',
    'template-id',
    { from_name: 'Ana', from_email: 'ana@example.com', message: 'Hola Salonas' },
    'public-key',
  )
  expect(await screen.findByRole('dialog')).toHaveTextContent(es['m-sent-title'])
})

it('shows the sent modal over the whole page, not inside the form', async () => {
  emailjs.send.mockResolvedValue({ status: 200 })
  await openContact()
  await fillAndSubmit()
  const overlay = (await screen.findByRole('dialog')).parentElement
  expect(overlay.parentElement).toBe(document.body)
})

it('clears the form after a successful send', async () => {
  emailjs.send.mockResolvedValue({ status: 200 })
  await openContact()
  await fillAndSubmit()
  await userEvent.click(await screen.findByRole('button', { name: es['m-sent-close'] }))
  expect(screen.getByLabelText(es['f-msg'])).toHaveValue('')
})

it('shows an inline error and keeps the text when the send fails', async () => {
  emailjs.send.mockRejectedValue(new Error('network'))
  await openContact()
  await fillAndSubmit()
  expect(await screen.findByRole('alert')).toHaveTextContent(es['f-error'])
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(screen.getByLabelText(es['f-msg'])).toHaveValue('Hola Salonas')
})

it('shows the inline error when EmailJS is not configured', async () => {
  vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '')
  await openContact()
  await fillAndSubmit()
  expect(await screen.findByRole('alert')).toHaveTextContent(es['f-error'])
  expect(emailjs.send).not.toHaveBeenCalled()
})

it('does not send an empty form', async () => {
  await openContact()
  await userEvent.click(screen.getByRole('button', { name: es['f-send'] }))
  expect(emailjs.send).not.toHaveBeenCalled()
})

it('does not send an invalid email address', async () => {
  await openContact()
  await userEvent.type(screen.getByLabelText(es['f-name']), 'Ana')
  await userEvent.type(screen.getByLabelText(es['f-mail']), 'not-an-email')
  await userEvent.type(screen.getByLabelText(es['f-msg']), 'Hola')
  await userEvent.click(screen.getByRole('button', { name: es['f-send'] }))
  expect(emailjs.send).not.toHaveBeenCalled()
})

it('lists mail, GitHub, LinkedIn and Discord, and no Instagram', async () => {
  await openContact()
  const hrefs = within(main())
    .getAllByRole('link')
    .map((a) => a.getAttribute('href'))
  expect(hrefs).toContain('https://github.com/salonas')
  expect(hrefs).toContain('https://discord.com/users/327949034755063808')
  expect(hrefs.some((h) => h.includes('linkedin.com/in/'))).toBe(true)
  expect(hrefs.some((h) => h.includes('instagram'))).toBe(false)
  expect(within(main()).getByText('jsalonas2003@gmail.com')).toBeInTheDocument()
})

it('copies the email address', async () => {
  const user = userEvent.setup()
  renderAt('/contact')
  await user.click(await screen.findByRole('button', { name: es['m-music-close'] }))
  await user.click(within(main()).getAllByRole('button', { name: es['copy'] })[0])
  expect(await navigator.clipboard.readText()).toBe('jsalonas2003@gmail.com')
  expect(within(main()).getByRole('button', { name: es['copied'] })).toBeInTheDocument()
})

it('points out the empty fields in its own words instead of sending', async () => {
  await openContact()
  await userEvent.click(screen.getByRole('button', { name: es['f-send'] }))
  expect(within(main()).getAllByText(es['f-required'])).toHaveLength(3)
  expect(screen.getByLabelText(es['f-name'])).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByLabelText(es['f-name'])).toHaveFocus()
  expect(screen.getByRole('form', { name: es['form-title'] })).toHaveAttribute('novalidate')
  expect(emailjs.send).not.toHaveBeenCalled()
})

it('asks for a valid email address', async () => {
  await openContact()
  await userEvent.type(screen.getByLabelText(es['f-name']), 'Ana')
  await userEvent.type(screen.getByLabelText(es['f-mail']), 'ana@')
  await userEvent.type(screen.getByLabelText(es['f-msg']), 'Hola')
  await userEvent.click(screen.getByRole('button', { name: es['f-send'] }))
  expect(within(main()).getByText(es['f-bad-mail'])).toBeInTheDocument()
  expect(emailjs.send).not.toHaveBeenCalled()
})

it('drops a field warning once the visitor types in it', async () => {
  await openContact()
  await userEvent.click(screen.getByRole('button', { name: es['f-send'] }))
  await userEvent.type(screen.getByLabelText(es['f-name']), 'A')
  expect(within(main()).getAllByText(es['f-required'])).toHaveLength(2)
})

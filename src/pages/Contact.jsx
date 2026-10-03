import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import { outside } from '../components/outside'
import Paper from '../components/Paper'
import { useLanguage } from '../i18n/LanguageProvider'

const EMAIL = 'jsalonas2003@gmail.com'
const DISCORD_NAME = 'salonas'
// Discord has no message link by username; the profile link needs the numeric user id.
const DISCORD_USER_ID = '327949034755063808'
const EMPTY = { name: '', email: '', message: '' }

function CopyButton({ text }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard refused: the text is on screen and can be selected by hand.
    }
  }

  return (
    <button type="button" className="copy" onClick={copy}>
      {t(copied ? 'copied' : 'copy')}
    </button>
  )
}

function ContactForm() {
  const { t } = useLanguage()
  const [fields, setFields] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const change = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const { VITE_EMAILJS_PUBLIC_KEY: key, VITE_EMAILJS_SERVICE_ID: service, VITE_EMAILJS_TEMPLATE_ID: template } = import.meta.env
    if (!key || !service || !template) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(service, template, { from_name: fields.name, from_email: fields.email, message: fields.message }, key)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const closeSent = () => {
    setFields(EMPTY)
    setStatus('idle')
  }

  return (
    <Paper as="form" style={{ flex: '1 1 340px' }} onSubmit={submit}>
      <h3>{t('form-title')}</h3>
      <label htmlFor="f-name">{t('f-name')}</label>
      <input id="f-name" name="name" type="text" autoComplete="name" required value={fields.name} onChange={change} />
      <label htmlFor="f-mail">{t('f-mail')}</label>
      <input id="f-mail" name="email" type="email" autoComplete="email" required value={fields.email} onChange={change} />
      <label htmlFor="f-msg">{t('f-msg')}</label>
      <textarea id="f-msg" name="message" rows="5" required value={fields.message} onChange={change} />
      <button type="submit" className="btn dark" style={{ alignSelf: 'flex-start' }} disabled={status === 'sending'}>
        {t(status === 'sending' ? 'f-sending' : 'f-send')}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {t('f-error')}
        </p>
      )}
      {status === 'sent' && (
        <Modal title={t('m-sent-title')} message={t('m-sent-msg')} closeLabel={t('m-sent-close')} onClose={closeSent} />
      )}
    </Paper>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  return (
    <section className="page">
      <div className="stack">
        <h2 className="label">{t('contact-title')}</h2>
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div className="stack" style={{ flex: '1 1 340px' }}>
            <Paper tilt="l" className="contact">
              <Icon name="mail" />
              <span className="who">
                <span>{t('c-mail')}</span>
                <small>{EMAIL}</small>
              </span>
              <CopyButton text={EMAIL} />
            </Paper>
            <Paper as="a" tilt="r" className="contact" href="https://github.com/salonas" {...outside}>
              <Icon name="github" />
              <span className="who">
                <span>GitHub</span>
                <small>salonas</small>
              </span>
            </Paper>
            <Paper as="a" tilt="l" className="contact" href="https://www.linkedin.com/in/joaqu%C3%ADn-salinas-enr%C3%ADquez-590637300/" {...outside}>
              <Icon name="linkedin" />
              <span className="who">
                <span>LinkedIn</span>
                <small>Joaquín Salinas</small>
              </span>
            </Paper>
            <Paper tilt="r" className="contact">
              <Icon name="discord" />
              <span className="who">
                <span>Discord</span>
                <small>{DISCORD_NAME}</small>
                <a href={`https://discord.com/users/${DISCORD_USER_ID}`} {...outside}>{t('discord-open')}</a>
              </span>
              <CopyButton text={DISCORD_NAME} />
            </Paper>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

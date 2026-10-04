import { Fragment, useState } from 'react'
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

const FIELDS = [
  { id: 'f-name', name: 'name', label: 'f-name', type: 'text', autoComplete: 'name' },
  { id: 'f-mail', name: 'email', label: 'f-mail', type: 'email', autoComplete: 'email' },
  { id: 'f-msg', name: 'message', label: 'f-msg', rows: 5 },
]

function ContactForm() {
  const { t } = useLanguage()
  const [fields, setFields] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const [problems, setProblems] = useState({})

  const change = (e) => {
    const { name, value } = e.target
    setFields((f) => ({ ...f, [name]: value }))
    setProblems((p) => ({ ...p, [name]: undefined }))
  }

  const check = () => {
    const found = {}
    for (const name of Object.keys(EMPTY)) if (!fields[name].trim()) found[name] = 'f-required'
    if (!found.email && !/^\S+@\S+\.\S+$/.test(fields.email.trim())) found.email = 'f-bad-mail'
    return found
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = check()
    setProblems(found)
    const first = Object.keys(EMPTY).find((name) => found[name])
    if (first) {
      e.currentTarget.elements[first].focus()
      return
    }
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
    <Paper as="form" style={{ flex: '1 1 340px' }} noValidate aria-labelledby="form-title" onSubmit={submit}>
      <h3 id="form-title">{t('form-title')}</h3>
      {FIELDS.map(({ id, name, label, ...input }) => {
        const Tag = name === 'message' ? 'textarea' : 'input'
        const problem = problems[name]
        return (
          <Fragment key={name}>
            <label htmlFor={id}>{t(label)}</label>
            <Tag
              id={id}
              name={name}
              required
              aria-invalid={problem ? 'true' : undefined}
              aria-describedby={problem ? `${id}-problem` : undefined}
              value={fields[name]}
              onChange={change}
              {...input}
            />
            {problem && (
              <p className="field-problem" id={`${id}-problem`}>
                {t(problem)}
              </p>
            )}
          </Fragment>
        )
      })}
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

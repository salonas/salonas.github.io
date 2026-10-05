import { useLanguage } from '../i18n/LanguageProvider'

const BUBBLE = ['404', 'Page not found?']

export default function Footer() {
  const { t } = useLanguage()

  return (
    <>
      <footer className="foot">
        <div className="foot-art" aria-hidden="true">
          {/* Drops the soft edge of the lettering so it sits with the hard pixels of the drawing. */}
          <svg width="0" height="0">
            <filter id="hard-edge">
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 1" />
              </feComponentTransfer>
            </filter>
          </svg>
          <span className="bubble">
            <b>{BUBBLE[0]}</b>
            <small>{BUBBLE[1]}</small>
          </span>
        </div>
        <h2>{t('foot-title')}</h2>
        <p>{t('foot-desc')}</p>
        <button type="button" className="btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {t('foot-top')}
        </button>
      </footer>
      <div className="copyright">{t('copyright')}</div>
    </>
  )
}

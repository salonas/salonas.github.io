import { useLanguage } from '../i18n/LanguageProvider'

const BUBBLE = '404?'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <>
      <footer className="foot">
        <div className="foot-art" aria-hidden="true">
          <span className="bubble">{BUBBLE}</span>
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

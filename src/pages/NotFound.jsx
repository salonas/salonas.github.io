import { Link } from 'react-router-dom'
import Paper from '../components/Paper'
import { useLanguage } from '../i18n/LanguageProvider'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <section className="page">
      <Paper>
        <h2>{t('nf-title')}</h2>
        <Link className="btn" to="/" style={{ alignSelf: 'flex-start' }}>
          {t('nf-back')}
        </Link>
      </Paper>
    </section>
  )
}

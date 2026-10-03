import { NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageProvider'

function titleKey(pathname) {
  if (pathname.startsWith('/toolbox')) return 'title-tools'
  if (pathname.startsWith('/projects')) return 'title-projects'
  if (pathname.startsWith('/contact')) return 'title-contact'
  return 'title-home'
}

export default function Header() {
  const { t } = useLanguage()
  const { pathname } = useLocation()

  return (
    <header className="banner">
      <h1 className="plaque">{t(titleKey(pathname))}</h1>
      <nav className="nav" aria-label={t('nav-label')}>
        <NavLink className="btn" to="/" end>
          {t('nav-home')}
        </NavLink>
        <NavLink className="btn" to="/toolbox">
          {t('nav-tools')}
        </NavLink>
        <NavLink className="btn" to="/projects">
          {t('nav-projects')}
        </NavLink>
        <NavLink className="btn" to="/contact">
          {t('nav-contact')}
        </NavLink>
      </nav>
    </header>
  )
}

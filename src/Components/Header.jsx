import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Media from './Media'
import { useLanguage } from './Lang'

function Header() {
  const { t } = useLanguage()
  const location = useLocation();

  // Determinar el título según la ruta
  let headerTitleKey = 'header-title-index';
  if (location.pathname === '/Skills') headerTitleKey = 'header-title-skills';
  else if (location.pathname === '/Projects') headerTitleKey = 'header-title-projects';
  else if (location.pathname === '/Contact') headerTitleKey = 'header-title-contact';

  return (
    <div>
    <header className="pixel-header"
        style={{background: `url(${Media.gayHeader}) center 65%/cover no-repeat, #a8987b`}}>
        <div className="header-content">
            <h1 className="header-title" id="header-title-index">{t(headerTitleKey)}</h1>
            <div className="nav-btns">
                <Link className="nav-btn" id="nav-home" to="/">{t('nav-home')}</Link>
                <Link className="nav-btn" id="nav-skills" to="/Skills">{t('nav-skills')}</Link>
                <Link className="nav-btn" id="nav-projects" to="/Projects">{t('nav-projects')}</Link>
                <Link className="nav-btn" id="nav-contact" to="/Contact">{t('nav-contact')}</Link>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Header

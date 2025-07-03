import React from 'react'
import { useLanguage } from '../Lang'

function ToggleLang() {
  const { currentLang, toggleLanguage } = useLanguage()

  const handleToggle = (e) => {
    toggleLanguage()
    // Quitar el focus del botón después de hacer click
    e.target.blur()
  }

  return (
    <button 
      className="sidebar-text-btn" 
      onClick={handleToggle}
      title={`Cambiar a ${currentLang === 'es' ? 'English' : 'Español'}`}
    >
      {currentLang === 'es' ? 'English' : 'Español'}
    </button>
  )
}

export default ToggleLang

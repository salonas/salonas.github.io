import React, { useState, useEffect } from 'react'
import ToggleLang from './ToggleLang'
import ToggleMusic from './ToggleMusic'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      // Considerar móvil/tablet si alguna dimensión es <= 1024px (vertical u horizontal)
      setIsMobile(width <= 1024 || height <= 820)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Permitir touch y click para máxima compatibilidad
  const handleSidebarToggle = (e) => {
    if (isMobile) {
      // Solo evitar el toggle si es un botón de texto
      const isTextButton = e.target.closest('button') && 
        (e.target.closest('.sidebar-text-btn') || e.target.closest('.sidebar-text-btn2'))
      if (!isTextButton) {
        setIsOpen(prevState => !prevState)
      }
    }
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <div 
        id="sidebar-toggles" 
        className={isMobile && isOpen ? 'mobile-open' : ''}
        onClick={handleSidebarToggle}
        style={isMobile ? { 
          cursor: 'pointer', 
          touchAction: 'manipulation',
          userSelect: 'none'
        } : {}}
      >
        <div id="sidebar-text-toggles" onClick={handleButtonClick}>
          <ToggleLang />
        </div>
        <div id="sidebar-text-toggles2" onClick={handleButtonClick}>
          <ToggleMusic />
        </div>
      </div>
    </>
  )
}

export default Sidebar

import React, { useEffect, useRef, useState, useCallback } from 'react'
import ToggleLang from './ToggleLang'
import ToggleMusic from './ToggleMusic'

function Sidebar() {
  const containerRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // Detect touch/coarse pointer devices (phones/tablets)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(hover: none) and (pointer: coarse)')
    const update = (e) => setIsTouch(e.matches)
    setIsTouch(mql.matches)
    if (mql.addEventListener) mql.addEventListener('change', update)
    else if (mql.addListener) mql.addListener(update)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', update)
      else if (mql.removeListener) mql.removeListener(update)
    }
  }, [])
  
  // Close when clicking outside or pressing Escape (touch mode only)
  useEffect(() => {
    if (!isTouch || !isOpen) return
    const onDocClick = (e) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === containerRef.current) {
        e.preventDefault()
        setIsOpen((v) => !v)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [isTouch, isOpen])
  
  // Toggle sidebar on container click (touch mode only) - VERSIÓN 1
  const onContainerClick = useCallback((e) => {
    // IMPORTANTE: Solo permitir click en dispositivos táctiles
    if (!isTouch) return
    
    // Verificar si el clic fue directamente en el contenedor (imagen de fondo)
    // y NO en los divs de texto (toggles)
    const clickedElement = e.target
    const isTextToggleArea = clickedElement.closest('#sidebar-text-toggles, #sidebar-text-toggles2')
    
    // Solo hacer toggle si NO se clickeó en las áreas de texto/botones
    if (!isTextToggleArea) {
      setIsOpen((v) => !v)
    }
  }, [isTouch])
  
  // Stop propagation inside text areas so inner buttons don't close the sidebar on tap
  const stopPropagation = (e) => {
    if (isTouch) e.stopPropagation()
  }
  
  return (
    <>
      <div
        id="sidebar-toggles"
        ref={containerRef}
        className={`${!isTouch ? 'hover' : ''} ${isTouch && isOpen ? 'open' : ''}`}
        onClick={isTouch ? onContainerClick : undefined}
        role={isTouch ? "button" : undefined}
        tabIndex={isTouch ? 0 : undefined}
        aria-label={isTouch ? "Sidebar con controles de idioma y música" : undefined}
      >
        <div id="sidebar-text-toggles" onClick={isTouch ? stopPropagation : undefined}>
          <ToggleLang />
        </div>
        <div id="sidebar-text-toggles2" onClick={isTouch ? stopPropagation : undefined}>
          <ToggleMusic />
        </div>
      </div>
    </>
  )
}

export default Sidebar
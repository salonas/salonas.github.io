import React, { useState, useEffect } from 'react'
import ToggleLang from './ToggleLang'
import ToggleMusic from './ToggleMusic'

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  // Cargar estado del localStorage al montar
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState === 'true') {
      setCollapsed(true)
    }
  }, [])

  const toggleCollapse = (e) => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', newState.toString())
    e.target.blur()
  }

  return (
    <>
      {/* Imagen de fondo de la sidebar y controles */}
      <div id="sidebar-toggles" className={collapsed ? 'collapsed' : ''}>
        {/* Botón de colapso */}
        <button 
          className="toggle-collapse-btn" 
          onClick={toggleCollapse}
          title={collapsed ? 'Mostrar sidebar' : 'Ocultar sidebar'}
        >
          <span className="pixel-ring"></span>
          <span className="pixel-collapse">{collapsed ? '>' : '<'}</span>
        </button>
        {/* Controles de idioma */}
        <div id="sidebar-text-toggles" className={collapsed ? 'collapsed' : ''}>
          <ToggleLang />
        </div>
        {/* Controles de música */}
        <div id="sidebar-text-toggles2" className={collapsed ? 'collapsed' : ''}>
          <ToggleMusic collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>
    </>
  )
}

export default Sidebar

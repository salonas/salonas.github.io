import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../Lang'

function ToggleMusic({ collapsed, setCollapsed }) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Inicializar el audio cuando el componente se monta
    if (audioRef.current) {
      audioRef.current.volume = 0.04 // Volumen bajo como en el original
      audioRef.current.loop = true
    }
  }, [])

  const toggleMusic = (e) => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.log('Error al reproducir música:', error)
        })
      }
      setIsPlaying(!isPlaying)
    }

    // Colapsar la sidebar al hacer click (como en el original)
    if (setCollapsed) {
      setCollapsed(true)
      localStorage.setItem('sidebarCollapsed', true)
    }

    // Quitar el focus del botón después de hacer click
    e.target.blur()
  }

  // Texto dinámico basado en si está reproduciéndose o no
  const getButtonText = () => {
    if (isPlaying) {
      return t('music-stop-btn')
    } else {
      return t('music-toggle-btn')
    }
  }

  return (
    <div>
      <button 
        className="sidebar-text-btn2" 
        onClick={toggleMusic}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {getButtonText()}
      </button>
      
      {/* Audio element */}
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src="/Assets/music/meh.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  )
}

export default ToggleMusic

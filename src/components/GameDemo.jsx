import { useEffect, useRef, useState } from 'react'
import { startGame } from '../game/unity'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from '../music/MusicProvider'

const hasMouse = () => window.matchMedia?.('(pointer: fine)').matches ?? true

export default function GameDemo({ build, size, label, videoId }) {
  const { t } = useLanguage()
  const { pauseForMedia, resumeAfterMedia } = useMusic()
  const canvasRef = useRef(null)
  const game = useRef(null)
  const alive = useRef(true)
  const [status, setStatus] = useState('idle') // idle | loading | running | error
  const [progress, setProgress] = useState(0)

  const stop = () => {
    game.current?.Quit().catch(() => {})
    game.current = null
  }

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
      stop()
    }
  }, [])

  // Leaving the page mid-game counts as closing it.
  useEffect(() => resumeAfterMedia, [resumeAfterMedia])

  const play = async () => {
    document.querySelectorAll('[data-media]').forEach((m) => m.pause())
    pauseForMedia()
    setProgress(0)
    setStatus('loading')
    try {
      const instance = await startGame(build, canvasRef.current, (p) => alive.current && setProgress(p))
      game.current = instance
      if (!alive.current) return stop()
      // The game's own Exit button shuts the player down and reports it here.
      if (instance.Module) instance.Module.onQuit = () => game.current === instance && closed()
      setStatus('running')
    } catch {
      if (!alive.current) return
      setStatus('error')
      resumeAfterMedia()
    }
  }

  const closed = () => {
    game.current = null
    if (!alive.current) return
    setStatus('idle')
    resumeAfterMedia()
  }

  const close = () => {
    stop()
    closed()
  }

  const watchVideo = () => document.getElementById(videoId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const open = status === 'loading' || status === 'running'

  return (
    <div className="game">
      <div className="gframe" hidden={!open}>
        <canvas ref={canvasRef} id={`game-${build}`} tabIndex={-1} aria-label={label} />
        {status === 'loading' && (
          <p className="gload" role="status">
            {t('demo-loading')} {Math.round(progress * 100)}%
          </p>
        )}
      </div>
      {status === 'running' && (
        <div className="gbar">
          <button type="button" className="btn" onClick={() => game.current?.SetFullscreen(1)}>
            {t('fs')}
          </button>
          <button type="button" className="btn dark" onClick={close}>
            {t('demo-close')}
          </button>
        </div>
      )}
      {!open &&
        (hasMouse() ? (
          <button type="button" className="btn dark" style={{ alignSelf: 'flex-start' }} onClick={play}>
            {t('demo-play')} ({size})
          </button>
        ) : (
          <p>{t('demo-desktop')}</p>
        ))}
      {status === 'error' && (
        <p className="form-error" role="alert">
          {t('demo-error')}
        </p>
      )}
      {videoId && (
        <p className="gnote">
          {t('demo-fallback')}{' '}
          <button type="button" className="copy" onClick={watchVideo}>
            {t('demo-video')}
          </button>
        </p>
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { startGame } from '../game/unity'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from '../music/MusicProvider'

const START_VOLUME = 25
const MOUSE_LABELS = { left: 'mouse-left', right: 'mouse-right', move: 'mouse-move' }

const hasMouse = () => window.matchMedia?.('(pointer: fine)').matches ?? true

function MouseIcon({ button, label }) {
  return (
    <svg className="mouse" viewBox="0 0 11 15" shapeRendering="crispEdges" role="img" aria-label={label}>
      <path d="M2 0h7v1h1v1h1v10h-1v1h-1v1H2v-1H1v-1H0V2h1V1h1z" />
      <path className="shell" d="M2 1h7v1h1v10h-1v1H2v-1H1V2h1z" />
      {button === 'left' && <path className="held" d="M1 2h4v4H1z" />}
      {button === 'right' && <path className="held" d="M6 2h4v4H6z" />}
      <path d="M1 6h9v1H1zM5 1h1v5H5z" />
    </svg>
  )
}

function Controls({ controls }) {
  const { t, L } = useLanguage()
  return (
    <ul className="controls" aria-label={t('demo-controls')}>
      {controls.map((control, i) => (
        <li key={i}>
          <span className="keys">
            {control.mouse && <MouseIcon button={control.mouse} label={t(MOUSE_LABELS[control.mouse])} />}
            {control.keys?.map((key) => (
              <kbd key={L(key)}>{L(key)}</kbd>
            ))}
          </span>
          {L(control.text)}
        </li>
      ))}
    </ul>
  )
}

export default function GameDemo({ build, size, label, poster, controls, videoId }) {
  const { t } = useLanguage()
  const { pauseForMedia, resumeAfterMedia } = useMusic()
  const canvasRef = useRef(null)
  const game = useRef(null)
  const alive = useRef(true)
  const [status, setStatus] = useState('idle') // idle | loading | running | error
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(START_VOLUME)

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

  useEffect(() => {
    if (status === 'running') game.current?.setVolume?.(volume / 100)
  }, [status, volume])

  const closed = () => {
    game.current = null
    if (!alive.current) return
    setStatus('idle')
    resumeAfterMedia()
  }

  const play = async () => {
    document.querySelectorAll('[data-media]').forEach((m) => m.pause())
    pauseForMedia()
    setProgress(0)
    setStatus('loading')
    try {
      const instance = await startGame(build, canvasRef.current, (p) => alive.current && setProgress(p), volume / 100)
      game.current = instance
      if (!alive.current) return stop()
      // The game's own Exit button shuts the player down, and the page follows.
      instance.onClosed = () => game.current === instance && closed()
      setStatus('running')
    } catch {
      if (!alive.current) return
      setStatus('error')
      resumeAfterMedia()
    }
  }

  const close = () => {
    stop()
    closed()
  }

  const watchVideo = () => document.getElementById(videoId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const open = status === 'loading' || status === 'running'

  return (
    <div className="game">
      <div className="gframe">
        <canvas ref={canvasRef} id={`game-${build}`} tabIndex={-1} aria-label={label} />
        {!open && (
          <div className="gcover">
            {poster && <img src={poster} alt="" />}
            {hasMouse() ? (
              <button type="button" className="btn dark" onClick={play}>
                {t('demo-play')} ({size})
              </button>
            ) : (
              <p>{t('demo-desktop')}</p>
            )}
          </div>
        )}
        {status === 'loading' && (
          <p className="gload" role="status">
            {t('demo-loading')} {Math.round(progress * 100)}%
          </p>
        )}
      </div>
      {status === 'running' && (
        <div className="player gbar">
          <span>{t('vol')}</span>
          <input
            className="vol"
            type="range"
            min="0"
            max="100"
            value={volume}
            style={{ '--p': `${volume}%` }}
            aria-label={`${t('vol')}: ${label}`}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <button type="button" className="btn" onClick={() => game.current?.SetFullscreen(1)}>
            {t('fs')}
          </button>
          <button type="button" className="btn dark" onClick={close}>
            {t('demo-close')}
          </button>
        </div>
      )}
      {status === 'error' && (
        <p className="form-error" role="alert">
          {t('demo-error')}
        </p>
      )}
      {controls && <Controls controls={controls} />}
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

import { useEffect, useRef, useState } from 'react'
import { startGame } from '../game/unity'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from '../music/MusicProvider'
import { PixelIcon } from './MediaPlayer'

const START_VOLUME = 25
const MOUSE_LABELS = { left: 'mouse-left', right: 'mouse-right', move: 'mouse-move' }

const hasMouse = () => window.matchMedia?.('(pointer: fine)').matches ?? true

function MouseIcon({ button, label }) {
  return (
    <svg className="mouse" viewBox="0 0 9 12" shapeRendering="crispEdges" role="img" aria-label={label}>
      <path d="M2 0h5v1h1v1h1v8H8v1H7v1H2v-1H1v-1H0V2h1V1h1z" />
      <path className="shell" d="M2 1h5v1h1v8H7v1H2v-1H1V2h1z" />
      {button === 'left' && <path d="M2 1h2v1H2zM1 2h3v3H1z" />}
      {button === 'right' && <path d="M5 1h2v1H5zM5 2h3v3H5z" />}
      <path d="M1 5h7v1H1zM4 1h1v4H4z" />
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
  const [muted, setMuted] = useState(false)
  const silent = muted || volume === 0
  const level = silent ? 0 : volume / 100

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
    if (status === 'running') game.current?.setVolume?.(level)
  }, [status, level])

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
      const instance = await startGame(build, canvasRef.current, (p) => alive.current && setProgress(p), level)
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
          <button type="button" className="pbtn" aria-label={t('demo-close')} onClick={close}>
            <PixelIcon name="close" />
          </button>
          <span className="gap" />
          <button type="button" className="pbtn" aria-label={`${t('mute')}: ${label}`} aria-pressed={silent} onClick={() => setMuted((m) => !m)}>
            <PixelIcon name={silent ? 'muted' : 'sound'} />
          </button>
          <input
            className="vol"
            type="range"
            min="0"
            max="100"
            value={silent ? 0 : volume}
            style={{ '--p': `${silent ? 0 : volume}%` }}
            aria-label={`${t('vol')}: ${label}`}
            onChange={(e) => {
              setVolume(Number(e.target.value))
              setMuted(false)
            }}
          />
          <button type="button" className="pbtn" aria-label={`${t('fs')}: ${label}`} onClick={() => game.current?.SetFullscreen(1)}>
            <PixelIcon name="fullscreen" />
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

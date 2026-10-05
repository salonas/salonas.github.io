import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from '../music/MusicProvider'

const ICONS = {
  play: 'M1 0h2v1h2v1h2v1h1v2H7v1H5v1H3v1H1z',
  pause: 'M1 0h2v8H1zM5 0h2v8H5z',
  sound: 'M0 3h2V2h1V1h1v6H3V6H2V5H0zM5 3h1v2H5zM6 1h1v1h1v4H7v1H6V6h1V2H6z',
  muted: 'M0 3h2V2h1V1h1v6H3V6H2V5H0zM5 2h1v1h1V2h1v1H7v1h1v1H7v1H6V5H5V4h1V3H5z',
  fullscreen: 'M0 0h3v1H1v2H0zM5 0h3v3H7V1H5zM0 5h1v2h2v1H0zM7 5h1v3H5V7h2z',
  prev: 'M4 1h2v1H4zM3 2h2v1H3zM2 3h2v2H2zM3 5h2v1H3zM4 6h2v1H4z',
  next: 'M2 1h2v1H2zM3 2h2v1H3zM4 3h2v2H4zM3 5h2v1H3zM2 6h2v1H2z',
  close: 'M0 0h1v1h-1zM1 0h1v1h-1zM6 0h1v1h-1zM7 0h1v1h-1zM1 1h1v1h-1zM2 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM5 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM5 5h1v1h-1zM6 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM6 6h1v1h-1zM7 6h1v1h-1zM0 7h1v1h-1zM7 7h1v1h-1z',
}

export function PixelIcon({ name }) {
  return (
    <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

const TOUCH = '(hover: none) and (pointer: coarse)'
const clock = (n) => (Number.isFinite(n) ? `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}` : '0:00')
const fill = (ratio) => ({ '--p': `${ratio * 100}%` })

export default function MediaPlayer({ kind, src, label }) {
  const { t } = useLanguage()
  const { pauseForMedia, resumeAfterMedia } = useMusic()
  const ref = useRef(null)
  const frameRef = useRef(null)
  const boxRef = useRef(null)
  const [touch] = useState(() => window.matchMedia?.(TOUCH).matches ?? false)
  const [mixing, setMixing] = useState(false)
  const [on, setOn] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(NaN)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  const toggle = () => {
    const media = ref.current
    if (on) {
      media.pause()
      return
    }
    document.querySelectorAll('[data-media]').forEach((m) => m !== media && m.pause())
    pauseForMedia()
    media.play()?.catch(() => {})
  }

  useEffect(() => {
    ref.current.volume = volume
    ref.current.muted = muted
  }, [volume, muted])

  useEffect(() => {
    if (!mixing) return
    const onClick = (e) => {
      if (!boxRef.current?.contains(e.target)) setMixing(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [mixing])

  // Leaving the page mid-playback counts as stopping.
  useEffect(() => resumeAfterMedia, [resumeAfterMedia])

  const stopped = () => {
    setOn(false)
    resumeAfterMedia()
  }

  const seek = (e) => {
    const media = ref.current
    if (!Number.isFinite(media.duration)) return
    media.currentTime = (e.target.value / 1000) * media.duration
    setTime(media.currentTime)
  }

  // The frame, not the bare video, goes full screen so these controls come along.
  const fullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      return
    }
    const frame = frameRef.current
    const request = frame.requestFullscreen ?? frame.webkitRequestFullscreen ?? ref.current.webkitEnterFullscreen?.bind(ref.current)
    if (request) Promise.resolve(request.call(frame)).catch(() => {})
  }

  const mediaProps = {
    ref,
    'data-media': true,
    preload: 'metadata',
    src,
    onPlay: () => setOn(true),
    onPause: stopped,
    onTimeUpdate: (e) => setTime(e.currentTarget.currentTime),
    onLoadedMetadata: (e) => setDuration(e.currentTarget.duration),
    onEnded: (e) => {
      e.currentTarget.currentTime = 0
      setTime(0)
      stopped()
    },
  }
  const ratio = duration ? time / duration : 0
  const silent = muted || volume === 0

  // A phone has no room for both sliders: the first tap on the sound button opens the volume in a box above it, later taps mute.
  const opens = touch && !mixing
  const volumeSlider = (
    <input
      className="vol"
      type="range"
      min="0"
      max="100"
      value={silent ? 0 : Math.round(volume * 100)}
      style={fill(silent ? 0 : volume)}
      aria-label={`${t('vol')}: ${label}`}
      onChange={(e) => {
        setVolume(e.target.value / 100)
        setMuted(false)
      }}
    />
  )

  const controls = (
    <div className={touch ? 'player touch' : 'player'}>
      <button type="button" className="pbtn" aria-label={`${t(on ? 'pause' : 'play')}: ${label}`} onClick={toggle}>
        <PixelIcon name={on ? 'pause' : 'play'} />
      </button>
      <input
        className="seek"
        type="range"
        min="0"
        max="1000"
        value={Math.round(ratio * 1000)}
        style={fill(ratio)}
        aria-label={`${t('seek')}: ${label}`}
        onChange={seek}
      />
      <time>
        {clock(time)} / {clock(duration)}
      </time>
      <span className="volbox" ref={boxRef}>
        {touch && mixing && <span className="volpop">{volumeSlider}</span>}
        <button
          type="button"
          className="pbtn"
          aria-label={`${t(opens ? 'vol' : 'mute')}: ${label}`}
          aria-pressed={silent}
          aria-expanded={touch ? mixing : undefined}
          onClick={() => (opens ? setMixing(true) : setMuted((m) => !m))}
        >
          <PixelIcon name={silent ? 'muted' : 'sound'} />
        </button>
      </span>
      {!touch && volumeSlider}
      {kind === 'video' && (
        <button type="button" className="pbtn" aria-label={`${t('fs')}: ${label}`} onClick={fullscreen}>
          <PixelIcon name="fullscreen" />
        </button>
      )}
    </div>
  )

  if (kind === 'audio') {
    return (
      <>
        <audio loop {...mediaProps} />
        {controls}
      </>
    )
  }

  return (
    <div className="vplayer" ref={frameRef}>
      <div className="vwrap">
        <video playsInline onClick={toggle} {...mediaProps} />
      </div>
      {controls}
    </div>
  )
}

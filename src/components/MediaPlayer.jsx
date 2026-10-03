import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from '../music/MusicProvider'

const ICONS = {
  play: 'M1 0h2v1h2v1h2v1h1v2H7v1H5v1H3v1H1z',
  pause: 'M1 0h2v8H1zM5 0h2v8H5z',
  sound: 'M0 3h2V2h1V1h1v6H3V6H2V5H0zM5 3h1v2H5zM6 1h1v1h1v4H7v1H6V6h1V2H6z',
  muted: 'M0 3h2V2h1V1h1v6H3V6H2V5H0zM5 2h1v1h1V2h1v1H7v1h1v1H7v1H6V5H5V4h1V3H5z',
  fullscreen: 'M0 0h3v1H1v2H0zM5 0h3v3H7V1H5zM0 5h1v2h2v1H0zM7 5h1v3H5V7h2z',
}

function PixelIcon({ name }) {
  return (
    <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

const clock = (n) => (Number.isFinite(n) ? `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}` : '0:00')
const fill = (ratio) => ({ '--p': `${ratio * 100}%` })

export default function MediaPlayer({ kind, src, label }) {
  const { t } = useLanguage()
  const { pauseForMedia, resumeAfterMedia } = useMusic()
  const ref = useRef(null)
  const frameRef = useRef(null)
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

  const controls = (
    <div className="player">
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
      <button type="button" className="pbtn" aria-label={`${t('mute')}: ${label}`} aria-pressed={silent} onClick={() => setMuted((m) => !m)}>
        <PixelIcon name={silent ? 'muted' : 'sound'} />
      </button>
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

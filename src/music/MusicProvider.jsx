import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const MusicContext = createContext(null)
const VOLUME = 0.04

const projectMedia = () => [...document.querySelectorAll('[data-media]')]

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const interrupted = useRef(false)
  const wanted = useRef(false)
  const away = useRef(false)
  const held = useRef([])
  const [playing, setPlaying] = useState(false)

  // play() rejects until the visitor has interacted with the page.
  const start = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    interrupted.current = false
    projectMedia().forEach((m) => m.pause())
    audio.volume = VOLUME
    try {
      await audio.play()
      wanted.current = true
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [])

  const stop = useCallback(() => {
    interrupted.current = false
    wanted.current = false
    audioRef.current?.pause()
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop])

  const pauseForMedia = useCallback(() => {
    if (!playing) return
    audioRef.current?.pause()
    setPlaying(false)
    interrupted.current = true
  }, [playing])

  const resumeAfterMedia = useCallback(() => {
    if (away.current || !interrupted.current || projectMedia().some((m) => !m.paused)) return
    start()
  }, [start])

  // Nothing sounds while the page is in the background: another tab or window, or a locked phone.
  useEffect(() => {
    const leave = () => {
      if (away.current) return
      away.current = true
      held.current = projectMedia().filter((m) => !m.paused)
      held.current.forEach((m) => m.pause())
      audioRef.current?.pause()
      setPlaying(false)
    }
    const comeBack = () => {
      if (!away.current || document.hidden) return
      away.current = false
      const media = held.current.filter((m) => m.isConnected)
      held.current = []
      if (media.length) media.forEach((m) => m.play()?.catch(() => {}))
      else if (wanted.current) start()
    }
    const onVisibility = () => (document.hidden ? leave() : comeBack())
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', leave)
    window.addEventListener('pagehide', leave)
    window.addEventListener('focus', comeBack)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', leave)
      window.removeEventListener('pagehide', leave)
      window.removeEventListener('focus', comeBack)
    }
  }, [start])

  // The browser pauses audio on its own when the page is left and restored from its cache.
  useEffect(() => {
    const onShow = (e) => {
      if (!e.persisted) return
      away.current = false
      if (wanted.current && !interrupted.current) start()
    }
    window.addEventListener('pageshow', onShow)
    return () => window.removeEventListener('pageshow', onShow)
  }, [start])

  const value = useMemo(
    () => ({ playing, start, toggle, pauseForMedia, resumeAfterMedia }),
    [playing, start, toggle, pauseForMedia, resumeAfterMedia],
  )

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src="/music/meh.mp3" loop preload="none" onPause={() => setPlaying(false)} />
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}

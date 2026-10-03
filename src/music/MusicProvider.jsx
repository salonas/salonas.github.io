import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const MusicContext = createContext(null)
const VOLUME = 0.04

const projectMedia = () => [...document.querySelectorAll('[data-media]')]

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const interrupted = useRef(false)
  const wanted = useRef(false)
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
    if (!interrupted.current || projectMedia().some((m) => !m.paused)) return
    start()
  }, [start])

  // The browser pauses audio on its own when the page is left and restored from its cache.
  useEffect(() => {
    const onShow = (e) => {
      if (e.persisted && wanted.current && !interrupted.current) start()
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

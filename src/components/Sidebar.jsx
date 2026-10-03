import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from '../music/MusicProvider'

const TOUCH = '(hover: none) and (pointer: coarse)'

export default function Sidebar() {
  const { t, toggle: toggleLanguage } = useLanguage()
  const { playing, toggle: toggleMusic } = useMusic()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open])

  const onTap = (e) => {
    const touch = window.matchMedia?.(TOUCH).matches
    if (touch && !e.target.closest('.slot')) setOpen((v) => !v)
  }

  // Blur after a mouse click so the notebook can slide shut; keyboard presses (detail 0) keep focus.
  const press = (action) => (e) => {
    action()
    if (e.detail > 0) e.currentTarget.blur()
  }

  return (
    <aside id="side" ref={ref} className={open ? 'open' : undefined} aria-label={t('side-label')} onClick={onTap}>
      <div className="slot" id="slot1">
        <button type="button" className="sbtn" id="side-lang" onClick={press(toggleLanguage)}>
          {t('lang-btn')}
        </button>
      </div>
      <div className="slot" id="slot2">
        <button type="button" className="sbtn" id="side-music" onClick={press(toggleMusic)}>
          {t(playing ? 'music-off' : 'music-on')}
        </button>
      </div>
    </aside>
  )
}

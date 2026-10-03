import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/LanguageProvider'

const ZOOMS = [1, 1.5, 2, 3, 4]

export default function ImageViewer({ images, index, onIndex, onClose }) {
  const { t } = useLanguage()
  const captionId = useId()
  const closeRef = useRef(null)
  const paneRef = useRef(null)
  const imgRef = useRef(null)
  const drag = useRef(null)
  const [level, setLevel] = useState(0)
  const [fit, setFit] = useState(null)
  const image = images[index]
  const many = images.length > 1
  const zoom = ZOOMS[level]

  const step = (d) => onIndex((index + d + images.length) % images.length)

  // The fitted size is measured once, before the first zoom, so the frame keeps its size while the image grows inside it.
  const zoomTo = (next) => {
    const clamped = Math.max(0, Math.min(ZOOMS.length - 1, next))
    if (level === 0 && clamped > 0 && imgRef.current) {
      setFit({ w: imgRef.current.offsetWidth, h: imgRef.current.offsetHeight })
    }
    setLevel(clamped)
  }

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    setLevel(0)
    setFit(null)
  }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (many && e.key === 'ArrowLeft') step(-1)
      if (many && e.key === 'ArrowRight') step(1)
      if (e.key === '+' || e.key === '=') zoomTo(level + 1)
      if (e.key === '-') zoomTo(level - 1)
      if (e.key === '0') zoomTo(0)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // React attaches wheel listeners as passive, so the page would scroll behind the viewer.
  useEffect(() => {
    const pane = paneRef.current
    const onWheel = (e) => {
      e.preventDefault()
      zoomTo(level + (e.deltaY < 0 ? 1 : -1))
    }
    pane.addEventListener('wheel', onWheel, { passive: false })
    return () => pane.removeEventListener('wheel', onWheel)
  })

  const onPointerDown = (e) => {
    const pane = paneRef.current
    drag.current = { x: e.clientX, y: e.clientY, left: pane.scrollLeft, top: pane.scrollTop, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || zoom === 1) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
    paneRef.current.scrollLeft = d.left - dx
    paneRef.current.scrollTop = d.top - dy
  }
  const onPointerUp = () => {
    const moved = drag.current?.moved
    drag.current = null
    if (!moved) zoomTo(zoom === 1 ? 2 : 0)
  }

  const zoomed = zoom > 1 && fit
  const paneStyle = zoomed ? { width: fit.w, height: fit.h } : undefined
  const imgStyle = zoomed ? { width: fit.w * zoom, height: fit.h * zoom, maxWidth: 'none', maxHeight: 'none' } : undefined

  return createPortal(
    <div className="modal" id="zoom" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="zbox" role="dialog" aria-modal="true" aria-labelledby={captionId}>
        <div className={`paper zframe ${image.sketch ? 'sketch' : ''}`}>
          <div className={`zpane ${zoom > 1 ? 'zoomed' : ''}`} ref={paneRef} style={paneStyle}>
            <img
              ref={imgRef}
              src={image.src}
              alt={image.alt}
              style={imgStyle}
              draggable="false"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={() => (drag.current = null)}
              onClick={(e) => {
                // Keyboard and assistive clicks arrive without pointer events.
                if (e.detail === 0) zoomTo(zoom === 1 ? 2 : 0)
              }}
            />
          </div>
        </div>
        <p className="zcap" id={captionId}>
          {image.alt}
        </p>
        <div className="zbar">
          {many && (
            <>
              <button type="button" className="btn" aria-label={t('prev')} onClick={() => step(-1)}>
                ←
              </button>
              <span>
                {index + 1} / {images.length}
              </span>
              <button type="button" className="btn" aria-label={t('next')} onClick={() => step(1)}>
                →
              </button>
            </>
          )}
          <button type="button" className="btn" aria-label={t('zoom-out')} disabled={level === 0} onClick={() => zoomTo(level - 1)}>
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="btn"
            aria-label={t('zoom-in')}
            disabled={level === ZOOMS.length - 1}
            onClick={() => zoomTo(level + 1)}
          >
            +
          </button>
          <button type="button" className="btn dark" ref={closeRef} onClick={onClose}>
            {t('m-sent-close')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

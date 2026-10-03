import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/LanguageProvider'

export default function ImageViewer({ images, index, onIndex, onClose }) {
  const { t } = useLanguage()
  const captionId = useId()
  const closeRef = useRef(null)
  const image = images[index]
  const many = images.length > 1

  const step = (d) => onIndex((index + d + images.length) % images.length)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (many && e.key === 'ArrowLeft') step(-1)
      if (many && e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  return createPortal(
    <div className="modal" id="zoom" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="zbox" role="dialog" aria-modal="true" aria-labelledby={captionId}>
        <div className={`paper zframe ${image.sketch ? 'sketch' : ''}`}>
          <img src={image.src} alt={image.alt} onClick={() => many && step(1)} />
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
          <button type="button" className="btn dark" ref={closeRef} onClick={onClose}>
            {t('m-sent-close')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

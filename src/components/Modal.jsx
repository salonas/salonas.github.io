import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ title, message, closeLabel, onClose }) {
  const titleId = useId()
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Rendered on <body>: a transformed or contained ancestor would otherwise trap the fixed overlay.
  return createPortal(
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <h3 id={titleId}>{title}</h3>
        <p>{message}</p>
        <button type="button" className="btn" ref={buttonRef} onClick={onClose}>
          {closeLabel}
        </button>
      </div>
    </div>,
    document.body,
  )
}

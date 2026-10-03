import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMusic } from './MusicProvider'

export default function MusicNotice() {
  const { t } = useLanguage()
  const { playing, start } = useMusic()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    start()
  }, [start])

  if (!open) return null

  const close = () => {
    setOpen(false)
    if (!playing) start()
  }

  return <Modal title={t('m-music-title')} message={t('m-music-msg')} closeLabel={t('m-music-close')} onClose={close} />
}

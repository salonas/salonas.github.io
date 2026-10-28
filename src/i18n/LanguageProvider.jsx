import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import es from './es'
import en from './en'
import { detectLanguage } from './detectLanguage'

const DICTIONARIES = { es, en }
const LanguageContext = createContext(null)

// Shared with the chord analyzer at /chord-analyzer/, which reads and writes the same key.
const LANG_KEY = 'salonas.lang'

function storedLanguage() {
  try {
    const value = localStorage.getItem(LANG_KEY)
    return value === 'es' || value === 'en' ? value : null
  } catch {
    return null
  }
}

function storeLanguage(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // private browsing may refuse storage; the language still switches
  }
}

function browserLanguages() {
  if (typeof navigator === 'undefined') return undefined
  return navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : undefined
}

export function LanguageProvider({ children, initial }) {
  const [lang, setLang] = useState(() => initial ?? storedLanguage() ?? detectLanguage(browserLanguages()))

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DICTIONARIES[lang]['page-title']
  }, [lang])

  useEffect(() => {
    const follow = () => {
      const stored = storedLanguage()
      if (stored) setLang(stored)
    }
    const onStorage = (e) => e.key === LANG_KEY && follow()
    const onShow = (e) => e.persisted && follow()
    window.addEventListener('storage', onStorage)
    window.addEventListener('pageshow', onShow)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('pageshow', onShow)
    }
  }, [])

  const t = useCallback((key) => DICTIONARIES[lang][key] ?? key, [lang])
  const L = useCallback(
    (value) => (value && typeof value === 'object' && !Array.isArray(value) && 'es' in value ? value[lang] : value),
    [lang],
  )
  const toggle = useCallback(() => {
    const next = lang === 'es' ? 'en' : 'es'
    storeLanguage(next)
    setLang(next)
  }, [lang])

  const value = useMemo(() => ({ lang, t, L, toggle }), [lang, t, L, toggle])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

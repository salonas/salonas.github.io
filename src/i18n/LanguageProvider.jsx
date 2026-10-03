import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import es from './es'
import en from './en'
import { detectLanguage } from './detectLanguage'

const DICTIONARIES = { es, en }
const LanguageContext = createContext(null)

function browserLanguages() {
  if (typeof navigator === 'undefined') return undefined
  return navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : undefined
}

export function LanguageProvider({ children, initial }) {
  const [lang, setLang] = useState(() => initial ?? detectLanguage(browserLanguages()))

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DICTIONARIES[lang]['page-title']
  }, [lang])

  const t = useCallback((key) => DICTIONARIES[lang][key] ?? key, [lang])
  const L = useCallback(
    (value) => (value && typeof value === 'object' && !Array.isArray(value) && 'es' in value ? value[lang] : value),
    [lang],
  )
  const toggle = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), [])

  const value = useMemo(() => ({ lang, t, L, toggle }), [lang, t, L, toggle])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dictionaries, type Dict, type L10n, type Lang } from './translations'

const STORAGE_KEY = 'uzg-lang'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
  /** Uch tilli matndan joriy tildagisini qaytaradi */
  tr: (v: L10n) => string
}

const LanguageContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'uz' || saved === 'en' || saved === 'ru') return saved
  } catch {
    /* storage unavailable */
  }
  return 'uz' // o'zbek tili — standart
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  const value: Ctx = { lang, setLang, t: dictionaries[lang], tr: (v) => v[lang] || v.uz }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider')
  return ctx
}

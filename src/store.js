import { useSyncExternalStore } from 'react'
import { defaultContentPt } from './defaultContent'
import { defaultContentEn } from './defaultContent.en'
export const defaults = { pt: defaultContentPt, en: defaultContentEn }
const KEY = 'gpreto_content_v1'
const merge = (d, s) => {
  if (Array.isArray(d)) return Array.isArray(s) ? s : d
  if (d && typeof d === 'object') { const o = {}; for (const k of Object.keys(d)) o[k] = s && k in s ? merge(d[k], s[k]) : d[k]; return o }
  return s ?? d
}
const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!raw) return defaults
    const saved = raw.hero ? { pt: raw } : raw // formato antigo (só português)
    return { pt: merge(defaults.pt, saved.pt), en: merge(defaults.en, saved.en) }
  } catch { return defaults }
}
let state = load()
const subs = new Set()
const emit = () => subs.forEach((f) => f())
export const getContent = () => state
export const setContent = (c) => {
  state = c
  try { localStorage.setItem(KEY, JSON.stringify(c)) } catch { alert('Armazenamento cheio / Storage full: use imagens menores ou links.') }
  emit()
}
export const resetContent = () => { localStorage.removeItem(KEY); state = defaults; emit() }
window.addEventListener('storage', (e) => { if (e.key === KEY) { state = load(); emit() } })
const sub = (f) => (subs.add(f), () => subs.delete(f))
export const useAllContent = () => useSyncExternalStore(sub, getContent)

// idioma
const LKEY = 'gpreto_lang'
const initLang = () => localStorage.getItem(LKEY) || (navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en')
let lang = initLang()
export const setLang = (l) => { lang = l; localStorage.setItem(LKEY, l); document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en'; emit() }
document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
export const useLang = () => useSyncExternalStore(sub, () => lang)
export const useContent = () => { const l = useLang(), all = useAllContent(); return all[l] }
export const ADMIN_PW_KEY = 'gpreto_admin_pw'

import { useSyncExternalStore } from 'react'
import { supabase } from './supabase'
import { defaultContentPt } from './defaultContent'
import { defaultContentEn } from './defaultContent.en'
export const defaults = { pt: defaultContentPt, en: defaultContentEn }
const KEY = 'gpreto_content_v1' // cache local; a fonte da verdade é o Supabase
const merge = (d, s) => {
  if (Array.isArray(d)) return Array.isArray(s) ? s : d
  if (d && typeof d === 'object') { const o = {}; for (const k of Object.keys(d)) o[k] = s && k in s ? merge(d[k], s[k]) : d[k]; return o }
  return s ?? d
}
const build = (saved) => ({ pt: merge(defaults.pt, saved?.pt), en: merge(defaults.en, saved?.en) })
const load = () => { try { return build(JSON.parse(localStorage.getItem(KEY) || 'null') || {}) } catch { return defaults } }
let state = load()
const subs = new Set()
const emit = () => subs.forEach((f) => f())
const cache = () => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* cache é opcional */ } }
export const getContent = () => state

// carrega do banco (leitura pública)
export const refreshContent = async () => {
  const { data, error } = await supabase.from('site_content').select('lang,data')
  if (error || !data?.length) return
  const saved = {}; data.forEach((r) => { saved[r.lang] = r.data })
  state = build(saved); cache(); emit()
}
refreshContent()

// grava no banco (exige login de admin)
export const setContent = async (c) => {
  const rows = ['pt', 'en'].map((lang) => ({ lang, data: c[lang], updated_at: new Date().toISOString() }))
  const { error } = await supabase.from('site_content').upsert(rows)
  if (error) return error.message
  state = c; cache(); emit(); return null
}
export const defaultContents = () => defaults
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

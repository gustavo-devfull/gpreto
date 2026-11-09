import { useSyncExternalStore } from 'react'
import { defaultContent } from './defaultContent'
const KEY = 'gpreto_content_v1'
const merge = (d, s) => {
  if (Array.isArray(d)) return Array.isArray(s) ? s : d
  if (d && typeof d === 'object') { const o = {}; for (const k of Object.keys(d)) o[k] = s && k in s ? merge(d[k], s[k]) : d[k]; return o }
  return s ?? d
}
const load = () => { try { const r = localStorage.getItem(KEY); return r ? merge(defaultContent, JSON.parse(r)) : defaultContent } catch { return defaultContent } }
let state = load()
const subs = new Set()
export const getContent = () => state
export const setContent = (c) => {
  state = c
  try { localStorage.setItem(KEY, JSON.stringify(c)) } catch { alert('Armazenamento cheio: use imagens menores ou links de imagem.') }
  subs.forEach((f) => f())
}
export const resetContent = () => { localStorage.removeItem(KEY); state = defaultContent; subs.forEach((f) => f()) }
window.addEventListener('storage', (e) => { if (e.key === KEY) { state = load(); subs.forEach((f) => f()) } })
export const useContent = () => useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), getContent)
export const ADMIN_PW_KEY = 'gpreto_admin_pw'

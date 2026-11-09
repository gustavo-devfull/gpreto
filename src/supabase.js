import { createClient } from '@supabase/supabase-js'
// Chave publicável (pode ficar no front-end); a segurança vem das políticas RLS no banco.
const URL = import.meta.env.VITE_SUPABASE_URL || 'https://tumbrwxliqwzjyaipclj.supabase.co'
const KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_rraSHh-yfWGaqU-LZdvz6w_Sib4uwZk'
export const supabase = createClient(URL, KEY)
export const BUCKET = 'site-media'

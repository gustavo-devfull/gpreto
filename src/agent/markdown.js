// Versões em texto do site para agentes de IA (Markdown e llms.txt).
// Usado pela middleware da Vercel (servidor) e pelas ferramentas WebMCP (navegador).
import { defaultContentPt } from '../defaultContent.js'
import { defaultContentEn } from '../defaultContent.en.js'

export const SITE = 'https://www.gpreto.site'
export const SUPABASE_URL = 'https://tumbrwxliqwzjyaipclj.supabase.co'
export const SUPABASE_KEY = 'sb_publishable_rraSHh-yfWGaqU-LZdvz6w_Sib4uwZk'
const defaults = { pt: defaultContentPt, en: defaultContentEn }

const merge = (d, s) => {
  if (Array.isArray(d)) return Array.isArray(s) ? s : d
  if (d && typeof d === 'object') { const o = {}; for (const k of Object.keys(d)) o[k] = s && k in s ? merge(d[k], s[k]) : d[k]; return o }
  return s ?? d
}

// conteúdo publicado no Supabase (leitura pública), com os padrões como reserva
export async function loadContent(fetchImpl = fetch) {
  let saved = {}
  try {
    const r = await fetchImpl(`${SUPABASE_URL}/rest/v1/site_content?select=lang,data`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } })
    if (r.ok) (await r.json()).forEach((row) => { saved[row.lang] = row.data })
  } catch { /* usa os padrões */ }
  return { pt: merge(defaults.pt, saved.pt), en: merge(defaults.en, saved.en) }
}

const abs = (u = '') => (/^https?:\/\//.test(u) ? u : u.startsWith('./') || u.startsWith('/') ? SITE + '/' + u.replace(/^\.?\//, '') : 'https://' + u)
const L = {
  pt: { services: 'Serviços', projects: 'Projetos', about: 'Sobre', founder: 'Fundador', education: 'Formação', techs: 'Tecnologias', contact: 'Contato', phone: 'Telefone / WhatsApp', email: 'E-mail', other: 'English version' },
  en: { services: 'Services', projects: 'Projects', about: 'About', founder: 'Founder', education: 'Education', techs: 'Technologies', contact: 'Contact', phone: 'Phone / WhatsApp', email: 'E-mail', other: 'Versão em português' },
}

export function toMarkdown(c, lang = 'pt') {
  const t = L[lang] || L.pt, { hero: h, services: s, projects: p, about: a, contact: ct, brand: b } = c
  const out = [
    `# GPRETO — ${h.line1} ${h.line2} ${h.line3} ${h.italic}`.replace(/\s+/g, ' ').trim(), '',
    `> ${h.intro}`, '',
    `${h.tag} · ${b.city} — ${h.where} · ${h.years}`, '',
    `[${t.other}](${SITE}/index.md?lang=${lang === 'pt' ? 'en' : 'pt'})`, '',
    `## ${t.services}`, '', s.lead, '',
  ]
  s.items.forEach((x) => { out.push(`### ${x.title}`, '', x.desc, '', ...x.bullets.map((y) => `- ${y.replace(/\.$/, '')}`), '') })
  out.push(`## ${t.projects}`, '', p.lead, '')
  p.items.forEach((x) => out.push(`- [${x.name}](${abs(x.link)}) — ${x.cat}`))
  out.push('', `## ${t.about}`, '', a.p1, '', a.p2, '', ...a.stats.map((x) => `- **${x.title}** — ${x.text}`), '', `- ${a.pills.join(' · ')}`, '',
    `### ${t.founder}: ${a.name}`, '', a.role, '', `**${t.education}**`, '', ...a.education.map((e) => `- ${e.course} — ${e.place}`), '',
    `**${t.techs}:** ${a.skills.join(', ')}`, '',
    `## ${t.contact}`, '', ct.intro, '',
    `- ${t.phone}: ${b.phone} — ${b.whatsapp}`, `- ${t.email}: ${ct.email}`)
  if (b.instagram) out.push(`- Instagram: ${b.instagram}`)
  if (b.linkedin) out.push(`- LinkedIn: ${b.linkedin}`)
  out.push('', b.rights, '')
  return out.join('\n')
}

export function toLlms(c) {
  const pt = c.pt, en = c.en
  return [
    '# GPRETO Soluções Digitais', '',
    `> ${en.hero.intro} Based in ${en.brand.city}, serving all of Brazil.`, '',
    `GPRETO builds landing pages, corporate websites and e-commerce stores. Contact: ${pt.brand.phone} (WhatsApp ${pt.brand.whatsapp}) or ${pt.contact.email}.`, '',
    '## Pages', '',
    `- [Site completo em Markdown (português)](${SITE}/index.md): serviços, projetos, sobre e contato`,
    `- [Full site in Markdown (English)](${SITE}/index.md?lang=en): services, projects, about and contact`, '',
    '## Services', '', ...en.services.items.map((x) => `- ${x.title}: ${x.desc}`), '',
    '## Optional', '', ...en.projects.items.map((x) => `- [${x.name}](${abs(x.link)}): ${x.cat}`), '',
  ].join('\n')
}

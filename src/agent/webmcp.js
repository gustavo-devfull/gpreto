// WebMCP: ferramentas que agentes de IA no navegador podem chamar nesta página.
// Só funciona em navegadores com WebMCP; nos demais não faz nada.
import { getContent } from '../store'
import { toMarkdown } from './markdown'

const ro = { readOnlyHint: true }
const langOf = (l) => (l === 'en' || l === 'pt' ? l : document.documentElement.lang.startsWith('en') ? 'en' : 'pt')
const langProp = { lang: { type: 'string', enum: ['pt', 'en'], description: 'Idioma / language (pt ou en)' } }

const tools = [
  {
    name: 'get_site_markdown', title: 'Conteúdo do site em Markdown',
    description: 'Returns the whole GPRETO website (services, projects, about, contact) as Markdown.',
    inputSchema: { type: 'object', properties: langProp }, annotations: ro,
    execute: async ({ lang } = {}) => { const l = langOf(lang); return { markdown: toMarkdown(getContent()[l], l) } },
  },
  {
    name: 'list_services', title: 'Serviços',
    description: 'Lists the web services GPRETO offers (landing pages, corporate websites, e-commerce) with descriptions and highlights.',
    inputSchema: { type: 'object', properties: langProp }, annotations: ro,
    execute: async ({ lang } = {}) => getContent()[langOf(lang)].services.items.map(({ title, desc, bullets }) => ({ title, description: desc, highlights: bullets })),
  },
  {
    name: 'list_projects', title: 'Projetos',
    description: 'Lists portfolio projects built by GPRETO, with category and live website link. Optionally filter by text in the name or category.',
    inputSchema: { type: 'object', properties: { ...langProp, query: { type: 'string', description: 'Text to search in project name or category, e.g. "e-commerce"' } } }, annotations: ro,
    execute: async ({ lang, query } = {}) => {
      const q = (query || '').toLowerCase()
      const c = getContent(), other = c[langOf(lang) === 'pt' ? 'en' : 'pt'].projects.items
      // busca nos dois idiomas (ex.: "institucional" ou "corporate")
      return c[langOf(lang)].projects.items
        .filter((p, i) => !q || [p.name, p.cat, other[i]?.cat].join(' ').toLowerCase().includes(q))
        .map((p) => ({ name: p.name, category: p.cat, url: /^https?:/.test(p.link) ? p.link : 'https://' + p.link }))
    },
  },
  {
    name: 'get_contact_info', title: 'Contato',
    description: 'Returns how to contact GPRETO to request a quote: phone/WhatsApp, e-mail, Instagram, LinkedIn and city.',
    inputSchema: { type: 'object', properties: {} }, annotations: ro,
    execute: async () => { const c = getContent().pt; return { phone: c.brand.phone, whatsapp: c.brand.whatsapp, email: c.contact.email, instagram: c.brand.instagram, linkedin: c.brand.linkedin, city: c.brand.city } },
  },
  {
    name: 'create_whatsapp_link', title: 'Link de WhatsApp com mensagem',
    description: 'Builds a WhatsApp link that opens a chat with GPRETO with the given message pre-filled. It does not send anything; the user must open the link and press send.',
    inputSchema: { type: 'object', properties: { message: { type: 'string', description: 'Message to pre-fill, e.g. a quote request' } }, required: ['message'] }, annotations: ro,
    execute: async ({ message }) => { const base = getContent().pt.brand.whatsapp.split('?')[0]; return { url: `${base}?text=${encodeURIComponent(message)}` } },
  },
]

export function registerWebMcp() {
  const mc = (typeof document !== 'undefined' && document.modelContext) || (typeof navigator !== 'undefined' && navigator.modelContext)
  if (!mc) return
  const wrap = (t) => ({ ...t, execute: async (input) => t.execute(input || {}) })
  try {
    if (typeof mc.registerTool === 'function') tools.forEach((t) => mc.registerTool(wrap(t)))
    else if (typeof mc.provideContext === 'function') mc.provideContext({ tools: tools.map(wrap) })
  } catch (e) { console.warn('WebMCP:', e) }
}

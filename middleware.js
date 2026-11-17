// Routing Middleware da Vercel: entrega o site em Markdown para agentes de IA.
// - GET / com "Accept: text/markdown" → Markdown (negociação de conteúdo)
// - GET /index.md (?lang=en)          → Markdown
// - GET /llms.txt                     → resumo para LLMs
// Visitantes comuns seguem para o index.html normalmente.
import { loadContent, toMarkdown, toLlms } from './src/agent/markdown.js'

export const config = { matcher: ['/', '/index.md', '/llms.txt'] }

const text = (body, type) => new Response(body, {
  headers: { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400', Vary: 'Accept' },
})

export default async function middleware(request) {
  const url = new URL(request.url)
  const wantsMd = url.pathname === '/index.md' || /text\/markdown/i.test(request.headers.get('accept') || '')
  if (url.pathname === '/llms.txt') return text(toLlms(await loadContent()), 'text/plain')
  if (!wantsMd) return // segue para o site
  const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'pt'
  const c = await loadContent()
  return text(toMarkdown(c[lang], lang), 'text/markdown')
}

import { useState, useRef } from 'react'
import { useContent, setContent, resetContent, ADMIN_PW_KEY } from '../store'
import './admin.css'

const getPw = () => localStorage.getItem(ADMIN_PW_KEY) || 'admin123'
const clone = (o) => JSON.parse(JSON.stringify(o))

// reduz imagens enviadas para caber no localStorage
const fileToDataUrl = (file) => new Promise((res) => {
  const img = new Image(), fr = new FileReader()
  fr.onload = () => { img.onload = () => {
    const m = Math.min(1, 1400 / img.width), cv = document.createElement('canvas')
    cv.width = img.width * m; cv.height = img.height * m
    cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); res(cv.toDataURL('image/jpeg', 0.82))
  }; img.src = fr.result }
  fr.readAsDataURL(file)
})

const Field = ({ label, value, onChange, area, rows = 3 }) => (
  <label className="f"><span>{label}</span>
    {area ? <textarea rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      : <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
  </label>)

const ImageField = ({ label, value, onChange }) => (
  <div className="f"><span>{label}</span>
    <div className="img">
      {value && <img src={value} alt="" />}
      <div style={{ flex: 1, display: 'grid', gap: 6 }}>
        <input placeholder="URL da imagem" value={value?.startsWith('data:') ? '(imagem enviada)' : value ?? ''} onChange={(e) => onChange(e.target.value)} readOnly={value?.startsWith('data:')} />
        <input type="file" accept="image/*" onChange={async (e) => e.target.files[0] && onChange(await fileToDataUrl(e.target.files[0]))} />
      </div>
    </div></div>)

const Check = ({ label, value, onChange }) => <label className="chk"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />{label}</label>

// edita lista de strings
const StringList = ({ label, list, onChange }) => (
  <div className="f"><span>{label}</span>
    {list.map((v, i) => (<div className="li" key={i}>
      <input value={v} onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))} />
      <button onClick={() => onChange(list.filter((_, j) => j !== i))}>✕</button></div>))}
    <button className="add" onClick={() => onChange([...list, ''])}>+ Adicionar</button></div>)

// lista de objetos reordenável
function ObjList({ items, onChange, blank, title, render }) {
  const move = (i, d) => { const a = [...items], j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a) }
  const set = (i, v) => onChange(items.map((x, j) => (j === i ? v : x)))
  return (<div className="objs">
    {items.map((it, i) => (<div className="obj" key={i}>
      <div className="oh"><b>{i + 1}. {title(it) || 'Sem título'}</b>
        <span><button onClick={() => move(i, -1)}>↑</button><button onClick={() => move(i, 1)}>↓</button>
          <button onClick={() => confirm('Remover este item?') && onChange(items.filter((_, j) => j !== i))}>Remover</button></span></div>
      {render(it, (patch) => set(i, { ...it, ...patch }))}</div>))}
    <button className="add" onClick={() => onChange([...items, clone(blank)])}>+ Adicionar item</button></div>)
}

function Login({ onOk }) {
  const [v, setV] = useState(''), [err, setErr] = useState(false)
  return (<div className="login"><form onSubmit={(e) => { e.preventDefault(); if (v === getPw()) { sessionStorage.setItem('gp_admin', '1'); onOk() } else setErr(true) }}>
    <h1>Admin GPRETO</h1><input type="password" autoFocus placeholder="Senha" value={v} onChange={(e) => { setV(e.target.value); setErr(false) }} />
    {err && <small className="err">Senha incorreta</small>}<button className="pri">Entrar</button>
    <a href="#/">← Voltar ao site</a></form></div>)
}

export default function Admin() {
  const c = useContent()
  const [auth, setAuth] = useState(!!sessionStorage.getItem('gp_admin'))
  const [tab, setTab] = useState('hero')
  const [draft, setDraft] = useState(null)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef()
  if (!auth) return <Login onOk={() => setAuth(true)} />
  const d = draft || c
  const dirty = !!draft
  const up = (section, patch) => setDraft({ ...d, [section]: Array.isArray(d[section]) ? patch : { ...d[section], ...patch } })
  const save = () => { setContent(draft); setDraft(null); setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const exp = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' })); a.download = 'gpreto-conteudo.json'; a.click() }
  const imp = (f) => { const r = new FileReader(); r.onload = () => { try { setDraft(JSON.parse(r.result)) } catch { alert('JSON inválido') } }; r.readAsText(f) }
  const tabs = { hero: 'Hero', hello: 'Apresentação', services: 'Serviços', projects: 'Projetos', about: 'Sobre', faq: 'FAQ', contact: 'Contato', brand: 'Marca & links', settings: 'Backup & senha' }

  const panels = {
    hero: <>
      <Field label="Selo" value={d.hero.badge} onChange={(v) => up('hero', { badge: v })} />
      <Field label="Título" value={d.hero.title} onChange={(v) => up('hero', { title: v })} />
      <Field label="Título (trecho em itálico)" value={d.hero.titleItalic} onChange={(v) => up('hero', { titleItalic: v })} />
      <Field area label="Texto de apoio" value={d.hero.lead} onChange={(v) => up('hero', { lead: v })} />
      <Field label="Botão principal" value={d.hero.cta1} onChange={(v) => up('hero', { cta1: v })} />
      <Field label="Botão secundário" value={d.hero.cta2} onChange={(v) => up('hero', { cta2: v })} />
      <Check label="Animação 3D (Three.js) no hero" value={d.hero.animation3d} onChange={(v) => up('hero', { animation3d: v })} />
      <StringList label="Itens do menu (Serviços, Projetos, Sobre, FAQ)" list={d.nav} onChange={(v) => up('nav', v)} /></>,
    hello: <>
      <Field area label="Texto" value={d.hello.text} onChange={(v) => up('hello', { text: v })} />
      <StringList label="Tags" list={d.hello.tags} onChange={(v) => up('hello', { tags: v })} /></>,
    services: <>
      <Field label="Chamada" value={d.services.eyebrow} onChange={(v) => up('services', { eyebrow: v })} />
      <Field label="Título" value={d.services.title} onChange={(v) => up('services', { title: v })} />
      <Field area label="Texto" value={d.services.lead} onChange={(v) => up('services', { lead: v })} />
      <ObjList items={d.services.items} onChange={(v) => up('services', { items: v })} blank={{ title: '', desc: '', bullets: [] }} title={(i) => i.title}
        render={(i, set) => <><Field label="Título" value={i.title} onChange={(v) => set({ title: v })} /><Field area label="Descrição" value={i.desc} onChange={(v) => set({ desc: v })} /><StringList label="Tópicos" list={i.bullets} onChange={(v) => set({ bullets: v })} /></>} /></>,
    projects: <>
      <Field label="Chamada" value={d.projects.eyebrow} onChange={(v) => up('projects', { eyebrow: v })} />
      <Field label="Título" value={d.projects.title} onChange={(v) => up('projects', { title: v })} />
      <Field area label="Texto" value={d.projects.lead} onChange={(v) => up('projects', { lead: v })} />
      <Field label="Texto do botão final" value={d.projects.cta} onChange={(v) => up('projects', { cta: v })} />
      <p className="hint">Os 4 primeiros projetos também aparecem na faixa de imagens do topo.</p>
      <ObjList items={d.projects.items} onChange={(v) => up('projects', { items: v })} blank={{ name: '', cat: '', image: '', link: '' }} title={(i) => i.name}
        render={(i, set) => <><Field label="Nome" value={i.name} onChange={(v) => set({ name: v })} /><Field label="Categoria" value={i.cat} onChange={(v) => set({ cat: v })} /><Field label="Link do site" value={i.link} onChange={(v) => set({ link: v })} /><ImageField label="Imagem" value={i.image} onChange={(v) => set({ image: v })} /></>} /></>,
    about: <>
      <Field label="Chamada" value={d.about.eyebrow} onChange={(v) => up('about', { eyebrow: v })} />
      <Field label="Nome" value={d.about.name} onChange={(v) => up('about', { name: v })} />
      <Field label="Função / cidade" value={d.about.role} onChange={(v) => up('about', { role: v })} />
      <ImageField label="Foto" value={d.about.photo} onChange={(v) => up('about', { photo: v })} />
      <Field area rows={4} label="Parágrafo 1" value={d.about.p1} onChange={(v) => up('about', { p1: v })} />
      <Field area label="Parágrafo 2" value={d.about.p2} onChange={(v) => up('about', { p2: v })} />
      <h4>Destaques</h4>
      <ObjList items={d.about.stats} onChange={(v) => up('about', { stats: v })} blank={{ title: '', text: '' }} title={(i) => i.title}
        render={(i, set) => <><Field label="Título" value={i.title} onChange={(v) => set({ title: v })} /><Field label="Texto" value={i.text} onChange={(v) => set({ text: v })} /></>} />
      <StringList label="Habilidades / tecnologias" list={d.about.skills} onChange={(v) => up('about', { skills: v })} /></>,
    faq: <>
      <Field label="Chamada" value={d.faq.eyebrow} onChange={(v) => up('faq', { eyebrow: v })} />
      <Field label="Título" value={d.faq.title} onChange={(v) => up('faq', { title: v })} />
      <Field label="Cartão escuro: título" value={d.faq.ctaTitle} onChange={(v) => up('faq', { ctaTitle: v })} />
      <Field label="Cartão escuro: botão" value={d.faq.ctaButton} onChange={(v) => up('faq', { ctaButton: v })} />
      <ObjList items={d.faq.items} onChange={(v) => up('faq', { items: v })} blank={{ q: '', a: '' }} title={(i) => i.q}
        render={(i, set) => <><Field label="Pergunta" value={i.q} onChange={(v) => set({ q: v })} /><Field area label="Resposta" value={i.a} onChange={(v) => set({ a: v })} /></>} /></>,
    contact: <>
      <Field label="Chamada" value={d.contact.eyebrow} onChange={(v) => up('contact', { eyebrow: v })} />
      <Field label="Título" value={d.contact.title} onChange={(v) => up('contact', { title: v })} />
      <Field label="Título (itálico)" value={d.contact.titleItalic} onChange={(v) => up('contact', { titleItalic: v })} />
      <Field area label="Texto" value={d.contact.text} onChange={(v) => up('contact', { text: v })} />
      <Field label="Botão" value={d.contact.button} onChange={(v) => up('contact', { button: v })} /></>,
    brand: <>
      <ImageField label="Logo" value={d.brand.logo} onChange={(v) => up('brand', { logo: v })} />
      <Field label="Link do WhatsApp" value={d.brand.whatsapp} onChange={(v) => up('brand', { whatsapp: v })} />
      <Field label="Telefone exibido" value={d.brand.phone} onChange={(v) => up('brand', { phone: v })} />
      <Field label="Instagram" value={d.brand.instagram} onChange={(v) => up('brand', { instagram: v })} />
      <Field label="LinkedIn" value={d.brand.linkedin} onChange={(v) => up('brand', { linkedin: v })} />
      <Field label="GitHub" value={d.brand.github} onChange={(v) => up('brand', { github: v })} />
      <Field label="Cidade (rodapé)" value={d.brand.city} onChange={(v) => up('brand', { city: v })} />
      <Field label="Texto de copyright" value={d.brand.footer} onChange={(v) => up('brand', { footer: v })} /></>,
    settings: <>
      <p className="hint">O conteúdo é salvo no navegador deste computador (localStorage). Use o backup para levar o conteúdo para outro dispositivo.</p>
      <div className="row"><button className="pri" onClick={exp}>Exportar JSON</button>
        <button onClick={() => fileRef.current.click()}>Importar JSON</button>
        <input ref={fileRef} type="file" accept=".json" hidden onChange={(e) => e.target.files[0] && imp(e.target.files[0])} />
        <button className="danger" onClick={() => confirm('Restaurar todo o conteúdo original?') && (resetContent(), setDraft(null))}>Restaurar padrão</button></div>
      <h4>Alterar senha do admin</h4>
      <form onSubmit={(e) => { e.preventDefault(); const v = e.target.pw.value.trim(); if (v.length < 4) return alert('Mínimo 4 caracteres'); localStorage.setItem(ADMIN_PW_KEY, v); e.target.reset(); alert('Senha alterada') }}>
        <div className="li"><input name="pw" type="password" placeholder="Nova senha" /><button className="pri">Salvar senha</button></div></form></>,
  }

  return (<div className="admin">
    <aside><b>GPRETO · Admin</b>
      {Object.entries(tabs).map(([k, v]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{v}</button>)}
      <a href="#/" target="_blank">Ver site ↗</a>
      <button onClick={() => { sessionStorage.removeItem('gp_admin'); setAuth(false) }}>Sair</button></aside>
    <main><div className="bar"><h2>{tabs[tab]}</h2>
      <span>{saved && <em>✓ Salvo</em>}{dirty && <button onClick={() => setDraft(null)}>Descartar</button>}
        <button className="pri" disabled={!dirty} onClick={save}>Salvar alterações</button></span></div>
      <div className="panel">{panels[tab]}</div></main></div>)
}

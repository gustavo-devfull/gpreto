import { useState, useRef, useEffect } from 'react'
import { useAllContent, setContent, refreshContent, defaultContents } from '../store'
import { supabase, BUCKET } from '../supabase'
import './admin.css'

const clone = (o) => JSON.parse(JSON.stringify(o))

// reduz a imagem e envia ao Supabase Storage, devolvendo a URL pública
const uploadImage = (file) => new Promise((resolve, reject) => {
  const img = new Image(), fr = new FileReader()
  fr.onload = () => { img.onload = () => {
    const m = Math.min(1, 1600 / img.width), cv = document.createElement('canvas')
    cv.width = img.width * m; cv.height = img.height * m
    cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height)
    cv.toBlob(async (blob) => {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`
      const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: 'image/webp', cacheControl: '31536000' })
      if (error) return reject(error)
      resolve(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl)
    }, 'image/webp', 0.85)
  }; img.src = fr.result }
  fr.readAsDataURL(file)
})

const Field = ({ label, value, onChange, area, rows = 3 }) => (
  <label className="f"><span>{label}</span>
    {area ? <textarea rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      : <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
  </label>)

const ImageField = ({ label, value, onChange }) => {
  const [busy, setBusy] = useState(false)
  return (<div className="f"><span>{label}</span>
    <div className="img">
      {value && <img src={value} alt="" />}
      <div style={{ flex: 1, display: 'grid', gap: 6 }}>
        <input placeholder="URL da imagem" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        <input type="file" accept="image/*" disabled={busy} onChange={async (e) => {
          const f = e.target.files[0]; if (!f) return
          setBusy(true)
          try { onChange(await uploadImage(f)) } catch (err) { alert('Falha no envio: ' + (err.message || err)) }
          setBusy(false)
        }} />
        {busy && <small>Enviando…</small>}
      </div>
    </div></div>)
}

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

function Login() {
  const [email, setEmail] = useState(''), [pw, setPw] = useState(''), [err, setErr] = useState(''), [info, setInfo] = useState(''), [busy, setBusy] = useState(false)
  const run = async (mode) => {
    setBusy(true); setErr(''); setInfo('')
    const { error, data } = mode === 'in' ? await supabase.auth.signInWithPassword({ email, password: pw }) : await supabase.auth.signUp({ email, password: pw })
    setBusy(false)
    if (error) setErr(error.message)
    else if (mode === 'up' && !data.session) setInfo('Conta criada. Confirme o e-mail recebido e depois entre.')
  }
  return (<div className="login"><form onSubmit={(e) => { e.preventDefault(); run('in') }}>
    <h1>Admin GPRETO</h1>
    <input type="email" autoFocus placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Senha" value={pw} onChange={(e) => setPw(e.target.value)} />
    {err && <small className="err">{err}</small>}{info && <small>{info}</small>}
    <button className="pri" disabled={busy}>Entrar</button>
    <button type="button" disabled={busy || !email || pw.length < 6} onClick={() => run('up')}>Criar conta (primeiro acesso)</button>
    <a href="#/">← Voltar ao site</a></form></div>)
}

export default function Admin() {
  const all = useAllContent()
  const [lang, setLangTab] = useState('pt')
  const [session, setSession] = useState(undefined)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  const [tab, setTab] = useState('services')
  const [draft, setDraft] = useState(null)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef()
  if (session === undefined) return <div className="login">Carregando…</div>
  if (!session) return <Login />
  const email = session.user.email
  const d = (draft || all)[lang]
  const dirty = !!draft
  const up = (section, patch) => setDraft({ ...(draft || all), [lang]: { ...d, [section]: Array.isArray(d[section]) ? patch : { ...d[section], ...patch } } })
  const save = async () => {
    const err = await setContent(draft)
    if (err) return alert('Não foi possível salvar: ' + err + '\n(Verifique se você entrou com a conta de administrador.)')
    setDraft(null); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }
  const exp = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(draft || all, null, 2)], { type: 'application/json' })); a.download = 'gpreto-conteudo.json'; a.click() }
  const imp = (f) => { const r = new FileReader(); r.onload = () => { try { { const j = JSON.parse(r.result); setDraft(j.hero ? { pt: j, en: all.en } : j) } } catch { alert('JSON inválido') } }; r.readAsText(f) }
  const tabs = { services: 'Serviços', projects: 'Projetos', about: 'Sobre', brand: 'Contato & links', settings: 'Backup & senha' }

  const panels = {
    services: <>
      <Field area label="Texto" value={d.services.lead} onChange={(v) => up('services', { lead: v })} />
      <ObjList items={d.services.items} onChange={(v) => up('services', { items: v })} blank={{ title: '', desc: '', bullets: [] }} title={(i) => i.title}
        render={(i, set) => <><Field label="Título" value={i.title} onChange={(v) => set({ title: v })} /><Field area label="Descrição" value={i.desc} onChange={(v) => set({ desc: v })} /><StringList label="Tópicos" list={i.bullets} onChange={(v) => set({ bullets: v })} /></>} /></>,
    projects: <>
      <Field area label="Texto" value={d.projects.lead} onChange={(v) => up('projects', { lead: v })} />
      <Field label="Texto do botão final" value={d.projects.cta} onChange={(v) => up('projects', { cta: v })} />
      <p className="hint">Os nomes dos projetos também aparecem na faixa rolando logo abaixo do topo. A categoria define em qual filtro o projeto aparece (Onepage, Institucional, Landing Page, E-commerce).</p>
      <ObjList items={d.projects.items} onChange={(v) => up('projects', { items: v })} blank={{ name: '', cat: '', image: '', link: '' }} title={(i) => i.name}
        render={(i, set) => <><Field label="Nome" value={i.name} onChange={(v) => set({ name: v })} /><Field label="Categoria" value={i.cat} onChange={(v) => set({ cat: v })} /><Field label="Link do site" value={i.link} onChange={(v) => set({ link: v })} /><ImageField label="Imagem" value={i.image} onChange={(v) => set({ image: v })} /></>} /></>,
    about: <>
      <Field label="Nome" value={d.about.name} onChange={(v) => up('about', { name: v })} />
      <Field label="Função / cidade" value={d.about.role} onChange={(v) => up('about', { role: v })} />
      <ImageField label="Foto" value={d.about.photo} onChange={(v) => up('about', { photo: v })} />
      <Field area rows={4} label="Parágrafo 1" value={d.about.p1} onChange={(v) => up('about', { p1: v })} />
      <Field area label="Parágrafo 2" value={d.about.p2} onChange={(v) => up('about', { p2: v })} />
      <h4>Destaques</h4>
      <ObjList items={d.about.stats} onChange={(v) => up('about', { stats: v })} blank={{ title: '', text: '' }} title={(i) => i.title}
        render={(i, set) => <><Field label="Título" value={i.title} onChange={(v) => set({ title: v })} /><Field label="Texto" value={i.text} onChange={(v) => set({ text: v })} /></>} />
      <StringList label="Habilidades / tecnologias" list={d.about.skills} onChange={(v) => up('about', { skills: v })} /></>,
    brand: <>
      <Field label="Link do WhatsApp" value={d.brand.whatsapp} onChange={(v) => up('brand', { whatsapp: v })} />
      <Field label="Telefone exibido" value={d.brand.phone} onChange={(v) => up('brand', { phone: v })} />
      <Field label="Instagram" value={d.brand.instagram} onChange={(v) => up('brand', { instagram: v })} />
      <Field label="LinkedIn" value={d.brand.linkedin} onChange={(v) => up('brand', { linkedin: v })} /></>,
    settings: <>
      <p className="hint">O conteúdo é salvo no Supabase e aparece para todos os visitantes. O backup em JSON é opcional.</p>
      <div className="row"><button className="pri" onClick={exp}>Exportar JSON</button>
        <button onClick={() => fileRef.current.click()}>Importar JSON</button>
        <input ref={fileRef} type="file" accept=".json" hidden onChange={(e) => e.target.files[0] && imp(e.target.files[0])} />
        <button className="danger" onClick={() => confirm('Carregar o conteúdo original no editor? (só vale depois de salvar)') && setDraft(defaultContents())}>Carregar conteúdo original</button></div>
      <h4>Alterar senha do admin</h4>
      <form onSubmit={async (e) => { e.preventDefault(); const v = e.target.pw.value; if (v.length < 6) return alert('Mínimo 6 caracteres'); const { error } = await supabase.auth.updateUser({ password: v }); alert(error ? error.message : 'Senha alterada'); e.target.reset() }}>
        <div className="li"><input name="pw" type="password" placeholder="Nova senha" /><button className="pri">Salvar senha</button></div></form></>,
  }

  return (<div className="admin">
    <aside><b>GPRETO<sup>®</sup><small>Admin</small></b>
      {Object.entries(tabs).map(([k, v]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{v}</button>)}
      <a href="#/" target="_blank">Ver site ↗</a>
      <button onClick={() => supabase.auth.signOut()}>Sair ({email})</button></aside>
    <main><div className="bar"><h2>{tabs[tab]}</h2><div className="langtab">{['pt', 'en'].map((x) => <button key={x} className={lang === x ? 'on' : ''} onClick={() => setLangTab(x)}>{x === 'pt' ? '🇧🇷 Português' : '🇺🇸 English'}</button>)}</div>
      <span>{saved && <em>✓ Salvo</em>}{dirty && <button onClick={() => setDraft(null)}>Descartar</button>}
        <button className="pri" disabled={!dirty} onClick={save}>Salvar alterações</button></span></div>
      <div className="panel">{panels[tab]}</div></main></div>)
}

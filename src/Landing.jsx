import { useState } from 'react'
import { useContent, useLang, setLang } from './store'
import Hero3D from './components/Hero3D'
import Reveal from './components/Reveal'

const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
const url = (l) => (/^https?:\/\//.test(l) ? l : 'https://' + l)

export default function Landing() {
  const c = useContent()
  const lang = useLang()
  const [open, setOpen] = useState(0)
  const { brand: b, hero, hello, services, projects, about, faq, contact } = c
  const ids = ['servicos', 'projetos', 'sobre', 'faq']
  return (
    <div id="top">
      <div className="edge top" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="edge bottom" aria-hidden="true"><i /><i /><i /><i /></div>
      <header><div className="pill">
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }) }}><img src={b.logo} alt="GPRETO" className="logo" /></a>
        <nav>{c.nav.map((n, i) => <a key={i} href={'#' + ids[i]} onClick={go(ids[i])}>{n}</a>)}</nav>
        <a className="btn sm" href="#contato" onClick={go('contato')}>{b.navCta}</a>
        <div className="lang" role="group" aria-label="Language">{['pt', 'en'].map((x) => <button key={x} className={lang === x ? 'on' : ''} onClick={() => setLang(x)}>{x.toUpperCase()}</button>)}</div>
      </div></header>

      <section className="hero">
        {hero.animation3d && <Hero3D />}
        <span className="badge"><b />{hero.badge}</span>
        <h1>{hero.title} <span className="serif">{hero.titleItalic}</span></h1>
        <p className="lead">{hero.lead}</p>
        <div className="row"><a className="btn" href={b.whatsapp}>{hero.cta1}</a><a className="btn light" href="#projetos" onClick={go('projetos')}>{hero.cta2}</a></div>
      </section>

      <div className="marquee" aria-label={projects.title}>
        <div className="track">{[...projects.items, ...projects.items].map((p, i) => (
          <div className="slide" key={i} aria-hidden={i >= projects.items.length}><img src={p.image} alt={i < projects.items.length ? p.name : ''} loading="lazy" /></div>
        ))}</div>
      </div>

      <section className="hello">
        <span className="serif" style={{ fontSize: 24, color: '#55534c' }}>{hello.greeting}</span>
        <Reveal as="p">{hello.text}</Reveal>
        <div className="tags">{hello.tags.map((t, i) => <Reveal as="span" key={i} delay={i * 50}>{t}</Reveal>)}</div>
      </section>

      <section id="servicos" className="wrap">
        <Reveal className="head"><span className="serif">{services.eyebrow}</span><h2>{services.title}</h2><p className="lead">{services.lead}</p></Reveal>
        <div className="cards">{services.items.map((s, i) => (
          <Reveal className="card" key={i} delay={i * 100}>
            <span className="n">{i + 1}</span>
            <div><h3>{s.title}</h3><p>{s.desc}</p></div>
            <ul>{s.bullets.map((x, j) => <li key={j}>{x}</li>)}</ul>
          </Reveal>))}</div>
      </section>

      <section id="projetos" className="wrap">
        <Reveal className="head"><span className="serif">{projects.eyebrow}</span><h2>{projects.title}</h2><p className="lead">{projects.lead}</p></Reveal>
        <div className="projs">{projects.items.map((p, i) => (
          <Reveal as="a" className="proj" key={i} delay={(i % 3) * 90} href={url(p.link)} target="_blank" rel="noopener">
            <div className="thumb"><img src={p.image} alt={p.name} loading="lazy" /></div>
            <div className="meta"><div><b>{p.name}</b><span>{p.cat}</span></div><i>↗</i></div>
          </Reveal>))}</div>
        <div className="row" style={{ marginTop: 40 }}><a className="btn" href="#contato" onClick={go('contato')}>{projects.cta}</a></div>
      </section>

      <section id="sobre" className="wrap">
        <Reveal className="about">
          <div className="ph"><img src={about.photo} alt={about.name} /></div>
          <div className="txt">
            <span className="serif" style={{ fontSize: 22, color: '#55534c' }}>{about.eyebrow}</span>
            <div style={{ display: 'grid', gap: 4 }}><h2>{about.name}</h2><span style={{ color: '#55534c' }}>{about.role}</span></div>
            <p>{about.p1}</p><p>{about.p2}</p>
            <div className="stats">{about.stats.map((s, i) => <div key={i}><b>{s.title}</b><span>{s.text}</span></div>)}</div>
            <div className="tags" style={{ justifyContent: 'flex-start' }}>{about.skills.map((s, i) => <span key={i}>{s}</span>)}</div>
          </div>
        </Reveal>
      </section>

      <section id="faq" className="wrap">
        <Reveal className="head"><span className="serif">{faq.eyebrow}</span><h2>{faq.title}</h2></Reveal>
        <div className="faqgrid">
          <Reveal className="cta"><h3>{faq.ctaTitle}</h3><a className="btn inv" style={{ justifySelf: 'start' }} href={b.whatsapp}>{faq.ctaButton}</a><small>{b.phone}</small></Reveal>
          <div className="faqs">{faq.items.map((f, i) => (
            <Reveal className={'faq' + (open === i ? ' open' : '')} key={i} delay={i * 60}>
              <button onClick={() => setOpen(open === i ? -1 : i)}><span>{f.q}</span><i>{open === i ? '−' : '+'}</i></button>
              <p>{f.a}</p>
            </Reveal>))}</div>
        </div>
      </section>

      <section id="contato" className="contact">
        <Reveal className="dark">
          <span className="serif">{contact.eyebrow}</span>
          <h2>{contact.title} <span className="serif" style={{ color: '#fff', fontSize: 'inherit' }}>{contact.titleItalic}</span></h2>
          <p>{contact.text}</p>
          <a className="btn inv" href={b.whatsapp} style={{ padding: '16px 26px' }}>{contact.button}</a>
          <div className="links">{[['Instagram', b.instagram], ['LinkedIn', b.linkedin], ['GitHub', b.github]].filter(([, u]) => u).map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener">{n}</a>)}</div>
          <div className="foot"><span>{b.footer}</span><span>{b.city}</span><a href="#top" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }) }}>{b.backToTop}</a></div>
        </Reveal>
      </section>
    </div>
  )
}

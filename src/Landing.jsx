import { useEffect, useRef, useState } from 'react'
import { useContent, useLang, setLang } from './store'
import useFx from './components/useFx'
import './landing.css'

const url = (l) => (/^https?:\/\//.test(l) ? l : 'https://' + l)
const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
const EMAIL = 'contato@gpreto.site'
const FILTERS = [/./, /one-?page/i, /institucional|corporate/i, /landing/i, /e-?commerce/i]
const serviceImg = ['./img/andreza.webp', './img/asksuite.webp', './img/mori.webp']
const cardTone = ['cream', 'red', 'aqua']

// textos que existem só no layout (não vêm do CMS)
const L = {
  pt: {
    loading: 'Carregando', tag: 'Design e soluções digitais', nav: [['sobre', 'Sobre'], ['servicos', 'Serviços'], ['portfolio', 'Projetos'], ['contato', 'Contato']],
    where: 'atendemos todo o Brasil', years: '20+ anos no mercado digital', h1: ['Sites que', 'fazem', 'marcas'], h1i: 'crescer.',
    heroP: 'Criação de sites e plataformas digitais para empresas e profissionais liberais — com qualidade, rapidez e design que converte.', see: ['Ver', 'projetos ↓'],
    about: 'Sobre a GPRETO', yearsL: 'Anos de experiência', yearsT: 'No mercado digital, entregando resultados com qualidade e rapidez.', pills: ['Pontualidade', 'Criatividade', 'Suporte técnico'],
    founder: 'Conheça o fundador', edus: [['Análise e Desenvolvimento de Sistemas', 'Senac/SP, 2024'], ['Fotografia', 'Belas Artes/SP, 2016'], ['Processamento de Dados', 'Escola de Engenharia Eletromecânica da Bahia, 1993']],
    serv: 'Serviços', techs: 'Tecnologias dominadas', proj: 'Projetos', visit: 'Visitar', filters: ['Todos', 'Onepage', 'Institucional', 'Landing Page', 'E-commerce'],
    contactTag: 'Fale com a GPRETO', c1: 'Vamos criar', c2: 'juntos?', wa: ['Chamar no', 'WhatsApp ↗'],
    contactP: 'Tem um projeto em mente ou precisa de soluções digitais? Estamos prontos para ouvir você e transformar suas ideias em realidade.', phone: 'Telefone / WhatsApp', mail: 'E-mail', insta: 'Instagram', follow: 'Seguir ↗',
    send: 'Envie sua mensagem', name: 'Nome completo', email: 'E-mail', subject: 'Assunto', msg: 'Mensagem', pName: 'Ex: João da Silva', pEmail: 'Ex: joao@email.com', pSubject: 'Ex: Orçamento para Landing Page', pMsg: 'Descreva seu projeto ou dúvida...',
    submit: 'Enviar agora →', sent: 'Abrimos seu app de e-mail com a mensagem pronta. Obrigado!', dflt: 'Contato pelo site', top: 'Voltar ao topo ↑',
    footNav: [['inicio', 'Início'], ['sobre', 'Sobre'], ['servicos', 'Serviços'], ['portfolio', 'Projetos'], ['contato', 'Contato']],
    rights: '© 2026 GPRETO Design e Soluções Digitais. Todos os direitos reservados.', credit: 'Desenvolvido com ♥ pela GPRETO.',
  },
  en: {
    loading: 'Loading', tag: 'Design and digital solutions', nav: [['sobre', 'About'], ['servicos', 'Services'], ['portfolio', 'Projects'], ['contato', 'Contact']],
    where: 'serving all of Brazil', years: '20+ years in the digital market', h1: ['Sites that', 'make', 'brands'], h1i: 'grow.',
    heroP: 'Websites and digital platforms for companies and independent professionals — with quality, speed and design that converts.', see: ['See', 'projects ↓'],
    about: 'About GPRETO', yearsL: 'Years of experience', yearsT: 'In the digital market, delivering results with quality and speed.', pills: ['Punctuality', 'Creativity', 'Technical support'],
    founder: 'Meet the founder', edus: [['Systems Analysis and Development', 'Senac/SP, 2024'], ['Photography', 'Belas Artes/SP, 2016'], ['Data Processing', 'Escola de Engenharia Eletromecânica da Bahia, 1993']],
    serv: 'Services', techs: 'Technologies', proj: 'Projects', visit: 'Visit', filters: ['All', 'One-page', 'Corporate', 'Landing page', 'E-commerce'],
    contactTag: 'Talk to GPRETO', c1: "Let's build", c2: 'together?', wa: ['Chat on', 'WhatsApp ↗'],
    contactP: 'Have a project in mind or need digital solutions? We are ready to listen and turn your ideas into reality.', phone: 'Phone / WhatsApp', mail: 'E-mail', insta: 'Instagram', follow: 'Follow ↗',
    send: 'Send a message', name: 'Full name', email: 'E-mail', subject: 'Subject', msg: 'Message', pName: 'E.g. John Smith', pEmail: 'E.g. john@email.com', pSubject: 'E.g. Quote for a landing page', pMsg: 'Describe your project or question...',
    submit: 'Send now →', sent: 'We opened your e-mail app with the message ready. Thank you!', dflt: 'Website contact', top: 'Back to top ↑',
    footNav: [['inicio', 'Home'], ['sobre', 'About'], ['servicos', 'Services'], ['portfolio', 'Projects'], ['contato', 'Contact']],
    rights: '© 2026 GPRETO Design and Digital Solutions. All rights reserved.', credit: 'Built with ♥ by GPRETO.',
  },
}

function Loader({ label, onDone }) {
  const [n, setN] = useState(0), [out, setOut] = useState(false), [gone, setGone] = useState(false)
  useEffect(() => {
    const t0 = performance.now(); let raf, t1, t2
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1500)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else { setOut(true); t1 = setTimeout(onDone, 450); t2 = setTimeout(() => setGone(true), 1100) }
    }
    raf = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])
  if (gone) return null
  return (
    <div className={'gp-loader' + (out ? ' out' : '')}>
      <div><span>GPRETO®</span><span>Design e soluções digitais</span></div>
      <div><span className="num">{String(n).padStart(3, '0')}</span><span className="lb">{label}</span></div>
    </div>
  )
}

export default function Landing() {
  const c = useContent()
  const lang = useLang()
  const t = L[lang] || L.pt
  const { brand: b, services, projects, about } = c
  const root = useRef(null)
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [ready, setReady] = useState(reduce)
  const [filter, setFilter] = useState(0)
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' })
  const [sent, setSent] = useState(false)
  useFx(root)
  const onField = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setSent(false) }
  const submit = (e) => {
    e.preventDefault()
    const body = `${t.name}: ${form.nome}\n${t.email}: ${form.email}\n\n${form.mensagem}`
    window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(form.assunto || t.dflt)}&body=${encodeURIComponent(body)}`, '_blank')
    setSent(true)
  }
  const list = projects.items.filter((p) => FILTERS[filter].test(p.cat))
  const names = projects.items.map((p) => p.name)
  const techs = about.skills
  const stat0 = about.stats[0]?.title || '20+'
  const heroImg = (projects.items[3] || projects.items[0] || {}).image
  const hero = (i) => ({ 'data-hero': 1, style: { '--d': 450 + i * 90 } })
  const line = (i) => ({ 'data-line': 1, style: { '--d': 450 + i * 120 } })

  return (
    <div className={'gp' + (ready ? ' go' : '')} ref={root} id="top">
      <Loader label={t.loading} onDone={() => setReady(true)} />
      <div className="gp-prog" data-prog />

      <header className="gp-hdr" data-hdr>
        <div>
          <a href="#inicio" onClick={go('inicio')} data-mag>GPRETO®</a>
          <nav>
            {t.nav.map(([id, l]) => <a key={id} href={'#' + id} onClick={go(id)}>{l}</a>)}
            <span className="lang">{['pt', 'en'].map((x) => <button key={x} className={lang === x ? 'on' : ''} onClick={() => setLang(x)}>{x.toUpperCase()}</button>)}</span>
          </nav>
        </div>
      </header>

      <section id="inicio" className="gp-hero">
        <div className="meta">
          <span {...hero(0)}>(01) {t.tag}</span>
          <span {...hero(1)}>{b.city} · {t.where}</span>
          <span {...hero(2)}>{t.years}</span>
        </div>
        <h1>
          <span className="ln"><span {...line(0)}>{t.h1[0]}</span></span>
          <span className="ln"><span {...line(1)} className="flex"><span className="pill">{heroImg && <img src={heroImg} alt="" />}</span>{t.h1[1]}</span></span>
          <span className="ln"><span {...line(2)}>{t.h1[2]} <i>{t.h1i}</i></span></span>
        </h1>
        <div className="foot">
          <p {...hero(3)}>{t.heroP}</p>
          <div {...hero(4)}><a href="#portfolio" onClick={go('portfolio')} data-mag className="round">{t.see[0]}<br />{t.see[1]}</a></div>
        </div>
      </section>

      <div className="gp-band">
        <div className="strip"><div data-marquee="1" className="mq">
          {[...names, ...names].map((n, i) => <span key={i}>{n}<em>✺</em></span>)}
        </div></div>
      </div>

      <section id="sobre" className="gp-about">
        <div className="in">
          <div className="st">
            <span data-rv="0" className="k">(02) {t.about}</span>
            <p data-statement>{about.p1.split(' ').map((w, i) => <span data-word key={i}>{w}</span>)}</p>
          </div>
          <div className="cols">
            <div data-rv="0" className="nv">
              <span className="k aq">{t.yearsL}</span>
              <div><span className="big"><span data-count={parseInt(stat0, 10) || 20}>{parseInt(stat0, 10) || 20}</span><i>+</i></span><span className="sm">{t.yearsT}</span></div>
            </div>
            <div data-rv="120" className="mid">
              <p className="lead">{about.p2}</p>
              <div className="chips">{t.pills.map((p) => <span key={p}>{p}</span>)}</div>
            </div>
            <div data-rv="240" className="aqua">
              <div className="fh">
                <div className="av"><img src={about.photo} alt={about.name} /></div>
                <div><span className="rd">{t.founder}</span><strong>{about.name}</strong><span className="mu">{about.role.split('·')[0].trim()}</span></div>
              </div>
              <div className="edu">{t.edus.map(([k, l], i) => <div key={i}><strong>{k}</strong><span>{l}</span></div>)}</div>
              {b.linkedin && <a href={b.linkedin} target="_blank" rel="noopener" data-mag className="gp-pill dk">LinkedIn ↗</a>}
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="gp-serv">
        <div className="sh">
          <h2 className="gp-h2"><span className="ln"><span data-rv="0" data-y="105%">{t.serv}<sup>(03)</sup></span></span></h2>
          <p data-rv="100">{services.lead}</p>
        </div>
        <div className="stack">
          {services.items.map((s, i) => (
            <article key={i} data-stack className={'card ' + cardTone[i % 3]} style={{ top: 100 + i * 24 }}>
              <div className="l">
                <div><span className="n">(0{i + 1})</span><h3>{s.title}</h3></div>
                <div><p>{s.desc}</p><div className="tg">{s.bullets.map((x, j) => <span key={j}>{x.replace(/\.$/, '')}</span>)}</div></div>
              </div>
              <div className="im"><div data-par><img src={serviceImg[i % 3]} alt={s.title} loading="lazy" /></div></div>
            </article>
          ))}
        </div>
      </section>

      <div className="gp-techs">
        <span className="k">{t.techs}</span>
        <div data-marquee="-0.7" className="mq">{[...techs, ...techs].map((k, i) => <span key={i}>{k}</span>)}</div>
      </div>

      <section id="portfolio" className="gp-proj">
        <div className="in">
          <div className="sh">
            <h2 className="gp-h2"><span className="ln"><span data-rv="0" data-y="105%">{t.proj}<sup>({String(list.length).padStart(2, '0')})</sup></span></span></h2>
            <div data-rv="100" className="flt">{t.filters.map((f, i) => <button key={f} className={filter === i ? 'on' : ''} onClick={() => setFilter(i)}>{f}</button>)}</div>
          </div>
          <div className="rows">
            {list.map((p, k) => (
              <div className="row" key={p.name}>
                <span className="fill" />
                <div className="rw">
                  <span className="rn">{String(k + 1).padStart(2, '0')}</span>
                  <div className="nm"><strong>{p.name}</strong><span className="th"><img src={p.image} alt={p.name} loading="lazy" /></span></div>
                  <div className="rr"><span>{p.cat}</span><a href={url(p.link)} target="_blank" rel="noopener" data-mag data-cur={t.visit} aria-label={p.name}>↗</a></div>
                </div>
              </div>
            ))}
          </div>
          <div className="gp-center"><a href="#contato" onClick={go('contato')} className="gp-pill red" data-mag>{projects.cta}</a></div>
        </div>
      </section>

      <section id="contato" className="gp-contact">
        <span data-rv="0" className="k aq">(05) {t.contactTag}</span>
        <h2 className="gp-h2 big">
          <span className="ln"><span data-rv="0" data-y="105%">{t.c1}</span></span>
          <span className="fl"><span className="ln"><span data-rv="120" data-y="105%" className="it">{t.c2}</span></span>
            <a href={b.whatsapp} target="_blank" rel="noopener" data-mag className="wa">{t.wa[0]}<br />{t.wa[1]}</a></span>
        </h2>
        <div className="cg">
          <div data-rv="0" className="cl">
            <p>{t.contactP}</p>
            <div className="ls">
              <a href={b.whatsapp} target="_blank" rel="noopener"><span>{t.phone}</span><strong>{b.phone}</strong></a>
              <a href={'mailto:' + EMAIL}><span>{t.mail}</span><strong>{EMAIL}</strong></a>
              {b.instagram && <a href={b.instagram} target="_blank" rel="noopener"><span>{t.insta}</span><strong>{t.follow}</strong></a>}
            </div>
          </div>
          <form data-rv="150" onSubmit={submit}>
            <strong className="ft">{t.send}</strong>
            <div className="two">
              <label>{t.name}<input name="nome" value={form.nome} onChange={onField} placeholder={t.pName} required /></label>
              <label>{t.email}<input name="email" type="email" value={form.email} onChange={onField} placeholder={t.pEmail} required /></label>
            </div>
            <label>{t.subject}<input name="assunto" value={form.assunto} onChange={onField} placeholder={t.pSubject} /></label>
            <label>{t.msg}<textarea name="mensagem" rows="5" value={form.mensagem} onChange={onField} placeholder={t.pMsg} required /></label>
            <button type="submit">{t.submit}</button>
            <span className="note">{sent ? t.sent : ''}</span>
          </form>
        </div>
      </section>

      <footer>
        <div className="fi">
          <div className="fn">
            <nav>{t.footNav.map(([id, l]) => <a key={id} href={'#' + id} onClick={go(id)}>{l}</a>)}</nav>
            <a href="#inicio" onClick={go('inicio')} data-mag className="up">{t.top}</a>
          </div>
          <div className="lt">{'GPRETO'.split('').map((ch, i) => <span className="ln" key={i}><span data-rv={i * 70} data-y="105%">{ch}</span></span>)}</div>
          <div className="fb"><span>{t.rights}</span><span>{t.credit}</span></div>
        </div>
      </footer>
    </div>
  )
}

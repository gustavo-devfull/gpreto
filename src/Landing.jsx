import { useState } from 'react'
import { useContent, useLang, setLang } from './store'
import './landing.css'

const url = (l) => (/^https?:\/\//.test(l) ? l : 'https://' + l)
const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
const EMAIL = 'contato@gpreto.site'

// textos que existem só no layout (não vêm do CMS)
const L = {
  pt: {
    tag: 'Design e soluções digitais', nav: [['sobre', 'Sobre nós'], ['servicos', 'Serviços'], ['portfolio', 'Portfólio'], ['contato', 'Contato']],
    budget: 'Solicite um orçamento', heroSub: 'Criação de sites e plataformas digitais para empresas e profissionais liberais.',
    years: '20+ anos no mercado', heroCard: 'Transformamos suas ideias em realidade digital com desenvolvimento web de alta qualidade e rapidez.', heroCta: 'Nossos serviços →',
    aboutTag: 'Sobre a GPRETO', aboutH: ['Presença digital', 'construída com', 'experiência'], founder: 'Conheça o fundador', edu: 'Formações',
    edus: [['Análise e Desenvolvimento de Sistemas', 'Senac/SP, 2024'], ['Fotografia', 'Belas Artes/SP, 2016'], ['Processamento de Dados', 'Escola de Engenharia Eletromecânica da Bahia, 1993']],
    servH: ['Nossos', 'serviços'], more: 'Saiba mais ↗', techs: 'Tecnologias dominadas', portH: ['Nosso', 'portfólio'], visit: 'Visitar site ↗',
    filters: ['Todos', 'Onepage', 'Institucional', 'Landing Page', 'E-commerce'],
    contactTag: 'Fale com a GPRETO', contactH: ['Vamos criar', 'juntos'], contactP: 'Tem um projeto incrível em mente ou precisa de soluções digitais? Estamos prontos para ouvir você e transformar suas ideias em realidade!',
    phone: 'Telefone / WhatsApp', mail: 'E-mail principal', loc: 'Localização', locV: 'Atendemos todo o Brasil', insta: 'Siga no Instagram',
    send: 'Envie sua mensagem', name: 'Seu nome completo', email: 'Seu melhor e-mail', subject: 'Assunto principal', msg: 'Sua mensagem detalhada',
    pName: 'Ex: João da Silva', pEmail: 'Ex: joao.silva@email.com', pSubject: 'Ex: Orçamento para Landing Page', pMsg: 'Descreva seu projeto ou dúvida aqui...',
    submit: 'Enviar agora →', sent: 'Abrimos seu app de e-mail com a mensagem pronta. Obrigado!', dflt: 'Contato pelo site',
    footNav: [['inicio', 'Início'], ['sobre', 'Sobre nós'], ['servicos', 'Serviços'], ['portfolio', 'Portfólio'], ['contato', 'Contato']],
    rights: '© 2026 GPRETO Design e Soluções Digitais. Todos os direitos reservados.', credit: 'Desenvolvido em React com ♥ pela GPRETO.',
  },
  en: {
    tag: 'Design and digital solutions', nav: [['sobre', 'About'], ['servicos', 'Services'], ['portfolio', 'Portfolio'], ['contato', 'Contact']],
    budget: 'Request a quote', heroSub: 'Websites and digital platforms for companies and independent professionals.',
    years: '20+ years in the market', heroCard: 'We turn your ideas into digital reality with high-quality, fast web development.', heroCta: 'Our services →',
    aboutTag: 'About GPRETO', aboutH: ['Digital presence', 'built with', 'experience'], founder: 'Meet the founder', edu: 'Education',
    edus: [['Systems Analysis and Development', 'Senac/SP, 2024'], ['Photography', 'Belas Artes/SP, 2016'], ['Data Processing', 'Escola de Engenharia Eletromecânica da Bahia, 1993']],
    servH: ['Our', 'services'], more: 'Learn more ↗', techs: 'Technologies', portH: ['Our', 'portfolio'], visit: 'Visit site ↗',
    filters: ['All', 'One-page', 'Corporate', 'Landing page', 'E-commerce'],
    contactTag: 'Talk to GPRETO', contactH: ["Let's build", 'together'], contactP: 'Have a great project in mind or need digital solutions? We are ready to listen and turn your ideas into reality!',
    phone: 'Phone / WhatsApp', mail: 'Main e-mail', loc: 'Location', locV: 'Serving all of Brazil', insta: 'Follow on Instagram',
    send: 'Send a message', name: 'Your full name', email: 'Your best e-mail', subject: 'Subject', msg: 'Your detailed message',
    pName: 'E.g. John Smith', pEmail: 'E.g. john.smith@email.com', pSubject: 'E.g. Quote for a landing page', pMsg: 'Describe your project or question here...',
    submit: 'Send now →', sent: 'We opened your e-mail app with the message ready. Thank you!', dflt: 'Website contact',
    footNav: [['inicio', 'Home'], ['sobre', 'About'], ['servicos', 'Services'], ['portfolio', 'Portfolio'], ['contato', 'Contact']],
    rights: '© 2026 GPRETO Design and Digital Solutions. All rights reserved.', credit: 'Built with React and ♥ by GPRETO.',
  },
}
const FILTERS = [/./, /one-?page/i, /institucional|corporate/i, /landing/i, /e-?commerce/i]
const serviceImg = ['./img/andreza.webp', './img/asksuite.webp', './img/mori.webp']

export default function Landing() {
  const c = useContent()
  const lang = useLang()
  const t = L[lang] || L.pt
  const { brand: b, services, projects, about } = c
  const [open, setOpen] = useState(0)
  const [filter, setFilter] = useState(0)
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' })
  const [sent, setSent] = useState(false)
  const onField = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setSent(false) }
  const submit = (e) => {
    e.preventDefault()
    const body = `${t.name}: ${form.nome}\n${t.email}: ${form.email}\n\n${form.mensagem}`
    window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(form.assunto || t.dflt)}&body=${encodeURIComponent(body)}`, '_blank')
    setSent(true)
  }
  const list = projects.items.filter((p) => FILTERS[filter].test(p.cat)).map((p, k) => ({ ...p, wide: k % 5 === 2, ratio: k % 5 === 2 ? '16/8' : k % 2 ? '4/5' : '1/1' }))
  const names = projects.items.map((p) => p.name)
  const stat0 = about.stats[0] || { title: '20+', text: '' }
  const stat1 = about.stats[1] || { title: '', text: '' }

  return (
    <div className="g5" id="top">
      <section id="inicio" className="g5-hero">
        <header>
          <a href="#inicio" onClick={go('inicio')} className="g5-logo">GPRETO<sup>®</sup></a>
          <nav>{t.nav.map(([id, l]) => <a key={id} href={'#' + id} onClick={go(id)}>{l}</a>)}</nav>
          <div className="g5-hr">
            <div className="g5-lang">{['pt', 'en'].map((x) => <button key={x} className={lang === x ? 'on' : ''} onClick={() => setLang(x)}>{x.toUpperCase()}</button>)}</div>
            <a href="#contato" onClick={go('contato')} className="g5-pill white">{t.budget}</a>
          </div>
        </header>
        <div className="g5-ghost" aria-hidden="true">GPRETO</div>
        <div className="g5-hero-body">
          <div className="g5-portrait"><img src={about.photo} alt={about.name} /></div>
          <div className="g5-hero-txt">
            <span className="g5-eye"><i />{t.tag}</span>
            <h1>GPRETO</h1>
            <p>{t.heroSub}</p>
          </div>
          <div className="g5-hero-card">
            <span>{t.years}</span>
            <p>{t.heroCard}</p>
            <a href="#servicos" onClick={go('servicos')} className="g5-pill orange">{t.heroCta}</a>
          </div>
        </div>
      </section>

      <div className="g5-ticker" aria-hidden="true">
        <div>{[...names, ...names].map((n, i) => <span key={i}>{n}<em>✺</em></span>)}</div>
      </div>

      <section id="sobre" className="g5-sec">
        <span className="g5-tag">{t.aboutTag}</span>
        <h2 className="g5-h2"><b>{t.aboutH[0]}</b> <s>{t.aboutH[1]}</s> <b className="o">{t.aboutH[2]}</b></h2>
        <div className="g5-about">
          <div className="g5-about-txt">
            <p className="lead">{about.p1}</p>
            <p>{about.p2}</p>
          </div>
          <div className="g5-stats">
            <div className="white"><span className="g5-num">{stat0.title.match(/\d+/)?.[0] || '20'}<i>+</i></span><div><strong>{stat0.title.replace(/^\d+\+?\s*/, '') || stat0.title}</strong><span>{stat0.text}</span></div></div>
            <div className="dark"><span className="g5-check">✓</span><div><strong>{stat1.title}</strong><span>{stat1.text}</span></div></div>
          </div>
          <div className="g5-founder">
            <div className="g5-fh">
              <div className="g5-avatar"><img src={about.photo} alt={about.name} /></div>
              <div><span className="k">{t.founder}</span><strong>{about.name}</strong><span className="r">{about.role.split('·')[0].trim()}</span></div>
            </div>
            <div className="g5-edu"><span className="k">{t.edu}</span>{t.edus.map(([k, l], i) => <div key={i}><strong>{k}</strong><span>{l}</span></div>)}</div>
            {b.linkedin && <a className="g5-pill dark" href={b.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>}
          </div>
        </div>
      </section>

      <section id="servicos" className="g5-services">
        <div className="g5-inner">
          <div className="g5-sh"><h2 className="g5-h2"><b>{t.servH[0]}</b><br /><s>{t.servH[1]}</s></h2><p>{services.lead}</p></div>
          <div className="g5-acc">
            {services.items.map((s, i) => {
              const on = open === i
              return (
                <div key={i} className="g5-row">
                  <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                    <span className="n">(0{i + 1})</span><span className="tt">{s.title}</span><span className={'pm' + (on ? ' on' : '')}>{on ? '−' : '+'}</span>
                  </button>
                  {on && (
                    <div className="g5-open">
                      <div>
                        <p>{s.desc}</p>
                        <div className="g5-tags">{s.bullets.map((x, j) => <span key={j}>{x.replace(/\.$/, '')}</span>)}</div>
                        <a href="#contato" onClick={go('contato')} className="g5-ul">{t.more}</a>
                      </div>
                      <div className="g5-img"><img src={serviceImg[i % serviceImg.length]} alt={s.title} loading="lazy" /></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="g5-techs"><span>{t.techs}</span><div>{about.skills.map((s, i) => <em key={i}>{s}</em>)}</div></div>
        </div>
      </section>

      <section id="portfolio" className="g5-sec">
        <div className="g5-sh"><h2 className="g5-h2"><b>{t.portH[0]}</b><br /><s>{t.portH[1]}<i>.</i></s></h2><p>{projects.lead}</p></div>
        <div className="g5-filters">{t.filters.map((f, i) => <button key={f} className={filter === i ? 'on' : ''} onClick={() => setFilter(i)}>{f}</button>)}</div>
        <div className="g5-projs">
          {list.map((p) => (
            <article key={p.name} className={p.wide ? 'wide' : ''}>
              <div className="g5-pimg" style={{ aspectRatio: p.ratio }}><img src={p.image} alt={p.name} loading="lazy" /></div>
              <div className="g5-pm">
                <div><strong>{p.name}</strong><span>{p.cat}</span></div>
                <a href={url(p.link)} target="_blank" rel="noopener" className="g5-pill outline">{t.visit}</a>
              </div>
            </article>
          ))}
        </div>
        <div className="g5-center"><a href="#contato" onClick={go('contato')} className="g5-pill orange lg">{projects.cta}</a></div>
      </section>

      <section id="contato" className="g5-contact-wrap">
        <div className="g5-contact">
          <div className="g5-cl">
            <span className="g5-tag light">{t.contactTag}</span>
            <h2 className="g5-h2"><b>{t.contactH[0]}</b><br /><s>{t.contactH[1]}</s></h2>
            <p>{t.contactP}</p>
            <div className="g5-lines">
              <a href={b.whatsapp} target="_blank" rel="noopener"><span>{t.phone}</span><strong>{b.phone}</strong></a>
              <a href={'mailto:' + EMAIL}><span>{t.mail}</span><strong>{EMAIL}</strong></a>
              <div><span>{t.loc}</span><strong>{t.locV}</strong></div>
              {b.instagram && <a href={b.instagram} target="_blank" rel="noopener"><span>{t.insta}</span><strong>↗</strong></a>}
            </div>
          </div>
          <form onSubmit={submit}>
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
        <div className="g5-fi">
          <div className="g5-fn">
            <nav>{t.footNav.map(([id, l]) => <a key={id} href={'#' + id} onClick={go(id)}>{l}</a>)}</nav>
            <a href={b.whatsapp} target="_blank" rel="noopener" className="ph">{b.phone}</a>
          </div>
          <div className="g5-big">GPRETO<sup>®</sup></div>
          <div className="g5-fb"><span>{t.rights}</span><span>{t.credit}</span></div>
        </div>
      </footer>
    </div>
  )
}

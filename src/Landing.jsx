import { useState } from 'react'
import { useContent, useLang, setLang } from './store'
import './landing.css'

const url = (l) => (/^https?:\/\//.test(l) ? l : 'https://' + l)
const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

// textos que existem só no layout (não vêm do CMS)
const L = {
  pt: {
    tag: 'Design e soluções digitais',
    nav: [['contato', 'Contato'], ['portfolio', 'Portfólio'], ['servicos', 'Serviços'], ['sobre', 'Sobre nós'], ['inicio', 'Início']],
    h1: ['Sites &', 'Plataformas', 'Digitais'], heroSub: 'Criação de sites e plataformas digitais para empresas e profissionais liberais.',
    quote: 'Transformamos suas ideias em realidade digital com desenvolvimento web de alta qualidade, rapidez e mais de 20 anos de experiência no mercado.',
    inicio: 'INÍCIO', sobre: 'Sobre', servicos: 'Serviços', portfolio: 'Portfólio', company: 'Nossa empresa', founder: 'Conheça o fundador',
    edu: 'Formações', techs: 'Tecnologias dominadas', more: 'Saiba mais', visit: 'Visitar site', talk: 'Vamos conversar sobre seu projeto',
    transform: 'Transforme sua presença online!', budget: 'Solicite um orçamento', filters: ['Todos', 'Onepage', 'Institucional', 'Landing Page', 'E-commerce'],
    contactH: ['Fale com', 'a GPRETO'], contactP: 'Tem um projeto incrível em mente ou precisa de soluções digitais? Estamos prontos para ouvir você e transformar suas ideias em realidade!',
    send: 'Envie sua mensagem', name: 'Seu nome completo', email: 'Seu melhor e-mail', subject: 'Assunto principal', msg: 'Sua mensagem detalhada',
    pName: 'Ex: João da Silva', pEmail: 'Ex: joao.silva@email.com', pSubject: 'Ex: Orçamento para Landing Page', pMsg: 'Descreva seu projeto ou dúvida aqui...',
    submit: 'Enviar agora', sent: 'Abrimos seu app de e-mail com a mensagem pronta. Obrigado!', channels: 'Canais de contato', phone: 'Telefone / WhatsApp',
    mail: 'E-mail principal', loc: 'Localização', locV: 'Atendemos todo o Brasil', insta: 'Siga no Instagram', dflt: 'Contato pelo site',
    edus: [['Análise e Desenvolvimento de Sistemas', 'Senac/SP, 2024'], ['Fotografia', 'Belas Artes/SP, 2016'], ['Processamento de Dados', 'Escola de Engenharia Eletromecânica da Bahia, 1993']],
    credit: 'Desenvolvido em React com ♥ pela GPRETO.', rights: '© 2026 GPRETO Design e Soluções Digitais. Todos os direitos reservados.',
  },
  en: {
    tag: 'Design and digital solutions',
    nav: [['contato', 'Contact'], ['portfolio', 'Portfolio'], ['servicos', 'Services'], ['sobre', 'About'], ['inicio', 'Home']],
    h1: ['Websites &', 'Digital', 'Platforms'], heroSub: 'Websites and digital platforms for companies and independent professionals.',
    quote: 'We turn your ideas into digital reality with high-quality, fast web development and 20+ years of experience in the market.',
    inicio: 'HOME', sobre: 'About', servicos: 'Services', portfolio: 'Portfolio', company: 'Our company', founder: 'Meet the founder',
    edu: 'Education', techs: 'Technologies', more: 'Learn more', visit: 'Visit site', talk: "Let's talk about your project",
    transform: 'Transform your online presence!', budget: 'Request a quote', filters: ['All', 'One-page', 'Corporate', 'Landing page', 'E-commerce'],
    contactH: ['Talk to', 'GPRETO'], contactP: 'Have a great project in mind or need digital solutions? We are ready to listen and turn your ideas into reality!',
    send: 'Send a message', name: 'Your full name', email: 'Your best e-mail', subject: 'Subject', msg: 'Your detailed message',
    pName: 'E.g. John Smith', pEmail: 'E.g. john.smith@email.com', pSubject: 'E.g. Quote for a landing page', pMsg: 'Describe your project or question here...',
    submit: 'Send now', sent: 'We opened your e-mail app with the message ready. Thank you!', channels: 'Contact channels', phone: 'Phone / WhatsApp',
    mail: 'Main e-mail', loc: 'Location', locV: 'Serving all of Brazil', insta: 'Follow on Instagram', dflt: 'Website contact',
    edus: [['Systems Analysis and Development', 'Senac/SP, 2024'], ['Photography', 'Belas Artes/SP, 2016'], ['Data Processing', 'Escola de Engenharia Eletromecânica da Bahia, 1993']],
    credit: 'Built with React and ♥ by GPRETO.', rights: '© 2026 GPRETO Design and Digital Solutions. All rights reserved.',
  },
}
const FILTERS = [/./, /one-?page/i, /institucional|corporate/i, /landing/i, /e-?commerce/i]
const EMAIL = 'contato@gpreto.site'

const Diamond = () => <span className="lp-dia" />
const Bar = () => <span className="lp-bar" />

export default function Landing() {
  const c = useContent()
  const lang = useLang()
  const t = L[lang] || L.pt
  const { brand: b, services, projects, about, contact } = c
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
  const list = projects.items.map((p, i) => ({ ...p, n: String(i + 1).padStart(2, '0') })).filter((p) => FILTERS[filter].test(p.cat))
  const serviceImg = ['./img/andreza.webp', './img/asksuite.webp', './img/mori.webp']

  return (
    <div className="lp" id="top">
      <div className="lp-grid" aria-hidden="true"><span /><span /><span /><span /></div>

      <aside className="lp-side">
        {t.nav.map(([id, label]) => <a key={id} href={'#' + id} onClick={go(id)}>{label}</a>)}
      </aside>

      <header className="lp-head">
        <span className="lp-tag">{t.tag}</span>
        <div className="lp-head-r">
          <div className="lp-lang">{['pt', 'en'].map((x) => <button key={x} className={lang === x ? 'on' : ''} onClick={() => setLang(x)}>{x.toUpperCase()}</button>)}</div>
          <a href="#inicio" onClick={go('inicio')} className="lp-logo">GPRETO</a>
        </div>
      </header>

      <main>
        <section id="inicio" className="lp-sec lp-hero">
          <div className="lp-vert lp-vert-r">{t.inicio}</div>
          <div className="lp-hero-body">
            <p className="lp-quote">{t.quote}</p>
            <div className="lp-h1wrap">
              <div className="lp-box" />
              <h1>{t.h1[0]}<br />{t.h1[1]}<br />{t.h1[2]}</h1>
              <p className="lp-sub">{t.heroSub}</p>
            </div>
            <div className="lp-hero-foot">
              <div className="lp-btns">
                <a className="lp-btn solid" href="#contato" onClick={go('contato')}>{t.budget}</a>
                <a className="lp-btn line" href="#servicos" onClick={go('servicos')}>{t.nav[2][1]}</a>
              </div>
              <span className="lp-num">01<sup>/05</sup></span>
            </div>
          </div>
        </section>

        <section id="sobre" className="lp-sec lp-about">
          <div className="lp-about-main">
            <div className="lp-intro"><Bar /><p>{about.p1}</p></div>
            <div className="lp-about-cols">
              <div className="lp-col">
                <h3><span>+</span>{t.company}</h3>
                <p className="lp-txt">{about.p2}</p>
                <div className="lp-stats">
                  {about.stats.map((s, i) => (
                    <div key={i}>{i === 0 ? <span className="lp-big">{s.title.match(/\d+\+?/)?.[0] || s.title}</span> : <span className="lp-dia big" />}<strong>{s.title.replace(/^\d+\+?\s*/, '') || s.title}</strong><span>{s.text}</span></div>
                  ))}
                </div>
              </div>
              <div className="lp-col gap">
                <div className="lp-founder">
                  <div className="lp-photo"><img src={about.photo} alt={about.name} /><i /></div>
                  <div className="lp-fin">
                    <span className="lp-kicker">{t.founder}</span>
                    <strong>{about.name}</strong>
                    <span className="lp-role">{about.role.split('·')[0].trim()}</span>
                    {b.linkedin && <a className="lp-mini" href={b.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>}
                  </div>
                </div>
                <div className="lp-block">
                  <span className="lp-kicker">{t.edu}</span>
                  {t.edus.map(([k, l], i) => <div className="lp-li" key={i}><Diamond /><span><strong>{k}</strong> <em>— {l}</em></span></div>)}
                </div>
                <div className="lp-block">
                  <span className="lp-kicker">{t.techs}</span>
                  <div className="lp-chips">{about.skills.map((s, i) => <span key={i}>{s}</span>)}</div>
                </div>
              </div>
            </div>
            <a className="lp-btn line self" href="#contato" onClick={go('contato')}>{t.talk}</a>
          </div>
          <div className="lp-vert">{t.sobre}</div>
        </section>

        <section id="servicos" className="lp-services">
          <div className="lp-inner">
            <div className="lp-sec-head">
              <h2>{t.servicos}</h2>
              <div className="lp-intro"><Bar /><p className="lp-txt">{services.lead}</p></div>
            </div>
            <div className="lp-cells">
              {services.items.map((s, i) => (
                <div className="lp-cell" key={i}>
                  <span className="lp-cn">{String(i + 1).padStart(2, '0')}<sup>/{String(services.items.length).padStart(2, '0')}</sup></span>
                  <h3>{s.title}</h3>
                  <p className="lp-txt">{s.desc}</p>
                  <div className="lp-bul">{s.bullets.map((x, j) => <span key={j}><Diamond />{x}</span>)}</div>
                  <div className="lp-shot"><img src={serviceImg[i % serviceImg.length]} alt={s.title} loading="lazy" /></div>
                  <a className="lp-btn ghost" href="#contato" onClick={go('contato')}>{t.more} ↗</a>
                </div>
              ))}
            </div>
            <div className="lp-center"><a className="lp-btn solid" href="#contato" onClick={go('contato')}>{t.transform}</a></div>
          </div>
        </section>

        <section id="portfolio" className="lp-sec lp-port">
          <div className="lp-vert lp-vert-r">{t.portfolio}</div>
          <div className="lp-port-body">
            <div className="lp-port-top">
              <div className="lp-intro"><Bar /><p className="lp-txt">{projects.lead}</p></div>
              <div className="lp-filters">{t.filters.map((f, i) => <button key={f} className={filter === i ? 'on' : ''} onClick={() => setFilter(i)}>{f}</button>)}</div>
            </div>
            <div className="lp-projs">
              {list.map((p) => (
                <article key={p.name}>
                  <div className="lp-pimg"><img src={p.image} alt={p.name} loading="lazy" /></div>
                  <div className="lp-pmeta">
                    <span className="lp-pcat">{p.cat}</span>
                    <div><h3>{p.name}</h3><span className="lp-pn">{p.n}</span></div>
                    <a className="lp-mini" href={url(p.link)} target="_blank" rel="noopener">{t.visit} ↗</a>
                  </div>
                </article>
              ))}
            </div>
            <a className="lp-btn solid self-c" href="#contato" onClick={go('contato')}>{projects.cta}</a>
          </div>
        </section>

        <section id="contato" className="lp-contact">
          <div className="lp-inner">
            <h2>{t.contactH[0]}<br />{t.contactH[1]}</h2>
            <p className="lp-cp">{t.contactP}</p>
            <div className="lp-cgrid">
              <form onSubmit={submit}>
                <strong>{t.send}</strong>
                <div className="lp-two">
                  <label>{t.name}<input name="nome" value={form.nome} onChange={onField} placeholder={t.pName} required /></label>
                  <label>{t.email}<input name="email" type="email" value={form.email} onChange={onField} placeholder={t.pEmail} required /></label>
                </div>
                <label>{t.subject}<input name="assunto" value={form.assunto} onChange={onField} placeholder={t.pSubject} /></label>
                <label>{t.msg}<textarea name="mensagem" rows="5" value={form.mensagem} onChange={onField} placeholder={t.pMsg} required /></label>
                <button type="submit">{t.submit} →</button>
                <span className="lp-note">{sent ? t.sent : ''}</span>
              </form>
              <div className="lp-chan">
                <strong>{t.channels}</strong>
                <div><span>{t.phone}</span><a href={b.whatsapp} target="_blank" rel="noopener">{b.phone}</a></div>
                <div><span>{t.mail}</span><a href={'mailto:' + EMAIL}>{EMAIL}</a></div>
                <div><span>{t.loc}</span><em>{t.locV}</em></div>
                {b.instagram && <a className="lp-insta" href={b.instagram} target="_blank" rel="noopener">{t.insta} <span>↗</span></a>}
              </div>
            </div>
            <footer><span>{t.rights}</span><span>{t.credit}</span></footer>
          </div>
        </section>
      </main>
    </div>
  )
}

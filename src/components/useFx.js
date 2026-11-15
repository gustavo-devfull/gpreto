import { useEffect } from 'react'

// Efeitos do site: reveal on scroll, contador, marquee com inércia do scroll, texto que acende,
// parallax, cards empilhados, botões magnéticos, cursor customizado, barra de progresso e header que esconde.
export default function useFx(rootRef) {
  useEffect(() => {
    const R = rootRef.current
    if (!R) return
    const fine = matchMedia('(pointer:fine)').matches
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cl = (n) => Math.max(0, Math.min(1, n))
    let marqs = [], words = [], stmt = null, pars = [], stack = []

    // reveal
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return
      const el = e.target.__rvT || e.target
      el.style.transitionDelay = (el.dataset.rv || 0) + 'ms'
      el.classList.add('in'); io.unobserve(e.target)
    }), { threshold: 0.12 })
    // contador
    const io2 = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return
      const el = e.target, to = +el.dataset.count, t0 = performance.now()
      const f = (n) => { const p = Math.min(1, (n - t0) / 1600); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f) }
      requestAnimationFrame(f); io2.unobserve(el)
    }), { threshold: 0.5 })

    const scan = () => {
      R.querySelectorAll('[data-rv]:not(.in)').forEach((el) => {
        if (el.__rv) return; el.__rv = 1
        if (el.dataset.y && el.parentElement) { el.parentElement.__rvT = el; io.observe(el.parentElement) } else io.observe(el)
      })
      R.querySelectorAll('[data-count]').forEach((el) => { if (!el.__c) { el.__c = 1; io2.observe(el) } })
      marqs = [...R.querySelectorAll('[data-marquee]')].map((el) => el.__m || (el.__m = { el, x: 0, s: +el.dataset.marquee }))
      words = [...R.querySelectorAll('[data-word]')]
      stmt = R.querySelector('[data-statement]')
      pars = [...R.querySelectorAll('[data-par]')]
      stack = [...R.querySelectorAll('[data-stack]')]
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(R, { childList: true, subtree: true })

    // cursor
    let cur = null
    if (fine) {
      const el = document.createElement('div'); el.className = 'gp-cursor'; document.body.appendChild(el)
      cur = { el, x: -100, y: -100, tx: -100, ty: -100, mode: '' }
    }
    const setMode = (mode, label) => {
      if (!cur || cur.mode === mode + label) return
      cur.mode = mode + label
      cur.el.dataset.mode = mode; cur.el.textContent = mode === 'label' ? label : ''
    }
    let mag = null
    const onMove = (e) => {
      const t = e.target && e.target.closest ? e.target : null
      if (cur) {
        cur.tx = e.clientX; cur.ty = e.clientY
        const lab = t && t.closest('[data-cur]')
        if (lab) setMode('label', lab.dataset.cur)
        else if (t && t.closest('a,button,input,textarea,label')) setMode('link', '')
        else setMode('', '')
      }
      const m = t && t.closest('[data-mag]')
      if (mag && mag !== m) { mag.style.transform = ''; mag = null }
      if (m) {
        const r = m.getBoundingClientRect()
        m.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.3}px,0)`
        mag = m
      }
    }
    addEventListener('pointermove', onMove, { passive: true })

    // loop
    let raf, lastY = scrollY, vel = 0, hidden = false
    const hdr = R.querySelector('[data-hdr]'), prog = R.querySelector('[data-prog]')
    const frame = () => {
      const y = scrollY, v = y - lastY, H = innerHeight; lastY = y
      vel += (v - vel) * 0.12
      if (hdr) {
        const hide = y > 160 && v > 1
        if (hide !== hidden && (hide || v < -1 || y <= 160)) { hidden = hide; hdr.style.transform = hide ? 'translate3d(0,-110%,0)' : 'none' }
      }
      if (prog) prog.style.transform = `scaleX(${cl(y / Math.max(1, document.documentElement.scrollHeight - H))})`
      if (!reduce) marqs.forEach((m) => {
        const w = m.el.scrollWidth / 2; if (!w) return
        const dir = Math.sign(m.s) * (vel < -0.5 ? -1 : 1)
        m.x -= (Math.abs(m.s) + Math.min(Math.abs(vel) * 0.35, 14)) * dir
        if (m.x <= -w) m.x += w
        if (m.x > 0) m.x -= w
        m.el.style.transform = `translate3d(${m.x}px,0,0)`
      })
      if (stmt && words.length) {
        const r = stmt.getBoundingClientRect()
        const p = cl((H * 0.85 - r.top) / (r.height + H * 0.3)), n = words.length
        words.forEach((w, i) => { const o = i / n < p ? '1' : '0.16'; if (w.style.opacity !== o) w.style.opacity = o })
      }
      if (!reduce) pars.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < 0 || r.top > H) return
        el.style.transform = `translate3d(0,${((r.top + r.height / 2 - H / 2) / H) * -50}px,0)`
      })
      stack.forEach((c, i) => {
        const nx = stack[i + 1]; if (!nx) return
        const top = 100 + i * 24, r = nx.getBoundingClientRect()
        const p = cl((H - r.top) / (H - top))
        c.style.transform = `scale(${1 - p * 0.06})`; c.style.filter = `brightness(${1 - p * 0.4})`
      })
      if (cur) {
        cur.x += (cur.tx - cur.x) * 0.2; cur.y += (cur.ty - cur.y) * 0.2
        cur.el.style.transform = `translate3d(${cur.x}px,${cur.y}px,0)`
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf); removeEventListener('pointermove', onMove)
      io.disconnect(); io2.disconnect(); mo.disconnect(); cur && cur.el.remove()
    }
  }, [rootRef])
}

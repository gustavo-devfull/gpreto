import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Cena 3D decorativa do hero: nó toroidal em wireframe, cristal central e nuvem de partículas.
export default function Hero3D() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 9

    const group = new THREE.Group()
    scene.add(group)
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.1, 0.55, 220, 24, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0x151513, wireframe: true, transparent: true, opacity: 0.16 })
    )
    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.95, 0),
      new THREE.MeshStandardMaterial({ color: 0x3a3a36, roughness: 0.3, metalness: 0.5, flatShading: true, emissive: 0x0d2b1c })
    )
    group.add(knot, crystal)
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3, 4, 5); scene.add(key)
    const rim = new THREE.PointLight(0x2fb36b, 18, 14); rim.position.set(-3, -2, 3); scene.add(rim)

    const N = 500, pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 5, a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1)
      pos.set([r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b)], i * 3)
    }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x151513, size: 0.035, transparent: true, opacity: 0.55 }))
    scene.add(points)

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h); camera.aspect = w / h
      group.position.x = w > 900 ? 4.6 : 0; group.scale.setScalar(w > 900 ? 0.75 : 0.7)
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(el)
    const mouse = { x: 0, y: 0 }
    const onMove = (e) => { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = (e.clientY / innerHeight - 0.5) * 2 }
    addEventListener('pointermove', onMove)

    let visible = true, raf, t0 = performance.now()
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(el)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = (performance.now() - t0) / 1000
      const k = reduce ? 0 : 1
      knot.rotation.x = t * 0.15 * k; knot.rotation.y = t * 0.22 * k
      crystal.rotation.x = -t * 0.4 * k; crystal.rotation.y = t * 0.3 * k
      crystal.position.y = Math.sin(t) * 0.15 * k
      points.rotation.y = t * 0.03 * k
      const s = 1 + Math.sin(t * 1.2) * 0.03 * k; knot.scale.setScalar(s)
      group.rotation.y += (mouse.x * 0.35 - group.rotation.y) * 0.05
      group.rotation.x += (mouse.y * 0.25 - group.rotation.x) * 0.05
      const sc = Math.min(scrollY / 700, 1); el.style.opacity = 1 - sc * 0.8
      group.position.y = sc * 1.5 - 0.2
      renderer.render(scene, camera)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener('pointermove', onMove)
      renderer.dispose(); knot.geometry.dispose(); crystal.geometry.dispose(); pg.dispose(); el.removeChild(renderer.domElement)
    }
  }, [])
  return <div ref={ref} className="hero3d" aria-hidden="true" />
}

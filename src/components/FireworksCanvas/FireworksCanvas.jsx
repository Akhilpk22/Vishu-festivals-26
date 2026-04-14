/* ─────────────────────────────────────────────────────
   FireworksCanvas.jsx

   Renders an HTML <canvas> that animates gold firework
   bursts. Completely self-contained – just give it:

   Props:
     active    {bool}   – whether new bursts are emitted
     intensity {number} – burst frequency multiplier (default 1)
────────────────────────────────────────────────────── */

import { useEffect, useRef, useCallback } from 'react'
import styles from './FireworksCanvas.module.css'

export default function FireworksCanvas({ active = true, intensity = 1 }) {
  const canvasRef    = useRef(null)
  const animRef      = useRef(null)
  const particlesRef = useRef([])   // live particle pool

  /* Creates a radial burst of particles at (x, y) */
  const createBurst = useCallback((canvas) => {
    const x   = Math.random() * canvas.width
    const y   = Math.random() * canvas.height * 0.65 + 30
    const hue = 38 + Math.random() * 24   // gold band

    const count = 28 + Math.floor(Math.random() * 22)

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const speed = 2 + Math.random() * 4.5

      particlesRef.current.push({
        x, y,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed,
        alpha: 1,
        hue:   hue + Math.random() * 30 - 15,
        sat:   78 + Math.random() * 22,
        size:  1.8 + Math.random() * 2.2,
        decay: 0.011 + Math.random() * 0.011,
        trail: [],
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    /* Resize canvas to its CSS size */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const burstInterval = 900 / Math.max(intensity, 0.1)
    let lastBurst = 0

    const loop = (ts) => {
      animRef.current = requestAnimationFrame(loop)

      /* Semi-transparent overlay creates the fade trail */
      ctx.fillStyle = 'rgba(5, 3, 10, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      /* Spawn new bursts when active */
      if (active && ts - lastBurst > burstInterval) {
        createBurst(canvas)
        if (Math.random() > 0.55) {
          setTimeout(() => createBurst(canvas), 200)
        }
        lastBurst = ts
      }

      /* Update & draw particles */
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02)

      for (const p of particlesRef.current) {
        /* Record trail point */
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 7) p.trail.shift()

        /* Draw trail segments */
        for (let i = 0; i < p.trail.length - 1; i++) {
          const a = (i / p.trail.length) * p.alpha * 0.45
          ctx.beginPath()
          ctx.moveTo(p.trail[i].x,     p.trail[i].y)
          ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y)
          ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, 72%, ${a})`
          ctx.lineWidth   = p.size * 0.55
          ctx.stroke()
        }

        /* Draw particle dot */
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 82%, ${p.alpha})`
        ctx.fill()

        /* Physics */
        p.x  += p.vx
        p.y  += p.vy
        p.vy += 0.055    // gravity
        p.vx *= 0.982    // air drag
        p.alpha -= p.decay
      }
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [active, intensity, createBurst])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

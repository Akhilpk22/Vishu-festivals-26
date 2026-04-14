import { useEffect, useRef, useCallback } from 'react'
import styles from './FireworksCanvas.module.css'

export default function FireworksCanvas({ active = true, intensity = 1 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])
  const isMounted = useRef(true)

  /* 🎆 Create Burst */
  const createBurst = useCallback(() => {
  const canvas = canvasRef.current
  if (!canvas) return

  const x = Math.random() * canvas.width
  const y = Math.random() * canvas.height * 0.65 + 30

  const colorSets = [
    [40, 60],
    [0, 20],
    [200, 240],
    [120, 160],
    [280, 320],
    [20, 40]
  ]

  const selected = colorSets[Math.floor(Math.random() * colorSets.length)]
  const hue = selected[0] + Math.random() * (selected[1] - selected[0])

  const count = 28 + Math.floor(Math.random() * 22)
  const style = Math.floor(Math.random() * 3)

  for (let i = 0; i < count; i++) {
    let angle

    if (style === 0) angle = (Math.PI * 2 * i) / count
    else if (style === 1) angle = (Math.PI * 4 * i) / count
    else angle = Math.random() * Math.PI * 2

    const speed = 2 + Math.random() * 4.5

    particlesRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      hue: hue + Math.random() * 30 - 15,
      sat: 78 + Math.random() * 22,
      size: Math.random() > 0.7
        ? 3 + Math.random() * 3
        : 1.5 + Math.random() * 2,
      decay: 0.011 + Math.random() * 0.011,
      trail: [],
    })
  }

  // 💥 SAFE EXTRA BURST
  if (Math.random() > 0.8) {
    setTimeout(() => {
      if (isMounted.current && canvasRef.current) {
        createBurst.current?.()
      }
    }, 150)
  }

}, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const burstInterval = 900 / Math.max(intensity, 0.1)
    let lastBurst = 0

    const loop = (ts) => {
      animRef.current = requestAnimationFrame(loop)

      // fade background
      ctx.fillStyle = 'rgba(5, 3, 10, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 🎆 create bursts
      if (active && ts - lastBurst > burstInterval) {
        createBurst()

        if (Math.random() > 0.55) {
          setTimeout(() => {
            if (isMounted.current && canvasRef.current) {
              createBurst()
            }
          }, 200)
        }

        lastBurst = ts
      }

      // filter particles
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02)

      for (const p of particlesRef.current) {

        // trail
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 7) p.trail.shift()

        for (let i = 0; i < p.trail.length - 1; i++) {
          const a = (i / p.trail.length) * p.alpha * 0.45

          ctx.beginPath()
          ctx.moveTo(p.trail[i].x, p.trail[i].y)
          ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y)

          // ✨ shimmer
          ctx.strokeStyle = `hsla(${p.hue + Math.random() * 10}, ${p.sat}%, 72%, ${a})`
          ctx.lineWidth = p.size * 0.55
          ctx.stroke()
        }

        // particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 82%, ${p.alpha})`
        ctx.fill()

        // physics
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.055
        p.vx *= 0.982
        p.alpha -= p.decay
      }
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      isMounted.current = false
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [active, intensity, createBurst])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
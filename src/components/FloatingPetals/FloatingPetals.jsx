/* ─────────────────────────────────────────────────────
   FloatingPetals.jsx

   Renders decorative kani-konna (golden shower) petals
   that drift from top to bottom. Pure CSS animation –
   no JS after mount.

   No props needed – just drop it inside any section.
────────────────────────────────────────────────────── */

import styles from './FloatingPetals.module.css'

/* Generate petal config once (not inside render) */
const PETALS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left:         `${4 + (i * 4.8) % 92}%`,           // spread evenly
  animDuration: `${6 + (i * 0.7) % 8}s`,
  animDelay:    `${(i * 0.35) % 6}s`,
  size:         6 + (i * 1.3) % 10,
  opacity:      0.12 + (i * 0.013) % 0.25,
  hue:          40 + (i * 3) % 22,                   // gold band
}))

export default function FloatingPetals() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {PETALS.map((p) => (
        <span
          key={p.id}
          className={styles.petal}
          style={{
            left:            p.left,
            width:           p.size,
            height:          p.size,
            opacity:         p.opacity,
            background:      `hsl(${p.hue}, 88%, 54%)`,
            animationDuration: p.animDuration,
            animationDelay:    p.animDelay,
          }}
        />
      ))}
    </div>
  )
}

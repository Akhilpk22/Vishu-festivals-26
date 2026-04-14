/* ─────────────────────────────────────────────────────
   StartSection.jsx

   The "home" screen shown after loading. Features:
     • Spinning decorative rings
     • Floating petals + idle fireworks canvas
     • Large "Begin" CTA button
     • Clicking triggers a fireworks burst then transitions

   Props:
     onStart {fn}  – called when user clicks Begin
────────────────────────────────────────────────────── */

import { useState } from 'react'
import FireworksCanvas from '../FireworksCanvas/FireworksCanvas'
import FloatingPetals  from '../FloatingPetals/FloatingPetals'
import styles from './StartSection.module.css'

export default function StartSection({ onStart }) {
  const [burst,   setBurst]   = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const handleStart = () => {
    setBurst(true)                               // trigger firework burst
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(onStart, 700)                   // notify parent after fade
    }, 900)
  }

  return (
    <div className={`${styles.section} ${fadeOut ? styles.fadeOut : ''}`}>

      {/* Background */}
      <FireworksCanvas active={burst} intensity={burst ? 2.5 : 0} />
      <FloatingPetals />

      {/* Decorative spinning rings */}
      <div className={`${styles.ring} ${styles.ringOuter}`} aria-hidden="true" />
      <div className={`${styles.ring} ${styles.ringInner}`} aria-hidden="true" />

      {/* Centre content */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>✦ Festival of First Sight ✦</p>

        <h1 className={styles.heading}>Vishu</h1>

        <p className={styles.tagline}>
          May this Vishu bring you joy & prosperity
        </p>

        {/* CTA */}
        <button className={styles.startBtn} onClick={handleStart}>
          ✦ Begin ✦
        </button>
      </div>
    </div>
  )
}

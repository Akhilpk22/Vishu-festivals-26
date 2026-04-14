/* ─────────────────────────────────────────────────────
   FinalSection.jsx

   The thank-you / farewell screen. Shows:
     • "Happy Vishu" + personalised farewell text
     • Malayalam blessing
     • Leave button (bottom-right aligned)

   Clicking Leave:
     1. Triggers a big fireworks burst
     2. Fades out the section
     3. Shows a minimal dark "Farewell" screen

   Props:
     realName {string}  – user's real name (may be empty)
────────────────────────────────────────────────────── */

import { useState } from 'react'
import FireworksCanvas from '../FireworksCanvas/FireworksCanvas'
import FloatingPetals  from '../FloatingPetals/FloatingPetals'
import styles from './FinalSection.module.css'

export default function FinalSection({ realName }) {
  const [burst,  setBurst]  = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [gone,   setGone]   = useState(false)

  const handleLeave = () => {
    setBurst(true)                              // fire big burst
    setTimeout(() => {
      setFadeOut(true)                          // fade section out
      setTimeout(() => setGone(true), 1000)    // swap to blank screen
    }, 1200)
  }

  /* ── Blank farewell screen ── */
  if (gone) {
    return (
      <div className={styles.farewell}>
        <p className={styles.farewellText}>~ Farewell ~</p>
      </div>
    )
  }

  return (
    <div className={`${styles.section} ${fadeOut ? styles.fadeOut : ''}`}>

      <FireworksCanvas active={burst} intensity={burst ? 3 : 0.35} />
      <FloatingPetals />

      <div className={styles.content}>

        {/* Decorative top dots */}
        <p className={styles.dots} aria-hidden="true">✦ ✦ ✦</p>

        <h1 className={styles.title}>Happy Vishu</h1>

        <p className={styles.dear}>
          {realName ? `Dear ${realName},` : 'Dear Friend,'}
        </p>

        <p className={styles.thanks}>
          Thank you for being part of this celebration.
        </p>

        {/* Malayalam blessing */}
        <p className={styles.malayalam} lang="ml">
          ഈ വിഷുവും ഭാഗ്യദായകം ആകട്ടെ 🌺
        </p>

        {/* Leave button – right-aligned */}
        <div className={styles.leaveRow}>
          <button className={styles.leaveBtn} onClick={handleLeave}>
            Leave ✦
          </button>
        </div>
      </div>
    </div>
  )
}

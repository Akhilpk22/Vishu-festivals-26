/* ─────────────────────────────────────────────────────
   GreetingSection.jsx

   The personalised Vishu wish screen. Shows:
     • Live fireworks canvas
     • Staggered text reveal (CSS class toggles)
     • Nickname or real name in the greeting
     • Malayalam blessing
     • Auto-advances to FinalSection after 15 s

   Props:
     realName {string}  – user's real name
     nickName {string}  – user's nick name (may be empty)
     onNext   {fn}      – called after auto-advance timeout
────────────────────────────────────────────────────── */

import { useState, useEffect } from 'react'
import FireworksCanvas from '../FireworksCanvas/FireworksCanvas'
import FloatingPetals  from '../FloatingPetals/FloatingPetals'
import styles from './GreetingSection.module.css'

export default function GreetingSection({ realName, nickName, onNext }) {
  /* displayName: prefer nick name, fall back to real name */
  const displayName = nickName || realName

  const [visible, setVisible] = useState(false)   // triggers CSS stagger
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    /* Small delay before revealing text for a smooth entrance */
    const showTimer = setTimeout(() => setVisible(true), 120)

    /* Auto-advance after 15 seconds */
    const nextTimer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onNext, 900)
    }, 15000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(nextTimer)
    }
  }, [onNext])

  return (
    <div className={`${styles.section} ${fadeOut ? styles.fadeOut : ''} ${visible ? styles.visible : ''}`}>

      <FireworksCanvas active intensity={1.6} />
      <FloatingPetals />

      {/* Radial ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>

        {/* Kani flower – floats up and down */}
        <span className={`${styles.flower} ${styles.reveal1}`} aria-hidden="true">🌼</span>

        <h1 className={`${styles.mainTitle} ${styles.reveal2}`}>
          Happy Vishu
        </h1>

        <p className={`${styles.name} ${styles.reveal3}`}>
          {displayName} 🎉
        </p>

        <blockquote className={`${styles.quote} ${styles.reveal4}`}>
          "May the Vishu Kani bless your eyes with beauty,<br />
          and this new year bring you endless abundance."
        </blockquote>

        {/* Malayalam blessing */}
        <p className={`${styles.malayalam} ${styles.reveal5}`} lang="ml">
          വിഷു ആശംസകൾ ✦
        </p>
      </div>

      {/* Subtle auto-advance hint */}
      <p className={styles.hint} aria-live="polite">
        continuing in a moment…
      </p>
    </div>
  )
}

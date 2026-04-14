/* ─────────────────────────────────────────────────────
   LoadingSection.jsx

   The very first screen users see. Shows:
     • Animated fireworks canvas
     • Floating petals
     • Malayalam "Vishu" watermark
     • Animated progress bar (0 → 100 over ~2.5 s)
     • Fades out then calls onDone()

   Props:
     onDone {fn}  – called when loading is complete
────────────────────────────────────────────────────── */

import { useState, useEffect } from 'react'
import FireworksCanvas from '../FireworksCanvas/FireworksCanvas'
import FloatingPetals  from '../FloatingPetals/FloatingPetals'
import styles from './LoadingSection.module.css'

export default function LoadingSection({ onDone }) {
  const [progress, setProgress] = useState(0)   // 0–100
  const [fadeOut, setFadeOut]   = useState(false)

  useEffect(() => {
    /* Increment progress bar every 50 ms → ~2.5 s total */
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          /* Brief pause at 100% then fade + notify parent */
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onDone, 700)
          }, 350)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`${styles.section} ${fadeOut ? styles.fadeOut : ''}`}>

      {/* Background effects */}
      <FireworksCanvas active intensity={1.2} />
      <FloatingPetals />

      {/* Malayalam decorative watermark */}
      <p className={styles.watermark} aria-hidden="true">വിഷു</p>

      {/* Centre content */}
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">🪔</span>

        <h1 className={styles.heading}>Happy Vishu</h1>
  
        <p className={styles.subheading}>വിഷു ആശംസകൾ</p>

        {/* Progress bar */}
        <div className={styles.barTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>

        <p className={styles.percent}>LOADING {progress}%</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   InputSection.jsx

   Collects the user's Real Name and optional Nick Name.
   Validates that Real Name is not empty before proceeding.

   Props:
     onSend   {fn(realName, nickName)}  – proceed to greeting
     onCancel {fn}                      – go back to Start
────────────────────────────────────────────────────── */

import { useState } from 'react'
import FireworksCanvas from '../FireworksCanvas/FireworksCanvas'
import FloatingPetals  from '../FloatingPetals/FloatingPetals'
import styles from './InputSection.module.css'

export default function InputSection({ onSend, onCancel }) {
  const [realName, setRealName] = useState('')
  const [nickName, setNickName] = useState('')
  const [error,    setError]    = useState('')
  const [burst,    setBurst]    = useState(false)
  const [fadeOut,  setFadeOut]  = useState(false)

  /* ── Send handler ── */
  const handleSend = () => {
    if (!realName.trim()) {
      setError('Please enter at least your real name 🌼')
      return
    }
    setError('')
    setBurst(true)
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => onSend(realName.trim(), nickName.trim()), 650)
    }, 800)
  }

  /* ── Cancel handler ── */
  const handleCancel = () => {
    setFadeOut(true)
    setTimeout(onCancel, 600)
  }

  /* Allow Enter key to submit */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className={`${styles.section} ${fadeOut ? styles.fadeOut : ''}`}>

      <FireworksCanvas active={burst} intensity={burst ? 2.2 : 0} />
      <FloatingPetals />

      {/* Glassmorphism card */}
      <div className={styles.card}>

        {/* Card header */}
        <div className={styles.header}>
          <span className={styles.icon} aria-hidden="true">🌸</span>
          <h2 className={styles.title}>Tell us your name</h2>
          <p className={styles.subtitle}>so we can wish you personally</p>
        </div>

        {/* Real Name */}
        <label className={styles.label} htmlFor="realName">
          Real Name <span className={styles.required}>*</span>
        </label>
        <input
          id="realName"
          type="text"
          className={styles.input}
          placeholder="Enter your real name"
          value={realName}
          onChange={(e) => { setRealName(e.target.value); setError('') }}
          onKeyDown={handleKeyDown}
          autoComplete="given-name"
          aria-required="true"
        />

        {/* Nick Name */}
        <label className={styles.label} htmlFor="nickName">
          Nick Name{' '}
          <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="nickName"
          type="text"
          className={styles.input}
          placeholder="What do people call you?"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="nickname"
        />

        {/* Validation error */}
        {error && <p className={styles.error} role="alert">{error}</p>}

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            ← Back
          </button>
          <button className={styles.sendBtn} onClick={handleSend}>
            Send ✦
          </button>
        </div>
      </div>
    </div>
  )
}

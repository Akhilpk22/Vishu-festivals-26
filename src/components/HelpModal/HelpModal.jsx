/* ─────────────────────────────────────────────────────
   HelpModal.jsx

   A slide-in modal explaining how to use the website.
   Clicking the backdrop or the ✕ button closes it.

   Props:
     onClose {fn}  – called when the modal should close
────────────────────────────────────────────────────── */

import styles from './HelpModal.module.css'

/* Step data – edit here to update the guide */
const STEPS = [
  {
    title: '1. Loading Screen',
    desc:  'Wait for the festive intro animation to finish.',
  },
  {
    title: '2. Start',
    desc:  'Click the glowing "Begin" button to start your Vishu journey.',
  },
  {
    title: '3. Enter Your Name',
    desc:  'Type your real name (required) and an optional nick name, then click Send.',
  },
  {
    title: '4. Personal Greeting',
    desc:  'Receive a personalised Vishu wish with live fireworks! Auto-advances after ~15 s.',
  },
  {
    title: '5. Thank You Screen',
    desc:  'A farewell screen appears. Click the "Leave" button to exit gracefully.',
  },
]

export default function HelpModal({ onClose }) {
  return (
    /* Backdrop – click outside to close */
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label="Help guide">

      {/* Card – stop propagation so clicks inside don't close */}
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose} aria-label="Close help">
          ✕
        </button>

        <h2 className={styles.title}>How to use 🌼</h2>

        <ul className={styles.stepList}>
          {STEPS.map((s) => (
            <li key={s.title} className={styles.step}>
              <p className={styles.stepTitle}>{s.title}</p>
              <p className={styles.stepDesc}>{s.desc}</p>
            </li>
          ))}
        </ul>

        <p className={styles.hint}>Click anywhere outside to close.</p>
      </div>
    </div>
  )
}

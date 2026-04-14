/* ─────────────────────────────────────────────────────
   App.jsx  –  Root component & section state machine

   Sections flow:  loading → start → input → greeting → final

   State:
     section   – which screen is active
     realName  – captured from InputSection
     nickName  – captured from InputSection (optional)
     showHelp  – toggles the HelpModal overlay
────────────────────────────────────────────────────── */

import { useState } from 'react'

import LoadingSection  from './components/LoadingSection/LoadingSection'
import StartSection    from './components/StartSection/StartSection'
import InputSection    from './components/InputSection/InputSection'
import GreetingSection from './components/GreetingSection/GreetingSection'
import FinalSection    from './components/FinalSection/FinalSection'
import HelpModal       from './components/HelpModal/HelpModal'

import styles from './App.module.css'

export default function App() {
  /* ── Global state ── */
  const [section,  setSection]  = useState('loading')
  const [realName, setRealName] = useState('')
  const [nickName, setNickName] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  /* ── Transition helpers ── */
  const goTo = (s) => setSection(s)

  const handleSend = (real, nick) => {
    setRealName(real)
    setNickName(nick)
    goTo('greeting')
  }

  return (
    <div className={styles.root}>

      {/* ── Section renderer ───────────────────────── */}
      {section === 'loading' && (
        <LoadingSection onDone={() => goTo('start')} />
      )}

      {section === 'start' && (
        <StartSection onStart={() => goTo('input')} />
      )}

      {section === 'input' && (
        <InputSection
          onSend={handleSend}
          onCancel={() => goTo('start')}
        />
      )}

      {section === 'greeting' && (
        <GreetingSection
          realName={realName}
          nickName={nickName}
          onNext={() => goTo('final')}
        />
      )}

      {section === 'final' && (
        <FinalSection realName={realName} />
      )}

      {/* ── Persistent help button ─────────────────── */}
      <button
        className={styles.helpBtn}
        onClick={() => setShowHelp(true)}
        title="How to use"
        aria-label="Open help guide"
      >
        ?
      </button>

      {/* ── Help modal overlay ─────────────────────── */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  )
}

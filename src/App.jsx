/* ─────────────────────────────────────────────────────
   App.jsx  –  Root component & section state machine

   Sections flow:  loading → start → input → greeting → final

   State:
     section   – which screen is active
     realName  – captured from InputSection
     nickName  – captured from InputSection (optional)
     showHelp  – toggles the HelpModal overlay
────────────────────────────────────────────────────── */

import { useState } from "react";

import LoadingSection from "./components/LoadingSection/LoadingSection";
import StartSection from "./components/StartSection/StartSection";
import InputSection from "./components/InputSection/InputSection";
import GreetingSection from "./components/GreetingSection/GreetingSection";
import FinalSection from "./components/FinalSection/FinalSection";
import HelpModal from "./components/HelpModal/HelpModal";

import styles from "./App.module.css";

export default function App() {
  /* ── Global state ── */
  const [section, setSection] = useState("loading");
  const [realName, setRealName] = useState("");
  const [nickName, setNickName] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  /* ── Transition helpers ── */
  const goTo = (s) => setSection(s);

  const quotes = [
    `May the Vishu Kani bless your eyes with beauty,
and this new year bring you endless abundance.`,

    `Let this Vishu bring new hope, new dreams,
and new beginnings into your life.`,

    `Wishing you prosperity, happiness,
and golden moments this Vishu.`,

    `May your life shine bright like Vishu Kani,
full of wealth and joy.`,
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleSend = (real, nick) => {
    setRealName(real);
    setNickName(nick);

    setQuoteIndex((prev) => (prev + 1) % quotes.length);

    goTo("greeting");
  };

  return (
    <div className={styles.root}>
      {/* ── Section renderer ───────────────────────── */}
      {section === "loading" && <LoadingSection onDone={() => goTo("start")} />}

      {section === "start" && <StartSection onStart={() => goTo("input")} />}

      {section === "input" && (
        <InputSection onSend={handleSend} onCancel={() => goTo("start")} />
      )}

      {section === "greeting" && (
        <GreetingSection
          realName={realName}
          nickName={nickName}
          quote={quotes[quoteIndex]}
          onNext={() => goTo("final")}
        />
      )}

      {section === "final" && (
        <FinalSection realName={realName} onRestart={() => goTo("input")} />
        // 🔥 ADD THIS
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
  );
}

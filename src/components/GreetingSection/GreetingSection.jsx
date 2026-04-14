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

import { useState, useEffect } from "react";
import FireworksCanvas from "../FireworksCanvas/FireworksCanvas";
import FloatingPetals from "../FloatingPetals/FloatingPetals";
import styles from "./GreetingSection.module.css";

export default function GreetingSection({ realName, quote, nickName, onNext }) {
  /* displayName: prefer nick name, fall back to real name */
  const displayName = nickName || realName;

  const [visible, setVisible] = useState(false); // triggers CSS stagger
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    /* Small delay before revealing text for a smooth entrance */
    const showTimer = setTimeout(() => setVisible(true), 120);

    /* Auto-advance after 15 seconds */
    const nextTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onNext, 900);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [onNext]);

  const icons = [
    "🪔", // lamp
    "🌼", // konna flower
    "✨", // sparkle
    "💰", // prosperity
    "🌾", // harvest
    "🥭", // mango
    "🌸", // blossom
    "💫", // glowing star
    "🔥", // festive energy
  ];
  const [iconIndex, setIconIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out

      setTimeout(() => {
        setIconIndex((prev) => (prev + 1) % icons.length);
        setFade(true); // fade in
      }, 300); // timing for smooth transition
    }, 1500); // change every 2 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.section} ${fadeOut ? styles.fadeOut : ""} ${visible ? styles.visible : ""}`}
    >
      <FireworksCanvas active intensity={1.6} />
      <FloatingPetals />

      {/* Radial ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {/* Kani flower – floats up and down */}
        <span
          className={`${styles.flower} ${styles.reveal1} ${fade ? styles.fadeIn : styles.fadeOut}`}
          aria-hidden="true"
        >
          {icons[iconIndex]}
        </span>

        <h1 className={`${styles.mainTitle} ${styles.reveal2}`}>Happy Vishu</h1>

        <p className={`${styles.name} ${styles.reveal3}`}>{displayName} 🎉</p>

       
        <blockquote className={`${styles.quote} ${styles.reveal4}`}>
          {quote.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
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
  );
}

import FireworksCanvas from '../FireworksCanvas/FireworksCanvas'
import FloatingPetals  from '../FloatingPetals/FloatingPetals'
import styles from './FinalSection.module.css'

export default function FinalSection({ realName, onRestart }) {

  return (
    <div className={styles.section}>

      <FireworksCanvas active intensity={1.2} />
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
          ഈ വിഷു സന്തോഷവും സമൃദ്ധിയും നിറഞ്ഞതാകട്ടെ 🌺
        </p>

        {/* 🔥 ONLY BUTTON NOW */}
        <div className={styles.leaveRow}>
          <button 
            className={styles.leaveBtn} 
            onClick={onRestart}
          >
            Try Again 🔄
          </button>
        </div>

      </div>
    </div>
  )
}
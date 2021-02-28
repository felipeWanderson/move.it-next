import { useContext } from 'react';
import { ChallengeContext } from '../hooks/Challenge';
import styles from '../styles/components/ExperienceBar.module.css';
export function ExperienceBar() {
  const {currentExperience, experienceToNextLevel} = useContext(ChallengeContext);

  const porcenteToNextLevel = Math.round(currentExperience * 100)/experienceToNextLevel;
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${porcenteToNextLevel}%`}} />
        <span className={styles.currentExperience} style={{ left: `${porcenteToNextLevel}%`}}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
import { useChallenge } from '../hooks/Challenge';
import styles from '../styles/components/CompletedChallenger.module.css';
export function CompletedChallenger() {
  const {challengesCompleted} = useChallenge();
  return (
    <div className={styles.completedChallengerContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
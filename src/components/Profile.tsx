import { useChallenge } from '../hooks/Challenge';
import styles from '../styles/components/Profile.module.css';
export function Profile() {
  const {level} = useChallenge();
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/felipeWanderson.png" alt="Felipe Leal"/>
      <div>
        <strong>Felipe Leal</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          {`Level ${level}`}
        </p>
      </div>
    </div>
  );
}
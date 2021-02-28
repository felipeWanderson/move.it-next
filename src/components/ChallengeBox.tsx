import { useChallenge } from '../hooks/Challenge';
import { useCowntdown } from '../hooks/Countdown';
import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useChallenge();
  const {resetCountdown} = useCowntdown();

  function handleSucceededChallenge() {
    completedChallenge();
    resetCountdown();
  }

  function handleFaildChallenge() {
    resetChallenge();
    resetCountdown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challendeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img 
              src={`icons/${activeChallenge.type}.svg`} 
              alt={activeChallenge.type}
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button" 
              className={styles.challengeFailedButton}
              onClick={handleFaildChallenge}
            >
              Falhei
            </button>
            <button 
              type="button" 
              className={styles.challengeSucceededButton}
              onClick={handleSucceededChallenge}
            >
              Completei
            </button>
          </footer>
        </div>
      ): (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
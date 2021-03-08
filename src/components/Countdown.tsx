import { useCowntdown } from '../hooks/Countdown';
import styles from '../styles/components/Countdown.module.css';
import { BsPlayFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { RiCheckboxCircleFill } from 'react-icons/ri';

export function Countdown() {
  const { 
    minutes, 
    seconds,
    progress, 
    resetCountdown, 
    isActive, 
    hasFinished, 
    startCountdown 
  } = useCowntdown();

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
      <div>
        <span>{minutesLeft}</span>
        <span>{minutesRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondsLeft}</span>
        <span>{secondsRight}</span>
      </div>
    </div>

    {hasFinished ? (
      <>
      <button
        disabled 
        className={styles.countdownButton} 
      >
        Ciclo encerrado
        <RiCheckboxCircleFill color="#4cd62b" />
      </button>
      <div className={styles.progressCountdown}>
        <div style={{ width: '100%' }} />
      </div>
      </>
    ): (
      <>
        { isActive ? (
          <>
          <button 
            type="button"
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
            onClick={resetCountdown}
          >
            Abandonar ciclo
            <MdClose />
          </button>
          <div className={styles.progressCountdown}>
            <div style={{ width: `${progress}%` }} />
          </div>
          </>
        ): (
          <button 
            type="button" 
            className={styles.countdownButton} 
            onClick={startCountdown}
          >
            Iniciar um ciclo 
            <BsPlayFill />
          </button>
        )}
      </>
    )}
    </div>
  );
}
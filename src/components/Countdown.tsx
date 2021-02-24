import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { ChallengesContext } from '../context/ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

export default function Countdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // caso não tenha 2 digítos, acrescenta um zero a esquerda.
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }else if (isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time]);


  return (
    <div>
      <div className={styles.countdownContainer}>      
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          className={styles.countDownButton}
        >
         Ciclo encerrado       
        </button>
      ) : (
        <>
         {isActive ? (
            <button 
              type="button" 
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo        
            </button>)
            :
            (<button 
              type="button" 
              className={styles.countDownButton}
              onClick={startCountDown}
            >
            Iniciar um ciclo        
            </button>
            )}
        </>        
      )}
      
     
      
    </div>
  )
}
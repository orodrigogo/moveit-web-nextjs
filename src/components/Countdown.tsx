import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../context/CountdownContext';
import { useContext } from 'react';


export default function Countdown() {
  const { minutes, seconds, hasFinished, isActive, startCountDown, resetCountdown } = useContext(CountdownContext);

  // caso não tenha 2 digítos, acrescenta um zero a esquerda.
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


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
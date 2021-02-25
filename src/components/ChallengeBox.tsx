import styles from '../styles/components/ChallengeBoxChallengeBox.module.css';
import { ChallengesContext } from '../context/ChallengesContext';
import { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded(){
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxChallengeContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button 
            type="button"
            className={styles.challengeFailedButton}
            onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button 
            type="button"
            className={styles.challengeSucessButton}
            onClick={handleChallengeSucceeded}
            >
              Completei
            </button>            
          </footer>
        </div>
      ) 
      : 
      (
        <div className={styles.challengeNotActive}>      
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avançe de level completeando desafios.
          </p>
        </div>   
      )}
    </div>   
  )
}
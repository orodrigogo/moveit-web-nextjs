import styles from '../styles/components/ChallengeBoxChallengeBox.module.css';
import { ChallengesContext } from '../context/ChallengesContext';
import { useContext } from 'react';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

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
            onClick={resetChallenge}
            >
              Falhei
            </button>
            <button 
            type="button"
            className={styles.challengeSucessButton}
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
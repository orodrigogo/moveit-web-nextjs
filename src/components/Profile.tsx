import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/49030804?s=460&u=e5cfd1b4b006ad84545da6667518203af7d17888&v=4" alt="Rodrigo Gonçalves Santana" />
      <div>
        <strong>Rodrigo Gonçalves</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}
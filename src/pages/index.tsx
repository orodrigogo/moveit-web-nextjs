import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExprienceBar from '../components/ExprienceBar';
import Profile from '../components/Profile';
import { CountdownProvider } from '../context/CountdownContext';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import ChallengeBoxChallengeBox from '../components/ChallengeBox';

export default function Home() {
  return (
    <div className={styles.container}>      
      <Head>
        <title>Início - move.it</title>
      </Head>
      <ExprienceBar />    

      <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>

          <div>
            <ChallengeBoxChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  );
}

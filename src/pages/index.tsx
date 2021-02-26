import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ChallengeBoxChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExprienceBar from '../components/ExprienceBar';
import Profile from '../components/Profile';
import { ChallengesProvider } from '../context/ChallengesContext';
import { CountdownProvider } from '../context/CountdownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  chanllengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      chanllengesCompleted={props.chanllengesCompleted}
    >
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
    </ChallengesProvider>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = {
    level: 1,
    currentExperience: 50,
  }

  const { level, currentExperience, chanllengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      chanllengesCompleted: Number(chanllengesCompleted)
    }
  }
}
import { createContext, useState, ReactNode, useContext } from 'react';
import challenges from '../../challenges.json';


interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' |  'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  chanllengesCompleted: number; 
  experienceToNextLevel: number; 
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [chanllengesCompleted, setChanllengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

 

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        chanllengesCompleted, 
        activeChallenge,
        experienceToNextLevel,
        levelUp, 
        startNewChallenge ,
        resetChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}




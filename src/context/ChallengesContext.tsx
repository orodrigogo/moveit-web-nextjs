import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  chanllengesCompleted: number;
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
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children,...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [chanllengesCompleted, setChanllengesCompleted] = useState(rest.chanllengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    //solicita ao usuário para receber notificações pelo navegador.
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('chanllengesCompleted', String(chanllengesCompleted));

  },[level, currentExperience, chanllengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(false);
    setChanllengesCompleted(chanllengesCompleted + 1);

  }

  function closeLevelUpModal(){ 
    setIsLevelUpModalOpen(false);
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
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}>
      {children}

      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}




import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import Challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body'| 'eye';
  description: string;
  amount: number;
}
interface ChallengeContextData {
  level: number, 
  currentExperience: number, 
  challengesCompleted: number,
  activeChallenge: Challenge,
  experienceToNextLevel: number; 
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void, 
  completedChallenge: () => void,
  closeLevelUpModal: () => void 
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}



const ChallengeContext = createContext({} as ChallengeContextData);

function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalActive, setIsLevelUpModalActive] = useState(false);

  const experienceToNextLevel = Math.pow((level+1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalActive(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalActive(false);
  }
  function startNewChallenge() {
   const challengeRandomIndex = Math.floor(Math.random() * Challenges.length);
   const challenge = Challenges[challengeRandomIndex];

   setActiveChallenge(challenge);

   new Audio('/notification.mp3').play();

   if(Notification.permission === 'granted') {
     new Notification('Novo desafio 🎉', {
       body: `Valendo ${challenge.amount}xp`
     });
   }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
  return (
    <ChallengeContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        activeChallenge, 
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completedChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalActive && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}

function useChallenge(): ChallengeContextData {
  const context = useContext(ChallengeContext);

  if (!context) {
    throw new Error('useChallenge só pode ser usado com o ChallengeProvider');
  }

  return context;
};

export {ChallengesProvider, useChallenge };


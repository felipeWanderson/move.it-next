import { createContext, ReactNode, useState } from 'react';
import Challenges from '../../challenges.json';

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
  resetChallenge: () => void 
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(20);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level+1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
   const challengeRandomIndex = Math.floor(Math.random() * Challenges.length);
   const challenge = Challenges[challengeRandomIndex];

   setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
        resetChallenge
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
 
}

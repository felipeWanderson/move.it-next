import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useChallenge } from "./Challenge";
interface CountdownContextData {
  minutes: number;
  seconds: number;
  progress: number;
  hasFinished: boolean;
  isActive: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
} 

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);
let countdownTimeout: NodeJS.Timeout;

function  CountdownProvider({ children }: CountdownProviderProps) {
  const {startNewChallenge} = useChallenge();

  const [time, setTime] = useState(1 * 60);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFineshed] = useState(false);

  const timeInital = 1 * 60;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
    setProgress(0);
  }
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(1 * 60);
    setHasFineshed(false);
    setProgress(0);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
        setProgress(Math.floor(100 - ((time * 100) / timeInital)));
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFineshed(true);
      setIsActive(false);
      startNewChallenge();
      setProgress(0);
    }
  }, [isActive, time]);
  return (
    <CountdownContext.Provider 
      value={{
        minutes, 
        seconds,
        progress, 
        hasFinished, 
        isActive, 
        resetCountdown,
        startCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
  
}

function useCowntdown(): CountdownContextData {
  const context = useContext(CountdownContext);

  if (!context) {
    throw new Error('useCountdown só pode ser usado com o CountdownProvider');
  }

  return context;
};

export {CountdownProvider, useCowntdown };
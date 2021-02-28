import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useChallenge } from "./Challenge";
interface CountdownContextData {
  minutes: number;
  seconds: number;
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

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFineshed] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFineshed(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFineshed(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);
  return (
    <CountdownContext.Provider 
      value={{
        minutes, 
        seconds, 
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
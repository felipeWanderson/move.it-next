import Head from 'next/head';


import { ExperienceBar } from '../../components/ExprerienceBar';
import { CompletedChallenger } from '../../components/CompletedChallenger';
import { Countdown } from '../../components/Countdown';
import { ChallengeBox } from '../../components/ChallengeBox';
import { Profile } from '../../components/Profile';

import styles from '../../styles/pages/index.module.css';
import { CountdownProvider } from '../../hooks/Countdown';
import { ChallengesProvider } from '../../hooks/Challenge';


interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,  
}
export default function Challenges({ 
  level, 
  challengesCompleted, 
  currentExperience
}: HomeProps) {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it
          </title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenger />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}




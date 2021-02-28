import Head from 'next/head';


import { ExperienceBar } from '../components/ExprerienceBar';
import { CompletedChallenger } from '../components/CompletedChallenger';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { Profile } from '../components/Profile';


import styles from '../styles/pages/index.module.css';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it
        </title>
      </Head>
      <ExperienceBar />
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
    </div>
  )
}

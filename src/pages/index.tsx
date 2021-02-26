import { CompletedChallenger } from '../components/CompletedChallenger';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExprerienceBar';
import { Profile } from '../components/Profile';

import Head from 'next/head';

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
        <div></div>
      </section>
    </div>
  )
}

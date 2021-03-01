import Link from 'next/link'
import { ChangeEvent, useCallback, useState } from 'react'
import styles from '../../styles/pages/Login.module.css';

export default function Home() {
  const [isFulled, setIsFulled] = useState(false);

  const handleChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    if (!value) {
      setIsFulled(false);
      return;
    }

    setIsFulled(true);
  }, [isFulled]);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo-transparent.svg" alt="Move.it - Logo"/>
        </div>
        <div className={styles.login}>
          <img src="/logo-full-white.svg" alt="Move.it - Logo"/>
          <div className={styles.loginContent}>
            <strong>Bem-vindo</strong>
            <p>
              <img src="/github.svg" alt="Icone Github"/>
              Faça login com seu github para começar
            </p>
            <div className={styles.inputContainer}>
              <input type="text" onChange={e => handleChangeText(e)}/>
              <Link href="/dashboard">
                <a className={isFulled ? styles.fulled: undefined}>
                  <img src="/arrow-left.svg" alt="Seta para esquerda"/>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
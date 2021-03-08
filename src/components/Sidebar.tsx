import styles from '../styles/components/Sidebar.module.css';
import { FiHome, FiAward } from 'react-icons/fi';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface SidebarProps {
  setPage: Dispatch<SetStateAction<string>>
}
export default function Sidebar({ setPage }: SidebarProps) {
  const [selected, setSelected] = useState('challenges');
  const handleSelected = useCallback((selectedPage: string) => {
    setSelected(selectedPage);
    setPage(selectedPage);
  }, []);
  return (
    <aside className={styles.containerSidebar}>
      <header className={styles.logo}>
        <img src="/logo-tiny.svg" alt="Moveit Logo"/>
      </header>

      <div className={styles.buttonsContainer}>
        <button 
          type="button" 
          className={selected === 'challenges' && styles.challenges} 
          onClick={() => handleSelected('challenges')}
        >
          <FiHome />
        </button>
        <button 
          type="button" 
          className={selected === 'leaderboard' && styles.leaderboard} 
          onClick={() => handleSelected('leaderboard')}
        >
          <FiAward />
        </button>
      </div>
    </aside>
  );
}
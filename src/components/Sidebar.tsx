import styles from '../styles/components/Sidebar.module.css';
import { FiHome, FiAward } from 'react-icons/fi';
export default function Sidebar() {
  return (
    <aside className={styles.containerSidebar}>
      <header className={styles.logo}>
        <img src="/logo-tiny.svg" alt="Moveit Logo"/>
      </header>

      <div className={styles.buttonsContainer}>
        <div className={styles.active}>
          <FiHome color="#5965E0"/>
        </div>
        <div>
          <FiAward />
        </div>
      </div>
    </aside>
  );
}
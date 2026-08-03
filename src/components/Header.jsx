import { CalendarDays, Heart } from 'lucide-react';
import styles from '../css/header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        🏃
        <span>RUN TRIP</span>
      </div>
      <nav className={styles.menu}>
        <a href="#goal">Goal</a>
        <a href="#timeline">Schedule</a>
        <a href="#packing">Packing</a>
        <a href="#gallery">Gallery</a>
      </nav>
      <div className={styles.info}>
        <CalendarDays size={18} />
        <span>09.19 - 09.20</span>
        <Heart size={16} fill="#ff8f8f" color="#ff8f8f" />
      </div>
    </header>
  );
}

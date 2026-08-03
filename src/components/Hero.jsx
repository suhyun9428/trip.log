import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../css/hero.module.css';

export default function Hero() {
  const scrollDown = () => {
    document.getElementById('goal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.cloud1}></div>
      <div className={styles.cloud2}></div>
      <div className={styles.star1}>✦</div>
      <div className={styles.star2}>✦</div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <span className={styles.emoji}>🏃</span>
        <p className={styles.subtitle}>OUR LOVELY RUNNING TRIP</p>
        <h1>
          GYEONGJU
          <br />
          RUN TRIP
        </h1>
        <div className={styles.date}>
          2026.09.19
          <span>~</span>
          2026.09.20
        </div>
        <p className={styles.couple}>❤</p>
        <button onClick={scrollDown} className={styles.button}>
          Let's Run
        </button>
        <ChevronDown className={styles.arrow} size={30} />
      </motion.div>
    </section>
  );
}

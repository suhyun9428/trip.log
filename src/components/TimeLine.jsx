import { Clock3, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../css/timeline.module.css';

const schedules = [
  {
    day: 'DAY 1',
    time: '07:00',
    title: '서울 출발',
    desc: 'KTX 타고 경주로 출발 🚄',
  },
  {
    day: 'DAY 1',
    time: '11:30',
    title: '점심',
    desc: '황리단길 맛집 탐방 🍜',
  },
  {
    day: 'DAY 1',
    time: '15:00',
    title: '카페',
    desc: '예쁜 카페에서 쉬기 ☕',
  },
  {
    day: 'DAY 1',
    time: '19:30',
    title: '야경',
    desc: '동궁과 월지 산책 🌙',
  },
  {
    day: 'DAY 2',
    time: '07:30',
    title: '마라톤',
    desc: '경주 러닝 대회 🏃',
  },
  {
    day: 'DAY 2',
    time: '13:00',
    title: '점심',
    desc: '황남빵 & 한우',
  },
];
export default function Timeline() {
  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.header}>
        <h2>Travel Schedule</h2>
        <p>우리의 경주 여행 일정</p>
      </div>

      <div className={styles.line} />

      {schedules.map((item, index) => (
        <motion.article
          key={index}
          className={`${styles.card} ${
            index % 2 === 0 ? styles.left : styles.right
          }`}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
          }}
        >
          <div className={styles.dot}></div>

          <div className={styles.box}>
            <span className={styles.day}>{item.day}</span>

            <h3>{item.title}</h3>

            <div className={styles.time}>
              <Clock3 size={16} />
              {item.time}
            </div>

            <p>{item.desc}</p>

            <div className={styles.location}>
              <MapPin size={15} />
              Gyeongju
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

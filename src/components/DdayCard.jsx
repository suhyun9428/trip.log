import { useEffect, useState } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Heart } from 'lucide-react';
import styles from '../css/ddaycard.module.css';

const TRIP_DATE = new Date('2026-09-19');

export default function DdayCard() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const update = () => {
      setDays(differenceInCalendarDays(TRIP_DATE, new Date()));
    };

    update();

    const timer = setInterval(update, 60000);

    return () => clearInterval(timer);
  }, []);

  const getMessage = () => {
    if (days > 0) return `D-${days}`;
    if (days === 0) return 'TODAY! 🎉';
    return 'THANK YOU ❤️';
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.blur}></div>
        <Heart className={styles.heart} size={42} fill="#ff8fa3" />
        <h3>GYEONGJU RUN TRIP</h3>
        <div className={styles.dday}>{getMessage()}</div>
        <div className={styles.divider}></div>
        <p className={styles.date}>
          {format(TRIP_DATE, 'yyyy.MM.dd (EEE)', {
            locale: ko,
          })}
        </p>
        <span className={styles.text}>우리 여행까지</span>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { Clock3, MapPin, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from '../css/timeline.module.css';

const DEFAULT_SCHEDULES = [
  {
    day: 'DAY 1',
    time: '07:00',
    title: '서울 출발',
    desc: '말리부타고 경주로 출발 🚗',
  },
  { day: 'DAY 1', time: '11:30', title: '점심', desc: '우리 뭐 먹지 🍜' },
  { day: 'DAY 1', time: '14:30', title: '숙소', desc: '숙소 도착 후 환복하기' },
  { day: 'DAY 1', time: '16:30', title: '마라톤', desc: '무도런 🏃' },
  { day: 'DAY 1', time: '20:30', title: '야경', desc: '동궁과 월지 산책 🌙' },
  { day: 'DAY 2', time: '13:00', title: '점심', desc: '점심 뭐 먹을까?' },
  {
    day: 'DAY 2',
    time: '14:00',
    title: '간식',
    desc: '경주초콜릿, 미피빵집🐰',
  },
];

const LOCAL_STORAGE_KEY = 'gyeongju_travel_schedules';

const sortSchedules = (list) => {
  return [...list].sort((a, b) => {
    const dayA = parseInt(a.day.replace(/[^0-9]/g, ''), 10) || 0;
    const dayB = parseInt(b.day.replace(/[^0-9]/g, ''), 10) || 0;

    if (dayA !== dayB) {
      return dayA - dayB;
    }

    return a.time.localeCompare(b.time);
  });
};

export default function Timeline() {
  const [schedules, setSchedules] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [newDay, setNewDay] = useState('DAY 1');
  const [newTime, setNewTime] = useState('12:00');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSchedules(sortSchedules(parsed));
      } catch (e) {
        console.error('Failed to parse schedule data:', e);
        setSchedules(sortSchedules(DEFAULT_SCHEDULES));
      }
    } else {
      const sortedDefault = sortSchedules(DEFAULT_SCHEDULES);
      setSchedules(sortedDefault);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortedDefault));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(schedules));
    }
  }, [schedules, isLoaded]);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert('제목을 입력해주세요!');

    const newItem = {
      day: newDay.toUpperCase().trim(),
      time: newTime.trim(),
      title: newTitle,
      desc: newDesc,
    };

    setSchedules((prev) => sortSchedules([...prev, newItem]));

    setNewTitle('');
    setNewDesc('');
  };

  const handleDeleteSchedule = (indexToDelete) => {
    setSchedules((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  if (!isLoaded) return null;

  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.header}>
        <h2>Travel Schedule</h2>
        <p>우리의 경주 여행 일정</p>
      </div>

      <form onSubmit={handleAddSchedule} className={styles.formContainer}>
        <input
          type="text"
          placeholder="DAY (예: DAY 1)"
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
          required
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="제목 (예: 보문호수 산책)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="설명 (예: 오리배 타기 🐤)"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          <Plus size={16} /> 일정 추가
        </button>
      </form>

      <div className={styles.line} />

      {schedules.map((item, index) => (
        <motion.article
          key={`${item.day}-${item.time}-${index}`}
          className={`${styles.card} ${
            index % 2 === 0 ? styles.left : styles.right
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className={styles.dot}></div>
          <div className={styles.box}>
            <div className={styles.cardHeader}>
              <span className={styles.day}>{item.day}</span>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDeleteSchedule(index)}
                title="삭제"
              >
                <Trash2 size={14} />
              </button>
            </div>
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

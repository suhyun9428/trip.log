import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import styles from '../css/packinglist.module.css';

const DEFAULT_ITEMS = [
  '러닝화',
  '러닝복',
  '양말',
  '모자',
  '썬크림',
  '보조배터리',
  '충전기',
  '세면도구',
  '갈아입을 옷',
  '간식',
];

export default function PackingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('packing');

    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(
        DEFAULT_ITEMS.map((text) => ({
          text,
          checked: false,
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem('packing', JSON.stringify(items));
    }
  }, [items]);

  const toggle = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );
  };

  return (
    <section id="packing" className={styles.wrapper}>
      <div className={styles.title}>
        <h2>🎒 Packing List</h2>
        <p>여행 전에 하나씩 체크하기</p>
      </div>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <button
            key={item.text}
            className={`${styles.card} ${item.checked ? styles.checked : ''}`}
            onClick={() => toggle(index)}
          >
            <span>{item.text}</span>

            <div className={styles.icon}>
              <Check size={18} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

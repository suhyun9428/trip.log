import { Trophy, MoonStar, UtensilsCrossed } from 'lucide-react';
import styles from '../css/goalcard.module.css';

const goals = [
  {
    icon: Trophy,
    title: '10K 완주',
    text: '기록보다 완주',
  },
  {
    icon: MoonStar,
    title: '야간 산책',
    text: '대릉원',
  },
  {
    icon: UtensilsCrossed,
    title: '먹방',
    text: '경주 맛집',
  },
];

export default function GoalCard() {
  return (
    <section className={styles.wrapper} id="goal">
      {goals.map((goal) => {
        const Icon = goal.icon;

        return (
          <article className={styles.card} key={goal.title}>
            <Icon size={46} strokeWidth={1.8} />
            <h3>{goal.title}</h3>
            <p>{goal.text}</p>
          </article>
        );
      })}
    </section>
  );
}

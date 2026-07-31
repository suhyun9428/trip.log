import { motion } from 'framer-motion';
import styles from '../css/gallery.module.css';

const photos = [
  {
    image: '/images/run.jpg',
    title: 'RUN DAY',
  },
  {
    image: '/images/cafe.jpg',
    title: '황리단길',
  },
  {
    image: '/images/night.jpg',
    title: '동궁과 월지',
  },
  {
    image: '/images/food.jpg',
    title: '맛있는 저녁',
  },
  {
    image: '/images/drive.jpg',
    title: '말리붕붕',
  },
  {
    image: '/images/selfie.jpg',
    title: '우리 ❤️',
  },
];

export default function Gallery() {
  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.title}>
        <h2>Travel Memories</h2>
        <p>사진으로 남기는 여행 기록</p>
      </div>

      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <motion.article
            key={photo.title}
            className={styles.card}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              scale: 1.06,
              rotate: 0,
              zIndex: 20,
            }}
          >
            <div className={styles.tape}></div>

            <img src={photo.image} alt={photo.title} />

            <span>{photo.title}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

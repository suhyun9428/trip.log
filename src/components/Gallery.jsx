import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ImagePlus } from 'lucide-react';
import styles from '../css/gallery.module.css';

const DEFAULT_PHOTOS = [
  { id: '1', image: '/images/run.jpg', title: 'RUN DAY' },
  { id: '2', image: '/images/cafe.jpg', title: '황리단길' },
  { id: '3', image: '/images/night.jpg', title: '동궁과 월지' },
  { id: '4', image: '/images/food.jpg', title: '맛있는 저녁' },
  { id: '5', image: '/images/drive.jpg', title: '말리붕붕' },
  { id: '6', image: '/images/selfie.jpg', title: '우리 ❤️' },
];

const LOCAL_STORAGE_KEY = 'gyeongju_travel_gallery';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setPhotos(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse gallery data:', e);
        setPhotos(DEFAULT_PHOTOS);
      }
    } else {
      setPhotos(DEFAULT_PHOTOS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PHOTOS));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
    }
  }, [photos, isLoaded]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('이미지 크기가 너무 큽니다! (2MB 이하의 이미지 권장)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!imagePreview) return alert('이미지를 업로드해주세요!');
    if (!newTitle.trim()) return alert('제목을 입력해주세요!');

    const newPhoto = {
      id: Date.now().toString(),
      image: imagePreview,
      title: newTitle.trim(),
    };

    setPhotos((prev) => [newPhoto, ...prev]);

    setNewTitle('');
    setImagePreview('');
    e.target.reset();
  };

  const handleDeletePhoto = (idToDelete) => {
    setPhotos((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  if (!isLoaded) return null;

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.title}>
        <h2>Travel Memories</h2>
        <p>사진으로 남기는 여행 기록</p>
      </div>

      <form onSubmit={handleAddPhoto} className={styles.uploadForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="file-upload" className={styles.fileLabel}>
            <ImagePlus size={18} />
            <span>{imagePreview ? '이미지 변경' : '사진 선택'}</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />

          <input
            type="text"
            placeholder="사진 제목 (예: 황리단길 카페)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.textInput}
            required
          />

          <button type="submit" className={styles.addBtn}>
            <Plus size={16} /> 업로드
          </button>
        </div>

        {imagePreview && (
          <div className={styles.previewContainer}>
            <img src={imagePreview} alt="Upload preview" />
            <span>미리보기</span>
          </div>
        )}
      </form>

      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <motion.article
            key={photo.id || photo.title + index}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              scale: 1.06,
              rotate: 0,
              zIndex: 20,
            }}
          >
            <div className={styles.tape}></div>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => handleDeletePhoto(photo.id)}
              title="삭제"
            >
              <Trash2 size={14} />
            </button>
            <img src={photo.image} alt={photo.title} />
            <span>{photo.title}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

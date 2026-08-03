import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ImagePlus } from 'lucide-react';
import { supabase } from '../supabase';
import styles from '../css/gallery.module.css';

const DEFAULT_PHOTOS = [
  { id: '1', image: '/images/run.jpg', title: 'RUN DAY' },
  { id: '2', image: '/images/cafe.jpg', title: '황리단길' },
  { id: '3', image: '/images/night.jpg', title: '동궁과 월지' },
  { id: '4', image: '/images/food.jpg', title: '맛있는 저녁' },
  { id: '5', image: '/images/drive.jpg', title: '말리붕붕' },
  { id: '6', image: '/images/selfie.jpg', title: '우리 ❤️' },
];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        const defaultInsertData = DEFAULT_PHOTOS.map((item) => ({
          title: item.title,
          image: item.image,
        }));

        const { data: insertedData, error: insertError } = await supabase
          .from('gallery')
          .insert(defaultInsertData)
          .select();

        if (!insertError) {
          setPhotos(insertedData || []);
        } else {
          setPhotos(DEFAULT_PHOTOS);
        }
      } else {
        setPhotos(data);
      }
    } catch (err) {
      console.error('갤러리 로드 실패:', err);
      setPhotos(DEFAULT_PHOTOS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert('이미지를 선택해 주세요!');
    if (!newTitle.trim()) return alert('제목을 입력해 주세요!');

    try {
      const fileExt = imageFile.name.split('.').pop();

      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('gallery').insert([
        {
          title: newTitle.trim(),
          image: urlData.publicUrl,
        },
      ]);

      if (dbError) throw dbError;

      fetchPhotos();
      setNewTitle('');
      setImageFile(null);
      setImagePreview('');
      e.target.reset();
    } catch (err) {
      console.error('사진 업로드 실패:', err);
      alert('사진 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!confirm('이 사진을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      fetchPhotos();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  if (loading) return null;

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
            key={photo.id || index}
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

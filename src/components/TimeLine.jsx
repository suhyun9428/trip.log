import { useState, useEffect } from 'react';
import { Clock3, MapPin, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';
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
  const [loading, setLoading] = useState(true);

  const [newDay, setNewDay] = useState('DAY 1');
  const [newTime, setNewTime] = useState('12:00');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    day: '',
    time: '',
    title: '',
    desc: '',
  });

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('schedules').select('*');

      if (error) {
        console.error('Supabase 에러:', error);
        setSchedules(sortSchedules(DEFAULT_SCHEDULES));
        return;
      }

      if (!data || data.length === 0) {
        const { data: insertedData, error: insertError } = await supabase
          .from('schedules')
          .insert(DEFAULT_SCHEDULES)
          .select();

        if (insertError) {
          console.error('기본 데이터 삽입 실패:', insertError);
          setSchedules(sortSchedules(DEFAULT_SCHEDULES));
        } else {
          setSchedules(sortSchedules(insertedData || []));
        }
      } else {
        setSchedules(sortSchedules(data));
      }
    } catch (err) {
      console.error('스케줄 데이터 로드 예외 발생:', err);
      setSchedules(sortSchedules(DEFAULT_SCHEDULES));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert('제목을 입력해주세요!');

    const newItem = {
      day: newDay.toUpperCase().trim(),
      time: newTime.trim(),
      title: newTitle.trim(),
      desc: newDesc.trim(),
    };

    const { error } = await supabase.from('schedules').insert([newItem]);

    if (error) {
      console.error('추가 실패:', error);
      alert('일정 추가 중 오류가 발생했습니다.');
    } else {
      fetchSchedules();
      setNewTitle('');
      setNewDesc('');
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      day: item.day,
      time: item.time,
      title: item.title,
      desc: item.desc || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ day: '', time: '', title: '', desc: '' });
  };

  const handleSaveEdit = async (id) => {
    if (!editForm.title.trim()) return alert('제목을 입력해주세요!');

    const { error } = await supabase
      .from('schedules')
      .update({
        day: editForm.day.toUpperCase().trim(),
        time: editForm.time.trim(),
        title: editForm.title.trim(),
        desc: editForm.desc.trim(),
      })
      .eq('id', id);

    if (error) {
      console.error('수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    } else {
      setEditingId(null);
      fetchSchedules();
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!confirm('이 일정을 삭제하시겠습니까?')) return;

    const { error } = await supabase.from('schedules').delete().eq('id', id);

    if (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } else {
      fetchSchedules();
    }
  };

  if (loading) return null;

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
          placeholder="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="설명 🐤"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          <Plus size={16} /> 일정 추가
        </button>
      </form>

      <div className={styles.line} />

      {schedules.map((item, index) => {
        const isEditing = editingId === item.id;

        return (
          <motion.article
            key={item.id || index}
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
              {isEditing ? (
                <div className={styles.editFormBox}>
                  <div className={styles.editRow}>
                    <input
                      type="text"
                      value={editForm.day}
                      onChange={(e) =>
                        setEditForm({ ...editForm, day: e.target.value })
                      }
                      className={styles.editInputDay}
                      required
                    />
                    <input
                      type="time"
                      value={editForm.time}
                      onChange={(e) =>
                        setEditForm({ ...editForm, time: e.target.value })
                      }
                      className={styles.editInputTime}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className={styles.editInputTitle}
                    placeholder="제목"
                    required
                  />
                  <input
                    type="text"
                    value={editForm.desc}
                    onChange={(e) =>
                      setEditForm({ ...editForm, desc: e.target.value })
                    }
                    className={styles.editInputDesc}
                    placeholder="설명"
                  />
                  <div className={styles.editActions}>
                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={() => handleSaveEdit(item.id)}
                    >
                      <Check size={14} /> 저장
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={handleCancelEdit}
                    >
                      <X size={14} /> 취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.cardHeader}>
                    <span className={styles.day}>{item.day}</span>
                    <div className={styles.btnGroup}>
                      <button
                        type="button"
                        className={styles.editBtn}
                        onClick={() => handleStartEdit(item)}
                        title="수정"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteSchedule(item.id)}
                        title="삭제"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
                </>
              )}
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

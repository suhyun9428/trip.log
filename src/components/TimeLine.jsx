import { useState, useEffect } from 'react';
import {
  Clock3,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';
import styles from '../css/timeline.module.css';

const DEFAULT_SCHEDULES = [
  {
    day: 'DAY 1',
    time: '07:00',
    title: '서울 출발',
    desc: '말리부타고 경주로 출발 🚗',
    address: '서울역 KTX',
  },
  {
    day: 'DAY 1',
    time: '11:30',
    title: '점심',
    desc: '우리 뭐 먹지 🍜',
    address: '경북 경주시 포석로 1080',
  },
  {
    day: 'DAY 1',
    time: '14:30',
    title: '숙소',
    desc: '숙소 도착 후 환복하기',
    address: '경북 경주시 보문로 424',
  },
  {
    day: 'DAY 1',
    time: '16:30',
    title: '마라톤',
    desc: '무도런 🏃',
    address: '경북 경주시 신평동',
  },
  {
    day: 'DAY 1',
    time: '20:30',
    title: '야경',
    desc: '동궁과 월지 산책 🌙',
    address: '경북 경주시 원화로 102',
  },
  {
    day: 'DAY 2',
    time: '13:00',
    title: '점심',
    desc: '점심 뭐 먹을까?',
    address: '경북 경주시 황남동',
  },
  {
    day: 'DAY 2',
    time: '14:00',
    title: '간식',
    desc: '경주초콜릿, 미피빵집🐰',
    address: '경북 경주시 포석로 1058-1',
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

  // 추가 폼 상태
  const [newDay, setNewDay] = useState('DAY 1');
  const [newTime, setNewTime] = useState('12:00');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAddress, setNewAddress] = useState('');

  // 수정 상태 관리
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    day: '',
    time: '',
    title: '',
    desc: '',
    address: '',
  });

  // 복사된 카드 ID 상태
  const [copiedId, setCopiedId] = useState(null);

  // 1. Supabase에서 일정 불러오기
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('schedules').select('*');

      if (error) throw error;

      if (!data || data.length === 0) {
        const { data: insertedData, error: insertError } = await supabase
          .from('schedules')
          .insert(DEFAULT_SCHEDULES)
          .select();

        if (insertError) throw insertError;
        setSchedules(sortSchedules(insertedData || []));
      } else {
        setSchedules(sortSchedules(data));
      }
    } catch (err) {
      console.error('스케줄 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 2. 일정 추가
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert('제목을 입력해주세요!');

    const newItem = {
      day: newDay.toUpperCase().trim(),
      time: newTime.trim(),
      title: newTitle.trim(),
      desc: newDesc.trim(),
      address: newAddress.trim(),
    };

    const { error } = await supabase.from('schedules').insert([newItem]);

    if (error) {
      console.error('추가 실패:', error);
      alert('일정 추가 중 오류가 발생했습니다.');
    } else {
      fetchSchedules();
      setNewTitle('');
      setNewDesc('');
      setNewAddress('');
    }
  };

  // 3. 수정 모드 시작
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      day: item.day,
      time: item.time,
      title: item.title,
      desc: item.desc || '',
      address: item.address || '',
    });
  };

  // 4. 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ day: '', time: '', title: '', desc: '', address: '' });
  };

  // 5. 수정 저장
  const handleSaveEdit = async (id) => {
    if (!editForm.title.trim()) return alert('제목을 입력해주세요!');

    const { error } = await supabase
      .from('schedules')
      .update({
        day: editForm.day.toUpperCase().trim(),
        time: editForm.time.trim(),
        title: editForm.title.trim(),
        desc: editForm.desc.trim(),
        address: editForm.address.trim(),
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

  // 6. 일정 삭제
  const handleDeleteSchedule = async (id) => {
    if (!confirm('이 일정을 삭제하시겠습니까?')) return;

    const { error } = await supabase.from('schedules').delete().eq('id', id);

    if (error) {
      console.error('삭제 실패:', error);
    } else {
      fetchSchedules();
    }
  };

  // 7. 주소 클립보드 복사
  const handleCopyAddress = (id, address) => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000); // 2초 뒤 상태 초기화
  };

  // 8. 카카오맵 지도 검색 열기
  const handleOpenMap = (title, address) => {
    const query = address || title || '경주';
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(query)}`,
      '_blank'
    );
  };

  if (loading) return null;

  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.header}>
        <h2>Travel Schedule</h2>
        <p>우리의 경주 여행 일정</p>
      </div>

      {/* 일정 추가 폼 */}
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
        <input
          type="text"
          placeholder="주소 (예: 경북 경주시 포석로 1080)"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
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
                    placeholder="제목"
                    required
                  />
                  <input
                    type="text"
                    value={editForm.desc}
                    onChange={(e) =>
                      setEditForm({ ...editForm, desc: e.target.value })
                    }
                    placeholder="설명"
                  />
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm({ ...editForm, address: e.target.value })
                    }
                    placeholder="주소 입력"
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
                  <div className={styles.locationWrapper}>
                    <div className={styles.locationInfo}>
                      <MapPin size={15} />
                      <span>{item.address || '경주'}</span>
                    </div>

                    {item.address && (
                      <div className={styles.locationActions}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          onClick={() =>
                            handleCopyAddress(item.id, item.address)
                          }
                          title="주소 복사"
                        >
                          {copiedId === item.id ? (
                            <span className={styles.copiedText}>복사됨!</span>
                          ) : (
                            <>
                              <Copy size={13} /> 복사
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          onClick={() =>
                            handleOpenMap(item.title, item.address)
                          }
                          title="지도에서 열기"
                        >
                          <ExternalLink size={13} /> 지도
                        </button>
                      </div>
                    )}
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

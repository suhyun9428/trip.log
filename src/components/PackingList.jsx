import { useEffect, useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../supabase';
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

const CHECKED_LOCAL_STORAGE_KEY = 'gyeongju_packing_checked';

export default function PackingList() {
  const [items, setItems] = useState([]); // Supabase에서 가져온 준비물 목록
  const [checkedIds, setCheckedIds] = useState([]); // 내 기기 localStorage에 저장된 체크 ID 목록
  const [newItemText, setNewItemText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedChecked = localStorage.getItem(CHECKED_LOCAL_STORAGE_KEY);
    if (savedChecked) {
      try {
        setCheckedIds(JSON.parse(savedChecked));
      } catch (e) {
        console.error('체크 상태 로드 실패:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CHECKED_LOCAL_STORAGE_KEY, JSON.stringify(checkedIds));
  }, [checkedIds]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packing_items')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        const defaultData = DEFAULT_ITEMS.map((text) => ({ text }));
        const { data: inserted, error: insertErr } = await supabase
          .from('packing_items')
          .insert(defaultData)
          .select();

        if (!insertErr) {
          setItems(inserted || []);
        } else {
          setItems(DEFAULT_ITEMS.map((text, i) => ({ id: i + 1, text })));
        }
      } else {
        setItems(data);
      }
    } catch (err) {
      console.error('준비물 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    try {
      const { error } = await supabase
        .from('packing_items')
        .insert([{ text: newItemText.trim() }]);

      if (error) throw error;

      setNewItemText('');
      fetchItems();
    } catch (err) {
      console.error('항목 추가 실패:', err);
      alert('준비물 추가 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteItem = async (e, id) => {
    e.stopPropagation();
    if (!confirm('이 준비물 항목을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('packing_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCheckedIds((prev) => prev.filter((checkedId) => checkedId !== id));
      fetchItems();
    } catch (err) {
      console.error('항목 삭제 실패:', err);
    }
  };

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (loading) return null;

  return (
    <section id="packing" className={styles.wrapper}>
      <div className={styles.title}>
        <h2>🎒 Packing List</h2>
        <p>여행 전에 하나씩 체크하기</p>
      </div>

      <form onSubmit={handleAddItem} className={styles.addForm}>
        <input
          type="text"
          placeholder="추가할 준비물 입력 (예: 카메라)"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.addBtn}>
          <Plus size={16} /> 추가
        </button>
      </form>

      <div className={styles.grid}>
        {items.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`${styles.card} ${isChecked ? styles.checked : ''}`}
              onClick={() => toggleCheck(item.id)}
            >
              <span>{item.text}</span>
              <div className={styles.actionGroup}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={(e) => handleDeleteItem(e, item.id)}
                  title="삭제"
                >
                  <Trash2 size={14} />
                </button>
                <div className={styles.icon}>
                  <Check size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

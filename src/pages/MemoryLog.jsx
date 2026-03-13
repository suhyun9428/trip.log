import { Camera, Heart } from 'lucide-react';

export default function MemoryLog() {
  const memories = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1622329249789-994382583262?w=500',
      title: '경기전의 아침',
      date: '03.27',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1590333746438-281df6f3e30a?w=500',
      title: '전주 비빔밥',
      date: '03.27',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1621350058428-f0769d78ad8b?w=500',
      title: '막걸리 골목',
      date: '03.27',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1582845511110-e419d74e363c?w=500',
      title: '한옥 숙소 전경',
      date: '03.28',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1578321272176-b7bac0429b52?w=500',
      title: '오목대 야경',
      date: '03.28',
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=500',
      title: '남부시장 청년몰',
      date: '03.28',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9F7F2] overflow-y-auto pb-24">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 font-serif">
            전주의 조각들
          </h2>
          <Camera className="text-brand-jeonju" size={24} />
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          {memories.map((m) => (
            <div
              key={m.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
            >
              <img
                src={m.img}
                alt={m.title}
                className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 p-1.5 bg-white/70 backdrop-blur-sm rounded-full">
                <Heart size={14} className="text-red-400" fill="currentColor" />
              </div>
              <div className="p-3">
                <p className="text-[11px] text-brand-jeonju font-bold">
                  {m.date}
                </p>
                <p className="text-xs font-bold text-gray-700 mt-0.5 truncate">
                  {m.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

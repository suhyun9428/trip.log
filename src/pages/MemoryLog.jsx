import { Camera, Heart } from 'lucide-react';

export default function MemoryLog() {
  const memories = [
    {
      id: 1,
      img: 'https://i.namu.wiki/i/etqrOT6mryr-BJXTdNVSpI-tiSQqu6p5XhpEBJmCxhjjptfl_5YwFF73zSN9aGevwh9SbDcyaAWJGiSDzreXXXBSlCpLvqtljprP9nKpWT3pUK9vHhgjyEWAmgeWyCjczSCXtRXKaoAn_umUl737Eg.webp',
      title: '간사이 공항 도착',
      date: '06.24',
    },
    {
      id: 2,
      img: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/6157/article_head.jpg?t=1744767321',
      title: '도톤보리',
      date: '06.24',
    },
    {
      id: 3,
      img: 'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2023-03/ko-best-takoyaki-osaka_1.jpg?itok=OOsgTpmF',
      title: '타코야끼',
      date: '06.24',
    },
    {
      id: 4,
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/33/49/48/super-nintendo-world.jpg?w=800&h=-1&s=1',
      title: '유니버셜 스튜디오',
      date: '06.25',
    },
    {
      id: 5,
      img: 'https://rimage.savorjapan.com/svj/image/0004037687/photo/0004037687PHjFJUVKNVrs1WJpU_740x555.jpg?t=1753754216',
      title: '회전초밥집',
      date: '06.25',
    },
    {
      id: 6,
      img: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/w_1080/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ms7l2qvskvwwbofmfmtx.webp',
      title: '공중정원',
      date: '06.26',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9F7F2] overflow-y-auto pb-24">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 font-serif">
            오사카의 조각들
          </h2>
          <Camera className="text-brand-osaka" size={24} />
        </div>

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
                <p className="text-[11px] text-brand-osaka font-bold">
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

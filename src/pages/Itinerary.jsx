import { MapPin, Plus, Navigation2 } from 'lucide-react';

export default function Itinerary() {
  const osakaSpots = [
    // Day 1: 오사카 도착 및 도톤보리
    {
      id: 1,
      time: '14:00',
      place: '간사이 공항 도착',
      desc: '라피트 열차 타고 난바역으로 이동',
      transport: '🚆',
    },
    {
      id: 2,
      time: '18:00',
      place: '도톤보리 & 신사이바시',
      desc: '글리코상 인증샷 및 타코야끼 투어',
      transport: '🚶',
    },
    // Day 2: 유니버셜 스튜디오 재팬 (Full Day)
    {
      id: 3,
      time: '08:00',
      place: '유니버셜 스튜디오 재팬',
      desc: '닌텐도 월드 & 해리포터 확약권 체크!',
      transport: '🎡',
    },
    {
      id: 4,
      time: '20:00',
      place: '유니버설 시티워크',
      desc: '놀이기구 정복 후 즐기는 저녁 식사',
      transport: '🍴',
    },
    // Day 3: 우메다 공중정원
    {
      id: 5,
      time: '11:00',
      place: '우메다 스카이 빌딩',
      desc: '공중정원에서 오사카 전경 감상 후 출국 준비',
      transport: '🏙️',
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F9F7F2]">
      <div className="h-[40vh] shrink-0 bg-[#E5EADF] relative">
        <div className="absolute inset-0 flex items-center justify-center text-[#2D5A27]/30 font-serif italic">
          osaka Map View
        </div>
        <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
          <div className="bg-brand-jeonju text-white w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md z-10 text-[11px]">
            3
          </div>
          <MapPin className="text-brand-osaka -mt-1" size={28} fill="white" />
        </div>
        <div className="absolute top-[60%] left-[45%] flex flex-col items-center opacity-80">
          <div className="bg-brand-jeonju text-white w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md z-10 text-[9px]">
            2
          </div>
          <MapPin className="text-brand-osaka -mt-1" size={24} fill="white" />
        </div>
      </div>
      <div className="flex-1 bg-white rounded-t-[2.5rem] -mt-8 z-10 p-7 flex flex-col overflow-hidden border-t border-gray-100 shadow-[0_-10px_30px_rgba(45,90,39,0.08)]">
        <div className="flex justify-between items-end mb-6 shrink-0">
          <div>
            <h3 className="font-bold text-xl text-gray-900">6월 24일 수요일</h3>
            <p className="text-xs text-gray-400 mt-1">
              도톤보리의 활력이 가득한 오사카 시내 탐방
            </p>
          </div>
          <span className="text-[11px] text-brand-osaka font-bold bg-brand-jeonju/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Day 1
          </span>
        </div>

        {/* 실제 스크롤되는 리스트 부분 */}
        <div className="flex-1 overflow-y-auto pr-1 pb-28 ml-2 relative no-scrollbar">
          {osakaSpots.map((spot, index) => (
            <div key={spot.id} className="relative pl-8 pb-8">
              {' '}
              {/* pb-8로 아이템 간 간격 확보 */}
              {/* 1. 수직 점선 (마지막 아이템은 선이 없어야 함) */}
              {index !== osakaSpots.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-0 w-[1px] border-l border-dashed border-gray-300"></div>
              )}
              {/* 2. 타임라인 포인트 (동그라미) */}
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-brand-osaka rounded-full border-4 border-white shadow-sm z-10"></div>
              {/* 3. 카드 콘텐츠 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-brand-osaka">
                      {spot.time}
                    </span>
                    <h4 className="font-bold text-gray-800 text-sm">
                      {spot.place}
                    </h4>
                  </div>
                  <span className="text-sm">{spot.transport}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-light">
                  {spot.desc}
                </p>

                {spot.id < osakaSpots.length && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1">
                    <Navigation2
                      size={10}
                      className="text-gray-300 rotate-90"
                    />
                    <span className="text-[11px] text-gray-300">
                      다음 장소까지 이동 예정
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 플로팅 버튼 (전주 테마 컬러) */}
      <button className="fixed bottom-24 right-6 bg-brand-osaka text-white p-4 rounded-full shadow-2xl z-30 active:scale-90 transition-all">
        <Plus size={24} />
      </button>
    </div>
  );
}

import { MapPin, Plus, Navigation2 } from 'lucide-react';

export default function Itinerary() {
  // 전주 동선 데이터
  const jeonjuSpots = [
    {
      id: 1,
      time: '13:00',
      place: '전주역 (KTX)',
      desc: '택시로 한옥마을 이동 (약 15분)',
      transport: '🚗',
    },
    {
      id: 2,
      time: '14:30',
      place: '전동성당',
      desc: '한국 최초의 로마네스크 양식 성당 앞에서 인증샷',
      transport: '🚶',
    },
    {
      id: 3,
      time: '15:30',
      place: '경기전 담장길',
      desc: '태조 이성계 어진 관람 및 대나무숲 산책',
      transport: '🚶',
    },
    {
      id: 4,
      time: '17:30',
      place: '전주 한옥마을 숙소',
      desc: '한옥 체험 숙소 체크인 및 짐 풀기',
      transport: '🚶',
    },
    {
      id: 5,
      time: '19:00',
      place: '삼천동 막걸리 골목',
      desc: '푸짐한 한상차림과 함께 전주의 밤 즐기기',
      transport: '🚗',
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F9F7F2]">
      {/* 1. 지도 영역 (전주 주요 거점 마커) */}
      <div className="h-[40vh] shrink-0 bg-[#E5EADF] relative">
        <div className="absolute inset-0 flex items-center justify-center text-[#2D5A27]/30 font-serif italic">
          Jeonju Map View
        </div>

        {/* 경기전 마커 */}
        <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
          <div className="bg-brand-jeonju text-white w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md z-10 text-[10px]">
            3
          </div>
          <MapPin className="text-brand-jeonju -mt-1" size={28} fill="white" />
        </div>

        {/* 전동성당 마커 */}
        <div className="absolute top-[60%] left-[45%] flex flex-col items-center opacity-80">
          <div className="bg-brand-jeonju text-white w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-md z-10 text-[9px]">
            2
          </div>
          <MapPin className="text-brand-jeonju -mt-1" size={24} fill="white" />
        </div>
      </div>

      {/* 2. 타임라인 영역 (전주 감성 적용) */}
      <div className="flex-1 bg-white rounded-t-[2.5rem] -mt-8 z-10 p-7 flex flex-col overflow-hidden border-t border-gray-100 shadow-[0_-10px_30px_rgba(45,90,39,0.08)]">
        <div className="flex justify-between items-end mb-6 shrink-0">
          <div>
            <h3 className="font-bold text-xl text-gray-900">3월 27일 금요일</h3>
            <p className="text-xs text-gray-400 mt-1">
              한옥마을 중심 도보 여행
            </p>
          </div>
          <span className="text-[11px] text-brand-jeonju font-bold bg-brand-jeonju/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Day 1
          </span>
        </div>

        {/* 실제 스크롤되는 리스트 부분 */}
        <div className="flex-1 overflow-y-auto pr-1 pb-28 ml-2 relative no-scrollbar">
          {jeonjuSpots.map((spot, index) => (
            <div key={spot.id} className="relative pl-8 pb-8">
              {' '}
              {/* pb-8로 아이템 간 간격 확보 */}
              {/* 1. 수직 점선 (마지막 아이템은 선이 없어야 함) */}
              {index !== jeonjuSpots.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-0 w-[1px] border-l border-dashed border-gray-300"></div>
              )}
              {/* 2. 타임라인 포인트 (동그라미) */}
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-brand-jeonju rounded-full border-4 border-white shadow-sm z-10"></div>
              {/* 3. 카드 콘텐츠 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-jeonju">
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

                {spot.id < jeonjuSpots.length && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1">
                    <Navigation2
                      size={10}
                      className="text-gray-300 rotate-90"
                    />
                    <span className="text-[10px] text-gray-300">
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
      <button className="fixed bottom-24 right-6 bg-brand-jeonju text-white p-4 rounded-full shadow-2xl z-30 active:scale-90 transition-all">
        <Plus size={24} />
      </button>
    </div>
  );
}

import { Clock, Users, Ticket, Bell, ChevronRight, Info } from 'lucide-react';

export default function LiveBooking() {
  // 실시간 혼잡도 및 대기 시간 데이터
  const waitTimes = [
    { time: '10', level: 40 },
    { time: '11', level: 60 },
    { time: '12', level: 90 },
    { time: '13', level: 85 },
    { time: '14', level: 75 },
    { time: '15', level: 95 }, // 현재 시간 (피크)
    { time: '16', level: 80 },
    { time: '17', level: 60 },
    { time: '18', level: 40 },
    { time: '19', level: 30 },
  ];

  const currentHour = '15';

  return (
    <div className="flex flex-col h-screen bg-white overflow-y-auto pb-32 no-scrollbar">
      {/* 1. 상단 비주얼 영역 */}
      <div className="relative h-[35vh] shrink-0 bg-brand-osaka overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800"
            className="w-full h-full object-cover"
            alt="USJ Background"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-osaka to-transparent"></div>

        <div className="absolute bottom-12 left-7 right-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-usj-yellow text-brand-osaka text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm">
              LIVE STATUS
            </span>
            <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
              Osaka, Japan
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">
            유니버셜 스튜디오 재팬
          </h1>
          <p className="text-white/60 text-xs mt-1">
            오늘의 예상 혼잡도:{' '}
            <span className="text-usj-yellow">매우 높음(A)</span>
          </p>
        </div>
      </div>

      {/* 2. 실시간 대기 그래프 섹션 */}
      <div className="flex-1 bg-white rounded-t-[2.5rem] -mt-8 z-10 p-7 space-y-8">
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clock className="text-brand-osaka" size={20} />
              <h3 className="font-bold text-gray-900">
                시간대별 예상 대기 시간
              </h3>
            </div>
            <Info size={16} className="text-gray-300" />
          </div>

          <div className="flex items-end justify-between h-32 gap-1.5 px-1 border-b border-gray-100">
            {waitTimes.map((d) => {
              const isCurrent = d.time === currentHour;
              return (
                <div
                  key={d.time}
                  className="flex-1 flex flex-col items-center group h-full justify-end"
                >
                  <div
                    style={{ height: `${d.level}%` }}
                    className={`w-full rounded-t-full transition-all duration-700 min-h-[6px] ${
                      isCurrent
                        ? 'bg-gradient-to-t from-brand-osaka to-[#60A5FA] shadow-[0_0_15px_rgba(96,165,250,0.5)]'
                        : 'bg-blue-50 group-hover:bg-blue-100'
                    }`}
                  ></div>
                  <span
                    className={`text-[9px] mt-2 font-medium shrink-0 ${
                      isCurrent
                        ? 'text-brand-osaka font-black'
                        : 'text-gray-300'
                    }`}
                  >
                    {d.time}시
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. 어트랙션 퀵 상태 카드 */}
        <section className="space-y-4">
          <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
            <Ticket size={16} className="text-brand-osaka" /> 주요 어트랙션 현황
          </h4>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">
                  🍄
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    마리오 카트: 쿠파의 도전장
                  </p>
                  <p className="text-[11px] text-red-500 font-bold">
                    대기 110분 / 익스프레스 권장
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">
                  🪄
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    해리 포터 앤드 더 포비든 저니
                  </p>
                  <p className="text-[11px] text-green-500 font-bold">
                    대기 45분 / 원활
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </section>

        {/* 4. 오픈런 알림 설정 */}
        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-center justify-between">
          <div>
            <p className="font-bold text-brand-osaka text-sm">
              확약권 오픈 알림
            </p>
            <p className="text-[11px] text-blue-400 mt-0.5">
              정리권/확약권 발급 시작 시 푸시 알림
            </p>
          </div>
          <button className="bg-white p-3 rounded-full shadow-sm text-brand-osaka active:scale-90 transition-all">
            <Bell size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* 5. 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t p-5 px-7 z-50">
        <button className="w-full bg-gradient-to-r from-brand-osaka to-[#003A70] text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-osaka/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2">
          익스프레스 패스 잔여수량 확인
        </button>
      </div>
    </div>
  );
}

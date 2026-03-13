import { useState } from 'react';

export default function LiveBooking() {
  const hourlyData = [
    { time: 11, level: 30 },
    { time: 12, level: 60 },
    { time: 13, level: 90 },
    { time: 14, level: 70 },
    { time: 15, level: 40 },
    { time: 16, level: 30 },
    { time: 17, level: 50 },
    { time: 18, level: 85 },
    { time: 19, level: 95 },
    { time: 20, level: 60 },
    { time: 21, level: 40 },
  ];

  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // 현재 혼잡도 상태 계산 로직
  const getCurrentStatus = () => {
    const data = hourlyData.find((d) => d.time === currentHour) || {
      level: 50,
    };
    if (data.level >= 80)
      return { text: '매우 혼잡', color: 'text-red-500', bg: 'bg-red-50' };
    if (data.level >= 50)
      return { text: '보통', color: 'text-orange-500', bg: 'bg-orange-50' };
    return { text: '여유', color: 'text-brand-mint', bg: 'bg-brand-jeonju/10' };
  };

  const status = getCurrentStatus();

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
      <div className="relative h-60 shrink-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
          className="w-full h-full object-cover"
          alt="Restaurant"
        />
        <div className="absolute top-4 left-4 bg-brand-jeonju text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse shadow-lg">
          ● LIVE - 4 Seats Left
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              조점례 남문피순대
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              남부시장 내 위치 • 24시간 영업
            </p>
          </div>
          <div className="bg-brand-jeonju/10 text-brand-jeonju px-3 py-1 rounded-lg font-bold text-xs">
            현재 여유
          </div>
        </div>

        <div className="mt-10 bg-[#F9F7F2] p-5 rounded-2xl border border-brand-jeonju/10">
          <h4 className="text-sm font-bold text-gray-700 mb-6">
            🥣 국밥집 실시간 웨이팅 현황
          </h4>

          <div className="flex items-end justify-between h-32 gap-1.5 px-1 border-b border-gray-100">
            {hourlyData.map((d) => {
              const isCurrent = d.time === currentHour;

              return (
                <div
                  key={d.time}
                  className="flex-1 flex flex-col items-center group h-full justify-end"
                >
                  <div
                    style={{ height: `${d.level}%` }}
                    className={`w-full rounded-t-sm transition-all duration-700 min-h-[6px] ${
                      isCurrent
                        ? 'bg-gradient-to-t from-brand-jeonju to-[#84a37e] shadow-[0_0_15px_rgba(132,163,126,0.4)] scale-110'
                        : 'bg-gray-200 group-hover:bg-gray-300'
                    }`}
                  ></div>

                  <span
                    className={`text-[9px] mt-2 font-medium shrink-0 transition-colors ${
                      isCurrent
                        ? 'text-brand-jeonju font-extrabold'
                        : 'text-gray-300'
                    }`}
                  >
                    {d.time}시
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-brand-jeonju to-[#4A7A44] text-white font-bold py-4 rounded-2xl mt-8 shadow-xl shadow-brand-jeonju/20 active:scale-[0.97] transition-all">
          실시간 예약하기
        </button>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          * 현재 데이터는 실제 매장 상황과 5-10분 정도 차이가 날 수 있습니다.
        </p>
      </div>
    </div>
  );
}

import { Search, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  var today = new Date();
  const theDay = new Date('2026-04-03');
  var diffDate = theDay.getTime() - today.getTime();
  var dDay = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

  return (
    <div className="p-5 space-y-6 h-full overflow-y-auto">
      {/* 환영 메시지 & 검색 */}
      <header className="mt-4">
        <h2 className="text-xl font-bold">
          여행자님, 전주의 고즈넉한 아침입니다.
        </h2>
        <div className="mt-4 flex items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="어디로 떠나볼까요?"
            className="outline-none text-sm w-full"
          />
        </div>
      </header>

      {/* 다가오는 여행 카드 */}
      <section className="bg-brand-jeonju p-6 rounded-[2rem] text-white shadow-lg relative overflow-hidden mb-0">
        <div className="absolute right-[-10px] top-[-10px] opacity-10 text-8xl">
          🏯
        </div>
        <p className="text-sm opacity-90 font-light">가장 한국적인 도시</p>
        <h3 className="text-2xl font-bold mt-1">전주 한옥마을 🇰🇷</h3>
        <p className="mt-4 text-xs font-medium bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
          D-{dDay} | 04.03 - 04.04
        </p>
      </section>

      {/* 오늘의 할 일 */}
      <section className="py-8">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h4 className="font-bold text-lg text-gray-800">
              오늘의 추천 전주
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              전주 현지인들도 사랑하는 장소들
            </p>
          </div>
          <button className="text-xs text-brand-jeonju font-bold">
            전체보기
          </button>
        </div>

        <div className="space-y-5">
          {/* 추천 1: 막걸리 골목 */}
          <Link
            to="/activity-details"
            className="block bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-50 active:scale-[0.98] transition-transform"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop"
                className="h-44 w-full object-cover"
                alt="Makgeolli"
                onError={(e) =>
                  (e.target.src =
                    'https://placehold.co/600x400?text=Jeonju+Food')
                }
              />
              <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full border border-white/20">
                Must Visit
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-jeonju uppercase tracking-wider">
                  Food & Night
                </span>
                <div className="flex items-center gap-0.5 text-orange-400 text-xs">
                  <Star size={12} fill="currentColor" /> 4.8
                </div>
              </div>
              <p className="font-bold mt-2 text-gray-800 text-lg">
                삼천동 막걸리 골목 '한상차림'
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                안주가 계속해서 나오는 전주만의 독특한 술문화
              </p>
            </div>
          </Link>

          {/* 추천 2: 전동성당 산책 */}
          <div className="block bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-50 p-4 flex gap-4 items-center">
            <img
              src="https://images.pexels.com/photos/10105051/pexels-photo-10105051.jpeg?auto=compress&cs=tinysrgb&w=300"
              className="w-20 h-20 rounded-2xl object-cover shrink-0"
              alt="Church"
              onError={(e) =>
                (e.target.src = 'https://placehold.co/200x200?text=Jeonju')
              }
            />
            <div className="flex-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase">
                Culture
              </span>
              <p className="font-bold text-gray-800 text-sm mt-0.5">
                전동성당 & 경기전 산책
              </p>
              <p className="text-[10px] text-gray-400 mt-1 italic">
                도보 5분 거리의 역사적인 명소
              </p>
            </div>
            <div className="bg-gray-50 p-2 rounded-full">
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

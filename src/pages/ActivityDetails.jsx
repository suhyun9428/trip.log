import {
  ChevronLeft,
  Clock,
  MapPin,
  Star,
  Share2,
  Heart,
  GlassWater,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActivityDetails() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#F9F7F2] overflow-y-auto pb-24">
      {/* 히어로 이미지 */}
      <div className="relative h-[40vh] shrink-0">
        <img
          src="https://images.unsplash.com/photo-1621350058428-f0769d78ad8b?w=800" // 막걸리/안주 이미지
          className="w-full h-full object-cover"
          alt="Jeonju Makgeolli"
        />
        <div className="absolute top-6 left-5 right-5 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-[2.5rem] -mt-10 z-10 p-7 space-y-6">
        <div>
          <span className="text-brand-jeonju font-bold text-xs bg-brand-jeonju/10 px-2 py-0.5 rounded">
            미식 투어
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            전주 삼천동 막걸리 골목
            <br />
            '한상차림' 정복 투어
          </h1>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl shrink-0 border border-gray-100">
            <GlassWater className="text-brand-jeonju" size={18} />
            <p className="text-xs font-bold text-gray-800">
              막걸리 2주전자 포함
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl shrink-0 border border-gray-100">
            <Clock className="text-brand-jeonju" size={18} />
            <p className="text-xs font-bold text-gray-800">18:00 시작</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-800">소개</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            전주에 왔다면 놓칠 수 없는 막걸리 골목 투어! 주전자를 추가할 때마다
            육해공을 넘나드는 새로운 안주가 깔리는 전주만의 독특한 문화를
            경험해보세요. 현지인 가이드가 들려주는 막걸리 이야기와 함께 최고의
            안주 조합을 즐길 수 있습니다.
          </p>
        </div>
      </div>

      {/* 하단 구매 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-5 flex items-center justify-between z-50">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            2인 기준 세트
          </p>
          <p className="text-xl font-black text-gray-900">45,000원</p>
        </div>
        <button className="bg-brand-jeonju text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-brand-jeonju/20">
          지금 예약하기
        </button>
      </div>
    </div>
  );
}

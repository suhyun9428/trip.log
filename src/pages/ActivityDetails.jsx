import {
  ChevronLeft,
  Clock,
  MapPin,
  Star,
  Share2,
  Heart,
  Utensils,
  Navigation,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActivityDetails() {
  const navigate = useNavigate();

  // Savor Japan 추천 맛집 데이터
  const restaurants = [
    {
      id: 1,
      name: '프레지던트 지보 미나미본점',
      tag: '고급 오코노미야키',
      desc: '셰프가 눈앞에서 펼치는 철판 요리 퍼포먼스! 세련된 카운터석에서 즐기는 프리미엄 오사카의 맛.',
      price: '평균 10,000엔',
      img: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/6157/article_342058_w640z.jpg',
    },
    {
      id: 2,
      name: '소사쿠쿠시카츠 보야테쓰',
      tag: '창작 쿠시카츠',
      desc: '계절 재료를 활용한 창작 꼬치튀김을 오마카세 스타일로. 와인 페어링이 일품인 차분한 분위기.',
      price: '평균 5,000엔',
      img: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/6157/article_342059_w640z.jpg',
    },
    {
      id: 3,
      name: '이타마에 야키니쿠 이치규',
      tag: '암소 와규 전문점',
      desc: "고소하고 부드러운 암소 와규만을 고집. 비주얼 폭발하는 '8단 계단 모듬'은 필수 주문 메뉴!",
      price: '평균 6,000엔',
      img: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/6157/article_342061_w640z.jpg',
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-y-auto pb-32 no-scrollbar">
      <div className="relative h-[36vh] shrink-0">
        <img
          src="https://rimage.savorjapan.com/svj/image/discover_oishii_japan/6157/article_head.jpg?t=1744767321"
          className="w-full h-full object-cover"
          alt="Dotonbori Guide"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

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

        <div className="absolute bottom-14 left-7 text-white">
          <span className="text-[10px] font-bold bg-brand-osaka px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">
            Editor's Pick
          </span>
          <h1 className="text-2xl font-black">도톤보리 맛집 가이드</h1>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 bg-white rounded-t-[2.5rem] -mt-10 z-10 p-7 space-y-8">
        {/* 요약 태그 */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 bg-sky-50 px-4 py-2.5 rounded-full shrink-0 border border-sky-100">
            <Utensils className="text-brand-osaka" size={16} />
            <p className="text-xs font-bold text-brand-osaka">미식 투어</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full shrink-0 border border-gray-100">
            <MapPin className="text-gray-400" size={16} />
            <p className="text-xs font-bold text-gray-600">난바/도톤보리</p>
          </div>
        </div>

        {/* 맛집 리스트 섹션 */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-bold text-xl text-gray-900 font-serif">
              도톤보리 추천 명소 3선
            </h3>
            <span className="text-[10px] text-gray-400 italic">
              source: Savor Japan
            </span>
          </div>

          {restaurants.map((shop) => (
            <div
              key={shop.id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-40">
                <img
                  src={shop.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={shop.name}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-brand-osaka shadow-sm">
                  {shop.price}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-brand-osaka uppercase tracking-widest">
                      {shop.tag}
                    </span>
                    <h4 className="font-bold text-lg text-gray-800 mt-0.5">
                      {shop.name}
                    </h4>
                  </div>
                  <div className="bg-sky-50 p-2 rounded-xl text-brand-osaka">
                    <Navigation size={16} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  {shop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 소개 */}
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-2">💡 여행 꿀팁</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            도톤보리는 낮보다 밤이 더 활기차요! 글리코상 앞에서 인증샷을 찍고 난
            뒤, 좁은 골목 안쪽의 숨은 맛집을 찾아보는 재미를 느껴보세요. 인기
            매장은 사전 예약이 필수입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

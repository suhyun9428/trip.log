import { Search, Star, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  var today = new Date();
  const theDay = new Date('2026-06-24');
  var diffDate = theDay.getTime() - today.getTime();
  var dDay = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

  return (
    <div className="box__home-wrap p-5 space-y-6 h-full overflow-y-auto">
      <header className="box__header">
        <p className="text__subtitle">환영합니다, 여행자님! 👋</p>
        <h2 className="text__title">
          오사카의 여름을
          <br />
          <span className="text-brand-osaka">마음껏 즐길 시간!</span>
        </h2>
        <div className="box__trip-info">
          <Search className="image__search" size={20} />
          <input
            type="text"
            placeholder="어디로 떠나볼까요?"
            className="form__input"
          />
        </div>
      </header>
      <section className="box__upcoming-info">
        <div className="box__inner">
          <div className="box__title">
            <p className="text__subtitle">Upcoming Trip</p>
            <h3 className="text__title">오사카, 일본 🇯🇵</h3>
          </div>
          <div className="box__date">
            <p className="text__dday">D-{`${dDay}`}</p>
            <p className="text__period">2026.06.24 - 06.26</p>
          </div>
          <div className="box__members">
            {[1, 2].map((i) => (
              <div key={i} className="box__image">
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="user"
                />
              </div>
            ))}
            <button className="button__more" type="button">
              +2
            </button>
          </div>
          <div className="box__plane">
            <Plane size={20} className="image" />
          </div>
        </div>
      </section>
      <section className="box__recommend">
        <div className="box__inner">
          <div className="box__title-wrap">
            <div className="box__title">
              <h4 className="text__title">오늘의 추천 오사카</h4>
              <p className="text__subtitle">
                오사카 현지인들도 사랑하는 장소들
              </p>
            </div>
            <button type="button" className="button__all">
              전체보기
            </button>
          </div>
          <div className="box__content">
            <Link to="/activity-details" className="link__content">
              <div className="box__image">
                <img
                  src="https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800"
                  className="image"
                  alt="USJ"
                />
                <span className="text__tag">Hot Place</span>
              </div>
              <div className="box__info">
                <span className="text">Theme Park</span>
                <p className="text__title">유니버셜 스튜디오 재팬</p>
                <p className="text__description">
                  슈퍼 닌텐도 월드 & 해리 포터의 마법 세계
                </p>
                <div className="box__stars">
                  <Star size={12} fill="currentColor" className="image" />
                  <span className="text">4.9</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

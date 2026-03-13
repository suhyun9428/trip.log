import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="h-[57px] shrink-0 bg-white border-t flex justify-around items-center z-50">
      <Link to="/" className="text-gray-600 focus:color-brand-mint">
        🏠 홈
      </Link>
      <Link to="/itinerary" className="text-gray-600 focus:color-brand-mint">
        📍 일정
      </Link>
      <Link to="/live" className="text-gray-600 focus:color-brand-mint">
        🔥 예약
      </Link>
      <Link to="/memory" className="text-gray-600 focus:color-brand-mint">
        📸 기록
      </Link>
    </nav>
  );
};

export default Navigation;

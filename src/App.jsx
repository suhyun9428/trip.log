import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Live from './pages/LiveBooking';
import Memory from './pages/MemoryLog';
import ActivityDetails from './pages/ActivityDetails';
import Navigation from './components/Navigation';
import { useLocation } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const showNav = location.pathname !== ('/activity-details' || '/live');
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white">
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/live" element={<Live />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/activity-details" element={<ActivityDetails />} />
        </Routes>
      </main>
      {showNav && <Navigation />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

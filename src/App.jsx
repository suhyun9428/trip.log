import Header from './components/Header';
import Hero from './components/Hero';
import GoalCard from './components/GoalCard';
import TimeLine from './components/TimeLine';
import DdayCard from './components/DdayCard';
import PackingList from './components/PackingList';
import Gallery from './components/Gallery';

import './trip.css';

function App() {
  return (
    <>
      <Header />

      <Hero />

      <main className="container">
        <DdayCard />
        <GoalCard />
        <TimeLine />
        <PackingList />
        <Gallery />
      </main>
    </>
  );
}

export default App;

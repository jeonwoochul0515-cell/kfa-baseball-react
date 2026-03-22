import './styles/global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import MatchResults from './components/MatchResults';
import Schedule from './components/Schedule';
import Roster from './components/Roster';
import Staff from './components/Staff';
import Timeline from './components/Timeline';
import Sponsors from './components/Sponsors';
import Members from './components/Members';
import Equipment from './components/Equipment';
import Finance from './components/Finance';
import BaseballGuide from './components/BaseballGuide';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <MatchResults />
      <Schedule />
      <Roster />
      <Staff />
      <BaseballGuide />
      <Timeline />
      <Equipment />
      <Finance />
      <Sponsors />
      <Members />
      <Footer />
    </>
  );
}

export default App;

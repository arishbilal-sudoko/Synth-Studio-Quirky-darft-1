import useScrollVars from './hooks/useScrollVars.js';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import LogoWall from './components/LogoWall.jsx';
import Projects from './components/Projects.jsx';
import { StatementDark, StatementLight } from './components/Statement.jsx';
import TextMarquee from './components/TextMarquee.jsx';
import Services from './components/Services.jsx';
import CtaCard from './components/CtaCard.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useScrollVars();
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <LogoWall />
        <Projects />
        <StatementDark />
        <TextMarquee />
        <div className="light">
          <Services />
          <StatementLight />
          <CtaCard />
        </div>
      </main>
      <Footer />
    </>
  );
}

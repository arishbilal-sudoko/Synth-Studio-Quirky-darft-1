import Hero from '../components/Hero.jsx';
import LogoWall from '../components/LogoWall.jsx';
import Projects from '../components/Projects.jsx';
import { StatementDark, StatementLight } from '../components/Statement.jsx';
import TextMarquee from '../components/TextMarquee.jsx';
import Services from '../components/Services.jsx';
import CtaCard from '../components/CtaCard.jsx';

export default function HomePage() {
  return (
    <main tabIndex="-1">
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
  );
}

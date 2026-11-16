import Marquee from './Marquee.jsx';
import { CLIENTS } from '../data.js';

const GLYPHS = [
  <circle cx="12" cy="12" r="9" />,
  <path d="M12 2 L22 21 H2Z" />,
  <rect x="3" y="3" width="18" height="18" rx="4" />,
  <path d="M12 2 L22 12 L12 22 L2 12Z" />,
  <path d="M3 12 a9 9 0 0 1 18 0 z M3 14 h18 v6 h-18z" />,
  <path d="M12 2 L14.6 9.4 L22 12 L14.6 14.6 L12 22 L9.4 14.6 L2 12 L9.4 9.4Z" />,
  <path d="M4 20 V4 H12 a8 8 0 0 1 0 16Z" />,
];
const STYLES = [
  { fontWeight: 800, letterSpacing: '-0.02em' },
  { fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.78em' },
  { fontWeight: 600, fontStyle: 'italic' },
  { fontWeight: 300, letterSpacing: '0.04em' },
  { fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85em' },
];

function Logo({ name, i }) {
  return (
    <div className="logowall__item" title="Client logo placeholder">
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">{GLYPHS[i % GLYPHS.length]}</svg>
      <span style={STYLES[i % STYLES.length]}>{name}</span>
    </div>
  );
}

export default function LogoWall() {
  const split = Math.ceil(CLIENTS.length / 2);
  const a = CLIENTS.slice(0, split);
  const b = CLIENTS.slice(split);
  return (
    <section className="logowall" aria-label="Clients">
      <Marquee speed={38} dir={-1}>
        {a.map((n, i) => <Logo key={n} name={n} i={i} />)}
      </Marquee>
      <Marquee speed={38} dir={1}>
        {b.map((n, i) => <Logo key={n} name={n} i={i + 3} />)}
      </Marquee>
    </section>
  );
}

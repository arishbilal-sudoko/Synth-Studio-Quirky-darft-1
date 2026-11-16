import { useEffect, useRef, useState } from 'react';
import PhysicsField from './PhysicsField.jsx';
import RotatingBadge from './RotatingBadge.jsx';
import { Stickers } from './Art.jsx';

const LINES = ['Web Studio', 'Design & Development', '& Digital Marketing'];

const ITEMS = [
  { key: 'melon', size: 74, x: 0.62, node: Stickers.melon },
  { key: 'green', size: 66, x: 0.42, node: Stickers.smileyGreen },
  { key: 'pink', size: 66, x: 0.5, node: Stickers.smileyPink },
  { key: 'tag', size: 84, x: 0.7, node: Stickers.tag },
  { key: 'eyes', size: 58, x: 0.57, node: Stickers.eyes },
  { key: 'blob', size: 62, x: 0.78, node: Stickers.blob },
  { key: 'cloud', size: 70, x: 0.3, node: Stickers.cloud },
  { key: 'bolt', size: 56, x: 0.18, node: Stickers.bolt },
  { key: 'heart', size: 52, x: 0.9, node: Stickers.heartSticker },
];

export default function Hero() {
  const [go, setGo] = useState(false);
  const card = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 450);
    return () => clearTimeout(t);
  }, []);

  // soft light that trails the pointer across the gradient
  useEffect(() => {
    const el = card.current;
    const g = glow.current;
    if (!el || !g) return;
    let tx = 0.5, ty = 0.5, x = 0.5, y = 0.5, raf;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    const tick = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      g.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    el.addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__card" ref={card}>
        <div className="mesh" aria-hidden="true">
          <i className="mesh__blob mesh__blob--a" />
          <i className="mesh__blob mesh__blob--b" />
          <i className="mesh__blob mesh__blob--c" />
          <i className="mesh__blob mesh__blob--d" />
          <i className="mesh__blob mesh__blob--e" />
          <i className="mesh__blob mesh__blob--f" />
          <span className="mesh__glow-wrap"><i className="mesh__glow" ref={glow} /></span>
          <i className="mesh__shade" />
          <i className="mesh__grain" />
        </div>

        <div className={`hero__content ${go ? 'is-in' : ''}`}>
          <h1 className="hero__title">
            {LINES.map((l, i) => (
              <span className="line" key={l}>
                <span style={{ '--d': `${0.1 + i * 0.12}s` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero__lede mono">
            Synthweb Studio is a <b>web studio based in [Your City]</b> since [Year]. We started
            building for the web early; today we craft sites for <b>users aged 7 to 77</b>.
          </p>
        </div>

        <PhysicsField items={ITEMS} active={go} className="physics--hero" />
      </div>

      <div className="hero__badge">
        <RotatingBadge center="arrow" size={132} tone="dark" text="Need a website? · Contact & Quote · " />
      </div>
    </section>
  );
}

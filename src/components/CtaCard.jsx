import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView.js';

export default function CtaCard() {
  const [ref, seen] = useInView({ threshold: 0.25 });
  const card = useRef(null);

  useEffect(() => {
    const el = card.current;
    let raf;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty('--py', `${Math.max(-1, Math.min(1, p)) * 28}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="cta" id="pricing" ref={ref}>
      <div ref={card} className={`cta__card reveal ${seen ? 'in' : ''}`}>
        <div className="cta__text">
          <span className="mono">Let&rsquo;s gooo !!</span>
          <h2>
            Do you need <span className="hl">a website</span>?
          </h2>
          <a href="#contact" className="pill pill--cool">
            <span>Let&rsquo;s talk !</span>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
        <div className="cta__art">
          <img src="/cta-rocket.png" alt="Colourful abstract rocket launching into space" />
        </div>
      </div>
    </section>
  );
}

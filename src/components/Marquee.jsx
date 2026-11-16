import { useEffect, useRef } from 'react';

/**
 * Infinite marquee. Speed is pushed along by scroll velocity,
 * so it feels like the page is dragging the ticker.
 */
export default function Marquee({ children, speed = 60, dir = -1, className = '', gap = 0 }) {
  const track = useRef(null);
  const half = useRef(null);

  useEffect(() => {
    const el = track.current;
    let x = 0;
    let last = performance.now();
    let raf;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (t) => {
      const dt = (t - last) / 1000;
      last = t;
      const w = half.current ? half.current.offsetWidth : 0;
      if (w && !reduce) {
        const boost = 1 + Math.min(6, Math.abs(window.__scrollVel || 0) * 0.35);
        x += dir * speed * boost * dt;
        if (x <= -w) x += w;
        if (x > 0) x -= w;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, dir]);

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" ref={track} style={{ '--gap': `${gap}px` }}>
        <div className="marquee__half" ref={half}>{children}</div>
        <div className="marquee__half" aria-hidden="true">{children}</div>
        <div className="marquee__half" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

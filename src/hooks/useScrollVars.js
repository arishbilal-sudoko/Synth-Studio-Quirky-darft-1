import { useEffect } from 'react';

/**
 * Publishes global scroll values used across the site:
 *   --spin   : degrees, drives the rotating circular badges
 *   window.__scrollVel : smoothed scroll velocity, drives marquee speed
 */
export default function useScrollVars() {
  useEffect(() => {
    let last = window.scrollY;
    let vel = 0;
    let raf;
    window.__scrollVel = 0;

    const tick = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      vel += (dy - vel) * 0.12;
      window.__scrollVel = vel;
      document.documentElement.style.setProperty('--spin', `${y * 0.35}deg`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}

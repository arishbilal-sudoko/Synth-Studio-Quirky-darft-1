import { useEffect, useRef } from 'react';

/** Custom cursor with an outlined pointer and explicit labelled hover bubble. */
export default function Cursor() {
  const arrow = useRef(null);
  const bubble = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    let x = -120;
    let y = -120;
    let ax = x;
    let ay = y;
    let bx = x;
    let by = y;
    let raf;
    let mode = 'arrow';
    root.dataset.cursor = mode;

    const setMode = (next, text = '') => {
      if (text && label.current) label.current.textContent = text;
      if (next === mode) return;
      mode = next;
      root.dataset.cursor = next;
    };

    const reset = () => {
      x = -120;
      y = -120;
      setMode('arrow');
      root.classList.remove('cursor-down');
    };

    const updateTarget = (clientX, clientY, fallback) => {
      const target = document.elementFromPoint(clientX, clientY) || fallback;
      if (!(target instanceof Element)) return setMode('arrow');

      const directControl = target.closest('a, button');
      if (directControl) return setMode('link');
      const dragTarget = target.closest('[data-cursor="Drag"]');
      if (dragTarget) return setMode('drag', 'Drag');
      setMode('arrow');
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      updateTarget(x, y, event.target);
    };
    const onScroll = () => {
      if (x >= 0 && y >= 0) updateTarget(x, y);
    };
    const onVisibility = () => {
      if (document.hidden) reset();
    };
    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');

    const tick = () => {
      ax += (x - ax) * 0.58;
      ay += (y - ay) * 0.58;
      bx += (x - bx) * 0.2;
      by += (y - by) * 0.2;
      if (arrow.current) arrow.current.style.transform = `translate3d(${ax}px,${ay}px,0)`;
      if (bubble.current) bubble.current.style.transform = `translate3d(${bx}px,${by}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', reset);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      delete root.dataset.cursor;
      root.classList.remove('has-cursor', 'cursor-down');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', reset);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <>
      <div className="cursor cursor--arrow" ref={arrow} aria-hidden="true">
        <svg width="30" height="36" viewBox="0 0 30 36">
          <path d="M3.5 2.8 26 16.1l-10.2 4.1-5.3 11.9Z" fill="#050505" stroke="#fff" strokeWidth="2.8" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="cursor cursor--bubble" ref={bubble} aria-hidden="true">
        <span ref={label}>View</span>
      </div>
    </>
  );
}

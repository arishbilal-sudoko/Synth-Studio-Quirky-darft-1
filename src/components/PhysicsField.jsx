import { useEffect, useRef } from 'react';

/**
 * A tiny 2D physics playground: items drop from above, bounce, collide
 * with each other and the walls/floor, and can be grabbed and thrown.
 *
 * items : [{ key, size, x (0..1 start position), node }]
 * active: start simulating once true
 */
export default function PhysicsField({ items, active, className = '', gravity = 2200, bounce = 0.42 }) {
  const box = useRef(null);
  const els = useRef([]);

  useEffect(() => {
    if (!active) return;
    const root = box.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = root.clientWidth;
    let H = root.clientHeight;

    const bodies = items.map((it, i) => ({
      r: (it.size / 2) * 0.86,
      size: it.size,
      x: Math.max(it.size / 2, Math.min(W - it.size / 2, it.x * W)),
      y: -it.size - i * 70 - Math.random() * 80,
      vx: (Math.random() - 0.5) * 260,
      vy: 0,
      a: (Math.random() - 0.5) * 1.2,
      va: (Math.random() - 0.5) * 3,
      drag: false,
    }));

    let raf = 0;
    let running = false;
    let calm = 0;
    let lastT = 0;

    const paint = () => {
      bodies.forEach((b, i) => {
        const el = els.current[i];
        if (el) el.style.transform = `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2}px, 0) rotate(${b.a}rad)`;
      });
    };

    const step = (dt) => {
      let energy = 0;
      for (const b of bodies) {
        if (b.drag) continue;
        b.vy += gravity * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.a += b.va * dt;

        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * bounce; }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * bounce; }
        if (b.y > H - b.r) {
          b.y = H - b.r;
          b.vy = -b.vy * bounce;
          if (Math.abs(b.vy) < 60) b.vy = 0;
          b.vx *= 0.985;
          b.va = b.vx / b.r; // roll
        }
        energy += Math.abs(b.vx) + Math.abs(b.vy);
      }

      // circle–circle collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const p = bodies[i], q = bodies[j];
          const dx = q.x - p.x, dy = q.y - p.y;
          const min = p.r + q.r;
          const d2 = dx * dx + dy * dy;
          if (d2 === 0 || d2 >= min * min) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d, ny = dy / d;
          const overlap = min - d;
          const pm = p.drag ? 0 : 1, qm = q.drag ? 0 : 1;
          const tot = pm + qm || 1;
          p.x -= nx * overlap * (pm / tot);
          p.y -= ny * overlap * (pm / tot);
          q.x += nx * overlap * (qm / tot);
          q.y += ny * overlap * (qm / tot);
          const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
          if (rv < 0) {
            const imp = -(1 + bounce) * rv / 2;
            if (!p.drag) { p.vx -= imp * nx; p.vy -= imp * ny; p.va -= imp * 0.004; }
            if (!q.drag) { q.vx += imp * nx; q.vy += imp * ny; q.va += imp * 0.004; }
          }
        }
      }
      return energy;
    };

    const loop = (t) => {
      const dt = Math.min(1 / 30, (t - lastT) / 1000 || 1 / 60);
      lastT = t;
      const e = step(dt);
      paint();
      calm = e < 14 && !bodies.some((b) => b.drag) ? calm + dt : 0;
      if (calm > 1.2) { running = false; return; }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      calm = 0;
      if (running) return;
      running = true;
      lastT = performance.now();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      for (let k = 0; k < 500; k++) step(1 / 60);
      paint();
    } else {
      paint();
      wake();
    }

    // ── dragging ────────────────────────────────────────────
    const cleanups = [];
    els.current.forEach((el, i) => {
      if (!el) return;
      const b = bodies[i];
      let offX = 0, offY = 0, lx = 0, ly = 0, lt = 0;
      const down = (e) => {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        const r = root.getBoundingClientRect();
        offX = e.clientX - r.left - b.x;
        offY = e.clientY - r.top - b.y;
        lx = e.clientX; ly = e.clientY; lt = performance.now();
        b.drag = true; b.vx = 0; b.vy = 0;
        el.classList.add('is-grabbed');
        wake();
      };
      const move = (e) => {
        if (!b.drag) return;
        const r = root.getBoundingClientRect();
        b.x = Math.max(b.r, Math.min(W - b.r, e.clientX - r.left - offX));
        b.y = Math.max(b.r, Math.min(H - b.r, e.clientY - r.top - offY));
        const now = performance.now();
        const dt = Math.max(1, now - lt) / 1000;
        b.vx = b.vx * 0.5 + ((e.clientX - lx) / dt) * 0.5;
        b.vy = b.vy * 0.5 + ((e.clientY - ly) / dt) * 0.5;
        lx = e.clientX; ly = e.clientY; lt = now;
      };
      const up = () => {
        if (!b.drag) return;
        b.drag = false;
        b.vx = Math.max(-1600, Math.min(1600, b.vx));
        b.vy = Math.max(-1600, Math.min(1600, b.vy));
        el.classList.remove('is-grabbed');
        wake();
      };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      cleanups.push(() => {
        el.removeEventListener('pointerdown', down);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      });
    });

    const ro = new ResizeObserver(() => {
      W = root.clientWidth;
      H = root.clientHeight;
      wake();
    });
    ro.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cleanups.forEach((c) => c());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div ref={box} className={`physics ${className}`} aria-hidden="true">
      {items.map((it, i) => (
        <div
          key={it.key}
          ref={(el) => (els.current[i] = el)}
          className="physics__item"
          style={{ width: it.size, height: it.size, transform: `translate3d(0,-${it.size * 2}px,0)` }}
        >
          {it.node}
        </div>
      ))}
    </div>
  );
}

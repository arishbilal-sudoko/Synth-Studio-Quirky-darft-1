import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView.js';
import { ServiceIcon, Stickers } from './Art.jsx';
import { SERVICES } from '../data.js';

export default function Services() {
  const [head, seen] = useInView({ threshold: 0.3 });
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(3);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const view = useRef(null);
  const start = useRef(null);

  const pages = Math.ceil(SERVICES.length / perView);

  useEffect(() => {
    const on = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 3);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  useEffect(() => { setPage((p) => Math.min(p, pages - 1)); }, [pages]);

  const down = (e) => { start.current = e.clientX; setDragging(true); };
  const move = (e) => { if (start.current !== null) setDragX(e.clientX - start.current); };
  const up = () => {
    if (start.current === null) return;
    if (dragX < -60) setPage((p) => Math.min(pages - 1, p + 1));
    if (dragX > 60) setPage((p) => Math.max(0, p - 1));
    start.current = null;
    setDragX(0);
    setDragging(false);
  };

  const gap = 'var(--gap)';
  return (
    <section className="services" id="services">
      <div ref={head} className={`services__head reveal ${seen ? 'in' : ''}`}>
        <h2>
          Services
          <span className="services__sticker" aria-hidden="true">{Stickers.smileyPink}</span>
          <br />
          made to order
        </h2>
        <p className="mono">
          From a showcase site to an online shop, via SEO and digital strategy… we handle it all so that your
          online presence is <b>up to your ambitions.</b>
        </p>
      </div>

      <div
        className="carousel"
        ref={view}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
        data-cursor="Drag"
      >
        <div
          className={`carousel__track ${dragging ? 'is-dragging' : ''}`}
          style={{
            '--pv': perView,
            transform: `translate3d(calc(${-page} * (100% + ${gap}) + ${dragX}px), 0, 0)`,
          }}
        >
          {SERVICES.map((s, i) => (
            <article
              key={s.title.join('')}
              className={`scard ${Math.floor(i / perView) === page ? 'is-active' : ''}`}
              style={{ '--c1': s.colors[0], '--c2': s.colors[1], '--c3': s.colors[2] }}
            >
              <div className="scard__glow" aria-hidden="true" />
              <div className="scard__icon"><ServiceIcon name={s.icon} /></div>
              <h3>{s.title[0]}<br />{s.title[1]}</h3>
              <p>{s.text}</p>
              <a href="#contact" className="scard__btn mono" data-cursor={undefined}>Discover</a>
            </article>
          ))}
        </div>
      </div>

      <div className="dots" role="tablist" aria-label="Service pages">
        {Array.from({ length: pages }).map((_, i) => (
          <button key={i} role="tab" aria-selected={i === page} aria-label={`Page ${i + 1}`} className={i === page ? 'is-on' : ''} onClick={() => setPage(i)} />
        ))}
      </div>
    </section>
  );
}

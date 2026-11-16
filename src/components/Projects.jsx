import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView.js';
import { Logo } from './Art.jsx';
import { PROJECTS } from '../data.js';

function Card({ p, i }) {
  const [ref, seen] = useInView({ threshold: 0.15 });
  return (
    <article ref={ref} className={`project reveal ${seen ? 'in' : ''}`}>
      <a href={p.url} className="project__link" data-cursor="View" target="_blank" rel="noreferrer">
        <div className="project__media" style={{ '--c': p.color }}>
          <div className="project__logo"><Logo size={44} text={false} /></div>
          <div className="project__preview" aria-hidden="true">
            <i /><i /><i />
            <span className="mono">Project video / image placeholder {String(i + 1).padStart(2, '0')}</span>
          </div>
        </div>
        <h3>{p.name}</h3>
        <p>{p.url}</p>
      </a>
    </article>
  );
}

export default function Projects() {
  const sec = useRef(null);

  // gentle parallax: the right column drifts against the left
  useEffect(() => {
    const el = sec.current;
    let raf;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const left = PROJECTS.filter((_, i) => i % 2 === 0);
  const right = PROJECTS.filter((_, i) => i % 2 === 1);

  return (
    <section className="projects" id="work" ref={sec}>
      <div className="projects__col">
        {left.map((p) => <Card key={p.name} p={p} i={PROJECTS.indexOf(p)} />)}
      </div>
      <div className="projects__col projects__col--b">
        {right.map((p) => <Card key={p.name} p={p} i={PROJECTS.indexOf(p)} />)}
      </div>
    </section>
  );
}

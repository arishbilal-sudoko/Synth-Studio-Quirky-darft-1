import { useEffect, useState } from 'react';
import { Logo } from './Art.jsx';
import { NAV, NAV_CTA } from '../data.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo" onClick={close} aria-label="Synthweb Studio — home">
          <Logo size={26} />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={close}>{n.label}</a>
          ))}
        </nav>
        <a className="nav__cta" href={NAV_CTA.href} onClick={close}>{NAV_CTA.label}</a>
        <button className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
      <div className="nav__sheet">
        {[...NAV, NAV_CTA].map((n, i) => (
          <a key={n.href} href={n.href} onClick={close} style={{ '--i': i }}>{n.label}</a>
        ))}
      </div>
    </header>
  );
}

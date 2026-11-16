import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Art.jsx';
import { NAV, NAV_CTA } from '../data.js';

export default function Nav() {
  const location = useLocation();
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
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo" onClick={close} aria-label="Synthweb Studio — home">
          <Logo size={26} />
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} to={n.href} onClick={close} aria-current={location.pathname === n.href ? 'page' : undefined}>{n.label}</Link>
          ))}
        </nav>
        <Link className="nav__cta" to={NAV_CTA.href} onClick={close}>{NAV_CTA.label}</Link>
        <button className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
      <div className="nav__sheet">
        {[...NAV, NAV_CTA].map((n, i) => (
          <Link key={n.href} to={n.href} onClick={close} style={{ '--i': i }}>{n.label}</Link>
        ))}
      </div>
    </header>
  );
}

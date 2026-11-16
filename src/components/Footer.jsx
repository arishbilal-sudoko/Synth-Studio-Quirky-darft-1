import useInView from '../hooks/useInView.js';
import PhysicsField from './PhysicsField.jsx';
import { Logo, Shapes, TornEdge } from './Art.jsx';
import { SITE, FOOTER_LINKS, LEGAL, SOCIALS } from '../data.js';

const SHAPES = [
  { key: 'asterisk', size: 74, x: 0.1, node: Shapes.asterisk('#b56bd1') },
  { key: 'flower', size: 78, x: 0.46, node: Shapes.flower('#e8445f') },
  { key: 'loop', size: 70, x: 0.34, node: Shapes.loop('#5a9ae0') },
  { key: 'ring', size: 88, x: 0.6, node: Shapes.ring('#8a8a8a') },
  { key: 'knot', size: 170, x: 0.74, node: Shapes.knot('#7ed1a0') },
  { key: 'sun', size: 124, x: 0.9, node: Shapes.sun('#f6c453') },
  { key: 'swirl', size: 96, x: 0.84, node: Shapes.swirl('#f28b4b') },
  { key: 'omega', size: 80, x: 0.2, node: Shapes.omega('#f28b4b') },
];

function Contact({ href, children, hue, media, mediaAlt = '' }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag className={`contact__box ${media ? 'contact__box--media' : ''}`} href={href} style={{ '--h': hue }}>
      {media && <img className="contact__media" src={media} alt={mediaAlt} />}
      <span className="contact__wash" aria-hidden="true" />
      <span className="contact__txt">{children}</span>
    </Tag>
  );
}

export default function Footer({ showContactCards = true }) {
  const [ref, seen] = useInView({ threshold: 0.25 });
  return (
    <footer className="footer" id="contact">
      <TornEdge />
      <div className="footer__inner">
        {showContactCards && (
          <div className="contact">
            <Contact href={`tel:${SITE.phone.replace(/\s/g, '')}`} hue="#ffb347" media="/cat-calling.gif" mediaAlt="Funny cat talking on a telephone"><u>{SITE.phone}</u></Contact>
            <Contact hue="#8a6bff">
              <span className="addr mono">
                {SITE.address[0]}<br />{SITE.address[1]}<br /><b>{SITE.address[2]}</b>
              </span>
            </Contact>
            <Contact href={`mailto:${SITE.email}`} hue="#ff5fa2" media="/cat-typing.gif" mediaAlt="Black cat typing on a laptop"><u>{SITE.email}</u></Contact>
          </div>
        )}

        <div className="footer__logo"><Logo size={54} big /></div>

        <div className="footer__main" ref={ref}>
          <div className="footer__lead">
            <h2>
              It starts<br />right now,{' '}
              <span className="squig">
                here
                <svg viewBox="0 0 160 14" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 8 q8 -10 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#f15b6c" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </h2>
            <a href={`mailto:${SITE.email}`} className="pill pill--warm">
              <span>Request a quote</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="footer__cols">
            <div>
              <h4>The Studio</h4>
              <ul>{FOOTER_LINKS.studio.map((l) => <li key={l}><a href="#top">{l}</a></li>)}</ul>
            </div>
            <div>
              <h4>Offers &amp; Services</h4>
              <ul>{FOOTER_LINKS.offers.map((l) => <li key={l}><a href="/#services">{l}</a></li>)}</ul>
            </div>
          </div>

          <PhysicsField items={SHAPES} active={seen} className="physics--footer" gravity={2000} bounce={0.38} />
        </div>

        <div className="footer__legal">
          {LEGAL.map((l) => <a key={l} href="#top">{l}</a>)}
          {SOCIALS.map((s) => <a className="footer__social" key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
        </div>
      </div>
    </footer>
  );
}

import useInView from '../hooks/useInView.js';
import RotatingBadge from './RotatingBadge.jsx';
import { HeartMark, CrownMark } from './Art.jsx';

/** A word with a hand-drawn annotation that draws itself in. */
function Mark({ type, color, children, icon }) {
  return (
    <span className={`mark mark--${type}`} style={{ '--mc': color }}>
      {icon === 'crown' && <CrownMark />}
      {children}
      {type === 'dash' && (
        <svg className="mark__line" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 4 H98" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="9 8" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {type === 'wave' && (
        <svg className="mark__line" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 8 q6 -10 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {type === 'ticks' && (
        <svg className="mark__ticks" viewBox="0 0 60 16" aria-hidden="true">
          <path d="M6 2 L16 12 M54 2 L44 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

function Cta({ tone = 'warm', children }) {
  return (
    <a href="#contact" className={`pill pill--${tone}`}>
      <span>{children}</span>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  );
}

function Block({ id, tone, children }) {
  return (
    <section className={`statement statement--${tone}`} id={id}>
      <div className="statement__badge">
        <RotatingBadge tone={tone} size={140} text="Need a website? · Contact & Quote · " />
      </div>
      <div className="statement__body">{children}</div>
    </section>
  );
}

function Para({ children, delay = 0 }) {
  const [ref, seen] = useInView({ threshold: 0.3 });
  return (
    <p ref={ref} className={`statement__p reveal ${seen ? 'in' : ''}`} style={{ '--rd': `${delay}s` }}>
      {children}
    </p>
  );
}

function Footnote({ tone, children, cta }) {
  const [ref, seen] = useInView({ threshold: 0.5 });
  return (
    <div ref={ref} className={`statement__foot reveal ${seen ? 'in' : ''}`}>
      <p className="mono">{children}</p>
      <Cta tone={tone}>{cta}</Cta>
    </div>
  );
}

/** Dark intro statement (sits right after the project grid). */
export function StatementDark() {
  return (
    <Block id="studio" tone="dark">
      <Para>
        We don&rsquo;t just build <Mark type="dash" color="#f6c453">websites</Mark>. We make them visible to
        everyone, and to Google. We help you understand the subtleties of the internet without throwing
        incomprehensible jargon at you. In short, we guide you so that <Mark type="ticks" color="#7ed957">digital</Mark> becomes
        brilliant.
      </Para>
      <Para>
        We&rsquo;ve worked on <Mark type="none" icon="crown">projects</Mark> that stood out from the ordinary. Sites that pushed us to{' '}
        <Mark type="wave" color="#6aa7e6">dig deep</Mark>. That&rsquo;s what we <HeartMark />like: challenges that make us
        grow. Not copy-paste.
      </Para>
      <Footnote tone="warm" cta="Request a quote">
        The most useful button on the site is <b>right there</b>, just below.
      </Footnote>
    </Block>
  );
}

/** Light statement (after the services carousel). */
export function StatementLight() {
  return (
    <Block id="about" tone="light">
      <Para>
        We don&rsquo;t like cookie-cutter sites. Every project is designed to match your identity and answer your{' '}
        <Mark type="dash" color="#f6c453">needs.</Mark>
      </Para>
      <Para>
        Working with the studio means choosing a team that knows its craft, <Mark type="wave" color="#5a8be0">picks up the phone</Mark>, and
        stays with you for the long term.
        <HeartMark />
      </Para>
      <Footnote tone="cool" cta="Request a quote">
        A digital studio that adapts to <b>every industry.</b>
      </Footnote>
    </Block>
  );
}

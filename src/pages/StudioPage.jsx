import { useLayoutEffect, useRef } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../components/Marquee.jsx';
import { CLIENTS, SITE } from '../data.js';
import './StudioPage.css';

gsap.registerPlugin(ScrollTrigger);

const reveal = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
};

const STUDIO_PROJECTS = [
  { name: 'Sanvi Mekhela', tag: 'E-commerce · Identity', color: '#9dce95', kind: 'script' },
  { name: 'Growthcraft', tag: 'Strategy · Web platform', color: '#ed5872', kind: 'seal' },
  { name: 'Freight Alliance', tag: 'Logistics · Digital', color: '#f4ca68', kind: 'lines' },
  { name: 'Amuthi', tag: 'Culture · Storytelling', color: '#7566c9', kind: 'photo' },
  { name: 'Dhobi', tag: 'Service · Product design', color: '#5db6dc', kind: 'type' },
  { name: 'Cairn', tag: 'Editorial · Development', color: '#101010', kind: 'orbit' },
  { name: 'Torus', tag: 'Technology · Experience', color: '#ef91b8', kind: 'ring' },
];

function ArrowIcon() {
  return <ArrowRight aria-hidden="true" size={20} strokeWidth={2.4} />;
}

function StudioButton({ href, children, cool = false }) {
  return (
    <a className={`studio-button ${cool ? 'studio-button--cool' : ''}`} href={href}>
      <span>{children}</span><ArrowIcon />
    </a>
  );
}

function AbstractArtwork() {
  return (
    <svg className="studio-art" viewBox="0 0 900 240" aria-hidden="true">
      <rect width="900" height="240" fill="#145ce6" />
      <path d="M0 40C90-20 125 96 218 53s131-25 190 8 116-45 196-9 177-14 296-38v226H0Z" fill="#ff7243" />
      <path d="M0 125c73-46 132 4 196-26s94-8 152 21 110-5 174-34 109 49 181 13 132-5 197 24v117H0Z" fill="#ff8abb" />
      <path d="M80 240c-5-74 13-120 58-157-4 66 27 102 52 157Zm323 0c5-86 37-138 88-177-19 78 9 126 30 177Zm312 0c-6-67 19-124 74-153-15 60 1 108 29 153Z" fill="#14a866" />
      <path d="M187 240c-6-53 22-98 76-123-18 52-8 88 13 123Zm363 0c-5-54 17-92 63-122-8 57 12 91 28 122Z" fill="#ffd32b" />
      <circle cx="342" cy="55" r="31" fill="#ffd124" /><circle cx="671" cy="51" r="42" fill="#49d4dc" />
      <circle cx="807" cy="81" r="19" fill="#ffce2d" /><circle cx="540" cy="145" r="15" fill="#0a2869" />
      <path d="M267 62q14-22 28 0t28 0" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      <path d="M737 22l9 20 20 8-20 9-9 20-9-20-20-9 20-8Z" fill="#fff" />
      <g fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round"><path d="M44 71l28 13m-18-32 8 34"/><path d="M847 151l25-13m-14-14 4 29"/></g>
    </svg>
  );
}

function ContactCards() {
  const cards = [
    { label: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}`, media: '/cat-calling.gif', alt: 'Funny cat calling on a telephone' },
    { label: <>{SITE.address[0]}<br />{SITE.address[1]} · {SITE.address[2]}</>, accent: true },
    { label: SITE.email, href: `mailto:${SITE.email}`, media: '/cat-typing.gif', alt: 'Cat typing on a laptop' },
  ];
  return (
    <motion.div className="studio-contact" {...reveal}>
      {cards.map((card, index) => {
        const Tag = card.href ? 'a' : 'div';
        return (
          <Tag className={`studio-contact__card ${card.media ? 'has-media' : ''}`} href={card.href} key={index}>
            {card.media && <img src={card.media} alt={card.alt} />}
            <span>{card.label}</span>
          </Tag>
        );
      })}
    </motion.div>
  );
}

function ClientStrip() {
  return (
    <div className="studio-clients" aria-label="Selected clients">
      <Marquee speed={42} dir={-1} gap={70}>
        {CLIENTS.map((client, index) => (
          <span className="studio-client" key={client}><i>{String(index + 1).padStart(2, '0')}</i>{client}</span>
        ))}
      </Marquee>
    </div>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className={`studio-project__visual studio-project__visual--${project.kind}`}>
      <span>{project.name}</span>
      <i aria-hidden="true" /><b aria-hidden="true" />
    </div>
  );
}

function HorizontalProjects() {
  const section = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 80);
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.7}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="studio-work" id="studio-work" ref={section}>
      <div className="studio-work__head">
        <span className="studio-kicker">Selected collaborations</span>
        <span className="studio-work__hint mono">Scroll to explore →</span>
      </div>
      <div className="studio-work__track" ref={track}>
        {STUDIO_PROJECTS.map((project, index) => (
          <a className="studio-project" href="#studio-contact" key={project.name} style={{ '--project': project.color }}>
            <ProjectVisual project={project} />
            <div className="studio-project__meta"><span>{project.name}</span><small>{project.tag}</small><b>{String(index + 1).padStart(2, '0')}</b></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function StudioPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="studio-page" id="top" tabIndex="-1">
      <section className="studio-hero">
        <div className="studio-hero__glow" aria-hidden="true" />
        <motion.p className="studio-eyebrow mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>Web design, development &amp; digital strategy</motion.p>
        <h1>
          <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>Web Studio</motion.span>
          <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>in Guwahati <em>✌</em></motion.span>
        </h1>
        <motion.p className="studio-hero__aside mono" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7 }}>small team · bright ideas · useful websites</motion.p>
        <motion.div className="studio-hero__intro" {...reveal}>
          <span className="studio-kicker">Nice to meet you</span>
          <p>Synthweb is an independent digital studio based in <b>Guwahati, Assam</b>. We create distinctive websites and brand experiences that balance expressive design with thoughtful technology—always clear, useful and built to last.</p>
        </motion.div>
        <ContactCards />
      </section>

      <section className="studio-art-marquee" aria-label="Abstract artwork">
        <Marquee speed={48} dir={-1}><AbstractArtwork /></Marquee>
      </section>

      <motion.section className="studio-intro studio-shell" {...reveal}>
        <h2>A digital studio rooted<br />in Northeast India</h2>
        <div>
          <span className="studio-kicker">Local perspective, wide outlook</span>
          <p>We partner with ambitious founders and teams from first sketch to final launch. Our approach combines <b>strategy, identity, interaction and code</b> in one close collaboration—without layers of account management or generic templates.</p>
        </div>
      </motion.section>

      <ClientStrip />

      <motion.section className="studio-expertise studio-shell" id="studio-services" {...reveal}>
        <span className="studio-kicker">A multidisciplinary practice</span>
        <div className="studio-expertise__grid">
          <h2>We touch everything,<br />especially <mark>digital.</mark></h2>
          <div>
            <p>From a sharp portfolio to a complex commerce platform, we bring the right mix of creative direction and engineering. Every engagement is shaped around the real problem—not a pre-made package.</p>
            <StudioButton href="/#services">Services &amp; capabilities</StudioButton>
          </div>
        </div>
      </motion.section>

      <HorizontalProjects />

      <motion.section className="studio-talk studio-shell" {...reveal}>
        <div>
          <span className="studio-kicker">Still scrolling?</span>
          <h2>Shall we talk<br />too much?</h2>
        </div>
        <div className="studio-talk__copy">
          <p>Tell us what you are building, what is stuck, or what you want to change. Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we’ll respond with useful next steps.</p>
          <StudioButton href="#studio-contact" cool>Need a quote?</StudioButton>
        </div>
      </motion.section>

      <motion.section className="studio-banner" id="studio-contact" {...reveal}>
        <div className="studio-banner__copy">
          <span className="mono">Let&rsquo;s make something memorable.</span>
          <h2>Do you need<br />a <mark>website?</mark></h2>
          <StudioButton href={`mailto:${SITE.email}`} cool>Let&rsquo;s discuss it</StudioButton>
        </div>
        <div className="studio-banner__art"><img src="/cta-rocket.png" alt="Colourful abstract rocket launch artwork" loading="lazy" /></div>
      </motion.section>

        <div className="studio-page__footer-gap"><Sparkles aria-hidden="true" /></div>
      </main>
    </MotionConfig>
  );
}

/* All artwork here is original, drawn as inline SVG. */

export function Logo({ size = 26, text = true, big = false }) {
  if (text) {
    return (
      <span className={`logo logo--wordmark ${big ? 'logo--big' : ''}`}>
        <img src="/studio-logo.svg" alt="Studio by Synthweb" />
      </span>
    );
  }

  return (
    <span className="logo logo--mark">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb86b" />
            <stop offset=".55" stopColor="#ff5fa2" />
            <stop offset="1" stopColor="#8a6bff" />
          </linearGradient>
          <mask id="logoMask">
            <rect width="32" height="32" fill="#fff" />
            <rect y="17" width="32" height="1.6" fill="#000" />
            <rect y="21" width="32" height="2.4" fill="#000" />
            <rect y="25.5" width="32" height="3.2" fill="#000" />
          </mask>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#logoGrad)" mask="url(#logoMask)" />
      </svg>
    </span>
  );
}

/* ── die-cut stickers (hero) ─────────────────────────────── */
const W = { stroke: '#fff', strokeWidth: 9, strokeLinejoin: 'round', paintOrder: 'stroke' };

export const Stickers = {
  smileyGreen: (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="42" fill="#7ed957" {...W} />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#2a2a2a" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx="38" cy="42" r="5" fill="#1a1a1a" />
      <circle cx="62" cy="42" r="5" fill="#1a1a1a" />
      <path d="M32 58 Q50 76 68 58" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  smileyPink: (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="42" fill="#ff8fc1" {...W} />
      <circle cx="50" cy="50" r="35" fill="#ffd1e6" />
      <circle cx="39" cy="44" r="4.5" fill="#1a1a1a" />
      <circle cx="61" cy="44" r="4.5" fill="#1a1a1a" />
      <path d="M34 58 Q50 72 66 58" fill="none" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="30" cy="56" r="5" fill="#ff6fa3" opacity=".6" />
      <circle cx="70" cy="56" r="5" fill="#ff6fa3" opacity=".6" />
    </svg>
  ),
  eyes: (
    <svg viewBox="0 0 100 100">
      <ellipse cx="34" cy="50" rx="22" ry="28" fill="#fff" stroke="#1a1a1a" strokeWidth="5" />
      <ellipse cx="68" cy="50" rx="22" ry="28" fill="#fff" stroke="#1a1a1a" strokeWidth="5" />
      <ellipse cx="38" cy="54" rx="9" ry="13" fill="#1a1a1a" />
      <ellipse cx="72" cy="54" rx="9" ry="13" fill="#1a1a1a" />
      <circle cx="35" cy="48" r="3.4" fill="#fff" />
      <circle cx="69" cy="48" r="3.4" fill="#fff" />
    </svg>
  ),
  melon: (
    <svg viewBox="0 0 100 100">
      <path d="M8 38 Q50 -6 92 38 Q86 80 50 88 Q14 80 8 38Z" fill="#ff5a66" {...W} />
      <path d="M8 38 Q50 -6 92 38" fill="none" stroke="#7ed957" strokeWidth="9" strokeLinecap="round" />
      <path d="M17 42 Q50 8 83 42 Q76 72 50 78 Q24 72 17 42Z" fill="#ff5a66" />
      {[[38, 46], [54, 40], [64, 54], [46, 60], [30, 58]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3" ry="4.6" fill="#1a1a1a" transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 120 60">
      <rect x="8" y="10" width="104" height="40" rx="6" fill="#ff3d5a" {...W} strokeWidth="8" />
      <rect x="14" y="16" width="92" height="28" rx="3" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="60" y="38" textAnchor="middle" fontFamily="'Google Sans Code', monospace" fontWeight="700" fontSize="20" fill="#fff" fontStyle="italic">HELLO</text>
    </svg>
  ),
  blob: (
    <svg viewBox="0 0 100 100">
      <path d="M50 6 L61 34 L92 36 L68 56 L77 88 L50 70 L23 88 L32 56 L8 36 L39 34Z" fill="#c07be0" {...W} />
      <circle cx="42" cy="50" r="3" fill="#1a1a1a" />
      <circle cx="58" cy="50" r="3" fill="#1a1a1a" />
      <path d="M44 60 Q50 65 56 60" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 100 100">
      <path d="M26 70 Q8 70 8 54 Q8 40 24 38 Q26 20 46 20 Q62 20 68 34 Q92 32 92 54 Q92 70 74 70Z" fill="#8ec9ff" {...W} />
      <circle cx="38" cy="52" r="3.5" fill="#1a1a1a" />
      <circle cx="62" cy="52" r="3.5" fill="#1a1a1a" />
      <path d="M42 60 Q50 67 58 60" fill="none" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 100 100">
      <path d="M58 6 L22 56 H46 L38 94 L80 40 H54Z" fill="#ffd23f" {...W} />
    </svg>
  ),
  heartSticker: (
    <svg viewBox="0 0 100 100">
      <path d="M50 86 C10 58 6 30 28 22 C40 18 48 26 50 34 C52 26 60 18 72 22 C94 30 90 58 50 86Z" fill="#ff4d6d" {...W} />
      <path d="M30 34 Q34 28 40 30" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
    </svg>
  ),
};

/* ── hand-drawn shapes (footer) ──────────────────────────── */
const S = { fill: 'none', strokeWidth: 8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Shapes = {
  asterisk: (c) => (
    <svg viewBox="0 0 100 100">
      {[0, 60, 120].map((r) => (
        <path key={r} d="M50 14 V86" stroke={c} {...S} strokeWidth="12" transform={`rotate(${r} 50 50)`} />
      ))}
    </svg>
  ),
  flower: (c) => (
    <svg viewBox="0 0 100 100">
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <ellipse key={r} cx="50" cy="26" rx="8" ry="18" fill={c} transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5" fill="#000" />
    </svg>
  ),
  knot: (c) => (
    <svg viewBox="0 0 100 100">
      <circle cx="30" cy="30" r="15" stroke={c} {...S} />
      <circle cx="70" cy="30" r="15" stroke={c} {...S} />
      <circle cx="30" cy="70" r="15" stroke={c} {...S} />
      <circle cx="70" cy="70" r="15" stroke={c} {...S} />
      <path d="M42 42 L58 58 M58 42 L42 58" stroke={c} {...S} />
      <path d="M24 44 V56 M76 44 V56 M44 24 H56 M44 76 H56" stroke={c} {...S} />
    </svg>
  ),
  ring: (c) => (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="38" stroke={c} {...S} />
      <path d="M32 54 A20 20 0 1 0 50 30" stroke={c} {...S} strokeWidth="9" />
    </svg>
  ),
  sun: (c) => (
    <svg viewBox="0 0 100 100">
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d="M50 8 V30" stroke={c} {...S} strokeWidth="6" transform={`rotate(${i * 36} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5" fill={c} />
    </svg>
  ),
  swirl: (c) => (
    <svg viewBox="0 0 100 100">
      <path d="M26 72 A28 28 0 1 1 74 72 L82 64 M74 72 L62 76" stroke={c} {...S} />
    </svg>
  ),
  loop: (c) => (
    <svg viewBox="0 0 100 100">
      <path d="M18 62 C18 30 54 34 56 56 C58 78 28 74 40 48 C52 24 86 30 82 70" stroke={c} {...S} />
    </svg>
  ),
  omega: (c) => (
    <svg viewBox="0 0 100 100">
      <path d="M14 78 H34 C16 66 16 20 50 20 C84 20 84 66 66 78 H86" stroke={c} {...S} />
    </svg>
  ),
};

/* ── hand-drawn annotation icons ─────────────────────────── */
export const HeartMark = () => (
  <svg className="mark-icon mark-icon--heart" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 34 C4 22 4 10 14 8 C18 7 20 10 20 12 C20 10 23 7 27 8 C36 10 36 22 20 34Z" fill="#ff4d6d" stroke="#ff4d6d" strokeWidth="3" strokeLinejoin="round" />
    <path d="M12 14 Q14 11 17 12" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8" />
  </svg>
);
export const CrownMark = () => (
  <svg className="mark-icon mark-icon--crown" viewBox="0 0 40 30" aria-hidden="true">
    <path d="M5 24 L3 8 L12 15 L20 4 L28 15 L37 8 L35 24Z" fill="#c07be0" stroke="#c07be0" strokeWidth="3" strokeLinejoin="round" />
    <path d="M7 27 H33" stroke="#c07be0" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ── service icons ───────────────────────────────────────── */
export function ServiceIcon({ name }) {
  const f = '#e8e8e8';
  switch (name) {
    case 'shapes':
      return (
        <svg viewBox="0 0 48 48"><rect x="4" y="4" width="18" height="18" fill={f} /><circle cx="35" cy="35" r="10" fill={f} /><path d="M6 44 L16 28 L26 44Z" fill={f} /><path d="M30 6 L44 6 L44 20Z" fill={f} /></svg>
      );
    case 'bowtie':
      return (
        <svg viewBox="0 0 48 48"><path d="M4 8 L22 24 L4 40Z" fill={f} /><path d="M44 8 L26 24 L44 40Z" fill={f} /></svg>
      );
    case 'swoosh':
      return (
        <svg viewBox="0 0 48 48"><path d="M6 8 C22 8 22 24 24 26 C26 28 34 28 42 40 C28 36 26 28 24 26 C22 24 14 22 6 8Z" fill={f} /><path d="M42 8 C32 12 28 18 24 22 L20 18 C26 12 34 8 42 8Z" fill={f} /></svg>
      );
    case 'ring':
      return (
        <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke={f} strokeWidth="8" /><rect x="22" y="2" width="8" height="14" fill="#000" /></svg>
      );
    case 'cube':
      return (
        <svg viewBox="0 0 48 48"><path d="M24 4 L42 14 V34 L24 44 L6 34 V14Z" fill="none" stroke={f} strokeWidth="6" strokeLinejoin="round" /><path d="M6 14 L24 24 L42 14 M24 24 V44" fill="none" stroke={f} strokeWidth="5" /></svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48"><path d="M24 2 L29 19 L46 24 L29 29 L24 46 L19 29 L2 24 L19 19Z" fill={f} /></svg>
      );
  }
}

/* ── CTA illustration (right half of the card) ───────────── */
export function CtaIllustration() {
  return (
    <svg viewBox="0 0 420 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ctaSky" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#074ee0" />
          <stop offset="1" stopColor="#16a9dc" />
        </linearGradient>
        <linearGradient id="ctaRocket" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#d9eeff" />
        </linearGradient>
      </defs>
      <rect width="420" height="420" fill="url(#ctaSky)" />

      <g opacity=".42" fill="none" stroke="#053db0" strokeWidth="24" strokeLinecap="round">
        <path d="M-20 88 Q40 36 89 72 T184 56" />
        <path d="M265 10 Q226 76 282 110 T396 94" />
        <path d="M302 176 Q358 137 440 164" />
      </g>
      <circle cx="344" cy="75" r="42" fill="#ff9d24" />
      <circle cx="86" cy="154" r="44" fill="#ffac21" />
      <circle cx="373" cy="160" r="22" fill="#ff5b27" />
      <circle cx="65" cy="238" r="24" fill="#0661e8" stroke="#58b9ef" strokeWidth="3" />
      <circle cx="147" cy="261" r="13" fill="#071c55" />
      <circle cx="339" cy="248" r="9" fill="#092251" />

      <g fill="none" strokeLinecap="round" strokeWidth="6">
        <path d="M26 40 q11 18 23 0t24 0" stroke="#ffce25" />
        <path d="M122 82 q13 18 26 0t26 0" stroke="#ff5a9d" />
        <path d="M303 130 q15 18 30 0" stroke="#fff" />
        <path d="M213 38 l8 15 15-8" stroke="#ffd126" />
        <path d="M244 213 l14-12 13 11" stroke="#ff6b3d" />
      </g>
      <g fill="#ffd128">
        <rect x="24" y="108" width="21" height="7" rx="4" transform="rotate(-20 24 108)" />
        <rect x="180" y="20" width="8" height="22" rx="4" transform="rotate(-18 180 20)" />
        <rect x="390" y="211" width="8" height="23" rx="4" transform="rotate(28 390 211)" />
      </g>
      <g fill="#ff72b1">
        <ellipse cx="150" cy="133" rx="10" ry="27" transform="rotate(35 150 133)" />
        <ellipse cx="278" cy="94" rx="8" ry="23" transform="rotate(-38 278 94)" />
      </g>

      <g transform="translate(208 155)">
        <path d="M0-72 C28-50 31 7 12 54 H-12 C-31 7-28-50 0-72Z" fill="url(#ctaRocket)" />
        <path d="M0-72 C11-62 18-48 21-34 H-21 C-18-48-11-62 0-72Z" fill="#1262df" />
        <ellipse cy="-17" rx="8" ry="10" fill="#1aa5e8" stroke="#0745b2" strokeWidth="3" />
        <path d="M-12 26-31 49-12 44ZM12 26 31 49 12 44Z" fill="#ff4f35" />
        <path d="M-9 54 0 85 9 54Z" fill="#ffd42a" />
        <path d="M-5 54 0 73 5 54Z" fill="#ff672f" />
      </g>

      <path d="M0 315 C53 274 97 302 140 280 C190 255 235 305 284 278 C335 249 375 278 420 246 V420H0Z" fill="#ff8ab6" />
      <g fill="#ffcb22">
        <circle cx="190" cy="337" r="34" /><circle cx="225" cy="320" r="30" /><circle cx="257" cy="348" r="39" />
      </g>
      <g fill="#ff8651">
        <circle cx="139" cy="367" r="36" /><circle cx="168" cy="338" r="25" /><circle cx="302" cy="369" r="34" />
      </g>
      <g fill="#18a867">
        <path d="M6 420Q8 308 67 261q-18 81 24 159Z" />
        <path d="M58 420q13-91 83-123-40 58-24 123Z" />
      </g>
      <g fill="#064db5">
        <path d="M278 420q-2-112 53-168-13 90 15 168Z" />
        <path d="M331 420q15-102 76-137-30 75-18 137Z" />
      </g>
      <g fill="none" stroke="#0b713f" strokeWidth="5" strokeLinecap="round">
        <path d="M108 420q-3-77 35-129" /><path d="M143 345l-24-17M138 365l26-21" />
      </g>
      <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round">
        <path d="M45 190l18-8M51 172l9 14" /><path d="M358 205l19 8M367 190l4 16" />
      </g>
    </svg>
  );
}

/* rough brush-stroke edge, generated once with a seeded PRNG */
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const tornPath = (() => {
  const r = rng(42);
  let d = 'M0 100 L0 40';
  let x = 0;
  let y = 40;
  while (x < 1440) {
    x += 6 + r() * 38;
    const jump = r() < 0.18;
    y = Math.max(10, Math.min(60, y + (r() - 0.5) * (jump ? 36 : 12)));
    d += ` L${Math.min(1440, x).toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d} L1440 100Z`;
})();

export function TornEdge() {
  return (
    <svg className="torn" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="brushRough" x="-2%" y="-35%" width="104%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.16" numOctaves="2" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="11" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </defs>
      <path d={tornPath} fill="#000" />
      <path d="M-20 41 Q180 31 370 42 T735 37 T1090 43 T1460 38 L1460 105H-20Z" fill="#000" filter="url(#brushRough)" />
      <path d="M-10 39 Q180 32 360 40 T720 36 T1080 41 T1450 37" fill="none" stroke="#000" strokeWidth="12" strokeLinecap="round" filter="url(#brushRough)" />
    </svg>
  );
}

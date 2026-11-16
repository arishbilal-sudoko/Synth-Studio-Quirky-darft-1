import { useId } from 'react';

/**
 * Circular text badge. It spins slowly on its own and gets an extra
 * twist from page scroll (via the --spin CSS variable).
 */
export default function RotatingBadge({
  text = "Need a website? · Contact & Quote · ",
  size = 140,
  center = 'pinwheel',
  tone = 'dark', // 'dark' = light text on dark bg, 'light' = dark text on light bg
  href = '#contact',
  as = 'a',
}) {
  const id = useId().replace(/:/g, '');
  const Tag = as;
  return (
    <Tag className={`badge badge--${tone}`} href={as === 'a' ? href : undefined} style={{ width: size, height: size }} aria-label="Contact & Quote" data-cursor={undefined}>
      <span className="badge__spin">
        <span className="badge__scroll">
          <svg viewBox="0 0 200 200">
            <defs>
              <path id={id} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
            </defs>
            <text>
              <textPath href={`#${id}`} startOffset="0" textLength="486" lengthAdjust="spacing">
                {text}
              </textPath>
            </text>
          </svg>
        </span>
      </span>
      <span className="badge__center">
        {center === 'arrow' ? (
          <svg viewBox="0 0 40 40" className="badge__arrow">
            <defs>
              <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8a6bff" />
                <stop offset="1" stopColor="#ff7ac6" />
              </linearGradient>
            </defs>
            <path d="M6 10 L20 22 L34 10 L34 17 L20 29 L6 17Z" fill={`url(#${id}g)`} />
            <path d="M6 22 L20 34 L34 22 L34 26 L20 38 L6 26Z" fill={`url(#${id}g)`} opacity=".75" />
          </svg>
        ) : (
          <svg viewBox="0 0 60 60" className="badge__pinwheel">
            <defs>
              <linearGradient id={`${id}p`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#c07be0" />
                <stop offset="1" stopColor="#6aa7e6" />
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="28" fill="currentColor" opacity=".12" />
            <path d="M14 18 H46 L30 30Z" fill={`url(#${id}p)`} />
            <circle cx="30" cy="40" r="8" fill={`url(#${id}p)`} />
            <path d="M26 31 H34 V34 H26Z" fill={`url(#${id}p)`} />
          </svg>
        )}
      </span>
    </Tag>
  );
}

import { useEffect, useRef, useState } from 'react';

/** Fires once when the element enters the viewport. */
export default function useInView({ threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold, rootMargin]);

  return [ref, seen];
}

'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps children in a div that fades up when scrolled into view.
 * Props:
 *   delay   — ms delay before animation starts (default 0)
 *   y       — translateY start offset in px (default 28)
 *   duration — ms (default 700)
 *   className / style — forwarded to wrapper div
 */
export default function Reveal({ children, delay = 0, y = 28, duration = 700, className = '', style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

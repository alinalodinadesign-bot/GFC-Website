'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-driven background color transition.
 *
 * Two automatic modes based on section height vs viewport height:
 *
 * TALL section (height ≥ vh) — original formula:
 *   rawProgress = (vh - rect.top) / height
 *   0 = section bottom enters viewport, 1 = section has scrolled through
 *   threshold=0.93 → fires when section is almost done scrolling past
 *
 * SHORT section (height < vh) — exit-from-top formula:
 *   rawProgress = -rect.top / height   (only when rect.top < 0)
 *   0 = section top at viewport top, 1 = section fully above viewport
 *   threshold=0.5 → fires when half the section has scrolled past viewport top
 */
export default function ScrollColorSection({
  children,
  colorFrom  = '#ffffff',
  colorTo    = '#000000',
  threshold  = 0.93,
  style      = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;

      let rawProgress;
      if (rect.height >= vh) {
        // Tall section: tracks how far user has scrolled through it
        rawProgress = Math.min(1, Math.max(0, (vh - rect.top) / rect.height));
      } else {
        // Short section: tracks how far section has scrolled above viewport top
        rawProgress = Math.min(1, Math.max(0, -rect.top / rect.height));
      }

      const progress = rawProgress < threshold
        ? 0
        : (rawProgress - threshold) / (1 - threshold);

      el.style.backgroundColor = lerpColor(colorFrom, colorTo, easeInOut(progress));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [colorFrom, colorTo, threshold]);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: colorFrom, transition: 'none', ...style }}
    >
      {children}
    </div>
  );
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerpColor(a, b, t) {
  const ra = parseInt(a.slice(1, 3), 16);
  const ga = parseInt(a.slice(3, 5), 16);
  const ba = parseInt(a.slice(5, 7), 16);
  const rb = parseInt(b.slice(1, 3), 16);
  const gb = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r  = Math.round(ra + (rb - ra) * t);
  const g  = Math.round(ga + (gb - ga) * t);
  const bv = Math.round(ba + (bb - ba) * t);
  return `rgb(${r},${g},${bv})`;
}

'use client';

import { useRouter } from 'next/navigation';
import Arrow from '@/components/Arrow';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="hero" id="top">
      <div
        className="hero-media"
        style={{ backgroundImage: `url('/images/hero/bg.jpg')` }}
        role="img"
        aria-label="Global Fashion Code — Hero"
      />
      <div className="hero-overlay" />
      <div className="hero-grain" />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '100px 24px 48px',
        color: 'var(--paper)',
      }}>
        <div style={{ flex: 1 }} />

        {/* H1 + meta texts — raised 100px above CTA */}
        <div style={{ position: 'relative', marginBottom: 140 }}>
          <span style={{
            position: 'absolute', left: 0,
            top: 'calc(1.5 * 80px * 0.92)', transform: 'translateY(-50%)',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7,
            whiteSpace: 'nowrap',
          }}>
            ( Global Fashion Code )
          </span>
          <h1 className="hero-headline" style={{ textAlign: 'center', lineHeight: 0.92, margin: 0 }}>
            The place where<br /><em>fashion talent</em><br />gets discovered
          </h1>
          <span style={{
            position: 'absolute', right: 0,
            top: 'calc(1.5 * 80px * 0.92)', transform: 'translateY(-50%)',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7,
            whiteSpace: 'nowrap',
          }}>
            ( Casting ) · ( Runway ) · ( Award )
          </span>
        </div>

        {/* CTA row — Apply Now centered, Scroll down right */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            className="btn btn-ghost-on-ink btn-lg"
            style={{ borderColor: 'rgba(255,255,255,0.5)', gap: 20 }}
            onClick={() => router.push('/apply')}
          >
            Apply Now <Arrow size={66} />
          </button>
          <div style={{
            position: 'absolute', right: 0,
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: 0.5, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            Scroll down <Arrow size={54} rotate={45} />
          </div>
        </div>
      </div>
    </section>
  );
}

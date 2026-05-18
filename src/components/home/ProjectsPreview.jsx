'use client';

import Link from 'next/link';
import { GFC_DATA } from '@/lib/data';

const cardPhotos = [
  '/cards/01.jpg',
  '/cards/02.jpg',
  '/cards/03.jpg',
  '/cards/04.jpg',
  '/cards/05.jpg',
];

export default function ProjectsPreview() {
  const projects = GFC_DATA.projects;

  return (
    <section id="projects" style={{ background: 'var(--ink)', color: 'var(--paper)', paddingTop: 80, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: '0 24px', marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>( 02 )</span>
          <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>Our projects</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, maxWidth: 960, margin: '0 auto' }}>
          <h2 className="t-display-md" style={{ textAlign: 'center', color: 'var(--paper)', margin: 0, fontSize: 'clamp(48px, 6.5vw, 80px)', width: '100%' }}>
            Platforms that create<br />
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 700, letterSpacing: 'var(--display-tracking)' }}>opportunities</em>
          </h2>
          <p style={{ color: 'var(--on-ink-2)', textAlign: 'center', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
            Each project works as a separate fashion universe with its own visual language, audience and industry purpose.
          </p>
        </div>
      </div>

      {/* Grid — 5 cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 8,
        padding: '0 24px',
      }}>
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="project-card"
            style={{ height: 'clamp(360px, 45vw, 560px)', textDecoration: 'none' }}
          >
            {/* Background image — grayscale by default, colour on hover */}
            <div
              className="project-card-bg"
              style={{ backgroundImage: `url('${cardPhotos[i]}')` }}
            />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.78) 100%)' }} />

            {/* Number top-center */}
            <span style={{
              position: 'absolute', top: 20, left: 0, right: 0,
              textAlign: 'center',
              color: 'var(--paper)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              ( {p.number} )
            </span>

            {/* Content bottom-center */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0 20px 28px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
              textAlign: 'center',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1.0,
                fontSize: 'clamp(14px, 1.4vw, 20px)', color: 'var(--paper)', margin: 0,
              }}>
                {p.name}
              </h3>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {p.forWho}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ color: 'var(--paper)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 2 }}>
                  Discover more
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

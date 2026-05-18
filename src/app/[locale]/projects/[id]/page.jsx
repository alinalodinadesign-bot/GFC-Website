'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ApplyCta from '@/components/home/ApplyCta';
import GalleryPreview from '@/components/home/GalleryPreview';
import { GFC_DATA } from '@/lib/data';

const cardPhotos = [
  '/cards/01.jpg',
  '/cards/02.jpg',
  '/cards/03.jpg',
  '/cards/04.jpg',
  '/cards/05.jpg',
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const t = useTranslations('projectPage');

  const p = GFC_DATA.projects.find(x => x.id === id) || GFC_DATA.projects[0];
  const pIdx = GFC_DATA.projects.findIndex(x => x.id === p.id);
  const others = GFC_DATA.projects.filter(x => x.id !== p.id);

  return (
    <main className="proj">
<section className="proj-hero">
        <div className="left">
          <div>
            <div className="t-meta" style={{ color: 'var(--fg-3)', marginBottom: 24 }}>
              <span className="index-pill">/{p.number}</span>
              <span style={{ marginLeft: 12 }}>{t('meta')}</span>
            </div>
            <h1>
              {p.name.split(' ').map((w, i, arr) => (
                <span key={i}>
                  {i === 1 ? <em>{w}</em> : w}{i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}.
            </h1>
          </div>
          <div>
            <p className="concept">{p.tagline}</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#apply-cta" className="btn btn-arrow">{t('applyNow')}</a>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={cardPhotos[pIdx] || p.hero} alt={p.name} loading="lazy" />
        </div>
      </section>

      <section className="proj-meta">
        <div className="cell">
          <div className="label">/01 For</div>
          <div className="val">{p.forWho}</div>
        </div>
        <div className="cell">
          <div className="label">/02 Where</div>
          <div className="val">{p.location}</div>
        </div>
        <div className="cell">
          <div className="label">/03 When</div>
          <div className="val">{p.year}</div>
        </div>
        <div className="cell">
          <div className="label">/04 Index</div>
          <div className="val">/{p.number} of 05</div>
        </div>
      </section>

      <section className="proj-section">
        <div className="proj-receive-grid">
          <h3 className="lead">
            {t('receiveTitle')} <span className="t-serif" style={{ fontSize: 'inherit' }}>{t('receiveEm')}</span>.
          </h3>
          <ul className="proj-receive-list">
            {p.receive.map(r => (
              <li key={r.n}>
                <span className="n">/{r.n}</span>
                <div>
                  <h4>{r.t}</h4>
                  <p>{r.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery — full component with filmstrip + lightbox */}
      <GalleryPreview title={t('fromTheFloor')} />

      {/* Apply CTA — project-aware */}
      <ApplyCta project={`Project page — ${p.name}`} />

      {/* Other projects */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', paddingTop: 80, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: '0 24px', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>{t('othersIndex')}</span>
            <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>{t('othersLabel')}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, maxWidth: 960, margin: '0 auto' }}>
            <h2 className="t-display-md" style={{ textAlign: 'center', color: 'var(--paper)', margin: 0, fontSize: 'clamp(40px, 5.5vw, 72px)', width: '100%' }}>
              {t('othersTitle')}{' '}
              <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 700, letterSpacing: 'var(--display-tracking)' }}>{t('othersTitleEm')}</em>
            </h2>
            <p style={{ color: 'var(--on-ink-2)', textAlign: 'center', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
              {t('othersSubtitle')}
            </p>
          </div>
        </div>

        {/* Cards — same style as "Our projects" on homepage */}
        <div className="projects-grid-scroll proj-others-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          padding: '0 24px',
        }}>
          {others.map(o => {
            const idx = GFC_DATA.projects.findIndex(x => x.id === o.id);
            return (
              <Link
                key={o.id}
                href={`/projects/${o.id}`}
                className="project-card"
                style={{ height: 'clamp(360px, 40vw, 520px)', textDecoration: 'none' }}
              >
                {/* Background image — grayscale by default, colour on hover */}
                <div
                  className="project-card-bg"
                  style={{ backgroundImage: `url('${cardPhotos[idx] || cardPhotos[0]}')` }}
                />
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.78) 100%)' }} />

                {/* Number top-center */}
                <span style={{
                  position: 'absolute', top: 20, left: 0, right: 0,
                  textAlign: 'center',
                  color: 'var(--paper)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                }}>
                  ( {o.number} )
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
                    {o.name}
                  </h3>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {o.forWho}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--paper)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 2 }}>
                      {t('discoverMore')}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

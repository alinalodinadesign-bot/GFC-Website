'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Arrow from '@/components/Arrow';

const GALLERY_DATA = {
  event: ["gallery/event/01.jpg","gallery/event/02.jpg","gallery/event/03.jpg","gallery/event/04.jpg","gallery/event/05.jpg","gallery/event/06.jpg","gallery/event/07.jpg","gallery/event/08.jpg","gallery/event/09.jpg","gallery/event/10.jpg","gallery/event/11.jpg","gallery/event/12.jpg"],
  runway: ["gallery/runway/01.jpg","gallery/runway/02.jpg","gallery/runway/03.jpg","gallery/runway/04.jpg","gallery/runway/05.jpg","gallery/runway/06.jpg","gallery/runway/07.jpg","gallery/runway/08.jpg","gallery/runway/09.jpg","gallery/runway/10.jpg","gallery/runway/11.jpg","gallery/runway/12.jpg","gallery/runway/13.jpg","gallery/runway/14.jpg","gallery/runway/15.jpg","gallery/runway/16.jpg","gallery/runway/17.jpg"],
  castings: ["gallery/castings/01.jpg","gallery/castings/02.jpg","gallery/castings/03.jpg","gallery/castings/04.jpg","gallery/castings/05.jpg","gallery/castings/06.jpg","gallery/castings/07.jpg","gallery/castings/08.jpg","gallery/castings/09.jpg","gallery/castings/10.jpg","gallery/castings/11.jpg"],
  backstage: ["gallery/backstage/01.jpg","gallery/backstage/02.jpg","gallery/backstage/03.jpg","gallery/backstage/04.jpg","gallery/backstage/05.jpg","gallery/backstage/06.jpg","gallery/backstage/07.jpg","gallery/backstage/08.jpg","gallery/backstage/09.jpg"],
  awards: ["gallery/awards/01.jpg","gallery/awards/02.jpg","gallery/awards/03.jpg","gallery/awards/04.jpg","gallery/awards/05.jpg","gallery/awards/06.jpg","gallery/awards/07.jpg","gallery/awards/08.jpg","gallery/awards/09.jpg","gallery/awards/10.jpg"],
};

export default function GalleryPreview({ title = null }) {
  const t = useTranslations('gallery');
  const [tab, setTab] = useState('all');
  const [lb, setLb] = useState(null); /* { list, idx } */

  const trackRef = useRef(null);
  const rafRef  = useRef(null);
  const xRef    = useRef(0);

  const TABS = ['all', 'event', 'runway', 'castings', 'backstage', 'awards'];

  const allPhotos = Object.entries(GALLERY_DATA).flatMap(([cat, imgs]) =>
    imgs.map(src => ({ src: '/' + src, cat }))
  );
  const photos = tab === 'all'
    ? allPhotos
    : GALLERY_DATA[tab].map(src => ({ src: '/' + src, cat: tab }));

  /* filmstrip speed: ~7 s per photo, min 40 s */
  const duration = Math.max(photos.length * 7, 40);

  /* ── rAF filmstrip — bypasses all Safari CSS animation bugs ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    xRef.current = 0;
    let lastTs = null;

    const tick = (ts) => {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000; // seconds
      lastTs = ts;

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        const speed = halfWidth / duration; // px/s
        xRef.current -= speed * dt;
        if (Math.abs(xRef.current) >= halfWidth) xRef.current = 0;
        track.style.transform = `translateX(${xRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tab, duration]);

  /* lightbox */
  const openLb = idx => setLb({ list: photos, idx });
  const closeLb = () => setLb(null);
  const prev = () => setLb(l => ({ ...l, idx: (l.idx - 1 + l.list.length) % l.list.length }));
  const next = () => setLb(l => ({ ...l, idx: (l.idx + 1) % l.list.length }));

  useEffect(() => {
    if (!lb) return;
    const fn = e => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lb]);

  /* tab pill */
  const tabStyle = active => ({
    padding: '8px 20px',
    border: '1px solid',
    borderColor: active ? 'var(--paper)' : 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    background: active ? 'var(--paper)' : 'transparent',
    color: active ? 'var(--ink)' : 'var(--paper)',
    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.25s',
    fontFamily: 'var(--font-body)',
  });

  /* lightbox nav button */
  const navBtn = extra => ({
    background: 'none', border: '1px solid rgba(255,255,255,0.3)',
    color: 'var(--paper)', borderRadius: 999,
    width: 48, height: 48, cursor: 'pointer',
    fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
    ...extra,
  });

  const tabLabel = (tabKey) => t(`tabs.${tabKey}`);

  return (
    <section id="gallery" style={{ background: 'transparent', color: 'var(--paper)' }}>

      {/* Header */}
      <div style={{ padding: '64px 24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <span className="t-meta" style={{ color: 'var(--paper)' }}>{t('index')}</span>
        <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>{t('label')}</span>
      </div>
      <div style={{ padding: '0 24px 40px', textAlign: 'center' }}>
        {title ? (
          <h2 className="t-display-lg" style={{ color: 'var(--paper)', margin: 0, lineHeight: 0.88 }}>
            {title}
          </h2>
        ) : (
          <h2 className="t-display-lg" style={{ color: 'var(--paper)', margin: 0, lineHeight: 0.88 }}>
            {t('title')}{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 700, letterSpacing: 'var(--display-tracking)' }}>{t('titleEm')}</em>{' '}
            {t('titleEnd')}
          </h2>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 24px 40px', justifyContent: 'center' }}>
        {TABS.map(tabKey => (
          <button key={tabKey} onClick={() => setTab(tabKey)} style={tabStyle(tab === tabKey)}>
            {tabLabel(tabKey)}
          </button>
        ))}
      </div>

      {/* Filmstrip */}
      {photos.length === 0 ? (
        <div style={{ padding: '80px 24px', textAlign: 'center', opacity: 0.25,
          fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          {t('empty')}
        </div>
      ) : (
        <div className="gallery-filmstrip-wrap" style={{ lineHeight: 0, paddingBottom: 80 }}>
          <div
            ref={trackRef}
            className="gallery-filmstrip-track"
          >
            {[...photos, ...photos].map((p, i) => (
              <img
                key={i}
                src={p.src}
                alt=""
                loading="lazy"
                decoding="async"
                onClick={() => openLb(i % photos.length)}
                style={{
                  height: 'clamp(320px, 44vh, 540px)',
                  width: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                  flexShrink: 0,
                  cursor: 'pointer',
                  marginTop: (i % 2 === 1) ? 30 : 0,
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lb && (
        <div onClick={closeLb} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Close */}
          <button onClick={closeLb}
            style={{ ...navBtn({ width: 44, height: 44, fontSize: 16 }),
              position: 'absolute', top: 24, right: 24, zIndex: 1 }}>
            ✕
          </button>

          {/* Counter */}
          <div style={{
            position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}>
            {lb.idx + 1} / {lb.list.length}
          </div>

          {/* Image */}
          <img
            src={lb.list[lb.idx].src}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '88vw', maxHeight: '88vh',
              objectFit: 'contain',
              boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
            }}
          />

          {/* Prev */}
          {lb.list.length > 1 && (
            <button onClick={e => { e.stopPropagation(); prev(); }}
              style={{ ...navBtn(), position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)' }}>
              ←
            </button>
          )}

          {/* Next */}
          {lb.list.length > 1 && (
            <button onClick={e => { e.stopPropagation(); next(); }}
              style={{ ...navBtn(), position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)' }}>
              <Arrow size={60} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}

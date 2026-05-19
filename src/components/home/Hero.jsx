'use client';

import { useTranslations } from 'next-intl';
import Arrow from '@/components/Arrow';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="hero" id="top">
      <div
        className="hero-media"
        style={{ backgroundImage: `url('/images/hero/bg.webp')` }}
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

        {/* Fashion Call — над заголовком (десктоп); на мобилке скрыт */}
        <div className="hero-anim-script hero-script-wrap hero-script-desktop" style={{ textAlign: 'center', marginBottom: '-0.18em', marginTop: 24, pointerEvents: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(20px, 8.5vw, 118px)',
            lineHeight: 1,
            color: '#F3D883',
          }}>
            {t('scriptLine')}
          </span>
        </div>

        {/* H1 + боковые подписи */}
        <div className="hero-headline-wrap" style={{ position: 'relative', marginBottom: 140 }}>
          <span className="hero-meta-left hero-anim-meta" style={{
            position: 'absolute', left: 0,
            top: '50%', transform: 'translateY(-50%)',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7,
            whiteSpace: 'nowrap',
          }}>
            {t('eyebrowLeft')}
          </span>

          {/* Fashion Call — только на мобилке, между ( GLOBAL FASHION CODE ) и h1 */}
          <div className="hero-script-mobile" style={{ display: 'none', pointerEvents: 'none', textAlign: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(20px, 8.5vw, 118px)',
              lineHeight: 1,
              color: '#F3D883',
            }}>
              {t('scriptLine')}
            </span>
          </div>

          <h1 className="hero-headline hero-anim-h1" style={{ textAlign: 'center', lineHeight: 0.92, margin: 0 }}>
            {t('line1')}<br /><em>{t('line2')}</em><br />{t('line3')}
          </h1>
          <span className="hero-meta-right hero-anim-meta" style={{
            position: 'absolute', right: 0,
            top: '50%', transform: 'translateY(-50%)',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7,
            whiteSpace: 'nowrap',
          }}>
            {t('eyebrowRight')}
          </span>
        </div>

        {/* CTA */}
        <div className="hero-anim-cta" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            className="btn btn-ghost-on-ink btn-lg"
            style={{ borderColor: 'rgba(255,255,255,0.5)', gap: 20 }}
            onClick={() => document.getElementById('apply-cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('applyNow')} <Arrow size={66} />
          </button>
          <div className="hero-scroll-hint" style={{
            position: 'absolute', right: 0,
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: 0.5, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            {t('scrollDown')} <Arrow size={54} rotate={45} />
          </div>
        </div>
      </div>
    </section>
  );
}

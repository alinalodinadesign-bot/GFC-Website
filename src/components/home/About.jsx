import { Fragment } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function About() {
  const t = await getTranslations('about');

  return (
    <section id="about" style={{ background: 'transparent' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>

        {/* Left panel */}
        <div style={{
          flex: '1 1 360px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(48px,8vw,96px) clamp(24px,4vw,64px)',
          gap: 36,
        }}>
          <div style={{ width: '100%', maxWidth: 590 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span className="t-meta" style={{ color: 'var(--fg-3)' }}>{t('index')}</span>
              <span className="t-meta" style={{ color: 'var(--fg-3)' }}>{t('label')}</span>
              <span className="t-meta" style={{ color: 'var(--fg-3)' }}>{t('tag')}</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 'var(--display-tracking)',
              lineHeight: 0.88,
              fontSize: 'clamp(40px, 5vw, 60px)',
              textAlign: 'center',
              margin: 0,
            }}>
              {t('titleLine1')}<br />{t('titleLine2')}
              {t('titleEm') && <> <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 700, letterSpacing: 'var(--display-tracking)' }}>{t('titleEm')}</em></>}
            </h2>
          </div>

          <img
            src="/images/about/about-portrait.webp"
            alt="About GFC"
            loading="lazy"
            style={{ width: 'clamp(140px, 18vw, 225px)', aspectRatio: '225/337', objectFit: 'cover' }}
          />

          <p style={{ color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.65, textAlign: 'center', maxWidth: 407, margin: 0 }}>
            {t('description')}
          </p>

          <p style={{
            color: '#fff',
            mixBlendMode: 'difference',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textAlign: 'center',
            maxWidth: 720,
            margin: '14px 0 0',
            lineHeight: 1.8,
          }}>
            {t('audience').split(' · ').map((chip, i) => (
              <Fragment key={i}>
                {i > 0 && ' · '}
                <span style={{ whiteSpace: 'nowrap' }}>{chip}</span>
              </Fragment>
            ))}
          </p>
        </div>

        {/* Right panel — large image */}
        <div className="about-large-img" style={{ flex: '1 1 360px', minHeight: 560 }}>
          <img
            src="/images/about/about-main.webp"
            alt="Fashion editorial"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}

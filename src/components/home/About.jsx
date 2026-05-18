export default function About() {
  return (
    <section id="about" style={{ background: 'var(--paper)' }}>
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
              <span className="t-meta" style={{ color: 'var(--fg-3)' }}>( 01 )</span>
              <span className="t-meta" style={{ color: 'var(--fg-3)' }}>About</span>
              <span className="t-meta" style={{ color: 'var(--fg-3)' }}>( GFC )</span>
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
              Connecting talent<br />with{' '}
              <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 700, letterSpacing: 'var(--display-tracking)' }}>opportunity</em>
            </h2>
          </div>

          <img
            src="/images/about/about-portrait.jpg"
            alt="About GFC"
            loading="lazy"
            style={{ width: 'clamp(140px, 18vw, 225px)', aspectRatio: '225/337', objectFit: 'cover' }}
          />

          <p style={{ color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.65, textAlign: 'center', maxWidth: 407, margin: 0 }}>
            Global Fashion Code is an exclusive three-day event that brings together the world&apos;s leading modeling agencies,
            emerging models, top designers, renowned photographers, talented makeup artists, and other key fashion industry players.
          </p>
        </div>

        {/* Right panel — large image */}
        <div style={{ flex: '1 1 360px', minHeight: 560 }}>
          <img
            src="/images/about/about-main.jpg"
            alt="Fashion editorial"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}

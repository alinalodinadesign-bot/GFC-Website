'use client';

const meta = { fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' };
const legal = { fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s' };

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>

      {/* Big headline block */}
      <div style={{ padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,80px) 24px', overflow: 'hidden' }}>

        {/* top meta row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
          <span style={meta}>( 07 )</span>
          <span style={meta}>Join our world</span>
          <span style={meta}>( GFC )</span>
        </div>

        {/* big name */}
        <h2 style={{
          color: 'var(--paper)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 0.88,
          letterSpacing: '-0.05em',
          fontSize: 'clamp(40px, 10vw, 120px)',
          textAlign: 'center',
          margin: 0,
        }}>
          Global Fashion Code
        </h2>

        {/* contacts column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 20 }}>
          <a
            href="https://www.instagram.com/globalfashioncode"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...meta, textDecoration: 'none' }}
          >
            @globalfashioncode
          </a>
          <span style={meta}>info@globalfashioncode.com</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '24px clamp(24px,6vw,80px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 24px' }}>
          {['Privacy Policy', 'Terms & Conditions', 'Photos & Video Content', 'Media & Press Notice'].map(label => (
            <a
              key={label}
              href="#"
              style={legal}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              {label}
            </a>
          ))}
        </div>
        <span style={{ ...meta, opacity: 0.35 }}>© 2026 Global Fashion Code</span>
      </div>

    </footer>
  );
}

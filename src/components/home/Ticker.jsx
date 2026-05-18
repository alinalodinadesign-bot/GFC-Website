export default function Ticker() {
  const text = "( Fashion Discovery Stage · 7—9 May 2026 · Batumi )   ·   ( Future Idols · Casting Tour 2026 )   ·   ( Global Fashion Showcase · Tbilisi 2026 )   ·   ( Now accepting Model · Designer · Agency )   ·   ";
  return (
    <div style={{ background: 'var(--paper)', padding: '32px 0', overflow: 'hidden', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 80s linear infinite' }}>
          <span className="t-meta" style={{ color: 'var(--fg-1)' }}>{text}{text}{text}</span>
        </div>
      </div>
    </div>
  );
}

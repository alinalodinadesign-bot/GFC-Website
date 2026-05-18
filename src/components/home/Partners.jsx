const logos = [
  { file: "/logos/logo FDS.svg",         alt: "FDS",         h: 28 },
  { file: "/logos/logo MAG.svg",          alt: "MAG",         h: 44 },
  { file: "/logos/logo Model talk.svg",   alt: "Model Talk",  h: 22 },
  { file: "/logos/logo_bottom.svg",       alt: "Bottom",      h: 48 },
  { file: "/logos/logo_flashmodel.svg",   alt: "Flash Model", h: 16 },
  { file: "/logos/logo_gfi.svg",          alt: "GFI",         h: 36 },
  { file: "/logos/logo_makeup.svg",       alt: "Makeup",      h: 44 },
];

export default function Partners() {
  return (
    <section className="partners" id="partners">
      <div className="partners-head" style={{ alignItems: 'start' }}>
        <span className="t-meta" style={{ color: 'var(--ink)', paddingTop: '0.15em' }}>( 05 )</span>
        <h2 className="t-display-lg" style={{ fontSize: 'clamp(40px, 5vw, 60px)', margin: 0 }}>
          Our Partners
        </h2>
        <p className="t-body-sm" style={{ maxWidth: '32ch', paddingTop: '0.15em', margin: 0 }}>
          A curated network of agencies, media, beauty houses and sponsors — invited season by season.
        </p>
      </div>

      {/* Logo strip */}
      <div style={{
        borderTop: '1px solid var(--ink)',
        paddingTop: 56,
        paddingBottom: 24,
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '32px 48px',
      }}>
        {logos.map(({ file, alt, h }) => (
          <img
            key={file}
            src={file}
            alt={alt}
            loading="lazy"
            style={{ height: h, width: 'auto', display: 'block', opacity: 0.85 }}
          />
        ))}
      </div>
    </section>
  );
}

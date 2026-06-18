'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { legalContent } from '@/lib/legalContent';

function H3({ children }) {
  return <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginTop: 36, marginBottom: 10 }}>{children}</h3>;
}
function P({ children }) {
  return <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 12 }}>{children}</p>;
}
function Meta({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', minWidth: 160, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{value}</span>
    </div>
  );
}

export default function LegalPage() {
  const { locale } = useParams();
  const content = legalContent[locale] || legalContent.en;
  const [active, setActive] = useState(content.sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    content.sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [locale]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* Page header */}
        <div style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', display: 'block', marginBottom: 12 }}>{content.pageLabel}</span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-0.04em', lineHeight: 0.9,
            fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--ink)', margin: 0,
            whiteSpace: 'pre-line',
          }}>{content.pageTitle}</h1>
          <p style={{ marginTop: 20, fontSize: 14, color: 'var(--fg-3)', maxWidth: 480 }}>{content.pageMeta}</p>
        </div>

        {/* Two-column layout */}
        <div className="legal-layout" style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'flex-start', paddingBottom: 120 }}>

          {/* Sticky sidebar */}
          <aside className="legal-sidebar" style={{ position: 'sticky', top: 100, flexShrink: 0, width: 220, paddingTop: 48 }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {content.sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: '8px 12px',
                    fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)', fontWeight: active === s.id ? 700 : 400,
                    color: active === s.id ? 'var(--ink)' : 'var(--fg-3)',
                    borderLeft: `2px solid ${active === s.id ? 'var(--ink)' : 'transparent'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  {s.nav}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: 48 }}>
            {content.sections.map((section, si) => (
              <div key={section.id}>
                <section id={section.id} style={{ paddingTop: 80, marginTop: -80 }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '-0.03em', fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--ink)',
                    marginBottom: 40, paddingBottom: 16, borderBottom: '1px solid var(--rule)',
                  }}>{section.title}</h2>

                  {section.lastUpdated && (
                    <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 }}>{section.lastUpdated}</p>
                  )}

                  {section.blocks.map((block, bi) => {
                    if (block.type === 'h3') return <H3 key={bi}>{block.text}</H3>;
                    if (block.type === 'p')  return <P key={bi}>{block.text}</P>;
                    if (block.type === 'meta') return <Meta key={bi} label={block.label} value={block.value} />;
                    return null;
                  })}
                </section>
                {si < content.sections.length - 1 && (
                  <div style={{ margin: '64px 0', borderTop: '1px solid var(--rule)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import Arrow from '@/components/Arrow';
import { GFC_DATA } from '@/lib/data';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const p = GFC_DATA.projects.find(x => x.id === id) || GFC_DATA.projects[0];
  const others = GFC_DATA.projects.filter(x => x.id !== p.id);
  const galleryTiles = GFC_DATA.gallery.slice(0, 6);

  return (
    <main className="proj">
      <section className="proj-hero">
        <div className="left">
          <div>
            <div className="t-meta" style={{ color: 'var(--fg-3)', marginBottom: 24 }}>
              <span className="index-pill">/{p.number}</span>
              <span style={{ marginLeft: 12 }}>Project / GFC Universe</span>
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
              <button className="btn btn-arrow" onClick={() => router.push('/apply')}>Apply for this universe</button>
              <a className="link-line" onClick={() => { router.push('/'); setTimeout(() => { const el = document.getElementById('event'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 80); }} style={{ cursor: 'pointer' }}>
                See upcoming event <Arrow size={45} />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={p.hero} alt={p.name} loading="lazy" />
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
            What participants <span className="t-serif" style={{ fontSize: 'inherit' }}>receive</span>.
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

      {/* Gallery slice */}
      <section className="proj-section" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <h3 className="t-display-md">
            From the floor.
          </h3>
          <a className="link-line" onClick={() => { router.push('/'); setTimeout(() => { const el = document.getElementById('gallery'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 80); }} style={{ cursor: 'pointer' }}>
            Open full archive <Arrow size={45} />
          </a>
        </div>
        <div className="gallery-mason">
          {galleryTiles.map((g, i) => (
            <div key={i} className={`gallery-tile gt-${(i % 9) + 1} ${g.mono ? 'mono' : ''}`}>
              <img src={g.src} alt={`${g.cat} — ${g.title}`} loading="lazy" />
              <div className="cap">/{(i + 1).toString().padStart(2, '0')} · {g.cat}</div>
              {g.video && <div className="play">Play ▸</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Other projects */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="index-pill" style={{ color: 'var(--paper)', borderColor: 'var(--paper)', marginBottom: 12 }}>( + )</div>
              <h3 className="t-display-md">Other <em style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>universes</em>.</h3>
            </div>
            <p className="t-body" style={{ color: 'var(--on-ink-2)', maxWidth: '40ch' }}>
              Four further programmes — each its own audience, format, and industry purpose.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="proj-others">
            {others.map(o => (
              <a
                key={o.id}
                className="project-card"
                onClick={() => router.push('/projects/' + o.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="frame" style={{ aspectRatio: '3/4', background: 'var(--ink-3)' }}>
                  <img src={o.thumb} alt={o.name} loading="lazy" />
                </div>
                <div className="meta" style={{ color: 'var(--on-ink-3)' }}>
                  <span>/{o.number}</span>
                  <span>{o.location}</span>
                </div>
                <h3 style={{ color: 'var(--paper)' }}>{o.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

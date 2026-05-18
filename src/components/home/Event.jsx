'use client';

import { useRouter } from 'next/navigation';
import { GFC_DATA } from '@/lib/data';

export default function Event() {
  const router = useRouter();
  const e = GFC_DATA.event;

  return (
    <section className="event" id="event">
      <div className="event-grid">
        <div className="event-frame">
          <img src={e.poster} alt="Fashion Discovery Stage — Batumi" loading="lazy" />
          <div className="badge"><span className="pulse"></span>Live — Applications open</div>
        </div>
        <div className="event-content">
          <div className="event-eyebrow">
            <span className="t-meta" style={{ color: 'var(--paper)' }}>( 03 )</span>
            <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>Upcoming Event · Spring 026</span>
          </div>
          <h2 className="event-title">Fashion<br /><em>Discovery</em> Stage.</h2>
          <div className="event-place">{e.place}<br />{e.date}</div>
          <div className="event-categories">
            {e.categories.map(c => (
              <div key={c.n} className="event-cat">
                <span className="n">/{c.n}</span>
                <span className="l">{c.l}</span>
              </div>
            ))}
          </div>
          <div className="event-cta">
            <a href="#apply-cta" className="btn btn-on-ink btn-arrow" onClick={e => { e.preventDefault(); document.getElementById('apply-cta')?.scrollIntoView({ behavior: 'smooth' }); }}>Apply for the event</a>
          </div>
        </div>
      </div>
    </section>
  );
}

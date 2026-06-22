import { getLocale } from 'next-intl/server';
import { GFC_DATA } from '@/lib/data';
import { fetchEventData } from '@/lib/event-data';

export default async function Event() {
  const locale  = await getLocale();
  const sheet   = await fetchEventData(locale);
  const fb      = GFC_DATA.event; // fallback

  const eyebrow  = sheet?.eyebrow  || 'Upcoming Event · Spring 026';
  const badge    = sheet?.badge    || 'Live — Applications open';
  const title    = sheet?.title    || fb.title;
  const place    = sheet?.place    || fb.place;
  const date     = sheet?.date     || fb.date;

  const catLabels = [
    sheet?.cat_01 || fb.categories[0]?.l,
    sheet?.cat_02 || fb.categories[1]?.l,
    sheet?.cat_03 || fb.categories[2]?.l,
    sheet?.cat_04 || fb.categories[3]?.l,
    sheet?.cat_05 || fb.categories[4]?.l,
  ].filter(Boolean);

  const categories = catLabels.map((l, i) => ({
    n: String(i + 1).padStart(2, '0'),
    l,
  }));

  return (
    <section className="event" id="event">
      <div className="event-grid">
        <div className="event-frame">
          <img src={fb.poster} alt={title} loading="lazy" />
          <div className="badge"><span className="pulse"></span>{badge}</div>
        </div>
        <div className="event-content">
          <div className="event-eyebrow">
            <span className="t-meta" style={{ color: 'var(--paper)' }}>( 03 )</span>
            <span className="t-meta" style={{ color: 'var(--on-ink-2)' }}>{eyebrow}</span>
          </div>
          <h2 className="event-title">{title}.</h2>
          <div className="event-place">{place}<br />{date}</div>
          <div className="event-categories">
            {categories.map(c => (
              <div key={c.n} className="event-cat">
                <span className="n">/{c.n}</span>
                <span className="l">{c.l}</span>
              </div>
            ))}
          </div>
          <div className="event-cta">
            <a href="#apply-cta" className="btn btn-on-ink btn-arrow">Apply for the event</a>
          </div>
        </div>
      </div>
    </section>
  );
}

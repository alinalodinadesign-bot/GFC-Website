import { GFC_DATA }      from '@/lib/data';
import { fetchEventData } from '@/lib/event-data';

export default async function Ticker() {
  const sheet = await fetchEventData();
  const fb    = GFC_DATA.event;

  const title = sheet?.title || fb.title;
  const place = sheet?.place || fb.place;
  const date  = sheet?.date  || fb.date;

  const cats = [
    sheet?.cat_01 || fb.categories[0]?.l,
    sheet?.cat_02 || fb.categories[1]?.l,
    sheet?.cat_03 || fb.categories[2]?.l,
    sheet?.cat_04 || fb.categories[3]?.l,
    sheet?.cat_05 || fb.categories[4]?.l,
  ].filter(Boolean);

  // Build one repetition: "( Title · Date · Place )   ·   ( Cat1 )   ·   ..."
  const segment =
    `( ${title} · ${date} · ${place} )   ·   ` +
    cats.map(c => `( ${c} )`).join('   ·   ') +
    '   ·   ';

  const text = segment.repeat(3);

  return (
    <div className="ticker-strip" style={{ background: 'var(--paper)', padding: '32px 0', overflow: 'hidden', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 80s linear infinite' }}>
          <span className="t-meta" style={{ color: 'var(--fg-1)' }}>{text}</span>
        </div>
      </div>
    </div>
  );
}

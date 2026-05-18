export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="contact-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <span className="index-pill">( ✦ )</span>
          <span className="t-meta" style={{ color: 'var(--fg-3)' }}>Contact · GFC Office</span>
        </div>
        <h1 className="t-display-lg" style={{ marginBottom: 32 }}>
          Reach the<br /><em style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>floor</em>.
        </h1>
        <p className="t-body-lg" style={{ maxWidth: '48ch', color: 'var(--fg-2)', marginBottom: 24 }}>
          For applications, press, partnership and general enquiry — please use the channel that fits.
          Office hours, 09:00 — 19:00 GET, Monday to Friday.
        </p>

        <div className="contact-grid">
          <ul className="contact-list">
            <li>
              <div className="label">/01 Instagram</div>
              <div className="val">@global.fashion.code</div>
              <a className="link-line ix">Visit ↗</a>
            </li>
            <li>
              <div className="label">/02 Email</div>
              <div className="val">studio@gfc.world</div>
              <a className="link-line ix">Write ↗</a>
            </li>
            <li>
              <div className="label">/03 WhatsApp</div>
              <div className="val">+995 595 026 026</div>
              <a className="link-line ix">Message ↗</a>
            </li>
            <li>
              <div className="label">/04 Office</div>
              <div className="val">42 Agmashenebeli · Tbilisi · GE</div>
              <a className="link-line ix">Map ↗</a>
            </li>
            <li>
              <div className="label">/05 Press</div>
              <div className="val">press@gfc.world</div>
              <a className="link-line ix">Write ↗</a>
            </li>
          </ul>

          <div>
            <div className="qr" aria-label="Instagram QR code (illustrative)">
              <div className="qr-inner"></div>
            </div>
            <div className="t-meta" style={{ color: 'var(--fg-3)', marginTop: 16, textAlign: 'center' }}>
              Scan · @global.fashion.code
            </div>
            <div style={{ marginTop: 40, padding: 24, border: '1px solid var(--ink)' }}>
              <div className="t-meta" style={{ marginBottom: 12, color: 'var(--fg-3)' }}>( Newsletter — Season 026 )</div>
              <div className="t-display-sm" style={{ fontSize: 22, marginBottom: 16 }}>
                The dispatch.
              </div>
              <p className="t-body-sm" style={{ marginBottom: 20 }}>
                One letter a season — open calls, dates, names. No promotion, no fluff.
              </p>
              <div className="field" style={{ marginBottom: 12 }}>
                <input type="email" placeholder="you@studio.com" />
              </div>
              <button className="btn btn-arrow" style={{ width: '100%', justifyContent: 'center' }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

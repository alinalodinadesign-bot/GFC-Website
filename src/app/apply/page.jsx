'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Arrow from '@/components/Arrow';
import { GFC_DATA } from '@/lib/data';

const APPLY_RECEIVE = {
  model: [
    "International casting access",
    "Editorial test shoot + portfolio",
    "Direct presentation to agencies",
    "Optional industry placement",
  ],
  agency: [
    "Scouting room at every event",
    "Mainstage co-presence",
    "Industry roster meetings",
  ],
  designer: [
    "Runway slot · main stage",
    "Press list + trade buyer access",
    "Editorial coverage of collection",
  ],
  photographer: [
    "On-set accreditation",
    "Distribution to GFC archive",
    "Listed in our directory of contributors",
  ],
  makeup: [
    "Editorial / backstage credit",
    "Industry-level kit support",
    "Pro contact directory listing",
  ],
  stylist: [
    "Show + editorial styling slots",
    "Industry contact directory",
    "Wardrobe partner introductions",
  ],
  sponsor: [
    "Brand integration package",
    "Co-creation of stage moments",
    "Year-round content rights",
  ],
  media: [
    "Backstage + runway access",
    "Embargoed press materials",
    "1:1 interview slots with talent",
  ],
};

const APPLY_STEPS_BY_ROLE = {
  model: ["Identity", "Measurements", "Portfolio", "Submit"],
  agency: ["Identity", "Roster", "Documents", "Submit"],
  designer: ["Identity", "Brand", "Collection", "Submit"],
  photographer: ["Identity", "Work", "Availability", "Submit"],
  makeup: ["Identity", "Specialism", "Work", "Submit"],
  stylist: ["Identity", "Field", "Portfolio", "Submit"],
  sponsor: ["Identity", "Partnership", "Terms", "Submit"],
  media: ["Identity", "Outlet", "Coverage", "Submit"],
};

function ApplySuccess() {
  const router = useRouter();
  // Generate reference once on mount
  const [ref] = useState(() => Math.floor(Math.random() * 9000 + 1000));
  return (
    <main className="apply-success">
      <span className="circle-outline">( Received )</span>
      <h2>
        Thank you.<br />Your <em style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>application</em><br />has been received.
      </h2>
      <p>
        A member of the GFC casting panel will be in touch within ten working days.
        Please keep your inbox open — and your portfolio ready.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-arrow" onClick={() => router.push('/')}>Return to home</button>
        <a className="link-line" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Explore the projects <Arrow size={45} /></a>
      </div>
      <div className="t-meta" style={{ color: 'var(--fg-3)', marginTop: 80 }}>
        ( Reference · GFC / 026 / {ref} )
      </div>
    </main>
  );
}

const ModelFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>First name <span className="req">*</span></label><input type="text" placeholder="Anya" /></div>
      <div className="field"><label>Last name <span className="req">*</span></label><input type="text" placeholder="Kovács" /></div>
    </div>
    <div className="field-row-3">
      <div className="field"><label>Age <span className="req">*</span></label><input type="number" placeholder="22" /></div>
      <div className="field"><label>Nationality</label><input type="text" placeholder="Georgian" /></div>
      <div className="field"><label>Based in</label><input type="text" placeholder="Tbilisi" /></div>
    </div>
    <div className="field-row-3">
      <div className="field"><label>Height (cm) <span className="req">*</span></label><input type="number" placeholder="178" /></div>
      <div className="field"><label>Bust / Chest</label><input type="number" placeholder="84" /></div>
      <div className="field"><label>Waist</label><input type="number" placeholder="62" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="you@studio.com" /></div>
      <div className="field"><label>Instagram</label><input type="text" placeholder="@username" /></div>
    </div>
    <div className="upload">
      <div className="ic">↑</div>
      <div style={{ flex: 1 }}>
        <div className="lbl">Upload portfolio / digitals</div>
        <div className="hint">JPG, PNG, PDF · up to 25MB</div>
      </div>
      <div className="link-line">Browse</div>
    </div>
  </>
);

const AgencyFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Agency name <span className="req">*</span></label><input type="text" placeholder="Major Atelier" /></div>
      <div className="field"><label>Founded</label><input type="number" placeholder="2018" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Primary contact <span className="req">*</span></label><input type="text" placeholder="N. Marais" /></div>
      <div className="field"><label>Role</label><input type="text" placeholder="Head of Scouting" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="contact@agency.com" /></div>
      <div className="field"><label>Website</label><input type="url" placeholder="agency.com" /></div>
    </div>
    <div className="field">
      <label>Roster summary</label>
      <textarea placeholder="Headcount, signed talent, recent campaigns…" />
    </div>
  </>
);

const DesignerFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Brand / Studio name <span className="req">*</span></label><input type="text" placeholder="Maison Arro" /></div>
      <div className="field"><label>Founded</label><input type="number" placeholder="2021" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Designer name <span className="req">*</span></label><input type="text" placeholder="A. Petrosyan" /></div>
      <div className="field"><label>Country</label><input type="text" placeholder="Armenia" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="studio@brand.com" /></div>
      <div className="field"><label>Website / IG</label><input type="text" placeholder="brand.com" /></div>
    </div>
    <div className="field">
      <label>Collection statement</label>
      <textarea placeholder="The intent, references, audience, season." />
    </div>
    <div className="upload">
      <div className="ic">↑</div>
      <div style={{ flex: 1 }}>
        <div className="lbl">Upload lookbook</div>
        <div className="hint">PDF preferred · up to 40MB</div>
      </div>
      <div className="link-line">Browse</div>
    </div>
  </>
);

const PhotographerFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Name <span className="req">*</span></label><input type="text" placeholder="Davidson van de Ven" /></div>
      <div className="field"><label>Based in</label><input type="text" placeholder="Paris" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="hello@photog.com" /></div>
      <div className="field"><label>Portfolio URL</label><input type="url" placeholder="portfolio.com" /></div>
    </div>
    <div className="field"><label>Practice / Specialism</label><textarea placeholder="Portrait, runway, editorial…" /></div>
  </>
);

const MakeupFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Name <span className="req">*</span></label><input type="text" placeholder="L. Mendes" /></div>
      <div className="field"><label>Specialism</label><input type="text" placeholder="Editorial, runway" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="hello@kit.com" /></div>
      <div className="field"><label>Instagram</label><input type="text" placeholder="@username" /></div>
    </div>
    <div className="field"><label>Recent credits</label><textarea placeholder="Houses, campaigns, magazines." /></div>
  </>
);

const StylistFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Name <span className="req">*</span></label><input type="text" placeholder="J. Yamamoto" /></div>
      <div className="field"><label>Based in</label><input type="text" placeholder="Tokyo" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="hello@studio.com" /></div>
      <div className="field"><label>Portfolio URL</label><input type="url" placeholder="archive.com" /></div>
    </div>
    <div className="field"><label>Field / Approach</label><textarea placeholder="Print, runway, set / costume…" /></div>
  </>
);

const SponsorFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Company name <span className="req">*</span></label><input type="text" placeholder="Altitude Group" /></div>
      <div className="field"><label>Sector</label><input type="text" placeholder="Hospitality" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Primary contact <span className="req">*</span></label><input type="text" placeholder="Name" /></div>
      <div className="field"><label>Role</label><input type="text" placeholder="Head of Partnerships" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="partnerships@brand.com" /></div>
      <div className="field"><label>Website</label><input type="url" placeholder="brand.com" /></div>
    </div>
    <div className="field"><label>Partnership intent</label><textarea placeholder="Brand fit, season, scope, budget bracket." /></div>
  </>
);

const MediaFields = () => (
  <>
    <div className="field-row">
      <div className="field"><label>Outlet <span className="req">*</span></label><input type="text" placeholder="L'Observé" /></div>
      <div className="field"><label>Format</label><input type="text" placeholder="Print + digital" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Editor / Journalist <span className="req">*</span></label><input type="text" placeholder="Name" /></div>
      <div className="field"><label>Title</label><input type="text" placeholder="Senior Editor" /></div>
    </div>
    <div className="field-row">
      <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="press@outlet.com" /></div>
      <div className="field"><label>Coverage angle</label><input type="text" placeholder="Casting · runway · interview" /></div>
    </div>
  </>
);

const FIELD_COMPONENTS = {
  model: ModelFields,
  agency: AgencyFields,
  designer: DesignerFields,
  photographer: PhotographerFields,
  makeup: MakeupFields,
  stylist: StylistFields,
  sponsor: SponsorFields,
  media: MediaFields,
};

export default function ApplyPage() {
  const [role, setRole] = useState('model');
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  const roles = GFC_DATA.roles;
  const FieldGroup = FIELD_COMPONENTS[role];
  const steps = APPLY_STEPS_BY_ROLE[role] || APPLY_STEPS_BY_ROLE.model;
  const receiveList = APPLY_RECEIVE[role] || APPLY_RECEIVE.model;

  // Reset step when role changes — using layout effect to avoid cascade warning
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setStep(0); }, [role]); // intentional: step must reset when role changes

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) return <ApplySuccess />;

  return (
    <main className="apply-page">
      <div className="apply-page-inner">
        <div className="apply-head">
          <div>
            <div className="crumb">
              <span className="index-pill">( Apply )</span>
              <span style={{ marginLeft: 8 }}>Open Call · 2026 Season</span>
            </div>
            <h1>
              Apply<br />to the <em style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>code</em>.
            </h1>
          </div>
          <div>
            <p className="desc">
              Select your role below. Each application is reviewed by the GFC casting panel
              and answered within ten working days. There is no application fee.
            </p>
          </div>
        </div>

        <div className="apply-tabs" role="tablist" aria-label="Application role">
          {roles.map((r, i) => (
            <button
              key={r.id}
              className={`apply-tab ${role === r.id ? 'is-active' : ''}`}
              onClick={() => setRole(r.id)}
              role="tab"
              aria-selected={role === r.id}
            >
              <span className="ix">/0{i + 1}</span> {r.label}
            </button>
          ))}
        </div>

        <form className="apply-form" onSubmit={submit}>
          <aside className="apply-form-side">
            <ul className="step-list">
              {steps.map((s, i) => (
                <li key={s} className={i === step ? 'is-active' : ''}>
                  <span>/{(i + 1).toString().padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="receive">
              <h5>What you receive</h5>
              <ul>
                {receiveList.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </aside>

          <div>
            <div className="t-meta" style={{ color: 'var(--fg-3)', marginBottom: 24 }}>
              ( {steps[step]} ) — Section /{(step + 1).toString().padStart(2, '0')} of /{steps.length.toString().padStart(2, '0')}
            </div>

            <FieldGroup />

            <label className="consent">
              <input type="checkbox" defaultChecked />
              <span>
                I have read and accept the <a className="link-line" style={{ fontSize: 12, letterSpacing: '0.08em' }}>Privacy Policy</a> and the <a className="link-line" style={{ fontSize: 12, letterSpacing: '0.08em' }}>Photo & Video Consent</a>.
              </span>
            </label>
            <label className="consent">
              <input type="checkbox" />
              <span>I am open to being contacted by partner agencies introduced by Global Fashion Code.</span>
            </label>

            <div className="apply-submit-row">
              <div className="t-meta" style={{ color: 'var(--fg-3)' }}>
                Step /{(step + 1).toString().padStart(2, '0')} of /{steps.length.toString().padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {step > 0 && (
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(s => Math.max(0, s - 1))}>← Back</button>
                )}
                {step < steps.length - 1 ? (
                  <button type="button" className="btn btn-arrow" onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Continue</button>
                ) : (
                  <button type="submit" className="btn btn-arrow">Submit application</button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

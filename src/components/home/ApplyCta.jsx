'use client';

import { useState } from 'react';
import Arrow from '@/components/Arrow';

const roleLabels = ["Model", "Agency", "Designer", "Photographer", "Makeup Artist", "Stylist", "Sponsor / Partner", "Media"];

const inputStyle = {
  width: '100%',
  display: 'block',
  background: 'transparent',
  color: 'var(--paper)',
  border: 'none',
  outline: 'none',
  padding: '8px 0 12px',
  fontSize: 15,
  letterSpacing: '0.02em',
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
};

const errStyle = {
  marginTop: 4,
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-body)',
  color: '#FF3737',
};

const labelBase = {
  position: 'absolute',
  left: 0,
  pointerEvents: 'none',
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
  transition: 'top 0.18s ease, font-size 0.18s ease, letter-spacing 0.18s ease, opacity 0.18s ease',
};
const labelRest  = { top: 'calc(20px + 10px)', fontSize: 15, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' };
const labelFloat = { top: 2,                   fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)'  };

function DarkField({ label, type = 'text', value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const borderColor = error ? '#FF3737' : 'rgba(255,255,255,0.15)';
  return (
    <div style={{ position: 'relative', paddingTop: 20, marginBottom: 4 }}>
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderBottom: `1px solid ${borderColor}` }}
      />
      <label style={{ ...labelBase, ...(floated ? labelFloat : labelRest) }}>{label}</label>
      {error && <div style={errStyle}>{error === 'format' ? 'Invalid email address' : 'Required field'}</div>}
    </div>
  );
}

function DarkTextarea({ label, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const borderColor = error ? '#FF3737' : 'rgba(255,255,255,0.15)';
  return (
    <div style={{ position: 'relative', paddingTop: 20, marginBottom: 4 }}>
      <textarea
        placeholder=" "
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, resize: 'none', borderBottom: `1px solid ${borderColor}` }}
      />
      <label style={{ ...labelBase, ...(floated ? labelFloat : labelRest) }}>{label}</label>
      {error && <div style={errStyle}>Required field</div>}
    </div>
  );
}

export default function ApplyCta() {
  const [selectedRoles, setSelectedRoles] = useState(["Model"]);
  const [form, setForm]       = useState({ name: '', email: '', country: '', instagram: '', about: '' });
  const [errors, setErrors]   = useState({}); // value: true | 'format'
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const toggleRole = (role) => setSelectedRoles([role]);

  const set = (key) => (e) => {
    setForm(p => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors(p => ({ ...p, [key]: false }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name      = true;
    if (!form.email.trim()) e.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'format';
    if (!form.country.trim())   e.country   = true;
    if (!form.instagram.trim()) e.instagram = true;
    if (!form.about.trim())     e.about     = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError('');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRoles[0] || '', ...form }),
      });
      const data = await res.json();
      if (data.success) { setSubmitted(true); }
      else { setSendError('Something went wrong — please try again.'); }
    } catch {
      setSendError('Network error — please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="apply-cta" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ padding: 'clamp(64px,8vw,96px) clamp(24px,4vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(48px,6vw,96px)', alignItems: submitted ? 'stretch' : 'flex-end', justifyContent: 'space-between' }}>

          {/* Left — heading + description + image */}
          <div style={{ flexShrink: 0, width: 'clamp(240px,28vw,320px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span className="t-meta" style={{ color: 'var(--on-ink-3)' }}>( 06 )</span>
              <span className="t-meta" style={{ color: 'var(--on-ink-3)' }}>Application</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 'var(--display-tracking)',
              lineHeight: 0.88,
              fontSize: 'clamp(40px, 5vw, 60px)',
              margin: '0 0 32px',
              color: 'var(--paper)',
            }}>
              Join<br />the Cast
            </h2>
            <p style={{ color: 'var(--on-ink-3)', fontSize: 15, lineHeight: 1.65, marginBottom: 40, maxWidth: 300 }}>
              Submit your portfolio for consideration at the upcoming Global Fashion Code event.
              We review applications from all creative disciplines to shape the future of high fashion industries.
            </p>
            <img
              src="/images/apply/apply.jpg"
              alt="Application"
              loading="lazy"
              style={{ width: 'clamp(120px,15vw,200px)', aspectRatio: '225/337', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right — role selector + form / success image */}
          <div style={{ flex: '0 0 auto', width: submitted ? 653 : 'clamp(320px, 48%, 620px)' }}>

            {submitted ? (
              /* ── Success: full-bleed image with text overlay ── */
              <div style={{ position: 'relative', width: 653, height: 756, overflow: 'hidden' }}>
                <img
                  src="/images/apply/success.jpg"
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* subtle dark veil for legibility */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)' }} />
                {/* centred text */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                  <h2 style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: 'clamp(56px, 8vw, 133px)', /* 100pt ≈ 133px */
                    lineHeight: 0.8,
                    letterSpacing: '-0.06em',
                    color: 'var(--paper)',
                    margin: '0 0 28px',
                  }}>
                    Thank<br />you!
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 1,
                    letterSpacing: 0,
                    color: 'var(--paper)',
                    margin: 0,
                    textTransform: 'uppercase',
                  }}>
                    ( Your application was successfully submitted )
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Role toggles */}
                <div style={{ marginBottom: 40 }}>
                  <p className="t-meta" style={{ color: 'var(--on-ink-3)', marginBottom: 16 }}>( I am a )</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {roleLabels.map(role => {
                      const active = selectedRoles.includes(role);
                      return (
                        <button
                          key={role}
                          onClick={() => toggleRole(role)}
                          style={{
                            padding: '8px 20px',
                            fontSize: 10,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            border: '1px solid',
                            borderColor: active ? 'var(--paper)' : 'rgba(255,255,255,0.25)',
                            borderRadius: 999,
                            background: active ? 'var(--paper)' : 'transparent',
                            color: active ? 'var(--ink)' : 'var(--paper)',
                            cursor: 'pointer',
                            transition: 'all 0.25s',
                          }}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                  <DarkField    label="( Full Name )"                 type="text"  value={form.name}      onChange={set('name')}      error={errors.name}      />
                  <DarkField    label="( Email Address )"             type="email" value={form.email}     onChange={set('email')}     error={errors.email}     />
                  <DarkField    label="( Country )"                   type="text"  value={form.country}   onChange={set('country')}   error={errors.country}   />
                  <DarkField    label="( Instagram / Portfolio Link )" type="text" value={form.instagram} onChange={set('instagram')} error={errors.instagram} />
                  <DarkTextarea label="( Tell us about yourself )"                 value={form.about}     onChange={set('about')}     error={errors.about}     />

                  {sendError && (
                    <div style={{ marginTop: 12, fontSize: 11, color: '#FF3737', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      {sendError}
                    </div>
                  )}

                  <div style={{ marginTop: 32 }}>
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '18px 32px',
                        background: sending ? 'rgba(255,255,255,0.6)' : 'var(--paper)', color: 'var(--ink)',
                        border: 'none', cursor: sending ? 'wait' : 'pointer',
                        fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'var(--font-body)', fontWeight: 600,
                        transition: 'background 0.18s',
                      }}
                      onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#e8e8e8'; }}
                      onMouseLeave={e => { if (!sending) e.currentTarget.style.background = 'var(--paper)'; }}
                    >
                      {sending ? 'Sending...' : 'Submit Application'}
                      {!sending && <Arrow size={60} />}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

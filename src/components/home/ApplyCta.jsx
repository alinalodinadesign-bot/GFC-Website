'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Arrow from '@/components/Arrow';

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

function DarkField({ label, type = 'text', value, onChange, error, errRequired, errFormat }) {
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
      {error && <div style={errStyle}>{error === 'format' ? errFormat : errRequired}</div>}
    </div>
  );
}

function DarkTextarea({ label, value, onChange, error, errRequired }) {
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
      {error && <div style={errStyle}>{errRequired}</div>}
    </div>
  );
}

export default function ApplyCta({ project = null }) {
  const t = useTranslations('apply');
  const roleLabels = t.raw('roles');

  const [selectedRoles, setSelectedRoles] = useState([roleLabels[0]]);
  const [form, setForm]       = useState({ name: '', email: '', country: '', instagram: '', about: '' });
  const [errors, setErrors]   = useState({});
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
        body: JSON.stringify({ role: selectedRoles[0] || '', ...form, project: project || 'Quick Apply (Homepage)' }),
      });
      const data = await res.json();
      if (data.success) { setSubmitted(true); }
      else { setSendError(t('sendError')); }
    } catch {
      setSendError(t('networkError'));
    } finally {
      setSending(false);
    }
  };

  const errRequired = t('errors.required');
  const errFormat = t('errors.emailFormat');

  return (
    <section id="apply-cta" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ padding: 'clamp(64px,8vw,96px) clamp(24px,4vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <div className="apply-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(48px,6vw,96px)', alignItems: submitted ? 'stretch' : 'flex-end', justifyContent: 'space-between' }}>

          {/* Left — heading + description + image */}
          <div className="apply-cta-left" style={{ flexShrink: 0, width: 'clamp(240px,28vw,320px)' }}>
            <div className="apply-cta-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span className="t-meta" style={{ color: 'var(--on-ink-3)' }}>{t('index')}</span>
              <span className="t-meta" style={{ color: 'var(--on-ink-3)' }}>{t('label')}</span>
            </div>
            <h2 className="apply-cta-heading" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 'var(--display-tracking)',
              lineHeight: 0.88,
              fontSize: 'clamp(40px, 5vw, 60px)',
              margin: '0 0 32px',
              color: 'var(--paper)',
            }}>
              {t('title')}<br />{t('titleLine2')}
            </h2>
            <p className="apply-cta-desc" style={{ color: 'var(--on-ink-3)', fontSize: 15, lineHeight: 1.65, marginBottom: 40, maxWidth: 300 }}>
              {t('description')}
            </p>
            <img
              className="apply-cta-img"
              src="/images/apply/apply.jpg"
              alt="Application"
              loading="lazy"
              style={{ width: 'clamp(120px,15vw,200px)', aspectRatio: '225/337', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right — role selector + form / success image */}
          <div className="apply-cta-right" style={{ flex: '0 0 auto', width: submitted ? 653 : 'clamp(320px, 48%, 620px)' }}>

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
                    fontSize: 'clamp(56px, 8vw, 133px)',
                    lineHeight: 0.8,
                    letterSpacing: '-0.06em',
                    color: 'var(--paper)',
                    margin: '0 0 28px',
                    whiteSpace: 'pre-line',
                  }}>
                    {t('successTitle')}
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
                    {t('successSub')}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Role toggles */}
                <div className="apply-roles-wrap" style={{ marginBottom: 40 }}>
                  <p className="apply-roles-label t-meta" style={{ color: 'var(--on-ink-3)', marginBottom: 16 }}>{t('iAm')}</p>
                  <div className="apply-roles-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
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
                  <DarkField    label={t('fields.name')}      type="text"  value={form.name}      onChange={set('name')}      error={errors.name}      errRequired={errRequired} errFormat={errFormat} />
                  <DarkField    label={t('fields.email')}     type="email" value={form.email}     onChange={set('email')}     error={errors.email}     errRequired={errRequired} errFormat={errFormat} />
                  <DarkField    label={t('fields.country')}   type="text"  value={form.country}   onChange={set('country')}   error={errors.country}   errRequired={errRequired} errFormat={errFormat} />
                  <DarkField    label={t('fields.instagram')} type="text"  value={form.instagram} onChange={set('instagram')} error={errors.instagram} errRequired={errRequired} errFormat={errFormat} />
                  <DarkTextarea label={t('fields.about')}                  value={form.about}     onChange={set('about')}     error={errors.about}     errRequired={errRequired} />

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
                      {sending ? t('sending') : t('submit')}
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

'use client';

import { useState } from 'react';
import Arrow from '@/components/Arrow';

const roleLabels = ["Model", "Agency", "Designer", "Photographer", "Makeup Artist", "Stylist", "Sponsor / Partner", "Media"];

const inputStyle = {
  width: '100%',
  background: 'transparent',
  color: 'var(--paper)',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  outline: 'none',
  padding: '20px 0',
  fontSize: 13,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-body)',
  fontWeight: 400,
};

export default function ApplyCta() {
  const [selectedRoles, setSelectedRoles] = useState(["Model"]);
  const [form, setForm] = useState({ name: '', email: '', country: '', instagram: '', about: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const toggleRole = (role) => setSelectedRoles([role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role:      selectedRoles[0] || '',
          name:      form.name,
          email:     form.email,
          country:   form.country,
          instagram: form.instagram,
          about:     form.about,
        }),
      });
      const data = await res.json();
      if (data.success) { setSubmitted(true); }
      else { setError('Something went wrong — please try again.'); }
    } catch (err) {
      setError('Network error — please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="apply-cta" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ padding: 'clamp(64px,8vw,96px) clamp(24px,4vw,64px)', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(48px,6vw,96px)', alignItems: 'flex-end', justifyContent: 'space-between' }}>

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

          {/* Right — role selector + form */}
          <div style={{ flex: '0 0 auto', width: 'clamp(320px, 48%, 620px)' }}>

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
            {submitted ? (
              <div style={{ padding: '48px 0', color: 'var(--on-ink-2)', fontSize: 15, letterSpacing: '0.04em' }}>
                ✓ Application received — we&apos;ll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { key: 'name', label: '( Full Name )', type: 'text' },
                  { key: 'email', label: '( Email Address )', type: 'email' },
                  { key: 'country', label: '( Country )', type: 'text' },
                  { key: 'instagram', label: '( Instagram / Portfolio Link )', type: 'text' },
                ].map(f => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.label}
                    value={form[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={inputStyle}
                  />
                ))}
                <textarea
                  placeholder="( Tell us about yourself )"
                  rows={4}
                  value={form.about}
                  onChange={e => setForm(prev => ({ ...prev, about: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none', display: 'block' }}
                />
                {error && (
                  <div style={{ marginTop: 16, fontSize: 12, color: '#ff6b6b', letterSpacing: '0.08em' }}>
                    {error}
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

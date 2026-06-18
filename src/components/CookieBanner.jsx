'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'gfc_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const save = (consent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, ts: Date.now() }));
    setVisible(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectNonEssential = () => save({ necessary: true, analytics: false, marketing: false });
  const saveSettings = () => save({ necessary: true, ...prefs });

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.12)',
      padding: 'clamp(16px,3vw,28px) clamp(16px,4vw,48px)',
    }}>
      {!showSettings ? (
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '16px 48px', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 620, margin: 0 }}>
            We use cookies to make our website work properly, improve your experience and support our communication activities.
            Strictly necessary cookies are always active.{' '}
            <Link href="/legal#cookies" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>
              Cookie Policy
            </Link>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexShrink: 0 }}>
            <Btn onClick={() => setShowSettings(true)} ghost>Manage Settings</Btn>
            <Btn onClick={rejectNonEssential} ghost>Reject Non-Essential</Btn>
            <Btn onClick={acceptAll}>Accept All</Btn>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Cookie Settings</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <PrefRow
              label="Strictly Necessary"
              desc="Required for the website to function. Cannot be switched off."
              checked={true}
              disabled
            />
            <PrefRow
              label="Analytics Cookies"
              desc="Help us understand how visitors use the website."
              checked={prefs.analytics}
              onChange={v => setPrefs(p => ({ ...p, analytics: v }))}
            />
            <PrefRow
              label="Marketing & Social Media"
              desc="Used to measure campaigns and support promotional activities."
              checked={prefs.marketing}
              onChange={v => setPrefs(p => ({ ...p, marketing: v }))}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Btn onClick={() => setShowSettings(false)} ghost>Back</Btn>
            <Btn onClick={saveSettings}>Save Settings</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function Btn({ children, onClick, ghost }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 20px',
        fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
        fontFamily: 'var(--font-body)', fontWeight: 600,
        border: '1px solid',
        borderColor: ghost ? 'rgba(255,255,255,0.25)' : 'var(--paper)',
        background: ghost ? 'transparent' : 'var(--paper)',
        color: ghost ? 'var(--paper)' : 'var(--ink)',
        cursor: 'pointer', borderRadius: 0,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

function PrefRow({ label, desc, checked, disabled, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minWidth: 260, flex: '1 1 260px' }}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange && onChange(!checked)}
        style={{
          flexShrink: 0, marginTop: 2,
          width: 36, height: 20, borderRadius: 10,
          background: checked ? 'var(--paper)' : 'rgba(255,255,255,0.15)',
          border: 'none', cursor: disabled ? 'default' : 'pointer',
          position: 'relative', transition: 'background 0.2s',
          opacity: disabled ? 0.4 : 1,
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: checked ? 18 : 3,
          width: 14, height: 14, borderRadius: '50%',
          background: checked ? 'var(--ink)' : 'rgba(255,255,255,0.5)',
          transition: 'left 0.2s',
        }} />
      </button>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

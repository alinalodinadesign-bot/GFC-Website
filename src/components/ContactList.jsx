'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const EMAIL = 'info@globalfashioncode.com';
const IG_URL = 'https://instagram.com/globalfashioncode';

export default function ContactList() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ul className="contact-list">
      <li>
        <div className="label">{t('instagram.label')}</div>
        <div className="contact-list-row">
          <a className="val" href={IG_URL} target="_blank" rel="noopener noreferrer">
            {t('instagram.value')}
          </a>
          <a className="link-line ix" href={IG_URL} target="_blank" rel="noopener noreferrer">
            {t('instagram.link')}
          </a>
        </div>
      </li>
      <li>
        <div className="label">{t('email.label')}</div>
        <div className="contact-list-row">
          <button type="button" className="val val-btn" onClick={copyEmail}>
            {t('email.value')}
          </button>
          <span className="contact-copy-wrap">
            <button type="button" className="link-line ix" onClick={copyEmail}>
              {t('email.link')}
            </button>
            <span className={`contact-copy-tip${copied ? ' is-visible' : ''}`} role="status">
              {t('email.copied')}
            </span>
          </span>
        </div>
      </li>
    </ul>
  );
}

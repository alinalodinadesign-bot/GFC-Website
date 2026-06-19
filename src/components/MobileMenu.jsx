'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { GFC_DATA } from '@/lib/data';

export default function MobileMenu() {
  const router   = useRouter();
  const pathname = usePathname();
  const locale   = useLocale();
  const t = useTranslations('mobile');
  const tNav = useTranslations('nav');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('gfc:mobile-open', handleOpen);
    return () => window.removeEventListener('gfc:mobile-open', handleOpen);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const go = (path) => () => { setOpen(false); router.push(path); };

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  // Inline style controls visibility — independent of CSS loading
  const menuStyle = {
    display:    open ? 'flex' : 'none',
    position:   'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex:     9999,
    background: 'var(--ink)',
    color:      'var(--paper)',
    flexDirection: 'column',
    padding:    '80px 24px 32px',
    overflowY:  'auto',
  };

  return (
    <div style={menuStyle}>
      <button className="mobile-menu-close" onClick={() => setOpen(false)}>{t('close')}</button>

      <div className="mobile-menu-list">
        <div className="item" onClick={go('/')}>{tNav('about')}</div>
        <div className="item" onClick={go('/')}>{tNav('projects')}</div>
        {GFC_DATA.projects.map((p) => (
          <div key={p.id} className="sub" onClick={go('/projects/' + p.id)}>· {p.name}</div>
        ))}
        <div className="item" onClick={go('/event')}>{tNav('event')}</div>
        <div className="item" onClick={go('/gallery')}>{tNav('gallery')}</div>
        <div className="item" onClick={go('/partners')}>{tNav('partners')}</div>
        <div className="item" onClick={go('/press')}>{tNav('press')}</div>
        <div className="item" onClick={go('/apply')}>{tNav('apply')}</div>
        <div className="item" onClick={go('/contact')}>{tNav('contact')}</div>
      </div>

      <div className="mobile-menu-foot">
        <div className="nav-lang">
          <button className={locale === 'en' ? 'is-active' : ''} onClick={() => switchLocale('en')}>EN</button>
          <span className="sep">/</span>
          <button className={locale === 'ru' ? 'is-active' : ''} onClick={() => switchLocale('ru')}>RU</button>
        </div>
        <div>{t('copyright')}</div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GFC_DATA } from '@/lib/data';

export default function MobileMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('gfc:mobile-open', handleOpen);
    return () => window.removeEventListener('gfc:mobile-open', handleOpen);
  }, []);

  // Close on route change — setState in effect is intentional here
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === '/';

  const go = (path) => () => {
    setOpen(false);
    router.push(path);
  };

  const goAnchor = (sectionId) => () => {
    setOpen(false);
    const scrollTo = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (isHome) {
      setTimeout(scrollTo, 300);
    } else {
      router.push('/');
      setTimeout(scrollTo, 380);
    }
  };

  return (
    <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
      <button className="mobile-menu-close" onClick={() => setOpen(false)}>Close ✕</button>
      <div className="mobile-menu-list">
        <div className="item" onClick={go('/')}>Home</div>
        <div className="item" onClick={go('/')}>Projects</div>
        {GFC_DATA.projects.map((p) => (
          <div key={p.id} className="sub" onClick={go('/projects/' + p.id)}>· {p.name}</div>
        ))}
        <div className="item" onClick={goAnchor('about')}>About</div>
        <div className="item" onClick={goAnchor('event')}>Upcoming Event</div>
        <div className="item" onClick={goAnchor('gallery')}>Gallery</div>
        <div className="item" onClick={goAnchor('partners')}>Partners</div>
        <div className="item" onClick={go('/apply')}>Apply</div>
        <div className="item" onClick={go('/contact')}>Contact</div>
      </div>
      <div className="mobile-menu-foot">
        <div className="nav-lang">
          <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
          <span className="sep">/</span>
          <button className={lang === 'ru' ? 'is-active' : ''} onClick={() => setLang('ru')}>RU</button>
        </div>
        <div>© GFC 2026</div>
      </div>
    </div>
  );
}

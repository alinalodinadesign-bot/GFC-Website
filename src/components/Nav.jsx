'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import Logo from './Logo';
import { GFC_DATA } from '@/lib/data';

export default function Nav({ mode = 'auto' }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [atTop, setAtTop] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const projectsRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (projectsRef.current && !projectsRef.current.contains(e.target)) {
        setShowProjects(false);
      }
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const isHome = pathname === '/';
  const isProject = pathname.startsWith('/projects');
  const isContact = pathname === '/contact';
  const isEvent = pathname === '/event';

  const navClass = [
    'nav',
    mode === 'ink' ? 'is-solid-ink' : '',
    mode === 'paper' ? 'is-solid' : '',
    mode === 'auto' && isEvent ? 'is-solid-ink' : '',
    mode === 'auto' && !isEvent && atTop && isHome ? 'is-over-dark' : '',
    mode === 'auto' && !isEvent && (!atTop || !isHome) ? 'is-solid' : '',
  ].join(' ');

  const isOver = mode === 'ink' || isEvent || (mode === 'auto' && atTop && isHome);

  const goAnchor = (sectionId) => (e) => {
    e.preventDefault();
    setShowProjects(false);
    const scrollTo = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (isHome) {
      scrollTo();
    } else {
      router.push('/');
      setTimeout(scrollTo, 80);
    }
  };

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className={navClass} ref={headerRef}>
      <div className="nav-left">
        <Link href="/" aria-label="Global Fashion Code — Home" style={{ display: 'block', lineHeight: 0 }} onClick={() => { if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo />
        </Link>
      </div>

      <nav className="nav-links" aria-label="Primary">
        <Link href="/" className={`nav-link${isHome ? ' is-active' : ''}`}>{t('about')}</Link>
        <div ref={projectsRef} style={{ position: 'relative' }}>
          <button
            className={`nav-link ${isProject ? 'is-active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setShowProjects((v) => !v); }}
          >
            {t('projects')} <span style={{ opacity: 0.6, marginLeft: 4, fontSize: 9 }}>▾</span>
          </button>
          <div className={`projects-dropdown ${showProjects ? 'is-open' : ''}`} style={{ display: showProjects ? 'block' : 'none' }}>
            <div className="projects-dropdown-label">{t('projectsDropdownLabel')}</div>
            <ul>
              {GFC_DATA.projects.map((p) => (
                <li key={p.id} onClick={() => { router.push('/projects/' + p.id); setShowProjects(false); }}>
                  <span className="pname">{p.name}</span>
                  <span className="pmeta">/{p.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link href="/event" className={`nav-link${isEvent ? ' is-active' : ''}`}>{t('event')}</Link>
        <Link href="/gallery" className={`nav-link${pathname === '/gallery' ? ' is-active' : ''}`}>{t('gallery')}</Link>
        <a href="#partners" onClick={goAnchor('partners')} className="nav-link">{t('partners')}</a>
        <a href="#apply-cta" onClick={goAnchor('apply-cta')} className="nav-link">{t('apply')}</a>
        <Link href="/contact" className={`nav-link ${isContact ? 'is-active' : ''}`}>{t('contact')}</Link>
      </nav>

      <div className="nav-right">
        <div className="nav-lang" aria-label="Language">
          <button className={locale === 'en' ? 'is-active' : ''} onClick={() => switchLocale('en')}>EN</button>
          <span className="sep">/</span>
          <button className={locale === 'ru' ? 'is-active' : ''} onClick={() => switchLocale('ru')}>RU</button>
        </div>
        <a href="#apply-cta" onClick={goAnchor('apply-cta')} className="nav-link" style={{ borderBottom: '1px solid currentColor', paddingBottom: 4 }}>
          {t('applyNow')}
        </a>
        <NavMobileToggle isLight={isOver} />
      </div>
    </header>
  );
}

/* Mobile toggle button — exported separately so MobileMenu can wire it */
function NavMobileToggle({ isLight }) {
  // This fires a custom event so MobileMenu can listen
  const open = () => window.dispatchEvent(new CustomEvent('gfc:mobile-open'));
  return (
    <button
      className={`nav-mobile-toggle ${isLight ? 'is-light' : ''}`}
      aria-label="Menu"
      onClick={open}
    >
      <span></span>
    </button>
  );
}

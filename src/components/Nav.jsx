'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';
import { GFC_DATA } from '@/lib/data';

export default function Nav({ mode = 'auto' }) {
  const router = useRouter();
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [lang, setLang] = useState('en');
  const projectsRef = useRef(null);

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
  const isApply = pathname === '/apply';
  const isContact = pathname === '/contact';

  const navClass = [
    'nav',
    mode === 'ink' ? 'is-solid-ink' : '',
    mode === 'paper' ? 'is-solid' : '',
    mode === 'auto' && atTop && isHome ? 'is-over-dark' : '',
    mode === 'auto' && (!atTop || !isHome) ? 'is-solid' : '',
  ].join(' ');

  const isOver = mode === 'ink' || (mode === 'auto' && atTop && isHome);

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

  return (
    <header className={navClass}>
      <div className="nav-left">
        <button onClick={() => router.push('/')} aria-label="Global Fashion Code — Home" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          <Logo />
        </button>
      </div>

      <nav className="nav-links" aria-label="Primary">
        <div ref={projectsRef} style={{ position: 'relative' }}>
          <button
            className={`nav-link ${isProject ? 'is-active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setShowProjects((v) => !v); }}
          >
            Projects <span style={{ opacity: 0.6, marginLeft: 4, fontSize: 9 }}>▾</span>
          </button>
          <div className={`projects-dropdown ${showProjects ? 'is-open' : ''}`}>
            <div className="projects-dropdown-label">(Five universes)</div>
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
        <a href="#about" onClick={goAnchor('about')} className="nav-link">About</a>
        <a href="#event" onClick={goAnchor('event')} className="nav-link">Upcoming Event</a>
        <a href="#gallery" onClick={goAnchor('gallery')} className="nav-link">Gallery</a>
        <a href="#partners" onClick={goAnchor('partners')} className="nav-link">Partners</a>
        <a href="/apply" onClick={(e) => { e.preventDefault(); router.push('/apply'); }} className={`nav-link ${isApply ? 'is-active' : ''}`}>Apply</a>
        <a href="/contact" onClick={(e) => { e.preventDefault(); router.push('/contact'); }} className={`nav-link ${isContact ? 'is-active' : ''}`}>Contact</a>
      </nav>

      <div className="nav-right">
        <div className="nav-lang" aria-label="Language">
          <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
          <span className="sep">/</span>
          <button className={lang === 'ru' ? 'is-active' : ''} onClick={() => setLang('ru')}>RU</button>
        </div>
        <a href="/apply" onClick={(e) => { e.preventDefault(); router.push('/apply'); }} className="nav-link" style={{ borderBottom: '1px solid currentColor', paddingBottom: 4 }}>
          Apply now
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

import { useState, useEffect } from 'react';

const navItems = [
  { label: '홈', href: '#hero' },
  { label: '경기결과', href: '#results' },
  { label: '일정', href: '#schedule' },
  { label: '선수단', href: '#roster' },
  { label: '운영진', href: '#staff' },
  { label: '수비가이드', href: '#guide' },
  { label: '연혁', href: '#history' },
  { label: '장비', href: '#equipment' },
  { label: '회계', href: '#finance' },
  { label: '스폰서', href: '#sponsors' },
  { label: '회원사', href: '#members' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-icon">⚾</span>
          <span className="logo-text">
            <span className="logo-main"><span className="red">KFA</span> BASEBALL</span>
            <span className="logo-sub">FRANCHISE BASEBALL CLUB</span>
          </span>
        </a>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <a
              key={item.href}
              className="nav-link"
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

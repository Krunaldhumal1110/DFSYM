import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../i18n';
import type { Lang } from '../i18n/lang';
import logo from '/assets/DFSYM_Logo-removebg-preview.webp';

const HEADER_OFFSET = 'top-[64px] sm:top-[72px]';
const DRAWER_HEIGHT = 'h-[calc(100dvh-64px)] sm:h-[calc(100dvh-72px)]';

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'mr', label: 'मराठी' },
  { value: 'gu', label: 'ગુજરાતી' },
];

// Optimized CSS animation - GPU accelerated
const menuStyles = `
  @keyframes slideInMenu {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutMenu {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .menu-panel-active {
    animation: slideInMenu 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    will-change: transform;
  }

  .menu-panel-exit {
    animation: slideOutMenu 1s cubic-bezier(0.22, 1, 0.32, 1) forwards;
    will-change: transform;
  }

  .menu-backdrop-active {
    animation: fadeIn 0.18s ease-out forwards;
    will-change: opacity;
  }

  .menu-backdrop-exit {
    animation: fadeOut 0.16s ease-in forwards;
    will-change: opacity;
  }

  .menu-item {
    transition: all 0.15s ease-out;
  }

  .menu-item:hover {
    transform: translateX(4px);
  }
`;

const Header: React.FC = () => {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

const navItems = [
  { to: '/', label: t('home'), icon: '⌂' },
  { to: '/history', label: t('history'), icon: '◷' },
  { to: '/celebrations', label: t('celebrations'), icon: '✦' },
  { to: '/awards', label: t('awards'), icon: '🏅' },
  { to: '/news & Updates', label: t('newsAndUpdates'), icon: '📰' },
  { to: '/supporters', label: t('supporters'), icon: '🙏' },
  { to: '/guests', label: t('guests'), icon: '★' },
  { to: '/sponsors', label: t('sponsors'), icon: '🤝' },
  { to: '/gallery', label: t('gallery'), icon: '▣' },
  { to: '/activities', label: t('activities'), icon: '◈' },
  { to: '/about', label: t('about'), icon: 'ⓘ' },
  { to: '/contact', label: t('contact'), icon: '✉' },
];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((current) => {
      const next = !current;
      window.localStorage.setItem('dfsym-theme', next ? 'dark' : 'light');
      document.dispatchEvent(new CustomEvent('dfsym-theme-change', { detail: { theme: next ? 'dark' : 'light' } }));
      return next;
    });
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dfsym-theme');
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setDarkMode(savedTheme ? savedTheme === 'dark' : false);  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setMenuVisible(true);
      const openTimer = window.setTimeout(() => setMenuVisible(true), 20);
      return () => window.clearTimeout(openTimer);
    }

    const closeTimer = window.setTimeout(() => setMenuVisible(false), 180);
    return () => window.clearTimeout(closeTimer);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuVisible &&
        menuPanelRef.current &&
        !menuPanelRef.current.contains(event.target as Node) &&
        !menuToggleRef.current?.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible, closeMenu]);

  return (
    <>
      <style>{menuStyles}</style>
      <header className="glass-header fixed left-0 w-full top-0 z-[100] supports-[padding:max(0px)]:pt-[max(0px,env(safe-area-inset-top))]">
        <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-3 min-h-[64px] sm:min-h-[72px] px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-md group-hover:bg-gold-400/50 transition" />
              <img
                src={logo}
                alt="DFSYM"
                className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full object-contain ring-2 ring-gold-400/60"
                width={48}
                height={48}
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-gold-200 text-sm leading-none">DFSYM</span>
              <span className="block text-[10px] text-gold-400/80 tracking-widest uppercase">Vadodara</span>
            </div>
          </Link>

          <p className="flex-1 text-center font-display font-bold text-gold-100 px-2">
            <span className="block sm:hidden text-[10px] leading-tight">
              DAKSHINI FALIYA SARVAJANIK
              <br />
              YUVAK MANDAL
            </span>

            <span className="hidden sm:block text-sm md:text-lg lg:text-xl">
              DAKSHINI FALIYA SARVAJANIK YUVAK MANDAL
            </span>
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-maroon-900/80 px-3 py-2 text-xs font-semibold text-gold-100 transition-all duration-200 hover:bg-maroon-800/90 focus:outline-none focus:ring-2 focus:ring-gold-300/70"
            >
              <span>{darkMode ? '☀️' : '🌙'}</span>
              <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            <button
              ref={menuToggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gold-400/40 bg-maroon-900/80 text-gold-100 transition-all duration-200 active:scale-95"
            >
              <span
                className={`absolute h-[2px] w-6 bg-gold-100 rounded-full transition-all duration-200 ${menuOpen ? 'rotate-45' : '-translate-y-2'}`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-gold-100 rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-gold-100 rounded-full transition-all duration-200 ${menuOpen ? '-rotate-45' : 'translate-y-2'}`}
              />
            </button>
          </div>
        </div>

        {menuVisible && (
          <>
            <div
              className={`fixed inset-0 z-[90] cursor-pointer bg-sacred-dark/50 ${menuOpen ? 'menu-backdrop-active' : 'menu-backdrop-exit'}`}
              onClick={closeMenu}
              aria-hidden
            />
            <aside
              ref={menuPanelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label={t('menu')}
              className={`fixed right-0 ${HEADER_OFFSET} ${DRAWER_HEIGHT} z-[95] w-[min(100vw,20rem)] sm:w-80 flex flex-col overflow-hidden rounded-tl-2xl border-l border-t border-gold-500/25 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-950 text-white shadow-[-8px_0_40px_rgba(0,0,0,0.45)] mandala-pattern supports-[padding:max(0px)]:pb-[max(0px,env(safe-area-inset-bottom))] ${menuOpen ? 'menu-panel-active' : 'menu-panel-exit'}`}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gold-500/20 bg-maroon-900/60 shrink-0">
                <img
                  src={logo}
                  alt=""
                  aria-hidden
                  className="h-9 w-9 rounded-full object-contain ring-1 ring-gold-400/50"
                  width={36}
                  height={36}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold text-gradient-gold truncate">{t('menu')}</p>
                  <p className="text-[11px] text-gold-300/70 tracking-wider uppercase truncate">DFSYM · Vadodara</p>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                <ul className="space-y-0.5">
                  {navItems.map((item) => (
                    <li key={item.to} className="menu-item">
                      <NavLink
                        to={item.to}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-xl px-3.5 py-3.5 transition-all duration-150 ${isActive
                            ? 'bg-gold-500/15 text-gold-50 font-semibold'
                            : 'text-gold-100/85 hover:bg-white/5 hover:text-gold-50 active:bg-white/10'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full transition-all duration-150 ${isActive ? 'bg-gold-400 opacity-100' : 'bg-gold-400/0 opacity-0 group-hover:bg-gold-400/40 group-hover:opacity-100'
                                }`}
                              aria-hidden
                            />
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base transition-colors duration-150 ${isActive ? 'bg-gold-500/25 text-gold-200' : 'bg-maroon-950/40 text-gold-400 group-hover:text-gold-300'
                                }`}
                              aria-hidden
                            >
                              {item.icon}
                            </span>
                            <span className="flex-1 text-[15px] leading-tight">{item.label}</span>
                            <span
                              className={`text-xs transition-all duration-150 ${isActive ? 'text-gold-300 opacity-100' : 'text-gold-500/0 opacity-0 group-hover:text-gold-500/60 group-hover:opacity-100'
                                }`}
                              aria-hidden
                            >
                              →
                            </span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 border-t border-gold-500/25 bg-maroon-950/80 px-3 py-2.5">
                {/* <p
                  id="language-select-label"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-maroon-800/90"
                >
                  {t('language')}
                </p> */}
                <p
                  id="language-select-label"
                  className="
                            mb-2
                            text-base
                            sm:text-sm
                            font-medium
                            text-maroon-900
                            dark:text-white
                          "
                >
                  {t("language")}
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby="language-select-label"
                  className="grid grid-cols-2 gap-1.5"
                >
                  {LANG_OPTIONS.map((option) => {
                    const isActive = lang === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => setLang(option.value)}
                        className={`lang-option rounded-lg border px-2 py-1.5 text-xs font-medium leading-tight transition-all duration-150 touch-manipulation ${isActive
                          ? 'border-gold-400 bg-gradient-to-br from-gold-400 to-gold-500 text-maroon-950 shadow-sm'
                          : 'border-gold-500/30 bg-maroon-900/70 text-gold-200/90 hover:border-gold-400/50 hover:bg-maroon-800/80 hover:text-gold-50 active:scale-[0.97]'
                          }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </>
        )}
      </header>
    </>
  );
};

export default Header;

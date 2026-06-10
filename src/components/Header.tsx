import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../i18n';
import type { Lang } from '../i18n/lang';
// import logo from '../assets/DFSYM_Logo-removebg-preview.png';
import logo from '/public/assets/DFSYM_Logo-removebg-preview.png';

const HEADER_OFFSET = 'top-[64px] sm:top-[72px]';
const DRAWER_HEIGHT = 'h-[calc(100dvh-64px)] sm:h-[calc(100dvh-72px)]';

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'mr', label: 'मराठी' },
  { value: 'gu', label: 'ગુજરાતી' },
];

const Header: React.FC = () => {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { to: '/', label: t('home'), icon: '⌂' },
    { to: '/history', label: t('history'), icon: '◷' },
    { to: '/celebrations', label: t('celebrations'), icon: '✦' },
    { to: '/awards', label: t('awards'), icon: '🏅' },
    { to: '/guests', label: t('guests'), icon: '★' },
    { to: '/gallery', label: t('gallery'), icon: '▣' },
    { to: '/activities', label: t('activities'), icon: '◈' },
    { to: '/about', label: t('about'), icon: 'ⓘ' },
    { to: '/contact', label: t('contact'), icon: '✉' },
  ];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
        menuOpen &&
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
  }, [menuOpen, closeMenu]);

  return (
    <header className="glass-header sticky top-0 z-[100] supports-[padding:max(0px)]:pt-[max(0px,env(safe-area-inset-top))]">
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

        <p className="flex-1 text-center font-display text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gold-100 leading-snug px-1 sm:px-2 line-clamp-2">
          <span className="xs:hidden">DFSYM</span>
          <span className="hidden xs:inline">
            {/* दक्षिणी फळिया सार्वजनिक युवक मंडळ */}
            DAKSINI FALIYA SARVAJANIK YUVAK MANDAL
          </span>
        </p>

        <button
          ref={menuToggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gold-400/40 bg-maroon-900/80 text-gold-100 transition-all duration-300"
        >
          <span
            className={`absolute h-[2px] w-6 bg-gold-100 rounded-full transition-all duration-300 ${menuOpen
              ? "rotate-45"
              : "-translate-y-2"
              }`}
          />

          <span
            className={`absolute h-[2px] w-6 bg-gold-100 rounded-full transition-all duration-300 ${menuOpen
              ? "opacity-0"
              : "opacity-100"
              }`}
          />

          <span
            className={`absolute h-[2px] w-6 bg-gold-100 rounded-full transition-all duration-300 ${menuOpen
              ? "-rotate-45"
              : "translate-y-2"
              }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="menu-backdrop fixed inset-0 z-[90] cursor-pointer bg-sacred-dark/65 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden
            />
            <motion.aside
              ref={menuPanelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label={t('menu')}
              className={`menu-panel fixed right-0 ${HEADER_OFFSET} ${DRAWER_HEIGHT} z-[95] w-[min(100vw,20rem)] sm:w-80 flex flex-col overflow-hidden rounded-tl-2xl border-l border-t border-gold-500/25 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-950 text-white shadow-[-8px_0_40px_rgba(0,0,0,0.45)] mandala-pattern supports-[padding:max(0px)]:pb-[max(0px,env(safe-area-inset-bottom))]`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
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
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.035, duration: 0.25 }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-xl px-3.5 py-3.5 transition-all duration-200 ${isActive
                            ? 'bg-gold-500/15 text-gold-50 font-semibold'
                            : 'text-gold-100/85 hover:bg-white/5 hover:text-gold-50 active:bg-white/10'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full transition-all duration-200 ${isActive ? 'bg-gold-400 opacity-100' : 'bg-gold-400/0 opacity-0 group-hover:bg-gold-400/40 group-hover:opacity-100'
                                }`}
                              aria-hidden
                            />
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base transition-colors ${isActive ? 'bg-gold-500/25 text-gold-200' : 'bg-maroon-950/40 text-gold-400 group-hover:text-gold-300'
                                }`}
                              aria-hidden
                            >
                              {item.icon}
                            </span>
                            <span className="flex-1 text-[15px] leading-tight">{item.label}</span>
                            <span
                              className={`text-xs transition-all duration-200 ${isActive ? 'text-gold-300 opacity-100' : 'text-gold-500/0 opacity-0 group-hover:text-gold-500/60 group-hover:opacity-100'
                                }`}
                              aria-hidden
                            >
                              →
                            </span>
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 border-t border-gold-500/25 bg-maroon-950/80 px-3 py-2.5">
                <p
                  id="language-select-label"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-maroon-800/90"
                >
                  {t('language')}
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
                        className={`lang-option rounded-lg border px-2 py-1.5 text-xs font-medium leading-tight transition-all duration-200 touch-manipulation ${isActive
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

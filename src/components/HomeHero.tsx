import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import historyData from '../data/history.json';
import { getLocalizedText } from '../types/celebration';
import type { LocalizedText } from '../types/celebration';
// import logo from '../assets/DFSYM_Logo-removebg-preview.png';
import logo from '/public/assets/DFSYM_Logo-removebg-preview.png';
import '../App.css';

const HomeHero: React.FC = () => {
  const { lang, t } = useLang();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const festivalDate = useMemo(
    () => new Date('2026-09-14T00:00:00'),
    []
  );

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, festivalDate.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [festivalDate]);

  return (
     <section className="relative overflow-hidden bg-temple-gradient text-white dark:bg-slate-950 dark:text-slate-100">

<img
  src="/assets/diwali_7_a-Photoroom.png"
  alt=""
  className="
    hidden lg:block

    absolute
    bottom-0
    right-0

    translate-x-1/2
    translate-y-1/2

    w-[900px]

    opacity-60
    pointer-events-none
    select-none
    z-0
  "
/>

      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gold-400/10 blur-3xl animate-float hidden md:block" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-saffron-400/10 blur-3xl animate-float hidden md:block" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-6 relative z-10">
        {/* <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 " > */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 max-w-7xl mx-auto">
          <motion.div
            className="relative shrink-0"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-full bg-gold-400/25 blur-2xl scale-110" />
            <img
              src={logo}
              alt="DFSYM Logo"
              width={176}
              height={176}
              className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full object-contain ring-4 ring-gold-400/50 shadow-gold animate-float"
            />
          </motion.div>

          {/* <div className="text-center md:text-left flex-1"> */}
          <div className="text-center md:text-left flex-1 max-w-4xl">
            <motion.p
              className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-200/90 font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t('established')} {historyData.established} · {getLocalizedText(historyData.location as LocalizedText, lang)}
            </motion.p>
            <motion.h1
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-gold-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t('orgName')}
            </motion.h1>
            <motion.p
              className="text-gold-200 text-sm sm:text-lg mb-8 font-medium italic dark:text-slate-300/80 max-w-xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {getLocalizedText(historyData.tagline as LocalizedText, lang)}
            </motion.p>
            <motion.p
              className="text-gold-100/85 text-sm sm:text-base max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('heroSubtitle')}
            </motion.p>
            <motion.div
              className="mb-8 flex justify-center md:justify-start"              
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >

              <div
                className="
                            w-full
                            max-w-md
                            lg:max-w-lg
                            rounded-[1.5rem]
                            border
                            border-gold-300/30
                            bg-maroon-950/70
                            p-4
                            sm:p-6
                            backdrop-blur-xl
                            shadow-lg
                            shadow-black/20
                            dark:border-slate-700/70
                            dark:bg-slate-900/75
                          "
              >
                <div className="text-center">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold-200/80 font-semibold mb-2">
                    Festival Starts In
                  </p>

                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-300/80 font-semibold mb-5">
                    Ganesh Festival Countdown
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => {
                    const value = [
                      countdown.days,
                      countdown.hours,
                      countdown.minutes,
                      countdown.seconds,
                    ][index];

                    return (
                      <div
                        key={label}
                        className="
            rounded-2xl
            bg-gold-50/10
            dark:bg-slate-700/30
            py-4
            px-2
            text-center
            min-h-[90px]
            flex
            flex-col
            justify-center
          "
                      >
                        <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-100">
                          {String(value).padStart(2, '0')}
                        </p>

                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-gold-300">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-5 text-center text-xs sm:text-sm text-gold-200/80 dark:text-slate-400/80">
                  Monday, September 14, 2026 · Ganesh Festival
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/celebrations"
                    className="btn-primary flex-1 text-center"
                  >
                    {t('celebrations')}
                  </Link>

                  <Link
                    to="/history"
                    className="btn-outline flex-1 text-center"
                  >
                    {t('learnMore')}
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

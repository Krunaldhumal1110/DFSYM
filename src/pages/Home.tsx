import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import years from '../data/years.json';
import { useLang } from '../i18n';
import YearCarousel from '../components/YearCarousel';
import HomeHero from '../components/HomeHero';
import { getLocalizedText } from '../types/celebration';
import { getAnimationConfig, viewportSettings, prefersReducedMotion } from '../config/animations';
import type { CelebrationYear, LocalizedText } from '../types/celebration';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const animConfig = useMemo(() => getAnimationConfig(), []);
  const reduced = prefersReducedMotion();

  const recentYears = useMemo(
    () =>
      [...(years as CelebrationYear[])]
        .sort((a, b) => b.year - a.year)
        .slice(0, 4),
    []
  );

  const navItems = [
    { to: '/celebrations', label: t('celebrations'), icon: '✦' },
    { to: '/history', label: t('history'), icon: '◷' },
    { to: '/guests', label: t('guests'), icon: '★' },
    { to: '/gallery', label: t('gallery'), icon: '▣' },
    { to: '/activities', label: t('activities'), icon: '◈' },
    { to: '/about', label: t('about'), icon: 'ⓘ' },
    { to: '/contact', label: t('contact'), icon: '✉' },
    { to: '/awards', label: t('awards'), icon: '🏅' },
    { to: '/news & Updates', label: t('news & Updates'), icon: '📰' },
    { to: '/supporters', label: t('supporters'), icon: '🙏' },
  ];

  return (
    <>
     <Helmet>
        <title>DFSYM | Dakshini Faliya Sarvajanik Yuvak Mandal</title>
        <meta
          name="description"
          content="Eco-friendly Ganesh Utsav celebrations in Vadodara since 2000."
        />
      </Helmet>
      <HomeHero />
      <YearCarousel />

      <section className="w-full px-3 sm:px-6 py-8 sm:py-12 bg-gold-50/30 dark:bg-slate-800/40 border-y border-gold-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-maroon-800 dark:text-slate-100 mb-6 text-center"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: reduced ? 0.05 : 0.2 }}
          >
            {t('menu')}
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportSettings}
                transition={{
                  duration: reduced ? 0.05 : 0.15,
                  delay: reduced ? 0 : animConfig.stagger * idx,
                }}
              >
                <Link
                  to={item.to}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-gold-300/40 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gold-50 dark:hover:bg-slate-700 hover:border-gold-400/60 dark:hover:border-slate-500 transition-all duration-200 text-maroon-800 dark:text-slate-200 hover:text-maroon-700 dark:hover:text-slate-100 hover:shadow-md active:scale-[0.98]"
                >
                  <span className="text-2xl sm:text-3xl">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-center">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="w-full px-3 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
          <motion.h2
            className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-maroon-800 dark:text-slate-100"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: reduced ? 0.05 : 0.2 }}
          >
            {t('yearlyConcepts')}
          </motion.h2>
          <Link
            to="/celebrations"
            className="text-saffron-600 dark:text-slate-300 font-semibold hover:text-maroon-700 dark:hover:text-slate-100 hover:underline text-sm sm:text-base shrink-0 transition"
          >
            {t('viewCelebration')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {recentYears.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{
                duration: reduced ? 0.05 : 0.25,
                delay: reduced ? 0 : animConfig.stagger * idx,
              }}
            >
              <Card
                year={item.year}
                banner={item.banner}
                shortDescription={getLocalizedText(item.theme as LocalizedText, lang)}
                onClick={() => navigate(`/celebration/${item.year}`)}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import years from '../data/years.json';
import { useLang } from '../i18n';
import YearCarousel from '../components/YearCarousel';
import HomeHero from '../components/HomeHero';
import { getLocalizedText } from '../types/celebration';
import type { CelebrationYear, LocalizedText } from '../types/celebration';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const recentYears = [...(years as CelebrationYear[])]
    .sort((a, b) => b.year - a.year)
    .slice(0, 4);

  const navItems = [
    // { to: '/', label: t('home'), icon: '⌂' },
    { to: '/celebrations', label: t('celebrations'), icon: '✦' },
    { to: '/history', label: t('history'), icon: '◷' },
    { to: '/guests', label: t('guests'), icon: '★' },
    { to: '/gallery', label: t('gallery'), icon: '▣' },
    { to: '/activities', label: t('activities'), icon: '◈' },
    { to: '/about', label: t('about'), icon: 'ⓘ' },
    { to: '/contact', label: t('contact'), icon: '✉' },
    { to: '/awards', label: t('awards'), icon: '🏅' }
  ];


  return (
    <>
      <HomeHero />
      <YearCarousel />

      <section className="w-full px-3 sm:px-6 py-8 sm:py-12 bg-gold-50/30 border-y border-gold-200/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-maroon-800 mb-6 text-center"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('menu')} {/* or any title you want */}
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={item.to}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-gold-300/40 bg-white hover:bg-gold-50 hover:border-gold-400/60 transition-all duration-200 text-maroon-800 hover:text-maroon-700 hover:shadow-md"
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
            className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-maroon-800"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('yearlyConcepts')}
          </motion.h2>
          <Link
            to="/celebrations"
            className="text-saffron-600 font-semibold hover:text-maroon-700 hover:underline text-sm sm:text-base shrink-0 transition"
          >
            {t('viewCelebration')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {recentYears.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
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

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import historyData from '../data/history.json';
import { getLocalizedText } from '../types/celebration';
import type { LocalizedText } from '../types/celebration';
// import logo from '../assets/DFSYM_Logo-removebg-preview.png';
import logo from '/public/assets/DFSYM_Logo-removebg-preview.png';

const HomeHero: React.FC = () => {
  const { lang, t } = useLang();

  return (
    <section className="relative overflow-hidden bg-temple-gradient text-white">
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gold-400/10 blur-3xl animate-float hidden md:block" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-saffron-400/10 blur-3xl animate-float hidden md:block" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
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

          <div className="text-center md:text-left flex-1">
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
              className="text-gold-200 text-sm sm:text-lg mb-2 font-medium italic"
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
              className="flex flex-wrap gap-3 justify-center md:justify-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/celebrations" className="btn-primary">
                {t('celebrations')}
              </Link>
              <Link to="/history" className="btn-outline">
                {t('learnMore')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

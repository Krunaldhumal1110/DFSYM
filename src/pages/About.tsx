import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import historyData from '../data/history.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { LocalizedText } from '../types/celebration';
import PageHero from '../components/PageHero';

const About: React.FC = () => {
  const { lang, t } = useLang();
  const loc = (text: LocalizedText) => getLocalizedText(text, lang);

  return (
    <>
      <PageHero title={t('aboutUs')} subtitle={loc(historyData.tagline as LocalizedText)} />
      <motion.main
        className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 max-w-3xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-premium p-5 sm:p-8 space-y-5 text-maroon-900/85 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
          <p>{loc(historyData.intro as LocalizedText)}</p>
          <p>{loc(historyData.earlyYears as LocalizedText)}</p>
          <p>{loc(historyData.ecoShift as LocalizedText)}</p>
          <p className="italic font-semibold text-maroon-700 dark:text-slate-300 border-l-4 border-gold-400 dark:border-slate-500 pl-4">
            “{loc(historyData.tagline as LocalizedText)}”
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            to="/history"
            className="btn-primary text-sm sm:text-base"
          >
            {t('history')}
          </Link>
          <Link
            to="/activities"
            className="px-5 py-2.5 border-2 border-maroon-600 dark:border-slate-400 text-maroon-700 dark:text-slate-200 rounded-full font-semibold hover:bg-maroon-50 dark:hover:bg-slate-700 transition text-sm sm:text-base"
          >
            {t('activities')}
          </Link>
        </div>
      </motion.main>
    </>
  );
};

export default About;

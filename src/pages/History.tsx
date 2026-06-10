import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import historyData from '../data/history.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { LocalizedText } from '../types/celebration';
import PageHero from '../components/PageHero';

const History: React.FC = () => {
  const { lang, t } = useLang();
  const loc = (text: LocalizedText) => getLocalizedText(text, lang);

  return (
    <>
      <PageHero title={t('historyTitle')} subtitle={loc(historyData.tagline as LocalizedText)} />
      <main className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 max-w-4xl">
        <motion.section
          className="card-premium p-5 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm uppercase tracking-widest text-maroon-600 font-semibold mb-2">
            {t('established')} {historyData.established} · {loc(historyData.location as LocalizedText)}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-maroon-700 mb-4">{t('introTitle')}</h2>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
            {loc(historyData.intro as LocalizedText)}
          </p>
        </motion.section>

        <motion.section
          className="card-premium p-5 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-maroon-700 mb-4">{t('earlyYears')}</h2>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6">
            {loc(historyData.earlyYears as LocalizedText)}
          </p>
          <h3 className="text-lg font-semibold text-maroon-600 mb-3">{t('timeline')}</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {historyData.timelineYears.map((y) => (
              <span
                key={y}
                className="inline-flex items-center justify-center min-w-[4rem] px-3 py-2 rounded-full bg-gold-100 text-maroon-800 font-semibold text-sm sm:text-base"
              >
                {y}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="bg-gradient-to-br from-sacred-green/10 to-gold-50 rounded-2xl shadow-temple p-5 sm:p-8 border border-sacred-green/30"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-maroon-700 mb-4">{t('ecoShift')}</h2>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
            {loc(historyData.ecoShift as LocalizedText)}
          </p>
          <Link
            to="/celebrations"
            className="inline-block mt-6 btn-primary text-sm sm:text-base"
          >
            {t('exploreCelebrations')} →
          </Link>
        </motion.section>
      </main>
    </>
  );
};

export default History;

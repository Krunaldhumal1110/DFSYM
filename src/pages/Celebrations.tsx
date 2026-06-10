import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import years from '../data/years.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { CelebrationYear, LocalizedText } from '../types/celebration';
import PageHero from '../components/PageHero';

const Celebrations: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const celebrationYears = [...(years as CelebrationYear[])].sort((a, b) => b.year - a.year);

  return (
    <>
      <PageHero title={t('celebrations')} subtitle={t('exploreCelebrations')} />
      <main className="container mx-auto py-8 sm:py-12 px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {celebrationYears.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
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

export default Celebrations;

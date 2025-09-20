import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import years from '../data/years.json';
import { useLang } from '../i18n';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLang();
  return (
    <main className="max-w-full w-full px-2 sm:px-4 py-6 sm:py-8 mx-auto">
      <motion.h1
        className="text-2xl xs:text-3xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-orange-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {t('yearlyConcepts')}
      </motion.h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {years.map((item, idx) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <Card
              year={item.year}
              banner={item.banner}
              shortDescription={item.shortDescription}
              onClick={() => navigate(`/year/${item.year}`)}
            />
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Home;

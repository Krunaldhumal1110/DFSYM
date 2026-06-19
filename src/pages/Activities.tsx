import React from 'react';
import { motion } from 'framer-motion';
import activities from '../data/activities.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { LocalizedText } from '../types/celebration';
import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';

interface ActivityItem {
  id: string;
  image: string[];
  title: LocalizedText;
  description: LocalizedText;
}

const Activities: React.FC = () => {
  const { lang, t } = useLang();
  const items = activities as ActivityItem[];
  

  return (
    <>
      <PageHero title={t('activitiesTitle')} />
      <main className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {items.map((item, idx) => (
            // console.log(item.image),
            <motion.article
              key={item.id}
              className="card-premium overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              
              <div className="grid grid-cols-2 gap-2 p-2">
                {item.image.slice(0, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${getLocalizedText(item.title, lang)} ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                    
                  />
                  
                ))}
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h2 className="font-display text-lg sm:text-xl font-bold text-maroon-800 dark:text-slate-100 mb-2">
                  {getLocalizedText(item.title, lang)}
                </h2>
                <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed flex-1">
                  {getLocalizedText(item.description, lang)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>


        {/* <motion.section
          className="mt-12 max-w-3xl mx-auto bg-gold-50 border border-gold-200/60 rounded-2xl p-6 sm:p-8 text-center shadow-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-xl sm:text-2xl font-bold text-maroon-800 mb-2">{t('newsTitle')}</h2>
          <p className="text-gray-700">{t('newsComingSoon')}</p>
        </motion.section> */}
        <motion.section
  className="mt-12 max-w-3xl mx-auto bg-gold-50 border border-gold-200/60 rounded-2xl p-6 sm:p-8 text-center shadow-card"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <h2 className="font-display text-xl sm:text-2xl font-bold text-maroon-800 mb-3">
    📢 News & Updates
  </h2>

  <p className="text-gray-700 mb-5">
    Stay updated with the latest activities, announcements and upcoming events.
  </p>

  <Link
    to="/news & Updates"
    className="inline-flex items-center px-6 py-3 rounded-full bg-maroon-700 text-white hover:bg-maroon-800 transition"
  >
    View News Articles
  </Link>
</motion.section>
      </main>
    </>
  );
};

export default Activities;

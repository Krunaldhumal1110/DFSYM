import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import historyData from '../data/history.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { LocalizedText } from '../types/celebration';
import PageHero from '../components/PageHero';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

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
          <p className="text-sm uppercase tracking-widest text-maroon-600 dark:text-slate-300 font-semibold mb-2">
            {t('established')} {historyData.established} · {loc(historyData.location as LocalizedText)}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-maroon-700 dark:text-slate-100 mb-4">{t('introTitle')}</h2>
          <p className="text-gray-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
            {loc(historyData.intro as LocalizedText)}
          </p>
        </motion.section>

        <motion.section
          className="card-premium p-5 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-maroon-700 dark:text-slate-100 mb-4">{t('earlyYears')}</h2>

          <p className="text-gray-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed mb-6">
            {loc(historyData.earlyYears as LocalizedText)}
          </p>



          <div className="mb-8">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              spaceBetween={20}
              breakpoints={{
                320: {
                  slidesPerView: 1.2
                },
                640: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 3
                }
              }}
            >
              {historyData.earlyYearsImages.map((item, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-700"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-4 text-center">
                      <h3 className="text-xl font-bold text-maroon-700 dark:text-white">
                        {item.year}
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>


        </motion.section>

        <motion.section
          className="bg-gradient-to-br from-sacred-green/10 to-gold-50 rounded-2xl shadow-temple p-5 sm:p-8 border border-sacred-green/30 dark:from-slate-800/40 dark:to-slate-700/20 dark:bg-slate-800/30"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-maroon-700 dark:text-slate-100 mb-4">{t('ecoShift')}</h2>
          <p className="text-gray-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
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

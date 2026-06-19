import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import years from '../data/years.json';
import { useLang } from '../i18n';
import Confetti from "react-confetti";
import {
  getLocalizedText,
  type CelebrationYear,
  type Award
} from '../types/celebration';
import LazyImage from '../components/ui/LazyImage';
import { Helmet } from 'react-helmet-async';

const Awards: React.FC = () => {

  const [showCelebration, setShowCelebration] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowCelebration(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);
  
  const { t, lang } = useLang();

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const yearsData = years as CelebrationYear[];

  const awardYears = yearsData
    .filter((year) => year.awards?.length)
    .sort((a, b) => b.year - a.year);

  const totalAwards = awardYears.reduce(
    (sum, year) => sum + (year.awards?.length || 0),
    0
  );

  return (
  <>
  <Helmet>
  <title>Awards & Achievements | DFSYM</title>
  <meta
    name="description"
    content="Awards and achievements received by Dakshini Faliya Sarvajanik Yuvak Mandal."
  />
</Helmet>
  <main className="container mx-auto max-w-7xl px-4 py-20">

    {showCelebration && (
  <Confetti
    recycle={false}
    numberOfPieces={500}
  />
)}

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-2 bg-gold-500 text-maroon-900 px-5 py-2 rounded-full font-bold shadow-gold mb-4">
        {/* 🏆 Awards & Achievements */}
        🏆 {t('awardsAchievements')}
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-bold text-maroon-800 dark:text-slate-100 mb-3">
        {t('awards')}
      </h1>

      <p className="text-maroon-700 dark:text-slate-300 max-w-2xl mx-auto">
        {t('awardsDescription')}
      </p>
    </motion.div>

    {/* Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
      <div className="card-premium p-6 text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h3 className="text-3xl font-bold text-maroon-800">
          {totalAwards}
        </h3>
        <p>{t('totalAwards')}</p>
      </div>

      <div className="card-premium p-6 text-center">
        <div className="text-4xl mb-2">📅</div>
        <h3 className="text-3xl font-bold text-maroon-800">
          {awardYears.length}
        </h3>
        <p>{t('awardWinningYears')}</p>
      </div>

      <div className="card-premium p-6 text-center">
        <div className="text-4xl mb-2">🙏</div>
        <h3 className="text-3xl font-bold text-maroon-800">
          {t('excellence')}
        </h3>
        <p>{t('celebrationJourney')}</p>
      </div>
    </div>

    {/* Trophy Showcase Image */}
    <div className="relative rounded-3xl overflow-hidden mb-12">
      <img
        src="/assets/diwali_7_a.jpg"
        alt="Awards Showcase"
        className="w-full h-[300px] md:h-[500px] object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">
            🏆 Excellence Through the Years
          </h2>
          <p className="mt-3 text-lg">
            Celebrating our achievements and milestones
          </p>
        </div>
      </div>
    </div>

    {/* Year Sections */}
    <div className="space-y-10">

      {awardYears.map((yearData) => (
        <motion.section
          key={yearData.year}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium p-6"
        >

          {/* Year Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <div>
              <span className="inline-block bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-900 px-4 py-1 rounded-full font-bold mb-2">
                {yearData.year}
              </span>

              <h2 className="font-display text-2xl font-bold text-maroon-800">
                {getLocalizedText(
                  yearData.theme,
                  lang
                )}
              </h2>
            </div>

            <Link
              to={`/celebrations/${yearData.year}`}
              className="text-saffron-600 hover:text-maroon-800 font-semibold"
            >
              View Celebration →
            </Link>
          </div>

          {/* Awards */}
          <div className="space-y-8">

            {yearData.awards?.map(
              (award: Award, awardIndex) => (
                <div
                  key={awardIndex}
                  className="border border-gold-200 rounded-2xl p-5 bg-white/70"
                >
                  <h3 className="font-semibold text-lg text-maroon-800 mb-4">
                    🏅 {getLocalizedText(
                      award.title,
                      lang
                    )}
                  </h3>

                  {award.images &&
                    award.images.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {award.images.map(
                          (img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="overflow-hidden rounded-xl cursor-pointer"
                              onClick={() =>
                                setSelectedImage(img)
                              }
                            >
                              <LazyImage
                                src={img}
                                alt="Award"
                                className="w-full h-56 object-cover hover:scale-105 transition duration-500"
                                wrapperClassName="w-full"
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>
              )
            )}
          </div>
        </motion.section>
      ))}
    </div>

    {/* Modal */}
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedImage(null)}
      >
        <img
          src={selectedImage}
          alt="Award"
          className="max-h-[90vh] max-w-full rounded-2xl"
        />
      </div>
    )}
  </main>
  </>

  );
};

export default Awards;

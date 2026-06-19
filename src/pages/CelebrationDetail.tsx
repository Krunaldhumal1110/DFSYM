import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import years from '../data/years.json';
import Gallery from '../components/Gallery';
import VideoPlayer from '../components/VideoPlayer';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { CelebrationYear, Guest, LocalizedText } from '../types/celebration';
import LazyImage from '../components/ui/LazyImage';

const CelebrationDetail: React.FC = () => {
  const { t, lang } = useLang();
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const data = (years as CelebrationYear[]).find((y) => y.year === Number(year));
  const [modalImg, setModalImg] = useState<string | null>(null);

  if (!data) {
    return (
      <div className="text-center py-16 sm:py-20 px-4">
        <p className="text-lg text-maroon-800 mb-4">{t('notFound')}</p>
        <Link to="/celebrations" className="text-saffron-600 dark:text-slate-300 hover:text-maroon-700 dark:hover:text-slate-100 font-semibold">
          ← {t('celebrations')}
        </Link>
      </div>
    );
  }

  const theme = getLocalizedText(data.theme as LocalizedText, lang);
  const themeInfo = getLocalizedText(data.themeInfo as LocalizedText, lang);

  return (
    <main className="container mx-auto py-6 sm:py-10 px-3 sm:px-6 max-w-4xl">
      <button
        type="button"
        className="mb-4 text-saffron-600 dark:text-slate-300 hover:text-maroon-800 dark:hover:text-slate-100 font-medium text-sm sm:text-base transition"
        onClick={() => navigate(-1)}
      >
        ← {t('back')}
      </button>

      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-block bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-900 text-sm font-bold px-4 py-1 rounded-full mb-3 shadow-gold">
          {data.year}
        </span>
        <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-maroon-800 dark:text-slate-100 leading-snug mb-4">
          {theme}
        </h1>
      </motion.div>

      <div className="rounded-2xl overflow-hidden shadow-temple mb-6 border border-gold-200/50">
        <LazyImage
          src={data.banner}
          alt={theme}
          className="w-full max-h-64 sm:max-h-96 object-cover"
          wrapperClassName="w-full"
          priority
        />
      </div>

      <section className="card-premium p-4 sm:p-6 mb-6">
        <h2 className="font-display text-lg sm:text-xl font-bold text-maroon-700 dark:text-slate-200 mb-3">{t('themeInfo')}</h2>
        <p className="text-maroon-900/80 dark:text-slate-300 text-base sm:text-lg leading-relaxed">{themeInfo}</p>
      </section>

      {data.awards && data.awards.length > 0 ? (
        <section className="bg-gradient-to-br from-gold-50 to-ivory-100 dark:from-slate-800 dark:to-slate-700 border border-gold-300/50 dark:border-slate-600 rounded-2xl p-4 sm:p-6 mb-6 shadow-card">
          <h2 className="font-display text-lg sm:text-xl font-bold text-maroon-800 dark:text-slate-200 mb-3">🏆 {t('awards')}</h2>
          <ul className="space-y-2">
            {data.awards.map((award, idx) => (
              <li key={`${data.year}-award-${idx}`} className="text-maroon-900/85 dark:text-slate-300 text-sm sm:text-base flex gap-2">
                <span className="text-gold-600 dark:text-slate-400 shrink-0">✦</span>
                <span>{getLocalizedText(award.title, lang)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-maroon-600/60 dark:text-slate-400 italic mb-6 text-sm">{t('noAwards')}</p>
      )}

      {data.guests && data.guests.length > 0 ? (
        <section className="card-premium p-4 sm:p-6 mb-6">
          <h2 className="font-display text-lg sm:text-xl font-bold text-maroon-800 dark:text-slate-200 mb-3">{t('guestTitle')}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.guests.map((guest: Guest, idx) => (
              <li
                key={`${data.year}-guest-${idx}`}
                className="border border-gold-200/60 dark:border-slate-600 rounded-xl px-4 py-3 bg-ivory-50 dark:bg-slate-800 hover:border-gold-400/60 dark:hover:border-slate-500 transition"
              >
                <span className="font-semibold text-maroon-900 dark:text-slate-200 block">{getLocalizedText(guest.name, lang)}</span>
                {guest.role && (
                  <span className="text-sm text-saffron-600 dark:text-slate-400">{getLocalizedText(guest.role, lang)}</span>
                )}
              </li>
            ))}
          </ul>
          <Link to="/guests" className="inline-block mt-4 text-sm text-saffron-600 dark:text-slate-300 hover:text-maroon-800 dark:hover:text-slate-100 font-semibold">
            {t('allGuests')} →
          </Link>
        </section>
      ) : (
        <p className="text-maroon-600/60 dark:text-slate-400 italic mb-6 text-sm">{t('noGuests')}</p>
      )}

      {data.photos.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <h3 className="font-display text-lg sm:text-xl font-semibold mb-3 text-maroon-700 dark:text-slate-200">{t('photoGallery')}</h3>
          <Gallery photos={data.photos} onPhotoClick={setModalImg} />
        </motion.div>
      )}

      {data.videos.length > 0 && (
        <>
          <h3 className="font-display text-lg sm:text-xl font-semibold mt-6 mb-2 text-maroon-700">{t('videoGallery')}</h3>
          <VideoPlayer videos={data.videos} />
        </>
      )}

      {modalImg && (
        <div
          className="fixed inset-0 bg-sacred-dark/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModalImg(null)}
          role="presentation"
        >
          <motion.img
            src={modalImg}
            alt="Zoomed"
            className="max-h-[85vh] max-w-full rounded-2xl shadow-gold object-contain ring-2 ring-gold-400/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        </div>
      )}
    </main>
  );
};

export default CelebrationDetail;

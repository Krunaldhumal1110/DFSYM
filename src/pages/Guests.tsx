import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import years from '../data/years.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { CelebrationYear, Guest, LocalizedText } from '../types/celebration';
import PageHero from '../components/PageHero';

const Guests: React.FC = () => {
  const { lang, t } = useLang();
  const celebrationYears = years as CelebrationYear[];

  const yearsWithGuests = celebrationYears
    .filter((y) => y.guests && y.guests.length > 0)
    .sort((a, b) => b.year - a.year);

  const guestRole = (guest: Guest) =>
    guest.role ? getLocalizedText(guest.role, lang) : null;

  return (
    <>
      <PageHero title={t('allGuests')} subtitle={t('guestByYear')} />
      <main className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {yearsWithGuests.map((item, idx) => (
            <motion.article
              key={item.year}
              className="card-premium overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="bg-temple-gradient text-gold-50 px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
                <span className="text-xl sm:text-2xl font-bold">{item.year}</span>
                <Link
                  to={`/celebration/${item.year}`}
                  className="text-xs sm:text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
                >
                  {t('viewCelebration')}
                </Link>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm text-maroon-700 font-medium mb-3 line-clamp-2">
                  {getLocalizedText(item.theme as LocalizedText, lang)}
                </p>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {t('guestTitle')}
                </h3>
                <ul className="space-y-2">
                  {item.guests!.map((guest, guestIdx) => (
                    <li key={`${item.year}-guest-${guestIdx}`} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                      <span className="font-semibold text-gray-900">{getLocalizedText(guest.name, lang)}</span>
                      {guestRole(guest) && (
                        <span className="text-sm text-saffron-600">— {guestRole(guest)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </>
  );
};

export default Guests;

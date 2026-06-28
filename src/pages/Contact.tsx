import React from 'react';
import { useLang } from '../i18n';
import PageHero from '../components/PageHero';

const Contact: React.FC = () => {
  const { t } = useLang();
  return (
    <>
      <PageHero title={t('contactUs')} subtitle={t('contactInfo')} />
      <main className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 max-w-2xl">
        <ul className="card-premium p-6 sm:p-8 space-y-4 text-base sm:text-lg text-maroon-900/80 dark:text-slate-200">
          <li className="flex flex-col sm:flex-row sm:gap-2">
            <span className="font-semibold text-maroon-700 dark:text-slate-300 min-w-[6rem]">{t('email')}:</span>
            <a href="mailto:dfsym2016@gmail.com" className="text-saffron-600 dark:text-slate-300 hover:text-maroon-800 dark:hover:text-slate-100 transition break-all">
              dfsym2016@gmail.com
            </a>
          </li>
          <li className="flex flex-col sm:flex-row sm:gap-2">
            <span className="font-semibold text-maroon-700 dark:text-slate-300 min-w-[6rem]">{t('phone')}:</span>
            <a href="tel:+919714722202" className="text-saffron-600 dark:text-slate-300 hover:text-maroon-800 dark:hover:text-slate-100 transition">
              +91 9714 722 202
              <br />
              +91 9099 971 942
            </a>
          </li>
          <li className="flex flex-col sm:flex-row sm:gap-2">
            <span className="font-semibold text-maroon-700 dark:text-slate-300 min-w-[6rem]">{t('instagram')}:</span>
            <a
              href="https://www.instagram.com/dfsym_2000?igsh=MTY2MDV6cmgxOGFoNg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron-600 dark:text-slate-300 hover:text-maroon-800 dark:hover:text-slate-100 transition"
            >
              @dfsym_2000
            </a>
          </li>
          <li className="pt-2 text-gray-600 dark:text-slate-300 text-sm sm:text-base">
            📍Dakshini faliya, Siddhnath Road, opposite little flowers school, Khanderao Market,  Vadodara, Gujarat, India
          </li>
        </ul>
      </main>
    </>
  );
};

export default Contact;

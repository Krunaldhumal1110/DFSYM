import React from 'react';
import { useLang } from '../i18n';

const Contact: React.FC = () => {
  const { t } = useLang();
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-orange-700 mb-4">{t('contactUs')}</h1>
      <p className="text-lg text-gray-800 max-w-2xl mb-4">{t('contactInfo')}</p>
      <ul className="text-lg text-gray-700">
        <li>{t('email')}: <a href="mailto:ganeshgroup@example.com" className="text-orange-600 hover:underline">ganeshgroup@example.com</a></li>
        <li>{t('phone')}: <a href="tel:+911234567890" className="text-orange-600 hover:underline">+91 12345 67890</a></li>
        <li>{t('instagram')}: <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">@ganeshgroup</a></li>
      </ul>
    </main>
  );
};

export default Contact;

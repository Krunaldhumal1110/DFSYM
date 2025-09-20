
import React from 'react';
import years from '../data/years.json';
import Gallery from '../components/Gallery';
import { useLang } from '../i18n';


// List of all image files in assets (excluding favicon, logo, react.svg)
const assetImages = [
  "2017D F S Y mandal 20171102_143721.jpg",
  "2018IMG-20180913-WA0089.jpg",
  "2019P_20190905_233958.jpg",
  "2020IMG-20200825-WA0011.jpg",
  "2021IMG-20210913-WA0002.jpg",
  "2022IMG-20220901-WA0009.jpg",
  "2023IMG-20230927-WA0042.jpg",
  "2024IMG-20240909-WA0012.jpg",
  "2025WhatsApp Image 2025-09-08 at 20.20.56_9262fd2b.jpg"
];

const GalleryPage: React.FC = () => {
  const { t } = useLang();
  // Remove duplicates and build full path
  const allPhotos = Array.from(new Set(assetImages.map(f => `/assets/${f}`)));
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-orange-700 mb-4">{t('gallery')}</h1>
      <Gallery photos={allPhotos} onPhotoClick={() => {}} />
    </main>
  );
};

export default GalleryPage;

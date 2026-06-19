import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import { useLang } from '../i18n';
import PageHero from '../components/PageHero';

const assetImages = [
  '2016/2016 theme image.jpg',
  '2017/2017 theme image.jpg',
  '2018/2018 theme image.jpg',
  '2019/2019 theme image.jpg',
  '2020/2020 theme image.jpg',
  '2021/2021 theme image.jpg',
  '2022/2022 theme image.jpg',
  '2023/2023 theme image.jpg',
  '2024/2024 theme image.jpg',
  '2025/2025 theme image.jpg',
];

const GalleryPage: React.FC = () => {
  const { t } = useLang();
  const [modalImg, setModalImg] = useState<string | null>(null);
  const allPhotos = Array.from(new Set(assetImages.map((f) => `/assets/${f}`)));

  return (
    <>
      <PageHero title={t('gallery')} subtitle={t('photoGallery')} />
      <main className="container mx-auto py-8 sm:py-12 px-3 sm:px-6">
        <Gallery photos={allPhotos} onPhotoClick={setModalImg} />
        {modalImg && (
          <div
            className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setModalImg(null)}
          >
            <motion.img
              src={modalImg}
              alt="Gallery"
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default GalleryPage;

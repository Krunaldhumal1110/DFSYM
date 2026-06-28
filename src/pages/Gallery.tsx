import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import { useLang } from '../i18n';
import PageHero from '../components/PageHero';
import galleryData from "../data/gallery.json";

const GalleryPage: React.FC = () => {
  const { t } = useLang();
  const [modalImg, setModalImg] = useState<string | null>(null);
const allPhotos = galleryData.flatMap((year) => year.images);

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

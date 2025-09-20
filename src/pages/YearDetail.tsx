
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import years from '../data/years.json';
import Gallery from '../components/Gallery';
import VideoPlayer from '../components/VideoPlayer';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';

const YearDetail: React.FC = () => {
  const { t } = useLang();
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const data = years.find((y) => y.year === Number(year));
  const [modalImg, setModalImg] = useState<string | null>(null);

  if (!data) return <div className="text-center py-20">{t('notFound')}</div>;

  return (
    <main className="container mx-auto py-8 px-4">
      <button className="mb-4 text-orange-600 hover:underline" onClick={() => navigate(-1)}>&larr; {t('back')}</button>
      <motion.h2 className="text-2xl md:text-4xl font-bold mb-4 text-orange-700" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{data.year} - {data.shortDescription}</motion.h2>
      <img src={data.banner} alt="Banner" className="w-full max-h-80 object-cover rounded-lg shadow mb-6" />
      <p className="mb-6 text-lg text-gray-800">{data.description}</p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h3 className="text-xl font-semibold mb-2 text-orange-600">{t('photoGallery')}</h3>
        <Gallery photos={data.photos} onPhotoClick={setModalImg} />
        <h3 className="text-xl font-semibold mt-6 mb-2 text-orange-600">{t('videoGallery')}</h3>
        <VideoPlayer videos={data.videos} />
      </motion.div>
      {modalImg && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setModalImg(null)}>
          <motion.img src={modalImg} alt="Zoomed" className="max-h-[80vh] rounded-lg shadow-2xl" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
        </div>
      )}
    </main>
  );
};

export default YearDetail;

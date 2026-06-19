import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import LazyImage from './ui/LazyImage';
import { useMotionConfig } from '../hooks/useMotionConfig';
import { viewportSettings, prefersReducedMotion } from '../config/animations';
import { Helmet } from "react-helmet-async";

interface GalleryProps {
  photos: string[];
  onPhotoClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick }) => {
  const { duration, viewportMargin, staggerDelay, itemVariants } = useMotionConfig();
  const reduced = prefersReducedMotion();

  const memoizedPhotos = useMemo(() => photos, [photos]);

  return (
    <>
     <Helmet>
        <title>DFSYM | Dakshini Faliya Sarvajanik Yuvak Mandal</title>
        <meta
          name="description"
          content="Dakshini Faliya Sarvajanik Yuvak Mandal (DFSYM) gallary , showcase of our events and activities"
        />
      </Helmet>

    <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 gap-3 sm:gap-4">
      {memoizedPhotos.map((src, idx) => (
        <motion.div
          key={src + idx}
          className="mb-3 sm:mb-4 break-inside-avoid"
          initial="hidden"
          whileInView="visible"
          viewport={{ ...viewportSettings, margin: viewportMargin }}
          variants={itemVariants}
          transition={{
            duration: reduced ? 0.05 : duration,
            delay: reduced ? 0 : Math.min(idx * staggerDelay, 0.3),
          }}
        >
          <div
            className="rounded-xl overflow-hidden shadow-card border border-gold-200/40 dark:border-slate-600 cursor-pointer group"
            onClick={() => onPhotoClick(src)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onPhotoClick(src)}
          >
            <LazyImage
              src={src}
              alt="Gallery"
              className="w-full group-hover:scale-105 transition-transform duration-300 will-change-transform"
              wrapperClassName="w-full"
            />
          </div>
        </motion.div>
      ))}
    </div>
    </>
  );
};

export default Gallery;

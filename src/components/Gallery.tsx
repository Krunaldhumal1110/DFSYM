import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from './ui/LazyImage';
import { useMotionConfig } from '../hooks/useMotionConfig';

interface GalleryProps {
  photos: string[];
  onPhotoClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick }) => {
  const { duration, viewportMargin, staggerDelay, itemVariants } = useMotionConfig();

  return (
    <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 gap-3 sm:gap-4">
      {photos.map((src, idx) => (
        <motion.div
          key={src + idx}
          className="mb-3 sm:mb-4 break-inside-avoid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: viewportMargin }}
          variants={itemVariants}
          transition={{ 
            duration,
            delay: Math.min(idx * staggerDelay, 0.3),
          }}
        >
          <div
            className="rounded-xl overflow-hidden shadow-card border border-gold-200/40 cursor-pointer group"
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
  );
};

export default Gallery;

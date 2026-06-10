import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from './ui/LazyImage';

interface GalleryProps {
  photos: string[];
  onPhotoClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick }) => (
  <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 gap-3 sm:gap-4">
    {photos.map((src, idx) => (
      <motion.div
        key={src + idx}
        className="mb-3 sm:mb-4 break-inside-avoid"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: Math.min(idx * 0.05, 0.3) }}
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
            className="w-full group-hover:scale-105 transition-transform duration-500"
            wrapperClassName="w-full"
          />
        </div>
      </motion.div>
    ))}
  </div>
);

export default Gallery;

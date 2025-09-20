import React from 'react';
import { motion } from 'framer-motion';

interface GalleryProps {
  photos: string[];
  onPhotoClick: (src: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick }) => (
  <div className="columns-2 md:columns-3 gap-4">
    {photos.map((src, idx) => (
      <motion.img
        key={idx}
        src={src}
        alt="Gallery"
        className="mb-4 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
        whileHover={{ scale: 1.08 }}
        onClick={() => onPhotoClick(src)}
      />
    ))}
  </div>
);

export default Gallery;

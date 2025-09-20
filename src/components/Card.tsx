import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  year: number;
  banner: string;
  shortDescription: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ year, banner, shortDescription, onClick }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-1 min-h-[220px] flex flex-col"
    whileHover={{ scale: 1.07, rotateY: 5 }}
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={`View details for year ${year}`}
  >
    <img
      src={banner}
      alt={`Banner for ${year}`}
      className="w-full h-32 xs:h-36 sm:h-40 object-cover object-center"
      loading="lazy"
      style={{ aspectRatio: '4/3' }}
    />
    <div className="p-3 sm:p-4 flex-1 flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold text-orange-600">{year}</h2>
      <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base">{shortDescription}</p>
    </div>
  </motion.div>
);

export default Card;

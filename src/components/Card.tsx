import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from './ui/LazyImage';

interface CardProps {
  year: number;
  banner: string;
  shortDescription: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ year, banner, shortDescription, onClick }) => (
  <motion.article
    className="card-premium cursor-pointer group min-h-[240px] flex flex-col"
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={`View celebration ${year}`}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <div className="relative overflow-hidden">
      <LazyImage
        src={banner}
        alt={`${year} celebration`}
        className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        wrapperClassName="w-full h-36 sm:h-44"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-transparent to-transparent pointer-events-none" />
      <span className="absolute bottom-3 left-3 bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-900 font-bold text-sm px-3 py-1 rounded-full shadow-gold">
        {year}
      </span>
    </div>
    <div className="p-4 flex-1 flex flex-col border-t border-gold-100">
      <p className="text-maroon-800 text-sm sm:text-base leading-snug line-clamp-3 font-medium group-hover:text-maroon-900 transition-colors">
        {shortDescription}
      </p>
      <span className="mt-3 text-xs font-semibold text-saffron-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        View →
      </span>
    </div>
  </motion.article>
);

export default Card;

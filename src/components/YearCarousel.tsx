import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import years from '../data/years.json';
import { useLang } from '../i18n';
import { getLocalizedText } from '../types/celebration';
import type { CelebrationYear, LocalizedText } from '../types/celebration';
import LazyImage from './ui/LazyImage';

const YearCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const slides = useMemo(
    () => [...(years as CelebrationYear[])].sort((a, b) => a.year - b.year),
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentIndex];
  const themeLabel = getLocalizedText(activeSlide.theme as LocalizedText, lang);

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % slides.length);
  };

  return (
    <section className="bg-ivory border-y border-gold-200/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mx-auto w-full max-w-[min(100%,36rem)] sm:max-w-2xl lg:max-w-4xl">
          <div
            className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-temple cursor-pointer group ring-1 ring-gold-200/50"
            onClick={() => navigate(`/celebration/${activeSlide.year}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/celebration/${activeSlide.year}`)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.year}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] xs:aspect-[3/2] sm:aspect-[16/10] md:aspect-[16/9]"
              >
                <LazyImage
                  src={activeSlide.banner}
                  alt={`${activeSlide.year} celebration`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  wrapperClassName="absolute inset-0 w-full h-full"
                  priority={currentIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/90 via-maroon-900/25 to-transparent pointer-events-none" />
                <div className="absolute left-0 bottom-0 right-0 p-4 sm:p-6">
                  <span className="inline-flex items-center bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-900 rounded-full px-3 py-1 text-xs sm:text-sm font-bold mb-2 shadow-gold">
                    {activeSlide.year}
                  </span>
                  <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-gold-50 leading-snug line-clamp-2 drop-shadow-lg">
                    {themeLabel}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={goToPrev}
              className="carousel-nav-btn absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 text-maroon-800 shadow-md backdrop-blur-sm transition hover:scale-105 active:scale-95 text-lg sm:text-xl font-bold"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="carousel-nav-btn absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 text-maroon-800 shadow-md backdrop-blur-sm transition hover:scale-105 active:scale-95 text-lg sm:text-xl font-bold"
              aria-label="Next"
            >
              ›
            </button>
          </div>

          <div className="carousel-years mt-3 sm:mt-4 overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex w-max min-w-full justify-center gap-1.5 sm:gap-2 mx-auto">
              {slides.map((slide, idx) => (
                <button
                  key={slide.year}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`shrink-0 rounded-full px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-gradient-to-r from-maroon-700 to-maroon-800 text-gold-100 shadow-temple'
                      : 'bg-white text-maroon-700 border border-gold-200 hover:border-gold-400'
                  }`}
                >
                  {slide.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YearCarousel;

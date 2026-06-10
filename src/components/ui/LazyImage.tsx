import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from './Skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  onClick?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full z-10" rounded="none" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-ivory-200 text-maroon-700 text-sm">
          {alt}
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      )}
    </div>
  );
};

export default LazyImage;

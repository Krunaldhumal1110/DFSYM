import React from 'react';

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
}

const roundedMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  none: '',
};

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', rounded = 'lg' }) => (
  <div
    className={`skeleton-shimmer ${roundedMap[rounded]} ${className}`}
    aria-hidden
    role="presentation"
  />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-3 sm:h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        rounded="md"
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div className="card-premium min-h-[260px] flex flex-col overflow-hidden">
    <Skeleton className="w-full h-40 sm:h-44 rounded-none" rounded="none" />
    <div className="p-4 space-y-3 flex-1">
      <Skeleton className="h-6 w-16" rounded="md" />
      <SkeletonText lines={2} />
    </div>
  </div>
);

export const SkeletonHero: React.FC = () => (
  <div className="bg-temple-gradient min-h-[280px] sm:min-h-[360px] p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
    <Skeleton className="h-28 w-28 sm:h-36 sm:w-36 shrink-0" rounded="full" />
    <div className="flex-1 w-full space-y-4">
      <Skeleton className="h-4 w-48 mx-auto md:mx-0" rounded="md" />
      <Skeleton className="h-10 w-full max-w-lg mx-auto md:mx-0" rounded="lg" />
      <Skeleton className="h-5 w-3/4 max-w-md mx-auto md:mx-0" rounded="md" />
      <div className="flex gap-3 justify-center md:justify-start pt-2">
        <Skeleton className="h-10 w-32" rounded="full" />
        <Skeleton className="h-10 w-28" rounded="full" />
      </div>
    </div>
  </div>
);

export default Skeleton;

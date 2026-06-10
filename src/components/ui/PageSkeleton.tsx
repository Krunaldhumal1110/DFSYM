import React from 'react';
import { Skeleton, SkeletonCard, SkeletonHero, SkeletonText } from './Skeleton';

interface PageSkeletonProps {
  variant?: 'home' | 'grid' | 'detail' | 'page';
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ variant = 'page' }) => {
  if (variant === 'home') {
    return (
      <div className="animate-fade-up">
        <SkeletonHero />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-6 rounded-2xl" />
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-up">
        <Skeleton className="h-32 w-full mb-8 rounded-2xl bg-temple-gradient opacity-30" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-up space-y-6">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="card-premium p-6">
          <SkeletonText lines={5} />
        </div>
        <div className="card-premium p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <SkeletonText lines={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <Skeleton className="h-36 sm:h-44 w-full rounded-none" rounded="none" />
      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
        <SkeletonText lines={6} />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <SkeletonText lines={4} />
      </div>
    </div>
  );
};

export default PageSkeleton;

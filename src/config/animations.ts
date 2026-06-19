/**
 * Professional Animation Configuration
 * Optimized for both mobile and desktop
 * Respects user's motion preferences
 */

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Easing functions for consistent animations
 */
export const easings = {
  // Smooth, natural motion - for Framer-motion
  smooth: 'easeInOut' as const,
  // Quick and snappy
  snappy: 'easeOut' as const,
  // Gentle ease in/out
  gentle: 'easeInOut' as const,
  // Out back (slight overshoot)
  bounce: 'easeOut' as const,
};

/**
 * Animation timings for different purposes
 */
export const timings = {
  // Very fast interactions
  fast: 0.1,
  // Standard interactions
  standard: 0.15,
  // Page transitions
  page: 0.2,
  // Complex animations
  complex: 0.3,
};

/**
 * Variants for page transitions (fast, no stagger)
 */
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

/**
 * Variants for cards and items (viewport-based)
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  // Minimal animations for slow networks
  minimal: { opacity: 1, y: 0 },
};

/**
 * Transition configurations
 */
export const transitions = {
  // Page transitions
  page: {
    duration: timings.page,
    ease: easings.gentle,
  },
  // Standard interactions
  standard: {
    duration: timings.standard,
    ease: easings.smooth,
  },
  // Card/item animations
  item: {
    duration: 0.25,
    ease: easings.smooth,
  },
  // Reduce motion friendly
  reduced: {
    duration: 0.05,
    ease: easings.smooth,
  },
};

/**
 * Viewport animation settings
 * Optimized for performance
 */
export const viewportSettings = {
  once: true,
  amount: 0.1 as const, // Reduced from default for better performance
  margin: '-50px', // GPU-friendly viewport margin
};

/**
 * Get appropriate animation config based on device/network
 */
export const getAnimationConfig = () => {
  const reduced = prefersReducedMotion();
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (reduced) {
    return {
      duration: 0.05,
      ease: easings.smooth,
      stagger: 0,
      enabled: false,
    };
  }

  if (isMobile) {
    return {
      duration: timings.standard,
      ease: easings.smooth,
      stagger: 0, // No stagger on mobile
      enabled: true,
    };
  }

  // Desktop: full animations
  return {
    duration: timings.complex,
    ease: easings.smooth,
    stagger: 0.03,
    enabled: true,
  };
};

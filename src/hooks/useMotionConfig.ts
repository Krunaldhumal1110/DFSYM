import { useSlowNetwork } from './useSlowNetwork';

export function useMotionConfig() {
  const slow = useSlowNetwork();

  return {
    // Reduce animation durations on slow networks
    duration: slow ? 0.15 : 0.35,
    
    // Disable animations entirely on very slow networks
    skipAnimation: slow,
    
    // Conservative viewport margin for slow networks
    viewportMargin: slow ? '-100px' : '-40px',
    
    // Stagger delays
    staggerDelay: slow ? 0 : 0.05,
    
    // Animation variants for galleries
    itemVariants: slow ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    } : {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    },
  };
}

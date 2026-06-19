import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageVariants, transitions, prefersReducedMotion } from '../config/animations';

const PageTransition: React.FC = () => {
  const location = useLocation();
  const reduced = prefersReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: reduced ? 0.05 : transitions.page.duration,
          ease: transitions.page.ease,
        }}
        className="w-full"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

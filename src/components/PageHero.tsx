import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => (
  <section className="relative overflow-hidden bg-temple-gradient dark:bg-slate-900/80 text-white pt-20 pb-12 sm:py-24 px-4 sm:px-6">
    <img
  src="/assets/diwali_7_a-Photoroom.png"
  alt=""
  className="
    absolute

    bottom-[-120px]
    right-[-120px]

    md:bottom-[-100px]
    md:right-[-100px]

    lg:bottom-[-300px]
    lg:right-[-300px]

    w-[250px]
    md:w-[300px]
    lg:w-[600px]

    opacity-60
    pointer-events-none
    select-none
    z-0
  "
/>
    <div className="absolute inset-0 hero-glow pointer-events-none" />
    <div className="absolute inset-0 mandala-pattern opacity-40 pointer-events-none" />
        
    <motion.div
      className="container mx-auto text-center max-w-4xl relative z-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="inline-block w-16 h-0.5 bg-gold-400 dark:bg-slate-400 mb-4 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      />
      <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gold-50 dark:text-slate-100">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gold-100/90 dark:text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  </section>
);

export default PageHero;

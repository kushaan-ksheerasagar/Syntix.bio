'use client';

import React from 'react';
import { motion } from 'framer-motion';

const quote = "Biological Sovereignty is no longer a luxury. It is a human right.";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

export const AboutHero = () => {
  const letters = Array.from(quote);

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center bg-hero pt-24 overflow-hidden">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div 
          className="w-full max-w-4xl aspect-square rounded-full opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, rgba(0,0,0,0) 70%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-sm font-mono text-biomarker uppercase tracking-[0.3em] mb-8">The Biological Manifesto</h1>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl mb-12 flex flex-wrap justify-center"
        >
          {letters.map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              className={letter === " " ? "w-3 md:w-4" : ""}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="max-w-2xl mx-auto space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-medium"
        >
          <p>
            Nature is the most complex data structure in the universe. For decades, our genetic and biomarker history has been siloed, sold, and forgotten in 'data cemeteries.'
          </p>
          <p>
            <span className="text-white font-bold">SYNTIX is the awakening.</span> We are building the decentralized intelligence layer where your biological truth is encrypted, owned by you, and utilized to unlock a future of predictive, truly personalized care.
          </p>
          <p className="text-biomarker font-bold pt-4">
            We don't just secure data; we empower life.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

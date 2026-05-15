'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export const Hero = () => {
  const { scrollY } = useScroll();

  // Scroll interactions for the Neural Overlay
  const videoBlur = useTransform(scrollY, [0, 600], ['blur(0px)', 'blur(20px)']);
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0.1]);

  // Cyan light wave state
  const [wave, setWave] = useState(false);

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    setWave(true);
    setTimeout(() => setWave(false), 1500);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-hero pt-24 overflow-hidden">

      {/* Background Video / Neural Overlay */}
      <motion.div
        style={{ filter: videoBlur, opacity: videoOpacity }}
        className="absolute top-10 left-0 right-0 h-[70vh] flex justify-center items-center pointer-events-none z-0"
      >
        <div
          className="w-full h-full max-w-5xl mx-auto flex items-center justify-center"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover mix-blend-screen opacity-90"
          >
            <source src="/Video_SYNTIX.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ZKP Ticker Sync over the video */}
        <motion.div
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute font-mono text-[10px] md:text-xs text-biomarker top-[35%] md:right-[15%] right-[5%] border border-biomarker/30 bg-black/50 px-2 py-1 rounded backdrop-blur-sm"
        >
          {`<BLOCK_VERIFIED>`}
        </motion.div>
        <motion.div
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
          className="absolute font-mono text-[10px] md:text-xs text-indigo top-[55%] md:left-[20%] left-[5%] border border-indigo/30 bg-black/50 px-2 py-1 rounded backdrop-blur-sm"
        >
          [ZKP_CONFIRMED: 0x8f...]
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute font-mono text-[10px] text-gray-400 bottom-[25%] left-1/2 -translate-x-1/2"
        >
          _computing_proof
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center mt-auto mb-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
          Biology that speaks the <br />
          <br></br>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-biomarker to-indigo">language of Web3.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
          We turn 100+ clinical biomarkers and genetic signals into verifiable, privacy-preserving health insights.
        </p>

        {/* Connect Wallet Button with Cyan Wave Micro-interaction */}
        <div className="relative mb-8">
          <button
            onClick={handleConnect}
            className="relative z-10 font-mono text-sm uppercase tracking-widest text-hero bg-white hover:bg-gray-200 px-8 py-4 rounded-sm transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            Connect Wallet
          </button>

          <AnimatePresence>
            {wave && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-biomarker pointer-events-none"
                style={{
                  boxShadow: '0 0 40px 10px rgba(0, 229, 255, 0.5)',
                  backgroundColor: 'rgba(0, 229, 255, 0.1)'
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

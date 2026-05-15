'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('syntix_cookie_consent');
    if (!consent) {
      // Small delay to let the page load before showing the banner
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('syntix_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('syntix_cookie_consent', 'declined');
    setIsVisible(false);
  };

  const handleManage = () => {
    // In a real app, this would open a preferences modal.
    // For now, we'll just link to the privacy page.
    window.location.href = '/privacy';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none flex justify-center"
        >
          <div className="bg-[#050813]/95 backdrop-blur-xl border border-white/10 p-4 md:px-6 md:py-4 rounded-2xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-6 pointer-events-auto">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 12.5v.01"></path>
                  <path d="M12 16v.01"></path>
                </svg>
                <h3 className="text-white text-sm font-medium">Your Privacy Matters</h3>
              </div>
              <div className="text-gray-400 text-[11px] leading-snug space-y-1">
                <p>SYNTIX uses cookies and similar technologies to improve platform functionality, enhance security, analyze traffic, and personalize user experience.</p>
                <p className="text-gray-300 font-medium">We do not sell raw genomic data, and users retain control over how their biological information is accessed and used.</p>
                <p>
                  By continuing to use SYNTIX, you agree to our <a href="/privacy" className="text-[#00E5FF] hover:underline font-medium">Privacy Policy and Cookie Policy</a>.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
              <button
                onClick={handleManage}
                className="flex-1 sm:flex-none px-4 py-2 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 transition-colors"
              >
                Manage
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-5 py-2 bg-[#00E5FF] text-[#050813] text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.2)] whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

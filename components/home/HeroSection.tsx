'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, ArrowDown } from 'lucide-react';

export function HeroSection() {
  const headlineWords = 'Verify Indian Government PDF Signature Instantly'.split(' ');

  const trustBadges = [
    { icon: Lock, label: 'Files Never Stored', subtext: 'In-memory processing only' },
    { icon: Zap, label: 'Instant Verification', subtext: 'Results in 2-3 seconds' },
    { icon: ShieldCheck, label: 'CCA India Certified', subtext: 'RCAI root trust chain' },
  ];

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-background bg-dot-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary mb-6 shadow-2xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>Free Online Verification Tool • IT Act 2000 Compliant</span>
        </motion.div>

        {/* H1 Headline with word-by-word animation (80ms delay) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-[1.15] mb-6">
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              className={word === 'Signature' || word === 'Instantly' ? 'text-primary inline-block' : 'inline-block'}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h1>

        {/* Subheadline (fades in after H1 completes) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: headlineWords.length * 0.08 + 0.1,
            ease: 'easeOut',
          }}
          className="text-lg sm:text-xl text-text-main/80 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Fix the yellow{' '}
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-amber-100 text-amber-700 font-bold text-sm shadow-2xs mx-0.5">
            ❓
          </span>{' '}
          on your Aadhaar, community certificate, nativity, PAN card or DigiLocker PDF. Free, instant, your file never leaves your device.
        </motion.p>

        {/* Trust Badges Row (stagger in from bottom, 100ms each) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto mb-12">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: headlineWords.length * 0.08 + 0.3 + idx * 0.1,
                  ease: 'easeOut',
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-surface-darker/70 shadow-soft hover:border-primary/30 transition-all text-left"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-primary-light/80 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main leading-tight">
                    {badge.label}
                  </h4>
                  <p className="text-xs text-text-main/60 mt-0.5">
                    {badge.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll anchor indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="#upload-zone"
            className="group flex flex-col items-center gap-1.5 text-xs font-semibold text-text-main/60 hover:text-primary transition-colors focus:outline-none"
          >
            <span>Proceed to PDF Verification</span>
            <div className="h-8 w-8 rounded-full border border-surface-darker flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary-light transition-colors">
              <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

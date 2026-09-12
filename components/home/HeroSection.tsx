'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function HeroSection() {
  const { t, language } = useLanguage();
  const [counter, setCounter] = React.useState(421847);

  React.useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.verification_counter) {
          setCounter(parseInt(data.verification_counter, 10));
        } else if (data.count) {
          setCounter(data.count);
        }
      })
      .catch(() => {}); // fail silently, show default
  }, []);

  const trustBadges = [
    { icon: Lock, label: t.hero_badge_1 || t.hero.badge1Label, subtext: t.hero.badge1Subtext },
    { icon: Zap, label: t.hero_badge_2 || t.hero.badge2Label, subtext: t.hero.badge2Subtext },
    { icon: ShieldCheck, label: t.hero_badge_3 || t.hero.badge3Label, subtext: t.hero.badge3Subtext },
  ];

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-background bg-dot-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag with Live Real-time Counter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary mb-6 shadow-2xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono font-bold text-text-main">{counter.toLocaleString('en-IN')}</span>
          <span className="text-primary/90 font-medium">{t.hero_counter || 'PDFs verified and counting'}</span>
          <span className="hidden sm:inline text-primary/40">•</span>
          <span className="hidden sm:inline text-text-main/80 text-xs">{t.hero.tag}</span>
        </motion.div>

        {/* H1 Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-[1.18] mb-6">
          <span>{t.hero_title}</span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className="text-lg sm:text-xl text-text-main/80 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {t.hero_subtitle}
        </motion.p>

        {/* Trust Badges Row */}
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
                  delay: 0.25 + idx * 0.1,
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

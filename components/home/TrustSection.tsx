'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, Smartphone, CheckCircle, Award } from 'lucide-react';
import { TRUST_BADGES } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function TrustSection() {
  const { t, language } = useLanguage();
  const icons = [Lock, Zap, ShieldCheck, Smartphone];

  return (
    <section id="trust-section" className="py-20 bg-surface border-y border-surface-darker/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-surface-darker shadow-2xs">
            {t.trust.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-4 tracking-tight">
            {t.trust.heading}
          </h2>
          <p className="text-base sm:text-lg text-text-main/70 mt-3">
            {t.trust.subheading}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-surface-darker/80 shadow-soft hover:shadow-card hover:border-primary/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-text-main mb-2.5">
                    {badge.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-darker/60 flex items-center gap-1.5 text-[11px] font-semibold text-success">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Guarantee</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legal Authority Footnote */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white p-6 border border-surface-darker flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="h-12 w-12 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-main">
              Compliant with Section 5 of India&apos;s Information Technology Act 2000
            </h4>
            <p className="text-xs text-text-main/70 mt-0.5 leading-relaxed">
              Electronic records digitally signed through Certifying Authorities licensed by the Controller of Certifying Authorities (CCA) carry full evidentiary value in any Indian Court of Law.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

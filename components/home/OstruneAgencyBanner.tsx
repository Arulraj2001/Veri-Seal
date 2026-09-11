'use client';

import * as React from 'react';
import {
  ExternalLink,
  Sparkles,
  Zap,
  Gauge,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export function OstruneAgencyBanner() {
  return (
    <section className="py-12 bg-surface/50 border-b border-surface-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-white to-primary-light/30 border border-primary/25 p-7 sm:p-10 shadow-card hover:shadow-hover transition-all overflow-hidden">
          {/* Subtle Background Badge */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Featured Partner &amp; Agency Behind VeriSeal</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
                Looking to Build a High-Speed Web App or Scale Your SEO?
              </h3>

              <p className="text-sm sm:text-base text-text-main/75 leading-relaxed">
                VeriSeal was engineered with sub-second speeds, 100/100 Core Web Vitals, and sovereign-grade PKI security by{' '}
                <a
                  href="https://ostrune.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Ostrune Agency</span>
                  <ExternalLink className="w-3.5 h-3.5 inline" />
                </a>
                . We help ambitious founders and businesses build blazing-fast websites and dominate Google search rankings.
              </p>

              {/* Service Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-text-main/80">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Gauge className="w-4 h-4 text-primary shrink-0" />
                  <span>100/100 Speed Score</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dominant SEO Growth</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Next.js Architecture</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>&lt; 12h Reply SLA</span>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://ostrune.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-text-main hover:bg-black text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Visit Ostrune Agency</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://ostrune.netlify.app/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white hover:bg-surface text-text-main font-semibold text-xs border border-surface-darker transition-colors"
              >
                <span>Free Site Audit (Reply in 12h)</span>
                <ExternalLink className="w-3.5 h-3.5 text-text-main/60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

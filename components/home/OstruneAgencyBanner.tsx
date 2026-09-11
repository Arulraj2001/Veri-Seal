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
import { useLanguage } from '@/components/providers/LanguageProvider';

export function OstruneAgencyBanner() {
  const { language } = useLanguage();

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
                <span>{language === 'ta' ? 'வெரிசீல் பின்னால் உள்ள சிறப்பு பங்குதாரர்' : 'Featured Partner & Agency Behind VeriSeal'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
                {language === 'ta'
                  ? 'அதிவேக வலைத்தளம் உருவாக்க வேண்டுமா அல்லது கூகுள் SEO-வில் முதலிடம் பெற வேண்டுமா?'
                  : 'Looking to Build a High-Speed Web App or Scale Your SEO?'}
              </h3>

              <p className="text-sm sm:text-base text-text-main/75 leading-relaxed">
                {language === 'ta' ? (
                  <>
                    வெரிசீல் தளம் அதிவேக வேகம், 100/100 Core Web Vitals மற்றும் இந்திய அரசு PKI பாதுகாப்புடன்{' '}
                    <a
                      href="https://ostrune.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>ஆஸ்ட்ரூன் ஏஜென்சி (Ostrune Agency)</span>
                      <ExternalLink className="w-3.5 h-3.5 inline" />
                    </a>{' '}
                    மூலம் வடிவமைக்கப்பட்டது. அதிவேக வலைத்தளங்கள் உருவாக்கவும் கூகுள் தரவரிசையில் ஆதிக்கம் செலுத்தவும் உதவுகிறோம்.
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </p>

              {/* Service Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-text-main/80">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Gauge className="w-4 h-4 text-primary shrink-0" />
                  <span>{language === 'ta' ? '100/100 வேக மதிப்பீடு' : '100/100 Speed Score'}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ta' ? 'முதன்மையான SEO வளர்ச்சி' : 'Dominant SEO Growth'}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{language === 'ta' ? 'Next.js கட்டமைப்பு' : 'Next.js Architecture'}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-surface-darker/80 shadow-2xs">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{language === 'ta' ? '< 12 மணி நேர பதில்' : '< 12h Reply SLA'}</span>
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
                <span>{language === 'ta' ? 'ஆஸ்ட்ரூன் தளத்தை காண்க' : 'Visit Ostrune Agency'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://ostrune.netlify.app/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white hover:bg-surface text-text-main font-semibold text-xs border border-surface-darker transition-colors"
              >
                <span>{language === 'ta' ? 'இலவச தணிக்கை (12 மணி நேரத்தில்)' : 'Free Site Audit (Reply in 12h)'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-text-main/60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

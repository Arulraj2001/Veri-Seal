'use client';

import * as React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const AUTHORITIES = [
  { name: 'UIDAI e-Aadhaar', logo: '/logos/uidai.svg', height: 28 },
  { name: 'Emblem of India', logo: '/logos/emblem_of_india.svg', height: 32 },
  { name: 'TNPSC Exams', logo: '/logos/tnpsc.svg', height: 28 },
  { name: 'UPSC Recruitment', logo: '/logos/upsc.svg', height: 26 },
  { name: 'SSC Commission', logo: '/logos/ssc.svg', height: 26 },
  { name: 'Income Tax e-PAN', logo: '/logos/incometax.svg', height: 24 },
  { name: 'Parivahan Sarathi', logo: '/logos/parivahan.svg', height: 24 },
  { name: 'IBPS Banking', logo: '/logos/ibps.svg', height: 26 },
];

export function SovereignTrustBar() {
  const { language } = useLanguage();

  return (
    <section className="py-6 sm:py-7 bg-surface/40 border-y border-surface-darker/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Subtle Label */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {language === 'ta'
                  ? 'மத்திய அமைச்சகங்கள் & அரசு அமைப்புகளுக்கு இணக்கமானது'
                  : 'Engineered for India’s Sovereign Ministries & Recruitment Boards'}
              </span>
            </span>
          </div>

          {/* Logo Ribbon */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8 opacity-80 hover:opacity-100 transition-opacity">
            {AUTHORITIES.map((auth) => (
              <div
                key={auth.name}
                className="flex items-center gap-2 group transition-transform hover:scale-105"
                title={auth.name}
              >
                <div className="h-8 w-auto flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                  <img
                    src={auth.logo}
                    alt={auth.name}
                    className="max-h-7 max-w-[85px] object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-semibold text-text-main/70 group-hover:text-text-main transition-colors hidden sm:inline">
                  {auth.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

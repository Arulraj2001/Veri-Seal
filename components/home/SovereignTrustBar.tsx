'use client';

import * as React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileCheck, Award, Building2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const AUTHORITIES = [
  { name: 'UIDAI e-Aadhaar', category: 'Central Govt', desc: 'UIDAI e-Sign & QR verification' },
  { name: 'Tamil Nadu TNeGA', category: 'State Portal', desc: 'Community, Nativity & Income certs' },
  { name: 'MeeSeva AP & TS', category: 'State Portal', desc: 'Revenue, Caste & Residence certs' },
  { name: 'Seva Sindhu KA', category: 'State Portal', desc: 'Karnataka revenue & caste seals' },
  { name: 'DigiLocker MeitY', category: 'Central Govt', desc: 'All DigiLocker issued documents' },
  { name: 'Income Tax e-PAN', category: 'Central Govt', desc: 'Protean & UTIITSL DSC validation' },
  { name: 'TRACES Form 16', category: 'Central Govt', desc: 'Employer TDS certificate signatures' },
  { name: 'e-District Kerala', category: 'State Portal', desc: 'Akshaya & Sevana civil certificates' },
];

export function SovereignTrustBar() {
  const { language } = useLanguage();

  return (
    <section className="py-6 bg-surface/70 border-b border-border/60">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left Title Label */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-text-main flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'அங்கீகரிக்கப்பட்ட அரசு அமைப்புகள்' : 'Supported Government Authorities'}</span>
            </span>
          </div>

          {/* Scrolling / Flex Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5">
            {AUTHORITIES.map((auth, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-surface-darker/80 shadow-2xs hover:border-primary/40 transition-all text-xs"
                title={auth.desc}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-text-main">{auth.name}</span>
                <span className="text-[10px] text-text-muted px-1.5 py-0.2 rounded bg-muted">
                  {auth.category}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

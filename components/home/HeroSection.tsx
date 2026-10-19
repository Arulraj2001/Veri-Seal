'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { HomeHeroSearch } from '@/components/home/HomeHeroSearch';
import { CertificateVerificationHeroVisual } from '@/components/home/CertificateVerificationHeroVisual';

interface HeroSectionProps {
  hideDecisionEngines?: boolean;
  children?: React.ReactNode;
}

export function HeroSection({ hideDecisionEngines = true, children }: HeroSectionProps) {
  const { t, language } = useLanguage();
  const [counter, setCounter] = React.useState(421848);

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
      .catch(() => {});
  }, []);

  const quickHotPills = [
    { label: 'Fix Yellow "?" PDF', href: '/verify', isHighlight: true },
    { label: 'TNPSC/UPSC Photo Kit', href: '/tools/tnpsc-combo-pack' },
    { label: 'Cyber Café 4x6" Sheet', href: '/tools/passport-photo-sheet-maker' },
    { label: 'Compress PDF <200KB', href: '/tools/compress-pdf-to-200kb' },
    { label: 'Mask Aadhaar', href: '/tools/mask-aadhaar' },
    { label: 'A4 5-in-1 ID Sheet', href: '/tools/a4-multi-card-sheet' },
  ];

  return (
    <section id="hero" className="relative pt-24 pb-10 md:pt-28 md:pb-14 overflow-hidden bg-background bg-dot-grid border-b border-border/50">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Value Proposition & Direct Portals */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-5 text-left">
            {/* Top Live Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs font-semibold text-primary shadow-2xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono font-bold text-text-main">{counter.toLocaleString('en-IN')}</span>
              <span className="text-primary/90 font-medium">
                {language === 'ta' ? 'சரிபார்க்கப்பட்ட ஆவணங்கள்' : 'Certificates Verified'}
              </span>
              <span className="text-primary/40">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% In-Browser RAM</span>
              </span>
            </motion.div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main tracking-tight leading-[1.12]">
              {language === 'ta' ? (
                <>
                  அரசு PDF டிஜிட்டல் கையொப்பங்களை{' '}
                  <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    சரிபார்த்து பச்சை டிக்
                  </span>{' '}
                  பெறவும்
                </>
              ) : (
                <>
                  Verify Indian Government PDF Signatures &amp; Fix{' '}
                  <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Yellow &quot;?&quot; Mark
                  </span>{' '}
                  Online Free
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-text-main/75 leading-relaxed font-normal">
              {language === 'ta'
                ? 'இ-ஆதார், சாதிச் சான்றிதழ், வருமானச் சான்றிதழ், பான் கார்டு மற்றும் டிஜிலாக்கர் PDF கோப்புகளை உடனடியாக சரிபார்க்கவும். 100% இலவசம், கோப்புகள் சர்வரில் சேமிக்கப்படாது.'
                : 'Instantly validate digital signatures on e-Aadhaar, Community Certificate, Nativity, Income, PAN card & DigiLocker PDFs with official CCA India Root (RCAI) cryptographic green tick. Zero server uploads — 100% private in browser RAM.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>{language === 'ta' ? 'சான்றிதழ் கையொப்பத்தை சரிபார்க்கவும்' : 'Verify Document Signatures'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#tools-matrix"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-surface text-text-main border border-surface-darker hover:border-primary/40 font-bold text-sm shadow-2xs transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{language === 'ta' ? 'அனைத்து இலவச கருவிகள் (57+)' : 'Explore 57+ Free Tools'}</span>
              </a>
            </div>

            {/* 3 Core Trust Reassurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-[11px] font-bold text-text-main leading-tight">
                  <div>100% RAM Privacy</div>
                  <div className="text-[10px] text-text-muted font-normal">DPDP Act Compliant</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <div className="text-[11px] font-bold text-text-main leading-tight">
                  <div>CCA India RCAI</div>
                  <div className="text-[10px] text-text-muted font-normal">IT Act 2000 Sec 5</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-surface-darker/80 shadow-2xs">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="text-[11px] font-bold text-text-main leading-tight">
                  <div>Instant Green Tick</div>
                  <div className="text-[10px] text-text-muted font-normal">Permanent LTV PDF</div>
                </div>
              </div>
            </div>

            {/* Fast Command Search */}
            <div className="pt-1">
              <HomeHeroSearch />
            </div>

            {/* Quick Intent Hot-Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                {language === 'ta' ? 'விரைவு சேவைகள்:' : 'Popular Workspaces & Tools:'}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {quickHotPills.map((pill) => (
                  <Link
                    key={pill.label}
                    href={pill.href}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      pill.isHighlight
                        ? 'bg-primary text-white border-primary shadow-xs hover:bg-primary-hover'
                        : 'bg-white hover:bg-surface text-text-main border-surface-darker hover:border-primary/40 shadow-2xs'
                    }`}
                  >
                    {pill.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Certificate Verification Showcase */}
          <div className="lg:col-span-5 xl:col-span-6 w-full">
            {children || <CertificateVerificationHeroVisual />}
          </div>

        </div>
      </div>
    </section>
  );
}

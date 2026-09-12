'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Zap, ShieldCheck, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { HomeHeroSearch } from '@/components/home/HomeHeroSearch';

export function HeroSection() {
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
      .catch(() => {}); // fail silently, show default
  }, []);

  const scrollToVerify = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('verify-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustBadges = [
    {
      icon: Lock,
      label: language === 'ta' ? '100% நினைவக செயலாக்கம்' : '100% In-Memory RAM',
      subtext: language === 'ta' ? 'சர்வரில் கோப்புகள் சேமிக்கப்படாது' : 'Zero server storage · Instant wipe',
    },
    {
      icon: ShieldCheck,
      label: language === 'ta' ? 'இந்திய CCA அங்கீகாரம்' : 'CCA India RCAI Aligned',
      subtext: language === 'ta' ? 'தகவல் தொழில்நுட்ப சட்டம் 2000' : 'IT Act 2000 Section 5 compliant',
    },
    {
      icon: Zap,
      label: language === 'ta' ? 'எப்போதும் இலவசம்' : 'Zero Friction & Always Free',
      subtext: language === 'ta' ? 'பதிவு, உள்நுழைவு, விளம்பரங்கள் இல்லை' : 'No signups · No ads · Instant tools',
    },
  ];

  const quickHotPills = [
    { label: '⚡ Fix Signature ?', href: '#verify-engine', isAnchor: true, isHighlight: true },
    { label: 'UPSC 200KB PDF', href: '/tools/compress-pdf-to-200kb', isAnchor: false },
    { label: 'TNPSC OTR Kit', href: '/tools/tnpsc-otr-compliance-kit', isAnchor: false },
    { label: 'IBPS Declaration', href: '/tools/handwritten-declaration-scanner', isAnchor: false },
    { label: 'A4 5-in-1 Sheet', href: '/tools/a4-multi-card-sheet', isAnchor: false },
    { label: 'Mask Aadhaar', href: '/tools/mask-aadhaar', isAnchor: false },
    { label: '🏡 Home Cost OS', href: '/home-cost', isAnchor: false },
    { label: 'Vehicle OS', href: '/vehicle-os', isAnchor: false },
  ];

  return (
    <section id="hero" className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden bg-background bg-dot-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary/90 font-medium">
            {language === 'ta' ? 'சரிபார்க்கப்பட்ட ஆவணங்கள்' : 'Documents Processed'}
          </span>
          <span className="hidden sm:inline text-primary/40">•</span>
          <span className="hidden sm:inline text-text-main/80 text-xs">
            {language === 'ta' ? '56 இலவச அரசு கருவிகள்' : '56 Free Sovereign Tools'}
          </span>
        </motion.div>

        {/* H1 Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-text-main tracking-tight leading-[1.15] mb-5">
          {language === 'ta' ? (
            <>
              இந்தியாவின் முதன்மையான{' '}
              <span className="text-primary">அரசு ஆவண, தேர்வு</span> &amp; குடிமக்கள் சேவை தளம்
            </>
          ) : (
            <>
              India&apos;s Sovereign <span className="text-primary">Document, Exam Portal</span> &amp; Citizen Suite
            </>
          )}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-text-main/80 max-w-3xl mx-auto mb-6 leading-relaxed font-normal"
        >
          {language === 'ta'
            ? 'அரசு PDF மஞ்சள் கேள்விக்குறியை சரிசெய்தல், UPSC/TNPSC தேர்வு புகைப்பட அளவை மாற்றுதல், A4 5-இன்-1 அட்டை தயாரிப்பு, மற்றும் கட்டுமான செலவு கணக்கீடுகள். 100% இலவசம், பாதுகாப்பானது.'
            : 'Fix government PDF signature yellow "?" marks, format zero-rejection exam photos for UPSC & TNPSC, print 5-in-1 A4 gang sheets, mask Aadhaar, and calculate home construction costs in browser RAM.'}
        </motion.p>

        {/* Command Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <HomeHeroSearch />
        </motion.div>

        {/* Quick Intent Hot-Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-bold text-text-main/50 uppercase tracking-wider mr-1">
            {language === 'ta' ? 'விரைவு தேர்வுகள்:' : 'Direct Portals:'}
          </span>
          {quickHotPills.map((pill) => {
            if (pill.isAnchor) {
              return (
                <a
                  key={pill.label}
                  href={pill.href}
                  onClick={scrollToVerify}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    pill.isHighlight
                      ? 'bg-primary text-white border-primary shadow-xs hover:bg-primary/90'
                      : 'bg-white hover:bg-surface text-text-main border-surface-darker/80 hover:border-primary/40'
                  }`}
                >
                  {pill.label}
                </a>
              );
            }
            return (
              <Link
                key={pill.label}
                href={pill.href}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-surface text-text-main border border-surface-darker/80 hover:border-primary/40 transition-all shadow-2xs hover:shadow-xs"
              >
                {pill.label}
              </Link>
            );
          })}
        </motion.div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto mb-10">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 + idx * 0.08 }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-surface-darker/80 shadow-soft hover:border-primary/30 transition-all text-left"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-primary-light/80 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-main leading-tight">
                    {badge.label}
                  </h4>
                  <p className="text-[11px] text-text-main/60 mt-0.5 leading-snug">
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
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex justify-center"
        >
          <a
            href="#verify-engine"
            onClick={scrollToVerify}
            className="group flex flex-col items-center gap-1.5 text-xs font-semibold text-text-main/60 hover:text-primary transition-colors focus:outline-none"
          >
            <span>Instant PDF Signature Verification Engine Below</span>
            <div className="h-8 w-8 rounded-full border border-surface-darker flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary-light transition-colors">
              <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

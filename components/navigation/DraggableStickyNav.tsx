'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { usePathname, useRouter } from 'next/navigation';

export function DraggableStickyNav() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render inside admin dashboards
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  // 3 items requested (How it works removed from sticky as it is in top nav)
  const navItems = [
    {
      id: 'supported-docs',
      label: t.nav.documents,
      desc: language === 'ta' ? 'அனைத்து அரசு ஆவணங்கள்' : 'Central & State PDFs',
      icon: FileText,
      badge: 'PDFs',
    },
    {
      id: 'trust-section',
      label: t.nav.security,
      desc: language === 'ta' ? '100% நினைவக பாதுகாப்பு' : 'RAM Privacy & RCAI',
      icon: ShieldCheck,
      badge: '100% RAM',
    },
    {
      id: 'faq-section',
      label: t.nav.faq,
      desc: language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Questions & Answers',
      icon: HelpCircle,
      badge: 'Q&A',
    },
  ];

  const handleScrollTo = (sectionId: string) => {
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <aside
      aria-label="Quick Page Navigation"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none items-center"
    >
      {/* 1. Attached Vertical Tab (Visible on left edge when closed) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-r-2xl bg-white border-y border-r border-surface-darker/90 hover:border-primary/40 shadow-card hover:shadow-hover text-text-main transition-all cursor-pointer overflow-hidden"
        title={isOpen ? 'Collapse' : 'Hover to Open Navigation'}
        animate={{
          borderRightColor: isOpen ? '#E6570B' : '#E5E2E0',
        }}
      >
        {/* Left vertical primary accent strip */}
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-1.5 transition-all" />

        <div className="h-7 w-7 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Layers className="w-4 h-4" />
        </div>

        {/* Vertical text label matching website typography */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-text-main/80 group-hover:text-primary [writing-mode:vertical-rl] rotate-180 py-1 font-sans">
          {language === 'ta' ? 'வழிகாட்டி' : 'Index'}
        </span>

        <ChevronRight
          className={`w-3.5 h-3.5 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'group-hover:translate-x-0.5'
          }`}
        />
      </motion.button>

      {/* 2. Slide-out Navigation Drawer (Opens on hover) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-72 sm:w-80 ml-1.5 rounded-3xl bg-white border border-surface-darker/90 shadow-2xl p-4 text-text-main backdrop-blur-md ring-1 ring-black/5"
          >
            {/* Header with VeriSeal Brand Theme */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-darker/70">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-text-main flex items-center gap-1 leading-none">
                    Veri<span className="text-primary">Seal</span>
                    <span className="text-text-main/50 font-semibold">• Quick Index</span>
                  </span>
                  <span className="text-[10px] text-text-main/60 block mt-0.5 font-medium">
                    {language === 'ta' ? 'விரைவு வழிசெலுத்தல்' : 'Page Navigation'}
                  </span>
                </div>
              </div>

              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Navigation Items: Documents, Security, FAQ */}
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleScrollTo(item.id);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-surface/40 hover:bg-primary-light/40 border border-surface-darker/60 hover:border-primary/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white border border-surface-darker/70 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-text-main group-hover:text-primary transition-colors flex items-center gap-1">
                          <span>{item.label}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-text-main/60 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white border border-surface-darker/70 text-text-main/70 group-hover:text-primary group-hover:border-primary/30 font-mono tracking-wider">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer indicator */}
            <div className="mt-3 pt-2.5 border-t border-surface-darker/60 flex items-center justify-between text-[10px] text-text-main/50 font-medium">
              <span>Hover away to collapse</span>
              <span className="text-primary font-bold">VeriSeal</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

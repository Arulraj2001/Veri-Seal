'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Cpu, 
  ShieldCheck, 
  HelpCircle, 
  GripVertical, 
  Pin, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { usePathname, useRouter } from 'next/navigation';

export function DraggableStickyNav() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isMinimized, setIsMinimized] = React.useState(false);
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

  const navItems = [
    {
      id: 'supported-docs',
      label: t.nav.documents,
      icon: FileText,
      badge: 'PDF',
      color: 'text-amber-700 dark:text-amber-400',
    },
    {
      id: 'how-it-works',
      label: t.nav.howItWorks,
      icon: Cpu,
      badge: '3 Steps',
      color: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      id: 'trust-section',
      label: t.nav.security,
      icon: ShieldCheck,
      badge: 'RAM',
      color: 'text-blue-700 dark:text-blue-400',
    },
    {
      id: 'faq-section',
      label: t.nav.faq,
      icon: HelpCircle,
      badge: 'Q&A',
      color: 'text-purple-700 dark:text-purple-400',
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
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.03, cursor: 'grabbing', zIndex: 60 }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed left-3 sm:left-6 top-36 z-40 select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Sticky Tab */
          <motion.div
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="group flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#FFFBE6] dark:bg-[#252212] border-2 border-[#F6E05E]/80 dark:border-[#744210] shadow-xl hover:shadow-2xl cursor-pointer hover:bg-[#FEFCBF] transition-all"
            title={t.common.expand}
          >
            <Pin className="w-4 h-4 text-amber-600 fill-amber-500 animate-bounce" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
              {t.common.quickNav}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
          </motion.div>
        ) : (
          /* Full Sticky Note */
          <motion.div
            key="full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-64 sm:w-68 rounded-2xl bg-gradient-to-br from-[#FFFDF0] via-[#FFF9D6] to-[#FFF4B8] dark:from-[#252110] dark:via-[#201C0D] dark:to-[#171407] border border-[#F3E17D] dark:border-[#634E14] shadow-2xl shadow-amber-950/20 backdrop-blur-md p-3.5 text-amber-950 dark:text-amber-100 ring-1 ring-black/5 rotate-[-0.5deg] hover:rotate-0 transition-transform"
          >
            {/* Top Pin & Drag Handle Bar */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-amber-300/40 dark:border-amber-800/40 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 flex items-center justify-center text-amber-700 dark:text-amber-300 shadow-2xs">
                  <Pin className="w-3.5 h-3.5 fill-amber-600 stroke-amber-700 rotate-45" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-tight text-amber-950 dark:text-amber-100 flex items-center gap-1 leading-none">
                    {t.common.quickNav}
                  </span>
                  <span className="text-[10px] text-amber-800/70 dark:text-amber-400/70 font-medium leading-none mt-0.5">
                    {t.common.dragMe}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="h-6 w-6 rounded-lg hover:bg-amber-200/60 dark:hover:bg-amber-800/60 flex items-center justify-center text-amber-800 dark:text-amber-300 transition-colors"
                  title={t.common.minimize}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {/* Visual Drag Handle */}
                <div className="text-amber-600/60 hover:text-amber-700">
                  <GripVertical className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScrollTo(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/70 dark:bg-black/25 hover:bg-white dark:hover:bg-black/40 border border-amber-200/60 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-600 transition-all text-left group shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg bg-amber-100/80 dark:bg-amber-950/80 ${item.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-amber-950 dark:text-amber-100 group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-amber-100/90 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-mono tracking-wider">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sticky note bottom tape / fold accent */}
            <div className="mt-2.5 pt-2 border-t border-amber-300/30 dark:border-amber-800/30 flex items-center justify-between text-[10px] text-amber-800/70 dark:text-amber-400/70">
              <span className="font-semibold">VeriSeal Sticky Note</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

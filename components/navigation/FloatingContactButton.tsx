'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Headphones, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function FloatingContactButton() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide when already on /contact or inside admin portal
  if (pathname === '/contact' || pathname?.startsWith('/admin')) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <Link
        href="/contact"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center"
      >
        {/* Animated Beacon Ring */}
        <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping opacity-75 pointer-events-none" />

        {/* Hover Expandable Pill / Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-3 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-text-main text-white text-xs font-bold shadow-2xl whitespace-nowrap pointer-events-none"
            >
              <span>{t.contactFloating.tooltip}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-primary-light" />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-text-main rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-gradient-to-tr from-primary to-primary-hover text-white flex items-center justify-center shadow-xl hover:shadow-2xl border-2 border-white/80 dark:border-surface-darker transition-all"
        >
          <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />

          {/* Active Support Status Indicator */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        </motion.div>
      </Link>
    </div>
  );
}

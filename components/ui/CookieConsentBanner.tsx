'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem('kagazo_cookie_consent');
      if (!consent) {
        // Small delay to prevent layout pop on immediate page load
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('kagazo_cookie_consent', 'accepted');
    } catch {}
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('kagazo_cookie_consent', 'declined');
    } catch {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        aria-label="Cookie and Privacy Consent"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-surface-darker/90 shadow-2xl text-text-main"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="space-y-1.5 text-xs text-left">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-extrabold text-text-main text-sm">
                Cookie &amp; Privacy Notice
              </h4>
              <button
                type="button"
                onClick={handleDecline}
                className="text-text-muted hover:text-text-main p-1 -mr-1"
                aria-label="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-text-main/75 leading-relaxed text-[11px] sm:text-xs">
              We use essential cookies to maintain your session preferences and comply with the{' '}
              <strong>DPDP Act 2023</strong>. Third-party partners (such as Google AdSense) may place cookies to serve non-intrusive ads that keep our sovereign tools 100% free. Files are never stored.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="primary"
                onClick={handleAccept}
                className="h-8 text-xs font-bold px-3.5 rounded-xl shadow-xs"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Accept</span>
              </Button>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleDecline}
                className="h-8 text-xs text-text-muted hover:text-text-main px-2.5 rounded-xl"
              >
                <span>Preferences</span>
              </Button>

              <Link
                href="/cookies"
                className="text-[11px] text-primary hover:underline font-semibold ml-auto"
              >
                Read Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

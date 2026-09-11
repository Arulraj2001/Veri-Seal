'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Download, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPromptModal() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem('veriseal_pwa_dismissed');
    if (isDismissed) return;

    // Check verification count from localStorage
    const count = parseInt(localStorage.getItem('veriseal_guest_count') || '0', 10);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Trigger prompt on mobile after 3rd verification attempt
      if (count >= 3) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Service worker management:
    // ALWAYS unregister service workers on localhost/development to prevent poisoned webpack chunks
    if ('serviceWorker' in navigator) {
      const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.includes('.local'));

      if (isLocalhost || process.env.NODE_ENV !== 'production') {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) {
            reg.unregister();
          }
        });
        if ('caches' in window) {
          caches.keys().then((keys) => {
            for (const key of keys) {
              caches.delete(key);
            }
          });
        }
      } else {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.debug('ServiceWorker registration skipped:', err);
        });
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('veriseal_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white rounded-3xl border-2 border-primary/20 shadow-2xl p-5"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Faster Access</span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-text-main">
              Install VeriSeal App
            </h4>
            <p className="text-xs text-text-main/70 mt-1 leading-relaxed">
              Verify Indian government PDF signatures instantly from your home screen with zero install wait.
            </p>

            <div className="mt-3.5 flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleInstallClick}
                className="text-xs font-bold gap-1.5 py-1.5 px-4 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Home Screen</span>
              </Button>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs font-semibold text-text-main/60 hover:text-text-main px-2.5 py-1.5"
              >
                Maybe Later
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="text-text-main/40 hover:text-text-main p-1 rounded-lg"
            aria-label="Close install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

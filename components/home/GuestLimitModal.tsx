'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  ArrowRight,
  LogIn,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuestLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  freeLimit?: number;
  onViewPlans?: () => void;
}

export function GuestLimitModal({
  isOpen,
  onClose,
  freeLimit = 3,
  onViewPlans,
}: GuestLimitModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-surface-darker/80 overflow-hidden z-10"
        >
          {/* Top Banner with Accent */}
          <div className="bg-gradient-to-r from-primary to-amber-600 p-6 sm:p-7 text-white relative overflow-hidden">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-white/20 text-white backdrop-blur-md mb-3 border border-white/30">
              <Lock className="w-3.5 h-3.5" />
              <span>Daily Free Limit Reached</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              You&apos;ve used all {freeLimit} free guest verifications today
            </h3>

            <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
              Without an account, guest users can verify up to {freeLimit} documents per 24 hours. Sign in to your account to continue verifying and upgrade for unlimited access.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* Value Highlights */}
            <div className="rounded-2xl bg-surface/50 border border-surface-darker p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-main/70">
                Why Sign In with VeriSeal?
              </h4>

              <div className="space-y-2 text-xs sm:text-sm text-text-main/90">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>
                    <strong>Private Audit Trail:</strong> Access your verified certificate history anytime from your dashboard.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>
                    <strong>Seamless Pro Upgrade:</strong> Upgrade via UPI (₹199 one-time/month) for 100% unlimited validations.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Free Signup:</strong> Takes less than 10 seconds using your Google account or email.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <Link
                href="/login?callbackUrl=/#upload-zone"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-sm shadow-md hover:shadow-lg transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign Up / Sign In to Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {onViewPlans && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewPlans();
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-surface text-text-main font-bold text-xs border border-surface-darker transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>View Pro &amp; Business Pricing Plans</span>
                </button>
              )}
            </div>

            {/* Footer Note */}
            <p className="text-[11px] text-center text-text-main/60">
              Your free quota resets daily at midnight (12:00 AM IST).
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

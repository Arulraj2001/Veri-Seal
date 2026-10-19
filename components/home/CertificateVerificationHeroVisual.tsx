'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
  Check,
} from 'lucide-react';

export function CertificateVerificationHeroVisual() {
  const [activeMode, setActiveMode] = React.useState<'verified' | 'unverified'>('verified');

  return (
    <div className="relative w-full select-none">
      {/* Segmented Mode Switcher */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Cryptographic Simulation
        </span>
        <div className="inline-flex items-center p-1 rounded-2xl bg-surface border border-surface-darker/90 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveMode('unverified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'unverified'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Before: Yellow &quot;?&quot;
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('verified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'verified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            After: Green &quot;✔&quot; Tick
          </button>
        </div>
      </div>

      {/* Main Visual Showcase Frame */}
      <div className="relative rounded-3xl bg-white border border-surface-darker/90 shadow-2xl overflow-hidden group">
        
        {/* Top Flag Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

        {/* Real High-Resolution Photorealistic Certificate Graphic */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950">
          <Image
            src="/images/hero-certificate.jpg"
            alt="Government of India Digital Certificate Verification"
            fill
            priority
            className={`object-cover transition-all duration-500 ${
              activeMode === 'unverified' ? 'grayscale-[50%] blur-[1px]' : 'scale-100'
            }`}
          />

          {/* Interactive State Overlay */}
          <AnimatePresence mode="wait">
            {activeMode === 'unverified' ? (
              <motion.div
                key="unverified-overlay"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs p-5 sm:p-6 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                    Counter Rejection Risk
                  </span>
                  <span className="text-xs font-mono text-amber-300">
                    Adobe Default Root Store
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-100 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shrink-0">
                      ?
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Validity Unknown · Signer Not Trusted
                      </div>
                      <div className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">
                        Default PDF viewers lack India&apos;s CCA Root (RCAI). Bank and government counters reject this PDF demanding physical ink seals.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>Signer: Revenue Authority</span>
                  <span className="text-rose-400 font-bold">Untrusted Local Store</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verified-overlay"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-emerald-500/40 text-white shadow-xl flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                      <span>Cryptographically Validated</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        LTV DSS
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      CCA India RCAI Hierarchy Embedded · Valid in All Courts &amp; Banks
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-right font-mono text-[10px] text-emerald-400 shrink-0">
                  <div>SHA-256 / RSA-2048</div>
                  <div className="text-slate-400">IT Act 2000 § 5</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-surface-darker/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% In-Browser RAM · Zero File Storage Guarantee</span>
          </div>

          <Link
            href="/verify"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all shrink-0"
          >
            <span>Verify Document Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
  Zap,
  Check,
  FileCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export function CertificateVerificationHeroVisual() {
  const [activeMode, setActiveMode] = React.useState<'verified' | 'unverified'>('verified');

  return (
    <div className="relative w-full select-none">
      {/* Interactive Toggle Pill on Top */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Certificate Simulator</span>
        </div>

        {/* Toggle Buttons */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-surface border border-surface-darker/90 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveMode('unverified')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'verified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            After: Green &quot;✔&quot; Tick
          </button>
        </div>
      </div>

      {/* Main Certificate Glass Container */}
      <div className="relative rounded-3xl bg-white border-2 border-surface-darker/90 shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Top Official Tri-Color Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

        {/* Certificate Header Section */}
        <div className="p-5 sm:p-6 pb-4 border-b border-surface-darker/70 bg-surface/30">
          <div className="flex items-start justify-between gap-4">
            {/* Government Emblem & Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 shrink-0 flex items-center justify-center p-1 bg-white rounded-xl border border-surface-darker shadow-2xs">
                {/* Ashoka Emblem Vector representation */}
                <img
                  src="/logos/emblem_of_india.svg"
                  alt="Government of India Emblem"
                  className="w-10 h-12 object-contain"
                  loading="eager"
                />
              </div>
              <div className="text-left space-y-0.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  GOVERNMENT OF TAMIL NADU · REVENUE DEPARTMENT
                </div>
                <div className="text-sm sm:text-base font-extrabold text-text-main leading-tight">
                  COMMUNITY &amp; CITIZENSHIP CERTIFICATE
                </div>
                <div className="text-[11px] font-mono font-medium text-text-muted">
                  Doc Ref: <span className="font-bold text-text-main">TN-REV-2026-984218</span>
                </div>
              </div>
            </div>

            {/* QR Code & Barcode Stamp */}
            <div className="hidden sm:flex flex-col items-end shrink-0">
              <div className="w-11 h-11 bg-surface-darker/30 border border-surface-darker rounded-xl p-1 flex items-center justify-center">
                <div className="w-9 h-9 border border-text-main/30 rounded grid grid-cols-3 gap-0.5 p-0.5">
                  <div className="bg-text-main/80 rounded-xs"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-text-main/80 rounded-xs"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-text-main/80 rounded-xs"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-text-main/80 rounded-xs"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-text-main/80 rounded-xs"></div>
                </div>
              </div>
              <span className="text-[9px] font-mono text-text-muted mt-1">CCA VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Certificate Body Meta Fields */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-surface/50 border border-surface-darker/60 font-medium">
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider block font-bold">Applicant</span>
              <span className="font-bold text-text-main text-xs">R. Arun Kumar</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider block font-bold">Category</span>
              <span className="font-bold text-text-main text-xs">BC (Backward Class)</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-text-muted uppercase tracking-wider block font-bold">Issuing Authority</span>
              <span className="font-bold text-text-main text-xs">Tahsildar, Chennai</span>
            </div>
          </div>

          {/* THE SIGNATURE AUDIT BOX (THE CORE BEFORE / AFTER PROOF) */}
          <AnimatePresence mode="wait">
            {activeMode === 'unverified' ? (
              <motion.div
                key="unverified"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-2.5 relative overflow-hidden"
              >
                {/* Yellow Question Mark Simulation */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
                    ?
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-extrabold text-amber-950 text-xs sm:text-sm">
                        Validity Unknown · Signer Not Trusted
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 shrink-0">
                        Counter Rejected
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900/80 mt-1 leading-relaxed">
                      &quot;Adobe Acrobat on Windows/Mac does not bundle India&apos;s RCAI Root. Counters reject this document demanding physical officer seals.&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] font-bold text-amber-800">
                  <span>Signer: Digitally Signed by Tahsildar</span>
                  <span className="text-rose-600">Untrusted Local Store</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-emerald-50/95 border-2 border-emerald-500 shadow-md space-y-2.5 relative overflow-hidden ring-2 ring-emerald-500/20"
              >
                {/* Green Checkmark Validated Simulation */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-black text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5 flex-wrap">
                        <span>Signature Valid · RCAI Embedded</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold">
                          LTV DSS
                        </span>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        100% Accepted
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-900/80 mt-1 leading-relaxed">
                      &quot;Cryptographically validated via CCA India Licensed CA (eMudhra / NIC). Permanent green tick recognized in banks, courts &amp; portals.&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                  <span>Audit: SHA-256 Validated · IT Act Sec 5</span>
                  <span className="text-emerald-700">Permanent LTV Copy</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action CTA Bar Directly on the Mockup */}
          <div className="pt-1">
            <Link
              href="/verify"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Verify Your PDF Document Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-text-muted font-medium">
              <span>✓ Free for Citizens</span>
              <span>•</span>
              <span>✓ 100% In-Browser RAM</span>
              <span>•</span>
              <span>✓ Zero Server Uploads</span>
            </div>
          </div>
        </div>

        {/* Ambient Subtle Badge Indicator */}
        <div className="px-6 py-2.5 bg-surface/70 border-t border-surface-darker/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
          <span>Security Standard: ISO 32000-1 PAdES</span>
          <span className="text-emerald-700 font-bold">CCA India Root RCAI</span>
        </div>
      </div>

      {/* Floating Micro-Badges around Visual */}
      <div className="hidden lg:flex items-center gap-2 absolute -bottom-4 -left-4 p-2.5 rounded-2xl bg-white border border-surface-darker/90 shadow-lg text-[11px] font-bold text-text-main">
        <Lock className="w-3.5 h-3.5 text-emerald-600" />
        <span>100% Private in RAM</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 absolute -top-3 -right-3 p-2.5 rounded-2xl bg-white border border-surface-darker/90 shadow-lg text-[11px] font-bold text-emerald-800">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>0.4s Verification Speed</span>
      </div>
    </div>
  );
}

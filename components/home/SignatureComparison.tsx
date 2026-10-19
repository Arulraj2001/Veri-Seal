'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
  FileCheck,
  Check,
  X,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function SignatureComparison() {
  const { language } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-surface/50 border-y border-surface-darker/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: The Problem & Legal Context */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 inline-flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The Technical &amp; Legal Truth</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-text-main tracking-tight leading-tight">
              Why Do Government &amp; Bank Counters Reject Your PDF?
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Standard PDF viewers on Windows, Mac, and Android come pre-installed with American and European root certificate authorities. India&apos;s Root Certifying Authority (RCAI) is not included by default.
            </p>

            <p className="text-sm text-text-muted leading-relaxed">
              When an official opens your e-Aadhaar or revenue certificate, their viewer shows an alarming yellow question mark. Counter staff assume the document is forged and demand physical visits to revenue offices.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-xs sm:text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Section 5, IT Act 2000:</span> Digitally signed records validated under CCA India carry the same legal weight as ink signatures.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-xs sm:text-sm text-text-main leading-relaxed">
                  <span className="font-bold">Permanent LTV Embedding:</span> Kagazo embeds cryptographic proof into the PDF so it displays a green checkmark anywhere.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Verify Your Document Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-End Side-by-Side Comparison */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Unverified Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-amber-200/90 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                    ?
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-text-main">
                      Default PDF Viewer (Unverified)
                    </h3>
                    <div className="text-xs text-text-muted">Acrobat Reader / Chrome / iOS Preview</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Counter Rejected
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Signature Validity Unknown · Signer Not Trusted</span>
                </div>
                <p className="text-amber-900/80 leading-relaxed text-[11px]">
                  The signer&apos;s certificate was issued by an authority not recognized by the operating system default store.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-muted pt-1">
                <div className="flex items-center gap-1.5 text-rose-700">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>Banks reject loan files</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-700">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span>Universities demand ink seals</span>
                </div>
              </div>
            </div>

            {/* Kagazo Sovereign Verified Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-4 ring-4 ring-emerald-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    ✔
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-text-main">
                      Kagazo Sovereign Engine (Verified)
                    </h3>
                    <div className="text-xs text-text-muted">CCA India RCAI Cryptographic Hierarchy</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  100% Accepted
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-xs text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Signature Valid · Cryptographically Certified</span>
                </div>
                <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                  Validated against official CCA licensed roots (NIC, eMudhra, Capricorn, CDAC). Embedded with permanent LTV timestamp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-muted pt-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Permanent green tick</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>IT Act 2000 evidentiary value</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

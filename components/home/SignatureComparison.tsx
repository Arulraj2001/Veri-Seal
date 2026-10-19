'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  FileText,
  Lock,
  ExternalLink,
  X,
  Minus,
  Square,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function SignatureComparison() {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>THE YELLOW &quot;?&quot; EXPLAINED</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-text-main tracking-tight">
            Why Do Bank &amp; Government Counters Reject Your PDF?
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Standard PDF viewers on Windows, Mac, and Android do not bundle India&apos;s Sovereign Root Certificates (CCA India / RCAI). Kagazo resolves the root cryptographic chain and embeds permanent Long-Term Validation (LTV) directly into the PDF.
          </p>
        </div>

        {/* Side-by-Side Visual OS Window Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* CARD 1: BEFORE KAGAZO (ADOBE READER REJECTED VIEW) */}
          <div className="rounded-3xl bg-surface border-2 border-amber-300 shadow-md overflow-hidden flex flex-col justify-between">
            {/* Operating System Window Bar Simulation */}
            <div className="px-4 py-2.5 bg-slate-800 text-slate-300 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 ml-2">Acrobat Reader — eAadhaar.pdf</span>
              </div>
              <span className="text-[10px] text-rose-400 font-bold">UNVERIFIED</span>
            </div>

            <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-black uppercase tracking-wide">
                    <span>❌ Common Problem</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-700">Adobe Default Root Store</span>
                </div>

                {/* Adobe Reader Warning Ribbon Simulation Box */}
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                      ?
                    </div>
                    <div>
                      <div className="font-extrabold text-amber-950 text-xs sm:text-sm">
                        Validity Unknown · Signature Not Verified
                      </div>
                      <div className="text-[11px] text-amber-900/80 mt-1 leading-relaxed">
                        &quot;The validity of the document is unknown. The signer&apos;s identity cannot be confirmed by your operating system root certificates.&quot;
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real World Impact */}
                <div className="space-y-2 text-xs text-text-main/80 pt-1">
                  <div className="font-bold text-rose-700 text-xs">Real-World Consequence:</div>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>Bank loan officers decline applications citing unverified digital signatures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>College admission verification counters demand a physical revenue officer ink seal.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>Mobile PDF viewers display an ugly yellow question mark instead of an official seal.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-200/60 text-[11px] font-semibold text-amber-800 flex items-center justify-between">
                <span>Status: Untrusted Local Trust Store</span>
                <span className="text-rose-600 font-black">Rejected at Counter</span>
              </div>
            </div>
          </div>

          {/* CARD 2: AFTER KAGAZO (ACCEPTED SOVEREIGN VALIDATED VIEW) */}
          <div className="rounded-3xl bg-white border-2 border-emerald-500 shadow-xl overflow-hidden flex flex-col justify-between ring-2 ring-emerald-500/20">
            {/* Operating System Window Bar Simulation */}
            <div className="px-4 py-2.5 bg-emerald-950 text-emerald-200 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="text-[11px] font-medium text-emerald-200 ml-2">Kagazo Sovereign Engine — eAadhaar_Verified.pdf</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-bold">RCAI TRUSTED</span>
            </div>

            <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wide">
                    <span>✅ Kagazo Solution</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">CCA India Root Validated</span>
                </div>

                {/* Kagazo Green Tick Simulation Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-extrabold text-emerald-950 text-xs sm:text-sm flex items-center gap-2">
                        <span>Signature Valid · Certified by RCAI</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 text-[10px] font-mono">LTV DSS</span>
                      </div>
                      <div className="text-[11px] text-emerald-900/80 mt-1 leading-relaxed">
                        &quot;Digitally signed by CCA India Licensed Certifying Authority. Signature timestamped and cryptographically validated.&quot;
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real World Impact */}
                <div className="space-y-2 text-xs text-text-main/80 pt-1">
                  <div className="font-bold text-emerald-700 text-xs">Kagazo Guarantee:</div>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span><strong>100% Accepted:</strong> Valid across all banks, colleges, courts, and RTO counters nationwide.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span><strong>Permanent Green Tick:</strong> The verified PDF retains the green tick in Adobe Acrobat forever.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span><strong>IT Act 2000 Section 5:</strong> Fully compliant with Indian legal digital signature standards.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-200/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-800">Status: Long-Term Validated (LTV)</span>
                <Link
                  href="/verify"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <span>Verify Your PDF Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

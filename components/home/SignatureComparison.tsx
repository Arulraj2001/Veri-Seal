'use client';

import * as React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  FileText,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function SignatureComparison() {
  const { language } = useLanguage();

  const scrollToVerify = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('verify-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
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

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* CARD 1: BEFORE KAGAZO (REJECTED) */}
          <div className="rounded-3xl bg-surface border-2 border-amber-300/80 shadow-md p-6 sm:p-8 space-y-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-black uppercase tracking-wide">
                  <span>❌ Common Problem</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-700">Adobe Reader / Chrome Default</span>
              </div>

              {/* Adobe Warning Simulation Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                    ?
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-950 text-sm">
                      Validity Unknown · Signature Not Verified
                    </div>
                    <div className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
                      &quot;The validity of the document is unknown. The signer&apos;s identity cannot be confirmed by your operating system.&quot;
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
                    <span>Bank officers decline home loan and KYC accounts citing unverified digital signatures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">•</span>
                    <span>College admission counters turn students away demanding a physical revenue officer seal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">•</span>
                    <span>Mobile phones display an ugly yellow question mark instead of an official certificate seal.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-200/60 text-[11px] font-semibold text-amber-800 flex items-center justify-between">
              <span>Status: Untrusted Local Trust Store</span>
              <span className="text-rose-600 font-black">Rejected at Counter</span>
            </div>
          </div>

          {/* CARD 2: AFTER KAGAZO (ACCEPTED) */}
          <div className="rounded-3xl bg-white border-2 border-emerald-500 shadow-xl p-6 sm:p-8 space-y-5 relative overflow-hidden flex flex-col justify-between ring-2 ring-emerald-500/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wide">
                  <span>✅ Kagazo Solution</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">CCA India Root Validated</span>
              </div>

              {/* Kagazo Green Tick Simulation Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                      <span>Signature Valid · Certified by RCAI</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 text-[10px] font-mono">LTV DSS</span>
                    </div>
                    <div className="text-xs text-emerald-900/80 mt-0.5 leading-relaxed">
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

            <div className="pt-4 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-800">Status: Long-Term Validated (LTV)</span>
              <a
                href="#verify-engine"
                onClick={scrollToVerify}
                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                <span>Verify Your PDF Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

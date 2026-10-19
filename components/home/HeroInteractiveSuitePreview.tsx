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
  Camera,
  Layers,
  FileCheck,
  EyeOff,
  Scissors,
  Check,
  Printer,
  Sparkles,
} from 'lucide-react';

type SuiteTabId = 'signature' | 'exam' | 'gangsheet' | 'aadhaar';

interface SuiteTab {
  id: SuiteTabId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SUITE_TABS: SuiteTab[] = [
  { id: 'signature', label: 'Digital Signatures', shortLabel: 'Signatures', icon: ShieldCheck, tag: 'Official PKI' },
  { id: 'exam', label: 'Exam Photo Lab', shortLabel: 'Exam Photos', icon: Camera, tag: 'UPSC / TNPSC' },
  { id: 'gangsheet', label: 'Print Gang Sheet', shortLabel: '4x6" Sheet', icon: Printer, tag: 'Cyber Café' },
  { id: 'aadhaar', label: 'Mask Aadhaar', shortLabel: 'KYC Privacy', icon: EyeOff, tag: 'UIDAI Compliant' },
];

export function HeroInteractiveSuitePreview() {
  const [activeTab, setActiveTab] = React.useState<SuiteTabId>('signature');

  return (
    <div className="relative w-full rounded-3xl bg-white border border-surface-darker/90 shadow-xl overflow-hidden">
      {/* Top Tab Bar */}
      <div className="p-2 sm:p-2.5 bg-surface/60 border-b border-surface-darker/70 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 w-full">
          {SUITE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-text-main shadow-xs border border-surface-darker/80'
                    : 'text-text-muted hover:text-text-main hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Preview Stage */}
      <div className="p-5 sm:p-7 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DIGITAL SIGNATURE PROOF */}
          {activeTab === 'signature' && (
            <motion.div
              key="signature"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-main">e-Aadhaar &amp; Revenue Certificates</div>
                      <div className="text-[10px] text-text-muted">CCA India Root (RCAI) Cryptographic Validation</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    LTV DSS Ready
                  </span>
                </div>

                {/* Before / After Transformation Visual */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Before Box */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-900">
                      <span>Default PDF Viewer</span>
                      <span className="text-rose-600">❌ Rejected</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0">?</span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-amber-950 truncate">Validity Unknown</div>
                        <div className="text-[10px] text-amber-800 truncate">Signer identity not trusted</div>
                      </div>
                    </div>
                  </div>

                  {/* After Box */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-900">
                      <span>Kagazo Validated</span>
                      <span className="text-emerald-700">✅ 100% Accepted</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-emerald-950 truncate">Signature Valid</div>
                        <div className="text-[10px] text-emerald-800 truncate">Certified by CCA India</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface/70 border border-surface-darker/60 text-xs text-text-main/75 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-muted">Certifying Authority:</span>
                    <span className="font-mono font-bold text-text-main">NIC / eMudhra / Capricorn</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-muted">Legal Sanctity:</span>
                    <span className="font-bold text-emerald-700">Section 5 IT Act 2000 Valid</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/verify"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Launch Verification Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 2: EXAM PHOTO & SIGNATURE SUITE */}
          {activeTab === 'exam' && (
            <motion.div
              key="exam"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold text-xs">
                      REC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-main">Recruitment Portal Calibration</div>
                      <div className="text-[10px] text-text-muted">TNPSC OTR, UPSC Civil Services, SSC CGL &amp; IBPS</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold border border-indigo-200">
                    Zero Rejection
                  </span>
                </div>

                {/* Photo & Signature Preview Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                  <div className="w-20 h-24 rounded-xl bg-indigo-100 border border-indigo-200 p-1.5 flex flex-col justify-between shrink-0 text-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-300 mx-auto mt-1 flex items-center justify-center text-xs font-bold text-white">
                      PASS
                    </div>
                    <div className="bg-indigo-900 text-white text-[8px] font-mono rounded px-1 truncate leading-tight">
                      DOP: 14/10/2026
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-[11px] text-text-muted">Dimensions:</span>
                      <span className="font-mono font-bold text-text-main">125 × 165 px</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-[11px] text-text-muted">File Size:</span>
                      <span className="font-mono font-bold text-emerald-700">32.4 KB (20-50KB Max)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[65%] rounded-full" />
                    </div>
                    <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Strict portal aspect ratio &amp; DPI verified</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-darker/60">
                    <span className="text-text-muted block text-[10px]">Name &amp; Date Stamper</span>
                    <span className="font-bold text-text-main">TNPSC Auto-Banner</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-darker/60">
                    <span className="text-text-muted block text-[10px]">Handwritten Declaration</span>
                    <span className="font-bold text-text-main">50KB – 100KB Lossless</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/tools/tnpsc-combo-pack"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Launch Exam Photo Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CYBER CAFE 4X6" & A4 GANG SHEET */}
          {activeTab === 'gangsheet' && (
            <motion.div
              key="gangsheet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs">
                      CSC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-main">Print Lab &amp; Photo Sheet Studio</div>
                      <div className="text-[10px] text-text-muted">High-Gloss 4×6&quot; Photo Paper &amp; 5-in-1 A4 Sheets</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    300 DPI Lab
                  </span>
                </div>

                {/* 4x6" Sheet Layout Simulation */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">4×6&quot; (10×15 cm) Sheet</span>
                    <span className="text-emerald-700 font-bold">8 Photos Tiled</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-dashed border-amber-300 grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="h-9 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-[9px] font-mono text-amber-800 font-bold">
                        P{i}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-0.5">
                    <span className="flex items-center gap-1">
                      <Scissors className="w-3 h-3 text-amber-600" />
                      <span>Precise Cut Lines</span>
                    </span>
                    <span className="text-emerald-700 font-bold">Saves 80% Paper Cost</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-darker/60">
                    <span className="text-text-muted block text-[10px]">A4 Multi-Card Studio</span>
                    <span className="font-bold text-text-main">5 Cards on 1 Sheet</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-darker/60">
                    <span className="text-text-muted block text-[10px]">Epson L805 PVC Tray</span>
                    <span className="font-bold text-text-main">Exact Tray Alignment</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Launch 4×6&quot; Gang Sheet Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 4: MASK AADHAAR & IDENTITY PRIVACY */}
          {activeTab === 'aadhaar' && (
            <motion.div
              key="aadhaar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-xs">
                      UID
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-main">UIDAI-Compliant KYC Masking</div>
                      <div className="text-[10px] text-text-muted">Redacts First 8 Digits in Client-Side Canvas</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                    RBI KYC Legal
                  </span>
                </div>

                {/* Aadhaar Card Simulation */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">Unique Identification Authority of India</span>
                    <span className="text-teal-700 font-mono font-bold text-[10px]">Masked Copy</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Aadhaar No.</div>
                      <div className="text-sm font-mono font-black text-slate-800 tracking-wider">
                        XXXX · XXXX · <span className="text-emerald-700">9482</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded bg-teal-50 border border-teal-200 text-teal-800 font-mono text-[10px] font-bold">
                      QR Retained
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-600 leading-relaxed">
                    Under UIDAI circulars and RBI KYC norms, masked Aadhaar is legally valid for hotel check-ins, telecom KYC, and job applications without exposing sensitive biometric numbers.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-darker/60">
                    <span className="text-text-muted block text-[10px]">Server Storage</span>
                    <span className="font-bold text-emerald-700">Zero Bytes Saved</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-surface-darker/60">
                    <span className="text-text-muted block text-[10px]">Processing Location</span>
                    <span className="font-bold text-text-main">100% In-Browser RAM</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/tools/mask-aadhaar"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Launch Aadhaar Masker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

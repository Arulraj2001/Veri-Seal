'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Printer,
  ChevronRight,
  PenTool,
  Scissors,
  Check,
  Zap,
} from 'lucide-react';

export function IntentGateway() {
  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Citizen & Govt PDF Verification Studio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/20 shadow-lg hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase tracking-wide">
                GOVT CERTIFICATES
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Digital Signature Studio
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Transform unverified yellow &quot;?&quot; marks on e-Aadhaar, TN e-Sevai, Patta, Caste, and DigiLocker PDFs into CCA India verified green checkmarks.
              </p>
            </div>

            {/* Visual Mockup Graphic: Certificate Before/After Miniature */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-slate-700 dark:text-slate-300">e-District Certificate</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">LTV DSS</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Yellow ? to Green Check icon visual */}
                <div className="flex-1 p-2 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0">?</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-amber-900 truncate">Default Viewer</div>
                    <div className="text-[9px] text-amber-700 truncate">Unknown Signer</div>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                <div className="flex-1 p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">✔</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-emerald-950 truncate">Kagazo RCAI</div>
                    <div className="text-[9px] text-emerald-700 truncate">Verified Valid</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['e-Aadhaar', 'e-Sevai', 'Land Patta', 'Community'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
            >
              <span>Launch Verification Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Pillar 2: Competitive Exam Upload Suite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-500/30 dark:border-indigo-500/20 shadow-lg hover:shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase tracking-wide">
                EXAM CANDIDATES
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Exam Portal Upload Suite
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Calibrated zero-rejection criteria for UPSC, TNPSC OTR, SSC CGL &amp; IBPS. Includes name/DOP banner stamper and 200KB compressor.
              </p>
            </div>

            {/* Visual Mockup Graphic: Exam Photo & Signature Slip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-slate-700 dark:text-slate-300">TNPSC / UPSC Spec</span>
                <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">20KB – 50KB</span>
              </div>

              {/* Photo & Signature Preview Card */}
              <div className="flex items-center gap-2.5">
                {/* Photo box with DOP */}
                <div className="w-16 h-18 rounded-lg bg-indigo-100 border border-indigo-200 p-1 flex flex-col justify-between shrink-0 text-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-300 mx-auto mt-1 flex items-center justify-center text-[10px] font-black text-white">
                    👤
                  </div>
                  <div className="bg-indigo-900 text-white text-[7px] font-mono rounded px-0.5 truncate leading-tight">
                    DOP: 14/10/26
                  </div>
                </div>

                {/* Spec Indicators */}
                <div className="flex-1 space-y-1 text-[10px]">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Dimensions:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">125×165 px</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Size Gauge:</span>
                    <span className="font-mono font-bold text-emerald-600">32.4 KB (PASS)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[64%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['IBPS 50-100KB', 'UPSC 200KB', 'SSC CGL', 'DOP Stamper'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              href="/tools/tnpsc-combo-pack"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors"
            >
              <span>TNPSC / UPSC Combo Kit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/tools"
              className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              All Tools &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Pillar 3: Cyber Cafe & CSC Print Lab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-amber-500/30 dark:border-amber-500/20 shadow-lg hover:shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
                CSC &amp; CYBER CAFE PRO
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Studio Print &amp; Gang Sheet Lab
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Tile 5 ID cards onto one A4 sheet at 300 DPI, format PVC smart card trays for Epson L805, and create 4×6 passport sheets with zero Photoshop effort.
              </p>
            </div>

            {/* Visual Mockup Graphic: 4x6" Photo Sheet Layout */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-slate-700 dark:text-slate-300">4×6&quot; Photo Sheet (8 Photos)</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">300 DPI</span>
              </div>

              {/* Gang sheet 8-photo grid preview */}
              <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-dashed border-amber-300 flex items-center justify-between gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-1 space-y-1">
                    <div className="h-6 rounded bg-amber-100 border border-amber-200 flex items-center justify-center text-[8px] text-amber-800 font-bold">
                      📸
                    </div>
                    <div className="h-6 rounded bg-amber-100 border border-amber-200 flex items-center justify-center text-[8px] text-amber-800 font-bold">
                      📸
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                <span>✂ Scissor Cut Guides Included</span>
                <span className="text-emerald-700 font-bold">Save 80% Paper</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['5-in-1 A4 Sheet', 'Epson L805 PVC', '4×6 Passport', '300 DPI'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              href="/tools/a4-multi-card-sheet"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors"
            >
              <span>A4 Gang Sheet Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/tools/pvc-id-card-maker"
              className="text-[11px] font-semibold text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              PVC Tray &rarr;
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

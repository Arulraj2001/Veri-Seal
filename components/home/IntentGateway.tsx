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
} from 'lucide-react';

export function IntentGateway() {
  const scrollToUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('upload-zone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1: Citizen & Govt PDF Verification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/20 shadow-lg hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase tracking-wide">
                GOVT CERTIFICATES
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Fix Digital Signature Yellow &quot;?&quot; Mark
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Transform invalid or untrusted signatures on Aadhaar, TN e-Sevai, Patta, Caste, and DigiLocker PDFs into cryptographically validated green checkmarks.
              </p>
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

          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href="#upload-zone"
              onClick={scrollToUpload}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
            >
              <span>Verify PDF Certificate Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Pillar 2: Competitive Exam Upload Suite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-500/30 dark:border-indigo-500/20 shadow-lg hover:shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase tracking-wide">
                EXAM CANDIDATES
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Exam Portal Upload Suite (Zero Rejection)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Strict 50KB–100KB declaration scanner for IBPS/SBI, 200KB PDF compressor for UPSC &amp; TNPSC, and photo-signature joiners calibrated to official exam criteria.
              </p>
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

          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              href="/tools/handwritten-declaration-scanner"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors"
            >
              <span>Declaration Scanner (50-100KB)</span>
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
          className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-amber-500/30 dark:border-amber-500/20 shadow-lg hover:shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
                CSC &amp; CYBER CAFE PRO
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Studio Print &amp; Gang Sheet Lab
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Tile 5 ID cards onto one A4 sheet at 300 DPI, format PVC smart card trays for Epson L805, and create 4×6 passport photo sheets with zero Photoshop skill.
              </p>
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

          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
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

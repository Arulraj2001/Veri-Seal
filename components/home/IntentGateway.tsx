'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Printer,
  Sparkles,
  FileCheck,
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function IntentGateway() {
  const { language } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Workspaces</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-text-main tracking-tight">
            Engineered for Citizens, Aspirants &amp; Print Studios
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Three high-precision hubs designed to eliminate counter rejections, format zero-error exam uploads, and automate high-DPI cyber café print runs.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: Digital Signature Studio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative rounded-3xl bg-white border border-surface-darker/90 shadow-soft hover:shadow-card hover:border-emerald-500/40 transition-all flex flex-col justify-between overflow-hidden p-7 sm:p-8"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                  Govt Certificates
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-text-main group-hover:text-emerald-600 transition-colors">
                  Digital Signature Studio
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                  Transform unverified yellow &quot;?&quot; marks on e-Aadhaar, TN e-Sevai, Patta, Caste, and DigiLocker PDFs into CCA India verified permanent green checkmarks.
                </p>
              </div>

              {/* High-Contrast Signature Validation Card */}
              <div className="p-4 rounded-2xl bg-surface/70 border border-surface-darker/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-text-main">CCA Root Hierarchy</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    LTV DSS Ready
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                      ?
                    </span>
                    <span className="text-text-muted font-medium">Default Viewer</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      ✔
                    </span>
                    <span className="text-emerald-700 font-bold">Kagazo RCAI</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['e-Aadhaar', 'TN e-Sevai', 'Land Patta', 'DigiLocker', 'Income & Caste'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface text-text-muted border border-surface-darker/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-surface-darker/70">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>Launch Verification Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Pillar 2: Competitive Exam Upload Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group relative rounded-3xl bg-white border border-surface-darker/90 shadow-soft hover:shadow-card hover:border-primary/40 transition-all flex flex-col justify-between overflow-hidden p-7 sm:p-8"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary border border-primary/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20 uppercase tracking-wide">
                  Exam Aspirants
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-text-main group-hover:text-primary transition-colors">
                  Exam Portal Upload Suite
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                  Calibrated zero-rejection criteria for UPSC, TNPSC OTR, SSC CGL &amp; IBPS. Includes automatic Name/DOP date banner stamper and 200KB certificate compressor.
                </p>
              </div>

              {/* Real Photographic Visual Showcase */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-surface-darker/80 bg-slate-900">
                <Image
                  src="/images/exam-studio.jpg"
                  alt="Exam Photo & DOP Banner Studio Workspace"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <div className="flex items-center justify-between w-full text-white text-xs font-mono">
                    <span>TNPSC 125×165 px</span>
                    <span className="text-emerald-400 font-bold">&lt; 50 KB PASS</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['TNPSC OTR Kit', 'UPSC 200KB', 'SSC CGL', 'DOP Stamper', 'IBPS Photos'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface text-text-muted border border-surface-darker/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-surface-darker/70">
              <Link
                href="/tools/tnpsc-combo-pack"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors"
              >
                <span>TNPSC &amp; UPSC Combo Kit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Pillar 3: Cyber Cafe & CSC Print Lab */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="group relative rounded-3xl bg-white border border-surface-darker/90 shadow-soft hover:shadow-card hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden p-7 sm:p-8"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center">
                  <Printer className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
                  CSC &amp; Studio Pro
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-text-main group-hover:text-amber-600 transition-colors">
                  Studio Gang Sheet &amp; Print Lab
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                  Tile 5 ID cards onto one A4 sheet at 300 DPI, format PVC smart card trays for Epson L805, and create 4×6 passport sheets without Photoshop.
                </p>
              </div>

              {/* Clean Print Specs Card */}
              <div className="p-4 rounded-2xl bg-surface/70 border border-surface-darker/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-text-main">A4 &amp; 4×6&quot; Photo Sheets</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    300 DPI High-Res
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Automatic Scissor Cut Lines</span>
                  <span className="text-emerald-600 font-bold">Save 80% Paper</span>
                </div>
                <div className="w-full bg-surface-darker/50 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[85%] rounded-full" />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['5-in-1 A4 Sheet', 'Epson L805 PVC', '4×6" Passport', 'Aadhaar Merging'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface text-text-muted border border-surface-darker/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-surface-darker/70">
              <Link
                href="/tools/a4-multi-card-sheet"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
              >
                <span>A4 Gang Sheet Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

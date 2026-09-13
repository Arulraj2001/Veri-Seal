'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Printer,
  FileText,
  Layers,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { TOOLS_CATALOG, ToolItem } from '@/lib/tools-data';

interface CategoryTab {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  {
    id: 'featured',
    label: '⭐ Most Popular Across India',
    shortLabel: '⭐ Popular',
    icon: Sparkles,
    description: 'The highest-frequency citizen utilities, exam resizers, and document tools used daily.',
  },
  {
    id: 'exam',
    label: '🎓 Exam Portal Upload Suite',
    shortLabel: '🎓 Exam Tools',
    icon: GraduationCap,
    description: 'Zero-rejection criteria calibrated strictly for UPSC, TNPSC OTR, SSC, IBPS, and NEET.',
  },
  {
    id: 'identity',
    label: '🪪 Identity, KYC & Privacy',
    shortLabel: '🪪 KYC & Privacy',
    icon: ShieldCheck,
    description: 'UIDAI-compliant Aadhaar masking, front-back PDF merging, and biometric alignment in RAM.',
  },
  {
    id: 'print',
    label: '🖨️ CSC & Cyber Cafe Print Lab',
    shortLabel: '🖨️ Print Lab',
    icon: Printer,
    description: '5-in-1 A4 gang sheets, Epson L805 PVC tray layouts, and 4×6 studio passport sheets.',
  },
  {
    id: 'pdf',
    label: '📄 Smart PDF & Document Prep',
    shortLabel: '📄 PDF Tools',
    icon: FileText,
    description: 'Compress certificates to strict 200KB/100KB limits, clean scans, and merge marksheets.',
  },
];

export function ToolsMatrix() {
  const [activeTab, setActiveTab] = React.useState('featured');

  const getToolsForTab = (tabId: string): ToolItem[] => {
    switch (tabId) {
      case 'featured':
        return [
          ...TOOLS_CATALOG.filter((t) => t.id === 'compress-pdf-200kb'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'tnpsc-otr-compliance-kit'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'handwritten-declaration-scanner'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'a4-multi-card-sheet'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'mask-aadhaar'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'aadhaar-front-back-pdf'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'pvc-id-card-maker'),
          ...TOOLS_CATALOG.filter((t) => t.id === 'free-ats-resume-builder'),
        ];
      case 'exam':
        return TOOLS_CATALOG.filter(
          (t) =>
            t.category === 'photo_image' ||
            t.examTags.some((tag) => ['UPSC', 'TNPSC', 'SSC', 'IBPS', 'NEET', 'GATE'].includes(tag))
        ).slice(0, 8);
      case 'identity':
        return TOOLS_CATALOG.filter(
          (t) =>
            t.category === 'kyc_documents' ||
            ['mask-aadhaar', 'aadhaar-front-back-pdf', 'aadhaar-pan-kyc-merge', 'biometric-face-aligner', 'signature-cleaner-extractor'].includes(t.id)
        ).slice(0, 8);
      case 'print':
        return TOOLS_CATALOG.filter(
          (t) =>
            t.category === 'print_share' ||
            ['a4-multi-card-sheet', 'pvc-id-card-maker', 'passport-photo-sheet-maker', 'driving-license-card-merger'].includes(t.id)
        ).slice(0, 8);
      case 'pdf':
        return TOOLS_CATALOG.filter(
          (t) =>
            t.category === 'pdf_tools' ||
            ['clean-document-scanner', 'self-attest-pdf', 'merge-marksheets-pdf', 'unlock-pdf'].includes(t.id)
        ).slice(0, 8);
      default:
        return TOOLS_CATALOG.slice(0, 8);
    }
  };

  const currentTools = getToolsForTab(activeTab);
  const activeTabMeta = CATEGORY_TABS.find((t) => t.id === activeTab) || CATEGORY_TABS[0];

  return (
    <section id="tools-matrix" className="py-20 bg-surface/60 border-t border-surface-darker relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3.5 py-1.5 rounded-full border border-primary/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>56+ Sovereign Citizen Utilities</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main mt-4 tracking-tight leading-tight">
            Curated Tools for Every Citizen &amp; Aspirant
          </h2>
          <p className="text-sm sm:text-base text-text-main/70 mt-3 leading-relaxed">
            Every tool runs 100% in your browser memory (RAM) with client-side WebAssembly. Zero uploads to cloud storage, guaranteed zero file retention.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="w-full max-w-full flex justify-center mb-8 px-2 sm:px-0">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-surface-darker/80 dark:border-slate-800 shadow-sm max-w-full">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-text-main/75 dark:text-slate-300 hover:text-primary hover:bg-surface'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeToolsMatrixTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-primary'}`} />
                  <span className="hidden xl:inline">{tab.label}</span>
                  <span className="xl:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Description Context */}
        <p className="text-center text-xs text-text-main/60 max-w-xl mx-auto mb-8">
          {activeTabMeta.description}
        </p>

        {/* Tool Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {currentTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.slug}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-surface-darker/80 dark:border-slate-800 shadow-soft hover:shadow-card hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-surface dark:bg-slate-800 text-text-main/70 border border-surface-darker/80 uppercase tracking-wider">
                      {tool.categoryLabel.split('&')[0]}
                    </span>
                    {tool.badge && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wide">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-text-main dark:text-white group-hover:text-primary transition-colors leading-snug">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-text-main/70 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-darker/60 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {tool.examTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary-light/60 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View Full 56+ Directory Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-text-main hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore Complete 56+ Free Tool Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

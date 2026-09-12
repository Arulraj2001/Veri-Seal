'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Camera,
  PenTool,
  Fingerprint,
  FileCheck,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';

export interface ExamSpecItem {
  id: string;
  name: string;
  organization: string;
  category: 'Central' | 'Banking' | 'Entrance' | 'Railways' | 'State PSC' | 'Defence';
  photo: {
    dimensions: string;
    widthMm?: string;
    sizeRange: string;
    background: string;
    nameDateRequired: boolean;
    format: string;
  };
  signature: {
    dimensions: string;
    sizeRange: string;
    ink: 'Black' | 'Blue' | 'Blue / Black' | 'Black / Blue' | 'Any' | string;
    format: string;
  };
  thumb?: {
    required: boolean;
    spec: string;
  };
  recommendedToolPath: string;
  toolLabel: string;
  officialNote: string;
}

const EXAM_DATABASE: ExamSpecItem[] = [
  {
    id: 'ssc-cgl-chsl',
    name: 'SSC CGL / CHSL / MTS / GD',
    organization: 'Staff Selection Commission (SSC)',
    category: 'Central',
    photo: {
      dimensions: '3.5cm × 4.5cm (350×450 px)',
      sizeRange: '20 KB – 50 KB',
      background: 'White or Light Cream',
      nameDateRequired: false,
      format: 'JPEG / JPG',
    },
    signature: {
      dimensions: '4.0cm × 2.0cm (140×60 px)',
      sizeRange: '10 KB – 20 KB',
      ink: 'Black',
      format: 'JPEG / JPG',
    },
    recommendedToolPath: '/tools/ssc-photo-signature-resizer',
    toolLabel: 'Resize with SSC Tool',
    officialNote: 'Spectacles and caps strictly prohibited. Both ears must be clearly visible.',
  },
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services (IAS/IPS/IFS)',
    organization: 'Union Public Service Commission',
    category: 'Central',
    photo: {
      dimensions: '350×350 px min to 1000×1000 px max',
      sizeRange: '20 KB – 300 KB',
      background: 'Plain White',
      nameDateRequired: true,
      format: 'JPG',
    },
    signature: {
      dimensions: '350×350 px min to 1000×1000 px max',
      sizeRange: '20 KB – 300 KB',
      ink: 'Black',
      format: 'JPG',
    },
    recommendedToolPath: '/tools/upsc-photo-signature-resizer',
    toolLabel: 'Resize with UPSC Tool',
    officialNote: 'Photo must not be older than 10 days from opening of online application.',
  },
  {
    id: 'ibps-po-clerk',
    name: 'IBPS PO / Clerk / RRB / SO',
    organization: 'Institute of Banking Personnel Selection',
    category: 'Banking',
    photo: {
      dimensions: '4.5cm × 3.5cm (200×230 px)',
      sizeRange: '20 KB – 50 KB',
      background: 'Light / White',
      nameDateRequired: false,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: '140×60 px',
      sizeRange: '10 KB – 20 KB',
      ink: 'Black',
      format: 'JPG / JPEG',
    },
    thumb: {
      required: true,
      spec: 'Left Thumb: 240×240 px, 20–50 KB (Blue/Black ink)',
    },
    recommendedToolPath: '/tools/ibps-photo-signature-resizer',
    toolLabel: 'Prepare with IBPS Suite',
    officialNote: 'Capital letter signatures are invalid. Hand-written declaration also mandatory (50–100 KB).',
  },
  {
    id: 'sbi-po-clerk',
    name: 'SBI PO / Clerk (Junior Associate)',
    organization: 'State Bank of India',
    category: 'Banking',
    photo: {
      dimensions: '200×230 px (4.5cm × 3.5cm)',
      sizeRange: '20 KB – 50 KB',
      background: 'Light / White',
      nameDateRequired: false,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: '140×60 px',
      sizeRange: '10 KB – 20 KB',
      ink: 'Black',
      format: 'JPG / JPEG',
    },
    thumb: {
      required: true,
      spec: 'Left Thumb: 240×240 px, 20–50 KB',
    },
    recommendedToolPath: '/tools/handwritten-declaration-scanner',
    toolLabel: 'Format for SBI Portal',
    officialNote: 'Strict file budget. Files above 50KB or below 20KB trigger upload errors.',
  },
  {
    id: 'nta-neet-ug',
    name: 'NEET UG / PG Medical Entrance',
    organization: 'National Testing Agency (NTA)',
    category: 'Entrance',
    photo: {
      dimensions: 'Postcard: 4×6 inch (10–200 KB) & Passport: (10–200 KB)',
      sizeRange: '10 KB – 200 KB',
      background: 'White (80% face coverage)',
      nameDateRequired: true,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: '4–30 KB',
      sizeRange: '4 KB – 30 KB',
      ink: 'Black',
      format: 'JPG / JPEG',
    },
    thumb: {
      required: true,
      spec: 'Fingers & Thumb impressions: 10–200 KB',
    },
    recommendedToolPath: '/tools/neet-photo-signature-resizer',
    toolLabel: 'Resize with NEET Tool',
    officialNote: 'Candidate name and date of taking photograph must be clearly printed below photograph.',
  },
  {
    id: 'nta-jee-main',
    name: 'JEE Main / JEE Advanced',
    organization: 'National Testing Agency (NTA) & IITs',
    category: 'Entrance',
    photo: {
      dimensions: '3.5cm × 4.5cm (300 DPI)',
      sizeRange: '10 KB – 200 KB',
      background: 'White (80% face visible)',
      nameDateRequired: false,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: '3.5cm × 1.5cm',
      sizeRange: '4 KB – 30 KB',
      ink: 'Black',
      format: 'JPG / JPEG',
    },
    recommendedToolPath: '/tools/signature-cleaner-extractor',
    toolLabel: 'Clean Ink for JEE',
    officialNote: 'Unclear or hazy photographs will lead to direct form rejection.',
  },
  {
    id: 'rrb-railway',
    name: 'RRB NTPC / Group D / ALP / Technician',
    organization: 'Railway Recruitment Control Board',
    category: 'Railways',
    photo: {
      dimensions: '35mm × 45mm (320×240 px)',
      sizeRange: '20 KB – 50 KB',
      background: 'Plain White / Light',
      nameDateRequired: false,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: '50mm × 20mm (160×80 px)',
      sizeRange: '10 KB – 40 KB',
      ink: 'Black',
      format: 'JPG / JPEG',
    },
    recommendedToolPath: '/tools/rrb-photo-signature-resizer',
    toolLabel: 'Resize with RRB Tool',
    officialNote: 'Color photo taken on or after notification date. No selfies allowed.',
  },
  {
    id: 'upsssc-pet-vdo',
    name: 'UPSSSC PET / VDO / Lekhpal',
    organization: 'Uttar Pradesh Subordinate Services',
    category: 'State PSC',
    photo: {
      dimensions: '3.5cm × 4.5cm joint with signature',
      sizeRange: 'Max 50 KB combined',
      background: 'White or Light Grey',
      nameDateRequired: false,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: 'Attached below photo with Hindi & English text',
      sizeRange: 'Merged in single image',
      ink: 'Black',
      format: 'JPG / JPEG',
    },
    recommendedToolPath: '/tools/photo-signature-joiner',
    toolLabel: 'Generate UPSSSC Joint Slip',
    officialNote: 'Signature must be below the photo in one composite single image file.',
  },
  {
    id: 'mp-vyapam-esb',
    name: 'MP ESB / Vyapam (Police, Patwari, Teacher)',
    organization: 'Madhya Pradesh Employees Selection Board',
    category: 'State PSC',
    photo: {
      dimensions: 'Composite Template (Photo + Sig + Hand Declaration)',
      sizeRange: 'Under 200 KB',
      background: 'White',
      nameDateRequired: true,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: 'Placed on official MP ESB format sheet',
      sizeRange: 'Within composite template',
      ink: 'Black',
      format: 'JPG',
    },
    recommendedToolPath: '/tools/photo-signature-joiner',
    toolLabel: 'Join Photo & Signature',
    officialNote: 'Candidate name and date of photo capture must be printed at the bottom of the photo.',
  },
  {
    id: 'tnpsc-group-1-4',
    name: 'TNPSC Group 1, 2, 4 & VAO',
    organization: 'Tamil Nadu Public Service Commission',
    category: 'State PSC',
    photo: {
      dimensions: '4.5cm × 3.5cm (200×230 px)',
      sizeRange: '20 KB – 50 KB',
      background: 'White',
      nameDateRequired: true,
      format: 'JPG',
    },
    signature: {
      dimensions: '140×60 px',
      sizeRange: '10 KB – 20 KB',
      ink: 'Blue / Black',
      format: 'JPG',
    },
    recommendedToolPath: '/tools/tnpsc-photo-signature-resizer',
    toolLabel: 'Resize with TNPSC Tool',
    officialNote: 'Photo must contain candidate name & date of photo capture in bottom strip.',
  },
  {
    id: 'bpsc-civil-services',
    name: 'BPSC Combined Competitive Exam (CCE)',
    organization: 'Bihar Public Service Commission',
    category: 'State PSC',
    photo: {
      dimensions: 'Live webcam capture + Upload: 25 KB max',
      sizeRange: 'Under 25 KB',
      background: 'White / Light',
      nameDateRequired: false,
      format: 'JPG / JPEG',
    },
    signature: {
      dimensions: 'Both English and Hindi signatures (15 KB max each)',
      sizeRange: 'Under 15 KB',
      ink: 'Black / Blue',
      format: 'JPG / JPEG',
    },
    recommendedToolPath: '/tools/signature-cleaner-extractor',
    toolLabel: 'Prepare Hindi & English Sigs',
    officialNote: 'Separate Hindi and English signature files required, each strictly under 15 KB.',
  },
  {
    id: 'nda-cds-afcat',
    name: 'NDA / CDS / AFCAT Defence Services',
    organization: 'UPSC & Indian Air Force',
    category: 'Defence',
    photo: {
      dimensions: '350×350 px min to 1000×1000 px max',
      sizeRange: '20 KB – 300 KB',
      background: 'Plain White',
      nameDateRequired: true,
      format: 'JPG',
    },
    signature: {
      dimensions: '350×350 px min',
      sizeRange: '20 KB – 300 KB',
      ink: 'Black',
      format: 'JPG',
    },
    recommendedToolPath: '/tools/upsc-photo-signature-resizer',
    toolLabel: 'Format with UPSC Tool',
    officialNote: 'Strict facial recognition checks at SSB interview. No tilted angles or filters.',
  },
];

const CATEGORIES = ['All', 'Central', 'Banking', 'Entrance', 'Railways', 'State PSC', 'Defence'] as const;

export default function ExamSpecificationRadar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredExams = useMemo(() => {
    return EXAM_DATABASE.filter((exam) => {
      const matchesSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.officialNote.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = activeCategory === 'All' || exam.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Header Bar - Matches VeriSeal UI Light/Clean Card System */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam (UPSC, SSC, IBPS, NEET, UPSSSC)..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Quick Counter */}
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredExams.length}</strong> official recruitment portals
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Exam Cards - Clean VeriSeal UI Card System without Logo Distractions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/60 hover:shadow-xl rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Title & Org */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="space-y-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.organization}</p>
                </div>
              </div>

              {/* Spec Highlights Container */}
              <div className="space-y-3 bg-slate-50/90 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/70 dark:border-slate-700/60 mb-4 backdrop-blur-sm">
                {/* Photo Spec */}
                <div className="flex items-start gap-2.5 text-xs">
                  <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Photo: </span>
                    <span className="text-slate-700 dark:text-slate-300">{item.photo.dimensions}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold"> ({item.photo.sizeRange})</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Background: {item.photo.background}
                      {item.photo.nameDateRequired && (
                        <span className="ml-1.5 text-amber-700 dark:text-amber-400 font-bold">• Name &amp; Date Required</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Signature Spec */}
                <div className="flex items-start gap-2.5 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                  <PenTool className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Signature: </span>
                    <span className="text-slate-700 dark:text-slate-300">{item.signature.dimensions}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold"> ({item.signature.sizeRange})</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Ink: {item.signature.ink} • Format: {item.signature.format}
                    </p>
                  </div>
                </div>

                {/* Thumb / Extra Spec if applicable */}
                {item.thumb && (
                  <div className="flex items-start gap-2.5 text-xs pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                    <Fingerprint className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Thumb Impression: </span>
                      <span className="text-slate-700 dark:text-slate-300">{item.thumb.spec}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Official Compliance Tip */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 mb-5">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-900 dark:text-white font-bold">Portal Rule: </strong>
                  {item.officialNote}
                </p>
              </div>
            </div>

            {/* Quick Action Button - Valid Working Route with Clean CTA */}
            <div className="pt-2 flex items-center justify-center">
              <Link
                href={item.recommendedToolPath}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all duration-200 shadow-sm group-hover:shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{item.toolLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Zero State */}
      {filteredExams.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No exams found matching &quot;{searchQuery}&quot;</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Try searching for SSC, UPSC, Bank, NEET, or select &quot;All&quot; from categories.
          </p>
        </div>
      )}
    </div>
  );
}

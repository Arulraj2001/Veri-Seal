'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Printer,
  Copy,
  Check,
  Search,
  Download,
  Share2,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  QrCode,
  Sparkles,
  Info,
} from 'lucide-react';

export interface ExamSpec {
  id: string;
  category: 'upsc' | 'ssc' | 'banking' | 'state_psc' | 'defence_police' | 'entrance';
  examName: string;
  conductingBody: string;
  photoSpecs: {
    dimensions: string;
    sizeKb: string;
    format: string;
    rules: string;
  };
  signatureSpecs: {
    dimensions: string;
    sizeKb: string;
    format: string;
    rules: string;
  };
  extraSpecs?: {
    thumb?: string;
    declaration?: string;
    certificatePdf?: string;
  };
  toolHref: string;
  toolLabel: string;
}

export const EXAM_SPECS: ExamSpec[] = [
  {
    id: 'upsc-cse',
    category: 'upsc',
    examName: 'Civil Services / NDA / CDS / IFS (OTR)',
    conductingBody: 'UPSC (Union Public Service Commission)',
    photoSpecs: {
      dimensions: '350 × 350 px (Min) to 1000 × 1000 px',
      sizeKb: '20 KB – 300 KB',
      format: 'JPG / JPEG',
      rules: 'Name & Date stamp required; 3/4 face visible; Photo must be < 10 days old',
    },
    signatureSpecs: {
      dimensions: '350 × 350 px (Min) to 1000 × 1000 px',
      sizeKb: '20 KB – 300 KB',
      format: 'JPG / JPEG',
      rules: 'Black ink on white paper; clear strokes; no initials only',
    },
    extraSpecs: {
      certificatePdf: 'Photo ID & Category: 20 KB – 300 KB PDF',
    },
    toolHref: '/tools/photo-date-name-stamper',
    toolLabel: 'UPSC Name & Date Stamper',
  },
  {
    id: 'ssc-cgl-chsl',
    category: 'ssc',
    examName: 'SSC CGL / CHSL / MTS / GD / CPO',
    conductingBody: 'Staff Selection Commission (SSC)',
    photoSpecs: {
      dimensions: '3.5 cm (W) × 4.5 cm (H) (100 × 120 px)',
      sizeKb: '20 KB – 50 KB',
      format: 'JPEG / JPG',
      rules: 'Plain light/white background; both ears visible; no spectacles/cap',
    },
    signatureSpecs: {
      dimensions: '4.0 cm (W) × 2.0 cm (H) (140 × 60 px)',
      sizeKb: '10 KB – 20 KB',
      format: 'JPEG / JPG',
      rules: 'Black ink on white paper; strictly horizontal bounding box',
    },
    extraSpecs: {
      certificatePdf: 'Category Certificate: < 300 KB PDF',
    },
    toolHref: '/tools/ssc-combo-pack',
    toolLabel: 'SSC Combo Pack (1-Click ZIP)',
  },
  {
    id: 'ibps-po-clerk',
    category: 'banking',
    examName: 'IBPS PO / Clerk / RRB / SO',
    conductingBody: 'Institute of Banking Personnel Selection',
    photoSpecs: {
      dimensions: '4.5 cm × 3.5 cm (200 × 230 px)',
      sizeKb: '20 KB – 50 KB',
      format: 'JPG / JPEG',
      rules: 'Light/white background; neutral facial expression; high contrast',
    },
    signatureSpecs: {
      dimensions: '140 × 60 px',
      sizeKb: '10 KB – 20 KB',
      format: 'JPG / JPEG',
      rules: 'Black ink only; capital letters signature is strictly rejected',
    },
    extraSpecs: {
      thumb: 'Left Thumb Impression: 240 × 240 px, 20 KB – 50 KB (Black/Blue ink)',
      declaration: 'Handwritten Declaration: 800 × 400 px, 50 KB – 100 KB (English, Black ink)',
    },
    toolHref: '/blog/ibps-photo-signature-thumb-declaration-size-guidelines-2026',
    toolLabel: 'IBPS 4-in-1 Standards',
  },
  {
    id: 'sbi-po-ja',
    category: 'banking',
    examName: 'SBI PO / Junior Associate (Clerk)',
    conductingBody: 'State Bank of India (SBI)',
    photoSpecs: {
      dimensions: '4.5 cm × 3.5 cm (200 × 230 px)',
      sizeKb: '20 KB – 50 KB',
      format: 'JPG / JPEG',
      rules: 'Light coloured / white background; clean contrast; no shadows',
    },
    signatureSpecs: {
      dimensions: '140 × 60 px',
      sizeKb: '10 KB – 20 KB',
      format: 'JPG / JPEG',
      rules: 'Black ink pen; running handwriting only',
    },
    extraSpecs: {
      thumb: 'Left Thumb: 20 KB – 50 KB (JPG)',
      declaration: 'Handwritten Declaration: 50 KB – 100 KB (Black ink only)',
    },
    toolHref: '/tools/compress-image-to-20kb',
    toolLabel: 'SBI Signature 10-20KB Tool',
  },
  {
    id: 'tnpsc-group-1-2-4',
    category: 'state_psc',
    examName: 'TNPSC Group 1, 2, 4, VAO (OTR 2026)',
    conductingBody: 'Tamil Nadu Public Service Commission',
    photoSpecs: {
      dimensions: '3.5 cm (W) × 4.5 cm (H)',
      sizeKb: '20 KB – 50 KB',
      format: 'JPG / JPEG',
      rules: 'Bottom 20% white bar with Candidate Name & Date of Photograph stamped',
    },
    signatureSpecs: {
      dimensions: '6.0 cm (W) × 2.0 cm (H)',
      sizeKb: '10 KB – 20 KB',
      format: 'JPG / JPEG',
      rules: 'Blue/Black ink on white paper; sharp high-contrast background',
    },
    extraSpecs: {
      certificatePdf: 'Community / Nativity / PSTM: < 200 KB PDF (e-Sevai format)',
    },
    toolHref: '/tools/tnpsc-combo-pack',
    toolLabel: 'TNPSC Combo Pack (1-Click ZIP)',
  },
  {
    id: 'rrb-railway',
    category: 'upsc',
    examName: 'RRB NTPC / Group D / ALP / Technician',
    conductingBody: 'Railway Recruitment Boards (RRB)',
    photoSpecs: {
      dimensions: '35 mm × 45 mm (320 × 240 px)',
      sizeKb: '30 KB – 70 KB',
      format: 'JPG / JPEG',
      rules: 'Plain white background; front face covering 70-80% frame',
    },
    signatureSpecs: {
      dimensions: '50 mm × 20 mm (140 × 60 px)',
      sizeKb: '30 KB – 70 KB',
      format: 'JPG / JPEG',
      rules: 'Running hand signature; block/capital letters will cause rejection',
    },
    extraSpecs: {
      certificatePdf: 'SC/ST Travel Pass & OBC NCL: < 500 KB PDF',
    },
    toolHref: '/tools/compress-image-to-50kb',
    toolLabel: 'RRB Photo/Signature Resizer',
  },
  {
    id: 'nta-neet-jee',
    category: 'entrance',
    examName: 'NEET (UG) / JEE (Main) / CUET',
    conductingBody: 'National Testing Agency (NTA)',
    photoSpecs: {
      dimensions: 'Passport: 10 KB – 200 KB | Postcard (4×6): 10 KB – 200 KB',
      sizeKb: '10 KB – 200 KB',
      format: 'JPG / JPEG',
      rules: 'White background; 80% face coverage showing ears; Name & Date optional but recommended',
    },
    signatureSpecs: {
      dimensions: '4.0 cm × 2.0 cm',
      sizeKb: '4 KB – 30 KB',
      format: 'JPG / JPEG',
      rules: 'Black ink on white paper with high scanning resolution',
    },
    extraSpecs: {
      thumb: 'Left and Right Hand Fingers and Thumbs: 10 KB – 200 KB',
      certificatePdf: 'Category & PwD Certificate: 50 KB – 300 KB PDF',
    },
    toolHref: '/tools/compress-image-to-20kb',
    toolLabel: 'NTA Signature Resizer',
  },
  {
    id: 'tnusrb-police',
    category: 'defence_police',
    examName: 'TN Police SI & Constable / Jail Warden',
    conductingBody: 'TNUSRB (Tamil Nadu Uniformed Services Recruitment Board)',
    photoSpecs: {
      dimensions: '3.5 cm × 4.5 cm (200 × 230 px)',
      sizeKb: '20 KB – 50 KB',
      format: 'JPG / JPEG',
      rules: 'Clear front-facing passport photo; no uniform or tinted glasses',
    },
    signatureSpecs: {
      dimensions: '6.0 cm × 2.0 cm',
      sizeKb: '10 KB – 20 KB',
      format: 'JPG / JPEG',
      rules: 'Black or blue pen on clean white unruled paper',
    },
    extraSpecs: {
      certificatePdf: '10th Marksheet, Community & Sports/NSS Quota: < 300 KB PDF',
    },
    toolHref: '/ta/tools/compress-image-to-20kb',
    toolLabel: 'TNUSRB 10-20KB Signature Resizer',
  },
];

export function ExamDimensionChartEngine() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [copied, setCopied] = React.useState<boolean>(false);

  const filteredSpecs = React.useMemo(() => {
    return EXAM_SPECS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.examName.toLowerCase().includes(q) ||
        item.conductingBody.toLowerCase().includes(q) ||
        item.photoSpecs.sizeKb.toLowerCase().includes(q) ||
        item.signatureSpecs.sizeKb.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTsv = async () => {
    try {
      const headers = [
        'Exam / Portal',
        'Conducting Body',
        'Photo Dimensions',
        'Photo Size',
        'Photo Rules',
        'Signature Dimensions',
        'Signature Size',
        'Signature Rules',
        'Other Requirements',
      ];
      const rows = filteredSpecs.map((item) => [
        item.examName,
        item.conductingBody,
        item.photoSpecs.dimensions,
        item.photoSpecs.sizeKb,
        item.photoSpecs.rules,
        item.signatureSpecs.dimensions,
        item.signatureSpecs.sizeKb,
        item.signatureSpecs.rules,
        item.extraSpecs
          ? Object.entries(item.extraSpecs)
              .map(([k, v]) => `${k}: ${v}`)
              .join(' | ')
          : 'None',
      ]);

      const tsvContent = [
        headers.join('\t'),
        ...rows.map((r) => r.join('\t')),
      ].join('\n');

      await navigator.clipboard.writeText(tsvContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'All India Government Exam Photo & Signature Dimension Chart 2026',
          text: 'Official dimensions and KB requirements for UPSC, SSC, IBPS, TNPSC, and State exams.',
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Controls Bar (Hidden during Print) */}
      <div className="no-print bg-surface border border-surface-darker rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-main/40" />
            <input
              type="text"
              placeholder="Search exam (e.g., UPSC, SSC, IBPS, TNPSC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-surface-darker rounded-2xl text-xs sm:text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold text-xs sm:text-sm rounded-2xl shadow hover:bg-primary/90 active:scale-95 transition-all"
              title="Print Wall Poster (A4)"
            >
              <Printer className="w-4 h-4" />
              <span>Print Poster (A4 / A3)</span>
            </button>

            <button
              onClick={handleCopyTsv}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-surface-darker text-text-main font-semibold text-xs sm:text-sm rounded-2xl hover:bg-surface active:scale-95 transition-all"
              title="Copy table to paste into Excel or Word"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-text-main/70" />
                  <span>Copy TSV / Excel</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-surface-darker text-text-main font-semibold text-xs sm:text-sm rounded-2xl hover:bg-surface active:scale-95 transition-all"
              title="Share chart link"
            >
              <Share2 className="w-4 h-4 text-text-main/70" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-surface-darker/60">
          {[
            { id: 'all', label: 'All Exams' },
            { id: 'upsc', label: 'UPSC & Central' },
            { id: 'ssc', label: 'SSC Exams' },
            { id: 'banking', label: 'Banking (IBPS & SBI)' },
            { id: 'state_psc', label: 'State PSC (TNPSC)' },
            { id: 'defence_police', label: 'Defence & Police' },
            { id: 'entrance', label: 'NTA Entrance (NEET/JEE)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-text-main text-white shadow-sm'
                  : 'bg-white text-text-main/70 border border-surface-darker hover:bg-surface'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          THE PRINTABLE POSTER / WALL CHEAT-SHEET CONTAINER
          Optimized with `@media print` clean rules in globals.css
         ========================================================================= */}
      <div className="kagazo-print-document bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-10 space-y-8">
        {/* Poster Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b-2 border-primary/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Reference Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight leading-tight">
              ALL INDIA GOVERNMENT EXAMS <br />
              <span className="text-primary">Photo &amp; Signature Specification Chart 2026</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-main/70">
              Standardized Dimension, DPI, Background &amp; File Size Reference for Cyber Cafés, CSC Kiosks &amp; Students.
            </p>
          </div>

          {/* Quick QR Code / Domain Badge */}
          <div className="shrink-0 flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface border border-surface-darker">
            <div className="w-14 h-14 rounded-xl bg-text-main flex flex-col items-center justify-center text-white text-center p-1.5">
              <QrCode className="w-7 h-7 text-emerald-400" />
              <span className="text-[8px] font-black uppercase tracking-tighter">kagazo.in</span>
            </div>
            <div className="text-left text-xs">
              <p className="font-extrabold text-text-main">Scan / Visit</p>
              <p className="font-mono text-primary font-bold">https://kagazo.in</p>
              <p className="text-[10px] text-text-main/60 mt-0.5">Free 1-Click Client-Side Resizer</p>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-surface-darker bg-surface text-text-main font-bold">
                <th className="py-3 px-3 w-[22%]">Exam &amp; Conducting Body</th>
                <th className="py-3 px-3 w-[25%]">Photo Specifications</th>
                <th className="py-3 px-3 w-[25%]">Signature Specifications</th>
                <th className="py-3 px-3 w-[18%]">Extra Requirements</th>
                <th className="py-3 px-3 w-[10%] text-right no-print">Tool Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker text-text-main/80">
              {filteredSpecs.map((item) => (
                <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                  {/* Exam Name */}
                  <td className="py-3 px-3 align-top">
                    <p className="font-bold text-text-main text-xs sm:text-sm">{item.examName}</p>
                    <p className="text-[11px] text-text-main/60">{item.conductingBody}</p>
                  </td>

                  {/* Photo Specs */}
                  <td className="py-3 px-3 align-top space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{item.photoSpecs.sizeKb}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-surface-darker font-mono">
                        {item.photoSpecs.format}
                      </span>
                    </div>
                    <p className="text-emerald-700 font-semibold text-[11px]">{item.photoSpecs.dimensions}</p>
                    <p className="text-[10px] text-text-main/70 leading-snug">{item.photoSpecs.rules}</p>
                  </td>

                  {/* Signature Specs */}
                  <td className="py-3 px-3 align-top space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{item.signatureSpecs.sizeKb}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-surface-darker font-mono">
                        {item.signatureSpecs.format}
                      </span>
                    </div>
                    <p className="text-emerald-700 font-semibold text-[11px]">{item.signatureSpecs.dimensions}</p>
                    <p className="text-[10px] text-text-main/70 leading-snug">{item.signatureSpecs.rules}</p>
                  </td>

                  {/* Extra Specs */}
                  <td className="py-3 px-3 align-top space-y-1 text-[11px]">
                    {item.extraSpecs ? (
                      <div className="space-y-1 text-text-main/70">
                        {item.extraSpecs.thumb && (
                          <p>
                            <strong className="text-text-main">Thumb:</strong> {item.extraSpecs.thumb}
                          </p>
                        )}
                        {item.extraSpecs.declaration && (
                          <p>
                            <strong className="text-text-main">Declaration:</strong>{' '}
                            {item.extraSpecs.declaration}
                          </p>
                        )}
                        {item.extraSpecs.certificatePdf && (
                          <p>
                            <strong className="text-text-main">PDF:</strong> {item.extraSpecs.certificatePdf}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-text-main/40 italic">None specified</span>
                    )}
                  </td>

                  {/* Direct Link (Hidden in Print) */}
                  <td className="py-3 px-3 align-top text-right no-print">
                    <Link
                      href={item.toolHref}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                    >
                      <span>Fix Now</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cyber Café Operator Checklist Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Cyber Café Operator &amp; Candidate Golden Rules (Zero Rejection Checklist):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] text-amber-950/80 leading-relaxed">
            <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50">
              <strong className="block text-amber-900 mb-0.5">1. White Background Rule</strong>
              All government portals (UPSC, SSC, IBPS, TNPSC) reject blue or patterned backgrounds. Use plain white background only.
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50">
              <strong className="block text-amber-900 mb-0.5">2. Name &amp; Date Stamp</strong>
              UPSC OTR and TNPSC OTR mandatorily require candidate name and date stamped in the lower 20% white banner. Photo must be &lt; 10 days old.
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50">
              <strong className="block text-amber-900 mb-0.5">3. Signature Running Hand</strong>
              IBPS and SSC immediately disqualify signatures written in all CAPITAL letters. Use smooth running handwriting in dark black or blue ink.
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50">
              <strong className="block text-amber-900 mb-0.5">4. PDF Compression Rules</strong>
              State e-Sevai / TNPSC certificates must be compressed under 200 KB. SSC documents must be under 300 KB.
            </div>
          </div>
        </div>

        {/* Poster Footer (Shows in Print) */}
        <div className="pt-4 border-t border-surface-darker flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-main/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Kagazo Sovereign Engine</strong> • 100% In-Browser RAM Execution • Zero Cloud Storage • Completely Free &amp; Private
            </span>
          </div>
          <div>
            <span>Hang this chart on your kiosk wall. Update daily at </span>
            <span className="font-mono font-bold text-primary">kagazo.in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

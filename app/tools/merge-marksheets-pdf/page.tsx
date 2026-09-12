import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Layers,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MarksheetMergeEngine from '@/components/tools/MarksheetMergeEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'Merge Marksheets to Single PDF Online Free (<500KB or <1MB) | VeriSeal',
  description:
    'Combine 1 to 12 semester marksheets, provisional degree, and consolidated certificates into one single PDF strictly under 500KB or 1MB for UPSC, SSC, and TNPSC portal document verification.',
  alternates: {
    canonical: 'https://veriseal.in/tools/merge-marksheets-pdf',
  },
  openGraph: {
    title: 'Merge Marksheets into Single PDF Under 500KB / 1MB | VeriSeal',
    description:
      'Multi-marksheet budget optimizer. Combines degree and semester certificates into 1 compliant PDF with sharp text and zero watermark.',
    url: 'https://veriseal.in/tools/merge-marksheets-pdf',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do recruitment portals require all marksheets in a SINGLE PDF?',
    answer:
      'State PSCs (TNPSC, UPPSC, BPSC), Staff Selection Commission (SSC), UPSC, and Banking exams (IBPS/SBI) provide only ONE file upload slot under "Educational Qualification" or "Graduation Proof". Candidates must combine all 6 to 8 semester marksheets, provisional certificate, and degree certificate into a single continuous PDF file.',
  },
  {
    question: 'Why do other PDF merger tools fail on government portals?',
    answer:
      'Standard online PDF mergers simply concatenate pages without dynamic byte budget compression. A 6-semester document often ends up at 4MB to 8MB, causing portals with strict 500KB or 1MB limits to reject the upload. VeriSeal uses a dynamic byte-budget optimizer that allocates optimal compression per page so the final PDF is guaranteed under your target limit while keeping marks and serial numbers crisp.',
  },
  {
    question: 'Can I upload photos of my marksheets taken with a mobile camera?',
    answer:
      'Yes! You can upload JPG, PNG, or existing PDF scans. Our built-in Xerox Clean filter automatically removes desk shadows, compensates for uneven camera lighting, and boosts ink contrast so small font subjects and grades remain 100% legible during verification.',
  },
  {
    question: 'Are my educational certificates safe on VeriSeal?',
    answer:
      '100% safe. All file processing occurs inside volatile RAM memory. VeriSeal never saves your marksheets, roll numbers, or university certificates to any disk, cloud storage, or database. Everything is purged immediately upon download.',
  },
];

const PORTAL_RULES = [
  {
    portal: 'UPSC Civil Services / ORA',
    docType: 'Degree / Marksheet PDF',
    maxSize: '300 KB - 1000 KB (1 MB)',
    notes: 'Single continuous PDF containing degree & marksheets in chronological order.',
  },
  {
    portal: 'TNPSC One Time Registration (OTR)',
    docType: 'Consolidated Marksheet',
    maxSize: 'Strictly 200 KB - 500 KB',
    notes: '200 DPI greyscale or color scan, clear university seal and controller sign.',
  },
  {
    portal: 'SSC CGL / CHSL / MTS',
    docType: 'Graduation Certificates',
    maxSize: '500 KB - 1000 KB',
    notes: 'Must show candidate name, roll number, and date of result declaration.',
  },
  {
    portal: 'IBPS PO / Clerk / RRB',
    docType: 'Semester-wise Marksheets',
    maxSize: 'Strictly 500 KB or 1000 KB',
    notes: 'Combined single PDF file for document verification round.',
  },
];

export default function MergeMarksheetsPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'VeriSeal Multi-Marksheet to Single PDF Budget Optimizer',
            url: 'https://veriseal.in/tools/merge-marksheets-pdf',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'INR',
            },
            description:
              'Combine 1 to 12 semester marksheets into a single PDF strictly under 500KB or 1MB for exam portal uploads.',
          }),
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Merge Marksheets into 1 PDF' },
          ]}
          showHomeIcon
        />

        {/* Main Grid Layout: 68% Left Focus + 32% Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (68%) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Hero Section */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-Semester Marksheets & Degree Merger</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Merge All Semester Marksheets into 1 Single PDF
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                UPSC, SSC, TNPSC, and Banking recruitment portals provide only a single document upload slot with strict limits (&lt;500KB or &lt;1MB). Upload 1 to 12 marksheet photos or PDFs — our dynamic byte-budget optimizer combines them into a single, perfectly legible document.
              </p>
            </div>

            {/* In-Memory Privacy Callout */}
            <div className="flex items-center gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Client-Safe RAM Processing:</strong> Marksheet scans and roll numbers are processed solely in temporary RAM memory and automatically destroyed. Zero storage, zero watermarks.
              </span>
            </div>

            {/* The Engine Component */}
            <MarksheetMergeEngine />

            {/* Why This Tool Solves The Problem */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Why Standard Online PDF Mergers Fail for Marksheets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                  <h3 className="font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Standard Online PDF Mergers
                  </h3>
                  <ul className="text-xs text-rose-700/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Blindly concatenates files without size budget control</li>
                    <li>6 marksheet scans balloon to 5MB - 12MB</li>
                    <li>Government portal rejects with "File exceeds 500KB limit"</li>
                    <li>Forces you to pay for Pro / Premium to compress pages</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    VeriSeal Budget Optimizer
                  </h3>
                  <ul className="text-xs text-emerald-800/90 space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>Calculates optimal byte budget per semester page</li>
                    <li>Guaranteed strictly under user target (&lt;500KB, &lt;1MB)</li>
                    <li>Built-in Xerox Ink Boost cleans desk shadows</li>
                    <li>100% Free Forever with zero watermarks or signups</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Portal Upload Size Specifications Table */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Government Portal Marksheet Upload Rules (2025-2026)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker/60 text-muted-foreground font-semibold">
                      <th className="pb-3 pr-4">Exam / Authority</th>
                      <th className="pb-3 pr-4">Document Requirement</th>
                      <th className="pb-3 pr-4">File Limit</th>
                      <th className="pb-3">Verification Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/40 text-foreground">
                    {PORTAL_RULES.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-surface-lighter/40 transition-colors">
                        <td className="py-3 pr-4 font-semibold text-emerald-700">{rule.portal}</td>
                        <td className="py-3 pr-4">{rule.docType}</td>
                        <td className="py-3 pr-4 font-mono font-medium">{rule.maxSize}</td>
                        <td className="py-3 text-muted-foreground">{rule.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-surface-darker/40 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1.5 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (32%) Sticky Rail */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Top Ad Slot with Zero CLS */}
            <AdSlot slot="sidebar" />

            {/* Quick Presets Navigation */}
            <div className="bg-white rounded-3xl border border-surface-darker/60 p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Essential Exam Portals Tools
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/unlock-pdf"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Unlock e-Aadhaar & PDF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Mask Aadhaar (First 8 Digits)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/tnpsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">TNPSC Photo & Sign Resizer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">UPSC Name & Date Photo Maker</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link
                  href="/tools/pdf-compressor"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 transition-colors text-foreground font-medium group"
                >
                  <span className="truncate">Govt Exam PDF Compressor</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Bottom Ad Slot with Zero CLS */}
            <AdSlot slot="sidebar" />
          </div>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/marksheet-pdf-merger" />
      </div>
    </div>
  );
}

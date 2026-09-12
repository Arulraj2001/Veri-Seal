import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap,
  Award,
  HelpCircle,
  FileText,
  Lock,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import ToolsDirectory from '@/components/tools/ToolsDirectory';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'All Free Exam & Document Tools Directory | Kagazo India',
  description:
    'Complete directory of 100% free Indian examination tools. Signature extractor, thumb impression sharpener, DL merger, PDF compressors (100KB, 200KB, 300KB), photo & signature resizers for UPSC, SSC, NEET, RRB, GATE, and photo sheets. Zero watermarks, in-memory RAM privacy.',
  alternates: {
    canonical: 'https://Kagazo.in/tools',
  },
  openGraph: {
    title: 'Free Indian Exam & Document Tools Directory | Kagazo',
    description:
      'Explore 36+ free tools for government exams, marksheet merging, photo resizing, and e-Aadhaar decryption. Fast, free, and completely client-safe.',
    url: 'https://Kagazo.in/tools',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Are all tools on Kagazo completely free to use?',
    answer:
      'Yes, 100% free forever. Kagazo was built as a dedicated public utility platform for competitive examination aspirants and cyber cafe operators. There are no hidden paywalls, no watermark additions, and no mandatory account sign-up requirements for document processing.',
  },
  {
    question: 'How does Kagazo protect candidate privacy and sensitive marksheet data?',
    answer:
      'Kagazo processes all files strictly inside volatile computer RAM memory. Your degree marksheets, photos, signatures, roll numbers, and Aadhaar documents are never saved to disk, cloud storage, or databases. Everything is automatically purged from memory immediately upon completion.',
  },
  {
    question: 'Which examination portals are supported by Kagazo resizers and compressors?',
    answer:
      'We support all major central and state recruitment portals including Union Public Service Commission (UPSC Civil Services, NDA, CDS), Staff Selection Commission (SSC CGL, CHSL, MTS, GD), National Testing Agency (NTA NEET UG, JEE), Institute of Banking Personnel Selection (IBPS PO, Clerk), Railway Recruitment Boards (RRB NTPC, Group D), IIT GOAPS (GATE, JAM), and State PSCs like TNPSC, UPPSC, BPSC, KPSC, and APPSC.',
  },
  {
    question: 'Can cyber cafes and computer centres use Kagazo commercially for student applications?',
    answer:
      'Yes! Thousands of cyber cafes, CSC centers, and DTP operators across India use Kagazo daily to batch compress student marksheets, format 4x6" passport photo sheets, and verify digital signatures for clients.',
  },
];

export default function ToolsDirectoryPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-foreground pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Kagazo Free Indian Exam & Document Tools Directory',
            url: 'https://Kagazo.in/tools',
            description:
              'Complete suite of 100% free tools for competitive exam applicants, student document verification, and cyber cafe operators.',
            hasPart: [
              {
                '@type': 'WebApplication',
                name: 'Compress PDF to 200KB',
                url: 'https://Kagazo.in/tools/compress-pdf-to-200kb',
              },
              {
                '@type': 'WebApplication',
                name: 'UPSC Photo & Signature Resizer',
                url: 'https://Kagazo.in/tools/upsc-photo-signature-resizer',
              },
              {
                '@type': 'WebApplication',
                name: 'Multi-Marksheet to Single PDF Budget Optimizer',
                url: 'https://Kagazo.in/tools/merge-marksheets-pdf',
              },
              {
                '@type': 'WebApplication',
                name: 'Cyber Cafe Passport Photo Sheet Maker',
                url: 'https://Kagazo.in/tools/passport-photo-sheet-maker',
              },
            ],
          }),
        }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Exam & Document Tools Directory' },
          ]}
          showHomeIcon
        />

        {/* Page Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>100% Free Public Utilities • Zero Watermarks • In-Memory Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            All-in-One Indian Exam &amp; Document Tools Directory
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Fast, client-safe utilities engineered for UPSC, SSC, NEET, IBPS, RRB, GATE, State PSCs, and Cyber Cafe operators. Compress, resize, convert, unlock, and clean scans with zero signups.
          </p>
        </div>

        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">100% In-Memory RAM Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Files are processed strictly in RAM and instantly purged upon download. Zero server persistence.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Exact Portal Specifications</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Calibrated to government recruitment guidelines (TNPSC 200KB, UPSC 300KB, RRB 320×240px).
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Zero Watermarks, Zero Signups</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Never alters your files with annoying brand watermarks. Clean, official outputs ready for upload.
              </p>
            </div>
          </div>
        </div>

        {/* Master Interactive Tools Directory Component */}
        <ToolsDirectory />

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-foreground text-sm flex items-start gap-2">
                  <span className="text-emerald-600 font-extrabold">Q:</span>
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
    </div>
  );
}

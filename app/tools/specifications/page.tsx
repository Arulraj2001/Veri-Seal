import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Search,
  Sliders,
  Layers,
  Sparkles,
} from 'lucide-react';
import ExamSpecificationRadar from '@/components/tools/ExamSpecificationRadar';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Exam Photo & Signature Specifications Radar (40+ Exams) | Kagazo',
  description:
    'Official dimensions, KB limits, DPI requirements, and background rules for 40+ Indian recruitment exams (UPSC, SSC, IBPS, RRB, NEET). Verified for 2026 notifications, 100% free.',
  keywords: [
    'exam photo and signature size list 2026',
    'all govt exam photo signature dimensions table',
    'sarkari exam photo size in cm and kb',
    'upsc ssc ibps rrb photo signature specifications',
    'gate jam goaps photo signature size',
    'neet passport and postcard photo size',
    'tnpsc otr photo signature dimensions',
    'sarathi driving licence photo size 35x45',
    'pan card photo 213x213 signature 600 dpi',
    'bank exam declaration 800x400 size 50 to 100 kb',
    'central and state psc photo requirements directory',
    'photo signature resize guidelines for competitive exams',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/specifications',
  },
  openGraph: {
    title: 'Exam Photo & Signature Specifications Radar (40+ Exams) | Kagazo',
    description:
      'Search, compare, and verify official photo dimensions, signature rules, KB budgets, and DPI across 40+ Indian recruitment boards. 1-click launch to pre-calibrated tools.',
    url: 'https://kagazo.in/tools/specifications',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exam Photo & Signature Specifications Radar (40+ Exams) | Kagazo',
    description:
      'Official dimensions, KB limits, and background rules for 40+ Indian recruitment exams (UPSC, SSC, IBPS, RRB, NEET). Updated for 2026.',
  },
};

const MASTER_SPECS = [
  {
    authority: 'UPSC Civil Services / NDA / CDS',
    doc: 'Passport Photo',
    dims: '350×350 to 1000×1000 px',
    size: '20 KB to 300 KB',
    dpi: '300 DPI',
    rule: 'Candidate Name & DOP strip mandatory (within 10 days of application)',
    tool: '/tools/upsc-photo-signature-resizer',
  },
  {
    authority: 'UPSC Civil Services / NDA / CDS',
    doc: 'Signature',
    dims: '350×350 to 1000×1000 px',
    size: '20 KB to 300 KB',
    dpi: '300 DPI',
    rule: 'Black ink pen on clean white sheet. Square 1:1 aspect ratio required',
    tool: '/tools/upsc-photo-signature-resizer',
  },
  {
    authority: 'SSC (CGL, CHSL, MTS, CPO, GD)',
    doc: 'Live / Upload Photo',
    dims: '3.5 × 4.5 cm (350×450 px)',
    size: '20 KB to 50 KB',
    dpi: '300 DPI',
    rule: 'Plain white background, 70%–80% face coverage, straight gaze, no spectacles',
    tool: '/tools/ssc-photo-signature-resizer',
  },
  {
    authority: 'SSC (CGL, CHSL, MTS, CPO, GD)',
    doc: 'Signature',
    dims: '4.0 × 2.0 cm (140×60 px)',
    size: '10 KB to 20 KB',
    dpi: '300 DPI',
    rule: 'Strict 10–20 KB window. Black ink only. Rejects signatures in ALL CAPS',
    tool: '/tools/ssc-photo-signature-resizer',
  },
  {
    authority: 'IBPS (PO, Clerk, SO, RRB)',
    doc: 'Passport Photo',
    dims: '4.5 × 3.5 cm (200×230 px)',
    size: '20 KB to 50 KB',
    dpi: '200 DPI',
    rule: 'Light or white background. No glare or tinted glasses',
    tool: '/tools/ibps-photo-signature-resizer',
  },
  {
    authority: 'IBPS (PO, Clerk, SO, RRB)',
    doc: 'Signature',
    dims: '140 × 60 pixels',
    size: '10 KB to 20 KB',
    dpi: '200 DPI',
    rule: 'Black ink pen only. Must NOT be signed in CAPITAL letters',
    tool: '/tools/ibps-photo-signature-resizer',
  },
  {
    authority: 'IBPS (PO, Clerk, SO, RRB)',
    doc: 'Left Thumb (LTI)',
    dims: '240 × 240 pixels (1:1)',
    size: '20 KB to 50 KB',
    dpi: '200 DPI',
    rule: 'Dermal friction ridges must be clearly visible without excessive ink pooling',
    tool: '/tools/thumb-impression-resizer',
  },
  {
    authority: 'IBPS (PO, Clerk, SO, RRB)',
    doc: 'Handwritten Declaration',
    dims: '800 × 400 pixels (2:1)',
    size: '50 KB to 100 KB',
    dpi: '200 DPI',
    rule: 'English running script only. Black ink. Disqualified if written in CAPS',
    tool: '/tools/handwritten-declaration-scanner',
  },
  {
    authority: 'Railway RRB (NTPC, ALP, Group D)',
    doc: 'Passport Photo',
    dims: '320 × 240 pixels (Landscape)',
    size: '20 KB to 50 KB',
    dpi: '300 DPI',
    rule: 'Unique 4:3 landscape orientation. Plain light/white background',
    tool: '/tools/rrb-photo-signature-resizer',
  },
  {
    authority: 'Railway RRB (NTPC, ALP, Group D)',
    doc: 'Signature',
    dims: '160 × 80 pixels',
    size: '10 KB to 40 KB',
    dpi: '300 DPI',
    rule: 'Black or blue ink on clean unlined white sheet',
    tool: '/tools/rrb-photo-signature-resizer',
  },
  {
    authority: 'NTA NEET UG',
    doc: 'Postcard Photograph',
    dims: '4" × 6" inches (1200×1800 px)',
    size: '50 KB to 300 KB',
    dpi: '300 DPI',
    rule: 'Large format. Name and date of photograph stamped at bottom',
    tool: '/tools/neet-photo-signature-resizer',
  },
  {
    authority: 'NTA NEET UG',
    doc: 'Passport Photograph',
    dims: '3.5 × 4.5 cm (200×300 px)',
    size: '10 KB to 200 KB',
    dpi: '300 DPI',
    rule: '80% face coverage, ears visible, white background',
    tool: '/tools/neet-photo-signature-resizer',
  },
  {
    authority: 'GATE / JAM (IIT GOAPS)',
    doc: 'Passport Photo',
    dims: '3.5 × 4.5 cm (480×640 px)',
    size: '20 KB to 200 KB',
    dpi: '300 DPI',
    rule: 'Strict face-to-height ratio (3.15–3.95 cm) for GOAPS automated face detection',
    tool: '/tools/gate-photo-signature-resizer',
  },
  {
    authority: 'TNPSC (OTR Portal)',
    doc: 'Photo with Name/Date',
    dims: '3.5 × 4.5 cm',
    size: '20 KB to 50 KB',
    dpi: '200 DPI',
    rule: 'Mandatory white bottom strip with Name in Capitals + Date of Photograph',
    tool: '/tools/tnpsc-otr-compliance-kit',
  },
  {
    authority: 'TNPSC (OTR Portal)',
    doc: 'Signature',
    dims: '6.0 × 2.0 cm',
    size: '10 KB to 20 KB',
    dpi: '200 DPI',
    rule: 'Strict 10–20 KB ceiling and floor. Blue or black ink',
    tool: '/tools/tnpsc-otr-compliance-kit',
  },
  {
    authority: 'MoRTH Sarathi (DL / LL)',
    doc: 'Passport Photo',
    dims: '35 mm × 45 mm (413×531 px)',
    size: '20 KB to 50 KB',
    dpi: '300 DPI',
    rule: '300 DPI binary JFIF density tag mandatory. Light gray or white background',
    tool: '/tools/sarathi-driving-licence-photo-signature-resizer',
  },
  {
    authority: 'MoRTH Sarathi (DL / LL)',
    doc: 'Signature',
    dims: '20 mm × 50 mm (236×591 px)',
    size: '10 KB to 20 KB',
    dpi: '300 DPI',
    rule: 'Landscape 2.5:1 ratio. Strictly 10 KB to 20 KB tolerance',
    tool: '/tools/sarathi-driving-licence-photo-signature-resizer',
  },
  {
    authority: 'PAN Card (NSDL / UTIITSL)',
    doc: 'Applicant Photo',
    dims: '213 × 213 pixels (1:1)',
    size: '10 KB to 30 KB',
    dpi: '300 DPI',
    rule: 'Strict 30 KB ceiling. 300 DPI binary injection required',
    tool: '/tools/pan-card-photo-signature-resizer',
  },
  {
    authority: 'PAN Card (NSDL / UTIITSL)',
    doc: 'Specimen Signature',
    dims: '400 × 200 pixels (2:1)',
    size: '10 KB to 60 KB',
    dpi: '600 DPI',
    rule: 'Ultra-high resolution 600 DPI required for laser card etching',
    tool: '/tools/pan-card-photo-signature-resizer',
  },
  {
    authority: 'EPFO Member Portal',
    doc: 'Bank Cheque / Passbook',
    dims: 'Full Document View',
    size: '100 KB to 500 KB',
    dpi: '200 DPI',
    rule: 'Pre-printed member name, IFSC code, and account number must be legible',
    tool: '/tools/epfo-passbook-photo-resizer',
  },
];

const FAQS = [
  {
    question: 'How often are the exam specifications in this database updated?',
    answer:
      'Our radar is synchronized directly with the latest official recruitment notifications issued by UPSC, SSC, IBPS, NTA, RRB, and State PSCs. Any rule changes—such as SSC live webcam capture, UPSC 10-day freshness mandate, or TNPSC OTR formatting updates—are reviewed and reflected immediately.',
  },
  {
    question: 'Why do different exams have different photo dimension and file size rules?',
    answer:
      'Different exam commissions utilize distinct digital verification and server infrastructures. For example, SSC requires a 3.5 × 4.5 cm portrait (20–50 KB), UPSC requires a square 350 × 350 px image (20–300 KB) with candidate name and capture date, Railway RRB requires a 320 × 240 px landscape photo, and NTA NEET requires both a standard passport photo and a large 4" × 6" postcard photo.',
  },
  {
    question: 'Can I directly resize my photo from this radar?',
    answer:
      'Yes! Every exam listed in the radar includes a direct link to a dedicated, pre-calibrated Kagazo tool that automatically applies the required pixel dimensions, aspect ratio, DPI metadata, and byte boundaries with zero configuration.',
  },
  {
    question: 'What is the most common reason for online application form rejection?',
    answer:
      'Over 75% of application rejections are caused by non-compliant photos and signatures: including blurry or pixelated signatures, photos with colored or patterned backgrounds, files failing minimum/maximum byte thresholds (such as an 8 KB signature when 10 KB is the floor), and missing date stamps.',
  },
  {
    question: 'Why do portals like IBPS and SSC reject signatures written in capital letters?',
    answer:
      'A signature is legally defined as an individualized, continuous handwritten mark (running or cursive script). Signatures written in detached capital block letters lack unique biometrics and can be easily forged, triggering immediate disqualification under official portal rules.',
  },
  {
    question: 'What does the UPSC 10-day photo freshness rule mandate?',
    answer:
      'Under UPSC guidelines, the uploaded photograph must have been taken within 10 days of the application portal opening. The candidate full name in capital letters and the exact date on which the photograph was captured must be visibly printed in a white strip at the bottom of the photo.',
  },
  {
    question: 'Why does Railway RRB require a landscape photo instead of portrait?',
    answer:
      'Railway Recruitment Boards (RRB NTPC, ALP, Group D) format admit cards and computer-based test (CBT) attendance terminals using a 4:3 landscape framing (320 × 240 pixels). Uploading a standard vertical passport photo causes facial distortion or clipping on RRB examination screens.',
  },
  {
    question: 'What is the difference between image DPI and file size in KB?',
    answer:
      'File size in kilobytes (KB) represents the total byte storage of the image file on disk, while DPI (dots per inch) is resolution metadata indicating physical print density. Government portals enforce both: a file must be within a specific byte range (e.g., 20–50 KB) and possess proper DPI tags (e.g., 200 or 300 DPI) for high-definition admit card printing.',
  },
  {
    question: 'Can I convert a PNG image to JPG by just renaming the file extension?',
    answer:
      'No. Simply renaming "photo.png" to "photo.jpg" only changes the filename on your device—the internal binary encoding remains PNG. When uploaded to government portals, the server-side validator reads the binary magic bytes (`FF D8 FF` for JPEG vs `89 50 4E 47` for PNG), detects the mismatch, and rejects the file.',
  },
  {
    question: 'Is my personal photograph or signature uploaded to your servers when using Kagazo?',
    answer:
      'Never. Kagazo operates 100% locally in your device browser RAM using client-side HTML5 Canvas and WebAssembly. Your biometric photos, signatures, thumb impressions, and certificates are never transmitted over the internet or stored on cloud servers.',
  },
];

export default function ExamSpecificationRadarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Kagazo Exam Recruitment Specification Radar',
        url: 'https://kagazo.in/tools/specifications',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Interactive search database of official photo, signature, and document specifications for 40+ Indian government and entrance exams.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Exam Specifications Radar',
            item: 'https://kagazo.in/tools/specifications',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold truncate">Exam Specifications Radar</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Compass className="w-4 h-4 text-primary" />
            <span>Interactive Recruitment Portal Guidelines (2026 Edition)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Exam Photo &amp; Signature </span>
            <span className="text-primary">Specifications Radar</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Search, compare, and verify official photo dimensions, signature sizes, KB limits, DPI requirements, and background rules across <strong>40+ national and state recruitment exams</strong> in India. Pre-calibrated for 2026 notifications.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ 40+ Indian Recruitment Boards',
              '✓ 1-Click Pre-Calibrated Launch',
              '✓ 2026 Rules (SSC Live / UPSC 10-Day)',
              '✓ Exact Byte & Dimension Limits',
              '✓ 100% In-RAM Privacy',
            ].map((tag) => (
              <span
                key={tag}
                className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Master 40+ Directory</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Central, banking, railway, entrance, and state PSC portal rules updated for 2026.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">1-Click Auto-Calibrate</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Launch directly into pre-calibrated tools with exact dimensions and file size bounds.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-surface-darker/70 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">100% In-RAM Privacy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                All resizing and formatting runs strictly on your device. Zero cloud uploads.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Core Interactive Radar Engine */}
            <ExamSpecificationRadar />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* Official Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Master Recruitment Exam Specifications Table (2026 Guidelines)
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Official dimensions, byte limits, DPI resolution, and background rules across major Indian boards
                  </p>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Verified 2026 Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface border-b border-surface-darker text-text-main/70 uppercase text-[10px] tracking-wider">
                      <th className="p-3 font-bold">Exam Authority</th>
                      <th className="p-3 font-bold">Upload Document</th>
                      <th className="p-3 font-bold">Required Dimensions</th>
                      <th className="p-3 font-bold">Permitted File Size</th>
                      <th className="p-3 font-bold">Resolution</th>
                      <th className="p-3 font-bold">Mandatory Rule</th>
                      <th className="p-3 font-bold text-right">Quick Tool</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {MASTER_SPECS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 font-bold text-text-main">{row.authority}</td>
                        <td className="p-3 font-medium text-text-main/90">{row.doc}</td>
                        <td className="p-3 font-mono font-semibold text-primary">{row.dims}</td>
                        <td className="p-3 font-bold text-emerald-700 bg-emerald-50/50 rounded-sm">
                          {row.size}
                        </td>
                        <td className="p-3 font-mono text-text-main/70">{row.dpi}</td>
                        <td className="p-3 text-text-main/70 max-w-xs">{row.rule}</td>
                        <td className="p-3 text-right">
                          <Link
                            href={row.tool}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-dark underline"
                          >
                            <span>Resize</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Universal Golden Rules Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-surface-darker pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Universal Golden Rules for Exam Photo Compliance
                </h2>
                <p className="text-xs text-text-main/60 mt-0.5">
                  Follow these four non-negotiable standards to prevent immediate portal rejection
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <span>Plain White Background</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Over 90% of Indian exam commissions mandate a clean white or light off-white background. Colored walls, bedsheets, curtains, or outdoor backgrounds trigger automated reject flags in AI screening filters.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <span>No Headwear or Spectacles</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Caps, hats, and sunglasses are strictly prohibited. Religious headgear is allowed only if facial features from forehead to chin and both ears remain fully visible. Candidates should avoid glasses to prevent flash glare.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <span>No Signatures in CAPITAL Letters</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Signatures must be in natural, fluid cursive/running handwriting. Both IBPS and SSC explicitly disqualify candidates who sign using detached block/capital letters. Use dark black ink on unlined white paper.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                      4
                    </span>
                    <span>Binary JPEG Encoding (Not Renamed PNG)</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-8">
                    Portals read binary file headers to verify genuine JPEG formatting. Renaming a `.png` or `.webp` file extension to `.jpg` will cause server upload errors. Always export via a true JPEG encoder.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting & Portal Errors Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="border-b border-surface-darker pb-4">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Common Portal Upload Errors &amp; Exact Technical Fixes
                </h2>
                <p className="text-xs text-text-main/60 mt-0.5">
                  How to resolve the most frequent errors encountered on government recruitment gateways
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="text-amber-600 font-extrabold">Error:</span>
                    <span>&quot;File size must be between 10 KB and 20 KB&quot; (SSC / IBPS / Sarathi)</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                    <strong>The Cause:</strong> When users crop a small signature, ordinary compression tools shrink the file to 5–8 KB, falling below the mandatory 10 KB floor limit.
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed pl-6">
                    <strong>Kagazo Solution:</strong> Our bi-directional padding algorithm detects undersized images and inserts safe, standard-compliant JPEG metadata markers to elevate the file into the 14–18 KB safe zone without visual distortion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="text-amber-600 font-extrabold">Error:</span>
                    <span>&quot;Uploaded image does not match required aspect ratio&quot; (RRB / GATE / NEET)</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                    <strong>The Cause:</strong> Uploading a standard vertical passport photo to portals requiring landscape (Railway RRB 4:3) or postcard formats (NEET 4&quot; × 6&quot;).
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed pl-6">
                    <strong>Kagazo Solution:</strong> Every Kagazo tool features hardcoded aspect ratio guides matching each commission’s exact digital frame requirements.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-text-main">
                    <span className="text-amber-600 font-extrabold">Error:</span>
                    <span>&quot;Resolution must be 300 DPI / 200 DPI&quot; (MoRTH Sarathi / PAN Card)</span>
                  </div>
                  <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                    <strong>The Cause:</strong> Mobile camera images and standard web tools omit the binary DPI density marker, leaving files at the default 72 DPI screen resolution.
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed pl-6">
                    <strong>Kagazo Solution:</strong> Kagazo explicitly injects binary density tags (`0x012C` for 300 DPI, `0x00C8` for 200 DPI, or `0x0258` for 600 DPI) into the JPEG APP0 stream.
                  </p>
                </div>
              </div>
            </section>

            {/* Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions (Exam Photo &amp; Signature Guidelines)
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Clear, verified answers to common photo and signature upload queries
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Updated 2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Dedicated Exam Resizers Switcher */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Dedicated Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      SSC Photo &amp; Sig
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    20–50KB
                  </span>
                </Link>

                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UPSC Photo &amp; Sig
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    10-Day DOP
                  </span>
                </Link>

                <Link
                  href="/tools/ibps-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      IBPS &amp; Bank Exams
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4 Uploads
                  </span>
                </Link>

                <Link
                  href="/tools/rrb-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Railway RRB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    320×240
                  </span>
                </Link>

                <Link
                  href="/tools/neet-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      NEET Postcard &amp; Photo
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    4&quot; × 6&quot;
                  </span>
                </Link>

                <Link
                  href="/tools/gate-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      GATE GOAPS
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    Face OCR
                  </span>
                </Link>

                <Link
                  href="/tools/tnpsc-otr-compliance-kit"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      TNPSC OTR Kit
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    3-in-1
                  </span>
                </Link>

                <Link
                  href="/tools/sarathi-driving-licence-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Sarathi DL &amp; LL
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45mm
                  </span>
                </Link>

                <Link
                  href="/tools/pan-card-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PAN Card Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    213×213
                  </span>
                </Link>

                <Link
                  href="/tools/epfo-passbook-photo-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      EPFO Passbook Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    100–500KB
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                All specifications, tools, and calibrations execute locally in your browser memory. Zero files are uploaded.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 40+ Exams
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Pre-Calibrated
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


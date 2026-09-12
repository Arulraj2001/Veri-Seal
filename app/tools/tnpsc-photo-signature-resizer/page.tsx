import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Award,
  HelpCircle,
  Camera,
  PenTool,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageResizerEngine } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'TNPSC Photo & Signature Resizer Online Free | Exact 20-50KB & 10-20KB Guarantee',
  description:
    'Resize and compress your TNPSC photograph (20KB - 50KB with Name & Date) and signature (10KB - 20KB) online free. Strict size guarantee so TNPSC One Time Registration (OTR) never rejects your upload.',
  alternates: {
    canonical: 'https://veriseal.in/tools/tnpsc-photo-signature-resizer',
  },
  openGraph: {
    title: 'TNPSC Photo & Signature Resizer - Exact Size Guarantee | VeriSeal',
    description:
      'Free online tool to resize TNPSC photo (20-50KB with Name/Date) and signature (10-20KB). In-memory processing, zero ads, no watermark.',
    url: 'https://veriseal.in/tools/tnpsc-photo-signature-resizer',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const TNPSC_FAQS = [
  {
    question: 'What is the exact photo and signature size required for TNPSC OTR?',
    answer:
      'For TNPSC One Time Registration (OTR) and applications: The photograph must be between 20 KB and 50 KB with dimensions 3.5 cm x 4.5 cm (approx 413 x 531 pixels at 300 DPI) with candidate name and date of photo printed at the bottom. The signature must be strictly between 10 KB and 20 KB with dimensions 3.5 cm x 1.5 cm (approx 413 x 177 pixels).',
  },
  {
    question: 'Why does TNPSC reject my signature with "File size less than 10 KB"?',
    answer:
      'When students crop their signature to 3.5cm x 1.5cm, standard compressors reduce the file to 3–6 KB. TNPSC servers reject any signature under 10 KB. VeriSeal solves this by applying 300 DPI super-sampling and safe JFIF padding to guarantee the output is strictly between 12 KB and 18 KB.',
  },
  {
    question: 'Is it mandatory to print Name and Date on the TNPSC photograph?',
    answer:
      'Yes, as per TNPSC notification guidelines, the applicant photograph must have a clear white rectangular strip at the bottom containing the candidate full name in block letters and the date on which the photograph was taken.',
  },
  {
    question: 'Does VeriSeal store my uploaded photograph or signature?',
    answer:
      'No. VeriSeal processes all files completely in system memory (RAM). Neither your photo nor your signature is ever saved to permanent disk storage, ensuring 100% privacy and security.',
  },
];

export default function TnpscPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'TNPSC Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://veriseal.in/tools/tnpsc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize and compress your TNPSC photograph (20KB - 50KB with Name & Date) and signature (10KB - 20KB) online free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for TNPSC Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Photo or Signature Mode',
            text: 'Choose between Signature Mode (10-20KB, 3.5x1.5cm) or Photo Mode (20-50KB, 3.5x4.5cm).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Scanned File',
            text: 'Upload your smartphone photo or scanner capture.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enable Name & Date or Xerox Boost',
            text: 'For photos, enter Candidate Name and DOP. For signatures, toggle Xerox Ink Boost.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Guaranteed Output',
            text: 'Preview side-by-side with clarity loupe, then download verified JPEG ready for TNPSC portal.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: TNPSC_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'TNPSC Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>TNPSC Group 1, 2, 4 &amp; VAO Portal Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TNPSC Photo &amp; Signature </span>
            <span className="text-primary">Resizer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Resize photos to 20–50 KB (with Name &amp; Date) and signatures to 10–20 KB. 
            Solves the under-size rejection error on TNPSC One Time Registration (OTR).
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="signature"
              examName="TNPSC OTR"
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official TNPSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official TNPSC Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict guidelines mandated by the Tamil Nadu Public Service Commission.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  TNPSC 2026 Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Document Type</th>
                      <th className="py-3 px-3 font-bold">Allowed Size Range</th>
                      <th className="py-3 px-3 font-bold">Dimensions</th>
                      <th className="py-3 px-3 font-bold">Special Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/70 text-text-main">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-primary" /> Photograph
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          20 KB to 50 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">3.5 cm x 4.5 cm (413x531 px)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Candidate Name &amp; Date of Photo at bottom</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold flex items-center gap-1.5">
                        <PenTool className="w-4 h-4 text-primary" /> Signature
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          10 KB to 20 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">3.5 cm x 1.5 cm (413x177 px)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Blue/black pen on clean white background</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold">Community Certificate</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          100 KB to 200 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">PDF Format</td>
                      <td className="py-3.5 px-3 text-text-main/70">
                        <Link href="/tools/tnpsc-pdf-compressor" className="text-primary font-bold hover:underline">
                          Use TNPSC PDF Compressor →
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* Why VeriSeal is Better for Students */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">Under-Size Guarantee</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Never get rejected with &quot;File size less than 10 KB&quot;. Our engine automatically super-samples signatures to guarantee they land in the legal 10–20 KB bracket.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">100% Free Forever</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Zero paywalls, no watermark additions, and no sign-in required. Built specifically for Tamil Nadu students and cyber cafes.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">RAM-Only Privacy</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Your face photograph and signature are processed in memory and never stored on server disks. 100% safe.
                </p>
              </div>
            </section>

            {/* Hyper-Targeted FAQ Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2 pb-2 border-b border-surface-darker/60">
                <HelpCircle className="w-5 h-5 text-primary" />
                TNPSC Photo &amp; Signature FAQs
              </h2>

              <div className="space-y-3 pt-2">
                {TNPSC_FAQS.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-surface-darker rounded-2xl bg-surface/40 p-4 sm:p-5 open:bg-surface transition-all cursor-pointer"
                  >
                    <summary className="font-bold text-sm sm:text-base text-text-main list-none flex items-center justify-between">
                      <span>{faq.question}</span>
                      <span className="text-primary text-xl transition-transform group-open:rotate-180 font-bold">▾</span>
                    </summary>
                    <p className="text-xs sm:text-sm text-text-main/80 mt-3 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Cross-Link to TNPSC PDF Compressor */}
            <aside className="p-6 sm:p-8 rounded-3xl bg-surface border border-primary/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-extrabold text-text-main flex items-center gap-2 justify-center sm:justify-start">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Need to compress Community or SSLC Marksheet to 200KB?
                </h3>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Use our 100% free TNPSC PDF document compressor for certificates, hall tickets, and marksheets.
                </p>
              </div>
              <Link
                href="/tools/tnpsc-pdf-compressor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                TNPSC PDF Compressor
                <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </main>

          {/* Right Sticky Sidebar (32% Width) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            {/* Quick Switch Card */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  Exam Tools Quick Switch
                </h3>
                <span className="text-[10px] font-extrabold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary/20">
                  Instant
                </span>
              </div>
              <div className="space-y-1.5 pt-0.5">
                {[
                  { name: 'TNPSC Photo & Sig Resizer', href: '/tools/tnpsc-photo-signature-resizer', active: true, tag: 'Current' },
                  { name: 'TNPSC Document Compressor (200KB)', href: '/tools/tnpsc-pdf-compressor', active: false, tag: 'Certificates' },
                  { name: 'Compress PDF to 200KB', href: '/tools/compress-pdf-to-200kb', active: false, tag: 'Popular' },
                  { name: 'Compress PDF to 100KB', href: '/tools/compress-pdf-to-100kb', active: false, tag: 'Strict' },
                  { name: 'UPSC Document Compressor', href: '/tools/upsc-pdf-compressor', active: false, tag: 'UPSC' },
                  { name: 'SSC Document Compressor', href: '/tools/ssc-pdf-compressor', active: false, tag: 'SSC' },
                  { name: 'All Government Exam Tools', href: '/tools/government-exam-pdf-compressor', active: false, tag: 'Hub' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all border',
                      item.active
                        ? 'bg-primary-light border-primary/40 text-primary shadow-2xs'
                        : 'bg-surface/40 border-surface-darker hover:border-primary/40 hover:bg-white text-text-main'
                    )}
                  >
                    <span className="truncate pr-2">{item.name}</span>
                    <span
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0',
                        item.active ? 'bg-primary text-white' : 'bg-surface border border-surface-darker text-text-main/60'
                      )}
                    >
                      {item.tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Slot A: Sticky Sidebar Display Unit */}
            <AdSlot slot="sidebar" />

            {/* Official TNPSC Cheatsheet Card */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                TNPSC OTR Quick Cheatsheet
              </h3>
              <div className="space-y-2 text-xs divide-y divide-surface-darker/60">
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Photo Size</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">20 – 50 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Signature Size</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">10 – 20 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Photo Dimensions</span>
                  <span className="font-mono font-bold text-text-main bg-surface px-2 py-0.5 rounded-md">3.5 x 4.5 cm</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Signature Dimensions</span>
                  <span className="font-mono font-bold text-text-main bg-surface px-2 py-0.5 rounded-md">3.5 x 1.5 cm</span>
                </div>
              </div>
            </div>

            {/* Privacy Shield */}
            <div className="p-5 rounded-3xl bg-surface/60 border border-surface-darker space-y-2">
              <div className="flex items-center gap-2 text-text-main font-black text-xs">
                <Lock className="w-4 h-4 text-primary" />
                <span>100% In-Memory Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Your photograph and signature are processed in RAM and never written to permanent disk storage. Zero data retention.
              </p>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/tnpsc-photo-signature-resizer" />
      </div>
    </div>
  );
}

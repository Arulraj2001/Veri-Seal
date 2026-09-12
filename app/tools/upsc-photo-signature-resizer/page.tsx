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
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'UPSC Photo & Signature Resizer Online Free | 20-300KB 350x350px | VeriSeal',
  description:
    'Resize photo (20-300KB with Name & Date, 3/4th face) and signature (20-300KB, Min 350x350px) for UPSC Civil Services, NDA, CDS, and OTR. Strictly compliant with UPSC 10-day photo rule.',
  alternates: {
    canonical: 'https://veriseal.in/tools/upsc-photo-signature-resizer',
  },
  openGraph: {
    title: 'UPSC Photo & Signature Resizer Online Free | VeriSeal',
    description:
      'Resize photo and signature for UPSC OTR. Strict 20-300KB and 350x350px guarantee. In-memory processing, zero watermark.',
    url: 'https://veriseal.in/tools/upsc-photo-signature-resizer',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const UPSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'UPSC Photo (20-300KB, 350x350px)',
    minKb: 20,
    maxKb: 300,
    widthPx: 500,
    heightPx: 500,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'UPSC Signature (20-300KB, 350x350px)',
    minKb: 20,
    maxKb: 300,
    widthPx: 500,
    heightPx: 500,
    isXerox: true,
  },
];

const UPSC_FAQS = [
  {
    question: 'What are the exact photo and signature dimensions for UPSC OTR?',
    answer:
      'The Union Public Service Commission (UPSC) requires: Both Photograph and Signature must have minimum dimensions of 350 pixels x 350 pixels (and maximum 1000 x 1000 pixels). The file size for both must be strictly between 20 KB and 300 KB in JPG/JPEG format.',
  },
  {
    question: 'What is the UPSC 10-Day Photo Rule?',
    answer:
      'As per UPSC guidelines, the photograph uploaded must not be older than 10 days from the date of online application opening. The candidate name and date on which the photo was taken must be clearly printed at the bottom of the photograph. The candidate face should occupy at least 3/4th (75%) of the photograph space.',
  },
  {
    question: 'Why does UPSC OTR show "Resolution less than 350x350" error?',
    answer:
      'Standard image compressors reduce pixel dimensions to shrink the file size, dropping it below 350x350 pixels. VeriSeal enforces a safe 500x500 pixel canvas while keeping the file comfortably between 40 KB and 150 KB, completely preventing resolution errors.',
  },
  {
    question: 'Is this UPSC tool 100% free with no watermark?',
    answer:
      'Yes, 100% free forever. VeriSeal does not add any watermarks, does not require sign-up, and processes your photo and signature completely in RAM memory without storing them on server disks.',
  },
];

export default function UpscPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'UPSC Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://veriseal.in/tools/upsc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize photo and signature for UPSC Civil Services, NDA, CDS, and OTR. Strictly compliant with UPSC 10-day photo rule.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for UPSC OTR Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose UPSC Photo or Signature',
            text: 'Select UPSC Photo (with Name and DOP) or UPSC Signature.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Scan',
            text: 'Upload recent photo or signature.',
          },
          {
            '@type': 'HowToStep',
            name: 'Add Name and Date (10-Day Rule)',
            text: 'Type candidate name and capture date for the mandatory bottom strip.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant JPEG',
            text: 'Preview side-by-side with clarity loupe, then download verified JPEG ready for UPSC portal.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: UPSC_FAQS.map((faq) => ({
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
            { label: 'UPSC Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>UPSC CSE, NDA, CDS &amp; OTR Portal Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>UPSC Photo &amp; Signature </span>
            <span className="text-primary">Resizer Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Resize photos and signatures to 20–300 KB with minimum 350x350 pixels resolution. 
            Complies with the official UPSC 10-day recent photo rule and 3/4th face coverage.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-8 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="UPSC OTR"
              customPresets={UPSC_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official UPSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official UPSC Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict guidelines enforced by the Union Public Service Commission portal.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  UPSC Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Item</th>
                      <th className="py-3 px-3 font-bold">Allowed Size Range</th>
                      <th className="py-3 px-3 font-bold">Resolution Limits</th>
                      <th className="py-3 px-3 font-bold">Key Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/70 text-text-main">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-primary" /> Photograph
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          20 KB to 300 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">Min 350x350 px (Max 1000x1000 px)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Candidate Name &amp; Date of Photo at bottom; &le;10 days old</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold flex items-center gap-1.5">
                        <PenTool className="w-4 h-4 text-primary" /> Signature
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                          20 KB to 300 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">Min 350x350 px (Max 1000x1000 px)</td>
                      <td className="py-3.5 px-3 text-text-main/70">Clean white paper, black ballpoint ink</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3.5 px-3 font-bold">Degree / Age Proof PDF</td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          20 KB to 300 KB
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono">PDF Format</td>
                      <td className="py-3.5 px-3 text-text-main/70">
                        <Link href="/tools/upsc-pdf-compressor" className="text-primary font-bold hover:underline">
                          Use UPSC PDF Compressor →
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* Why VeriSeal is Better for UPSC Aspirants */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">350x350 Resolution Guard</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Never get rejected with &quot;Pixel dimensions less than 350x350&quot;. VeriSeal enforces the exact square geometry required by UPSC OTR.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">Auto 10-Day Rule Strip</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Automatically generates the compliant white bottom strip with candidate full name and recent capture date.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-surface-darker shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-text-main text-base sm:text-lg">In-Memory Privacy</h3>
                <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
                  Processed in RAM only. Your photograph and signature are never saved on server disks.
                </p>
              </div>
            </section>

            {/* Hyper-Targeted FAQ Accordion */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2 pb-2 border-b border-surface-darker/60">
                <HelpCircle className="w-5 h-5 text-primary" />
                UPSC Photo &amp; Signature FAQs
              </h2>

              <div className="space-y-3 pt-2">
                {UPSC_FAQS.map((faq, index) => (
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

            {/* Cross-Link to UPSC PDF Compressor */}
            <aside className="p-6 sm:p-8 rounded-3xl bg-surface border border-primary/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-extrabold text-text-main flex items-center gap-2 justify-center sm:justify-start">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Need to compress UPSC Degree or Community PDF?
                </h3>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Compress your certificate PDF to strictly between 20 KB and 300 KB for UPSC Civil Services DAF and OTR.
                </p>
              </div>
              <Link
                href="/tools/upsc-pdf-compressor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                UPSC PDF Compressor
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
                  { name: 'UPSC Photo & Sig Resizer', href: '/tools/upsc-photo-signature-resizer', active: true, tag: 'Current' },
                  { name: 'UPSC Document Compressor', href: '/tools/upsc-pdf-compressor', active: false, tag: '20-300KB' },
                  { name: 'TNPSC Photo & Sig Resizer', href: '/tools/tnpsc-photo-signature-resizer', active: false, tag: 'TNPSC' },
                  { name: 'Image to PDF under 200KB', href: '/tools/image-to-pdf-200kb', active: false, tag: 'Marksheets' },
                  { name: 'Compress PDF to 200KB', href: '/tools/compress-pdf-to-200kb', active: false, tag: 'Popular' },
                  { name: 'Compress PDF to 100KB', href: '/tools/compress-pdf-to-100kb', active: false, tag: 'Strict' },
                  { name: 'All Exam Tools', href: '/tools/government-exam-pdf-compressor', active: false, tag: 'Hub' },
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

            {/* Official UPSC Cheatsheet Card */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-surface-darker shadow-card space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-text-main flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                UPSC OTR Quick Cheatsheet
              </h3>
              <div className="space-y-2 text-xs divide-y divide-surface-darker/60">
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Photo Size</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">20 – 300 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Signature Size</span>
                  <span className="font-mono font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">20 – 300 KB</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Min Resolution</span>
                  <span className="font-mono font-bold text-text-main bg-surface px-2 py-0.5 rounded-md">350 x 350 px</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-text-main">Max Resolution</span>
                  <span className="font-mono font-bold text-text-main bg-surface px-2 py-0.5 rounded-md">1000 x 1000 px</span>
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
        <RelatedTools currentSlug="/tools/upsc-photo-signature-resizer" />
      </div>
    </div>
  );
}

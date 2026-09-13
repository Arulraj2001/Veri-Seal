import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Car,
  CheckCircle2,
  FileCheck,
  CreditCard,
  PenTool,
} from 'lucide-react';
import { SarathiResizerEngine } from '@/components/tools/SarathiResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Sarathi Parivahan Driving Licence Photo (35×45mm) & Signature Resizer Free | Kagazo',
  description:
    'Resize photo (35x45 mm, 20–50 KB) and signature (20x50 mm, 10–20 KB) for Parivahan Sarathi 4.0 driving license applications and renewals. 100% private in-browser processing.',
  alternates: {
    canonical: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
  },
  openGraph: {
    title: 'Sarathi Driving Licence Photo & Signature Resizer Online Free | Kagazo',
    description:
      'Official Parivahan Sarathi 4.0 dimensions: 35x45 mm photo (20-50 KB) and 20x50 mm signature (10-20 KB) at 300 DPI.',
    url: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What are the exact photo specifications for Sarathi Parivahan Driving Licence?',
    answer:
      'The Ministry of Road Transport & Highways (MoRTH) requires applicant passport photographs to measure 35 mm × 45 mm (or 413 × 531 pixels at 300 DPI). The file size must be strictly between 20 KB and 50 KB in JPEG/JPG format with a light or white background.',
  },
  {
    question: 'What are the exact signature specifications for Sarathi 4.0 portal?',
    answer:
      'The signature file must measure 20 mm × 50 mm (or 236 × 591 pixels at 300 DPI) and must strictly be between 10 KB and 20 KB in JPEG/JPG format. Signatures below 10 KB or above 20 KB will be rejected automatically.',
  },
  {
    question: 'Why does the Parivahan portal show "File size is out of bounds"?',
    answer:
      'Sarathi has an unusually tight threshold for signatures (10 KB to 20 KB). Regular compressors often compress signatures to 8 KB (too small!) or 22 KB (too large!). Kagazo’s binary search engine guarantees the signature lands between 12 KB and 18 KB with 300 DPI JFIF markers embedded.',
  },
  {
    question: 'Can I upload a phone selfie for my driving licence renewal?',
    answer:
      'Yes. Upload your portrait selfie. Our engine allows you to adjust zoom, center the crop, and straighten the orientation to match standard 35×45 mm passport photo guidelines.',
  },
  {
    question: 'Are my identity files stored or saved anywhere?',
    answer:
      'No. All resizing, cropping, and quantization occur directly in your browser’s volatile RAM via WebAssembly. Zero files are uploaded to any server.',
  },
];

export default function SarathiDrivingLicenceResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Sarathi Driving Licence Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/sarathi-driving-licence-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Resize driving licence photo to 35x45mm (20-50KB) and signature to 20x50mm (10-20KB) for Sarathi Parivahan.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for Driving Licence Application',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Photo & Signature',
            text: 'Select or drag your photo and signature into the Sarathi workspace.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Crop & Ink Cleaner',
            text: 'Align the 35x45mm photo crop guide and enhance the signature ink clarity.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant Files',
            text: 'Download individual files or the combined Sarathi Kit ZIP for upload.',
          },
        ],
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
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Structured Data */}
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
          <span className="text-primary font-bold">Sarathi DL Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Ministry of Road Transport &amp; Highways (MoRTH) Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Sarathi Driving Licence </span>
            <span className="text-primary">Photo &amp; Signature Resizer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Crop photo to 35×45 mm (20–50 KB) and signature to 20×50 mm (10–20 KB) at 300 DPI for Sarathi Parivahan DL applications and renewals.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column (col-span-9 / col-span-10) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SarathiResizerEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Cheatsheet Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Official Parivahan Sarathi 4.0 Upload Rules
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for learner licence (LL), driving licence (DL), and renewal applications.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5 text-primary">Applicant Photo</th>
                      <th className="p-3.5 text-primary">Applicant Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Dimensions</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        35 mm × 45 mm (413 × 531 px)
                      </td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        20 mm × 50 mm (236 × 591 px)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">DPI Resolution</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                      <td className="p-3.5 text-emerald-700 font-bold">300 DPI</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">File Size Limit</td>
                      <td className="p-3.5 font-bold text-primary">Strictly 20 KB to 50 KB</td>
                      <td className="p-3.5 font-bold text-primary">Strictly 10 KB to 20 KB</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Allowed Format</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Frequently asked questions regarding Sarathi Parivahan photo and signature uploads.
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-surface-darker rounded-2xl bg-surface/50 open:bg-white transition-all overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 font-bold text-text-main text-xs sm:text-sm cursor-pointer list-none select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-text-main/80 leading-relaxed border-t border-surface-darker/40 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail (col-span-3 / col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/pan-card-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PAN Card Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    213×213
                  </span>
                </Link>

                <Link
                  href="/tools/epfo-passbook-photo-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      EPFO Cheque Leaf
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    &lt;500 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Signature 20KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    20 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Photo 50KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    50 KB
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    300 DPI
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Biometrics and signatures are processed exclusively in client-side volatile RAM. Zero server uploads.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Sarathi 4.0 Verified
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ 300 DPI Embedded
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

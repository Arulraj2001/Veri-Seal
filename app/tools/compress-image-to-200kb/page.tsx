import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  FileCheck,
  Building,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import { UniversalImageCompressor } from '@/components/tools/UniversalImageCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress Image to 200KB Online Free | High-Resolution Quality | Kagazo',
  description:
    'Compress any image, certificate scan, or document photo strictly under 200KB online free. Ideal for government portals, UPSC, SSC, and state PSC applications. 100% private.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-to-200kb',
  },
  openGraph: {
    title: 'Compress Image to 200KB Online Free | Kagazo',
    description:
      'Reduce photo and certificate scans to strictly under 200KB without blur. Instant in-browser processing.',
    url: 'https://kagazo.in/tools/compress-image-to-200kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do government portals mandate 200KB for certificate uploads?',
    answer:
      'Government exam and recruitment portals (such as TNPSC, SSC, UPSC, and State PSCs) enforce strict 100KB–200KB limits on certificates, community papers, and marksheets. This guarantees readability while keeping server storage manageable for millions of applicants.',
  },
  {
    question: 'Will text on my certificate or marksheet stay readable at 200KB?',
    answer:
      'Yes. 200KB is generous for document photos. Kagazo uses adaptive unsharp masking and 4:4:4 color preservation to ensure small text, registration numbers, and official stamps remain sharp and legible.',
  },
  {
    question: 'Can I crop off messy desk backgrounds before compressing?',
    answer:
      'Yes! Open the "Crop & Edit Studio" on the page to freely frame, straighten, or crop out unwanted table or desk areas around your document with interactive handles.',
  },
  {
    question: 'Is this 200KB tool safe for confidential government documents?',
    answer:
      '100% secure. Processing is executed in your browser RAM using WebAssembly. Your documents are never uploaded to our servers, keeping your sensitive identity details completely private.',
  },
  {
    question: 'What file formats can I compress with this 200KB tool?',
    answer:
      'You can upload JPG, JPEG, PNG, and WebP documents or photos. The compressed output is formatted in standard, RFC-compliant JPEG ready for instant upload to any official portal.',
  },
];

export default function CompressImageTo200KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to 200KB Online Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-to-200kb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress any certificate or document image strictly under 200KB online free. Fast, private, and watermark-free.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress an Image to 200KB',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Document or Photo',
            text: 'Select your certificate, marksheet, or photo.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automatic 200KB Calibration',
            text: 'Kagazo compresses the file to land safely between 170KB and 198KB.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download & Submit',
            text: 'Preview with instant zoom and download your portal-ready file.',
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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kagazo.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://kagazo.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Compress Image to 200KB',
            item: 'https://kagazo.in/tools/compress-image-to-200kb',
          },
        ],
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
          <span className="text-primary font-bold">Compress Image to 200KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Target Ceiling: Max 200 KB Guaranteed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">200KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Shrink certificate scans, marksheets, and photos to strictly under 200KB. Perfect for government portal uploads and identity verifications.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (75% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalImageCompressor
              initialTargetKb={200}
              isFixedTarget={true}
              toolHeading="Compress to Strictly Under 200 KB"
              toolSubheading="Optimized for government portal submissions, educational marksheets, and ID scans."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Common 200KB Use Cases */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Where 200KB Image Limits Are Strictly Enforced
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Govt Recruitment Portals</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    SSC, TNPSC, and State PSCs mandate 100KB–200KB limits for community, nativity, and degree certificates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">University Marksheets</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    College admissions and entrance exam portals require semester grade sheets compressed under 200KB.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/70 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-text-main">Banking &amp; KYC Proofs</h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    SBI, IBPS, and bank loan verification portals enforce 200KB caps on passbook and address proofs.
                  </p>
                </div>
              </div>
            </section>

            {/* 200KB Portal Requirement Matrix */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Official 200KB Document &amp; Certificate Upload Matrix
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Exact upload limits across state recruitment, university portals, and banking exams.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/60">
                      <th className="py-3 px-4 font-bold text-text-main">Authority / Portal</th>
                      <th className="py-3 px-4 font-bold text-text-main">Accepted Certificate</th>
                      <th className="py-3 px-4 font-bold text-primary">Allowed Range</th>
                      <th className="py-3 px-4 font-bold text-emerald-700">Verification Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-text-main">TNPSC Group 1, 2, 4 OTR</td>
                      <td className="py-3.5 px-4 text-text-main/80">SSLC / Community / Degree</td>
                      <td className="py-3.5 px-4 font-medium text-primary">100 KB – 200 KB</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Must be sharp and legible scan</td>
                    </tr>
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-text-main">SSC (Combined Graduate Level)</td>
                      <td className="py-3.5 px-4 text-text-main/80">Caste / EWS Certificate</td>
                      <td className="py-3.5 px-4 font-medium text-primary">50 KB – 200 KB</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Clear official seal visible</td>
                    </tr>
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-text-main">UPSC Civil Services OTR</td>
                      <td className="py-3.5 px-4 text-text-main/80">Photo ID Card Scan</td>
                      <td className="py-3.5 px-4 font-medium text-primary">20 KB – 300 KB (Photo 200KB)</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Both sides clearly cropped</td>
                    </tr>
                    <tr className="hover:bg-surface/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-text-main">SBI / IBPS Bank Exam Portals</td>
                      <td className="py-3.5 px-4 text-text-main/80">Handwritten Declaration</td>
                      <td className="py-3.5 px-4 font-medium text-primary">50 KB – 100 KB / 200 KB</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-medium">Black ink on white paper</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (200KB Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear answers about compressing images to 200KB.
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

          {/* Compact Sticky Right Sidebar Rail (25% Width) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix - High Density Single-Line List */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Other Targets
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-image-exact-kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Exact KB Slider
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Custom
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-100kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 100KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    100 KB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-1mb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 1MB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    1 MB
                  </span>
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress to 50KB
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

            {/* Sleek In-Memory RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Images are compressed on your local device. Zero data is ever sent to external cloud servers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ Zero Server Upload</span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">✓ Instant Speed</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

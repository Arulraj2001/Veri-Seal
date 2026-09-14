import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  FileText,
  Award,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { UniversalImageCompressor } from '@/components/tools/UniversalImageCompressor';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress Image to 200KB Online Free | Document & Marksheet Sizing | Kagazo',
  description:
    'Compress certificates, marksheet scans, degree diplomas, and Aadhaar cards to strictly under 200KB online free. Keep fine text razor-sharp with zero server uploads.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-to-200kb',
  },
  openGraph: {
    title: 'Compress Image to 200KB Online Free | Kagazo',
    description:
      'Compress scanned certificates and documents to strictly under 200KB while keeping text clear and legible.',
    url: 'https://kagazo.in/tools/compress-image-to-200kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do government exam portals mandate certificate scans under 200 KB?',
    answer:
      'State and national examination commissions (such as UPSC, SSC, IBPS, State PSCs) store millions of candidate educational certificates, caste certificates, and identity cards. The 200 KB threshold strikes the ideal balance between low server storage costs and sufficient resolution for human verification officers to inspect roll numbers and signatures.',
  },
  {
    question: 'Will text and small numbers on my marksheet remain readable at 200 KB?',
    answer:
      'Yes. Kagazo applies intelligent high-pass stroke contrast filtering. Instead of blurring text like generic compressors, our engine preserves dark ink edges and sharp high-frequency details on white document backgrounds, ensuring roll numbers, grades, and official seals remain fully legible.',
  },
  {
    question: 'Can I compress Aadhaar card and PAN card images to 200 KB safely?',
    answer:
      'Yes. Both identity cards are easily compressed to under 200 KB. Because all processing executes client-side in your web browser memory, your confidential identity documents, Aadhaar numbers, and addresses are never transmitted across the internet.',
  },
  {
    question: 'What resolution (DPI) should I scan certificates at for 200 KB output?',
    answer:
      'Scanning documents at 150 to 200 DPI in grayscale or RGB color produces optimal results for 200 KB output. If your scanner outputs a 300 DPI image (typically 3–8 MB), Kagazo optimizes the raster data to fit under 200 KB without requiring manual rescan.',
  },
  {
    question: 'Can I compress a photo taken with my mobile phone camera to 200 KB?',
    answer:
      'Yes. Upload any mobile phone camera snapshot. Kagazo strips heavy camera metadata, normalizes dynamic range, and compresses the 4–12 MB mobile photo to strictly under 200 KB in seconds.',
  },
  {
    question: 'Should I convert my document to PDF or keep it as JPEG under 200 KB?',
    answer:
      'Check your specific exam portal notification. Some portals mandate JPG format for certificates, while others require single-page PDF. If your portal requires PDF, use our dedicated "Image to PDF 200KB" tool.',
  },
  {
    question: 'Does this tool remove unnecessary EXIF and camera metadata?',
    answer:
      'Yes. Unnecessary camera EXIF tags, GPS location data, and embedded thumbnails are stripped during compression, freeing up valuable kilobytes for higher document image quality.',
  },
  {
    question: 'Are my confidential government identity documents uploaded to any server?',
    answer:
      'Never. Kagazo operates 100% inside your browser’s volatile JavaScript memory. Your certificates, marksheets, and personal records are never saved to cloud storage or seen by anyone.',
  },
  {
    question: 'Does Kagazo add any watermarks or stamps to my compressed document?',
    answer:
      'No. All downloads are 100% watermark-free, clean, and ready for official submission to government and academic portals.',
  },
  {
    question: 'Is there any daily limit on the number of certificates I can compress?',
    answer:
      'Zero limits. You can compress unlimited marksheets, diplomas, identity cards, and receipts completely free.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Certificate or Marksheet Scan',
    desc: 'Select or drag-and-drop your degree certificate, marksheet, or ID scan (JPG, PNG, WEBP, HEIC supported).',
  },
  {
    step: 2,
    title: 'Confirm 200 KB Target Limit',
    desc: 'The tool defaults to a strict 200 KB ceiling, ensuring the output file complies with recruitment upload limits.',
  },
  {
    step: 3,
    title: 'Text Contrast & Stroke Enhancement',
    desc: 'The engine enhances contrast on text strokes and numbers to maintain complete legibility.',
  },
  {
    step: 4,
    title: 'Inspect Quality & File Size',
    desc: 'Use the interactive clarity loupe preview to verify that roll numbers, subjects, and seals are crisp.',
  },
  {
    step: 5,
    title: 'Download Verified Document',
    desc: 'Download your compressed certificate image instantly with zero watermarks, ready for portal upload.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "File size exceeds 200 KB limit"',
    title: 'High-Resolution Scanner Bloat',
    desc: 'Raw flatbed scans at 300 DPI produce 5–15 MB files that portals reject. Kagazo compresses your scan safely into the 160–190 KB sweet spot.',
  },
  {
    badge: 'Error: Unreadable Roll Numbers & Marks',
    title: 'Aggressive Generic Compression',
    desc: 'Basic image compressors blur fine characters. Kagazo preserves high-contrast text edges so verification officers can clearly read every grade.',
  },
  {
    badge: 'Error: Faint Ink / Official Seal Washout',
    title: 'Over-Bleached Document Scans',
    desc: 'Low-contrast stamps and signatures can disappear. Kagazo balances luminance levels to keep official government stamps and signatures legible.',
  },
  {
    badge: 'Error: Dark Gray Background Shadow',
    title: 'Uneven Ambient Camera Lighting',
    desc: 'Photographing documents on desks creates dark edge shadows. Kagazo cleans background illumination to simulate a flatbed scanner output.',
  },
];

export default function CompressImageTo200KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to 200KB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-to-200kb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Compress marksheet scans, degree certificates, and ID cards to strictly under 200KB online free with zero watermark.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Image to 200 KB Online in 5 Steps',
        description:
          'Step-by-step instructions to compress document scans and certificates under 200 KB.',
        step: HOW_TO_STEPS.map((s) => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.desc,
          position: s.step,
        })),
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
            <span>Document &amp; Marksheet Compressor (Under 200 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">200KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress marksheet scans, degree certificates, Aadhaar cards, and PAN cards to strictly <strong>under 200 KB</strong>. Keep fine text razor-sharp with 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalImageCompressor
              initialTargetKb={200} isFixedTarget={true}
              toolHeading="Compress to Strictly Under 200 KB"
              toolSubheading="Perfect for marksheet scans, degree certificates, Aadhaar cards, and PAN cards."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Document Legibility Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Preserving Micro-Text and Official Stamps Under 200 KB
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Government verification portals require certificates to be under 200 KB while retaining total legibility for candidate names, roll numbers, and official signatures. Kagazo delivers sharp document images with zero server logging.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Text Stroke Sharpening
                  </span>
                  <p className="text-xs text-text-main/70">
                    Maintains high contrast on printed numbers, grades, and cursive signatures without blur.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Government Exam Ready
                  </span>
                  <p className="text-xs text-text-main/70">
                    Optimized for UPSC, SSC, State PSC, and university portals enforcing 200 KB document limits.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Confidential identity documents and academic records never leave your local device memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Government Portal 200KB Document Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Standard document upload limits across national and state examination boards.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Document Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Document Category</th>
                      <th className="py-3 px-3">Typical Raw Size</th>
                      <th className="py-3 px-3">Portal Maximum</th>
                      <th className="py-3 px-3">Format &amp; Quality Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">10th / 12th Marksheet Scan</td>
                      <td className="py-3 px-3">2 MB – 6 MB</td>
                      <td className="py-3 px-3 font-bold text-primary">Strictly &lt; 200 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">JPEG / PDF (160–190 KB)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">College Degree / Diploma</td>
                      <td className="py-3 px-3">3 MB – 8 MB</td>
                      <td className="py-3 px-3 font-bold text-primary">Strictly &lt; 200 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">Clear seal &amp; signature</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Aadhaar Card / PAN Card Scan</td>
                      <td className="py-3 px-3">1 MB – 4 MB</td>
                      <td className="py-3 px-3 font-bold text-primary">Strictly &lt; 200 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">Color JPEG (300 DPI)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Community / Caste Certificate</td>
                      <td className="py-3 px-3">2 MB – 5 MB</td>
                      <td className="py-3 px-3 font-bold text-primary">Strictly &lt; 200 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">Legible tehsildar seal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Tip:</strong> After compression, zoom in on the marksheet roll number and official stamp to ensure complete legibility before final submission.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Image to 200 KB in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common 200 KB Document Upload Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (200 KB Document Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Expert advice on marksheet compression, readability, and portal guidelines.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-4">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-image-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 100KB
                </Link>
                <Link
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/image-to-pdf-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Marksheet Image to PDF
                </Link>
                <Link
                  href="/tools/compress-image-exact-kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress to Exact KB
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Academic certificates and personal identity scans are processed in device RAM with zero server exposure.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

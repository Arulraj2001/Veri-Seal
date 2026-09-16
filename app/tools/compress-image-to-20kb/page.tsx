import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Camera,
  PenTool,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Compress Image to 20KB Online Free | Exact 10-20KB Signature & Photo | Kagazo',
  description:
    'Compress image and signature to strictly between 10 KB and 20 KB online free. Bi-directional auto-calibration prevents under-size rejection. Zero watermark, 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-to-20kb',
    languages: {
      'ta-IN': 'https://kagazo.in/ta/tools/compress-image-to-20kb',
      'en': 'https://kagazo.in/tools/compress-image-to-20kb',
      'x-default': 'https://kagazo.in/tools/compress-image-to-20kb',
    },
  },
  openGraph: {
    title: 'Compress Image to 20KB Online Free | Kagazo',
    description:
      'Compress photos and signatures strictly between 10 KB and 20 KB. Never rejected by government recruitment portals.',
    url: 'https://kagazo.in/tools/compress-image-to-20kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PRESETS_20KB: CustomPreset[] = [
  {
    id: 'signature',
    label: 'Online Signature (10-20KB)',
    minKb: 10,
    maxKb: 20,
    widthCm: 4.0,
    heightCm: 2.0,
    isXerox: true,
  },
  {
    id: 'photo',
    label: 'Small Photo (15-20KB)',
    minKb: 15,
    maxKb: 20,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'thumb',
    label: 'Thumb Impression (10-20KB)',
    minKb: 10,
    maxKb: 20,
    isXerox: true,
  },
];

const FAQS = [
  {
    question: 'How do I compress an image to strictly 20 KB without dropping below 10 KB?',
    answer:
      'Ordinary compressors only shrink images downwards, often turning cropped signatures into 4–8 KB files that get rejected by government exam portals with "File size less than 10 KB". Kagazo is bi-directional: it compresses images over 20 KB and safely pads images under 10 KB, ensuring the output strictly lands in the 12–18 KB safe zone.',
  },
  {
    question: 'Will my signature remain sharp and clear at 20 KB?',
    answer:
      'Yes. Kagazo applies our Xerox Ink Boost algorithm that washes background paper to pure white (#FFFFFF) while preserving high-contrast dark pen strokes, preventing the blurry pixelation typical of standard image compressors.',
  },
  {
    question: 'Which portals require 10-20 KB files?',
    answer:
      'Almost all major Indian recruitment and admission portals—including SSC (CGL, CHSL, MTS, GD), TNPSC Group 1, 2, 4, UPSC, IBPS, and State PSCs—mandate signatures and thumb impressions to be strictly between 10 KB and 20 KB.',
  },
  {
    question: 'Is this 20 KB compressor completely free with no watermarks?',
    answer:
      'Yes, 100% free with zero watermarks, zero subscription fees, and no account creation required. Download unlimited compliant photos and signatures anytime.',
  },
  {
    question: 'Are my private signatures and identity photos safe?',
    answer:
      'Yes, 100%. Kagazo performs all compression directly inside your browser volatile memory using HTML5 Canvas and typed arrays. Your files never get uploaded to any cloud server or database.',
  },
  {
    question: 'Can I compress mobile camera photos of my signature?',
    answer:
      'Yes. Take a well-lit photo of your signature on white paper using your phone. Kagazo automatically crops, straightens, removes yellow shadows, and compresses the 3MB camera image down to under 20 KB in seconds.',
  },
  {
    question: 'What ink color is recommended for 20 KB signatures?',
    answer:
      'Black or dark blue ballpoint pen ink on unruled white paper provides the highest contrast. Gel pens that reflect camera flash or pencil signatures should be avoided to prevent biometric validation errors.',
  },
  {
    question: 'Does this tool support PNG and WEBP input files?',
    answer:
      'Yes. You can upload JPG, PNG, WEBP, or HEIC files. Kagazo processes the image and automatically exports a compliant, standard JPEG file required by exam portals.',
  },
  {
    question: 'What pixel dimensions will my 20 KB signature have?',
    answer:
      'The standard 4.0 x 2.0 cm signature preset produces calibrated dimensions of approximately 140x60 px to 400x200 px at 200–300 DPI, ensuring sharp display without portal aspect ratio stretching.',
  },
  {
    question: 'Can cyber cafes and bulk applicants use this tool?',
    answer:
      'Yes. The tool runs client-side with lightning speed, making it ideal for cyber cafe operators, CSC centers, and candidates processing multiple application forms in a single session.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Select 10–20 KB Preset',
    desc: 'Choose Online Signature (10-20 KB), Small Photo (15-20 KB), or Thumb Impression based on your exam portal requirements.',
  },
  {
    step: 2,
    title: 'Upload Photo or Signature Scan',
    desc: 'Drag and drop your phone snapshot, scanner output, or image file (JPG, PNG, WEBP, HEIC supported).',
  },
  {
    step: 3,
    title: 'Adjust Framing & Xerox Filter',
    desc: 'Center the signature or face in the crop box. Enable Xerox Ink Booster to eliminate shadows and background tint.',
  },
  {
    step: 4,
    title: 'Bi-Directional Size Calibration',
    desc: 'The engine automatically compresses large files down and pads undersized files up to guarantee a 10–20 KB compliant file.',
  },
  {
    step: 5,
    title: 'Inspect & Download Verified JPEG',
    desc: 'Preview with our high-resolution clarity loupe to check exact KB size, then download the verified JPEG ready for upload.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "File size less than 10 KB"',
    title: 'Undersize Rejection Floor',
    desc: 'Cropping signatures closely drops file size to 4–8 KB, triggering portal rejection. Kagazo injects safe JFIF structural padding to lock files safely between 12 KB and 18 KB.',
  },
  {
    badge: 'Error: Blurry / Pixelated Signature',
    title: 'Over-Compression Artifacts',
    desc: 'Generic tools lower JPEG quality to 10%, making strokes unreadable. Kagazo uses 300 DPI supersampling and contrast boosting to maintain crisp handwriting.',
  },
  {
    badge: 'Error: Signature in Capital Letters',
    title: 'Disallowed Capital Letter Handwriting',
    desc: 'Portals like SSC strictly disqualify signatures written in all-caps. Always sign in your natural running cursive handwriting on unruled paper.',
  },
  {
    badge: 'Error: Unsupported File Format (PNG)',
    title: 'Uploading Non-JPEG File Extensions',
    desc: 'Renaming .png to .jpg fails backend portal MIME checks. Kagazo encodes a genuine JFIF standard JPEG binary to ensure seamless portal acceptance.',
  },
];

export default function CompressImageTo20KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to 20KB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-to-20kb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Bi-directional image compressor for 10-20 KB government exam photo and signature uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Image to 20 KB Online in 5 Steps',
        description:
          'Step-by-step instructions to compress photos and signatures strictly between 10 KB and 20 KB.',
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
            name: 'Compress Image to 20KB',
            item: 'https://kagazo.in/tools/compress-image-to-20kb',
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
          <span className="text-primary font-bold">Compress Image to 20KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Bi-Directional Auto-Enhance Engine (10–20 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">20KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Resize photos and signatures strictly between <strong>10 KB and 20 KB</strong>. Prevent &quot;file size less than 10 KB&quot; rejection errors and blurry pixelation with client-side calibration.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="signature"
              examName="General / Exam"
              customPresets={PRESETS_20KB}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bi-Directional Calibration
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  The Under-Size Trap: Why Ordinary 20KB Compressors Fail
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                When you crop a signature closely, it contains very few pixels. Generic compressors reduce it to 4 KB – 8 KB, causing instant rejection on SSC, UPSC, and TNPSC portals. Kagazo compresses large files and safely pads undersized files into the 12–18 KB safe window.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Bi-Directional Pad
                  </span>
                  <p className="text-xs text-text-main/70">
                    Prevents rejection by ensuring signature files never fall below the mandatory 10.0 KB floor.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <PenTool className="w-4 h-4" /> Xerox Ink Booster
                  </span>
                  <p className="text-xs text-text-main/70">
                    Strips yellow tints and shadows from phone snaps, leaving bold dark strokes on pure white paper.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    All compression runs locally in device RAM. Biometric documents are never sent across the internet.
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
                    Government Exam 10KB - 20KB Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict parameters drawn from national and state recruitment authorities.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Official Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Authority / Exam</th>
                      <th className="py-3 px-3">Document Type</th>
                      <th className="py-3 px-3">Allowed Range</th>
                      <th className="py-3 px-3">Dimensions / Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">SSC (CGL, CHSL, MTS, GD)</td>
                      <td className="py-3 px-3">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">4.0 cm × 2.0 cm (JPG)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">UPSC (Civil Services, NDA, CDS)</td>
                      <td className="py-3 px-3">Signature &amp; Small Photo</td>
                      <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB (Sig)</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">350 × 350 px (JPG)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">TNPSC (Group 1, 2, 4 OTR)</td>
                      <td className="py-3 px-3">Candidate Signature</td>
                      <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">6.0 cm × 2.0 cm (JPG)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">IBPS / SBI Bank PO &amp; Clerk</td>
                      <td className="py-3 px-3">Signature &amp; Left Thumb</td>
                      <td className="py-3 px-3 font-bold text-primary">10.0 KB – 20.0 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">140 × 60 px (JPG)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Validation Notice:</strong> Government portals enforce both byte size (10.0–20.0 KB) and JPEG MIME format. Always verify against your active recruitment notification.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Image to 20 KB in 5 Steps
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
                Common 20 KB Upload Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (20 KB Image Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive answers on file size calibration, portal standards, and privacy.
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
                Related Compressors
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSC Photo &amp; Signature Resizer
                </Link>
                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  UPSC Photo &amp; Signature Resizer
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
                Images are processed in device memory. Zero signatures or biometric files are ever uploaded or saved.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Printer,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
  Sliders,
  Sparkles,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ChangeImageDpiEngine } from '@/components/tools/ChangeImageDpiEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Change Image DPI Online Free (300 / 600 DPI) | Kagazo',
  description:
    'Convert image resolution to 300 DPI or 600 DPI online free. Rewrite JFIF binary metadata tags without quality loss. Guaranteed compliance for passport photos, exam portals, and print labs.',
  alternates: {
    canonical: 'https://kagazo.in/tools/change-image-dpi',
  },
  openGraph: {
    title: 'Change Image DPI Online Free (300 / 600 DPI) | Kagazo',
    description:
      'Change image DPI to exact 300 or 600 DPI in your browser. 100% private, RFC-compliant JFIF metadata rewriting.',
    url: 'https://kagazo.in/tools/change-image-dpi',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'What does changing DPI actually do to an image file?',
    answer:
      'DPI (Dots Per Inch) is a metadata tag inside the image file (JFIF APP0 marker) that instructs printers and portal verification engines how many pixels to render per linear inch. Changing the DPI from 72 to 300 sets this tag to 300 dots per inch without altering or degrading your actual image pixel data.',
  },
  {
    question: 'Why do government exam and passport portals reject 72 DPI images?',
    answer:
      'Standard web images and smartphone screenshots are automatically saved with a default 72 or 96 DPI metadata tag. Official government portals (like UPSC, SSC, US Visa DS-160, and Passport Seva) scan the binary JFIF header and reject files that fail to declare 300 DPI or 200 DPI resolution.',
  },
  {
    question: 'Does changing DPI from 72 to 300 increase my file size?',
    answer:
      'No. Because Kagazo rewrites the internal JFIF density bytes (`0xFFE0`) directly rather than artificially upscaling blank pixels, your image sharpness is preserved without unnecessarily inflating your file size.',
  },
  {
    question: 'Which DPI should I choose for print versus web submissions?',
    answer:
      'Choose 300 DPI for all official passport photos, visa applications, government hall tickets, and photo lab prints. Choose 600 DPI for high-definition archival scans, fine biometric finger impressions, and legal evidence.',
  },
  {
    question: 'Are my photos uploaded to any server to inject the DPI metadata?',
    answer:
      'No. The DPI injection runs entirely client-side in your browser RAM by rewriting binary JFIF marker segments (`0xFFE0`). No photos are ever uploaded or transmitted across the internet.',
  },
  {
    question: 'What is the difference between DPI and image pixel resolution?',
    answer:
      'Pixel resolution (e.g. 1920x1080) defines the total grid of pixels comprising an image. DPI defines the physical printing density (how many of those pixels fit onto one inch of paper). A 600x600 pixel image printed at 300 DPI yields a crisp 2x2 inch physical print.',
  },
  {
    question: 'Can I change the DPI of PNG or WEBP images?',
    answer:
      'Yes. For PNG images, Kagazo injects the standard pHYs chunk. For JPEG files, it injects the JFIF APP0 marker. The output is fully compliant across all image viewers.',
  },
  {
    question: 'How do I verify the new DPI in Windows or macOS properties?',
    answer:
      'On Windows, right-click the downloaded file, select Properties > Details, and check "Horizontal resolution" and "Vertical resolution" (both will display 300 dpi). On macOS, open the file in Preview and press Cmd+I to view the DPI inspection tab.',
  },
  {
    question: 'Will changing the DPI reduce the visual quality of my photo?',
    answer:
      'Never. Binary metadata rewriting is 100% lossless. The RGB pixels representing your face, background, or document remain completely untouched bit-for-bit.',
  },
  {
    question: 'Is this DPI changer free for unlimited photos?',
    answer:
      'Yes, 100% free with zero watermarks, no registration, and no daily conversion limits. Use it for unlimited passport photos and documents.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Your Image',
    desc: 'Select or drag-and-drop your photo, document scan, or artwork (JPG, PNG, WEBP supported).',
  },
  {
    step: 2,
    title: 'Choose 300 or 600 DPI',
    desc: 'Select 300 DPI for official passport and exam portals, or 600 DPI for high-res archival printing.',
  },
  {
    step: 3,
    title: 'Instant Binary JFIF Injection',
    desc: 'The engine rewrites the APP0/pHYs density headers in browser memory without recompressing pixels.',
  },
  {
    step: 4,
    title: 'Verify Embedded Density Tags',
    desc: 'Review the live metadata panel confirming exact 300 DPI or 600 DPI calibration.',
  },
  {
    step: 5,
    title: 'Download Calibrated Image',
    desc: 'Download your verified, high-DPI image ready for immediate submission to strict portals.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "Image resolution below 300 DPI"',
    title: 'Default 72 DPI Smartphone Tag',
    desc: 'Phone cameras default to 72 DPI for screen viewing. Portals check internal headers and reject them. Kagazo updates the JFIF marker to 300 DPI without touching pixels.',
  },
  {
    badge: 'Error: Blurry Pixel Upscaling',
    title: 'Fake DPI Converters Resampling Pixels',
    desc: 'Basic tools stretch and resample pixels, causing blurriness. Kagazo uses pure metadata rewriting to keep your source image crystal sharp.',
  },
  {
    badge: 'Error: Missing JFIF Header Segment',
    title: 'Stripped Metadata from Social Media',
    desc: 'WhatsApp or web downloads strip density headers. Kagazo reconstructs the full standard JFIF 1.02 marker structure for guaranteed portal acceptance.',
  },
  {
    badge: 'Error: Unwanted File Size Inflation',
    title: 'Unnecessary Canvas Re-Encoding',
    desc: 'Re-saving images in basic software often triples file size. Kagazo updates only the 18-byte density segment, keeping file size lean and portal-compliant.',
  },
];

export default function ChangeImageDpiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Change Image DPI Online Free (300 / 600 DPI)',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/change-image-dpi',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Convert any image to 300 DPI or 600 DPI online free. RFC-compliant JFIF density marker injection with zero loss.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Change Image DPI to 300 Online in 5 Steps',
        description:
          'Step-by-step instructions to convert image resolution to 300 DPI or 600 DPI online free.',
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
            name: 'Change Image DPI',
            item: 'https://kagazo.in/tools/change-image-dpi',
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
          <span className="text-primary font-bold">Change Image DPI</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RFC-Compliant JFIF Metadata Density Injector</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Change Image DPI to </span>
            <span className="text-primary">300 or 600 DPI Online</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert image resolution to <strong>300 DPI</strong> or <strong>600 DPI</strong> without recompression. Rewrite JFIF binary metadata tags with zero quality loss and 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ChangeImageDpiEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Lossless Metadata Injection
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Direct Binary JFIF Rewriting Without Pixel Degradation
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Most online tools re-render your image onto a canvas, introducing JPEG blurriness. Kagazo injects exact 300 DPI or 600 DPI bytes directly into the binary header, preserving 100% of your original pixel fidelity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Printer className="w-4 h-4" /> 300 &amp; 600 DPI Presets
                  </span>
                  <p className="text-xs text-text-main/70">
                    Instant 1-click toggles for standard 300 DPI portal compliance or 600 DPI archival prints.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" /> Zero Re-Encoding
                  </span>
                  <p className="text-xs text-text-main/70">
                    Rewrites only the 18-byte density marker segment. No generational JPEG quality loss.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Binary patching runs in browser RAM. Your photos and sensitive documents are never uploaded.
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
                    DPI Standards Across Official Platforms &amp; Media
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Recommended resolution standards for digital submissions and physical print.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  DPI Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Resolution Setting</th>
                      <th className="py-3 px-3">Primary Application</th>
                      <th className="py-3 px-3">Binary Marker</th>
                      <th className="py-3 px-3">Portal Acceptance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">72 / 96 DPI</td>
                      <td className="py-3 px-3">Web browsing &amp; smartphone screens</td>
                      <td className="py-3 px-3 font-mono text-xs text-text-main/60">Default / Unset</td>
                      <td className="py-3 px-3 font-medium text-rose-600">Rejected by official portals</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">200 DPI</td>
                      <td className="py-3 px-3">A4 Document scans &amp; marksheets</td>
                      <td className="py-3 px-3 font-mono text-xs text-primary font-bold">JFIF 0x00C8</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">Accepted for certificates</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">300 DPI</td>
                      <td className="py-3 px-3 font-bold text-primary">Passport photos, visa forms, UPSC/SSC</td>
                      <td className="py-3 px-3 font-mono text-xs text-primary font-bold">JFIF 0x012C</td>
                      <td className="py-3 px-3 font-bold text-emerald-700">Mandatory Gold Standard</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">600 DPI</td>
                      <td className="py-3 px-3">Biometric thumbprints, archival scans</td>
                      <td className="py-3 px-3 font-mono text-xs text-primary font-bold">JFIF 0x0258</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">High-definition archival</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> Most government submission portals parse the <code>0xFFE0</code> JFIF density bytes. Always download and submit the calibrated 300 DPI JPEG.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Change Image DPI in 5 Steps
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
                Common DPI Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (Image DPI Conversion)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights on JFIF density markers, print quality, and verification.
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
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSC Photo Resizer
                </Link>
                <Link
                  href="/tools/upsc-photo-signature-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  UPSC Photo Resizer
                </Link>
                <Link
                  href="/tools/image-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Converter
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
                Binary JFIF rewriting runs in local device RAM. No images are ever uploaded or transmitted across networks.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

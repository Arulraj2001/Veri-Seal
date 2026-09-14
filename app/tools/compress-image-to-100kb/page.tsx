import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Briefcase,
  GraduationCap,
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
  title: 'Compress Image to 100KB Online Free | Keep Original Quality | Kagazo',
  description:
    'Compress any image, photo, or ID scan to strictly under 100KB online free. Ideal for job portals, university admissions, and resume photos. Zero watermark, 100% private.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-to-100kb',
  },
  openGraph: {
    title: 'Compress Image to 100KB Online Free | Kagazo',
    description:
      'Reduce photo and image size to strictly under 100KB without losing clarity. Instant in-browser processing.',
    url: 'https://kagazo.in/tools/compress-image-to-100kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do so many job portals and university applications require images under 100KB?',
    answer:
      'Portals like LinkedIn, Indeed, Naukri, and university application systems (Common App, state universities) host millions of user profiles. Enforcing a strict 100KB ceiling prevents server overload, speeds up page loading on mobile networks, and guarantees consistent avatar display across recruitment databases.',
  },
  {
    question: 'How does Kagazo compress images to 100KB without visible blur or distortion?',
    answer:
      'Kagazo uses an in-browser binary search compression algorithm that targets exactly 80–95 KB. By dynamically tuning discrete cosine transform (DCT) quantization tables and preserving high-frequency edge information, human facial features and text remain crisp.',
  },
  {
    question: 'Which format is best for 100KB compression: JPG, PNG, or WEBP?',
    answer:
      'For photographic portraits and scanned documents, JPEG delivers the highest visual fidelity at 100KB. For transparent logos, vector badges, or icons, WEBP or optimized PNG is superior. Kagazo allows you to export to your preferred format.',
  },
  {
    question: 'Will compressing an image to 100KB alter its pixel dimensions?',
    answer:
      'By default, Kagazo preserves your original pixel dimensions whenever mathematically feasible. If a massive 40-megapixel camera photo cannot fit into 100KB under reasonable compression quality, the engine intelligently scales down resolution while maintaining the exact original aspect ratio.',
  },
  {
    question: 'Can I compress smartphone camera photos (5–15 MB) down to 100KB?',
    answer:
      'Yes. Simply drag and drop your phone camera snapshot. The client-side engine strips redundant EXIF metadata, normalizes color space, and compresses the file directly into the safe 80–98 KB range in milliseconds.',
  },
  {
    question: 'Are my personal resume photos and identity cards uploaded to any cloud server?',
    answer:
      'Never. Kagazo processes 100% of your images locally in your web browser memory using HTML5 Canvas and WebAssembly. No files, metadata, or personal documents are ever transmitted across external networks.',
  },
  {
    question: 'Can I compress PDF documents to 100KB with this tool?',
    answer:
      'This tool is optimized for raster images (JPG, PNG, WEBP, HEIC). If you have a scanned document or marksheet PDF, use our dedicated Government Exam PDF Compressor tool for optimal multi-page compression.',
  },
  {
    question: 'Does Kagazo add any watermarks or brand logos to my compressed photo?',
    answer:
      'No. Kagazo never adds watermarks, stamps, or promotional overlays. Your compressed image is clean, professional, and ready for immediate submission.',
  },
  {
    question: 'Is this 100KB compressor compatible with mobile browsers on iOS and Android?',
    answer:
      'Yes. The interface is fully responsive and runs smoothly inside mobile Safari, Chrome, Samsung Internet, and Firefox on both smartphones and tablets.',
  },
  {
    question: 'Is there any daily limit on the number of images I can compress to 100KB?',
    answer:
      'None. You can compress as many images, photos, and ID cards as you need without registration, credit cards, or subscription fees.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Any Image or Document',
    desc: 'Select or drag-and-drop your photo, headshot, or document scan (supports JPG, PNG, WEBP, HEIC).',
  },
  {
    step: 2,
    title: 'Confirm 100 KB Target Limit',
    desc: 'The tool defaults to a strict 100 KB ceiling, ensuring the output file complies with strict upload limits.',
  },
  {
    step: 3,
    title: 'In-Memory Algorithmic Tuning',
    desc: 'The engine runs an iterative binary-search pass in RAM to balance compression quality against byte count.',
  },
  {
    step: 4,
    title: 'Side-by-Side Quality Inspection',
    desc: 'Inspect the clarity loupe preview to verify facial sharpness, text legibility, and exact file size in KB.',
  },
  {
    step: 5,
    title: 'Download Portal-Ready File',
    desc: 'Download your compressed image instantly with zero watermarks, ready for job portals and admissions.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "File exceeds 100 KB limit"',
    title: 'Oversized Application Upload',
    desc: 'University and job portals strictly reject 101 KB files. Kagazo targets the safe 85–95 KB sweet spot to prevent marginal boundary rejections.',
  },
  {
    badge: 'Error: Blurry / Unreadable Resume Photo',
    title: 'Excessive Compression Artifacts',
    desc: 'Generic tools lower quality across the entire image. Kagazo uses adaptive quantization to preserve facial edges and contrast while trimming excess byte bloat.',
  },
  {
    badge: 'Error: Incompatible Image Extension',
    title: 'Uploading Raw PNG or HEIC Files',
    desc: 'Many legacy portals only accept standard JPG files. Kagazo automatically converts non-standard uploads into universal JPEG binaries.',
  },
  {
    badge: 'Error: Color Profile Distortion',
    title: 'CMYK Color Shift on Web Portals',
    desc: 'Images saved in CMYK print color spaces look washed out on browsers. Kagazo normalizes all outputs to standard sRGB color profiles.',
  },
];

export default function CompressImageTo100KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to 100KB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-to-100kb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Compress photos, ID scans, and resume headshots to strictly under 100KB online free with zero watermark.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Image to 100 KB Online in 5 Steps',
        description:
          'Step-by-step instructions to compress photos and documents under 100 KB.',
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
            name: 'Compress Image to 100KB',
            item: 'https://kagazo.in/tools/compress-image-to-100kb',
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
          <span className="text-primary font-bold">Compress Image to 100KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>High-Fidelity Image Compression (Under 100 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">100KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Reduce photos and images to strictly <strong>under 100 KB</strong> without losing facial clarity or text legibility. Ideal for resume headshots, job applications, and university admissions.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <UniversalImageCompressor
              initialTargetKb={100} isFixedTarget={true}
              toolHeading="Compress to Strictly Under 100 KB"
              toolSubheading="Optimized specifically for resume profile photos, university admissions, and online forms."
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  100KB Precision Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Enterprise-Grade Image Compression for Applications &amp; Resumes
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Applying for jobs or college admissions requires professional photos that pass automated upload checks without visual distortion. Kagazo delivers sharp 100KB files with zero server storage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" /> Job Portals &amp; Resumes
                  </span>
                  <p className="text-xs text-text-main/70">
                    Compliant with LinkedIn, Indeed, Naukri, and recruitment platforms requiring headshots under 100 KB.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> College Admissions
                  </span>
                  <p className="text-xs text-text-main/70">
                    Meets entrance exam and university application guidelines enforcing strict 50KB–100KB portrait ceilings.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Your personal headshots and identity documents never touch external servers or cloud databases.
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
                    Common 100KB Upload Limit Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Overview of portals and institutions enforcing 100 KB document limits.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Application Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Platform / Category</th>
                      <th className="py-3 px-3">Document Type</th>
                      <th className="py-3 px-3">Enforced Ceiling</th>
                      <th className="py-3 px-3">Recommended Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Job Portals (LinkedIn, Indeed)</td>
                      <td className="py-3 px-3">Profile Photo / Avatar</td>
                      <td className="py-3 px-3 font-bold text-primary">Strictly &lt; 100 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">JPG or PNG (400×400 px)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">University Admission Portals</td>
                      <td className="py-3 px-3">Candidate ID Photo</td>
                      <td className="py-3 px-3 font-bold text-primary">50 KB – 100 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">JPG / JPEG</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Visa &amp; Immigration Portals</td>
                      <td className="py-3 px-3">Passport Bio-Page Scan</td>
                      <td className="py-3 px-3 font-bold text-primary">Strictly &lt; 100 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">Color JPEG (300 DPI)</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Citizen e-Services / OTR</td>
                      <td className="py-3 px-3">Identity Proof / Marksheet</td>
                      <td className="py-3 px-3 font-bold text-primary">Under 100 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">JPEG / PDF</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Safe Target Margin:</strong> Because portal servers round byte counts differently, Kagazo compresses files to approximately 88–95 KB to avoid accidental rejection at 100.1 KB.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Image to 100 KB in 5 Steps
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
                Common 100 KB Upload Pitfalls and How Kagazo Fixes Them
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
                  Frequently Asked Questions (100 KB Image Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Comprehensive insights on 100 KB compression, image quality, and format compliance.
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
                  href="/tools/compress-image-to-200kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 200KB
                </Link>
                <Link
                  href="/tools/compress-image-exact-kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress to Exact KB
                </Link>
                <Link
                  href="/tools/compress-image-to-1mb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 1MB
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
                Images are compressed in browser RAM. No personal photos or documents are ever uploaded to cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

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
  CheckCircle2,
  FileCheck,
  Sliders,
  Sparkles,
  CreditCard,
  PenTool,
  AlertTriangle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PanCardCropEngine } from '@/components/tools/PanCardCropEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PAN Card Photo (213×213 px, 300 DPI) & Signature (400×200 px, 600 DPI) Resizer Free | Kagazo',
  description:
    'Resize PAN card photo to 213×213 pixels at 300 DPI (<30 KB) and signature to 400×200 pixels at 600 DPI (<60 KB) for NSDL Protean & UTIITSL Form 49A. Embedded DPI headers, B&W ink clarity booster, zero uploads.',
  keywords: [
    'pan card photo size 213x213',
    'nsdl pan card photo resize online free',
    'utiitsl pan card photo specification',
    'pan card signature size 400x200',
    'form 49a photo signature resizer',
    'resize pan card photo 300 dpi online',
    'pan card photo 30kb resize',
    'protean eGov pan card photo size',
    'pan application photo resize free',
    'pan card signature 600 dpi online',
    'pan card photo resizer without watermark',
    'new pan card photo size requirement 2024 2025',
  ],
  alternates: {
    canonical: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
  },
  openGraph: {
    title: 'PAN Card Photo (213×213) & Signature (400×200) Resizer Online Free | Kagazo',
    description:
      'Official NSDL & UTIITSL dimensions. 213×213 @ 300 DPI photo, 400×200 @ 600 DPI signature with B&W ink booster. Zero uploads, instant download.',
    url: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAN Card Photo & Signature Resizer | NSDL & UTIITSL 2025 | Kagazo',
    description:
      'Resize photo to 213×213 px (300 DPI, <30 KB) and signature to 400×200 px (600 DPI, <60 KB) for NSDL Protean & UTIITSL PAN applications. 100% free, no uploads.',
  },
};

const FAQS = [
  {
    question: 'What are the exact photo specifications for NSDL and UTIITSL PAN Card applications in 2025?',
    answer:
      'Both Protean (NSDL e-Gov) and UTIITSL require applicant passport photographs to measure exactly 213 × 213 pixels (1:1 square ratio). At 300 DPI, this corresponds to approximately 1.8 cm × 1.8 cm. The file format must be JPEG/JPG with true 24-bit color, and the file size must strictly be between 10 KB and 30 KB. Photos below 10 KB or above 30 KB trigger an immediate portal-side upload error.',
  },
  {
    question: 'What are the exact signature specifications for PAN Card Form 49A and 49AA?',
    answer:
      'The applicant signature or left thumb impression must measure exactly 400 × 200 pixels (2:1 landscape aspect ratio) at 600 DPI resolution. The file size must be strictly between 10 KB and 60 KB in JPEG format. The ink should be dark black or dark blue on a clean white paper background with no ruled lines visible. Signatures written with gel pen on A4 paper and photographed in daylight give the best results.',
  },
  {
    question: 'Why does the NSDL portal reject my photo with "Resolution must be 300 DPI"?',
    answer:
      'Standard image editors (Paint, Canva, most phones) set pixel dimensions like 213×213 but leave the internal JFIF/EXIF resolution header at 72 DPI (web default) or 96 DPI. NSDL\'s server software inspects this binary header byte-by-byte during validation. Kagazo automatically writes the binary 300 DPI (0x012C) marker for photos and 600 DPI (0x0258) marker for signatures directly into the JFIF APP0 segment, guaranteeing portal acceptance.',
  },
  {
    question: 'Can I use a passport photo taken at a photo studio for my PAN application?',
    answer:
      'Yes, but studio photos are typically printed at 4×6 cm and scanned at 600 DPI+, resulting in files of 200 KB to 2 MB that are far too large. You also need to digitally crop to the precise 213×213 px square. Upload your studio photo scan to Kagazo — it will crop, resize, embed 300 DPI, and compress everything into the 10–30 KB required window automatically.',
  },
  {
    question: 'How does the B&W Ink Clarity Booster work for phone camera photos of signatures?',
    answer:
      'When you photograph a handwritten signature with a smartphone, paper creases, yellow room lighting, shadows from your hand, and low ambient contrast cause blurry, gray ink strokes that NSDL field officers reject as "signature not legible." Kagazo\'s in-browser Otsu thresholding algorithm separates dark pen strokes from the background using adaptive pixel luminance analysis. The result: pure white background with deep black ink strokes, visually identical to a proper scanner output.',
  },
  {
    question: 'What is the difference between NSDL (Protean) and UTIITSL PAN portals — do they have different photo sizes?',
    answer:
      'Both portals follow the same Income Tax Department guidelines for PAN Card Form 49A. The photo must be 213 × 213 pixels, and the signature must be 400 × 200 pixels. However, UTIITSL\'s upload interface is slightly more lenient with JPEG quality, while Protean eGov\'s portal performs strict server-side DPI header validation. Kagazo\'s output satisfies both.',
  },
  {
    question: 'My PAN card application shows "Photo size exceeds 30 KB limit." What should I do?',
    answer:
      'Your phone camera photo is likely 2–8 MB. Upload it to Kagazo and select the Photo preset (213×213, 300 DPI). The engine uses iterative binary-search JPEG quality reduction to hit the target window (ideally 20–28 KB) — neither too large nor too compressed to become unacceptably grainy.',
  },
  {
    question: 'Can I use a thumb impression instead of a signature for PAN card application?',
    answer:
      'Yes. The Income Tax Department allows a left thumb impression for illiterate applicants or those unable to sign. The impression must be taken in black or blue ink on clean white paper, attested by a Gazetted Officer or Notary Public. Photograph the impression in daylight and upload it — Kagazo\'s B&W booster will clean the background and resize to the required 400×200 px format.',
  },
  {
    question: 'Are my biometric photos and signatures uploaded to any server?',
    answer:
      'Never. Kagazo processes all image crops, DPI header injections, and JPEG quantization entirely inside your browser\'s volatile RAM via HTML5 Canvas and WebAssembly APIs. Zero bytes leave your device at any stage. When you close the browser tab, all image data is instantly purged from memory.',
  },
  {
    question: 'Does this tool work on mobile phones for PAN card applications?',
    answer:
      'Yes. Kagazo is fully responsive and works on Android Chrome, iPhone Safari, and all modern mobile browsers. You can directly upload a photo taken with your camera, use the in-browser crop guide to frame the 213×213 square, apply the ink booster for the signature, and download compliant files in under 60 seconds.',
  },
];


const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select NSDL or UTIITSL Mode",
    "desc": "Choose PAN Photo (213\u00d7213 px, under 50 KB) or PAN Signature (400\u00d7200 px, under 50 KB)."
  },
  {
    "step": 2,
    "title": "Upload Scanned Asset",
    "desc": "Upload your photo or signature scan in any image format."
  },
  {
    "step": 3,
    "title": "Verify 300 DPI Resolution",
    "desc": "NSDL requires exact 300 DPI for photo and 600 DPI for signature."
  },
  {
    "step": 4,
    "title": "Auto Size Compression",
    "desc": "Compresses output strictly under 50 KB or under 30 KB per portal rules."
  },
  {
    "step": 5,
    "title": "Download Compliant JPEG",
    "desc": "Download verified JPEG ready for upload to onlineservices.nsdl.com."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Non-213x213 px Dimensions",
    "title": "NSDL Strict 213x213 Pixel Lock",
    "desc": "NSDL and UTIITSL portals reject photos that differ from 213\u00d7213 px by even 1 pixel."
  },
  {
    "badge": "Error: File Exceeds 50 KB",
    "title": "PAN Portal Upload Size Error",
    "desc": "PAN portals enforce a strict 50 KB maximum ceiling. Kagazo compresses to safe 30 KB."
  },
  {
    "badge": "Error: Blue Ink Signature Used",
    "title": "NSDL Mandates Black Ink Signatures",
    "desc": "PAN applications require black ink on white paper. Kagazo darkens signature strokes."
  },
  {
    "badge": "Error: Low DPI Flagged",
    "title": "Resolution Below 300 DPI",
    "desc": "NSDL scanners check internal DPI metadata. Kagazo embeds true 300/600 DPI JFIF headers."
  }
];

export default function PanCardPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'NSDL & UTIITSL PAN Card Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Resize PAN card photo to 213×213 px at 300 DPI (<30 KB) and signature to 400×200 px at 600 DPI (<60 KB) for NSDL Protean and UTIITSL Form 49A. Embedded DPI binary headers, B&W ink booster, zero uploads.',
        featureList: [
          '213×213 px photo at 300 DPI with embedded JFIF header',
          '400×200 px signature at 600 DPI binary marker',
          'B&W Otsu ink clarity booster for phone-photographed signatures',
          'Strict 10–30 KB photo and 10–60 KB signature file size compliance',
          '100% client-side processing — zero server uploads',
          'ZIP kit download with both compliant files',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo & Signature for PAN Card Form 49A (NSDL & UTIITSL)',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Passport Photo',
            text: 'Click "Upload Photo" and select a clear front-facing photo (selfie, studio scan, or phone camera) with a light background.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust the 213×213 Square Crop',
            text: 'Center your face within the square crop guide. Ensure your face fills 70–80% of the frame with no headwear or heavy shadows.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Your Signature or Thumb Impression',
            text: 'Upload a photo of your signature on white paper. Enable the B&W Ink Clarity Booster to remove background shadows.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download the Verified PAN Kit',
            text: 'Click Download — get the 213×213 @ 300 DPI photo (<30 KB) and 400×200 @ 600 DPI signature (<60 KB) as individual files or a single ZIP.',
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kagazo.in/tools' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'PAN Card Photo & Signature Resizer',
            item: 'https://kagazo.in/tools/pan-card-photo-signature-resizer',
          },
        ],
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
          <span className="text-primary font-bold">PAN Card Photo &amp; Signature Resizer</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>NSDL (Protean eGov) &amp; UTIITSL Official Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PAN Card Photo </span>
            <span className="text-primary">(213×213 px)</span>
            <span> &amp; Signature </span>
            <span className="text-primary">(400×200 px)</span>
            <span> Resizer</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Crop and resize your applicant photo to exactly <strong>213×213 px at 300 DPI (&lt;30 KB)</strong> and signature to{' '}
            <strong>400×200 px at 600 DPI (&lt;60 KB)</strong>. Embedded JFIF binary headers guarantee zero rejection on NSDL Protean and UTIITSL portals for Form 49A / 49AA PAN applications.
          </p>

          {/* Key differentiator pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
            {[
              '✓ 300/600 DPI Binary Headers Embedded',
              '✓ B&W Ink Clarity Booster',
              '✓ Strict 10–30 KB Photo Cap',
              '✓ Zero Server Upload',
              '✓ ZIP Kit Download',
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

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Studio Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PanCardCropEngine />

            {/* Post-Action Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Official Portal Specifications Cheatsheet */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Official NSDL vs UTIITSL PAN Card Photo &amp; Signature Upload Rules
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verified parameters for online PAN applications via Form 49A (Indian Citizens) and Form 49AA (Foreign Citizens).
                  Last confirmed against Protean eGov and UTIITSL portal documentation.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5 text-primary">Passport Photograph</th>
                      <th className="p-3.5 text-primary">Signature / Thumb Impression</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Pixel Dimensions</td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        213 × 213 pixels (1:1 square)
                      </td>
                      <td className="p-3.5 font-mono font-bold text-text-main">
                        400 × 200 pixels (2:1 landscape)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Physical Size</td>
                      <td className="p-3.5">3.5 cm × 2.5 cm (approx 1.38&quot; × 1&quot;)</td>
                      <td className="p-3.5">4.0 cm × 2.0 cm (approx 1.57&quot; × 0.79&quot;)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">DPI Resolution</td>
                      <td className="p-3.5 font-bold text-emerald-700">300 DPI (JFIF binary required)</td>
                      <td className="p-3.5 font-bold text-emerald-700">600 DPI (JFIF binary required)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">File Size Limit</td>
                      <td className="p-3.5 font-bold text-primary">
                        Strictly 10 KB – 30 KB
                      </td>
                      <td className="p-3.5 font-bold text-primary">
                        Strictly 10 KB – 60 KB
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Color Mode</td>
                      <td className="p-3.5">24-bit True Color (sRGB)</td>
                      <td className="p-3.5">Black &amp; White / High-contrast Ink</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Allowed Format</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                      <td className="p-3.5">JPEG / JPG only</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Background</td>
                      <td className="p-3.5">White or off-white; plain; no patterns</td>
                      <td className="p-3.5">Pure white paper; no ruled lines</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Applicable Forms</td>
                      <td className="p-3.5">Form 49A (Indian) / Form 49AA (Foreign)</td>
                      <td className="p-3.5">Form 49A (Indian) / Form 49AA (Foreign)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-start gap-2 text-xs text-text-main/60 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-700">Critical:</strong> The most common rejection cause is the missing 300/600 DPI JFIF header — not the pixel dimensions. A 213×213 image saved at 72 DPI (web default) will be rejected even if it appears correctly sized.
                </span>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format PAN Card Photo & Signature in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant recruitment portal compliance:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{step.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Common PAN Card Upload Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common application mistakes that trigger instant portal rejection:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/70 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Who Uses the PAN Card Photo Resizer?
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'First-Time PAN Applicants',
                    desc: 'Students and first-time taxpayers applying online via Protean eGov (NSDL) or UTIITSL Form 49A.',
                  },
                  {
                    title: 'Lost PAN Card Reprint',
                    desc: 'Individuals requesting a duplicate PAN card due to loss, theft, or damaged card requiring updated biometric upload.',
                  },
                  {
                    title: 'Name / Address Correction',
                    desc: 'PAN correction requests (new signature, updated photo after marriage name change) via Form 49A.',
                  },
                  {
                    title: 'NRI & Foreign Citizen PAN (Form 49AA)',
                    desc: 'Non-resident Indians and foreign nationals applying via Form 49AA for business registration or investment transactions.',
                  },
                  {
                    title: 'CSC & Cyber Cafe Operators',
                    desc: 'Common Service Centre operators and cyber cafe agents processing PAN applications for rural and semi-urban applicants.',
                  },
                  {
                    title: 'Tax Consultants & CA Firms',
                    desc: 'Chartered accountants and tax professionals handling bulk PAN applications for their clients.',
                  },
                ].map((uc) => (
                  <div key={uc.title} className="flex gap-3 p-3 rounded-2xl bg-surface border border-surface-darker/60">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-text-main">{uc.title}</p>
                      <p className="text-xs text-text-main/70 leading-relaxed mt-0.5">{uc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions — PAN Card Photo &amp; Signature Resizer
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about NSDL and UTIITSL photo and signature requirements for PAN applications.
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

            {/* Privacy & Security Section */}
            <section className="bg-gradient-to-br from-emerald-50/60 to-slate-50 dark:from-slate-900 dark:to-slate-900 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Privacy Architecture — Your Biometrics Never Leave Your Device
              </h2>
              <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed">
                All processing — including crop operations, JFIF DPI header injection, Otsu thresholding, and JPEG quality reduction — executes{' '}
                <strong>100% inside your browser's volatile RAM</strong> using HTML5 Canvas, FileReader API, and WebAssembly. Your photos and signatures are never transmitted to any external server,
                stored in any database, or logged in any form. When you close the tab, all image memory is immediately released by the browser's garbage collector.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-emerald-700">
                {[
                  '✓ Zero Server Upload',
                  '✓ No Account Required',
                  '✓ No Watermark',
                  '✓ No File Storage',
                  '✓ HTTPS Encrypted Page',
                  '✓ Works Offline After Load',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>

              <div className="space-y-1.5">
                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar + PAN Merge
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    KYC
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
                      Change DPI (600)
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DPI
                  </span>
                </Link>

                <Link
                  href="/tools/sarathi-driving-licence-photo-signature-resizer"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      DL Sarathi Resizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
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
                Biometrics and signatures are processed exclusively in client-side volatile RAM. Zero server uploads.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ NSDL 300 DPI
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ UTIITSL 600 DPI
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

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
  FileText,
  Sliders,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'RRB Photo & Signature Resizer — NTPC, Group D, ALP 2026 | Kagazo',
  description:
    'Resize your RRB NTPC, Group D, ALP, and JE photo (320x240 px landscape, 20–50 KB) and signature (160x80 px, 10–40 KB) to exact Railway portal specs. Free, no server upload.',
  alternates: {
    canonical: 'https://kagazo.in/tools/rrb-photo-signature-resizer',
  },
  openGraph: {
    title: 'RRB Photo & Signature Resizer | Kagazo — Free, Zero Upload',
    description:
      'Format Railway RRB NTPC, Group D, ALP photo and signature to exact dimensions. Fixes landscape 320x240 px and running signature requirements.',
    url: 'https://kagazo.in/tools/rrb-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const RRB_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'RRB Photo (20–50 KB, 320×240 px Landscape)',
    minKb: 20,
    maxKb: 50,
    widthPx: 320,
    heightPx: 240,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'RRB Signature (10–40 KB, 160×80 px)',
    minKb: 10,
    maxKb: 40,
    widthPx: 160,
    heightPx: 80,
    isXerox: true,
  },
];

const RRB_FAQS = [
  {
    question: 'What is the exact photo size for RRB NTPC, ALP, and Group D in pixels?',
    answer:
      'Official Railway Recruitment Board (RRB) guidelines mandate a 320 pixels wide by 240 pixels tall (landscape 4:3) photograph. The file must be in JPG/JPEG format with file size strictly between 20 KB and 50 KB on a pure plain white background.',
  },
  {
    question: 'Is the RRB photo portrait or landscape?',
    answer:
      'The RRB photograph is strictly LANDSCAPE (320 pixels width x 240 pixels height). Unlike SSC, UPSC, and IBPS which mandate vertical portrait photos, RRB is the only major central board mandating landscape. Submitting a portrait photo (240x320 px) causes automatic portal rejection.',
  },
  {
    question: 'What are the official signature dimensions and file size for Railway exams?',
    answer:
      'The signature must be 160 pixels wide by 80 pixels tall with file size between 10 KB and 40 KB in JPG/JPEG format. It must be signed in black or dark blue ink on plain white paper in running cursive handwriting.',
  },
  {
    question: 'Why did RRB reject over 500,000 applications in previous recruitment drives?',
    answer:
      'Major reasons for historical mass rejections by Railway Recruitment Boards include: (1) Signatures signed in CAPITAL / BLOCK letters instead of running cursive handwriting, (2) Submitting vertical portrait photos instead of the required 320x240 px landscape format, (3) Photos with blue, outdoor, or shadowy backgrounds instead of plain white, and (4) Wearing caps, dark goggles, or tilted face profiles.',
  },
  {
    question: 'My RRB signature is 8 KB. Will the portal reject it?',
    answer:
      'Yes. The rrbapply.gov.in portal enforces a 10.0 KB lower floor. Uploading an 8 KB signature triggers an instant error. Kagazo applies supersampling and JFIF padding to bring undersized signatures safely into the 15–30 KB range.',
  },
  {
    question: 'Does the Railway Recruitment Board require a name or date on the photo?',
    answer:
      'No. Unlike UPSC or State PSCs, RRB does not mandate printing your name or date of photograph (DOP) on the photo canvas. The photo must be a clean, unobstructed headshot on a white background.',
  },
  {
    question: 'Can I use the same photo for RRB NTPC, Group D, and ALP?',
    answer:
      'Yes, provided the photograph is recent (taken within the timeframe specified in the relevant CEN notification) and adheres to the 320x240 px landscape dimensions and 20–50 KB range.',
  },
  {
    question: 'Can I wear spectacles in my RRB photo?',
    answer:
      'No. RRB notifications strictly prohibit candidate photos wearing spectacles, reading glasses, sunglasses, or tinted lenses because glare interferes with facial biometric matching at examination centers.',
  },
  {
    question: 'Which official portal is used for RRB online applications?',
    answer:
      'Centralized Railway recruitments are processed via rrbapply.gov.in as well as individual zonal RRB websites (RRB Chennai, Mumbai, Kolkata, Allahabad, etc.). The 320x240 px photo and 160x80 px signature standards are uniform across all 21 railway zones.',
  },
  {
    question: 'Does Kagazo store my RRB photo or signature?',
    answer:
      'No. All resizing, landscape cropping, and Xerox ink enhancement are executed 100% in-browser using HTML5 Canvas and volatile RAM memory. No image data is ever transferred to remote servers.',
  },
];

export default function RrbPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Railway RRB Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/rrb-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Resize photograph (320x240 px landscape, 20–50 KB) and signature (160x80 px, 10–40 KB) for Railway RRB NTPC, Group D, ALP, Technician, and RPF Constable.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for Railway RRB Portal Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select RRB Landscape Photo or Signature',
            text: 'Choose RRB Photo (320x240 px landscape, 20–50 KB) or RRB Signature (160x80 px, 10–40 KB).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo or Scan',
            text: 'Upload smartphone photo or signature scan. Supports JPG, PNG, WEBP, and HEIC.',
          },
          {
            '@type': 'HowToStep',
            name: 'Landscape 4:3 Framing',
            text: 'Center your face so both ears are visible, filling 60–70% of the 320x240 px landscape frame.',
          },
          {
            '@type': 'HowToStep',
            name: 'Automated Size Lock',
            text: 'Kagazo locks exact pixel boundaries and optimizes file size into the safe 20–50 KB or 10–40 KB window.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Verified JPEG',
            text: 'Inspect with clarity loupe and download the compliant JPEG ready for rrbapply.gov.in.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: RRB_FAQS.map((faq) => ({
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

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Railway RRB Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>RRB NTPC, Group D, ALP &amp; Technician Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Railway RRB Photo &amp; Signature </span>
            <span className="text-primary">Resizer (NTPC, ALP, Group D)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format your Railway Recruitment Board exam photo (320×240 px landscape, 20–50 KB) and signature (160×80 px, 10–40 KB) to exact RRB portal specifications. Processed locally in your browser with zero server contact.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="RRB Railway"
              customPresets={RRB_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiator */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  The Railway Landscape 320×240 Format Advantage
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Why Standard Portrait Photos Cause Instant Rejection on Railway Portals
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  The Railway Recruitment Board portal (<code className="font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">rrbapply.gov.in</code>) uses a <strong>landscape-oriented photo format</strong> — 320 pixels wide by 240 pixels tall (4:3 aspect ratio). Almost every other Indian exam board (SSC, UPSC, IBPS) mandates portrait photos. Uploading a portrait photo or stretching it into landscape produces distorted faces that fail validation.
                </p>
                <p>
                  Furthermore, RRB signatures require a unique 160×80 px canvas with a 10–40 KB range. While the 40 KB ceiling is more relaxed than SSC&apos;s 20 KB limit, signatures cropped tightly often fall below the 10.0 KB floor. Kagazo handles both the landscape crop and bi-directional padding seamlessly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> 320×240 Landscape Lock
                  </span>
                  <p className="text-xs text-text-main/70">
                    Specifically formatted for RRB landscape layout. No squishing or facial distortion.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 10–40 KB Signature Window
                  </span>
                  <p className="text-xs text-text-main/70">
                    Pads undersized signatures above 10 KB and compresses large scans below 40 KB.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <PenTool className="w-4 h-4" /> Running Cursive Protection
                  </span>
                  <p className="text-xs text-text-main/70">
                    Protects against mass rejections caused by BLOCK or capital letter signatures.
                  </p>
                </div>
              </div>
            </section>

            {/* Official RRB Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official Railway RRB Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict standards enforced across all 21 Railway Recruitment Board zones.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  RRB CEN Norms
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Parameter</th>
                      <th className="py-3 px-3 font-bold">RRB Scanned Photograph</th>
                      <th className="py-3 px-3 font-bold">RRB Scanned Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Applicable Exams</td>
                      <td className="py-3 px-3">RRB NTPC, Group D (Level 1), ALP &amp; Technician, JE, RPF Constable &amp; SI</td>
                      <td className="py-3 px-3">Mandatory across all Railway Recruitment Board exams</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">File Size Range</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 50 KB</td>
                      <td className="py-3 px-3 font-bold text-primary">10 KB to 40 KB</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Exact Pixel Dimensions</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">320 × 240 pixels (Landscape 4:3)</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">160 × 80 pixels (2:1 ratio)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">File Format</td>
                      <td className="py-3 px-3 font-mono">JPG / JPEG only</td>
                      <td className="py-3 px-3 font-mono">JPG / JPEG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Background &amp; Paper</td>
                      <td className="py-3 px-3">Plain white background, full face frontal view</td>
                      <td className="py-3 px-3">Plain unruled white paper</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Handwriting Style</td>
                      <td className="py-3 px-3">—</td>
                      <td className="py-3 px-3 font-semibold text-primary">Running cursive only; NO block/capital letters</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Disallowed Items</td>
                      <td className="py-3 px-3">Caps, sunglasses, reading spectacles, masks, colored backdrops</td>
                      <td className="py-3 px-3">Signatures in CAPITAL letters, initials only, or pencil</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> Individual zonal RRB notifications can have slight variations. Always confirm with the active Centralised Employment Notice (CEN) PDF before submission. Also applying for SSC? Use our{' '}
                  <Link href="/tools/ssc-photo-signature-resizer" className="underline font-bold text-amber-950 hover:text-primary">
                    SSC Photo &amp; Signature Resizer
                  </Link>.
                </p>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Format Railway RRB Photos in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Select RRB Preset</h3>
                  <p className="text-xs text-text-main/75">
                    Choose <strong>RRB Photo (320×240 Landscape)</strong> or <strong>RRB Signature (160×80)</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Upload Any Photo</h3>
                  <p className="text-xs text-text-main/75">
                    Drop your vertical smartphone photo or scan. Kagazo will crop it into the landscape 4:3 frame.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Frame Head &amp; Shoulders</h3>
                  <p className="text-xs text-text-main/75">
                    Center face horizontally so ears and shoulders fit within the 320x240 px landscape frame.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    4
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Auto Size Tuning</h3>
                  <p className="text-xs text-text-main/75">
                    Kagazo calibrates file size into the safe 20–50 KB (photo) or 10–40 KB (signature) range.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2 sm:col-span-2 lg:col-span-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    5
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Download Verified JPEG</h3>
                  <p className="text-xs text-text-main/75">
                    Review file dimensions and size, then download the verified JPEG ready for upload to rrbapply.gov.in.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Errors Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common Railway RRB Rejections and How to Prevent Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Rejection for Capital Letter Signatures
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Writing your name in CAPITAL (BLOCK) letters leads to immediate cancellation. RRB requires natural running handwriting in black or dark blue ink.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Portrait Instead of Landscape
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Uploading a 240x320 portrait photo fails the automated portal validator. Our preset specifically enforces the required 320 pixels width by 240 pixels height.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Signature File Size Below 10 KB
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Tightly cropped signatures often collapse to 4–7 KB. The RRB upload form throws an error under 10 KB. Kagazo safely pads signatures into the 15–35 KB window.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Non-White Background or Shadows
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Outdoor selfies, blue backgrounds, or harsh shadows behind the ears violate RRB CEN instructions. Take your photo against an even, well-lit white wall.
                  </p>
                </div>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Railway RRB Photo &amp; Signature)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear answers covering RRB NTPC, Group D, ALP, Technician, and RPF application requirements.
                </p>
              </div>

              <div className="space-y-3">
                {RRB_FAQS.map((faq, idx) => (
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

          {/* Sticky Right Sidebar Rail (32% Width) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Quick Switch Matrix */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Related Exam Resizers
              </h3>

              <div className="space-y-2">
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      SSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB portrait
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-50kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Photo to 50KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Exact KB control for photos
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Compress Image to 20KB
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Exact KB target for signatures
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/government-exam-pdf-compressor"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Govt Exam PDF Compressor
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compress Railway certificates
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* RAM Security & Privacy Shield */}
            <div className="bg-surface/80 rounded-3xl border border-surface-darker p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% Client-Side Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph and signature are processed strictly in your device&apos;s RAM memory. Files are instantly cleared when you leave this tab.
              </p>
              <div className="flex items-center gap-4 text-[11px] font-semibold text-text-main/60 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero Watermark
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No Signup
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Workflow Tools */}
        <RelatedTools currentSlug="/tools/rrb-photo-signature-resizer" />
      </div>
    </div>
  );
}

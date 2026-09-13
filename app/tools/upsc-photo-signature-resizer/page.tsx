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
  Calendar,
  User,
  Info,
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'UPSC Photo & Signature Resizer — ORA Portal 2026 | Kagazo',
  description:
    'Resize your UPSC CSE, NDA, CDS, and IES exam photo (300 KB, 350–1000 px) and signature (300 KB, JPEG) with auto name & date-of-photo banner. Free, no upload, instant.',
  alternates: {
    canonical: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
  },
  openGraph: {
    title: 'UPSC ORA Photo & Signature Resizer | Kagazo — Free, No Upload',
    description:
      'Format UPSC photo and signature to exact ORA specifications. Auto embeds candidate name and date-of-photograph banner. 100% in-browser, no server.',
    url: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const UPSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'UPSC Photo (20–300 KB, 500×500 px)',
    minKb: 20,
    maxKb: 300,
    widthPx: 500,
    heightPx: 500,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'UPSC Signature (20–300 KB, 500×500 px)',
    minKb: 20,
    maxKb: 300,
    widthPx: 500,
    heightPx: 500,
    isXerox: true,
  },
];

const UPSC_FAQS = [
  {
    question: 'Does UPSC still require the name and date banner on the photo in 2026?',
    answer:
      'Yes, for most UPSC Online Recruitment Application (ORA) based examinations (CSE, NDA, CDS, CMS, and CAPF). The applicant full name and the exact date the photograph was captured must be printed in white text on a black banner strip at the bottom of the photograph. This must be physically embedded into the JPEG pixels, not typed into a form text box.',
  },
  {
    question: 'What is the official UPSC 10-Day Photograph Freshness Rule?',
    answer:
      'UPSC mandates that the photograph must not be older than 10 days from the date of online application opening or submission. The date printed on the bottom banner must reflect a date within this 10-day freshness window. If you apply on March 15, the banner date must be March 5 or later.',
  },
  {
    question: 'What size and pixel dimensions are required for UPSC photos and signatures?',
    answer:
      'Both photograph and signature must have pixel dimensions between 350 × 350 pixels (minimum) and 1000 × 1000 pixels (maximum) in a square 1:1 aspect ratio. The file size must be strictly below 300 KB (and at least 20 KB) in JPG/JPEG format.',
  },
  {
    question: 'Why does UPSC ORA show "Resolution less than 350x350" error?',
    answer:
      'Many basic photo resizers shrink pixel dimensions drastically to achieve small file sizes, dropping the resolution below 350×350 px. The UPSC ORA validation script immediately halts the upload. Kagazo locks your output to a high-resolution 500×500 pixel square canvas while keeping the file size safely between 40 KB and 150 KB.',
  },
  {
    question: 'Can I use a normal passport studio photo without a name/date strip?',
    answer:
      'Standard studio photos do not include the name and date strip unless you explicitly ask for it. Uploading a photo without the embedded strip can result in cancellation during document scrutiny or at the interview stage at Dholpur House. Kagazo embeds this required banner automatically.',
  },
  {
    question: 'Can I wear spectacles or dark glasses in the UPSC photograph?',
    answer:
      'No. UPSC guidelines prohibit spectacles, tinted lenses, and dark sunglasses. Lenses cause camera flash glare and reflections that hinder automated facial recognition systems used during examination center verification.',
  },
  {
    question: 'What background color is mandatory for UPSC photos?',
    answer:
      'The background must be plain white or a very light solid tone. Dark, colorful, textured, or outdoor background photographs are strictly prohibited by UPSC.',
  },
  {
    question: 'How should I format the signature for UPSC?',
    answer:
      'Sign in black or dark blue ink on clean, unruled white paper. Keep your signature in natural running cursive handwriting. Do not sign in BLOCK / CAPITAL letters. Kagazo scales the signature onto a 1:1 square canvas above 350×350 px to comply with the ORA upload validator.',
  },
  {
    question: 'Does Kagazo transmit my photo, name, or date to any server?',
    answer:
      'No. All processing—including facial cropping, canvas padding, banner rendering, and JPEG compression—happens 100% client-side inside your browser memory using HTML5 Canvas. No document or personal detail is ever sent to our servers.',
  },
  {
    question: 'What are the rules for PDF documents on the UPSC portal?',
    answer:
      'UPSC ORA requires educational certificates, caste/EWS certificates, and age proof documents to be uploaded in PDF format with file size strictly under 300 KB per document.',
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
        url: 'https://kagazo.in/tools/upsc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Prepare your UPSC Civil Services, NDA, CDS, CAPF, and IES exam photo and signature for the Online Recruitment Application (ORA) portal with auto name and date-of-photograph banner.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for UPSC ORA Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Photo or Signature Preset',
            text: 'Choose UPSC Photo (with Name & DOP Banner) or UPSC Scanned Signature.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enter Name and Photograph Date',
            text: 'Type your full applicant name and date taken within the official 10-day freshness window.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Your Photo or Signature',
            text: 'Drag & drop your smartphone photo or scan. Kagazo accepts JPG, PNG, WEBP, and HEIC.',
          },
          {
            '@type': 'HowToStep',
            name: 'Square 1:1 Aspect Ratio Cropping',
            text: 'Center your face to occupy ~75% of the frame, leaving room at the bottom for the banner strip.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download ORA-Compliant JPEG',
            text: 'Download the verified JPEG file with embedded banner, sized under 300 KB and strictly above 350x350 px.',
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

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
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
            <span className="text-primary">Resizer — ORA Portal Guidelines (2026)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Prepare your UPSC Civil Services, NDA, CDS, CAPF, and IES exam photo and signature for the Online Recruitment Application (ORA) portal — with automatic name and date-of-photograph banner. Everything processed inside your browser, zero server contact.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="UPSC OTR"
              customPresets={UPSC_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiators */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Embedded Name &amp; Date-of-Photo Banner
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  The UPSC 10-Day Rule and the Embedded Banner Strip Requirement
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  The Union Public Service Commission (<code className="font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">upsconline.nic.in</code>) portal performs one verification check that catches thousands of candidates off guard: it requires the candidate&apos;s <strong>full name and the date the photograph was captured to be printed in white text on a black banner strip</strong> directly below the face, physically embedded into the JPEG image file itself.
                </p>
                <p>
                  A standard neighborhood photo studio rarely knows this specific rule. Generic compressors and online cropping tools cannot generate the banner strip. Kagazo renders this compliant banner strip automatically. You simply type your name and capture date—our engine positions the strip cleanly at the bottom without squishing your face or exceeding the 300 KB ceiling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Name &amp; DOP Banner
                  </span>
                  <p className="text-xs text-text-main/70">
                    Embeds the official high-contrast white-on-black strip directly into the photo pixels.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Strict 1:1 Square Lock
                  </span>
                  <p className="text-xs text-text-main/70">
                    Enforces 350×350 to 1000×1000 px resolution, fully preventing ORA portal dimension errors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> 10-Day Freshness Check
                  </span>
                  <p className="text-xs text-text-main/70">
                    Prompts you to ensure the banner date falls strictly within 10 days of your application date.
                  </p>
                </div>
              </div>
            </section>

            {/* Official UPSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official UPSC ORA Upload Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict parameters drawn from Union Public Service Commission CSE, NDA, and CDS notifications.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  UPSC ORA Rules
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Parameter</th>
                      <th className="py-3 px-3 font-bold">UPSC Scanned Photograph</th>
                      <th className="py-3 px-3 font-bold">UPSC Scanned Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Applicable Exams</td>
                      <td className="py-3 px-3">CSE (IAS/IPS/IFS), NDA &amp; NA, CDS, CAPF (AC), IES/ISS, EPFO</td>
                      <td className="py-3 px-3">Mandatory across all UPSC recruitment and OTR examinations</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Allowed File Size</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 300 KB (strictly &lt; 300 KB)</td>
                      <td className="py-3 px-3 font-bold text-primary">20 KB to 300 KB (strictly &lt; 300 KB)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Pixel Dimensions</td>
                      <td className="py-3 px-3">Min 350×350 px — Max 1000×1000 px (1:1 square)</td>
                      <td className="py-3 px-3">Min 350×350 px (or proportional square canvas)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">File Format</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">JPG / JPEG only</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">JPG / JPEG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Name &amp; Date Banner</td>
                      <td className="py-3 px-3 font-semibold text-primary">Mandatory: Candidate name &amp; DOP printed at bottom</td>
                      <td className="py-3 px-3">Not applicable</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Date Freshness</td>
                      <td className="py-3 px-3">Captured within 10 days of application opening date</td>
                      <td className="py-3 px-3">—</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Background &amp; Pen</td>
                      <td className="py-3 px-3">Plain white or very light background; 75% face coverage</td>
                      <td className="py-3 px-3">Clean white paper, black or dark blue ballpoint ink, running cursive</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Spectacles / Glasses</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Strictly prohibited (no clear or power glasses)</td>
                      <td className="py-3 px-3">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Note:</strong> UPSC modifies guidelines periodically across notifications. The 10-day photograph freshness rule is strictly enforced during physical verification at Dholpur House. Always verify active guidelines on <code className="font-mono font-bold">upsconline.nic.in</code>. Need to change image metadata? Try{' '}
                  <Link href="/tools/change-image-dpi" className="underline font-bold text-amber-950 hover:text-primary">
                    Change Image DPI to 300
                  </Link>.
                </p>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Resize and Add Name &amp; Date for UPSC in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Select Preset</h3>
                  <p className="text-xs text-text-main/75">
                    Click <strong>UPSC Photo</strong> (with Name &amp; Date banner) or <strong>UPSC Signature</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Enter Name &amp; Date</h3>
                  <p className="text-xs text-text-main/75">
                    Type your full name and the photograph date (within 10 days of application submission).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Upload Photo or Scan</h3>
                  <p className="text-xs text-text-main/75">
                    Drop your image. Accepts JPG, PNG, WEBP, and iPhone HEIC files directly without prior conversion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    4
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Crop to 1:1 Square</h3>
                  <p className="text-xs text-text-main/75">
                    Center face so both ears are visible, occupying 75% of space with bottom margin for the banner.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2 sm:col-span-2 lg:col-span-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    5
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Download ORA-Ready JPEG</h3>
                  <p className="text-xs text-text-main/75">
                    Kagazo generates the banner-embedded JPEG, locking resolution above 350×350 px and under 300 KB for instant upload.
                  </p>
                </div>
              </div>
            </section>

            {/* Common Errors Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common UPSC ORA Upload Rejections and How to Avoid Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: &quot;Resolution less than 350x350 pixels&quot;
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Normal compressors shrink pixel width to reduce size, falling below 350 px. Kagazo keeps a calibrated 500×500 px canvas, completely avoiding resolution errors.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Missing Name and Date Strip
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Typing your name into the ORA form text box does not fulfill the requirement. The banner must be burned into the JPEG pixels. Use our tool or the{' '}
                    <Link href="/tools/photo-date-name-stamper" className="text-primary font-semibold hover:underline">
                      Photo Date &amp; Name Stamper
                    </Link>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Date of Photograph Older than 10 Days
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Entering an older date triggers disqualification during document verification. Make sure the date entered represents a capture within 10 days of your submission.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: File Size Exceeds 300 KB
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Smartphones produce 3–8 MB photos. Kagazo uses adaptive JPEG compression to maintain sharp facial clarity while guaranteeing the final file is under 300 KB.
                  </p>
                </div>
              </div>
            </section>

            {/* Contextual Certificate Support Callout */}
            <div className="p-6 rounded-3xl bg-surface border border-surface-darker flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Need to compress UPSC Degree, Caste, or Age Proof PDFs under 300 KB?
                </h3>
                <p className="text-xs text-text-main/70">
                  UPSC ORA enforces a strict 300 KB maximum limit on all uploaded educational and identity PDF documents.
                </p>
              </div>
              <Link
                href="/tools/compress-pdf-to-300kb"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shrink-0"
              >
                Compress PDF to 300KB
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (UPSC Photo &amp; Signature)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Answers to the most critical photo, signature, and ORA portal questions for UPSC aspirants.
                </p>
              </div>

              <div className="space-y-3">
                {UPSC_FAQS.map((faq, idx) => (
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
                      20–50 KB photo &amp; 10–20 KB signature
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/photo-date-name-stamper"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Photo Name &amp; Date Stamper
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Custom banner strip generator
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/upsc-pdf-compressor"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC PDF Compressor
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compress marksheets &lt; 300 KB
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/specifications"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Exam Specs Radar
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      Compare SSC, UPSC, RRB, NEET
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
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] sm:text-xs text-text-main/70 leading-relaxed">
                Your photograph, signature, and candidate name are processed purely in temporary browser memory. Never uploaded to cloud servers or stored in any database.
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
        <RelatedTools currentSlug="/tools/upsc-photo-signature-resizer" />
      </div>
    </div>
  );
}

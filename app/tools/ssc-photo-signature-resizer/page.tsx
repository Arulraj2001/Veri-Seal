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
} from 'lucide-react';
import { ImageResizerEngine, type CustomPreset } from '@/components/tools/ImageResizerEngine';
import { AdSlot } from '@/components/ads/AdSlot';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedTools } from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'SSC Photo & Signature Resizer — 20–50 KB & 10–20 KB | Kagazo',
  description:
    'Resize your SSC CGL, CHSL, MTS, and GD Constable photo (3.5x4.5 cm, 20–50 KB) and signature (4x2 cm, 10–20 KB) instantly. Auto-corrects undersized files. No uploads, zero watermarks.',
  alternates: {
    canonical: 'https://kagazo.in/tools/ssc-photo-signature-resizer',
  },
  openGraph: {
    title: 'SSC Photo & Signature Resizer | Kagazo — Free, Zero Upload',
    description:
      'Format your SSC exam photo and scanned signature to exact portal limits. Handles both undersized and oversized files. 100% in-browser, no server, no account required.',
    url: 'https://kagazo.in/tools/ssc-photo-signature-resizer',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SSC_PRESETS: CustomPreset[] = [
  {
    id: 'photo',
    label: 'SSC Photo (20–50 KB, 3.5×4.5 cm)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'signature',
    label: 'SSC Signature (10–20 KB, 4.0×2.0 cm)',
    minKb: 10,
    maxKb: 20,
    widthCm: 4.0,
    heightCm: 2.0,
    isXerox: true,
  },
];

const SSC_FAQS = [
  {
    question: 'What is the exact photo size for SSC CGL in 2026?',
    answer:
      'For most SSC CGL recruitment cycles, the scanned photograph must be in JPEG format, with a physical dimension of 3.5 cm (width) x 4.5 cm (height), and a file size strictly between 20 KB and 50 KB. Always verify this against the official notification for your specific recruitment year, as SSC may update these values.',
  },
  {
    question: 'My signature file is 8 KB. Can I still upload it to the SSC portal?',
    answer:
      'No. The SSC portal strictly requires the signature file to be at least 10.0 KB. Uploading an 8 KB file will produce a "file size not in range" error. Kagazo\'s bi-directional processing automatically brings undersized signature files up to a compliant size without distorting the image by utilizing high-fidelity supersampling and safe JFIF padding.',
  },
  {
    question: 'Can I use my phone camera to photograph my signature for SSC?',
    answer:
      'Yes, but it requires care. Place your signed paper on a flat white surface, shoot directly from above with no tilt, ensure even natural lighting, and avoid hand shadows. The resulting image will typically be 2–5 MB. Kagazo\'s signature preset compresses it into the 10–20 KB range while cleaning up yellow background tint with our Xerox filter.',
  },
  {
    question: 'Does SSC accept PNG or WEBP files?',
    answer:
      'No. SSC portals accept only JPEG (JPG) files for photo and signature uploads. Even if you rename a PNG file to .jpg, the portal will detect the internal binary header and reject it. Kagazo re-encodes all output files as standards-compliant JPEG binaries.',
  },
  {
    question: 'Can I wear glasses in my SSC photograph?',
    answer:
      'No. Staff Selection Commission guidelines strictly prohibit spectacles, including clear prescription glasses, in uploaded photographs. Glare from lenses can also fail automated face-matching biometric checks at the examination hall. Always capture your photo without spectacles.',
  },
  {
    question: 'My signature is in capital letters — is that a problem?',
    answer:
      'Yes. SSC explicitly states that signatures written in BLOCK or CAPITAL/UPPERCASE letters will be rejected. Your signature must be in your natural running/cursive handwriting. Submitting signatures in capital letters can lead to cancellation during document verification.',
  },
  {
    question: 'Does SSC require live photo capture or a scanned photo upload?',
    answer:
      'For recent SSC CGL and CHSL recruitment notifications, the ssc.gov.in portal has introduced live webcam capture via browser or the MySSC app during initial registration. However, the signature is always uploaded as a scanned file (10–20 KB JPEG). For several other SSC posts and correction windows, scanned photo uploads remain mandatory.',
  },
  {
    question: 'Does Kagazo store my photo or signature on any server?',
    answer:
      'No. All image resizing, cropping, and compression run 100% client-side inside your web browser using HTML5 Canvas and JavaScript FileReader APIs. Your biometric documents never travel across the internet to our servers or any cloud database.',
  },
  {
    question: 'What pixel dimensions should my SSC photo be?',
    answer:
      'The physical specification is 3.5 cm x 4.5 cm. In pixels, this translates to approximately 100 x 120 px (at 72 DPI) up to 350 x 450 px (at 300 DPI). The portal validates on byte count (20–50 KB) and JPEG format, but maintaining the ~7:9 aspect ratio is essential to avoid facial distortion.',
  },
  {
    question: 'What pen ink should I use for the SSC signature?',
    answer:
      'SSC guidelines specify black or dark blue ink. Signing with a fresh black ballpoint pen on unruled, plain white paper produces the highest contrast scan. Avoid gel pens that reflect camera flash, pencil signatures, or ruled notebook paper.',
  },
];

export default function SscPhotoSignatureResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SSC Photo & Signature Resizer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/ssc-photo-signature-resizer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Format your SSC CGL, CHSL, MTS, GD Constable, and CPO exam photo and signature to exact Staff Selection Commission limits — 20–50 KB photo, 10–20 KB signature, JPEG only.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Resize Photo and Signature for SSC Portal Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose SSC Photo or Signature',
            text: 'Select SSC Photo (20-50KB, 3.5x4.5cm) or SSC Signature (10-20KB, 4.0x2.0cm).',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Your Image',
            text: 'Drag and drop or select your photo or signature scan. Supports JPG, PNG, WEBP, and HEIC.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Framing & Enhancement',
            text: 'Kagazo centers the face or handwriting, enhances contrast, and cleans background tints.',
          },
          {
            '@type': 'HowToStep',
            name: 'Bi-directional File Size Calibration',
            text: 'Large files are compressed while undersized files below 10KB/20KB are padded into safe compliance.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Compliant JPEG',
            text: 'Inspect with high-resolution clarity loupe and download the portal-ready JPEG file.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: SSC_FAQS.map((faq) => ({
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
            { label: 'SSC Photo & Signature Resizer' },
          ]}
          showHomeIcon
        />

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>SSC CGL, CHSL, MTS, CPO &amp; GD Constable Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>SSC Photo &amp; Signature </span>
            <span className="text-primary">Resizer (2026 Portal Guidelines)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format your SSC CGL, CHSL, MTS, GD Constable, and CPO exam photo and signature to exact Staff Selection Commission limits — 20–50 KB photo, 10–20 KB signature, JPEG only. Processed entirely inside your browser. No file is ever sent to any server.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focus Workspace (68% Width) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="SSC"
              customPresets={SSC_PRESETS}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Tool Introduction & Key Differentiators */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bi-Directional File Size Calibration
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Overcoming the SSC Undersized Signature Rejection Floor
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-text-main/85 leading-relaxed space-y-3">
                <p>
                  Getting your Staff Selection Commission application past the document upload stage requires hitting the precise file-size window enforced by the <code className="font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">ssc.gov.in</code> validation script. A photo at 19 KB gets rejected just as firmly as one at 55 KB. A signature scan of 7 KB triggers the exact same <em>&quot;File size not in range&quot;</em> error as a 25 KB file.
                </p>
                <p>
                  Standard mobile photo compressors only reduce file sizes downward — they cannot bring an undersized 4–8 KB cropped signature up into compliance. Kagazo is built specifically with <strong>bi-directional file size calibration</strong>: large smartphone images are compressed cleanly, while undersized signatures are safely padded into the required 12–18 KB window using lossless JFIF structural markers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Both Presets Built-In
                  </span>
                  <p className="text-xs text-text-main/70">
                    Switch between 3.5×4.5 cm Photo (20–50 KB) and 4.0×2.0 cm Signature (10–20 KB) in one click.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <PenTool className="w-4 h-4" /> Xerox Ink Booster
                  </span>
                  <p className="text-xs text-text-main/70">
                    Strips yellow casts and shadows from mobile camera snaps, leaving crisp dark strokes on pure white paper.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Zero Server Exposure
                  </span>
                  <p className="text-xs text-text-main/70">
                    Your photo and signature never leave your device. Memory is wiped immediately when you close the tab.
                  </p>
                </div>
              </div>
            </section>

            {/* Official SSC Specifications Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official SSC Photo &amp; Signature Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Strict parameters drawn from Staff Selection Commission recruitment notifications.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  SSC Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main">
                      <th className="py-3 px-3 font-bold">Parameter</th>
                      <th className="py-3 px-3 font-bold">SSC Scanned Photograph</th>
                      <th className="py-3 px-3 font-bold">SSC Scanned Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/85">
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Applicable Exams</td>
                      <td className="py-3 px-3">CGL, CHSL, MTS, GD Constable, CPO (Delhi Police / CAPF), Stenographer</td>
                      <td className="py-3 px-3">Mandatory across all SSC recruitment examinations</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Mandatory File Size</td>
                      <td className="py-3 px-3 font-bold text-primary">20.0 KB minimum — 50.0 KB maximum</td>
                      <td className="py-3 px-3 font-bold text-primary">10.0 KB minimum — 20.0 KB maximum</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Physical Dimensions</td>
                      <td className="py-3 px-3">3.5 cm (W) × 4.5 cm (H)</td>
                      <td className="py-3 px-3">4.0 cm (W) × 2.0 cm (H) (2:1 aspect ratio)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Approx Pixel Resolution</td>
                      <td className="py-3 px-3">100×120 px (72 DPI) to 350×450 px (300 DPI)</td>
                      <td className="py-3 px-3">140×60 px to 400×200 px (calibrated canvas)</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Permitted Format</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">JPG / JPEG only</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">JPG / JPEG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Background &amp; Paper</td>
                      <td className="py-3 px-3">Light plain background, both ears visible</td>
                      <td className="py-3 px-3">Unruled, plain white paper</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Ink / Handwriting</td>
                      <td className="py-3 px-3">—</td>
                      <td className="py-3 px-3">Dark blue or black ink; running cursive handwriting only</td>
                    </tr>
                    <tr className="hover:bg-surface/50">
                      <td className="py-3 px-3 font-semibold text-text-main">Restrictions</td>
                      <td className="py-3 px-3">No spectacles / glasses; no caps or dark goggles</td>
                      <td className="py-3 px-3">Strictly no capital / block letter signatures</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Verification Notice:</strong> SSC periodically issues updated recruitment notifications. Before final submission, cross-check against the active PDF on <code className="font-mono font-bold">ssc.gov.in</code>. Compare specifications across boards on our{' '}
                  <Link href="/tools/specifications" className="underline font-bold text-amber-950 hover:text-primary">
                    Exam Specifications Radar
                  </Link>.
                </p>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Format SSC Photos &amp; Signatures in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Select Asset Preset</h3>
                  <p className="text-xs text-text-main/75">
                    Click the <strong>SSC Photo</strong> tab (20–50 KB, 3.5×4.5 cm) or <strong>SSC Signature</strong> tab (10–20 KB, 4.0×2.0 cm).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Upload Any Image</h3>
                  <p className="text-xs text-text-main/75">
                    Select your smartphone photo, scanner output, or iPhone HEIC file. No prior format conversion needed.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Frame &amp; Center</h3>
                  <p className="text-xs text-text-main/75">
                    Center face so both ears are visible, covering ~75% of canvas. For signatures, crop outer borders.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    4
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Auto Size Tuning</h3>
                  <p className="text-xs text-text-main/75">
                    The engine applies targeted JPEG compression and bi-directional padding, landing safely in the target range.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2 sm:col-span-2 lg:col-span-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    5
                  </div>
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">Inspect &amp; Download Verified JPEG</h3>
                  <p className="text-xs text-text-main/75">
                    Review your final file size in KB with our clarity loupe preview, then download the verified JPEG ready for instant upload on the SSC application portal.
                  </p>
                </div>
              </div>
            </section>

            {/* SSC Rejection Prevention Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common SSC Upload Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: &quot;File size should be between 10 KB and 20 KB&quot;
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Cropping signatures closely drops file size to 4–8 KB. The SSC validation script rejects anything under 10.0 KB. Kagazo injects safe JFIF structural padding to lock signatures safely between 12 KB and 18 KB. Or use our{' '}
                    <Link href="/tools/compress-image-to-20kb" className="text-primary font-semibold hover:underline">
                      Compress Image to 20 KB
                    </Link>{' '}
                    tool.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Signature in Capital / Block Letters
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    SSC explicitly disallows capital letter signatures. Ensure your handwritten signature uses normal cursive writing. If ink is faint, our Xerox boost deepens strokes to pure black.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Faint Pen or Yellow Scanner Cast
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Camera captures under indoor bulb lighting leave yellowish shadows. If our preset doesn&apos;t clear heavy shadows, use our dedicated{' '}
                    <Link href="/tools/signature-cleaner-extractor" className="text-primary font-semibold hover:underline">
                      Black Ink Signature Extractor &amp; Enhancer
                    </Link>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                    Error: Facial Distortion / Wrong Aspect Ratio
                  </span>
                  <p className="text-xs sm:text-sm text-text-main/80">
                    Generic resizers squash faces into awkward dimensions. Kagazo preserves your true biometric aspect ratio with white border padding rather than geometrical stretching.
                  </p>
                </div>
              </div>
            </section>

            {/* Contextual Certificate Support Callout */}
            <div className="p-6 rounded-3xl bg-surface border border-surface-darker flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Need to compress caste, EWS, or marksheets for SSC?
                </h3>
                <p className="text-xs text-text-main/70">
                  SSC application forms require educational certificates and category proofs as compressed PDF documents.
                </p>
              </div>
              <Link
                href="/tools/ssc-pdf-compressor"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shrink-0"
              >
                SSC PDF Compressor
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
                  Frequently Asked Questions (SSC Photo &amp; Signature)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Clear, verified answers covering SSC CGL, CHSL, MTS, CPO, and GD Constable portal uploads.
                </p>
              </div>

              <div className="space-y-3">
                {SSC_FAQS.map((faq, idx) => (
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
                  href="/tools/upsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      UPSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–300 KB, 350×350 px, DOP strip
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
                      Auto banner for UPSC &amp; State PSC
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/thumb-impression-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      Thumb Impression Resizer
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      LTI for GD Constable &amp; Police forms
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/tools/tnpsc-photo-signature-resizer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors block">
                      TNPSC Photo &amp; Signature
                    </span>
                    <span className="text-[11px] text-text-main/60">
                      20–50 KB &amp; 10–20 KB OTR format
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
                Your photograph and signature are processed exclusively in volatile RAM memory and immediately destroyed after download. Never saved to any database or server disk.
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
        <RelatedTools currentSlug="/tools/ssc-photo-signature-resizer" />
      </div>
    </div>
  );
}

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
  title: 'Compress Image to 50KB Online Free | Exact 20-50KB Passport Photo | Kagazo',
  description:
    'Compress photo and image to strictly between 20 KB and 50 KB online free. Perfect for passport photos, SSC, TNPSC, and IBPS online application forms. Zero blur, zero watermark, 100% private.',
  alternates: {
    canonical: 'https://kagazo.in/tools/compress-image-to-50kb',
  },
  openGraph: {
    title: 'Compress Image to 50KB Online Free | Kagazo',
    description:
      'Compress photos to 50KB online with exact dimension and size guarantee. Zero watermark, instant in-memory processing.',
    url: 'https://kagazo.in/tools/compress-image-to-50kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const PRESETS_50KB: CustomPreset[] = [
  {
    id: 'photo',
    label: 'Passport Photo (20-50KB, 3.5×4.5cm)',
    minKb: 20,
    maxKb: 50,
    widthCm: 3.5,
    heightCm: 4.5,
    isPhoto: true,
  },
  {
    id: 'id_card',
    label: 'ID Card / Aadhaar Photo (20-50KB)',
    minKb: 20,
    maxKb: 50,
    isPhoto: true,
  },
  {
    id: 'certificate_photo',
    label: 'Certificate Photo (30-50KB)',
    minKb: 30,
    maxKb: 50,
    isPhoto: true,
  },
];

const FAQS = [
  {
    question: 'How do I compress my photo to 50 KB without facial distortion?',
    answer:
      'Standard compressors often stretch or squash candidate faces when fitting strict dimensions. Kagazo scales proportionally and automatically centers your photo on a pure white (#FFFFFF) canvas, maintaining your true facial proportions while locking the file size strictly between 20 KB and 50 KB.',
  },
  {
    question: 'Why do so many government portals ask for 20-50 KB photos?',
    answer:
      'Portals like SSC, IBPS, and State PSCs process millions of applicants simultaneously. The 20–50 KB range ensures the candidate face is sharp enough for automated biometric facial matching during the exam, while keeping file sizes small enough to avoid server bottlenecks.',
  },
  {
    question: 'Can I add my Name and Date of Photo (DOP) to the photo?',
    answer:
      'Yes! Check the "Add Name & Date strip" toggle. Kagazo will automatically generate the official white bottom banner with your candidate name and date of photo capture formatted per portal rules.',
  },
  {
    question: 'What physical and pixel dimensions should a 50 KB photo have?',
    answer:
      'The standard passport photo requirement is 3.5 cm (width) x 4.5 cm (height). At 200–300 DPI, this corresponds to approximately 275x354 px to 413x531 px, preserving high-resolution biometric facial landmarks.',
  },
  {
    question: 'Are spectacles allowed in 50 KB government exam photos?',
    answer:
      'No. Staff Selection Commission (SSC), UPSC, and most state boards strictly prohibit spectacles in uploaded photographs. Flash glare on lenses obscures iris recognition algorithms, leading to application rejection.',
  },
  {
    question: 'Can I use a smartphone selfie for my 50 KB passport photo?',
    answer:
      'Yes, provided it is taken directly facing the camera with neutral expression, even frontal lighting, and no head tilt. Kagazo crops your photo to the standard 3.5x4.5 cm portrait ratio and replaces background shadows with a clean tone.',
  },
  {
    question: 'What background color is mandatory for 50 KB exam photos?',
    answer:
      'A plain white or very light off-white background is universally required. Outdoor backgrounds, patterned walls, or dark colors will cause automated rejection at the application screening phase.',
  },
  {
    question: 'Does this tool support iPhone HEIC and PNG files?',
    answer:
      'Yes. Upload any HEIC, PNG, JPG, or WEBP file. Kagazo converts the image in-browser and exports a compliant, standard JPEG file accepted by all portals.',
  },
  {
    question: 'Are my uploaded biometric photos private and secure?',
    answer:
      'Yes, 100%. Kagazo operates exclusively inside your local browser memory. No photos are transmitted to external servers, uploaded to cloud databases, or analyzed by third parties.',
  },
  {
    question: 'Is this 50 KB compressor free to use for cyber cafes and applicants?',
    answer:
      'Yes, 100% free with no daily limits, no login requirement, and zero watermarks. Cyber cafes, CSC centers, and individual applicants can resize unlimited files.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Select 20–50 KB Passport Preset',
    desc: 'Choose Passport Photo (20-50 KB, 3.5x4.5cm) or ID Card Photo based on your application guidelines.',
  },
  {
    step: 2,
    title: 'Upload Photo Scan or Portrait',
    desc: 'Drag and drop your phone selfie, studio photo, or document scan (JPG, PNG, WEBP, HEIC supported).',
  },
  {
    step: 3,
    title: 'Frame Face & Center Eyes',
    desc: 'Center your face so both ears and shoulders are visible, covering approximately 75% of the frame.',
  },
  {
    step: 4,
    title: 'Smart Calibration to 30–45 KB',
    desc: 'The engine applies intelligent JPEG compression, locking file size safely inside the 20–50 KB window.',
  },
  {
    step: 5,
    title: 'Download Verified JPEG',
    desc: 'Review image sharpness with the clarity loupe and download the verified, portal-ready JPEG file.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "File size exceeds 50.0 KB limit"',
    title: 'Oversized Mobile Camera Upload',
    desc: 'Raw phone photos are 3–10 MB. Portals reject anything over 50 KB. Kagazo compresses your image directly into the 30–45 KB safe sweet spot.',
  },
  {
    badge: 'Error: Distorted Face / Aspect Ratio Squashing',
    title: 'Stretching Image to Force Dimensions',
    desc: 'Manually forcing pixel dimensions distorts facial proportions. Kagazo scales proportionally on a standard 3.5x4.5 cm canvas to protect facial symmetry.',
  },
  {
    badge: 'Error: Dark or Cluttered Background',
    title: 'Outdoor or Shadowed Backgrounds',
    desc: 'Recruitment portals require a light plain background. Kagazo cleans ambient background shadows to meet official government submission standards.',
  },
  {
    badge: 'Error: Spectacles & Headwear Glare',
    title: 'Wearing Glasses or Caps in Photos',
    desc: 'Automated facial recognition systems disqualify photos with glasses glare or covered foreheads. Always upload photos taken without spectacles or caps.',
  },
];

export default function CompressImageTo50KbPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Compress Image to 50KB Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/compress-image-to-50kb',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'INR',
        },
        description:
          'Compress passport photos strictly between 20 KB and 50 KB for government exam portal compliance.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Compress Photo to 50 KB Online in 5 Steps',
        description:
          'Step-by-step instructions to compress photos strictly between 20 KB and 50 KB.',
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
            name: 'Compress Image to 50KB',
            item: 'https://kagazo.in/tools/compress-image-to-50kb',
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
          <span className="text-primary font-bold">Compress Image to 50KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Government Exam Passport Photo Engine (20–50 KB)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Compress Image to </span>
            <span className="text-primary">50KB Online Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress passport photos strictly between <strong>20 KB and 50 KB</strong> with guaranteed 3.5×4.5 cm proportions. Zero blur, zero watermarks, and 100% in-browser privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageResizerEngine
              initialMode="photo"
              examName="General / Exam"
              customPresets={PRESETS_50KB}
            />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Passport Photo Calibration
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Precision 20KB–50KB Sizing with Biometric Facial Preservation
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Recruitment portals immediately reject passport photos with stretched faces, blurry features, or file sizes exceeding 50 KB. Kagazo scales proportionally and balances compression to keep faces crisp and compliant.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 3.5×4.5 cm Framing
                  </span>
                  <p className="text-xs text-text-main/70">
                    Maintains the official standard aspect ratio so candidate facial proportions never stretch or distort.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Camera className="w-4 h-4" /> Name &amp; Date Strip
                  </span>
                  <p className="text-xs text-text-main/70">
                    Optionally adds official candidate name and date-of-photo banner required by SSC and central boards.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Biometric photos process in local RAM. No personal identity images are ever transmitted to cloud servers.
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
                    Official 20KB - 50KB Exam Photo Specifications
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Verified photo requirements across major Indian recruitment portals.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Portal Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Authority / Exam</th>
                      <th className="py-3 px-3">File Size Window</th>
                      <th className="py-3 px-3">Physical Dimensions</th>
                      <th className="py-3 px-3">Background &amp; Format</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">SSC (CGL, CHSL, MTS, GD)</td>
                      <td className="py-3 px-3 font-bold text-primary">20.0 KB – 50.0 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">3.5 cm × 4.5 cm</td>
                      <td className="py-3 px-3">Light plain background; JPG only</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">IBPS PO / Clerk / RRB</td>
                      <td className="py-3 px-3 font-bold text-primary">20.0 KB – 50.0 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">4.5 cm × 3.5 cm (200×230 px)</td>
                      <td className="py-3 px-3">White background; JPG/JPEG</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">TNPSC (Group 1, 2, 4 OTR)</td>
                      <td className="py-3 px-3 font-bold text-primary">20.0 KB – 50.0 KB</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">3.5 cm × 4.5 cm</td>
                      <td className="py-3 px-3">Light background; with Name &amp; Date</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">UPSC Civil Services / NDA</td>
                      <td className="py-3 px-3 font-bold text-primary">20.0 KB – 50.0 KB (Min 20KB)</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">350 × 350 px to 1000 × 1000 px</td>
                      <td className="py-3 px-3">Plain background; JPG format</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Important Guideline:</strong> Ensure your ears and forehead are clearly visible. Do not wear spectacles or caps, as facial recognition systems will flag your submission.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Compress Photo to 50 KB in 5 Steps
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
                Common 50 KB Upload Errors and How Kagazo Fixes Them
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
                  Frequently Asked Questions (50 KB Passport Photo Compressor)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Everything you need to know about passport photo resizing and portal compliance.
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
                  href="/tools/compress-image-to-20kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 20KB
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
                  href="/tools/compress-image-to-100kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 100KB
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
                Images are processed in device RAM. No photos or biometric documents are ever uploaded or stored.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

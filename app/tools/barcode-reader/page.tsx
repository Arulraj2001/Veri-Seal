import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Banknote,
  Calculator,
  GraduationCap,
  Award,
  FileCheck2,
  Clock,
  Globe,
  Code2,
  Ruler,
  Coins,
  Heart,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Building2,
  Languages,
  PenTool,
  Search,
  Fingerprint,
  QrCode,
  Scan,
  Share2,
  Mail,
  DollarSign,
  Link2,
} from 'lucide-react';
import { BarcodeReaderEngine } from '@/components/tools/BarcodeReaderEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Barcode Reader Online Free (Scan 1D Barcodes from Camera or Image) | Kagazo',
  description: 'Scan and decode 1D linear barcodes online using your web camera or image upload. Supports EAN-13, UPC-A, Code 128, Code 39, and ITF-14 with instant checksum verification and 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/barcode-reader',
  },
  openGraph: {
    title: 'Barcode Reader Online Free (Scan 1D Barcodes from Camera or Image) | Kagazo',
    description: 'Scan and decode 1D linear barcodes online using your web camera or image upload. Supports EAN-13, UPC-A, Code 128, Code 39, and ITF-14 with instant checksum verification and 100% client-side privacy.',
    url: 'https://kagazo.in/tools/barcode-reader',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barcode Reader Online Free (Scan 1D Barcodes from Camera or Image) | Kagazo',
    description: 'Scan and decode 1D linear barcodes online using your web camera or image upload. Supports EAN-13, UPC-A, Code 128, Code 39, and ITF-14 with instant checksum verification and 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Scanner Input Mode",
    "desc": "Choose \"Live Camera Stream\" for physical package scanning, or \"Upload Image\" to process a photo or screenshot."
  },
  {
    "step": 2,
    "title": "Grant Camera or Select File",
    "desc": "Allow browser camera access or select an image file containing a linear 1D barcode."
  },
  {
    "step": 3,
    "title": "Align Barcode in Reticle",
    "desc": "Position the red aiming guideline horizontally across all vertical black bars, including the outer white quiet zones."
  },
  {
    "step": 4,
    "title": "Algorithmic Bar Width Decoding",
    "desc": "The engine measures narrow and wide bar ratios, verifies start/stop delimiters, and calculates checksum parity in under 50ms."
  },
  {
    "step": 5,
    "title": "Inspect & Copy Barcode Data",
    "desc": "Review the decoded numeric or alphanumeric payload, confirmed symbology type, and copy the string to your clipboard."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "SCAN LINE OFF-AXIS",
    "title": "Angling Scan Line Past the Endpoints",
    "desc": "1D laser and optical line scanners must cross the entire width of all bars and both quiet zones. Angling the red reticle diagonally off the edges causes read failures."
  },
  {
    "badge": "MOTION BLUR",
    "title": "Rapid Camera Movement During Focus Lock",
    "desc": "Moving packages quickly across the camera creates motion blur that merges adjacent bars together. Hold the camera steady for 1 second."
  },
  {
    "badge": "REFLECTIVE GLARE",
    "title": "Light Reflecting Off Glossy Plastic Wraps",
    "desc": "Overhead lights reflecting off plastic blister packaging washes out bar contrast. Angle the camera at 15-20 degrees to disperse direct reflection."
  },
  {
    "badge": "WRINKLED LABEL",
    "title": "Curved or Creased Packaging Surfaces",
    "desc": "Wrinkles alter the perceived width of narrow bars. Flatten the label or position the scan line across the smoothest portion of the code."
  }
];

const FAQS = [
  {
    "question": "How does this online barcode scanner work without external hardware?",
    "answer": "Our scanner leverages computer vision algorithms compiled into WebAssembly. It analyzes the optical contrast gradients of camera video frames, identifies parallel linear bar groupings, measures relative bar widths, and decodes the standard character matrices directly in the browser."
  },
  {
    "question": "Can I scan a barcode by uploading a photo or screenshot?",
    "answer": "Yes. Switch to the \"Upload Image\" option and select any JPEG, PNG, or WebP photo, or paste a screenshot directly from your clipboard using Ctrl+V. The engine automatically detects and decodes the barcode."
  },
  {
    "question": "Which 1D barcode symbologies can this scanner read?",
    "answer": "It decodes all widely used 1D linear barcode symbologies, including EAN-13, EAN-8, UPC-A, UPC-E, Code 128 (Sets A, B, and C), Code 39, Code 93, ITF-14 (Interleaved 2 of 5), and Codabar."
  },
  {
    "question": "Can I scan retail barcodes from my smartphone camera to look up products?",
    "answer": "Yes. You can scan any grocery or retail barcode (EAN-13 or UPC-A). Once the 12 or 13-digit number is decoded, you can copy the code to query retail databases, Google Shopping, or your inventory system."
  },
  {
    "question": "Why is my barcode not being detected by the camera?",
    "answer": "Ensure the red horizontal scan line spans across all black bars and includes the white space on both ends. Hold your phone approximately 15 to 25 cm away in good room lighting to allow the camera autofocus to achieve crisp sharpness."
  },
  {
    "question": "How does the scanner prevent incorrect reads from damaged labels?",
    "answer": "The engine performs strict mathematical checksum verification (such as Modulo 10 for EAN/UPC and Modulo 103 for Code 128). If any bars are distorted or misread, the checksum fails, and the invalid read is safely rejected."
  },
  {
    "question": "Is my camera video stream or barcode data sent to your servers?",
    "answer": "No. The entire video stream analysis and barcode decoding process runs 100% in your device local RAM. Zero frames, images, or product serial numbers are ever transmitted across the internet."
  },
  {
    "question": "Can this scanner read barcodes displayed on another phone or computer screen?",
    "answer": "Yes. It easily reads barcodes displayed on digital LCD, OLED, and LED screens, provided the screen brightness is adequate and there is no extreme moir\u00e9 interference."
  },
  {
    "question": "Does this tool work on iPhone and Android mobile browsers?",
    "answer": "Yes. It runs seamlessly on Safari on iOS, Chrome on Android, Samsung Internet, Edge, and Firefox without requiring app store downloads or native plugins."
  },
  {
    "question": "What is the difference between a 1D barcode and a 2D QR code?",
    "answer": "1D linear barcodes encode data horizontally using alternating black bars and white spaces (typically 12 to 30 characters), making them ideal for product IDs. 2D QR codes encode data in both horizontal and vertical matrices, holding up to 4,000+ characters such as full URLs and contact cards."
  }
];

export default function BarcodeReaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Barcode Reader & Scanner Online',
        url: 'https://kagazo.in/tools/barcode-reader',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Scan and decode 1D linear barcodes online using your web camera or image upload. Supports EAN-13, UPC-A, Code 128, Code 39, and ITF-14 with instant checksum verification and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Scan & Decode 1D Barcodes Online',
        description: 'Step-by-step verified workflow instructions for Barcode Reader & Scanner Online.',
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
            name: 'Barcode Reader & Scanner Online',
            item: 'https://kagazo.in/tools/barcode-reader',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <span className="text-primary font-bold">Barcode Reader & Scanner Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Multi-Symbology 1D Optical Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Barcode Reader & </span>
            <span className="text-primary">Scanner (1D Camera & File)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Scan and decode 1D linear barcodes online using your web camera or image upload. Supports EAN-13, UPC-A, Code 128, Code 39, and ITF-14 with instant checksum verification and 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <BarcodeReaderEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Standards Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Broad 1D Symbology Support
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instantly identifies and decodes all major linear barcodes: Code 128, EAN-13, EAN-8, UPC-A, UPC-E, Code 39, and ITF-14.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Instant Checksum Integrity Check
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Validates mathematical check digits in real-time, eliminating false positive reads from damaged, faded, or partial barcode scans.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Camera video streams and uploaded photos are decoded entirely inside local browser memory via WebAssembly without cloud transmission.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    1D Barcode Scanner Architecture & Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Optical 1D Symbology Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Symbology</th><th className="py-2.5 px-3 font-bold">Decoding Mechanism</th><th className="py-2.5 px-3 font-bold">Checksum Validation</th><th className="py-2.5 px-3 font-bold">Scan Orientation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Code 128</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">WASM Pixel Binarization</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modulo 103 Weight Sum Verification</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Omnidirectional (±45 degree skew)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">EAN-13 / EAN-8</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Edge Detection Gradient Filter</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modulo 10 Even/Odd Parity Validation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Horizontal and Vertical scan lines</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">UPC-A / UPC-E</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Guard Pattern Center Match</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modulo 10 North American Checksum</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Real-time multi-angle continuous raster</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Code 39</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Narrow-to-Wide Ratio Analysis</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modulo 43 Optional Checksum</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Start/Stop delimiter character detection</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ITF-14</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Interleaved 2 of 5 Bearer Bars</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Modulo 10 Checksum Algorithm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-contrast edge trigger parsing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Codabar</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">7-Element Character Boundary</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Start/Stop A, B, C, D Symbol Match</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Precision library & medical barcode decode</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Scan & Decode 1D Barcodes Online
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and optimal results:
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
                  Common 1D Barcode Scanning Mistakes & Fixes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common scanning errors, protocol failures, and formatting pitfalls:
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

            {/* Strict 10 Comprehensive FAQs Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-darker pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-text-main/60">
                    Comprehensive technical, optical, and operational answers
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  10 Questions Answered
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2 hover:border-primary/20 transition-all"
                  >
                    <h3 className="font-bold text-text-main text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary font-black shrink-0">Q{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-text-main/70 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Compact Sticky Right Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* Key Criteria Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Barcode Reader Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Engine</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    WASM Computer Vision
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Supported Codes</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Code 128, EAN, UPC, Code 39
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Checksum</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Real-Time Parity Verification
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Inputs</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Live Camera & Image Upload
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Execution
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-3 space-y-2.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-text-main/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Related Tools
              </h3>
              <div className="space-y-1.5">
                <Link
                  href="/tools/barcode-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Barcode Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    1D Code
                  </span>
                </Link>
                <Link
                  href="/tools/qr-code-reader"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      QR Code Reader
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    2D Scan
                  </span>
                </Link>
                <Link
                  href="/tools/qr-code-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      QR Code Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    2D Code
                  </span>
                </Link>
                <Link
                  href="/tools/whatsapp-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      WhatsApp Link Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Chat
                  </span>
                </Link>
                <Link
                  href="/tools/utm-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UTM Link Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    GA4
                  </span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign In-RAM Privacy Box */}
            <div className="bg-surface rounded-2xl border border-surface-darker p-3 space-y-1.5 text-text-main/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-RAM Privacy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-main/70">
                All matrix calculations, optical decoding, and link generations occur strictly inside your device browser memory. Zero URLs, contact details, or payloads are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

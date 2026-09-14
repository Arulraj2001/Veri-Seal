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
import { BarcodeGeneratorEngine } from '@/components/tools/BarcodeGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Barcode Generator Online (Code 128, EAN-13, UPC-A, Code 39) | Kagazo',
  description: 'Generate commercial standard 1D barcodes online for free. Supports Code 128, EAN-13, UPC-A, Code 39, and ITF-14 with automatic checksum calculation, scalable vector SVG export, and 300 DPI print quality.',
  alternates: {
    canonical: 'https://kagazo.in/tools/barcode-generator',
  },
  openGraph: {
    title: 'Free Barcode Generator Online (Code 128, EAN-13, UPC-A, Code 39) | Kagazo',
    description: 'Generate commercial standard 1D barcodes online for free. Supports Code 128, EAN-13, UPC-A, Code 39, and ITF-14 with automatic checksum calculation, scalable vector SVG export, and 300 DPI print quality.',
    url: 'https://kagazo.in/tools/barcode-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Barcode Generator Online (Code 128, EAN-13, UPC-A, Code 39) | Kagazo',
    description: 'Generate commercial standard 1D barcodes online for free. Supports Code 128, EAN-13, UPC-A, Code 39, and ITF-14 with automatic checksum calculation, scalable vector SVG export, and 300 DPI print quality.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Symbology Standard",
    "desc": "Choose the appropriate barcode standard: Code 128 (general inventory), EAN-13 (global retail), or UPC-A (North American retail)."
  },
  {
    "step": 2,
    "title": "Enter Data Payload",
    "desc": "Type or paste your product SKU, serial number, or barcode digits. The engine automatically checks digit length and character validity."
  },
  {
    "step": 3,
    "title": "Customize Bar Dimensions",
    "desc": "Adjust bar width (narrow module X-dimension), total bar height, and toggle human-readable numeric text visibility."
  },
  {
    "step": 4,
    "title": "Verify Quiet Zones",
    "desc": "Ensure standard 10x module quiet zones are enabled on the left and right margins to prevent laser scanner misreads."
  },
  {
    "step": 5,
    "title": "Download Print-Ready Barcode",
    "desc": "Export your barcode in scalable vector SVG or high-resolution PNG format, ready for thermal label printing or packaging layout."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "FORMAT MISMATCH",
    "title": "Entering Letters into Numeric-Only Symbologies",
    "desc": "EAN-13 and UPC-A strictly support numeric digits 0-9. Entering alphabetic letters triggers generation errors. For alphanumeric SKU tracking, use Code 128."
  },
  {
    "badge": "QUIET ZONE CLIPPING",
    "title": "Printing Right up to the Label Edge",
    "desc": "Barcodes require a blank white quiet zone of at least 10x the narrow bar width on both ends. Trimming the white border prevents scanners from acquiring the start pattern."
  },
  {
    "badge": "INK BLEED / EXPANSION",
    "title": "Thermal Ink Spreading on Porous Paper",
    "desc": "Thermal printer heat or porous paper causes black bars to bleed into white spaces, corrupting bar width ratios. Select fine bar widths or thermal-treated label stock."
  },
  {
    "badge": "INVERTED COLORS",
    "title": "Printing White Bars on Black Backgrounds",
    "desc": "Traditional 1D red-laser scanners illuminate labels and detect light reflected by white gaps. Inverted barcodes absorb light across the entire label and cannot be read."
  }
];

const FAQS = [
  {
    "question": "What is the difference between Code 128 and EAN-13?",
    "answer": "Code 128 is a high-density alphanumeric symbology capable of encoding all 128 ASCII characters (letters, numbers, and symbols) of variable length; it is widely used in shipping, logistics, and internal warehouse tracking. EAN-13 is a fixed-length, 13-digit strictly numeric barcode governed by GS1 for global retail point-of-sale scanning."
  },
  {
    "question": "How is the EAN-13 check digit calculated?",
    "answer": "EAN-13 uses the standard GS1 Modulo 10 algorithm: sum the odd-positioned digits (weight 1), sum the even-positioned digits and multiply by 3, add the two totals together, take the remainder modulo 10, and subtract from 10. Our generator automatically calculates and appends this 13th check digit for you."
  },
  {
    "question": "Can I use UPC-A barcodes outside the United States and Canada?",
    "answer": "Yes. UPC-A is a 12-digit subset of EAN-13. Modern global retail scanners read both UPC-A and EAN-13 interchangeably. In fact, prefixing a single leading zero to a 12-digit UPC-A barcode converts it into a valid 13-digit EAN-13 standard format."
  },
  {
    "question": "What is the quiet zone on a barcode?",
    "answer": "The quiet zone is the blank margin on the extreme left and right sides of the barcode. For 1D linear barcodes, the quiet zone must measure at least 10 times the width of the narrowest bar (X-dimension) or 2.5 mm, whichever is greater, to signal start/stop triggers to optical scanners."
  },
  {
    "question": "Can I print these barcodes on thermal label printers like Zebra, Rollo, or Dymo?",
    "answer": "Yes. Download the high-resolution 300 DPI PNG or vector SVG format. These vector-accurate images print with crisp, sharp edges on all direct thermal and thermal transfer label printers without blurring."
  },
  {
    "question": "Do I need to purchase barcode numbers from GS1?",
    "answer": "If you are selling commercial products through global retail chains or major e-commerce marketplaces (Amazon, Walmart, Flipkart), you must register official company prefixes through GS1. For internal warehouse inventory, asset tags, or school libraries, you can generate free Code 128 barcodes using your own custom numbering scheme."
  },
  {
    "question": "What does human-readable text mean on a barcode?",
    "answer": "Human-readable text refers to the printed numeric or alphanumeric digits positioned below or above the barcode lines. This allows cashiers and warehouse operators to manually enter the SKU if the printed barcode becomes damaged or scratched."
  },
  {
    "question": "Why is SVG the preferred format for product packaging designers?",
    "answer": "SVG (Scalable Vector Graphics) defines barcode lines as mathematical vector paths rather than fixed pixels. This ensures the barcode can be scaled or imported into Adobe Illustrator, CorelDRAW, or InDesign without any loss of sharpness or bar width distortion."
  },
  {
    "question": "Does this barcode generator store my product SKUs or data?",
    "answer": "No. Our barcode engine runs 100% locally in your web browser memory using HTML5 Canvas and JavaScript. No product SKUs, serial numbers, or inventory records are ever uploaded to or stored on any server."
  },
  {
    "question": "What is Code 39, and when should I use it?",
    "answer": "Code 39 (also known as Code 3 of 9) is an older alphanumeric symbology commonly used in the automotive industry, aerospace, and government defense specifications (MIL-STD-1189). It uses start and stop asterisk characters (*) and can encode letters, digits, and basic punctuation."
  }
];

export default function BarcodeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Barcode Generator Studio Online',
        url: 'https://kagazo.in/tools/barcode-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate commercial standard 1D barcodes online for free. Supports Code 128, EAN-13, UPC-A, Code 39, and ITF-14 with automatic checksum calculation, scalable vector SVG export, and 300 DPI print quality.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate Standard 1D Barcodes Online',
        description: 'Step-by-step verified workflow instructions for Barcode Generator Studio Online.',
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
            name: 'Barcode Generator Studio Online',
            item: 'https://kagazo.in/tools/barcode-generator',
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
          <span className="text-primary font-bold">Barcode Generator Studio Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>GS1 & ISO/IEC Standard Symbologies</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Barcode Generator </span>
            <span className="text-primary">Code 128 & EAN-13 Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate commercial standard 1D barcodes online for free. Supports Code 128, EAN-13, UPC-A, Code 39, and ITF-14 with automatic checksum calculation, scalable vector SVG export, and 300 DPI print quality.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <BarcodeGeneratorEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Comprehensive Symbology Suite
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Full compliance with international standards: Code 128, EAN-13, UPC-A, Code 39, ITF-14, Codabar, and EAN-8.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Automated Modulo Checksum
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically computes Modulo 103 for Code 128, Modulo 10 (weight 1/3) for EAN/UPC, and Modulo 43 for Code 39.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Vector Scalability for Packaging
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download high-precision vector SVG files or 300/600 DPI raster images engineered specifically for packaging and label printers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    1D Barcode Symbology Specifications & Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  GS1 & ISO/IEC 15417 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Symbology</th><th className="py-2.5 px-3 font-bold">Character Set</th><th className="py-2.5 px-3 font-bold">Data Length</th><th className="py-2.5 px-3 font-bold">Primary Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Code 128 (Auto/A/B/C)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Full 128 ASCII Set (Alphanumeric)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Variable length (high density)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Logistics, inventory, shipping labels, healthcare</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">EAN-13 (International Article)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly Numeric (0-9)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">13 Digits (12 data + 1 checksum)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Global retail point-of-sale (POS) outside USA/Canada</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">UPC-A (Universal Product)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly Numeric (0-9)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">12 Digits (11 data + 1 checksum)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">North American retail point-of-sale (USA & Canada)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Code 39 (3 of 9)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Alphanumeric (A-Z, 0-9, symbols)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Variable length with start/stop *</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Automotive, aerospace, defense, internal inventory</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ITF-14 (Interleaved 2 of 5)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly Numeric (0-9)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">14 Digits (with bearer bars)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Corrugated master shipping cartons and pallets</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Codabar (NW-7)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Numeric (0-9) + 6 symbols</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Variable length (A/B/C/D start)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Blood banks, libraries, express parcel services</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate Standard 1D Barcodes Online
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
                  Common Barcode Printing Errors & Quality Guidelines
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
                Barcode Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Symbologies</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Code 128, EAN-13, UPC, Code 39
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Checksum</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Automated Modulo 10/103
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Export Formats</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Scalable SVG & 300 DPI PNG
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Quiet Zones</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Standard 10x Module Margins
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
                  href="/tools/barcode-reader"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Barcode Reader
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    1D Scan
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

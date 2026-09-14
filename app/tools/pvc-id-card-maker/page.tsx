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
} from 'lucide-react';
import PvcCardStudioEngine from '@/components/tools/PvcCardStudioEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PVC Smart ID Card Tray Print Studio | Epson L805 & Canon CR-80 300 DPI | Kagazo',
  description: 'Format and align identity cards for direct PVC card tray printing on Epson L805, L850, L8050, and Canon G-series printers. Exact CR-80 dimensions (85.6x53.98mm) with 1mm bleed margin at 300 DPI.',
  alternates: {
    canonical: 'https://kagazo.in/tools/pvc-id-card-maker',
  },
  openGraph: {
    title: 'PVC Smart ID Card Tray Print Studio | Epson L805 & Canon CR-80 300 DPI | Kagazo',
    description: 'Format and align identity cards for direct PVC card tray printing on Epson L805, L850, L8050, and Canon G-series printers. Exact CR-80 dimensions (85.6x53.98mm) with 1mm bleed margin at 300 DPI.',
    url: 'https://kagazo.in/tools/pvc-id-card-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PVC Smart ID Card Tray Print Studio | Epson L805 & Canon CR-80 300 DPI | Kagazo',
    description: 'Format and align identity cards for direct PVC card tray printing on Epson L805, L850, L8050, and Canon G-series printers. Exact CR-80 dimensions (85.6x53.98mm) with 1mm bleed margin at 300 DPI.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Front & Back Designs",
    "desc": "Upload your high-resolution card artwork, student badges, Aadhaar PVC designs, or employee credentials."
  },
  {
    "step": 2,
    "title": "Select Printer Tray Model",
    "desc": "Choose your equipment preset: Epson L805/L850/L8050 2-Card Tray, Canon G-Series Tray, or Single CR-80 Export."
  },
  {
    "step": 3,
    "title": "Verify Bleed & Safe Margins",
    "desc": "Ensure that important text, QR codes, and faces sit at least 2mm inside the blue safe guide boundary."
  },
  {
    "step": 4,
    "title": "Choose Dual Card Mode",
    "desc": "Configure Tray Slot 1 and Slot 2: Print Front + Back of one person, or print two separate individuals in one pass."
  },
  {
    "step": 5,
    "title": "Download 300 DPI Tray Canvas",
    "desc": "Export your 300 DPI print canvas, open your printer tray software (or print direct), and feed the PVC tray."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "WHITE EDGE DEFECT",
    "title": "Printing Without 1mm Bleed Allowance",
    "desc": "Inkjet trays have a physical mechanical variance of \u00b10.5mm. Printing exact-size art leaves an unsightly white plastic line. Always apply 1mm bleed."
  },
  {
    "badge": "TRAY SENSOR ERROR",
    "title": "Dirty White Reflective Calibration Marks",
    "desc": "Printers use reflective sensors to detect tray position. Scratched or ink-stained white locator squares trigger \"Tray Not Inserted\" errors. Keep markers clean."
  },
  {
    "badge": "MIRROR INVERSION CONFUSION",
    "title": "Mirroring Image on Direct Inkjet PVC Trays",
    "desc": "Mirror printing is strictly for Dragon Sheet lamination films. Direct inkjet PVC cards require standard (non-mirrored) orientation."
  },
  {
    "badge": "INK RUNNING / SMEARING",
    "title": "Printing on Non-Inkjet Coated Plastic Cards",
    "desc": "Standard thermal PVC cards cannot absorb water-based inkjet dyes. Ensure you purchase specialized \"Inkjet Printable PVC Cards\" with micro-porous coating."
  }
];

const FAQS = [
  {
    "question": "What printer models are supported for direct PVC tray printing?",
    "answer": "This studio supports popular 6-color and 4-color photo printers with dedicated PVC card tray attachments, including Epson EcoTank L805, L850, L8050, L8180, L1800, R280, R290, and Canon Pixma G1010, G2010, G3010, iP7230, and TS702."
  },
  {
    "question": "What are the exact dimensions of a standard PVC ID card?",
    "answer": "Under ISO/IEC 7810 ID-1 standard, standard CR-80 cards measure 85.60 mm by 53.98 mm with a thickness of 0.76 mm (30 mil) and rounded corners with a radius of 3.18 mm."
  },
  {
    "question": "Why is a 1mm bleed margin necessary for PVC printing?",
    "answer": "Direct card trays have slight mechanical feed tolerances (\u00b10.3mm to \u00b10.8mm). Extending the background artwork 1mm beyond the edge guarantees full edge-to-edge coverage without leaving a visible unprinted white plastic border."
  },
  {
    "question": "Do I need special PVC cards for inkjet tray printing?",
    "answer": "Yes. You must use \"Inkjet Printable PVC Cards\" which feature a specialized micro-porous chemical coating that absorbs and locks in water-based dye and pigment inks instantly."
  },
  {
    "question": "Can I print both sides of the card at the same time?",
    "answer": "A tray holds two cards simultaneously. You can print Card 1 front and Card 2 front on the first pass, then flip both cards over in the tray and run a second pass to print the reverse sides."
  },
  {
    "question": "What is the difference between Direct PVC Tray printing and Dragon Sheet lamination?",
    "answer": "Direct PVC tray printing prints directly onto pre-molded plastic cards using a specialized plastic tray inside an inkjet printer. Dragon Sheet printing prints onto transparent synthetic film, which is then laminated onto a PVC core sheet using a pouch laminator."
  },
  {
    "question": "Are the printed cards waterproof and scratch-resistant?",
    "answer": "Inkjet printable PVC cards dry instantly and are water-resistant to light moisture. For maximum scratch resistance and durability against heavy daily wear, applying a thin UV clear coat spray or adhesive overlay is recommended."
  },
  {
    "question": "How do I align the tray in the printer feed slot?",
    "answer": "Lower your printer CD/DVD tray guide, gently slide the PVC tray in until the white alignment arrows on the tray line up precisely with the marker arrows on the printer casing, then initiate the print job."
  },
  {
    "question": "Are customer photos and ID card details saved on your server?",
    "answer": "No. The entire alignment, cropping, bleed generation, and rasterization pipeline runs 100% inside your browser memory using HTML5 Canvas. Zero client files are sent across the internet."
  },
  {
    "question": "Can I print Aadhaar PVC cards, PAN cards, and Voter IDs with this tool?",
    "answer": "Yes. Any government identity card formatted to the standard CR-80 layout can be aligned and printed with professional studio-grade quality."
  }
];

export default function PvcIdCardMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PVC Smart ID Card Tray Print Studio',
        url: 'https://kagazo.in/tools/pvc-id-card-maker',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Format and align identity cards for direct PVC card tray printing on Epson L805, L850, L8050, and Canon G-series printers. Exact CR-80 dimensions (85.6x53.98mm) with 1mm bleed margin at 300 DPI.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Format PVC Cards for Direct Tray Printing',
        description: 'Step-by-step verified workflow instructions for PVC Smart ID Card Tray Print Studio.',
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
            name: 'PVC Smart ID Card Tray Print Studio',
            item: 'https://kagazo.in/tools/pvc-id-card-maker',
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
          <span className="text-primary font-bold">PVC Smart ID Card Tray Print Studio</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Epson & Canon Tray Calibrated</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PVC Smart ID Card </span>
            <span className="text-primary">Tray Print Studio (CR-80)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Format and align identity cards for direct PVC card tray printing on Epson L805, L850, L8050, and Canon G-series printers. Exact CR-80 dimensions (85.6x53.98mm) with 1mm bleed margin at 300 DPI.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <PvcCardStudioEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Print Production &amp; Cyber Cafe Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Calibrated Tray Offsets
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-aligned slot coordinates specifically calibrated for Epson 2-card trays (L805/L850) and Canon Pixma G-series PVC card trays.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 1mm Anti-Fringe Bleed System
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically extends background artwork 1mm beyond the physical card border, eliminating unprinted white plastic edge strips.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Dual Card Batch Processing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Simultaneously print Card 1 and Card 2 (or Front and Back sides) on a single tray pass, cutting printing time in half.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    PVC Card Tray & CR-80 Technical Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative paper standards, print dimensions, and regulatory compliance thresholds:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  ISO/IEC 7810 ID-1 PVC Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">CR-80 Official Standard</th><th className="py-2.5 px-3 font-bold">PVC Tray Specification</th><th className="py-2.5 px-3 font-bold">Production Guideline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Physical Card Size</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">85.60 mm x 53.98 mm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard 30 Mil (0.76 mm) PVC Card</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rounded corner radius 3.18 mm (1/8 in)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Bleed Allowance</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1.0 mm Perimeter Bleed</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Total Canvas: 87.60 x 55.98 mm</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prevents white edge fringing on cutter shifts</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Canvas Resolution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">300 DPI Native Raster</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">1035 x 661 Pixels (with Bleed)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Lossless rendering of fine barcodes & seals</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Printer Tray Compatibility</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2-Card Dedicated Tray</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Epson L805, L850, L8050, L1800, Canon G1010-G3010</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Card 1 (Left/Top) & Card 2 (Right/Bottom)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Color Space & Ink Profile</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-Gloss Dye/Pigment Ink</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Vivid sRGB / CMYK Photorealistic</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Compatible with inkjet receptive PVC coatings</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Print Direction</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Direct Front-Facing Print</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">No mirror reflection needed for direct trays</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mirror only for Dragon Sheet thermal lamination</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Format PVC Cards for Direct Tray Printing
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
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
                  Common PVC Card Printing Pitfalls & Fixes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common paper feed errors, scaling mistakes, and upload rejections:
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
                    Comprehensive technical, print lab, and operational answers
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
                PVC Studio Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    ISO/IEC 7810 ID-1 (CR-80)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Card Dimensions</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    85.60 x 53.98 x 0.76 mm
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Bleed Canvas</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    87.6 x 55.98 mm (300 DPI)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Tray Support</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Epson & Canon 2-Card Trays
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security</div>
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
                  href="/tools/a4-multi-card-sheet"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      A4 Multi-Card Sheet
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    A4 Gang
                  </span>
                </Link>
                <Link
                  href="/tools/aadhaar-front-back-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar Front & Back PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Aadhaar
                  </span>
                </Link>
                <Link
                  href="/tools/aadhaar-pan-kyc-merge"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Aadhaar PAN KYC Merge
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    KYC
                  </span>
                </Link>
                <Link
                  href="/tools/driving-license-card-merger"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Driving License Merger
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    DL
                  </span>
                </Link>
                <Link
                  href="/tools/passport-photo-sheet-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Photo Sheet
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Photos
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
                All image cropping, formatting, and high-DPI document rendering occur strictly inside your device browser memory. Zero identity cards or photo scans are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

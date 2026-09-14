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
import AadhaarFrontBackMergerEngine from '@/components/tools/AadhaarFrontBackMergerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Aadhaar Front and Back on Single Page PDF (Under 200KB) | Online Free | Kagazo',
  description: 'Merge Aadhaar card front and back onto a single A4 PDF page under 200KB. Perfect Xerox photocopy style with high contrast, side-by-side or stacked layout, and 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/aadhaar-front-back-pdf',
  },
  openGraph: {
    title: 'Aadhaar Front and Back on Single Page PDF (Under 200KB) | Online Free | Kagazo',
    description: 'Merge Aadhaar card front and back onto a single A4 PDF page under 200KB. Perfect Xerox photocopy style with high contrast, side-by-side or stacked layout, and 100% client-side privacy.',
    url: 'https://kagazo.in/tools/aadhaar-front-back-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadhaar Front and Back on Single Page PDF (Under 200KB) | Online Free | Kagazo',
    description: 'Merge Aadhaar card front and back onto a single A4 PDF page under 200KB. Perfect Xerox photocopy style with high contrast, side-by-side or stacked layout, and 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Front Side",
    "desc": "Select or drag-and-drop the front photo or scan of your Aadhaar card containing your photo, name, DOB, and gender."
  },
  {
    "step": 2,
    "title": "Upload Back Side",
    "desc": "Upload the back side image containing your father/husband name, residential address, and UIDAI security QR code."
  },
  {
    "step": 3,
    "title": "Choose Page Layout",
    "desc": "Select Horizontal (Side-by-Side Xerox style) or Vertical (Stacked Top-Bottom) based on your target portal requirements."
  },
  {
    "step": 4,
    "title": "Adjust Contrast & Quality",
    "desc": "Toggle Grayscale Photocopy mode or enhance sharpness to ensure all 12 digits and address text are crisp and legible."
  },
  {
    "step": 5,
    "title": "Download Single-Page PDF",
    "desc": "Click Download PDF to instantly export your merged document guaranteed to stay strictly under 200KB."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "PORTAL REJECTION #1",
    "title": "Uploading 2 Separate Single-Side PDFs",
    "desc": "Govt portals offer only one file attachment slot for Identity Proof. Submitting only the front side results in instant application rejection for missing address proof."
  },
  {
    "badge": "FILE OVERSIZE ERROR",
    "title": "File Size Exceeding 200KB Limit",
    "desc": "Raw smartphone camera photos range from 3MB to 8MB. Govt upload scripts drop files over 200KB. Use our built-in smart compression to stay safely under the cap."
  },
  {
    "badge": "ILLEGIBLE QR CODE",
    "title": "Over-Compressing into Pixelated Artifacts",
    "desc": "Excessive lossy compression corrupts the 2D secure QR code. Our adaptive encoder retains high contrast across QR zones while compressing blank page whitespace."
  },
  {
    "badge": "CROPPED ADDRESS MARGINS",
    "title": "Cropping Out Care Of (C/O) or Pincode",
    "desc": "Cropping too closely to the card border frequently cuts off the PIN code or father's name line. Always leave a 2mm border margin around the outer card perimeter."
  }
];

const FAQS = [
  {
    "question": "Why do government portals require Aadhaar front and back on a single page?",
    "answer": "Portal upload systems (such as EPFO UAN portal, Passport Seva, Indian Railways, and banking KYC forms) provide a single document upload field. They require both identity proof (front with photo and DOB) and address proof (back with address and QR code) on one single viewable page."
  },
  {
    "question": "How does this tool guarantee the output PDF is under 200KB?",
    "answer": "Our client-side compression pipeline utilizes WebAssembly and JBIG2/JPEG adaptive compression. It isolates the identity card regions, optimizes background white space, and sets the DPI to 200, resulting in a crisp document measuring between 120KB and 180KB."
  },
  {
    "question": "Is it safe to upload my Aadhaar card to this website?",
    "answer": "Yes, 100% safe. This tool runs entirely within your browser local sandbox using JavaScript and HTML5 Canvas. Your document images and Aadhaar details are never transmitted across the internet, logged into databases, or viewed by third parties."
  },
  {
    "question": "Should I choose Side-by-Side or Stacked layout?",
    "answer": "Side-by-Side (Horizontal) layout mimics the traditional Xerox photocopy format preferred by Indian banks and offline paperwork. Stacked (Vertical) layout is ideal for mobile viewing and official portals that display documents in a portrait viewer."
  },
  {
    "question": "Can I convert my Aadhaar into a black-and-white Xerox photocopy?",
    "answer": "Yes. Enable the \"Grayscale / Xerox Mode\" toggle. The engine strips color noise, balances contrast, and brightens background grays to produce a clean, authentic photocopy-style PDF."
  },
  {
    "question": "Will the UIDAI secure QR code still scan after merging?",
    "answer": "Yes. The engine preserves vector-level sharpness in high-frequency regions like the QR code matrix, allowing UIDAI verification apps, banking barcode scanners, and airport CISF scanners to read it without errors."
  },
  {
    "question": "Can I use this merged PDF for bank KYC and SIM verification?",
    "answer": "Yes. Major Indian banks (SBI, HDFC, ICICI, Axis, PNB) and telecom operators (Airtel, Jio, Vi) accept single-page Aadhaar front and back PDFs for digital e-KYC and re-KYC verification."
  },
  {
    "question": "What if my Aadhaar scan is crooked or rotated?",
    "answer": "The merger interface provides 90-degree rotation and fine angle alignment tools so you can straighten tilted camera photos before combining them onto the canvas."
  },
  {
    "question": "Can I also print this PDF on standard A4 paper?",
    "answer": "Yes. The generated PDF uses standard ISO A4 paper dimensions (210 x 297 mm). When printed at 100% scale, the card replicas match actual pocket card dimensions."
  },
  {
    "question": "Do I need to install any software or pay a fee?",
    "answer": "No software installation, extensions, or account sign-ups are required. The tool is 100% free and works seamlessly on Windows, macOS, Android, iPhone, and Linux browsers."
  }
];

export default function AadhaarFrontBackPdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Aadhaar Front & Back Single Page PDF Merger',
        url: 'https://kagazo.in/tools/aadhaar-front-back-pdf',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Merge Aadhaar card front and back onto a single A4 PDF page under 200KB. Perfect Xerox photocopy style with high contrast, side-by-side or stacked layout, and 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge Aadhaar Front & Back into One PDF',
        description: 'Step-by-step verified workflow instructions for Aadhaar Front & Back Single Page PDF Merger.',
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
            name: 'Aadhaar Front & Back Single Page PDF Merger',
            item: 'https://kagazo.in/tools/aadhaar-front-back-pdf',
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
          <span className="text-primary font-bold">Aadhaar Front & Back Single Page PDF Merger</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official Portal Upload Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Aadhaar Front & Back </span>
            <span className="text-primary">Single Page PDF (Under 200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Merge Aadhaar card front and back onto a single A4 PDF page under 200KB. Perfect Xerox photocopy style with high contrast, side-by-side or stacked layout, and 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <AadhaarFrontBackMergerEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Strict Sub-200KB Compression
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Engineered specifically for EPFO, Passport Seva, SBI, and State PSC portals that reject any document exceeding 200KB.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Clean Xerox Photocopy Mode
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Smart grayscale contrast engine eliminates camera shadows, yellowed paper background noise, and uneven phone flash glare.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Zero-Upload Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    UIDAI identity data is processed entirely in browser memory. Your biometric Aadhaar number and address never touch any server.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Aadhaar Single-Page PDF Specifications
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative paper standards, print dimensions, and regulatory compliance thresholds:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  UIDAI & Govt Portal Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Requirement</th><th className="py-2.5 px-3 font-bold">Official Specification</th><th className="py-2.5 px-3 font-bold">Compliance Threshold</th><th className="py-2.5 px-3 font-bold">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">File Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Portable Document Format (PDF)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Standard PDF 1.4 - 1.7</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Single unified page only</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Maximum File Size</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Under 200 KB (or 300 KB)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strict upload cap on govt portals</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">120 KB - 180 KB optimal target</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Card Layout</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Side-by-Side or Stacked Vertical</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">CR-80 True Proportions</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Horizontal layout for A4 Xerox style</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Resolution / DPI</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">150 - 300 DPI</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Minimum 150 DPI for e-KYC</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">200 DPI balances size and clarity</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Visual Clarity</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Legible Aadhaar No. & QR Code</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero blur or pixelation on name/DOB</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Grayscale Xerox or Contrast Boost</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Page Count</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly 1 Page Only</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Multi-page uploads rejected</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Both sides on single viewable canvas</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Merge Aadhaar Front & Back into One PDF
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
                  Common Aadhaar Upload Rejections & Quick Fixes
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
                Aadhaar PDF Thresholds
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Target Size</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Strictly Under 200 KB (Govt Cap)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Dimensions</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    A4 Portrait / Landscape
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Resolution</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    200 DPI High-Contrast
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Card Aspect</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    CR-80 85.6 x 53.98 mm
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Compliance</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    UIDAI & RBI KYC Ready
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
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Mask Aadhaar Number
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Privacy
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
                  href="/tools/pvc-id-card-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PVC ID Card Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    CR-80
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

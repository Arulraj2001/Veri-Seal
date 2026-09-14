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
import { SignatureGeneratorEngine } from '@/components/tools/SignatureGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Digital Signature Generator Online (Draw & Type Transparent PNG) | Kagazo',
  description: 'Create official digital signatures online for PDF contracts, exam forms, and legal documents. Draw with smooth ink or type in calligraphy fonts. Export crisp 300 DPI transparent PNG with 100% in-RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/signature-generator',
  },
  openGraph: {
    title: 'Digital Signature Generator Online (Draw & Type Transparent PNG) | Kagazo',
    description: 'Create official digital signatures online for PDF contracts, exam forms, and legal documents. Draw with smooth ink or type in calligraphy fonts. Export crisp 300 DPI transparent PNG with 100% in-RAM privacy.',
    url: 'https://kagazo.in/tools/signature-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Signature Generator Online (Draw & Type Transparent PNG) | Kagazo',
    description: 'Create official digital signatures online for PDF contracts, exam forms, and legal documents. Draw with smooth ink or type in calligraphy fonts. Export crisp 300 DPI transparent PNG with 100% in-RAM privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Choose Creation Mode",
    "desc": "Select Draw Mode to sign with your mouse/touchscreen or Type Mode using calligraphy fonts."
  },
  {
    "step": 2,
    "title": "Select Professional Ink Color",
    "desc": "Pick formal Black, deep Navy Blue, or Royal Blue matching physical ballpoint and gel pens."
  },
  {
    "step": 3,
    "title": "Adjust Pen Stroke Width",
    "desc": "Fine-tune stroke thickness from fine-nib (1.5px) to bold fountain pen (3.5px) with ink smoothing."
  },
  {
    "step": 4,
    "title": "Trim & Crop Canvas",
    "desc": "Auto-crop excess white space around your signature to eliminate unnecessary margins."
  },
  {
    "step": 5,
    "title": "Download Transparent PNG",
    "desc": "Export a high-resolution 300 DPI transparent PNG file ready to insert into Word, Adobe PDF, or Google Docs."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Solid White Background Box",
    "title": "White Rectangle Covering Document Lines",
    "desc": "Saving signatures with a solid white background creates an unsightly box that obscures legal contract text and signature lines. Kagazo exports clean transparent PNGs that float seamlessly above document text."
  },
  {
    "badge": "Error: Signing in All Capital Letters",
    "title": "Block Letter Signatures Rejected by Portals",
    "desc": "Government exam portals (SSC, UPSC) explicitly state that signatures written entirely in CAPITAL or BLOCK letters will be disqualified. Always use natural cursive handwriting."
  },
  {
    "badge": "Error: Unconventional Ink Colors",
    "title": "Using Red, Green, or Light Ink Colors",
    "desc": "Red ink is legally reserved for gazetted attesting authorities, while light gray ink causes automated OCR scanner rejection. Restrict signatures strictly to black or dark blue."
  },
  {
    "badge": "Error: Jagged Mouse Drawing",
    "title": "Shaky Unnatural Mouse Curves",
    "desc": "Signing with a standard computer mouse without curve smoothing produces jagged, stepped lines. Our B\u00e9zier interpolation engine normalizes velocity and pressure for fluid strokes."
  }
];

const FAQS = [
  {
    "question": "Are digital signatures created with this tool legally valid?",
    "answer": "Under Section 10A of the Indian Information Technology Act 2000 and the US ESIGN Act, electronic signatures placed on contracts, invoices, and business agreements are legally binding when agreed upon by all parties. For statutory filings requiring DSC tokens, a cryptographic e-Sign is mandated."
  },
  {
    "question": "Is my signature saved, stored, or visible to Kagazo staff?",
    "answer": "Never. Kagazo processes your signature drawing 100% locally inside your web browser HTML5 canvas. No signature images, coordinates, or vector paths are ever uploaded or transmitted across external networks."
  },
  {
    "question": "Can I download my signature with a transparent background?",
    "answer": "Yes. Clicking \"Download Transparent PNG\" exports an alpha-channel PNG where only the ink strokes exist. You can insert it into PDFs, Word contracts, or invoices without any white background covering document text."
  },
  {
    "question": "Can I create a signature by typing my name?",
    "answer": "Yes. In Type Mode, enter your full legal name and choose from curated calligraphic, cursive, and executive typography styles that mimic realistic handwritten penmanship."
  },
  {
    "question": "How do I add this signature to a PDF document?",
    "answer": "Open your PDF in Adobe Acrobat, Apple Preview, or our Sign PDF tool. Select \"Fill & Sign\" or \"Insert Image\", select your downloaded transparent PNG, resize to fit the signature box, and save the signed PDF."
  },
  {
    "question": "Can I sign on my mobile phone or tablet using a stylus or finger?",
    "answer": "Yes. Kagazo is fully touch-optimized with high-frequency touch event listeners, supporting fingertips, Apple Pencil, and Samsung S-Pen with pressure-sensitive stroke simulation."
  },
  {
    "question": "What is the best ink color for government exam applications?",
    "answer": "Black ink on unruled white paper is universally recommended by SSC, UPSC, IBPS, and State PSC boards because black ink provides the highest optical density and contrast during automated document scanning."
  },
  {
    "question": "Can I resize my signature to exact pixel and KB dimensions for exam portals?",
    "answer": "Yes. If your portal requires exact dimensions (e.g., 140x60 px, 10-20 KB), you can download your signature and calibrate it in 1 click using our dedicated SSC Signature Resizer or Compress Image to 20KB tool."
  },
  {
    "question": "Can I clear the canvas and redraw as many times as needed?",
    "answer": "Yes. There are zero limits. You can undo individual strokes or click \"Clear\" to redraw until your signature looks perfectly natural and consistent with your physical handwriting."
  },
  {
    "question": "What resolution is the exported signature file?",
    "answer": "The canvas exports at 300 DPI high-definition resolution, ensuring that when printed on physical paper contracts, the ink strokes appear razor-sharp without pixelation."
  }
];

export default function SignatureGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Digital Signature Generator Studio',
        url: 'https://kagazo.in/tools/signature-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Create official digital signatures online for PDF contracts, exam forms, and legal documents. Draw with smooth ink or type in calligraphy fonts. Export crisp 300 DPI transparent PNG with 100% in-RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Digital Signature in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Digital Signature Generator Studio.',
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
            name: 'Digital Signature Generator Studio',
            item: 'https://kagazo.in/tools/signature-generator',
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
          <span className="text-primary font-bold">Digital Signature Generator Studio</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Draw, Type & Smooth • 300 DPI Transparent PNG Export</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Digital Signature Generator Studio & </span>
            <span className="text-primary">Transparent PNG Creator</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create official digital signatures online for PDF contracts, exam forms, and legal documents. Draw with smooth ink or type in calligraphy fonts. Export crisp 300 DPI transparent PNG with 100% in-RAM privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <SignatureGeneratorEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Compliance Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Bézier Smoothing Engine
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Interactive vector stroke interpolation eliminates jagged mouse edges to simulate natural pen handwriting.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 300 DPI Transparent PNG
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instant export with transparent alpha background, allowing seamless placement over contracts without white boxes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your personal handwritten signature is rendered strictly in browser RAM and never transmitted across the web.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Digital Signature Formatting & Legal Compliance Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  IT Act 2000 Standards
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Application Domain</th><th className="py-2.5 px-3 font-bold">Prescribed Format & Resolution</th><th className="py-2.5 px-3 font-bold">Statutory / Practical Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PDF Contracts & Corporate Agreements</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">300 DPI Transparent PNG (Black / Navy Blue)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Placed over signature line without obscuring contract text</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Indian Exam Portals (SSC, UPSC, IBPS)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strict 10 KB to 20 KB JPEG on white background</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Must be handwritten in running cursive; NO capital letters</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Banking & Cheque Authorizations</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Ink pen on white paper with high-contrast scan</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Matches specimen signature on bank KYC card records</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Legal Declarations & Affidavits</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Digital e-Sign or printed ink signature</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Recognized under Indian Information Technology Act 2000</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Color Standards</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Pure Black (#000000) or Dark Blue (#0B3C5D)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High contrast required for automated portal scanner OCR</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Canvas Dimension</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">800 x 400 px (2:1 Aspect Ratio)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Universal aspect ratio accepted across all web platforms</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Create a Digital Signature in 5 Steps
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
                  Common Digital Signature Errors & Legal Pitfalls
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, legal omissions, and calculation pitfalls:
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
                    Comprehensive technical, legal, and operational answers
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
                Signature Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Transparent PNG</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Alpha-channel export without white bounding box.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Bézier Smoothing</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Vector interpolation for natural handwritten pen curves.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">100% In-RAM</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Zero server transmission of personal signature assets.
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
                  href="/tools/signature-cleaner-extractor"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Black Ink Signature Cleaner
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Clean
                  </span>
                </Link>
                <Link
                  href="/tools/sign-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Sign PDF Documents Online
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    PDF
                  </span>
                </Link>
                <Link
                  href="/tools/compress-image-to-20kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress Image to 20KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Exam
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
                All calculations and security operations occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

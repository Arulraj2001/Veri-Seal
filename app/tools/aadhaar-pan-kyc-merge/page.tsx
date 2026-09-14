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
import AadhaarPanKycMergerEngine from '@/components/tools/AadhaarPanKycMergerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Aadhaar + PAN Single PDF KYC Merger (Under 200KB) | Bank & SIM KYC | Kagazo',
  description: 'Merge Aadhaar card and PAN card into a single A4 PDF under 200KB for bank account opening, demat accounts, and SIM KYC. Includes self-attestation signing space and instant 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/aadhaar-pan-kyc-merge',
  },
  openGraph: {
    title: 'Aadhaar + PAN Single PDF KYC Merger (Under 200KB) | Bank & SIM KYC | Kagazo',
    description: 'Merge Aadhaar card and PAN card into a single A4 PDF under 200KB for bank account opening, demat accounts, and SIM KYC. Includes self-attestation signing space and instant 100% client-side privacy.',
    url: 'https://kagazo.in/tools/aadhaar-pan-kyc-merge',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadhaar + PAN Single PDF KYC Merger (Under 200KB) | Bank & SIM KYC | Kagazo',
    description: 'Merge Aadhaar card and PAN card into a single A4 PDF under 200KB for bank account opening, demat accounts, and SIM KYC. Includes self-attestation signing space and instant 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Aadhaar Front & Back",
    "desc": "Upload clear scans or photos of your Aadhaar card front (photo/DOB) and back (address/QR code)."
  },
  {
    "step": 2,
    "title": "Upload PAN Card Front",
    "desc": "Upload your PAN card front side displaying your PAN number, name, parent name, photograph, and signature."
  },
  {
    "step": 3,
    "title": "Select A4 Template Layout",
    "desc": "Choose between Classic Bank Layout (Aadhaar top, PAN bottom) or Compact KYC Grid with self-attestation box."
  },
  {
    "step": 4,
    "title": "Set Target File Compression",
    "desc": "Select target size: Under 200KB (strict banking upload limit) or 300 DPI Ultra-Clear for physical printouts."
  },
  {
    "step": 5,
    "title": "Download Unified KYC PDF",
    "desc": "Export your unified single-sheet KYC PDF ready to upload directly to net banking or demat verification portals."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "REJECTION REASON #1",
    "title": "Submitting Separate Documents on Single-Upload Slot",
    "desc": "Most banking and demat verification portals only provide one slot for \"OVD / Identity & Financial Proof\". Submitting only PAN or only Aadhaar leads to rejection."
  },
  {
    "badge": "SIGNATURE MISSING",
    "title": "Omitting Self-Attestation Signature",
    "desc": "RBI guidelines mandate self-attestation (\"Self-attested\" + signature + date) across copies. Use our layout spacing to sign across both document representations."
  },
  {
    "badge": "FILE SIZE EXCEEDED",
    "title": "File Size Above 200KB Gateway Limit",
    "desc": "Uploading raw uncompressed photos totals 4MB+, triggering instant gateway errors. Our smart compression keeps files safely within 140KB to 190KB."
  },
  {
    "badge": "GLARE OVER PAN NUMBER",
    "title": "Flash Reflection Hiding 10-Digit PAN",
    "desc": "Camera flash reflecting off glossy laminated PAN cards obscures letters. Re-upload a glare-free photo or enable high-contrast enhancement."
  }
];

const FAQS = [
  {
    "question": "Why do banks and demat portals ask for Aadhaar and PAN on one PDF?",
    "answer": "Under RBI Master Direction on KYC and SEBI guidelines, financial institutions must cross-verify Permanent Account Number (PAN) with Officially Valid Documents (OVD - Aadhaar) to verify identity, address, and financial tax status in one consolidated record."
  },
  {
    "question": "Is the back side of the PAN card required?",
    "answer": "No. The back side of standard Indian PAN cards contains only the Income Tax Department hologram and instructions. Only the front side containing the 10-character alphanumeric PAN, name, father name, DOB, photo, and signature is legally required."
  },
  {
    "question": "How do I add my self-attestation signature to the merged PDF?",
    "answer": "Our layout leaves an open 40mm margin below the cards. You can either print the page, sign physically with a blue/black ballpoint pen, and re-scan, or apply a digital signature using PDF signing software."
  },
  {
    "question": "Will this single PDF pass Zerodha, Groww, and Upstox KYC?",
    "answer": "Yes. All major Indian discount brokers and mutual fund platforms (Zerodha, Groww, Upstox, AngelOne, CAMS, KFintech) accept single-page consolidated Aadhaar + PAN KYC PDF files under 200KB."
  },
  {
    "question": "What is the maximum file size limit for SBI and HDFC online account opening?",
    "answer": "State Bank of India (SBI YONO) and HDFC Bank portal upload limits cap PDF attachments at 200KB or 300KB. Our engine dynamically optimizes image buffers to stay strictly below 200KB."
  },
  {
    "question": "Is my financial data safe on this website?",
    "answer": "Completely safe. The merger executes 100% locally in your web browser RAM via client-side WebAssembly. No PAN numbers, Aadhaar numbers, photographs, or personal records are ever transmitted to any external server."
  },
  {
    "question": "Can I also use this PDF for new SIM card activation?",
    "answer": "Yes. Telecom service providers (Jio, Airtel, Vodafone Idea) accept combined Aadhaar + PAN PDF sheets for postpaid connections and corporate enterprise SIM verifications."
  },
  {
    "question": "What if my PAN card is an e-PAN downloaded from NSDL/UTIITSL?",
    "answer": "You can take a screenshot or crop the digital card from your e-PAN PDF and upload it directly. The engine aligns it perfectly alongside your Aadhaar card."
  },
  {
    "question": "Can I print this single sheet on standard A4 paper for offline bank visits?",
    "answer": "Yes. The canvas is rendered at standard A4 proportions (210 x 297 mm) at 300 DPI. When printed at 100% scale, it serves as a crisp, professional photocopy replacement for in-branch submission."
  },
  {
    "question": "Does this tool support Masked Aadhaar along with PAN?",
    "answer": "Yes. If you have already masked the first 8 digits of your Aadhaar card using our Mask Aadhaar tool, you can upload the masked version here for high-security compliance."
  }
];

export default function AadhaarPanKycMergePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Aadhaar + PAN Single PDF KYC Merger',
        url: 'https://kagazo.in/tools/aadhaar-pan-kyc-merge',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Merge Aadhaar card and PAN card into a single A4 PDF under 200KB for bank account opening, demat accounts, and SIM KYC. Includes self-attestation signing space and instant 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Combine Aadhaar & PAN into One KYC PDF',
        description: 'Step-by-step verified workflow instructions for Aadhaar + PAN Single PDF KYC Merger.',
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
            name: 'Aadhaar + PAN Single PDF KYC Merger',
            item: 'https://kagazo.in/tools/aadhaar-pan-kyc-merge',
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
          <span className="text-primary font-bold">Aadhaar + PAN Single PDF KYC Merger</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Banking & Demat KYC Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Aadhaar + PAN KYC </span>
            <span className="text-primary">Single PDF Merger (Under 200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Merge Aadhaar card and PAN card into a single A4 PDF under 200KB for bank account opening, demat accounts, and SIM KYC. Includes self-attestation signing space and instant 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <AadhaarPanKycMergerEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> 3-in-1 Complete KYC Layout
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Seamlessly arranges Aadhaar Front, Aadhaar Back, and PAN Card front onto a single standardized A4 page with calibrated spacing.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Self-Attestation Signing Margin
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Leaves designated white margins with guideline text for physical wet signatures or digital signatures before document submission.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Bank & Demat Gateway Compliant
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Optimized for instant acceptance across SBI, HDFC, ICICI, Zerodha, Groww, AngelOne, Upstox, EPFO, and IT Portal upload forms.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Banking & Demat KYC Document Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative paper standards, print dimensions, and regulatory compliance thresholds:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  RBI & SEBI KYC Master Directions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">KYC Requirement</th><th className="py-2.5 px-3 font-bold">Regulatory Standard</th><th className="py-2.5 px-3 font-bold">Portal Threshold</th><th className="py-2.5 px-3 font-bold">Implementation Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Aadhaar Card Sides</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Front & Back mandatory</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Identity + Address verified together</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Side-by-side at top of sheet</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PAN Card Display</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Front side with photo & signature</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Valid 10-character PAN format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Positioned at bottom half</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Maximum File Size</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Under 200 KB or 300 KB</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strict gateway limit on bank portals</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Adaptive JBIG2/JPEG compression</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Self-Attestation Area</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Signature & Date space</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mandatory for non-video KYC verification</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Clear 40mm margin provided</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Resolution / DPI</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">200 - 300 DPI native raster</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Legible micro-text & signatures</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero distortion on security seals</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Client Security</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero Cloud Upload / In-RAM</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Confidential financial identifiers</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Guaranteed local browser processing</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Combine Aadhaar & PAN into One KYC PDF
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
                  Common KYC Document Rejections & Quick Solutions
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
                KYC Merge Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Documents</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Aadhaar (F+B) + PAN (Front)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Target Size</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Strictly Under 200 KB (Banking)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Signing Space</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Self-Attestation Margin
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Page Format</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Standard A4 Portrait
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Zero Server Data Storage
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
                  href="/tools/mask-aadhaar"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Mask Aadhaar
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
                  href="/tools/salary-slip-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Salary Slip Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Finance
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

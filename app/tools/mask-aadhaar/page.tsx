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
import { AadhaarMaskEngine } from '@/components/tools/AadhaarMaskEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Mask Aadhaar Online Free (First 8 Digits Redacted) | UIDAI Compliant | Kagazo',
  description: 'Mask your Aadhaar card online free per UIDAI and RBI guidelines. Black out the first 8 digits (XXXXXXXX) while keeping the last 4 digits, photograph, and QR code visible. 100% in-browser RAM privacy, zero cloud storage.',
  alternates: {
    canonical: 'https://kagazo.in/tools/mask-aadhaar',
  },
  openGraph: {
    title: 'Mask Aadhaar Online Free (First 8 Digits Redacted) | UIDAI Compliant | Kagazo',
    description: 'Mask your Aadhaar card online free per UIDAI and RBI guidelines. Black out the first 8 digits (XXXXXXXX) while keeping the last 4 digits, photograph, and QR code visible. 100% in-browser RAM privacy, zero cloud storage.',
    url: 'https://kagazo.in/tools/mask-aadhaar',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mask Aadhaar Online Free (First 8 Digits Redacted) | UIDAI Compliant | Kagazo',
    description: 'Mask your Aadhaar card online free per UIDAI and RBI guidelines. Black out the first 8 digits (XXXXXXXX) while keeping the last 4 digits, photograph, and QR code visible. 100% in-browser RAM privacy, zero cloud storage.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Aadhaar Document",
    "desc": "Select your downloaded e-Aadhaar PDF or clear smartphone scan of your physical Aadhaar card."
  },
  {
    "step": 2,
    "title": "Position Redaction Box",
    "desc": "Drag the opaque black redaction box over the first 8 digits of your 12-digit Aadhaar number."
  },
  {
    "step": 3,
    "title": "Verify Last 4 Digits Visible",
    "desc": "Ensure only the first 8 digits are covered (XXXXXXXX) while your last 4 digits remain legible."
  },
  {
    "step": 4,
    "title": "Preserve QR & Portrait",
    "desc": "Check that your facial photo, demographic address, and UIDAI verification QR code remain unobscured."
  },
  {
    "step": 5,
    "title": "Download Masked Document",
    "desc": "Export your permanent, tamper-proof Masked Aadhaar PDF or JPEG file locked safely under 200 KB."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Reversible PDF Highlighting",
    "title": "Using Marker Tools That Leave Text Underneath",
    "desc": "Using tablet marker pens or digital highlighter shapes creates a transparent overlay that can be copied or removed in Acrobat. Kagazo rasterizes pixels directly, permanently destroying redacted numbers."
  },
  {
    "badge": "Error: Masking the Last 4 Digits",
    "title": "Covering the Wrong Set of Digits",
    "desc": "UIDAI guidelines strictly mandate masking the first 8 digits (e.g., XXXX XXXX 1234). Masking the last 4 digits or middle digits invalidates the card for offline KYC verification."
  },
  {
    "badge": "Error: Obscuring the QR Code",
    "title": "Accidentally Covering UIDAI Secure Barcode",
    "desc": "Government officials and verification apps read the embedded cryptographic QR code to authenticate authenticity. Keep the QR block completely clear."
  },
  {
    "badge": "Error: Sharing Regular Aadhaar with Hotels",
    "title": "Exposing Full 12 Digits to Unauthorized Entities",
    "desc": "Under Section 29 of the Aadhaar Act, private entities cannot demand or store unmasked Aadhaar cards. Storing unmasked copies is punishable by law."
  }
];

const FAQS = [
  {
    "question": "What is a Masked Aadhaar card?",
    "answer": "Masked Aadhaar is an official, legally recognized format where the first 8 digits of your 12-digit Aadhaar number are replaced with \"XXXXXXXX\", displaying only the last 4 digits. It retains your photograph, demographic details, and UIDAI digital QR code."
  },
  {
    "question": "Is Masked Aadhaar legally valid for hotel check-ins and job verification?",
    "answer": "Yes. Under the Ministry of Electronics and Information Technology (MeitY) guidelines, private entities such as hotels, travel agencies, and employers are only permitted to accept and store Masked Aadhaar copies."
  },
  {
    "question": "Is my Aadhaar document uploaded to Kagazo servers?",
    "answer": "Never. Kagazo processes all image and PDF masking 100% locally inside your web browser RAM using client-side HTML5 canvas. Zero Aadhaar numbers, biometric images, or document files are ever uploaded or stored."
  },
  {
    "question": "Can someone remove the black mask from the downloaded file?",
    "answer": "No. Kagazo rasterizes the final output into a unified pixel canvas. The redacted numbers are completely overwritten and physically destroyed in the exported image or PDF, preventing text extraction."
  },
  {
    "question": "Do I need a password to mask my e-Aadhaar PDF?",
    "answer": "If your official e-Aadhaar PDF from UIDAI is password-protected (the first 4 letters of your name in CAPITALS followed by your year of birth YYYY), unlock it using our Unlock PDF tool first or enter the password in the engine."
  },
  {
    "question": "What should be visible on a valid Masked Aadhaar?",
    "answer": "A valid Masked Aadhaar must display: 1) First 8 digits masked (XXXX-XXXX), 2) Last 4 digits visible, 3) Candidate photo, 4) Name, DOB, and Gender, 5) Residential Address, and 6) Intact UIDAI verification QR code."
  },
  {
    "question": "Can banks reject Masked Aadhaar for account opening?",
    "answer": "Under RBI Master Directions on KYC, banks can accept Masked Aadhaar along with offline verification XML or voluntary biometric verification for non-Direct Benefit Transfer (DBT) accounts."
  },
  {
    "question": "What is the penalty for unauthorized storage of unmasked Aadhaar cards?",
    "answer": "Under Section 29 and Section 42 of the Aadhaar Act 2016, unauthorized collection, publishing, or storage of 12-digit Aadhaar numbers carries imprisonment up to three years and substantial financial penalties."
  },
  {
    "question": "Can I download the masked card in a file size under 200 KB?",
    "answer": "Yes. Kagazo automatically compresses the resulting masked document into high-clarity JPEG or PDF format strictly calibrated between 100 KB and 200 KB, perfect for government portal uploads."
  },
  {
    "question": "Does this tool support both front and back sides of physical Aadhaar cards?",
    "answer": "Yes. You can mask single-sided e-Aadhaar letters or upload both front and back cards together to create a unified, masked 1-page A4 verification document."
  }
];

export default function MaskAadhaarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Official Masked Aadhaar Redactor',
        url: 'https://kagazo.in/tools/mask-aadhaar',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Mask your Aadhaar card online free per UIDAI and RBI guidelines. Black out the first 8 digits (XXXXXXXX) while keeping the last 4 digits, photograph, and QR code visible. 100% in-browser RAM privacy, zero cloud storage.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Mask Your Aadhaar Card in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Official Masked Aadhaar Redactor.',
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
            name: 'Official Masked Aadhaar Redactor',
            item: 'https://kagazo.in/tools/mask-aadhaar',
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
          <span className="text-primary font-bold">Official Masked Aadhaar Redactor</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>First 8 Digits XXXXXXXX Redacted • 100% In-RAM Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Official Masked Aadhaar Redactor & </span>
            <span className="text-primary">UIDAI Privacy Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Mask your Aadhaar card online free per UIDAI and RBI guidelines. Black out the first 8 digits (XXXXXXXX) while keeping the last 4 digits, photograph, and QR code visible. 100% in-browser RAM privacy, zero cloud storage.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <AadhaarMaskEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> UIDAI & RBI Mandate
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Compliant with Aadhaar Act Section 29 and RBI KYC master directions for hotel check-ins, employers, and telecom.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> True In-RAM Redaction
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Unlike basic PDF highlighters that can be removed, Kagazo burns permanent opaque black pixels directly into the image canvas.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Dual Export (PDF & JPG)
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download verified masked Aadhaar as an optimized PDF (under 200 KB) or high-resolution JPEG ready for KYC portals.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    UIDAI Aadhaar Card Redaction & Usage Guidelines (2026)
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Statutory Privacy Rule
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Use Case / Sector</th><th className="py-2.5 px-3 font-bold">Permissible Aadhaar Format</th><th className="py-2.5 px-3 font-bold">Legal Authority / Circular</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Hotel Check-In & Travel Bookings</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Masked Aadhaar Only (First 8 Digits Redacted)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Ministry of Electronics & IT (MeitY) Advisory</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Private Employer HR Onboarding</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Masked Aadhaar Only (First 8 Digits Redacted)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">UIDAI Circular on Offline Verification</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Telecom SIM Card Activation</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Masked Aadhaar or Offline e-KYC XML</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">DoT & TRAI Security Directives</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Bank Account KYC Verification</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Masked Aadhaar accepted for non-DBT accounts</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RBI Master Direction - Know Your Customer</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">School / College Admission</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Masked Aadhaar or Date of Birth Certificate</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Supreme Court Aadhaar Judgment (Justice K.S. Puttaswamy)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Mandatory Redaction Elements</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">First 8 digits (XXXXXXXX), keep last 4 digits visible</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Retain photo, address, and secure offline QR code</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Mask Your Aadhaar Card in 5 Steps
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
                  Common Aadhaar Masking Errors & Security Traps
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
                Masking Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">UIDAI Compliant</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    First 8 digits XXXXXXXX permanently redacted.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Last 4 Visible</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Last 4 digits retained for verification.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">True In-RAM</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Rasterized pixel destruction with zero server storage.
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
                      Aadhaar + PAN Single PDF KYC
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    KYC
                  </span>
                </Link>
                <Link
                  href="/tools/self-attest-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Digital Self-Attestation PDF
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Verify
                  </span>
                </Link>
                <Link
                  href="/tools/clean-document-scanner"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Clean Document Scanner
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Scan
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

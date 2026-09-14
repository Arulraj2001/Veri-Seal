import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
  Sliders,
  FileCheck,
  FileText,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { SignPdfEngine } from '@/components/tools/SignPdfEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Sign PDF Online Free (No Sign-up, No Watermarks & 100% Private) | Kagazo',
  description: 'Sign PDF documents online free with zero sign-ups or paywalls. Draw signature, type initials, or upload an ink scan. 100% client-side in-browser RAM privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/sign-pdf',
  },
  openGraph: {
    title: 'Sign PDF Online Free (No Sign-up, No Watermarks & 100% Private) | Kagazo',
    description: 'Sign PDF documents online free with zero sign-ups or paywalls. Draw signature, type initials, or upload an ink scan. 100% client-side in-browser RAM privacy.',
    url: 'https://kagazo.in/tools/sign-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "Information Technology Act (India)",
    "docType": "Commercial Contracts, NDAs & Offers",
    "officialLimit": "Standard Electronic Signature",
    "targetUsed": "Vector Embedded",
    "notes": "Recognized under Section 10A for electronic records and agreements."
  },
  {
    "authority": "Government Recruitment Gateways",
    "docType": "Application Forms & Declarations",
    "officialLimit": "Blue or Black Ink Required",
    "targetUsed": "Ballpoint Blue / Black",
    "notes": "Signatures must match identity cards and bank verification records."
  },
  {
    "authority": "Banking & Financial Services",
    "docType": "Loan Applications & Mandates",
    "officialLimit": "High Legibility Signature",
    "targetUsed": "High-Contrast Ink",
    "notes": "Signature stroke width and curves must match core banking specimens."
  },
  {
    "authority": "University Admissions & Academic",
    "docType": "Honor Codes & Enrollment Forms",
    "officialLimit": "Unwatermarked PDF",
    "targetUsed": "Clean PDF Output",
    "notes": "Must not display third-party SaaS branding or promotional stamps."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload PDF Document",
    "desc": "Drag and drop your PDF form, agreement, or declaration into the signing workspace."
  },
  {
    "step": 2,
    "title": "Create Your Signature",
    "desc": "Draw using your mouse or touchscreen, type your initials, or upload an ink scan."
  },
  {
    "step": 3,
    "title": "Choose Ink & Placement",
    "desc": "Select Blue or Black ink, drag the signature onto the designated signature line."
  },
  {
    "step": 4,
    "title": "Adjust Scale & Rotation",
    "desc": "Scale the signature to fit neatly inside the box without overflowing borders."
  },
  {
    "step": 5,
    "title": "Download Signed PDF",
    "desc": "Click Download to save your signed document instantly with zero watermarks."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Third-Party Watermark Injection",
    "title": "Paid SaaS Tools Defacing Documents",
    "desc": "Commercial tools stamp large promotional watermarks. Kagazo generates 100% clean PDFs."
  },
  {
    "badge": "Error: Blurry Pixelated Signature",
    "title": "Low-Resolution Signature Upload",
    "desc": "Uploading low-res photo crops blurs signatures. Kagazo applies vector edge-smoothing."
  },
  {
    "badge": "Error: Incompatible Color Ink",
    "title": "Using Light Gray or Pencil Ink",
    "desc": "Government portals reject faint signatures. Kagazo enforces rich ballpoint blue and black."
  },
  {
    "badge": "Error: Privacy Leak of Sensitive NDAs",
    "title": "Uploading Confidential Deals to Cloud",
    "desc": "Cloud signers store contracts indefinitely. Kagazo processes 100% in local browser RAM."
  }
];

const FAQS = [
  {
    "question": "Is signing a PDF with Kagazo legally valid?",
    "answer": "Yes. Under the Indian Information Technology Act (2000) and equivalent electronic signature legislation globally (ESIGN Act, eIDAS), electronic signatures on commercial contracts, employment offers, and government application forms are legally binding."
  },
  {
    "question": "Are my signed contracts uploaded to any cloud server?",
    "answer": "Never. Kagazo processes your PDF and signature overlay 100% inside your browser memory (RAM) via client-side WebAssembly and PDF rendering libraries. Zero bytes leave your device."
  },
  {
    "question": "Can I sign using my phone or tablet touchscreen?",
    "answer": "Yes! Kagazo includes full touch and stylus support, allowing you to sign naturally with your finger or Apple Pencil / stylus on smartphones and tablets."
  },
  {
    "question": "Does Kagazo inject any watermark or logo into the signed PDF?",
    "answer": "No. Unlike commercial alternatives that demand expensive subscriptions or stamp promotional logos, Kagazo generates completely clean, unwatermarked documents."
  },
  {
    "question": "Can I add multiple signatures or date stamps on different pages?",
    "answer": "Yes. You can place multiple signature instances, initials, and date annotations across any page of a multi-page PDF before downloading."
  },
  {
    "question": "Can I upload a photo of my physical paper signature?",
    "answer": "Yes! You can take a photo of your handwritten signature on white paper, upload it, and our engine will remove the paper background to leave only pure transparent ink."
  },
  {
    "question": "Which ink color should I use for government applications?",
    "answer": "Official government portals (such as UPSC, SSC, and TNPSC) and banking authorities strictly recommend blue or black ink. Light colors or pencil scans should be avoided."
  },
  {
    "question": "What is the maximum file size I can sign?",
    "answer": "Because processing occurs in your local browser memory, you can sign large multi-page PDF documents up to 50 MB without encountering server upload limits."
  },
  {
    "question": "Can I sign password-protected PDFs?",
    "answer": "You should first unlock the PDF using Kagazo\u2019s free \"Unlock PDF\" tool, then open it in the Sign PDF workspace."
  },
  {
    "question": "Is an account or credit card required to sign documents?",
    "answer": "No. Kagazo is completely free and accessible without any registration, email capture, or payment walls."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Sign PDF Online Free (No Sign-up, No Watermarks & 100% Private) | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/sign-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Sign PDF documents online free with zero sign-ups or paywalls. Draw signature, type initials, or upload an ink scan. 100% client-side in-browser RAM privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Sign a PDF Document in 5 Steps',
        description: 'Complete and sign your PDF documents in seconds:',
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
            name: 'Sign PDF',
            item: 'https://kagazo.in/tools/sign-pdf',
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
          <span className="text-primary font-bold truncate">Sign PDF</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Zero Sign-Up • Zero Paywalls • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Sign PDF Documents </span>
            <span className="text-primary">Online Free & Private</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Draw, type, or stamp your signature onto any PDF contract, application form, or affidavit. Completely free with zero account requirements, zero watermarks, and 100% in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> Legal Ink Stamp & Signature
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SignPdfEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Privacy-First Document Signing
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  In-Browser Vector Signature Placement & Hardening
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Unlike commercial cloud signature providers that lock your signed documents behind paywalls or upload confidential agreements to third-party servers, Kagazo stamps your signature directly into local device memory with zero telemetry.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Mode Signature
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Draw with touch or mouse, type stylized initials, or upload a photo of your paper signature.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Official Ink Colors
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Switch effortlessly between formal Ballpoint Blue, Classic Black, and Notary Red ink.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Contracts, NDAs, and tax forms are processed in volatile memory with zero server storage.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Digital & Electronic Signature Acceptance Standards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official verification rules for signed documents across legal, banking, and government sectors:
                </p>
              </div>

              <div className="overflow-x-auto border border-surface-darker rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface border-b border-surface-darker text-text-main font-bold">
                    <tr>
                      <th className="p-3 sm:p-4">Authority / System</th>
                      <th className="p-3 sm:p-4">Document Type</th>
                      <th className="p-3 sm:p-4">Portal Limit</th>
                      <th className="p-3 sm:p-4">Calibrated Target</th>
                      <th className="p-3 sm:p-4">Processing Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker">
                    {SPEC_ROWS.map((r, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 sm:p-4 font-bold text-primary">{r.authority}</td>
                        <td className="p-3 sm:p-4">{r.docType}</td>
                        <td className="p-3 sm:p-4 font-semibold">{r.officialLimit}</td>
                        <td className="p-3 sm:p-4 font-mono text-emerald-700">{r.targetUsed}</td>
                        <td className="p-3 sm:p-4 text-text-main/80">{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Technical Advisory:</strong> Ensure you use blue or black ink when signing government application forms or legal affidavits to adhere to official scrutiny guidelines.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Sign a PDF Document in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for guaranteed portal compliance:
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
                  Common Document Conversion Errors and How Kagazo Fixes Them
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common conversion mistakes that cause portal upload rejections:
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

            {/* 10 Comprehensive FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Authoritative answers regarding format conversions, document quality, and portal standards:
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-1.5">
                    <h3 className="text-sm font-bold text-text-main flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/75 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar (col-span-3 / col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6">
            <div className="sticky top-28 space-y-6">
              <AdSlot slot="sidebar" />

              <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-main/70">
                  Related Tools
                </h3>
                <div className="flex flex-col gap-2 text-xs">
                  <Link href="/tools/self-attest-pdf" className="text-primary hover:underline font-medium">
                    Self-Attest PDF Tool
                  </Link>
                  <Link href="/tools/unlock-pdf" className="text-primary hover:underline font-medium">
                    Unlock PDF Tool
                  </Link>
                  <Link href="/tools/pdf-compressor" className="text-primary hover:underline font-medium">
                    Master PDF Compressor
                  </Link>
                  <Link href="/tools/merge-marksheets-pdf" className="text-primary hover:underline font-medium">
                    Merge Marksheets PDF
                  </Link>
                  <Link href="/tools/clean-document-scanner" className="text-primary hover:underline font-medium">
                    Clean Document Scanner
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

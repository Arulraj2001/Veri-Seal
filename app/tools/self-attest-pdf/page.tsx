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
import SelfAttestEngine from '@/components/tools/SelfAttestEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Digital Self-Attestation & Date Stamper | Marksheet & Certificate PDF | Kagazo',
  description: 'Add "Self Attested" text, signature, and submission date directly onto marksheet and certificate PDFs online free. 100% in-browser RAM privacy for UPSC, SSC, and TNPSC.',
  alternates: {
    canonical: 'https://kagazo.in/tools/self-attest-pdf',
  },
  openGraph: {
    title: 'Digital Self-Attestation & Date Stamper | Marksheet & Certificate PDF | Kagazo',
    description: 'Add "Self Attested" text, signature, and submission date directly onto marksheet and certificate PDFs online free. 100% in-browser RAM privacy for UPSC, SSC, and TNPSC.',
    url: 'https://kagazo.in/tools/self-attest-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "Union Public Service Commission (UPSC)",
    "docType": "DAF Document Verification",
    "officialLimit": "Self-Attested Mandatory",
    "targetUsed": "Signature + Date Stamp",
    "notes": "Candidate signature must cross over document edge or clear margin."
  },
  {
    "authority": "Staff Selection Commission (SSC)",
    "docType": "DV Stage Qualification Proofs",
    "officialLimit": "Self-Attested Copies Only",
    "targetUsed": "Ballpoint Blue / Black",
    "notes": "Unattested photocopies result in immediate disqualification."
  },
  {
    "authority": "TNPSC & State PSC Boards",
    "docType": "OTR Certificate Uploads",
    "officialLimit": "Clear Self-Attestation",
    "targetUsed": "High-Contrast Ink",
    "notes": "Signature must match OTR profile signature specimen."
  },
  {
    "authority": "Banking & Financial Recruitments",
    "docType": "KYC & Educational Proofs",
    "officialLimit": "Mandatory Self-Declaration",
    "targetUsed": "Legal Proforma",
    "notes": "Date of attestation must be on or before application deadline."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Certificate PDF",
    "desc": "Select your marksheet, degree, community, or identity proof PDF."
  },
  {
    "step": 2,
    "title": "Choose Attestation Proforma",
    "desc": "Select \"Self-Attested\", \"Self-Attested True Copy\", or customize endorsement text."
  },
  {
    "step": 3,
    "title": "Add Signature & Date",
    "desc": "Draw your signature or upload an ink scan; date auto-populates to today."
  },
  {
    "step": 4,
    "title": "Position on Margin",
    "desc": "Drag and position the endorsement stamp onto an empty margin or bottom corner."
  },
  {
    "step": 5,
    "title": "Download Verified PDF",
    "desc": "Download your attested PDF ready for immediate submission to recruitment portals."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Missing Attestation Date",
    "title": "Signature Without Date Stamp",
    "desc": "Commissions require the date of signing. Kagazo auto-injects current date stamps."
  },
  {
    "badge": "Error: Obscuring Marksheet Serial Number",
    "title": "Attestation Covering Document Text",
    "desc": "Placing signatures over text triggers rejection. Kagazo allows precise placement."
  },
  {
    "badge": "Error: Unattested Photocopies Uploaded",
    "title": "Disqualification at Document Scrutiny",
    "desc": "Plain scans without signatures are rejected. Kagazo ensures complete compliance."
  },
  {
    "badge": "Error: Inconsistent Signature Styles",
    "title": "Mismatched Attestation Signatures",
    "desc": "Signatures must match your application profile. Kagazo saves your verified signature."
  }
];

const FAQS = [
  {
    "question": "What does \"Self-Attestation\" mean on government application documents?",
    "answer": "Self-attestation is a legal process where an applicant signs and dates a photocopy of their educational marksheet or certificate, certifying that the copy is a true and authentic representation of the original document."
  },
  {
    "question": "Is digital self-attestation accepted by UPSC, SSC, and TNPSC?",
    "answer": "Yes. When uploading documents online, recruitment commissions accept digitally signed or electronically stamped \"Self-Attested\" endorsements containing your signature, text endorsement, and application date."
  },
  {
    "question": "Where should I place the self-attestation stamp on my marksheet?",
    "answer": "Place the endorsement in an open white space, preferably near the bottom margin or corner of the document, ensuring that no marks, serial numbers, or official seals are covered."
  },
  {
    "question": "Can I self-attest both pages of a two-sided marksheet?",
    "answer": "Yes. You can place an attestation stamp on each page of your multi-page document before downloading the complete PDF."
  },
  {
    "question": "Are my academic records and signature uploaded to any server?",
    "answer": "Never. All attestation operations execute 100% locally in your device browser RAM via WebAssembly. Zero files or signatures are transmitted across the internet."
  },
  {
    "question": "Which ink color should I use for self-attestation?",
    "answer": "Official recruitment commissions recommend blue or black ink to ensure high contrast and legibility during scrutiny."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the attested document?",
    "answer": "No. Every PDF generated by Kagazo is 100% clean and free of watermarks or promotional branding."
  },
  {
    "question": "Can I self-attest documents on my mobile phone?",
    "answer": "Yes. The tool features full touch support, allowing you to sign with your finger or stylus directly on iOS and Android smartphones."
  },
  {
    "question": "Can I customize the attestation text?",
    "answer": "Yes! You can choose standard presets like \"Self-Attested\" or type custom text such as \"True Copy submitted for TNPSC Group 4\"."
  },
  {
    "question": "What should I do if my attested document exceeds 200 KB?",
    "answer": "After self-attesting, use Kagazo\u2019s \"Compress PDF to 200KB\" tool to bring the file within portal upload limits while maintaining total signature clarity."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Digital Self-Attestation & Date Stamper | Marksheet & Certificate PDF | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/self-attest-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Add "Self Attested" text, signature, and submission date directly onto marksheet and certificate PDFs online free. 100% in-browser RAM privacy for UPSC, SSC, and TNPSC.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Self-Attest a PDF in 5 Steps',
        description: 'Complete your certificate self-attestation in 5 simple steps:',
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
            name: 'Self-Attest PDF',
            item: 'https://kagazo.in/tools/self-attest-pdf',
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
          <span className="text-primary font-bold truncate">Self-Attest PDF</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official Self-Attestation & Date Stamp Utility • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Digital Self-Attestation & </span>
            <span className="text-primary">Date Stamper for PDF</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Apply official "Self-Attested" endorsements, your signature, and today's application date onto educational marksheets, community proofs, and ID certificates. 100% private in-browser.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> Government Scrutiny Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <SelfAttestEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official Attestation Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Authentic Ink Rendering with Automatic Date Synchronization
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Government recruitment portals mandate self-attestation with handwritten signature and submission date on all supporting certificates. Kagazo stamps authentic vector signatures with official legal wording.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Official Proforma Standards
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Preset endorsements: "Self-Attested", "True Copy", and "Verified Original".
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Date Synchronization
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically stamps current application date in official DD/MM/YYYY format.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Certificates and signatures are processed in volatile RAM with zero server storage.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Self-Attestation Requirements Across Government Commissions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official scrutiny rules for certificate attestation:
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
                  <strong>Technical Advisory:</strong> Application scrutiny committees will cancel your candidature if uploaded certificates lack the mandatory "Self-Attested" endorsement, signature, and date.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Self-Attest a PDF in 5 Steps
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
                  <Link href="/tools/sign-pdf" className="text-primary hover:underline font-medium">
                    Sign PDF Tool
                  </Link>
                  <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 200KB
                  </Link>
                  <Link href="/tools/tnpsc-pdf-compressor" className="text-primary hover:underline font-medium">
                    TNPSC PDF Compressor
                  </Link>
                  <Link href="/tools/merge-marksheets-pdf" className="text-primary hover:underline font-medium">
                    Merge Marksheets PDF
                  </Link>
                  <Link href="/tools/pdf-compressor" className="text-primary hover:underline font-medium">
                    Master PDF Compressor
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

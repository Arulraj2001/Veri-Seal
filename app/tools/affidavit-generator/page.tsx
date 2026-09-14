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
} from 'lucide-react';
import AffidavitGeneratorEngine from '@/components/tools/AffidavitGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Bilingual Affidavit & Self-Declaration Generator Online (English & Tamil) | Kagazo',
  description: 'Generate sworn legal affidavits for Name Correction, DOB Discrepancy, Education Gap Year, and Lost Marksheets. Formatted with 3.5-inch e-Stamp margins for Rs 20, 50, and 100 Non-Judicial stamp papers. 100% private in-RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/affidavit-generator',
  },
  openGraph: {
    title: 'Bilingual Affidavit & Self-Declaration Generator Online (English & Tamil) | Kagazo',
    description: 'Generate sworn legal affidavits for Name Correction, DOB Discrepancy, Education Gap Year, and Lost Marksheets. Formatted with 3.5-inch e-Stamp margins for Rs 20, 50, and 100 Non-Judicial stamp papers. 100% private in-RAM.',
    url: 'https://kagazo.in/tools/affidavit-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bilingual Affidavit & Self-Declaration Generator Online (English & Tamil) | Kagazo',
    description: 'Generate sworn legal affidavits for Name Correction, DOB Discrepancy, Education Gap Year, and Lost Marksheets. Formatted with 3.5-inch e-Stamp margins for Rs 20, 50, and 100 Non-Judicial stamp papers. 100% private in-RAM.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Legal Purpose",
    "desc": "Choose from Name Correction, DOB Discrepancy, Education Gap Year, Lost Documents, or Custom Declaration."
  },
  {
    "step": 2,
    "title": "Choose Drafting Language",
    "desc": "Select English or Tamil with standardized statutory swearing clauses recognized by Indian courts."
  },
  {
    "step": 3,
    "title": "Fill Deponent Information",
    "desc": "Enter full legal name, parent/spouse name, age, residential address, and Aadhaar/voter ID numbers."
  },
  {
    "step": 4,
    "title": "Enable e-Stamp Margin",
    "desc": "Toggle 3.5-inch top margin mode if printing directly onto physical Non-Judicial e-Stamp certificate sheets."
  },
  {
    "step": 5,
    "title": "Print or Download PDF",
    "desc": "Print directly to your connected printer or download a clean A4 PDF for Notary Public signature and seal."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Printing Over Stamp Header",
    "title": "Text Colliding With e-Stamp Barcode",
    "desc": "Standard Word processors print near the top margin, overwriting the e-Stamp certificate QR code. Kagazo locks a 3.5-inch top margin to start text cleanly below the government header."
  },
  {
    "badge": "Error: Missing Verification Clause",
    "title": "Omitting Deponent Sworn Verification",
    "desc": "Courts and passport offices reject affidavits lacking a formal Verification clause. Kagazo automatically embeds the mandatory closing oath with place and date."
  },
  {
    "badge": "Error: Name Discrepancy in Body",
    "title": "Inconsistent Spelling Across Paragraphs",
    "desc": "Mismatched spelling between the deponent introduction and document body invalidates the filing. Kagazo harmonizes all variable references throughout the template."
  },
  {
    "badge": "Error: Incorrect Printer Page Scaling",
    "title": "Fit to Printable Area Shrinking Margins",
    "desc": "Selecting Fit to Page in printer dialogs shrinks the 3.5-inch header to under 3 inches. Always set Printer Scale to 100% (Actual Size)."
  }
];

const FAQS = [
  {
    "question": "Can I print this affidavit directly onto physical Non-Judicial stamp paper?",
    "answer": "Yes. By enabling the e-Stamp Paper Margin toggle, Kagazo inserts an exact 3.5-inch (89 mm) blank top clearance. You can feed your physical Rs 20, Rs 50, or Rs 100 e-Stamp sheet into your printer tray and print cleanly below the barcode."
  },
  {
    "question": "Who needs to attest or sign the affidavit after printing?",
    "answer": "Depending on the receiving authority (Passport Office, University, Bank, or Court), the printed affidavit must be signed by the deponent in the presence of an authorized Notary Public, Oath Commissioner, or First Class Magistrate."
  },
  {
    "question": "Are bilingual Tamil-English affidavits valid in Tamil Nadu government offices?",
    "answer": "Yes. In Tamil Nadu government departments, Taluk offices, and state universities, bilingual affidavits drafted in English and Tamil (\u0ba4\u0bae\u0bbf\u0bb4\u0bcd) are widely accepted and facilitate faster local verification."
  },
  {
    "question": "What stamp paper denomination is required for an education gap affidavit?",
    "answer": "Most Indian universities, colleges, and visa consulates require an education gap affidavit on a Rs 20 or Rs 50 Non-Judicial stamp paper attested by a Notary Public."
  },
  {
    "question": "Is my confidential legal information saved or logged on your servers?",
    "answer": "No. Kagazo operates with a zero-server privacy architecture. All legal text, deponent identification details, and sworn statements are processed in volatile browser RAM and wiped upon closing the tab."
  },
  {
    "question": "Can I edit the generated legal text before printing?",
    "answer": "Yes. The interactive drafting engine allows you to edit, add, or customize specific factual paragraphs and evidentiary exhibits prior to generating your final document."
  },
  {
    "question": "What is the difference between an affidavit and a self-declaration?",
    "answer": "An affidavit is a sworn statement made under oath on stamp paper and attested by a Notary/Magistrate. A self-declaration is signed solely by the individual without requiring notary attestation, accepted by many modern digital portals."
  },
  {
    "question": "What should I do if my text exceeds one page on stamp paper?",
    "answer": "The first page prints on the Non-Judicial stamp paper with the 3.5-inch margin. Subsequent pages automatically print on standard plain A4 sheets with regular 1-inch margins, which the Notary signs and staples together."
  },
  {
    "question": "Does this generator support Name Change Gazette application affidavits?",
    "answer": "Yes. The Name Correction preset includes the standard statutory clauses required by Central and State Gazette Directorates declaring old name, new name, and bona fide intent."
  },
  {
    "question": "What printer settings ensure the 3.5-inch margin does not shift?",
    "answer": "In your browser print dialog, select Paper Size: A4, Margins: None (or Minimum), and Scale: 100% (Actual Size). This ensures exact physical alignment with the government e-Stamp certificate."
  }
];

export default function AffidavitGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Bilingual Legal Affidavit Generator',
        url: 'https://kagazo.in/tools/affidavit-generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate sworn legal affidavits for Name Correction, DOB Discrepancy, Education Gap Year, and Lost Marksheets. Formatted with 3.5-inch e-Stamp margins for Rs 20, 50, and 100 Non-Judicial stamp papers. 100% private in-RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Draft and Print an Affidavit in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Bilingual Legal Affidavit Generator.',
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
            name: 'Bilingual Legal Affidavit Generator',
            item: 'https://kagazo.in/tools/affidavit-generator',
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
          <span className="text-primary font-bold">Bilingual Legal Affidavit Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>e-Stamp Paper Margins (3.5") • English + தமிழ்</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Bilingual Legal Affidavit & </span>
            <span className="text-primary">Self-Declaration Generator</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate sworn legal affidavits for Name Correction, DOB Discrepancy, Education Gap Year, and Lost Marksheets. Formatted with 3.5-inch e-Stamp margins for Rs 20, 50, and 100 Non-Judicial stamp papers. 100% private in-RAM.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <AffidavitGeneratorEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Bilingual Formats
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Draft official affidavits in formal legal English or Tamil (தமிழ்) with accurate statutory declaration clauses.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 3.5-Inch e-Stamp Gap
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Auto-calibrated top margin leaves exact clearance for Government of India Non-Judicial e-Stamp certificates.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Zero Server Storage
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Your sworn statements, Aadhaar details, and deponent facts remain strictly inside client-side browser RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Indian Non-Judicial Stamp Paper & Notary Rules Reference
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Statutory Precedent
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Affidavit Purpose</th><th className="py-2.5 px-3 font-bold">Recommended Stamp Value</th><th className="py-2.5 px-3 font-bold">Attesting Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Name Correction / Alias Declaration</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 20 / Rs 50 Non-Judicial e-Stamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Notary Public or First Class Magistrate</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Date of Birth (DOB) Discrepancy</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 50 / Rs 100 Non-Judicial e-Stamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Notary Public with supporting birth proof</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Education / Employment Gap Year</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 20 / Rs 50 Non-Judicial e-Stamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Notary Public or Oath Commissioner</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Lost Marksheet / Degree Certificate</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 50 / Rs 100 Non-Judicial e-Stamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Notary Public + Police NCR / CSR Acknowledgement</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Address / Residence Self-Declaration</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Plain Paper / Rs 20 Stamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Self-Attestation / Notary (as required by portal)</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Marriage Registration Declaration</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rs 100 Non-Judicial e-Stamp</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Sub-Registrar / Notary Public with 2 witnesses</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Draft and Print an Affidavit in 5 Steps
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
                  Common Affidavit Drafting Errors & Technical Solutions
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
                Legal Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Stamp Clearance</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Exact 3.5-inch top margin for Non-Judicial e-Stamp.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Bilingual Syntax</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Statutory verification clauses in English & Tamil.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">RAM Confidentiality</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Zero server logging of legal or identity data.
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
                  href="/tools/pstm-certificate-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PSTM Certificate Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Govt
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
                All calculations and document drafting occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

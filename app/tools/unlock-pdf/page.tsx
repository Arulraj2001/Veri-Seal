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
import { PdfUnlockEngine } from '@/components/tools/PdfUnlockEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Unlock e-Aadhaar PDF Online Free | Remove Password from PDF | Kagazo',
  description: 'Remove password from e-Aadhaar, bank statements, and salary slips online free. Decrypt password-protected PDFs with known password in client-side RAM. 100% private, zero uploads.',
  alternates: {
    canonical: 'https://kagazo.in/tools/unlock-pdf',
  },
  openGraph: {
    title: 'Unlock e-Aadhaar PDF Online Free | Remove Password from PDF | Kagazo',
    description: 'Remove password from e-Aadhaar, bank statements, and salary slips online free. Decrypt password-protected PDFs with known password in client-side RAM. 100% private, zero uploads.',
    url: 'https://kagazo.in/tools/unlock-pdf',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "UIDAI e-Aadhaar Format",
    "docType": "National Identity Proof",
    "officialLimit": "Protected (Default 8-Char Password)",
    "targetUsed": "Unprotected Standard PDF",
    "notes": "Portals reject password-locked e-Aadhaar with automated parser errors."
  },
  {
    "authority": "Central & State Recruitment (UPSC/SSC)",
    "docType": "Identity & Age Proof Attachments",
    "officialLimit": "Unencrypted PDF Required",
    "targetUsed": "Clean Unencrypted PDF",
    "notes": "Must open immediately without password prompts during scrutiny."
  },
  {
    "authority": "Banking & Loan Portals",
    "docType": "Bank Account Statements & Payslips",
    "officialLimit": "Password-Free Documents Only",
    "targetUsed": "Decrypted Financial PDF",
    "notes": "Automated underwriting algorithms cannot process password-locked statements."
  },
  {
    "authority": "Passport Seva & Visa Consulates",
    "docType": "Address Proof & Financial Affidavits",
    "officialLimit": "Printable & Copy-Enabled",
    "targetUsed": "Fully Unlocked PDF",
    "notes": "Consular officers require unrestricted documents for verification."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Protected PDF",
    "desc": "Drag and drop your password-locked e-Aadhaar, bank statement, or salary slip."
  },
  {
    "step": 2,
    "title": "Enter Known Password",
    "desc": "For e-Aadhaar, enter the first 4 letters of your name in CAPS + your 4-digit birth year."
  },
  {
    "step": 3,
    "title": "In-Memory Decryption",
    "desc": "Click Unlock. The cryptographic engine decrypts PDF streams in browser RAM."
  },
  {
    "step": 4,
    "title": "Verify Document Preview",
    "desc": "Preview your unlocked document using the integrated high-resolution viewer."
  },
  {
    "step": 5,
    "title": "Download Unprotected PDF",
    "desc": "Download your unlocked PDF ready for direct upload to UPSC, SSC, or visa portals."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Application Rejected by Portal Parser",
    "title": "Uploading Password-Locked e-Aadhaar",
    "desc": "Portals show \"Corrupt File\" on locked PDFs. Unlocking beforehand guarantees smooth processing."
  },
  {
    "badge": "Error: Incorrect Aadhaar Password Format",
    "title": "Case Sensitivity in e-Aadhaar Passwords",
    "desc": "Name letters must be UPPERCASE (e.g., ARUN1995). Small letters trigger decryption errors."
  },
  {
    "badge": "Error: Privacy Exposure on Cloud Crackers",
    "title": "Sending Financial Records to Cloud Tools",
    "desc": "Online unlocking tools store bank statements. Kagazo runs 100% in local browser memory."
  },
  {
    "badge": "Error: Printing Disabled on Document",
    "title": "Owner Restrictions Preventing Printouts",
    "desc": "Some PDFs restrict printing. Kagazo strips all owner restrictions automatically."
  }
];

const FAQS = [
  {
    "question": "What is the standard password format for e-Aadhaar PDFs?",
    "answer": "The official UIDAI e-Aadhaar password consists of 8 characters: the first 4 letters of your name as mentioned in Aadhaar in CAPITAL letters, followed by your 4-digit year of birth (YYYY). For example, if your name is SURESH and birth year is 1990, the password is SURE1990."
  },
  {
    "question": "Why do government portals reject password-protected PDFs?",
    "answer": "Recruitment portals (like UPSC, SSC, and TNPSC) and admission systems use automated batch processors that cannot interactively prompt for passwords. Any password-protected document is flagged as corrupt or unreadable, leading to application rejection."
  },
  {
    "question": "Does this tool crack or bypass passwords without knowing the password?",
    "answer": "No. This tool requires the authorized password to perform valid cryptographic decryption. It is designed for legitimate document owners to permanently remove known passwords."
  },
  {
    "question": "Is my sensitive identity and banking data safe?",
    "answer": "100% secure. Decryption occurs entirely inside your local browser memory buffer using WebAssembly cryptography. Your password and PDF are never transmitted over the internet or logged anywhere."
  },
  {
    "question": "Will the unlocked PDF require a password when opened on other computers?",
    "answer": "No. Once unlocked and saved, the new PDF is completely unencrypted and will open immediately on any device, browser, or government portal without prompting for a password."
  },
  {
    "question": "Can I unlock bank account statements and salary slips?",
    "answer": "Yes. You can unlock password-protected statements from all major banks (SBI, HDFC, ICICI, Axis, PNB) and employer payslip PDFs."
  },
  {
    "question": "Does unlocking damage the digital signature or QR code on e-Aadhaar?",
    "answer": "No. All vector text, high-resolution QR codes, photograph elements, and UIDAI security marks remain 100% intact and legible."
  },
  {
    "question": "Does Kagazo add any watermark or brand logo to the unlocked PDF?",
    "answer": "Never. The unlocked PDF is an exact duplicate of the original document, completely free of watermarks or modifications."
  },
  {
    "question": "Can I unlock PDFs directly on an iPhone or Android phone?",
    "answer": "Yes. Kagazo works seamlessly on mobile browsers including Safari and Chrome without requiring any mobile app."
  },
  {
    "question": "What should I do after unlocking my e-Aadhaar?",
    "answer": "Once unlocked, you can compress it to under 200 KB or 300 KB using our dedicated PDF Compressor tools to ensure it complies with recruitment portal file size caps."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Unlock e-Aadhaar PDF Online Free | Remove Password from PDF | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/unlock-pdf',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Remove password from e-Aadhaar, bank statements, and salary slips online free. Decrypt password-protected PDFs with known password in client-side RAM. 100% private, zero uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Unlock e-Aadhaar PDF in 5 Steps',
        description: 'Remove passwords from protected documents in seconds:',
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
            name: 'Unlock e-Aadhaar PDF',
            item: 'https://kagazo.in/tools/unlock-pdf',
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
          <span className="text-primary font-bold truncate">Unlock e-Aadhaar PDF</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Client-Side PDF Decryption • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Unlock e-Aadhaar PDF & </span>
            <span className="text-primary">Remove Password Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Permanently remove passwords from e-Aadhaar PDFs, bank statements, and salary slips using your known password. Generates an unencrypted, print-ready PDF accepted by government portals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> e-Aadhaar & Bank Statement Ready
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PdfUnlockEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Client-Side Decryption Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  In-Memory Standard PDF Decryption Without Cloud Transmission
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Recruitment and visa portals automatically reject password-protected e-Aadhaar and bank statement PDFs. Kagazo decrypts the document in client-side RAM using your known password and saves a clean, unprotected PDF.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Permanent Password Removal
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Removes open passwords permanently so files open without prompts on government portals.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Server Exposure
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Decryption happens locally in WebAssembly; your password and file never touch external servers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Print & Export Enablement
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Removes owner restrictions, enabling printing, text extraction, and form copying.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Government Portal Restrictions on Password-Protected PDFs
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Portal submission criteria for identity and financial documents:
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
                  <strong>Technical Advisory:</strong> Government portals will instantly reject your application if you upload an e-Aadhaar or bank statement that prompts for a password.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Unlock e-Aadhaar PDF in 5 Steps
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
                  <Link href="/tools/pdf-to-image" className="text-primary hover:underline font-medium">
                    PDF to Image Converter
                  </Link>
                  <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 200KB
                  </Link>
                  <Link href="/tools/sign-pdf" className="text-primary hover:underline font-medium">
                    Sign PDF Tool
                  </Link>
                  <Link href="/tools/self-attest-pdf" className="text-primary hover:underline font-medium">
                    Self-Attest PDF Tool
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

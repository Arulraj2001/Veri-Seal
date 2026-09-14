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
import TnEsevaiCertificateEngine from '@/components/tools/TnEsevaiCertificateEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | Community & Nativity | Kagazo',
  description: 'Optimize Tamil Nadu e-Sevai revenue certificates (Community, Nativity, Income, First Graduate) strictly under 200KB online free. Preserves QR code and digital signatures.',
  alternates: {
    canonical: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
  },
  openGraph: {
    title: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | Community & Nativity | Kagazo',
    description: 'Optimize Tamil Nadu e-Sevai revenue certificates (Community, Nativity, Income, First Graduate) strictly under 200KB online free. Preserves QR code and digital signatures.',
    url: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "TNPSC Recruitment Gateways",
    "docType": "Community Certificate (BC/MBC/SC/ST)",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Strict enforcement: QR barcode and Tehsildar digital seal must scan."
  },
  {
    "authority": "TNEA Engineering Counseling",
    "docType": "First Graduate & Income Certificates",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "185 KB",
    "notes": "Required for tuition fee concessions; certificate number must be sharp."
  },
  {
    "authority": "TN Medical Selection",
    "docType": "Nativity & Community Proofs",
    "officialLimit": "100 KB to 300 KB",
    "targetUsed": "220 KB",
    "notes": "Validates 85% state quota eligibility; scrutinizes digital signature."
  },
  {
    "authority": "State Welfare & Scholarship Gateways",
    "docType": "Revenue Department Certificates",
    "officialLimit": "Under 200 KB",
    "targetUsed": "175 KB",
    "notes": "High legibility on small serial numbers and issuing taluk details."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload e-Sevai Certificate",
    "desc": "Select your downloaded e-District Community, Nativity, or Income certificate PDF."
  },
  {
    "step": 2,
    "title": "Select TN Portal Preset",
    "desc": "The engine automatically activates the 100KB\u2013200KB safe target bracket."
  },
  {
    "step": 3,
    "title": "Inspect QR & Signature Block",
    "desc": "Preview the certificate to confirm digital signatures and barcodes are intact."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Optimization",
    "desc": "Click Optimize. Vector elements and barcodes are preserved while paper size shrinks."
  },
  {
    "step": 5,
    "title": "Download Verified PDF",
    "desc": "Download your optimized certificate ready for immediate upload to TNEA or TNPSC."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Broken Unscannable QR Code",
    "title": "Lossy Compression Corrupting Barcodes",
    "desc": "Generic compressors blur 2D QR modules. Kagazo applies lossless vector preservation."
  },
  {
    "badge": "Error: Faint Tehsildar Digital Signature",
    "title": "Loss of Cryptographic Verification Stamp",
    "desc": "Over-compression washes out digital signature blocks. Kagazo maintains high contrast."
  },
  {
    "badge": "Error: File Exceeding 200 KB Ceiling",
    "title": "Upload Blocked on TNPSC Portal",
    "desc": "High-resolution scanner outputs average 800 KB. Kagazo brings them safely under 200 KB."
  },
  {
    "badge": "Error: Under-100 KB Minimum Rejection",
    "title": "Portal Scrutiny Committee Low-Res Warning",
    "desc": "Files under 100 KB fail state scrutiny rules. Kagazo maintains density above 100 KB."
  }
];

const FAQS = [
  {
    "question": "Why do TNPSC and TNEA require e-Sevai certificates under 200 KB?",
    "answer": "Tamil Nadu portals enforce a 200 KB ceiling to maintain fast server response times across millions of applicants, while requiring a 100 KB minimum floor to guarantee that Tehsildar signatures and QR codes remain fully verifiable."
  },
  {
    "question": "Will my community certificate QR code still scan after compression?",
    "answer": "Yes! Kagazo isolates high-frequency 2D barcode modules and protects them from lossy compression, ensuring the QR code scans instantly with mobile cameras and scrutiny scanners."
  },
  {
    "question": "Which Tamil Nadu revenue certificates can I optimize with this tool?",
    "answer": "You can optimize all certificates issued via the Tamil Nadu e-District / e-Sevai portal, including Community, Nativity, Income, First Graduate, Deserted Woman, and Legal Heir certificates."
  },
  {
    "question": "Can I optimize digitally signed certificates without corrupting the signature?",
    "answer": "Yes. Kagazo optimizes document image streams without modifying the underlying Adobe PKCS#7 digital signature dictionaries."
  },
  {
    "question": "Are my personal revenue records uploaded to any server?",
    "answer": "Never. Processing executes 100% locally in your device browser RAM via WebAssembly. Zero certificates, caste records, or income data are ever transmitted across the internet."
  },
  {
    "question": "Does Kagazo add any watermark or logo to my e-Sevai certificate?",
    "answer": "No. Every PDF generated by Kagazo is 100% clean and free of watermarks or promotional branding."
  },
  {
    "question": "Can I optimize certificates directly on my mobile phone?",
    "answer": "Yes. Kagazo runs smoothly on Android and iOS mobile browsers without requiring any app download."
  },
  {
    "question": "What should I do if my downloaded e-District PDF is 1.5 MB?",
    "answer": "Upload the file directly into Kagazo. Our engine downsamples the scan to 150\u2013200 DPI, bringing it safely into the 100\u2013200 KB band in seconds."
  },
  {
    "question": "Does this tool work for TNPSC Group 1, Group 2, Group 4, and VAO applications?",
    "answer": "Yes. All TNPSC recruitment examinations and OTR profile document updates follow this exact specification."
  },
  {
    "question": "Is this tool completely free to use?",
    "answer": "Yes. Kagazo is 100% free with no registration, subscriptions, or hidden charges."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB) | Community & Nativity | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Optimize Tamil Nadu e-Sevai revenue certificates (Community, Nativity, Income, First Graduate) strictly under 200KB online free. Preserves QR code and digital signatures.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Optimize TN e-Sevai Certificates in 5 Steps',
        description: 'Prepare your Tamil Nadu revenue certificates for state portal upload:',
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
            name: 'TN eSevai Certificate Prep',
            item: 'https://kagazo.in/tools/tn-esevai-certificate-prep',
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
          <span className="text-primary font-bold truncate">TN eSevai Certificate Prep</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Tamil Nadu e-District / e-Sevai Standard • 100 KB to 200 KB • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>TN e-Sevai Certificate </span>
            <span className="text-primary">PDF Optimizer (Under 200KB)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Compress Tamil Nadu e-Sevai and e-District revenue certificates strictly under 200KB. Guarantees 100% scannability of verification QR codes and Tehsildar digital signatures with in-browser RAM privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> QR & Digital Signature Safe
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <TnEsevaiCertificateEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tamil Nadu e-District Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Preserving 2D QR Verification Codes & Digital Signatures
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Tamil Nadu e-Sevai certificates contain 2D QR codes and cryptographic digital signatures issued by Revenue Department Tehsildars. Kagazo preserves barcode edges while compressing background paper noise.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> QR Scannability Guard
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    High-contrast edge preservation ensures verification QR codes scan on mobile cameras.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100KB–200KB Portal Target
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Calibrated safe zone ensures instant acceptance on TNEA and TNPSC application gateways.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Confidential caste, nativity, and income details never leave your device memory.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Tamil Nadu e-Sevai Revenue Certificate Upload Standards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official scrutiny parameters across state education and employment portals:
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
                  <strong>Technical Advisory:</strong> Recruitment and admission portals reject e-District certificates if compression blurs the verification QR code or digital signature block.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Optimize TN e-Sevai Certificates in 5 Steps
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
                  <Link href="/tools/tn-marksheet-compressor" className="text-primary hover:underline font-medium">
                    TN Marksheet Compressor
                  </Link>
                  <Link href="/tools/tnpsc-pdf-compressor" className="text-primary hover:underline font-medium">
                    TNPSC PDF Compressor
                  </Link>
                  <Link href="/tools/compress-pdf-to-200kb" className="text-primary hover:underline font-medium">
                    Compress PDF to 200KB
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

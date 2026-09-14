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
import { ImageToPdfEngine } from '@/components/tools/ImageToPdfEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Image to PDF Converter under 200KB Free | Exact Size Guarantee | Kagazo',
  description: 'Convert marksheet photos, certificates, and ID cards directly to PDF strictly under 200 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting.',
  alternates: {
    canonical: 'https://kagazo.in/tools/image-to-pdf-200kb',
  },
  openGraph: {
    title: 'Image to PDF Converter under 200KB Free | Exact Size Guarantee | Kagazo',
    description: 'Convert marksheet photos, certificates, and ID cards directly to PDF strictly under 200 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting.',
    url: 'https://kagazo.in/tools/image-to-pdf-200kb',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "TNPSC OTR Portal",
    "docType": "SSLC / HSC Marksheet Photo to PDF",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Strict enforcement: Both sides of marksheet must fit under 200 KB."
  },
  {
    "authority": "SSC CGL / CHSL",
    "docType": "Educational Qualification Proofs",
    "officialLimit": "50 KB to 200 KB",
    "targetUsed": "175 KB",
    "notes": "Roll numbers and university controller signatures must be sharp."
  },
  {
    "authority": "State PSC Recruitment",
    "docType": "Community & Domicile Proofs",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "180 KB",
    "notes": "Official round seal and dispatch numbers must remain legible."
  },
  {
    "authority": "TNEA Engineering",
    "docType": "10th & 12th Standard Certificate Photos",
    "officialLimit": "100 KB to 200 KB",
    "targetUsed": "185 KB",
    "notes": "Requires clean white background without cast phone shadows."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Marksheet Photos",
    "desc": "Select one or more JPG, PNG, or HEIC photos of your marksheet or certificate."
  },
  {
    "step": 2,
    "title": "Choose Enhancement Mode",
    "desc": "Select Color, Grayscale, or Xerox Ink Boost to enhance contrast and eliminate shadows."
  },
  {
    "step": 3,
    "title": "Set A4 Page Dimensions",
    "desc": "The engine automatically centers each image onto an A4 page with standard margins."
  },
  {
    "step": 4,
    "title": "Target 200 KB Locked",
    "desc": "Our engine compresses the image stream using Lanczos resampling to land under 200 KB."
  },
  {
    "step": 5,
    "title": "Inspect & Download",
    "desc": "Preview the output PDF with our high-resolution zoom loupe and download in 1 click."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: 201 KB File Size Rejection",
    "title": "Exceeding 200 KB Threshold",
    "desc": "Generic photo converters produce 300KB+ files. Kagazo enforces a strict 180 KB target."
  },
  {
    "badge": "Error: Phone Shadow Obscuring Text",
    "title": "Dark Mobile Camera Silhouette",
    "desc": "Overhead phone shadows trigger scrutiny rejection. Kagazo removes uneven illumination."
  },
  {
    "badge": "Error: Blurry Marksheet Roll Number",
    "title": "Aggressive Compression Artifacts",
    "desc": "Crude JPEG compression pixelates numbers. Kagazo isolates text edges for crisp rendering."
  },
  {
    "badge": "Error: Front & Back Mismatched Scales",
    "title": "Unequal Aspect Ratios on Dual Sides",
    "desc": "Taking photos at different distances creates awkward pages. Kagazo standardizes both to A4."
  }
];

const FAQS = [
  {
    "question": "How do I convert a marksheet photo directly to a PDF under 200 KB?",
    "answer": "Drag and drop your smartphone photo or scanned certificate into Kagazo. Our engine automatically crops borders, enhances ink contrast, and compresses the output PDF strictly under 200 KB in a single pass."
  },
  {
    "question": "Can I combine Front and Back pages of a marksheet into one 200 KB PDF?",
    "answer": "Yes! Upload multiple images (e.g. Front and Back of your degree certificate). Kagazo compiles them into a multi-page A4 PDF while ensuring the total file size remains strictly under 200 KB."
  },
  {
    "question": "Why do recruitment portals mandate PDF format under 200 KB?",
    "answer": "Government servers (such as TNPSC, UPSC, and SSC) enforce a 200 KB ceiling to save database storage across millions of applicants while ensuring certificate text and seals remain legible."
  },
  {
    "question": "Will my marksheet text become blurry after compression?",
    "answer": "No. Our engine uses Lanczos downsampling and selective quantization that preserves high-frequency text edges and official seals, avoiding blurry artifacts."
  },
  {
    "question": "Are my uploaded certificates saved on your servers?",
    "answer": "No. Kagazo operates entirely in system memory (RAM). Your certificates, marksheets, and ID proofs are never written to permanent disk storage, ensuring 100% privacy."
  },
  {
    "question": "What image formats can I upload for conversion?",
    "answer": "You can upload JPG, JPEG, PNG, WEBP, and Apple HEIC photos taken with any smartphone or digital camera."
  },
  {
    "question": "Does Kagazo add any watermark or logo to the generated PDF?",
    "answer": "Never. The converted PDF is 100% clean and free of watermarks, logos, or author branding."
  },
  {
    "question": "How does the Xerox Ink Boost filter work?",
    "answer": "The Xerox Ink Boost filter increases contrast between printed ink and paper, whitening yellowed background paper and deepening text characters for maximum readability."
  },
  {
    "question": "Can I reorder pages if I upload multiple photos?",
    "answer": "Yes. You can drag and rearrange pages before generating the final PDF to ensure your front and back sheets appear in the correct sequence."
  },
  {
    "question": "Does this tool work on mobile phones without installing an app?",
    "answer": "Yes. Kagazo is fully responsive and runs in Chrome, Safari, and Firefox directly on iOS and Android smartphones."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Image to PDF Converter under 200KB Free | Exact Size Guarantee | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/image-to-pdf-200kb',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Convert marksheet photos, certificates, and ID cards directly to PDF strictly under 200 KB online free. 1-click in-memory conversion with Xerox ink boost and A4 formatting.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Image to PDF Under 200KB in 5 Steps',
        description: 'Follow these steps to turn your marksheet photos into a compliant 200 KB PDF:',
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
            name: 'Image to PDF 200KB',
            item: 'https://kagazo.in/tools/image-to-pdf-200kb',
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
          <span className="text-primary font-bold truncate">Image to PDF 200KB</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Direct Photo-to-PDF Under 200 KB Gateway Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Convert Image to PDF </span>
            <span className="text-primary">Under 200KB Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Convert smartphone photos of certificates, marksheets, and identity proofs directly into an A4 PDF strictly under 200 KB. 100% private in-browser RAM conversion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> TNPSC • UPSC • SSC Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <ImageToPdfEngine initialTargetKb={200} />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Photo-to-PDF Architecture
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Auto-Cropping & Ink Enhancement for Mobile Marksheets
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Smartphone photos taken on beds or tables fail portal verification due to shadows and skewed angles. Kagazo straightens, binarizes, and compiles photos into an exact 200 KB A4 PDF.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Exact 200 KB Ceiling
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Calibrated safe zone between 160 KB and 190 KB ensures zero portal rejections.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Front & Back Merging
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Upload dual-sided marksheets; our engine compiles both into a unified 200 KB PDF.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Personal identification and academic credentials never leave your browser RAM.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Government Portal Document Upload Limits & Image Standards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Official parameters for image-to-PDF conversion across major examination bodies:
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
                  <strong>Technical Advisory:</strong> Recruitment portals will reject PDF documents converted from mobile photos if background shadows obscure serial numbers or signatures.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Convert Image to PDF Under 200KB in 5 Steps
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
                  <Link href="/tools/image-to-pdf-300kb" className="text-primary hover:underline font-medium">
                    Image to PDF 300KB
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

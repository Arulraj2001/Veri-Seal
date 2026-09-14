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
import CleanScannerEngine from '@/components/tools/CleanScannerEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Clean Document Scanner Online Free | Remove Shadows & Xerox Binarize | Kagazo',
  description: 'Convert phone camera photos of certificates and marksheets into flatbed-quality scans online free. Remove phone shadows, yellow incandescent tint, and desk backgrounds.',
  alternates: {
    canonical: 'https://kagazo.in/tools/clean-document-scanner',
  },
  openGraph: {
    title: 'Clean Document Scanner Online Free | Remove Shadows & Xerox Binarize | Kagazo',
    description: 'Convert phone camera photos of certificates and marksheets into flatbed-quality scans online free. Remove phone shadows, yellow incandescent tint, and desk backgrounds.',
    url: 'https://kagazo.in/tools/clean-document-scanner',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const SPEC_ROWS = [
  {
    "authority": "UPSC Civil Services & ORA",
    "docType": "Matriculation & Degree Certificates",
    "officialLimit": "Clear White Background",
    "targetUsed": "Shadow-Free Scan",
    "notes": "Must not contain desk textures, fingertips, or heavy camera shadows."
  },
  {
    "authority": "TNPSC OTR Portal",
    "docType": "10th & 12th Marksheets (Both Sides)",
    "officialLimit": "High Legibility",
    "targetUsed": "Pure Binarized Text",
    "notes": "All subject marks, registration numbers, and signatures must be crisp."
  },
  {
    "authority": "SSC CGL / CHSL / MTS",
    "docType": "Category & Educational Proofs",
    "officialLimit": "Legible Stamp & Seals",
    "targetUsed": "Enhanced Ink Contrast",
    "notes": "Official issuing authority seals must not be obscured by lighting glare."
  },
  {
    "authority": "Banking & Insurance (IBPS/LIC)",
    "docType": "Handwritten Declarations & Resumes",
    "officialLimit": "High Contrast Text",
    "targetUsed": "Black Ink on White Paper",
    "notes": "Ensures automated optical character recognition (OCR) indexing succeeds."
  }
];

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Upload Mobile Photo",
    "desc": "Select the phone camera photo of your marksheet, certificate, or receipt."
  },
  {
    "step": 2,
    "title": "Select Processing Filter",
    "desc": "Choose \"Clean Color\", \"Xerox Photocopy\", or \"High-Contrast B&W\" filter."
  },
  {
    "step": 3,
    "title": "Adjust Shadow & Brightness",
    "desc": "Fine-tune threshold sliders to whiten background paper while keeping ink dark."
  },
  {
    "step": 4,
    "title": "In-Memory Stream Processing",
    "desc": "The computer vision filter processes pixels in client-side RAM instantly."
  },
  {
    "step": 5,
    "title": "Download Clean Document",
    "desc": "Inspect using the clarity loupe and download as a high-resolution PDF or JPEG."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Dark Phone Shadow on Certificate",
    "title": "Camera Shadow Obscuring Student Details",
    "desc": "Taking photos directly from above casts phone shadows. Kagazo equalizes illumination levels."
  },
  {
    "badge": "Error: Yellow Indoor Lighting Tint",
    "title": "Warm Bulb Tint Causing Scrutiny Failure",
    "desc": "Indoor lighting gives paper a yellow or orange cast. Kagazo whitens paper back to pure white."
  },
  {
    "badge": "Error: Desk Texture Visible in Margin",
    "title": "Wood Grain or Bedspread Around Document",
    "desc": "Uncropped photos fail automated OCR verification. Kagazo crops to document boundaries."
  },
  {
    "badge": "Error: Washed-Out Ink Signatures",
    "title": "Over-Thresholding Erasing Fine Pen Strokes",
    "desc": "Generic binarizers break thin signatures. Kagazo uses adaptive hysteresis thresholding."
  }
];

const FAQS = [
  {
    "question": "Why do recruitment portals reject photos taken with mobile cameras?",
    "answer": "Government exam portals use automated OCR and document indexing tools. Mobile camera photos often have uneven lighting, dark hand/phone shadows, yellow indoor light tints, or curled desk edges. These make small printed numbers unreadable by automated systems."
  },
  {
    "question": "How does the shadow removal filter work?",
    "answer": "Kagazo uses local background luminance estimation. It detects low-frequency brightness gradients across the paper and normalizes them, brightening shadowed corners while preserving dark ink text."
  },
  {
    "question": "Will official rubber stamps and colored seals be preserved?",
    "answer": "Yes! The \"Clean Color\" mode whitens background paper while preserving blue, purple, and red stamp ink, ensuring the document looks authentic and official."
  },
  {
    "question": "What is Xerox Binarize mode?",
    "answer": "Xerox Binarize mode converts the document into high-contrast black and white, perfectly replicating a professional flatbed photocopy machine while removing all paper yellowness and background noise."
  },
  {
    "question": "Can I export the cleaned document as a PDF?",
    "answer": "Yes. You can export the cleaned result as an A4 formatted PDF or as a high-resolution JPEG image."
  },
  {
    "question": "Are my certificates uploaded to any server?",
    "answer": "Never. All computer vision and image processing algorithms run 100% locally in your browser memory via WebAssembly and Canvas. Zero documents leave your device."
  },
  {
    "question": "Can I clean multi-page marksheets or certificates?",
    "answer": "Yes. You can upload multiple pages, apply uniform cleaning filters across all sheets, and download them as a unified PDF."
  },
  {
    "question": "Does Kagazo add any watermark to the cleaned scan?",
    "answer": "No. All documents generated by Kagazo are 100% clean and watermark-free."
  },
  {
    "question": "Does this work on wrinkled or folded certificates?",
    "answer": "Yes. The adaptive contrast algorithm smooths out crease shadows and fold marks, producing a flat, clean appearance."
  },
  {
    "question": "Can I use this tool directly from my phone camera?",
    "answer": "Yes. You can snap a photo directly from your smartphone browser and clean it in seconds without installing any mobile app."
  }
];

export default function ToolPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Clean Document Scanner Online Free | Remove Shadows & Xerox Binarize | Kagazo',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/clean-document-scanner',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Convert phone camera photos of certificates and marksheets into flatbed-quality scans online free. Remove phone shadows, yellow incandescent tint, and desk backgrounds.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Clean Document Scans in 5 Steps',
        description: 'Turn any phone camera photo into a flatbed scanner scan in 5 easy steps:',
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
            name: 'Clean Document Scanner',
            item: 'https://kagazo.in/tools/clean-document-scanner',
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
          <span className="text-primary font-bold truncate">Clean Document Scanner</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Flatbed Scanner Quality from Phone Camera • 100% In-Browser RAM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Clean Document Scanner & </span>
            <span className="text-primary">Xerox Binarizer Free</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Transform smartphone photos of certificates, marksheets, and receipts into crisp, shadow-free, flatbed-quality documents. Remove camera glare, paper creases, and yellow incandescent tint in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <FileCheck className="w-4 h-4 text-primary" /> UPSC • SSC • TNPSC Marksheet Ready
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Instant In-Memory Processing
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <CleanScannerEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Intelligent Paper Whitening
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Shadow Removal & Adaptive Contrast Thresholding
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Photos captured on mobile phones suffer from hand shadows, perspective skew, and room lighting gradients. Kagazo applies computer vision algorithms to binarize text and produce clean photocopy-grade scans.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Shadow Eradication
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Eliminates overhead phone silhouettes and uneven lighting gradients across paper.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Xerox Binarization
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Converts grayish photocopies into high-contrast black text on pure white background.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Sensitive certificates and identity documents never leave your personal computer.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Technical / Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Government Portal Document Clarity & Lighting Standards
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Verification guidelines enforced during document scrutiny phases:
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
                  <strong>Technical Advisory:</strong> Recruitment portal scrutiny committees frequently reject documents if desk background or phone shadows obscure official stamps or serial numbers.
                </p>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Clean Document Scans in 5 Steps
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
                  <Link href="/tools/image-to-pdf-200kb" className="text-primary hover:underline font-medium">
                    Image to PDF 200KB
                  </Link>
                  <Link href="/tools/image-to-pdf-300kb" className="text-primary hover:underline font-medium">
                    Image to PDF 300KB
                  </Link>
                  <Link href="/tools/pdf-to-image" className="text-primary hover:underline font-medium">
                    PDF to Image Converter
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

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
  QrCode,
  Scan,
  Share2,
  Mail,
  DollarSign,
  Link2,
} from 'lucide-react';
import { QrCodeGeneratorEngine } from '@/components/tools/QrCodeGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free QR Code Generator Online (Vector SVG & High-Res PNG) | Kagazo',
  description: 'Generate custom, high-resolution QR codes for URLs, Wi-Fi networks, vCards, and UPI payments. 100% free with selectable error correction (L/M/Q/H), scalable vector SVG export, and zero server logging.',
  alternates: {
    canonical: 'https://kagazo.in/tools/qr-code-generator',
  },
  openGraph: {
    title: 'Free QR Code Generator Online (Vector SVG & High-Res PNG) | Kagazo',
    description: 'Generate custom, high-resolution QR codes for URLs, Wi-Fi networks, vCards, and UPI payments. 100% free with selectable error correction (L/M/Q/H), scalable vector SVG export, and zero server logging.',
    url: 'https://kagazo.in/tools/qr-code-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator Online (Vector SVG & High-Res PNG) | Kagazo',
    description: 'Generate custom, high-resolution QR codes for URLs, Wi-Fi networks, vCards, and UPI payments. 100% free with selectable error correction (L/M/Q/H), scalable vector SVG export, and zero server logging.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Payload Type",
    "desc": "Choose the type of QR code you want to create: Website URL, Wi-Fi Network, vCard Contact, UPI Payment, or Plain Text."
  },
  {
    "step": 2,
    "title": "Enter Content & Details",
    "desc": "Type or paste your link, Wi-Fi credentials (SSID and password), or contact information into the configured input fields."
  },
  {
    "step": 3,
    "title": "Configure Error Correction",
    "desc": "Select error correction level: Low (7% for small sizes), Medium (15% standard), or High (30% for maximum durability and scannability)."
  },
  {
    "step": 4,
    "title": "Customize Appearance",
    "desc": "Adjust foreground and background colors, module sizing, and margin padding while observing real-time optical contrast."
  },
  {
    "step": 5,
    "title": "Download High-Res QR Code",
    "desc": "Export your finished QR code in crystal-clear vector SVG or high-resolution PNG format, ready for commercial print or online publishing."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "SCANNER DROPOUT",
    "title": "Removing the Mandatory Quiet Zone",
    "desc": "Cropping out the 4-module white border prevents mobile camera sensors from locating outer timing patterns. Always maintain a clean margin around the code."
  },
  {
    "badge": "LOW OPTICAL CONTRAST",
    "title": "Using Light Colors on Light Backgrounds",
    "desc": "Pastel or low-contrast combinations (e.g., yellow on white) fail ambient light thresholding in mobile cameras. Ensure a minimum 4:1 contrast ratio."
  },
  {
    "badge": "OVERCROWDED MATRIX",
    "title": "Encoding Excessively Long URLs Without Shortening",
    "desc": "Encoding 300+ character URLs forces QR Version 15+ with tiny micro-modules that blur when printed small. Shorten tracking URLs before encoding."
  },
  {
    "badge": "INVERTED COLOR TRAP",
    "title": "Inverting Dark Background with Light Modules",
    "desc": "White QR codes on dark backgrounds fail on older handheld 2D laser scanners and legacy camera software. Keep dark modules on a light background for 100% universal support."
  }
];

const FAQS = [
  {
    "question": "What are the four QR code error correction levels (L, M, Q, H)?",
    "answer": "Error correction utilizes Reed-Solomon algebraic algorithms: Level L restores up to 7% of corrupted data; Level M restores up to 15% (recommended for general digital use); Level Q restores up to 25%; and Level H restores up to 30% of damaged data (recommended for harsh industrial environments, outdoor stickers, or codes with centered logos)."
  },
  {
    "question": "What is the quiet zone, and why is it mandatory?",
    "answer": "The quiet zone is a blank border that surrounds all four sides of a QR code. ISO/IEC 18004 standards mandate a minimum width of 4 modules. This clear buffer allows optical sensors to distinguish the QR code pattern from surrounding text, graphics, or packaging artwork."
  },
  {
    "question": "Should I download SVG or PNG format for printing?",
    "answer": "For professional commercial printing (brochures, posters, business cards, vehicle wraps), download SVG (Scalable Vector Graphics), which scales infinitely without pixelation. For digital display on websites, emails, and social media, high-resolution PNG is ideal."
  },
  {
    "question": "Are these QR codes static or dynamic? Do they ever expire?",
    "answer": "Our generator creates 100% permanent, static QR codes. The encoded information is written directly into the matrix patterns. There are zero redirects, no third-party middleman servers, and no expiration dates\u2014your QR codes will work indefinitely."
  },
  {
    "question": "How does the Wi-Fi QR code feature work on smartphones?",
    "answer": "The Wi-Fi QR code encodes the network SSID, authentication type (WPA/WPA2/WPA3 or WEP), and password using the standard WIFI:S:<ssid>;T:<auth>;P:<password>;; syntax. Scanning with an iPhone Camera or Android Lens prompts a single-tap \"Join Network\" dialog without typing the password."
  },
  {
    "question": "What is the minimum recommended print size for a QR code?",
    "answer": "For standard smartphone scanning at a reading distance of 20 to 30 cm, the printed QR code should measure at least 2.0 cm x 2.0 cm (0.8 x 0.8 inches). A general rule of thumb is a 10:1 distance-to-size ratio (e.g., a code scanned from 1 meter away should be at least 10 cm wide)."
  },
  {
    "question": "Can I encode UPI payments for Indian bank transfers?",
    "answer": "Yes. Select the UPI preset and enter your UPI ID (VPA), payee name, and optional amount. The resulting QR code adheres to the official NPCI UPI specification and scans instantly on PhonePe, Google Pay, Paytm, and BHIM."
  },
  {
    "question": "Can I create vCard contact QR codes for business cards?",
    "answer": "Yes. Enter your name, organization, phone number, email, and website. Scanning the QR code automatically opens the native Contacts app on iOS and Android with all contact fields pre-filled for one-tap saving."
  },
  {
    "question": "Is it safe to generate sensitive QR codes (like Wi-Fi passwords) on this site?",
    "answer": "Completely safe. Our QR generator operates 100% client-side in your web browser memory using HTML5 Canvas and JavaScript. No passwords, personal contact records, or links are ever transmitted to or logged on any external server."
  },
  {
    "question": "Can I use these QR codes for commercial products and marketing campaigns?",
    "answer": "Yes. All QR codes generated on Kagazo are 100% free for personal, commercial, and enterprise use with zero royalties, licensing fees, or attribution requirements."
  }
];

export default function QrCodeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QR Code Generator Studio Online',
        url: 'https://kagazo.in/tools/qr-code-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Generate custom, high-resolution QR codes for URLs, Wi-Fi networks, vCards, and UPI payments. 100% free with selectable error correction (L/M/Q/H), scalable vector SVG export, and zero server logging.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate Custom QR Codes Online',
        description: 'Step-by-step verified workflow instructions for QR Code Generator Studio Online.',
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
            name: 'QR Code Generator Studio Online',
            item: 'https://kagazo.in/tools/qr-code-generator',
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
          <span className="text-primary font-bold">QR Code Generator Studio Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>ISO/IEC 18004 Compliant Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free QR Code Generator </span>
            <span className="text-primary">Vector SVG & PNG Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Generate custom, high-resolution QR codes for URLs, Wi-Fi networks, vCards, and UPI payments. 100% free with selectable error correction (L/M/Q/H), scalable vector SVG export, and zero server logging.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <QrCodeGeneratorEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Standards Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Lossless Vector SVG Export
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Download infinitely scalable vector SVG files alongside high-DPI PNGs, perfect for storefront banners, vinyl signs, and packaging print.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Multi-Payload Architecture
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-formatted templates for Web URLs, WPA/WPA2/WPA3 Wi-Fi networks, vCard 3.0 contacts, UPI payment strings, SMS, and plain text.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Client-Side Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    All matrix calculations and QR rendering occur strictly within your browser RAM. Your links, Wi-Fi passwords, and contact info are never sent to remote servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    QR Code Technical & Encoding Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  ISO/IEC 18004 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Standard Specification</th><th className="py-2.5 px-3 font-bold">Recommended Value</th><th className="py-2.5 px-3 font-bold">Technical Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Symbology Standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO/IEC 18004 Model 2</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Version 1 (21x21) to 40 (177x177)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Universal 2D matrix symbology</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Error Correction Levels</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">L (7%), M (15%), Q (25%), H (30%)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Level M (Standard) / Level H (Logo)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Reed-Solomon algebraic error correction</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Quiet Zone (Margin)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Minimum 4 Modules Wide</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">4 to 6 Modules on all 4 sides</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prevents optical scanner edge clipping</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Data Encodings</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Numeric, Alphanumeric, Byte, Kanji</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">UTF-8 Byte Encoding (Universal)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Seamless support for emojis & multilingual text</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Output Formats</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Vector SVG, 300 DPI PNG, WebP</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">SVG for Print / PNG for Digital</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Lossless infinite scaling on billboards & labels</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Scanning Distance Ratio</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10:1 Distance-to-Size Formula</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">2.5 cm x 2.5 cm min for hand scans</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">10 cm width required for 1 meter scan range</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate Custom QR Codes Online
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and optimal results:
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
                  Common QR Code Design Mistakes & Solutions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common scanning errors, protocol failures, and formatting pitfalls:
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
                    Comprehensive technical, optical, and operational answers
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
                QR Generator Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    ISO/IEC 18004 Model 2
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Error Correction</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Selectable L, M, Q, H
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Quiet Zone</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Minimum 4 Modules Wide
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Export Formats</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Scalable SVG & 300 DPI PNG
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% Client-Side In-RAM
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
                  href="/tools/qr-code-reader"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      QR Code Reader
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Scan
                  </span>
                </Link>
                <Link
                  href="/tools/barcode-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Barcode Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    1D Code
                  </span>
                </Link>
                <Link
                  href="/tools/whatsapp-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      WhatsApp Link Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Chat
                  </span>
                </Link>
                <Link
                  href="/tools/utm-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      UTM Link Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    GA4
                  </span>
                </Link>
                <Link
                  href="/tools/mailto-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Mailto Link Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Email
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
                All matrix calculations, optical decoding, and link generations occur strictly inside your device browser memory. Zero URLs, contact details, or payloads are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

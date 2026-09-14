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
import { QrCodeReaderEngine } from '@/components/tools/QrCodeReaderEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'QR Code Reader Online Free (Scan from Camera or Image Upload) | Kagazo',
  description: 'Scan and decode QR codes online using your web camera or by uploading an image file. Ultra-fast WebAssembly decoding for URLs, Wi-Fi networks, vCards, and UPI payments with 100% client-side privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/qr-code-reader',
  },
  openGraph: {
    title: 'QR Code Reader Online Free (Scan from Camera or Image Upload) | Kagazo',
    description: 'Scan and decode QR codes online using your web camera or by uploading an image file. Ultra-fast WebAssembly decoding for URLs, Wi-Fi networks, vCards, and UPI payments with 100% client-side privacy.',
    url: 'https://kagazo.in/tools/qr-code-reader',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Reader Online Free (Scan from Camera or Image Upload) | Kagazo',
    description: 'Scan and decode QR codes online using your web camera or by uploading an image file. Ultra-fast WebAssembly decoding for URLs, Wi-Fi networks, vCards, and UPI payments with 100% client-side privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Choose Scanner Mode",
    "desc": "Select \"Scan with Camera\" for live optical scanning, or \"Upload Image\" to parse a saved photo or screenshot."
  },
  {
    "step": 2,
    "title": "Grant Camera or Select File",
    "desc": "Allow browser camera permission or browse your device files to select an image containing a QR code."
  },
  {
    "step": 3,
    "title": "Align QR Code in Viewfinder",
    "desc": "Position the QR code within the central targeting guides, ensuring adequate ambient lighting and sharp optical focus."
  },
  {
    "step": 4,
    "title": "Instant Algorithmic Decoding",
    "desc": "The WebAssembly decoder locates the three corner finder patterns and reconstructs the data payload in under 50 milliseconds."
  },
  {
    "step": 5,
    "title": "View & Act on Decoded Data",
    "desc": "Inspect the raw string, copy the text to clipboard, launch the decoded URL, or examine formatted contact/Wi-Fi credentials."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "CAMERA FOCUS BLUR",
    "title": "Holding Camera Too Close to Code",
    "desc": "Holding your smartphone less than 10 cm away causes macro lens blur. Pull back to 20-30 cm to allow the camera autofocus system to lock onto timing tracks."
  },
  {
    "badge": "SPECULAR GLARE",
    "title": "Reflections on Screens or Glossy Laminates",
    "desc": "Bright ceiling lights or camera flash reflecting off glossy computer monitors or plastic cards blind optical sensors. Tilt the camera slightly to eliminate glare."
  },
  {
    "badge": "LOW RESOLUTION UPLOAD",
    "title": "Uploading Blurry or Cropped Screenshots",
    "desc": "Low-resolution images below 150x150 pixels lack sufficient module contrast. Upload high-resolution original images without digital zoom artifacts."
  },
  {
    "badge": "CAMERA PERMISSION BLOCKED",
    "title": "Browser Permissions Denied in Address Bar",
    "desc": "If video feed does not load, camera access is blocked in browser site settings. Click the lock/tune icon next to the URL bar and toggle Camera to \"Allow\"."
  }
];

const FAQS = [
  {
    "question": "How does this online QR code reader work without installing an app?",
    "answer": "Our reader uses modern WebAssembly (WASM) compiled from the industry-standard ZXing (Zebra Crossing) C++ optical library, paired with the browser native BarcodeDetector API. It processes video frames directly inside your browser at 30+ FPS without plugins or app installations."
  },
  {
    "question": "Can I scan a QR code directly from a picture or screenshot on my computer?",
    "answer": "Yes. Switch to the \"Upload Image\" tab and select any image file (PNG, JPG, WebP, GIF), or paste a screenshot directly from your clipboard using Ctrl+V. The engine locates and decodes the QR code instantly."
  },
  {
    "question": "Is my camera video or uploaded image sent to your server?",
    "answer": "No. All frame analysis, binarization, and pattern decoding occur 100% locally in your device RAM. No image data, video stream frames, or decoded strings are ever transmitted to any cloud server."
  },
  {
    "question": "Why is my camera not scanning the QR code?",
    "answer": "Ensure adequate lighting, hold the camera steady at a distance of 20 to 30 cm, and avoid bright glare from overhead lights. If the camera feed is completely blank, verify that camera permissions are enabled in your browser settings."
  },
  {
    "question": "Can this reader decode damaged, smudged, or partially covered QR codes?",
    "answer": "Yes. Because standard QR codes include Reed-Solomon algebraic error correction (Levels L, M, Q, and H), our engine can successfully recover and decode codes with up to 30% physical surface damage, tears, or obscured modules."
  },
  {
    "question": "How does it handle Wi-Fi QR codes?",
    "answer": "When a Wi-Fi QR code is detected, our parser extracts the Network Name (SSID), Security Protocol (WPA/WPA2/WPA3 or WEP), and Password into structured fields, allowing you to copy the password with a single tap."
  },
  {
    "question": "Can it scan UPI payment QR codes from Indian merchants?",
    "answer": "Yes. It parses official NPCI UPI URLs (upi://pay?pa=...&pn=...), revealing the merchant VPA ID, payee name, transaction note, and amount before you make a payment."
  },
  {
    "question": "Does this tool work on mobile browsers like Safari on iPhone and Chrome on Android?",
    "answer": "Yes. It is fully responsive and optimized for mobile devices, automatically utilizing the rear environment-facing camera on iOS Safari, Chrome, Samsung Internet, and Firefox Mobile."
  },
  {
    "question": "Can this scanner detect malicious or phishing links before I open them?",
    "answer": "Yes. Unlike mobile camera apps that automatically launch URLs, our reader displays the full decoded URL text first, allowing you to inspect the domain and parameters safely before deciding to click."
  },
  {
    "question": "Can it scan Micro QR codes and inverted (white on black) codes?",
    "answer": "Yes. The decoder includes adaptive binarization algorithms that automatically invert negative contrast codes and decode both standard Model 2 QR codes and Micro QR symbols."
  }
];

export default function QrCodeReaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QR Code Reader & Decoder Online',
        url: 'https://kagazo.in/tools/qr-code-reader',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Scan and decode QR codes online using your web camera or by uploading an image file. Ultra-fast WebAssembly decoding for URLs, Wi-Fi networks, vCards, and UPI payments with 100% client-side privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Scan & Decode QR Codes Online',
        description: 'Step-by-step verified workflow instructions for QR Code Reader & Decoder Online.',
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
            name: 'QR Code Reader & Decoder Online',
            item: 'https://kagazo.in/tools/qr-code-reader',
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
          <span className="text-primary font-bold">QR Code Reader & Decoder Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Instant WebAssembly Decoder</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>QR Code Reader & </span>
            <span className="text-primary">Decoder (Camera & Image)</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Scan and decode QR codes online using your web camera or by uploading an image file. Ultra-fast WebAssembly decoding for URLs, Wi-Fi networks, vCards, and UPI payments with 100% client-side privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <QrCodeReaderEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Dual Input: Live Camera & File Upload
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Scan live through your smartphone or laptop webcam, or simply drop a screenshot or photo containing a QR code for instant decoding.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Smart Multi-Payload Parser
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically detects and categorizes encoded data—providing one-tap Wi-Fi joining, contact saving, URL opening, and UPI payment inspection.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% Private In-RAM Processing
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Camera video streams and uploaded photos are processed strictly inside browser memory using WebAssembly. No photos are ever sent to remote servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    QR Reader Decoding Architecture & Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  WASM & BarcodeDetector Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Technical Specification</th><th className="py-2.5 px-3 font-bold">Performance Threshold</th><th className="py-2.5 px-3 font-bold">Operational Capability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Decoding Engine</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ZXing C++ WebAssembly / Native API</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Sub-50ms Frame Latency</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">High-throughput optical pattern recognition</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Input Sources</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Live Camera Stream, Image Upload, Clipboard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">All standard image formats</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Drag-and-drop JPEG, PNG, WebP, GIF, SVG</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Supported Standards</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO/IEC 18004 Model 1 & 2, Micro QR</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Versions 1 through 40</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Decodes corrupted codes up to 30% damage</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Payload Parsers</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">URL, Wi-Fi, vCard 3.0/4.0, UPI, Plain Text</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Automatic structure detection</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">One-click copy, connect, or browser navigation</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Camera Resolutions</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">720p HD / 1080p FHD Video Feed</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Auto-focus & macro zoom support</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Front and rear environment camera switching</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Data Security</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">100% In-RAM Local Execution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero cloud telemetry</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Image frames never uploaded across network</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Scan & Decode QR Codes Online
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
                  Common Scanning Failures & Quick Troubleshooting
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
                QR Reader Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Engine</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    ZXing C++ WebAssembly
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Input Types</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Webcam / File / Clipboard
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Frame Rate</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    30+ FPS Real-Time Scanning
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Payload Parsing</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    URL, Wi-Fi, vCard, UPI
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% In-RAM Local Execution
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
                  href="/tools/qr-code-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      QR Code Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Create
                  </span>
                </Link>
                <Link
                  href="/tools/barcode-reader"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Barcode Reader
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    1D Scan
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

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Printer,
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
  Monitor,
  Layers,
  Crop,
  FileUp,
  Copy,
  Scissors,
  Check,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { InstallPwaButton } from '@/components/pwa/InstallPwaButton';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Cyber Café & CSC Print Hub: 1-Click Passport Photo, PVC ID, Aadhaar & Exam Prep | Kagazo',
  description:
    'Free all-in-one desktop workstation for Indian Cyber Cafes, CSC centres, Xerox shops & e-Sevai. 4x6" passport sheets, 5-in-1 PVC IDs, Aadhaar merge & exam resizers. 100% private in-browser RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/cyber-cafe-suite',
  },
  openGraph: {
    title: 'Cyber Café & CSC Print Hub: 1-Click Passport Photo, PVC ID, Aadhaar & Exam Prep | Kagazo',
    description:
      'The complete digital print workstation for Indian Cyber Cafés, CSC Kendra, and Xerox shops. Generate 4x6" passport sheets, 5-in-1 A4 PVC ID cards, and exam combos at 300 DPI.',
    url: 'https://kagazo.in/tools/cyber-cafe-suite',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Café & CSC Print Hub: 1-Click Passport Photo, PVC ID, Aadhaar & Exam Prep | Kagazo',
    description:
      'Free all-in-one desktop workstation for Indian Cyber Cafes, CSC centres, Xerox shops & e-Sevai. 100% private in-browser RAM.',
  },
};

const PHOTO_PVC_TOOLS = [
  {
    title: '4x6" & A4 Passport Photo Sheet Maker',
    badge: 'TOP REVENUE TOOL',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Print 8 passport photos on 4x6" postcard paper or 32 on A4 at exact 35x45mm with ultra-thin 300 DPI cut guidelines.',
    href: '/tools/passport-photo-sheet-maker',
    specs: '35x45mm / 2x2" · 300 DPI · Cutting lines · Epson/Canon ready',
  },
  {
    title: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID)',
    badge: 'SAVES 60% PAPER',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Print up to 10 standard CR-80 ID cards (Aadhaar, PAN, Voter, Driving License) simultaneously on one single A4 sheet.',
    href: '/tools/a4-multi-card-sheet',
    specs: '85.6 x 53.98 mm · CR-80 Standard · Corner alignment · Batch print',
  },
  {
    title: 'PVC ID Card Maker',
    badge: 'CR-80 SIZING',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    description: 'Instant front and back alignment for PVC thermal card printers (Dragon / Epson tray / Zebra).',
    href: '/tools/pvc-id-card-maker',
    specs: 'Direct PVC Tray · Front & Back Overlay · 300 DPI Output',
  },
  {
    title: 'Stamp Size Photo Maker (20x25mm)',
    badge: 'AFFIDAVIT & PASSES',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Generates 16 or 32 stamp-sized photos on 4x6" photo paper for bus passes, railway concessions, and legal affidavits.',
    href: '/tools/stamp-size-photo-maker',
    specs: '20x25 mm · High Density Grid · 4x6" & A4 presets',
  },
  {
    title: 'Passport White Background Studio',
    badge: 'AI CLEANUP',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    description: 'Turn irregular customer mobile photos with colored curtains or wall shadows into official pure white backgrounds.',
    href: '/tools/passport-white-background',
    specs: 'Pure White (RGB 255,255,255) · Neutral lighting · Instant preview',
  },
  {
    title: 'Biometric Face Aligner & Eye-Level Center',
    badge: 'ICAO COMPLIANT',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    description: 'Automatically balances 70-80% face coverage ratio required by Indian passport authorities and foreign visa embassies.',
    href: '/tools/biometric-face-aligner',
    specs: '70-80% Face Area · Eye-level leveling · Rejection proof',
  },
];

const CITIZEN_AADHAAR_TOOLS = [
  {
    title: 'Aadhaar Front & Back Single A4 Page Merger',
    badge: 'DAILY ESSENTIAL',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Combines both sides of an Aadhaar card onto one side of an A4 paper sheet. Eliminate double scanning and crooked photocopying.',
    href: '/tools/aadhaar-front-back-pdf',
    specs: 'Side-by-side or Top-Bottom · 100% 1:1 scale · Instant PDF export',
  },
  {
    title: 'Aadhaar + PAN KYC Joiner',
    badge: 'BANK & SIM KYC',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Merges Aadhaar and PAN cards onto a single print sheet with a dedicated signature self-attestation box for bank accounts.',
    href: '/tools/aadhaar-pan-kyc-merge',
    specs: 'Self-attestation line · Dual-identity layout · Single sheet print',
  },
  {
    title: 'Mask Aadhaar (First 8 Digits Redaction)',
    badge: 'RBI & DPDP MANDATORY',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    description: 'Blacks out the first 8 digits (xxxx xxxx 1234) for private hotel check-ins, telecom KYC, and real estate transactions.',
    href: '/tools/mask-aadhaar',
    specs: 'Permanent raster blackout · In-memory privacy · Legal compliance',
  },
  {
    title: 'TN e-Sevai Certificate Compressor (<200KB)',
    badge: 'TNeGA & e-DISTRICT',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Optimizes Community, Nativity, Income, and Legal Heir certificates to under 200KB without blurring revenue seal or QR code.',
    href: '/tools/tn-esevai-certificate-prep',
    specs: 'Under 200KB guarantee · Razor sharp QR code · Fast portal upload',
  },
  {
    title: 'Driving License & RC Card Merger',
    badge: 'SARATHI PARIVAHAN',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    description: 'Merges smart card Driving License and Vehicle RC front and back sides onto a clean A4 print sheet for RTO submissions.',
    href: '/tools/driving-license-card-merger',
    specs: 'Smart card layout · Micro-text preservation · Ready for police/RTO',
  },
  {
    title: 'Clean Document Scanner & B&W High-Contrast',
    badge: 'XEROX CLARITY',
    badgeColor: 'bg-slate-50 text-slate-800 border-slate-200',
    description: 'Transforms dark, skewed smartphone camera snaps of old marksheets and land documents into crisp black-and-white print copies.',
    href: '/tools/clean-document-scanner',
    specs: 'Dewarping · Background ink removal · High contrast monochrome',
  },
];

const EXAM_RECRUITMENT_TOOLS = [
  {
    title: 'TNPSC Combo Pack Engine',
    badge: 'TNPSC OTR READY',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Photo (20-50KB, 200 DPI, 3.5x4.5cm) + Signature (10-20KB, 200 DPI, 6.0x2.0cm) generated in one single click.',
    href: '/tools/tnpsc-combo-pack',
    specs: 'Exact pixels · Guaranteed portal acceptance · Zero rejection',
  },
  {
    title: 'UPSC Civil Services Combo Engine',
    badge: 'UPSC OTR 350x350',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Converts photo and signature to exact 350x350 to 1000x1000 pixels with 20KB-300KB file size constraints.',
    href: '/tools/upsc-combo-pack',
    specs: '350x350 px · 300 DPI · Min 20KB / Max 300KB · Aspect locked',
  },
  {
    title: 'SSC Photo & Signature Resizer',
    badge: 'SSC CGL / CHSL / MTS',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    description: 'Formats photographs to 20-50KB (3.5x4.5cm) and signatures to 10-20KB (4.0x2.0cm) for Staff Selection Commission portals.',
    href: '/tools/ssc-photo-signature-resizer',
    specs: 'Staff Selection Commission · Live dimension preview · 100% compliant',
  },
  {
    title: 'Government Exam PDF Compressor (<200KB / <300KB)',
    badge: 'MARKSHEET & NOC',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Squashes PDF certificates to strict 100KB, 200KB, or 300KB limits while retaining 100% legible roll numbers and officer signatures.',
    href: '/tools/government-exam-pdf-compressor',
    specs: 'Target exact KB · Sharp typography · Multiple page support',
  },
  {
    title: 'Photo Date & Name Stamper',
    badge: 'DOP MANDATE',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    description: 'Imprints applicant name and Date of Photograph (DOP) on a bottom white banner, mandatory for Central and Police recruitment.',
    href: '/tools/photo-date-name-stamper',
    specs: 'Custom candidate name · Date selector · Standard font weight',
  },
  {
    title: 'Signature Cleaner & Transparent Extractor',
    badge: 'DARK INK BOOST',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    description: 'Extracts pen strokes from wrinkled paper or phone shadow photos, creating a clean white-background or transparent PNG.',
    href: '/tools/signature-cleaner-extractor',
    specs: 'Threshold slider · Pure white background · Anti-aliased lines',
  },
];

const PRINTER_CALIBRATION = [
  {
    brand: 'Epson EcoTank Series',
    models: 'L805, L8050, L3110, L3210, L3250',
    paperType: 'Epson Premium Glossy / Ultra Glossy',
    scaling: '100% (Actual Size) — Never "Fit to Frame"',
    printQuality: 'High / Best (Disable High Speed bidirectional)',
    recommendedFor: '4x6" 8-up Passport Photos & A4 10-up PVC Sheets',
  },
  {
    brand: 'Canon PIXMA MegaTank Series',
    models: 'G2010, G2020, G3010, G3020, iX6870',
    paperType: 'Photo Paper Plus Glossy II (PP-201)',
    scaling: 'Actual Size / 100% — Margin: 3mm or Borderless',
    printQuality: 'High Quality — Color/Intensity Manual (+5 contrast)',
    recommendedFor: 'Crisp text on A4 certificates & vivid ID cards',
  },
  {
    brand: 'HP Ink Tank / Smart Tank Series',
    models: 'HP 415, 515, 516, 580 Smart Tank',
    paperType: 'HP Advanced Photo Paper Glossy',
    scaling: 'Actual Size — Uncheck "Fit picture to printable area"',
    printQuality: 'Best (1200 DPI rendered raster)',
    recommendedFor: 'Daily document printing & student marksheets',
  },
  {
    brand: 'Brother InkBenefit Tank Series',
    models: 'DCP-T420W, T520W, T720W, T820DW',
    paperType: 'Brother BP71 Photo Glossy',
    scaling: '100% — Select Paper Feed: Manual/Rear for thick 230 GSM',
    printQuality: 'Photo Fine (1200 x 6000 dpi)',
    recommendedFor: 'High-volume 230 GSM ID card paper stock',
  },
];

const FAQS = [
  {
    question: 'How do I install Kagazo as a permanent desktop application in my cyber café?',
    answer:
      'Click the "Install Kagazo Desktop App" button at the top of this page, or open Kagazo in Google Chrome or Microsoft Edge and click the Install icon (computer screen with a down arrow) located at the far right of the address bar. Kagazo will install directly to your Windows desktop with an icon, opening in a distraction-free window that launches instantly even during slow internet periods.',
  },
  {
    question: 'Why should cyber cafés and CSC centres use Kagazo instead of cloud-based online tools?',
    answer:
      'Under the Digital Personal Data Protection Act (DPDP Act 2023), cyber café operators face severe legal liabilities and penalties if customer Aadhaar cards, PAN details, bank passbooks, or phone numbers are uploaded to untrusted public cloud servers. Kagazo processes 100% of files inside your computer RAM memory using client-side WebAssembly and HTML5 Canvas. No customer document ever leaves your shop desktop, guaranteeing absolute legal compliance.',
  },
  {
    question: 'How much money does a cyber café save by using Kagazo 4x6" and A4 gang sheets?',
    answer:
      'Traditionally, printing 8 passport photos one-by-one or printing ID cards on single sheets wastes substantial paper and ink. By utilizing Kagazo’s 4x6" Passport Sheet (8 photos per 4x6" sheet) and A4 Multi-Card Gang Sheet (up to 10 CR-80 ID cards per A4 sheet), print studios reduce paper costs by 60% and ink waste by over 45%, adding ₹3,000 to ₹12,000 in monthly net profit for a typical high-traffic Indian xerox shop.',
  },
  {
    question: 'What is the exact printer setting to prevent passport photos from getting stretched or shrunk?',
    answer:
      'In Windows Print Dialog (or Ctrl+P in your browser/viewer), always set Page Sizing to "100%" or "Actual Size". CRITICAL: Ensure the option "Fit picture to frame" or "Shrink to fit printable area" is UNCHECKED. If checked, Windows will stretch a 35x45mm passport photo to fit page margins, which will cause immediate rejection at government passport and visa offices.',
  },
  {
    question: 'Can I use this workstation without an active internet connection?',
    answer:
      'Yes. Once Kagazo is loaded or installed as a PWA desktop application on your computer, all core client-side engines (Photo Sheet Maker, Multi-Card Sheet Maker, Document Cleaners, and Image Resizers) run directly within your browser’s local JavaScript engine, allowing seamless offline workflow even if your local broadband drops.',
  },
  {
    question: 'Does Kagazo support Tamil Nadu e-Sevai, MeeSeva, and CSC portal upload requirements?',
    answer:
      'Yes. We have dedicated presets specifically engineered for Tamil Nadu e-Sevai (TNeGA), Andhra Pradesh/Telangana MeeSeva, Karnataka Seva Sindhu, and central CSC portals, ensuring certificates are compressed strictly under 200KB and exam photos meet exact pixel requirements on the first try.',
  },
];

export default function CyberCafeSuitePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Cyber Café & CSC Digital Print Workstation',
        url: 'https://kagazo.in/tools/cyber-cafe-suite',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Windows, macOS, Linux, ChromeOS',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'All-in-one digital printing and document workstation for Indian Cyber Cafes, CSC Kendra, and Xerox shops. Generates 4x6" passport photo sheets, 5-in-1 A4 PVC ID cards, and government exam resizers at 300 DPI.',
        featureList: [
          '4x6" and A4 Passport Photo Sheet Maker with 300 DPI cut marks',
          '5-in-1 A4 Multi-Card Gang Sheet Studio for CR-80 ID cards',
          'Aadhaar Front & Back Single A4 Page Merger',
          'TN e-Sevai Certificate Compressor <200KB',
          'TNPSC, UPSC, and SSC Exam Combo Resizers',
          'DPDP Act 2023 Compliant In-Memory Client-Side RAM Processing',
        ],
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
            name: 'Cyber Café & CSC Print Hub',
            item: 'https://kagazo.in/tools/cyber-cafe-suite',
          },
        ],
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
    ],
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-12">
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
          <span className="text-primary font-bold">Cyber Café & CSC Print Hub</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              CSC & CYBER CAFÉ OPERATOR COMMAND SUITE
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% In-Browser RAM · DPDP Act 2023 Compliant
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-main leading-[1.12]">
            <span>Cyber Café & CSC </span>
            <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Digital Print Hub
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
            The ultra-fast, zero-cloud print workstation engineered for Indian Xerox shops, CSC e-Governance centres, and e-Sevai operators. Generate 4x6" passport photo sheets, 5-in-1 A4 PVC ID cards, Aadhaar merges, and exam upload packages at 300 DPI in seconds.
          </p>

          {/* Quick Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <InstallPwaButton className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer" />
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface border border-border text-xs text-text-muted font-semibold shadow-2xs">
              <span className="px-2 py-0.5 rounded bg-muted font-mono text-[11px] text-text-main border border-border">Ctrl + D</span>
              <span>Bookmark this page on all counter PCs</span>
            </div>
          </div>
        </header>

        {/* Live Shop Value Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-surface border border-border shadow-xs">
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-primary">0 sec</div>
            <div className="text-xs text-text-muted mt-1 font-medium">Server Upload Wait Time</div>
          </div>
          <div className="text-center p-3 border-l border-border">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">300 DPI</div>
            <div className="text-xs text-text-muted mt-1 font-medium">Calibrated Print Resolution</div>
          </div>
          <div className="text-center p-3 border-l border-border">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">60% Save</div>
            <div className="text-xs text-text-muted mt-1 font-medium">Glossy Photo Paper Cost</div>
          </div>
          <div className="text-center p-3 border-l border-border">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">100% RAM</div>
            <div className="text-xs text-text-muted mt-1 font-medium">Zero Customer Cloud Leaks</div>
          </div>
        </div>

        {/* SECTION 1: PHOTO & PVC ID CARD PRINTING STUDIO */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary tracking-wide uppercase">
                <Printer className="w-4 h-4" />
                <span>Section 1 · Studio Revenue Generators</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight mt-1">
                Passport Photo Sheets & PVC ID Card Printing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-md">
              Produce print-ready 4x6" and A4 sheets formatted with precise cut marks for your paper trimmer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PHOTO_PVC_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-surface border border-border hover:border-primary/50 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main group-hover:text-primary transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted/80 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                  <span className="truncate">{tool.specs}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 2: CITIZEN SERVICES & AADHAAR OPERATIONS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 tracking-wide uppercase">
                <FileCheck2 className="w-4 h-4" />
                <span>Section 2 · CSC & e-Sevai Everyday Jobs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight mt-1">
                Citizen Identity & Government Certificate Utilities
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-md">
              Merge front and back IDs, mask Aadhaar numbers for customer safety, and prep e-District certs under 200KB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CITIZEN_AADHAAR_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-surface border border-border hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main group-hover:text-emerald-600 transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted/80 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600/70 shrink-0" />
                  <span className="truncate">{tool.specs}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 3: RECRUITMENT & EXAM FORM FILLING */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 tracking-wide uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Section 3 · Fast Exam Form Submissions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight mt-1">
                Government Exam & Job Application Combo Engines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-md">
              Never face portal upload errors again. Exact pixel presets for TNPSC, UPSC, SSC, IBPS, and Railway portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXAM_RECRUITMENT_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-surface border border-border hover:border-purple-500/50 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main group-hover:text-purple-600 transition-colors leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted/80 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-600/70 shrink-0" />
                  <span className="truncate">{tool.specs}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PRINTER HARDWARE CALIBRATION CHEAT SHEET */}
        <section className="space-y-6 p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight">
                Shop Printer Hardware Calibration Matrix (Cheat Sheet)
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Standardized Windows print driver settings for Epson, Canon, HP, and Brother inkjet photo printers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {PRINTER_CALIBRATION.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-background border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-text-main text-base">{item.brand}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-text-muted border border-border">
                    {item.models}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-text-main w-24 shrink-0">Paper Media:</span>
                    <span className="text-text-muted">{item.paperType}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-text-main w-24 shrink-0">Page Scaling:</span>
                    <span className="font-bold text-emerald-600">{item.scaling}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-text-main w-24 shrink-0">Print Quality:</span>
                    <span className="text-text-muted">{item.printQuality}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-border/50">
                    <span className="font-semibold text-text-main w-24 shrink-0">Best For:</span>
                    <span className="text-primary font-medium">{item.recommendedFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold">Golden Rule for Cyber Café Operators:</strong> Always ensure the checkbox <em>"Fit picture to frame"</em> in the Windows Photo Viewer print dialog is <strong className="underline">unchecked</strong>. Leaving it checked distorts 35x45mm photos and alters biometric face ratios, causing passport rejection.
            </div>
          </div>
        </section>

        {/* DPDP ACT PRIVACY COMPLIANCE NOTICE */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>INDIAN CITIZEN DATA PROTECTION · ZERO RISK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Protect Your Business Against DPDP Act Penalties
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-4xl">
            Under India's <strong>Digital Personal Data Protection Act (DPDP Act 2023)</strong>, any commercial enterprise that mishandles or leaks citizen identity documents (such as Aadhaar, PAN, voter cards, or medical passes) faces heavy legal scrutiny and penalties up to ₹250 Crores.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="font-bold text-sm text-emerald-300">100% In-Browser RAM</div>
              <p className="text-xs text-emerald-100/70">
                Processing occurs entirely inside the client machine’s RAM. No files are uploaded to Kagazo or third-party servers.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="font-bold text-sm text-emerald-300">Zero Temp File Caching</div>
              <p className="text-xs text-emerald-100/70">
                Customer files are never written to disk or temporary Windows cache directories where subsequent customers could copy them.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="font-bold text-sm text-emerald-300">Immediate Buffer Purge</div>
              <p className="text-xs text-emerald-100/70">
                The moment you close the browser tab or refresh the page, all image pixels and memory buffers are permanently erased.
              </p>
            </div>
          </div>
        </section>

        {/* Ad Placement */}
        <AdSlot slot="in_content" context="cyber_cafe" />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
              Frequently Asked Questions for Cyber Café & Xerox Shop Owners
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Everything you need to know about setting up Kagazo across your shop computers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-surface border border-border shadow-2xs space-y-2">
                <h3 className="font-bold text-text-main text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

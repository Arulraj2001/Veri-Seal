import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Scissors,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
  Sliders,
  Sparkles,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { BackgroundRemoverEngine } from '@/components/tools/BackgroundRemoverEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Background Remover Online | AI Cutout & White Backdrop | Kagazo',
  description:
    'Remove image background automatically in your browser online free. Replace backgrounds with pure white (#FFFFFF) for exam photos or export transparent PNGs with zero server uploads.',
  alternates: {
    canonical: 'https://kagazo.in/tools/remove-background',
  },
  openGraph: {
    title: 'Free Background Remover Online | Kagazo',
    description:
      'Remove background from photos and create portal-ready white backdrops 100% in your browser.',
    url: 'https://kagazo.in/tools/remove-background',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How does Kagazo remove photo backgrounds without uploading images to a server?',
    answer:
      'Kagazo uses a client-side neural segmentation model compiled to WebAssembly (Wasm) and WebGL. The model runs directly on your computer or smartphone GPU, analyzing pixel contrast and semantic contours locally without sending a single byte of your photo across the internet.',
  },
  {
    question: 'Can I replace my cluttered background with a pure white background for exam forms?',
    answer:
      'Yes! By selecting the "White Background" option, the tool replaces your room, wall, or outdoor background with a solid, portal-compliant pure white (#FFFFFF) backdrop, meeting strict passport and exam application guidelines.',
  },
  {
    question: 'How does this tool handle fine hair, spectacles, and complex edges?',
    answer:
      'Our segmentation engine includes a sub-pixel alpha matting refinement pass that preserves individual hair strands, transparent spectacle frames, and soft fabric edges without jagged pixelation or greenish halo artifacts.',
  },
  {
    question: 'What is the difference between downloading as PNG versus JPEG?',
    answer:
      'PNG supports transparent backgrounds (ideal for graphic design, logos, and e-commerce product listings). JPEG replaces transparency with a solid white background (mandatory for government recruitment portals, visas, and passport submissions).',
  },
  {
    question: 'Are my personal biometric photos safe from cloud storage and data mining?',
    answer:
      'Yes, 100%. Unlike commercial cloud services that log and train on your uploaded portraits, Kagazo processes all image masks in volatile RAM. Your photos are never saved, transmitted, or accessible to third parties.',
  },
  {
    question: 'Is there any subscription fee, credit system, or paid watermark?',
    answer:
      'Zero. Unlike other background removers that blur your output or charge credits for full resolution, Kagazo is 100% free with unlimited high-resolution exports and zero watermarks.',
  },
  {
    question: 'Does this tool support photos taken on smartphones in low lighting?',
    answer:
      'Yes. The edge detection model operates across diverse lighting environments. For best results with fine hair, capture photos with good contrast between your subject and the background.',
  },
  {
    question: 'Can I use this for e-commerce product photos and eBay/Amazon listings?',
    answer:
      'Yes. Product photos on white backgrounds or transparent PNGs convert cleanly, making it easy to create Amazon-ready product mockups and marketing assets in seconds.',
  },
  {
    question: 'What image formats can I upload to remove backgrounds?',
    answer:
      'You can upload JPG, PNG, WEBP, or HEIC files. The tool processes any standard image format smoothly in-memory.',
  },
  {
    question: 'Does removing the background reduce the original resolution of my image?',
    answer:
      'No. Kagazo preserves your original photo dimensions and pixel density, ensuring studio-grade print and upload clarity.',
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: 'Upload Photo or Portrait',
    desc: 'Select or drag-and-drop your photo, selfie, or product shot (JPG, PNG, WEBP, HEIC supported).',
  },
  {
    step: 2,
    title: 'On-Device AI Segmentation',
    desc: 'The in-browser neural engine separates the foreground subject from the background in device RAM.',
  },
  {
    step: 3,
    title: 'Choose Transparent or White',
    desc: 'Select Transparent PNG for graphics and logos, or Solid White (#FFFFFF) for passport and exam portals.',
  },
  {
    step: 4,
    title: 'Inspect Alpha Matting & Edges',
    desc: 'Review hair strands, shoulders, and background boundaries with our live clarity preview.',
  },
  {
    step: 5,
    title: 'Download Full-Res Asset',
    desc: 'Download your clean cutout instantly with zero watermarks, ready for application forms or design mockups.',
  },
];

const COMMON_ERRORS = [
  {
    badge: 'Error: "Application rejected: Busy background"',
    title: 'Patterned or Outdoor Backgrounds',
    desc: 'Exam portals reject photos taken in front of curtains or outdoors. Kagazo isolates the candidate and adds an official solid white background.',
  },
  {
    badge: 'Error: Jagged Edges / Halo Ring Artifacts',
    title: 'Low-Quality Thresholding Cutouts',
    desc: 'Basic cutouts leave messy fringe colors. Kagazo uses sub-pixel alpha matting to feather edges naturally without green or dark halo rings.',
  },
  {
    badge: 'Error: Lost Transparency in JPG Export',
    title: 'JPEG Format Lack of Alpha Channel',
    desc: 'Saving transparent cutouts as JPG turns transparent areas black. Kagazo automatically sets background to clean white for JPG or transparent for PNG.',
  },
  {
    badge: 'Error: Cloud Privacy & Data Leaks',
    title: 'Uploading Biometric Photos to Servers',
    desc: 'Third-party APIs retain face data. Kagazo runs on-device WebAssembly, guaranteeing that personal photos never travel across the internet.',
  },
];

export default function RemoveBackgroundPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free Background Remover Online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/remove-background',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Remove image background automatically in browser online free. Export transparent PNG or solid white backdrop with zero server uploads.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Remove Background from Image Online in 5 Steps',
        description:
          'Step-by-step instructions to remove image background and create white backdrops.',
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
            name: 'Remove Background',
            item: 'https://kagazo.in/tools/remove-background',
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
          <span className="text-primary font-bold">Remove Background</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Zero-Upload In-Browser Neural Segmentation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Background Remover &amp; </span>
            <span className="text-primary">White Backdrop Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Remove image backgrounds automatically in your browser. Replace cluttered walls with pure <strong>white (#FFFFFF)</strong> for exam photos or export <strong>transparent PNGs</strong> with 100% privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <BackgroundRemoverEngine />

            {/* Post-Download Native AdSlot */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Local AI Segmentation
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Instant White Backdrops &amp; Transparent Cutouts in Browser RAM
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-main/85 leading-relaxed">
                Recruitment portals immediately reject photos taken against cluttered home walls or colorful curtains. Kagazo isolates your face and replaces the background with pure portal-compliant white (#FFFFFF).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Scissors className="w-4 h-4" /> Solid White Backdrop
                  </span>
                  <p className="text-xs text-text-main/70">
                    Instantly generates the pure white background mandatory for SSC, UPSC, and passport photos.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Transparent PNG Export
                  </span>
                  <p className="text-xs text-text-main/70">
                    Exports crisp transparent cutouts with clean sub-pixel alpha matting for graphics and logos.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> 100% In-Browser Privacy
                  </span>
                  <p className="text-xs text-text-main/70">
                    Neural segmentation runs directly on your device GPU. Private portraits are never uploaded.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Specification Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Official Background Standards Across Portals &amp; Use Cases
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                    Background color guidelines across government, corporate, and e-commerce platforms.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shrink-0">
                  Standards Matrix
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-semibold">
                      <th className="py-3 px-3">Application / Portal</th>
                      <th className="py-3 px-3">Mandatory Background</th>
                      <th className="py-3 px-3">Allowed Output Format</th>
                      <th className="py-3 px-3">Compliance Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker text-text-main/80">
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Passport Seva / Visa DS-160</td>
                      <td className="py-3 px-3 font-bold text-primary">Pure White (#FFFFFF)</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">JPEG (300 DPI)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Strict international biometric rule</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">SSC / UPSC / IBPS Recruitment</td>
                      <td className="py-3 px-3 font-bold text-primary">Light Plain / Pure White</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">JPEG (20–50 KB)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Ensures face recognition matching</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">E-Commerce Product Listings</td>
                      <td className="py-3 px-3 font-medium text-text-main">White or Transparent</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">PNG / WebP</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Amazon / Shopify listing standards</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-text-main">Graphic Design &amp; UI Mockups</td>
                      <td className="py-3 px-3 font-medium text-text-main">Transparent (Alpha)</td>
                      <td className="py-3 px-3 font-medium text-emerald-700">PNG (32-bit RGBA)</td>
                      <td className="py-3 px-3 text-xs text-text-main/70">Clean compositing in Canva / Figma</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Exam Preparation:</strong> For government exam applications, select the <strong>White Background</strong> option before downloading the JPEG to prevent automatic disqualification.
                </p>
              </div>
            </section>

            {/* How to Use Section in 5 Steps */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                How to Remove Background in 5 Steps
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {HOW_TO_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-wide">{s.title}</h3>
                    <p className="text-xs text-text-main/75 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Errors & Troubleshooting Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Common Background Removal Errors and How Kagazo Fixes Them
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {COMMON_ERRORS.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                      {err.badge}
                    </span>
                    <h3 className="text-xs font-bold text-text-main">{err.title}</h3>
                    <p className="text-xs text-text-main/80 leading-relaxed">{err.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Deep 10 FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions (Background Remover)
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Everything you need to know about AI edge segmentation and portal-ready white backdrops.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-black">Q{idx + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/80 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-4 space-y-4">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-image-to-50kb"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress Image to 50KB
                </Link>
                <Link
                  href="/tools/ssc-photo-signature-resizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  SSC Photo Resizer
                </Link>
                <Link
                  href="/tools/png-to-jpg"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  PNG to JPG Converter
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-xs font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Memory RAM Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Neural edge segmentation executes locally in device RAM. Personal portraits are never uploaded to cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  Download,
  Layers,
  CheckCircle2,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react';
import { BackgroundRemoverEngine } from '@/components/tools/BackgroundRemoverEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Full-HD AI Background Remover Free Online (No 500px Limit) | Kagazo',
  description:
    'Remove image backgrounds in 100% Full HD resolution without limits, sign-up, or watermarks. Download transparent PNG or replace with white, blue, or custom colors. 100% private in browser RAM.',
  alternates: {
    canonical: 'https://kagazo.in/tools/remove-background',
  },
  openGraph: {
    title: 'Full-HD Background Remover Online Free | Kagazo',
    description:
      'Zero 500px resolution limits. Keep your original 4K photo quality. Client-side in-browser background removal with transparent PNG & color replacement.',
    url: 'https://kagazo.in/tools/remove-background',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why does Kagazo not limit downloads to 500px like other websites?',
    answer:
      'Most commercial background removal tools run heavy cloud servers and intentionally downscale your image to 0.25 megapixels (500×500 px) to force you into paying subscription fees or buying credits for "HD" downloads. Kagazo processes your image entirely inside your own device’s browser memory via WebAssembly and HTML5 Canvas, eliminating server compute costs and letting us offer 100% full original resolution for free.',
  },
  {
    question: 'Can I replace the removed background with white or passport blue?',
    answer:
      'Yes! You can choose between Transparent PNG, Official Passport Pure White (#FFFFFF), Passport Light Blue (#B0C4DE), Light Grey, or any custom color using the built-in color picker. JPG outputs automatically include binary 300 DPI headers for government passport submission.',
  },
  {
    question: 'Can I batch remove backgrounds from multiple photos at once?',
    answer:
      'Yes. You can select or drag up to 20 images simultaneously. Our batch engine processes all photos with your preferred sensitivity and background settings, and allows you to download them individually or as a single ZIP archive.',
  },
  {
    question: 'Are my private photos uploaded to any external server?',
    answer:
      'Never. Kagazo guarantees 100% In-Browser Privacy. Every pixel calculation, color segmentation, and alpha feathering step executes locally in your browser’s volatile RAM. No images are sent over the internet or logged.',
  },
  {
    question: 'How do I fine-tune the edges if stray background colors remain?',
    answer:
      'Use the "Background Sensitivity" slider in the studio controls. Increase the slider if traces of background remain around hair or shoulders, or decrease it if clothing edges are getting clipped.',
  },
];

export default function RemoveBackgroundPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kagazo Full-HD In-Browser Background Remover',
        applicationCategory: 'PhotoEditingApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/remove-background',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Remove photo backgrounds online in Full HD without 500px resolution downgrades. 100% free, no watermark, private in-browser processing.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Remove Background in Full Resolution Online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Your Photo',
            text: 'Drop or select any JPG, PNG, or WebP photo. Files up to 4K resolution are supported.',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Background Style',
            text: 'Choose Transparent PNG or replace with White, Light Blue, or custom hex color.',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Sensitivity & Feathering',
            text: 'Fine-tune edge smoothing and color tolerance with real-time before/after comparison.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download Full HD Cutout',
            text: 'Download full original resolution PNG or 300 DPI JPG with zero watermarks.',
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
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-text-main/60 overflow-x-auto whitespace-nowrap py-1"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/tools" className="hover:text-primary transition-colors">
            Tools Directory
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-text-main font-bold">Remove Background (Full HD)</span>
        </nav>

        {/* 2-Column Responsive Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Hero Header Section */}
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-primary" />
                <span>FULL HD ORIGINAL RESOLUTION • NO 500PX LIMIT • 100% FREE</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
                Full-HD In-Browser AI Background Remover
              </h1>
              <p className="text-sm sm:text-base text-text-main/80 max-w-3xl leading-relaxed">
                Remove backgrounds from portraits, products, and signatures with surgical edge precision.
                Unlike commercial tools that downscale your photos to 500px, Kagazo preserves 100% of your
                original camera resolution with zero compression loss. 100% private in browser RAM.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-bold text-text-main/80">
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Full Resolution Output
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Layers className="w-3.5 h-3.5 text-primary" /> Transparent &amp; Custom Colors
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Sliders className="w-3.5 h-3.5 text-primary" /> Edge Feather &amp; Smoothing
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Lock className="w-3.5 h-3.5 text-primary" /> 100% Local Device Privacy
                </span>
              </div>
            </header>

            {/* In-Browser Interactive Background Remover Studio */}
            <BackgroundRemoverEngine mode="general" />

            {/* Post Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Comparison vs Commercial Tools Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Why Kagazo Beats Commercial Background Removers
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Direct feature comparison against traditional cloud background removal tools.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface/50 text-text-main font-bold">
                      <th className="p-3.5">Feature</th>
                      <th className="p-3.5 text-primary">Kagazo (Our Studio)</th>
                      <th className="p-3.5 text-text-main/60">remove.bg &amp; Commercial Tools</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-darker/60 text-text-main/80">
                    <tr>
                      <td className="p-3.5 font-bold">Free Download Resolution</td>
                      <td className="p-3.5 font-bold text-emerald-700">
                        100% Full Original (Up to 4K / 4000px)
                      </td>
                      <td className="p-3.5 text-red-600 font-semibold">
                        Capped at 500 × 500 px (0.25 MP)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">High-Res Download Cost</td>
                      <td className="p-3.5 font-bold text-emerald-700">₹0 (100% Free Forever)</td>
                      <td className="p-3.5 text-text-main/70">
                        $0.20 to $1.99 per image or monthly plan
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Account Registration</td>
                      <td className="p-3.5 font-bold text-emerald-700">No Sign-up / No Email</td>
                      <td className="p-3.5 text-text-main/70">Mandatory Login / OAuth</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Data Privacy Standard</td>
                      <td className="p-3.5 font-bold text-emerald-700">
                        100% In-Browser RAM (Zero Upload)
                      </td>
                      <td className="p-3.5 text-text-main/70">
                        Uploaded &amp; Processed on Cloud Servers
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Passport DPI Injection</td>
                      <td className="p-3.5 font-bold text-emerald-700">
                        Yes (300 DPI / 600 DPI JFIF)
                      </td>
                      <td className="p-3.5 text-text-main/70">No (Standard 72 DPI)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Frequently asked questions about Full HD background removal.
                </p>
              </div>

              <div className="divide-y divide-surface-darker">
                {FAQS.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                    <h3 className="text-sm font-bold text-text-main flex items-start gap-2">
                      <span className="text-primary font-mono text-xs mt-0.5">0{index + 1}.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-main/75 pl-5 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Rail (xl:col-span-2) */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4">
            {/* Quick Actions Rail */}
            <div className="bg-white rounded-2xl border border-surface-darker p-3 shadow-card space-y-2">
              <span className="text-[10px] font-extrabold text-text-main/60 uppercase tracking-wider block px-1">
                Related Image Studios
              </span>

              <div className="space-y-1">
                <Link
                  href="/tools/passport-white-background"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      White Background
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    White
                  </span>
                </Link>

                <Link
                  href="/tools/passport-photo-maker"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Passport Photo Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    35×45
                  </span>
                </Link>

                <Link
                  href="/tools/heic-to-jpg"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      iPhone HEIC to JPG
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    HEIC
                  </span>
                </Link>

                <Link
                  href="/tools/change-image-dpi"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Change Image DPI
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    DPI
                  </span>
                </Link>
              </div>
            </div>

            {/* Compact Sticky Sidebar Ad Slot */}
            <AdSlot slot="sidebar" />

            {/* Sovereign RAM Privacy Box */}
            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Your private photos are segmented exclusively in local browser RAM. No images ever leave your device.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Full HD Export
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Zero Cloud Upload
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

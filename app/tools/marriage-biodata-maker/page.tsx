import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  HelpCircle,
  FileDown,
  Sparkles,
  Share2,
  CheckCircle2,
  Printer,
  Palette,
  Users,
} from 'lucide-react';
import { MarriageBiodataEngine } from '@/components/tools/MarriageBiodataEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Marriage Bio-Data Maker Online Free (No Watermark & PDF Download) | Kagazo',
  description:
    'Create an elegant, professional marriage biodata format in English, Hindi, Tamil, Telugu, and Marathi. 6 royal cultural themes (Vedic, Royal Gold, South Indian, Modern, Islamic Nikah, Christian). 100% free with instant A4 PDF & WhatsApp image export.',
  alternates: {
    canonical: 'https://kagazo.in/tools/marriage-biodata-maker',
  },
  openGraph: {
    title: 'Free Marriage Biodata Maker with A4 PDF & WhatsApp Share | Kagazo',
    description:
      'Generate stunning matrimonial biodata for Hindu, Muslim, Christian, and Jain marriages. Zero watermarks, zero sign-up, 100% private in browser.',
    url: 'https://kagazo.in/tools/marriage-biodata-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Is this Marriage Biodata Maker completely free and without watermark?',
    answer:
      'Yes, 100% free forever. Unlike other websites that display a free editor but charge ₹49 to ₹199 or slap ugly watermarks when you click download, Kagazo generates clean, high-resolution, watermark-free A4 PDFs and WhatsApp images entirely in your local browser.',
  },
  {
    question: 'How do I download the biodata for WhatsApp matrimonial sharing?',
    answer:
      'Click the "WhatsApp Image (PNG)" button at the top or bottom of the studio. Kagazo will render an ultra-crisp, mobile-optimized JPEG/PNG of your biodata that can be sent directly to prospective families or matrimonial groups without needing a PDF reader.',
  },
  {
    question: 'Are my personal details, phone numbers, or photos stored on your server?',
    answer:
      'Never. Kagazo operates on a 100% Sovereign Client-Side Privacy architecture. All text inputs, photo cropping, horoscope details, and PDF rendering occur in your browser’s volatile RAM memory. Zero bytes are uploaded, logged, or saved to any cloud database.',
  },
  {
    question: 'Which cultural themes and religious crests are available?',
    answer:
      'We offer 6 cultural themes: Vedic Traditional (Maroon & Gold), Royal Gold & Emerald, South Indian Classic (Kanjivaram Temple border), Modern Minimalist (Corporate Navy & Slate), Islamic Nikah (Arabesque Emerald with Bismillah), and Christian Grace (Burgundy with Holy Cross). You can also choose from Hindu, Sikh, Islamic, Christian, or secular header crests.',
  },
  {
    question: 'Can I create a biodata without horoscope or astrological details?',
    answer:
      'Yes! Under the "Horoscope" tab, simply uncheck the "Include Astrology Section" toggle. The biodata will dynamically rearrange itself to focus on your education, career achievements, lifestyle, and family background.',
  },
];

export default function MarriageBiodataMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Kagazo Free Marriage Bio-Data Maker Studio',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/marriage-biodata-maker',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Create elegant, watermark-free matrimonial bio-data with high-resolution A4 print PDF and WhatsApp image download. 100% private in browser RAM.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Marriage Biodata Online for Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose a Preset or Cultural Theme',
            text: 'Select from 6 cultural vector themes such as Vedic, Royal Gold, South Indian, or Islamic Nikah, or click a 1-click sample profile.',
          },
          {
            '@type': 'HowToStep',
            name: 'Fill In Personal, Career & Family Details',
            text: 'Enter the applicant’s name, education, designation, family background, and optional horoscope information.',
          },
          {
            '@type': 'HowToStep',
            name: 'Upload Photo & Choose Frame Style',
            text: 'Add a passport or portrait photograph with oval, rounded rectangle, or square framing.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download High-Res A4 PDF or WhatsApp Image',
            text: 'Download an uncompressed print-ready A4 PDF or instant WhatsApp sharing image with zero watermarks.',
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
          <span className="text-text-main font-bold">Marriage Biodata Maker</span>
        </nav>

        {/* 2-Column Responsive Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Hero Header Section */}
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-primary" />
                <span>100% FREE • NO WATERMARK • A4 PDF &amp; WHATSAPP</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
                Free Marriage Bio-Data Maker Studio
              </h1>
              <p className="text-sm sm:text-base text-text-main/80 max-w-3xl leading-relaxed">
                Create a prestigious, royal matrimonial biodata in minutes. Choose from 6 rich cultural
                themes, customize religious crests, and export high-resolution print A4 PDFs and instant
                WhatsApp shareable cards. No account sign-up, no hidden fees, and zero watermarks.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-bold text-text-main/80">
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Palette className="w-3.5 h-3.5 text-primary" /> 6 Cultural Themes
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <FileDown className="w-3.5 h-3.5 text-emerald-600" /> Print-Ready A4 PDF
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Direct Share
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-2.5 py-1 rounded-xl">
                  <Lock className="w-3.5 h-3.5 text-primary" /> 100% Local RAM Privacy
                </span>
              </div>
            </header>

            {/* In-Browser Interactive Biodata Engine */}
            <MarriageBiodataEngine />

            {/* Post Download Ad Slot */}
            <AdSlot slot="post_download" />

            {/* Cultural Themes & Formats Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  6 Prestigious Cultural Matrimonial Themes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Carefully calibrated visual styles honoring Indian matrimonial traditions and modern aesthetics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#7F1D1D]">
                    <span className="w-3 h-3 rounded-full bg-[#7F1D1D]" />
                    <span>Vedic Traditional (Maroon &amp; Gold)</span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    Sacred auspicious maroon border with golden filigree trims, Ganesh / Om crests, and classical typography.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#064E3B]">
                    <span className="w-3 h-3 rounded-full bg-[#064E3B]" />
                    <span>Royal Gold &amp; Emerald</span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    Regal emerald green frames with rich golden accents, ideal for aristocratic and luxury family presentations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#831843]">
                    <span className="w-3 h-3 rounded-full bg-[#831843]" />
                    <span>South Indian Classic (Temple Border)</span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    Inspired by Kanjivaram silk sari zari borders, deep ruby accents, and auspicious temple architectural motifs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                    <span className="w-3 h-3 rounded-full bg-slate-900" />
                    <span>Modern Minimalist (Executive)</span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    Sleek corporate navy and crisp slate grey styling tailored for software engineers, consultants, and doctors.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#065F46]">
                    <span className="w-3 h-3 rounded-full bg-[#065F46]" />
                    <span>Islamic Nikah (Emerald Arabesque)</span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    Dignified emerald green borders with Arabic Bismillah calligraphy header, crescent emblem, and Deeni values.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-surface-darker space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#4C0519]">
                    <span className="w-3 h-3 rounded-full bg-[#4C0519]" />
                    <span>Christian Elegance (Burgundy Grace)</span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-relaxed">
                    Sophisticated burgundy framing with Holy Cross symbol, refined serif typography, and church parish details.
                  </p>
                </div>
              </div>
            </section>

            {/* In-Content Native AdSlot */}
            <AdSlot slot="in_content" />

            {/* FAQ Accordion Section */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
                  Everything you need to know about creating matrimonial biodata for marriage.
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
                Matrimonial Tools
              </span>

              <div className="space-y-1">
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
                    Photo
                  </span>
                </Link>

                <Link
                  href="/tools/sign-pdf"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Sign PDF Online
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    Sign
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
                  href="/tools/compress-pdf-to-200kb"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Compress PDF 200KB
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-text-main/60 bg-white px-1.5 py-0.5 rounded border border-surface-darker shrink-0">
                    200KB
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
                Your family data, contact details, and photos are processed exclusively in client-side RAM. Never saved or tracked.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-emerald-700 pt-0.5">
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ No Watermark
                </span>
                <span className="bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                  ✓ Free PDF
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

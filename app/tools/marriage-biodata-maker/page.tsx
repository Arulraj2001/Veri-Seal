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
} from 'lucide-react';
import { MarriageBiodataEngine } from '@/components/tools/MarriageBiodataEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free Marriage Bio-Data Maker Online (A4 PDF & WhatsApp Format) | Kagazo',
  description: 'Create beautiful Hindu, Muslim, Christian, and Jain marriage biodata online. Elegant templates, horoscope kundali details, family background, and photo. Download print-ready A4 PDF and WhatsApp image instantly with 100% privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/marriage-biodata-maker',
  },
  openGraph: {
    title: 'Free Marriage Bio-Data Maker Online (A4 PDF & WhatsApp Format) | Kagazo',
    description: 'Create beautiful Hindu, Muslim, Christian, and Jain marriage biodata online. Elegant templates, horoscope kundali details, family background, and photo. Download print-ready A4 PDF and WhatsApp image instantly with 100% privacy.',
    url: 'https://kagazo.in/tools/marriage-biodata-maker',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Marriage Bio-Data Maker Online (A4 PDF & WhatsApp Format) | Kagazo',
    description: 'Create beautiful Hindu, Muslim, Christian, and Jain marriage biodata online. Elegant templates, horoscope kundali details, family background, and photo. Download print-ready A4 PDF and WhatsApp image instantly with 100% privacy.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Profile Theme",
    "desc": "Choose from Traditional Vedic, Modern Executive, Floral Elegance, or Minimalist 1-Page layouts."
  },
  {
    "step": 2,
    "title": "Input Personal Details",
    "desc": "Fill in your name, birth date, height, education, current profession, and annual income details."
  },
  {
    "step": 3,
    "title": "Add Family & Kundali",
    "desc": "Enter parents occupation, sibling details, and optional astrological parameters (Rasi, Nakshatra, Gothra)."
  },
  {
    "step": 4,
    "title": "Upload Formal Portrait",
    "desc": "Attach a bright, clear portrait photograph. Crop and center with automatic aspect ratio alignment."
  },
  {
    "step": 5,
    "title": "Download PDF & Image",
    "desc": "Generate a high-definition A4 PDF ready for color printing and an optimized image for WhatsApp sharing."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "Error: Multi-Page Overflow",
    "title": "Spilling Onto an Incomplete Second Page",
    "desc": "Biodata that spills 3-4 lines onto page 2 looks untidy. Kagazo dynamically balances margins and font sizes to strictly lock content onto 1 clean A4 page."
  },
  {
    "badge": "Error: Low-Resolution Photo",
    "title": "Pixelated or Blurry Selfie Attachments",
    "desc": "Uploading cropped group photos or low-light casual selfies creates poor first impressions. Use a high-contrast formal portrait with plain background."
  },
  {
    "badge": "Error: Missing Critical Identifiers",
    "title": "Omitting Gothra, Native Place, or Job Location",
    "desc": "Leaving out basic cultural or geographic information leads to repetitive clarification calls. Ensure all essential baseline fields are populated."
  },
  {
    "badge": "Error: Privacy Overexposure",
    "title": "Sharing Exact House Door Numbers Online",
    "desc": "Circulating exact street addresses on public matrimonial WhatsApp groups poses privacy risks. Share locality/city first and disclose street address upon mutual interest."
  }
];

const FAQS = [
  {
    "question": "Is my personal biodata information stored on Kagazo servers?",
    "answer": "No. Kagazo operates entirely client-side inside your web browser memory (RAM). Your photographs, phone numbers, family details, and financial income are never uploaded to any remote server or stored in a database."
  },
  {
    "question": "Can I download the marriage biodata in both PDF and Image formats?",
    "answer": "Yes. You can export a vector-quality A4 PDF for high-resolution color printing on bond paper, as well as an optimized JPEG/PNG formatted specifically for fast WhatsApp and Telegram messaging."
  },
  {
    "question": "How do I include Horoscope and Kundali details in the biodata?",
    "answer": "Kagazo provides dedicated astrological fields for Rasi (Moon sign), Nakshatra (Birth star), Lagnam (Ascendant), Gothram, and Dosham/Manglik status, neatly styled in an optional cultural table."
  },
  {
    "question": "What is the ideal length for an Indian marriage biodata?",
    "answer": "The gold standard is exactly 1 single A4 page. A concise 1-page profile allows prospective families to evaluate education, occupation, horoscope, and family background in under 30 seconds."
  },
  {
    "question": "What kind of photograph should I include on my matrimonial biodata?",
    "answer": "Use a recent, well-lit formal or semi-formal portrait taken from the chest up. Avoid sunglasses, heavy Instagram filters, cropped group photos, or casual outdoor selfies."
  },
  {
    "question": "Can I create biodata in Indian languages like Hindi, Tamil, or Telugu?",
    "answer": "Yes. Kagazo supports Unicode characters, allowing you to enter names, family details, and gotra in Hindi (Devanagari), Tamil, Telugu, Kannada, Gujarati, or Marathi alongside English."
  },
  {
    "question": "Is this marriage biodata maker completely free to use?",
    "answer": "Yes. Kagazo provides 100% free access to all biodata templates, PDF generation, and photo attachments without requiring signups, credit cards, or hidden paywalls."
  },
  {
    "question": "Can I customize the color scheme and fonts of my biodata?",
    "answer": "Yes. You can select from curated royal gold, elegant burgundy, deep navy, and modern minimalist monochrome color palettes with matching typography suited for matrimonial profiles."
  },
  {
    "question": "What should I do if my text overflows to a second page?",
    "answer": "Use Kagazo built-in compact mode toggle, reduce font scaling slightly, or trim non-essential hobby details so your entire profile fits seamlessly onto one crisp A4 sheet."
  },
  {
    "question": "How can I print my marriage biodata with optimal quality?",
    "answer": "Download the generated vector A4 PDF, open it in any standard PDF reader, set printer scaling to 100% (Actual Size), and print on 100\u2013120 GSM premium matte or ivory paper."
  }
];

export default function MarriageBiodataMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Marriage Bio-Data Maker Online',
        url: 'https://kagazo.in/tools/marriage-biodata-maker',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Create beautiful Hindu, Muslim, Christian, and Jain marriage biodata online. Elegant templates, horoscope kundali details, family background, and photo. Download print-ready A4 PDF and WhatsApp image instantly with 100% privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Marriage Biodata in 5 Steps',
        description: 'Step-by-step verified workflow instructions for Marriage Bio-Data Maker Online.',
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
            name: 'Marriage Bio-Data Maker Online',
            item: 'https://kagazo.in/tools/marriage-biodata-maker',
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
          <span className="text-primary font-bold">Marriage Bio-Data Maker Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>A4 PDF & WhatsApp Image • 100% In-RAM Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>Free Marriage Bio-Data </span>
            <span className="text-primary">Maker Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create beautiful Hindu, Muslim, Christian, and Jain marriage biodata online. Elegant templates, horoscope kundali details, family background, and photo. Download print-ready A4 PDF and WhatsApp image instantly with 100% privacy.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <MarriageBiodataEngine />

            {/* Post-Action Native Ad Placement */}
            <AdSlot slot="post_download" />

            {/* Key Differentiators Showcase */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering &amp; Compliance Excellence
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  Key Technical Features &amp; Architecture
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Cultural Templates
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Pre-formatted layouts for Hindu Vedic, Muslim Nikah, Christian, and contemporary executive matrimonial profiles.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> 100% In-RAM Privacy
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Sensitive family details, contact numbers, and personal photographs never touch our servers or cloud storage.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Dual Export Formats
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Instant high-resolution A4 vector PDF for crisp color printing plus compressed JPEG optimized for WhatsApp sharing.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    Standard Matrimonial Biodata Architecture & Guidelines
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative standards, formatting thresholds, and official regulatory guidelines:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  2026 Format Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Section Component</th><th className="py-2.5 px-3 font-bold">Essential Field Details</th><th className="py-2.5 px-3 font-bold">Recommended Formatting</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Personal Particulars</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Full Name, DOB, Time of Birth, Place of Birth, Height, Complexion, Blood Group</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Bold headers, chronological layout</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Educational & Professional</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Highest Degree, College/University, Current Designation, Employer Name, Annual CTC / Income</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Professional clarity, avoid abbreviations</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Horoscope / Kundali Details</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Rasi, Nakshatram, Lagnam, Gothram, Manglik / Dosham status (if applicable)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Optional tabular astrological grid</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Family Background</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Father's Name & Occupation, Mother's Name, Siblings (Married/Unmarried), Native Place, Family Values</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Clear nuclear / joint family hierarchy</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Contact & Communication</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Parent / Candidate Contact Number, Residential Address, Email, Preferred Calling Hours</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Prominent placement at document footer</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Document Sizing</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">A4 Page (210 x 297 mm), High-Res Photo (3.5 x 4.5 cm portrait, min 300 DPI)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly fit within 1 or 2 clean A4 pages</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Create a Marriage Biodata in 5 Steps
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Follow this verified 5-step process for instant compliance and verified results:
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
                  Common Matrimonial Biodata Mistakes & Fixes
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Avoid common formatting errors, legal omissions, and calculation pitfalls:
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
                    Comprehensive technical, legal, and operational answers
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
                Biodata Standards
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Standard Canvas</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    A4 Page (210 x 297 mm) with 15mm border margins.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Ideal Length</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Strict 1-page format for maximum reader retention.
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Privacy Safe</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    100% client-side rendering with instant RAM purge.
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
                  href="/tools/free-ats-resume-builder"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Free ATS Resume Builder
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Career
                  </span>
                </Link>
                <Link
                  href="/tools/affidavit-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      Bilingual Affidavit Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Legal
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
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Photo
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
                All calculations and document drafting occur strictly inside your device browser memory. Zero records, identity details, or files are sent to remote cloud servers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

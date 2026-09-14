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
import { WhatsAppLinkEngine } from '@/components/tools/WhatsAppLinkEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free WhatsApp Link Generator with Pre-filled Message & QR Code | Kagazo',
  description: 'Create official WhatsApp click-to-chat links (wa.me) with pre-filled messages and custom QR codes for free. Clean E.164 international phone formatting, 100% client-side generation, and instant WhatsApp Web & App compatibility.',
  alternates: {
    canonical: 'https://kagazo.in/tools/whatsapp-link-generator',
  },
  openGraph: {
    title: 'Free WhatsApp Link Generator with Pre-filled Message & QR Code | Kagazo',
    description: 'Create official WhatsApp click-to-chat links (wa.me) with pre-filled messages and custom QR codes for free. Clean E.164 international phone formatting, 100% client-side generation, and instant WhatsApp Web & App compatibility.',
    url: 'https://kagazo.in/tools/whatsapp-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free WhatsApp Link Generator with Pre-filled Message & QR Code | Kagazo',
    description: 'Create official WhatsApp click-to-chat links (wa.me) with pre-filled messages and custom QR codes for free. Clean E.164 international phone formatting, 100% client-side generation, and instant WhatsApp Web & App compatibility.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Select Country Code",
    "desc": "Choose your international country code (e.g., +91 India, +1 US/Canada, +44 UK) from the quick selector."
  },
  {
    "step": 2,
    "title": "Enter WhatsApp Number",
    "desc": "Input your mobile or WhatsApp Business phone number without spaces or special symbols."
  },
  {
    "step": 3,
    "title": "Draft Pre-Filled Message",
    "desc": "Type your custom greeting or order inquiry message (emojis, line breaks, and formatting supported)."
  },
  {
    "step": 4,
    "title": "Preview Real-Time Link & QR",
    "desc": "Verify the encoded wa.me URL and test the live direct-chat button in your browser or phone."
  },
  {
    "step": 5,
    "title": "Copy Link or Download QR",
    "desc": "Copy the one-click short link for your Instagram/website bio, or download the printable high-res QR code."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "SYNTAX ERROR #1",
    "title": "Including Plus Signs (+), Dashes, or Spaces",
    "desc": "WhatsApp wa.me links require pure digits. Including \"+91-98765...\" breaks the URL router. Our generator automatically strips all formatting characters."
  },
  {
    "badge": "PREFIX ZERO TRAP",
    "title": "Retaining Leading Zeros After Country Code",
    "desc": "In countries like the UK (+44), domestic numbers start with 0 (e.g. 07123...). When combining with country code, the leading zero must be omitted (+447123...)."
  },
  {
    "badge": "ENCODING FAILURE",
    "title": "Unencoded Emojis & Line Breaks",
    "desc": "Raw emojis or line breaks in URL parameters cause truncation. Our engine encodes line breaks into %0A and spaces into %20 for flawless formatting."
  },
  {
    "badge": "NON-WHATSAPP NUMBER",
    "title": "Linking to Landlines or Inactive Numbers",
    "desc": "WhatsApp displays \"Phone number is not on WhatsApp\" if the target number lacks an active account. Verify the number on WhatsApp before publishing."
  }
];

const FAQS = [
  {
    "question": "How does a WhatsApp click-to-chat link work?",
    "answer": "WhatsApp click-to-chat uses the official Meta `https://wa.me/<number>` URL protocol. When a customer taps your link or scans the QR code on mobile or desktop, WhatsApp immediately opens a direct conversation with your number\u2014without requiring them to manually save your contact to their phone address book."
  },
  {
    "question": "What is the correct phone number format for WhatsApp links?",
    "answer": "Phone numbers must be formatted in international E.164 standard using only digits: country code followed by the phone number, without any plus signs (+), dashes (-), brackets, spaces, or leading zeros. For example, use 919876543210 (for India +91) or 15551234567 (for US/Canada +1)."
  },
  {
    "question": "How do I add line breaks and emojis to my pre-filled message?",
    "answer": "Type your message naturally with enter/return keys and emoji symbols in our input box. Our engine automatically percent-encodes line breaks as `%0A` and emojis into valid UTF-8 URL parameters so they appear formatted inside the WhatsApp message composer."
  },
  {
    "question": "Can I use this link on my Instagram bio, TikTok, and YouTube channels?",
    "answer": "Yes. The generated `https://wa.me/...` URL is a standard web link. You can paste it directly into your Instagram Bio website field, YouTube video descriptions, TikTok profile, or Facebook page CTA buttons."
  },
  {
    "question": "Does this work with WhatsApp Business accounts?",
    "answer": "Yes. It works identically with standard personal WhatsApp accounts and official WhatsApp Business accounts, making it ideal for customer support, lead capture, and appointment booking."
  },
  {
    "question": "Can I track clicks on my WhatsApp link in Google Analytics?",
    "answer": "Yes. You can append UTM parameters or wrap the generated wa.me link with URL shorteners (like Bitly) or use our UTM Link Generator tool to track conversion sources across marketing campaigns."
  },
  {
    "question": "Can customers see my personal phone number when clicking the link?",
    "answer": "Yes. Because WhatsApp accounts are inherently tied to telephone numbers, the target phone number is visible in the wa.me URL structure and at the top of the chat header."
  },
  {
    "question": "How do I use the generated QR code for my physical store or restaurant?",
    "answer": "Download the high-resolution QR code PNG image and print it on table tents, cashier counter displays, posters, or packaging stickers. Customers simply aim their phone camera at the QR code to start chatting with your team."
  },
  {
    "question": "Is my phone number or customer message stored on your servers?",
    "answer": "No. The entire link construction and QR code rendering process runs 100% inside your local browser memory. Zero phone numbers, business records, or messages are ever transmitted to or stored on our servers."
  },
  {
    "question": "Is there any fee or limit on how many WhatsApp links I can generate?",
    "answer": "No. Our WhatsApp Link Generator is 100% free with unlimited link generation, no account sign-up required, and zero expiration dates."
  }
];

export default function WhatsAppLinkGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'WhatsApp Link Generator Online',
        url: 'https://kagazo.in/tools/whatsapp-link-generator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Create official WhatsApp click-to-chat links (wa.me) with pre-filled messages and custom QR codes for free. Clean E.164 international phone formatting, 100% client-side generation, and instant WhatsApp Web & App compatibility.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate WhatsApp Click-to-Chat Links & QR Codes',
        description: 'Step-by-step verified workflow instructions for WhatsApp Link Generator Online.',
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
            name: 'WhatsApp Link Generator Online',
            item: 'https://kagazo.in/tools/whatsapp-link-generator',
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
          <span className="text-primary font-bold">WhatsApp Link Generator Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official WhatsApp API (wa.me) Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>WhatsApp Link Generator </span>
            <span className="text-primary">Click to Chat & QR Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create official WhatsApp click-to-chat links (wa.me) with pre-filled messages and custom QR codes for free. Clean E.164 international phone formatting, 100% client-side generation, and instant WhatsApp Web & App compatibility.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <WhatsAppLinkEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Official wa.me Deep Linking
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generates clean, official Meta WhatsApp click-to-chat URLs that open directly in WhatsApp Mobile or WhatsApp Web without saving the contact.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Instant Countertop QR Code
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically produces a high-contrast printable QR code alongside your link, perfect for retail counters, table menus, and business flyers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> E.164 Smart Sanitization
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically strips illegal symbols, country code plus signs, dashes, and leading zeros to guarantee 100% error-free routing.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    WhatsApp Click-to-Chat & wa.me Architecture
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  WhatsApp API & E.164 Standard
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">WhatsApp Official Standard</th><th className="py-2.5 px-3 font-bold">Format Requirement</th><th className="py-2.5 px-3 font-bold">Implementation Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">URL Architecture</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">https://wa.me/(phone)?text=(message)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Official Meta WhatsApp endpoint</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Universal deep link routing to app or web</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Phone Number Standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ITU-T E.164 International Format</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Country Code + Number (Digits Only)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">No plus (+), dashes (-), spaces, or prefix zeros</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Message Encoding</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">RFC 3986 Percent-Encoding</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">UTF-8 URL Encoded Parameters</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Full support for emojis, special chars, & line breaks</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Cross-Platform Routing</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Universal Deep Linking Protocol</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">WhatsApp iOS, Android, Web, Desktop</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Seamless direct chat opening without contact save</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">QR Code Standard</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO/IEC 18004 Model 2 QR Code</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Version 3 to 6 Matrix (High Contrast)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Ready for print displays on counters & flyers</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Privacy & Data Handling</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">100% Client-Side In-RAM</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero database logging or message tracking</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Phone numbers and text never sent to external servers</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate WhatsApp Click-to-Chat Links & QR Codes
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
                  Common WhatsApp Link Errors & Quick Solutions
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
                WhatsApp Link Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">URL Protocol</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Official https://wa.me/
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Phone Format</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    E.164 Pure Digits (No +)
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Encoding</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    RFC 3986 UTF-8 Encoding
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">QR Code</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Printable 300 DPI Grid
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
                  href="/tools/qr-code-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      QR Code Generator
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    QR Code
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
                <Link
                  href="/tools/paypal-link-generator"
                  className="flex items-center justify-between p-2 rounded-xl bg-surface hover:bg-primary-light/50 border border-surface-darker hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-[11px] font-bold text-text-main group-hover:text-primary transition-colors truncate">
                      PayPal Link Maker
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                    Payment
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

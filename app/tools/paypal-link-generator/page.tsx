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
import { PaypalLinkGeneratorEngine } from '@/components/tools/PaypalLinkGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Free PayPal Link Generator (Custom Payment & Donation URL Builder) | Kagazo',
  description: 'Create official PayPal.me and checkout payment links online for free. Support for fixed amounts, custom donations, multi-currency selection (USD, EUR, GBP, CAD), and 100% client-side security.',
  alternates: {
    canonical: 'https://kagazo.in/tools/paypal-link-generator',
  },
  openGraph: {
    title: 'Free PayPal Link Generator (Custom Payment & Donation URL Builder) | Kagazo',
    description: 'Create official PayPal.me and checkout payment links online for free. Support for fixed amounts, custom donations, multi-currency selection (USD, EUR, GBP, CAD), and 100% client-side security.',
    url: 'https://kagazo.in/tools/paypal-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PayPal Link Generator (Custom Payment & Donation URL Builder) | Kagazo',
    description: 'Create official PayPal.me and checkout payment links online for free. Support for fixed amounts, custom donations, multi-currency selection (USD, EUR, GBP, CAD), and 100% client-side security.',
  },
};

const HOW_TO_STEPS = [
  {
    "step": 1,
    "title": "Enter PayPal Handle or Email",
    "desc": "Input your registered PayPal.me username (e.g. yourname) or your verified PayPal account email."
  },
  {
    "step": 2,
    "title": "Specify Payment Amount",
    "desc": "Set a fixed checkout amount (e.g. 25.00) or leave the field blank to allow the payer to enter a custom donation amount."
  },
  {
    "step": 3,
    "title": "Select Currency Code",
    "desc": "Choose your receiving currency (USD, EUR, GBP, CAD, AUD, etc.) matching your PayPal account balance settings."
  },
  {
    "step": 4,
    "title": "Review Live Payment URL",
    "desc": "Verify the structured PayPal link preview and test its direct routing in a new browser tab."
  },
  {
    "step": 5,
    "title": "Copy Link or HTML Code",
    "desc": "Copy the shareable payment link for social media bios or copy the pre-formatted HTML button code for your website."
  }
];

const COMMON_ERRORS = [
  {
    "badge": "HANDLE SYNTAX ERROR",
    "title": "Including \"@\" or Full URLs in Username Field",
    "desc": "PayPal.me handles should only contain the clean username string (e.g., \"johndoe\", not \"@johndoe\" or \"https://paypal.me/johndoe\")."
  },
  {
    "badge": "CURRENCY MISMATCH",
    "title": "Requesting Unactivated Foreign Currencies",
    "desc": "If your PayPal account is not configured to accept foreign currencies, PayPal may auto-convert at a fee or reject payment. Enable multi-currency in PayPal wallet settings."
  },
  {
    "badge": "PHISHING WARNING",
    "title": "Using Unverified URL Shorteners on Payment Links",
    "desc": "Wrapping PayPal links in obscure third-party shorteners triggers security warnings in email clients. Use clean, direct paypal.me links whenever possible."
  },
  {
    "badge": "DECIMAL FORMATTING",
    "title": "Using Commas Instead of Period for Cents",
    "desc": "PayPal.me URLs use periods for decimal amounts (e.g., \"19.99\", not \"19,99\"). Our generator automatically formats decimal separators."
  }
];

const FAQS = [
  {
    "question": "What is a PayPal.me link and how does it work?",
    "answer": "PayPal.me is an official personalized payment link service created by PayPal. By sharing your custom URL (such as `paypal.me/username/25USD`), customers and clients can send money to your PayPal account instantly without having to ask for your email address."
  },
  {
    "question": "How do I create a PayPal link with a pre-set fixed price?",
    "answer": "Enter your PayPal.me username, type your desired price (e.g. 50), and select your currency (e.g. USD). The generator appends the amount and currency code directly to the URL (e.g., `https://paypal.me/username/50USD`), locking in the amount when the page loads."
  },
  {
    "question": "Can I create a link where the payer enters their own donation amount?",
    "answer": "Yes. Simply leave the amount field empty. The resulting link (e.g., `https://paypal.me/username`) opens your payment profile with an open text box where donors or supporters can enter any amount they choose."
  },
  {
    "question": "Does the sender need a PayPal account to pay me?",
    "answer": "In most countries, PayPal provides a guest checkout option allowing payers to pay directly with a credit card, debit card, or local banking method without creating or logging into a PayPal account."
  },
  {
    "question": "Where can I share my generated PayPal payment link?",
    "answer": "You can share it anywhere on the internet: in your Instagram or Twitter bio, YouTube video descriptions, freelance invoices, SMS text messages, Discord servers, or embedded as a button on your website."
  },
  {
    "question": "What currencies are supported by PayPal payment links?",
    "answer": "PayPal supports 25+ major global currencies including USD (US Dollar), EUR (Euro), GBP (British Pound), CAD (Canadian Dollar), AUD (Australian Dollar), JPY (Japanese Yen), SGD (Singapore Dollar), and CHF (Swiss Franc)."
  },
  {
    "question": "Does Kagazo charge any fees for generating PayPal links?",
    "answer": "No. Kagazo is 100% free and charges zero commissions, transaction fees, or subscription costs. Standard merchant or personal transfer fees charged by PayPal still apply when funds are received."
  },
  {
    "question": "How do I set up my PayPal.me username if I don't have one yet?",
    "answer": "Log into your account at PayPal.com, navigate to Profile Settings -> PayPal.me, and choose your unique personal or business handle. Once created, you can use that handle in our tool."
  },
  {
    "question": "Is my financial data or PayPal password required here?",
    "answer": "No. We never ask for your PayPal password, API keys, or financial credentials. Our tool only structures publicly accessible paypal.me web links 100% within your local browser memory."
  },
  {
    "question": "Can I embed the link as a \"Pay with PayPal\" button on my website?",
    "answer": "Yes. Our tool provides a pre-formatted HTML snippet (`<a href=\"...\" class=\"paypal-button\">Pay Now</a>`) that you can copy and paste directly into WordPress, Wix, Squarespace, or custom HTML sites."
  }
];

export default function PaypalLinkGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PayPal Link Generator Online',
        url: 'https://kagazo.in/tools/paypal-link-generator',
        applicationCategory: 'FinancialApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Create official PayPal.me and checkout payment links online for free. Support for fixed amounts, custom donations, multi-currency selection (USD, EUR, GBP, CAD), and 100% client-side security.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate Custom PayPal Payment & Donation Links',
        description: 'Step-by-step verified workflow instructions for PayPal Link Generator Online.',
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
            name: 'PayPal Link Generator Online',
            item: 'https://kagazo.in/tools/paypal-link-generator',
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
          <span className="text-primary font-bold">PayPal Link Generator Online</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Official PayPal API & PayPal.me Format</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span>PayPal Link Generator </span>
            <span className="text-primary">Payment & Donation URL Studio</span>
          </h1>

          <p className="text-base sm:text-lg text-text-main/80 leading-relaxed font-normal">
            Create official PayPal.me and checkout payment links online for free. Support for fixed amounts, custom donations, multi-currency selection (USD, EUR, GBP, CAD), and 100% client-side security.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            {/* Interactive Engine Canvas */}
            <PaypalLinkGeneratorEngine />

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
                    <Sparkles className="w-4 h-4 text-primary" /> Official PayPal.me Architecture
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Generates official, trusted PayPal.me payment URLs that route buyers directly to PayPal verified checkout pages with zero intermediary redirects.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Multi-Currency Global Support
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Seamlessly configure payments across 25+ global currencies including USD ($), EUR (€), GBP (£), CAD, AUD, and SGD.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker/60 space-y-1.5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> One-Click HTML Button Snippet
                  </span>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    Automatically creates embeddable HTML anchor tags and button snippets ready to paste into your website, blog, or email signature.
                  </p>
                </div>
              </div>
            </section>

            {/* Official Specifications & Reference Table */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-darker pb-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-text-main">
                    PayPal Payment Link Architecture & Standards
                  </h2>
                  <p className="text-xs text-text-main/70">
                    Authoritative technical parameters, protocol thresholds, and format standards:
                  </p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
                  Official PayPal Protocol
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-surface-darker bg-surface text-text-main font-bold">
                      <th className="py-2.5 px-3 font-bold">Parameter</th><th className="py-2.5 px-3 font-bold">Standard Specification</th><th className="py-2.5 px-3 font-bold">Format Requirement</th><th className="py-2.5 px-3 font-bold">Supported Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">URL Architecture</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">https://paypal.me/(username)/(amount)(currency)</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Official PayPal endpoint</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Direct mobile & desktop checkout routing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Supported Currencies</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">ISO 4217 Currency Codes</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">3-Letter Alphabetic Code</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">USD, EUR, GBP, CAD, AUD, JPY, INR, SGD, CHF</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Payment Modes</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Fixed Amount or Open Variable Amount</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Numerical or Empty amount</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Buy Now, Invoicing, Donations, Tips</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Payer Experience</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">PayPal Balance, Bank, or Credit Card</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Responsive web checkout</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Guest credit/debit card checkout enabled</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Anti-Phishing</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Strictly official paypal.com domain</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Zero proxy redirect intermediaries</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">100% authentic SSL secured PayPal routing</td></tr>
                    <tr className="hover:bg-surface/50 dark:hover:bg-slate-800/40 transition-colors"><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Security & Storage</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">100% In-RAM Client Execution</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">No financial credentials collected</td><td className="py-2 px-3 border-b border-surface-darker/50 dark:border-slate-800/80">Operates without API keys or passwords</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visible 5-Step Practical How-To Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main">
                  How to Generate Custom PayPal Payment & Donation Links
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
                  Common PayPal Payment Link Mistakes & Fixes
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
                PayPal Link Specs
              </h3>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">URL Scheme</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Official https://paypal.me/
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Currencies</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    25+ Global Currencies
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Payment Types</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Fixed Amount & Custom Donation
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Export</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Clean Link & HTML Button
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-surface border border-surface-darker space-y-0.5">
                  <div className="font-bold text-text-main text-[11px]">Security</div>
                  <div className="text-[10px] text-text-main/60 leading-tight">
                    Zero Password / 100% Client-Side
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

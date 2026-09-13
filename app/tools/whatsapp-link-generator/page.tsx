import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  MessageCircle,
  FileCheck,
  Globe2,
  QrCode,
} from 'lucide-react';
import { WhatsAppLinkEngine } from '@/components/tools/WhatsAppLinkEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'WhatsApp Link Generator with Pre-Filled Message & QR Code Free | Kagazo',
  description:
    'Create custom WhatsApp direct message links (wa.me) with pre-filled text and instant printable QR codes. Preview your chat in a realistic mobile mockup and test chat without saving contacts.',
  alternates: {
    canonical: 'https://kagazo.in/tools/whatsapp-link-generator',
  },
  openGraph: {
    title: 'WhatsApp Link Generator with Message & QR Code Free | Kagazo',
    description: 'Generate wa.me direct chat links with custom message and printable QR codes for business.',
    url: 'https://kagazo.in/tools/whatsapp-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do customers contact me via WhatsApp without saving my phone number?',
    answer:
      'Using the official WhatsApp Click-to-Chat API (wa.me), when a user clicks your generated link or scans your QR code, a direct chat opens immediately on WhatsApp Web or mobile app without them having to add your number to their phone address book.',
  },
  {
    question: 'Can I include emojis and line breaks in the pre-filled message?',
    answer:
      'Yes! Kagazo automatically percent-encodes emojis (👋, 🎉, 💼) and multiline line breaks into a clean, compliant URL query string format (`?text=...`).',
  },
  {
    question: 'Where should I place the generated WhatsApp QR code?',
    answer:
      'Print your WhatsApp QR code on retail shop counters, restaurant menus, product packaging, delivery boxes, vehicle stickers, or business cards for instant customer support and lead generation.',
  },
  {
    question: 'Is Kagazo storing my phone number or customer messages?',
    answer:
      'Never. Kagazo generates all links and QR codes 100% client-side inside your browser’s local memory. No phone numbers, contacts, or messages are ever transmitted to or stored on our servers.',
  },
];

export default function WhatsAppLinkGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'WhatsApp Link Generator with QR Code',
        applicationCategory: 'CommunicationApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/whatsapp-link-generator',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Create wa.me direct chat links with pre-filled messages, live mobile simulator, and printable high-res QR codes.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Create a Direct WhatsApp Chat Link and QR Code',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select Country & Enter Phone Number',
            text: 'Pick your country code (e.g. +91 India) and enter your WhatsApp phone number without leading zeros.',
          },
          {
            '@type': 'HowToStep',
            name: 'Type Welcome Message',
            text: 'Write the pre-filled text that your visitors will automatically send when opening the chat.',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy Link or Download QR Code',
            text: 'Copy the wa.me link for your website bio or download the high-resolution QR code for printed materials.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">WhatsApp Link Generator</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-700 shadow-2xs">
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official wa.me Deep Linking • Live Chat Bubble Simulator</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            WhatsApp Link Generator with QR Code
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Create direct WhatsApp chat links with custom pre-filled messages. Preview how it looks in an
            authentic mobile chat bubble and generate printable <strong>QR codes</strong> for marketing flyers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <QrCode className="w-4 h-4 text-primary" /> Instant High-Res QR Code
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> No Contact Saving Needed
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <WhatsAppLinkEngine />

            <AdSlot slot="post_download" />

            {/* Business Use Cases Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Top WhatsApp Link Strategies for Small Businesses &amp; Creators
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  Boost conversion rates and turn website visitors into active conversations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🛍️ E-Commerce &amp; Product Enquiries</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Add a pre-filled message like: <em>&quot;Hi, I would like to order product SKU #402. Is it in stock?&quot;</em> to speed up checkout.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">📱 Instagram &amp; TikTok Bio Links</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Place your clean wa.me link directly in your social bio so followers can message your sales team with 1 tap.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🏢 Counter Displays &amp; Table Menus</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Print the generated QR code on acrylic tabletop stands so restaurant guests or walk-in customers can order or leave reviews.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="divide-y divide-surface-darker/70">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-text-main group-hover:text-primary transition-colors">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-text-main/40 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-text-main/80 leading-relaxed pl-2 border-l-2 border-primary/30">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar Rail */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Sharing Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/compress-for-whatsapp"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Compress for WhatsApp
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
                <Link
                  href="/tools/signature-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Signature Generator
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% Private</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Phone numbers and messages are never stored or tracked.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  QrCode,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { QrCodeGeneratorEngine } from '@/components/tools/QrCodeGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Custom QR Code Generator Online Free - With Logo, Colors & Wi-Fi | Kagazo',
  description:
    'Create custom high-resolution QR codes online for free. Embed center logos (WhatsApp, UPI, Wi-Fi), pick custom color themes, and generate QR codes for URLs, Wi-Fi passwords, and vCard contacts with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/qr-code-generator',
  },
  openGraph: {
    title: 'Custom QR Code Generator Online Free | Kagazo',
    description: 'Generate high-resolution vector and PNG QR codes with custom colors and center logo badges.',
    url: 'https://kagazo.in/tools/qr-code-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Do the generated QR codes ever expire or have scan limits?',
    answer:
      'No! All QR codes generated on Kagazo are standard static QR codes. They embed your actual URL, Wi-Fi password, or text directly into the 2D matrix, meaning they will function forever with zero scan limits and no monthly subscriptions.',
  },
  {
    question: 'Can I put my brand logo in the center of the QR code without breaking scanning?',
    answer:
      'Yes. Kagazo generates QR codes with Level H (High 30%) Reed-Solomon error correction. Up to 30% of the code can be covered by your logo or obscured while remaining 100% readable by iPhone and Android camera scanners.',
  },
  {
    question: 'How do Wi-Fi QR codes connect guests to my home or cafe network?',
    answer:
      'When guests point their iPhone or Android camera at a Wi-Fi QR code, a native prompt appears asking "Join [Network Name] Wi-Fi?". Tapping the prompt connects them automatically without needing to type in complicated network passwords.',
  },
];

export default function QrCodeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Custom QR Code Generator Free',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Web-based)',
        url: 'https://kagazo.in/tools/qr-code-generator',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Create high-resolution QR codes with custom colors, logos, and Wi-Fi auto-connect with 100% in-browser client privacy.',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a Custom QR Code Online for Free',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select QR Code Type',
            text: 'Choose between Website URL, Wi-Fi network, UPI payment, vCard contact, email, or plain text.',
          },
          {
            '@type': 'HowToStep',
            name: 'Customize Colors and Add Logo',
            text: 'Choose your brand color palette and embed a WhatsApp, Wi-Fi, or custom logo badge.',
          },
          {
            '@type': 'HowToStep',
            name: 'Download High-Res 300 DPI PNG',
            text: 'Download the print-ready image for brochures, product packaging, or website displays.',
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
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">QR Code Generator</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>High-DPI Vector QR Studio • Level H Error Correction</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Custom QR Code Generator Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Generate customized QR codes for websites, <strong>Wi-Fi automatic connection</strong>, UPI payments, and vCard contact cards. Embed logos, customize brand colors, and export high-res PNGs with zero expiration limits.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <QrCode className="w-4 h-4 text-primary" /> Permanent (Never Expires)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-primary" /> Unlimited Free Scans
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <QrCodeGeneratorEngine />

            <AdSlot slot="post_download" />

            {/* Guide */}
            <section className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Popular QR Code Applications
                </h2>
                <p className="text-xs sm:text-sm text-text-main/70">
                  How modern businesses and professionals use high-DPI static QR codes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">📶 Contactless Wi-Fi Login</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Display Wi-Fi QR cards on hotel desks, co-working spaces, and cafes so guests connect without typing long security passwords.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">🪪 Digital Business Cards (vCard)</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Print on your physical card. Scanning adds your full contact details (name, cell, email, company) directly to their phone address book.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="font-bold text-sm text-text-main">💸 Instant UPI Payments</h3>
                  <p className="text-text-main/70 leading-relaxed">
                    Generate instant BHIM / GPay / PhonePe payment QR codes with your UPI ID and preset bill amount for smooth retail checkouts.
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

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related QR Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/qr-code-reader"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  QR Code Reader &amp; Scanner
                </Link>
                <Link
                  href="/tools/whatsapp-link-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  WhatsApp Link &amp; QR
                </Link>
                <Link
                  href="/tools/image-optimizer"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Image Optimizer
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />

            <div className="bg-surface/80 rounded-2xl border border-surface-darker p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="text-[11px] text-text-main/70 leading-normal">
                Credentials and links never leave your browser RAM. Safe for confidential Wi-Fi keys.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

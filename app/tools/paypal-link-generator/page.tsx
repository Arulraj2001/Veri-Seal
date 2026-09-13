import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
  CreditCard,
  FileCheck,
  Globe2,
} from 'lucide-react';
import { PaypalLinkGeneratorEngine } from '@/components/tools/PaypalLinkGeneratorEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PayPal Link Generator Online Free - Custom Amount & Currency | Kagazo',
  description:
    'Generate PayPal.me payment and donation links with pre-set amounts and multi-currency support (USD, EUR, GBP, INR, CAD). Creates checkout counter QR codes with 100% in-browser privacy.',
  alternates: {
    canonical: 'https://kagazo.in/tools/paypal-link-generator',
  },
  openGraph: {
    title: 'PayPal Link Generator Online Free | Kagazo',
    description: 'Create instant PayPal payment links and printable checkout counter QR codes.',
    url: 'https://kagazo.in/tools/paypal-link-generator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function PaypalLinkGeneratorPage() {
  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">PayPal Link Generator</span>
        </nav>

        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-[#003087] shadow-2xs">
            <CreditCard className="w-4 h-4 text-[#003087] shrink-0" />
            <span>PayPal.me Direct Checkout • Multi-Currency Support</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            PayPal Link Generator Online Free
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Generate direct PayPal payment links with preset amounts, currencies, and descriptions.
            Download instant checkout counter QR codes for cashless transactions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <PaypalLinkGeneratorEngine />
            <AdSlot slot="post_download" />
          </main>

          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Related Tools</span>
              <div className="space-y-1.5">
                <Link href="/tools/whatsapp-link-generator" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  WhatsApp Link
                </Link>
                <Link href="/tools/qr-code-generator" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  QR Code Generator
                </Link>
                <Link href="/tools/utm-link-generator" className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary">
                  UTM Link Builder
                </Link>
              </div>
            </div>
            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}

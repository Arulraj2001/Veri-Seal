import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  FileSpreadsheet,
  IndianRupee,
  Coins,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { NumberToWordsEngine } from '@/components/tools/NumberToWordsEngine';

export const metadata: Metadata = {
  title: 'Number to Words Converter | Rupees, Lakhs, Crores & Cheque Writing | Kagazo',
  description:
    'Convert numbers and currency amounts into English words. Supports Indian (Lakhs & Crores) and International (Millions & Billions) numbering formats with cheque writing "Only" suffix.',
  alternates: {
    canonical: 'https://kagazo.in/tools/number-to-words-converter',
  },
  openGraph: {
    title: 'Number to Words Converter | Kagazo',
    description: 'Convert numbers and currency into English words for cheques, invoices, and legal documents.',
    url: 'https://kagazo.in/tools/number-to-words-converter',
    siteName: 'Kagazo',
    type: 'website',
  },
};

export default function NumberToWordsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Number to Words Converter',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description: 'Convert numbers and currency figures into English words for bank cheques, billing, and accounting.',
  };

  return (
    <div className="min-h-screen bg-background bg-dot-grid text-text-main pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-main/60">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <Link href="/tools" className="hover:text-primary transition-colors font-medium">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-text-main/30" />
          <span className="text-primary font-bold">Number to Words Converter</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary shadow-2xs">
            <FileSpreadsheet className="w-4 h-4 text-primary shrink-0" />
            <span>Banking, Cheque & Invoice Words Converter</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            Number to Words Converter
          </h1>

          <p className="text-sm sm:text-base text-text-main/80 max-w-2xl mx-auto leading-relaxed">
            Convert currency and numbers to English words instantly. Supports Indian numbering (Lakhs & Crores) and International (Millions & Billions) with uppercase cheque writing formats.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-text-main/70">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <IndianRupee className="w-4 h-4 text-primary" /> Lakhs & Crores System
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-surface-darker px-3 py-1.5 rounded-xl">
              <Coins className="w-4 h-4 text-amber-500" /> INR, USD, EUR, GBP
            </span>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            <NumberToWordsEngine />

            {/* Educational Guide */}
            <article className="prose prose-sm max-w-none bg-surface/60 border border-surface-darker rounded-2xl p-6 sm:p-8 space-y-6 text-text-main/90">
              <h2 className="text-xl font-bold text-text-main border-b border-surface-darker pb-3">
                How to Write Numbers in Words for Cheques & Invoices
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-primary" /> Indian Numbering System
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    In India, numerals are grouped in 2s after the hundreds: <strong>1,00,000 is One Lakh</strong>, and <strong>1,00,00,000 is One Crore</strong>. 100 Crores equal 1 Arab.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-surface-darker space-y-2">
                  <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-500" /> International System
                  </h3>
                  <p className="text-xs text-text-main/70 leading-relaxed">
                    The international scale groups digits by 3s: 1,000,000 is One Million, and 1,000,000,000 is One Billion.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text-main pt-4">Best Practices for Cheque Writing</h3>
              <ul className="text-xs space-y-2 text-text-main/80">
                <li>Always start writing right after the printed word &quot;Rupees&quot; to prevent fraudsters from adding extra words.</li>
                <li>Conclude the sentence with the word <strong>&quot;Only&quot;</strong> (e.g. <em>Rupees Two Lakh Fifty Thousand Only</em>).</li>
                <li>Draw a horizontal line across any unused blank space on the &quot;Rupees in words&quot; line.</li>
              </ul>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-2 space-y-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-surface-darker shadow-card p-3 sm:p-3.5 space-y-3">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Related Financial Tools
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/unit-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Unit Converter
                </Link>
                <Link
                  href="/tools/unix-timestamp-converter"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Timestamp Converter
                </Link>
                <Link
                  href="/tools/salary-slip-generator"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Salary Slip Maker
                </Link>
                <Link
                  href="/tools/income-tax-calculator-2025-26"
                  className="block p-2 rounded-xl bg-surface hover:bg-primary-light/50 text-[11px] font-bold text-text-main hover:text-primary transition-colors"
                >
                  Income Tax Calculator
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-4 space-y-2 text-center">
              <Lock className="w-5 h-5 text-primary mx-auto" />
              <div className="text-xs font-bold text-text-main">Financial Privacy</div>
              <p className="text-[11px] text-text-main/70 leading-relaxed">
                Your amounts and currency figures never leave your device. 100% offline algorithm.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

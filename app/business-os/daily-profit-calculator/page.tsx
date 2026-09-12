import { Metadata } from 'next';
import DailyProfitEngine from '@/components/business-os/DailyProfitEngine';
import { Coins, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Daily Profit & Rupee Breakdown Calculator for Indian Shops | Kagazo',
  description:
    'Calculate your exact daily business profit in India. Separate Cash, UPI, and Udhaar credit sales. See where every ₹100 earned goes across COGS, staff wages, rent, and packaging.',
  keywords: [
    'daily profit calculator shop india',
    'kirana shop daily profit calculator',
    'how to calculate daily profit retail store',
    'upi vs cash sales daily ledger',
    'small business daily expense tracker',
    'daily profit and loss calculator',
  ],
  openGraph: {
    title: 'Daily Profit & Rupee Breakdown Calculator for Indian Small Business',
    description:
      'Enter today’s Cash, UPI, and Credit sales to see your real daily profit and interactive ₹100 anatomy breakdown. Free and private.',
    url: 'https://Kagazo.org/business-os/daily-profit-calculator',
  },
};

export default function DailyProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Daily Profit & Rupee Breakdown Calculator',
    url: 'https://Kagazo.org/business-os/daily-profit-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculate daily retail and small business net profit, track Cash vs UPI vs Udhaar, and see your ₹100 Rupee breakdown.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should I separate Cash, UPI, and Udhaar in daily profit calculations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Udhaar (credit) sales represent revenue on paper, but zero immediate cash in your drawer. If 30% of your sales are credit, you cannot use that money today to pay helper wages, supplier invoices, or shop rent.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the ideal daily net margin for Indian retail kirana stores?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Indian kirana and FMCG retail, gross margins hover between 12% and 18%. After helper wages, electricity, and shop rent, a healthy net margin is typically 6% to 10% of total turnover.',
        },
      },
    ],
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          <span>Daily Cash Flow &amp; Margin Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Daily Business Profit &amp; Rupee Breakdown Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Enter your sales across Cash, UPI (PhonePe/GPay), and Udhaar credit. Calculate your net take-home profit today and uncover where every ₹100 of turnover goes.
        </p>
      </div>

      {/* Interactive Engine */}
      <DailyProfitEngine />

      {/* SEO Guide & Educational Blueprint */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The Daily Cash Reconciliation Blueprint for Indian Retailers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How smart shopkeepers close their books every evening in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Drawer vs UPI vs Khata</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always tally physical cash in your cash drawer separately from UPI settlements and customer Udhaar slips. Cash and UPI give you today&apos;s spending power, while credit requires active follow-ups.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Amortize Monthly Overheads Daily</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rent and electricity don&apos;t wait for month-end. Divide your monthly rent (e.g. ₹18,000) by 26 working days to allocate ₹692/day. This ensures you never face a month-end rent panic.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The ₹100 Anatomy Target</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For every ₹100 entering your till, aim to preserve at least ₹15–₹20 as clean net profit. If your net profit drops below ₹8 per ₹100, analyze supplier discounts and packaging overheads.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

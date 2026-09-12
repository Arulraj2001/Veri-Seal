import { Metadata } from 'next';
import RealProfitLeakEngine from '@/components/business-os/RealProfitLeakEngine';
import { TrendingUp, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Monthly P&L & Profit Leak Detector for Small Business | Kagazo',
  description:
    'Free monthly Profit & Loss (P&L) calculator for Indian SMBs and D2C brands. Autodetects hidden leaks across marketplace commissions, courier freight, commercial rent, and ad spend.',
  keywords: [
    'monthly profit calculator small business india',
    'profit leak detector smb',
    'real profit vs revenue calculator',
    'ecommerce profit and loss statement template',
    'amazon seller net profit after fees calculator',
  ],
  openGraph: {
    title: 'Monthly P&L & Profit Leak Detector for Small Business',
    description:
      'Uncover where your business is silently bleeding cash. Autodetects hidden leaks in marketplace cuts, courier freight, and rent.',
    url: 'https://Kagazo.org/business-os/real-profit-calculator',
  },
};

export default function RealProfitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Monthly P&L & Profit Leak Detector',
    url: 'https://Kagazo.org/business-os/real-profit-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Calculate monthly net profit, analyze direct costs vs operating overheads, and autodetect high-severity profit leaks.',
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
          <span>Monthly Profit &amp; Loss Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Real Profit &amp; Silent Leak Detector
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Stop mistaking high turnover for wealth. Enter your monthly revenue and operating expenses to calculate your true net in-pocket profit and automatically diagnose cash leaks.
        </p>
      </div>

      {/* Interactive Engine */}
      <RealProfitLeakEngine />

      {/* SEO Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 4 Silent Leaks That Drain Indian Small Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why growing revenue often leads to shrinking bank balances.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Marketplace Commission Stacking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When listing on Amazon or Flipkart, referral fees (8%–18%), closing fees (₹15–₹45), pick &amp; pack fees, and 18% GST on fees quietly strip 25%–35% of your selling price before you receive a single rupee.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Dead Courier Freight on Returns</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every Cash on Delivery (COD) refusal means paying forward shipping plus reverse courier with zero revenue. If your courier bill exceeds 10% of revenue, you must verify orders via WhatsApp before dispatch.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. The Rent-to-Turnover Trap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Commercial shop rents in Indian tier-1 and tier-2 markets can easily exceed 15%–20% of monthly sales. Sustainable retail aims to maintain fixed rent under 10% of monthly gross revenue.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">4. Unmonitored Paid Ads CAC Burn</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Spending ₹300 on Meta or Instagram ads to sell a ₹900 product leaves virtually nothing after product cost (₹350) and shipping (₹90). Focus on repeat buyer WhatsApp VIP groups.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import RentVsBuyEngine from '@/components/home-cost/RentVsBuyEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator India 2026 | 10-Year Wealth & Financial Decision Model',
  description:
    'Should you buy a home or rent and invest the difference in mutual funds? Indian real estate financial model calculating 10-year net worth, home loan EMI, property appreciation, and SIP compounding.',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/rent-vs-buy',
  },
  openGraph: {
    title: 'Indian 10-Year Rent vs Buy Financial Calculator | VeriSeal',
    description:
      'Compare buying a house with an 8.5% home loan vs renting and investing the down payment in a Nifty 50 equity SIP.',
    url: 'https://veriseal.in/home-cost/rent-vs-buy',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why is comparing Rent vs Buy not just about comparing Rent with EMI?',
    answer:
      'A true financial comparison must account for the substantial opportunity cost of your upfront down payment (e.g. 20% + 7% stamp duty and registration). If you rent, that lump sum can compound in a 12% equity index mutual fund. Additionally, you must factor in home loan interest tax benefits, annual property appreciation (5%–7%), rent inflation (5%), and ongoing building maintenance.',
  },
  {
    question: 'When does buying a home make more financial sense in India?',
    answer:
      'Buying makes more financial sense if: (1) you plan to reside in the property for at least 8 to 10+ years, (2) property appreciation in your specific locality exceeds 6% to 7% annually, and (3) you value emotional security and freedom from landlord rent hikes.',
  },
];

export default function RentVsBuyPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Home className="w-3.5 h-3.5" />
          <span>Real Estate Financial Modeling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Rent vs Buy Calculator India: 10-Year Wealth Comparison
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Simulate whether purchasing a property on home loan EMI or renting while investing the down payment into mutual fund equity SIPs builds more wealth over a 10-year horizon.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <RentVsBuyEngine />

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-surface-darker/70 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-surface-darker/60 pb-4">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-start gap-2">
                <span className="text-emerald-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Space */}
      <AdSlot slot="in_content" />
    </div>
  );
}

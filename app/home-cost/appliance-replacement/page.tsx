import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  RefreshCw,
} from 'lucide-react';
import ApplianceReplacementEngine from '@/components/home-cost/ApplianceReplacementEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Should I Replace My Old Appliance? | Payback Period & Savings ROI Calculator',
  description:
    'Calculate whether upgrading your 10-year-old refrigerator, 75W ceiling fans, or older AC pays for itself through electricity savings. Accurate 5-year total cost of ownership (TCO) and break-even payback.',
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/appliance-replacement',
  },
  openGraph: {
    title: 'Appliance Replacement ROI & Payback Calculator | Kagazo',
    description:
      'Answer the critical buying question: Will a new 5-Star appliance save enough electricity to pay for its purchase price?',
    url: 'https://Kagazo.in/home-cost/appliance-replacement',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do older refrigerators consume more electricity over time?',
    answer:
      'Refrigerators degrade over an 8 to 10 year period due to worn magnetic door gaskets, microscopic refrigerant leaks, and mechanical compressor wear. While a new 5-Star Inverter refrigerator consumes ~200 units annually, an older 10-year model often burns 500 to 600 units annually, bleeding an extra ₹3,000+ every single year.',
  },
  {
    question: 'What is Total Cost of Ownership (TCO)?',
    answer:
      'TCO calculates the complete financial cost of owning an appliance over 5 or 10 years, combining initial purchase price + annual electricity bills + maintenance and repair costs. Energy-efficient 5-Star appliances typically have a much lower TCO than cheaper 2-star or old appliances.',
  },
];

export default function ApplianceReplacementPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Buying Decision Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Should I Replace My Old Appliance? ROI &amp; Payback Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Evaluate whether buying a new 5-Star appliance pays for itself through lower electricity bills, or if you should keep using your current unit.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <ApplianceReplacementEngine />

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

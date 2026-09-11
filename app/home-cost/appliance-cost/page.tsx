import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import ApplianceCostEngine from '@/components/home-cost/ApplianceCostEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Appliance Electricity Cost Calculator | Per Hour, Daily & Monthly Running Cost',
  description:
    'Calculate the exact electricity cost for any household appliance in India: AC, Refrigerator, Ceiling Fan, Geyser, TV, Washing Machine, Microwave, Laptop, and Water Pump.',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/appliance-cost',
  },
  openGraph: {
    title: 'Individual Appliance Electricity Cost Calculator | VeriSeal',
    description:
      'Enter wattage and hours to see daily, monthly, and yearly electricity cost with energy-efficient alternatives.',
    url: 'https://veriseal.in/home-cost/appliance-cost',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I convert appliance wattage to units of electricity?',
    answer:
      'One unit of electricity equals 1 kilowatt-hour (1 kWh), which is 1,000 Watts running for 1 hour. To calculate units: multiply the wattage by the number of hours used, then divide by 1,000. For example, a 2,000W geyser running for 1.5 hours consumes: (2000 × 1.5) / 1000 = 3 units.',
  },
  {
    question: 'Which home appliance consumes the most electricity in India?',
    answer:
      'In typical Indian households, air conditioners (1,000W–2,000W) account for 45% to 60% of summer power bills, followed by electric water geysers (2,000W), older non-inverter refrigerators (running 24/7), and 75W induction ceiling fans (often running 14+ hours a day across 4-6 rooms).',
  },
];

export default function ApplianceCostPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Zap className="w-3.5 h-3.5" />
          <span>Appliance Cost Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Appliance Electricity Cost Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Discover exactly how much each individual appliance in your home costs you per hour, per day, per month, and per year.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <ApplianceCostEngine />

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

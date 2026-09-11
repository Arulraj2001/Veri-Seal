import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sun,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import SolarPaybackEngine from '@/components/home-cost/SolarPaybackEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Rooftop Solar Size & Subsidy Calculator India | PM Surya Ghar Yojana',
  description:
    'Calculate rooftop solar capacity (kW), panel count, roof area, and government subsidy under PM Surya Ghar Muft Bijli Yojana (up to ₹78,000). 25-year return on investment (ROI) & break-even payback.',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/solar-calculator',
  },
  openGraph: {
    title: 'Rooftop Solar Size & PM Surya Ghar Subsidy Calculator | VeriSeal',
    description:
      'Determine the perfect solar kW system for your Indian home, net-metering savings, and central government subsidy.',
    url: 'https://veriseal.in/home-cost/solar-calculator',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How much roof area is required for a 3 kW solar system in India?',
    answer:
      'A 3 kW rooftop solar system requires approximately 270 to 300 square feet of unobstructed, shadow-free roof area. Using high-efficiency Mono PERC solar panels (540W to 550W each), a 3 kW setup requires approximately 5 to 6 panels.',
  },
  {
    question: 'What is the PM Surya Ghar Muft Bijli Yojana subsidy slab?',
    answer:
      'The Central Government provides direct benefit transfer (DBT) subsidies: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum subsidy of ₹78,000 for systems of 3 kW or greater. Additional state subsidies may apply in specific states like Uttar Pradesh and Gujarat.',
  },
  {
    question: 'How does on-grid solar net-metering work?',
    answer:
      'With an on-grid system, the electricity generated during sunny daytime hours powers your home first. Any surplus power is exported back to the state electricity grid through a bi-directional net meter. At night, you draw power from the grid. At the end of the month, your DISCOM bill only charges for net imported units.',
  },
];

export default function SolarCalculatorPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          <Sun className="w-3.5 h-3.5" />
          <span>PM Surya Ghar: Muft Bijli Yojana</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Rooftop Solar Size, Subsidy &amp; Payback Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Size your rooftop solar power plant, calculate your direct government DBT subsidy up to ₹78,000, and simulate your 25-year net savings.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <SolarPaybackEngine />

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

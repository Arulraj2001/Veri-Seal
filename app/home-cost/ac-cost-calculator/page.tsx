import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wind,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import AcCostEngine from '@/components/home-cost/AcCostEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'AC Electricity Cost Calculator India | 1.5 Ton 3-Star vs 5-Star Break-Even',
  description:
    'Calculate exact running costs for 1 Ton, 1.5 Ton, and 2 Ton Inverter ACs in India. Discover why setting temperature to 24°C saves 24% electricity and compare 3-Star vs 5-Star payback timelines.',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/ac-cost-calculator',
  },
  openGraph: {
    title: 'AC Running Cost & 3-Star vs 5-Star Payback Calculator | VeriSeal',
    description:
      'Compare 1.5 Ton Inverter AC electricity cost per hour, per night, and per month with Indian ambient summer temperatures.',
    url: 'https://veriseal.in/home-cost/ac-cost-calculator',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How much electricity does a 1.5 Ton Inverter AC consume per hour in India?',
    answer:
      'A 1.5 Ton 3-Star Inverter AC consumes approximately 1.0 to 1.3 units (kWh) per hour initially when cooling a hot room, and stabilizes to around 0.5 to 0.7 units per hour once the room reaches the set temperature (e.g. 24°C). Over an 8-hour night, it consumes approximately 5.5 to 7.0 units.',
  },
  {
    question: 'Should I buy a 3-Star or 5-Star AC for home use?',
    answer:
      'If you use your air conditioner for more than 1,000 to 1,200 hours per year (around 5–6 hours daily for 6+ months), a 5-Star Inverter AC easily recovers its ₹7,000 to ₹8,000 price premium in roughly 2.5 to 3 years. After that, you earn pure savings of ₹3,000+ every single year for the remaining 7–10 year lifespan of the AC.',
  },
  {
    question: 'Does room size affect AC electricity consumption?',
    answer:
      'Yes. Installing an undersized 1 Ton AC in a 180 sq ft room forces the compressor to run at 100% capacity continuously without cycling down, consuming more electricity than a properly sized 1.5 Ton Inverter AC.',
  },
];

export default function AcCostCalculatorPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Wind className="w-3.5 h-3.5" />
          <span>Thermodynamics &amp; ISEER Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Air Conditioner Electricity Cost &amp; 3★ vs 5★ Payback Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Simulate real-world electricity costs for 1 Ton, 1.5 Ton, and 2 Ton ACs based on thermostat setting, ambient Indian heat, and daily hours.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <AcCostEngine />

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

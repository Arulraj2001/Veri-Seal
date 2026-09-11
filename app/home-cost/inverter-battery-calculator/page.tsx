import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BatteryCharging,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import InverterBatteryEngine from '@/components/home-cost/InverterBatteryEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Inverter & Battery Capacity Calculator India | VA & Ah Sizing Guide',
  description:
    'Calculate the perfect inverter capacity (VA / kVA) and battery size (Ah) for your Indian home. Sizing for fans, lights, TV, fridge, and AC with realistic backup duration (hours).',
  alternates: {
    canonical: 'https://veriseal.in/home-cost/inverter-battery-calculator',
  },
  openGraph: {
    title: 'Inverter & Battery Capacity Sizing Calculator | VeriSeal',
    description:
      'Size your home backup inverter and 150Ah/200Ah tubular or lithium battery with exact backup hours calculation.',
    url: 'https://veriseal.in/home-cost/inverter-battery-calculator',
    siteName: 'VeriSeal',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do I calculate inverter VA capacity from total appliance Watts?',
    answer:
      'Inverters are rated in Volt-Amperes (VA), whereas appliances are rated in Watts. To convert Watts to VA, divide total wattage by the power factor (typically 0.8) and add a 20% to 25% safety surge headroom: Inverter VA = (Total Watts / 0.8) × 1.25. For example, a 500W load needs a (500 / 0.8) × 1.25 = ~780 VA (or standard 900VA / 1 kVA) inverter.',
  },
  {
    question: 'What is the difference between Tubular Lead-Acid and Lithium batteries for home inverters?',
    answer:
      'Tubular lead-acid batteries have a 70%–75% usable Depth of Discharge (DoD), take 10–12 hours to charge, require distilled water top-ups, and last 4–5 years. Lithium (LiFePO4) batteries support 90% DoD, charge in 2–3 hours, are maintenance-free, and last 10+ years, though they carry a higher upfront purchase cost.',
  },
];

export default function InverterBatteryCalculatorPage() {
  return (
    <div className="space-y-10">
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <BatteryCharging className="w-3.5 h-3.5" />
          <span>Home Backup Sizing Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Inverter (kVA) &amp; Battery Capacity (Ah) Calculator
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Select your essential outage appliances and desired backup duration to calculate your exact inverter VA capacity and battery Ah requirement.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <InverterBatteryEngine />

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

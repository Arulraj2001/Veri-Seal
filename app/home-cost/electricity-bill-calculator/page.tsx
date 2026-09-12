import { Breadcrumb } from '@/components/ui/Breadcrumb';
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
import ElectricityBillEngine from '@/components/home-cost/ElectricityBillEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Home Electricity Bill Calculator India | State Slab Tariff & Appliance Breakdown',
  description:
    'Calculate your monthly Indian electricity bill with exact state DISCOM tariff slabs (TANGEDCO, MSEDCL, BSES, BESCOM, UPPCL). Appliance-by-appliance power breakdown and What-If cost simulator.',
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/electricity-bill-calculator',
  },
  openGraph: {
    title: 'Free Home Electricity Bill Calculator India | Kagazo',
    description:
      'Accurate electricity bill calculation for Indian homes using authentic state slab rates and room-by-room appliance wattages.',
    url: 'https://Kagazo.in/home-cost/electricity-bill-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'How do progressive electricity slabs work in India?',
    answer:
      'Most Indian state electricity boards (DISCOMs) use telescopic billing slabs. As your monthly consumption increases, units exceeding earlier thresholds are billed at significantly higher tariff rates. Crossing into the 400+ unit bracket can push your unit rate from ₹4.50 to ₹10.00+, which is why reducing even 30–50 units can result in dramatic bill savings.',
  },
  {
    question: 'What are fixed demand charges on my electricity bill?',
    answer:
      'Fixed charges are monthly connection capacity fees billed per kilowatt (kW) of sanctioned load regardless of whether you consume any power. For example, in Maharashtra, MSEDCL charges ₹115 per kW monthly. A 3 kW connection pays ₹345 monthly in fixed charges before using a single unit.',
  },
  {
    question: 'Can I calculate the electricity bill for a shared apartment or pg?',
    answer:
      'Yes! You can customize your exact appliances (fan, laptop, personal cooler, mini-fridge) and daily hours to calculate your personal sub-meter consumption and monthly financial share.',
  },
];

export default function ElectricityBillCalculatorPage() {
  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Home Cost OS', href: '/home-cost' },
          { label: 'Electricity Bill Calculator' },
        ]}
      />
      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Zap className="w-3.5 h-3.5" />
          <span>India-Calibrated Tariff Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Electricity Bill Calculator &amp; Slab Analyzer
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Estimate your exact monthly power bill based on your state&apos;s DISCOM tariff slabs, room-by-room appliance usage, and sanctioned load.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <ElectricityBillEngine />

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

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  ChevronRight,
  HelpCircle,
  Sun,
  Wind,
  BatteryCharging,
} from 'lucide-react';
import ElectricityBillEngine from '@/components/home-cost/ElectricityBillEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Electricity Bill Calculator India | TANGEDCO, BESCOM, MSEDCL, BSES Slab Rates',
  description:
    'Free electricity bill calculator for Indian homes. Accurate DISCOM slab tariffs for Tamil Nadu (TANGEDCO), Karnataka (BESCOM), Maharashtra (MSEDCL), Delhi (BSES), and UP (UPPCL). Appliance-by-appliance breakdown + What-If cost simulator.',
  keywords: [
    'electricity bill calculator India',
    'TANGEDCO electricity bill calculator',
    'BESCOM electricity bill calculator',
    'MSEDCL electricity bill calculator',
    'BSES electricity bill calculator',
    'UPPCL electricity bill calculator',
    'electricity slab rate calculator India',
    'calculate electricity bill by units India',
    'DISCOM tariff slab calculator',
    'home electricity bill calculator India 2025',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/electricity-bill-calculator',
  },
  openGraph: {
    title: 'Free Electricity Bill Calculator India — TANGEDCO, BESCOM, MSEDCL, BSES | Kagazo',
    description:
      'Calculate your exact monthly electricity bill with authentic DISCOM slab rates for Tamil Nadu, Karnataka, Maharashtra, Delhi & UP. Appliance breakdown, fixed charges, and What-If savings simulator.',
    url: 'https://Kagazo.in/home-cost/electricity-bill-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electricity Bill Calculator India | TANGEDCO, BESCOM, MSEDCL, BSES Slab Rates',
    description:
      'Free Indian electricity bill calculator with real DISCOM tariff slabs. Room-by-room appliance breakdown + savings simulator.',
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
    question: 'Can I calculate the electricity bill for a shared apartment or PG?',
    answer:
      'Yes! You can customize your exact appliances (fan, laptop, personal cooler, mini-fridge) and daily hours to calculate your personal sub-meter consumption and monthly financial share.',
  },
  {
    question: 'How does TANGEDCO calculate electricity bills in Tamil Nadu?',
    answer:
      'TANGEDCO (Tamil Nadu Generation and Distribution Corporation) uses a telescopic slab system for domestic consumers. The first 100 units per month are free under the subsidy scheme. Units 101–200 are billed at ₹1.50/unit, 201–500 at ₹3.00/unit, and above 500 at ₹5.75/unit. A fixed charge of ₹25–₹60 per month also applies based on sanctioned load. Our calculator models this exact structure.',
  },
  {
    question: 'What is Fuel Adjustment Charge (FAC) on my electricity bill?',
    answer:
      'The Fuel Adjustment Charge (FAC), also called Fuel and Power Purchase Cost Adjustment (FPPCA), is a variable pass-through charge added when a DISCOM\'s actual fuel and power purchase costs exceed the base tariff. It can add ₹0.25 to ₹1.50 per unit to your bill depending on global energy prices and the billing quarter. It is separate from the fixed tariff slab rate.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/ac-cost-calculator', label: 'AC Electricity Cost Calculator', icon: Wind },
  { href: '/home-cost/inverter-battery-calculator', label: 'Inverter & Battery Sizing', icon: BatteryCharging },
  { href: '/home-cost/solar-calculator', label: 'Solar & PM Surya Ghar Subsidy', icon: Sun },
];

export default function ElectricityBillCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Home Cost OS', item: 'https://Kagazo.in/home-cost' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Electricity Bill Calculator',
            item: 'https://Kagazo.in/home-cost/electricity-bill-calculator',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Home Electricity Bill in India',
        description:
          'Use this free calculator to get your exact monthly electricity bill based on your state DISCOM tariff slabs and appliance usage.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select your state / DISCOM',
            text: 'Choose your state electricity distribution company from the dropdown — e.g., TANGEDCO for Tamil Nadu, BESCOM for Karnataka, MSEDCL for Maharashtra, BSES/BYPL for Delhi, or UPPCL for Uttar Pradesh.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add your appliances room-by-room',
            text: 'Enter each appliance (ceiling fan, AC, refrigerator, TV, LED lights) with its rated wattage and average daily usage hours.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set your sanctioned load',
            text: "Enter your connection's sanctioned load in kW (shown on your electricity bill) so fixed demand charges are included accurately.",
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View your bill breakdown',
            text: "Instantly see your monthly unit consumption, telescopic slab breakdown, fixed charges, electricity duty, and total bill estimate. Use the What-If simulator to find your savings from switching appliances.",
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="space-y-10">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <span>TANGEDCO · BESCOM · MSEDCL · BSES · UPPCL Tariff Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Home Electricity Bill Calculator India — State DISCOM Slab Rates
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Calculate your exact monthly electricity bill using authentic state DISCOM tariff slabs
          (TANGEDCO, BESCOM, MSEDCL, BSES, UPPCL) with room-by-room appliance usage and fixed
          demand charges.
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
              <p className="text-xs text-muted-foreground leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Related Home Cost Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl transition-all group shadow-xs"
              >
                <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 leading-tight">
                  {tool.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Ad Space */}
      <AdSlot slot="in_content" />
    </div>
  );
}

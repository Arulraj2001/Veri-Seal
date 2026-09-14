import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wind,
  ChevronRight,
  HelpCircle,
  Zap,
  Sun,
  BatteryCharging,
} from 'lucide-react';
import AcCostEngine from '@/components/home-cost/AcCostEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'AC Running Cost Calculator India | 1.5 Ton 3★ vs 5★ Monthly Electricity Bill',
  description:
    'Calculate your 1 Ton, 1.5 Ton, or 2 Ton inverter AC\'s exact monthly electricity cost in India. Compare 3-Star vs 5-Star break-even payback, discover why 24°C saves 24% electricity, and find the right tonnage for your room size.',
  keywords: [
    'AC electricity cost calculator India',
    '1.5 ton inverter AC electricity consumption per hour India',
    '3 star vs 5 star AC electricity saving India',
    'AC running cost per month India',
    'inverter AC vs non inverter electricity bill',
    'AC temperature 24 degree save electricity India',
    'should I buy 3 star or 5 star AC India',
    'AC tonnage calculator for room size India',
    '1 ton AC electricity consumption 8 hours',
    'best AC for Indian home electricity saving',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/ac-cost-calculator',
  },
  openGraph: {
    title: 'AC Running Cost & 3★ vs 5★ Break-Even Calculator India | Kagazo',
    description:
      'Compare 1.5 Ton Inverter AC electricity cost per hour, per night, and per month with Indian summer temperatures. Find out if upgrading to 5-Star pays off.',
    url: 'https://Kagazo.in/home-cost/ac-cost-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AC Running Cost Calculator India | 3★ vs 5★ Inverter AC Bill Comparison',
    description:
      'Find out the exact monthly electricity cost of your 1 Ton, 1.5 Ton, or 2 Ton inverter AC in India. 3-Star vs 5-Star payback analysis included.',
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
      'Yes. Installing an undersized 1 Ton AC in a 180 sq ft room forces the compressor to run at 100% capacity continuously without cycling down, consuming more electricity than a properly sized 1.5 Ton Inverter AC that reaches temperature quickly and then runs at reduced modulated power.',
  },
  {
    question: 'Why does changing the AC temperature from 20°C to 24°C save so much money?',
    answer:
      'Bureau of Energy Efficiency (BEE) and ASHRAE thermodynamic research shows that every 1°C increase in AC set temperature reduces compressor load by approximately 6%. Increasing the thermostat from 20°C to 24°C reduces electricity consumption by ~24%, saving an average Indian household ₹3,200 to ₹5,400 across summer months — with zero lifestyle compromise.',
  },
  {
    question: 'What is ISEER rating and how does it differ from the old EER/COP rating for ACs?',
    answer:
      'ISEER (Indian Seasonal Energy Efficiency Ratio) is the BEE\'s India-specific efficiency metric for ACs, introduced in 2016. Unlike the older EER (measured at a single fixed test condition of 35°C outdoor / 27°C indoor), ISEER calculates weighted average performance across the range of Indian seasonal temperatures (20°C to 43°C outdoor). A higher ISEER means more cooling for less electricity. 5-Star ACs must achieve an ISEER of 4.50 or higher.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/electricity-bill-calculator', label: 'Electricity Bill Calculator', icon: Zap },
  { href: '/home-cost/solar-calculator', label: 'Solar & PM Surya Ghar Subsidy', icon: Sun },
  { href: '/home-cost/inverter-battery-calculator', label: 'Inverter & Battery Sizing', icon: BatteryCharging },
];

export default function AcCostCalculatorPage() {
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
            name: 'AC Electricity Cost Calculator',
            item: 'https://Kagazo.in/home-cost/ac-cost-calculator',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate AC Running Cost and 3-Star vs 5-Star Break-Even in India',
        description:
          'Use this calculator to find the exact monthly electricity cost of your air conditioner and decide whether upgrading to 5-Star pays off.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select your AC tonnage and star rating',
            text: 'Choose your AC capacity (1 Ton, 1.5 Ton, or 2 Ton) and BEE star rating (3-Star or 5-Star Inverter).',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set your thermostat and daily usage hours',
            text: 'Enter your preferred set temperature (recommended: 24°C) and average daily operating hours.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter your electricity tariff rate',
            text: 'Input your per-unit electricity cost from your state DISCOM bill (e.g., ₹7–₹10 per unit).',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View monthly cost and upgrade payback',
            text: 'See monthly electricity cost, annual savings from upgrading to 5-Star, and the exact break-even timeline in months.',
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
          { label: 'AC Electricity Cost Calculator' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Wind className="w-3.5 h-3.5" />
          <span>BEE ISEER · Thermodynamics · 3★ vs 5★ Break-Even</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          AC Running Cost Calculator India — 1.5 Ton 3★ vs 5★ Monthly Electricity Bill
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Simulate real-world electricity costs for 1 Ton, 1.5 Ton, and 2 Ton Inverter ACs based
          on thermostat setting, ambient Indian summer heat, daily usage, and your DISCOM tariff rate.
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

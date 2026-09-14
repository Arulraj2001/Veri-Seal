import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Droplets,
  ChevronRight,
  HelpCircle,
  Zap,
  Sun,
  Wind,
} from 'lucide-react';
import GeyserBattleEngine from '@/components/home-cost/GeyserBattleEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Geyser Running Cost Calculator India | Electric vs Solar vs Gas Water Heater',
  description:
    'Compare annual running costs for electric storage geysers, instant LPG gas geysers, and rooftop solar water heaters in India. Find which saves the most money and calculate your solar water heater payback period.',
  keywords: [
    'geyser electricity cost calculator India',
    'electric vs solar water heater cost India',
    '25 litre geyser electricity consumption per month',
    'solar water heater vs electric geyser savings India',
    'which geyser is cheapest to run India',
    'instant vs storage geyser electricity cost',
    'LPG gas geyser running cost India',
    'solar water heater payback period India',
    'water heater cost comparison India',
    'best geyser for Indian home 2025',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/geyser-cost-calculator',
  },
  openGraph: {
    title: 'Geyser Running Cost Calculator India — Electric vs Solar vs Gas | Kagazo',
    description:
      'Discover whether a solar water heater, 5-Star electric geyser, or LPG instant geyser saves the most money for your Indian family. Annual cost comparison + payback calculator.',
    url: 'https://Kagazo.in/home-cost/geyser-cost-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geyser Cost Calculator India | Electric vs Solar vs Gas Water Heater',
    description:
      'Find out which water heater costs the least to run in your Indian home. Annual cost comparison and solar payback calculator.',
  },
};

const FAQS = [
  {
    question: 'How much electricity does a 25 Litre electric geyser consume per month in India?',
    answer:
      'A standard 25L electric storage geyser has a 2,000 Watt (2 kW) heating element. It takes approximately 25 to 30 minutes to heat the water to 50°C, consuming around 0.9 to 1.0 unit (kWh) per hot bucket or shower. For a family of 4 taking daily hot baths, it consumes around 100 to 120 units monthly — costing approximately ₹800 to ₹1,100 per month at ₹8–₹9 per unit.',
  },
  {
    question: 'How long does a rooftop solar water heater take to pay for itself?',
    answer:
      'A rooftop solar water heater costs approximately ₹18,000 to ₹30,000 installed (depending on capacity: 100L to 200L). By replacing an electric geyser that costs ₹800–₹1,100/month in electricity, the solar water heater pays back in 2 to 3.5 years. Over its 15-year lifespan, you save ₹1.5 Lakhs to ₹2 Lakhs in avoided electricity costs.',
  },
  {
    question: 'Is an LPG gas geyser cheaper to run than an electric geyser in India?',
    answer:
      'It depends on local LPG prices and electricity tariff. At ₹900/cylinder (14.2 kg) and ₹8/unit electricity, LPG and electric geysers have roughly equivalent per-litre heating costs. However, an LPG instant geyser heats water on-demand (eliminating standby heat loss), making it 15–20% more efficient than electric storage geysers in actual usage. LPG is better in areas with high electricity tariffs (>₹9/unit).',
  },
  {
    question: 'What is the difference between a storage geyser and an instant (tankless) water heater?',
    answer:
      'A storage geyser maintains a tank of hot water at all times, consuming electricity even when no one is bathing — this is called standby heat loss (typically 10–15% of total consumption). An instant geyser has no tank: it heats water only when the tap is opened, eliminating standby loss entirely. Instant geysers have higher wattage (3,000W to 4,500W) but shorter run times, making them more economical for families who use hot water in scattered bursts throughout the day.',
  },
  {
    question: 'Should I buy a 5-Star rated electric geyser in India?',
    answer:
      'Yes, for storage geysers, a BEE 5-Star rating is worth the small premium. 5-Star geysers use superior polyurethane (PUF) insulation that reduces standby heat loss by 50–60% compared to 3-Star models. Over 10 years, a 5-Star 25L geyser saves approximately ₹8,000 to ₹12,000 in electricity versus a 3-Star model of the same capacity — more than covering the ₹2,000–₹3,000 price difference.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/electricity-bill-calculator', label: 'Electricity Bill Calculator', icon: Zap },
  { href: '/home-cost/solar-calculator', label: 'Solar & PM Surya Ghar Subsidy', icon: Sun },
  { href: '/home-cost/lpg-vs-induction', label: 'LPG vs Induction Cooking Cost', icon: Wind },
];

export default function GeyserCostCalculatorPage() {
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
            name: 'Geyser Running Cost Calculator',
            item: 'https://Kagazo.in/home-cost/geyser-cost-calculator',
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
          { label: 'Geyser Running Cost Calculator' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Droplets className="w-3.5 h-3.5" />
          <span>3-Way Geyser Battle: Electric vs Gas vs Solar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Geyser Running Cost Calculator India — Electric vs Solar vs Gas Water Heater
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Compare the annual running costs of electric storage geysers, instant LPG gas geysers, and
          rooftop solar water heaters for your Indian home. Find which saves the most money over 5 years.
        </p>
      </div>

      {/* Main Interactive Engine */}
      <GeyserBattleEngine />

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

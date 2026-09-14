import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sun,
  ChevronRight,
  HelpCircle,
  Zap,
  BatteryCharging,
  Wind,
} from 'lucide-react';
import SolarPaybackEngine from '@/components/home-cost/SolarPaybackEngine';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'PM Surya Ghar Subsidy Calculator | Rooftop Solar Size & 25-Year ROI India 2025',
  description:
    'Free rooftop solar calculator for Indian homes. Find your ideal kW system size, calculate PM Surya Ghar Muft Bijli Yojana subsidy (up to ₹78,000), roof area needed, and 25-year payback period. Based on 2025 government CFA slab rates.',
  keywords: [
    'PM Surya Ghar subsidy calculator',
    'rooftop solar panel calculator India 2025',
    'PM Surya Ghar Muft Bijli Yojana subsidy amount',
    'how much solar panel for home India',
    'solar system cost after subsidy India',
    '3 kW solar panel price India after subsidy',
    'solar payback period calculator India',
    'net metering savings calculator India',
    'rooftop solar ROI calculator India',
    'how many solar panels for 500 units per month',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/home-cost/solar-calculator',
  },
  openGraph: {
    title: 'PM Surya Ghar Subsidy Calculator — Rooftop Solar Size & 25-Year ROI | Kagazo India',
    description:
      'Determine the perfect solar kW system for your Indian home, net-metering bill savings, and PM Surya Ghar central government DBT subsidy up to ₹78,000.',
    url: 'https://Kagazo.in/home-cost/solar-calculator',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM Surya Ghar Subsidy Calculator | Rooftop Solar Size & ROI India',
    description:
      'Calculate rooftop solar kW size, PM Surya Ghar subsidy (up to ₹78,000), and 25-year payback for your Indian home. Free tool.',
  },
};

const FAQS = [
  {
    question: 'How much roof area is required for a 3 kW solar system in India?',
    answer:
      'A 3 kW rooftop solar system requires approximately 270 to 300 square feet of unobstructed, shadow-free roof area. Using high-efficiency Mono PERC solar panels (540W to 550W each), a 3 kW setup requires approximately 5 to 6 panels.',
  },
  {
    question: 'What is the PM Surya Ghar Muft Bijli Yojana subsidy slab for 2025?',
    answer:
      'The Central Government provides direct benefit transfer (DBT) subsidies: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum subsidy cap of ₹78,000 for systems of 3 kW or greater. Additional state-level subsidies may apply in Uttar Pradesh, Gujarat, Rajasthan, and Delhi on top of the central CFA.',
  },
  {
    question: 'How does on-grid solar net-metering work in India?',
    answer:
      'With an on-grid system, the electricity generated during sunny daytime hours powers your home first. Any surplus power is exported back to the state electricity grid through a bi-directional net meter. At night, you draw power from the grid. At the end of the month, your DISCOM bill only charges for net imported units, effectively making excess solar generation a credit against your bill.',
  },
  {
    question: 'How many units of electricity does a 3 kW solar system generate per month in India?',
    answer:
      'A 3 kW rooftop solar system in India typically generates 300 to 375 units (kWh) per month, depending on geographic location, panel tilt, and local sunshine hours. Southern states like Tamil Nadu and Karnataka receive 5.0–5.5 peak sun hours/day, generating ~450 units/month from a 3 kW plant. Northern plains average 4.5–5.0 hours, generating 390–420 units/month.',
  },
  {
    question: 'Can I still install solar panels if I live in a flat or apartment in India?',
    answer:
      'Yes, but with limitations. Individual flat owners typically cannot install solar independently. However, if your Resident Welfare Association (RWA) applies collectively, you can install a community rooftop solar system on the common terrace. Group Housing Societies (GHS) are eligible for PM Surya Ghar subsidy at ₹18,000 per kW for common areas, up to 500 kW capacity. Savings are then distributed proportionally across all units.',
  },
];

const RELATED_TOOLS = [
  { href: '/home-cost/electricity-bill-calculator', label: 'Electricity Bill Calculator', icon: Zap },
  { href: '/home-cost/inverter-battery-calculator', label: 'Inverter & Battery Sizing', icon: BatteryCharging },
  { href: '/home-cost/ac-cost-calculator', label: 'AC Running Cost Calculator', icon: Wind },
];

export default function SolarCalculatorPage() {
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
            name: 'Rooftop Solar Size & Subsidy Calculator',
            item: 'https://Kagazo.in/home-cost/solar-calculator',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate the Right Solar Panel Size and PM Surya Ghar Subsidy for Your Home',
        description:
          'Use this free calculator to size your rooftop solar plant, estimate government subsidy, and calculate 25-year return on investment.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter your monthly electricity consumption',
            text: 'Input your average monthly electricity usage in units (kWh) from your DISCOM bill. This determines the solar capacity needed to offset your bill.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select your state for sunshine hours',
            text: 'Choose your state so the calculator applies the correct average peak sunshine hours per day for accurate generation estimates.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View recommended system size and subsidy',
            text: 'See the ideal kW system size, number of panels, roof area required, and your PM Surya Ghar DBT subsidy amount (up to ₹78,000).',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Review 25-year ROI and payback',
            text: 'View your total net investment after subsidy, estimated monthly savings, payback period in years, and cumulative 25-year savings.',
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
          { label: 'Rooftop Solar Size & Subsidy Calculator' },
        ]}
      />

      {/* Header Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          <Sun className="w-3.5 h-3.5" />
          <span>PM Surya Ghar: Muft Bijli Yojana — Up to ₹78,000 Subsidy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Rooftop Solar Calculator India — PM Surya Ghar Subsidy & 25-Year ROI
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Size your rooftop solar power plant, calculate your direct government DBT subsidy up to
          ₹78,000 under PM Surya Ghar Muft Bijli Yojana, and simulate your 25-year net savings with
          net metering.
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

import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { HomeChargerGuideEngine } from '@/components/vehicle-os/engines/HomeChargerGuideEngine';
import {
  BatteryCharging,
  Zap,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Home Charger Guide India | 16A Socket vs 7.4kW Wallbox Decision Tool | Kagazo',
  description:
    'Should you buy a ₹40,000 7.4kW AC Wallbox or use a standard ₹2,500 16A socket? Check charging hours, DISCOM sanctioned load upgrades, RWA NOC rules, and earthing requirements.',
  keywords: [
    'ev home charger installation guide india',
    '16a socket vs 7kw wallbox charging time',
    'sanctioned load upgrade for ev charger india',
    'rwa noc for ev charging apartment basement',
    'earthing resistance for ev charger ohms',
    'tata nexon ev home charging setup cost',
    'ac wallbox 7.4kw installation cost india',
    'single phase vs 3 phase ev charger home',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/home-charger-guide',
  },
  openGraph: {
    title: 'EV Home Charger Decision Tool | Kagazo Vehicle OS',
    description:
      'Compare 16A industrial sockets vs 7.4kW wallboxes based on your daily commute, battery capacity, and home electrical capacity.',
    url: 'https://Kagazo.in/vehicle-os/home-charger-guide',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Home Charger Guide India | Kagazo',
    description:
      'Evaluate whether your electrical connection needs an upgrade before buying an EV home charger.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://Kagazo.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Vehicle OS',
      item: 'https://Kagazo.in/vehicle-os',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'EV Home Charger Guide',
      item: 'https://Kagazo.in/vehicle-os/home-charger-guide',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo EV Home Charger Decision Tool',
  url: 'https://Kagazo.in/vehicle-os/home-charger-guide',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Decision engine evaluating 16A plug top-up times vs 7.4kW wallboxes, electrical sanction load limits, and apartment NOC steps.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a standard 16A socket recharge my daily commuting distance overnight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A standard 16A (3.3 kW) industrial socket delivers ~2.8 kW continuously to the vehicle. Over an 8-hour overnight sleep window, it supplies ~22.4 kWh of energy, which yields 150 to 175 km of real-world driving range. If your daily commute is under 70 km, a 16A socket easily replenishes your vehicle in 3.5 to 4 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What sanctioned load is required to install a 7.4kW AC Wallbox at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 7.4 kW charger draws ~32 Amperes on single-phase supply. If your home has a 3 kW or 5 kW sanctioned load, running the charger alongside a domestic air conditioner or water geyser will trip the main service cut-out fuse. You must apply for a load enhancement to at least 8 kW (single-phase) or 10 kW (3-phase) with your state electricity DISCOM.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the legal guidelines for EV charger installation in Indian apartment societies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Ministry of Power guidelines (2022 amendments), Resident Welfare Associations (RWAs) and Apartment Owners Associations (AOAs) cannot arbitrarily deny permission for EV charger installation in designated allotted parking slots. The resident is responsible for running a dedicated armored cable from their individual meter to the parking bay.',
      },
    },
    {
      '@type': 'Question',
      name: 'What earthing resistance is required for EV chargers in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All EV manufacturers and IS 17017 standards require dedicated earthing with a measured resistance of less than 2 Ohms (maximum permissible threshold is 5 Ohms). If earthing resistance is too high or neutral-to-earth voltage exceeds 4V, modern EV on-board chargers refuse to initiate charging and illuminate a red fault indicator.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'Can a standard 16A socket recharge my daily commuting distance overnight?',
    a: 'Yes. A standard 16A (3.3 kW) industrial socket delivers ~2.8 kW continuously to the vehicle. Over an 8-hour overnight sleep window, it supplies ~22.4 kWh of energy, which yields 150 to 175 km of real-world driving range. If your daily commute is under 70 km, a 16A socket easily replenishes your vehicle in 3.5 to 4 hours.',
  },
  {
    q: 'What sanctioned load is required to install a 7.4kW AC Wallbox at home?',
    a: 'A 7.4 kW charger draws ~32 Amperes on single-phase supply. If your home has a 3 kW or 5 kW sanctioned load, running the charger alongside a domestic air conditioner or water geyser will trip the main service cut-out fuse. You must apply for a load enhancement to at least 8 kW (single-phase) or 10 kW (3-phase) with your state electricity DISCOM.',
  },
  {
    q: 'What are the legal guidelines for EV charger installation in Indian apartment societies?',
    a: 'Under the Ministry of Power guidelines (2022 amendments), Resident Welfare Associations (RWAs) and Apartment Owners Associations (AOAs) cannot arbitrarily deny permission for EV charger installation in designated allotted parking slots. The resident is responsible for running a dedicated armored cable from their individual meter to the parking bay.',
  },
  {
    q: 'What earthing resistance is required for EV chargers in India?',
    a: 'All EV manufacturers and IS 17017 standards require dedicated earthing with a measured resistance of less than 2 Ohms (maximum permissible threshold is 5 Ohms). If earthing resistance is too high or neutral-to-earth voltage exceeds 4V, modern EV on-board chargers refuse to initiate charging and illuminate a red fault indicator.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'EV Home Charging Cost Calculator',
    description: 'Calculate monthly electricity bill impact based on domestic DISCOM tariffs and conversion losses.',
    href: '/vehicle-os/ev-home-charging',
    badge: 'Cost Sizer',
  },
  {
    title: 'EV vs Petrol Break-Even Calculator',
    description: 'Find out the exact payback month and 5-year net savings of switching from petrol to electric.',
    href: '/vehicle-os/ev-vs-petrol',
    badge: 'TCO Comparison',
  },
  {
    title: 'Battery Replacement & Degradation',
    description: 'Calculate 12V auxiliary and high-voltage traction battery aging, warranty limits, and replacement costs.',
    href: '/vehicle-os/battery-replacement',
    badge: 'Battery Health',
  },
];

export default function HomeChargerDecisionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Vehicle OS', href: '/vehicle-os' },
            { label: 'EV Home Charger Guide' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              EV Hardware Intelligence
            </span>
            <span className="text-xs font-semibold text-slate-500">16A Socket vs 7.4kW Wallbox</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Home Charger Decision Tool — What Charger Setup Do I Actually Need?
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Do you actually need to spend ₹40,000 on an expensive 7.4kW AC Wallbox, or does a standard ₹2,500 16-ampere industrial socket easily refill your daily commute overnight? Model your charging window and grid sanctioned load.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <HomeChargerGuideEngine />

        {/* Electrical Compliance & Setup Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Wrench className="w-4 h-4" />
              <span>Electrical Infrastructure Compliance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              4-Step Physical Installation Checklist for Indian Homes
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Charging an EV draws continuous high current over 4 to 8 hours. Never plug into regular household extension cords. Follow these safety mandates:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-black text-slate-900 uppercase">1. Dedicated Wiring</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use 4 sq. mm copper wire for 16A sockets (up to 30m) or 6 to 10 sq. mm armored cable for 7.4kW wallboxes direct from meter distribution.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-black text-slate-900 uppercase">2. MCB &amp; RCCB Protection</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Install a dedicated C-Curve 20A MCB with a Type-A 30mA residual current circuit breaker (RCCB) to prevent earth leakage risks.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-black text-slate-900 uppercase">3. Chemical Earth Pit</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensure a dedicated copper plate or chemical pipe earth electrode with measured ground resistance strictly below 2 Ohms.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-black text-slate-900 uppercase">4. RWA NOC Process</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit an application citing Central Electricity Authority (CEA) regulations with the wiring route and sub-meter placement map.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on EV Charger Installation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools Internal Linking */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Explore Related EV &amp; Vehicle Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {tool.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MileageAnomalyTrackerEngine } from '@/components/vehicle-os/engines/MileageAnomalyTrackerEngine';
import {
  Gauge,
  Fuel,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Activity,
  AlertTriangle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Real Mileage & Drop Anomaly Tracker India | Tank-to-Tank Fuel Log | Kagazo',
  description:
    'Track vehicle fuel consumption tank-to-tank in India. Establish your vehicle baseline km/L and detect mileage drop anomalies exceeding 15% before mechanical damage occurs.',
  keywords: [
    'fuel mileage tracker india',
    'tank to tank mileage calculator',
    'car mileage drop anomaly',
    'fuel economy drops suddenly causes',
    'bike mileage sudden decrease reason',
    'petrol average calculator km per litre',
    'diesel mileage drop troubleshooting india',
    'track car fuel efficiency real world',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/mileage-anomaly-tracker',
  },
  openGraph: {
    title: 'Real Mileage Tracker & Drop Anomaly Detector | Kagazo Vehicle OS',
    description:
      'Log full-to-full fuel fill-ups. Catch sudden 15%+ fuel economy drops caused by tyre drag, clogged filters, or faulty O2 sensors.',
    url: 'https://Kagazo.in/vehicle-os/mileage-anomaly-tracker',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Mileage & Anomaly Tracker India | Kagazo',
    description:
      'Track real-world tank-to-tank mileage in India and detect abnormal drops before major repair bills.',
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
      name: 'Mileage Anomaly Tracker',
      item: 'https://Kagazo.in/vehicle-os/mileage-anomaly-tracker',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Real Mileage & Drop Anomaly Tracker',
  url: 'https://Kagazo.in/vehicle-os/mileage-anomaly-tracker',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Free Indian automotive fuel economy logbook and statistical anomaly detection engine to uncover abrupt mileage drops.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is tank-to-tank fuel calculation more reliable than MID trip computer readings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multi-Information Displays (MIDs) calculate mileage based on electronic fuel injector pulse duration and wheel speed pulses, ignoring fuel density variations, idle evaporation, and fuel cut-off variances. Real-world tests across Indian vehicles show factory MID displays overestimate fuel efficiency by 8% to 14%. Tank-to-tank logging (Odometer delta divided by actual litres pumped) is the global gold standard for real net economy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What drop percentage indicates an actual vehicle anomaly vs driving variances?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A variance of 5% to 8% between tank fills is completely normal and can be caused by shifting from highway to city traffic or seasonal air conditioning usage. However, a sudden drop of 15% or more on the same commuting route indicates a mechanical or operational anomaly (e.g. under-inflated tyres, jammed brake caliper, choked air filter, or oxygen sensor degradation).',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does low tyre pressure degrade fuel mileage in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Driving with tyres underinflated by just 4 to 5 PSI increases rolling resistance significantly and reduces fuel economy by 5% to 10%. In Indian urban conditions where roads are uneven, maintaining manufacturer-recommended cold tyre pressure (measured in the morning before driving 2 km) can save ₹3,000 to ₹6,500 annually in petrol.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can adulterated petrol or diesel cause a sudden 20% mileage drop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Adulteration of petrol with solvent oils (hexane, naphtha) or diesel with subsidized kerosene degrades combustion efficiency and leads to incomplete burn, unmetered knocking, and ECU timing retardation. This can cause an instant 15% to 25% drop in tank range accompanied by mild engine hesitation or sluggish pickup.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'Why is tank-to-tank fuel calculation more reliable than MID trip computer readings?',
    a: 'Multi-Information Displays (MIDs) calculate mileage based on electronic fuel injector pulse duration and wheel speed pulses, ignoring fuel density variations, idle evaporation, and fuel cut-off variances. Real-world tests across Indian vehicles show factory MID displays overestimate fuel efficiency by 8% to 14%. Tank-to-tank logging (Odometer delta divided by actual litres pumped) is the global gold standard for real net economy.',
  },
  {
    q: 'What drop percentage indicates an actual vehicle anomaly vs driving variances?',
    a: 'A variance of 5% to 8% between tank fills is completely normal and can be caused by shifting from highway to city traffic or seasonal air conditioning usage. However, a sudden drop of 15% or more on the same commuting route indicates a mechanical or operational anomaly (e.g. under-inflated tyres, jammed brake caliper, choked air filter, or oxygen sensor degradation).',
  },
  {
    q: 'How much does low tyre pressure degrade fuel mileage in India?',
    a: 'Driving with tyres underinflated by just 4 to 5 PSI increases rolling resistance significantly and reduces fuel economy by 5% to 10%. In Indian urban conditions where roads are uneven, maintaining manufacturer-recommended cold tyre pressure (measured in the morning before driving 2 km) can save ₹3,000 to ₹6,500 annually in petrol.',
  },
  {
    q: 'Can adulterated petrol or diesel cause a sudden 20% mileage drop?',
    a: 'Yes. Adulteration of petrol with solvent oils (hexane, naphtha) or diesel with subsidized kerosene degrades combustion efficiency and leads to incomplete burn, unmetered knocking, and ECU timing retardation. This can cause an instant 15% to 25% drop in tank range accompanied by mild engine hesitation or sluggish pickup.',
  },
];

const RELATED_TOOLS = [
  {
    title: 'Trip True Cost Calculator',
    description: 'Calculate exact door-to-door trip cost including toll charges, fuel burn, and per-km wear tear.',
    href: '/vehicle-os/trip-true-cost',
    badge: 'Trip Economics',
  },
  {
    title: 'Service Quote Fairness Auditor',
    description: 'Audit dealer maintenance quotes against standard Indian OEM labour and parts benchmarks.',
    href: '/vehicle-os/service-quote-fairness',
    badge: 'Service Protection',
  },
  {
    title: 'Tyre Replacement Advisory',
    description: 'Evaluate tread depth wear (3mm warning / 1.6mm legal limit) and tyre aging life.',
    href: '/vehicle-os/tyre-replacement',
    badge: 'Safety & Wear',
  },
];

export default function MileageAnomalyTrackerPage() {
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
            { label: 'Real Mileage & Drop Anomaly Tracker' },
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              ⛽ Fuel Intelligence
            </span>
            <span className="text-xs font-semibold text-slate-500">Tank-to-Tank Anomaly Detector</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Real Mileage Tracker &amp; Drop Anomaly Detector
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Log every tank-full fill up. Our engine establishes your vehicle's baseline running economy and instantly warns you when mileage drops abnormally (&ge;15% drop) so you can investigate cold tyre pressure, air intake clogs, or fuel station dispenser discrepancies.
          </p>
        </div>

        {/* Interactive Engine Component */}
        <MileageAnomalyTrackerEngine />

        {/* Educational / Deep-Dive Guide Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Activity className="w-4 h-4" />
              <span>Fuel Economy Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Diagnosing Sudden Fuel Mileage Drops on Indian Roads
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When your fuel economy plunges from a steady 18 km/L down to 14 km/L, thousands of rupees in unburnt fuel are wasted every month. Here is the step-by-step diagnostic hierarchy recommended by automotive service engineers before rushing into costly component replacements:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Zero-Cost Checks</div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Check cold tyre pressure using a dedicated dial gauge (ideal: 32–35 PSI).</li>
                <li>Check for binding brake calipers by coasting on a slight neutral incline.</li>
                <li>Inspect engine air filter for dust and monsoon moisture contamination.</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Fuel &amp; Dispenser Audits</div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Verify auto-cutoff point consistency at the fuel pump.</li>
                <li>Switch to a company-owned company-operated (COCO) outlet for 2 tanks.</li>
                <li>Check for fuel cap seal leakage and unevaporated smell around tank neck.</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Sensor &amp; Ignition Review</div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Scan for pending OBD-II codes (P0130 to P0175 for O2 or MAF sensors).</li>
                <li>Inspect spark plug electrode gap (every 20,000 km on standard nickel plugs).</li>
                <li>Evaluate engine oil viscosity (e.g. using 20W-50 instead of recommended 0W-20).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Fuel Mileage &amp; Anomalies
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
            <span>Explore Related Vehicle Intelligence Tools</span>
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

import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { VehicleDashboardEngine } from '@/components/vehicle-os/engines/VehicleDashboardEngine';
import {
  Car,
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Gauge,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Digital Vehicle Garage & Running Cost Dashboard | Kagazo Vehicle OS',
  description:
    'Manage your car and bike telemetry in one unified dashboard. Track real-world ₹/km expenses, upcoming periodic service windows, insurance and PUC expiry dates, and battery/tyre health.',
  keywords: [
    'digital vehicle garage dashboard india',
    'car maintenance expense tracker app india',
    'track car running cost per km',
    'vehicle insurance and puc expiry tracker',
    'car service history and odometer log',
    'manage car expenses online india',
    'fleet and personal vehicle maintenance dashboard',
    'kagazo digital vehicle garage',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/dashboard',
  },
  openGraph: {
    title: 'Digital Vehicle Garage Dashboard | Kagazo Vehicle OS',
    description:
      'Manage multiple cars and two-wheelers in your digital garage. Track ₹/km running cost, service schedules, and statutory compliance.',
    url: 'https://Kagazo.in/vehicle-os/dashboard',
    siteName: 'Kagazo',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Vehicle Garage & Expense Dashboard | Kagazo',
    description:
      'Your vehicles, unified. Track ₹/km running costs, insurance renewals, and maintenance health.',
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
      name: 'Digital Vehicle Garage',
      item: 'https://Kagazo.in/vehicle-os/dashboard',
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kagazo Digital Vehicle Garage Dashboard',
  url: 'https://Kagazo.in/vehicle-os/dashboard',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'Vehicle telematics and financial management dashboard monitoring monthly cost allocations, statutory PUC and insurance validity, and component wear.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is the real-time "True Cost / km" calculated in the Digital Garage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'True Cost per kilometer combines all cash outflows: fuel burn (calculated using current fuel price and real-world mileage), amortized periodic service reserves (~₹750/mo), comprehensive insurance (~₹1,600/mo), and estimated highway tolls (~₹600/mo), divided by your actual monthly driving distance (e.g. ₹10,450 / 1,000 km = ₹10.45/km).',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the legal validity durations for PUC (Pollution Under Control) certificates in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Central Motor Vehicles Rules (CMVR), brand-new vehicles receive a 1-year PUC validity from the date of registration. After the first year, BS4 and BS6 compliant vehicles are granted a 12-month PUC validity following a clean tailpipe emission test. Older pre-BS4 vehicles require 6-month renewals. Driving with an expired PUC carries a statutory fine of ₹10,000 under Section 190(2) of the Motor Vehicles Act.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I track both personal cars and two-wheelers in the same garage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can add multiple vehicles across hatchbacks, sedans, SUVs, motorcycles, and gearless scooters. The dashboard stores your vehicle parameters locally in your browser and adapts wear intervals and cost benchmarks accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I schedule periodic service relative to the odometer alert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most modern Indian passenger cars require servicing every 10,000 km or 12 months (whichever occurs first). We advise booking an authorized dealer or trusted independent garage appointment approximately 1,000 km or 3 weeks prior to reaching the scheduled interval to prevent voiding warranty or running on degraded engine oil.',
      },
    },
  ],
};

const FAQS = [
  {
    q: 'How is the real-time "True Cost / km" calculated in the Digital Garage?',
    a: 'True Cost per kilometer combines all cash outflows: fuel burn (calculated using current fuel price and real-world mileage), amortized periodic service reserves (~₹750/mo), comprehensive insurance (~₹1,600/mo), and estimated highway tolls (~₹600/mo), divided by your actual monthly driving distance (e.g. ₹10,450 / 1,000 km = ₹10.45/km).',
  },
  {
    q: 'What are the legal validity durations for PUC (Pollution Under Control) certificates in India?',
    a: 'Under Central Motor Vehicles Rules (CMVR), brand-new vehicles receive a 1-year PUC validity from the date of registration. After the first year, BS4 and BS6 compliant vehicles are granted a 12-month PUC validity following a clean tailpipe emission test. Older pre-BS4 vehicles require 6-month renewals. Driving with an expired PUC carries a statutory fine of ₹10,000 under Section 190(2) of the Motor Vehicles Act.',
  },
  {
    q: 'Can I track both personal cars and two-wheelers in the same garage?',
    a: 'Yes. You can add multiple vehicles across hatchbacks, sedans, SUVs, motorcycles, and gearless scooters. The dashboard stores your vehicle parameters locally in your browser and adapts wear intervals and cost benchmarks accordingly.',
  },
  {
    q: 'When should I schedule periodic service relative to the odometer alert?',
    a: 'Most modern Indian passenger cars require servicing every 10,000 km or 12 months (whichever occurs first). We advise booking an authorized dealer or trusted independent garage appointment approximately 1,000 km or 3 weeks prior to reaching the scheduled interval to prevent voiding warranty or running on degraded engine oil.',
  },
];

const RELATED_TOOLS = [
  {
    title: '5-Year Cost Reality Checker',
    description: 'Model the 5-year total ownership cost including depreciation, interest, and maintenance.',
    href: '/vehicle-os/cost-reality-checker',
    badge: 'TCO Sizer',
  },
  {
    title: 'Service Quote Fairness Checker',
    description: 'Audit service center estimates to catch inflated labor and unneeded engine flushing items.',
    href: '/vehicle-os/service-quote-fairness',
    badge: 'Quote Audit',
  },
  {
    title: 'Depreciation & Resale Predictor',
    description: 'Calculate your vehicle’s fair market trade-in and private resale valuation curve.',
    href: '/vehicle-os/depreciation-resale',
    badge: 'Resale Value',
  },
];

export default function VehicleDashboardPage() {
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
            { label: 'Digital Vehicle Garage' },
          ]}
        />

        {/* Top Garage Bar */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                SaaS Vehicle Garage
              </span>
              <span className="text-xs font-semibold text-slate-500">Live Telemetry &amp; Alerts</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Digital Vehicle Garage
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Monitor real-world ₹/km running expenses, upcoming periodic service windows, and compliance expiry dates.
            </p>
          </div>
        </div>

        {/* Interactive Engine Component */}
        <VehicleDashboardEngine />

        {/* Educational / Deep Dive Guide */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600">
              <Gauge className="w-4 h-4" />
              <span>Telemetry &amp; Vehicle Governance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Why Centralizing Vehicle Records Protects Financial Value
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Car and bike owners lose tens of thousands of rupees simply by missing renewal deadlines or neglecting early wear indicators:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">1. Zero NCB Forfeiture</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Letting your motor insurance lapse past 90 days completely forfeits your accumulated No Claim Bonus (NCB), adding up to 50% in higher renewal premiums.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">2. Higher Resale Documentation</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vehicles with complete, time-stamped periodic maintenance logs fetch ₹35,000 to ₹75,000 higher private resale prices compared to undocumented cars.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase">3. Proactive Battery &amp; Tyre Swaps</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Replacing a degrading battery before stranded highway failure eliminates emergency tow truck charges (₹2,500+) and stressful road breakdowns.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions on Digital Garage Management
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
            <span>Explore Related Management &amp; Valuation Tools</span>
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

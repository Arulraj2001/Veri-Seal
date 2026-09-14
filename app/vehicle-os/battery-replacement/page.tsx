import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import BatteryReplacementEngine from '@/components/vehicle-os/engines/BatteryReplacementEngine';
import { BatteryCharging, HelpCircle, ChevronRight, Disc, Car, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Battery Replacement & Health Sizer India | Amaron vs Exide Scrap Rebate Guide',
  description:
    'Evaluate battery age, cold-cranking lag, and terminal voltage to prevent sudden highway strandings. Calculate replacement costs across Amaron and Exide after claiming ₹800–₹1,000 old battery scrap exchange rebate.',
  keywords: [
    'car battery replacement cost calculator India',
    'Amaron vs Exide car battery price with scrap exchange',
    'car battery life calculator India',
    'signs car battery is dying India',
    'old car battery scrap value price rupees',
    'car resting voltage 12.6V battery health',
    'cold cranking amps sluggish morning start',
    'car battery doorstep replacement warranty India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/battery-replacement',
  },
  openGraph: {
    title: 'Car Battery Replacement & Health Sizer India | Scrap Rebate Guide',
    description:
      'Is your car battery due for replacement? Test resting voltage and cranking lag to prevent highway stranding, with scrap rebate calculation.',
    url: 'https://Kagazo.in/vehicle-os/battery-replacement',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Battery Replacement Sizer India | Amaron vs Exide Guide',
    description:
      'Diagnose battery health, calculate remaining months, and claim up to ₹1,000 old battery scrap rebate.',
  },
};

const FAQS = [
  {
    question: 'How long does a 12V car battery last in Indian weather conditions?',
    answer:
      'In India, lead-acid car batteries typically last between 3 to 4 years (36–48 months). Extreme summer ambient temperatures (above 40°C in North and Central India) accelerate electrolyte evaporation and internal grid corrosion, causing batteries in hot regions to fail closer to the 36-month mark.',
  },
  {
    question: 'How much scrap rebate should I get for my old dead car battery in India?',
    answer:
      'Authorized battery retailers and doorstep fitment providers in India legally offer between ₹700 and ₹1,100 as an instant scrap rebate / exchange discount for your old dead battery (depending on whether it is a smaller 35Ah hatchback battery or a larger 65Ah SUV battery). Never let the garage keep your old battery for free!',
  },
  {
    question: 'What is a healthy resting voltage reading for a car battery?',
    answer:
      'Measured with a digital multimeter when the car has been turned off for at least 4 hours: 12.6V or higher represents 100% full charge, 12.4V represents roughly 75% charge, 12.2V indicates 50% charge (requires immediate charging), and anything below 12.0V means the battery is deeply discharged with sulfated plates and needs replacement.',
  },
  {
    question: 'What are the classic warning signs that a car battery is about to die?',
    answer:
      '(1) Sluggish, delayed starter motor cranking on the first cold morning start, (2) Dashboard lights and infotainment screen flickering or dimming when cranking, (3) Power windows rolling up noticeably slower with the engine off, and (4) The white circular "Magic Eye" indicator on top of the battery casing turning clear, red, or black.',
  },
];

const RELATED_TOOLS = [
  { href: '/vehicle-os/tyre-replacement', label: 'Car Tyre Replacement & Health Sizer', icon: Disc },
  { href: '/vehicle-os/cost-reality-checker', label: '5-Year True Ownership Cost Reality', icon: Car },
  { href: '/vehicle-os/service-quote-fairness', label: 'Car Service Quote Fairness Checker', icon: Wrench },
];

export default function BatteryReplacementPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Vehicle OS', item: 'https://Kagazo.in/vehicle-os' },
          { '@type': 'ListItem', position: 3, name: 'Battery Replacement Decision Tool', item: 'https://Kagazo.in/vehicle-os/battery-replacement' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Car Battery Replacement & Health Decision Tool',
        url: 'https://Kagazo.in/vehicle-os/battery-replacement',
        applicationCategory: 'AutomotiveApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Diagnose 12V automotive battery health, prevent highway stranding, and calculate old battery scrap rebates in India.',
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
    <div className="space-y-8 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Battery Health & Replacement Sizer' },
        ]}
      />

      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            High Commercial Intent
          </span>
          <span className="text-xs font-semibold text-slate-500">12V Automotive Battery Health</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Car Battery Replacement Decision Tool India — Is My Battery Actually Due?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Diagnose whether your morning cranking lag is a genuine failing battery plate or simply a discharged alternator issue. Find out when to replace, how much scrap rebate to claim, and the best replacement brands.
        </p>
      </div>

      {/* Interactive Engine */}
      <BatteryReplacementEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            How to Prevent Unscheduled Battery Failures in Indian Summers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why battery dead-stop happens without warning and how to stay ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Clean Terminal Corrosion (White Powder)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bluish-white copper sulfate powder on battery terminals creates electrical resistance that mimics a dead battery. Pour warm water over terminals and apply a thin layer of petroleum jelly.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Parasitic Drain from Dashcams</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              24x7 parking-mode dashcams hardwired to the fuse box constantly pull 200–300mA. If parked for 4+ days without driving, the battery discharges below the 11.8V critical starting threshold.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Claim Your Scrap Value Discount</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lead acid batteries contain recyclable lead plates. Authorized retailers are legally required to discount ₹800–₹1,000 off your new battery bill upon returning the old casing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-4">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <span className="text-amber-600 font-extrabold">Q:</span>
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Related Vehicle OS Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RELATED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-amber-400 rounded-2xl transition-all group shadow-xs">
                <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 leading-tight">{tool.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

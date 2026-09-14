import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import TyreReplacementEngine from '@/components/vehicle-os/engines/TyreReplacementEngine';
import { Disc, HelpCircle, ChevronRight, BatteryCharging, Car, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Tyre Replacement & Health Calculator India | Tread Depth, Age & Pricing Guide',
  description:
    'Audit car tyre health by tread depth (mm), manufacturing age, and sidewall cracks. Calculate remaining life, rotation timing, and compare replacement costs across MRF, CEAT, and Apollo in India.',
  keywords: [
    'car tyre replacement cost calculator India',
    'when to change car tyres tread depth mm India',
    'CEAT vs MRF vs Apollo tyre price comparison',
    'car tyre life in kms India',
    'minimum legal tyre tread depth India 1.6mm',
    'sidewall bulge tyre replacement safety',
    'tyre rotation schedule every 10000 km India',
    'tyre age DOT code checker India',
  ],
  alternates: {
    canonical: 'https://Kagazo.in/vehicle-os/tyre-replacement',
  },
  openGraph: {
    title: 'Car Tyre Replacement & Health Calculator India | Tread Depth & Pricing Guide',
    description:
      'Should you replace your car tyres today? Audit tread depth, age, and highway safety risk with remaining km estimation.',
    url: 'https://Kagazo.in/vehicle-os/tyre-replacement',
    siteName: 'Kagazo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Tyre Replacement Calculator India | Tread Depth & Cost Sizer',
    description:
      'Input tyre age and tread depth to get an objective wear verdict, remaining km estimate, and replacement pricing.',
  },
};

const FAQS = [
  {
    question: 'What is the minimum safe and legal tyre tread depth in India?',
    answer:
      'The statutory legal minimum tread depth across India is 1.6 mm, indicated by the raised Tread Wear Indicator (TWI) bars inside the main grooves. However, driving below 2.0 mm on wet monsoon roads dramatically increases the risk of aquaplaning and extends 80–0 km/h braking distance by over 18 meters. Most safety experts recommend replacing tyres once tread drops below 2.0–2.5 mm.',
  },
  {
    question: 'How long do car tyres typically last in Indian driving conditions?',
    answer:
      'On average Indian roads, standard OEM radial tyres last between 40,000 and 55,000 kilometers, or roughly 4 to 5 years (whichever comes first). Tyres driven primarily on concrete expressways (like Yamuna or Mumbai-Pune) experience higher surface friction and heat wear, often needing replacement closer to 35,000–40,000 km.',
  },
  {
    question: 'Can a tyre with plenty of tread still be dangerous due to age?',
    answer:
      'Yes! Rubber compounds naturally harden, oxidize, and develop micro-cracks over time, especially under hot Indian summer sun. Even if a tyre has 5 mm of tread remaining, any tyre older than 5 years (60 months) from its DOT manufacturing date poses a severe blowout risk at highway speeds. Always check the 4-digit code (e.g., "2421" means 24th week of 2021) on the outer sidewall.',
  },
  {
    question: 'Why does a tyre sidewall bulge require immediate replacement?',
    answer:
      'A bulge or bubble on the sidewall indicates that the internal structural polyester/steel cords have snapped, usually after hitting a sharp pothole or kerb at speed. The only layer holding air pressure inside is a thin strip of exterior rubber. A bulging tyre cannot be repaired and can blow out catastrophically at any moment without warning.',
  },
];

const RELATED_TOOLS = [
  { href: '/vehicle-os/battery-replacement', label: 'Car Battery Replacement & Health Sizer', icon: BatteryCharging },
  { href: '/vehicle-os/cost-reality-checker', label: '5-Year True Ownership Cost Reality', icon: Car },
  { href: '/vehicle-os/service-quote-fairness', label: 'Car Service Quote Fairness Checker', icon: Wrench },
];

export default function TyreReplacementPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://Kagazo.in' },
          { '@type': 'ListItem', position: 2, name: 'Vehicle OS', item: 'https://Kagazo.in/vehicle-os' },
          { '@type': 'ListItem', position: 3, name: 'Tyre Replacement Decision Tool', item: 'https://Kagazo.in/vehicle-os/tyre-replacement' },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Car Tyre Replacement & Health Decision Tool',
        url: 'https://Kagazo.in/vehicle-os/tyre-replacement',
        applicationCategory: 'AutomotiveApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Audit car tyre health by tread depth, manufacturing age, and sidewall cracks, and calculate remaining mileage in India.',
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
          { label: 'Tyre Health & Replacement Planner' },
        ]}
      />

      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            High Commercial Intent
          </span>
          <span className="text-xs font-semibold text-slate-500">Safety &amp; Replacement Auditor</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Car Tyre Replacement Decision Tool India — Should I Replace My Tyres Now?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Avoid replacing tyres prematurely or driving on dangerous bald rubber. Input your tyre age, tread depth, and road condition to get an objective wear audit, estimated remaining mileage, and verified tyre pricing.
        </p>
      </div>

      {/* Interactive Engine */}
      <TyreReplacementEngine />

      {/* Educational Guide */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            The 3 Tyre Life Extenders for Indian Driving Realities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simple habits that add 10,000+ km of safe driving to every set of tyres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">1. Tyre Rotation Every 10,000 km</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Front-wheel-drive cars carry engine weight and steering torque, wearing front tyres 2.5x faster than rear tyres. Rotating tyres front-to-back crosswise every 10,000 km ensures even wear across all 4 tyres.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">2. Fortnightly Cold PSI Checks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under-inflation by just 4 PSI increases rolling resistance, reduces fuel mileage by 3%, and causes shoulder tread wear. Check cold tyre pressure on the 1st and 15th of every month at a calibrated air pump.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">3. Wheel Alignment After Monsoons</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hitting potholes knocks steering toe and camber out of spec, causing feathering or uneven inside-edge wear that ruins a ₹6,000 tyre in under 5,000 km. Re-align after monsoon road deterioration.
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

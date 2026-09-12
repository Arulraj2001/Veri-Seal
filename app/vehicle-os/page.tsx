'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Car,
  Wrench,
  Receipt,
  Scale,
  Disc,
  BatteryCharging,
  Zap,
  Gauge,
  HelpCircle,
  ShieldCheck,
  Percent,
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { VEHICLE_TOOLS } from '@/components/vehicle-os/VehicleSubNav';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function VehicleOsHubPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedPillar, setSelectedPillar] = React.useState<'all' | 'buy' | 'own' | 'sell'>('all');

  const filteredTools = React.useMemo(() => {
    return VEHICLE_TOOLS.filter((t) => {
      const matchesPillar = selectedPillar === 'all' || t.category === selectedPillar;
      const matchesSearch =
        t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPillar && matchesSearch;
    });
  }, [searchQuery, selectedPillar]);

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS' },
        ]}
        showHomeIcon
      />

      {/* Hero Banner (Crisp Light Automotive Theme) */}
      <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Vehicle Decision &amp; Ownership Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            What is the <span className="text-amber-600">cheapest and smartest</span> way to own your vehicle?
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Move beyond generic car calculators. Audit garage repair estimates, analyze service invoices line-by-line, calculate your true 5-year ₹/km ownership cost, and pinpoint the exact moment to replace tyres, batteries, or switch to an EV.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/vehicle-os/service-quote-fairness"
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all"
            >
              <Wrench className="w-4 h-4" />
              <span>Check Service Quote (Top MVP)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/vehicle-os/cost-reality-checker"
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-sm transition-all"
            >
              <Car className="w-4 h-4" />
              <span>5-Year Cost Reality</span>
            </Link>

            <Link
              href="/vehicle-os/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm rounded-2xl transition-all"
            >
              <span>Open My Garage SaaS</span>
            </Link>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-slate-900">₹3,400+</div>
            <div className="text-[11px] text-slate-500 font-medium">Avg Service Upsells Saved</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-slate-900">₹14.80</div>
            <div className="text-[11px] text-slate-500 font-medium">Avg True Cost / km in India</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-slate-900">18 Tools</div>
            <div className="text-[11px] text-slate-500 font-medium">Full Buy • Own • Sell Life-Cycle</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            <div className="text-xl sm:text-2xl font-black text-emerald-700">100% Free</div>
            <div className="text-[11px] text-slate-500 font-medium">Independent &amp; RAM-Protected</div>
          </div>
        </div>
      </div>

      {/* Trust & Methodology Wedge Callout */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              The Trust Wedge: Service Integrity
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Did your workshop add AC disinfectant or engine flush to your bill?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Over 68% of dealership service estimates include non-mandatory chemical treatments and inflated consumable rates. Paste your estimate into our Service Quote Checker to identify red flags and get a polite, professional counter-script.
          </p>
        </div>

        <Link
          href="/vehicle-os/service-quote-fairness"
          className="shrink-0 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>Audit Your Quote Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Directory Filter & Search Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900">Browse All Decision Engines</h2>
            <p className="text-xs text-slate-500">
              Explore specialized tools built for specific purchase, ownership, and maintenance decisions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. tyre, EV, quote)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* 3 Pillars Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Engines' },
            { id: 'buy', label: 'Pillar 1: BUY (Purchase & Affordability)' },
            { id: 'own', label: 'Pillar 2: OWN (Running & Service Intelligence)' },
            { id: 'sell', label: 'Pillar 3: SELL (Resale & Exit Strategy)' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setSelectedPillar(pill.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all select-none whitespace-nowrap cursor-pointer ${
                selectedPillar === pill.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white border border-slate-200/90 hover:border-amber-400 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-9 w-9 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {getToolDescription(tool.href)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                  <span>Launch Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getToolDescription(href: string): string {
  switch (href) {
    case '/vehicle-os/service-quote-fairness':
      return 'Upload or paste garage estimates to detect overpriced consumables and unmandated add-on chemical flushes with counter-scripts.';
    case '/vehicle-os/service-invoice-analyzer':
      return 'Deconstruct completed service invoices into parts, labour, and taxes. Compare with prior services to pinpoint exact cost drivers.';
    case '/vehicle-os/cost-reality-checker':
      return 'The comprehensive 5-year reality: loan interest, fuel, insurance, maintenance, tyres, parking, and tolls for true ₹/km.';
    case '/vehicle-os/tyre-replacement':
      return 'Audit tyre age, tread depth (mm), and sidewall cracks to determine whether to replace, monitor, or rotate with verified tyre deals.';
    case '/vehicle-os/battery-replacement':
      return 'Evaluate battery age, cold-cranking lag, and voltage readings to prevent sudden highway strandings with scrap rebate offers.';
    case '/vehicle-os/compare':
      return 'Compare Car A vs Car B total ownership dynamically across 500, 1,000, and 2,000 km/month usage tiers.';
    case '/vehicle-os/ev-vs-petrol':
      return 'Calculate exact break-even timeline in months and 5-year net cash savings based on your daily driving and home charging tariff.';
    case '/vehicle-os/mileage-anomaly-tracker':
      return 'Log fuel fill-ups and trigger automatic anomaly warnings when mileage drops abnormally (e.g. 23% decrease).';
    case '/vehicle-os/trip-true-cost':
      return 'Calculate true road trip expenses including fuel, FASTag tolls, parking, and per-km wear & tear vs train or flight.';
    case '/vehicle-os/own-vs-cab':
      return 'Compare monthly cost of car ownership vs Ola/Uber cabs and public transit to find your exact break-even km threshold.';
    case '/vehicle-os/affordability-checker':
      return 'Determine if a vehicle realistically fits your monthly budget without stretching personal savings.';
    case '/vehicle-os/depreciation-resale':
      return 'Forecast 1-year, 2-year, and 3-year residual market values across Indian vehicle segments.';
    case '/vehicle-os/repair-or-replace':
      return 'Compare spending on a major repair vs selling and purchasing a newer vehicle over 1 to 3 years.';
    case '/vehicle-os/bike-vs-scooter':
      return 'Compare commuter motorcycles vs gearless scooters across fuel economy, tyres, luggage boot space, and comfort.';
    case '/vehicle-os/ev-home-charging':
      return 'Estimate daily, monthly, and annual electricity costs for home charging across Indian state power tariff slabs.';
    case '/vehicle-os/home-charger-guide':
      return 'Select between standard 16A 3.3kW sockets vs 7.4kW Type-2 AC Wallbox chargers based on your daily commute.';
    case '/vehicle-os/emergency-cost-planner':
      return 'Calculate an optimal monthly vehicle sinking fund to smoothly absorb insurance renewals, tyres, and repairs.';
    case '/vehicle-os/dashboard':
      return 'Digital vehicle garage tracking odometer, running cost ₹/km, insurance countdowns, and maintenance logs.';
    default:
      return 'Automotive ownership decision engine engineered for Indian driving realities.';
  }
}

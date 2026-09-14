'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { VEHICLE_TOOLS } from '@/components/vehicle-os/VehicleSubNav';

export default function VehicleOsHubClient() {
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900">Browse All Decision Engines</h2>
          <p className="text-xs text-slate-500">
            Explore specialized tools built for specific purchase, ownership, and maintenance decisions in India.
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

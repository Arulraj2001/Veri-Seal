'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Wrench,
  Receipt,
  Car,
  Disc,
  BatteryCharging,
  Scale,
  Zap,
  Gauge,
  MapPin,
  HelpCircle,
  LayoutDashboard,
  ShieldCheck,
  Percent,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const VEHICLE_TOOLS = [
  // --- FLAGSHIP & DASHBOARD ---
  {
    href: '/vehicle-os',
    label: 'Command Hub',
    category: 'all',
    icon: Car,
    badge: 'Hub',
  },
  {
    href: '/vehicle-os/dashboard',
    label: 'My Garage SaaS',
    category: 'own',
    icon: LayoutDashboard,
    badge: 'Digital Twin',
  },

  // --- OWN: TOP MVP TRUST WEDGE ---
  {
    href: '/vehicle-os/service-quote-fairness',
    label: 'Service Quote Checker',
    category: 'own',
    icon: Wrench,
    badge: 'Top MVP',
  },
  {
    href: '/vehicle-os/service-invoice-analyzer',
    label: 'Invoice Analyzer',
    category: 'own',
    icon: Receipt,
    badge: 'Audit',
  },
  {
    href: '/vehicle-os/cost-reality-checker',
    label: 'Cost Reality Checker',
    category: 'own',
    icon: Car,
    badge: '#1 TCO',
  },

  // --- OWN: HIGH-INTENT DECISIONS & AFFILIATES ---
  {
    href: '/vehicle-os/tyre-replacement',
    label: 'Tyre Decision',
    category: 'own',
    icon: Disc,
    badge: 'Wear Audit',
  },
  {
    href: '/vehicle-os/battery-replacement',
    label: 'Battery Health',
    category: 'own',
    icon: BatteryCharging,
    badge: 'Cranking',
  },
  {
    href: '/vehicle-os/mileage-anomaly-tracker',
    label: 'Mileage Anomaly',
    category: 'own',
    icon: Gauge,
    badge: 'Fuel Logs',
  },

  // --- BUY: PURCHASE INTELLIGENCE ---
  {
    href: '/vehicle-os/compare',
    label: 'Vehicle Comparison',
    category: 'buy',
    icon: Scale,
    badge: 'Usage Slabs',
  },
  {
    href: '/vehicle-os/ev-vs-petrol',
    label: 'EV vs Petrol',
    category: 'buy',
    icon: Zap,
    badge: 'Break-Even',
  },
  {
    href: '/vehicle-os/affordability-checker',
    label: 'Affordability Sizer',
    category: 'buy',
    icon: Percent,
    badge: 'Safe Limit',
  },
  {
    href: '/vehicle-os/bike-vs-scooter',
    label: 'Bike vs Scooter',
    category: 'buy',
    icon: Sparkles,
    badge: 'Commuter',
  },

  // --- EXTENDED COMMUTER & SELL UTILITIES ---
  {
    href: '/vehicle-os/trip-true-cost',
    label: 'Trip True-Cost',
    category: 'own',
    icon: MapPin,
    badge: 'Toll + Fuel',
  },
  {
    href: '/vehicle-os/own-vs-cab',
    label: 'Own vs Cab',
    category: 'buy',
    icon: HelpCircle,
    badge: 'Threshold',
  },
  {
    href: '/vehicle-os/depreciation-resale',
    label: 'Resale Predictor',
    category: 'sell',
    icon: ShieldCheck,
    badge: 'Residual',
  },
  {
    href: '/vehicle-os/repair-or-replace',
    label: 'Repair or Replace?',
    category: 'sell',
    icon: Wrench,
    badge: 'NPV Model',
  },
  {
    href: '/vehicle-os/ev-home-charging',
    label: 'EV Home Charging',
    category: 'own',
    icon: Zap,
    badge: 'Tariffs',
  },
  {
    href: '/vehicle-os/home-charger-guide',
    label: 'EV Charger Setup',
    category: 'own',
    icon: BatteryCharging,
    badge: '3.3kW vs 7kW',
  },
  {
    href: '/vehicle-os/emergency-cost-planner',
    label: 'Emergency Reserve',
    category: 'own',
    icon: ShieldCheck,
    badge: 'Sinking Fund',
  },
];

export function VehicleSubNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState<'all' | 'buy' | 'own' | 'sell'>('all');

  const filteredTools = React.useMemo(() => {
    if (activeTab === 'all') return VEHICLE_TOOLS;
    return VEHICLE_TOOLS.filter((t) => t.category === activeTab || t.category === 'all');
  }, [activeTab]);

  return (
    <div className="space-y-3">
      {/* Category Filter Pills (BUY / OWN / SELL) */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2.5 overflow-x-auto scrollbar-none">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-1 select-none">
          Pillars:
        </span>
        {[
          { id: 'all', label: 'All 18 Tools' },
          { id: 'buy', label: '1. BUY (Purchase & Affordability)' },
          { id: 'own', label: '2. OWN (Running & Service Intelligence)' },
          { id: 'sell', label: '3. SELL (Resale & Exit Strategy)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none',
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200/90'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Horizontal Scrollable Sub-Navigation Ribbon (Crisp Light Aesthetic) */}
      <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-2 backdrop-blur-xl shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        {filteredTools.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all select-none',
                isActive
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/80'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-white' : 'text-amber-600')} />
              <span>{link.label}</span>
              {link.badge && (
                <span
                  className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-tight',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-100/70 text-amber-800 border border-amber-300/40'
                  )}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Coins,
  Wrench,
  Disc,
  BatteryCharging,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function EmergencyCostPlannerPage() {
  const [vehicleCategory, setVehicleCategory] = React.useState<'hatchback' | 'suv' | 'sedan' | '2wheeler'>('suv');
  const [vehicleAgeYears, setVehicleAgeYears] = React.useState<number>(4);
  const [annualKm, setAnnualKm] = React.useState<number>(12000);

  // Cost estimates based on category & age
  const baseService =
    vehicleCategory === '2wheeler' ? 2400 : vehicleCategory === 'hatchback' ? 7500 : vehicleCategory === 'sedan' ? 10500 : 13500;
  const baseInsurance =
    vehicleCategory === '2wheeler' ? 3500 : vehicleCategory === 'hatchback' ? 22000 : vehicleCategory === 'sedan' ? 28000 : 36000;
  // Tyre reserve (set of 4 every 45k km)
  const annualTyreReserve = Math.round(
    ((vehicleCategory === '2wheeler' ? 3500 : vehicleCategory === 'hatchback' ? 18000 : 34000) / 45000) * annualKm
  );
  // Battery reserve (amortized over 3.5 years)
  const annualBatteryReserve = Math.round(
    (vehicleCategory === '2wheeler' ? 1600 : vehicleCategory === 'hatchback' ? 4800 : 6500) / 3.5
  );
  // Unexpected breakdown/towing/puncture fund (scales with age)
  const unexpectedContingency = Math.round(5000 + vehicleAgeYears * 2200);

  const totalAnnualReserve =
    baseService + baseInsurance + annualTyreReserve + annualBatteryReserve + unexpectedContingency;
  const recommendedMonthlySinkingFund = Math.round(totalAnnualReserve / 12);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Emergency Repair Sinking Fund' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            Sinking Fund Sizer
          </span>
          <span className="text-xs font-semibold text-slate-500">Zero-Panic Maintenance Buffer</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Vehicle Emergency Cost Planner — Your Monthly Sinking Fund
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Never get hit with an unexpected ₹30,000 bill for tyres, insurance renewal, or battery failure all in the same month. Calculate an exact monthly reserve to smoothly absorb all periodic and surprise vehicle costs.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Vehicle Profile</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Segment</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '2wheeler', label: '2-Wheeler' },
                    { id: 'hatchback', label: 'Hatchback' },
                    { id: 'sedan', label: 'Sedan' },
                    { id: 'suv', label: 'SUV / Crossover' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setVehicleCategory(s.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                        vehicleCategory === s.id
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Age (Years)</label>
                  <input
                    type="number"
                    value={vehicleAgeYears}
                    onChange={(e) => setVehicleAgeYears(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Older vehicles need higher repair buffer</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Annual Distance (km)</label>
                  <input
                    type="number"
                    value={annualKm}
                    onChange={(e) => setAnnualKm(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Recommended Reserve
              </span>
              <h2 className="text-3xl font-black text-amber-600 mt-1">
                ₹{recommendedMonthlySinkingFund.toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">/ month</span>
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                Keep this aside automatically in a high-yield liquid savings account
              </div>
            </div>

            {/* Annual Reserve Itemization */}
            <div className="space-y-2 text-xs font-mono border-t border-slate-200 pt-3 text-slate-700">
              <div className="flex justify-between">
                <span>• Annual Scheduled Service:</span>
                <span className="font-bold text-slate-900">₹{baseService.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>• Annual Insurance Policy:</span>
                <span className="font-bold text-slate-900">₹{baseInsurance.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>• Annualized Tyre Wear:</span>
                <span className="font-bold text-slate-900">₹{annualTyreReserve.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>• Annualized Battery Replacement:</span>
                <span className="font-bold text-slate-900">₹{annualBatteryReserve.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>• Unexpected Breakdown Contingency:</span>
                <span className="font-bold text-slate-900">₹{unexpectedContingency.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-black text-slate-900 text-sm">
                <span>Total Annual Reserve:</span>
                <span className="text-amber-700">₹{totalAnnualReserve.toLocaleString('en-IN')} / yr</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1">
              <div className="font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>The Zero-Stress Rule:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Setting up an automated standing instruction for <strong>₹{recommendedMonthlySinkingFund.toLocaleString('en-IN')}/month</strong> ensures that tyre changes, insurance renewals, and emergency towing never disrupt your family monthly budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

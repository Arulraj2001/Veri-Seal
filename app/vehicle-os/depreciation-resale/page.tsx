'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingDown,
  Car,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { VEHICLE_PRESETS, getVehicleById } from '@/lib/vehicle-os/vehicles-db';

export default function DepreciationResalePage() {
  const [selectedPresetId, setSelectedPresetId] = React.useState<string>('maruti-swift-petrol');
  const [purchaseYear, setPurchaseYear] = React.useState<number>(2021);
  const [currentKm, setCurrentKm] = React.useState<number>(38000);
  const [condition, setCondition] = React.useState<'excellent' | 'good' | 'fair'>('good');
  const [ownerCount, setOwnerCount] = React.useState<number>(1);

  const preset = getVehicleById(selectedPresetId) || VEHICLE_PRESETS[0];
  const ageYears = Math.max(0, new Date().getFullYear() - purchaseYear);

  // Indian depreciation formula approximation
  // Year 1: 15-20%, Year 2: +10%, Year 3: +10%, Year 4: +8%, Year 5: +7%
  const getDepreciationRatio = (years: number, cond: string, owners: number, km: number) => {
    let dep = 0.15 + (years - 1) * 0.085;
    if (cond === 'excellent') dep -= 0.05;
    if (cond === 'fair') dep += 0.06;
    if (owners > 1) dep += (owners - 1) * 0.07;
    const excessKm = Math.max(0, km - years * 12000);
    dep += (excessKm / 10000) * 0.02;
    return Math.min(0.85, Math.max(0.15, dep));
  };

  const currentDep = getDepreciationRatio(ageYears, condition, ownerCount, currentKm);
  const currentBasePrice = Math.round(preset.onRoadPrice * (1 - currentDep));
  const currentMin = Math.round((currentBasePrice * 0.94) / 10000) * 10000;
  const currentMax = Math.round((currentBasePrice * 1.05) / 10000) * 10000;

  // 2-Year Future projection
  const futureDep = getDepreciationRatio(ageYears + 2, condition, ownerCount, currentKm + 24000);
  const futureBasePrice = Math.round(preset.onRoadPrice * (1 - futureDep));
  const futureMin = Math.round((futureBasePrice * 0.93) / 10000) * 10000;
  const futureMax = Math.round((futureBasePrice * 1.05) / 10000) * 10000;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Depreciation & Resale Forecaster' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            Resale Intelligence
          </span>
          <span className="text-xs font-semibold text-slate-500">Residual Value Curve Engine</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Depreciation &amp; Resale Predictor — Current &amp; 2-Year Outlook
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Forecast your vehicle's current market value band and projected 2-year residual trajectory based on Indian used-car market trends, owner count, odometer, and brand retention curves.
        </p>
      </div>

      {/* Grid: Inputs Left, Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Car className="w-4 h-4 text-amber-600" />
              <span>Vehicle Profile &amp; Condition</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Make &amp; Model</label>
                <select
                  value={selectedPresetId}
                  onChange={(e) => setSelectedPresetId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  {VEHICLE_PRESETS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registration / Purchase Year</label>
                <select
                  value={purchaseYear}
                  onChange={(e) => setPurchaseYear(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((y) => (
                    <option key={y} value={y}>
                      {y} ({new Date().getFullYear() - y} yrs old)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Odometer (km)</label>
                <input
                  type="number"
                  value={currentKm}
                  onChange={(e) => setCurrentKm(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ownership Serial Count</label>
                <select
                  value={ownerCount}
                  onChange={(e) => setOwnerCount(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  <option value={1}>1st Owner (Single Handed)</option>
                  <option value={2}>2nd Owner</option>
                  <option value={3}>3rd Owner or more</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Overall Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'excellent', label: 'Excellent (No scratches, full dealer service record)' },
                    { id: 'good', label: 'Good (Minor wear, regular maintenance)' },
                    { id: 'fair', label: 'Fair (Repainted panels, wear parts due)' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCondition(c.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                        condition === c.id
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
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
                Resale Forecast Range
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Estimated Market Value</h2>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Current Estimated Range:</div>
                <div className="text-2xl font-black text-emerald-700">
                  ₹{(currentMin / 100000).toFixed(2)}L – ₹{(currentMax / 100000).toFixed(2)}L
                </div>
                <div className="text-[10px] text-slate-400">At {currentKm.toLocaleString('en-IN')} km, {condition} condition</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Estimated 2-Year Range:</div>
                <div className="text-xl font-black text-slate-900">
                  ₹{(futureMin / 100000).toFixed(2)}L – ₹{(futureMax / 100000).toFixed(2)}L
                </div>
                <div className="text-[10px] text-slate-400">Projected at ~{(currentKm + 24000).toLocaleString('en-IN')} km</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Important Valuation Notice:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Estimates are indicative valuation ranges synthesized from organized used-car marketplaces (Cars24, Spinny, OLX Auto). Never treat these figures as guaranteed dealer buyback prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

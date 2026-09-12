'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  Car,
  Coins,
  ShieldCheck,
  TrendingDown,
  Fuel,
  Wrench,
  Disc,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { calculateCostReality } from '@/lib/vehicle-os/calculations';
import { VEHICLE_PRESETS, getVehicleById } from '@/lib/vehicle-os/vehicles-db';
import { CostRealityInputs, CostRealityResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

export default function CostRealityCheckerPage() {
  const [selectedPresetId, setSelectedPresetId] = React.useState<string>('maruti-swift-petrol');

  const [inputs, setInputs] = React.useState<CostRealityInputs>({
    vehiclePrice: 1050000,
    downPayment: 250000,
    loanTenureYears: 5,
    loanInterestRate: 9.5,
    monthlyKm: 1000,
    fuelPricePerLitreOrKwh: 102,
    fuelEfficiency: 14.5,
    annualInsurance: 21000,
    annualServiceCost: 14400,
    tyreCost5Years: 35000,
    monthlyParking: 1000,
    monthlyTolls: 700,
    monthlyWashing: 500,
    accessoriesCost: 25000,
    expectedResaleValue: 520000,
    ownershipYears: 5,
  });

  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    const preset = getVehicleById(id);
    if (!preset) return;

    setInputs((prev) => ({
      ...prev,
      vehiclePrice: preset.onRoadPrice,
      downPayment: Math.round(preset.onRoadPrice * 0.2),
      fuelEfficiency: preset.expectedMileage,
      annualInsurance: preset.annualInsurance,
      annualServiceCost: preset.periodicServiceCost,
      tyreCost5Years: preset.tyreReplacementCost,
      expectedResaleValue: Math.round(preset.onRoadPrice * (preset.typicalDepreciation5Yr / 100)),
    }));
  };

  const result: CostRealityResult = React.useMemo(() => {
    return calculateCostReality(inputs);
  }, [inputs]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: '5-Year Cost Reality Checker' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            🥇 #1 Decision Engine
          </span>
          <span className="text-xs font-semibold text-slate-500">True 5-Year Ownership Reality</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Vehicle Cost Reality Checker — Beyond the Showroom Price
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Most car owners only think about the showroom sticker price and EMI. This engine uncovers your complete 5-year financial commitment—including fuel, insurance, maintenance, tyres, parking, FASTag tolls, and resale recovery—to reveal your true cost per month and true cost per kilometer.
        </p>

        {/* Preset Selector */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 shrink-0">
            Auto-fill from Indian Preset:
          </label>
          <select
            value={selectedPresetId}
            onChange={(e) => handlePresetSelect(e.target.value)}
            className="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {VEHICLE_PRESETS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} (₹{(v.onRoadPrice / 100000).toFixed(1)} Lakh)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Inputs Left, Cost Reality Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Purchase &amp; Loan Parameters</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  On-Road Purchase Price (₹)
                </label>
                <input
                  type="number"
                  value={inputs.vehiclePrice}
                  onChange={(e) => setInputs({ ...inputs, vehiclePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Down Payment (₹)
                </label>
                <input
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => setInputs({ ...inputs, downPayment: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loan Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.loanInterestRate}
                  onChange={(e) => setInputs({ ...inputs, loanInterestRate: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loan Tenure (Years)
                </label>
                <select
                  value={inputs.loanTenureYears}
                  onChange={(e) => setInputs({ ...inputs, loanTenureYears: parseInt(e.target.value) || 5 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  <option value={3}>3 Years (36 Months)</option>
                  <option value={5}>5 Years (60 Months)</option>
                  <option value={7}>7 Years (84 Months)</option>
                </select>
              </div>
            </div>

            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3 pt-2">
              <Fuel className="w-4 h-4 text-amber-600" />
              <span>Usage, Running &amp; Recurring Costs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Driving (km)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyKm}
                  onChange={(e) => setInputs({ ...inputs, monthlyKm: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Real Mileage (km/L or km/kWh)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={inputs.fuelEfficiency}
                  onChange={(e) => setInputs({ ...inputs, fuelEfficiency: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Insurance (₹)
                </label>
                <input
                  type="number"
                  value={inputs.annualInsurance}
                  onChange={(e) => setInputs({ ...inputs, annualInsurance: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Scheduled Service (₹)
                </label>
                <input
                  type="number"
                  value={inputs.annualServiceCost}
                  onChange={(e) => setInputs({ ...inputs, annualServiceCost: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tyre Replacement in 5 Yrs (₹)
                </label>
                <input
                  type="number"
                  value={inputs.tyreCost5Years}
                  onChange={(e) => setInputs({ ...inputs, tyreCost5Years: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Parking / Rent (₹)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyParking}
                  onChange={(e) => setInputs({ ...inputs, monthlyParking: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly FASTag / Tolls (₹)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyTolls}
                  onChange={(e) => setInputs({ ...inputs, monthlyTolls: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Resale in 5 Yrs (₹)
                </label>
                <input
                  type="number"
                  value={inputs.expectedResaleValue}
                  onChange={(e) => setInputs({ ...inputs, expectedResaleValue: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card: The Exact 5-Year Ownership Table (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Your Real 5-Year Cost
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Ownership Anatomy</h2>
            </div>

            {/* Structured Table */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-700">
                <span>Vehicle on-road price</span>
                <span className="font-bold text-slate-900">₹{result.vehiclePrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Loan interest (5-yr total)</span>
                  <span className="text-slate-900">₹{result.loanInterestTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fuel / Energy</span>
                  <span className="text-slate-900">₹{result.fuelTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Insurance (5 years)</span>
                  <span className="text-slate-900">₹{result.insuranceTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Periodic Service</span>
                  <span className="text-slate-900">₹{result.serviceTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tyres</span>
                  <span className="text-slate-900">₹{result.tyresTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Parking</span>
                  <span className="text-slate-900">₹{result.parkingTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>FASTag / tolls</span>
                  <span className="text-slate-900">₹{result.tollsTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300 flex justify-between items-center font-bold text-slate-900">
                <span>Gross 5-Year Outflow</span>
                <span>₹{result.grossOwnershipCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center text-emerald-700 font-bold">
                <span>Expected Resale Recovery</span>
                <span>-₹{result.resaleValue.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-center text-sm font-black text-slate-900">
                <span>NET TRUE COST</span>
                <span className="text-amber-600">₹{result.netOwnershipCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Big Impact Numbers */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl text-center">
                <div className="text-[10px] font-black uppercase text-amber-900 tracking-wider">
                  True Cost / Month
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-700 mt-0.5">
                  ₹{result.netCostPerMonth.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">(EMI alone is ₹{result.monthlyEMI.toLocaleString('en-IN')})</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                <div className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
                  True Cost / km
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  ₹{result.netCostPerKm}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Over {result.totalKmDriven.toLocaleString('en-IN')} km</div>
              </div>
            </div>

            {/* Decision Recommendation Insight */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-slate-700">
              <div className="font-extrabold text-slate-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Decision Intelligence Insight:</span>
              </div>
              <p className="leading-relaxed">
                Your monthly operational outgo is <strong>₹{result.netCostPerMonth.toLocaleString('en-IN')}</strong>. That means every day this vehicle sits parked in your garage, it depreciates and costs approximately <strong>₹{Math.round(result.netCostPerMonth / 30)}/day</strong>.
              </p>
              {result.netCostPerKm > 18 && (
                <p className="text-amber-800 font-semibold">
                  ⚠️ High ₹/km: At ₹{result.netCostPerKm}/km, taking premier on-demand cabs (Ola/Uber at ~₹18/km) is financially comparable without parking or maintenance hassles.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('insurance')}
        title="Lower Your Biggest Fixed Annual Cost: Motor Insurance"
        contextHint="Renewing outside dealer showrooms saves up to ₹8,000 annually with identical zero-depreciation coverage:"
      />
    </div>
  );
}

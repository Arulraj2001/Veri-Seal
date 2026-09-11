'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Scale,
  Trophy,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gauge,
  Fuel,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { compareVehiclesAcrossUsage } from '@/lib/vehicle-os/calculations';
import { VEHICLE_PRESETS, getVehicleById } from '@/lib/vehicle-os/vehicles-db';
import { ComparisonVehicle, UsageTierComparisonResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

export default function VehicleComparisonPage() {
  const [carAId, setCarAId] = React.useState<string>('maruti-brezza-petrol');
  const [carBId, setCarBId] = React.useState<string>('hyundai-creta-diesel');
  const [usageKm, setUsageKm] = React.useState<number>(1000);

  const presetA = getVehicleById(carAId) || VEHICLE_PRESETS[8];
  const presetB = getVehicleById(carBId) || VEHICLE_PRESETS[10];

  const carAData: ComparisonVehicle = React.useMemo(() => {
    return {
      name: presetA.name,
      purchasePrice: presetA.onRoadPrice,
      monthlyEMI: Math.round(presetA.onRoadPrice * 0.019), // approx 9.5% 5-yr
      fuelEfficiency: presetA.expectedMileage,
      insuranceYearly: presetA.annualInsurance,
      serviceYearly: presetA.periodicServiceCost,
      tyreCost5Yr: presetA.tyreReplacementCost,
      resalePercentage5Yr: presetA.typicalDepreciation5Yr,
    };
  }, [presetA]);

  const carBData: ComparisonVehicle = React.useMemo(() => {
    return {
      name: presetB.name,
      purchasePrice: presetB.onRoadPrice,
      monthlyEMI: Math.round(presetB.onRoadPrice * 0.019),
      fuelEfficiency: presetB.expectedMileage,
      insuranceYearly: presetB.annualInsurance,
      serviceYearly: presetB.periodicServiceCost,
      tyreCost5Yr: presetB.tyreReplacementCost,
      resalePercentage5Yr: presetB.typicalDepreciation5Yr,
    };
  }, [presetB]);

  const result: UsageTierComparisonResult = React.useMemo(() => {
    return compareVehiclesAcrossUsage(carAData, carBData, usageKm);
  }, [carAData, carBData, usageKm]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            🆚 Decision Engine #2
          </span>
          <span className="text-xs font-semibold text-slate-500">Usage-Tiered Ownership Battle</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Vehicle Comparison Engine — Real Ownership vs Static Specs
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Stop comparing brochure BHP and torque figures. Compare what actually leaves your bank account each month across purchase price, EMI, fuel, insurance, service, and resale. Toggle your monthly usage to watch the financial winner change dynamically.
        </p>

        {/* Vehicle Selection Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Select Vehicle A
            </label>
            <select
              value={carAId}
              onChange={(e) => setCarAId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900"
            >
              {VEHICLE_PRESETS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} (₹{(v.onRoadPrice / 100000).toFixed(1)}L)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Select Vehicle B
            </label>
            <select
              value={carBId}
              onChange={(e) => setCarBId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900"
            >
              {VEHICLE_PRESETS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} (₹{(v.onRoadPrice / 100000).toFixed(1)}L)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Usage Toggle Ribbon */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">The Decision Lever</span>
          <h2 className="text-base font-black text-slate-900">Change Your Monthly Driving Pattern:</h2>
          <span className="text-xs text-slate-500">Currently: {usageKm.toLocaleString('en-IN')} km / month</span>
        </div>

        <div className="flex items-center gap-2">
          {[500, 1000, 1500, 2000, 2500].map((km) => (
            <button
              key={km}
              type="button"
              onClick={() => setUsageKm(km)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                usageKm === km
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {km.toLocaleString('en-IN')} km/mo
            </button>
          ))}
        </div>
      </div>

      {/* Winner Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-black uppercase tracking-wider text-amber-900">
            Ownership Winner at {usageKm.toLocaleString('en-IN')} km/month:
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          Winner: {result.winner === 'carA' ? carAData.name : carBData.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
          {result.decisionReason}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-extrabold text-amber-900 shadow-2xs">
            Saves: ₹{result.monthlySavings.toLocaleString('en-IN')} / month
          </div>
          <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-extrabold text-amber-900 shadow-2xs">
            5-Year Net Delta: ₹{result.fiveYearSavings.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 overflow-x-auto">
        <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>Full 5-Year Ownership Matrix ({usageKm.toLocaleString('en-IN')} km/mo)</span>
        </h2>

        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-500 uppercase text-[10px]">
              <th className="py-3 px-4">Financial Metric</th>
              <th className={`py-3 px-4 ${result.winner === 'carA' ? 'bg-amber-50 font-black text-amber-900 rounded-t-xl' : ''}`}>
                {carAData.name} {result.winner === 'carA' && '🏆'}
              </th>
              <th className={`py-3 px-4 ${result.winner === 'carB' ? 'bg-amber-50 font-black text-amber-900 rounded-t-xl' : ''}`}>
                {carBData.name} {result.winner === 'carB' && '🏆'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Purchase On-Road</td>
              <td className="py-3 px-4">₹{(carAData.purchasePrice / 100000).toFixed(2)} Lakh</td>
              <td className="py-3 px-4">₹{(carBData.purchasePrice / 100000).toFixed(2)} Lakh</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Estimated Monthly EMI (5-Yr)</td>
              <td className="py-3 px-4">₹{carAData.monthlyEMI.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4">₹{carBData.monthlyEMI.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Real Mileage / Efficiency</td>
              <td className="py-3 px-4">{carAData.fuelEfficiency} km/L</td>
              <td className="py-3 px-4">{carBData.fuelEfficiency} km/L</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Fuel Outflow / Month</td>
              <td className="py-3 px-4">₹{result.carA.monthlyFuel.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4">₹{result.carB.monthlyFuel.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Annual Insurance</td>
              <td className="py-3 px-4">₹{carAData.insuranceYearly.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4">₹{carBData.insuranceYearly.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Annual Scheduled Service</td>
              <td className="py-3 px-4">₹{carAData.serviceYearly.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4">₹{carBData.serviceYearly.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">5-Year Gross Expense</td>
              <td className="py-3 px-4">₹{result.carA.fiveYearCost.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4">₹{result.carB.fiveYearCost.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-900">Projected Resale Recovery</td>
              <td className="py-3 px-4 text-emerald-700">-₹{result.carA.resaleValue.toLocaleString('en-IN')}</td>
              <td className="py-3 px-4 text-emerald-700">-₹{result.carB.resaleValue.toLocaleString('en-IN')}</td>
            </tr>
            <tr className="bg-slate-50 font-black text-slate-900 border-t-2 border-slate-300">
              <td className="py-3.5 px-4">True Net 5-Year Outflow</td>
              <td className={`py-3.5 px-4 ${result.winner === 'carA' ? 'text-amber-600 text-sm' : ''}`}>
                ₹{result.carA.netFiveYearCost.toLocaleString('en-IN')}
              </td>
              <td className={`py-3.5 px-4 ${result.winner === 'carB' ? 'text-amber-600 text-sm' : ''}`}>
                ₹{result.carB.netFiveYearCost.toLocaleString('en-IN')}
              </td>
            </tr>
            <tr className="bg-slate-100/70 font-black text-slate-900">
              <td className="py-3.5 px-4">Net Cost / Kilometer</td>
              <td className={`py-3.5 px-4 ${result.winner === 'carA' ? 'text-amber-600' : ''}`}>
                ₹{result.carA.costPerKm} / km
              </td>
              <td className={`py-3.5 px-4 ${result.winner === 'carB' ? 'text-amber-600' : ''}`}>
                ₹{result.carB.costPerKm} / km
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('insurance')}
        title="Thinking of Purchasing One of These Vehicles?"
        contextHint="Get pre-approved dealer insurance and loan rate comparisons before visiting the showroom:"
      />
    </div>
  );
}

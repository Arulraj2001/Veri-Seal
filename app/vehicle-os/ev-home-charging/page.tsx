'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Zap,
  BatteryCharging,
  TrendingDown,
  Sparkles,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { VEHICLE_PRESETS } from '@/lib/vehicle-os/vehicles-db';

export default function EvHomeChargingCostPage() {
  const [batterySizeKwh, setBatterySizeKwh] = React.useState<number>(30.0); // e.g. Tiago / Punch / Nexon
  const [dailyKm, setDailyKm] = React.useState<number>(45);
  const [efficiencyKmPerKwh, setEfficiencyKmPerKwh] = React.useState<number>(7.5);
  const [tariffPerUnit, setTariffPerUnit] = React.useState<number>(7.5); // ₹ per kWh
  const [chargingLossPercent, setChargingLossPercent] = React.useState<number>(12); // AC-to-DC conversion & thermal loss (10-15%)
  const [publicChargingRate, setPublicChargingRate] = React.useState<number>(22.0); // Public DC fast rate

  // Computations
  const lossMultiplier = 1 + chargingLossPercent / 100;
  const netDailyKwhNeeded = dailyKm / efficiencyKmPerKwh;
  const grossDailyKwhFromGrid = netDailyKwhNeeded * lossMultiplier;

  const dailyHomeCost = Math.round(grossDailyKwhFromGrid * tariffPerUnit);
  const monthlyHomeCost = dailyHomeCost * 30;
  const annualHomeCost = dailyHomeCost * 365;
  const costPerKmHome = Number((dailyHomeCost / dailyKm).toFixed(2));

  // Public charging comparison
  const dailyPublicCost = Math.round(netDailyKwhNeeded * publicChargingRate);
  const monthlyPublicCost = dailyPublicCost * 30;
  const monthlyHomeSavingsVsPublic = Math.max(0, monthlyPublicCost - monthlyHomeCost);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
            EV Energy Economics
          </span>
          <span className="text-xs font-semibold text-slate-500">Tariff Slabs &amp; Thermal Loss Modeling</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          EV Home Charging Cost Calculator — Daily, Monthly &amp; Annual Sizer
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Calculate your exact home electricity bill impact when plugging in your EV overnight. Factoring in AC-to-DC conversion losses (10-15%) and state domestic tariff slabs, compare home charging vs public DC fast charging.
        </p>
      </div>

      {/* Grid: Inputs Left, Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>EV Battery &amp; Tariff Inputs</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Battery Pack Capacity (kWh)</label>
                <input
                  type="number"
                  step="0.5"
                  value={batterySizeKwh}
                  onChange={(e) => setBatterySizeKwh(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Tiago: 24kWh, Punch: 35kWh, Nexon: 40.5kWh</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Daily Running Distance (km)</label>
                <input
                  type="number"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Real Efficiency (km / kWh)</label>
                <input
                  type="number"
                  step="0.2"
                  value={efficiencyKmPerKwh}
                  onChange={(e) => setEfficiencyKmPerKwh(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home Electricity Tariff (₹/unit)</label>
                <input
                  type="number"
                  step="0.5"
                  value={tariffPerUnit}
                  onChange={(e) => setTariffPerUnit(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Charging AC-to-DC Loss (%)</label>
                <input
                  type="number"
                  value={chargingLossPercent}
                  onChange={(e) => setChargingLossPercent(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Standard on-board charger heat loss is 10-15%</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Public Fast Charger Rate (₹/kWh)</label>
                <input
                  type="number"
                  value={publicChargingRate}
                  onChange={(e) => setPublicChargingRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Home Charging Bill Impact
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">₹{costPerKmHome} / km</h2>
              <div className="text-xs text-slate-500 mt-0.5">True electricity cost per kilometer driven</div>
            </div>

            <div className="space-y-2.5 font-mono text-xs border-t border-slate-200 pt-3">
              <div className="flex justify-between items-center text-slate-700">
                <span>Daily Charging Cost:</span>
                <span className="font-bold text-slate-900">₹{dailyHomeCost.toLocaleString('en-IN')} / day</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Monthly Electricity Outflow:</span>
                <span className="font-black text-emerald-700 text-sm">
                  ₹{monthlyHomeCost.toLocaleString('en-IN')} / month
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Annual Fuel Outflow:</span>
                <span className="font-bold text-slate-900">₹{annualHomeCost.toLocaleString('en-IN')} / year</span>
              </div>
            </div>

            {/* Public vs Home Comparison Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1.5 text-emerald-950">
              <div className="font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Home vs Public DC Charging Comparison:</span>
              </div>
              <p className="leading-relaxed">
                Relying exclusively on commercial highway fast chargers would cost <strong>₹{monthlyPublicCost.toLocaleString('en-IN')}/month</strong>.
              </p>
              <p className="font-bold text-emerald-800">
                ⚡ Charging at home on domestic tariffs saves you <strong>₹{monthlyHomeSavingsVsPublic.toLocaleString('en-IN')} each month</strong> (~68% savings)!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

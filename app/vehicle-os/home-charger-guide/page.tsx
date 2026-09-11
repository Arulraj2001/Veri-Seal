'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  BatteryCharging,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

export default function HomeChargerDecisionPage() {
  const [batteryKwh, setBatteryKwh] = React.useState<number>(30.0);
  const [dailyKm, setDailyKm] = React.useState<number>(45);
  const [electricalSanctionedKw, setElectricalSanctionedKw] = React.useState<number>(5); // e.g. 3kW, 5kW, 8kW
  const [parkingType, setParkingType] = React.useState<'dedicated-garage' | 'open-stilt' | 'apartment-basement'>('dedicated-garage');
  const [desiredOvernightHours, setDesiredOvernightHours] = React.useState<number>(8);

  // Computations
  // Daily energy needed = (dailyKm / 7.5) * 1.15
  const dailyKwhNeeded = Number(((dailyKm / 7.2) * 1.15).toFixed(1));

  // Option 1: Standard 16A 3-Pin Socket (3.3kW AC)
  // Continuous real output: ~2.8kW
  const hours16A = Number((dailyKwhNeeded / 2.8).toFixed(1));
  const fullCharge16AHours = Number((batteryKwh / 2.8).toFixed(1));

  // Option 2: 7.4kW AC Fast Wallbox
  // Continuous real output: ~6.8kW
  const hours7Kw = Number((dailyKwhNeeded / 6.8).toFixed(1));
  const fullCharge7KwHours = Number((batteryKwh / 6.8).toFixed(1));

  // Verdict recommendation
  const canRelyOn16A = hours16A <= desiredOvernightHours;
  const needsSanctionLoadUpgrade = electricalSanctionedKw < 7;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            EV Hardware Intelligence
          </span>
          <span className="text-xs font-semibold text-slate-500">16A Socket vs 7.4kW Wallbox</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Home Charger Decision Tool — What Charger Setup Do I Actually Need?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Do you actually need to spend ₹40,000 on an expensive 7.4kW AC Wallbox, or does a standard ₹2,500 16-ampere industrial socket easily refill your daily commute overnight? Model your charging window and grid sanctioned load.
        </p>
      </div>

      {/* Grid: Inputs Left, Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>EV &amp; Electrical Grid Capacity</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">EV Battery Size (kWh)</label>
                <input
                  type="number"
                  step="0.5"
                  value={batteryKwh}
                  onChange={(e) => setBatteryKwh(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Daily Commute (km)</label>
                <input
                  type="number"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Home Sanctioned Load (kW)
                </label>
                <input
                  type="number"
                  value={electricalSanctionedKw}
                  onChange={(e) => setElectricalSanctionedKw(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Check on your electricity bill</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Available Overnight Window (Hours)
                </label>
                <input
                  type="number"
                  value={desiredOvernightHours}
                  onChange={(e) => setDesiredOvernightHours(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Parking Situation</label>
                <select
                  value={parkingType}
                  onChange={(e) => setParkingType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  <option value="dedicated-garage">Individual House / Private Gated Garage</option>
                  <option value="open-stilt">Stilt Ground Parking (Common Meter Access)</option>
                  <option value="apartment-basement">Multi-Storey Apartment Basement (RWA NOC Required)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Setup Recommendation
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {canRelyOn16A ? '🔌 Standard 16A 3.3kW Socket Suffices' : '⚡ 7.4kW Fast Wallbox Recommended'}
              </h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              To replenish your {dailyKm} km daily commute, your vehicle requires <strong>{dailyKwhNeeded} kWh</strong> of electrical energy.
            </p>

            {/* Speed Comparison */}
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 font-sans flex justify-between">
                  <span>Option A: 16A Industrial Socket (3.3kW)</span>
                  <span className="text-emerald-700">Cost: ~₹2,500</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Daily commute top-up:</span>
                  <span className="font-bold text-slate-900">{hours16A} Hours</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>0 to 100% full charge:</span>
                  <span className="font-bold text-slate-900">{fullCharge16AHours} Hours</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 font-sans flex justify-between">
                  <span>Option B: 7.4kW Fast AC Wallbox</span>
                  <span className="text-amber-700">Cost: ~₹35,000+</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Daily commute top-up:</span>
                  <span className="font-bold text-slate-900">{hours7Kw} Hours</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>0 to 100% full charge:</span>
                  <span className="font-bold text-slate-900">{fullCharge7KwHours} Hours</span>
                </div>
              </div>
            </div>

            {/* Grid Warning */}
            {needsSanctionLoadUpgrade && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Sanctioned Load Warning:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Installing a 7.4kW Wallbox on a {electricalSanctionedKw}kW sanctioned meter will trip your main MCB if running along with household ACs. You must apply for a DISCOM load enhancement to 8kW or 10kW.
                </p>
              </div>
            )}

            <div className="flex items-start gap-1.5 text-[10px] text-slate-400 pt-1">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                * We do not provide electrical installation certificates. Always hire a certified licensed electrician to install dedicated 4 sq.mm copper wiring and earth pit resistance &lt; 5 ohms.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('ev-charger')}
        title="Verified Home EV Chargers &amp; Wallboxes"
        contextHint="Shop safety-certified Type-2 EV wallbox units compatible with all Indian electric cars:"
      />
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import {
  Wind,
  Thermometer,
  Clock,
  Sparkles,
  TrendingDown,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { calculateAcDetailedCost } from '@/lib/home-cost/calculations';

export default function AcCostEngine() {
  const [tonnage, setTonnage] = useState<1.0 | 1.5 | 2.0>(1.5);
  const [isInverter, setIsInverter] = useState<boolean>(true);
  const [starRating, setStarRating] = useState<3 | 5>(3);
  const [roomSizeSqFt, setRoomSizeSqFt] = useState<number>(150);
  const [setTemperature, setSetTemperature] = useState<number>(24);
  const [ambientTemperature, setAmbientTemperature] = useState<number>(38);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [monthsActivePerYear, setMonthsActivePerYear] = useState<number>(8);
  const [tariffPerUnit, setTariffPerUnit] = useState<number>(7.5);

  const result = useMemo(() => {
    return calculateAcDetailedCost({
      tonnage,
      isInverter,
      starRating,
      roomSizeSqFt,
      setTemperature,
      ambientTemperature,
      hoursPerDay,
      monthsActivePerYear,
      tariffPerUnit,
    });
  }, [
    tonnage,
    isInverter,
    starRating,
    roomSizeSqFt,
    setTemperature,
    ambientTemperature,
    hoursPerDay,
    monthsActivePerYear,
    tariffPerUnit,
  ]);

  const handleAffiliateClick = () => {
    const query = encodeURIComponent(`5 star inverter ac ${tonnage} ton daikin panasonic`);
    window.open(`https://www.amazon.in/s?k=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Input Controls Panel */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Wind className="w-5 h-5 text-sky-600" />
          <span>Air Conditioner Specifications &amp; Climate Inputs</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tonnage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              AC Cooling Capacity (Tonnage)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1.0, 1.5, 2.0].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTonnage(t as 1.0 | 1.5 | 2.0)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    tonnage === t
                      ? 'bg-sky-50 border-sky-400 text-sky-800 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {t} Ton
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {tonnage === 1.0 ? 'Up to 120 sq ft (small bedroom)' : tonnage === 1.5 ? '120–180 sq ft (standard bedroom)' : '180–250 sq ft (large living room)'}
            </p>
          </div>

          {/* Compressor Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Compressor Technology
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsInverter(true)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isInverter
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Inverter (Modulating)
              </button>
              <button
                type="button"
                onClick={() => setIsInverter(false)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  !isInverter
                    ? 'bg-amber-50 border-amber-400 text-amber-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Non-Inverter (Fixed)
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Inverters consume 30%–40% less power by throttling speed.
            </p>
          </div>

          {/* BEE Star Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              BEE Star Rating
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStarRating(3)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  starRating === 3
                    ? 'bg-sky-50 border-sky-400 text-sky-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                3-Star Rating
              </button>
              <button
                type="button"
                onClick={() => setStarRating(5)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  starRating === 5
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                5-Star Rating (ISEER 5.2+)
              </button>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
          {/* Thermostat Setting */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Set Thermostat Temp</span>
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">{setTemperature}°C</span>
            </div>
            <input
              type="range"
              min={18}
              max={28}
              value={setTemperature}
              onChange={(e) => setSetTemperature(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              BEE recommends 24°C for peak thermal health &amp; power savings.
            </p>
          </div>

          {/* Daily Runtime */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Daily Running Hours</span>
              <span className="text-sky-700 font-extrabold bg-sky-50 px-2 py-0.5 rounded">{hoursPerDay} hrs/day</span>
            </div>
            <input
              type="range"
              min={1}
              max={16}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Average night runtime is typically 7 to 9 hours.
            </p>
          </div>

          {/* Outside Ambient Heat */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Outside Ambient Peak Temp</span>
              <span className="text-amber-700 font-extrabold bg-amber-50 px-2 py-0.5 rounded">{ambientTemperature}°C</span>
            </div>
            <input
              type="range"
              min={30}
              max={46}
              value={ambientTemperature}
              onChange={(e) => setAmbientTemperature(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Temperatures &gt;38°C increase heat rejection work on condenser.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Running Cost Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Daily Operating Cost</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{Math.round(result.dailyUnits * tariffPerUnit)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {result.dailyUnits} units/day (~{result.effectiveWattage}W avg)
          </span>
        </div>

        <div className="bg-white border border-sky-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-sky-700 font-bold block">Monthly Electricity Cost</span>
          <div className="text-3xl font-black text-sky-600 mt-1">
            ₹{result.monthlyCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {result.monthlyUnits} units / month
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Annual Cooling Cost ({monthsActivePerYear} Mos)</span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{result.annualCost.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {result.annualUnits} units / year
          </span>
        </div>
      </div>

      {/* Head-to-Head 3-Star vs 5-Star Break-Even Comparison */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
              Purchase Decision Intelligence
            </span>
            <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">
              3-Star vs 5-Star Inverter AC: Is the Extra Price Worth It?
            </h4>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-500 block font-medium">Break-even Payback</span>
            <span className="text-2xl font-black text-emerald-700">
              ~{result.comparison.paybackYears} Years
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3-Star Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Model A: 3-Star Inverter</span>
              <span className="text-xs font-semibold text-slate-400">Baseline Price</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              ₹{result.comparison.annualCost3Star.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/year running</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lower initial purchase cost (~₹32,000–₹35,000), but burns more units annually in hot summer months.
            </p>
          </div>

          {/* 5-Star Card */}
          <div className="bg-white border border-emerald-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">Model B: 5-Star Heavy Duty Inverter</span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-700">
              ₹{result.comparison.annualCost5Star.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/year running</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Saves <strong className="text-slate-900">₹{result.comparison.annualSavingWith5Star.toLocaleString('en-IN')} every year</strong> on electricity bills.
              Recovers its ₹{result.comparison.pricePremium5Star.toLocaleString('en-IN')} purchase premium in just ~{result.comparison.paybackYears} years!
            </p>
          </div>
        </div>

        {/* Affiliate CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAffiliateClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>View Top-Rated 5-Star Inverter ACs on Amazon</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

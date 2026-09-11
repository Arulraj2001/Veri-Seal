'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Disc,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Info,
  Car,
} from 'lucide-react';
import { evaluateTyres } from '@/lib/vehicle-os/calculations';
import { TyreAssessmentInputs, TyreAssessmentResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

export default function TyreReplacementPage() {
  const [inputs, setInputs] = React.useState<TyreAssessmentInputs>({
    tyreAgeMonths: 42,
    odometerKm: 38000,
    treadDepthMm: 2.8,
    hasCracksOrBulges: false,
    drivingEnvironment: 'mixed',
  });

  const result: TyreAssessmentResult = React.useMemo(() => {
    return evaluateTyres(inputs);
  }, [inputs]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            High Commercial Intent
          </span>
          <span className="text-xs font-semibold text-slate-500">Safety &amp; Replacement Auditor</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tyre Replacement Decision Tool — Should I Replace My Tyres Now?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Avoid replacing tyres prematurely or driving on dangerous bald rubber. Input your tyre age, tread depth, and road condition to get an objective wear audit, estimated remaining mileage, and verified tyre pricing.
        </p>
      </div>

      {/* Grid: Inputs Left, Verdict Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Disc className="w-4 h-4 text-amber-600" />
              <span>Tyre Condition Inputs</span>
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Tread Depth (mm)</label>
                  <span className="text-xs font-mono font-black text-amber-600">{inputs.treadDepthMm} mm</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.2"
                  value={inputs.treadDepthMm}
                  onChange={(e) => setInputs({ ...inputs, treadDepthMm: parseFloat(e.target.value) })}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>1.0mm (Illegal)</span>
                  <span>1.6mm (Wear Mark)</span>
                  <span>4.0mm (50%)</span>
                  <span>8.0mm (Brand New)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tyre Age (Months)</label>
                  <input
                    type="number"
                    value={inputs.tyreAgeMonths}
                    onChange={(e) => setInputs({ ...inputs, tyreAgeMonths: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Check 4-digit DOT code on sidewall</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Odometer (km)</label>
                  <input
                    type="number"
                    value={inputs.odometerKm}
                    onChange={(e) => setInputs({ ...inputs, odometerKm: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Total vehicle running</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Driving Environment</label>
                <select
                  value={inputs.drivingEnvironment}
                  onChange={(e) => setInputs({ ...inputs, drivingEnvironment: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                >
                  <option value="mostly-city">Mostly City (Moderate wear)</option>
                  <option value="mixed">Mixed City &amp; Highway (Standard wear)</option>
                  <option value="mostly-highway">Mostly Highway / Expressways (High heat wear)</option>
                  <option value="bad-roads">Rough / Potholed Roads (High impact stress)</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Sidewall Bulges or Deep Cuts?</div>
                  <div className="text-[10px] text-slate-500">Any visible egg-shaped bubble on tyre edge</div>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.hasCracksOrBulges}
                  onChange={(e) => setInputs({ ...inputs, hasCracksOrBulges: e.target.checked })}
                  className="h-4 w-4 rounded accent-red-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Audited Verdict
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{result.headline}</h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {result.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Remaining Life</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  ~{result.estimatedRemainingKm.toLocaleString('en-IN')} km
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Effective Tyre Cost / km</div>
                <div className="text-xl font-black text-amber-600 mt-0.5">
                  ₹{result.costPerKmTyres} / km
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">Action Steps:</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('tyres')}
        title="Ready for Replacement? Verified India Tyre Deals"
        contextHint="Compare Apollo, MRF, and CEAT authorized sets with free doorstep installation and alignment:"
      />
    </div>
  );
}

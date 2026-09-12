'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import * as React from 'react';
import Link from 'next/link';
import {
  BatteryCharging,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { evaluateBattery } from '@/lib/vehicle-os/calculations';
import { BatteryAssessmentInputs, BatteryAssessmentResult } from '@/lib/vehicle-os/types';
import { AffiliateRecommendationBox } from '@/components/vehicle-os/AffiliateRecommendationBox';
import { getAffiliatesByCategory } from '@/lib/vehicle-os/affiliate-config';

export default function BatteryReplacementPage() {
  const [inputs, setInputs] = React.useState<BatteryAssessmentInputs>({
    vehicleAgeYears: 4,
    batteryAgeMonths: 38,
    crankingSluggish: true,
    voltageReading: 12.1,
    hasElectricalAddOns: false,
  });

  const result: BatteryAssessmentResult = React.useMemo(() => {
    return evaluateBattery(inputs);
  }, [inputs]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicle OS', href: '/vehicle-os' },
          { label: 'Battery Health & Replacement Sizer' },
        ]}
      />
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            High Commercial Intent
          </span>
          <span className="text-xs font-semibold text-slate-500">12V Automotive Battery Health</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Battery Replacement Decision Tool — Is My Battery Actually Due?
        </h1>

        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Diagnose whether your morning cranking lag is a genuine failing battery plate or simply a discharged alternator issue. Find out when to replace, how much scrap rebate to claim, and the best replacement brands.
        </p>
      </div>

      {/* Grid: Inputs Left, Verdict Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <BatteryCharging className="w-4 h-4 text-amber-600" />
              <span>Battery Diagnostics</span>
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Battery Age (Months)</label>
                  <input
                    type="number"
                    value={inputs.batteryAgeMonths}
                    onChange={(e) => setInputs({ ...inputs, batteryAgeMonths: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Indian average life is 36-48 months</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Age (Years)</label>
                  <input
                    type="number"
                    value={inputs.vehicleAgeYears}
                    onChange={(e) => setInputs({ ...inputs, vehicleAgeYears: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Resting Voltage Reading (V) — Optional
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.voltageReading || ''}
                  onChange={(e) => setInputs({ ...inputs, voltageReading: parseFloat(e.target.value) || undefined })}
                  placeholder="e.g. 12.6V is 100%, 12.2V is 50%"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Sluggish / Hesitant Cold Cranking?</div>
                  <div className="text-[10px] text-slate-500">Starter motor struggles during first morning start</div>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.crankingSluggish}
                  onChange={(e) => setInputs({ ...inputs, crankingSluggish: e.target.checked })}
                  className="h-4 w-4 rounded accent-red-600"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Heavy Aftermarket Accessories?</div>
                  <div className="text-[10px] text-slate-500">24x7 hardwired dashcam, subwoofers, high-wattage HIDs</div>
                </div>
                <input
                  type="checkbox"
                  checked={inputs.hasElectricalAddOns}
                  onChange={(e) => setInputs({ ...inputs, hasElectricalAddOns: e.target.checked })}
                  className="h-4 w-4 rounded accent-amber-600"
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
                Battery Status Verdict
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{result.headline}</h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {result.description}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Months Left</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  ~{result.estimatedMonthsLeft} Months
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Old Battery Scrap Rebate</div>
                <div className="text-xl font-black text-emerald-700 mt-0.5">
                  ₹800 – ₹1,000 Off
                </div>
              </div>
            </div>

            {/* Preventive Action Tips */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">Maintenance &amp; Action Advice:</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {result.preventiveTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Affiliate Box */}
      <AffiliateRecommendationBox
        deals={getAffiliatesByCategory('battery')}
        title="Doorstep Car Battery Replacement Deals"
        contextHint="Genuine Amaron and Exide models delivered within 2 hours with free installation and instant old battery scrap rebate:"
      />
    </div>
  );
}

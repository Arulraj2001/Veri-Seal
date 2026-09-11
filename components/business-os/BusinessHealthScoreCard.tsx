'use client';

import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Target,
} from 'lucide-react';
import { BusinessHealthScores } from '@/lib/business-os/types';
import { calculateBusinessHealthScore } from '@/lib/business-os/health-score';
import { BUSINESS_PRESETS } from '@/lib/business-os/presets';

interface Props {
  health?: BusinessHealthScores;
}

export default function BusinessHealthScoreCard({ health: externalHealth }: Props) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('kirana_retail');

  const selectedPreset = useMemo(() => {
    return BUSINESS_PRESETS.find((p) => p.id === selectedPresetId) || BUSINESS_PRESETS[0];
  }, [selectedPresetId]);

  const internalHealth = useMemo(() => {
    const p = selectedPreset;
    const mpFeePct = p.id === 'instagram_d2c' ? 2 : p.id === 'kirana_retail' ? 0 : 5;

    return calculateBusinessHealthScore({
      netMarginPercent: p.typicalNetMarginPercent,
      runwayMonths: 3.5,
      overdueReceivables: p.defaultDailySales.creditSales * 15,
      monthlyRevenue: p.typicalMonthlySales,
      marketplaceFeePercent: mpFeePct,
    });
  }, [selectedPreset]);

  const health = externalHealth || internalHealth;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score >= 65) return 'text-sky-700 bg-sky-50 border-sky-300';
    if (score >= 45) return 'text-amber-700 bg-amber-50 border-amber-300';
    return 'text-rose-700 bg-rose-50 border-rose-300';
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-600';
    if (score >= 65) return 'bg-sky-600';
    if (score >= 45) return 'bg-amber-500';
    return 'bg-rose-600';
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Preset Filter if not using external health */}
      {!externalHealth && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-slate-100 pb-4">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Test Profile:
          </span>
          {BUSINESS_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPresetId(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                selectedPresetId === p.id
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>SMB Diagnostic Intelligence</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Business Financial Health Score
          </h2>
          <p className="text-xs text-slate-500">
            Real-time evaluation of margin stability, cash runway velocity, and collection discipline.
          </p>
        </div>

        {/* Big Radial/Badge Score */}
        <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Composite Rating
            </span>
            <span
              className={`text-xs font-black px-2.5 py-0.5 rounded-full border inline-block mt-0.5 ${getScoreColor(
                health.overallScore
              )}`}
            >
              {health.gradeLabel}
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
            <span className="text-2xl font-black text-slate-900">
              {health.overallScore}
            </span>
            <span className="text-[10px] text-slate-400 font-bold ml-0.5">/100</span>
          </div>
        </div>
      </div>

      {/* 5 Core Pillars Sub-scores */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold block">Profit Margin</span>
          <div className="text-xl font-black text-slate-900">
            {health.profitabilityScore}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreProgressColor(health.profitabilityScore)}`}
              style={{ width: `${health.profitabilityScore}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold block">Cash Runway</span>
          <div className="text-xl font-black text-slate-900">
            {health.cashRunwayScore}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreProgressColor(health.cashRunwayScore)}`}
              style={{ width: `${health.cashRunwayScore}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold block">Receivables (Udhaar)</span>
          <div className="text-xl font-black text-slate-900">
            {health.receivablesScore}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreProgressColor(health.receivablesScore)}`}
              style={{ width: `${health.receivablesScore}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold block">Inventory Turn</span>
          <div className="text-xl font-black text-slate-900">
            {health.inventoryHealthScore}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreProgressColor(health.inventoryHealthScore)}`}
              style={{ width: `${health.inventoryHealthScore}%` }}
            />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold block">Platform Freedom</span>
          <div className="text-xl font-black text-slate-900">
            {health.platformIndependenceScore}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreProgressColor(health.platformIndependenceScore)}`}
              style={{ width: `${health.platformIndependenceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* "Fix These 3 Things This Week" Priority Box */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-indigo-50/40 border border-amber-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-700" />
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
            Fix These 3 Things This Week (High-ROI Priorities)
          </h4>
        </div>
        <div className="space-y-2">
          {health.topFixes.map((fix, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs text-xs text-slate-700"
            >
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-black flex items-center justify-center shrink-0 text-[11px]">
                {idx + 1}
              </span>
              <p className="leading-relaxed font-medium">{fix}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

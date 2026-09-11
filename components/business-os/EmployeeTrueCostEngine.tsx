'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Clock,
  Coffee,
  Receipt,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Briefcase,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { calculateEmployeeTrueCost } from '@/lib/business-os/operational-helpers';

export default function EmployeeTrueCostEngine() {
  const [baseMonthlySalary, setBaseMonthlySalary] = useState<number>(18000);
  const [monthlyPerformanceBonus, setMonthlyPerformanceBonus] = useState<number>(1500);
  const [employerPfEsiPercent, setEmployerPfEsiPercent] = useState<number>(4.75); // ESI + basic PF
  const [dailyTeaLunchExpense, setDailyTeaLunchExpense] = useState<number>(60);
  const [uniformToolDepreciationMonthly, setUniformToolDepreciationMonthly] = useState<number>(500);
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState<number>(26);
  const [workingHoursPerDay, setWorkingHoursPerDay] = useState<number>(8);

  const result = useMemo(() => {
    return calculateEmployeeTrueCost({
      baseMonthlySalary,
      monthlyPerformanceBonus,
      employerPfEsiPercent,
      dailyTeaLunchExpense,
      uniformToolDepreciationMonthly,
      workingDaysPerMonth,
      workingHoursPerDay,
    });
  }, [
    baseMonthlySalary,
    monthlyPerformanceBonus,
    employerPfEsiPercent,
    dailyTeaLunchExpense,
    uniformToolDepreciationMonthly,
    workingDaysPerMonth,
    workingHoursPerDay,
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-100 rounded-2xl text-indigo-700 mt-0.5 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Employee True Cost &amp; Productivity Sizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              A ₹18,000/month salary doesn&apos;t cost ₹18,000. Factor festival bonuses, daily tea/snacks, uniforms, and PF/ESI to calculate your real hourly cost.
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-indigo-200 px-4 py-2 rounded-2xl text-center shrink-0">
          <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">True Cost Multiplier</div>
          <div className="text-xl font-black text-indigo-700">
            {result.trueCostMultiplier}x Base Salary
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>Compensation &amp; Overheads</span>
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Stated Monthly In-Hand / Gross Salary
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="1000"
                  value={baseMonthlySalary || ''}
                  onChange={(e) => setBaseMonthlySalary(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Diwali / Bonus Alloc/Mo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={monthlyPerformanceBonus || ''}
                    onChange={(e) => setMonthlyPerformanceBonus(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  PF / ESI Employer %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={employerPfEsiPercent || ''}
                    onChange={(e) => setEmployerPfEsiPercent(Number(e.target.value))}
                    className="w-full pr-7 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-xs">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Daily Tea / Food Allowance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={dailyTeaLunchExpense || ''}
                    onChange={(e) => setDailyTeaLunchExpense(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">₹{dailyTeaLunchExpense * workingDaysPerMonth}/mo</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Uniform &amp; Tool Wear/Mo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={uniformToolDepreciationMonthly || ''}
                    onChange={(e) => setUniformToolDepreciationMonthly(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Working Days / Mo</label>
                <input
                  type="number"
                  min="15"
                  max="31"
                  value={workingDaysPerMonth}
                  onChange={(e) => setWorkingDaysPerMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hours / Day</label>
                <input
                  type="number"
                  min="4"
                  max="14"
                  value={workingHoursPerDay}
                  onChange={(e) => setWorkingHoursPerDay(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: True Cost Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                The Real Employer Burden
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Full Out-of-Pocket Cost
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50/70 border border-indigo-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                  Real Monthly Cost
                </span>
                <div className="text-2xl sm:text-3xl font-black text-indigo-950">
                  ₹{result.totalMonthlyEmployerCost.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-indigo-800">
                  Base: ₹{baseMonthlySalary.toLocaleString('en-IN')} + ₹{(result.totalMonthlyEmployerCost - baseMonthlySalary).toLocaleString('en-IN')} overheads
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4.5 space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Cost / Productive Hour
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                  ₹{result.realCostPerHour}/hr
                </div>
                <p className="text-[11px] text-emerald-800">
                  Across {result.totalProductiveHoursPerMonth} monthly hours
                </p>
              </div>
            </div>

            {/* Strategic Advice */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="font-extrabold text-slate-900">
                Full-Time vs Freelancer Freelance Decision Rule:
              </div>
              <p>
                If you are hiring for an irregular task (e.g. video editing, graphic design, tax filing), paying a freelancer ₹{Math.round(result.realCostPerHour * 1.3)}/hour is often <strong>cheaper</strong> than a full-time hire, because you don&apos;t carry tea, bonuses, or downtime costs when business is quiet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { CostBreakdownResult } from '@/lib/home-cost/types';

interface Props {
  breakdown: CostBreakdownResult;
}

export default function ApplianceBreakdownChart({ breakdown }: Props) {
  // Top 5 appliances for horizontal bar chart
  const topAppliances = breakdown.applianceBreakdown.slice(0, 5).map((a) => ({
    name: a.name.length > 20 ? a.name.substring(0, 18) + '...' : a.name,
    cost: a.cost,
    units: a.units,
    percentage: a.percentage,
  }));

  const pieData = breakdown.categoryBreakdown.map((c) => ({
    name: c.label,
    value: c.cost,
    color: c.color,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Donut Chart: Category Share */}
      <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white mb-1 flex items-center justify-between">
            <span>Monthly Cost Share by Category</span>
            <span className="text-xs font-semibold text-emerald-400">
              ₹{breakdown.monthlyBill.toLocaleString('en-IN')}/mo
            </span>
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            Total {breakdown.monthlyUnits} units @ effective ₹{breakdown.effectiveRatePerUnit}/unit
          </p>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Cost']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#F8FAFC',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend pills */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
          {breakdown.categoryBreakdown.slice(0, 4).map((c) => (
            <div key={c.category} className="flex items-center gap-2 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-slate-300 truncate">{c.label}</span>
              <span className="text-white font-semibold ml-auto">{c.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart: Top Electricity Hogs */}
      <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-white">Top 5 Monthly Power Consumers</h4>
            <span className="text-[11px] text-amber-400 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              Highest Savings Potential
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            These 5 appliances drive the vast majority of your electricity bill.
          </p>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topAppliances}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip
                  formatter={(value: any, name: any, item: any) => [
                    `₹${Number(value).toLocaleString('en-IN')} (${item.payload.units} units • ${item.payload.percentage}%)`,
                    'Estimated Cost',
                  ]}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#F8FAFC',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="cost" fill="#0284C7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <span>Top hog: <strong className="text-white">{breakdown.applianceBreakdown[0]?.name || 'N/A'}</strong></span>
          <span className="text-emerald-400 font-semibold">
            ₹{breakdown.applianceBreakdown[0]?.cost.toLocaleString('en-IN') || 0}/mo
          </span>
        </div>
      </div>
    </div>
  );
}

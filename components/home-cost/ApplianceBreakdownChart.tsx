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
      <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
            <span>Monthly Cost Share by Category</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              ₹{breakdown.monthlyBill.toLocaleString('en-IN')}/mo
            </span>
          </h4>
          <p className="text-xs text-slate-500 mb-4">
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
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '0.75rem',
                    color: '#0F172A',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend pills */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          {breakdown.categoryBreakdown.slice(0, 4).map((c) => (
            <div key={c.category} className="flex items-center gap-2 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-slate-600 truncate font-medium">{c.label}</span>
              <span className="text-slate-900 font-bold ml-auto">{c.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart: Top Electricity Hogs */}
      <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-900">Top 5 Monthly Power Consumers</h4>
            <span className="text-[11px] text-amber-800 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
              Highest Savings Potential
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
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
                  stroke="#64748B"
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
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '0.75rem',
                    color: '#0F172A',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
                <Bar dataKey="cost" fill="#0284C7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span>Top hog: <strong className="text-slate-900">{breakdown.applianceBreakdown[0]?.name || 'N/A'}</strong></span>
          <span className="text-emerald-700 font-bold">
            ₹{breakdown.applianceBreakdown[0]?.cost.toLocaleString('en-IN') || 0}/mo
          </span>
        </div>
      </div>
    </div>
  );
}

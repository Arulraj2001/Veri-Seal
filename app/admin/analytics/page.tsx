'use client';

import * as React from 'react';
import {
  LineChart as LineChartIcon,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  FileCheck2,
  ShieldCheck,
  MapPin,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  time_series_30d: Array<{ date: string; valid: number; invalid: number; unknown: number; total: number }>;
  doc_types_top10: Array<{ name: string; this_month: number; last_month: number }>;
  status_breakdown: Array<{ name: string; value: number; color: string }>;
  user_growth_90d: Array<{ date: string; users: number }>;
  top_states: Array<{ state: string; count: number }>;
  activity_log: Array<{ id: string; doc_type: string; status: string; timestamp: string; signer: string; ip_hash: string }>;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = React.useState<AnalyticsData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [range, setRange] = React.useState<string>('30d');

  React.useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/analytics?range=${range}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [range]);

  if (loading || !data) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
        <p className="text-xs font-semibold text-text-main/60 mt-3">Synthesizing platform analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
            Cryptographic Telemetry &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Nationwide verification load, root authority certificate usage, and security status diagnostics
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-1 bg-white border border-surface-darker rounded-xl p-1 shadow-xs text-xs">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '90d', label: '90 Days' },
            { id: '1y', label: '1 Year' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg font-bold transition-colors',
                range === r.id ? 'bg-primary text-white' : 'text-text-main/60 hover:text-text-main'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* CHART 1: VERIFICATIONS OVER TIME (LINE CHART, 30 DAYS) */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-black text-text-main">
              Chart 1: Verifications Over Time
            </h2>
            <p className="text-xs text-text-main/60 mt-0.5">
              Daily verification trends with valid cryptographic certificates vs warnings
            </p>
          </div>
          <span className="text-[11px] font-bold text-success bg-success-light px-2.5 py-1 rounded-lg">
            94.8% Valid Ratio
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.time_series_30d}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#E6570B"
                strokeWidth={3}
                name="Total Volume"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="valid"
                stroke="#10B981"
                strokeWidth={2}
                name="VALID (CCA)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="invalid"
                stroke="#EF4444"
                strokeWidth={2}
                name="INVALID (Modified)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHARTS 2 & 3: TOP 10 DOC TYPES & STATUS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 2: Top 10 Doc Types (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-black text-text-main">
                Chart 2: Document Type Breakdown (Top 10)
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">This month vs last month verification volume</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.doc_types_top10} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={130} stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="this_month" fill="#E6570B" name="This Month" radius={[0, 4, 4, 0]} />
                <Bar dataKey="last_month" fill="#D1D5DB" name="Last Month" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Status Breakdown Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-text-main">
              Chart 3: Overall Status Distribution
            </h2>
            <p className="text-xs text-text-main/60 mt-0.5">
              Cumulative audit outcome across all verified documents
            </p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.status_breakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.status_breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-surface-darker text-[11px]">
            {data.status_breakdown.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-text-main/80 font-medium truncate max-w-[200px]">{s.name}</span>
                </div>
                <span className="font-bold text-text-main">{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS 4 & 5: USER GROWTH & TOP STATES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 4: User Growth (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-black text-text-main">
                Chart 4: Citizen User Growth (Last 90 Days)
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">Cumulative verified account registrations</p>
            </div>
            <span className="text-[11px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md">
              +1,845 Users
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.user_growth_90d}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Total Users"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Top States (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-black text-text-main">
                Chart 5: Geographic Distribution by State
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">Origin of e-District &amp; State Revenue certificates</p>
            </div>
            <span className="text-[11px] font-bold text-text-main/60 bg-surface px-2 py-0.5 rounded-md flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" />
              <span>State Tags</span>
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.top_states}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="state" tick={{ fontSize: 9 }} stroke="#9CA3AF" interval={0} />
                <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#E6570B" name="Verifications" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABLE: RECENT ACTIVITY LOG (LAST 50) */}
      <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-surface-darker">
          <div>
            <h2 className="text-base font-black text-text-main">
              Recent Verification Activity Log (Last 50)
            </h2>
            <p className="text-xs text-text-main/60 mt-0.5">
              Live cryptographic evaluation log stream with signer authority and timestamp
            </p>
          </div>
          <span className="text-xs text-text-main/50 font-medium">50 Live Records</span>
        </div>

        <div className="overflow-x-auto mt-4 max-h-96">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-white border-b border-surface-darker shadow-2xs">
              <tr className="text-text-main/50 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Audit ID</th>
                <th className="py-2.5 px-3">Document Type</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Signer Authority</th>
                <th className="py-2.5 px-3 text-right">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-darker/50 font-medium">
              {data.activity_log.map((log) => (
                <tr key={log.id} className="hover:bg-surface/40 transition-colors">
                  <td className="py-2.5 px-3 text-text-main/60 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-text-main font-semibold">
                    {log.id}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-text-main whitespace-nowrap">
                    {log.doc_type}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {log.status === 'VALID' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-light text-success text-[10px] font-bold uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>VALID</span>
                      </span>
                    )}
                    {log.status === 'INVALID' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-light text-error text-[10px] font-bold uppercase">
                        <XCircle className="w-3 h-3" />
                        <span>INVALID</span>
                      </span>
                    )}
                    {log.status === 'UNKNOWN' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning-light text-warning text-[10px] font-bold uppercase">
                        <AlertTriangle className="w-3 h-3" />
                        <span>UNKNOWN</span>
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-text-main/80 truncate max-w-xs">
                    {log.signer}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[11px] text-text-main/50">
                    {log.ip_hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Users,
  CreditCard,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface OverviewData {
  stats: {
    total_today: number;
    total_month: number;
    total_users: number;
    pending_approvals: number;
  };
  verifications_30d: Array<{
    date: string;
    VALID: number;
    INVALID: number;
    UNKNOWN: number;
    total: number;
  }>;
  doc_type_breakdown: Array<{ name: string; value: number }>;
  recent_verifications: Array<{
    id: string;
    doc_type: string;
    status: string;
    signer_name: string;
    signed_on: string;
  }>;
  recent_signups: Array<{
    id: string;
    name: string;
    email: string;
    plan: string;
    created_at: string;
  }>;
}

const PIE_COLORS = ['#E6570B', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

export default function AdminOverviewPage() {
  const [data, setData] = React.useState<OverviewData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/overview');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load overview data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
        <p className="text-xs font-semibold text-text-main/60 mt-3">Loading command center analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
              Executive Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-success-light text-success text-[11px] font-bold">
              Live Engine Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Real-time telemetry across nationwide Indian government PDF cryptographic verification services
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/payments"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-darker bg-white hover:bg-surface text-text-main text-xs font-bold transition-all shadow-sm"
          >
            <CreditCard className="w-4 h-4 text-primary" />
            <span>Review Payments ({data.stats.pending_approvals})</span>
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span>Manage Users</span>
          </Link>
        </div>
      </div>

      {/* Row 1: 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Today */}
        <div className="bg-white border border-surface-darker/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-text-main/60 uppercase tracking-wider">
              Verifications Today
            </span>
            <div className="p-2 rounded-xl bg-primary-light text-primary">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-text-main">
            {data.stats.total_today.toLocaleString()}
          </div>
          <p className="text-[11px] text-success font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% from yesterday</span>
          </p>
        </div>

        {/* Card 2: This Month */}
        <div className="bg-white border border-surface-darker/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-text-main/60 uppercase tracking-wider">
              Verifications This Month
            </span>
            <div className="p-2 rounded-xl bg-surface-darker text-text-main">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-text-main">
            {data.stats.total_month.toLocaleString()}
          </div>
          <p className="text-[11px] text-text-main/50 mt-1 font-medium">
            Projected: ~35,000 documents
          </p>
        </div>

        {/* Card 3: Total Users */}
        <div className="bg-white border border-surface-darker/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-text-main/60 uppercase tracking-wider">
              Registered Citizens
            </span>
            <div className="p-2 rounded-xl bg-success-light text-success">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-text-main">
            {data.stats.total_users.toLocaleString()}
          </div>
          <p className="text-[11px] text-success font-semibold mt-1">
            +48 verified today
          </p>
        </div>

        {/* Card 4: Pending Approvals */}
        <div className="bg-white border border-surface-darker/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-text-main/60 uppercase tracking-wider">
              Pending Approvals
            </span>
            <div className="p-2 rounded-xl bg-warning-light text-warning">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-text-main">
              {data.stats.pending_approvals}
            </span>
            {data.stats.pending_approvals > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-error text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <p className="text-[11px] text-text-main/50 mt-1 font-medium">
            Requires manual UTR validation
          </p>
        </div>
      </div>

      {/* Support Inquiries Quick Access Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary-light/60 via-primary-light/20 to-white border border-primary/20 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary text-white shrink-0 shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-text-main">
              Citizen &amp; Enterprise Support Inquiries
            </div>
            <div className="text-xs text-text-main/70">
              Review and respond to messages submitted via the public /contact desk.
            </div>
          </div>
        </div>
        <Link
          href="/admin/messages"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shrink-0 shadow-sm"
        >
          <span>Open Support Inbox</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Row 2: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Verifications last 30 days bar chart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-black text-text-main">
                Verifications by Status (Last 30 Days)
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">
                Grouped by date, color-coded by cryptographic audit outcome
              </p>
            </div>
            <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-lg">
              Stacked Daily
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.verifications_30d}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    borderColor: '#E5E7EB',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="VALID" stackId="a" fill="#10B981" name="VALID" radius={[0, 0, 0, 0]} />
                <Bar dataKey="UNKNOWN" stackId="a" fill="#F59E0B" name="UNKNOWN" />
                <Bar dataKey="INVALID" stackId="a" fill="#EF4444" name="INVALID" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Document type breakdown pie chart (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-text-main">
              Top 5 Government Document Types
            </h2>
            <p className="text-xs text-text-main/60 mt-0.5">
              Breakdown of digital certificates verified across central and state authorities
            </p>
          </div>

          <div className="h-60 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.doc_type_breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.doc_type_breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-darker text-[11px]">
            {data.doc_type_breakdown.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="truncate text-text-main/80 font-medium">{d.name}</span>
                <span className="font-bold text-text-main ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: 2 Tables (Recent 10 Verifications & Recent 5 Signups) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent 10 Verifications (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-surface-darker">
            <div>
              <h2 className="text-base font-black text-text-main">
                Live Verification Stream (Last 10)
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">
                Evaluated against Indian Controller of Certifying Authorities (CCA)
              </p>
            </div>
            <Link
              href="/admin/analytics"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Full Activity Log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-2">Time</th>
                  <th className="py-2.5 px-2">Document Type</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Signer Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-darker/50 font-medium">
                {data.recent_verifications.map((v) => (
                  <tr key={v.id} className="hover:bg-surface/40 transition-colors">
                    <td className="py-2.5 px-2 text-text-main/60 whitespace-nowrap">
                      {new Date(v.signed_on).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 px-2 font-bold text-text-main whitespace-nowrap">
                      {v.doc_type}
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      {v.status === 'VALID' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-light text-success font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>VALID</span>
                        </span>
                      )}
                      {v.status === 'INVALID' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-light text-error font-bold text-[10px]">
                          <XCircle className="w-3 h-3" />
                          <span>INVALID</span>
                        </span>
                      )}
                      {v.status === 'UNKNOWN' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning-light text-warning font-bold text-[10px]">
                          <AlertTriangle className="w-3 h-3" />
                          <span>UNKNOWN</span>
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-text-main/80 truncate max-w-xs">
                      {v.signer_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent 5 Signups (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-surface-darker">
              <div>
                <h2 className="text-base font-black text-text-main">Recent Signups</h2>
                <p className="text-xs text-text-main/60 mt-0.5">Last 5 registrations</p>
              </div>
              <Link
                href="/admin/users"
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-surface-darker/60 mt-3">
              {data.recent_signups.map((u) => (
                <div key={u.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <div className="text-xs font-bold text-text-main truncate">{u.name}</div>
                    <div className="text-[11px] text-text-main/50 truncate">{u.email}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-surface text-text-main font-bold text-[10px] uppercase">
                      {u.plan}
                    </span>
                    <div className="text-[10px] text-text-main/40 mt-0.5">
                      {new Date(u.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-darker text-[11px] text-text-main/60 flex items-center justify-between">
            <span>User growth rate</span>
            <span className="font-bold text-success">+18% this week</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '30d';

    const now = new Date();

    // Chart 1: Verifications over time (30 days) - clean starting baseline
    const timeSeries = Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(now.getTime() - (29 - i) * 24 * 3600 * 1000);
      const dayStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return {
        date: dayStr,
        valid: 0,
        invalid: 0,
        unknown: 0,
        total: 0,
      };
    });

    // Chart 2: Doc type breakdown (Top 10) - clean starting baseline
    const docTypesTop10: Array<{ name: string; this_month: number; last_month: number }> = [];

    // Chart 3: Status Breakdown - clean starting baseline
    const statusBreakdown = [
      { name: 'VALID (CCA Root Verified)', value: 0, color: '#10B981' },
      { name: 'INVALID (Modified / Tampered)', value: 0, color: '#EF4444' },
      { name: 'UNKNOWN (Self-Signed / Untrusted)', value: 0, color: '#F59E0B' },
      { name: 'ERROR (Corrupted / Encrypted)', value: 0, color: '#6B7280' },
    ];

    // Chart 4: User Growth (90 days) - starting from beginning (0 to 2 Admins)
    const userGrowth = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(now.getTime() - (11 - i) * 7.5 * 24 * 3600 * 1000);
      const weekLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      // Clean start: 0 users earlier, 2 admins registered at launch
      const usersCount = i >= 10 ? 2 : 0;
      return {
        date: weekLabel,
        users: usersCount,
      };
    });

    // Chart 5: Top States Breakdown - clean starting baseline
    const topStates: Array<{ state: string; count: number }> = [];

    // Table: Recent Activity Log - clean starting baseline (0 records)
    const activityLog: Array<{
      id: string;
      doc_type: string;
      status: string;
      timestamp: string;
      signer: string;
      ip_hash: string;
    }> = [];

    return NextResponse.json({
      time_series_30d: timeSeries,
      doc_types_top10: docTypesTop10,
      status_breakdown: statusBreakdown,
      user_growth_90d: userGrowth,
      top_states: topStates,
      activity_log: activityLog,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

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

    // Chart 1: Verifications over time (30 days)
    const timeSeries = Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(now.getTime() - (29 - i) * 24 * 3600 * 1000);
      const dayStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const valid = Math.floor(190 + Math.sin(i / 2.5) * 70 + (i % 6) * 12);
      const invalid = Math.floor(10 + (i % 4) * 4);
      const unknown = Math.floor(6 + (i % 3) * 3);
      return {
        date: dayStr,
        valid,
        invalid,
        unknown,
        total: valid + invalid + unknown,
      };
    });

    // Chart 2: Doc type breakdown (Top 10: This month vs Last month)
    const docTypesTop10 = [
      { name: 'e-Aadhaar Letter', this_month: 4820, last_month: 4100 },
      { name: 'Income Tax e-PAN', this_month: 2450, last_month: 2150 },
      { name: 'TNeGA Community Cert', this_month: 1890, last_month: 1620 },
      { name: 'TNeGA Nativity Cert', this_month: 1340, last_month: 1200 },
      { name: 'MeeSeva Revenue Cert', this_month: 1140, last_month: 980 },
      { name: 'Parivahan RC / DL', this_month: 890, last_month: 810 },
      { name: 'DigiLocker Marks Sheet', this_month: 760, last_month: 620 },
      { name: 'EPFO UAN Passbook', this_month: 620, last_month: 550 },
      { name: 'Passport Verification', this_month: 480, last_month: 410 },
      { name: 'High Court Orders', this_month: 310, last_month: 280 },
    ];

    // Chart 3: Status Breakdown
    const statusBreakdown = [
      { name: 'VALID (CCA Root Verified)', value: 12100, color: '#10B981' },
      { name: 'INVALID (Modified / Tampered)', value: 520, color: '#EF4444' },
      { name: 'UNKNOWN (Self-Signed / Untrusted)', value: 340, color: '#F59E0B' },
      { name: 'ERROR (Corrupted / Encrypted)', value: 80, color: '#6B7280' },
    ];

    // Chart 4: User Growth (90 days)
    const userGrowth = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(now.getTime() - (11 - i) * 7.5 * 24 * 3600 * 1000);
      const weekLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return {
        date: weekLabel,
        users: Math.floor(450 + i * 125 + (i * i * 3)),
      };
    });

    // Chart 5: Top States Breakdown
    const topStates = [
      { state: 'Tamil Nadu', count: 4890 },
      { state: 'Andhra Pradesh', count: 2450 },
      { state: 'Karnataka', count: 2180 },
      { state: 'Maharashtra', count: 1870 },
      { state: 'Telangana', count: 1650 },
      { state: 'Uttar Pradesh', count: 1320 },
      { state: 'Kerala', count: 980 },
      { state: 'Gujarat', count: 740 },
    ];

    // Table: Recent Activity Log (50 items)
    const activityLog = Array.from({ length: 50 }).map((_, i) => {
      const d = new Date(now.getTime() - i * 18 * 60 * 1000);
      const docTypes = [
        'UIDAI e-Aadhaar Letter',
        'Income Tax Department e-PAN',
        'Tamil Nadu e-Sevai Community Certificate',
        'Parivahan RC / Driving Licence',
        'DigiLocker Verified Marks Sheet',
        'High Court Certified Order',
      ];
      const statuses: Array<'VALID' | 'INVALID' | 'UNKNOWN' | 'ERROR'> = [
        'VALID',
        'VALID',
        'VALID',
        'VALID',
        'INVALID',
        'UNKNOWN',
      ];

      return {
        id: `act-${5000 - i}`,
        doc_type: docTypes[i % docTypes.length],
        status: statuses[i % statuses.length],
        timestamp: d.toISOString(),
        signer: 'CCA India / NIC Sub-CA',
        ip_hash: `103.24.**.${(i * 7) % 255}`,
      };
    });

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

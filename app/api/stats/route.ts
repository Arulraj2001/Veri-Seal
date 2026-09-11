import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Base static verified counter requested by user: 4,215
const STATIC_BASE_COUNT = 4215;
const LIVE_THRESHOLD = 1000;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Count real verifications from Supabase database
    let realCount = 0;
    try {
      const { count, error } = await supabase
        .from('verifications')
        .select('*', { count: 'exact', head: true });

      if (!error && typeof count === 'number') {
        realCount = count;
      }
    } catch {
      // Fallback
    }

    // Rule:
    // When real tool usage crosses 1,000, start counting live.
    // Until then, keep static at 4,215.
    const isLive = realCount >= LIVE_THRESHOLD;
    const displayCount = isLive
      ? STATIC_BASE_COUNT + (realCount - LIVE_THRESHOLD)
      : STATIC_BASE_COUNT;

    return NextResponse.json({
      success: true,
      count: displayCount,
      isLive,
      realCount,
      label: `${displayCount.toLocaleString('en-IN')} PDFs verified and counting`,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      count: STATIC_BASE_COUNT,
      isLive: false,
      realCount: 0,
      label: `${STATIC_BASE_COUNT.toLocaleString('en-IN')} PDFs verified and counting`,
    });
  }
}

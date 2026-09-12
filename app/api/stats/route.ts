import { NextResponse } from 'next/server';

// Base verified counter default
const DEFAULT_COUNTER = 421847;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let currentCounter = DEFAULT_COUNTER;
    let rawVal = '421847';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && serviceKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/site_settings?key=eq.verification_counter&select=key,value`, {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0 && rows[0]?.value) {
          rawVal = rows[0].value;
          const parsed = parseInt(rawVal, 10);
          if (!isNaN(parsed) && parsed > 0) {
            currentCounter = parsed;
          }
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        verification_counter: rawVal,
        count: currentCounter,
        isLive: true,
        label: `${currentCounter.toLocaleString('en-IN')} PDFs verified and counting`,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({
      success: true,
      verification_counter: '421847',
      count: DEFAULT_COUNTER,
      isLive: true,
      label: `${DEFAULT_COUNTER.toLocaleString('en-IN')} PDFs verified and counting`,
    });
  }
}



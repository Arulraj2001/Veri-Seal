import { NextResponse } from 'next/server';
import { getApiUrl } from '@/lib/api';
import { supabase, supabaseAdmin } from '@/lib/supabase';

const BACKEND_URL = getApiUrl();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const response = await fetch(`${BACKEND_URL}/verify`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Increment verification counter after successful verification response is built
    if (response.ok) {
      try {
        const { error } = await supabase.rpc('increment_counter');
        if (error) {
          console.error('Counter increment failed:', error);
          // Resilient fallback: direct update on site_settings
          const { data: setting } = await supabaseAdmin
            .from('site_settings')
            .select('value')
            .eq('key', 'verification_counter')
            .single();
          if (setting) {
            const current = parseInt(setting.value || '421847', 10);
            const nextVal = (current + 1).toString();
            await supabaseAdmin
              .from('site_settings')
              .update({ value: nextVal, updated_at: new Date().toISOString() })
              .eq('key', 'verification_counter');
          }
        }
      } catch (e) {
        // Never block verification for counter failure
        console.error('Counter error:', e);
      }
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        code: 'PROXY_ERROR',
        message: 'Could not connect to FastAPI verification engine.',
        detail: String(error),
      },
      { status: 502 }
    );
  }
}

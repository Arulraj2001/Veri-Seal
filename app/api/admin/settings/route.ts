import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import { updateSiteSettings, getMergedSettings, inMemorySettings } from '@/lib/settings-store';

export async function GET() {
  try {
    const session = await auth();
    const user = session?.user as { role?: string; email?: string } | undefined;
    const isAdmin =
      user?.role === 'admin' ||
      user?.email?.toLowerCase() === 'admin@Kagazo.in' ||
      user?.email?.toLowerCase() === 'samuel@Kagazo.in';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const current = await getMergedSettings();
    return NextResponse.json({ settings: current });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as { role?: string; email?: string } | undefined;
    const isAdmin =
      user?.role === 'admin' ||
      user?.email?.toLowerCase() === 'admin@Kagazo.in' ||
      user?.email?.toLowerCase() === 'samuel@Kagazo.in';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const { card, values } = body;

    if (!card || !values) {
      return NextResponse.json({ error: 'Card identifier and values required' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();

    // Persist to unified settings store (both in-memory and Supabase)
    await updateSiteSettings(values);

    return NextResponse.json({
      success: true,
      card,
      updated_at: nowIso,
      values,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

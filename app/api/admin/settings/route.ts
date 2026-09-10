import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

let settingsMap: Record<string, string> = {
  // Card 1: Payment
  payment_enabled: 'false',
  upi_id: 'veriseal.pay@icici',
  upi_qr_url: 'https://veriseal.in/assets/upi-qr-sample.png',
  pro_price: '199',
  business_price: '2499',

  // Card 2: Site
  site_name: 'VeriSeal',
  site_tagline: 'Verify Indian Government PDF Digital Signatures Online',
  contact_email: 'support@veriseal.in',
  whatsapp_number: '+919876543210',
  maintenance_mode: 'false',

  // Card 3: Features
  adsense_enabled: 'false',
  adsense_publisher_id: 'ca-pub-1234567890123456',
  language_tamil_enabled: 'true',
  api_access_enabled: 'true',
  free_daily_limit: '3',

  // Card 4: Notifications
  admin_notification_email: 'admin@veriseal.in',
  notify_new_payment: 'true',
  notify_new_signup: 'false',

  // Card 5: Counter
  verification_counter: '421847',

  // Timestamps
  payment_updated_at: new Date(Date.now() - 3600 * 1000).toISOString(),
  site_updated_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  features_updated_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
  notifications_updated_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
  counter_updated_at: new Date().toISOString(),
};

export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    // Attempt to merge from Supabase site_settings if available
    try {
      const { data } = await supabase.from('site_settings').select('*');
      if (data && data.length > 0) {
        for (const row of data) {
          if (row.key && row.value) {
            settingsMap[row.key] = String(row.value);
          }
        }
      }
    } catch (e) {
      console.debug('Supabase settings read fallback:', e);
    }

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const { card, values } = body;

    if (!card || !values) {
      return NextResponse.json({ error: 'Card identifier and values required' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();

    // Update in-memory values
    for (const [k, v] of Object.entries(values)) {
      settingsMap[k] = String(v);
    }
    settingsMap[`${card}_updated_at`] = nowIso;

    // Persist to Supabase site_settings
    try {
      for (const [k, v] of Object.entries(values)) {
        await supabase
          .from('site_settings')
          .upsert({
            key: k,
            value: String(v),
            updated_at: nowIso,
          });
      }
    } catch (e) {
      console.debug('Supabase site_settings batch write fallback:', e);
    }

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

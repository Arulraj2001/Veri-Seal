import { NextResponse } from 'next/server';
import { getMergedSettings } from '@/lib/settings-store';

export const revalidate = 0; // Dynamic revalidation

export async function GET() {
  try {
    const settings = await getMergedSettings();
    return NextResponse.json(settings);
  } catch (err) {
    console.debug('Error reading site_settings, returning defaults:', err);
    return NextResponse.json({
      payment_enabled: false,
      site_name: 'Kagazo',
      contact_email: 'support@kagazo.in',
      verification_counter: 421847,
      language_tamil_enabled: true,
      free_daily_limit: 3,
      pro_price: 199,
      business_price: 2499,
      upi_id: 'Kagazo.pay@icici',
      ads_enabled: true,
      ads_provider: 'custom_sponsor',
      ad_slot_sidebar: true,
      ad_slot_post_download: true,
      ad_slot_in_content: true,
      ad_slot_mobile: true,
      sponsor_title: 'Kagazo — 100% Free Sovereign Document & Exam Tools',
      sponsor_desc: 'Zero server uploads. Process passport photo sheets, 5-in-1 PVC ID cards, Aadhaar merges, and exam compliance in your browser RAM.',
      sponsor_cta_text: 'Explore Citizen Tools',
      sponsor_cta_url: '/tools',
      sponsor_badge: 'Kagazo Suite',
    });
  }
}

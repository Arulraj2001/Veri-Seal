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
      site_name: 'VeriSeal',
      verification_counter: 421847,
      language_tamil_enabled: true,
      free_daily_limit: 3,
      pro_price: 199,
      business_price: 2499,
      upi_id: 'veriseal.pay@icici',
      ads_enabled: true,
      ads_provider: 'custom_sponsor',
      ad_slot_sidebar: true,
      ad_slot_post_download: true,
      ad_slot_in_content: true,
      ad_slot_mobile: true,
      sponsor_title: 'Ostrune — Web Development, SEO & Speed Growth Agency',
      sponsor_desc: 'We build sub-second websites, custom web apps, and run SEO & Meta Ads with 100/100 Core Web Vitals for ambitious businesses worldwide. Free site audit with 12h reply guarantee.',
      sponsor_cta_text: 'Book Free Strategy Call',
      sponsor_cta_url: 'https://ostrune.netlify.app/',
      sponsor_badge: 'Ostrune Agency',
    });
  }
}

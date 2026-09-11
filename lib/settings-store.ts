import { supabase, supabaseAdmin } from '@/lib/supabase';

export interface SiteSettings {
  payment_enabled: boolean;
  upi_id: string;
  upi_qr_url: string;
  pro_price: number;
  business_price: number;
  site_name: string;
  site_tagline: string;
  contact_email: string;
  whatsapp_number: string;
  maintenance_mode: boolean;
  adsense_enabled: boolean;
  adsense_publisher_id: string;
  ads_enabled: boolean;
  ads_provider: 'adsense' | 'custom_sponsor' | 'auto';
  ad_slot_sidebar: boolean;
  ad_slot_post_download: boolean;
  ad_slot_in_content: boolean;
  ad_slot_mobile: boolean;
  sponsor_title: string;
  sponsor_desc: string;
  sponsor_image_url: string;
  sponsor_cta_text: string;
  sponsor_cta_url: string;
  sponsor_badge: string;
  language_tamil_enabled: boolean;
  api_access_enabled: boolean;
  free_daily_limit: number;
  admin_notification_email: string;
  notify_new_payment: boolean;
  notify_new_signup: boolean;
  verification_counter: number;
  [key: string]: any;
}

export const inMemorySettings: Record<string, string> = {
  payment_enabled: 'true',
  upi_id: 'veriseal.pay@icici',
  upi_qr_url: 'https://veriseal.in/assets/upi-qr-sample.png',
  pro_price: '199',
  business_price: '2499',
  site_name: 'VeriSeal',
  site_tagline: 'Verify Indian Government PDF Digital Signatures Online',
  contact_email: 'support@veriseal.in',
  whatsapp_number: '+919876543210',
  maintenance_mode: 'false',
  adsense_enabled: 'false',
  adsense_publisher_id: 'ca-pub-1234567890123456',
  ads_enabled: 'true',
  ads_provider: 'custom_sponsor',
  ad_slot_sidebar: 'true',
  ad_slot_post_download: 'true',
  ad_slot_in_content: 'true',
  ad_slot_mobile: 'true',
  sponsor_title: 'Ostrune Agency & Exam Prep Hub',
  sponsor_desc: 'Professional web development & free government recruitment study kits for Tamil Nadu and Central exams.',
  sponsor_image_url: '',
  sponsor_cta_text: 'Explore Free Resources',
  sponsor_cta_url: 'https://veriseal.in/blog',
  sponsor_badge: 'Verified Partner',
  language_tamil_enabled: 'true',
  api_access_enabled: 'true',
  free_daily_limit: '3',
  admin_notification_email: 'admin@veriseal.in',
  notify_new_payment: 'true',
  notify_new_signup: 'false',
  verification_counter: '421847',
};

export async function getMergedSettings(): Promise<SiteSettings> {
  const result: Record<string, string> = { ...inMemorySettings };

  try {
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (!error && data && data.length > 0) {
      data.forEach((row: { key: string; value: string }) => {
        result[row.key] = row.value;
      });
    }
  } catch (e) {
    console.debug('Supabase getMergedSettings fallback:', e);
  }

  return {
    payment_enabled: result['payment_enabled'] === 'true',
    upi_id: result['upi_id'] || 'veriseal.pay@icici',
    upi_qr_url: result['upi_qr_url'] || 'https://veriseal.in/assets/upi-qr-sample.png',
    pro_price: parseInt(result['pro_price'] || '199', 10),
    business_price: parseInt(result['business_price'] || '2499', 10),
    site_name: result['site_name'] || 'VeriSeal',
    site_tagline: result['site_tagline'] || 'Verify Indian Government PDF Digital Signatures Online',
    contact_email: result['contact_email'] || 'support@veriseal.in',
    whatsapp_number: result['whatsapp_number'] || '+919876543210',
    maintenance_mode: result['maintenance_mode'] === 'true',
    adsense_enabled: result['adsense_enabled'] === 'true',
    adsense_publisher_id: result['adsense_publisher_id'] || '',
    ads_enabled: result['ads_enabled'] !== 'false',
    ads_provider: (result['ads_provider'] as any) || 'custom_sponsor',
    ad_slot_sidebar: result['ad_slot_sidebar'] !== 'false',
    ad_slot_post_download: result['ad_slot_post_download'] !== 'false',
    ad_slot_in_content: result['ad_slot_in_content'] !== 'false',
    ad_slot_mobile: result['ad_slot_mobile'] !== 'false',
    sponsor_title: result['sponsor_title'] || 'Ostrune Agency & Exam Prep Hub',
    sponsor_desc: result['sponsor_desc'] || 'Professional web development & free government recruitment study kits for Tamil Nadu and Central exams.',
    sponsor_image_url: result['sponsor_image_url'] || '',
    sponsor_cta_text: result['sponsor_cta_text'] || 'Explore Free Resources',
    sponsor_cta_url: result['sponsor_cta_url'] || 'https://veriseal.in/blog',
    sponsor_badge: result['sponsor_badge'] || 'Verified Partner',
    language_tamil_enabled: result['language_tamil_enabled'] !== 'false',
    api_access_enabled: result['api_access_enabled'] !== 'false',
    free_daily_limit: parseInt(result['free_daily_limit'] || '3', 10),
    admin_notification_email: result['admin_notification_email'] || 'admin@veriseal.in',
    notify_new_payment: result['notify_new_payment'] !== 'false',
    notify_new_signup: result['notify_new_signup'] === 'true',
    verification_counter: parseInt(result['verification_counter'] || '421847', 10),
  };
}

export async function updateSiteSettings(values: Record<string, string>): Promise<void> {
  const nowIso = new Date().toISOString();

  for (const [k, v] of Object.entries(values)) {
    inMemorySettings[k] = String(v);
  }

  try {
    for (const [k, v] of Object.entries(values)) {
      await supabaseAdmin
        .from('site_settings')
        .upsert({
          key: k,
          value: String(v),
          updated_at: nowIso,
        });
    }
  } catch (e) {
    console.debug('Supabase updateSiteSettings fallback:', e);
  }
}

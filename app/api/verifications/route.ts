import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { doc_type, status, signer_name, signer_org, issuer, signed_on, file_size } = body;

    const session = await auth();
    const userId = session?.user?.id || null;

    // 1. Insert record into verifications table
    try {
      await supabase.from('verifications').insert({
        user_id: userId,
        doc_type: doc_type || 'Government Document',
        status: (status || 'VALID').toUpperCase(),
        signer_name: signer_name || null,
        signer_org: signer_org || null,
        issuer: issuer || null,
        signed_on: signed_on || new Date().toISOString(),
        file_size: file_size || 0,
      });
    } catch (dbErr) {
      console.debug('Failed to record verification row in Supabase:', dbErr);
    }

    // 2. Increment verification_counter in site_settings
    try {
      const { data: settingData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'verification_counter')
        .single();

      if (settingData) {
        const current = parseInt(settingData.value || '421847', 10);
        await supabase
          .from('site_settings')
          .update({ value: String(current + 1), updated_at: new Date().toISOString() })
          .eq('key', 'verification_counter');
      }
    } catch (counterErr) {
      console.debug('Failed to increment site_settings counter:', counterErr);
    }

    // 3. Update logged-in user counts if authenticated
    if (userId) {
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('verification_count_today, verification_count_total')
          .eq('id', userId)
          .single();

        if (userData) {
          await supabase
            .from('users')
            .update({
              verification_count_today: (userData.verification_count_today || 0) + 1,
              verification_count_total: (userData.verification_count_total || 0) + 1,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
      } catch (userErr) {
        console.debug('Failed to increment user verifications count:', userErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('verifications')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ verifications: data || [] });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const txnId = (formData.get('txn_id') as string) || Date.now().toString();

    if (!file) {
      return NextResponse.json({ error: 'Screenshot file is required' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id || 'guest';
    const timestamp = Date.now();
    const cleanTxn = txnId.replace(/[^a-zA-Z0-9]/g, '');
    const fileName = `${userId}/${timestamp}-${cleanTxn}.jpg`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try uploading to Supabase Storage bucket 'payment-screenshots'
    try {
      const { data, error } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, buffer, {
          contentType: file.type || 'image/jpeg',
          upsert: true,
        });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from('payment-screenshots')
          .getPublicUrl(fileName);

        return NextResponse.json({
          success: true,
          url: publicData.publicUrl || `https://Kagazo.in/storage/payment-screenshots/${fileName}`,
          fileName,
        });
      }
    } catch (storageErr) {
      console.debug('Supabase storage upload fallback:', storageErr);
    }

    // Fallback: create base64 data URI for instant rendering
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

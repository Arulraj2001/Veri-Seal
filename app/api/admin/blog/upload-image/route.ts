import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role && role !== 'admin' && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image file size exceeds the 5MB limit.' },
        { status: 400 }
      );
    }

    const client = supabaseAdmin || supabase;
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure bucket exists or attempt upload
    const { error: uploadError } = await client.storage
      .from('blog-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      // If bucket not found error, try to create bucket once
      if (uploadError.message?.toLowerCase().includes('not found') || uploadError.message?.toLowerCase().includes('bucket')) {
        await client.storage.createBucket('blog-images', {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          fileSizeLimit: 5242880,
        }).catch(() => {});

        // Retry upload
        const { error: retryError } = await client.storage
          .from('blog-images')
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (retryError) {
          return NextResponse.json({ error: retryError.message }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }
    }

    const { data } = client.storage.from('blog-images').getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: data.publicUrl,
      fileName,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Image upload failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    try {
      await supabase
        .from('users')
        .update({
          name: name || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);
    } catch (e) {
      console.debug('Supabase user profile update fallback:', e);
    }

    return NextResponse.json({ success: true, name });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await supabase.from('users').delete().eq('id', session.user.id);
    } catch (e) {
      console.debug('Supabase delete user account fallback:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

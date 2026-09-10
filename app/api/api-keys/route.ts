import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

interface ApiKeyRecord {
  id: string;
  user_id: string;
  key: string;
  name: string;
  daily_limit: number;
  usage_today: number;
  usage_total: number;
  status: 'active' | 'revoked';
  created_at: string;
}

// In-memory fallback
const memoryApiKeys: ApiKeyRecord[] = [
  {
    id: 'key-sample-1',
    user_id: 'sample-user',
    key: 'vs_live_79a4e891b2c3d4e5f67890abcdef1234',
    name: 'Production Portal Backend',
    daily_limit: 500,
    usage_today: 42,
    usage_total: 1280,
    status: 'active',
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'key-sample-2',
    user_id: 'sample-user',
    key: 'vs_live_12c3d4e5f67890abcdef123479a4e891',
    name: 'Staging Integration Bot',
    daily_limit: 500,
    usage_today: 0,
    usage_total: 310,
    status: 'active',
    created_at: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
  },
];

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ keys: data });
      }
    } catch (e) {
      console.debug('Supabase api keys fetch fallback:', e);
    }

    return NextResponse.json({ keys: memoryApiKeys });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    const randomBytes = crypto.randomBytes(16).toString('hex');
    const fullKey = `vs_live_${randomBytes}`;

    const newKeyRecord: ApiKeyRecord = {
      id: `key-${Date.now()}`,
      user_id: session.user.id || 'usr-local',
      key: fullKey,
      name: name?.trim() || 'Default API Key',
      daily_limit: 500,
      usage_today: 0,
      usage_total: 0,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    // Save to Supabase
    try {
      await supabase.from('api_keys').insert({
        user_id: session.user.id || null,
        key: newKeyRecord.key,
        name: newKeyRecord.name,
        daily_limit: 500,
        usage_today: 0,
        usage_total: 0,
        status: 'active',
      });
    } catch (e) {
      console.debug('Supabase insert api_key fallback:', e);
    }

    memoryApiKeys.unshift(newKeyRecord);

    return NextResponse.json({ success: true, key: newKeyRecord });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const keyId = searchParams.get('id');

    if (!keyId) {
      return NextResponse.json({ error: 'Key ID required' }, { status: 400 });
    }

    // Try Supabase
    try {
      await supabase
        .from('api_keys')
        .update({ status: 'revoked' })
        .eq('id', keyId);
    } catch (e) {
      console.debug('Supabase revoke api_key fallback:', e);
    }

    const found = memoryApiKeys.find((k) => k.id === keyId);
    if (found) {
      found.status = 'revoked';
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

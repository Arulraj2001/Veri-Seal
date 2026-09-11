import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'business';
  role: 'user' | 'admin';
  banned: boolean;
  joined: string;
  verifications: number;
  last_active: string;
  verification_count_today: number;
}

let mockUsers: AdminUser[] = [
  {
    id: 'u-101',
    name: 'Samuel Administrator',
    email: 'samuel@veriseal.in',
    plan: 'business',
    role: 'admin',
    banned: false,
    joined: '2026-08-01T09:00:00Z',
    verifications: 1420,
    last_active: new Date().toISOString(),
    verification_count_today: 42,
  },
  {
    id: 'u-102',
    name: 'Advocate Suresh Menon',
    email: 'suresh.law@madrasbar.in',
    plan: 'pro',
    role: 'user',
    banned: false,
    joined: '2026-08-14T11:20:00Z',
    verifications: 380,
    last_active: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    verification_count_today: 14,
  },
  {
    id: 'u-103',
    name: 'Karthik Raja',
    email: 'csc.karthik@tnonline.in',
    plan: 'business',
    role: 'user',
    banned: false,
    joined: '2026-08-20T14:15:00Z',
    verifications: 890,
    last_active: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    verification_count_today: 28,
  },
  {
    id: 'u-104',
    name: 'Pooja Bhattacharya',
    email: 'pooja.ca@auditfirm.com',
    plan: 'pro',
    role: 'user',
    banned: false,
    joined: '2026-08-22T16:30:00Z',
    verifications: 215,
    last_active: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    verification_count_today: 0,
  },
  {
    id: 'u-105',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@gmail.com',
    plan: 'free',
    role: 'user',
    banned: false,
    joined: '2026-09-01T10:00:00Z',
    verifications: 12,
    last_active: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    verification_count_today: 1,
  },
  {
    id: 'u-106',
    name: 'Priya Sundaram',
    email: 'priya.tnega@outlook.com',
    plan: 'free',
    role: 'user',
    banned: false,
    joined: '2026-09-02T13:45:00Z',
    verifications: 7,
    last_active: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    verification_count_today: 2,
  },
  {
    id: 'u-107',
    name: 'Manoj Kumar (Flagged)',
    email: 'manoj.fake@test.com',
    plan: 'free',
    role: 'user',
    banned: true,
    joined: '2026-09-03T18:00:00Z',
    verifications: 4,
    last_active: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    verification_count_today: 0,
  },
];

export async function GET(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const plan = searchParams.get('plan') || 'all';
    const sort = searchParams.get('sort') || 'joined';

    let list = [...mockUsers];

    try {
      const { data: dbUsers } = await supabase.from('users').select('*');
      if (dbUsers && dbUsers.length > 0) {
        const existingEmails = new Set(list.map((u) => u.email.toLowerCase()));
        dbUsers.forEach((u: any) => {
          if (!existingEmails.has(u.email.toLowerCase())) {
            list.unshift({
              id: u.id,
              name: u.name || u.email.split('@')[0],
              email: u.email,
              plan: (u.plan || 'free') as 'free' | 'pro' | 'business',
              role: (u.role || 'user') as 'user' | 'admin',
              banned: !!u.banned,
              joined: u.created_at || new Date().toISOString(),
              verifications: u.verification_count_total || 0,
              last_active: u.updated_at || u.created_at || new Date().toISOString(),
              verification_count_today: u.verification_count_today || 0,
            });
            existingEmails.add(u.email.toLowerCase());
          }
        });
      }
    } catch (e) {
      console.debug('Failed to query users from Supabase:', e);
    }

    // Filter by search
    if (search) {
      list = list.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
      );
    }

    // Filter by plan
    if (plan !== 'all') {
      list = list.filter((u) => u.plan === plan);
    }

    // Sorting
    if (sort === 'verifications') {
      list.sort((a, b) => b.verifications - a.verifications);
    } else if (sort === 'last_active') {
      list.sort((a, b) => new Date(b.last_active).getTime() - new Date(a.last_active).getTime());
    } else {
      list.sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
    }

    return NextResponse.json({ users: list, total: list.length });
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
    const { action, userId } = body;

    let targetUser = mockUsers.find((u) => u.id === userId);
    if (!targetUser) {
      try {
        const { data: u } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();
        if (u) {
          targetUser = {
            id: u.id,
            name: u.name || u.email.split('@')[0],
            email: u.email,
            plan: (u.plan || 'free') as 'free' | 'pro' | 'business',
            role: (u.role || 'user') as 'user' | 'admin',
            banned: !!u.banned,
            joined: u.created_at || new Date().toISOString(),
            verifications: u.verification_count_total || 0,
            last_active: u.updated_at || u.created_at || new Date().toISOString(),
            verification_count_today: u.verification_count_today || 0,
          };
          mockUsers.unshift(targetUser);
        }
      } catch (e) {
        console.debug('Failed to query user by id from Supabase:', e);
      }
    }

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'upgrade_plan') {
      const { plan } = body;
      targetUser.plan = plan;
      try {
        await supabase.from('users').update({ plan, updated_at: new Date().toISOString() }).eq('email', targetUser.email);
      } catch (e) {
        console.debug('Supabase user plan sync:', e);
      }
      return NextResponse.json({ success: true, user: targetUser });
    }

    if (action === 'downgrade_free') {
      targetUser.plan = 'free';
      try {
        await supabase.from('users').update({ plan: 'free', updated_at: new Date().toISOString() }).eq('email', targetUser.email);
      } catch (e) {
        console.debug('Supabase user downgrade sync:', e);
      }
      return NextResponse.json({ success: true, user: targetUser });
    }

    if (action === 'reset_daily') {
      targetUser.verification_count_today = 0;
      try {
        await supabase.from('users').update({ verification_count_today: 0, updated_at: new Date().toISOString() }).eq('email', targetUser.email);
      } catch (e) {
        console.debug('Supabase reset daily sync:', e);
      }
      return NextResponse.json({ success: true, user: targetUser });
    }

    if (action === 'ban_user') {
      targetUser.banned = true;
      try {
        await supabase.from('users').update({ banned: true, updated_at: new Date().toISOString() }).eq('email', targetUser.email);
      } catch (e) {
        console.debug('Supabase user ban sync:', e);
      }
      return NextResponse.json({ success: true, user: targetUser });
    }

    if (action === 'unban_user') {
      targetUser.banned = false;
      try {
        await supabase.from('users').update({ banned: false, updated_at: new Date().toISOString() }).eq('email', targetUser.email);
      } catch (e) {
        console.debug('Supabase user unban sync:', e);
      }
      return NextResponse.json({ success: true, user: targetUser });
    }

    if (action === 'get_details') {
      return NextResponse.json({
        user: targetUser,
        verifications: [
          {
            id: 'vf-hist-1',
            doc_type: 'UIDAI e-Aadhaar Letter',
            status: 'VALID',
            date: new Date(Date.now() - 3600 * 1000).toISOString(),
          },
          {
            id: 'vf-hist-2',
            doc_type: 'Income Tax Department e-PAN',
            status: 'VALID',
            date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          },
        ],
        payments: [
          {
            id: 'pay-hist-1',
            plan: targetUser.plan,
            amount: targetUser.plan === 'business' ? 2499 : 199,
            status: 'approved',
            date: targetUser.joined,
          },
        ],
        api_keys: targetUser.plan === 'business' ? [
          {
            key: 'vs_live_79a4e891b2c3d4e5••••••••••••',
            name: 'Primary Gateway',
            status: 'active',
          }
        ] : [],
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

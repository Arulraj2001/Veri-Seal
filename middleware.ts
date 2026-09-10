import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;

  // 1. Admin route protection
  if (pathname.startsWith('/admin')) {
    const user = req.auth?.user as { role?: string } | undefined;
    if (!user || user.role !== 'admin') {
      const loginUrl = new URL('/login', req.nextUrl.origin);
      loginUrl.searchParams.set('error', 'admin_required');
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Payment gate on /api/verify
  if (pathname === '/api/verify') {
    try {
      const settingsRes = await fetch(new URL('/api/settings', req.nextUrl.origin));
      if (settingsRes.ok) {
        const settings = await settingsRes.json();

        // If payment toggle is OFF, allow all
        if (!settings.payment_enabled) {
          return NextResponse.next();
        }

        const freeDailyLimit = settings.free_daily_limit || 3;
        const user = req.auth?.user as
          | { plan?: string; verification_count_today?: number }
          | undefined;

        if (user) {
          // Logged-in user
          if (user.plan === 'pro' || user.plan === 'business') {
            return NextResponse.next();
          }

          const countToday = user.verification_count_today || 0;
          if (countToday >= freeDailyLimit) {
            return NextResponse.json(
              {
                error: true,
                code: 'DAILY_LIMIT_REACHED',
                message: `You have reached the free daily limit of ${freeDailyLimit} verifications. Please upgrade your plan to continue.`,
                upgrade_required: true,
              },
              { status: 429 }
            );
          }
        } else {
          // Guest user: check header from client
          const guestCountStr = req.headers.get('x-guest-verification-count');
          const guestCount = parseInt(guestCountStr || '0', 10);

          if (guestCount >= freeDailyLimit) {
            return NextResponse.json(
              {
                error: true,
                code: 'GUEST_LIMIT_REACHED',
                message: `You have reached the free daily limit of ${freeDailyLimit} verifications. Please upgrade your plan to continue.`,
                upgrade_required: true,
              },
              { status: 429 }
            );
          }
        }
      }
    } catch (e) {
      console.debug('Middleware payment gate check bypass:', e);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/api/verify'],
};

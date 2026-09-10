import { NextResponse } from 'next/server';
import { sendPaymentRejectedEmail } from '@/lib/email';
import { auth } from '@/auth';

const emailRateLimit = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, admin_note } = body;

    if (!email) {
      return NextResponse.json({ error: 'User email is required.' }, { status: 400 });
    }

    const now = Date.now();
    const lastSent = emailRateLimit.get(email.toLowerCase());
    if (lastSent && now - lastSent < 300000) {
      return NextResponse.json(
        { error: 'A notification email was already sent recently to this recipient.' },
        { status: 429 }
      );
    }
    emailRateLimit.set(email.toLowerCase(), now);

    const result = await sendPaymentRejectedEmail({
      name: name || 'Citizen User',
      email,
      admin_note,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

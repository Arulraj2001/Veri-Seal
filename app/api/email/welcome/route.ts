import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

const emailRateLimit = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const now = Date.now();
    const lastSent = emailRateLimit.get(email.toLowerCase());
    if (lastSent && now - lastSent < 300000) {
      return NextResponse.json({ message: 'Welcome email already delivered' });
    }
    emailRateLimit.set(email.toLowerCase(), now);

    const result = await sendWelcomeEmail({
      name: name || email.split('@')[0],
      email,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

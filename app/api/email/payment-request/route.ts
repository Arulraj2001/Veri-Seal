import { NextResponse } from 'next/server';
import { sendPaymentRequestEmails } from '@/lib/email';

// In-memory rate limiting map: email -> last sent timestamp
const emailRateLimit = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, plan, amount, txn_id, screenshot_url } = body;

    if (!email || !txn_id || !amount) {
      return NextResponse.json({ error: 'Email, transaction ID, and amount are required.' }, { status: 400 });
    }

    // Rate limiting: 1 email per user per 5 minutes (300,000 ms)
    const now = Date.now();
    const lastSent = emailRateLimit.get(email.toLowerCase());
    if (lastSent && now - lastSent < 300000) {
      return NextResponse.json(
        { error: 'Rate limit reached. Please wait 5 minutes before submitting another payment confirmation email.' },
        { status: 429 }
      );
    }
    emailRateLimit.set(email.toLowerCase(), now);

    const result = await sendPaymentRequestEmails({
      name: name || 'Citizen User',
      email,
      plan: plan || 'pro',
      amount: Number(amount),
      txn_id: String(txn_id),
      screenshot_url: screenshot_url || 'https://Kagazo.in/proofs/default.png',
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

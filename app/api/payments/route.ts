import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getAllPayments, addPayment, inMemoryPayments } from '@/lib/payments-store';

export async function GET() {
  try {
    const session = await auth();
    const all = await getAllPayments();

    if (!session?.user) {
      // Guest: return sample or empty list
      return NextResponse.json({ payments: all.slice(0, 2) });
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    const filtered = all.filter(
      (p) => p.user_id === userId || (userEmail && p.email.toLowerCase() === userEmail.toLowerCase())
    );

    return NextResponse.json({ payments: filtered.length > 0 ? filtered : all.slice(0, 2) });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const { plan, upi_txn_id, amount, name, email, screenshot_url } = body;

    const userEmail = email || session?.user?.email;
    const userName = name || session?.user?.name || 'Citizen User';

    if (!upi_txn_id || !plan || !amount) {
      return NextResponse.json(
        { error: 'Plan, amount, and UPI Transaction ID are required.' },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const newPayment = await addPayment({
      user_id: session?.user?.id || `guest_${Date.now()}`,
      name: userName,
      email: userEmail,
      plan: plan.toLowerCase() as 'pro' | 'business',
      amount: Number(amount),
      upi_txn_id: String(upi_txn_id).trim(),
      screenshot_url: screenshot_url || 'https://veriseal.in/proofs/default.png',
    });

    return NextResponse.json({ success: true, payment: newPayment });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

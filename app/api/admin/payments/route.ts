import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import { sendPaymentApprovedEmail, sendPaymentRejectedEmail } from '@/lib/email';
import { inMemoryPayments, getAllPayments, type PaymentItem } from '@/lib/payments-store';
import { getMergedSettings, updateSiteSettings } from '@/lib/settings-store';

export async function GET(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const settings = await getMergedSettings();
    const payments = await getAllPayments();

    return NextResponse.json({
      payment_enabled: settings.payment_enabled,
      payments,
    });
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
    const { action } = body;

    // 1. Toggle master payment system
    if (action === 'toggle_payment_system') {
      const { enabled } = body;
      const strVal = enabled ? 'true' : 'false';

      await updateSiteSettings({ payment_enabled: strVal });

      return NextResponse.json({ success: true, payment_enabled: enabled });
    }

    // 2. Approve payment request
    if (action === 'approve') {
      const { id, expiry_date } = body;
      const item = inMemoryPayments.find((p) => p.id === id);
      if (!item) {
        return NextResponse.json({ error: 'Payment request not found' }, { status: 404 });
      }

      item.status = 'approved';
      item.expiry_date = expiry_date || '2027-12-31';

      try {
        await supabase
          .from('payment_requests')
          .update({ status: 'approved', updated_at: new Date().toISOString() })
          .eq('id', id);

        await supabase
          .from('users')
          .update({
            plan: item.plan,
            plan_expiry: new Date(item.expiry_date || '2027-12-31').toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('email', item.email);
      } catch (e) {
        console.debug('Supabase approve sync:', e);
      }

      // Dispatch 3b approval email to user
      try {
        await sendPaymentApprovedEmail({
          name: item.name,
          email: item.email,
          plan: item.plan,
          expiry_date: item.expiry_date,
        });
      } catch (emailErr) {
        console.warn('Approval email dispatch warning:', emailErr);
      }

      return NextResponse.json({ success: true, payment: item });
    }

    // 3. Reject payment request
    if (action === 'reject') {
      const { id, reason } = body;
      const item = inMemoryPayments.find((p) => p.id === id);
      if (!item) {
        return NextResponse.json({ error: 'Payment request not found' }, { status: 404 });
      }

      item.status = 'rejected';
      item.admin_note = reason || 'Payment verification unsuccessful.';

      try {
        await supabase
          .from('payment_requests')
          .update({
            status: 'rejected',
            admin_note: item.admin_note,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
      } catch (e) {
        console.debug('Supabase reject sync:', e);
      }

      // Dispatch 3c rejection email to user
      try {
        await sendPaymentRejectedEmail({
          name: item.name,
          email: item.email,
          admin_note: item.admin_note,
        });
      } catch (emailErr) {
        console.warn('Rejection email dispatch warning:', emailErr);
      }

      return NextResponse.json({ success: true, payment: item });
    }

    // 4. Manual Upgrade
    if (action === 'manual_upgrade') {
      const { email, plan, expiry_date } = body;
      if (!email || !plan) {
        return NextResponse.json({ error: 'Email and plan are required.' }, { status: 400 });
      }

      const newRecord: PaymentItem = {
        id: `PR-MANUAL-${Date.now().toString().slice(-4)}`,
        name: email.split('@')[0],
        email: email.toLowerCase().trim(),
        plan: plan as 'pro' | 'business',
        amount: plan === 'business' ? 2499 : 199,
        upi_txn_id: 'ADMIN_MANUAL_GRANT',
        screenshot_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
        submitted: new Date().toISOString(),
        status: 'approved',
        expiry_date: expiry_date || '2027-12-31',
        admin_note: 'Manual administrative plan assignment',
      };

      inMemoryPayments.unshift(newRecord);

      try {
        await supabase
          .from('users')
          .update({
            plan,
            plan_expiry: expiry_date ? new Date(expiry_date).toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('email', email.toLowerCase().trim());
      } catch (e) {
        console.debug('Supabase manual upgrade sync:', e);
      }

      return NextResponse.json({ success: true, payment: newRecord });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

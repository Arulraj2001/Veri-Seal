import { supabase } from '@/lib/supabase';

export interface PaymentItem {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  plan: 'pro' | 'business';
  amount: number;
  upi_txn_id: string;
  screenshot_url: string;
  submitted: string;
  created_at?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_note?: string;
  expiry_date?: string;
}

export const inMemoryPayments: PaymentItem[] = [];

export async function getAllPayments(): Promise<PaymentItem[]> {
  try {
    const { data, error } = await supabase
      .from('payment_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        user_id: d.user_id,
        name: d.name || 'Citizen User',
        email: d.email,
        plan: d.plan,
        amount: d.amount,
        upi_txn_id: d.upi_txn_id,
        screenshot_url: d.screenshot_url,
        submitted: d.created_at || new Date().toISOString(),
        created_at: d.created_at,
        status: d.status || 'pending',
        admin_note: d.admin_note,
        expiry_date: d.expiry_date,
      }));
    }
  } catch (e) {
    console.debug('Supabase getAllPayments fallback:', e);
  }

  return inMemoryPayments;
}

export async function addPayment(item: Omit<PaymentItem, 'id' | 'submitted' | 'status'>): Promise<PaymentItem> {
  const newItem: PaymentItem = {
    ...item,
    id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
    submitted: new Date().toISOString(),
    created_at: new Date().toISOString(),
    status: 'pending',
    admin_note: 'Under review by accounts department',
  };

  try {
    const { data, error } = await supabase
      .from('payment_requests')
      .insert({
        user_id: newItem.user_id || null,
        email: newItem.email,
        name: newItem.name,
        plan: newItem.plan,
        upi_txn_id: newItem.upi_txn_id,
        screenshot_url: newItem.screenshot_url,
        amount: newItem.amount,
        status: 'pending',
        admin_note: newItem.admin_note,
      })
      .select()
      .single();

    if (!error && data) {
      newItem.id = data.id;
    }
  } catch (e) {
    console.debug('Supabase addPayment fallback:', e);
  }

  inMemoryPayments.unshift(newItem);
  return newItem;
}

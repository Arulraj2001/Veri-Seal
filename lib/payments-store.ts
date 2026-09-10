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

export const inMemoryPayments: PaymentItem[] = [
  {
    id: 'PR-8921',
    user_id: 'usr-suresh',
    name: 'Advocate Suresh Menon',
    email: 'suresh.law@madrasbar.in',
    plan: 'pro',
    amount: 199,
    upi_txn_id: '428901238910',
    screenshot_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    submitted: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'PR-8920',
    user_id: 'usr-karthik',
    name: 'Karthik Raja (CSC Center)',
    email: 'csc.karthik@tnonline.in',
    plan: 'business',
    amount: 2499,
    upi_txn_id: '428812903847',
    screenshot_url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    submitted: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'PR-8919',
    user_id: 'usr-pooja',
    name: 'Pooja Bhattacharya',
    email: 'pooja.ca@auditfirm.com',
    plan: 'pro',
    amount: 199,
    upi_txn_id: '428756192834',
    screenshot_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    submitted: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'approved',
    expiry_date: '2027-09-10',
    admin_note: 'Verified with HDFC statement',
  },
  {
    id: 'PR-8918',
    user_id: 'usr-manoj',
    name: 'Manoj Kumar',
    email: 'manoj.fake@test.com',
    plan: 'pro',
    amount: 199,
    upi_txn_id: '000000000000',
    screenshot_url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    submitted: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    status: 'rejected',
    admin_note: 'Invalid UTR reference number not found in bank ledger.',
  },
];

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

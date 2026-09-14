import { supabase } from '@/lib/supabase';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  admin_notes?: string | null;
  created_at: string;
  updated_at?: string;
}

let memoryMessages: ContactMessage[] = [];

export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || null,
    subject: data.subject.trim(),
    message: data.message.trim(),
    status: 'unread',
    admin_notes: null,
    created_at: new Date().toISOString(),
  };

  // 1. Try writing to Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && serviceKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          name: newMsg.name,
          email: newMsg.email,
          phone: newMsg.phone,
          subject: newMsg.subject,
          message: newMsg.message,
          status: newMsg.status,
          created_at: newMsg.created_at,
        }),
      });

      if (res.ok) {
        const rows = await res.json();
        if (rows && rows[0]) {
          newMsg.id = rows[0].id;
        }
      }
    }
  } catch (err) {
    console.debug('Supabase contact_messages write fallback to memory:', err);
  }

  // 2. Add to in-memory store
  memoryMessages = [newMsg, ...memoryMessages];
  return newMsg;
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && serviceKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/contact_messages?select=*&order=created_at.desc`, {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      });

      if (res.ok) {
        const rows: ContactMessage[] = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          // Merge unique rows
          const existingIds = new Set(rows.map((r) => r.id));
          const unmergedMemory = memoryMessages.filter((m) => !existingIds.has(m.id));
          return [...rows, ...unmergedMemory];
        }
      }
    }
  } catch (err) {
    console.debug('Supabase contact_messages fetch fallback to memory:', err);
  }

  return memoryMessages;
}

export async function updateContactMessageStatus(
  id: string,
  updates: { status?: 'unread' | 'read' | 'resolved'; admin_notes?: string }
): Promise<boolean> {
  // Update memory
  memoryMessages = memoryMessages.map((m) => {
    if (m.id === id) {
      return {
        ...m,
        ...(updates.status ? { status: updates.status } : {}),
        ...(updates.admin_notes !== undefined ? { admin_notes: updates.admin_notes } : {}),
        updated_at: new Date().toISOString(),
      };
    }
    return m;
  });

  // Update Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && serviceKey) {
      await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updates,
          updated_at: new Date().toISOString(),
        }),
      });
    }
  } catch (err) {
    console.debug('Supabase update contact message status fallback:', err);
  }

  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  memoryMessages = memoryMessages.filter((m) => m.id !== id);

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && serviceKey) {
      await fetch(`${supabaseUrl}/rest/v1/contact_messages?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      });
    }
  } catch (err) {
    console.debug('Supabase delete contact message fallback:', err);
  }

  return true;
}

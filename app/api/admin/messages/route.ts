import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  getAllContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from '@/lib/contact-store';

// GET all contact messages (admin only)
export async function GET(req: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
  }

  try {
    const messages = await getAllContactMessages();
    return NextResponse.json({ messages });
  } catch (err) {
    console.error('Failed to get admin messages:', err);
    return NextResponse.json({ error: 'Failed to retrieve messages' }, { status: 500 });
  }
}

// PATCH update status or notes (admin only)
export async function PATCH(req: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, admin_notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    await updateContactMessageStatus(id, { status, admin_notes });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to update message:', err);
    return NextResponse.json({ error: 'Failed to update message status' }, { status: 500 });
  }
}

// DELETE a contact message (admin only)
export async function DELETE(req: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    await deleteContactMessage(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to delete message:', err);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}

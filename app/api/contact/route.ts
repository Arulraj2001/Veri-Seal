import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/contact-store';
import { sendContactInquiryEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json({ error: 'Please select or enter an inquiry subject.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please write a message describing your request (minimum 5 characters).' },
        { status: 400 }
      );
    }

    const saved = await saveContactMessage({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Fire email notifications in background (don't block HTTP response)
    sendContactInquiryEmail({
      name,
      email,
      phone,
      subject,
      message,
    }).catch((err) => console.error('Contact email error:', err));

    return NextResponse.json({
      success: true,
      messageId: saved.id,
      message: 'Your inquiry has been received. Our administration desk will respond to your email promptly.',
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while transmitting your message. Please try again.' },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';
import { PaymentRequestReceivedEmail } from './emails/PaymentRequestReceivedEmail';
import { PaymentApprovedEmail } from './emails/PaymentApprovedEmail';
import { PaymentRejectedEmail } from './emails/PaymentRejectedEmail';
import { AdminNewPaymentAlertEmail } from './emails/AdminNewPaymentAlertEmail';
import { WelcomeEmail } from './emails/WelcomeEmail';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'VeriSeal <notifications@veriseal.in>';
const adminNotificationEmail = process.env.ADMIN_EMAIL || 'admin@veriseal.in';

export const resend = new Resend(resendApiKey || 'dummy_resend_init_key');

/**
 * Sends payment request confirmation to user (3a) and alert to admin (3d)
 */
export async function sendPaymentRequestEmails(params: {
  name: string;
  email: string;
  plan: string;
  amount: number;
  txn_id: string;
  screenshot_url: string;
}) {
  try {
    if (resendApiKey && !resendApiKey.includes('mock')) {
      // Send User Email
      await resend.emails.send({
        from: resendFromEmail,
        to: params.email,
        subject: `Payment request received — VeriSeal ${params.plan.toUpperCase()}`,
        react: PaymentRequestReceivedEmail({
          name: params.name,
          plan: params.plan,
          amount: params.amount,
          txn_id: params.txn_id,
        }),
      });

      // Send Admin Email
      await resend.emails.send({
        from: resendFromEmail,
        to: adminNotificationEmail,
        subject: `New payment request — ${params.name} — ${params.plan.toUpperCase()} — ₹${params.amount}`,
        react: AdminNewPaymentAlertEmail({
          name: params.name,
          email: params.email,
          plan: params.plan,
          amount: params.amount,
          txn_id: params.txn_id,
          screenshot_url: params.screenshot_url,
        }),
      });
    } else {
      console.info(`[Resend Mock] Dispatched payment request email to ${params.email} and alert to ${adminNotificationEmail}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending payment request emails:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Sends payment approval notification to user (3b)
 */
export async function sendPaymentApprovedEmail(params: {
  name: string;
  email: string;
  plan: string;
  expiry_date?: string;
}) {
  try {
    if (resendApiKey && !resendApiKey.includes('mock')) {
      await resend.emails.send({
        from: resendFromEmail,
        to: params.email,
        subject: `Your VeriSeal ${params.plan.toUpperCase()} access is now active 🎉`,
        react: PaymentApprovedEmail({
          name: params.name,
          plan: params.plan,
          expiry_date: params.expiry_date,
        }),
      });
    } else {
      console.info(`[Resend Mock] Dispatched payment approved email to ${params.email}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending payment approved email:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Sends payment rejection notification to user (3c)
 */
export async function sendPaymentRejectedEmail(params: {
  name: string;
  email: string;
  admin_note?: string;
}) {
  try {
    if (resendApiKey && !resendApiKey.includes('mock')) {
      await resend.emails.send({
        from: resendFromEmail,
        to: params.email,
        subject: 'VeriSeal payment request update',
        react: PaymentRejectedEmail({
          name: params.name,
          admin_note: params.admin_note,
        }),
      });
    } else {
      console.info(`[Resend Mock] Dispatched payment rejected email to ${params.email}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending payment rejected email:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Sends welcome email to new citizen on registration (3e)
 */
export async function sendWelcomeEmail(params: {
  name: string;
  email: string;
}) {
  try {
    if (resendApiKey && !resendApiKey.includes('mock')) {
      await resend.emails.send({
        from: resendFromEmail,
        to: params.email,
        subject: 'Welcome to VeriSeal 🇮🇳',
        react: WelcomeEmail({
          name: params.name,
        }),
      });
    } else {
      console.info(`[Resend Mock] Dispatched welcome email to ${params.email}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Sends contact inquiry alert to admin and receipt to citizen
 */
export async function sendContactInquiryEmail(params: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  try {
    if (resendApiKey && !resendApiKey.includes('mock') && resendApiKey.startsWith('re_')) {
      // 1. Alert Admin
      await resend.emails.send({
        from: resendFromEmail,
        to: adminNotificationEmail,
        subject: `[VeriSeal Contact] ${params.subject} — ${params.name}`,
        text: `New contact inquiry received on VeriSeal:\n\nName: ${params.name}\nEmail: ${params.email}\nPhone: ${params.phone || 'Not provided'}\nSubject: ${params.subject}\n\nMessage:\n${params.message}\n\n---\nVeriSeal Sovereign Document Operations Desk`,
      });

      // 2. Receipt to Citizen
      await resend.emails.send({
        from: resendFromEmail,
        to: params.email,
        subject: `Inquiry Received: ${params.subject} — VeriSeal Support Desk`,
        text: `Dear ${params.name},\n\nThank you for reaching out to VeriSeal Sovereign Document Operations Desk. We have received your inquiry regarding "${params.subject}".\n\nOur administration desk will review your details and respond directly to this email.\n\nYour message:\n"${params.message}"\n\nWarm regards,\nVeriSeal Operations Desk\nhttps://veri-seal.vercel.app`,
      });
    } else {
      console.info(`[Resend Mock] Dispatched contact inquiry alert for ${params.name} (${params.email}) to ${adminNotificationEmail}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending contact inquiry email:', error);
    return { success: false, error: String(error) };
  }
}


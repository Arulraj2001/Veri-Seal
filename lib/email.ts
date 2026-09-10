import { Resend } from 'resend';
import { PaymentRequestReceivedEmail } from './emails/PaymentRequestReceivedEmail';
import { PaymentApprovedEmail } from './emails/PaymentApprovedEmail';
import { PaymentRejectedEmail } from './emails/PaymentRejectedEmail';
import { AdminNewPaymentAlertEmail } from './emails/AdminNewPaymentAlertEmail';
import { WelcomeEmail } from './emails/WelcomeEmail';

const resendApiKey = process.env.RESEND_API_KEY || 're_mock_test_api_key';
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'VeriSeal <notifications@veriseal.in>';
const adminNotificationEmail = process.env.ADMIN_EMAIL || 'admin@veriseal.in';

export const resend = new Resend(resendApiKey);

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

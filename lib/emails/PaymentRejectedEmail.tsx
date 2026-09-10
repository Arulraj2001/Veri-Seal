import * as React from 'react';

interface PaymentRejectedEmailProps {
  name: string;
  admin_note?: string;
  contact_email?: string;
}

export function PaymentRejectedEmail({
  name,
  admin_note = 'The submitted UPI reference (UTR) could not be matched against our banking statement ledger.',
  contact_email = 'support@veriseal.in',
}: PaymentRejectedEmailProps) {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#FBFAF9', padding: '32px 16px', color: '#2E241F' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F1EFEE', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        {/* Header */}
        <div style={{ borderBottom: '2px solid #F1EFEE', paddingBottom: '20px', marginBottom: '24px' }}>
          <span style={{ backgroundColor: '#FFF0EA', border: '1px solid #E6570B', color: '#E6570B', borderRadius: '8px', padding: '6px 12px', fontWeight: 'bold', fontSize: '18px' }}>
            VeriSeal
          </span>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2E241F', margin: '0 0 16px 0' }}>
          VeriSeal Payment Request Update
        </h2>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
          Hi <strong>{name}</strong>,
        </p>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
          We reviewed your recent UPI subscription payment verification request. Unfortunately, our accounts desk could not verify this transaction.
        </p>

        {/* Reason Alert */}
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', padding: '16px', marginBottom: '24px', color: '#991B1B' }}>
          <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
            Reason for Rejection:
          </strong>
          <span style={{ fontSize: '14px', lineHeight: '1.5' }}>{admin_note}</span>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
          If money was deducted from your account, it may take 24–48 hours for your bank to settle or reverse. If you entered a typo in the UTR reference, you can submit a new payment request with the correct 12-digit reference number.
        </p>

        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <a
            href="https://veriseal.in/dashboard/payment"
            style={{
              backgroundColor: '#E6570B',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '14px 28px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Submit New Payment Request &rarr;
          </a>
        </div>

        <p style={{ fontSize: '13px', color: '#786C65', lineHeight: '1.5', margin: '0 0 24px 0' }}>
          If you believe this is an error, please reply to this email or reach us directly at{' '}
          <a href={`mailto:${contact_email}`} style={{ color: '#E6570B', fontWeight: 'bold' }}>{contact_email}</a> with your bank transaction PDF receipt.
        </p>

        <div style={{ borderTop: '1px solid #F1EFEE', paddingTop: '16px', fontSize: '11px', color: '#9C9189', textAlign: 'center' }}>
          VeriSeal Support Desk &bull; 100% In-Memory RAM Verification
        </div>
      </div>
    </div>
  );
}

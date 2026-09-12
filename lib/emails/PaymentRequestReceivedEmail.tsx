import * as React from 'react';

interface PaymentRequestReceivedEmailProps {
  name: string;
  plan: string;
  amount: number;
  txn_id: string;
  contact_email?: string;
}

export function PaymentRequestReceivedEmail({
  name,
  plan,
  amount,
  txn_id,
  contact_email = 'support@Kagazo.in',
}: PaymentRequestReceivedEmailProps) {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#FBFAF9', padding: '32px 16px', color: '#2E241F' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F1EFEE', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        {/* Header */}
        <div style={{ borderBottom: '2px solid #F1EFEE', paddingBottom: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#FFF0EA', border: '1px solid #E6570B', color: '#E6570B', borderRadius: '8px', padding: '6px 12px', fontWeight: 'bold', fontSize: '18px' }}>
              Kagazo
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#786C65', margin: '8px 0 0 0' }}>
            Indian Government PDF Digital Signature Verification
          </p>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2E241F', margin: '0 0 16px 0' }}>
          Payment Request Received
        </h2>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
          Hi <strong>{name}</strong>,
        </p>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          We received your payment verification request for the Kagazo <strong>{plan.toUpperCase()}</strong> subscription tier.
        </p>

        {/* Receipt Box */}
        <div style={{ backgroundColor: '#FBFAF9', border: '1px solid #E5E1DE', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Plan Tier:</td>
                <td style={{ padding: '6px 0', fontWeight: 'bold', textAlign: 'right', textTransform: 'capitalize' }}>{plan}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Amount Paid:</td>
                <td style={{ padding: '6px 0', fontWeight: '800', color: '#E6570B', textAlign: 'right' }}>₹{amount}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>UPI Transaction / UTR:</td>
                <td style={{ padding: '6px 0', fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'right' }}>{txn_id}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
          Our accounts team will review your payment screenshot and activate your account within <strong>24 hours</strong>.
        </p>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
          You can check your payment status anytime at{' '}
          <a href="https://Kagazo.in/dashboard/payment" style={{ color: '#E6570B', fontWeight: 'bold', textDecoration: 'underline' }}>
            Kagazo.in/dashboard/payment
          </a>.
        </p>

        <p style={{ fontSize: '13px', color: '#786C65', lineHeight: '1.5', margin: '0 0 24px 0' }}>
          If you have any questions or made an error in the UTR number, reply to this email or contact us at{' '}
          <a href={`mailto:${contact_email}`} style={{ color: '#E6570B' }}>{contact_email}</a>.
        </p>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #F1EFEE', paddingTop: '16px', fontSize: '11px', color: '#9C9189', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Kagazo India. All rights reserved. Processing exclusively in volatile RAM.
          <br />
          <a href="https://Kagazo.in/privacy" style={{ color: '#786C65', textDecoration: 'underline' }}>Privacy Policy</a> &bull;{' '}
          <a href="https://Kagazo.in/terms" style={{ color: '#786C65', textDecoration: 'underline' }}>Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

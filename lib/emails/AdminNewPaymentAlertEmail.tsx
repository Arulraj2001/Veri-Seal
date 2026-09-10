import * as React from 'react';

interface AdminNewPaymentAlertEmailProps {
  name: string;
  email: string;
  plan: string;
  amount: number;
  txn_id: string;
  screenshot_url: string;
}

export function AdminNewPaymentAlertEmail({
  name,
  email,
  plan,
  amount,
  txn_id,
  screenshot_url,
}: AdminNewPaymentAlertEmailProps) {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#FBFAF9', padding: '32px 16px', color: '#2E241F' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F1EFEE', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        {/* Header */}
        <div style={{ borderBottom: '2px solid #F1EFEE', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#E6570B', color: '#FFFFFF', borderRadius: '8px', padding: '4px 10px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}>
            Admin Alert
          </span>
          <span style={{ fontSize: '12px', color: '#786C65' }}>VeriSeal Treasury</span>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#2E241F', margin: '0 0 16px 0' }}>
          New UPI Subscription Payment Request
        </h2>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          A citizen has submitted proof of payment for the <strong>{plan.toUpperCase()}</strong> tier:
        </p>

        <div style={{ backgroundColor: '#FBFAF9', border: '1px solid #E5E1DE', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Name:</td>
                <td style={{ padding: '6px 0', fontWeight: 'bold', textAlign: 'right' }}>{name}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Email:</td>
                <td style={{ padding: '6px 0', fontWeight: 'bold', textAlign: 'right' }}>{email}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Plan Tier:</td>
                <td style={{ padding: '6px 0', fontWeight: 'bold', textAlign: 'right', textTransform: 'capitalize' }}>{plan}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Expected Amount:</td>
                <td style={{ padding: '6px 0', fontWeight: '800', color: '#E6570B', textAlign: 'right' }}>₹{amount}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#786C65' }}>Claimed UPI Txn ID / UTR:</td>
                <td style={{ padding: '6px 0', fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'right' }}>{txn_id}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <strong style={{ fontSize: '12px', display: 'block', textTransform: 'uppercase', color: '#786C65', marginBottom: '8px' }}>
            Payment Proof Screenshot:
          </strong>
          <a href={screenshot_url} target="_blank" rel="noopener noreferrer" style={{ color: '#E6570B', fontSize: '13px', textDecoration: 'underline' }}>
            Click to View Uploaded Proof Image &rarr;
          </a>
        </div>

        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <a
            href="https://veriseal.in/admin/payments"
            style={{
              backgroundColor: '#2E241F',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '14px 28px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Review in Admin Panel &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

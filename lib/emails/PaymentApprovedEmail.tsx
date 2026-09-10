import * as React from 'react';

interface PaymentApprovedEmailProps {
  name: string;
  plan: string;
  expiry_date?: string;
}

export function PaymentApprovedEmail({
  name,
  plan,
  expiry_date = 'December 31, 2027',
}: PaymentApprovedEmailProps) {
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
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🎉</div>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2E241F', margin: '0 0 8px 0' }}>
            Your VeriSeal {plan.toUpperCase()} Access is Now Active!
          </h2>
          <p style={{ fontSize: '14px', color: '#786C65', margin: 0 }}>
            Hi {name}, your UPI payment has been verified and your subscription is active.
          </p>
        </div>

        <div style={{ backgroundColor: '#FBFAF9', border: '1px solid #E5E1DE', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ color: '#786C65' }}>Subscription Tier:</span>
            <strong style={{ textTransform: 'capitalize', color: '#E6570B' }}>{plan} Unlimited</strong>
          </div>
          <div style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ color: '#786C65' }}>Valid Until:</span>
            <strong>{expiry_date}</strong>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2E241F', margin: '0 0 12px 0' }}>
            Features Now Unlocked on Your Account:
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#2E241F' }}>
            <li><strong>Unlimited Verifications:</strong> No daily limits on Aadhaar, PAN, caste, or revenue certificates.</li>
            <li><strong>LTV PDF Download:</strong> Green-tick stamped documents with embedded DSS dictionaries.</li>
            {plan === 'business' && (
              <li><strong>REST API Access:</strong> Developer tokens with up to 500 API calls per day.</li>
            )}
            <li><strong>Priority RAM Execution:</strong> Dedicated in-memory verification queue for immediate processing.</li>
            <li><strong>CSV Audit Logs:</strong> Download complete cryptographic verification histories anytime.</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <a
            href="https://veriseal.in/dashboard"
            style={{
              backgroundColor: '#E6570B',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '14px 28px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 10px rgba(230,87,11,0.25)',
            }}
          >
            Go to Your Dashboard &rarr;
          </a>
        </div>

        <div style={{ borderTop: '1px solid #F1EFEE', paddingTop: '16px', fontSize: '11px', color: '#9C9189', textAlign: 'center' }}>
          Thank you for supporting digital integrity in citizen government services.
          <br />
          VeriSeal &bull; Safe, Private, and Cryptographically Authentic
        </div>
      </div>
    </div>
  );
}

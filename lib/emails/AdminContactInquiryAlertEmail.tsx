import * as React from 'react';

interface AdminContactInquiryAlertEmailProps {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export function AdminContactInquiryAlertEmail({
  name,
  email,
  phone,
  subject,
  message,
}: AdminContactInquiryAlertEmailProps) {
  const replyMailto = `mailto:${email}?subject=${encodeURIComponent(`Re: [Kagazo Support] ${subject}`)}`;

  return (
    <div style={{ fontFamily: 'Helvetica, -apple-system, BlinkMacSystemFont, Arial, sans-serif', backgroundColor: '#F8FAF9', padding: '36px 16px', color: '#1E2923' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5ECE8', padding: '32px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.04)' }}>
        
        {/* Header Bar */}
        <div style={{ borderBottom: '2px solid #F0F4F2', paddingBottom: '18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#059669', color: '#FFFFFF', borderRadius: '8px', padding: '5px 12px', fontWeight: '800', fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Citizen Support Inquiry
            </span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: '20px', border: '1px solid #A7F3D0' }}>
            Priority Alert
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#064E3B', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
          New Inquiry: {subject}
        </h2>
        <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 20px 0', lineHeight: '1.5' }}>
          A citizen has submitted a technical inquiry via the official Kagazo contact desk:
        </p>

        {/* Citizen Meta Card */}
        <div style={{ backgroundColor: '#F9FBFA', border: '1px solid #E2EAE5', borderRadius: '14px', padding: '18px', marginBottom: '22px' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px 0', color: '#6B7280', fontWeight: '600' }}>Citizen Name:</td>
                <td style={{ padding: '8px 0', fontWeight: '800', textAlign: 'right', color: '#111827' }}>{name}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6B7280', fontWeight: '600' }}>Email Address:</td>
                <td style={{ padding: '8px 0', fontWeight: '800', textAlign: 'right' }}>
                  <a href={`mailto:${email}`} style={{ color: '#059669', textDecoration: 'none' }}>{email}</a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6B7280', fontWeight: '600' }}>Phone / WhatsApp:</td>
                <td style={{ padding: '8px 0', fontWeight: '700', textAlign: 'right', color: phone ? '#111827' : '#9CA3AF' }}>
                  {phone ? (
                    <a href={`tel:${phone}`} style={{ color: '#059669', textDecoration: 'none' }}>{phone}</a>
                  ) : (
                    'Not provided'
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#6B7280', fontWeight: '600' }}>Inquiry Category:</td>
                <td style={{ padding: '8px 0', fontWeight: '800', textAlign: 'right', color: '#065F46' }}>
                  <span style={{ backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px', border: '1px solid #D1FAE5' }}>
                    {subject}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Message Card */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#4B5563', marginBottom: '8px' }}>
            Citizen Message
          </label>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderLeft: '4px solid #059669', borderRadius: '8px', padding: '16px', fontSize: '14px', lineHeight: '1.6', color: '#1F2937', whiteSpace: 'pre-wrap' }}>
            {message}
          </div>
        </div>

        {/* 1-Click Action Button */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <a
            href={replyMailto}
            style={{
              display: 'inline-block',
              backgroundColor: '#059669',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '14px',
              padding: '12px 28px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            }}
          >
            Reply to Citizen &rarr;
          </a>
          <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>
            Clicking will open your default email client addressed to <strong>{email}</strong>
          </p>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E5ECE8', paddingTop: '16px', textAlign: 'center', fontSize: '11px', color: '#9CA3AF', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#4B5563' }}>
            Kagazo Sovereign Document Operations Desk
          </p>
          <p style={{ margin: 0 }}>
            Automated notification dispatch via Resend API • https://kagazo.in
          </p>
        </div>

      </div>
    </div>
  );
}

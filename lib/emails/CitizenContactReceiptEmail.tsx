import * as React from 'react';

interface CitizenContactReceiptEmailProps {
  name: string;
  subject: string;
  message: string;
}

export function CitizenContactReceiptEmail({
  name,
  subject,
  message,
}: CitizenContactReceiptEmailProps) {
  return (
    <div style={{ fontFamily: 'Helvetica, -apple-system, BlinkMacSystemFont, Arial, sans-serif', backgroundColor: '#F8FAF9', padding: '36px 16px', color: '#1E2923' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5ECE8', padding: '32px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.04)' }}>
        
        {/* Header Bar */}
        <div style={{ borderBottom: '2px solid #F0F4F2', paddingBottom: '18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', borderRadius: '8px', padding: '6px 14px', fontWeight: '900', fontSize: '16px', letterSpacing: '-0.3px' }}>
            Kagazo 🇮🇳
          </span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ✓ Inquiry Received
          </span>
        </div>

        {/* Hero Title */}
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#064E3B', margin: '0 0 12px 0', letterSpacing: '-0.3px' }}>
          We&apos;ve Received Your Message, {name}!
        </h2>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 18px 0', color: '#374151' }}>
          Thank you for contacting the <strong>Kagazo Sovereign Document Technical Support Desk</strong>. We have logged your request regarding <strong>&ldquo;{subject}&rdquo;</strong>.
        </p>

        {/* Response Guarantee Pill */}
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px 18px', marginBottom: '22px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#065F46', marginBottom: '4px' }}>
            ⚡ 2 to 4 Business Hours Response Window
          </div>
          <div style={{ fontSize: '12px', color: '#047857', lineHeight: '1.5' }}>
            Our support engineers review state CCA certificates, PDF cryptography errors, and exam tool specifications Monday through Saturday (9:00 AM – 7:00 PM IST). We will reply directly to your email.
          </div>
        </div>

        {/* Summary Card */}
        <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', margin: '0 0 8px 0' }}>
            Copy of Submitted Details:
          </h3>
          <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', fontStyle: 'italic', borderLeft: '3px solid #059669', paddingLeft: '12px', marginTop: '6px' }}>
            &ldquo;{message}&rdquo;
          </div>
        </div>

        {/* Quick Tools Links */}
        <div style={{ backgroundColor: '#F8FAF9', border: '1px solid #E5ECE8', borderRadius: '12px', padding: '16px', marginBottom: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: '#4B5563', margin: '0 0 10px 0' }}>
            In the meantime, explore our free instant utilities:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href="https://kagazo.in"
              style={{
                display: 'inline-block',
                backgroundColor: '#059669',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '800',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Verify Government PDF
            </a>
            <a
              href="https://kagazo.in/tools"
              style={{
                display: 'inline-block',
                backgroundColor: '#FFFFFF',
                color: '#059669',
                border: '1px solid #059669',
                fontSize: '12px',
                fontWeight: '800',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              32+ Free Exam Tools &rarr;
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E5ECE8', paddingTop: '16px', textAlign: 'center', fontSize: '11px', color: '#9CA3AF', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#4B5563' }}>
            Kagazo — Indian Government Digital Signature Verification &amp; Exam Tools
          </p>
          <p style={{ margin: 0 }}>
            Chennai, Tamil Nadu, India • https://kagazo.in • 100% In-RAM Zero Retention Privacy
          </p>
        </div>

      </div>
    </div>
  );
}

import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#FBFAF9', padding: '32px 16px', color: '#2E241F' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F1EFEE', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        {/* Header */}
        <div style={{ borderBottom: '2px solid #F1EFEE', paddingBottom: '20px', marginBottom: '24px' }}>
          <span style={{ backgroundColor: '#FFF0EA', border: '1px solid #E6570B', color: '#E6570B', borderRadius: '8px', padding: '6px 12px', fontWeight: 'bold', fontSize: '18px' }}>
            Kagazo
          </span>
        </div>

        {/* Hero */}
        <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2E241F', margin: '0 0 12px 0' }}>
          Welcome to Kagazo 🇮🇳
        </h2>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
          Hi <strong>{name}</strong>, welcome to India&apos;s free, private, and open digital signature verification portal for government documents.
        </p>

        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
          Kagazo enables citizens, advocates, and institutions to verify cryptographic digital signatures on UIDAI e-Aadhaar letters, e-PAN cards, state revenue certificates (caste, income, nativity), and court orders directly against the <strong>Controller of Certifying Authorities (CCA)</strong> root PKI.
        </p>

        {/* 3 Steps */}
        <div style={{ backgroundColor: '#FBFAF9', border: '1px solid #E5E1DE', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#2E241F', margin: '0 0 16px 0' }}>
            How to Verify Your First PDF in 3 Easy Steps:
          </h3>

          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#E6570B', marginRight: '6px' }}>1.</strong>
            <span style={{ fontSize: '13px' }}><strong>Upload PDF:</strong> Drag and drop your downloaded government certificate.</span>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#E6570B', marginRight: '6px' }}>2.</strong>
            <span style={{ fontSize: '13px' }}><strong>Instant RAM Audit:</strong> Our engine evaluates certificate chains in volatile RAM without saving files.</span>
          </div>

          <div>
            <strong style={{ color: '#E6570B', marginRight: '6px' }}>3.</strong>
            <span style={{ fontSize: '13px' }}><strong>Download LTV PDF:</strong> Get a green-tick stamped PDF with permanent validity in Adobe Acrobat.</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <a
            href="https://Kagazo.in"
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
            Verify Your First PDF &rarr;
          </a>
        </div>

        <div style={{ borderTop: '1px solid #F1EFEE', paddingTop: '16px', fontSize: '11px', color: '#9C9189', textAlign: 'center' }}>
          Kagazo &bull; Protecting the cryptographic integrity of Digital India
          <br />
          No document retention &bull; 100% Client Privacy
        </div>
      </div>
    </div>
  );
}

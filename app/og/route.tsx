import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Indian Government PDF Digital Signature Verification Engine';
    const subtitle = searchParams.get('subtitle') || 'Free Cryptographic Verification • Fix Yellow Question Mark • CCA India Verified';
    const host = request.headers.get('host') || 'kagazo.in';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            backgroundColor: '#FBFAF9',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
          }}
        >
          {/* Top border highlight in Indian saffron / brand orange */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(90deg, #E6570B 0%, #F59E0B 50%, #16A34A 100%)',
            }}
          />

          {/* Header with Kagazo Brand Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#E6570B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(230, 87, 11, 0.3)',
                }}
              >
                <span style={{ fontSize: '32px', color: '#FFFFFF', fontWeight: 'bold' }}>✓</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#2E241F', letterSpacing: '-0.5px' }}>
                  Kaga<span style={{ color: '#E6570B' }}>zo</span>
                </span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#665C54', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Official National PKI Verification
                </span>
              </div>
            </div>

            {/* Indian Flag / Security Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                backgroundColor: '#F1EFEE',
                borderRadius: '9999px',
                border: '1px solid #E2DED9',
              }}
            >
              <span style={{ fontSize: '18px' }}>🇮🇳</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#2E241F' }}>
                CCA India Root Trust
              </span>
            </div>
          </div>

          {/* Main Title Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '40px 0' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  padding: '6px 14px',
                  backgroundColor: 'rgba(230, 87, 11, 0.1)',
                  color: '#E6570B',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Zero-Knowledge Cryptography
              </span>
            </div>
            <div
              style={{
                fontSize: title.length > 60 ? '48px' : '56px',
                fontWeight: '900',
                color: '#2E241F',
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
                maxWidth: '1040px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '500',
                color: '#52453E',
                maxWidth: '960px',
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom Bar with Trust Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '2px solid #EAE6E1',
            }}
          >
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#16A34A', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#2E241F' }}>e-Aadhaar</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#16A34A', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#2E241F' }}>TNeGA e-Sevai</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#16A34A', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#2E241F' }}>e-PAN Card</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#16A34A', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#2E241F' }}>DigiLocker</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#E6570B' }}>
                {host}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
}

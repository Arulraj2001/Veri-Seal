import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Indian Government PDF Digital Signature Verification Engine';
    const subtitle = searchParams.get('subtitle') || '100% In-Browser Volatile RAM Execution · Zero Uploads · Official Portal Calibrated';
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
            background: 'linear-gradient(135deg, #090D16 0%, #0F172A 50%, #162033 100%)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Orange & Indigo Blooms */}
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '540px',
              height: '540px',
              borderRadius: '100%',
              background: 'radial-gradient(circle, rgba(230, 87, 11, 0.32) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '450px',
              height: '450px',
              borderRadius: '100%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
              display: 'flex',
            }}
          />

          {/* Top Indian Tricolor border highlight */}
          <div
            style={{
              width: '100%',
              height: '6px',
              background: 'linear-gradient(90deg, #E6570B 0%, #F59E0B 45%, #10B981 100%)',
              display: 'flex',
            }}
          />

          {/* Inner Content Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '48px 72px 24px 72px',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/* Header with Brand & Live RAM Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #E6570B 0%, #D04808 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 18px rgba(230, 87, 11, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: 'bold' }}>✓</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '26px',
                      fontWeight: '900',
                      color: '#F8FAFC',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Kagazo
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#94A3B8',
                      fontWeight: '600',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {host}
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    background: '#10B981',
                    display: 'flex',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#34D399',
                    letterSpacing: '0.06em',
                  }}
                >
                  100% IN-BROWSER RAM · PRIVACY GUARANTEED
                </span>
              </div>
            </div>

            {/* Central Grid */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
                margin: '28px 0',
              }}
            >
              {/* Title & Subtitle */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '750px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: 'rgba(230, 87, 11, 0.18)',
                      border: '1px solid rgba(230, 87, 11, 0.38)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: '#FB923C',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Official Sovereign Knowledge Base
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: title.length > 55 ? '38px' : title.length > 35 ? '44px' : '50px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    lineHeight: '1.14',
                    letterSpacing: '-0.03em',
                    marginBottom: '14px',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {title}
                </div>

                <div
                  style={{
                    fontSize: '18px',
                    color: '#94A3B8',
                    lineHeight: '1.38',
                    fontWeight: '500',
                    display: 'flex',
                  }}
                >
                  {subtitle}
                </div>
              </div>

              {/* Right Trust Card */}
              <div
                style={{
                  width: '290px',
                  padding: '24px',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#CBD5E1',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '8px',
                    display: 'flex',
                  }}
                >
                  Validated Standards
                </div>

                {[
                  { icon: '🛡️', title: 'UIDAI & CCA India', desc: 'Compliant verification' },
                  { icon: '⚡', title: 'Zero File Uploads', desc: 'Runs in local memory' },
                  { icon: '📄', title: '100% Free Forever', desc: 'No signup or watermark' },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#F1F5F9' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 72px',
              background: 'rgba(9, 13, 22, 0.85)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', gap: '24px' }}>
              {['e-Aadhaar', 'TNeGA e-Sevai', 'e-PAN Card', 'DigiLocker'].map((badge) => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#E2E8F0' }}>{badge}</span>
                </div>
              ))}
            </div>

            <span style={{ fontSize: '14px', fontWeight: '800', color: '#FB923C' }}>
              {host}
            </span>
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

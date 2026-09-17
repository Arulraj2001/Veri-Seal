import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Kagazo — Sovereign Indian Document Tools';
  const subtitle = searchParams.get('subtitle') || '100% In-Browser Volatile RAM Execution · Zero Uploads · Official Portal Calibrated';
  const type = searchParams.get('type') || 'blog';

  // Dynamic category / badge text
  const categoryLabel =
    type === 'blog'
      ? 'OFFICIAL KAGAZO GUIDE'
      : type === 'verify'
      ? 'DIGITAL SIGNATURE VERIFIER'
      : type === 'photo'
      ? 'EXAM & STUDIO PHOTO LAB'
      : type === 'pdf'
      ? 'SOVEREIGN PDF UTILITY'
      : type === 'calc'
      ? 'FINANCE & STATUTORY CALCULATOR'
      : 'CITIZEN DOCUMENT TOOL';

  const icon =
    type === 'blog'
      ? '📖'
      : type === 'verify'
      ? '🔏'
      : type === 'photo'
      ? '📸'
      : type === 'pdf'
      ? '📄'
      : type === 'calc'
      ? '🧮'
      : '⚡';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #090D16 0%, #0F172A 50%, #162033 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glowing ambient radial light bloom (Orange/Amber) */}
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

        {/* Ambient bottom-left indigo bloom */}
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

        {/* Indian Tricolor Accent Top Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'linear-gradient(90deg, #E6570B 0%, #F59E0B 45%, #10B981 100%)',
            display: 'flex',
          }}
        />

        {/* Main Content Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 72px 24px 72px',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          {/* Top Brand Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Logo + Name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #E6570B 0%, #D04808 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  color: 'white',
                  boxShadow: '0 4px 18px rgba(230, 87, 11, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                🛡️
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
                  kagazo.in
                </span>
              </div>
            </div>

            {/* Live RAM Privacy Indicator Badge */}
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
                100% CLIENT RAM EXECUTION · ZERO UPLOADS
              </span>
            </div>
          </div>

          {/* Central Showcase Grid: Left Title Block + Right Glassmorphic Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              margin: '28px 0',
            }}
          >
            {/* Left: Category Badge, Main Title & Subtitle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: '740px',
              }}
            >
              {/* Category Pill */}
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
                  <span style={{ fontSize: '14px' }}>{icon}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      color: '#FB923C',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {categoryLabel}
                  </span>
                </div>
              </div>

              {/* Main Article Title */}
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

              {/* Subtitle / Excerpt */}
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

            {/* Right: Glassmorphic Security & Spec Seal Card */}
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
                Verified Sovereign Specs
              </div>

              {[
                { icon: '🔒', title: 'Zero Data Retention', desc: 'RAM-volatile processing' },
                { icon: '⚡', title: 'Instant Execution', desc: 'No queue · No server delay' },
                { icon: '🖨️', title: '300 DPI Print Ready', desc: 'Lossless vector output' },
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

        {/* Bottom Sovereign Trust Ribbon */}
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
          <span
            style={{
              fontSize: '14px',
              color: '#F8FAFC',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🇮🇳 India's Sovereign Document &amp; Utility Suite
          </span>

          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            {[
              'Zero Watermarks',
              'Zero Login Required',
              'Free for Every Indian',
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: '12px',
                  color: '#94A3B8',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

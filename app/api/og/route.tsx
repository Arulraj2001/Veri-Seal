import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'VeriSeal — Indian Document Tools';
  const subtitle = searchParams.get('subtitle') || 'Verify · Resize · Convert · Generate';
  const type = searchParams.get('type') || 'tool';

  // Icon based on type
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
          background: '#FBFAF9',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Orange top bar */}
        <div
          style={{
            width: '100%',
            height: '8px',
            background: '#E6570B',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px',
            flex: 1,
          }}
        >
          {/* VeriSeal logo row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                background: '#E6570B',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white',
              }}
            >
              🛡️
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#2E241F',
              }}
            >
              VeriSeal
            </span>
            <span
              style={{
                fontSize: '16px',
                color: '#9CA3AF',
                marginLeft: '8px',
              }}
            >
              veriseal.in
            </span>
          </div>

          {/* Icon */}
          <div
            style={{
              fontSize: '72px',
              marginBottom: '24px',
              display: 'flex',
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? '42px' : '52px',
              fontWeight: '800',
              color: '#2E241F',
              lineHeight: '1.1',
              maxWidth: '900px',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '24px',
              color: '#6B7280',
              display: 'flex',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 80px',
            background: '#F1EFEE',
            borderTop: '1px solid #E5E7EB',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#2E241F',
              fontWeight: '600',
              display: 'flex',
            }}
          >
            🇮🇳 Free for every Indian
          </span>
          <div
            style={{
              display: 'flex',
              gap: '32px',
            }}
          >
            {['✅ No signup', '⚡ Instant', '🔒 Private'].map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  display: 'flex',
                }}
              >
                {badge}
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['msedge-tts'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/tools/ifsc-finder',
        destination: '/tools/ifsc-code-finder',
        permanent: true,
      },
      {
        source: '/tools/ibps-bank-photo-signature-resizer',
        destination: '/tools/ibps-photo-signature-resizer',
        permanent: true,
      },
      {
        source: '/tools/marksheet-pdf-merger',
        destination: '/tools/merge-marksheets-pdf',
        permanent: true,
      },
      {
        source: '/tools/bilingual-affidavit-generator',
        destination: '/tools/affidavit-generator',
        permanent: true,
      },
      {
        source: '/tools/income-tax-fy25-calculator',
        destination: '/tools/income-tax-calculator-2025-26',
        permanent: true,
      },
      {
        source: '/tools/ats-resume-builder',
        destination: '/tools/free-ats-resume-builder',
        permanent: true,
      },
      {
        source: '/tools/pdf-password-remover',
        destination: '/tools/unlock-pdf',
        permanent: true,
      },
      {
        source: '/tools/aadhaar-masker',
        destination: '/tools/mask-aadhaar',
        permanent: true,
      },
      {
        source: '/tools/compress-pdf',
        destination: '/tools/pdf-compressor',
        permanent: true,
      },
      {
        source: '/tools/image-to-pdf',
        destination: '/tools/image-to-pdf-200kb',
        permanent: true,
      },
      {
        source: '/tools/passport-photo',
        destination: '/tools/passport-photo-maker',
        permanent: true,
      },
      {
        source: '/tools/passport-photo-resizer',
        destination: '/tools/passport-photo-maker',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/tools/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com https://va.vercel-scripts.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://adservice.google.com;",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com;",
              "font-src 'self' fonts.gstatic.com data:;",
              "img-src 'self' data: blob: https: https://pagead2.googlesyndication.com;",
              "media-src 'self' blob: data: https:;",
              "connect-src 'self' https: http://127.0.0.1:7860 ws: wss: https://pagead2.googlesyndication.com;",
              "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com;",
              "worker-src 'self' blob: https://cdn.jsdelivr.net;",
              "frame-ancestors 'self';",
            ].join(' '),
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        sharp$: false,
        'onnxruntime-node$': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

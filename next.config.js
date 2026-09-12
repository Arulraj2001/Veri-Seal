/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
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
            value: 'camera=(), microphone=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com;",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com;",
              "font-src 'self' fonts.gstatic.com data:;",
              "img-src 'self' data: blob: https:;",
              "connect-src 'self' https: http://127.0.0.1:7860 ws: wss:;",
              "worker-src 'self' blob:;",
              "frame-ancestors 'self';",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

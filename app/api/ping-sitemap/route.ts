import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sitemapUrl = 'https://veriseal.in/sitemap.xml';
  const pingGoogleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const response = await fetch(pingGoogleUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'VeriSeal-SitemapPinger/1.0',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Sitemap pinged successfully to Google Search Console',
      status: response.status,
      sitemap: sitemapUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to ping Google sitemap',
      },
      { status: 500 }
    );
  }
}

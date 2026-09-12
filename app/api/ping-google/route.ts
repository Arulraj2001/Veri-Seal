export async function GET() {
  const sitemapUrl = encodeURIComponent('https://kagazo.in/sitemap.xml');

  await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`),
    fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`),
  ]);

  return Response.json({
    pinged: true,
    timestamp: new Date().toISOString(),
  });
}

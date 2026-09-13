import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetRaw = searchParams.get('url')?.trim();

    if (!targetRaw) {
      return NextResponse.json({ success: false, error: 'URL parameter is required' }, { status: 400 });
    }

    let url = targetRaw;
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid URL format' }, { status: 400 });
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 VeriSeal-MetaInspector/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Target server responded with HTTP status ${response.status} ${response.statusText}`,
      }, { status: 400 });
    }

    const html = await response.text();

    // Helper regex extractors
    const getTagContent = (regex: RegExp) => {
      const match = html.match(regex);
      return match ? match[1].trim() : '';
    };

    // Extract basic tags
    const title = getTagContent(/<title[^>]*>([\s\S]*?)<\/title>/i)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    const getMeta = (attribute: string, val: string) => {
      const regex1 = new RegExp(`<meta[^>]*${attribute}=["']${val}["'][^>]*content=["']([^"']*)["']`, 'i');
      const regex2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attribute}=["']${val}["']`, 'i');
      return (html.match(regex1)?.[1] || html.match(regex2)?.[1] || '').trim();
    };

    const getLink = (relVal: string) => {
      const regex = new RegExp(`<link[^>]*rel=["'][^"']*${relVal}[^"']*["'][^>]*href=["']([^"']*)["']`, 'i');
      return (html.match(regex)?.[1] || '').trim();
    };

    const description = getMeta('name', 'description');
    const keywords = getMeta('name', 'keywords');
    const robots = getMeta('name', 'robots');
    const author = getMeta('name', 'author');
    const viewport = getMeta('name', 'viewport');
    let canonical = getLink('canonical');

    // Resolve relative canonical
    if (canonical && !/^https?:\/\//i.test(canonical)) {
      try {
        canonical = new URL(canonical, url).toString();
      } catch {
        // keep
      }
    }

    // OpenGraph
    const ogTitle = getMeta('property', 'og:title') || title;
    const ogDescription = getMeta('property', 'og:description') || description;
    let ogImage = getMeta('property', 'og:image');
    if (ogImage && !/^https?:\/\//i.test(ogImage)) {
      try {
        ogImage = new URL(ogImage, url).toString();
      } catch {
        // keep
      }
    }
    const ogUrl = getMeta('property', 'og:url') || canonical || url;
    const ogType = getMeta('property', 'og:type') || 'website';
    const ogSiteName = getMeta('property', 'og:site_name');

    // Twitter Card
    const twitterCard = getMeta('name', 'twitter:card') || getMeta('property', 'twitter:card') || 'summary_large_image';
    const twitterTitle = getMeta('name', 'twitter:title') || getMeta('property', 'twitter:title') || ogTitle;
    const twitterDescription = getMeta('name', 'twitter:description') || getMeta('property', 'twitter:description') || ogDescription;
    let twitterImage = getMeta('name', 'twitter:image') || getMeta('property', 'twitter:image') || ogImage;
    if (twitterImage && !/^https?:\/\//i.test(twitterImage)) {
      try {
        twitterImage = new URL(twitterImage, url).toString();
      } catch {
        // keep
      }
    }
    const twitterSite = getMeta('name', 'twitter:site') || getMeta('property', 'twitter:site');

    // Favicon
    let favicon = getLink('icon') || getLink('shortcut icon') || '/favicon.ico';
    if (favicon && !/^https?:\/\//i.test(favicon)) {
      try {
        favicon = new URL(favicon, url).toString();
      } catch {
        // keep
      }
    }

    // Audit checklist
    const audit = [
      {
        criterion: 'Title Tag',
        status: title ? (title.length >= 30 && title.length <= 60 ? 'optimal' : 'warning') : 'error',
        message: title
          ? `Length: ${title.length} characters (Ideal is 50-60 characters)`
          : 'Missing <title> tag. Critical for search engine ranking.',
      },
      {
        criterion: 'Meta Description',
        status: description ? (description.length >= 120 && description.length <= 160 ? 'optimal' : 'warning') : 'error',
        message: description
          ? `Length: ${description.length} characters (Ideal is 120-160 characters)`
          : 'Missing meta description. Search engines will generate snippets automatically.',
      },
      {
        criterion: 'Canonical Link',
        status: canonical ? 'optimal' : 'warning',
        message: canonical ? `Specified: ${canonical}` : 'No canonical link found. Recommended to prevent duplicate content issues.',
      },
      {
        criterion: 'Open Graph (Social Sharing)',
        status: ogTitle && ogImage ? 'optimal' : 'warning',
        message: ogTitle && ogImage ? 'OpenGraph title and preview image are present.' : 'Incomplete Open Graph tags. May show unformatted on Facebook/LinkedIn/Slack.',
      },
      {
        criterion: 'Twitter Card',
        status: twitterCard && twitterTitle ? 'optimal' : 'warning',
        message: twitterCard && twitterTitle ? `Configured as ${twitterCard}` : 'Missing Twitter card metadata.',
      },
      {
        criterion: 'Mobile Viewport',
        status: viewport ? 'optimal' : 'error',
        message: viewport ? `Specified: ${viewport}` : 'Missing mobile viewport tag. Site may not render responsively on mobile devices.',
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        url,
        title,
        description,
        keywords,
        canonical,
        robots,
        author,
        viewport,
        favicon,
        openGraph: {
          title: ogTitle,
          description: ogDescription,
          image: ogImage,
          url: ogUrl,
          type: ogType,
          siteName: ogSiteName,
        },
        twitter: {
          card: twitterCard,
          title: twitterTitle,
          description: twitterDescription,
          image: twitterImage,
          site: twitterSite,
        },
        audit,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to inspect meta tags',
    }, { status: 500 });
  }
}

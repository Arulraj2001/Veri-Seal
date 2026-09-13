import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HopInfo {
  hop: number;
  url: string;
  statusCode: number;
  statusText: string;
  latencyMs: number;
  headers: Record<string, string>;
  redirectUrl?: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetRaw = searchParams.get('url')?.trim();

    if (!targetRaw) {
      return NextResponse.json({ success: false, error: 'URL parameter is required' }, { status: 400 });
    }

    let currentUrl = targetRaw;
    if (!/^https?:\/\//i.test(currentUrl)) {
      currentUrl = 'https://' + currentUrl;
    }

    try {
      new URL(currentUrl);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid URL format' }, { status: 400 });
    }

    const hops: HopInfo[] = [];
    let visitedUrls = new Set<string>();
    const maxHops = 10;
    let hopCount = 0;

    while (hopCount < maxHops) {
      hopCount++;
      if (visitedUrls.has(currentUrl)) {
        // Redirect loop detected
        break;
      }
      visitedUrls.add(currentUrl);

      const startTime = Date.now();
      let response: Response;
      try {
        response = await fetch(currentUrl, {
          method: 'GET',
          redirect: 'manual', // Do not automatically follow, trace step by step
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 VeriSeal-HeaderInspector/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          signal: AbortSignal.timeout(8000),
        });
      } catch (err: any) {
        hops.push({
          hop: hopCount,
          url: currentUrl,
          statusCode: 0,
          statusText: err.name === 'TimeoutError' ? 'Connection Timeout' : (err.message || 'Connection Failed'),
          latencyMs: Date.now() - startTime,
          headers: {},
        });
        break;
      }

      const latencyMs = Date.now() - startTime;
      const headersRecord: Record<string, string> = {};
      response.headers.forEach((val, key) => {
        headersRecord[key.toLowerCase()] = val;
      });

      const isRedirect = [301, 302, 303, 307, 308].includes(response.status);
      let redirectLocation = response.headers.get('location');

      if (redirectLocation) {
        try {
          // Resolve relative redirect URLs against current URL
          redirectLocation = new URL(redirectLocation, currentUrl).toString();
        } catch {
          // keep as is
        }
      }

      hops.push({
        hop: hopCount,
        url: currentUrl,
        statusCode: response.status,
        statusText: response.statusText || `${response.status}`,
        latencyMs,
        headers: headersRecord,
        redirectUrl: redirectLocation || undefined,
      });

      if (isRedirect && redirectLocation) {
        currentUrl = redirectLocation;
      } else {
        // Reached final destination
        break;
      }
    }

    const lastHop = hops[hops.length - 1];
    const finalHeaders = lastHop?.headers || {};

    // Security header audits
    const securityAudit = {
      hsts: {
        header: 'strict-transport-security',
        present: !!finalHeaders['strict-transport-security'],
        value: finalHeaders['strict-transport-security'] || null,
        status: finalHeaders['strict-transport-security'] ? 'pass' : 'fail',
        recommendation: 'Protects against man-in-the-middle attacks by forcing HTTPS.',
      },
      xFrameOptions: {
        header: 'x-frame-options',
        present: !!finalHeaders['x-frame-options'],
        value: finalHeaders['x-frame-options'] || null,
        status: finalHeaders['x-frame-options'] ? 'pass' : 'warning',
        recommendation: 'Prevents clickjacking by controlling if the site can be embedded in iframes.',
      },
      xContentTypeOptions: {
        header: 'x-content-type-options',
        present: finalHeaders['x-content-type-options'] === 'nosniff',
        value: finalHeaders['x-content-type-options'] || null,
        status: finalHeaders['x-content-type-options'] === 'nosniff' ? 'pass' : 'fail',
        recommendation: 'Prevents MIME type sniffing (should be set to nosniff).',
      },
      csp: {
        header: 'content-security-policy',
        present: !!finalHeaders['content-security-policy'],
        value: finalHeaders['content-security-policy'] || null,
        status: finalHeaders['content-security-policy'] ? 'pass' : 'warning',
        recommendation: 'Mitigates Cross-Site Scripting (XSS) and data injection attacks.',
      },
      referrerPolicy: {
        header: 'referrer-policy',
        present: !!finalHeaders['referrer-policy'],
        value: finalHeaders['referrer-policy'] || null,
        status: finalHeaders['referrer-policy'] ? 'pass' : 'info',
        recommendation: 'Controls how much referrer information is sent with requests.',
      },
      permissionsPolicy: {
        header: 'permissions-policy',
        present: !!finalHeaders['permissions-policy'],
        value: finalHeaders['permissions-policy'] || null,
        status: finalHeaders['permissions-policy'] ? 'pass' : 'info',
        recommendation: 'Restricts access to browser features (camera, microphone, geolocation).',
      },
      serverLeakage: {
        header: 'server / x-powered-by',
        detected: finalHeaders['server'] || finalHeaders['x-powered-by'] || null,
        status: (finalHeaders['x-powered-by'] || finalHeaders['server']) ? 'warning' : 'pass',
        recommendation: 'Consider hiding server technology details to minimize reconnaissance.',
      },
    };

    // Calculate score out of 100
    let score = 0;
    if (securityAudit.hsts.present) score += 25;
    if (securityAudit.xContentTypeOptions.present) score += 20;
    if (securityAudit.xFrameOptions.present) score += 20;
    if (securityAudit.csp.present) score += 20;
    if (securityAudit.referrerPolicy.present) score += 10;
    if (!securityAudit.serverLeakage.detected) score += 5;

    return NextResponse.json({
      success: true,
      data: {
        initialUrl: hops[0]?.url || targetRaw,
        finalUrl: lastHop?.url || targetRaw,
        totalHops: hops.length,
        hops,
        securityScore: score,
        securityAudit,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to inspect HTTP headers',
    }, { status: 500 });
  }
}

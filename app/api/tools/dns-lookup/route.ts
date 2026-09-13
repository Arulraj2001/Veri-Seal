import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const RECORD_TYPES: { [key: string]: number } = {
  A: 1,
  NS: 2,
  CNAME: 5,
  SOA: 6,
  PTR: 12,
  MX: 15,
  TXT: 16,
  AAAA: 28,
  CAA: 257,
};

const TYPE_NAMES: { [key: number]: string } = Object.entries(RECORD_TYPES).reduce(
  (acc, [name, id]) => {
    acc[id] = name;
    return acc;
  },
  {} as { [key: number]: string }
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domainRaw = searchParams.get('domain')?.trim().toLowerCase();
    const requestedType = searchParams.get('type')?.trim().toUpperCase() || 'ALL';

    if (!domainRaw) {
      return NextResponse.json({ success: false, error: 'Domain parameter is required' }, { status: 400 });
    }

    // Clean domain: strip https:// or http:// or trailing slashes/paths
    const cleanDomain = domainRaw
      .replace(/^https?:\/\//i, '')
      .split('/')[0]
      .split('?')[0]
      .split(':')[0]
      .trim();

    if (!cleanDomain || !cleanDomain.includes('.')) {
      return NextResponse.json({ success: false, error: 'Please enter a valid domain name (e.g. google.com)' }, { status: 400 });
    }

    const startTime = Date.now();

    // Determine types to query
    const typesToQuery =
      requestedType === 'ALL'
        ? ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA']
        : [requestedType];

    const records: Array<{
      name: string;
      type: string;
      data: string;
      TTL: number;
    }> = [];

    // Query Cloudflare DoH in parallel
    const queryPromises = typesToQuery.map(async (tName) => {
      try {
        const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=${tName}`;
        const res = await fetch(url, {
          headers: { Accept: 'application/dns-json' },
          signal: AbortSignal.timeout(4000),
          next: { revalidate: 60 },
        });

        if (!res.ok) return;
        const json = await res.json();
        if (json.Answer && Array.isArray(json.Answer)) {
          json.Answer.forEach((ans: any) => {
            records.push({
              name: ans.name,
              type: TYPE_NAMES[ans.type] || `${ans.type}`,
              data: ans.data,
              TTL: ans.TTL,
            });
          });
        }
      } catch (err) {
        // Individual record type timeout or error
      }
    });

    await Promise.all(queryPromises);

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      records,
      totalRecords: records.length,
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'DNS lookup failed' },
      { status: 500 }
    );
  }
}

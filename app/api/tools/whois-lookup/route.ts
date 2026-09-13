import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domainRaw = searchParams.get('domain')?.trim().toLowerCase();

    if (!domainRaw) {
      return NextResponse.json({ success: false, error: 'Domain parameter is required' }, { status: 400 });
    }

    const cleanDomain = domainRaw
      .replace(/^https?:\/\//i, '')
      .split('/')[0]
      .split('?')[0]
      .split(':')[0]
      .trim();

    if (!cleanDomain || !cleanDomain.includes('.')) {
      return NextResponse.json({ success: false, error: 'Please enter a valid domain name' }, { status: 400 });
    }

    // Query official RDAP bootstrap aggregator (rdap.org)
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 VeriSeal-RDAPInspector/1.0';

    let res: Response | null = null;
    try {
      res = await fetch(`https://rdap.org/domain/${encodeURIComponent(cleanDomain)}`, {
        headers: {
          'Accept': 'application/rdap+json, application/json',
          'User-Agent': userAgent,
        },
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      res = null;
    }

    // Fallback directly to TLD registry RDAP (e.g. Verisign for .com / .net)
    if (!res || !res.ok) {
      if (cleanDomain.endsWith('.com') || cleanDomain.endsWith('.net')) {
        try {
          res = await fetch(`https://rdap.verisign.com/com/v1/domain/${encodeURIComponent(cleanDomain)}`, {
            headers: {
              'Accept': 'application/rdap+json, application/json',
              'User-Agent': userAgent,
            },
            signal: AbortSignal.timeout(8000),
          });
        } catch {
          // keep
        }
      }
    }

    if (!res || !res.ok) {
      return NextResponse.json(
        { success: false, error: `RDAP registry returned status ${res?.status || '504 Gateway Timeout'}` },
        { status: res?.status === 404 ? 404 : 502 }
      );
    }

    const data = await res.json();

    // Extract dates from RDAP events array
    let registrationDate: string | null = null;
    let expirationDate: string | null = null;
    let lastChangedDate: string | null = null;

    if (data.events && Array.isArray(data.events)) {
      data.events.forEach((ev: any) => {
        if (ev.eventAction === 'registration') registrationDate = ev.eventDate;
        if (ev.eventAction === 'expiration') expirationDate = ev.eventDate;
        if (ev.eventAction === 'last changed' || ev.eventAction === 'last update')
          lastChangedDate = ev.eventDate;
      });
    }

    // Extract Registrar
    let registrarName = 'Unknown';
    let registrarIanaId: string | null = null;
    if (data.entities && Array.isArray(data.entities)) {
      data.entities.forEach((entity: any) => {
        if (entity.roles && entity.roles.includes('registrar')) {
          if (entity.vcardArray && entity.vcardArray[1]) {
            const fnItem = entity.vcardArray[1].find((v: any) => v[0] === 'fn');
            if (fnItem && fnItem[3]) registrarName = fnItem[3];
          }
          if (entity.publicIds && Array.isArray(entity.publicIds)) {
            const idObj = entity.publicIds.find((p: any) => p.type === 'IANA Registrar ID');
            if (idObj) registrarIanaId = idObj.identifier;
          }
        }
      });
    }

    // Extract Nameservers
    const nameservers: string[] = [];
    if (data.nameservers && Array.isArray(data.nameservers)) {
      data.nameservers.forEach((ns: any) => {
        if (ns.ldhName) nameservers.push(ns.ldhName.toLowerCase());
      });
    }

    // Calculate Domain Age
    let domainAgeText: string | null = null;
    if (registrationDate) {
      const reg = new Date(registrationDate);
      const now = new Date();
      const diffMs = now.getTime() - reg.getTime();
      const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
      const remainingDays = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      domainAgeText = `${diffYears} years, ${Math.floor(remainingDays / 30)} months`;
    }

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      handle: data.handle || null,
      registrar: registrarName,
      ianaId: registrarIanaId,
      registeredOn: registrationDate,
      expiresOn: expirationDate,
      updatedOn: lastChangedDate,
      domainAge: domainAgeText,
      status: data.status || [],
      nameservers,
      raw: data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Whois lookup failed' },
      { status: 500 }
    );
  }
}

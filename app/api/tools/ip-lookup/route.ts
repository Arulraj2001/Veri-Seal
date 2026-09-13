import { NextResponse } from 'next/server';
import dns from 'dns/promises';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let target = searchParams.get('ip')?.trim() || searchParams.get('target')?.trim();

    // If no target provided, get caller's IP from headers
    if (!target) {
      const forwarded = req.headers.get('x-forwarded-for');
      const realIp = req.headers.get('x-real-ip');
      target = forwarded ? forwarded.split(',')[0].trim() : realIp || '8.8.8.8';
    }

    // Clean target: remove http:// or https:// or paths
    target = target.replace(/^https?:\/\//i, '').split('/')[0].split(':')[0].trim();

    if (!target) {
      return NextResponse.json({ success: false, error: 'Target IP or hostname is required' }, { status: 400 });
    }

    let ipAddress = target;
    let resolvedHostname = '';

    // If target is a hostname (not pure IPv4 or IPv6), resolve it
    const isIpv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(target);
    const isIpv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(target) || target.includes(':');

    if (!isIpv4 && !isIpv6) {
      try {
        const lookupRes = await dns.lookup(target);
        ipAddress = lookupRes.address;
        resolvedHostname = target;
      } catch (err: any) {
        return NextResponse.json({
          success: false,
          error: `Could not resolve hostname "${target}": ${err.message || 'DNS lookup failed'}`
        }, { status: 400 });
      }
    }

    // Try reverse DNS for the IP address
    let reverseDnsList: string[] = [];
    try {
      reverseDnsList = await dns.reverse(ipAddress);
    } catch {
      // Reverse DNS often fails for dynamic / private IPs, this is normal
      reverseDnsList = [];
    }

    // Query IP geolocation via ip-api.com
    let geoData: any = null;
    try {
      const res = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        geoData = await res.json();
      }
    } catch (e) {
      // fallback
    }

    // Fallback if ip-api.com returned fail or threw
    if (!geoData || geoData.status === 'fail') {
      try {
        const resFallback = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
          signal: AbortSignal.timeout(6000),
          headers: { 'User-Agent': 'VeriSeal-Network-Tool/1.0' }
        });
        if (resFallback.ok) {
          const fb = await resFallback.json();
          geoData = {
            status: 'success',
            country: fb.country_name,
            countryCode: fb.country_code,
            region: fb.region_code,
            regionName: fb.region,
            city: fb.city,
            zip: fb.postal,
            lat: fb.latitude,
            lon: fb.longitude,
            timezone: fb.timezone,
            isp: fb.org,
            org: fb.org,
            as: fb.asn,
            query: ipAddress,
          };
        }
      } catch (e) {
        // Ignored
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ip: ipAddress,
        query: target,
        hostname: resolvedHostname || (reverseDnsList[0] || ipAddress),
        reverseDns: reverseDnsList,
        country: geoData?.country || 'Unknown',
        countryCode: geoData?.countryCode || 'UN',
        region: geoData?.regionName || geoData?.region || 'Unknown',
        city: geoData?.city || 'Unknown',
        postalCode: geoData?.zip || 'Unknown',
        latitude: geoData?.lat || 0,
        longitude: geoData?.lon || 0,
        timezone: geoData?.timezone || 'UTC',
        isp: geoData?.isp || 'Unknown ISP',
        organization: geoData?.org || geoData?.isp || 'Unknown',
        asn: geoData?.as || 'Unknown ASN',
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to lookup IP information'
    }, { status: 500 });
  }
}

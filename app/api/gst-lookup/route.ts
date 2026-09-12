import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gstin = searchParams.get('gstin')?.trim().toUpperCase();

    if (!gstin || gstin.length !== 15) {
      return NextResponse.json(
        { success: false, error: 'Invalid GSTIN length. Exactly 15 characters required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GST_API_KEY;

    if (!apiKey || apiKey === 'your_key' || apiKey === 'your_real_key') {
      // If no API key configured yet, return fallback signal so client displays offline analysis
      return NextResponse.json({
        success: false,
        fallback: true,
        message: 'GST_API_KEY not configured in .env.local. Operating in offline checksum validation mode.',
      });
    }

    // Call sheet.gstincheck.co.in API with 5-second timeout and 1-hour cache revalidation
    const targetUrl = `https://sheet.gstincheck.co.in/check/${encodeURIComponent(apiKey)}/${encodeURIComponent(gstin)}`;

    const res = await fetch(targetUrl, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({
        success: false,
        fallback: true,
        message: `GST API responded with status ${res.status}`,
      });
    }

    const json = await res.json();

    if (json?.flag === false) {
      return NextResponse.json({
        success: false,
        fallback: true,
        message: json.message || 'GSTIN details not found or API key limit reached. Reverted to offline checksum validation.',
      });
    }

    const rawData = json?.data || json;

    // Normalize Principal Place of Business into readable text
    let formattedAddress = '';
    if (typeof rawData?.pradr === 'string') {
      formattedAddress = rawData.pradr;
    } else if (rawData?.pradr?.addr) {
      const a = rawData.pradr.addr;
      formattedAddress = [a.bno, a.bnm, a.st, a.loc, a.dst, a.stcd, a.pncd]
        .filter(Boolean)
        .join(', ');
    } else if (rawData?.pradr) {
      formattedAddress = Object.values(rawData.pradr)
        .filter((v) => typeof v === 'string' && v.trim())
        .join(', ');
    }

    return NextResponse.json({
      success: true,
      data: {
        gstin,
        lgnm: rawData.lgnm || rawData.legal_name || 'N/A',
        tradeNam: rawData.tradeNam || rawData.trade_name || rawData.lgnm || 'N/A',
        sts: rawData.sts || rawData.status || 'Active',
        rgdt: rawData.rgdt || rawData.register_date || 'N/A',
        lstupdt: rawData.lstupdt || rawData.last_updated || 'N/A',
        dty: rawData.dty || rawData.taxpayer_type || 'Regular',
        ctb: rawData.ctb || rawData.business_type || 'N/A',
        pradr: formattedAddress || 'Registered Office on File (GSTN)',
      },
    });
  } catch (err: unknown) {
    console.error('GST lookup proxy error:', err);
    return NextResponse.json({
      success: false,
      fallback: true,
      message: 'Failed to contact GST search network within 5 seconds. Reverted to offline verification.',
    });
  }
}

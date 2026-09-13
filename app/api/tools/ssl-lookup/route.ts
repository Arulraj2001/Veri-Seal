import { NextResponse } from 'next/server';
import tls from 'tls';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domainRaw = searchParams.get('domain')?.trim().toLowerCase();

    if (!domainRaw) {
      return NextResponse.json({ success: false, error: 'Domain parameter is required' }, { status: 400 });
    }

    const cleanHost = domainRaw
      .replace(/^https?:\/\//i, '')
      .split('/')[0]
      .split('?')[0]
      .split(':')[0]
      .trim();

    if (!cleanHost || !cleanHost.includes('.')) {
      return NextResponse.json({ success: false, error: 'Please enter a valid hostname' }, { status: 400 });
    }

    const certData = await new Promise<any>((resolve, reject) => {
      const socket = tls.connect(
        {
          host: cleanHost,
          port: 443,
          servername: cleanHost,
          rejectUnauthorized: false, // Allows inspecting expired or self-signed certs too!
          timeout: 6000,
        },
        () => {
          const cert = socket.getPeerCertificate(true);
          const protocol = socket.getProtocol();
          const cipher = socket.getCipher();
          const authorized = socket.authorized;
          const authError = socket.authorizationError;

          socket.end();

          if (!cert || Object.keys(cert).length === 0) {
            reject(new Error('No SSL certificate returned from server'));
            return;
          }

          resolve({
            cert,
            protocol,
            cipher,
            authorized,
            authError,
          });
        }
      );

      socket.on('error', (err) => {
        socket.destroy();
        reject(err);
      });

      socket.on('timeout', () => {
        socket.destroy();
        reject(new Error('Connection timed out connecting to TLS port 443'));
      });
    });

    const { cert, protocol, cipher, authorized, authError } = certData;

    const validFrom = new Date(cert.valid_from);
    const validTo = new Date(cert.valid_to);
    const now = new Date();

    const daysRemaining = Math.ceil((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isExpired = daysRemaining < 0;

    // Parse Subject Alternative Names (SANs)
    const sanList: string[] = cert.subjectaltname
      ? cert.subjectaltname.split(',').map((s: string) => s.trim().replace(/^DNS:/i, ''))
      : [];

    return NextResponse.json({
      success: true,
      host: cleanHost,
      subject: cert.subject,
      issuer: cert.issuer,
      validFrom: validFrom.toISOString(),
      validTo: validTo.toISOString(),
      daysRemaining,
      isExpired,
      isValid: !isExpired && (authorized || !authError),
      sans: sanList,
      serialNumber: cert.serialNumber,
      fingerprint: cert.fingerprint,
      fingerprint256: cert.fingerprint256,
      protocol,
      cipher,
      bits: cert.bits,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'SSL inspection failed' },
      { status: 500 }
    );
  }
}

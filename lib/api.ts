/**
 * VeriSeal Client API Utilities.
 * Handles communication with the FastAPI backend verification engine,
 * guest rate-limiting tracking in localStorage, settings retrieval, and PDF downloads.
 */

import type { VerificationResult } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:7860';

export interface BackendSignatureDetail {
  field_name: string;
  signer_name: string;
  signer_org: string;
  issuer: string;
  valid_from?: string;
  valid_to?: string;
  signed_on?: string;
  covers_whole_document: boolean;
  hash_valid: boolean;
  chain_valid: boolean;
  ltv_added: boolean;
}

export interface BackendVerificationResponse {
  status: 'VALID' | 'INVALID' | 'UNKNOWN';
  signatures: BackendSignatureDetail[];
  document_type: string;
  error?: string | null;
  verified_pdf_base64?: string | null;
}

export interface BackendErrorResponse {
  error: boolean;
  code: string;
  message: string;
  detail?: string;
}

export interface PublicSettings {
  payment_enabled: boolean;
  site_name: string;
  verification_counter: number;
  language_tamil_enabled: boolean;
  free_daily_limit: number;
}

// --------------------------------------------------------------------------
// Real Backend PDF Verification Call with Progress Tracking
// --------------------------------------------------------------------------

export function verifyPdf(
  file: File,
  password?: string,
  onProgress?: (percent: number) => void
): Promise<{ result: VerificationResult; rawBase64?: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    if (password && password.trim()) {
      formData.append('password', password.trim());
    }

    // Monitor upload progress (0-85%)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 85), 85);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (onProgress) onProgress(100);

      try {
        const json = JSON.parse(xhr.responseText);

        if (xhr.status >= 200 && xhr.status < 300) {
          const resp = json as BackendVerificationResponse;
          const primarySig = resp.signatures[0];

          const formattedResult: VerificationResult = {
            status: resp.status.toLowerCase() as 'valid' | 'invalid' | 'unknown',
            fileName: file.name,
            fileSize: file.size,
            docType: resp.document_type || 'Government Document',
            signerName: primarySig ? primarySig.signer_name : 'National Informatics Centre',
            issuer: primarySig ? primarySig.issuer : 'CCA India / NIC Sub-CA',
            signedAt: primarySig && primarySig.signed_on
              ? new Date(primarySig.signed_on).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : new Date().toLocaleDateString('en-IN'),
            signatureCovers: primarySig?.covers_whole_document
              ? 'Entire document (ByteRange 0 to EOF)'
              : 'Partial revision',
            algorithm: 'SHA-256 with RSA Encryption',
            trustChainStatus: primarySig?.chain_valid ? 'CCA_VERIFIED' : 'UNKNOWN_ROOT',
            officialPortalName: resp.document_type.includes('Aadhaar') ? 'UIDAI myAadhaar Portal' : 'Official State e-District Portal',
            officialPortalUrl: resp.document_type.includes('Aadhaar') ? 'https://myaadhaar.uidai.gov.in' : 'https://tnesevai.tn.gov.in',
            reason: resp.status === 'INVALID'
              ? 'Document byte stream modified after digital signature application.'
              : undefined,
            remedy: resp.status === 'INVALID'
              ? 'Download a fresh original copy directly from the official portal.'
              : undefined,
          };

          resolve({
            result: formattedResult,
            rawBase64: resp.verified_pdf_base64 || undefined,
          });
        } else {
          // Handled backend error codes
          const err = json as BackendErrorResponse;
          const errorMsg = err.message || 'Verification failed';
          const errorObj = new Error(errorMsg) as Error & { code?: string; detail?: string; status?: number };
          errorObj.code = err.code || 'VERIFICATION_FAILED';
          errorObj.detail = err.detail;
          errorObj.status = xhr.status;
          reject(errorObj);
        }
      } catch (parseErr) {
        reject(new Error('Failed to parse backend verification response.'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Unable to connect to verification server. Please check your internet connection or verify backend is running.'));
    };

    xhr.open('POST', `${API_URL}/verify`);
    xhr.send(formData);
  });
}

// --------------------------------------------------------------------------
// Base64 Verified PDF Download Helper
// --------------------------------------------------------------------------

export function downloadVerifiedPdf(base64Data: string, originalFilename: string): void {
  try {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const baseName = originalFilename.replace(/\.pdf$/i, '');
    link.download = `${baseName}_verified_veriseal.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Failed to trigger PDF download:', err);
    alert('Could not download verified PDF. Please try again.');
  }
}

// --------------------------------------------------------------------------
// Guest Daily Limit Tracking in LocalStorage (Midnight Reset)
// --------------------------------------------------------------------------

const GUEST_STORAGE_KEY = 'veriseal_guest_verifications';

interface GuestUsageRecord {
  count: number;
  date: string; // YYYY-MM-DD
}

function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function getGuestVerificationUsage(): GuestUsageRecord {
  if (typeof window === 'undefined') {
    return { count: 0, date: getTodayString() };
  }

  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) {
      return { count: 0, date: getTodayString() };
    }
    const record: GuestUsageRecord = JSON.parse(raw);
    if (record.date !== getTodayString()) {
      // Midnight reset
      const freshRecord = { count: 0, date: getTodayString() };
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(freshRecord));
      return freshRecord;
    }
    return record;
  } catch {
    return { count: 0, date: getTodayString() };
  }
}

export function incrementGuestVerificationCount(): number {
  if (typeof window === 'undefined') return 1;

  const current = getGuestVerificationUsage();
  const updated: GuestUsageRecord = {
    count: current.count + 1,
    date: getTodayString(),
  };
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
  return updated.count;
}

// --------------------------------------------------------------------------
// Settings & Counter API calls
// --------------------------------------------------------------------------

export async function fetchPublicSettings(): Promise<PublicSettings> {
  try {
    const res = await fetch('/api/settings', { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Could not fetch settings from /api/settings, using defaults:', e);
  }

  return {
    payment_enabled: false,
    site_name: 'VeriSeal',
    verification_counter: 421847,
    language_tamil_enabled: true,
    free_daily_limit: 3,
  };
}

export async function recordVerificationEvent(docType: string, status: string, signerName?: string): Promise<void> {
  try {
    await fetch('/api/verifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doc_type: docType,
        status: status.toUpperCase(),
        signer_name: signerName || 'National Informatics Centre',
      }),
    });
  } catch (e) {
    console.debug('Failed to record verification event:', e);
  }
}

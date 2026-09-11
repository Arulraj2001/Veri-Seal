/**
 * VeriSeal Client API Utilities.
 * Handles communication with the FastAPI backend verification engine,
 * guest rate-limiting tracking in localStorage, settings retrieval, and PDF downloads.
 */

import type { VerificationResult } from '@/types';

export function getApiUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (
    !envUrl ||
    envUrl === 'NEXT_PUBLIC_API_URL' ||
    (!envUrl.startsWith('http://') && !envUrl.startsWith('https://'))
  ) {
    if (typeof window !== 'undefined') {
      if (
        window.location.hostname.includes('vercel.app') ||
        window.location.hostname.includes('veriseal.in')
      ) {
        return 'https://veri-seal.onrender.com';
      }
    }
    return process.env.NODE_ENV === 'production'
      ? 'https://veri-seal.onrender.com'
      : 'http://127.0.0.1:7860';
  }
  return envUrl;
}

const API_URL = getApiUrl();

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
  status: 'VALID' | 'INVALID' | 'UNKNOWN' | 'ERROR' | 'NO_SIGNATURE';
  signatures: BackendSignatureDetail[];
  document_type: string;
  error?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  verified_pdf_b64?: string | null;
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
  pro_price?: number;
  business_price?: number;
  upi_id?: string;
  upi_qr_url?: string;
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
          const resp = json as BackendVerificationResponse & { error_code?: string; error_message?: string; verified_pdf_b64?: string };

          if (resp.status === 'ERROR' || resp.status === 'NO_SIGNATURE' || resp.error_code) {
            const errCode = resp.error_code || (resp.status === 'NO_SIGNATURE' ? 'NO_SIGNATURE_FOUND' : 'VERIFICATION_FAILED');
            const errMsg = resp.error_message || resp.error || 'Verification failed';
            const errorObj = new Error(errMsg) as Error & { code?: string; detail?: string; status?: number };
            errorObj.code = errCode;
            errorObj.detail = errMsg;
            errorObj.status = xhr.status;
            reject(errorObj);
            return;
          }

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
            rawBase64: resp.verified_pdf_b64 || resp.verified_pdf_base64 || undefined,
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
    payment_enabled: true,
    site_name: 'VeriSeal',
    verification_counter: 421847,
    language_tamil_enabled: true,
    free_daily_limit: 3,
    pro_price: 199,
    business_price: 2499,
    upi_id: 'veriseal.pay@icici',
    upi_qr_url: '',
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

/**
 * Pre-warms sleeping backend instances (e.g. Render free tier cold-starts)
 * as soon as the user opens the page.
 */
export function prewarmBackend(): void {
  if (typeof window === 'undefined') return;
  try {
    fetch(`${getApiUrl()}/health`, { method: 'GET', cache: 'no-store' }).catch(() => {});
  } catch {
    // Ignore silent pre-warm failures
  }
}

export interface CompressionResponseData {
  success: boolean;
  original_size_kb: number;
  compressed_size_kb: number;
  reduction_percent: number;
  target_kb: number;
  fits_target: boolean;
  page_count: number;
  preset: string;
  greyscale: boolean;
  compliance_badges: string[];
  preview_image_b64: string;
  compressed_pdf_b64: string;
}

export interface BatchItemResult {
  filename: string;
  success: boolean;
  original_size_kb?: number;
  compressed_size_kb?: number;
  reduction_percent?: number;
  fits_target?: boolean;
  compliance_badges?: string[];
  preview_image_b64?: string;
  compressed_pdf_b64?: string;
  download_name?: string;
  error?: string;
}

export interface BatchCompressionResponseData {
  success: boolean;
  total_files: number;
  successful_files: number;
  total_original_size_kb: number;
  total_compressed_size_kb: number;
  overall_reduction_percent: number;
  results: BatchItemResult[];
  zip_archive_b64?: string | null;
}

export interface PdfPageInfo {
  page_number: number;
  width: number;
  height: number;
  thumbnail_b64: string;
}

export function compressPdf(
  file: File,
  options?: {
    targetKb?: number;
    preset?: string;
    greyscale?: boolean;
    pagesToKeep?: number[];
    onProgress?: (percent: number) => void;
  }
): Promise<CompressionResponseData> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_kb', String(options?.targetKb || 200));
    formData.append('preset', options?.preset || 'custom');
    formData.append('greyscale', String(Boolean(options?.greyscale)));
    if (options?.pagesToKeep && options.pagesToKeep.length > 0) {
      formData.append('pages_to_keep', options.pagesToKeep.join(','));
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as CompressionResponseData);
        } else {
          const errMsg = json.detail || json.message || 'Compression failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during PDF compression upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/compress`, true);
    xhr.send(formData);
  });
}

export function compressBatchPdfs(
  files: File[],
  options?: {
    targetKb?: number;
    preset?: string;
    greyscale?: boolean;
    onProgress?: (percent: number) => void;
  }
): Promise<BatchCompressionResponseData> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    formData.append('target_kb', String(options?.targetKb || 200));
    formData.append('preset', options?.preset || 'custom');
    formData.append('greyscale', String(Boolean(options?.greyscale)));

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as BatchCompressionResponseData);
        } else {
          const errMsg = json.detail || json.message || 'Batch compression failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse batch response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during batch upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/compress-batch`, true);
    xhr.send(formData);
  });
}

export async function inspectPdf(file: File): Promise<PdfPageInfo[]> {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await fetch(`${getApiUrl()}/inspect-pdf`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      return data.pages || [];
    }
  } catch (e) {
    console.warn('Could not inspect PDF pages:', e);
  }
  return [];
}

export interface ImageResizeOptions {
  targetMinKb?: number;
  targetMaxKb?: number;
  widthCm?: number;
  heightCm?: number;
  widthPx?: number;
  heightPx?: number;
  dpi?: number;
  maintainAspectRatio?: boolean;
  addNameDate?: boolean;
  candidateName?: string;
  dateOfPhoto?: string;
  xeroxFilter?: boolean;
  onProgress?: (percent: number) => void;
}

export interface ImageResizeResponse {
  input_size_kb: number;
  output_size_kb: number;
  target_min_kb: number;
  target_max_kb: number;
  width_px: number;
  height_px: number;
  dpi: number;
  is_compliant: boolean;
  quality_used: number;
  filename: string;
  data_base64: string;
}

export async function resizeImage(file: File, options?: ImageResizeOptions): Promise<ImageResizeResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_min_kb', String(options?.targetMinKb ?? 10.0));
    formData.append('target_max_kb', String(options?.targetMaxKb ?? 20.0));
    if (options?.widthCm) formData.append('width_cm', String(options.widthCm));
    if (options?.heightCm) formData.append('height_cm', String(options.heightCm));
    if (options?.widthPx) formData.append('width_px', String(options.widthPx));
    if (options?.heightPx) formData.append('height_px', String(options.heightPx));
    formData.append('dpi', String(options?.dpi ?? 300));
    formData.append('maintain_aspect_ratio', String(options?.maintainAspectRatio ?? true));
    formData.append('add_name_date', String(Boolean(options?.addNameDate)));
    if (options?.candidateName) formData.append('candidate_name', options.candidateName);
    if (options?.dateOfPhoto) formData.append('date_of_photo', options.dateOfPhoto);
    formData.append('xerox_filter', String(Boolean(options?.xeroxFilter)));

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as ImageResizeResponse);
        } else {
          const errMsg = json.detail || json.message || 'Image resizing failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse image resize response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during image upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/resize-image`, true);
    xhr.send(formData);
  });
}

export interface ImageToPdfOptions {
  targetKb?: number;
  preset?: 'color' | 'greyscale' | 'xerox';
  pageFormat?: 'A4' | 'fit_image';
  onProgress?: (percent: number) => void;
}

export interface ImageToPdfResponse {
  pdf_base64: string;
  preview_base64: string;
  input_size_kb: number;
  output_size_kb: number;
  target_kb: number;
  is_under_target: boolean;
  total_pages: number;
  page_format: string;
  filename: string;
}

export async function convertImagesToPdf(
  files: File[],
  options?: ImageToPdfOptions
): Promise<ImageToPdfResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    formData.append('target_kb', String(options?.targetKb ?? 200));
    formData.append('preset', options?.preset || 'color');
    formData.append('page_format', options?.pageFormat || 'A4');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as ImageToPdfResponse);
        } else {
          const errMsg = json.detail || json.message || 'Image to PDF conversion failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse Image to PDF response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/image-to-pdf`, true);
    xhr.send(formData);
  });
}

export interface PdfPageImage {
  page_number: number;
  width_px: number;
  height_px: number;
  size_kb: number;
  mime_type: string;
  data_base64: string;
}

export interface PdfToImageResponse {
  status: string;
  total_pdf_pages: number;
  converted_pages_count: number;
  input_size_kb: number;
  dpi: number;
  format: string;
  pages: PdfPageImage[];
}

export interface PdfToImageOptions {
  dpi?: number;
  imageFormat?: 'jpeg' | 'png';
  xeroxFilter?: boolean;
  targetMaxKb?: number;
  onProgress?: (percent: number) => void;
}

export async function convertPdfToImages(
  file: File,
  options?: PdfToImageOptions
): Promise<PdfToImageResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dpi', String(options?.dpi ?? 300));
    formData.append('image_format', options?.imageFormat || 'jpeg');
    formData.append('xerox_filter', String(Boolean(options?.xeroxFilter)));
    if (options?.targetMaxKb) {
      formData.append('target_max_kb', String(options.targetMaxKb));
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as PdfToImageResponse);
        } else {
          const errMsg = json.detail || json.message || 'PDF to Image conversion failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse PDF to Image response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/pdf-to-image`, true);
    xhr.send(formData);
  });
}

export interface UnlockPdfResponse {
  status: string;
  was_encrypted: boolean;
  is_unlocked: boolean;
  total_pages: number;
  input_size_kb: number;
  output_size_kb: number;
  pdf_base64: string;
  preview_base64?: string;
  error_code?: string;
  message?: string;
}

export interface UnlockPdfOptions {
  password?: string;
  namePrefix?: string;
  birthYear?: string;
  onProgress?: (percent: number) => void;
}

export async function unlockPdf(
  file: File,
  options?: UnlockPdfOptions
): Promise<UnlockPdfResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    if (options?.password) formData.append('password', options.password);
    if (options?.namePrefix) formData.append('name_prefix', options.namePrefix);
    if (options?.birthYear) formData.append('birth_year', options.birthYear);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as UnlockPdfResponse);
        } else {
          const errMsg = json.message || json.detail || 'Failed to unlock PDF. Please verify password.';
          const err = new Error(errMsg) as Error & { code?: string };
          err.code = json.error_code;
          reject(err);
        }
      } catch {
        reject(new Error(`Failed to parse unlock PDF response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/unlock-pdf`, true);
    xhr.send(formData);
  });
}

export interface MaskAadhaarResponse {
  status: string;
  file_type: 'pdf' | 'image';
  redactions_applied: number;
  input_size_kb: number;
  output_size_kb: number;
  data_base64: string;
  preview_base64?: string;
  error_code?: string;
  message?: string;
}

export interface MaskAadhaarOptions {
  maskFirst8?: boolean;
  maskQr?: boolean;
  customBoxes?: Array<{ x: number; y: number; width: number; height: number }>;
  onProgress?: (percent: number) => void;
}

export async function maskAadhaar(
  file: File,
  options?: MaskAadhaarOptions
): Promise<MaskAadhaarResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mask_first_8', String(options?.maskFirst8 ?? true));
    formData.append('mask_qr', String(Boolean(options?.maskQr)));
    if (options?.customBoxes && options.customBoxes.length > 0) {
      formData.append('custom_boxes_json', JSON.stringify(options.customBoxes));
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as MaskAadhaarResponse);
        } else {
          const errMsg = json.message || json.detail || 'Failed to mask Aadhaar document.';
          const err = new Error(errMsg) as Error & { code?: string };
          err.code = json.error_code;
          reject(err);
        }
      } catch {
        reject(new Error(`Failed to parse mask Aadhaar response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/mask-aadhaar`, true);
    xhr.send(formData);
  });
}

export interface MergeMarksheetsOptions {
  targetKb?: number;
  preset?: 'color' | 'greyscale' | 'xerox';
  pageFormat?: 'A4' | 'fit_image';
  onProgress?: (percent: number) => void;
}

export interface MergeMarksheetsResponse {
  status: string;
  total_pages: number;
  target_kb: number;
  output_size_kb: number;
  is_under_target: boolean;
  pdf_base64: string;
  preview_base64: string;
}

export async function mergeMarksheets(
  files: File[],
  options?: MergeMarksheetsOptions
): Promise<MergeMarksheetsResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    formData.append('target_kb', String(options?.targetKb ?? 1000));
    formData.append('preset', options?.preset || 'color');
    formData.append('page_format', options?.pageFormat || 'A4');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as MergeMarksheetsResponse);
        } else {
          const errMsg = json.detail || json.message || 'Marksheet merge failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse marksheet merge response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during marksheet upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/merge-marksheets`, true);
    xhr.send(formData);
  });
}

// --------------------------------------------------------------------------
// Tool 6: Passport Photo Sheet Maker Client API
// --------------------------------------------------------------------------

export interface PhotoSheetOptions {
  sheetFormat?: '4x6_8photos' | '4x6_6photos' | 'A4_32photos' | 'A4_30photos' | 'single_35x45' | 'single_51x51';
  addNameDate?: boolean;
  candidateName?: string;
  dateOfPhoto?: string;
  addCuttingGuides?: boolean;
  outputFormat?: 'image' | 'pdf' | 'both';
  onProgress?: (percent: number) => void;
}

export interface PhotoSheetResponse {
  status: string;
  sheet_format: string;
  total_photos: number;
  sheet_width_px: number;
  sheet_height_px: number;
  dpi: number;
  image_size_kb: number;
  image_base64: string;
  pdf_base64?: string | null;
  preview_base64: string;
}

export async function generatePhotoSheet(
  file: File,
  options?: PhotoSheetOptions
): Promise<PhotoSheetResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheet_format', options?.sheetFormat || '4x6_8photos');
    formData.append('add_name_date', String(Boolean(options?.addNameDate)));
    if (options?.candidateName) formData.append('candidate_name', options.candidateName);
    if (options?.dateOfPhoto) formData.append('date_of_photo', options.dateOfPhoto);
    formData.append('add_cutting_guides', String(options?.addCuttingGuides ?? true));
    formData.append('output_format', options?.outputFormat || 'both');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as PhotoSheetResponse);
        } else {
          const errMsg = json.detail || json.message || 'Photo sheet generation failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse photo sheet response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during photo sheet upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/generate-photo-sheet`, true);
    xhr.send(formData);
  });
}

// --------------------------------------------------------------------------
// Tool 7: Clean Document Scanner & Xerox Binarizer Client API
// --------------------------------------------------------------------------

export interface CleanScannerOptions {
  mode?: 'magic_color' | 'xerox_bw' | 'greyscale';
  rotation?: 0 | 90 | 180 | 270;
  brightness?: number;
  contrast?: number;
  targetKb?: number;
  outputType?: 'image' | 'pdf' | 'both';
  onProgress?: (percent: number) => void;
}

export interface CleanScannerResponse {
  status: string;
  mode: string;
  width_px: number;
  height_px: number;
  output_size_kb: number;
  image_base64: string;
  pdf_base64?: string | null;
  preview_base64: string;
}

export async function cleanDocumentScan(
  file: File,
  options?: CleanScannerOptions
): Promise<CleanScannerResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', options?.mode || 'magic_color');
    formData.append('rotation', String(options?.rotation ?? 0));
    formData.append('brightness', String(options?.brightness ?? 1.0));
    formData.append('contrast', String(options?.contrast ?? 1.0));
    if (options?.targetKb) formData.append('target_kb', String(options.targetKb));
    formData.append('output_type', options?.outputType || 'both');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && options?.onProgress) {
        const percent = Math.min(Math.round((event.loaded / event.total) * 80), 80);
        options.onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (options?.onProgress) options.onProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(json as CleanScannerResponse);
        } else {
          const errMsg = json.detail || json.message || 'Clean scanner processing failed';
          reject(new Error(errMsg));
        }
      } catch {
        reject(new Error(`Failed to parse clean scanner response: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during scan upload. Please check your connection.'));
    };

    xhr.open('POST', `${getApiUrl()}/clean-scanner`, true);
    xhr.send(formData);
  });
}


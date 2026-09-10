export type SupportedLanguage = 'en' | 'ta';

export type VerificationState =
  | 'idle'
  | 'drag-over'
  | 'file-selected'
  | 'processing'
  | 'result-valid'
  | 'result-invalid'
  | 'result-unknown'
  | 'error';

export interface SupportedDocItem {
  id: string;
  name: string;
  state: string;
  category: 'all-india' | 'tamil-nadu' | 'ap-telangana' | 'karnataka' | 'kerala' | 'more-states';
  portal: string;
  portalUrl?: string;
  description: string;
  isPasswordProtectedSupported?: boolean;
  code?: string;
}

export interface VerificationResult {
  status: 'valid' | 'invalid' | 'unknown' | 'error';
  fileName: string;
  fileSize: number;
  docType: string;
  signerName: string;
  issuer: string;
  signedAt: string;
  location?: string;
  signatureCovers: string;
  reason?: string;
  remedy?: string;
  officialPortalUrl?: string;
  officialPortalName?: string;
  algorithm?: string;
  certificateExpiry?: string;
  trustChainStatus?: 'CCA_VERIFIED' | 'SELF_SIGNED' | 'UNKNOWN_ROOT' | 'INVALID_SIGNATURE';
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  badge: string;
}

export interface TrustBadgeItem {
  icon: string;
  title: string;
  description: string;
}

export type DocumentCategory = 'all' | 'aadhaar' | 'tn_esevai' | 'tax_form16' | 'pan' | 'digilocker';

export interface DocumentCategoryConfig {
  id: DocumentCategory;
  label: string;
  shortLabel: string;
  badge: string;
  hint: string;
  subtext: string;
  passwordHint: string;
  passwordPlaceholder: string;
  sampleAuthority: string;
}

export const DOCUMENT_CATEGORIES: DocumentCategoryConfig[] = [
  {
    id: 'all',
    label: 'All Signed PDFs (Universal)',
    shortLabel: 'All Signed PDFs',
    badge: 'Universal Engine',
    hint: 'Verifies RSA & ECDSA digital signatures on any official Indian sovereign, state portal, court, or exam authority PDF.',
    subtext: 'Auto-detects CA trust hierarchy against official CCA India / RCAI root store.',
    passwordHint: 'If password-protected, use the issuer-specified format (e.g., DOB, PAN, or Name).',
    passwordPlaceholder: 'Enter PDF password if encrypted',
    sampleAuthority: 'Any CCA India Recognized CA (NIC, eMudhra, Capricorn, etc.)',
  },
  {
    id: 'aadhaar',
    label: 'e-Aadhaar PDF',
    shortLabel: 'e-Aadhaar',
    badge: 'UIDAI Sovereign',
    hint: 'UIDAI e-Aadhaar password-protected PDFs. Audits DS Unique Identification Authority of India digital signature.',
    subtext: 'Converts unverified yellow question mark to CCA India validated green checkmark.',
    passwordHint: 'First 4 letters of your Name in CAPITAL letters + 4-digit Year of Birth (e.g. RAMA1995).',
    passwordPlaceholder: 'e.g. RAMA1995',
    sampleAuthority: 'UIDAI / CCA eSign CA',
  },
  {
    id: 'tn_esevai',
    label: 'TN e-Sevai / Revenue',
    shortLabel: 'TN e-Sevai / Revenue',
    badge: 'TNeGA & Revenue',
    hint: 'Tamil Nadu Revenue Dept: Community, Nativity, Income, First Graduate, OBC, Patta / Chitta & Encumbrance.',
    subtext: 'Verifies Sub-Collector / Tahsildar DSC signature chain in isolated RAM.',
    passwordHint: 'Tamil Nadu Revenue PDFs are usually unencrypted; if protected, use DOB (DDMMYYYY).',
    passwordPlaceholder: 'Usually not required',
    sampleAuthority: 'National Informatics Centre (NIC) Sub-CA / TNeGA',
  },
  {
    id: 'tax_form16',
    label: 'Form 16 & Tax ITR',
    shortLabel: 'Form 16 / Tax',
    badge: 'Income Tax & TRACES',
    hint: 'Form 16 Part A/B, Form 16A, TRACES TDS Certificates, and ITR-V Acknowledgement PDFs.',
    subtext: 'Audits corporate employer / IT Dept authorized signatory certificate chain.',
    passwordHint: 'Your 10-character PAN in CAPITAL letters (e.g. ABCDE1234F) or PAN + Date of Birth.',
    passwordPlaceholder: 'e.g. ABCDE1234F',
    sampleAuthority: 'eMudhra / Protean / NSDL Sub-CA',
  },
  {
    id: 'pan',
    label: 'e-PAN Card',
    shortLabel: 'e-PAN',
    badge: 'NSDL & UTIITSL',
    hint: 'Instant e-PAN PDFs issued by Protean (NSDL) or UTI Infrastructure Technology Services (UTIITSL).',
    subtext: 'Validates ITD signature and ensures LTV DSS records are embedded.',
    passwordHint: 'Your Date of Birth in DDMMYYYY format without slashes or spaces (e.g. 25081995).',
    passwordPlaceholder: 'e.g. 25081995',
    sampleAuthority: 'UTIITSL / Protean Sub-CA',
  },
  {
    id: 'digilocker',
    label: 'DigiLocker & Education',
    shortLabel: 'DigiLocker',
    badge: 'DigiLocker / CBSE',
    hint: 'DigiLocker issued certificates, CBSE Class 10/12 Marksheets, University Degrees, and Skill Certificates.',
    subtext: 'Confirms cryptographic seal of Ministry of Electronics & IT (MeitY) and Board examiners.',
    passwordHint: 'Usually unencrypted. If requested, use DigiLocker 6-digit security PIN or DOB.',
    passwordPlaceholder: 'Usually not required',
    sampleAuthority: 'DigiLocker Sub-CA / NIC CA',
  },
];

export function mapSlugToCategory(slug?: string, docType?: string): DocumentCategory {
  if (!slug && !docType) return 'all';
  const s = (slug || '').toLowerCase();
  const d = (docType || '').toLowerCase();
  if (s.includes('aadhaar') || d.includes('aadhaar')) return 'aadhaar';
  if (
    s.includes('community') ||
    s.includes('nativity') ||
    s.includes('income') ||
    s.includes('first-graduate') ||
    s.includes('legal-heir') ||
    s.includes('tamil-nadu') ||
    d.includes('esevai') ||
    d.includes('tnega') ||
    d.includes('patta') ||
    d.includes('caste') ||
    d.includes('community') ||
    d.includes('nativity') ||
    d.includes('income')
  ) {
    return 'tn_esevai';
  }
  if (
    s.includes('form-16') ||
    s.includes('itr') ||
    s.includes('tax') ||
    d.includes('form 16') ||
    d.includes('itr') ||
    d.includes('tax')
  ) {
    return 'tax_form16';
  }
  if (s.includes('pan') || d.includes('pan')) return 'pan';
  if (
    s.includes('digilocker') ||
    s.includes('cbse') ||
    s.includes('marksheet') ||
    d.includes('digilocker') ||
    d.includes('marksheet')
  ) {
    return 'digilocker';
  }
  return 'all';
}


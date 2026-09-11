/**
 * VeriSeal Master Tools Catalog & Registry.
 * Single source of truth for all public utilities, exam resizers, and document tools.
 * Powers the /tools directory, search index, Navbar mega-menu, and Sitemap.
 */

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category:
    | 'pdf_compressor'
    | 'photo_signature'
    | 'marksheet_scanner'
    | 'security_privacy'
    | 'cyber_cafe'
    | 'verification';
  categoryLabel: string;
  shortDesc: string;
  badge?: string;
  examTags: string[];
  featuredInNav?: boolean;
  priorityOrder: number;
}

export interface ToolCategory {
  id: ToolItem['category'];
  label: string;
  description: string;
  iconName: string;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'pdf_compressor',
    label: 'PDF Compressors',
    description: 'Compress certificates and documents to exact portal file limits with zero quality loss.',
    iconName: 'FileText',
  },
  {
    id: 'photo_signature',
    label: 'Exam Photo & Signature',
    description: 'Auto-pad undersized scans and cap oversized images to exact pixel and KB rules.',
    iconName: 'Camera',
  },
  {
    id: 'marksheet_scanner',
    label: 'Marksheet & Scanners',
    description: 'Merge multi-semester marksheets, purge phone shadows, and convert to compliant PDFs.',
    iconName: 'Layers',
  },
  {
    id: 'security_privacy',
    label: 'Security & Privacy',
    description: 'Remove passwords from e-Aadhaar and permanently redact the first 8 digits for RBI compliance.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'cyber_cafe',
    label: 'Cyber Cafe & Studio',
    description: 'Print-ready tools for DTP operators, cyber cafes, and high-volume student applicants.',
    iconName: 'Printer',
  },
  {
    id: 'verification',
    label: 'Digital Verification',
    description: 'Cryptographically verify DSC digital signatures on Indian government certificates.',
    iconName: 'CheckCircle2',
  },
];

export const TOOLS_CATALOG: ToolItem[] = [
  // -------------------------------------------------------------
  // Category 1: PDF Compressors
  // -------------------------------------------------------------
  {
    id: 'pdf-compressor-master',
    slug: '/tools/pdf-compressor',
    name: 'Master PDF Compressor',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Compress any PDF to exact custom KB targets with batch processing and in-memory privacy.',
    badge: '100% FREE',
    examTags: ['All India', 'UPSC', 'SSC', 'TNPSC', 'State PSC'],
    featuredInNav: true,
    priorityOrder: 1,
  },
  {
    id: 'compress-pdf-200kb',
    slug: '/tools/compress-pdf-to-200kb',
    name: 'Compress PDF to 200KB',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Strictly compress certificates under 200KB for TNPSC OTR, UPSC, and SSC recruitment portals.',
    badge: 'MOST POPULAR',
    examTags: ['TNPSC', 'UPSC', 'SSC', 'Police', 'High Court'],
    featuredInNav: true,
    priorityOrder: 2,
  },
  {
    id: 'compress-pdf-100kb',
    slug: '/tools/compress-pdf-to-100kb',
    name: 'Compress PDF to 100KB',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Ultra-efficient compression to squeeze multi-page documents strictly below 100KB.',
    badge: 'STRICT LIMIT',
    examTags: ['Scholarships', 'State PSC', 'Universities', 'BPSC'],
    featuredInNav: true,
    priorityOrder: 3,
  },
  {
    id: 'compress-pdf-300kb',
    slug: '/tools/compress-pdf-to-300kb',
    name: 'Compress PDF to 300KB',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Standard compression for UPSC Civil Services ORA portal educational qualification proof.',
    badge: 'UPSC PRESET',
    examTags: ['UPSC', 'IAS/IPS', 'Judiciary', 'High Court'],
    featuredInNav: true,
    priorityOrder: 4,
  },
  {
    id: 'compress-pdf-500kb',
    slug: '/tools/compress-pdf-to-500kb',
    name: 'Compress PDF to 500KB',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Ideal for multi-page degree certificates and consolidated semester marksheets.',
    badge: 'MULTI-PAGE',
    examTags: ['Banking', 'IBPS', 'SBI', 'Staff Selection'],
    featuredInNav: true,
    priorityOrder: 5,
  },
  {
    id: 'govt-exam-compressor',
    slug: '/tools/government-exam-pdf-compressor',
    name: 'Govt Exam PDF Compressor Hub',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: '1-click exam presets with automatic DPI, color normalization, and compliance badges.',
    badge: 'ALL EXAMS',
    examTags: ['UPSC', 'SSC', 'TNPSC', 'NEET', 'Railway RRB'],
    featuredInNav: true,
    priorityOrder: 6,
  },
  {
    id: 'tnpsc-pdf-compressor',
    slug: '/tools/tnpsc-pdf-compressor',
    name: 'TNPSC PDF Compressor (200KB)',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Tailored for Tamil Nadu PSC Group 1, 2, 4 and VAO One Time Registration certificate uploads.',
    badge: 'TNPSC OTR',
    examTags: ['TNPSC', 'Group 4', 'Group 2', 'VAO'],
    featuredInNav: false,
    priorityOrder: 7,
  },
  {
    id: 'upsc-pdf-compressor',
    slug: '/tools/upsc-pdf-compressor',
    name: 'UPSC PDF Compressor (300KB)',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Complies with UPSC Online Recruitment Application (ORA) 300KB single PDF limits.',
    badge: 'UPSC ORA',
    examTags: ['UPSC', 'NDA', 'CDS', 'Civil Services'],
    featuredInNav: false,
    priorityOrder: 8,
  },
  {
    id: 'ssc-pdf-compressor',
    slug: '/tools/ssc-pdf-compressor',
    name: 'SSC PDF Compressor',
    category: 'pdf_compressor',
    categoryLabel: 'PDF Compressors',
    shortDesc: 'Optimized for SSC CGL, CHSL, MTS, and CPO certificate verification uploads.',
    badge: 'SSC CGL/CHSL',
    examTags: ['SSC', 'CGL', 'CHSL', 'MTS', 'GD Constable'],
    featuredInNav: false,
    priorityOrder: 9,
  },

  // -------------------------------------------------------------
  // Category 2: Exam Photo & Signature Resizers
  // -------------------------------------------------------------
  {
    id: 'ssc-photo-resizer',
    slug: '/tools/ssc-photo-signature-resizer',
    name: 'SSC Photo & Signature Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Photo (20-50KB, 3.5×4.5cm) and Signature (10-20KB, 4.0×2.0cm) with bi-directional padding.',
    badge: 'POPULAR',
    examTags: ['SSC CGL', 'CHSL', 'MTS', 'GD', 'Delhi Police'],
    featuredInNav: true,
    priorityOrder: 10,
  },
  {
    id: 'upsc-photo-resizer',
    slug: '/tools/upsc-photo-signature-resizer',
    name: 'UPSC Photo & Signature Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Exact 350×350 to 1000×1000 px sizing with candidate Name & 10-day Date of Photo banner.',
    badge: 'DOP BANNER',
    examTags: ['UPSC CSE', 'NDA', 'CDS', 'IES', 'EPFO'],
    featuredInNav: true,
    priorityOrder: 11,
  },
  {
    id: 'rrb-photo-resizer',
    slug: '/tools/rrb-photo-signature-resizer',
    name: 'Railway RRB Photo & Signature Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Official Railway Recruitment Board rules: 320×240 px photo (20-50KB) & 160×80 px signature (10-40KB).',
    badge: 'RAILWAY PRESET',
    examTags: ['RRB NTPC', 'Group D', 'ALP', 'Technician', 'JE'],
    featuredInNav: true,
    priorityOrder: 12,
  },
  {
    id: 'gate-photo-resizer',
    slug: '/tools/gate-photo-signature-resizer',
    name: 'GATE & JAM IIT GOAPS Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Mathematical 3.15:1 to 3.95:1 aspect ratio lock to prevent automatic GOAPS portal rejection.',
    badge: 'GOAPS RATIO LOCK',
    examTags: ['GATE', 'IIT JAM', 'IIT GOAPS', 'M.Tech'],
    featuredInNav: true,
    priorityOrder: 13,
  },
  {
    id: 'neet-photo-resizer',
    slug: '/tools/neet-photo-signature-resizer',
    name: 'NEET Postcard (4"×6") & Photo Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Postcard size (4×6 inch, 50-300KB), passport photo, and left thumb impression for NTA NEET UG.',
    badge: 'NTA NEET',
    examTags: ['NEET UG', 'NTA', 'Medical', 'AIIMS', 'JIPMER'],
    featuredInNav: true,
    priorityOrder: 14,
  },
  {
    id: 'ibps-photo-resizer',
    slug: '/tools/ibps-photo-signature-resizer',
    name: 'IBPS & Bank Exam Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'All 4 mandatory banking uploads: Passport Photo, Signature, Left Thumb Impression & Handwritten Declaration.',
    badge: 'BANKING SUITE',
    examTags: ['IBPS PO', 'Clerk', 'SBI PO', 'RBI', 'NABARD'],
    featuredInNav: true,
    priorityOrder: 15,
  },
  {
    id: 'tnpsc-photo-resizer',
    slug: '/tools/tnpsc-photo-signature-resizer',
    name: 'TNPSC Photo & Signature Resizer',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Generates compliant 20-50KB photo with candidate name & date strip + 10-20KB signature.',
    badge: 'TNPSC OTR',
    examTags: ['TNPSC', 'Group 1', 'Group 4', 'VAO'],
    featuredInNav: true,
    priorityOrder: 16,
  },
  {
    id: 'compress-image-20kb',
    slug: '/tools/compress-image-to-20kb',
    name: 'Compress Image to 20KB (Signature)',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Strict signature compressor for exams mandating files strictly between 10KB and 20KB.',
    badge: 'SIGNATURE 20KB',
    examTags: ['UPSC', 'SSC', 'State PSC', 'Judiciary'],
    featuredInNav: false,
    priorityOrder: 17,
  },
  {
    id: 'compress-image-50kb',
    slug: '/tools/compress-image-to-50kb',
    name: 'Compress Image to 50KB (Photo)',
    category: 'photo_signature',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Reduces high-resolution smartphone selfies to exact 20-50KB government portal passport limits.',
    badge: 'PHOTO 50KB',
    examTags: ['All Portals', 'SSC', 'RRB', 'Police'],
    featuredInNav: false,
    priorityOrder: 18,
  },

  // -------------------------------------------------------------
  // Category 3: Degree, Marksheet & Scanner Tools
  // -------------------------------------------------------------
  {
    id: 'merge-marksheets-pdf',
    slug: '/tools/merge-marksheets-pdf',
    name: 'Multi-Marksheet to Single PDF (<1MB)',
    category: 'marksheet_scanner',
    categoryLabel: 'Marksheet & Scanners',
    shortDesc: 'Merges 1 to 12 semester marksheets into ONE continuous PDF strictly under <500KB or <1MB.',
    badge: 'NEW & EXCLUSIVE',
    examTags: ['UPSC', 'SSC', 'TNPSC', 'Banking', 'Universities'],
    featuredInNav: true,
    priorityOrder: 19,
  },
  {
    id: 'clean-document-scanner',
    slug: '/tools/clean-document-scanner',
    name: 'Clean Document Scanner & Xerox Binarizer',
    category: 'marksheet_scanner',
    categoryLabel: 'Marksheet & Scanners',
    shortDesc: 'Purges mobile camera shadows, corrects yellow bulb tints, and creates crisp flatbed scans.',
    badge: 'SHADOW REMOVER',
    examTags: ['All Marksheets', 'Certificates', 'ID Cards'],
    featuredInNav: true,
    priorityOrder: 20,
  },
  {
    id: 'image-to-pdf-200kb',
    slug: '/tools/image-to-pdf-200kb',
    name: 'Marksheet Image to PDF (<200KB)',
    category: 'marksheet_scanner',
    categoryLabel: 'Marksheet & Scanners',
    shortDesc: '1-click convert marksheet photos directly into a compliant standard A4 PDF under 200KB.',
    badge: 'A4 FORMAT',
    examTags: ['TNPSC', 'Community Cert', 'Income Cert'],
    featuredInNav: true,
    priorityOrder: 21,
  },
  {
    id: 'image-to-pdf-300kb',
    slug: '/tools/image-to-pdf-300kb',
    name: 'Image to PDF (<300KB)',
    category: 'marksheet_scanner',
    categoryLabel: 'Marksheet & Scanners',
    shortDesc: 'Converts marksheet photos to PDF capped at 300KB for UPSC, State PSCs, and High Courts.',
    badge: 'UPSC 300KB',
    examTags: ['UPSC', 'State PSC', 'Court Filings'],
    featuredInNav: false,
    priorityOrder: 22,
  },
  {
    id: 'pdf-to-image-300dpi',
    slug: '/tools/pdf-to-image',
    name: 'PDF to High-Res 300 DPI Images',
    category: 'marksheet_scanner',
    categoryLabel: 'Marksheet & Scanners',
    shortDesc: 'Extracts e-Aadhaar, admit cards, and marksheets into crystal clear 300 DPI JPEG or PNG images.',
    badge: '300 DPI',
    examTags: ['e-Aadhaar', 'Admit Cards', 'Hall Tickets'],
    featuredInNav: true,
    priorityOrder: 23,
  },

  // -------------------------------------------------------------
  // Category 4: Security & Privacy Tools
  // -------------------------------------------------------------
  {
    id: 'unlock-pdf-tool',
    slug: '/tools/unlock-pdf',
    name: 'Unlock e-Aadhaar & Encrypted PDF',
    category: 'security_privacy',
    categoryLabel: 'Security & Privacy',
    shortDesc: 'Permanently remove password encryption from e-Aadhaar and Form 16 in volatile RAM memory.',
    badge: 'RAM PRIVACY',
    examTags: ['e-Aadhaar', 'Form 16', 'Bank Statement'],
    featuredInNav: true,
    priorityOrder: 24,
  },
  {
    id: 'mask-aadhaar-tool',
    slug: '/tools/mask-aadhaar',
    name: 'Official Masked Aadhaar Redactor',
    category: 'security_privacy',
    categoryLabel: 'Security & Privacy',
    shortDesc: 'Physically redacts first 8 digits (XXXX-XXXX-1234) and censors QR codes for RBI/UIDAI compliance.',
    badge: 'RBI COMPLIANT',
    examTags: ['UIDAI', 'Bank KYC', 'Exam ID Proof', 'Sim KYC'],
    featuredInNav: true,
    priorityOrder: 25,
  },

  // -------------------------------------------------------------
  // Category 5: Cyber Cafe & Studio Tools
  // -------------------------------------------------------------
  {
    id: 'passport-photo-sheet-maker',
    slug: '/tools/passport-photo-sheet-maker',
    name: 'Cyber Cafe Passport Photo Sheet Maker',
    category: 'cyber_cafe',
    categoryLabel: 'Cyber Cafe & Studio',
    shortDesc: 'Tiles 1 photo into printable 4"×6" (8 photos) or A4 (32 photos) sheets at 300 DPI with cutting lines.',
    badge: 'SAVE ₹100',
    examTags: ['Cyber Cafe', 'Studio', 'Print 4x6', 'Admit Cards'],
    featuredInNav: true,
    priorityOrder: 26,
  },

  // -------------------------------------------------------------
  // Category 6: Digital Verification Tools
  // -------------------------------------------------------------
  {
    id: 'digital-signature-verifier',
    slug: '/#upload-zone',
    name: 'Official DSC Signature Verifier',
    category: 'verification',
    categoryLabel: 'Digital Verification',
    shortDesc: 'Validate cryptographic PKI digital signatures on government certificates against Controller of Certifying Authorities (CCA).',
    badge: 'CCA TRUST STORE',
    examTags: ['e-Aadhaar', 'Community', 'Nativity', 'PAN', 'DigiLocker'],
    featuredInNav: true,
    priorityOrder: 27,
  },
  {
    id: 'verify-aadhaar-pdf',
    slug: '/verify-aadhaar-pdf',
    name: 'Verify e-Aadhaar Digital Signature',
    category: 'verification',
    categoryLabel: 'Digital Verification',
    shortDesc: 'Fix the yellow question mark on e-Aadhaar PDFs and convert to green checkmark.',
    badge: 'UIDAI CA',
    examTags: ['UIDAI', 'myAadhaar', 'e-KYC'],
    featuredInNav: false,
    priorityOrder: 28,
  },
];

/** Helper to get all categories */
export function getAllCategories(): ToolCategory[] {
  return TOOL_CATEGORIES;
}

/** Helper to filter tools by category */
export function getToolsByCategory(category: ToolItem['category']): ToolItem[] {
  return TOOLS_CATALOG.filter((t) => t.category === category).sort(
    (a, b) => a.priorityOrder - b.priorityOrder
  );
}

/** Helper to search tools */
export function searchTools(query: string, activeCategory?: string): ToolItem[] {
  const cleanQ = query.trim().toLowerCase();
  return TOOLS_CATALOG.filter((t) => {
    const matchesCategory =
      !activeCategory || activeCategory === 'all' || t.category === activeCategory;
    if (!matchesCategory) return false;
    if (!cleanQ) return true;

    const inName = t.name.toLowerCase().includes(cleanQ);
    const inDesc = t.shortDesc.toLowerCase().includes(cleanQ);
    const inCategory = t.categoryLabel.toLowerCase().includes(cleanQ);
    const inTags = t.examTags.some((tag) => tag.toLowerCase().includes(cleanQ));
    const inBadge = t.badge?.toLowerCase().includes(cleanQ);

    return inName || inDesc || inCategory || inTags || inBadge;
  }).sort((a, b) => a.priorityOrder - b.priorityOrder);
}

/** Helper to get featured tools for the navbar */
export function getFeaturedNavTools(): ToolItem[] {
  return TOOLS_CATALOG.filter((t) => t.featuredInNav).sort(
    (a, b) => a.priorityOrder - b.priorityOrder
  );
}

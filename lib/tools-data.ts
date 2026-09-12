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
    | 'verify'
    | 'photo_image'
    | 'pdf_tools'
    | 'kyc_documents'
    | 'calculators'
    | 'print_share';
  categoryLabel: string;
  shortDesc: string;
  badge?: string;
  examTags: string[];
  featuredInNav?: boolean;
  priorityOrder: number;
  authorityLogo?: string;
  authorityName?: string;
}

export interface ToolCategory {
  id: ToolItem['category'];
  label: string;
  description: string;
  iconName: string;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'verify',
    label: 'Digital Verification & Lookups',
    description: 'Cryptographically verify DSC signatures, validate GST numbers, and find bank IFSC codes.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'kyc_documents',
    label: 'KYC & Legal Templates',
    description: 'Aadhaar + PAN single PDF, bilingual affidavit generator, salary slips, and masked Aadhaar.',
    iconName: 'CreditCard',
  },
  {
    id: 'photo_image',
    label: 'Exam Photo & Signature',
    description: 'Auto-pad undersized scans, cap oversized images, and format declarations to exact portal rules.',
    iconName: 'Camera',
  },
  {
    id: 'pdf_tools',
    label: 'PDF & Document Tools',
    description: 'Compress certificates to 200KB/100KB, merge marksheets, and optimize PDFs for WhatsApp.',
    iconName: 'FileText',
  },
  {
    id: 'calculators',
    label: 'Tax & Cost Calculators',
    description: 'Calculate income tax for FY 2025-26 (New vs Old Regime) and household energy intelligence.',
    iconName: 'Calculator',
  },
  {
    id: 'print_share',
    label: 'Print & Cyber Cafe Lab',
    description: '5-in-1 A4 gang sheets, Epson L805 PVC card trays, 4×6 passport sheets, and fast WhatsApp docs.',
    iconName: 'Printer',
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
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Compress any PDF to exact custom KB targets with batch processing and in-memory privacy.',
    badge: '100% FREE',
    examTags: ['All India', 'UPSC', 'SSC', 'TNPSC', 'State PSC'],
    featuredInNav: true,
    priorityOrder: 1,
    authorityLogo: '/logos/education.svg',
    authorityName: 'All India & Boards',
  },
  {
    id: 'compress-pdf-200kb',
    slug: '/tools/compress-pdf-to-200kb',
    name: 'Compress PDF to 200KB',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Strictly compress certificates under 200KB for TNPSC OTR, UPSC, and SSC recruitment portals.',
    badge: 'MOST POPULAR',
    examTags: ['TNPSC', 'UPSC', 'SSC', 'Police', 'High Court'],
    featuredInNav: true,
    priorityOrder: 2,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'TNPSC & State PSC',
  },
  {
    id: 'compress-pdf-100kb',
    slug: '/tools/compress-pdf-to-100kb',
    name: 'Compress PDF to 100KB',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Ultra-efficient compression to squeeze multi-page documents strictly below 100KB.',
    badge: 'STRICT LIMIT',
    examTags: ['Scholarships', 'State PSC', 'Universities', 'BPSC'],
    featuredInNav: true,
    priorityOrder: 3,
    authorityLogo: '/logos/education.svg',
    authorityName: 'Scholarships & Univ',
  },
  {
    id: 'compress-pdf-300kb',
    slug: '/tools/compress-pdf-to-300kb',
    name: 'Compress PDF to 300KB',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Standard compression for UPSC Civil Services ORA portal educational qualification proof.',
    badge: 'UPSC PRESET',
    examTags: ['UPSC', 'IAS/IPS', 'Judiciary', 'High Court'],
    featuredInNav: true,
    priorityOrder: 4,
    authorityLogo: '/logos/upsc.png',
    authorityName: 'UPSC Civil Services',
  },
  {
    id: 'compress-pdf-500kb',
    slug: '/tools/compress-pdf-to-500kb',
    name: 'Compress PDF to 500KB',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Ideal for multi-page degree certificates and consolidated semester marksheets.',
    badge: 'MULTI-PAGE',
    examTags: ['Banking', 'IBPS', 'SBI', 'Staff Selection'],
    featuredInNav: true,
    priorityOrder: 5,
    authorityLogo: '/logos/ibps.svg',
    authorityName: 'IBPS & Banking',
  },
  {
    id: 'govt-exam-compressor',
    slug: '/tools/government-exam-pdf-compressor',
    name: 'Govt Exam PDF Compressor Hub',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: '1-click exam presets with automatic DPI, color normalization, and compliance badges.',
    badge: 'ALL EXAMS',
    examTags: ['UPSC', 'SSC', 'TNPSC', 'NEET', 'Railway RRB'],
    featuredInNav: true,
    priorityOrder: 6,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'UPSC • SSC • RRB',
  },
  {
    id: 'tnpsc-pdf-compressor',
    slug: '/tools/tnpsc-pdf-compressor',
    name: 'TNPSC PDF Compressor (200KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Tailored for Tamil Nadu PSC Group 1, 2, 4 and VAO One Time Registration certificate uploads.',
    badge: 'TNPSC OTR',
    examTags: ['TNPSC', 'Group 4', 'Group 2', 'VAO'],
    featuredInNav: false,
    priorityOrder: 7,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'TNPSC Tamil Nadu',
  },
  {
    id: 'upsc-pdf-compressor',
    slug: '/tools/upsc-pdf-compressor',
    name: 'UPSC PDF Compressor (300KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Complies with UPSC Online Recruitment Application (ORA) 300KB single PDF limits.',
    badge: 'UPSC ORA',
    examTags: ['UPSC', 'NDA', 'CDS', 'Civil Services'],
    featuredInNav: false,
    priorityOrder: 8,
    authorityLogo: '/logos/upsc.png',
    authorityName: 'UPSC ORA Portal',
  },
  {
    id: 'ssc-pdf-compressor',
    slug: '/tools/ssc-pdf-compressor',
    name: 'SSC PDF Compressor',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Optimized for SSC CGL, CHSL, MTS, and CPO certificate verification uploads.',
    badge: 'SSC CGL/CHSL',
    examTags: ['SSC', 'CGL', 'CHSL', 'MTS', 'GD Constable'],
    featuredInNav: false,
    priorityOrder: 9,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'Staff Selection Commission',
  },

  // -------------------------------------------------------------
  // Category 2: Exam Photo & Signature Resizers
  // -------------------------------------------------------------
  {
    id: 'ssc-photo-resizer',
    slug: '/tools/ssc-photo-signature-resizer',
    name: 'SSC Photo & Signature Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Photo (20-50KB, 3.5×4.5cm) and Signature (10-20KB, 4.0×2.0cm) with bi-directional padding.',
    badge: 'POPULAR',
    examTags: ['SSC CGL', 'CHSL', 'MTS', 'GD', 'Delhi Police'],
    featuredInNav: true,
    priorityOrder: 10,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'Staff Selection Commission',
  },
  {
    id: 'upsc-photo-resizer',
    slug: '/tools/upsc-photo-signature-resizer',
    name: 'UPSC Photo & Signature Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Exact 350×350 to 1000×1000 px sizing with candidate Name & 10-day Date of Photo banner.',
    badge: 'DOP BANNER',
    examTags: ['UPSC CSE', 'NDA', 'CDS', 'IES', 'EPFO'],
    featuredInNav: true,
    priorityOrder: 11,
    authorityLogo: '/logos/upsc.png',
    authorityName: 'UPSC Civil Services',
  },
  {
    id: 'rrb-photo-resizer',
    slug: '/tools/rrb-photo-signature-resizer',
    name: 'Railway RRB Photo & Signature Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Official Railway Recruitment Board rules: 320×240 px photo (20-50KB) & 160×80 px signature (10-40KB).',
    badge: 'RAILWAY PRESET',
    examTags: ['RRB NTPC', 'Group D', 'ALP', 'Technician', 'JE'],
    featuredInNav: true,
    priorityOrder: 12,
    authorityLogo: '/logos/rrb.svg',
    authorityName: 'Railway Recruitment Board',
  },
  {
    id: 'gate-photo-resizer',
    slug: '/tools/gate-photo-signature-resizer',
    name: 'GATE & JAM IIT GOAPS Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Mathematical 3.15:1 to 3.95:1 aspect ratio lock to prevent automatic GOAPS portal rejection.',
    badge: 'GOAPS RATIO LOCK',
    examTags: ['GATE', 'IIT JAM', 'IIT GOAPS', 'M.Tech'],
    featuredInNav: true,
    priorityOrder: 13,
    authorityLogo: '/logos/education.svg',
    authorityName: 'IIT GOAPS & GATE',
  },
  {
    id: 'neet-photo-resizer',
    slug: '/tools/neet-photo-signature-resizer',
    name: 'NEET Postcard (4"×6") & Photo Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Postcard size (4×6 inch, 50-300KB), passport photo, and left thumb impression for NTA NEET UG.',
    badge: 'NTA NEET',
    examTags: ['NEET UG', 'NTA', 'Medical', 'AIIMS', 'JIPMER'],
    featuredInNav: true,
    priorityOrder: 14,
    authorityLogo: '/logos/nta.svg',
    authorityName: 'NTA NEET India',
  },
  {
    id: 'ibps-photo-resizer',
    slug: '/tools/ibps-photo-signature-resizer',
    name: 'IBPS & Bank Exam Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'All 4 mandatory banking uploads: Passport Photo, Signature, Left Thumb Impression & Handwritten Declaration.',
    badge: 'BANKING SUITE',
    examTags: ['IBPS PO', 'Clerk', 'SBI PO', 'RBI', 'NABARD'],
    featuredInNav: true,
    priorityOrder: 15,
    authorityLogo: '/logos/ibps.svg',
    authorityName: 'IBPS Banking Selection',
  },
  {
    id: 'tnpsc-photo-resizer',
    slug: '/tools/tnpsc-photo-signature-resizer',
    name: 'TNPSC Photo & Signature Resizer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Generates compliant 20-50KB photo with candidate name & date strip + 10-20KB signature.',
    badge: 'TNPSC OTR',
    examTags: ['TNPSC', 'Group 1', 'Group 4', 'VAO'],
    featuredInNav: true,
    priorityOrder: 16,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'TNPSC Tamil Nadu',
  },
  {
    id: 'compress-image-20kb',
    slug: '/tools/compress-image-to-20kb',
    name: 'Compress Image to 20KB (Signature)',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Strict signature compressor for exams mandating files strictly between 10KB and 20KB.',
    badge: 'SIGNATURE 20KB',
    examTags: ['UPSC', 'SSC', 'State PSC', 'Judiciary'],
    featuredInNav: false,
    priorityOrder: 17,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'Govt Signature Standard',
  },
  {
    id: 'compress-image-50kb',
    slug: '/tools/compress-image-to-50kb',
    name: 'Compress Image to 50KB (Photo)',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc: 'Reduces high-resolution smartphone selfies to exact 20-50KB government portal passport limits.',
    badge: 'PHOTO 50KB',
    examTags: ['All Portals', 'SSC', 'RRB', 'Police'],
    featuredInNav: false,
    priorityOrder: 18,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'Govt Passport Standard',
  },

  // -------------------------------------------------------------
  // Category 3: Degree, Marksheet & Scanner Tools
  // -------------------------------------------------------------
  {
    id: 'merge-marksheets-pdf',
    slug: '/tools/merge-marksheets-pdf',
    name: 'Multi-Marksheet to Single PDF (<1MB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Merges 1 to 12 semester marksheets into ONE continuous PDF strictly under <500KB or <1MB.',
    badge: 'NEW & EXCLUSIVE',
    examTags: ['UPSC', 'SSC', 'TNPSC', 'Banking', 'Universities'],
    featuredInNav: true,
    priorityOrder: 19,
    authorityLogo: '/logos/education.svg',
    authorityName: 'Board of Education',
  },
  {
    id: 'clean-document-scanner',
    slug: '/tools/clean-document-scanner',
    name: 'Clean Document Scanner & Xerox Binarizer',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Purges mobile camera shadows, corrects yellow bulb tints, and creates crisp flatbed scans.',
    badge: 'SHADOW REMOVER',
    examTags: ['All Marksheets', 'Certificates', 'ID Cards'],
    featuredInNav: true,
    priorityOrder: 20,
    authorityLogo: '/logos/incometax.png',
    authorityName: 'Govt Document Verification',
  },
  {
    id: 'image-to-pdf-200kb',
    slug: '/tools/image-to-pdf-200kb',
    name: 'Marksheet Image to PDF (<200KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: '1-click convert marksheet photos directly into a compliant standard A4 PDF under 200KB.',
    badge: 'A4 FORMAT',
    examTags: ['TNPSC', 'Community Cert', 'Income Cert'],
    featuredInNav: true,
    priorityOrder: 21,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'TNPSC & e-District',
  },
  {
    id: 'image-to-pdf-300kb',
    slug: '/tools/image-to-pdf-300kb',
    name: 'Image to PDF (<300KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Converts marksheet photos to PDF capped at 300KB for UPSC, State PSCs, and High Courts.',
    badge: 'UPSC 300KB',
    examTags: ['UPSC', 'State PSC', 'Court Filings'],
    featuredInNav: false,
    priorityOrder: 22,
    authorityLogo: '/logos/upsc.png',
    authorityName: 'UPSC & High Courts',
  },
  {
    id: 'pdf-to-image-300dpi',
    slug: '/tools/pdf-to-image',
    name: 'PDF to High-Res 300 DPI Images',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc: 'Extracts e-Aadhaar, admit cards, and marksheets into crystal clear 300 DPI JPEG or PNG images.',
    badge: '300 DPI',
    examTags: ['e-Aadhaar', 'Admit Cards', 'Hall Tickets'],
    featuredInNav: true,
    priorityOrder: 23,
    authorityLogo: '/logos/uidai.svg',
    authorityName: 'UIDAI & Govt Portals',
  },

  // -------------------------------------------------------------
  // Category 4: Security & Privacy Tools
  // -------------------------------------------------------------
  {
    id: 'unlock-pdf-tool',
    slug: '/tools/unlock-pdf',
    name: 'Unlock e-Aadhaar & Encrypted PDF',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc: 'Permanently remove password encryption from e-Aadhaar and Form 16 in volatile RAM memory.',
    badge: 'RAM PRIVACY',
    examTags: ['e-Aadhaar', 'Form 16', 'Bank Statement'],
    featuredInNav: true,
    priorityOrder: 24,
    authorityLogo: '/logos/uidai.svg',
    authorityName: 'UIDAI e-Aadhaar & Form 16',
  },
  {
    id: 'mask-aadhaar-tool',
    slug: '/tools/mask-aadhaar',
    name: 'Official Masked Aadhaar Redactor',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc: 'Physically redacts first 8 digits (XXXX-XXXX-1234) and censors QR codes for RBI/UIDAI compliance.',
    badge: 'RBI COMPLIANT',
    examTags: ['UIDAI', 'Bank KYC', 'Exam ID Proof', 'Sim KYC'],
    featuredInNav: true,
    priorityOrder: 25,
    authorityLogo: '/logos/uidai.svg',
    authorityName: 'UIDAI & RBI Compliance',
  },

  // -------------------------------------------------------------
  // Category 5: Cyber Cafe & Studio Tools
  // -------------------------------------------------------------
  {
    id: 'passport-photo-sheet-maker',
    slug: '/tools/passport-photo-sheet-maker',
    name: 'Cyber Cafe Passport Photo Sheet Maker',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc: 'Tiles 1 photo into printable 4"×6" (8 photos), 5"×7", or A4 (32 photos) sheets at 300/600 DPI with cutting lines & direct print.',
    badge: 'SAVE ₹100 • 300 DPI',
    examTags: ['Cyber Cafe', 'Studio', 'Print 4x6', 'Admit Cards', 'Epson Print'],
    featuredInNav: true,
    priorityOrder: 26,
    authorityLogo: '/logos/passport.svg',
    authorityName: 'Passport Seva & MEA',
  },
  {
    id: 'formal-attire-changer',
    slug: '/tools/formal-attire-changer',
    name: 'Instant Formal Attire & Suit Changer',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc: 'Add formal dark blazers, neckties, and professional collared shirts onto casual selfies with 1-click drag & scale snapping.',
    badge: 'STUDIO PRO • NO PHOTOSHOP',
    examTags: ['Passport Suit', 'Blazer Overlay', 'SSC Photo', 'UPSC Attire', 'Studio Formal', 'Job CV'],
    featuredInNav: true,
    priorityOrder: 27,
    authorityLogo: '/logos/passport.svg',
    authorityName: 'ICAO Biometric Studio',
  },
  {
    id: 'photo-date-name-stamper',
    slug: '/tools/photo-date-name-stamper',
    name: 'Exam Photo Name & Date (DOP) Stamper',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc: 'Add candidate name and official Date of Photograph (DOP) bottom banner with SSC/UPSC 90-day validity verification.',
    badge: 'SSC & UPSC COMPLIANT',
    examTags: ['SSC CGL', 'UPSC CSE', 'DOP Strip', 'Name On Photo', 'White Banner', 'IBPS'],
    featuredInNav: true,
    priorityOrder: 28,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'SSC & UPSC DOP Rules',
  },
  {
    id: 'biometric-face-aligner',
    slug: '/tools/biometric-face-aligner',
    name: 'ICAO Biometric Passport Face & Head Aligner',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc: 'Align crown to chin strictly within 70%–80% biometric frame with eye level guidelines to prevent visa/exam rejections.',
    badge: 'ICAO 9303 • 70-80% FACE',
    examTags: ['Indian Passport', 'US Visa 2x2', 'Schengen', '70-80% Head', 'Biometric Frame'],
    featuredInNav: true,
    priorityOrder: 29,
    authorityLogo: '/logos/passport.svg',
    authorityName: 'ICAO Biometric Standard',
  },
  {
    id: 'stamp-size-photo-maker',
    slug: '/tools/stamp-size-photo-maker',
    name: 'Stamp Size & NEET Postcard Photo Studio',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc: 'Tile 16 stamp-size photos (20×25mm) on 4x6" card for railway/college passes or format 4x6" NTA NEET UG admit card postcards.',
    badge: '16 STAMPS FOR ₹5 • NEET',
    examTags: ['Stamp Size', '20x25mm', 'NEET Postcard', 'Railway MST Pass', 'Student ID', '4x6 Card'],
    featuredInNav: true,
    priorityOrder: 30,
    authorityLogo: '/logos/nta.svg',
    authorityName: 'NTA & Railway Passes',
  },

  // -------------------------------------------------------------
  // Category 6: Digital Verification Tools
  // -------------------------------------------------------------
  {
    id: 'digital-signature-verifier',
    slug: '/#upload-zone',
    name: 'Official DSC Signature Verifier',
    category: 'verify',
    categoryLabel: 'Digital Verification & Lookups',
    shortDesc: 'Validate cryptographic PKI digital signatures on government certificates against Controller of Certifying Authorities (CCA).',
    badge: 'CCA TRUST STORE',
    examTags: ['e-Aadhaar', 'Community', 'Nativity', 'PAN', 'DigiLocker'],
    featuredInNav: true,
    priorityOrder: 27,
    authorityLogo: '/logos/rbi.svg',
    authorityName: 'CCA India & DigiLocker',
  },
  {
    id: 'verify-aadhaar-pdf',
    slug: '/verify-aadhaar-pdf',
    name: 'Verify e-Aadhaar Digital Signature',
    category: 'verify',
    categoryLabel: 'Digital Verification & Lookups',
    shortDesc: 'Fix the yellow question mark on e-Aadhaar PDFs and convert to green checkmark.',
    badge: 'UIDAI CA',
    examTags: ['UIDAI', 'myAadhaar', 'e-KYC'],
    featuredInNav: false,
    priorityOrder: 28,
    authorityLogo: '/logos/uidai.svg',
    authorityName: 'UIDAI Certifying Authority',
  },
  {
    id: 'signature-cleaner-extractor',
    slug: '/tools/signature-cleaner-extractor',
    name: 'Black Ink Signature Extractor & Enhancer',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc:
      'Remove ruled notebook lines, eliminate background shadows, and convert blue ballpoint ink to dense official India Black.',
    badge: 'NEW • NO RULED LINES',
    examTags: ['SSC CGL', 'UPSC CSE', 'IBPS PO', 'TNPSC', 'Black Ink', '140x60'],
    featuredInNav: true,
    priorityOrder: 29,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'SSC & IBPS Official Ink',
  },
  {
    id: 'thumb-impression-resizer',
    slug: '/tools/thumb-impression-resizer',
    name: 'Left Thumb Impression (LTI) Resizer & Sharpener',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc:
      'Sharpen friction ridges, eliminate ink smudges, and format strictly to 240×240 px (20KB–50KB) for bank & railway recruitment.',
    badge: 'NEW • BIOMETRIC RIDGE',
    examTags: ['IBPS Clerk', 'SBI PO', 'Railway RRB', 'SSC LTI', '240x240'],
    featuredInNav: true,
    priorityOrder: 30,
    authorityLogo: '/logos/ibps.svg',
    authorityName: 'IBPS & RRB Biometric',
  },
  {
    id: 'driving-license-card-merger',
    slug: '/tools/driving-license-card-merger',
    name: 'Driving License Front & Back Merger (<200KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc:
      'Combine Front and Back sides of smart card DL or Vehicle RC onto single-page A4 PDF strictly under 200KB for Parivahan Sarathi.',
    badge: 'NEW • SARATHI RTO',
    examTags: ['Parivahan', 'Sarathi', 'Smart Card', 'RC', 'FASTag', '200KB'],
    featuredInNav: true,
    priorityOrder: 31,
    authorityLogo: '/logos/parivahan.svg',
    authorityName: 'Parivahan Sarathi MoRTH',
  },
  {
    id: 'photo-signature-joiner',
    slug: '/tools/photo-signature-joiner',
    name: 'Combined Photo & Signature Slip Maker',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc:
      'Join passport photo, signature, and handwritten declaration into single template slip for MP Vyapam, UPSSSC, and Kerala PSC.',
    badge: 'NEW • VYAPAM / UPSSSC',
    examTags: ['MP PEB', 'UPSSSC', 'Rajasthan RSMSSB', 'Kerala PSC', 'DOP'],
    featuredInNav: true,
    priorityOrder: 32,
    authorityLogo: '/logos/education.svg',
    authorityName: 'PEB & State PSC Slips',
  },
  {
    id: 'batch-photo-resizer',
    slug: '/tools/batch-photo-resizer',
    name: 'Bulk Batch Photo Resizer & ZIP Downloader',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc:
      'Resize, crop, and compress up to 50 applicant photos & signatures in 1 click with instant structured ZIP download. Perfect for cyber cafes and CSC centres.',
    badge: 'NEW • BATCH 50 FILES',
    examTags: ['Cyber Cafe', 'CSC Centre', 'SSC Batch', 'UPSC', 'IBPS', 'ZIP Stream'],
    featuredInNav: true,
    priorityOrder: 33,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'CSC & Cyber Cafe Suite',
  },
  {
    id: 'pvc-id-card-maker',
    slug: '/tools/pvc-id-card-maker',
    name: 'PVC Smart ID Card Tray Print Studio',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc:
      'Extract Front & Back Aadhaar, PAN, Voter, and College ID cards into exact CR-80 plastic card dimensions (85.6mm × 53.98mm) at 300 DPI for Epson L805 trays.',
    badge: 'NEW • CR-80 EPSON L805',
    examTags: ['Epson L805', 'PVC Card', 'Aadhaar Smart Card', 'PAN Card', '300 DPI', 'A4 Lamination'],
    featuredInNav: true,
    priorityOrder: 34,
    authorityLogo: '/logos/pvc.svg',
    authorityName: 'CR-80 Smart ID Standard',
  },
  {
    id: 'self-attest-pdf',
    slug: '/tools/self-attest-pdf',
    name: 'Digital Self-Attestation & Date Stamper',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc:
      'Overlay official handwritten signature, candidate name, and attestation date directly onto certificate & marksheet PDFs without flattening vector text.',
    badge: 'NEW • VECTOR PRESERVE',
    examTags: ['Marksheet', 'Caste Certificate', 'UPSC OTR', 'SSC DV', 'Self Attested', '<200KB'],
    featuredInNav: true,
    priorityOrder: 35,
    authorityLogo: '/logos/upsc.png',
    authorityName: 'UPSC & High Court OTR',
  },
  {
    id: 'exam-specifications-radar',
    slug: '/tools/specifications',
    name: 'Exam Photo & Signature Specifications Radar',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc:
      'Interactive radar with official dimensions, file size budgets (KB), background color requirements, and signature rules across 40+ Indian recruitment exams.',
    badge: '2026 OFFICIAL RULES',
    examTags: ['UPSC', 'SSC', 'IBPS', 'NEET', 'JEE', 'RRB', 'TNPSC', 'State PSC', 'Guidelines'],
    featuredInNav: true,
    priorityOrder: 36,
    authorityLogo: '/logos/ssc.png',
    authorityName: 'National Exam Standards',
  },
  {
    id: 'a4-multi-card-sheet',
    slug: '/tools/a4-multi-card-sheet',
    name: 'Multi-Card A4 Gang Sheet Studio (5-in-1 ID Print)',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc:
      'Tile 1 to 5 Front & Back ID cards (Aadhaar, PAN, Voter, DL) onto a single A4 glossy sheet at 300 DPI with cutting marks & lamination gutters.',
    badge: 'HOT • 5-IN-1 CYBER CAFE',
    examTags: ['Aadhaar Print', 'PAN Card', 'Voter ID', 'A4 Gang Sheet', '300 DPI', 'CSC VLE', 'Cyber Cafe'],
    featuredInNav: true,
    priorityOrder: 37,
    authorityLogo: '/logos/pvc.svg',
    authorityName: 'CR-80 Smart ID & CSC',
  },
  {
    id: 'handwritten-declaration-scanner',
    slug: '/tools/handwritten-declaration-scanner',
    name: 'IBPS & SBI Handwritten Declaration Scanner (50KB–100KB)',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc:
      'Purge ruled notebook lines, whiten camera shadows, and strictly lock declaration file size between 50KB and 100KB for IBPS, SBI, and Railway RRB 2026.',
    badge: 'IBPS / SBI PRESET',
    examTags: ['IBPS PO', 'IBPS Clerk', 'SBI Clerk', 'RRB NTPC', '50KB to 100KB', 'Ruled Line Remover'],
    featuredInNav: true,
    priorityOrder: 38,
    authorityLogo: '/logos/sbi.svg',
    authorityName: 'State Bank of India',
  },
  {
    id: 'aadhaar-pan-kyc-merge',
    slug: '/tools/aadhaar-pan-kyc-merge',
    name: 'Aadhaar + PAN Single PDF KYC Merger (<200KB)',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc:
      'Combine Aadhaar card (front & back) and PAN card into a single A4 PDF strictly under 200KB or 500KB with 1-click RBI masking.',
    badge: 'HOT • BANK KYC',
    examTags: ['Aadhaar PAN', 'Bank KYC', 'SIM KYC', 'Single PDF', 'RBI Masked', '<200KB'],
    featuredInNav: true,
    priorityOrder: 39,
    authorityLogo: '/logos/uidai.svg',
    authorityName: 'UIDAI & Income Tax PAN',
  },
  {
    id: 'affidavit-generator',
    slug: '/tools/affidavit-generator',
    name: 'Bilingual Legal Affidavit Generator (English & தமிழ்)',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc:
      'Generate sworn legal affidavits for Name Correction, DOB Discrepancy, Gap Year, and Lost Documents with 3.5" e-Stamp paper spacing.',
    badge: 'FIRST IN INDIA • தமிழ்',
    examTags: ['Affidavit', 'Name Change', 'e-Stamp Paper', 'Notary', 'Gap Year', 'Tamil Affidavit'],
    featuredInNav: true,
    priorityOrder: 40,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'Sworn Legal & Notary',
  },
  {
    id: 'gst-number-verifier',
    slug: '/tools/gst-number-verifier',
    name: 'GST Number (GSTIN) Instant Verifier & Lookup',
    category: 'verify',
    categoryLabel: 'Digital Verification',
    shortDesc:
      'Mathematically verify 15-digit Indian GST numbers, decode State & embedded PAN, and validate official MOD 36 checksum.',
    badge: 'MOD 36 CHECKSUM',
    examTags: ['GSTIN', 'GST Verify', 'ITC Input Credit', 'Taxpayer Search', 'State Code'],
    featuredInNav: true,
    priorityOrder: 41,
    authorityLogo: '/logos/gst.svg',
    authorityName: 'GST India (GSTN)',
  },
  {
    id: 'salary-slip-generator',
    slug: '/tools/salary-slip-generator',
    name: 'Bilingual Salary Slip / Pay Slip Generator',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc:
      'Generate professional corporate & MSME monthly salary slips in English and Tamil with automatic EPF, ESIC, and PT calculations.',
    badge: 'LOAN & VISA READY',
    examTags: ['Salary Slip', 'Payslip Maker', 'Bank Loan Proof', 'Visa Payslip', 'EPF Calculator', 'Tamil Payslip'],
    featuredInNav: true,
    priorityOrder: 42,
    authorityLogo: '/logos/rbi.svg',
    authorityName: 'EPFO & Corporate Ready',
  },
  {
    id: 'compress-for-whatsapp',
    slug: '/tools/compress-for-whatsapp',
    name: 'Compress PDF & Photos for WhatsApp (<500KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc:
      'Compress heavy marksheet scans and ID cards strictly under 500KB or 200KB for fast, zero-blur WhatsApp sharing on mobile.',
    badge: 'FAST MOBILE 4G/5G',
    examTags: ['WhatsApp Compress', '<500KB', 'No Blur', 'Marksheet Share', 'Mobile 4G'],
    featuredInNav: true,
    priorityOrder: 43,
    authorityLogo: '/logos/whatsapp.svg',
    authorityName: 'WhatsApp Sharing Std',
  },
  {
    id: 'income-tax-calculator-2025-26',
    slug: '/tools/income-tax-calculator-2025-26',
    name: 'Income Tax Calculator FY 2025–26 (New vs Old Regime)',
    category: 'calculators',
    categoryLabel: 'Tax & Cost Calculators',
    shortDesc:
      'Compare New vs Old Tax Regime with revised Union Budget slabs, ₹75,000 standard deduction, and Section 87A rebate.',
    badge: 'UNION BUDGET 2025-26',
    examTags: ['Income Tax', 'Budget 2025-26', 'New Regime', 'Standard Deduction ₹75k', 'Sec 87A'],
    featuredInNav: true,
    priorityOrder: 44,
    authorityLogo: '/logos/incometax.png',
    authorityName: 'Income Tax Department',
  },
  {
    id: 'ifsc-code-finder',
    slug: '/tools/ifsc-code-finder',
    name: 'IFSC Code & Bank Branch Finder',
    category: 'verify',
    categoryLabel: 'Digital Verification',
    shortDesc:
      'Search IFSC codes, MICR numbers, and branch addresses for all Indian banks (SBI, Indian Bank, Canara, HDFC, ICICI, PNB) with 1-click copy.',
    badge: 'RBI NEFT / RTGS',
    examTags: ['IFSC Code', 'MICR Code', 'Bank Branch', 'SBI IFSC', 'Indian Bank', 'NEFT RTGS'],
    featuredInNav: true,
    priorityOrder: 45,
    authorityLogo: '/logos/rbi.svg',
    authorityName: 'Reserve Bank of India',
  },
  // -------------------------------------------------------------
  // Phase 2: Tamil Nadu Monopoly & Academic Admission Suite
  // -------------------------------------------------------------
  {
    id: 'tnpsc-otr-compliance-kit',
    slug: '/tools/tnpsc-otr-compliance-kit',
    name: 'TNPSC OTR Photo, Signature & Thumb Compliance Kit',
    category: 'photo_image',
    categoryLabel: 'Exam Photo & Signature',
    shortDesc:
      'Prepare Photo (20-50KB with Name/Date), Signature (10-20KB lock), and Left Thumb (10-50KB) for TNPSC Group 1, 2, 4 & VAO OTR with 1-click batch download.',
    badge: 'TNPSC OTR BUNDLE',
    examTags: ['TNPSC', 'Group 4', 'Group 2', 'VAO', 'OTR Photo', 'TNPSC Signature', '10-20KB', 'Thumb'],
    featuredInNav: true,
    priorityOrder: 46,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'TNPSC Tamil Nadu',
  },
  {
    id: 'tn-marksheet-compressor',
    slug: '/tools/tn-marksheet-compressor',
    name: 'TN 10th & 12th Marksheet PDF Compressor (<200KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc:
      'Compress Tamil Nadu SSLC (10th) and HSC (12th) marksheets strictly between 100KB and 200KB with State Board seal protection and dual-side merger.',
    badge: '100-200KB SAFE ZONE',
    examTags: ['SSLC Marksheet', '12th Marksheet', 'TNEA', 'TNGASA', 'TNPSC', 'Marksheet PDF', '200KB'],
    featuredInNav: true,
    priorityOrder: 47,
    authorityLogo: '/logos/tnea.svg',
    authorityName: 'TN State Board & DGE',
  },
  {
    id: 'tnea-cutoff-calculator',
    slug: '/tools/tnea-cutoff-calculator',
    name: 'TNEA Engineering Cutoff Calculator & Counseling Kit',
    category: 'calculators',
    categoryLabel: 'Tax & Cost Calculators',
    shortDesc:
      'Calculate Anna University 200 cutoff score [Maths + (Physics/2) + (Chemistry/2)], check college tier closing ranks, and estimate 7.5% Govt school fee waiver.',
    badge: 'ANNA UNIV 200',
    examTags: ['TNEA 2025', 'TNEA Cutoff', 'Anna University', 'Engineering Cutoff', '7.5 Quota', 'First Graduate'],
    featuredInNav: true,
    priorityOrder: 48,
    authorityLogo: '/logos/tnea.svg',
    authorityName: 'Anna University Chennai',
  },
  {
    id: 'pstm-certificate-generator',
    slug: '/tools/pstm-certificate-generator',
    name: 'Official Bilingual PSTM Certificate Generator (G.O. Ms. No. 82)',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc:
      'Generate statutory Tamil & English PSTM certificate for 20% TNPSC horizontal reservation with school letterhead top clearance and clean legal printout.',
    badge: '20% TNPSC QUOTA',
    examTags: ['PSTM', 'GO 82', 'Tamil Medium', 'TNPSC Reservation', 'School Certificate', 'Group 4'],
    featuredInNav: true,
    priorityOrder: 49,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'Govt of Tamil Nadu G.O. 82',
  },
  {
    id: 'aadhaar-front-back-pdf',
    slug: '/tools/aadhaar-front-back-pdf',
    name: 'Aadhaar Front + Back Single Page PDF Merger (<200KB)',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Legal Templates',
    shortDesc:
      'Merge Front and Back sides of Aadhaar card onto single A4 page with UIDAI 8-digit masking, photocopy Xerox mode, and self-attestation box.',
    badge: 'TOP SEARCHED',
    examTags: ['Aadhaar Front Back', 'Aadhaar Both Sides', 'Aadhaar Single Page', 'Masked Aadhaar', '200KB PDF'],
    featuredInNav: true,
    priorityOrder: 50,
    authorityLogo: '/logos/uidai.svg',
    authorityName: 'UIDAI Aadhaar Official',
  },
  {
    id: 'tn-esevai-certificate-prep',
    slug: '/tools/tn-esevai-certificate-prep',
    name: 'TN e-Sevai Revenue Certificate PDF Optimizer (<200KB)',
    category: 'pdf_tools',
    categoryLabel: 'PDF & Document Tools',
    shortDesc:
      'Optimize Community, Nativity, Income, and First Graduate certificates strictly under 200KB with Tahsildar digital signature QR code sharpness lock.',
    badge: 'E-SEVAI <200KB',
    examTags: ['e-Sevai', 'Community Certificate', 'Nativity', 'First Graduate', 'Tahsildar QR', 'TNPSC Upload'],
    featuredInNav: true,
    priorityOrder: 51,
    authorityLogo: '/logos/tnpsc.svg',
    authorityName: 'TN e-Sevai & Revenue',
  },
  {
    id: 'college-admission-photo-maker',
    slug: '/tools/college-admission-photo-maker',
    name: 'College Admission & Exam Photo Sheet Studio',
    category: 'print_share',
    categoryLabel: 'Print & Cyber Cafe Lab',
    shortDesc:
      'Generate 4x6" (8 photos), Combo (Passport + Stamp size), or A4 30-copy sheets at 300 DPI with name/DOP banner and scissors cut lines. Save ₹120.',
    badge: '4x6 COMBO LAB',
    examTags: ['College Photo', 'Passport Sheet 4x6', 'Stamp Size Photo', 'Admission Photo', 'Print Sheet'],
    featuredInNav: true,
    priorityOrder: 52,
    authorityLogo: '/logos/education.svg',
    authorityName: 'Higher Education Board',
  },
  {
    id: 'free-ats-resume-builder',
    slug: '/tools/free-ats-resume-builder',
    name: 'Free ATS Resume Builder & Sovereign Bio-Data Studio',
    category: 'kyc_documents',
    categoryLabel: 'KYC & Career Documents',
    shortDesc:
      'Build 100% ATS-compliant software engineer resumes, fresher 1-page CVs, Sarkari PSU tabular biodata, and marriage biodata with real-time scoring and zero cloud storage.',
    badge: 'ATS SCORE 95+',
    examTags: ['ATS Resume', 'Tech Resume', 'Sarkari CV', 'Indian Bio-Data', 'Fresher 1-Page', 'Software Engineer Resume', 'Zero Cloud Storage'],
    featuredInNav: true,
    priorityOrder: 53,
    authorityLogo: '/logos/ats.svg',
    authorityName: 'ATS Institutional Standard',
  },
];

/** Canonical category matcher bridging legacy and modern 6-category taxonomy */
export function normalizeCategory(cat: string): string {
  if (cat === 'pdf_compressor' || cat === 'marksheet_scanner' || cat === 'pdf_tools') return 'pdf_tools';
  if (cat === 'photo_signature' || cat === 'photo_image') return 'photo_image';
  if (cat === 'cyber_cafe' || cat === 'print_share') return 'print_share';
  if (cat === 'verification' || cat === 'verify') return 'verify';
  if (cat === 'security_privacy' || cat === 'kyc_documents') return 'kyc_documents';
  if (cat === 'calculators') return 'calculators';
  return cat;
}

/** Helper to get all categories */
export function getAllCategories(): ToolCategory[] {
  return TOOL_CATEGORIES;
}

/** Helper to filter tools by category */
export function getToolsByCategory(category: ToolItem['category']): ToolItem[] {
  const target = normalizeCategory(category);
  return TOOLS_CATALOG.filter((t) => normalizeCategory(t.category) === target).sort(
    (a, b) => a.priorityOrder - b.priorityOrder
  );
}

/** Helper to search tools */
export function searchTools(query: string, activeCategory?: string): ToolItem[] {
  const cleanQ = query.trim().toLowerCase();
  const targetCategory = activeCategory && activeCategory !== 'all' ? normalizeCategory(activeCategory) : null;

  return TOOLS_CATALOG.filter((t) => {
    if (targetCategory && normalizeCategory(t.category) !== targetCategory) {
      return false;
    }
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

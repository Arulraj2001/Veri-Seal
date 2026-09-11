export interface PortalSpec {
  exam: string;
  posts: string;
  requiredRange: string;
  targetUsed: string;
  portalNotes: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolConfig {
  slug: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  heroBadge: string;
  heroHeading: string;
  heroHighlight: string;
  heroDescription: string;
  defaultTargetKb: number;
  maxLimitKb: number;
  presetId: string;
  seoKeywords: string[];
  portalTableSpecs: PortalSpec[];
  faqs: FaqItem[];
  relatedTools: Array<{ name: string; href: string; limit: string }>;
}

const COMMON_PORTALS: PortalSpec[] = [
  {
    exam: 'TNPSC (Tamil Nadu PSC)',
    posts: 'Group 1, 2, 4, VAO, Technical Services',
    requiredRange: '100 KB to 200 KB',
    targetUsed: '180 KB',
    portalNotes: 'Files > 200 KB or < 100 KB are strictly rejected by OTR portal.',
  },
  {
    exam: 'UPSC Civil Services & OTR',
    posts: 'IAS, IPS, IFS, NDA, CDS, CMS',
    requiredRange: '20 KB to 300 KB',
    targetUsed: '250 KB',
    portalNotes: 'Required for DAF certificate uploads & Photo ID verification.',
  },
  {
    exam: 'SSC (Staff Selection Comm.)',
    posts: 'CGL, CHSL, MTS, CPO, GD Constable',
    requiredRange: '50 KB to 200 KB',
    targetUsed: '175 KB',
    portalNotes: 'Educational qualifications, caste & PwD certificates.',
  },
  {
    exam: 'NTA (NEET-UG, JEE, CUET)',
    posts: 'Medical, Engineering & University Entrance',
    requiredRange: '50 KB to 300 KB',
    targetUsed: '240 KB',
    portalNotes: 'Category, PwD, Citizenship & 10th/12th Marks certificate.',
  },
  {
    exam: 'IBPS / SBI Banking',
    posts: 'PO, Clerk, Specialist Officer (SO)',
    requiredRange: '100 KB to 200 KB',
    targetUsed: '180 KB',
    portalNotes: 'Handwritten declaration, caste & marksheet uploads.',
  },
  {
    exam: 'Passport Seva Portal',
    posts: 'Fresh & Re-issue Passport Applications',
    requiredRange: 'Max 1024 KB (1 MB)',
    targetUsed: '850 KB',
    portalNotes: 'Address proof, birth certificate, Annexures.',
  },
  {
    exam: 'EPFO & State PSCs',
    posts: 'UAN KYC & State Administrative Services',
    requiredRange: 'Max 500 KB',
    targetUsed: '420 KB',
    portalNotes: 'Passbook scan, degree certificates & domicile proof.',
  },
];

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  // -------------------------------------------------------------------------
  // 1. COMPRESS PDF TO 200KB (Top Google Search Volume in India)
  // -------------------------------------------------------------------------
  'compress-pdf-to-200kb': {
    slug: 'compress-pdf-to-200kb',
    title: 'Compress PDF to 200KB Online Free - Exact Size Guarantee | VeriSeal',
    metaDescription:
      'Compress PDF to strictly under 200KB online for free. Guaranteed safe limit (170-190 KB) for TNPSC, SSC, and IBPS portal uploads without text blurriness. No sign-up, 100% private.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/compress-pdf-to-200kb',
    heroBadge: 'Exact 200 KB Portal Safe Limit • 100% Free',
    heroHeading: 'Compress PDF to ',
    heroHighlight: '200KB Online Free',
    heroDescription:
      'Reduce certificate, marksheet, and identity PDFs strictly below 200 KB for TNPSC, SSC, and Banking portals. Preserves razor-sharp seals, marks, and signatures.',
    defaultTargetKb: 180,
    maxLimitKb: 200,
    presetId: '200kb',
    seoKeywords: [
      'compress pdf to 200kb',
      'compress pdf 200kb online free',
      'reduce pdf size to 200kb',
      'pdf compressor to 200kb',
      'compress pdf to 200kb for tnpsc',
      'compress pdf to 200kb for ssc',
      'pdf size reducer 200kb free',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'Why do Indian portals strictly demand PDFs under 200 KB?',
        answer:
          'Recruitment servers like TNPSC OTR and SSC handle millions of concurrent applicant submissions. They set a hard ceiling of 200 KB to optimize database storage. If a document is even 201 KB, the upload crashes. VeriSeal compresses your file to a safe 180 KB buffer so it never fails.',
      },
      {
        question: 'Will compressing my PDF to 200KB make text blurry?',
        answer:
          'No. Our intelligent multi-stage compressor preserves vector text lines and uses Lanczos 150+ DPI resampling on scanned photos and seals. You can inspect the Page 1 preview before downloading.',
      },
      {
        question: 'Can I compress multiple PDFs to 200KB at once?',
        answer:
          'Yes! Use our batch mode to drop your 10th marksheet, 12th marksheet, and community certificate together. All will be compressed to <200KB and can be downloaded individually or as a single ZIP.',
      },
      {
        question: 'Can I delete blank or extra pages before compressing?',
        answer:
          'Yes. Use our built-in Page Selector to preview and exclude any unnecessary pages, immediately cutting file size by 50% before image compression even begins.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 100KB', href: '/tools/compress-pdf-to-100kb', limit: '100 KB' },
      { name: 'Compress to 300KB (UPSC/NEET)', href: '/tools/compress-pdf-to-300kb', limit: '300 KB' },
      { name: 'TNPSC PDF Compressor', href: '/tools/tnpsc-pdf-compressor', limit: '200 KB' },
      { name: 'SSC PDF Compressor', href: '/tools/ssc-pdf-compressor', limit: '200 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. COMPRESS PDF TO 100KB
  // -------------------------------------------------------------------------
  'compress-pdf-to-100kb': {
    slug: 'compress-pdf-to-100kb',
    title: 'Compress PDF to 100KB Online Free - High Text Clarity | VeriSeal',
    metaDescription:
      'Compress PDF to 100KB online for free. Tailored for strict government portal uploads requiring files under 100KB without losing text legibility. 100% free, unlimited, no watermark.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/compress-pdf-to-100kb',
    heroBadge: 'Strict 100 KB Portal Ceiling • Zero Monetization',
    heroHeading: 'Compress PDF to ',
    heroHighlight: '100KB Online Free',
    heroDescription:
      'High-compression engine with text sharpening. Fits strict scholarship, state recruitment, and admission portal requirements (under 100 KB).',
    defaultTargetKb: 90,
    maxLimitKb: 100,
    presetId: '100kb',
    seoKeywords: [
      'compress pdf to 100kb',
      'compress pdf 100kb online free',
      'reduce pdf size to 100kb',
      'pdf compressor 100kb',
      'make pdf 100kb',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'How does VeriSeal achieve 100KB without destroying text quality?',
        answer:
          'VeriSeal removes invisible XML metadata, duplicates fonts, and uses 8-bit high-contrast monochrome rendering for scanned documents. This strips color noise while keeping black text razor-sharp.',
      },
      {
        question: 'What portals require PDFs under 100 KB?',
        answer:
          'Many state scholarship portals, railway recruitment boards (RRB), and university admission forms enforce a strict 100 KB upper boundary.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'Compress to 300KB', href: '/tools/compress-pdf-to-300kb', limit: '300 KB' },
      { name: 'TNPSC PDF Compressor', href: '/tools/tnpsc-pdf-compressor', limit: '200 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. COMPRESS PDF TO 300KB (UPSC & NEET)
  // -------------------------------------------------------------------------
  'compress-pdf-to-300kb': {
    slug: 'compress-pdf-to-300kb',
    title: 'Compress PDF to 300KB Online Free (UPSC OTR & NEET) | VeriSeal',
    metaDescription:
      'Compress PDF to 300KB online for UPSC Civil Services DAF, OTR, and NTA NEET certificate uploads. High resolution, clear seals and signatures. 100% free forever.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/compress-pdf-to-300kb',
    heroBadge: 'UPSC & NTA Verified Limit • 100% Free Forever',
    heroHeading: 'Compress PDF to ',
    heroHighlight: '300KB for UPSC & NEET',
    heroDescription:
      'The exact safe size (240–260 KB) required by UPSC OTR, Civil Services DAF, and NTA NEET certificate portals. Guaranteed acceptance.',
    defaultTargetKb: 250,
    maxLimitKb: 300,
    presetId: '300kb',
    seoKeywords: [
      'compress pdf to 300kb',
      'upsc pdf compressor 300kb',
      'neet certificate pdf compress 300kb',
      'reduce pdf to 300kb for upsc',
      'nta neet document size 300kb',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'Why does UPSC require certificate PDFs between 20KB and 300KB?',
        answer:
          'The UPSC Online Application portal enforces a strict limit: files must be at least 20 KB and no more than 300 KB. Our 300KB preset targets 250 KB, placing your file right in the optimal safe zone.',
      },
      {
        question: 'Can I compress my Aadhaar and Degree transcript together for UPSC DAF?',
        answer:
          'Yes! You can upload both documents simultaneously in our batch mode and download them ready for DAF submission.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'UPSC PDF Compressor', href: '/tools/upsc-pdf-compressor', limit: '300 KB' },
      { name: 'Compress to 500KB', href: '/tools/compress-pdf-to-500kb', limit: '500 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. COMPRESS PDF TO 500KB (EPFO & Passports)
  // -------------------------------------------------------------------------
  'compress-pdf-to-500kb': {
    slug: 'compress-pdf-to-500kb',
    title: 'Compress PDF to 500KB Online Free (EPFO & State PSCs) | VeriSeal',
    metaDescription:
      'Compress PDF documents to 500KB online for free. Ideal for EPFO UAN KYC passbook uploads, judicial services, and state public service commission forms.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/compress-pdf-to-500kb',
    heroBadge: 'EPFO & State PSC Limit • 100% Free',
    heroHeading: 'Compress PDF to ',
    heroHighlight: '500KB Online Free',
    heroDescription:
      'Compress multi-page passbooks, bank statements, and legal documents strictly under 500 KB for EPFO UAN, judicial services, and state portal submissions.',
    defaultTargetKb: 420,
    maxLimitKb: 500,
    presetId: '500kb',
    seoKeywords: [
      'compress pdf to 500kb',
      'epfo uan passbook pdf compress 500kb',
      'reduce pdf to 500kb online',
      'pdf compressor 500kb',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What is the EPFO UAN KYC PDF size limit?',
        answer:
          'The EPFO Unified Member Portal requires scanned bank passbooks and cancelled cheques to be in PDF format and strictly less than 500 KB.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'Compress to 300KB', href: '/tools/compress-pdf-to-300kb', limit: '300 KB' },
      { name: 'Master PDF Compressor', href: '/tools/pdf-compressor', limit: 'Custom' },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. TNPSC PDF COMPRESSOR (Specific Tamil Nadu Intent)
  // -------------------------------------------------------------------------
  'tnpsc-pdf-compressor': {
    slug: 'tnpsc-pdf-compressor',
    title: 'TNPSC PDF Compressor 200KB Online Free (OTR & Hall Ticket) | VeriSeal',
    metaDescription:
      'Compress PDF for TNPSC One Time Registration (OTR) strictly to 100KB-200KB. Guaranteed compliant with Group 1, 2, 4 certificate upload rules. 100% Free.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/tnpsc-pdf-compressor',
    heroBadge: 'Official TNPSC 100KB–200KB Limit • 100% Free',
    heroHeading: 'TNPSC PDF Compressor ',
    heroHighlight: '(Strict 200 KB OTR Safe)',
    heroDescription:
      'Compress Community Certificates, Nativity, SSLC Marksheet, and PSTM certificates to exact TNPSC upload standards (100 KB – 200 KB).',
    defaultTargetKb: 180,
    maxLimitKb: 200,
    presetId: 'tnpsc',
    seoKeywords: [
      'tnpsc pdf compressor',
      'tnpsc otr certificate upload size',
      'compress pdf for tnpsc 200kb',
      'tnpsc community certificate compress 200kb',
      'tnpsc group 4 certificate upload size',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What are the exact file size rules for TNPSC OTR certificate upload?',
        answer:
          'TNPSC mandates that all uploaded certificates (Community, 10th marksheet, Degree, PSTM) must be in PDF format with file size strictly between 100 KB and 200 KB. Files outside this window are automatically blocked by the portal.',
      },
      {
        question: 'How do I compress my Tamil Nadu community certificate?',
        answer:
          'Upload your downloaded e-District Community Certificate. Our tool optimizes it to 180 KB while keeping the Tahsildar digital signature QR code and NIC seal crisp.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'Compress to 100KB', href: '/tools/compress-pdf-to-100kb', limit: '100 KB' },
      { name: 'UPSC PDF Compressor', href: '/tools/upsc-pdf-compressor', limit: '300 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. UPSC PDF COMPRESSOR
  // -------------------------------------------------------------------------
  'upsc-pdf-compressor': {
    slug: 'upsc-pdf-compressor',
    title: 'UPSC PDF Compressor 300KB Online (OTR & DAF Uploads) | VeriSeal',
    metaDescription:
      'Compress certificate PDFs for UPSC Civil Services DAF and OTR to strictly under 300KB. 100% Free, zero blurriness for seals, marks, and signatures.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/upsc-pdf-compressor',
    heroBadge: 'UPSC DAF & OTR Safe • 100% Free Public Utility',
    heroHeading: 'UPSC PDF Compressor ',
    heroHighlight: '(Exact 300 KB DAF Limit)',
    heroDescription:
      'Compress age proof, category certificate, degree transcript, and disability certificates for UPSC Civil Services, NDA, and CDS forms.',
    defaultTargetKb: 250,
    maxLimitKb: 300,
    presetId: 'upsc',
    seoKeywords: [
      'upsc pdf compressor',
      'upsc daf pdf size 300kb',
      'upsc otr document size',
      'compress certificate for upsc',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What is the UPSC DAF PDF file size limit?',
        answer:
          'UPSC requires documents to be between 20 KB and 300 KB. Our engine targets 250 KB to ensure compliance and zero application rejection.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 300KB', href: '/tools/compress-pdf-to-300kb', limit: '300 KB' },
      { name: 'Compress to 200KB', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'SSC PDF Compressor', href: '/tools/ssc-pdf-compressor', limit: '200 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. SSC PDF COMPRESSOR
  // -------------------------------------------------------------------------
  'ssc-pdf-compressor': {
    slug: 'ssc-pdf-compressor',
    title: 'SSC PDF Compressor 200KB Online Free (CGL, CHSL, MTS) | VeriSeal',
    metaDescription:
      'Compress PDF documents to strictly under 200KB for Staff Selection Commission (SSC CGL, CHSL, MTS, GD) online application uploads. 100% free forever.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/ssc-pdf-compressor',
    heroBadge: 'SSC Portal Verified • 100% Free',
    heroHeading: 'SSC PDF Compressor ',
    heroHighlight: '(Strict 200 KB CGL/CHSL Limit)',
    heroDescription:
      'Compress educational marksheets, caste certificates, and ex-servicemen documents for Staff Selection Commission application portals.',
    defaultTargetKb: 175,
    maxLimitKb: 200,
    presetId: 'ssc',
    seoKeywords: [
      'ssc pdf compressor',
      'ssc cgl document upload size',
      'ssc chsl certificate compress 200kb',
      'compress pdf for ssc',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What is the SSC document upload size limit?',
        answer:
          'SSC candidate documents must be in PDF format and strictly below 200 KB (usually between 50 KB and 200 KB).',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'TNPSC PDF Compressor', href: '/tools/tnpsc-pdf-compressor', limit: '200 KB' },
      { name: 'UPSC PDF Compressor', href: '/tools/upsc-pdf-compressor', limit: '300 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 8. MASTER PDF COMPRESSOR HUB
  // -------------------------------------------------------------------------
  'pdf-compressor': {
    slug: 'pdf-compressor',
    title: 'Free PDF Compressor Online (Exact Target Size & Batch) | VeriSeal',
    metaDescription:
      '100% Free online PDF compressor with exact target limits (100KB, 200KB, 300KB, 500KB), batch compression, and page deletion. In-memory privacy, zero ads.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/pdf-compressor',
    heroBadge: 'All-in-One Master Compressor • 100% Free Forever',
    heroHeading: 'Online ',
    heroHighlight: 'PDF Compressor',
    heroDescription:
      'The modern alternative to iLovePDF and 11zon. Choose exact target sizes (100KB, 200KB, 300KB, 500KB), delete blank pages, or compress multiple certificates in batch.',
    defaultTargetKb: 200,
    maxLimitKb: 1000,
    presetId: 'custom',
    seoKeywords: [
      'online pdf compressor',
      'free pdf compressor india',
      'compress pdf exact size',
      'batch pdf compressor free',
      'pdf size reducer without losing quality',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'How does VeriSeal compare to iLovePDF and 11zon?',
        answer:
          'iLovePDF forces vague compression levels (Extreme/Recommended) and cannot guarantee exact file sizes like 200KB. 11zon has exact sizes but is cluttered with ads and popups. VeriSeal gives you exact target limits, batch compression, page deletion, and zero ads—100% free forever.',
      },
      {
        question: 'Are files stored on VeriSeal servers?',
        answer:
          'Never. All processing happens in-memory and is wiped immediately after your download starts. Zero disk storage, 100% privacy.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB (TNPSC/SSC)', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'Compress to 100KB', href: '/tools/compress-pdf-to-100kb', limit: '100 KB' },
      { name: 'Compress to 300KB (UPSC/NEET)', href: '/tools/compress-pdf-to-300kb', limit: '300 KB' },
      { name: 'Compress to 500KB (EPFO)', href: '/tools/compress-pdf-to-500kb', limit: '500 KB' },
    ],
  },

  // -------------------------------------------------------------------------
  // 9. GOVERNMENT EXAM PDF COMPRESSOR (Central Hub)
  // -------------------------------------------------------------------------
  'government-exam-pdf-compressor': {
    slug: 'government-exam-pdf-compressor',
    title: 'Government Exam PDF Compressor (TNPSC 200KB, UPSC 300KB, SSC, NEET) | VeriSeal',
    metaDescription:
      '100% Free online PDF compressor tailored for Indian government exam portals (TNPSC 200KB, UPSC 300KB, SSC, NEET, Banking). In-memory privacy, zero ads.',
    canonicalUrl: 'https://veri-seal.vercel.app/tools/government-exam-pdf-compressor',
    heroBadge: 'All-India Exam Portal Limits • 100% Free Forever',
    heroHeading: 'Government Exam ',
    heroHighlight: 'PDF Compressor',
    heroDescription:
      'Compress marksheets, community certificates, and transcripts to exact upload limits for TNPSC (200 KB), UPSC (300 KB), SSC, and NEET without blurry text or rejection errors.',
    defaultTargetKb: 180,
    maxLimitKb: 200,
    presetId: 'tnpsc',
    seoKeywords: [
      'government exam pdf compressor',
      'compress pdf for tnpsc 200kb',
      'upsc otr pdf compressor 300kb',
      'ssc pdf size reducer 200kb',
      'neet certificate pdf compress',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'Why do Indian exam portals reject files above 200KB or 300KB?',
        answer:
          'State and central recruitment portals enforce hard storage limits to process millions of candidates smoothly. VeriSeal guarantees your file is strictly within bounds.',
      },
      {
        question: 'Will fine marksheet lines or seals be blurred?',
        answer:
          'No. Our high-resolution Lanczos algorithm keeps text and stamps sharp. You can inspect the Page 1 preview before downloading.',
      },
    ],
    relatedTools: [
      { name: 'Compress to 200KB (TNPSC/SSC)', href: '/tools/compress-pdf-to-200kb', limit: '200 KB' },
      { name: 'Compress to 100KB', href: '/tools/compress-pdf-to-100kb', limit: '100 KB' },
      { name: 'UPSC 300KB Compressor', href: '/tools/upsc-pdf-compressor', limit: '300 KB' },
      { name: 'SSC 200KB Compressor', href: '/tools/ssc-pdf-compressor', limit: '200 KB' },
    ],
  },
};


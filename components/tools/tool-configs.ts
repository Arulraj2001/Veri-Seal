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
    title: 'Compress PDF to 200KB Online Free - Exact Size Guarantee | Kagazo',
    metaDescription:
      'Compress PDF to strictly under 200KB online for free. Guaranteed safe limit (170-190 KB) for TNPSC, SSC, and IBPS portal uploads without text blurriness. No sign-up, 100% private.',
    canonicalUrl: 'https://kagazo.in/tools/compress-pdf-to-200kb',
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
      'compress certificate pdf below 200 kb',
      'online pdf compressor 200 kb without losing quality',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'Why do Indian portals strictly demand PDFs under 200 KB?',
        answer:
          'Recruitment servers like TNPSC OTR and SSC handle millions of concurrent applicant submissions. They set a hard ceiling of 200 KB to optimize database storage and network bandwidth. If a document is even 201 KB, the upload crashes. Kagazo compresses your file to a safe 180 KB buffer so it never fails.',
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
      {
        question: 'How do I ensure my document stays between 100 KB and 200 KB?',
        answer:
          'Our 200KB preset specifically targets 180 KB. This lands perfectly in the 100 KB to 200 KB sweet spot required by TNPSC and state portals, avoiding both the upper ceiling and lower legibility floor.',
      },
      {
        question: 'Will government rubber stamps and digital signature QR codes remain clear?',
        answer:
          'Yes. The engine applies an edge-preserving sharpening kernel specifically to official stamps, holograms, and QR blocks so document verification officers and automated scanners can verify them without errors.',
      },
      {
        question: 'Is my uploaded certificate or marksheet stored on your server?',
        answer:
          'Never. Processing executes entirely within volatile RAM memory and files are purged immediately upon download. Zero data persistence, zero privacy leaks.',
      },
      {
        question: 'Is there any fee, daily limit, or watermark added to the PDF?',
        answer:
          'Kagazo is 100% free with no daily limits, no watermark, and no mandatory account registration.',
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
    title: 'Compress PDF to 100KB Online Free - High Text Clarity | Kagazo',
    metaDescription:
      'Compress PDF to 100KB online for free. Tailored for strict government portal uploads requiring files under 100KB without losing text legibility. 100% free, unlimited, no watermark.',
    canonicalUrl: 'https://kagazo.in/tools/compress-pdf-to-100kb',
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
      'compress marksheet to 100kb',
      'pdf file size reducer under 100 kb free',
      'how to compress pdf to 100kb without losing quality',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'How does Kagazo achieve 100KB without destroying text quality?',
        answer:
          'Kagazo removes invisible XML metadata, duplicate fonts, and unnecessary color profiles. For scanned documents, it applies 8-bit high-contrast monochrome rendering that strips color noise while keeping black text razor-sharp.',
      },
      {
        question: 'What portals require PDFs under 100 KB?',
        answer:
          'Many state scholarship portals (NSP, e-Kalyan), railway recruitment boards (RRB document uploads), high court clerk registrations, and university admission forms enforce a strict 100 KB upper boundary.',
      },
      {
        question: 'Can multi-page documents fit under 100 KB?',
        answer:
          'Yes, up to 2-3 pages can comfortably compress under 100 KB using our aggressive text-mode quantization. If your PDF has 5+ pages, consider deleting blank cover pages using our Page Selector first.',
      },
      {
        question: 'Will scanned signatures remain identifiable at 100KB?',
        answer:
          'Yes. The engine isolates pen stroke contrasts against the paper background, ensuring that candidate signatures and initials do not dissolve into pixelated artifacts.',
      },
      {
        question: 'Can I compress multiple files to 100KB simultaneously?',
        answer:
          'Yes! Drag and drop multiple files into batch mode. Kagazo processes each document individually under the strict 100 KB ceiling and lets you download them all in 1 click.',
      },
      {
        question: 'Are my confidential documents safe on Kagazo?',
        answer:
          '100% secure. Everything executes in volatile ephemeral RAM memory and is destroyed immediately after compression. No permanent server copies are ever created.',
      },
      {
        question: 'Is this tool completely free with zero watermarks?',
        answer:
          'Yes, completely free forever with zero watermarks, brand logos, or subscriptions.',
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
    title: 'Compress PDF to 300KB Online Free (UPSC OTR & NEET) | Kagazo',
    metaDescription:
      'Compress PDF to 300KB online for UPSC Civil Services DAF, OTR, and NTA NEET certificate uploads. High resolution, clear seals and signatures. 100% free forever.',
    canonicalUrl: 'https://kagazo.in/tools/compress-pdf-to-300kb',
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
      'upsc daf pdf compressor',
      'compress degree certificate to 300kb',
      'online pdf compressor 300 kb free',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'Why does UPSC require certificate PDFs between 20KB and 300KB?',
        answer:
          'The UPSC Online Application portal (ORA & DAF) enforces a strict rule: files must be at least 20 KB and no more than 300 KB. Our 300KB preset targets 250 KB, placing your file right in the optimal safe zone.',
      },
      {
        question: 'Can I compress my Aadhaar and Degree transcript together for UPSC DAF?',
        answer:
          'Yes! You can upload both documents simultaneously in our batch mode and download them ready for DAF submission.',
      },
      {
        question: 'Does NTA NEET UG mandate 300KB for category certificates?',
        answer:
          'Yes. NTA guidelines specify that SC/ST/OBC-NCL/EWS/PwD certificates must be in PDF format between 50 KB and 300 KB. Our tool targets 240 KB for guaranteed zero-error uploads.',
      },
      {
        question: 'Will university registrar seals and signatures remain legible?',
        answer:
          'Yes. At 300KB, the document has plenty of byte budget for 200+ DPI resolution. Kagazo preserves crisp contrast on official stamps, signatures, and university serial numbers.',
      },
      {
        question: 'Can I exclude unwanted pages before compressing to 300KB?',
        answer:
          'Yes, click the Page Selector to preview and exclude blank pages or disclaimers, optimizing the byte budget for your primary qualification pages.',
      },
      {
        question: 'Are my UPSC DAF certificates private and safe?',
        answer:
          '100% confidential. Processing takes place purely in browser RAM. Your roll numbers, caste certificates, and marksheets are never saved on server disks.',
      },
      {
        question: 'Does Kagazo add any watermark or cost anything?',
        answer:
          'Zero watermarks and 100% free forever with unlimited usage.',
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
    title: 'Compress PDF to 500KB Online Free (EPFO & State PSCs) | Kagazo',
    metaDescription:
      'Compress PDF documents to 500KB online for free. Ideal for EPFO UAN KYC passbook uploads, judicial services, and state public service commission forms.',
    canonicalUrl: 'https://kagazo.in/tools/compress-pdf-to-500kb',
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
      'compress bank statement to 500kb',
      'epfo kyc document compressor 500 kb',
      'compress multi page pdf below 500kb',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What is the EPFO UAN KYC PDF size limit?',
        answer:
          'The EPFO Unified Member Portal requires scanned bank passbooks and cancelled cheques to be in PDF format and strictly less than 500 KB with bank IFSC and account number clearly readable.',
      },
      {
        question: 'Can I compress a multi-page bank statement under 500 KB?',
        answer:
          'Yes! Kagazo easily compresses 4 to 8 pages of bank statements or passbook entries under 500 KB while retaining tabular line sharpness and transaction numbers.',
      },
      {
        question: 'Why do judicial and court e-filing portals require 500KB?',
        answer:
          'High Court and district court e-filing systems require affidavits, vakalatnamas, and annexures under 500 KB to avoid database bottlenecks during bulk hearings.',
      },
      {
        question: 'Will scanned stamp paper text remain sharp?',
        answer:
          'Yes. Our compressor preserves high-contrast text edges so non-judicial stamp paper text, notary seals, and advocate signatures remain 100% legible.',
      },
      {
        question: 'Is my financial data and passbook secure?',
        answer:
          '100% private. All processing occurs in volatile RAM memory. Zero bytes of your bank statements or passbooks are saved to disk or third-party servers.',
      },
      {
        question: 'Are there any watermarks or hidden charges?',
        answer:
          'None. Kagazo is 100% free with unlimited document compression and zero watermarks.',
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
    title: 'TNPSC PDF Compressor 200KB Online Free (OTR & Hall Ticket) | Kagazo',
    metaDescription:
      'Compress PDF for TNPSC One Time Registration (OTR) strictly to 100KB-200KB. Guaranteed compliant with Group 1, 2, 4 certificate upload rules. 100% Free.',
    canonicalUrl: 'https://kagazo.in/tools/tnpsc-pdf-compressor',
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
      'tnpsc pstm certificate pdf 200kb',
      'tnpsc sslc marksheet compress online',
      'tamil nadu psc pdf compressor free',
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
      {
        question: 'Why does TNPSC reject marksheets below 100 KB?',
        answer:
          'TNPSC scrutiny officers require clear resolution to verify student registration numbers, subject marks, and school headmaster seals. Files under 100 KB are often rejected for lack of legibility. Kagazo targets 180 KB to keep you safely in the accepted bracket.',
      },
      {
        question: 'Can I compress my PSTM (Persons Studied in Tamil Medium) certificate?',
        answer:
          'Yes! Upload your PSTM certificate scan. The engine enhances the Headmaster / Principal signature and school seal while keeping total file size comfortably below 200 KB.',
      },
      {
        question: 'Can I compress multiple certificates together for Group 4 / Group 2?',
        answer:
          'Yes! Use our batch mode to drop your SSLC, HSC, Community, and PSTM certificates together. All will be processed strictly under 200 KB and downloaded in 1 click.',
      },
      {
        question: 'Is my personal information and certificate data safe?',
        answer:
          '100% private. All processing executes in volatile in-browser RAM. Your certificates are never saved or stored on any server.',
      },
      {
        question: 'Does this tool add watermarks or require payment?',
        answer:
          'Kagazo is 100% free with zero watermarks and no registration required.',
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
    title: 'UPSC PDF Compressor 300KB Online (OTR & DAF Uploads) | Kagazo',
    metaDescription:
      'Compress certificate PDFs for UPSC Civil Services DAF and OTR to strictly under 300KB. 100% Free, zero blurriness for seals, marks, and signatures.',
    canonicalUrl: 'https://kagazo.in/tools/upsc-pdf-compressor',
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
      'upsc cse daf 1 document upload limit',
      'upsc educational qualification pdf compress',
      'upsc civil services pdf compressor free',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What is the UPSC DAF PDF file size limit?',
        answer:
          'UPSC requires documents to be between 20 KB and 300 KB. Our engine targets 250 KB to ensure compliance and zero application rejection.',
      },
      {
        question: 'What documents need to be uploaded for UPSC CSE DAF-1?',
        answer:
          'UPSC DAF-1 requires: Certificate of Age Proof (10th marksheet), Educational Qualification Certificate (Degree/Provisional), Category Certificate (OBC-NCL/SC/ST/EWS), and PwBD certificate if applicable. All must be in separate single PDFs under 300 KB.',
      },
      {
        question: 'Will university seals and Controller of Examination signatures remain clear?',
        answer:
          'Yes. Our UPSC preset utilizes a 200+ DPI text sharpening matrix to keep fine registrar seals and signature strokes completely crisp.',
      },
      {
        question: 'Can I compress my OBC-NCL certificate with annexures to under 300 KB?',
        answer:
          'Yes. Even multi-page category certificates with non-creamy layer declarations can be compressed under 300 KB with 100% legibility.',
      },
      {
        question: 'Can I remove blank pages before submitting to UPSC?',
        answer:
          'Yes, use the Page Selector to exclude blank backsides or disclaimers, focusing the file size solely on substantive certificate text.',
      },
      {
        question: 'Are candidate certificates secure on Kagazo?',
        answer:
          '100% secure. Files are processed exclusively in volatile ephemeral RAM memory and wiped immediately upon download. No server disk storage.',
      },
      {
        question: 'Is this UPSC tool free without watermarks?',
        answer:
          'Yes, 100% free with zero watermarks or branding.',
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
    title: 'SSC PDF Compressor 200KB Online Free (CGL, CHSL, MTS) | Kagazo',
    metaDescription:
      'Compress PDF documents to strictly under 200KB for Staff Selection Commission (SSC CGL, CHSL, MTS, GD) online application uploads. 100% free forever.',
    canonicalUrl: 'https://kagazo.in/tools/ssc-pdf-compressor',
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
      'ssc mts document verification pdf',
      'ssc cpo certificate upload limit',
      'staff selection commission pdf compressor 200kb',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'What is the SSC document upload size limit?',
        answer:
          'SSC candidate documents must be in PDF format and strictly below 200 KB (usually between 50 KB and 200 KB). Our preset targets 175 KB for safe submission.',
      },
      {
        question: 'Which SSC examinations are supported by this tool?',
        answer:
          'All SSC portals including SSC CGL (Combined Graduate Level), SSC CHSL (10+2), SSC MTS, SSC GD Constable, SSC CPO (Sub-Inspector), and SSC Selection Posts.',
      },
      {
        question: 'How do I compress Class 10 marksheet for SSC Date of Birth proof?',
        answer:
          'Upload your 10th marksheet scan. Kagazo sharpens the date of birth field, roll number, and school board seal while compressing the document safely to ~175 KB.',
      },
      {
        question: 'Will caste certificates (SC/ST/OBC/EWS) remain legible for Document Verification (DV)?',
        answer:
          'Yes. Scrutiny officers check the issuing authority designation and validity year. Kagazo protects these critical stamp lines from over-compression.',
      },
      {
        question: 'Can I batch-compress all my certificates for SSC Document Verification?',
        answer:
          'Yes! Upload your 10th, 12th, Degree, and Caste certificate together. Kagazo will compress each file under 200 KB simultaneously.',
      },
      {
        question: 'Is my personal data protected during compression?',
        answer:
          '100% protected. Files are processed entirely in browser memory. Zero server storage, zero third-party tracking.',
      },
      {
        question: 'Is this service completely free?',
        answer:
          'Yes, 100% free with zero watermarks or signups.',
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
    title: 'Free PDF Compressor Online (Exact Target Size & Batch) | Kagazo',
    metaDescription:
      '100% Free online PDF compressor with exact target limits (100KB, 200KB, 300KB, 500KB), batch compression, and page deletion. In-memory privacy, zero ads.',
    canonicalUrl: 'https://kagazo.in/tools/pdf-compressor',
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
      'compress pdf to custom kb',
      'best free pdf compressor 2026',
      'pdf compressor no watermark unlimited',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'How does Kagazo compare to iLovePDF and 11zon?',
        answer:
          'iLovePDF forces vague compression levels (Extreme/Recommended) and cannot guarantee exact file sizes like 200KB. 11zon has exact sizes but is cluttered with aggressive ads and popups. Kagazo gives you exact target limits, batch compression, page deletion, and clean fast performance—100% free forever.',
      },
      {
        question: 'How does the exact target slider work?',
        answer:
          'Our binary search quantization engine estimates the byte budget needed for the file and iteratively adjusts compression levels until the resulting PDF lands comfortably below your selected target limit without unnecessary quality loss.',
      },
      {
        question: 'Can I remove individual pages before compressing?',
        answer:
          'Yes! Click the Page Selector to preview all pages and click to exclude blank cover sheets, disclaimers, or redundant pages to instantly reduce the file size.',
      },
      {
        question: 'Does this tool support batch compression for multiple PDFs?',
        answer:
          'Yes! You can drop 5, 10, or more PDF files at once. All will be compressed to your target size simultaneously and downloaded in 1 click or as a single ZIP.',
      },
      {
        question: 'Are files stored on Kagazo servers?',
        answer:
          'Never. All processing happens in volatile RAM memory and is wiped immediately after your download starts. Zero disk storage, 100% privacy.',
      },
      {
        question: 'Will fine vector text lines or scanned stamps be blurred?',
        answer:
          'No. Kagazo separates vector text from raster images, preserving text crispness while intelligently optimizing photographic regions.',
      },
      {
        question: 'Is there any file size limit on uploads?',
        answer:
          'You can upload files up to 50MB per document for fast client-side in-memory compression.',
      },
      {
        question: 'Does Kagazo add any watermark to the compressed PDF?',
        answer:
          'Zero watermarks. Your documents remain completely clean and professional.',
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
    title: 'Government Exam PDF Compressor (TNPSC 200KB, UPSC 300KB, SSC, NEET) | Kagazo',
    metaDescription:
      '100% Free online PDF compressor tailored for Indian government exam portals (TNPSC 200KB, UPSC 300KB, SSC, NEET, Banking). In-memory privacy, zero ads.',
    canonicalUrl: 'https://kagazo.in/tools/government-exam-pdf-compressor',
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
      'sarkari exam pdf compressor free',
      'ibps certificate upload size reducer',
      'railway rrb document pdf compress 100kb',
    ],
    portalTableSpecs: COMMON_PORTALS,
    faqs: [
      {
        question: 'Why do Indian exam portals reject files above 200KB or 300KB?',
        answer:
          'State and central recruitment portals enforce hard storage limits to process millions of candidates smoothly. Uploading a file even 1 KB over the limit causes instant server rejection. Kagazo guarantees your file is strictly within the safe threshold.',
      },
      {
        question: 'Which government exams are supported by this compressor?',
        answer:
          'All major Indian exams: UPSC Civil Services (DAF & OTR), SSC (CGL, CHSL, MTS, GD), TNPSC (Group 1, 2, 4, VAO), NTA NEET UG, IBPS / SBI Bank PO, Railway RRB, and State PSCs across India.',
      },
      {
        question: 'Will fine marksheet lines, grades, or seals be blurred?',
        answer:
          'No. Our high-resolution Lanczos algorithm keeps text, numbers, and rubber stamps sharp. You can inspect the Page 1 preview before downloading.',
      },
      {
        question: 'How do I choose between 100KB, 200KB, and 300KB presets?',
        answer:
          'Use the Quick Switch buttons or presets: Choose 200KB for TNPSC and SSC, 300KB for UPSC and NEET, and 100KB for State Scholarships or RRB uploads.',
      },
      {
        question: 'Can I upload camera photos of my marksheets?',
        answer:
          'Yes! Kagazo accepts both PDF files and camera photos (JPG/PNG), converting and compressing them into a standard compliant A4 PDF.',
      },
      {
        question: 'Are candidate certificates and roll numbers private on Kagazo?',
        answer:
          '100% private. Processing executes exclusively in ephemeral RAM memory. Your files never touch server disks or third-party cloud storage.',
      },
      {
        question: 'Is this exam tool free with zero watermarks?',
        answer:
          'Yes, completely free forever with zero watermarks and no login required.',
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

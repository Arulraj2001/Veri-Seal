import { supabase } from '@/lib/supabase';

export interface SeoPageData {
  id: string;
  slug: string;
  title: string;
  h1: string;
  meta_description: string;
  meta_keywords: string;
  intro_text: string;
  doc_type: string;
  state: string;
  portal: string;
  portal_description?: string;
  faq: Array<{ q: string; a: string }>;
  published: boolean;
  updated_at: string;
}

export const mockSeoPages: SeoPageData[] = [
  {
    id: 'seo-1',
    slug: 'verify-aadhaar-pdf',
    title: 'Verify e-Aadhaar PDF Digital Signature Online | VeriSeal',
    h1: 'Verify UIDAI e-Aadhaar Digital Signature Online',
    meta_description: 'Verify the digital signature on your downloaded e-Aadhaar PDF. Fix yellow question mark into green tick verified by CCA India.',
    meta_keywords: 'verify aadhaar signature, aadhaar digital signature verify, uidai green tick, aadhaar yellow question mark fix, eaadhaar signature valid',
    intro_text: 'Validate the cryptographic digital signature of UIDAI e-Aadhaar letters issued through the myAadhaar portal. Ensures no post-issuance tampering and converts the unverified yellow question mark into a permanent CCA India green tick.',
    doc_type: 'e-Aadhaar Letter',
    state: 'All India',
    portal: 'UIDAI myAadhaar Portal',
    portal_description: `The Unique Identification Authority of India (UIDAI) is a statutory authority established under the provisions of the Aadhaar Act 2016 by the Government of India. The myAadhaar portal serves as the primary gateway for over 1.4 billion residents to download digitally signed electronic Aadhaar (e-Aadhaar) letters.

Every e-Aadhaar downloaded from the UIDAI portal contains a cryptographic digital signature generated with a high-assurance Hardware Security Module (HSM) licensed under the Controller of Certifying Authorities (CCA).

Because UIDAI signs millions of documents dynamically, the embedded signing certificates operate under India's sovereign root trust framework (RCAI). VeriSeal provides the instant verification engine that establishes the complete cryptographic chain of trust.`,
    faq: [
      {
        q: 'Why does my Aadhaar PDF show a yellow question mark?',
        a: 'Adobe Acrobat Reader and other desktop PDF viewers do not bundle the Controller of Certifying Authorities (CCA) India root certificate by default. Consequently, Adobe displays a yellow question mark stating "Signature validity is unknown". VeriSeal validates the signature against the official RCAI root and embeds Long-Term Validation (LTV) so it renders as a verified green tick.'
      },
      {
        q: 'What is the password to open and verify my e-Aadhaar PDF?',
        a: 'The official UIDAI password format is the first 4 letters of your name in CAPITAL LETTERS followed by your 4-digit Year of Birth (e.g. if your name is SURESH KUMAR and birth year is 1992, your password is SURE1992).'
      },
      {
        q: 'Is it safe to upload my Aadhaar document on VeriSeal?',
        a: 'Yes, completely safe. VeriSeal operates with a strict Zero-Storage Architecture. Your PDF is processed 100% in volatile server memory (RAM) and immediately purged upon completing cryptographic checks. Your Aadhaar number and demographic data are never stored or logged.'
      },
      {
        q: 'Is a VeriSeal verified e-Aadhaar valid for government and bank submissions?',
        a: 'Yes. Under Section 5 of the Information Technology Act 2000 and UIDAI circulars, a digitally verified e-Aadhaar bearing an authenticated digital signature has full legal evidentiary status equal to the physical Aadhaar letter.'
      }
    ],
    published: true,
    updated_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'seo-2',
    slug: 'verify-community-certificate-tamil-nadu',
    title: 'Verify Tamil Nadu Community Certificate Signature | VeriSeal',
    h1: 'Verify Tamil Nadu Community Certificate Digital Signature',
    meta_description: 'Verify digital signature on Tamil Nadu revenue department community certificate issued via e-Sevai / TNeGA portal.',
    meta_keywords: 'tamil nadu community certificate verify, tnega digital signature, esevai certificate verification, tnea counseling signature verify',
    intro_text: 'Authenticates digitally signed caste and community certificates issued by Revenue Authorities across all 38 districts of Tamil Nadu. Validate the Zonal Deputy Tahsildar signature token.',
    doc_type: 'Community Certificate',
    state: 'Tamil Nadu',
    portal: 'Tamil Nadu e-District / TNeGA',
    portal_description: `The Tamil Nadu e-Governance Agency (TNeGA) operates the state's flagship e-Sevai platform, enabling citizens to obtain digitally certified caste, community, nativity, and income records. Every certificate is processed through the Revenue Administration workflow and electronically approved by a Zonal Deputy Tahsildar.

The issued certificate features an official government emblem, a verifiable Application Reference Number, and an electronic signature issued by the National Informatics Centre (NIC) Sub-CA for Tamil Nadu.

Students applying for college counseling through TNEA, medical seats through TN Medical Selection, and government posts through TNPSC are required to produce verified digital certificates without unauthenticated signature warnings.`,
    faq: [
      {
        q: 'How do I verify the digital signature on my TNeGA community certificate?',
        a: 'Upload your certificate PDF downloaded from the e-Sevai portal to VeriSeal. The system parses the PKCS#7 signature container, checks the Deputy Tahsildar\'s signing token against the NIC Sub-CA root, and confirms zero unauthorized alterations.'
      },
      {
        q: 'Who is the authorized signer on Tamil Nadu revenue certificates?',
        a: 'Certificates are signed by the Zonal Deputy Tahsildar (or Headquarters Deputy Tahsildar in select taluks) using a Class 2/3 Digital Signature Certificate (DSC) issued by NIC under CCA India.'
      },
      {
        q: 'Why was my community certificate flagged as unverified during TNEA counseling?',
        a: 'Counseling scrutiny committees look for a cryptographically verified green checkmark. If viewed in unconfigured PDF software, it shows an unverified question mark. VeriSeal fixes this by validating the certificate and appending Long-Term Validation (LTV).'
      }
    ],
    published: true,
    updated_at: '2026-09-02T11:00:00Z',
  },
  {
    id: 'seo-3',
    slug: 'verify-nativity-certificate-tamil-nadu',
    title: 'Verify Tamil Nadu Nativity Certificate Signature | VeriSeal',
    h1: 'Verify Tamil Nadu Nativity Certificate Digital Signature',
    meta_description: 'Check digital signature authenticity on Tamil Nadu nativity and residence certificates issued via TNeGA.',
    meta_keywords: 'tamil nadu nativity certificate signature, verify esevai residence certificate, tnega nativity green tick',
    intro_text: 'Verify that your Tamil Nadu nativity certificate is digitally signed and untouched since issuance by the Revenue Administration. Instant verification against NIC Sub-CA.',
    doc_type: 'Nativity Certificate',
    state: 'Tamil Nadu',
    portal: 'Tamil Nadu e-Sevai Portal',
    portal_description: `The Nativity Certificate in Tamil Nadu confirms a candidate's domicile and residency status within the state. It is a mandatory requirement for admissions under state quota quotas in professional courses (Engineering, MBBS, BDS) and recruitment in state public sector enterprises.

Issued under the authority of the Commissioner of Revenue Administration and Disaster Management, each certificate is generated through the e-District application and cryptographically sealed.

VeriSeal confirms the integrity of the document, validating that the electronic record matches the original issuance parameters without tampering.`,
    faq: [
      {
        q: 'What does a valid nativity certificate signature contain?',
        a: 'It contains the name of the revenue officer, their designated Taluk and District, the timestamp of approval, and the cryptographic thumbprint issued by the NIC Certifying Authority.'
      },
      {
        q: 'Can VeriSeal detect if an e-Sevai PDF has been modified?',
        a: 'Yes. VeriSeal performs ByteRange checking. If even a single pixel or character of text (such as name, address, or date) has been edited using PDF editors, the cryptographic hash verification will immediately fail and flag the document as invalid.'
      }
    ],
    published: true,
    updated_at: '2026-09-03T12:00:00Z',
  },
  {
    id: 'seo-4',
    slug: 'verify-income-certificate',
    title: 'Verify Income Certificate Digital Signature Online | VeriSeal',
    h1: 'Verify Income Certificate Digital Signature',
    meta_description: 'Verify government income certificate digital signature across Tamil Nadu, Karnataka, AP, Telangana and other states.',
    meta_keywords: 'income certificate verify online, revenue income certificate signature, tahsildar dsc verification, scholarship income certificate verify',
    intro_text: 'Confirm the cryptographic validity of income certificates issued for scholarship, fee reimbursement, and government welfare schemes. Detects unauthorized edits and validates tahsildar DSC.',
    doc_type: 'Income Certificate',
    state: 'All India',
    portal: 'State Revenue e-District Portals',
    portal_description: `Income Certificates are issued by state revenue departments across India to certify the annual income of an applicant's family. They form the foundational criterion for determining eligibility for post-matric scholarships, fee concessions, EWS reservations, and social welfare pensions.

Digital income certificates are issued through state e-District platforms (such as Nadakacheri in Karnataka, Meeseva in Andhra Pradesh & Telangana, e-District in UP and Maharashtra, and TNeGA in Tamil Nadu).

VeriSeal supports all state revenue portals operating under the Controller of Certifying Authorities (CCA) India hierarchy.`,
    faq: [
      {
        q: 'Can I submit a VeriSeal verified income certificate for national scholarships?',
        a: 'Yes. VeriSeal verifies the document against the Indian National PKI hierarchy and embeds LTV proof, ensuring educational institutions and verification officers see a verified green tick.'
      },
      {
        q: 'Does an Income Certificate have an expiration date?',
        a: 'Income certificates in most Indian states are valid for one financial year (from 1st April to 31st March of the respective year). However, the digital signature itself remains cryptographically permanent.'
      }
    ],
    published: true,
    updated_at: '2026-09-04T13:00:00Z',
  },
  {
    id: 'seo-5',
    slug: 'verify-pan-card-pdf',
    title: 'Verify e-PAN Card Digital Signature Online | VeriSeal',
    h1: 'Verify Income Tax Department e-PAN Card Digital Signature',
    meta_description: 'Verify digital signature on NSDL / UTIITSL / Income Tax portal e-PAN cards instantly. Confirm authenticity before financial transactions.',
    meta_keywords: 'verify pan card signature, e-pan digital signature verify, protean nsdl pan signature, utiitsl pan card verify',
    intro_text: 'Evaluates the digital signature issued by Protean eGov Technologies (NSDL) or UTIITSL on newly allotted or reprinted e-PAN cards. Eliminates fraud and verifies permanent account number credentials.',
    doc_type: 'e-PAN Card',
    state: 'All India',
    portal: 'Income Tax e-Filing / NSDL / UTIITSL',
    portal_description: `The Permanent Account Number (PAN) is a ten-digit alphanumeric identifier issued by the Income Tax Department of India under Section 139A of the Income Tax Act, 1961. Electronic PAN (e-PAN) cards are issued in digitally signed PDF format via Protean eGov Technologies Limited (formerly NSDL e-Governance) and UTI Infrastructure Technology And Services Limited (UTIITSL).

An authentic e-PAN card contains an invisible or visible cryptographic PKCS#7 digital signature signed by authorized signatories of Protean or UTIITSL using high-assurance corporate DSCs.

Banks, demat account brokers, real estate registries, and NBFCs require proof of valid signature verification when accepting digital PAN submissions for KYC onboarding.`,
    faq: [
      {
        q: 'How do I know if my e-PAN card signature is genuine?',
        a: 'When verified on VeriSeal, a genuine e-PAN will display the signer identity as "Protean eGov Technologies Limited" or "UTI Infrastructure Technology And Services Limited" with a certificate issued by an approved Indian CA (such as eMudhra or NIC).'
      },
      {
        q: 'What is the password for opening an e-PAN PDF?',
        a: 'The default password for e-PAN cards issued by NSDL/UTIITSL is your Date of Birth in DDMMYYYY format with no spaces or slashes (e.g., 25081995 for 25th August 1995).'
      }
    ],
    published: true,
    updated_at: '2026-09-05T14:00:00Z',
  },
  {
    id: 'seo-6',
    slug: 'verify-digilocker-pdf',
    title: 'Verify DigiLocker Issued Document Signature | VeriSeal',
    h1: 'Verify DigiLocker Digital Signature and Certificate Integrity',
    meta_description: 'Verify digital signatures on documents issued by DigiLocker. Validate driving licenses, vehicle RC, marksheet and degree certificates.',
    meta_keywords: 'digilocker signature verify, verify digilocker document, digilocker green tick, digilocker national pki',
    intro_text: 'Confirm the digital signature and authenticity of documents issued through the Government of India DigiLocker national repository. Validates vehicle RC, driving licenses, and academic marksheets.',
    doc_type: 'DigiLocker Document',
    state: 'All India',
    portal: 'DigiLocker National PKI',
    portal_description: `DigiLocker is a flagship initiative of the Ministry of Electronics & IT (MeitY) under the Digital India corporation. It provides citizens with a cloud repository of legally recognized electronic credentials issued directly from the original source repositories (such as MoRTH for driving licenses, CBSE for board marksheets, and state universities).

Every document issued through DigiLocker carries a specialized cryptographic timestamp and digital signature from DigiLocker / National Informatics Centre.

Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules 2016, documents accessed through DigiLocker are treated at par with original physical documents.`,
    faq: [
      {
        q: 'Why does DigiLocker have a digital signature?',
        a: 'The digital signature proves that the document originated directly from the issuing authority\'s authenticated database and was not altered after issuance.'
      },
      {
        q: 'Does VeriSeal support DigiLocker educational certificates?',
        a: 'Yes. VeriSeal verifies digital signatures on CBSE marksheets, university degree certificates, migration certificates, and state board transcripts issued via DigiLocker.'
      }
    ],
    published: true,
    updated_at: '2026-09-06T15:00:00Z',
  },
  {
    id: 'seo-7',
    slug: 'verify-epfo-uan-card',
    title: 'Verify EPFO UAN Card & Passbook Signature | VeriSeal',
    h1: 'Verify EPFO Digital Signature on UAN Card & Member Passbook',
    meta_description: 'Verify digital signature on EPFO UAN card and provident fund member passbook. Ensure authenticity of retirement savings records.',
    meta_keywords: 'epfo signature verify, uan card digital signature, epf passbook signature validation, epfo green tick',
    intro_text: 'Validate electronic signature on EPFO Universal Account Number (UAN) cards and Member Passbooks issued by the Employees\' Provident Fund Organisation.',
    doc_type: 'EPFO UAN Document',
    state: 'All India',
    portal: 'EPFO Unified Member Portal',
    portal_description: `The Employees' Provident Fund Organisation (EPFO) is one of the world's largest social security organisations, administering mandatory provident fund, pension, and insurance schemes for the organized workforce in India.

Through the Unified Member Portal, employees can download digitally signed UAN cards and consolidated PF contribution passbooks.

These documents are digitally signed by authorized EPFO IT systems to prevent fraudulent financial claims and loan applications.`,
    faq: [
      {
        q: 'Who signs the EPFO member passbook?',
        a: 'The EPFO passbook is digitally signed by the automated cryptographic server of the Employees\' Provident Fund Organisation using an enterprise DSC issued by NIC CA.'
      }
    ],
    published: true,
    updated_at: '2026-09-07T16:00:00Z',
  },
  {
    id: 'seo-8',
    slug: 'verify-itr-acknowledgement',
    title: 'Verify Income Tax ITR-V Acknowledgment Signature | VeriSeal',
    h1: 'Verify ITR-V Income Tax Return Digital Signature',
    meta_description: 'Verify digital signature on ITR-V tax filing acknowledgment PDFs. Validate CPC Bengaluru cryptographic signature online.',
    meta_keywords: 'itr-v signature verify, income tax return acknowledgment signature, cpc bengaluru digital signature verify',
    intro_text: 'Verify the electronic signature on your ITR-V Income Tax Return acknowledgment form issued by the Centralized Processing Center (CPC), Bengaluru.',
    doc_type: 'ITR-V Acknowledgment',
    state: 'All India',
    portal: 'Income Tax Department e-Filing Portal',
    portal_description: `The Income Tax Department of India generates an electronic ITR-V acknowledgment receipt whenever an individual or corporate taxpayer files their annual Income Tax Return.

The receipt is cryptographically signed by the Centralized Processing Center (CPC), Bengaluru, under the Directorate of Income Tax (Systems).

Banks and financial institutions scrutinize the digital signature on ITR-V forms during home loan, car loan, and visa financial evaluation processes.`,
    faq: [
      {
        q: 'What does a verified ITR-V signature prove?',
        a: 'It proves that the tax return acknowledgment was officially generated by the Income Tax Department\'s CPC systems and that the financial figures have not been falsified.'
      }
    ],
    published: true,
    updated_at: '2026-09-08T17:00:00Z',
  }
];

export async function getPublishedSeoPages(): Promise<SeoPageData[]> {
  try {
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('published', true)
      .order('slug', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        slug: d.slug,
        title: d.title,
        h1: d.h1,
        meta_description: d.meta_description || '',
        meta_keywords: d.meta_keywords || '',
        intro_text: d.intro_text || '',
        doc_type: d.doc_type || 'Government Document',
        state: d.state || 'All India',
        portal: d.portal || 'Government Portal',
        portal_description: d.portal_description || '',
        faq: Array.isArray(d.faq) ? d.faq : [],
        published: Boolean(d.published),
        updated_at: d.updated_at || new Date().toISOString(),
      }));
    }
  } catch (e) {
    console.debug('Supabase getPublishedSeoPages fallback:', e);
  }

  return mockSeoPages.filter((p) => p.published);
}

export async function getSeoPageBySlug(slug: string): Promise<SeoPageData | null> {
  try {
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        slug: data.slug,
        title: data.title,
        h1: data.h1,
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || '',
        intro_text: data.intro_text || '',
        doc_type: data.doc_type || 'Government Document',
        state: data.state || 'All India',
        portal: data.portal || 'Government Portal',
        portal_description: data.portal_description || '',
        faq: Array.isArray(data.faq) ? data.faq : [],
        published: Boolean(data.published),
        updated_at: data.updated_at || new Date().toISOString(),
      };
    }
  } catch (e) {
    console.debug('Supabase getSeoPageBySlug fallback:', e);
  }

  const found = mockSeoPages.find((p) => p.slug === slug && p.published);
  return found || null;
}

export async function getAllSeoPageSlugs(): Promise<string[]> {
  const pages = await getPublishedSeoPages();
  return pages.map((p) => p.slug);
}

/**
 * Maps a detected document type from verification engine to a matching SEO slug
 */
export function getSeoSlugForDocType(docType: string): string {
  const dt = (docType || '').toLowerCase();
  if (dt.includes('aadhaar')) return 'verify-aadhaar-pdf';
  if (dt.includes('community') || dt.includes('caste')) return 'verify-community-certificate-tamil-nadu';
  if (dt.includes('nativity') || dt.includes('residence')) return 'verify-nativity-certificate-tamil-nadu';
  if (dt.includes('income')) return 'verify-income-certificate';
  if (dt.includes('pan')) return 'verify-pan-card-pdf';
  if (dt.includes('digilocker')) return 'verify-digilocker-pdf';
  if (dt.includes('epfo') || dt.includes('uan')) return 'verify-epfo-uan-card';
  if (dt.includes('itr') || dt.includes('tax')) return 'verify-itr-acknowledgement';
  return 'verify-aadhaar-pdf';
}

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
  direct_answer?: string;
  faq: Array<{ q: string; a: string }>;
  published: boolean;
  updated_at: string;
}

export const mockSeoPages: SeoPageData[] = [
  {
    id: 'seo-1',
    slug: 'verify-aadhaar-pdf',
    title: 'Verify e-Aadhaar PDF Digital Signature Online | Kagazo',
    h1: 'Verify UIDAI e-Aadhaar Digital Signature Online',
    meta_description: 'Verify the digital signature on your downloaded e-Aadhaar PDF. Fix yellow question mark into green tick verified by CCA India.',
    meta_keywords: 'verify aadhaar signature, aadhaar digital signature verify, uidai green tick, aadhaar yellow question mark fix, eaadhaar signature valid',
    intro_text: 'Validate the cryptographic digital signature of UIDAI e-Aadhaar letters issued through the myAadhaar portal. Ensures no post-issuance tampering and converts the unverified yellow question mark into a permanent CCA India green tick.',
    doc_type: 'e-Aadhaar Letter',
    state: 'All India',
    portal: 'UIDAI myAadhaar Portal',
    portal_description: `The Unique Identification Authority of India (UIDAI) is a statutory authority established under the provisions of the Aadhaar Act 2016 by the Government of India. The myAadhaar portal serves as the primary gateway for over 1.4 billion residents to download digitally signed electronic Aadhaar (e-Aadhaar) letters.

Every e-Aadhaar downloaded from the UIDAI portal contains a cryptographic digital signature generated with a high-assurance Hardware Security Module (HSM) licensed under the Controller of Certifying Authorities (CCA).

Because UIDAI signs millions of documents dynamically, the embedded signing certificates operate under India's sovereign root trust framework (RCAI). Kagazo provides the instant verification engine that establishes the complete cryptographic chain of trust.`,
    direct_answer: 'A yellow question mark appears on e-Aadhaar PDFs when software like Adobe Acrobat does not have India\'s CCA Root Certificate installed. Kagazo automatically validates UIDAI\'s cryptographic signature against the Root Certifying Authority of India (RCAI) in memory and generates a verified PDF with a permanent green tick.',
    faq: [
      {
        q: 'Why does my Aadhaar PDF show a yellow question mark?',
        a: 'Adobe Acrobat Reader and other desktop PDF viewers do not bundle the Controller of Certifying Authorities (CCA) India root certificate by default. Consequently, Adobe displays a yellow question mark stating "Signature validity is unknown". Kagazo validates the signature against the official RCAI root and embeds Long-Term Validation (LTV) so it renders as a verified green tick.'
      },
      {
        q: 'What is the password to open and verify my e-Aadhaar PDF?',
        a: 'The official UIDAI password format is the first 4 letters of your name in CAPITAL LETTERS followed by your 4-digit Year of Birth (e.g. if your name is SURESH KUMAR and birth year is 1992, your password is SURE1992).'
      },
      {
        q: 'Is it safe to upload my Aadhaar document on Kagazo?',
        a: 'Yes, completely safe. Kagazo operates with a strict Zero-Storage Architecture. Your PDF is processed 100% in volatile server memory (RAM) and immediately purged upon completing cryptographic checks. Your Aadhaar number and demographic data are never stored or logged.'
      },
      {
        q: 'आधार कार्ड पर पीला प्रश्न चिह्न (Yellow Question Mark) क्यों आता है?',
        a: 'अडोब एक्रोबैट (Adobe Acrobat) में भारत सरकार के आधिकारिक CCA रूट सर्टिफिकेट पहले से लोड नहीं होते हैं। कागज़ो (Kagazo) इस हस्ताक्षर को तुरंत सत्यापित कर वैध ग्रीन टिक के साथ पीडीएफ सुरक्षित डाउनलोड करने की सुविधा देता है।'
      },
      {
        q: 'Is a Kagazo verified e-Aadhaar valid for government and bank submissions?',
        a: 'Yes. Under Section 5 of the Information Technology Act 2000 and UIDAI circulars, a digitally verified e-Aadhaar bearing an authenticated digital signature has full legal evidentiary status equal to the physical Aadhaar letter.'
      }
    ],
    published: true,
    updated_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'seo-2',
    slug: 'verify-community-certificate-tamil-nadu',
    title: 'Verify Tamil Nadu Community Certificate Signature | Kagazo',
    h1: 'Verify Tamil Nadu Community Certificate Digital Signature',
    meta_description: 'Verify digital signature on Tamil Nadu revenue department community certificate issued via e-Sevai / TNeGA portal.',
    meta_keywords: 'tamil nadu community certificate verify, tnega digital signature, esevai certificate verification, tnea counseling signature verify, சான்றிதழ் கையொப்பம் சரிபார்க்க, community certificate signature not verified tamil, tn community certificate green tick, வருவாய் துறை சான்றிதழ் கையொப்பம்',
    intro_text: 'Authenticates digitally signed caste and community certificates issued by Revenue Authorities across all 38 districts of Tamil Nadu. Validate the Zonal Deputy Tahsildar signature token.',
    doc_type: 'Community Certificate',
    state: 'Tamil Nadu',
    portal: 'Tamil Nadu e-District / TNeGA',
    portal_description: `The Tamil Nadu e-Governance Agency (TNeGA) operates the state's flagship e-Sevai platform, enabling citizens to obtain digitally certified caste, community, nativity, and income records. Every certificate is processed through the Revenue Administration workflow and electronically approved by a Zonal Deputy Tahsildar.

The issued certificate features an official government emblem, a verifiable Application Reference Number, and an electronic signature issued by the National Informatics Centre (NIC) Sub-CA for Tamil Nadu.

Students applying for college counseling through TNEA, medical seats through TN Medical Selection, and government posts through TNPSC are required to produce verified digital certificates without unauthenticated signature warnings.`,
    direct_answer: 'Tamil Nadu e-Sevai community certificates show an unverified signature warning because default PDF readers lack the NIC Tamil Nadu Sub-CA certificate. Kagazo verifies the Deputy Tahsildar\'s digital signature token against the Controller of Certifying Authorities (CCA) India hierarchy, permanently embedding an LTV green checkmark.',
    faq: [
      {
        q: 'How do I verify the digital signature on my TNeGA community certificate?',
        a: 'Upload your certificate PDF downloaded from the e-Sevai portal to Kagazo. The system parses the PKCS#7 signature container, checks the Deputy Tahsildar\'s signing token against the NIC Sub-CA root, and confirms zero unauthorized alterations.'
      },
      {
        q: 'டிஜிட்டல் கையொப்பம் ஏன் சரிபார்க்கப்படவில்லை (Yellow Question Mark) என காட்டுகிறது?',
        a: 'அடோப் அக்ரோபேட் ரீடர் போன்ற மென்பொருட்களில் தமிழ்நாடு அரசு மற்றும் NIC-ன் ரூட் சான்றிதழ் இயல்பாக நிறுவப்படாததால் மஞ்சள் கேள்விக்குறி காட்டுகிறது. காகசோ (Kagazo) தளம் உங்கள் சான்றிதழின் கையொப்பத்தை CCA விதிகளின்படி உடனடியாக சரிபார்த்து நிரந்தர பச்சை டிக் (Green Tick) வழங்கி பதிவிறக்க உதவுகிறது.'
      },
      {
        q: 'Who is the authorized signer on Tamil Nadu revenue certificates?',
        a: 'Certificates are signed by the Zonal Deputy Tahsildar (or Headquarters Deputy Tahsildar in select taluks) using a Class 2/3 Digital Signature Certificate (DSC) issued by NIC under CCA India.'
      },
      {
        q: 'Why was my community certificate flagged as unverified during TNEA counseling?',
        a: 'Counseling scrutiny committees look for a cryptographically verified green checkmark. If viewed in unconfigured PDF software, it shows an unverified question mark. Kagazo fixes this by validating the certificate and appending Long-Term Validation (LTV).'
      }
    ],
    published: true,
    updated_at: '2026-09-02T11:00:00Z',
  },
  {
    id: 'seo-3',
    slug: 'verify-nativity-certificate-tamil-nadu',
    title: 'Verify Tamil Nadu Nativity Certificate Signature | Kagazo',
    h1: 'Verify Tamil Nadu Nativity Certificate Digital Signature',
    meta_description: 'Check digital signature authenticity on Tamil Nadu nativity and residence certificates issued via TNeGA.',
    meta_keywords: 'tamil nadu nativity certificate signature, verify esevai residence certificate, tnega nativity green tick',
    intro_text: 'Verify that your Tamil Nadu nativity certificate is digitally signed and untouched since issuance by the Revenue Administration. Instant verification against NIC Sub-CA.',
    doc_type: 'Nativity Certificate',
    state: 'Tamil Nadu',
    portal: 'Tamil Nadu e-Sevai Portal',
    portal_description: `The Nativity Certificate in Tamil Nadu confirms a candidate's domicile and residency status within the state. It is a mandatory requirement for admissions under state quota quotas in professional courses (Engineering, MBBS, BDS) and recruitment in state public sector enterprises.

Issued under the authority of the Commissioner of Revenue Administration and Disaster Management, each certificate is generated through the e-District application and cryptographically sealed.

Kagazo confirms the integrity of the document, validating that the electronic record matches the original issuance parameters without tampering.`,
    faq: [
      {
        q: 'What does a valid nativity certificate signature contain?',
        a: 'It contains the name of the revenue officer, their designated Taluk and District, the timestamp of approval, and the cryptographic thumbprint issued by the NIC Certifying Authority.'
      },
      {
        q: 'Can Kagazo detect if an e-Sevai PDF has been modified?',
        a: 'Yes. Kagazo performs ByteRange checking. If even a single pixel or character of text (such as name, address, or date) has been edited using PDF editors, the cryptographic hash verification will immediately fail and flag the document as invalid.'
      }
    ],
    published: true,
    updated_at: '2026-09-03T12:00:00Z',
  },
  {
    id: 'seo-4',
    slug: 'verify-income-certificate',
    title: 'Verify Income Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Income Certificate Digital Signature',
    meta_description: 'Verify government income certificate digital signature across Tamil Nadu, Karnataka, AP, Telangana and other states.',
    meta_keywords: 'income certificate verify online, revenue income certificate signature, tahsildar dsc verification, scholarship income certificate verify',
    intro_text: 'Confirm the cryptographic validity of income certificates issued for scholarship, fee reimbursement, and government welfare schemes. Detects unauthorized edits and validates tahsildar DSC.',
    doc_type: 'Income Certificate',
    state: 'All India',
    portal: 'State Revenue e-District Portals',
    portal_description: `Income Certificates are issued by state revenue departments across India to certify the annual income of an applicant's family. They form the foundational criterion for determining eligibility for post-matric scholarships, fee concessions, EWS reservations, and social welfare pensions.

Digital income certificates are issued through state e-District platforms (such as Nadakacheri in Karnataka, Meeseva in Andhra Pradesh & Telangana, e-District in UP and Maharashtra, and TNeGA in Tamil Nadu).

Kagazo supports all state revenue portals operating under the Controller of Certifying Authorities (CCA) India hierarchy.`,
    faq: [
      {
        q: 'Can I submit a Kagazo verified income certificate for national scholarships?',
        a: 'Yes. Kagazo verifies the document against the Indian National PKI hierarchy and embeds LTV proof, ensuring educational institutions and verification officers see a verified green tick.'
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
    title: 'Verify e-PAN Card Digital Signature Online | Kagazo',
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
        a: 'When verified on Kagazo, a genuine e-PAN will display the signer identity as "Protean eGov Technologies Limited" or "UTI Infrastructure Technology And Services Limited" with a certificate issued by an approved Indian CA (such as eMudhra or NIC).'
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
    title: 'Verify DigiLocker Issued Document Signature | Kagazo',
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
        q: 'Does Kagazo support DigiLocker educational certificates?',
        a: 'Yes. Kagazo verifies digital signatures on CBSE marksheets, university degree certificates, migration certificates, and state board transcripts issued via DigiLocker.'
      }
    ],
    published: true,
    updated_at: '2026-09-06T15:00:00Z',
  },
  {
    id: 'seo-7',
    slug: 'verify-epfo-uan-card',
    title: 'Verify EPFO UAN Card & Passbook Signature | Kagazo',
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
    title: 'Verify Income Tax ITR-V Acknowledgment Signature | Kagazo',
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
  },
  {
    id: 'seo-9',
    slug: 'verify-birth-certificate',
    title: 'Verify Birth Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Government Birth Certificate Digital Signature',
    meta_description: 'Verify digital signature on birth certificates issued by CRSTN Tamil Nadu, MeeSeva AP/TS, eJanma Karnataka, and Sevana Kerala.',
    meta_keywords: 'verify birth certificate signature, crstn birth certificate verify, ejanma birth certificate signature, sevana birth certificate verify, meeseva birth certificate signature',
    intro_text: 'Verify the cryptographic digital signature on government-issued birth certificates from municipal corporations, town panchayats, and state civil registration systems across India.',
    doc_type: 'Birth Certificate',
    state: 'All India',
    portal: 'Civil Registration Systems (CRSTN / eJanma / Sevana / MeeSeva)',
    portal_description: `Birth Certificates in India are issued under the Registration of Births and Deaths Act, 1969. In modern digitized administrations (such as CRSTN in Tamil Nadu, eJanma in Karnataka, Sevana Civil Registration in Kerala, and MeeSeva/GHMC in Andhra Pradesh and Telangana), birth certificates are electronically signed by the Sanitary Inspector, Health Officer, or Municipal Registrar using official Class 2/3 Digital Signature Certificates (DSC).

These digital records are mandatory for school and college admissions, passport issuance, visa processing, and national identity creation.

Kagazo cryptographically audits the PKCS#7 digital signature against the National Informatics Centre (NIC) and Root Certifying Authority of India (RCAI) hierarchy, ensuring zero tampering and embedding a permanent green tick.`,
    faq: [
      {
        q: 'Why does my downloaded birth certificate display a yellow question mark?',
        a: 'Official birth certificates are signed using CCA India licensed root keys (such as NIC CA). Default desktop and mobile PDF readers do not include these government keys in their trust list, flagging the signature as "validity unknown". Kagazo verifies the root hierarchy and applies a permanent verified green checkmark.'
      },
      {
        q: 'Is a Kagazo verified birth certificate valid for passport and visa applications?',
        a: 'Yes. Under Section 5 of the Information Technology Act, 2000, a digitally authenticated electronic record carries full legal validity across all Passport Seva Kendras (PSK), foreign embassies, and educational boards.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T10:00:00Z',
  },
  {
    id: 'seo-10',
    slug: 'verify-death-certificate',
    title: 'Verify Death Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Government Death Certificate Digital Signature',
    meta_description: 'Verify digital signatures on death certificates issued by CRSTN Tamil Nadu, eJanma, Sevana, and municipal corporations for legal and insurance claims.',
    meta_keywords: 'verify death certificate digital signature, crstn death certificate verify, insurance claim death certificate verification, ejanma death certificate signature',
    intro_text: 'Authenticate the electronic digital signature on official death certificates issued by state health departments and municipal civil registration portals.',
    doc_type: 'Death Certificate',
    state: 'All India',
    portal: 'State Civil Registration Systems & Municipal Portals',
    portal_description: `Death certificates are critical legal documents required for insurance claim settlements, bank account survivor claims, pension transfers, and legal heir succession.

State government civil registration systems (such as Tamil Nadu CRSTN, Karnataka eJanma, and Kerala Sevana) generate electronically signed certificates with embedded cryptographic hashes to eliminate forged records.

Kagazo verifies the digital signature against India's CCA root certificates, confirming that the death registration entry is genuine and unedited since its registration.`,
    faq: [
      {
        q: 'Will banks and insurance companies accept a digital death certificate with a question mark?',
        a: 'Many bank managers and insurance claim investigators reject certificates with unverified yellow question marks, requesting a certified copy with a verified green tick. Kagazo validates the signature and provides an LTV-stamped copy with a permanent green checkmark.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T11:00:00Z',
  },
  {
    id: 'seo-11',
    slug: 'verify-first-graduate-certificate',
    title: 'Verify Tamil Nadu First Graduate Certificate Signature | Kagazo',
    h1: 'Verify Tamil Nadu First Graduate Certificate Digital Signature',
    meta_description: 'Verify digital signature on Tamil Nadu First Graduate certificate issued via TNeGA / e-Sevai for TNEA engineering counseling tuition concession.',
    meta_keywords: 'verify first graduate certificate, tnega first graduate signature verify, tnea first graduate concession verification, esevai first graduate green tick',
    intro_text: 'Validate the digital signature of the Zonal Deputy Tahsildar on Tamil Nadu First Graduate certificates required for professional college tuition fee concessions.',
    doc_type: 'First Graduate Certificate',
    state: 'Tamil Nadu',
    portal: 'TNeGA / Tamil Nadu e-District',
    portal_description: `The First Graduate Certificate is issued by the Tamil Nadu Revenue Department to students whose family members (parents and siblings) have not completed an undergraduate degree. This certificate grants eligible students a substantial tuition fee waiver in professional engineering (TNEA), medical, and agricultural counseling seats.

Each certificate is signed by the Headquarters or Zonal Deputy Tahsildar through the e-Sevai portal using NIC Tamil Nadu CA cryptographic tokens.

Kagazo verifies the Deputy Tahsildar's signature, ensuring that counseling authorities at Anna University and DOTE accept your document without procedural delays.`,
    faq: [
      {
        q: 'Why must my First Graduate certificate show a verified green tick for TNEA counseling?',
        a: 'TNEA admission scrutiny teams verify that the e-Sevai certificate has not been forged or altered. A verified green checkmark confirms that the digital certificate was authenticated against the official state NIC CA.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T12:00:00Z',
  },
  {
    id: 'seo-12',
    slug: 'verify-legal-heir-certificate',
    title: 'Verify Legal Heir Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Legal Heir (Varisu) Certificate Digital Signature',
    meta_description: 'Verify digital signature on Legal Heir (Varisu) certificates issued by Tahsildar / Revenue Department for property transfer and bank settlements.',
    meta_keywords: 'verify legal heir certificate signature, varisu certificate digital signature verify, tahsildar legal heir signature, bank settlement legal heir verification',
    intro_text: 'Check the digital signature authenticity on Legal Heir (Varisu) certificates issued by state Revenue Authorities for asset succession and settlement.',
    doc_type: 'Legal Heir Certificate',
    state: 'All India',
    portal: 'State Revenue Department / e-District',
    portal_description: `A Legal Heir Certificate (known as Varisu Sanrithazh in Tamil Nadu) is issued by the Tahsildar to establish the legitimate surviving family members of a deceased person. It is an essential legal instrument for transferring real estate titles, claiming Provident Fund and gratuity, claiming life insurance, and transferring vehicle registrations.

Because revenue authorities digitally sign these certificates under the Controller of Certifying Authorities (CCA) framework, any post-approval modification invalidates the digital seal.

Kagazo confirms the document's byte-level integrity and ensures the Tahsildar's digital signature is cryptographically valid.`,
    faq: [
      {
        q: 'How does Kagazo verify a Legal Heir certificate?',
        a: 'Kagazo inspects the PKCS#7 signature container in the PDF, validates the certificate chain against the State NIC Sub-CA, and checks for any post-signing document alterations.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T13:00:00Z',
  },
  {
    id: 'seo-13',
    slug: 'verify-form-16',
    title: 'Verify Form 16 / 16A TDS Certificate Digital Signature | Kagazo',
    h1: 'Verify Form 16 & Form 16A Digital Signature Online',
    meta_description: 'Verify digital signature on TRACES CPC Form 16 and 16A salary tax deduction certificates. Password-ready verification for home loans and ITR filing.',
    meta_keywords: 'verify form 16 signature, traces form 16 digital signature verify, form 16a signature verification, tds certificate green tick',
    intro_text: 'Validate the cryptographic digital signature on employer-issued Form 16 and Form 16A TDS certificates downloaded from the TRACES Income Tax portal.',
    doc_type: 'Form 16 / 16A',
    state: 'All India',
    portal: 'TRACES CPC / Income Tax Department',
    portal_description: `Form 16 is the annual Certificate of Tax Deducted at Source (TDS) on salary issued by employers under Section 203 of the Income Tax Act, 1961. Downloaded directly from the TRACES portal (TDS Reconciliation Analysis and Correction Enabling System), it contains Part A (tax deducted and deposited with the central government) and Part B (salary breakup and deductions).

Authentic Form 16 files are digitally signed by the employer's authorized representative using Class 3 DSCs issued under licensed Indian CAs (eMudhra, Capricorn, Pantasign, IDsign).

Kagazo supports password-protected Form 16 files (usually your PAN in capital letters) and validates the employer's signing certificate instantly.`,
    faq: [
      {
        q: 'What is the password to open my Form 16 PDF?',
        a: 'Most employer Form 16 PDFs are protected by your 10-digit PAN number in CAPITAL letters (e.g., ABCDE1234F), or your PAN followed by your Date of Birth in DDMMYYYY format.'
      },
      {
        q: 'Why do home loan officers check the signature on Form 16?',
        a: 'Mortgage lenders verify Form 16 digital signatures to prevent salary inflation fraud and ensure that tax deductions correspond directly to government TRACES records.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T14:00:00Z',
  },
  {
    id: 'seo-14',
    slug: 'verify-driving-licence-pdf',
    title: 'Verify Driving Licence PDF Digital Signature Online | Kagazo',
    h1: 'Verify MoRTH Parivahan Driving Licence Digital Signature',
    meta_description: 'Verify digital signature on electronic Driving Licence PDFs downloaded from MoRTH Parivahan and DigiLocker.',
    meta_keywords: 'verify driving licence signature, parivahan dl digital signature verify, digilocker driving license green tick, rto driving licence verification',
    intro_text: 'Confirm the digital signature and authenticity of electronic Driving Licences issued by Regional Transport Offices (RTOs) through MoRTH Parivahan Sarathi.',
    doc_type: 'Driving Licence',
    state: 'All India',
    portal: 'MoRTH Parivahan Sarathi / DigiLocker',
    portal_description: `The Ministry of Road Transport and Highways (MoRTH) operates the Sarathi national portal for driving licence issuance across all Indian states and Union Territories.

Electronic DLs issued through DigiLocker or downloaded from Sarathi contain a cryptographic digital seal signed by the National Informatics Centre Transport Division.

Kagazo verifies the integrity of your digital driving licence, confirming it has not been altered for traffic police checks or commercial driver onboarding.`,
    faq: [
      {
        q: 'Is a Kagazo verified digital driving licence accepted by traffic police?',
        a: 'Yes. Under Ministry of Road Transport & Highways guidelines and the IT Act 2000, digitally verified driving licences carrying authentic PKI credentials are fully valid on mobile screens.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T15:00:00Z',
  },
  {
    id: 'seo-15',
    slug: 'verify-vehicle-rc-pdf',
    title: 'Verify Vehicle RC PDF Digital Signature Online | Kagazo',
    h1: 'Verify Vehicle Registration Certificate (RC) Digital Signature',
    meta_description: 'Verify digital signature on Vehicle Registration Certificate (RC) PDFs from MoRTH Vahan and DigiLocker. Ensure genuine vehicle ownership proof.',
    meta_keywords: 'verify vehicle rc signature, vahan rc digital signature verify, digilocker rc green tick, rto vehicle registration certificate verification',
    intro_text: 'Verify the electronic signature on Vehicle Registration Certificates (RC) issued through the MoRTH Vahan 4.0 portal and DigiLocker repository.',
    doc_type: 'Vehicle RC',
    state: 'All India',
    portal: 'MoRTH Vahan 4.0 / DigiLocker',
    portal_description: `Vehicle Registration Certificates (RC) issued through the Vahan 4.0 national portal certify vehicle ownership, engine/chassis numbers, emission compliance, and hypothecation details with banks.

Digital RC documents downloaded via DigiLocker are digitally signed by MoRTH Vahan using authorized government DSCs.

Kagazo checks the digital signature against the CCA India root chain, verifying vehicle credentials prior to second-hand vehicle purchases or insurance claims.`,
    faq: [
      {
        q: 'Why should I verify a vehicle RC before buying a used car or bike?',
        a: 'Scammers frequently edit chassis numbers or hypothecation status on downloaded PDF registration certificates. Kagazo\'s cryptographic verification fails immediately if any text has been modified.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T16:00:00Z',
  },
  {
    id: 'seo-16',
    slug: 'verify-obc-certificate',
    title: 'Verify Central OBC Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Central Government OBC Non-Creamy Layer Certificate Signature',
    meta_description: 'Verify digital signature on Central Government OBC Non-Creamy Layer certificates issued for UPSC, SSC, banking, and central universities.',
    meta_keywords: 'verify central obc certificate signature, obc non creamy layer digital signature, upsc obc certificate verify, ssc obc certificate signature',
    intro_text: 'Validate digital signatures on Central OBC Non-Creamy Layer (NCL) certificates issued by Revenue Authorities for Central Government civil service and competitive exam reservations.',
    doc_type: 'Central OBC Certificate',
    state: 'All India',
    portal: 'State Revenue Portals for Central Government',
    portal_description: `Other Backward Class (OBC) certificates for Central Government recruitment (UPSC Civil Services, SSC CGL, Banking, Railways) and admissions (IITs, IIMs, Central Universities) require strict compliance with the central OBC list and Non-Creamy Layer income ceilings.

Issued by authorized revenue officers (Tahsildar, Sub-Divisional Magistrate, or Revenue Divisional Officer), these certificates carry digital signatures issued under the National Informatics Centre (NIC) CA.

Kagazo confirms the digital signature authenticity, protecting candidates from document disqualification during recruitment scrutiny.`,
    faq: [
      {
        q: 'Does Kagazo verify OBC certificates from all Indian states?',
        a: 'Yes. Kagazo validates central OBC certificates issued across Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Uttar Pradesh, Maharashtra, Kerala, and all other Indian states.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T17:00:00Z',
  },
  {
    id: 'seo-17',
    slug: 'verify-meeseva-caste-certificate',
    title: 'Verify MeeSeva Integrated Caste Certificate Signature | Kagazo',
    h1: 'Verify AP & Telangana MeeSeva Caste Certificate Digital Signature',
    meta_description: 'Verify digital signature on Andhra Pradesh and Telangana MeeSeva integrated caste certificates issued by Mandal Revenue Officers (MRO).',
    meta_keywords: 'meeseva caste certificate verify, ap meeseva digital signature, ts meeseva caste certificate verification, mro digital signature verify',
    intro_text: 'Confirm the digital signature of the Mandal Revenue Officer (MRO) on integrated community and caste certificates issued via Andhra Pradesh and Telangana MeeSeva.',
    doc_type: 'MeeSeva Caste Certificate',
    state: 'AP & Telangana',
    portal: 'MeeSeva Portal (APOnline & TSOnline)',
    portal_description: `MeeSeva is the integrated digital citizen service gateway of Andhra Pradesh and Telangana. Integrated Caste Certificates issued through MeeSeva are essential for education admissions under reservation quotas, social welfare scholarships, and state public service recruitments (APPSC & TGPSC).

Every MeeSeva certificate is digitally signed by the jurisdictional Mandal Revenue Officer (MRO) / Tahsildar using official government digital tokens.

Kagazo checks the MeeSeva digital signature against the CCA India hierarchy, turning unverified yellow question marks into permanent green checkmarks.`,
    faq: [
      {
        q: 'How do I know if my MeeSeva certificate digital signature is genuine?',
        a: 'Kagazo checks the cryptographic signature container, confirming the MRO\'s name, Mandal revenue designation, and the NIC AP/Telangana Sub-CA issuing chain.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T18:00:00Z',
  },
  {
    id: 'seo-18',
    slug: 'verify-nadakacheri-certificate',
    title: 'Verify Karnataka Nadakacheri Caste & Income Certificate | Kagazo',
    h1: 'Verify Karnataka Nadakacheri Digital Certificate Signature',
    meta_description: 'Verify digital signature on Karnataka Nadakacheri (Atalji Janasnehi Kendra) caste, income, and residence certificates for KEA KCET counseling.',
    meta_keywords: 'nadakacheri certificate verify, karnataka caste income certificate signature verify, ajsk nadakacheri green tick, kcet document verification',
    intro_text: 'Validate the digital signature of Tahsildars and Revenue Inspectors on Karnataka Nadakacheri (AJSK) caste, income, and 371(J) domicile certificates.',
    doc_type: 'Nadakacheri Certificate',
    state: 'Karnataka',
    portal: 'Nadakacheri (Atalji Janasnehi Kendra) Karnataka',
    portal_description: `Nadakacheri (Atalji Janasnehi Kendra - AJSK) is the Karnataka state government platform for citizen certificates, including Caste (Category 1, 2A, 2B, 3A, 3B, SC, ST), Income, and Residence certificates.

These certificates are mandatory for Karnataka Examination Authority (KEA) KCET engineering and medical counseling, state scholarships (SSP), and government recruitments (KPSC).

Kagazo validates the Revenue Inspector / Tahsildar digital signature under the CCA India trust chain, ensuring zero document rejection at counseling centers.`,
    faq: [
      {
        q: 'Is this verification required for KEA KCET document verification?',
        a: 'Yes. KEA document verification centers require certificates to have valid, authentic digital signatures without signature unknown errors.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T19:00:00Z',
  },
  {
    id: 'seo-19',
    slug: 'verify-up-edistrict-certificate',
    title: 'Verify UP e-District Certificate Digital Signature Online | Kagazo',
    h1: 'Verify UP e-District Niwas, Jati & Aay Praman Patra Signature',
    meta_description: 'Verify digital signatures on Uttar Pradesh e-District certificates: Niwas (Domicile), Jati (Caste), and Aay (Income) Praman Patra.',
    meta_keywords: 'up edistrict certificate verify, niwas praman patra signature verify, jati praman patra digital signature, aay praman patra up verify',
    intro_text: 'Authenticate the digital signature on Uttar Pradesh e-District revenue certificates including Niwas (Domicile), Jati (Caste), and Aay (Income) Praman Patra.',
    doc_type: 'UP e-District Certificate',
    state: 'Uttar Pradesh',
    portal: 'Uttar Pradesh e-District Portal (CeG)',
    portal_description: `The Center for e-Governance (CeG) and Revenue Department of Uttar Pradesh issue citizen certificates electronically through the UP e-District portal (edistrict.up.gov.in).

Certificates for Niwas Praman Patra (Domicile), Jati Praman Patra (Caste), and Aay Praman Patra (Income) are digitally approved by Tehsildars and Sub-Divisional Magistrates (SDM).

Kagazo verifies the digital signature token issued by the National Informatics Centre UP State Unit, ensuring your certificate is authentic for UPSSSC, UP Police, and state scholarship portals.`,
    faq: [
      {
        q: 'How does Kagazo fix the yellow question mark on UP Praman Patra PDFs?',
        a: 'Kagazo validates the Tehsildar\'s digital signature against India\'s Root Certifying Authority and adds an LTV-compliant Document Security Store, displaying a permanent green checkmark.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T20:00:00Z',
  },
  {
    id: 'seo-20',
    slug: 'verify-aaple-sarkar-certificate',
    title: 'Verify Maharashtra Aaple Sarkar Certificate Signature | Kagazo',
    h1: 'Verify Maharashtra Aaple Sarkar Domicile & Caste Certificate',
    meta_description: 'Verify digital signatures on Maharashtra Aaple Sarkar certificates: Domicile, Caste, Non-Creamy Layer, and Income certificates.',
    meta_keywords: 'aaple sarkar certificate verify, maharashtra domicile certificate digital signature, mahaonline caste certificate verify, mht cet document verification',
    intro_text: 'Confirm the digital signature on Maharashtra Aaple Sarkar (MahaOnline) government certificates including Domicile, Caste, and Non-Creamy Layer documents.',
    doc_type: 'Aaple Sarkar Certificate',
    state: 'Maharashtra',
    portal: 'Aaple Sarkar Portal (MahaOnline)',
    portal_description: `Aaple Sarkar is the Government of Maharashtra's public service delivery platform. Citizen certificates for Domicile, Caste, Non-Creamy Layer (NCL), and Income are electronically processed by Talathis and digitally signed by Sub-Divisional Officers (SDO) or Tehsildars.

These certificates are essential for MHT CET counseling, MahaDBT scholarship applications, and MPSC recruitment.

Kagazo cryptographically audits the MahaOnline electronic certificate signature, ensuring compliance with state and national PKI standards.`,
    faq: [
      {
        q: 'Why does my Maharashtra Domicile certificate show "Validity Unknown"?',
        a: 'Standard PDF viewers do not bundle the Indian NIC Maharashtra Sub-CA certificate in their trusted store. Kagazo validates the signature and provides a permanent verified green tick.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T21:00:00Z',
  },
  {
    id: 'seo-21',
    slug: 'verify-widow-certificate',
    title: 'Verify Widow Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Government Widow Certificate Digital Signature',
    meta_description: 'Verify digital signatures on government widow certificates issued by Revenue Authorities for pensions, job reservations, and welfare support.',
    meta_keywords: 'verify widow certificate signature, destitute widow certificate digital signature, tnega widow certificate verify, pension widow certificate verification',
    intro_text: 'Validate the digital signature on official Widow Certificates issued by state Revenue Authorities for government welfare pensions and recruitment concessions.',
    doc_type: 'Widow Certificate',
    state: 'All India',
    portal: 'State Revenue Department & Social Welfare Portals',
    portal_description: `Widow Certificates and Destitute Widow Certificates are issued by the Revenue Administration (Tahsildar / Revenue Divisional Officer) to verify an applicant's marital and financial status following the death of their spouse.

These certificates are crucial for claiming family pensions, government recruitment fee waivers and age relaxations (such as TNPSC and state PSCs), and welfare support.

Kagazo verifies the Tahsildar's cryptographic signature against the state's licensed certifying authority.`,
    faq: [
      {
        q: 'What is verified on a Widow Certificate?',
        a: 'Kagazo confirms that the revenue authority\'s cryptographic signature is intact, that the document has not been tampered with, and that it traces to the official government root CA.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T22:00:00Z',
  },
  {
    id: 'seo-22',
    slug: 'verify-solvency-certificate',
    title: 'Verify Solvency Certificate Digital Signature Online | Kagazo',
    h1: 'Verify Government Solvency Certificate Digital Signature',
    meta_description: 'Verify digital signatures on Revenue Department solvency certificates for government tenders, PWD contracts, and financial guarantees.',
    meta_keywords: 'verify solvency certificate signature, tahsildar solvency certificate verify, pwd tender solvency certificate verification, revenue solvency certificate green tick',
    intro_text: 'Confirm the digital signature on Revenue Department Solvency Certificates issued for government tenders, commercial contracts, and financial stability proof.',
    doc_type: 'Solvency Certificate',
    state: 'All India',
    portal: 'State Revenue Administration / e-District',
    portal_description: `A Solvency Certificate certifies the financial soundness and asset valuation of an individual or business entity. Issued by the Tahsildar, Revenue Divisional Officer, or District Collector, it is mandatory for bidding on government contracts (PWD, Highways, Municipalities), obtaining customs licenses, and securing legal bails.

Because tender scrutiny committees strictly evaluate solvency certificates, digital signature validity is scrutinized to prevent forged property valuation certificates.

Kagazo validates the revenue officer's signature against the official state CCA hierarchy.`,
    faq: [
      {
        q: 'Why do tender committees require verified digital signatures on solvency certificates?',
        a: 'Government procurement guidelines require digital verification to prevent fraudulent bids supported by fake financial solvency documents.'
      }
    ],
    published: true,
    updated_at: '2026-09-09T23:00:00Z',
  },
  {
    id: 'seo-23',
    slug: 'verify-deserted-woman-certificate',
    title: 'Verify Deserted Woman Certificate Digital Signature | Kagazo',
    h1: 'Verify Deserted Woman Certificate Digital Signature',
    meta_description: 'Verify digital signature on Deserted Woman certificates issued by the Revenue Department for government reservations and social welfare schemes.',
    meta_keywords: 'verify deserted woman certificate signature, tnega deserted woman certificate verify, social welfare certificate digital signature',
    intro_text: 'Validate the electronic signature on Deserted Woman Certificates issued by Revenue Authorities for special category quotas and welfare assistance.',
    doc_type: 'Deserted Woman Certificate',
    state: 'Tamil Nadu',
    portal: 'TNeGA / Revenue Administration',
    portal_description: `Deserted Woman Certificates are issued by the Revenue Department (Tahsildar / RDO) to certify women who have been deserted by their husbands for a statutory minimum duration without maintenance.

This certification provides eligibility for state government employment reservations, educational support, and social welfare pensions.

Kagazo validates the digital certificate token, ensuring seamless document verification at government welfare desks.`,
    faq: [
      {
        q: 'How does Kagazo verify this certificate?',
        a: 'Kagazo checks the digital signature embedded in the e-Sevai PDF against the NIC Tamil Nadu Sub-CA and verifies that the document contents are untouched.'
      }
    ],
    published: true,
    updated_at: '2026-09-10T10:00:00Z',
  },
  {
    id: 'seo-24',
    slug: 'verify-intercaste-marriage-certificate',
    title: 'Verify Inter-caste Marriage Certificate Signature | Kagazo',
    h1: 'Verify Inter-caste Marriage Certificate Digital Signature',
    meta_description: 'Verify digital signatures on government Inter-caste Marriage certificates for social welfare incentive schemes and priority reservations.',
    meta_keywords: 'verify intercaste marriage certificate signature, tnega intercaste marriage certificate verify, social welfare gold coin scheme signature',
    intro_text: 'Verify the cryptographic digital signature on Inter-caste Marriage certificates issued by state Social Welfare and Revenue Departments.',
    doc_type: 'Inter-caste Marriage Certificate',
    state: 'Tamil Nadu',
    portal: 'TNeGA / Social Welfare Department',
    portal_description: `Inter-caste Marriage Certificates are issued by the Revenue and Social Welfare Departments to couples where one spouse belongs to SC/ST or Backward Communities.

These certificates are required for claiming financial assistance incentives (such as Tamil Nadu's Dr. Muthulakshmi Reddy Ninaivu Scheme) and priority appointments in state public services.

Kagazo confirms the cryptographic digital signature and validates the document security chain.`,
    faq: [
      {
        q: 'What is verified on an Inter-caste Marriage certificate?',
        a: 'Kagazo verifies the Tahsildar / Social Welfare Officer digital signature token, validating the certificate against the CCA India root hierarchy.'
      }
    ],
    published: true,
    updated_at: '2026-09-10T11:00:00Z',
  },
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

  // Fallback to in-memory mock SEO pages (24 comprehensive landing pages)
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
 * Maps a detected document type or title to its exact SEO slug.
 * Prioritizes specific keywords to prevent miscategorization,
 * and safely falls back to anchor '#upload-zone' instead of falsely redirecting to Aadhaar.
 */
export function getSeoSlugForDocType(docType: string): string {
  const dt = (docType || '').toLowerCase().trim();

  // 1. Tax & TDS (must come BEFORE generic income)
  if (dt.includes('itr') || dt.includes('tax return')) return 'verify-itr-acknowledgement';
  if (dt.includes('form 16') || dt.includes('form16') || dt.includes('tds')) return 'verify-form-16';

  // 2. Identity & PAN
  if (dt.includes('aadhaar')) return 'verify-aadhaar-pdf';
  if (dt.includes('pan') || dt.includes('permanent account')) return 'verify-pan-card-pdf';

  // 3. Transport & DigiLocker
  if (dt.includes('driving') || dt.includes('licence') || dt.includes('license') || dt === 'dl') return 'verify-driving-licence-pdf';
  if (dt.includes('vehicle rc') || dt.includes('registration certificate') || dt === 'rc') return 'verify-vehicle-rc-pdf';
  if (dt.includes('digilocker')) return 'verify-digilocker-pdf';

  // 4. Civil Registration (Birth & Death)
  if (dt.includes('birth')) return 'verify-birth-certificate';
  if (dt.includes('death')) return 'verify-death-certificate';

  // 5. Educational & Succession
  if (dt.includes('first graduate')) return 'verify-first-graduate-certificate';
  if (dt.includes('legal heir') || dt.includes('varisu')) return 'verify-legal-heir-certificate';

  // 6. Caste & Category Certificates
  if (dt.includes('meeseva') && (dt.includes('caste') || dt.includes('community'))) return 'verify-meeseva-caste-certificate';
  if (dt.includes('nadakacheri')) return 'verify-nadakacheri-certificate';
  if (dt.includes('obc') || dt.includes('backward class')) return 'verify-obc-certificate';
  if (dt.includes('community') || dt.includes('caste')) return 'verify-community-certificate-tamil-nadu';

  // 7. Residence, Domicile & Nativity
  if (dt.includes('nativity') || dt.includes('residence') || dt.includes('domicile') || dt.includes('niwas')) return 'verify-nativity-certificate-tamil-nadu';

  // 8. State Specific Portals
  if (dt.includes('up e-district') || dt.includes('up edistrict') || dt.includes('uttar pradesh')) return 'verify-up-edistrict-certificate';
  if (dt.includes('aaple sarkar') || dt.includes('maharashtra')) return 'verify-aaple-sarkar-certificate';

  // 9. Social Welfare & Special Certificates
  if (dt.includes('widow')) return 'verify-widow-certificate';
  if (dt.includes('solvency')) return 'verify-solvency-certificate';
  if (dt.includes('deserted')) return 'verify-deserted-woman-certificate';
  if (dt.includes('intercaste') || dt.includes('inter-caste')) return 'verify-intercaste-marriage-certificate';

  // 10. Financial / Income / EPFO
  if (dt.includes('income')) return 'verify-income-certificate';
  if (dt.includes('epfo') || dt.includes('uan')) return 'verify-epfo-uan-card';

  // Safe Fallback: anchor to upload zone instead of falsely claiming it's an Aadhaar!
  return '#upload-zone';
}

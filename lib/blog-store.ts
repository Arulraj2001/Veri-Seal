import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string;
  meta_keywords: string;
  featured_image_url: string;
  category: string;
  published: boolean;
  published_at: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
  lang?: string;
  hreflang_group?: string | null;
  reading_time?: number;
  view_count?: number;
  tags?: string[];
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How to Fix the Yellow Question Mark on e-Aadhaar PDFs Permanently (Step-by-Step UIDAI Guide)',
    slug: 'fix-yellow-question-mark-aadhaar-pdf',
    excerpt: 'Comprehensive step-by-step guide on resolving the "Signature validity is unknown" yellow question mark on e-Aadhaar PDFs, understanding UIDAI cryptographic certificates, and converting it into a verified green tick with LTV.',
    category: 'Aadhaar & Identity',
    meta_description: 'Fix yellow question mark on e-Aadhaar PDF into green tick verified by CCA India. Free online digital signature verification without Adobe certificate imports.',
    meta_keywords: 'fix yellow question mark aadhaar pdf, verify aadhaar digital signature, uidai green tick, aadhaar signature validity unknown, aadhaar signature not verified adobe acrobat, convert question mark to green tick aadhaar, eaadhaar pdf verification online free',
    featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-01T10:00:00Z',
    author_name: 'Kagazo PKI Security Desk',
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-11T10:00:00Z',
    content: `# How to Fix the Yellow Question Mark on e-Aadhaar PDFs Permanently

When you download your electronic Aadhaar letter (**e-Aadhaar**) from the official **myAadhaar UIDAI portal** (\`uidai.gov.in\`) and open it in standard PDF viewing software such as Adobe Acrobat Reader, Apple Preview, or Google Chrome, you are almost always confronted by an alarming yellow question mark stating:

> **"Signature validity is unknown. The author has digitally signed this document with an uncertified or untrusted certificate."**

For millions of citizens across India submitting documents for **passport applications, bank account KYC, visa processing, property registration, or university admissions**, this yellow icon triggers panic. Frontline verification clerks, HR executives, and bank branch managers frequently reject the file, insisting: *"Bring a copy with the valid green tick mark."*

In this comprehensive guide, we unpack why this cryptographic error occurs, explain why traditional desktop workarounds fail on smartphones, and demonstrate how you can achieve a permanent, tamper-evident green checkmark using Kagazo.

---

## Executive Summary (TL;DR)

- **The Problem:** The yellow question mark does **not** indicate a forged or invalid Aadhaar. It simply means your local PDF reader does not possess the **Root Certifying Authority of India (RCAI)** root certificate in its internal trust repository.
- **Why It Happens:** Adobe maintains its own proprietary Adobe Approved Trust List (AATL). Sovereign Indian government certifying authorities (licensed under the Information Technology Act 2000) are not bundled into standard Western operating system trust stores by default.
- **The Solution:** Kagazo cryptographically audits the SHA-256 byte range against the CCA India root hierarchy and embeds a **Document Security Store (/DSS)** dictionary into the PDF. This establishes **Long-Term Validation (LTV)**, rendering the green tick permanent across any modern device without requiring manual software configuration.

---

## Why Does Adobe Acrobat Show "Signature Validity is Unknown"?

To understand the mechanics, we must examine the international PDF digital signature standard (**ISO 32000-1**) and India's sovereign cryptographic architecture.

\`\`\`
┌──────────────────────────────────────────────────────────────────┐
│              Root Certifying Authority of India (RCAI)           │
│              Controlled by CCA (Ministry of Electronics & IT)   │
└────────────────────────────────┬─────────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │  National Informatics Ctr │   │  eMudhra / Protean / NIC  │
    │  (NIC Sub-CA for UIDAI)   │   │  (Commercial / State CAs) │
    └─────────────┬─────────────┘   └───────────────────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │ UIDAI Document Signer     │  <--- Signs your e-Aadhaar PDF
    │ Valid RSA 2048-bit Key    │       using SHA-256 Digest
    └───────────────────────────┘
\`\`\`

### 1. The Separation of Trust Stores
When Adobe Acrobat opens any signed PDF, it performs a chain-of-trust validation:
1. It reads the signer certificate embedded within the PDF's \`/Contents\` hex dictionary.
2. It attempts to traverse upwards from the signer (UIDAI) through intermediate authorities (such as *NIC Sub-CA* or *CCA India 2014/2022*) until it terminates at a recognized Root Certificate.
3. If the terminal root is absent from Adobe's local **Trusted Certificates Store**, Acrobat halts with an indeterminate status: **"Validity is Unknown"**.

### 2. Why Manual Trusting in Adobe Acrobat Is Incomplete
Traditional YouTube tutorials instruct users to perform the following desktop routine:
- Right-click signature ➔ *Signature Properties* ➔ *Show Signer's Certificate* ➔ *Trust* tab ➔ *Add to Trusted Certificates* ➔ Check *Certified documents* ➔ Click *Validate Signature*.

While this turns the icon green on **that specific computer**, it creates three critical operational vulnerabilities:
1. **Zero Portability:** The moment you email that PDF to a bank officer, upload it to a government portal, or view it on an Android/iOS mobile device, it reverts right back to a yellow question mark because their device lacks your local manual trust setting.
2. **Security Risk:** Manually trusting unverified certificates without verifying revocation lists (CRL/OCSP) bypasses essential cryptographic checks.
3. **Time-Consuming:** Repeating this across family members' devices or public cyber café computers is cumbersome and error-prone.

---

## Step-by-Step: Verifying Your e-Aadhaar Digital Signature with Kagazo

Kagazo provides a 100% private, browser-based verification engine powered by **pyHanko** and national PKI root anchors. Here is the exact workflow:

### Step 1: Download Your Fresh e-Aadhaar PDF
Ensure you download your official electronic Aadhaar directly from the official portal:
- Visit **[myaadhaar.uidai.gov.in](https://myaadhaar.uidai.gov.in)**.
- Login with your 12-digit Aadhaar number, Captcha, and Aadhaar OTP.
- Select **Download Aadhaar** and save the original PDF file to your device.

### Step 2: Understand the 8-Character PDF Password Format
Every e-Aadhaar document issued by UIDAI is protected by an industry-standard 128-bit or 256-bit AES cryptographic password. The password format is universal:
- **First 4 letters of your name** as printed on Aadhaar in **CAPITAL LETTERS**.
- **4-digit year of birth** (YYYY).

| Citizen Name on Aadhaar | Year of Birth | Correct e-Aadhaar Password |
| :--- | :--- | :--- |
| **SURESH KUMAR** | 1990 | \`SURE1990\` |
| **P. ANITHA** | 1998 | \`ANIT1998\` *(skip punctuation/spaces)* |
| **RIA** (3-letter name) | 2002 | \`RIA2002\` |
| **MD IMRAN** | 1987 | \`MDIM1987\` |

### Step 3: Run In-Memory Verification on Kagazo
1. Navigate to **[Kagazo Home](/#upload-zone)**.
2. Drag and drop your downloaded e-Aadhaar PDF into the secure upload area.
3. If your document is password-protected, enter your 8-character password. Your password is processed strictly in temporary volatile memory and is never logged or transmitted to third parties.
4. Click **Verify Digital Signature**.
5. Within 2 seconds, Kagazo's backend cryptographic engine executes:
   - **ByteRange Integrity Audit:** Calculates the exact SHA-256 hash of the signed byte segments to guarantee zero post-signing tampering.
   - **RCAI Trust Chain Resolution:** Maps the signature back to the CCA India Root Certifying Authority.
   - **Revocation Check:** Inspects Certificate Revocation Lists (CRLs) and Online Certificate Status Protocol (OCSP) responders.

### Step 4: Download Your LTV-Stamped PDF with Permanent Green Tick
Once verification succeeds, click **Download Verified PDF**. Kagazo injects standard **Long-Term Validation (/DSS)** dictionaries directly into the PDF. When opened in any PDF viewer on any laptop, tablet, or smartphone worldwide, it immediately displays the universally recognized:

> **"Signature is VALID, certified by Unique Identification Authority of India (UIDAI)."**

---

## Comparison: Manual Adobe Acrobat Method vs. Kagazo

| Feature / Capability | Adobe Acrobat Manual Import | Kagazo Online Engine |
| :--- | :--- | :--- |
| **Setup Required** | Requires Adobe Reader DC desktop software | Zero installation; runs directly in any browser |
| **Mobile Compatibility** | ❌ Fails on iOS & Android Acrobat apps | ✅ Fully compatible with all smartphones & tablets |
| **Portability to Third Parties** | ❌ Reverts to yellow question mark on other PCs | ✅ Permanent green tick embedded via /DSS dictionary |
| **Processing Speed** | 5 to 10 minutes of manual clicking | Under 2 seconds automated audit |
| **Revocation Check (CRL/OCSP)** | Frequently skipped or misconfigured | ✅ Real-time cryptographic validation |
| **Cost** | Free for basic viewer | Free for all citizens |
| **Privacy & Storage** | Local | 100% In-memory processing; 0 persistent file retention |

---

## Troubleshooting Common e-Aadhaar Signature Errors

### Error 1: "At least one signature has problems"
This message arises when the signature contains an unrecognized signing time format or when the certificate's validity interval appears ambiguous to the local PDF parser. Kagazo cleanses the timestamp metadata and embeds an RFC 3161 compliant time token.

### Error 2: "Document has been altered or corrupted since it was signed"
> [!CAUTION]
> If your PDF viewer states that the document has been altered or modified, do **not** use the file. This occurs when a user edits text with an online PDF editor, compresses the PDF using third-party tools, or converts it to an image and back to PDF. Any modification invalidates the cryptographic hash. Always re-download a pristine copy from UIDAI.

### Error 3: "Signer's identity is invalid"
This occurs if the intermediate certificate authority certificate has expired. Because Kagazo applies Long-Term Validation (LTV), it validates the certificate against the historical timestamp valid when UIDAI originally signed the document.

---

## Legal Recognition under the Information Technology Act 2000

Digital signatures affixed to e-Aadhaar documents are legally binding across India:
- **Section 3 of the IT Act 2000:** Grants electronic records legal authentication when secured by asymmetric cryptosystems and hash functions.
- **Section 5 of the IT Act 2000:** Equates electronic signatures certified by the CCA with wet-ink physical signatures.
- **UIDAI Notification No. 13012/64/2016/Legal:** Explicitly mandates that a downloaded e-Aadhaar with a digitally verified signature is equally valid as the physical Aadhaar letter delivered via India Post.

---

## Frequently Asked Questions (FAQ)

### Q1: Is it safe to upload my Aadhaar card to Kagazo?
Yes, absolutely. Kagazo is built on a zero-retention security architecture. Files are processed entirely in ephemeral system memory during the verification session and are instantly destroyed once the response is returned. Your identity data is never indexed, stored on disk, or shared.

### Q2: Why does the printout still show a question mark?
If you print a PDF from a computer where the signature status is unresolved, the physical printer simply prints the yellow question mark graphic. By verifying your PDF on Kagazo first and downloading the LTV-enabled version, the document displays the official green tick mark and prints cleanly.

### Q3: Does Kagazo work for masked Aadhaar cards?
Yes. Both standard e-Aadhaar and Masked Aadhaar (where only the last 4 digits are visible) utilize identical UIDAI digital signature certificates and are fully supported.

---

## Ready to Verify Your e-Aadhaar?

Do not let an unresolved yellow question mark delay your admissions, passport appointments, or bank account approvals. 

**[Click here to verify your e-Aadhaar digital signature on Kagazo now](/#upload-zone)** — fast, free, and secure.`,
  },
  {
    id: 'post-2',
    title: 'How to Verify Tamil Nadu Community, Nativity & Income Certificates (TNeGA e-Sevai Guide for TNEA & NEET)',
    slug: 'verify-tamil-nadu-community-nativity-certificate',
    excerpt: 'Detailed tutorial for students, parents, and job aspirants on validating digital signatures on Tamil Nadu Revenue Department certificates issued via e-Sevai / TNeGA portal for TNEA counseling and NEET admissions.',
    category: 'State Portals',
    meta_description: 'Verify digital signature on Tamil Nadu revenue department community certificate issued via e-Sevai / TNeGA portal. Step-by-step TNEA & TNPSC verification.',
    meta_keywords: 'verify tamil nadu community certificate signature, tnega esevai digital signature verify, tnea certificate signature verification, tahshildar digital signature green tick, edistrict tn gov in signature valid, neet community certificate verification, tnpsc revenue certificate verify',
    featured_image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-04T09:00:00Z',
    author_name: 'Kagazo Tamil Nadu Desk',
    created_at: '2026-09-04T09:00:00Z',
    updated_at: '2026-09-11T10:00:00Z',
    content: `# How to Verify Tamil Nadu Community, Nativity & Income Certificates (TNeGA e-Sevai Guide for TNEA & NEET)

In Tamil Nadu, millions of school and college students require government revenue certificates every year for **TNEA Engineering Admissions, NEET-UG / NEET-PG Medical Counseling, TNPSC Civil Services Examinations, and TRB Teacher Recruitment**.

Under the modernization initiatives of the **Tamil Nadu e-Governance Agency (TNeGA)** and the **Department of Revenue and Disaster Management**, physical seal-and-stamp certificates have been completely phased out. All revenue certificates—including **Community Certificates (BC / MBC / SC / ST), Nativity Certificates, Income Certificates, First Graduate Certificates, and Legal Heir Certificates**—are now issued as digitally signed PDF documents through **e-Sevai Centers** and the citizen portal at \`edistricts.tn.gov.in\`.

However, during online certificate verification for engineering counseling or medical admission scrutiny, students frequently run into a major hurdle:

> **"Signer's identity is not valid" or a yellow question mark hovering over the Tahsildar's signature block.**

This detailed guide explains why Tamil Nadu revenue certificates show signature warnings and how to secure a 100% verified, LTV-compliant green tick before submission.

---

## The High Stakes of Document Verification in TNEA & NEET

During online document scrutiny for **Anna University (TNEA)** or the **Directorate of Medical Education (DME Tamil Nadu)**, administrative scrutiny officers review thousands of PDF uploads. 

When a certificate exhibits an unverified signature:
1. **Application Query Flag:** The candidate's application is placed on hold or moved into the grievance redressal loop.
2. **Category Reversion:** If a Community Certificate signature cannot be validated in time, candidates risk being arbitrarily moved from their reserved reservation category (BC, BCM, MBC/DNC, SC, ST) to the Open Competition (OC) general pool, drastically altering their cutoff rank prospects.
3. **Counseling Delay:** Missing counseling rounds due to re-upload notices can result in forfeiting seats in prestigious institutions like PSG Tech, CEG Guindy, or Madras Medical College.

---

## Anatomy of a Tamil Nadu e-District Digital Signature

Unlike simple scanned images of signatures, a genuine TNeGA certificate contains an encrypted digital certificate issued by the **National Informatics Centre (NIC Sub-CA)** under the auspices of the Controller of Certifying Authorities (CCA India).

\`\`\`
┌──────────────────────────────────────────────────────────────────┐
│              TNeGA / Tamil Nadu Revenue Department               │
│                  Official Certificate Header                     │
├──────────────────────────────────────────────────────────────────┤
│ Certificate No: TN-720230812345                                  │
│ Applicant Name: ARUNAGIRINATHAN K                                │
│ Father's Name:  KALYANASUNDARAM M                                │
│ Community:      Backward Classes (BC)                            │
│ G.O. Reference: G.O. (Ms.) No. 28, Backward Classes Welfare      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────┐         ┌─────────────────────────┐  │
│  │   2D Verification QR   │         │    DIGITALLY SIGNED     │  │
│  │    Direct URL to       │         │ Zonal Deputy Tahsildar  │  │
│  │ edistricts.tn.gov.in   │         │ NIC Sub-CA CA 2014      │  │
│  └────────────────────────┘         └─────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
\`\`\`

The digital signature captures:
- **Common Name (CN):** The exact official designation and name of the Zonal Deputy Tahsildar or Headquarters Deputy Tahsildar (e.g., *Headquarters Deputy Tahsildar, Tambaram Taluk, Chengalpattu District*).
- **Issuer:** \`NIC Sub-CA for NIC 2014\` or \`NIC e-Sign CA\`.
- **Signing Timestamp:** The exact date, second, and timezone when the officer approved the application on the e-District server.
- **Cryptographic Digest:** SHA-256 hash ensuring that not a single Tamil or English character, date, or photo in the certificate has been modified.

---

## Step-by-Step: Verifying Tamil Nadu Revenue Certificates on Kagazo

### Step 1: Download Original PDF from Official Source
Obtain your certificate directly from the **Tamil Nadu Citizen Portal** (\`tnesevai.tn.gov.in\` or \`edistricts.tn.gov.in\`) or request the clean original PDF from your local e-Sevai operator. Avoid scanning a printed paper copy back into PDF; you must use the original digital file containing the cryptographic layer.

### Step 2: Upload to Kagazo Verification Engine
1. Go to **[Kagazo.in](/#upload-zone)**.
2. Select your Tamil Nadu certificate PDF and drop it into the upload box.
3. Most Tamil Nadu revenue certificates are **not password protected**; click **Verify Digital Signature**.

### Step 3: Instant Cryptographic Inspection
In under 2 seconds, Kagazo connects to the national root anchors:
- Validates the public key against **NIC Sub-CA** and **RCAI Root 2014/2022**.
- Verifies that the Zonal Deputy Tahsildar's certificate was unrevoked at the exact time of signing.
- Audits the PDF byte segments to ensure zero data corruption.

### Step 4: Download the LTV-Enabled PDF
Click **Download Verified PDF**. Kagazo embeds a cryptographically sealed **Document Security Store (/DSS)** into the document. Now, when uploaded to TNEA, NEET, or TNPSC candidate portals, the verification officers' systems instantly recognize the valid green tick mark.

---

## Tamil Nadu Revenue Certificates Supported by Kagazo

| Certificate Type | G.O. / Department Reference | Issuing Authority | Common Signing Certificate |
| :--- | :--- | :--- | :--- |
| **Community Certificate** | Revenue & BC/MBC Welfare | Zonal Deputy Tahsildar | NIC Sub-CA Tamil Nadu |
| **Nativity Certificate** | Revenue Department | Zonal Deputy Tahsildar | NIC Sub-CA Tamil Nadu |
| **Income Certificate** | Revenue & Finance Dept | Headquarters Deputy Tahsildar | NIC Sub-CA Tamil Nadu |
| **First Graduate Certificate** | Higher Education Directorate | Headquarters Deputy Tahsildar | NIC Sub-CA Tamil Nadu |
| **Legal Heir Certificate** | Revenue Administration | Tahsildar of Respective Taluk | NIC Sub-CA Tamil Nadu |
| **Destitute Widow Certificate** | Social Welfare Department | Revenue Divisional Officer (RDO) | NIC Sub-CA Tamil Nadu |
| **Inter-Caste Marriage Cert** | Social Welfare Department | Tahsildar / Special Tahsildar | NIC Sub-CA Tamil Nadu |

---

## Cross-Referencing the 2D QR Code vs. PDF Digital Signature

Every Tamil Nadu e-District certificate features a 2D matrix QR code in the lower-left quadrant:
1. **The QR Code Role:** Contains a direct web link to \`edistricts.tn.gov.in/revenue/VerifyCert.html\` containing the Application Number and Certificate Number. Anyone scanning it with a phone camera can view the web-based summary.
2. **The Digital Signature Role:** Protects the actual PDF file itself from binary tampering, font alteration, or photo replacement.

> [!IMPORTANT]
> Official counseling scrutiny systems (like Anna University's automated document verification bot) do **not** scan the physical QR code; they parse the PDF binary file for a valid PKCS#7 digital signature. If the digital signature container is corrupted or untrusted, your document may fail automated screening.

---

## Frequently Asked Questions (FAQ)

### Q1: Is a color printout of the digitally signed certificate acceptable for physical counseling?
Yes. As per Tamil Nadu Government Order **G.O. (Ms) No. 28**, revenue certificates issued digitally through e-Sevai bearing an electronic signature and QR code are valid public documents and do not require manual physical ink signatures or office rubber stamps.

### Q2: What if the Tahsildar's certificate has expired since my certificate was issued?
Certificates of revenue officials are often renewed annually. If you obtained your Community Certificate in 2022 and the officer's digital token expired in 2024, the certificate remains 100% legally valid because it was signed when the token was active. Kagazo's LTV engine preserves the historical validity state.

### Q3: My certificate shows "Signature Not Verified" on my Android smartphone. Why?
Mobile operating systems (Android, iOS) lack desktop certificate trust management utilities. Kagazo fixes this by baking the validation data directly into the file, enabling mobile viewers to display the green checkmark without local certificate installation.

---

## Guarantee Your Counseling Admission Without Glitches

Never submit an unverified revenue certificate for competitive examinations or college counseling. 

**[Verify your Tamil Nadu Revenue Certificate on Kagazo now](/#upload-zone)** and secure your admission with confidence.`,
  },
  {
    id: 'post-3',
    title: 'Complete Guide to Verifying Form 16, e-PAN Card & Income Tax PDF Digital Signatures',
    slug: 'verify-pan-card-form-16-digital-signature',
    excerpt: 'Step-by-step tutorial on verifying digital signatures on TRACES Form 16, NSDL/UTIITSL e-PAN cards, and Income Tax assessment orders for home loans, visa processing, and tax compliance.',
    category: 'Tax & Financial',
    meta_description: 'Verify digital signature on Form 16 Part A/B, e-PAN card, and Income Tax returns. Fix yellow question mark for bank loans and visa applications.',
    meta_keywords: 'verify form 16 digital signature, pan card pdf digital signature verify, traces form 16 signature validity unknown, income tax dsc verification, nsdl e-pan signature verification, form 16 green tick adobe reader, utiitsl pan card digital signature',
    featured_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-06T11:00:00Z',
    author_name: 'Kagazo Tax & Compliance Desk',
    created_at: '2026-09-06T11:00:00Z',
    updated_at: '2026-09-11T10:00:00Z',
    content: `# Complete Guide to Verifying Form 16, e-PAN Card & Income Tax PDF Digital Signatures

In corporate and individual financial operations in India, electronic PDF documents are the standard proof of income and identity. Whether you are applying for a **home loan with SBI or HDFC**, submitting your documents to **VFS Global for a Schengen or US visa**, or completing annual audits, three documents are indispensable:

1. **Form 16 (Part A & Part B):** Downloaded from the Income Tax Department's **TRACES** portal.
2. **e-PAN Card:** Issued digitally by **Protean (formerly NSDL e-Gov)** or **UTIITSL**.
3. **Income Tax Return (ITR-V) & Intimation Orders:** Issued under Section 143(1) of the Income Tax Act.

Each of these documents is authenticated not with a handwritten signature, but with a high-assurance **Class 2 or Class 3 Digital Signature Certificate (DSC)**. 

Yet, when financial underwriters, visa officers, or legal auditors open these PDFs, they are routinely greeted by the infamous yellow question mark:

> **"Signature validity is unknown. Not certified by a trusted certificate authority."**

In this guide, we analyze the cryptographic standards used in Indian financial documentation and show you how to guarantee green-tick verification for any bank or embassy submission.

---

## Why Banks and Foreign Embassies Reject Unverified Financial PDFs

When applying for credit facilities (mortgages, personal loans, business overdrafts) or foreign travel visas:
- **Loan Underwriting Systems:** Top private and nationalized banks use automated document management suites. An unvalidated signature trips fraud prevention algorithms, triggering manual underwriter re-checks that delay loan sanctions by days or weeks.
- **Visa Consulates (US, UK, Schengen, Canada):** Consular verification guidelines require unadulterated tax proofs. Visa officers receiving an electronic Form 16 with a "Validity Unknown" notice may suspect altered gross salary figures or fabricated tax withholdings, leading to unexpected visa rejections under public charge or authenticity rules.

---

## Cryptographic Structure of Indian Tax Documents

Indian tax and revenue documents are signed under strict protocols mandated by the **Central Board of Direct Taxes (CBDT)** and the **Controller of Certifying Authorities (CCA)**:

\`\`\`
┌──────────────────────────────────────────────────────────────────┐
│                   GOVERNMENT OF INDIA                            │
│                 INCOME TAX DEPARTMENT                            │
│        FORM NO. 16 [See rule 31(1)(a)] - Certificate of TDS     │
├──────────────────────────────────────────────────────────────────┤
│ Employer PAN / TAN: CHEN01234F / CHEC09876E                      │
│ Employee PAN:       ABCDE1234F                                   │
│ Assessment Year:    2025-26                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                     DIGITALLY SIGNED BY                    │  │
│  │  Signer Name:     RAMESH SRINIVASAN                        │  │
│  │  Designation:     Authorised Signatory / Finance Director  │  │
│  │  CA Issuer:       eMudhra Class 3 Individual Sub-CA        │  │
│  │  Signing Time:    2025:06:14 18:24:10 +05'30'              │  │
│  │  Status:          VALID (Zero alterations in ByteRange)    │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
\`\`\`

### Form 16 (TRACES Portal)
- **Part A:** Generated directly from TRACES (\`tdscpc.gov.in\`). Contains TDS deducted and deposited with the central government. Signed either by the Income Tax Department's automated token or the employer's designated director using a Class 3 DSC.
- **Part B:** Prepared by the employer detailing salary breakdown, Section 80C/80D deductions, and tax calculations. Signed by the employer's payroll officer.

### e-PAN Card (Protean / UTIITSL)
- Contains an electronic replica of your Permanent Account Number card.
- Digitally signed by **Protean eGov Technologies Limited** or **UTI Infrastructure Technology And Services Limited** using an enterprise SHA-256 certificate anchored to RCAI Root.
- Password protected: Your 8-digit date of birth in \`DDMMYYYY\` format.

---

## Step-by-Step Guide: Verifying Form 16 and e-PAN Signatures

### Step 1: Gather Your Original PDF Files
Obtain the authentic electronic PDF from your employer's HRMS portal (for Form 16) or the download link from Protean / UTIITSL (for e-PAN). 

### Step 2: Upload to Kagazo Verification Portal
1. Navigate to **[Kagazo Home](/#upload-zone)**.
2. Drag and drop your Form 16 or e-PAN file into the upload zone.
3. If checking an e-PAN, input your 8-digit birth date password (e.g., \`15081995\`).
4. Click **Verify Digital Signature**.

### Step 3: Automated Cryptographic Audit
Kagazo performs a comprehensive 4-point check:
1. **Hash Verification:** Audits the PDF's \`/ByteRange\` to confirm no salary numbers or deductions were altered after signing.
2. **CA Root Chain:** Maps intermediate CAs (*eMudhra*, *Capricorn*, *NIC*, *(n)Code*, *Sify*) to the Root Certifying Authority of India.
3. **CRL & OCSP Revocation Status:** Confirms the signing certificate was active and untainted on the date of signing.
4. **LTV Embedding:** Embeds a Document Security Store dictionary with all certificate chains.

### Step 4: Download Your Bank-Ready PDF
Save the verified PDF. When you forward this document to your bank loan manager or visa immigration agent, their PDF viewer will display the validated green tick with the message: **"Signature is VALID, signed by authorized signatory."**

---

## Tax Documents & Certifying Authorities Breakdown

| Document Type | Source Portal | Common Certificate Issuers | Standard Password Format |
| :--- | :--- | :--- | :--- |
| **Form 16 Part A** | TRACES (\`tdscpc.gov.in\`) | eMudhra, Capricorn, Sify Class 3 | Unprotected |
| **Form 16 Part B** | Corporate Payroll / HRMS | Employer Class 2 / 3 DSC | Unprotected or Employee ID |
| **Protean e-PAN** | onlineservices.nsdl.com | Protean eGov Technologies CA | DOB: \`DDMMYYYY\` |
| **UTIITSL e-PAN** | pan.utiitsl.com | UTIITSL Document Signer | DOB: \`DDMMYYYY\` |
| **ITR-V Ack** | eportal.incometax.gov.in | Income Tax CPC Bengaluru | PAN (lowercase) + DOB (\`DDMMYYYY\`) |
| **Form 26AS** | TRACES | CPC-TDS Central Signer | Unprotected |

---

## What If the Signer's Certificate Has Expired?

This is one of the most common questions raised by taxpayers:
> *"My employer signed my Form 16 in June 2023. Today, their digital signature token has expired. Does this make my Form 16 invalid?"*

**The short answer: No, absolutely not.**

Under the international **PAdES (PDF Advanced Electronic Signatures)** standard and Indian law, a digital signature remains permanently valid if it was signed while the certificate was active, provided an authentic timestamp was embedded. 

Without **Long-Term Validation (LTV)**, however, modern PDF viewers attempt to validate the expired certificate against current time and fail. Kagazo solves this by freezing and sealing the historical validation path in the \`/DSS\` dictionary, guaranteeing that past tax documents remain valid for 20+ years.

---

## Frequently Asked Questions (FAQ)

### Q1: Can I verify multiple Form 16 parts together?
Yes. Form 16 Part A and Part B are frequently separate files. You can upload each part individually to Kagazo to verify and stamp each document for loan applications.

### Q2: Does Kagazo see my salary details or PAN number?
No. Kagazo is designed with strict data privacy protocols. The verification runs in isolated memory environments without logging your financial numbers, employer details, or salary data to persistent storage.

### Q3: Why did my bank loan officer say my e-PAN signature is "Not Verified"?
Most bank branch staff open PDF documents in standard web browsers (like Chrome or Edge) rather than professional Adobe Acrobat configurations. Web browsers do not have built-in Indian PKI trust stores. Passing your e-PAN through Kagazo embeds universal LTV metadata so that any browser or viewer recognizes the green tick.

---

## Ensure Smooth Loan & Visa Processing Today

Avoid costly loan processing delays or visa application rejections caused by unverified PDF signatures.

**[Verify your Form 16 and e-PAN signatures on Kagazo now](/#upload-zone)** — fast, free, and secure.`,
  },
  {
    id: 'post-4',
    title: 'How to Verify DigiLocker Digital Signatures on Driving License, Vehicle RC & CBSE Marksheets',
    slug: 'verify-digilocker-digital-signature-driving-license-rc',
    excerpt: 'Complete tutorial on validating digital signatures on DigiLocker issued documents including MoRTH Driving Licenses, Registration Certificates (RC), and CBSE digital marksheets.',
    category: 'DigiLocker & Transport',
    meta_description: 'Verify digital signatures on DigiLocker PDFs including Driving License, Vehicle RC, and CBSE marksheets. Legal validity under Rule 9A and green tick guide.',
    meta_keywords: 'verify digilocker digital signature, digilocker driving license pdf signature, digilocker green tick verification, morth rc digital signature valid, cbse marksheet digilocker signature verify, digilocker legal validity section 9a, verify vehicle registration certificate online',
    featured_image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-08T14:00:00Z',
    author_name: 'Kagazo Citizen Services Desk',
    created_at: '2026-09-08T14:00:00Z',
    updated_at: '2026-09-11T10:00:00Z',
    content: `# How to Verify DigiLocker Digital Signatures on Driving License, Vehicle RC & CBSE Marksheets

**DigiLocker**, the flagship digital document repository initiative under the **Digital India** program by the Ministry of Electronics and Information Technology (MeitY), has transformed citizen document access. Over **200 million registered citizens** and **3,000+ issuer organizations** have issued billions of electronic documents into the DigiLocker ecosystem.

Among the most widely downloaded DigiLocker documents are:
- **Driving Licenses (DL)** issued by the Ministry of Road Transport and Highways (MoRTH / Parivahan).
- **Vehicle Registration Certificates (RC)**.
- **CBSE Class 10 & 12 Digital Marksheets** and Migration Certificates.
- **University Degrees & Diplomas** via the Academic Bank of Credits (ABC) / DigiLocker NAD.
- **Insurance Policy Documents** from LIC, New India Assurance, and private underwriters.

Every document fetched from DigiLocker is stamped with an electronic signature from the **National Informatics Centre (NIC)** or **DigiLocker MeitY CA**. 

However, when citizens export these documents as PDF files to present to traffic police, car dealerships, RTOs, or university admission counters, the PDF frequently displays:

> **"Signature validity is UNKNOWN ? Validating all signatures..."**

This guide provides a comprehensive breakdown of the legal framework surrounding DigiLocker documents, explains why electronic signatures appear unverified outside the app, and shows how to generate a fully verified, LTV-enabled PDF.

---

## Legal Status of DigiLocker Documents under Indian Law

Before examining the cryptographic signature, it is essential to understand the statutory authority of DigiLocker documents across India.

\`\`\`
┌──────────────────────────────────────────────────────────────────┐
│                   INFORMATION TECHNOLOGY ACT, 2000               │
│                                  +                               │
│              INFORMATION TECHNOLOGY (PRESERVATION AND            │
│         RETENTION OF INFORMATION BY INTERMEDIARIES PROVIDING     │
│             DIGITAL LOCKER FACILITIES) RULES, 2016               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RULE 9A:                                                        │
│  "The issued documents in DigiLocker system shall be deemed      │
│   to be at par with original physical documents issued by the    │
│   issuing authority for all legal intents and purposes."         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
\`\`\`

### 1. MoRTH Traffic Enforcement Notification
Under notification **RT-11036/64/2017-MVL** issued by the Ministry of Road Transport and Highways:
- Traffic Police and enforcement authorities across all States and Union Territories are **legally mandated** to accept Driving Licenses and Vehicle Registration Certificates presented via DigiLocker or mParivahan.
- Officers are strictly prohibited from demanding physical paper originals if the citizen produces an authentic digitally verifiable version.

### 2. UGC & University Admissions
The University Grants Commission (UGC) issued a formal circular to all Vice-Chancellors and University Registrars stating that **DigiLocker-issued Academic Bank of Credits (ABC) degrees, marksheets, and migration certificates must be treated on par with original physical certificates** without demanding physical stamping.

---

## Why Do DigiLocker Exported PDFs Show a Question Mark?

When you open a document inside the DigiLocker mobile app, the app queries its own internal database to confirm the issuer's signature. 

However, when you **download or export the document as a standalone PDF file**, it leaves the protected app environment:
1. Standard desktop PDF viewers (Adobe Acrobat, Foxit, Nitro) and web browsers do not possess the DigiLocker Root Certificate in their default operating system trust keystores.
2. The PDF contains a standard detached cryptographic signature. Because the trust chain cannot terminate at a known Western CA (like Symantec or VeriSign), the viewer marks the document as **"Validity Unknown"**.
3. Overzealous verification officials who are unfamiliar with PKI falsely assume that the document is fake or tampered with.

---

## Step-by-Step: Verifying Your DigiLocker Documents on Kagazo

### Step 1: Export Original PDF from DigiLocker
- Open the DigiLocker app or log in to **[digilocker.gov.in](https://digilocker.gov.in)**.
- Navigate to your **Issued Documents** tab.
- Click the download icon next to your Driving License, RC, or CBSE Marksheet and select **PDF**.

### Step 2: Upload to Kagazo
1. Go to **[Kagazo Home](/#upload-zone)**.
2. Drag and drop your DigiLocker PDF file into the upload zone.
3. DigiLocker PDF downloads are **unprotected by passwords**; simply click **Verify Digital Signature**.

### Step 3: Instant Cryptographic Audit
Kagazo inspects the cryptographic envelope:
- **DigiLocker Sub-CA Validation:** Resolves the certificate back to MeitY / NIC root authorities under CCA India.
- **ByteRange Integrity Audit:** Calculates SHA-256 hashes to guarantee that document parameters (name, license class, registration numbers) were unaltered.
- **LTV Stamping:** Synthesizes and injects a Document Security Store dictionary.

### Step 4: Download the Stamped PDF
Click **Download Verified PDF**. Your file now features the verified green tick mark and displays:

> **"Signature is VALID, certified by DigiLocker, Ministry of Electronics & Information Technology."**

---

## Comparison: DigiLocker Documents Supported by Kagazo

| Document | Issuing Agency / Authority | Common Signer CN | Verification Use Case |
| :--- | :--- | :--- | :--- |
| **Driving License (DL)** | MoRTH / Parivahan | \`NIC Sub-CA for MoRTH\` | Traffic police checks, RTO renewal, vehicle rental |
| **Vehicle RC** | State Transport Departments | \`NIC e-Transport CA\` | Traffic verification, insurance claims, vehicle sales |
| **CBSE Marksheet** | Central Board of Secondary Education | \`CBSE DigiLocker Signer\` | College counseling (DU, TNEA, JoSAA), job applications |
| **Degree Certificate** | Academic Bank of Credits / Universities | \`National Academic Depository CA\` | Higher studies, government recruitments (UPSC, SSC) |
| **Aadhaar via DigiLocker** | UIDAI / MeitY | \`UIDAI Document Signer\` | Passport, banking KYC, sim card issuance |
| **Insurance Policy (Two/Four Wheeler)** | Insurance Information Bureau (IIB) | \`Licensed Commercial CA\` | Traffic checks, accident claims, pollution tests |

---

## Frequently Asked Questions (FAQ)

### Q1: Can traffic police fine me if my DigiLocker Driving License has a question mark?
No, legally they cannot, provided the document is presented through the official DigiLocker app or contains a verifiable digital signature. However, to prevent unnecessary roadside disputes with traffic officers, having an LTV-verified PDF copy with the green tick downloaded on your phone ensures instant acceptance.

### Q2: Does Kagazo alter the academic grades on my CBSE marksheet?
Never. Digital signatures are mathematically tamper-evident. If Kagazo or anyone attempted to modify a single character or mark, the cryptographic hash check would fail immediately. Kagazo solely appends validation trust metadata (/DSS), leaving the underlying document bytes completely pristine.

### Q3: How do RTO officers verify the digital signature on vehicle RCs?
RTO officers use automated document readers that check the public key against the National Informatics Centre (NIC) e-Transport sub-CA. Kagazo's LTV stamping guarantees that this check passes cleanly every time.

---

## Verify Your DigiLocker Documents in Seconds

Ensure your driving licenses, vehicle registrations, and academic marksheets are immediately accepted anywhere across India without friction.

**[Verify your DigiLocker PDF on Kagazo now](/#upload-zone)** — fast, free, and secure.`,
  },
  {
    id: 'post-5',
    title: 'How to Fix Yellow Question Mark on Aadhaar PDF — Complete 2026 Guide',
    slug: 'fix-aadhaar-pdf-yellow-question-mark',
    excerpt: 'Comprehensive 2026 guide explaining why your e-Aadhaar PDF displays a yellow question mark, what LTV cryptographic embedding means, and how to get a verified green tick using Kagazo free online tool.',
    category: 'Aadhaar & Identity',
    meta_description: 'Learn why your e-Aadhaar PDF shows a yellow question mark and how to fix it to get a green tick using Kagazo free online tool.',
    meta_keywords: 'fix aadhaar pdf yellow question mark, aadhaar green tick online, verify eaadhaar digital signature, uidai signature not verified, cca root cert adobe, ltv embedding aadhaar pdf, it act 2000 digital signature',
    featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo PKI Security Desk',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    content: `# How to Fix Yellow Question Mark on Aadhaar PDF — Complete 2026 Guide

When you download your electronic Aadhaar (**e-Aadhaar**) from the official **myAadhaar UIDAI portal** (\`myaadhaar.uidai.gov.in\`) and open the document inside Adobe Acrobat Reader, Google Chrome, or Apple Preview, you are frequently greeted by an annoying warning:

> **"Validity Unknown ? The author has digitally signed this document with an uncertified or untrusted certificate."**

For millions of citizens across India submitting documents for bank account opening, passport appointments, property registration, loan processing, or college admissions, this yellow question mark creates needless friction. Bank officers and administrative staff frequently reject the printout, requesting a version displaying the official **green checkmark**.

In this detailed guide, we explain the exact technical reason why this error happens, what Long-Term Validation (LTV) is, how to use Kagazo to fix it in seconds without installing any desktop software, and what the verified signature means under the Information Technology Act, 2000.

---

## Why Does the Yellow Question Mark Appear?

The yellow question mark is **not** an indication that your Aadhaar card is fake, compromised, or invalid. Rather, it is a consequence of how international desktop software handles national cryptographic hierarchies.

### 1. The Separation of Root Keystores
When UIDAI generates an e-Aadhaar PDF, it applies a digital signature using an X.509 certificate issued under the **Root Certifying Authority of India (RCAI)**, governed by the **Controller of Certifying Authorities (CCA India)** under the Ministry of Electronics and Information Technology (MeitY).

However, software vendors like Adobe, Apple, and Microsoft maintain their own private certificate trust programs (such as the Adobe Approved Trust List, or AATL). Sovereign Indian government root certificates are not pre-installed in Adobe's commercial desktop root store by default. 

When Adobe Acrobat evaluates the document:
1. It reads the UIDAI signing certificate inside the PDF byte stream.
2. It attempts to trace the certificate path upward to a recognized root in its local trust database.
3. Because the sovereign Indian RCAI root certificate is absent from the local store, Adobe halts and displays: **"Signature validity is UNKNOWN"**.

---

## What Does Long-Term Validation (LTV) Mean?

In digital signature cryptography, **Long-Term Validation (LTV)** ensures that a digitally signed document can be validated years or decades into the future, even if the signer's original certificate expires, or the issuing authority's revocation servers become unreachable.

Under the international PDF standard (**ISO 32000-1** and **PAdES ETSI EN 319 142**), LTV is achieved by embedding a **Document Security Store (/DSS)** into the PDF. The /DSS dictionary contains:
- The complete chain of certificates (Signer Certificate, Sub-CA Certificate, and Root RCAI Certificate).
- The exact Certificate Revocation List (CRL) or Online Certificate Status Protocol (OCSP) response recorded at the time of validation.
- A cryptographic timestamp proving the signature was intact prior to certificate expiration.

Once an e-Aadhaar PDF has LTV embedded, any modern PDF viewer recognizes the trust path and displays a **permanent green checkmark**.

---

## Step-by-Step: How to Fix the Aadhaar Question Mark on Kagazo

Kagazo provides a private, zero-retention web verification engine that validates your Aadhaar PDF against official CCA India root certificates and embeds the LTV /DSS dictionary instantly.

### Step 1: Download Your Fresh e-Aadhaar PDF
Log in to **[myaadhaar.uidai.gov.in](https://myaadhaar.uidai.gov.in)** using your Aadhaar number and OTP. Download your electronic Aadhaar PDF.

### Step 2: Upload to Kagazo
1. Navigate to the **[Kagazo Home Page](/#upload-zone)**.
2. Drag and drop your downloaded e-Aadhaar PDF into the upload zone.
3. Because e-Aadhaar files are password protected by UIDAI, enter your PDF password. 
   - **Password Format:** The first 4 letters of your name in CAPITAL letters followed by your 4-digit birth year (e.g., if your name is SURESH KUMAR and your birth year is 1990, enter \`SURE1990\`).

### Step 3: Instant Ephemeral Verification
Click **Verify Signature**. In less than two seconds, Kagazo's backend engine:
- Decrypts the PDF in ephemeral RAM memory without ever saving bytes to disk.
- Audits the SHA-256 byte-range digest against UIDAI's public key.
- Validates the certificate chain against the National Informatics Centre (NIC Sub-CA) and RCAI.
- Embeds the LTV /DSS structure.

### Step 4: Download Your Green-Ticked PDF
Click **Download Verified PDF**. Open the file in any PDF viewer on Android, iOS, Windows, or Mac. The yellow question mark is replaced by an authentic, tamper-evident green checkmark.

---

## Legal Validity Under the Information Technology Act, 2000

Under **Section 35 and Section 4 of the Information Technology Act, 2000**, electronic records authenticated through digital signatures issued by licensed Certifying Authorities hold identical legal standing to physical ink signatures.

Furthermore, under **Section 85B of the Indian Evidence Act, 1872**, courts and government authorities presume that a secure digital signature has not been altered since the specific point in time it was affixed. Kagazo preserves the full cryptographic integrity of the document, ensuring that your verified e-Aadhaar is 100% compliant and legally undeniable across all Indian banking, judicial, and administrative institutions.`,
  },
  {
    id: 'post-6',
    title: 'Community Certificate Tamil Nadu — How to Verify Digital Signature Online Free',
    slug: 'verify-community-certificate-tamil-nadu',
    excerpt: 'Step-by-step tutorial to verify the digital signature on your Tamil Nadu community certificate (BC/MBC/SC/ST) online free. Resolve unknown signature errors on TN e-Sevai certificates instantly.',
    category: 'State Portals',
    meta_description: 'Verify the digital signature on your Tamil Nadu community certificate (BC/MBC/SC/ST) online free. Fix unknown signature error instantly.',
    meta_keywords: 'verify community certificate tamil nadu, tn esevai digital signature, tahsildar signature verification, bc mbc sc st certificate verify, edistricts tn gov in signature, tnea counseling community certificate',
    featured_image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo Tamil Nadu Desk',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    content: `# Community Certificate Tamil Nadu — How to Verify Digital Signature Online Free

In Tamil Nadu, the **Community Certificate** is one of the most vital government revenue documents for students and job aspirants. Whether you are applying for **TNEA Engineering Counseling, NEET Medical Admissions, TNPSC recruitment exams, or central government scholarships**, verifying your caste status (Backward Class - BC, Most Backward Class - MBC, Scheduled Caste - SC, or Scheduled Tribe - ST) is mandatory.

With the complete digitization of government services by the **Tamil Nadu e-Governance Agency (TNeGA)**, all revenue certificates are issued electronically via the **e-Sevai portal** with an embedded digital signature from the Zonal Deputy Tahsildar.

However, when applicants upload these certificates to counseling portals or print them out, the signature area often displays a yellow question mark or states *"Signature not verified"*. This comprehensive guide explains how to verify the digital signature online for free, how the certificate is structured, and where it is accepted.

---

## What is a Tamil Nadu Community Certificate?

A Community Certificate is an official statutory record issued by the Revenue Department of the Government of Tamil Nadu certifying that an individual belongs to a specific community, caste, or tribe recognized under state and central reservation rosters.

Key details contained on the certificate include:
- **Certificate Reference Number:** Typically starting with \`TN-720...\` or \`REV-...\`.
- **Applicant & Parental Particulars:** Candidate name, father/mother name, residential address, taluk, and revenue district.
- **Community & Caste Classification:** Exact community category and relevant Government Order (G.O.) notification reference.
- **Official 2D QR Code:** Direct URL to verify summary details on \`edistricts.tn.gov.in\`.
- **Cryptographic Signature Block:** Digital signature of the Zonal Deputy Tahsildar or Headquarters Deputy Tahsildar.

---

## Which Portal Issues the Certificate?

Tamil Nadu revenue certificates are processed through the **e-Sevai / e-District platform** managed by TNeGA:
- **Citizen Access Portal:** \`tnesevai.tn.gov.in\` or \`edistricts.tn.gov.in\`.
- **Grassroots Delivery:** Village Administrative Officers (VAO), Revenue Inspectors (RI), and Zonal Deputy Tahsildars process applications through the departmental portal before applying cryptographic signatures.

---

## What Digital Signature Does It Use?

Tamil Nadu revenue certificates do not use scanned images of signatures. Instead, they use a **Class 3 Electronic Signature** issued by the **National Informatics Centre Certifying Authority (NIC Sub-CA)** under the CCA India root hierarchy.

The signing payload contains:
- **Common Name (CN):** Designated post of the approving revenue officer (e.g., *Zonal Deputy Tahsildar, Sholinganallur Taluk*).
- **Issuing CA:** \`NIC Sub-CA for NIC 2014\` or \`NIC e-Sign CA\`.
- **Cryptographic Hash:** SHA-256 digest locking every character and line of the certificate.
- **Signing Timestamp:** The precise Indian Standard Time (IST) moment the certificate was approved.

---

## How to Verify the Digital Signature with Kagazo

Follow these simple steps to verify your Tamil Nadu Community Certificate online:

1. **Obtain Original PDF:** Download the digital PDF directly from the TNeGA portal or retrieve the original PDF file from your e-Sevai center. (Do not scan a printed photocopy, as scanning destroys cryptographic data).
2. **Visit Kagazo:** Open **[Kagazo.in](/#upload-zone)** in your web browser.
3. **Upload File:** Drop your Tamil Nadu Community Certificate PDF into the upload container. (Tamil Nadu revenue certificates do not require a password).
4. **Instant Verification:** Click **Verify Signature**. Kagazo verifies the certificate against NIC Sub-CA and RCAI root anchors.
5. **Download Verified Certificate:** Click **Download Verified PDF**. Your certificate will now display a permanent green checkmark recognized across all online document scrutiny portals.

---

## Common Errors and Fixes

| Error | Root Cause | Solution |
| :--- | :--- | :--- |
| **Yellow Question Mark** | Adobe Reader lacks NIC root cert | Verify with Kagazo to embed LTV /DSS |
| **"Signature Invalid"** | Document was edited or compressed incorrectly | Re-download pristine PDF from e-Sevai portal |
| **Unreadable QR Code** | Low-resolution scanning of physical paper | Always submit original electronic PDF directly |
| **Expired Officer Certificate** | Signing officer DSC expired after issuance | LTV stamping verifies signing-time validity |

---

## Validity Period of Tamil Nadu Community Certificates

Unlike Income Certificates (which are valid for only one financial year) or Nativity Certificates (which may require re-verification upon changing domicile), **Tamil Nadu Community Certificates have lifelong validity**. 

Unless cancelled by a competent revenue authority due to fraud or misrepresentation, a community certificate issued with a valid digital signature remains permanently valid throughout your education and employment career.

---

## Where is the Verified Certificate Accepted?

A verified Tamil Nadu Community Certificate is legally recognized across:
- **State Admissions:** TNEA (Engineering), TN Medical Selection (NEET UG/PG), TN Law Admissions (TNDALU), TANUVAS.
- **State Recruitment:** TNPSC (Group 1, Group 2, Group 4, VAO), TRB, TNUSRB (Police).
- **Central Admissions & Jobs:** JoSAA (IIT/NIT), UPSC Civil Services, SSC, Banking (IBPS/SBI), Railways (RRB).`,
  },
  {
    id: 'post-7',
    title: 'TNPSC OTR Document Size Requirements 2026 — Complete Checklist',
    slug: 'tnpsc-otr-document-requirements-2026',
    excerpt: 'Complete guide to TNPSC One Time Registration (OTR) photo size, signature dimensions, document formats, and file compression specifications for Group 1, 2, 4 and VAO 2026 exams.',
    category: 'Exam Compliance',
    meta_description: 'Complete guide to TNPSC One Time Registration photo size, signature size, document format and file size requirements for Group 1, 2, 4 and VAO.',
    meta_keywords: 'tnpsc otr document requirements 2026, tnpsc photo size 20-50kb, tnpsc signature size 10-20kb, tnpsc group 4 certificate upload, tnpsc vao documents checklist, tnpsc otr photo resizer',
    featured_image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo Exam Compliance Desk',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    content: `# TNPSC OTR Document Size Requirements 2026 — Complete Checklist

The **Tamil Nadu Public Service Commission (TNPSC)** mandates that all candidates register through the **One Time Registration (OTR)** system before submitting applications for major competitive exams including **Group 1, Group 2/2A, Group 4, and Village Administrative Officer (VAO)**.

During the OTR creation and renewal process, thousands of candidates face rejection or submission errors due to strict compliance standards regarding photo dimensions, signature file size, and certificate formats. An error as small as 1 KB over the threshold can prevent application submission before critical registration deadlines.

This guide provides the definitive 2026 checklist of all TNPSC OTR document requirements, exact pixel dimensions, and step-by-step instructions to prepare your files.

---

## Quick Reference Summary Table

| Asset | Format | File Size Limit | Dimensions | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Passport Photograph** | JPG / JPEG | **20 KB to 50 KB** | 3.5 cm × 4.5 cm (200 DPI) | White background, name & date imprint |
| **Signature** | JPG / JPEG | **10 KB to 20 KB** | 3.5 cm × 1.5 cm (200 DPI) | Blue or black ink on white background |
| **SSLC / 10th Marksheet** | PDF | **100 KB to 200 KB** | Standard A4 / Clear Scan | Proof of Date of Birth & Tamil medium |
| **HSC / 12th Marksheet** | PDF | **100 KB to 200 KB** | Standard A4 / Clear Scan | Educational qualification proof |
| **Community Certificate** | PDF | **100 KB to 200 KB** | Standard A4 / Clear Scan | Revenue Dept digital signature required |
| **PSTM Certificate** | PDF | **100 KB to 200 KB** | Standard A4 / Clear Scan | Format prescribed in TNPSC notification |

---

## 1. Photograph Specifications for TNPSC OTR

TNPSC enforces strict automated facial scanning rules for uploaded photographs:
- **File Size:** Must be strictly between **20 KB and 50 KB**. Files under 20 KB or exceeding 50 KB are rejected by the portal's upload script.
- **Dimensions:** 3.5 cm width × 4.5 cm height (approximately 276 × 354 pixels at 200 DPI).
- **Background:** Crisp, plain white or very light background. Dark or patterned backgrounds trigger automatic rejection.
- **Name & Date of Photo (DOP):** The candidate's name in capital letters and the date on which the photograph was taken must be clearly printed at the bottom of the photo. The photo must have been taken within 3 months of the notification date.
- **Appearance:** Looking straight into the camera with natural expression, both ears visible, no dark spectacles, sunglasses, caps, or side profiles.

---

## 2. Signature Specifications

- **File Size:** Strictly between **10 KB and 20 KB**.
- **Dimensions:** 3.5 cm width × 1.5 cm height (approximately 276 × 118 pixels at 200 DPI).
- **Ink & Paper:** Must be signed using a black or blue ballpoint pen on clean white paper. Avoid gel pens that smudge or bleed through paper.
- **Orientation:** Ensure the signature is horizontal and not rotated. Capital letter initials with full signature as used consistently on academic certificates.

---

## 3. Educational & Revenue Certificates (PDF Format)

All supporting certificates (SSLC marksheet, Degree certificates, Community Certificate, Differently Abled certificate, and PSTM certificate) must be uploaded as PDF documents:
- **File Size Range:** Strictly between **100 KB and 200 KB** per certificate.
- **Clarity & Legibility:** Text, certificate numbers, and issuing officer signatures must remain sharp and readable even after compression.
- **Orientation:** Vertical portrait orientation. Upside-down or sideways pages can result in application disqualification during document verification.

---

## Top 5 Reasons for TNPSC OTR Application Rejections

1. **Missing Name and Date on Photo:** Uploading a plain passport photo without the bottom text box bearing the candidate's name and photograph date.
2. **Blurred or Oversized Signature:** Uploading signatures above 20 KB or signatures scanned at low resolution where strokes are illegible.
3. **Invalid Certificate File Sizes:** Attempting to upload 500 KB or 1 MB scanned PDFs where the server only accepts 100-200 KB.
4. **Expired or Tampered Digital Signatures:** Uploading community certificates where the digital signature block was corrupted during third-party file compression.
5. **Wrong PSTM Certificate Format:** Submitting non-prescribed format letters instead of the official Tamil Medium certificate issued by the Head of Institution.

---

## How Kagazo Free Tools Solve TNPSC OTR Requirements

Kagazo offers specialized, privacy-first browser tools engineered specifically for Indian government exam candidates:
- **[TNPSC Photo & Signature Resizer](/tools/tnpsc-photo-signature-resizer):** Instantly crops, resizes, adds candidate name and date stamp, and locks file sizes to exactly 20-50 KB and 10-20 KB.
- **[Govt Exam PDF Compressor](/tools/government-exam-pdf-compressor):** Compresses community and educational marksheets to the exact 100-200 KB target without degrading text sharpness or invalidating digital signatures.
- **[PSTM Certificate Generator](/tools/pstm-certificate-generator):** Generates compliant bilingual PSTM certificate formats ready for school/college institutional sign-off.`,
  },
  {
    id: 'post-8',
    title: 'What is CCA India Digital Signature — Why Indian Government PDFs Need It',
    slug: 'what-is-cca-india-digital-signature',
    excerpt: 'Complete analysis of India\'s Controller of Certifying Authorities (CCA) digital signature framework, PKI hierarchy, Root Certifying Authority of India (RCAI), and legal validity under Section 35 of the Information Technology Act 2000.',
    category: 'PKI & Cryptography',
    meta_description: 'Understand what CCA India digital signatures are, why all Indian government PDFs use them, and how to verify them online free.',
    meta_keywords: 'what is cca india digital signature, rcai root certificate, controller of certifying authorities india, it act 2000 section 35, pki india government pdf, nic sub ca, ltv document security store',
    featured_image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo Cryptography Research Desk',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    content: `# What is CCA India Digital Signature — Why Indian Government PDFs Need It

Every day across India, millions of official digital documents are generated: e-Aadhaar cards from UIDAI, Form 16 statements from the Income Tax Department, driving licenses from Parivahan, and community certificates from state revenue departments.

At the bottom of every such authentic document lies an electronic signature. But what exactly is a **CCA India digital signature**, how does India's sovereign cryptographic hierarchy work, and why do these signatures fail to show a green checkmark on standard desktop software?

This technical deep dive explores India's Public Key Infrastructure (PKI), the legal architecture established by the Information Technology Act, 2000, and the technology that powers digital document verification.

---

## 1. What is Public Key Infrastructure (PKI)?

Public Key Infrastructure (PKI) is the cryptographic framework of hardware, software, policies, and standards that enables secure digital communication through asymmetric public-key cryptography.

In asymmetric cryptography:
- **Private Key:** Known only to the signer (e.g., stored on a cryptographic FIPS 140-2 hardware token or secure Hardware Security Module / HSM).
- **Public Key:** Published openly within a digital certificate signed by a trusted third-party authority.

When an Indian government entity digitally signs a PDF:
1. A mathematical hash (SHA-256) of the document content is computed.
2. The hash is encrypted with the authority's private key to produce the digital signature.
3. Anyone with the authority's public key can decrypt the signature and verify that the document has not been altered since the moment of signing.

---

## 2. The Role of CCA India and the RCAI Root

Under **Section 17 of the Information Technology Act, 2000**, the Government of India established the office of the **Controller of Certifying Authorities (CCA)** under the Ministry of Electronics and Information Technology (MeitY).

The CCA oversees and licenses all Certifying Authorities (CAs) operating within the Republic of India and manages the sovereign root of trust: the **Root Certifying Authority of India (RCAI)**.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│          Root Certifying Authority of India (RCAI)          │
│                Managed by CCA India / MeitY                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
  ┌─────────────────────────┐     ┌─────────────────────────┐
  │      NIC Sub-CA         │     │ Licensed Commercial CAs │
  │  (Govt / State Portals) │     │ (eMudhra, Protean, etc) │
  └────────────┬────────────┘     └────────────┬────────────┘
               │                               │
               ▼                               ▼
  ┌─────────────────────────┐     ┌─────────────────────────┐
  │ UIDAI, Parivahan, TNeGA │     │ Income Tax, MCA, Banks  │
  │   Document Signers      │     │  Corporate Signers      │
  └─────────────────────────┘     └─────────────────────────┘
\`\`\`

All licensed Certifying Authorities—such as the **National Informatics Centre (NIC CA)**, **eMudhra**, **Protean (formerly NSDL)**, **Capricorn**, and **IDRBT**—are cryptographic subordinates to the RCAI root.

---

## 3. Why Adobe Acrobat Shows "Signature Validity Unknown"

A common question among citizens is: *"If the document was signed by the Government of India, why does Adobe Acrobat say the signature is untrusted?"*

The answer comes down to **proprietary trust lists versus national sovereign trust**:
1. Adobe Acrobat maintains a commercial directory known as the **Adobe Approved Trust List (AATL)**. Software vendors charge certificate authorities substantial fees and require adherence to private audit regimes to be included in AATL.
2. Sovereign national root authorities (including India's RCAI) operate under independent statutory law and do not submit their national roots to private commercial tech vendors.
3. Because RCAI root certificates are not pre-packaged into default Windows or macOS trust stores, Adobe Acrobat cannot trace the trust chain to a root it knows, and therefore displays a yellow question mark.

---

## 4. How Long-Term Validation (LTV) Resolves the Trust Gap

When a certificate is verified, the verification engine queries Certificate Revocation Lists (CRLs) or Online Certificate Status Protocol (OCSP) responders to ensure the certificate was unrevoked at the moment of signing.

By embedding this validation evidence into the PDF's **/DSS (Document Security Store)** dictionary, the document achieves **Long-Term Validation (LTV)**:
- The certificate chain is permanently packaged into the file.
- The validity snapshot remains intact forever.
- Any viewer, whether on a smartphone or desktop, can instantly confirm the green checkmark without needing manual certificate installation.

---

## 5. Legal Validity Under IT Act 2000

Digital signatures executed through licensed Certifying Authorities under CCA India enjoy the highest level of legal evidentiary weight in Indian law:
- **Section 4:** Grants legal recognition to electronic records.
- **Section 5:** Grants digital signatures equal legal status with handwritten ink signatures.
- **Section 35:** Authorizes licensed CAs to issue digital signature certificates.
- **Section 85B of Indian Evidence Act:** Mandates a statutory judicial presumption that a securely signed digital document is authentic and unmodified.

---

## 6. How Kagazo Ephemerally Verifies CCA India Signatures

Kagazo operates an in-RAM cryptographic validation pipeline:
- Calculates SHA-256 byte-range hashes across PDF segments.
- Traverses the certificate path up to the RCAI root.
- Confirms OCSP/CRL revocation status.
- Generates an LTV-compliant Document Security Store and delivers the verified PDF instantly without saving a single byte to disk.`,
  },
  {
    id: 'post-9',
    title: 'DigiLocker PDF Signature Not Verified — How to Fix in 2026',
    slug: 'digilocker-pdf-signature-not-verified-fix',
    excerpt: 'Fix DigiLocker PDF certificates showing "signature not verified" or "validity unknown". Download an LTV-verified copy with permanent green checkmark using Kagazo free online tool.',
    category: 'Identity & DigiLocker',
    meta_description: 'Fix DigiLocker PDF showing signature not verified or unknown. Download verified copy with green tick using Kagazo free online tool.',
    meta_keywords: 'digilocker pdf signature not verified fix, digilocker green tick download, driving license digilocker signature unknown, cbse marksheet digital signature, verify digilocker pdf online',
    featured_image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo Security Desk',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    content: `# DigiLocker PDF Signature Not Verified — How to Fix in 2026

**DigiLocker**, the flagship digital document wallet initiative under Digital India, has transformed how Indian citizens carry and share official credentials. Over 200 million registered users access their Driving Licenses, Vehicle Registration Certificates (RC), CBSE Marksheets, and Degree Certificates directly from their phones.

However, a frequent point of confusion arises when users **download the PDF version** of their document and share it via email, WhatsApp, or job portals:

> **"Signature validity is UNKNOWN" or "The certificate is untrusted."**

Many administrative officials, police officers, and college clerks mistakenly believe that a document showing a yellow question mark is unverified or invalid. This guide explains why this occurs, the crucial difference between the DigiLocker app and downloaded PDFs, and how to obtain an authentic green checkmark using Kagazo.

---

## What is DigiLocker and How Does It Work?

DigiLocker is a secure cloud-based document repository platform operated by the **Ministry of Electronics and Information Technology (MeitY)**. 

Under the DigiLocker architecture, documents are not simple static scans uploaded by users. Instead, they are **"Issued Documents"** pulled directly from the issuing authority's database (e.g., Ministry of Road Transport and Highways for driving licenses, or CBSE for board marksheets) via API and digitally signed on the fly using cryptographic keys.

---

## Which Certifying Authorities Sign DigiLocker Documents?

Depending on the issuing agency, DigiLocker documents are signed by different government and institutional Certifying Authorities:
- **Driving Licenses & Vehicle RC:** Signed by **NIC Sub-CA for MoRTH (Parivahan)**.
- **CBSE Marksheets & Certificates:** Signed by **National Informatics Centre (NIC Sub-CA)** with CBSE signer attributes.
- **Degree Certificates & Diplomas:** Signed by the **National Academic Depository (NAD)** or respective university digital signer.
- **e-Aadhaar via DigiLocker:** Signed by **UIDAI Document Signer**.

All of these subordinate authorities fall directly under the **Root Certifying Authority of India (RCAI)**.

---

## Why Does the Signature Show "Unknown" on Downloaded PDFs?

There is a fundamental difference between viewing a credential inside the DigiLocker app versus opening a downloaded PDF file:
1. **Inside the DigiLocker App:** The app connects directly to MeitY's servers, which already trust the internal signing keys. The app displays an internal verified badge.
2. **Downloaded PDF File:** When you export the PDF, it is evaluated by standard PDF readers (Adobe Acrobat, Foxit, web browsers). Because these programs rely on Western commercial root stores that do not include India's sovereign RCAI root, they cannot validate the signature path and display a yellow question mark.

---

## Difference: DigiLocker Share Link vs. Downloaded PDF

| Feature | DigiLocker Share Link / App View | Downloaded PDF File |
| :--- | :--- | :--- |
| **Viewer Environment** | DigiLocker verified web portal | Adobe Acrobat, Chrome, Preview |
| **Trust Mechanism** | In-app API database check | Cryptographic X.509 signature audit |
| **Offline Access** | Requires active internet connection | Self-contained, works offline |
| **Common Issue** | Some portals do not accept links | Yellow question mark in external viewers |
| **Solution** | Use for instant in-person verification | Validate with Kagazo to embed green tick |

---

## How to Verify DigiLocker PDFs with Kagazo

1. **Download Document:** Open DigiLocker, go to **Issued Documents**, and download the PDF version of your Driving License, RC, or Marksheet.
2. **Upload to Kagazo:** Navigate to **[Kagazo.in](/#upload-zone)** and upload your downloaded file.
3. **Automatic Verification:** Kagazo validates the signature against the NIC/MeitY root hierarchy in ephemeral memory.
4. **Download Verified PDF:** Download your PDF with an embedded Document Security Store (DSS). It now opens with a verified green checkmark across all platforms.

---

## Statutory Legal Validity under Indian Law

Under **Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016**:

> *"The issued documents in DigiLocker system shall be deemed to be at par with original physical documents issued by the issuing authority for all legal intents and purposes."*

Furthermore, the **Ministry of Road Transport and Highways (MoRTH)** issued circular **RT-11036/64/2017-MVL** advising traffic police across all States and Union Territories that digital driving licenses and vehicle RCs presented through DigiLocker or verified PDF formats are legally binding, and officers cannot demand physical paper documents.`,
  },
  {
    id: 'post-10',
    title: 'GSTIN Verification Online — How to Check if a GST Number is Valid and Active',
    slug: 'gstin-verification-online-free',
    excerpt: 'Step-by-step guide to verifying any GSTIN number online free. Learn how to parse the 15-digit GST structure, verify registration status (Active, Cancelled, Suspended), and prevent input tax credit (ITC) fraud before vendor payment.',
    category: 'Tax & Compliance',
    meta_description: 'Verify any GSTIN number online free. Check if GST registration is active, cancelled or suspended instantly using Kagazo GST verifier.',
    meta_keywords: 'gstin verification online free, check gst number active or cancelled, verify gst status, 15 digit gst number format, gst search by pan, input tax credit itc fraud prevention, Kagazo gst verifier',
    featured_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo Tax Research Desk',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    content: `# GSTIN Verification Online — How to Check if a GST Number is Valid and Active

Under India's **Goods and Services Tax (GST)** regime, verifying the validity of a supplier's **Goods and Services Tax Identification Number (GSTIN)** is one of the most critical financial controls for businesses, freelancers, and accounting professionals.

Failing to verify a GSTIN before processing vendor invoices or making payments can lead to severe operational and financial penalties:
- **Denial of Input Tax Credit (ITC):** Under Section 16(2) of the CGST Act, 2017, you cannot claim tax credit if your vendor has not filed valid returns or if their GSTIN is cancelled.
- **Tax Penalties & Interest:** Claiming ineligible ITC results in 18% to 24% mandatory interest penalties and tax demand notices under Section 73/74.
- **Invoice Fraud:** Unscrupulous entities frequently print fabricated 15-digit GST numbers on fake invoices.

This comprehensive guide breaks down the 15-digit structure of a GSTIN, explains the difference between Active, Suspended, and Cancelled statuses, and demonstrates how to check any GSTIN instantly using the free Kagazo GST Verifier.

---

## What is a GSTIN?

A **Goods and Services Tax Identification Number (GSTIN)** is a unique, 15-character alphanumeric identification code assigned to every registered taxpayer, business entity, or service provider under the GST council of India.

Every GSTIN is inextricably tied to the taxpayer's **Permanent Account Number (PAN)** issued by the Income Tax Department.

---

## The 15-Digit GSTIN Structure Explained

The 15-digit GSTIN is mathematically structured into five distinct segments:

\`\`\`
┌────────────┬─────────────────────────┬──────────────┬──────────────┬──────────────┐
│  State (2) │         PAN (10)        │ Entity No(1) │ Default Z(1) │ Checksum (1) │
├────────────┼─────────────────────────┼──────────────┼──────────────┼──────────────┤
│     33     │       AAAAA0000A        │      1       │      Z       │      5       │
└────────────┴─────────────────────────┴──────────────┴──────────────┴──────────────┘
\`\`\`

### 1. State Code (Digits 1 & 2)
The first two digits represent the state code defined under the Indian Census 2011:
- \`33\`: Tamil Nadu
- \`27\`: Maharashtra
- \`29\`: Karnataka
- \`07\`: Delhi
- \`06\`: Haryana
- \`09\`: Uttar Pradesh
- \`32\`: Kerala
- \`36\`: Telangana

### 2. PAN Number (Digits 3 to 12)
The next 10 characters are the exact PAN of the business entity:
- First 3 characters: Alphabetic series (AAA to ZZZ).
- 4th character: Status of taxpayer (e.g., \`C\` for Company, \`P\` for Person/Individual, \`F\` for Firm, \`H\` for HUF).
- 5th character: First letter of taxpayer surname or company name.
- Next 4 digits: Sequential numbers (\`0001\` to \`9999\`).
- 10th character: PAN checksum letter.

### 3. Entity Code (Digit 13)
Represents the number of business registrations the same PAN holder has obtained within the same state. If a firm has two business verticals registered in Tamil Nadu, the first receives \`1\` and the second receives \`2\` (supports alphanumeric \`1\` to \`Z\`).

### 4. Default Character (Digit 14)
The 14th character is universally the alphabet letter **\`Z\`** by default.

### 5. Checksum Code (Digit 15)
The 15th character is a calculated checksum code (alphanumeric) used by automated verification algorithms to detect typographical errors.

---

## Understanding Registration Statuses: Active vs. Suspended vs. Cancelled

When verifying a vendor on the GST portal or Kagazo, you will encounter one of three primary statuses:

### 1. Active
The taxpayer is in full compliance. Their registration is valid, and they are authorized to collect GST on tax invoices and pass on Input Tax Credit (ITC). You can safely pay GST on their invoices.

### 2. Suspended
The GST department has temporarily frozen the taxpayer's registration—often due to continuous non-filing of GSTR-3B returns for 6 months or significant discrepancies between GSTR-1 outward supplies and GSTR-3B tax paid.
- **Risk:** A suspended taxpayer **cannot issue valid tax invoices** or collect GST from customers until the suspension is revoked.

### 3. Cancelled
The registration has been terminated either voluntarily by the business or suo-motu by the GST authorities for non-compliance or fraud.
- **Critical Danger:** Any GST paid to a vendor whose registration is cancelled is **100% ineligible for Input Tax Credit**. The purchasing company must bear the entire tax amount as a pure financial loss.

---

## Why You Must Verify GSTIN Before Vendor Payment

1. **Section 16(2)(aa) CGST Compliance:** The law prohibits claiming ITC unless the invoice details are accurately reported by the supplier in their GSTR-1 / IFF and reflected in the buyer's GSTR-2B.
2. **Prevent Fake Invoicing Syndicates:** Verifying the legal trade name ensures you are not dealing with shell entities operating under someone else's stolen GST details.
3. **TDS & TCS Reconciliation:** Guarantees accurate Section 51 GST-TDS or Section 194Q Income Tax TDS deductions against the valid PAN.

---

## How to Verify Any GSTIN on Kagazo Free

Kagazo provides a lightning-fast GST verification engine:
1. Open the **[Kagazo GST Verifier](/tools/gst-verifier)**.
2. Enter the 15-digit GSTIN number.
3. Instantly review:
   - **Legal Business Name & Trade Name**
   - **Current Status (Active / Suspended / Cancelled)**
   - **Date of Registration**
   - **Constitution of Business (Private Limited, Proprietorship, LLP)**
   - **Principal Place of Business & State Jurisdiction**

Verify every invoice before payment to safeguard your cash flow and ensure total tax compliance.`,
  },
  {
    id: 'post-tamil-community-cert',
    title: 'சமூக சான்றிதழ் கையொப்பம் சரிபார்க்கப்படவில்லை — இலவசமாக சரிசெய்வது எப்படி 2026',
    slug: 'community-certificate-signature-not-verified-free-fix-how-to-2026-tamil',
    excerpt: 'தமிழ்நாடு இ-சேவை (TNeGA) சமூக சான்றிதழில் வரும் "Signature Not Verified" அல்லது மஞ்சள் நிற கேள்விக்குறியை Adobe Acrobat இல்லாமல் நொடிகளில் பச்சை நிற சரிபார்ப்பு டிக் குறியாக மாற்றுவது எப்படி?',
    category: 'Tamil Nadu',
    meta_description: 'தமிழ்நாடு சமூக சான்றிதழ் டிஜிட்டல் கையொப்பம் சரிபார்ப்பு. மஞ்சள் நிற கேள்விக்குறியை இலவசமாக பச்சை டிக் ஆக மாற்றுவது எப்படி 2026 வழிகாட்டி.',
    meta_keywords: 'community certificate signature not verified tamil, tnega certificate digital signature, esevai community certificate green tick, சான்றிதழ் கையொப்பம் சரிபார்ப்பு, kagazo tamil nadu',
    featured_image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-12T10:00:00Z',
    author_name: 'Kagazo PKI தமிழ்நாடு பிரிவு',
    created_at: '2026-09-12T10:00:00Z',
    updated_at: '2026-09-12T10:00:00Z',
    lang: 'ta',
    hreflang_group: 'community-certificate-signature-not-verified',
    reading_time: 4,
    view_count: 142,
    tags: ['தமிழ்நாடு', 'சமூக சான்றிதழ்', 'டிஜிட்டல் கையொப்பம்', 'TNeGA', 'e-Sevai', 'Green Tick'],
    content: `# சமூக சான்றிதழ் கையொப்பம் சரிபார்க்கப்படவில்லை — இலவசமாக சரிசெய்வது எப்படி 2026

தமிழ்நாடு அரசு **இ-சேவை (TNeGA / TN e-District)** மூலமாக வழங்கப்படும் **சமூக சான்றிதழ் (Community Certificate)**, வருமானச் சான்றிதழ் (Income Certificate), இருப்பிடச் சான்றிதழ் (Nativity Certificate) போன்றவற்றை நீங்கள் பதிவிறக்கம் செய்யும்போது, பெரும்பாலான சந்தர்ப்பங்களில் டிஜிட்டல் கையொப்பப் பகுதியில்:

> **"Signature Not Verified" (கையொப்பம் சரிபார்க்கப்படவில்லை)** அல்லது **மஞ்சள் நிற கேள்விக்குறி (? / Yellow Question Mark)**

காண்பிக்கப்படுகிறது.

கல்லூரி சேர்க்கை, அரசு வேலைவாய்ப்பு விண்ணப்பங்கள் (TNPSC, UPSC, SSC, TRB) அல்லது வங்கி கடன்களுக்கு இந்த சான்றிதழை சமர்ப்பிக்கும் போது, அதிகாரிகள் **"பச்சை நிற டிக் மார்க் (Green Tick) உள்ள சான்றிதழை சமர்ப்பிக்கவும்"** என்று கூறி நிராகரிக்க வாய்ப்புள்ளது.

இந்த வழிகாட்டியில், Adobe Acrobat போன்ற எந்த மென்பொருளையும் நிறுவாமல், உங்கள் மொபைல் அல்லது கணினியிலேயே **Kagazo** மூலம் சில நொடிகளில் இதை இலவசமாக சரிசெய்வது எப்படி என்பதை விரிவாகப் பார்ப்போம்.

---

## சான்றிதழில் ஏன் "கையொப்பம் சரிபார்க்கப்படவில்லை" என்று வருகிறது?

தமிழ்நாடு அரசு வழங்கிய சான்றிதழ் போலி அல்ல. இது அதிகாரப்பூர்வமாக வட்டாட்சியர் (Tahsildar / Zonal Deputy Tahsildar) அவர்களால் டிஜிட்டல் முறையில் கையொப்பமிடப்பட்டது.

இருப்பினும் இந்த பிழை தோன்றுவதற்கு இரண்டு முக்கிய காரணங்கள் உள்ளன:

1. **ரூட் சான்றிதழ் அங்கீகாரம் இல்லாமை (Root Certificate Trust):** உங்கள் கணினி அல்லது மொபைலில் உள்ள PDF Reader மென்பொருளில் இந்திய அரசின் **Controller of Certifying Authorities (CCA India)** அல்லது e-Mudhra / NIC ரூட் சான்றிதழ்கள் சேர்க்கப்படவில்லை.
2. **மொபைல் போன்களின் வரம்பு:** Android அல்லது iPhone-ல் Adobe Reader நிறுவப்பட்டிருந்தாலும், அதில் சான்றிதழ் அமைப்புகளை (Trust Settings) கைமுறையாக மாற்றுவது மிகக் கடினம்.

---

## Kagazo மூலம் 2 நொடிகளில் பச்சை நிற டிக் ஆக மாற்றுவது எப்படி?

எந்த ஒரு கணினி மையத்திற்கும் (Browsing / Cyber Cafe) செல்ல வேண்டிய அவசியமில்லை. உங்கள் ஸ்மார்ட்போனிலேயே இதை உடனடியாகச் செய்யலாம்:

### படி 1: Kagazo தளத்திற்கு செல்லவும்
உங்கள் உலாவி (Chrome / Safari) மூலம் **[Kagazo.in](https://kagazo.in)** முதன்மைப் பக்கத்திற்குச் செல்லவும்.

### படி 2: உங்கள் சமூக சான்றிதழை பதிவேற்றவும்
- முகப்புப் பக்கத்தில் உள்ள **"Upload Signed PDF"** பகுதியில் உங்கள் PDF சமூக சான்றிதழை பதிவேற்றவும் (Drag & Drop அல்லது Browse).
- உங்கள் சான்றிதழ் பாதுகாப்பாக உலாவியிலேயே குறியாக்கம் செய்யப்படுகிறது; எந்த ரகசியத் தரவும் சேமிக்கப்படாது.

### படி 3: தானியங்கி சரிபார்ப்பு (Automated PKI Audit)
- Kagazo இந்திய மின்னணு தகவல் தொடர்பு அமைச்சகத்தின் (MeitY) CCA ரூட் சான்றிதழ் சங்கிலியுடன் டிஜிட்டல் கையொப்பத்தின் SHA-256 ஹாஷை சரிபார்க்கிறது.
- சான்றிதழில் அதிகாரப்பூர்வ **LTV (Long Term Validation)** பாதுகாப்பை உட்பொதிக்கிறது.

### படி 4: சரிபார்க்கப்பட்ட சான்றிதழை பதிவிறக்கவும்
- சரிபார்ப்பு முடிந்ததும், **"Download Verified PDF"** பொத்தானைக் கிளிக் செய்யவும்.
- இப்போது உங்கள் சமூக சான்றிதழில் அதிகாரப்பூர்வ **பச்சை நிற டிக் மார்க் (Green Verified Tick)** நிரந்தரமாகத் தோன்றும்!

---

## அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)

### 1. சரிபார்க்கப்பட்ட சான்றிதழ் அரசு வேலைகளுக்கு செல்லுபடியாகுமா?
ஆம்! TNPSC, UPSC, பள்ளி-கல்லூரி சேர்க்கை மற்றும் அனைத்து அரசு அமைப்புகளும் CCA India சான்றிதழ் பெற்ற இந்த டிஜிட்டல் சரிபார்ப்பை 100% சட்டப்பூர்வமாக அங்கீகரிக்கின்றன.

### 2. இந்த சேவைக்கு கட்டணம் செலுத்த வேண்டுமா?
இல்லை. Kagazo-வில் அனைத்து இந்திய அரசு PDF சான்றிதழ்களையும் சரிபார்ப்பது முற்றிலும் **இலவசம்**.

### 3. எனது தனிப்பட்ட ஆவணங்கள் பாதுகாப்பாக இருக்குமா?
நிச்சயமாக! Kagazo ஜீரோ-நாலேஜ் (Zero-Knowledge) தனியுரிமைக் கொள்கையைக் கடைப்பிடிக்கிறது. உங்கள் ஆவணங்கள் சரிபார்ப்பு முடிந்ததும் உங்கள் சாதனத்தில் மட்டுமே இருக்கும்.

இப்போதே உங்கள் சமூக சான்றிதழைப் பதிவேற்றி சரிபார்த்து பயன்பெறுங்கள்!`,
  },
];

export function calculateReadTime(content: string): string {
  if (!content) return '2 min read';
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt || '',
        content: d.content,
        meta_description: d.meta_description || '',
        meta_keywords: d.meta_keywords || '',
        featured_image_url: d.featured_image_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        category: d.category || 'Guides & Tutorials',
        published: Boolean(d.published),
        published_at: d.published_at,
        author_name: d.author_name || 'Kagazo Team',
        created_at: d.created_at,
        updated_at: d.updated_at,
        lang: d.lang || 'en',
        hreflang_group: d.hreflang_group || null,
        reading_time: d.reading_time || Math.ceil((d.content || '').trim().split(/\s+/).length / 200),
        view_count: typeof d.view_count === 'number' ? d.view_count : 0,
        tags: Array.isArray(d.tags) ? d.tags : [],
      }));
    }
  } catch (e) {
    console.debug('Supabase getPublishedBlogPosts fallback:', e);
  }

  return mockBlogPosts
    .filter((p) => p.published)
    .map((p) => ({
      ...p,
      lang: p.lang || 'en',
    }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || '',
        featured_image_url: data.featured_image_url || 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        category: data.category || 'Guides & Tutorials',
        published: Boolean(data.published),
        published_at: data.published_at,
        author_name: data.author_name || 'Kagazo Team',
        created_at: data.created_at,
        updated_at: data.updated_at,
        lang: data.lang || 'en',
        hreflang_group: data.hreflang_group || null,
        reading_time: data.reading_time || Math.ceil((data.content || '').trim().split(/\s+/).length / 200),
        view_count: typeof data.view_count === 'number' ? data.view_count : 0,
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    }
  } catch (e) {
    console.debug('Supabase getBlogPostBySlug fallback:', e);
  }

  const found = mockBlogPosts.find((p) => p.slug === slug && p.published);
  return found ? { ...found, lang: found.lang || 'en' } : null;
}

export async function incrementBlogView(slug: string): Promise<number> {
  // 1. Try Supabase RPC
  try {
    const { error } = await supabase.rpc('increment_view_count', { post_slug: slug });
    if (!error) {
      const { data } = await supabase.from('blog_posts').select('view_count').eq('slug', slug).single();
      if (data && typeof data.view_count === 'number') return data.view_count;
    }
  } catch (e) {
    console.debug('Supabase increment_view_count fallback:', e);
  }

  // 2. Fallback in-memory
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (post) {
    post.view_count = (post.view_count || 0) + 1;
    return post.view_count;
  }
  return 1;
}

export async function getRelatedBlogPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  const all = await getPublishedBlogPosts();
  const others = all.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3);
  }
  return others.slice(0, 3);
}

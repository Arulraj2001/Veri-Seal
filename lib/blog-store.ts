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
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How to Fix the Yellow Question Mark on e-Aadhaar PDFs Permanently',
    slug: 'fix-yellow-question-mark-aadhaar-pdf',
    excerpt: 'Step-by-step cryptographic guide explaining why Adobe Acrobat displays "Signature validity is unknown" on Indian government digital documents and how to convert it to a verified green tick.',
    category: 'Guides & Tutorials',
    content: `# Understanding Indian Digital Signatures on e-Aadhaar

When you download your official **e-Aadhaar letter** from the UIDAI portal and open it in Adobe Acrobat Reader on a Windows, Mac, or mobile device, you will almost invariably encounter a prominent yellow question mark stating:

> **"Signature validity is unknown. The author has digitally signed this document with an uncertified or untrusted certificate."**

This common issue causes thousands of citizens anxiety when submitting documents for passports, bank accounts, university admissions, and government job verifications.

---

## Why Does This Yellow Question Mark Appear?

To understand why this happens, it is necessary to examine how public key cryptography operates within the PDF specification (ISO 32000-1):

1. **Adobe Approved Trust List (AATL):** Adobe Acrobat maintains an embedded trust repository comprising commercial certificate authorities (e.g., DigiCert, GlobalSign).
2. **CCA India Sovereignty:** Under the Information Technology Act 2000, India operates its own sovereign PKI root hierarchy presided over by the **Controller of Certifying Authorities (CCA)** through the **Root Certifying Authority of India (RCAI)**.
3. **Missing Root in Western OS Stores:** The CCA India root certificates are not bundled into standard Western operating system trust stores by default. Hence, standard PDF viewers cannot build the cryptographic trust chain to the root.

---

## How VeriSeal Resolves This Without Complex Software

Instead of manually importing .cer files into Adobe Acrobat's trust settings on every computer, VeriSeal inspects and validates the signature against the actual CCA India root repository:

1. **ByteRange Integrity Audit:** VeriSeal calculates the exact SHA-256 hash of the signed byte segments and confirms that 0 bytes were altered after signing.
2. **Chain Validation:** Validates the intermediate certificate (e.g., *NIC Sub-CA*, *eMudhra*, or *CCA India 2014/2022*) back to the RCAI root.
3. **Long-Term Validation (LTV) Stamping:** VeriSeal embeds a cryptographically sealed Document Security Store (\`/DSS\`) dictionary into the PDF. Once stamped, Adobe Reader recognizes the signature as **"Signature is valid and LTV enabled"** with a permanent green tick.

---

## Step-by-Step Instructions to Verify Your e-Aadhaar

Follow these 4 simple steps to verify your e-Aadhaar document:

1. **Upload your PDF:** Drag and drop your downloaded e-Aadhaar file into VeriSeal.
2. **Enter Document Password:** For Aadhaar, your password is the first 4 letters of your name in CAPITAL letters followed by your 4-digit birth year (e.g., \`RAMA1995\`).
3. **Instant PKI Verification:** VeriSeal evaluates the cryptographic envelope in memory in under 2 seconds.
4. **Download Verified Copy:** Save your verified PDF with permanent LTV compliance, ready for official submission anywhere in India.`,
    meta_description: 'Fix yellow question mark on e-Aadhaar PDF into green tick verified by CCA India. Free online digital signature verification without Adobe certificate imports.',
    meta_keywords: 'aadhaar signature verify, yellow question mark fix, uidai green tick, pyhanko digital signature, aadhaar pdf signature valid',
    featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-01T10:00:00Z',
    author_name: 'VeriSeal Security Desk',
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'post-2',
    title: 'The Legal Status of Digital Signatures under the Information Technology Act 2000',
    slug: 'legal-status-digital-signatures-it-act-india',
    excerpt: 'Comprehensive legal analysis of Section 3, Section 5, and Section 65B of the Indian Evidence Act regarding electronic signatures and tamper-evident government certificates.',
    category: 'Legal & Compliance',
    content: `# Digital Signatures Under the Information Technology Act 2000

In the digital era, physical handwritten signatures on paper are rapidly being replaced by cryptographically secure electronic signatures. In India, the legal foundation for this transition is anchored in the **Information Technology Act, 2000 (IT Act 2000)**.

---

## Key Provisions of the IT Act

### 1. Section 3: Authentication of Electronic Records
Section 3 provides that any subscriber may authenticate an electronic record by affixing their digital signature created through an **asymmetric cryptosystem** and hash function.

### 2. Section 5: Legal Recognition of Electronic Signatures
Section 5 explicitly equates digital signatures with physical handwritten signatures:
> *"Where any law provides that information or any other matter shall be in writing or in the typewritten or printed form, then, notwithstanding anything contained in such law, such requirement shall be deemed to have been satisfied if such information or matter is rendered or made available in an electronic form; and accessible so as to be usable for a subsequent reference."*

### 3. Section 65B of the Indian Evidence Act
Under Section 65B, electronic records bearing verified digital signatures are admissible in courts of law as secondary evidence without requiring the physical server or device to be produced before the bench.

---

## Recognized Certifying Authorities in India

The Controller of Certifying Authorities (CCA) licenses specific agencies to issue Digital Signature Certificates (DSC) to government departments, businesses, and citizens:

- **National Informatics Centre (NIC):** Issues DSCs for district collectors, revenue tahsildars, judicial officers, and central government officials.
- **e-Mudhra:** Commercial CA widely utilized by MCA, GSTN, and income tax filing portals.
- **Protean (formerly NSDL):** Authority for PAN cards and tax deduction documentation.
- **Capricorn CA & (n)Code Solutions:** Extensively used in municipal tenders and e-governance applications.

---

## How to Prove Document Integrity in Indian Courts

When submitting a digitally signed revenue certificate (such as a Community, Nativity, or Income Certificate) in Indian legal proceedings:

1. **Verification Report:** A certificate verification log confirming zero post-signature alterations.
2. **Signer Identity Confirmation:** The signer's common name (CN) matching the designated public officer.
3. **Timestamping & CRL Check:** Confirmation that the certificate was unrevoked at the exact time of signing.

VeriSeal automates this entire audit trail in real-time.`,
    meta_description: 'Legal validity of digital signatures in Indian courts under Section 5 of the IT Act 2000. Learn how CCA India regulates digital certificate authorities.',
    meta_keywords: 'it act 2000 digital signature, cca india legal validity, section 5 it act, dsc certificate legal status, section 65b evidence act',
    featured_image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-04T12:00:00Z',
    author_name: 'VeriSeal Legal Advisory',
    created_at: '2026-09-04T12:00:00Z',
    updated_at: '2026-09-04T12:00:00Z',
  },
  {
    id: 'post-3',
    title: 'How to Verify Tamil Nadu Community & Nativity Certificates Issued via TNeGA e-Sevai',
    slug: 'verify-tamil-nadu-community-nativity-certificate',
    excerpt: 'Detailed tutorial for students and job aspirants on validating digital signatures on Tamil Nadu Revenue Department caste, community, and income certificates.',
    category: 'State Portals',
    content: `# Verifying Tamil Nadu Revenue Department Certificates

Every year, millions of citizens in Tamil Nadu apply for **Community Certificates, Nativity Certificates, Income Certificates, and First Graduate Certificates** through **e-Sevai centers** or the **TNeGA Citizen Portal**.

These certificates are issued exclusively in digital format with an electronic signature from the Zonal Deputy Tahsildar or Revenue Authority.

---

## Common Signature Verification Issues on e-Sevai Certificates

When students submit their community certificates for **TNEA Engineering Counseling, NEET Admissions, or TNPSC examinations**, verification officers frequently encounter:

- An unverified yellow question mark over the signature panel.
- An error reading *"Signer's identity is unverified"*.
- Rejection by automated document processing portals.

---

## The Technical Verification Process

Tamil Nadu digital certificates are signed using DSC tokens issued by **NIC Sub-CA for Tamil Nadu e-District**.

1. **Cryptographic Validation:** VeriSeal matches the certificate against the NIC CA 2014/2017 root anchors.
2. **Revenue Officer Authenticity:** Verifies the name and designation of the Zonal Deputy Tahsildar.
3. **Application Number & QR Cross-Reference:** Ensures the embedded certificate parameters align with the official e-District database.

---

## Recommended Verification Workflow

1. Download the original PDF copy directly from the **TNeGA Portal (edistricts.tn.gov.in)**.
2. Drag and drop the file into VeriSeal.
3. Verify that the signature displays **Valid** with **NIC Sub-CA** credentials.
4. Download the LTV-stamped copy with the permanent green tick before submitting to universities or government recruitment boards.`,
    meta_description: 'Verify digital signature on Tamil Nadu revenue department community certificate issued via e-Sevai / TNeGA portal. Step-by-step TNEA & TNPSC verification.',
    meta_keywords: 'tamil nadu community certificate verify, tnega digital signature, esevai certificate verification, tnea counseling signature verify',
    featured_image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-07T09:00:00Z',
    author_name: 'VeriSeal Citizen Services',
    created_at: '2026-09-07T09:00:00Z',
    updated_at: '2026-09-07T09:00:00Z',
  },
  {
    id: 'post-4',
    title: 'Demystifying PDF Signatures: The ByteRange and DSS Architecture Explained',
    slug: 'demystifying-pdf-signatures-byterange-dss-architecture',
    excerpt: 'An in-depth technical deep-dive into the PDF /ByteRange array, SubFilter adbe.pkcs7.detached, and Document Security Store (DSS) dictionaries.',
    category: 'PKI & Cryptography',
    content: `# Inside the PDF Digital Signature Structure

A digital signature in a PDF document does not merely embed a graphic image of a pen stroke. It constitutes a sophisticated cryptographic envelope defined in Section 12.8 of ISO 32000-1.

---

## The /ByteRange Parameter

Unlike regular binary files where hashing the entire file produces a signature, signing a PDF requires excluding the signature container itself to avoid circular references:

\`\`\`text
/ByteRange [ 0, 12450, 24500, 89100 ]
\`\`\`

- **0 to 12450:** Bytes from the beginning of the file up to the signature value.
- **24500 to 89100:** Bytes immediately following the closing hex bracket of the signature container to the end of the file.

If even a single byte is changed between these ranges after signing, the calculated hash will diverge, triggering a **"Document has been altered or corrupted"** alert.

---

## Document Security Store (/DSS) and LTV

Standard digital signatures risk becoming unvalidatable once the signing certificate expires or the Certificate Revocation List (CRL) server goes offline.

**Long-Term Validation (LTV)** solves this through the \`/DSS\` dictionary:
- Embeds all intermediate certificate chains.
- Embeds OCSP responses and CRL caches valid at the time of signing.
- Ensures the document remains verifiable for 20+ years into the future.

VeriSeal automatically generates and inserts standards-compliant DSS dictionaries into verified files.`,
    meta_description: 'Technical deep-dive into PDF digital signature byte ranges, cryptographic hash checking, and LTV DSS dictionaries according to ISO 32000-1 standards.',
    meta_keywords: 'pdf byterange explained, pdf digital signature structure, ltv dss dictionary, pyhanko signature validation, pki cryptography',
    featured_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    published: true,
    published_at: '2026-09-08T15:00:00Z',
    author_name: 'VeriSeal Engineering Lab',
    created_at: '2026-09-08T15:00:00Z',
    updated_at: '2026-09-08T15:00:00Z',
  }
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
        author_name: d.author_name || 'VeriSeal Desk',
        created_at: d.created_at,
        updated_at: d.updated_at,
      }));
    }
  } catch (e) {
    console.debug('Supabase getPublishedBlogPosts fallback:', e);
  }

  return mockBlogPosts.filter((p) => p.published);
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
        author_name: data.author_name || 'VeriSeal Desk',
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    }
  } catch (e) {
    console.debug('Supabase getBlogPostBySlug fallback:', e);
  }

  const found = mockBlogPosts.find((p) => p.slug === slug && p.published);
  return found || null;
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

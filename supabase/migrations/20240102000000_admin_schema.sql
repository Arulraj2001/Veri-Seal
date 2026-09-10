-- VeriSeal Phase 4 Admin Dashboard Schema Migration

-- 1. Update Users Table with Role and Banned columns
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' 
  CHECK (role IN ('user', 'admin'));

ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT false;

-- 2. Create Dynamic Site Content Table
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, language)
);

-- 3. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  author_name TEXT DEFAULT 'VeriSeal Team',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create SEO Pages Table
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  h1 TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  intro_text TEXT,
  doc_type TEXT,
  state TEXT,
  portal TEXT,
  faq JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Pre-populate 10 Target Indian Government Document SEO Pages
INSERT INTO seo_pages (slug, title, h1, meta_description, meta_keywords, intro_text, doc_type, state, portal, faq, published)
VALUES
(
  'verify-aadhaar-pdf',
  'Verify e-Aadhaar PDF Digital Signature Online | VeriSeal',
  'Verify UIDAI e-Aadhaar Digital Signature Online',
  'Verify the digital signature on your downloaded e-Aadhaar PDF. Fix yellow question mark into green tick verified by CCA India.',
  'verify aadhaar signature, aadhaar digital signature verify, uidai green tick, aadhaar yellow question mark fix',
  'Validate the cryptographic digital signature of UIDAI e-Aadhaar letters issued through the myAadhaar portal. Ensures no post-issuance tampering.',
  'e-Aadhaar Letter',
  'All India',
  'UIDAI myAadhaar Portal',
  '[{"q":"Why does my Aadhaar PDF show a yellow question mark?","a":"Adobe Reader does not automatically trust the CCA India root certificate. VeriSeal verifies the signature against the official RCAI trust chain."},{"q":"Is it safe to upload my Aadhaar card?","a":"Yes. VeriSeal processes all files strictly in-memory (RAM) and immediately purges data after cryptographic verification."}]'::jsonb,
  true
),
(
  'verify-community-certificate-tamil-nadu',
  'Verify Tamil Nadu Community Certificate Signature | VeriSeal',
  'Verify Tamil Nadu Community Certificate Digital Signature',
  'Verify digital signature on Tamil Nadu revenue department community certificate issued via e-Sevai / TNeGA portal.',
  'tamil nadu community certificate verify, tnega digital signature, esevai certificate verification',
  'Authenticates digitally signed caste and community certificates issued by Revenue Authorities across all 38 districts of Tamil Nadu.',
  'Community Certificate',
  'Tamil Nadu',
  'Tamil Nadu e-District / TNeGA',
  '[{"q":"How to verify TNeGA certificate signature?","a":"Upload the digital certificate PDF downloaded from e-Sevai. VeriSeal validates the signature of the Zonal Deputy Tahsildar against CCA India roots."}]'::jsonb,
  true
),
(
  'verify-nativity-certificate-tamil-nadu',
  'Verify Tamil Nadu Nativity Certificate Signature | VeriSeal',
  'Verify Tamil Nadu Nativity Certificate Digital Signature',
  'Check digital signature authenticity on Tamil Nadu nativity and residence certificates issued via TNeGA.',
  'tamil nadu nativity certificate signature, verify esevai residence certificate',
  'Verify that your Tamil Nadu nativity certificate is digitally signed and untouched since issuance by the Revenue Administration.',
  'Nativity Certificate',
  'Tamil Nadu',
  'Tamil Nadu e-Sevai Portal',
  '[{"q":"Who signs the Nativity Certificate?","a":"The certificate is digitally signed with an DSC issued by NIC Sub-CA under CCA India."}]'::jsonb,
  true
),
(
  'verify-income-certificate',
  'Verify Income Certificate Digital Signature Online | VeriSeal',
  'Verify Income Certificate Digital Signature',
  'Verify government income certificate digital signature across Tamil Nadu, Karnataka, AP, Telangana and other states.',
  'income certificate verify online, revenue income certificate signature, tahsildar dsc verification',
  'Confirm the cryptographic validity of income certificates issued for scholarship, fee reimbursement, and government welfare schemes.',
  'Income Certificate',
  'All India',
  'State Revenue e-District Portals',
  '[{"q":"Can I submit VeriSeal verified income certificate for scholarships?","a":"Yes. VeriSeal embeds LTV (Long-Term Validation) ensuring all PDF viewers display the verified green checkmark."}]'::jsonb,
  true
),
(
  'verify-pan-card-pdf',
  'Verify e-PAN Card Digital Signature Online | VeriSeal',
  'Verify Income Tax Department e-PAN Card Digital Signature',
  'Verify digital signature on NSDL / UTIITSL / Income Tax portal e-PAN cards instantly.',
  'verify pan card signature, e-pan digital signature verify, protean nsdl pan signature',
  'Evaluates the digital signature issued by Protean eGov Technologies (NSDL) or UTIITSL on newly allotted or reprinted e-PAN cards.',
  'e-PAN Card',
  'All India',
  'Income Tax e-Filing / Protean',
  '[{"q":"How do I know my e-PAN signature is valid?","a":"VeriSeal checks the e-Mudhra or (n)Code CA certificate hierarchy under CCA India."}]'::jsonb,
  true
),
(
  'verify-birth-certificate',
  'Verify Digital Birth Certificate Signature Online | VeriSeal',
  'Verify Municipal Birth Certificate Digital Signature',
  'Check validity of digital signatures on municipal corporation and state registrar birth certificates.',
  'birth certificate signature check, civil registration system birth certificate verify',
  'Validates municipal authority and Registrar of Births and Deaths digital certificates across India.',
  'Birth Certificate',
  'All India',
  'Civil Registration System (CRS India)',
  '[{"q":"Does VeriSeal support state municipal certificates?","a":"Yes, certificates signed using CCA-licensed CAs (e-Mudhra, NIC, Sify, Capricorn) are supported."}]'::jsonb,
  true
),
(
  'verify-digilocker-pdf',
  'Verify DigiLocker PDF Digital Signature | VeriSeal',
  'Verify DigiLocker Issued Document Digital Signature',
  'Verify digital signatures on documents issued by DigiLocker National Digital Locker System.',
  'digilocker signature verify, verify digilocker green tick, digilocker pdf valid',
  'Audit documents pulled from DigiLocker to confirm the official DigiLocker CA signature integrity.',
  'DigiLocker Issued Document',
  'All India',
  'National DigiLocker Portal',
  '[{"q":"Are DigiLocker documents legally valid?","a":"Yes, under Rule 9A of the IT Rules 2016. VeriSeal confirms the document has not been altered."}]'::jsonb,
  true
),
(
  'verify-itr-v',
  'Verify Income Tax ITR-V Acknowledgment Signature | VeriSeal',
  'Verify ITR-V Income Tax Return Acknowledgment Signature',
  'Verify digital signature on Income Tax Return (ITR-V) acknowledgment receipts.',
  'verify itr-v signature, income tax return acknowledgment signature, cpc bengaluru signature',
  'Checks the Centralized Processing Center (CPC Bengaluru) digital signature on filed income tax return acknowledgments.',
  'ITR-V Acknowledgment',
  'All India',
  'Income Tax e-Filing Portal',
  '[{"q":"Does ITR-V need physical signature if digitally signed?","a":"If digitally verified through Aadhaar OTP or DSC, physical submission is not required."}]'::jsonb,
  true
),
(
  'aadhaar-pdf-yellow-question-mark-fix',
  'Fix Yellow Question Mark on Aadhaar PDF | VeriSeal',
  'Fix Aadhaar Card Yellow Question Mark into Green Tick',
  'Learn how to fix signature validity unknown and convert yellow question mark into green tick permanently.',
  'aadhaar yellow question mark fix, signature not verified aadhaar, convert yellow question mark to green tick',
  'Automated one-click LTV stamping that fixes the yellow question mark on Aadhaar PDFs without manually installing certificates.',
  'e-Aadhaar Letter',
  'All India',
  'UIDAI myAadhaar Portal',
  '[{"q":"Why do I see a yellow question mark in Acrobat?","a":"Adobe Acrobat does not include Indian CCA root certificates in its default AATL trust store."}]'::jsonb,
  true
),
(
  'meeseva-certificate-verify',
  'Verify MeeSeva Certificate Digital Signature Online | VeriSeal',
  'Verify Andhra Pradesh & Telangana MeeSeva Certificate Signature',
  'Verify digital signatures on caste, income, residence, and land certificates issued through MeeSeva portal.',
  'meeseva certificate verify, ap meeseva digital signature, ts meeseva certificate check',
  'Verifies digital signatures on MeeSeva certificates issued across Andhra Pradesh and Telangana.',
  'MeeSeva Certificate',
  'AP & Telangana',
  'MeeSeva Portal',
  '[{"q":"Which MeeSeva certificates are supported?","a":"All digitally signed G.O. and citizen certificates issued by APOnline / TSOnline."}]'::jsonb,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- RLS policies for Content, Blog, and SEO Pages
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "content_public_read" ON content;
CREATE POLICY "content_public_read" ON content FOR SELECT USING (true);

DROP POLICY IF EXISTS "blog_public_read" ON blog_posts;
CREATE POLICY "blog_public_read" ON blog_posts FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "seo_pages_public_read" ON seo_pages;
CREATE POLICY "seo_pages_public_read" ON seo_pages FOR SELECT USING (published = true);

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

interface SeoPage {
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
  faq: Array<{ q: string; a: string }>;
  published: boolean;
  updated_at: string;
}

let mockSeoPages: SeoPage[] = [
  {
    id: 'seo-1',
    slug: 'verify-aadhaar-pdf',
    title: 'Verify e-Aadhaar PDF Digital Signature Online | VeriSeal',
    h1: 'Verify UIDAI e-Aadhaar Digital Signature Online',
    meta_description: 'Verify the digital signature on your downloaded e-Aadhaar PDF. Fix yellow question mark into green tick verified by CCA India.',
    meta_keywords: 'verify aadhaar signature, aadhaar digital signature verify, uidai green tick, aadhaar yellow question mark fix',
    intro_text: 'Validate the cryptographic digital signature of UIDAI e-Aadhaar letters issued through the myAadhaar portal. Ensures no post-issuance tampering.',
    doc_type: 'e-Aadhaar Letter',
    state: 'All India',
    portal: 'UIDAI myAadhaar Portal',
    faq: [
      { q: 'Why does my Aadhaar PDF show a yellow question mark?', a: 'Adobe Reader does not automatically trust the CCA India root certificate. VeriSeal verifies the signature against the official RCAI trust chain.' },
      { q: 'Is it safe to upload my Aadhaar card?', a: 'Yes. VeriSeal processes all files strictly in-memory (RAM) and immediately purges data after cryptographic verification.' }
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
    meta_keywords: 'tamil nadu community certificate verify, tnega digital signature, esevai certificate verification',
    intro_text: 'Authenticates digitally signed caste and community certificates issued by Revenue Authorities across all 38 districts of Tamil Nadu.',
    doc_type: 'Community Certificate',
    state: 'Tamil Nadu',
    portal: 'Tamil Nadu e-District / TNeGA',
    faq: [
      { q: 'How to verify TNeGA certificate signature?', a: 'Upload the digital certificate PDF downloaded from e-Sevai. VeriSeal validates the signature of the Zonal Deputy Tahsildar against CCA India roots.' }
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
    meta_keywords: 'tamil nadu nativity certificate signature, verify esevai residence certificate',
    intro_text: 'Verify that your Tamil Nadu nativity certificate is digitally signed and untouched since issuance by the Revenue Administration.',
    doc_type: 'Nativity Certificate',
    state: 'Tamil Nadu',
    portal: 'Tamil Nadu e-Sevai Portal',
    faq: [
      { q: 'Who signs the Nativity Certificate?', a: 'The certificate is digitally signed with an DSC issued by NIC Sub-CA under CCA India.' }
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
    meta_keywords: 'income certificate verify online, revenue income certificate signature, tahsildar dsc verification',
    intro_text: 'Confirm the cryptographic validity of income certificates issued for scholarship, fee reimbursement, and government welfare schemes.',
    doc_type: 'Income Certificate',
    state: 'All India',
    portal: 'State Revenue e-District Portals',
    faq: [
      { q: 'Can I submit VeriSeal verified income certificate for scholarships?', a: 'Yes. VeriSeal embeds LTV (Long-Term Validation) ensuring all PDF viewers display the verified green checkmark.' }
    ],
    published: true,
    updated_at: '2026-09-04T13:00:00Z',
  },
  {
    id: 'seo-5',
    slug: 'verify-pan-card-pdf',
    title: 'Verify e-PAN Card Digital Signature Online | VeriSeal',
    h1: 'Verify Income Tax Department e-PAN Card Digital Signature',
    meta_description: 'Verify digital signature on NSDL / UTIITSL / Income Tax portal e-PAN cards instantly.',
    meta_keywords: 'verify pan card signature, e-pan digital signature verify, protean nsdl pan signature',
    intro_text: 'Evaluates the digital signature issued by Protean eGov Technologies (NSDL) or UTIITSL on newly allotted or reprinted e-PAN cards.',
    doc_type: 'e-PAN Card',
    state: 'All India',
    portal: 'Income Tax e-Filing / Protean',
    faq: [
      { q: 'How do I know my e-PAN signature is valid?', a: 'VeriSeal checks the e-Mudhra or (n)Code CA certificate hierarchy under CCA India.' }
    ],
    published: true,
    updated_at: '2026-09-05T14:00:00Z',
  },
  {
    id: 'seo-6',
    slug: 'verify-birth-certificate',
    title: 'Verify Digital Birth Certificate Signature Online | VeriSeal',
    h1: 'Verify Municipal Birth Certificate Digital Signature',
    meta_description: 'Check validity of digital signatures on municipal corporation and state registrar birth certificates.',
    meta_keywords: 'birth certificate signature check, civil registration system birth certificate verify',
    intro_text: 'Validates municipal authority and Registrar of Births and Deaths digital certificates across India.',
    doc_type: 'Birth Certificate',
    state: 'All India',
    portal: 'Civil Registration System (CRS India)',
    faq: [
      { q: 'Does VeriSeal support state municipal certificates?', a: 'Yes, certificates signed using CCA-licensed CAs (e-Mudhra, NIC, Sify, Capricorn) are supported.' }
    ],
    published: true,
    updated_at: '2026-09-06T15:00:00Z',
  },
  {
    id: 'seo-7',
    slug: 'verify-digilocker-pdf',
    title: 'Verify DigiLocker PDF Digital Signature | VeriSeal',
    h1: 'Verify DigiLocker Issued Document Digital Signature',
    meta_description: 'Verify digital signatures on documents issued by DigiLocker National Digital Locker System.',
    meta_keywords: 'digilocker signature verify, verify digilocker green tick, digilocker pdf valid',
    intro_text: 'Audit documents pulled from DigiLocker to confirm the official DigiLocker CA signature integrity.',
    doc_type: 'DigiLocker Issued Document',
    state: 'All India',
    portal: 'National DigiLocker Portal',
    faq: [
      { q: 'Are DigiLocker documents legally valid?', a: 'Yes, under Rule 9A of the IT Rules 2016. VeriSeal confirms the document has not been altered.' }
    ],
    published: true,
    updated_at: '2026-09-07T16:00:00Z',
  },
  {
    id: 'seo-8',
    slug: 'verify-itr-v',
    title: 'Verify Income Tax ITR-V Acknowledgment Signature | VeriSeal',
    h1: 'Verify ITR-V Income Tax Return Acknowledgment Signature',
    meta_description: 'Verify digital signature on Income Tax Return (ITR-V) acknowledgment receipts.',
    meta_keywords: 'verify itr-v signature, income tax return acknowledgment signature, cpc bengaluru signature',
    intro_text: 'Checks the Centralized Processing Center (CPC Bengaluru) digital signature on filed income tax return acknowledgments.',
    doc_type: 'ITR-V Acknowledgment',
    state: 'All India',
    portal: 'Income Tax e-Filing Portal',
    faq: [
      { q: 'Does ITR-V need physical signature if digitally signed?', a: 'If digitally verified through Aadhaar OTP or DSC, physical submission is not required.' }
    ],
    published: true,
    updated_at: '2026-09-08T17:00:00Z',
  },
  {
    id: 'seo-9',
    slug: 'aadhaar-pdf-yellow-question-mark-fix',
    title: 'Fix Yellow Question Mark on Aadhaar PDF | VeriSeal',
    h1: 'Fix Aadhaar Card Yellow Question Mark into Green Tick',
    meta_description: 'Learn how to fix signature validity unknown and convert yellow question mark into green tick permanently.',
    meta_keywords: 'aadhaar yellow question mark fix, signature not verified aadhaar, convert yellow question mark to green tick',
    intro_text: 'Automated one-click LTV stamping that fixes the yellow question mark on Aadhaar PDFs without manually installing certificates.',
    doc_type: 'e-Aadhaar Letter',
    state: 'All India',
    portal: 'UIDAI myAadhaar Portal',
    faq: [
      { q: 'Why do I see a yellow question mark in Acrobat?', a: 'Adobe Acrobat does not include Indian CCA root certificates in its default AATL trust store.' }
    ],
    published: true,
    updated_at: '2026-09-09T18:00:00Z',
  },
  {
    id: 'seo-10',
    slug: 'meeseva-certificate-verify',
    title: 'Verify MeeSeva Certificate Digital Signature Online | VeriSeal',
    h1: 'Verify Andhra Pradesh & Telangana MeeSeva Certificate Signature',
    meta_description: 'Verify digital signatures on caste, income, residence, and land certificates issued through MeeSeva portal.',
    meta_keywords: 'meeseva certificate verify, ap meeseva digital signature, ts meeseva certificate check',
    intro_text: 'Verifies digital signatures on MeeSeva certificates issued across Andhra Pradesh and Telangana.',
    doc_type: 'MeeSeva Certificate',
    state: 'AP & Telangana',
    portal: 'MeeSeva Portal',
    faq: [
      { q: 'Which MeeSeva certificates are supported?', a: 'All digitally signed G.O. and citizen certificates issued by APOnline / TSOnline.' }
    ],
    published: true,
    updated_at: '2026-09-10T09:00:00Z',
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = mockSeoPages.find((p) => p.slug === slug);
      if (!page) {
        return NextResponse.json({ error: 'SEO page not found' }, { status: 404 });
      }
      return NextResponse.json({ page });
    }

    return NextResponse.json({ pages: mockSeoPages });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const body = await req.json();
    const {
      slug,
      title,
      h1,
      meta_description,
      meta_keywords,
      intro_text,
      doc_type,
      state,
      portal,
      faq,
      published,
    } = body;

    if (!slug || !title || !h1) {
      return NextResponse.json({ error: 'Slug, title, and H1 heading are required.' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();
    const existing = mockSeoPages.find((p) => p.slug === slug);

    if (existing) {
      existing.title = title;
      existing.h1 = h1;
      existing.meta_description = meta_description || '';
      existing.meta_keywords = meta_keywords || '';
      existing.intro_text = intro_text || '';
      existing.doc_type = doc_type || '';
      existing.state = state || '';
      existing.portal = portal || '';
      existing.faq = faq || [];
      existing.published = Boolean(published);
      existing.updated_at = nowIso;
      return NextResponse.json({ success: true, page: existing });
    } else {
      const newPage: SeoPage = {
        id: `seo-${Date.now()}`,
        slug,
        title,
        h1,
        meta_description: meta_description || '',
        meta_keywords: meta_keywords || '',
        intro_text: intro_text || '',
        doc_type: doc_type || '',
        state: state || '',
        portal: portal || '',
        faq: faq || [],
        published: Boolean(published),
        updated_at: nowIso,
      };
      mockSeoPages.unshift(newPage);
      return NextResponse.json({ success: true, page: newPage });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

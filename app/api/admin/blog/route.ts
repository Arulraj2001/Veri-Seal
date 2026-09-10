import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string;
  meta_keywords: string;
  featured_image_url: string;
  published: boolean;
  published_at?: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
}

let mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How to Fix the Yellow Question Mark on e-Aadhaar PDFs Permanently',
    slug: 'fix-yellow-question-mark-aadhaar-pdf',
    excerpt: 'Step-by-step cryptographic guide explaining why Adobe Acrobat displays "Signature validity is unknown" on Indian government digital documents.',
    content: `# Understanding Indian Digital Signatures on e-Aadhaar

When you open a downloaded e-Aadhaar letter in Adobe Acrobat Reader, you will almost invariably see a yellow question mark declaring that the **Signature validity is unknown**.

## Why Does This Happen?

Adobe Acrobat maintains an internal list called the **Adobe Approved Trust List (AATL)**. However, the Indian Government's **Controller of Certifying Authorities (CCA)** root certificates are not included by default in western operating system trust stores.

### The Solution: LTV Stamping with VeriSeal

VeriSeal executes an automated cryptographic verification using **pyHanko**:
1. Checks ByteRanges to ensure 0 byte alterations.
2. Validates against RCAI (Root Certifying Authority of India).
3. Adds Long-Term Validation (/DSS) dictionaries so Adobe displays the green tick permanently.`,
    meta_description: 'Fix yellow question mark on e-Aadhaar PDF into green tick verified by CCA India. Free online digital signature verification without Adobe certificate imports.',
    meta_keywords: 'aadhaar signature verify, yellow question mark fix, uidai green tick, pyhanko digital signature',
    featured_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
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
    excerpt: 'Comprehensive overview of Section 3 and Section 5 of the Indian IT Act 2000 regarding asymmetric cryptosystem electronic signatures.',
    content: `# Digital Signatures Under the IT Act 2000

Under Section 5 of the Information Technology Act 2000, electronic signatures validated through CCA-licensed certifying authorities carry equivalent legal evidentiary status to hand-written signatures.

## Key Certifying Authorities in India

- National Informatics Centre (NIC)
- e-Mudhra
- (n)Code Solutions
- Sify Technologies
- Capricorn CA`,
    meta_description: 'Legal validity of digital signatures in Indian courts under Section 5 of the IT Act 2000. Learn how CCA India regulates digital certificate authorities.',
    meta_keywords: 'it act 2000 digital signature, cca india legal validity, section 5 it act, dsc certificate legal status',
    featured_image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    published: false,
    published_at: null,
    author_name: 'Legal Compliance Team',
    created_at: '2026-09-05T14:30:00Z',
    updated_at: '2026-09-05T14:30:00Z',
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const filter = searchParams.get('filter') || 'all';

    if (id) {
      const post = mockBlogPosts.find((p) => p.id === id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    let list = [...mockBlogPosts];
    if (filter === 'published') {
      list = list.filter((p) => p.published);
    } else if (filter === 'draft') {
      list = list.filter((p) => !p.published);
    }

    return NextResponse.json({ posts: list });
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
      id,
      title,
      slug,
      excerpt,
      content,
      meta_description,
      meta_keywords,
      featured_image_url,
      published,
      author_name,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const nowIso = new Date().toISOString();

    if (id) {
      // Update existing
      const existing = mockBlogPosts.find((p) => p.id === id);
      if (!existing) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      existing.title = title;
      existing.slug = slug;
      existing.excerpt = excerpt || '';
      existing.content = content || '';
      existing.meta_description = meta_description || '';
      existing.meta_keywords = meta_keywords || '';
      existing.featured_image_url = featured_image_url || '';
      existing.published = Boolean(published);
      if (published && !existing.published_at) {
        existing.published_at = nowIso;
      }
      existing.author_name = author_name || 'VeriSeal Team';
      existing.updated_at = nowIso;

      return NextResponse.json({ success: true, post: existing });
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        title,
        slug,
        excerpt: excerpt || '',
        content: content || '',
        meta_description: meta_description || '',
        meta_keywords: meta_keywords || '',
        featured_image_url: featured_image_url || '',
        published: Boolean(published),
        published_at: published ? nowIso : null,
        author_name: author_name || 'VeriSeal Team',
        created_at: nowIso,
        updated_at: nowIso,
      };

      mockBlogPosts.unshift(newPost);
      return NextResponse.json({ success: true, post: newPost });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    mockBlogPosts = mockBlogPosts.filter((p) => p.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

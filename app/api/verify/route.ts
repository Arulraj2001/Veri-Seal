import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:7860';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const response = await fetch(`${BACKEND_URL}/verify`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        code: 'PROXY_ERROR',
        message: 'Could not connect to FastAPI verification engine.',
        detail: String(error),
      },
      { status: 502 }
    );
  }
}

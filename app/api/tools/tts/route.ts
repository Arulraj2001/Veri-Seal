import { NextRequest, NextResponse } from 'next/server';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { POPULAR_NEURAL_VOICES } from '@/lib/tts-constants';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  return NextResponse.json({
    success: true,
    voices: POPULAR_NEURAL_VOICES,
  });
}

export async function POST(req: NextRequest) {
  let tts: MsEdgeTTS | null = null;
  try {
    const body = await req.json();
    const { text, voice, rate = 1, pitch = 1, volume = 1 } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { success: false, error: 'Text content is required for speech synthesis.' },
        { status: 400 }
      );
    }

    const cleanText = text.trim();
    if (cleanText.length > 6000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Text length exceeds the maximum limit of 6,000 characters per synthesis.',
        },
        { status: 400 }
      );
    }

    // Validate voice name format
    let targetVoice = 'en-US-JennyNeural';
    if (typeof voice === 'string' && /^[a-zA-Z0-9-]+$/.test(voice.trim())) {
      targetVoice = voice.trim();
    }

    // Calculate SSML pitch offset (Hz notation for Edge TTS)
    const pitchVal = typeof pitch === 'number' && !isNaN(pitch) ? pitch : 1;
    let pitchOffset = '+0Hz';
    if (pitchVal > 1) {
      pitchOffset = `+${Math.round((pitchVal - 1) * 20)}Hz`;
    } else if (pitchVal < 1) {
      pitchOffset = `-${Math.round((1 - pitchVal) * 20)}Hz`;
    }

    // Calculate rate as SSML percentage (e.g. 1.5 → "+50%", 0.8 → "-20%")
    const rateVal = typeof rate === 'number' && !isNaN(rate) ? Math.max(0.5, Math.min(2.0, rate)) : 1;
    const ratePercent = rateVal >= 1
      ? `+${Math.round((rateVal - 1) * 100)}%`
      : `-${Math.round((1 - rateVal) * 100)}%`;

    // Calculate volume as SSML percentage (0–1 → 0–100%)
    const volumeVal = typeof volume === 'number' && !isNaN(volume) ? Math.max(0, Math.min(1, volume)) : 1;
    const volumePercent = `${Math.round(volumeVal * 100)}%`;

    // Build full SSML — embeds ALL settings (rate, pitch, volume) into the audio file
    const escapedText = escapeXml(cleanText);
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US"><voice name="${targetVoice}"><prosody rate="${ratePercent}" pitch="${pitchOffset}" volume="${volumePercent}">${escapedText}</prosody></voice></speak>`;

    // Upgrade to 48kHz 192kbps for broadcast-quality MP3 output
    tts = new MsEdgeTTS();
    await tts.setMetadata(targetVoice, OUTPUT_FORMAT.AUDIO_48KHZ_192KBITRATE_MONO_MP3);

    const audioBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const currentTts = tts!;
      const { audioStream } = currentTts.toStream(ssml);

      const timeoutId = setTimeout(() => {
        try {
          currentTts.close();
        } catch {
          // ignore
        }
        reject(new Error('Audio synthesis timed out after 25 seconds.'));
      }, 25000);

      audioStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      audioStream.on('end', () => {
        clearTimeout(timeoutId);
        try {
          currentTts.close();
        } catch {
          // ignore
        }
        resolve(Buffer.concat(chunks));
      });

      audioStream.on('error', (err: any) => {
        clearTimeout(timeoutId);
        try {
          currentTts.close();
        } catch {
          // ignore
        }
        reject(err);
      });
    });

    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="kagazo-speech.mp3"',
        'Accept-Ranges': 'bytes',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    if (tts) {
      try {
        tts.close();
      } catch {
        // ignore
      }
    }
    console.error('[TTS API Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to synthesize audio stream.',
      },
      { status: 500 }
    );
  }
}

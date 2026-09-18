// Dedicated Web Worker for In-Browser OpenAI Whisper Speech-to-Text
// Powered by Transformers.js (WebGPU + WebAssembly)

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3';

// Disable checking local filesystem models in browser environment
env.allowLocalModels = false;

// Configure singleton pipeline
class WhisperPipelineSingleton {
  static task = 'automatic-speech-recognition';
  static model = 'Xenova/whisper-tiny.en';
  static instance = null;

  static async getInstance(modelId, progress_callback = null) {
    if (this.instance === null || this.model !== modelId) {
      this.model = modelId;
      try {
        // Attempt WebGPU hardware acceleration first
        this.instance = await pipeline(this.task, this.model, {
          progress_callback,
          device: 'webgpu',
          dtype: 'fp32',
        });
      } catch (gpuError) {
        console.warn('WebGPU acceleration not supported, falling back to WASM CPU:', gpuError);
        this.instance = await pipeline(this.task, this.model, {
          progress_callback,
          device: 'wasm',
        });
      }
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  if (type === 'transcribe') {
    const { pcm, modelId, language } = data;

    try {
      self.postMessage({ status: 'loading', message: 'Loading Whisper neural model...' });

      const transcriber = await WhisperPipelineSingleton.getInstance(modelId, (progress) => {
        if (progress.status === 'progress') {
          self.postMessage({
            status: 'progress',
            progress: Math.round(progress.progress || 0),
            file: progress.file || '',
          });
        }
      });

      const isEnglishOnly = typeof modelId === 'string' && modelId.endsWith('.en');

      const options = {
        return_timestamps: true,
        chunk_length_s: 30,
        stride_length_s: 5,
      };

      // Only pass task & language to multilingual models
      // OpenAI English-only (.en) models lack multilingual vocabulary and throw an error if task/language is passed
      if (!isEnglishOnly) {
        options.task = 'transcribe';
        if (language && language !== 'auto') {
          options.language = language;
        }
      }

      const output = await transcriber(pcm, options);

      // Normalize output into segments with millisecond timestamps
      let segments = [];
      if (Array.isArray(output.chunks) && output.chunks.length > 0) {
        segments = output.chunks.map((chunk, idx) => {
          const start = Array.isArray(chunk.timestamp) ? chunk.timestamp[0] ?? 0 : 0;
          const end = Array.isArray(chunk.timestamp) ? chunk.timestamp[1] ?? (start + 2.5) : (start + 2.5);
          return {
            id: idx + 1,
            start: Math.round(start * 100) / 100,
            end: Math.round(end * 100) / 100,
            text: (chunk.text || '').trim(),
            speaker: 'Speaker 1',
          };
        });
      } else if (output.text) {
        segments = [
          {
            id: 1,
            start: 0,
            end: 5.0,
            text: output.text.trim(),
            speaker: 'Speaker 1',
          },
        ];
      }

      self.postMessage({
        status: 'complete',
        segments,
        rawText: output.text,
      });
    } catch (error) {
      console.error('Whisper worker error:', error);
      self.postMessage({
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
});

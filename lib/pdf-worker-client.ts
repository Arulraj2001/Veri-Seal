/**
 * Dispatches PDF file buffer to background Web Worker for hash and format validation.
 * Falls back gracefully to main thread Web Crypto API if Web Workers are unavailable.
 */
export interface WorkerValidationResult {
  success: boolean;
  hash?: string;
  sizeBytes?: number;
  error?: string;
}

export async function processPdfWithWorker(file: File): Promise<WorkerValidationResult> {
  const arrayBuffer = await file.arrayBuffer();

  // If running in browser and Worker is supported
  if (typeof window !== 'undefined' && window.Worker) {
    return new Promise((resolve) => {
      try {
        const worker = new Worker('/pdf-worker.js');

        worker.onmessage = (event) => {
          worker.terminate();
          resolve(event.data);
        };

        worker.onerror = (err) => {
          worker.terminate();
          console.warn('PDF Worker error, falling back to main thread:', err);
          fallbackProcessing(arrayBuffer).then(resolve);
        };

        worker.postMessage({ fileData: arrayBuffer, fileName: file.name }, [arrayBuffer]);
      } catch (e) {
        console.warn('Worker instantiation failed, using fallback:', e);
        fallbackProcessing(arrayBuffer).then(resolve);
      }
    });
  }

  return fallbackProcessing(arrayBuffer);
}

async function fallbackProcessing(arrayBuffer: ArrayBuffer): Promise<WorkerValidationResult> {
  try {
    const headerBytes = new Uint8Array(arrayBuffer.slice(0, 5));
    const headerString = String.fromCharCode.apply(null, Array.from(headerBytes));
    if (!headerString.startsWith('%PDF')) {
      return { success: false, error: 'File is not a valid PDF' };
    }

    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return {
      success: true,
      hash: hashHex,
      sizeBytes: arrayBuffer.byteLength,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Fallback validation error',
    };
  }
}

// Web Worker for off-thread PDF integrity validation and byte processing
self.onmessage = async function (e) {
  const { fileData, fileName } = e.data;

  try {
    // 1. Validate PDF header magic bytes (%PDF)
    const headerBytes = new Uint8Array(fileData.slice(0, 5));
    const headerString = String.fromCharCode.apply(null, Array.from(headerBytes));
    const isValidPdfHeader = headerString.startsWith('%PDF');

    if (!isValidPdfHeader) {
      self.postMessage({
        success: false,
        error: 'Invalid PDF format. Header does not begin with %PDF',
      });
      return;
    }

    // 2. Compute SHA-256 hash using Web Crypto API in worker
    const hashBuffer = await crypto.subtle.digest('SHA-256', fileData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    // 3. Inspect byte length
    const byteLength = fileData.byteLength;

    self.postMessage({
      success: true,
      hash: hashHex,
      sizeBytes: byteLength,
      fileName,
    });
  } catch (err) {
    self.postMessage({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown worker processing error',
    });
  }
};

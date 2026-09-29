import { PassportPhotoSpec } from './passport-specs';
import { injectJfifDpi } from './image-engine';

/**
 * Generate a standard 4x6 inch (10x15 cm) photo print sheet at 300 DPI.
 * Standard photo paper resolution: 1800 × 1200 px (landscape) or 1200 × 1800 px (portrait).
 */
export function generate4x6PassportSheet(
  photoCanvas: HTMLCanvasElement,
  spec: PassportPhotoSpec,
  addCuttingLines: boolean = true
): HTMLCanvasElement {
  const DPI = 300;
  // 4x6 inches at 300 DPI = 1800 x 1200 px
  const sheetW = 1800;
  const sheetH = 1200;

  const canvas = document.createElement('canvas');
  canvas.width = sheetW;
  canvas.height = sheetH;
  const ctx = canvas.getContext('2d')!;

  // Fill pure white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, sheetW, sheetH);

  // Determine photo width and height at 300 DPI
  const pW = spec.widthPx300Dpi;
  const pH = spec.heightPx300Dpi;

  // US 2×2" photos (600×600) tile as the industry-standard 3 cols × 2 rows = 6 photos
  // across the full 4×6 sheet (applicant trims/cuts the printed grid). No outer gutter.
  // All other specs reserve a small 60px safety margin so cut guides never clip.
  const isUsSquare = spec.id === 'us-passport';
  const margin = isUsSquare ? 0 : 60;

  // Compute how many fit horizontally and vertically
  const maxCols = Math.floor((sheetW - margin) / pW);
  const maxRows = Math.floor((sheetH - margin) / pH);

  const cols = Math.max(1, Math.min(maxCols, isUsSquare ? 3 : 4));
  const rows = Math.max(1, Math.min(maxRows, 2));

  const totalGridW = cols * pW;
  const totalGridH = rows * pH;

  const spacingX = cols > 1 ? Math.floor((sheetW - totalGridW) / (cols + 1)) : 0;
  const spacingY = rows > 1 ? Math.floor((sheetH - totalGridH) / (rows + 1)) : 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = spacingX + c * (pW + spacingX);
      const y = spacingY + r * (pH + spacingY);

      // Draw photo
      ctx.drawImage(photoCanvas, 0, 0, photoCanvas.width, photoCanvas.height, x, y, pW, pH);

      // Draw subtle cutting border if requested
      if (addCuttingLines) {
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x, y, pW, pH);
        ctx.setLineDash([]);
      }
    }
  }

  // Draw footer text with specs. Skipped for the tight US 3×2 grid which fills the
  // entire sheet (footer would overlap the bottom row of photos).
  if (!isUsSquare) {
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${spec.country} ${spec.title} • 4"×6" Sheet (${cols * rows} Photos) • Print at 100% Scale / Actual Size • Generated on Kagazo.in`,
      sheetW / 2,
      sheetH - 18
    );
  }

  return canvas;
}

/**
 * Generate an A4 print sheet (210 x 297 mm) at 300 DPI.
 * Dimensions: 2480 x 3508 px.
 */
export function generateA4PassportSheet(
  photoCanvas: HTMLCanvasElement,
  spec: PassportPhotoSpec,
  addCuttingLines: boolean = true
): HTMLCanvasElement {
  const DPI = 300;
  // A4 at 300 DPI = 2480 x 3508 px
  const sheetW = 2480;
  const sheetH = 3508;

  const canvas = document.createElement('canvas');
  canvas.width = sheetW;
  canvas.height = sheetH;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, sheetW, sheetH);

  const pW = spec.widthPx300Dpi;
  const pH = spec.heightPx300Dpi;

  // Grid layout for A4
  const cols = Math.floor((sheetW - 120) / (pW + 20));
  const rows = Math.floor((sheetH - 200) / (pH + 20));

  const totalGridW = cols * pW;
  const totalGridH = rows * pH;

  const spacingX = Math.floor((sheetW - totalGridW) / (cols + 1));
  const spacingY = Math.floor((sheetH - totalGridH) / (rows + 1));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = spacingX + c * (pW + spacingX);
      const y = spacingY + r * (pH + spacingY);

      ctx.drawImage(photoCanvas, 0, 0, photoCanvas.width, photoCanvas.height, x, y, pW, pH);

      if (addCuttingLines) {
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x, y, pW, pH);
        ctx.setLineDash([]);
      }
    }
  }

  // Footer
  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `${spec.country} ${spec.title} • A4 Sheet (${cols * rows} Photos) • Print at 100% Scale / Actual Size • Kagazo.in`,
    sheetW / 2,
    sheetH - 40
  );

  return canvas;
}

/**
 * Convert canvas to Blob with 300 DPI JFIF metadata
 */
export async function canvasTo300DpiBlob(canvas: HTMLCanvasElement, quality: number = 0.95): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          resolve(new Blob([], { type: 'image/jpeg' }));
          return;
        }
        const buf = await blob.arrayBuffer();
        const patched = injectJfifDpi(new Uint8Array(buf), 300);
        resolve(new Blob([patched.buffer as ArrayBuffer], { type: 'image/jpeg' }));
      },
      'image/jpeg',
      quality
    );
  });
}

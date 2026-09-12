/**
 * Kagazo Universal Isolated Print Engine.
 * Guarantees 100% isolation from host webpage chrome, floating navigation,
 * form inputs, ads, and footers. Only the clean document prints.
 */

interface PrintDocumentOptions {
  title: string;
  bodyHtml: string;
  styles?: string;
  pageSize?: 'A4' | 'letter' | '4x6';
  orientation?: 'portrait' | 'landscape';
}

export function printIsolatedDocument({
  title,
  bodyHtml,
  styles = '',
  pageSize = 'A4',
  orientation = 'portrait',
}: PrintDocumentOptions): Promise<void> {
  return new Promise((resolve) => {
    // Try to create an invisible iframe first
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    iframe.title = title;

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      // Fallback to window.open if iframe fails
      const printWin = window.open('', '_blank');
      if (!printWin) {
        alert('Please allow popups to enable document printing.');
        resolve();
        return;
      }
      printWin.document.write(buildPrintHtml(title, bodyHtml, styles, pageSize, orientation));
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        printWin.close();
        resolve();
      }, 400);
      return;
    }

    doc.open();
    doc.write(buildPrintHtml(title, bodyHtml, styles, pageSize, orientation));
    doc.close();

    iframe.contentWindow?.focus();
    setTimeout(() => {
      try {
        iframe.contentWindow?.print();
      } catch (e) {
        console.error('Print iframe error:', e);
      } finally {
        setTimeout(() => {
          document.body.removeChild(iframe);
          resolve();
        }, 1000);
      }
    }, 400);
  });
}

function buildPrintHtml(
  title: string,
  bodyHtml: string,
  customStyles: string,
  pageSize: string,
  orientation: string
): string {
  const pageRule = pageSize === '4x6' ? '6in 4in' : `${pageSize} ${orientation}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @page {
      size: ${pageRule};
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #FFFFFF !important;
      color: #000000 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      width: 100%;
      min-height: 100%;
    }
    .print-page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 12mm 15mm;
      background: #FFFFFF;
      position: relative;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    @media print {
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-after: always;
        break-after: page;
      }
    }
    ${customStyles}
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

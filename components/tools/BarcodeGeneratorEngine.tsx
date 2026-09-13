'use client';

import * as React from 'react';
import {
  Barcode as BarcodeIcon,
  Download,
  Copy,
  Check,
  Sparkles,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import JsBarcode from 'jsbarcode';

type BarcodeFormat = 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'ITF14';

export function BarcodeGeneratorEngine() {
  const [format, setFormat] = React.useState<BarcodeFormat>('CODE128');
  const [value, setValue] = React.useState<string>('KAGAZO-84920');
  const [height, setHeight] = React.useState<number>(80);
  const [width, setWidth] = React.useState<number>(2);
  const [displayValue, setDisplayValue] = React.useState<boolean>(true);
  const [fontSize, setFontSize] = React.useState<number>(16);
  const [lineColor, setLineColor] = React.useState<string>('#111827');
  const [bgColor, setBgColor] = React.useState<string>('#FFFFFF');
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [pngDataUrl, setPngDataUrl] = React.useState<string>('');

  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Render barcode
  const renderBarcode = React.useCallback(() => {
    if (!value.trim()) {
      setError('Please enter a value to generate barcode.');
      return;
    }

    setError(null);
    try {
      if (svgRef.current) {
        JsBarcode(svgRef.current, value, {
          format,
          width,
          height,
          displayValue,
          fontSize,
          lineColor,
          background: bgColor,
          margin: 12,
        });
      }

      if (canvasRef.current) {
        JsBarcode(canvasRef.current, value, {
          format,
          width,
          height,
          displayValue,
          fontSize,
          lineColor,
          background: bgColor,
          margin: 12,
        });
        setPngDataUrl(canvasRef.current.toDataURL('image/png'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid characters for this barcode format');
    }
  }, [format, value, height, width, displayValue, fontSize, lineColor, bgColor]);

  React.useEffect(() => {
    renderBarcode();
  }, [renderBarcode]);

  // Handle format change and set appropriate sample values
  const handleFormatChange = (newFmt: BarcodeFormat) => {
    setFormat(newFmt);
    if (newFmt === 'EAN13') setValue('1234567890128');
    else if (newFmt === 'UPC') setValue('123456789012');
    else if (newFmt === 'CODE39') setValue('INVENTORY-42');
    else if (newFmt === 'ITF14') setValue('12345678901231');
    else setValue('KAGAZO-84920');
  };

  const downloadPng = () => {
    if (!pngDataUrl) return;
    const a = document.createElement('a');
    a.href = pngDataUrl;
    a.download = `barcode-${format.toLowerCase()}-${value}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `barcode-${format.toLowerCase()}-${value}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyImage = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-5 sm:p-7 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-darker">
              <BarcodeIcon className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-text-main">
                Barcode Format &amp; Content
              </h3>
            </div>

            {/* Symbology Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main">Barcode Symbology Standard</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'CODE128', label: 'Code 128 (Universal Alphanumeric)' },
                  { id: 'EAN13', label: 'EAN-13 (Global Retail Products)' },
                  { id: 'UPC', label: 'UPC-A (US / Canada Retail)' },
                  { id: 'CODE39', label: 'Code 39 (Logistics & Parts)' },
                  { id: 'ITF14', label: 'ITF-14 (Shipping Cartons)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleFormatChange(item.id as BarcodeFormat)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      format === item.id
                        ? 'border-primary bg-primary text-white font-bold shadow-xs'
                        : 'border-surface-darker bg-surface text-text-main font-semibold hover:border-primary/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Barcode Value */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-text-main">
                <span>Barcode Value / Data String</span>
                <span className="font-mono text-[11px] text-text-main/60">
                  {format === 'EAN13' ? '12 or 13 Digits' : format === 'UPC' ? '11 or 12 Digits' : 'Alphanumeric'}
                </span>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter numbers or text..."
                className="w-full bg-surface border border-surface-darker text-text-main text-sm font-mono font-bold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Dimensions & Styling */}
            <div className="space-y-4 pt-3 border-t border-surface-darker">
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-primary" /> Bar Dimensions &amp; Text
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-text-main">
                    <span>Bar Height</span>
                    <span className="font-mono text-primary">{height}px</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={140}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-text-main">
                    <span>Bar Width / Thickness</span>
                    <span className="font-mono text-primary">{width}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs pt-1">
                <label className="flex items-center gap-2 font-bold text-text-main cursor-pointer">
                  <input
                    type="checkbox"
                    checked={displayValue}
                    onChange={(e) => setDisplayValue(e.target.checked)}
                    className="rounded accent-primary"
                  />
                  <span>Display Human-Readable Text Beneath Barcode</span>
                </label>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-text-main/70">Bar Color:</span>
                    <input
                      type="color"
                      value={lineColor}
                      onChange={(e) => setLineColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border border-surface-darker"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview & Download */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 text-center space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                Live Barcode Preview
              </span>
              <span className="text-[10px] bg-primary-light text-primary font-bold px-2 py-0.5 rounded uppercase">
                {format}
              </span>
            </div>

            {/* Render Canvas & SVG */}
            <canvas ref={canvasRef} className="hidden" />

            <div className="p-6 rounded-3xl bg-neutral-50 border border-surface-darker min-h-[160px] flex items-center justify-center overflow-x-auto">
              <svg ref={svgRef} className="max-w-full" />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={downloadPng}
                disabled={!!error}
                className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4 h-4" /> Download 300 DPI PNG
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={downloadSvg}
                  disabled={!!error}
                  className="py-2.5 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold transition-colors disabled:opacity-50"
                >
                  Download SVG Vector
                </button>

                <button
                  type="button"
                  onClick={copyImage}
                  disabled={!!error}
                  className="py-2.5 rounded-xl bg-surface hover:bg-surface-darker border border-surface-darker text-text-main text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-text-main/60" />}
                  {copied ? 'Copied!' : 'Copy Image'}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-text-main/60">
              ✓ Print-ready at 300 DPI • Ideal for thermal label printers (Zebra, Brother, Epson)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

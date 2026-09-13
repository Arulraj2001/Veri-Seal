'use client';

import * as React from 'react';
import { Copy, Check, FileText } from 'lucide-react';

interface DeclarationProformaProps {
  text: string;
}

export function DeclarationProforma({ text }: DeclarationProformaProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-darker/60">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Official IBPS Handwritten Declaration Text
          </h2>
          <p className="text-xs sm:text-sm text-text-main/70 mt-0.5">
            Must be written by hand in running English script on plain white A4 paper using black ink.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-light text-primary text-xs font-bold hover:bg-primary/20 transition-all self-start sm:self-auto shrink-0 cursor-pointer shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-700">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Declaration Text</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-darker/80 font-mono text-xs sm:text-sm text-text-main leading-relaxed select-all">
        &quot;{text}&quot;
      </div>
    </div>
  );
}

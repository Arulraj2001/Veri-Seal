import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthorBioProps {
  name: string;
}

export function AuthorBio({ name }: AuthorBioProps) {
  const authorName = name || 'Kagazo Team';
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <div className="mt-12 pt-8 border-t border-surface-darker">
      <div className="bg-surface/50 border border-surface-darker rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Author Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[#E6570B] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
          {initial}
        </div>

        {/* Bio Details */}
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-black text-text-main">{authorName}</h4>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              Verified Author
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-main/70 leading-relaxed">
            Kagazo Team — Experts in Indian government document verification and exam preparation tools.
          </p>
        </div>

        {/* Link to About */}
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-surface-darker hover:border-primary/40 text-xs font-bold text-text-main hover:text-primary transition-all shadow-2xs shrink-0 self-start sm:self-auto"
        >
          <span>About Kagazo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

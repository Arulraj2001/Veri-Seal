import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Tag, Percent, ArrowDownRight } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyRabattEngine } from '@/components/international/GermanyRabattEngine';

export const metadata: Metadata = {
  title: 'Rabatt- & Prozentrechner : Ersparnis & Endpreis | Kagazo',
  description:
    'Berechnen Sie reduzierte Preise, Ersparnisse in Euro und Prozentnachlässe bei Schlussverkäufen, Rabattaktionen und Preisreduzierungen schnell und unkompliziert.',
  alternates: {
    canonical: `${SITE_URL}/de/rabatt-prozent-rechner`,
  },
  openGraph: {
    title: 'Rabatt- & Prozentrechner : Ersparnis & Endpreis | Kagazo Deutschland',
    description:
      'Kostenloser Prozent- und Rabattrechner für den Einkauf, Online-Shopping und Rechnungsprüfung.',
    url: `${SITE_URL}/de/rabatt-prozent-rechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RabattPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Rabattrechner und Prozentrechner Deutschland',
    applicationCategory: 'ShoppingApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: {
      '@type': 'Organization',
      name: 'Kagazo Deutschland',
      url: SITE_URL,
    },
    description:
      'Einfacher und schneller Rabattrechner für Preisreduzierungen, Black Friday und Schlussverkäufe.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Preisangabenverordnung (PAngV) • Schnell &amp; Präzise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Rabattrechner : Preisnachlass &amp; Ersparnis berechnen
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Berechnen Sie blitzschnell den tatsächlichen Zahlbetrag an der Kasse nach Abzug von Prozentnachlässen (z.B. -20%, -30% oder -50%) sowie die exakte Ersparnis in Euro beim Einkauf im Geschäft oder Online-Shopping.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanyRabattEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>Formel für Prozentrechnung</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            Ersparnis = Ursprünglicher Preis × (Rabatt / 100)<br />
            Endpreis = Ursprünglicher Preis - Ersparnis
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Tag className="w-5 h-5" />
            <span>Preisangabenverordnung (PAngV)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nach § 11 der deutschen Preisangabenverordnung müssen Händler bei Rabattwerbung den niedrigsten Gesamtpreis angeben, den sie innerhalb der letzten 30 Tage vor der Preiserhöhung angewendet haben. Dies schützt Verbraucher vor Mondpreisen und künstlich aufgeblasenen Rabatten.
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Percent, TrendingUp, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanySkontoEngine } from '@/components/international/GermanySkontoEngine';

export const metadata: Metadata = {
  title: 'Skontorechner & Effektiver Jahreszins (Lieferantenkredit) | Kagazo',
  description:
    'Berechnen Sie Ihren Skontoabzug, den tatsächlichen Zahlbetrag und den effektiven Jahreszins nach der Lieferantenkredit-Formel.',
  alternates: {
    canonical: `${SITE_URL}/de/skontorechner`,
  },
  openGraph: {
    title: 'Skontorechner & Effektiver Jahreszins (Lieferantenkredit) | Kagazo Deutschland',
    description:
      'Kostenloser Rechner für Skontofristen, Zahlungsziele und den Vergleich zwischen Skonto und Kontokorrentkredit.',
    url: `${SITE_URL}/de/skontorechner`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function SkontoPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Skontorechner und Jahreszins-Kalkulator Deutschland',
    applicationCategory: 'BusinessApplication',
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
      'Rechner für Skontoabzug und effektiven Jahreszins bei vorzeitiger Rechnungsbegleichung.',
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
          <span>Lieferantenkredit-Formel • B2B Zahlungskonditionen • Effektivzins</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Skontorechner : Zahlbetrag &amp; Effektiver Jahreszins
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Gewährt ein Lieferant Skonto (z.B. «2% Skonto bei Zahlung innerhalb von 10 Tagen, sonst 30 Tage netto»), entspricht der Verzicht auf Skonto einem extrem teuren Kredit. Ermitteln Sie Ihren Ersparnisbetrag und vergleichen Sie den rechnerischen Jahreszins mit Ihrem Kontokorrentkredit.
        </p>
      </div>

      {/* Interactive Engine */}
      <GermanySkontoEngine />

      {/* Educational & E-E-A-T Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Percent className="w-5 h-5" />
            <span>Warum Skonto fast immer genutzt werden sollte</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Wer 2% Skonto für 20 Tage früheren Zahlungseingang vergibt, bezahlt rechnerisch einen <strong>effektiven Jahreszins von rund 36,7% p.a.</strong> Selbst wenn ein Unternehmen vorübergehend seinen teuren Bank-Dispo (z.B. 11% Sollzins) in Anspruch nehmen muss, um die Rechnung innerhalb der Skontofrist zu begleichen, spart es unterm Strich immer noch erhebliche Zinskosten ein.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <TrendingUp className="w-5 h-5" />
            <span>Formel für den effektiven Jahreszinssatz</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-mono">
            Effektiver Jahreszins = [Skontosatz / (100 - Skontosatz)] × [360 / (Zahlungsziel - Skontofrist)] × 100
          </p>
        </div>
      </div>
    </div>
  );
}

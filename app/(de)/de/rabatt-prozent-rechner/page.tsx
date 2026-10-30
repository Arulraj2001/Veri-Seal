import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Tag, Percent, ArrowDownRight, Sparkles, HelpCircle, ArrowRight, FileText, CheckCircle2, ShoppingBag } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { GermanyRabattEngine } from '@/components/international/GermanyRabattEngine';

export const metadata: Metadata = {
  title: 'Rabattrechner & Prozentrechner 2026 | Ersparnis & Endpreis nach PAngV',
  description:
    'Berechnen Sie reduzierte Preise, Ersparnisse in Euro und Prozentnachlässe bei Rabattaktionen und Schlussverkäufen nach § 11 Preisangabenverordnung (30-Tage-Tiefstpreis). Mit Kaskadenrabatt.',
  keywords: [
    'rabattrechner online kostenlos',
    'prozentrechner rabatt ersparnis berechnen',
    'rabatt abziehen endpreis berechnen',
    'preisangabenverordnung 30 tage tiefstpreis 11 pangv',
    'doppelrabatt kaskadenrabatt 50 plus 20 prozent',
    'schlussverkauf prozentrechner shopping',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/rabatt-prozent-rechner`,
    languages: {
      'de-DE': `${SITE_URL}/de/rabatt-prozent-rechner`,
      'de': `${SITE_URL}/de/rabatt-prozent-rechner`,
      'x-default': `${SITE_URL}/de/rabatt-prozent-rechner`,
    },
  },
  openGraph: {
    title: 'Rabattrechner & Prozentrechner 2026 | Ersparnis & Endpreis nach PAngV',
    description:
      'Kostenloser Prozent- und Rabattrechner für den Einkauf, Online-Shopping und Rechnungsprüfung.',
    url: `${SITE_URL}/de/rabatt-prozent-rechner`,
    locale: 'de_DE',
    siteName: 'Kagazo Deutschland',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rabatt- & Prozentrechner Deutschland',
    description:
      'Ersparnis und Endpreis bei Rabattaktionen nach § 11 PAngV berechnen.',
  },
};

export default function RabattPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Rabattrechner und Prozentrechner Deutschland',
        applicationCategory: 'ShoppingApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        description:
          'Einfacher und schneller Rabattrechner für Preisreduzierungen, Black Friday und Schlussverkäufe nach der deutschen Preisangabenverordnung.',
      },
      {
        '@type': 'FinancialProduct',
        name: 'Verbraucherpreis- und Rabattberechnung',
        description: 'Berechnung von prozentualen Preisnachlässen und Endpreisen.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Kagazo Deutschland',
            item: `${SITE_URL}/de`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Rabattrechner',
            item: `${SITE_URL}/de/rabatt-prozent-rechner`,
          },
        ],
      },
    ],
  };

  const discountMatrix = [
    { ursprung: '30,00 €', r10: '27,00 € (-3 €)', r20: '24,00 € (-6 €)', r30: '21,00 € (-9 €)', r50: '15,00 € (-15 €)' },
    { ursprung: '50,00 €', r10: '45,00 € (-5 €)', r20: '40,00 € (-10 €)', r30: '35,00 € (-15 €)', r50: '25,00 € (-25 €)' },
    { ursprung: '75,00 €', r10: '67,50 € (-7,50 €)', r20: '60,00 € (-15 €)', r30: '52,50 € (-22,50 €)', r50: '37,50 € (-37,50 €)' },
    { ursprung: '100,00 €', r10: '90,00 € (-10 €)', r20: '80,00 € (-20 €)', r30: '70,00 € (-30 €)', r50: '50,00 € (-50 €)' },
    { ursprung: '150,00 €', r10: '135,00 € (-15 €)', r20: '120,00 € (-30 €)', r30: '105,00 € (-45 €)', r50: '75,00 € (-75 €)' },
    { ursprung: '200,00 €', r10: '180,00 € (-20 €)', r20: '160,00 € (-40 €)', r30: '140,00 € (-60 €)', r50: '100,00 € (-100 €)' },
  ];

  const faqs = [
    {
      q: 'Wie berechnet man einen Rabatt im Kopf?',
      a: 'Um einen Rabatt im Kopf zu berechnen, teilen Sie den ursprünglichen Preis zunächst durch 10 (ergibt 10 %). Für 20 % verdoppeln Sie diesen Betrag einfach. Für 15 % addieren Sie die Hälfte von 10 % hinzu. Ziehen Sie diesen Ersparnisbetrag schließlich vom Ausgangspreis ab, um den reduzierten Kassenpreis zu erhalten.',
    },
    {
      q: 'Was verlangt § 11 der Preisangabenverordnung (PAngV) bei Rabatten?',
      a: 'Nach § 11 PAngV sind Händler in Deutschland gesetzlich verpflichtet, bei jeder Bekanntgabe einer Preisermäßigung den niedrigsten Gesamtpreis anzugeben, der innerhalb der letzten 30 Tage vor der Ermäßigung angewendet wurde. Dies verhindert, dass Händler Preise kurz vor Rabattaktionen künstlich anheben, um mit scheinbar riesigen Rabattprozenten zu werben.',
    },
    {
      q: 'Wie rechnet man kaskadierende Doppelrabatte (z. B. 50 % + 20 % extra)?',
      a: 'Zwei aufeinanderfolgende Rabatte werden niemals einfach addiert (50 % + 20 % ist nicht 70 %!). Der Zusatzrabatt bezieht sich auf den bereits reduzierten Zwischenpreis. Beispiel bei 100 Euro: Nach 50 % verbleiben 50 Euro. Weitere 20 % auf 50 Euro sparen 10 Euro. Der Endpreis beträgt 40 Euro, was einem echten Gesamtrabatt von 60 % entspricht.',
    },
    {
      q: 'Sind mündlich zugesagte Rabatte an der Kasse rechtlich bindend?',
      a: 'Ja. Wird ein Rabatt vereinbart oder am Regal beworben, stellt dies die Verhandlungsbasis dar. Maßgeblich für den Kaufvertrag ist jedoch die Einigung an der Kasse: Zeigt das Kassensystem versehentlich den nicht reduzierten Preis an und bezahlt der Kunde diesen ohne Reklamation, gilt der Kaufvertrag zu diesem Kassenpreis als geschlossen.',
    },
    {
      q: 'Kann man Skonto und Mengenrabatt kombinieren?',
      a: 'Ja, im kaufmännischen Geschäftsverkehr (B2B) werden Rabatt und Skonto häufig kombiniert: Zunächst wird der handelsübliche Mengen- oder Treuerabatt vom Bruttolistenpreis abgezogen. Der resultierende Rechnungsbetrag darf dann bei fristgerechter Zahlung innerhalb der vereinbarten Skontofrist um weitere 2 % bis 3 % gekürzt werden.',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center gap-2 font-medium">
          <Link href="/de" className="hover:text-slate-900 transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Rabattrechner</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preisangabenverordnung (PAngV § 11) &bull; Schnell &amp; Präzise</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Rabattrechner: Preisnachlass &amp; Ersparnis berechnen
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Berechnen Sie blitzschnell den tatsächlichen Zahlbetrag an der Kasse nach Abzug von Prozentnachlässen (z. B. -20%, -30% oder -50%) sowie die exakte Ersparnis in Euro beim Einkauf im Geschäft oder Online-Shopping.
          </p>
        </div>

        {/* GEO Featured Snippet Answer Capsule (45-60 words) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Direkte Antwort: Wie viel spart man bei 30 % Rabatt auf 80 Euro?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
            Bei 30 % Rabatt auf 80,00 € sparen Sie exakt <strong>24,00 €</strong>. Der reduzierte Endpreis an der Kasse beträgt genau <strong>56,00 €</strong>. Nach § 11 der Preisangabenverordnung (PAngV) müssen Händler bei Rabatten den niedrigsten Preis der letzten 30 Tage als Referenz nennen.
          </p>
        </div>

        {/* Interactive Engine */}
        <GermanyRabattEngine />

        {/* Worked Statutory Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Schnelltabelle: Endpreise nach Rabattstufen
            </h2>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              Übersicht für Einkauf &amp; Shopping
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Originalpreis</th>
                  <th className="py-3 px-4 text-slate-700">- 10 % Rabatt</th>
                  <th className="py-3 px-4 text-amber-800 font-bold">- 20 % Rabatt</th>
                  <th className="py-3 px-4 text-slate-700">- 30 % Rabatt</th>
                  <th className="py-3 px-4 text-emerald-800 font-bold">- 50 % Rabatt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {discountMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.ursprung}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.r10}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 bg-amber-50/20">{row.r20}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{row.r30}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/20">{row.r50}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Section */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Verbraucherschutz &amp; Preisangaben im deutschen Handel
            </h2>
            <p>
              In Deutschland schützt die <strong>Preisangabenverordnung (PAngV)</strong> Verbraucher vor irreführenden Rabattversprechen. Preisreduzierungen müssen transparent und nachprüfbar sein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Tag className="w-4 h-4 text-amber-600" />
                <span>Der 30-Tage-Tiefstpreis (§ 11 PAngV)</span>
              </div>
              <p className="text-xs">
                Händler dürfen durchgestrichene Preise nicht auf kurzfristig hochgesetzte Fantasiepreise beziehen. Gesetzlich vorgeschrieben ist der niedrigste Preis, der in den letzten 30 Tagen vor der Rabattankündigung tatsächlich verlangt wurde. Verstöße stellen Ordnungswidrigkeiten dar und können von Verbraucherschutzverbänden abgemahnt werden.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Percent className="w-4 h-4 text-amber-600" />
                <span>Kaskadierende Rabatte richtig deuten</span>
              </div>
              <p className="text-xs">
                Werbeversprechen wie &bdquo;50 % Rabatt + 20 % Extra auf alles&ldquo; erwecken oft den Eindruck eines 70%-Nachlasses. Da der zweite Rabatt jedoch nur auf den verbliebenen Restbetrag angewendet wird, entspricht dies mathematisch einem Gesamtnachlass von 60 %.
              </p>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Häufig gestellte Fragen zu Rabatten &amp; Preisnachlässen</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Cluster Cross-Links */}
        <div className="p-6 rounded-3xl bg-slate-100/70 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider font-mono">
              Verwandte Rechner für Einkauf &amp; Finanzen
            </h3>
            <span className="text-xs text-slate-500 font-medium">Praktische Alltagsrechner für Deutschland</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/de/skontorechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Skontorechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/spritkostenrechner-fahrtkosten"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Spritkostenrechner</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/kleinunternehmer-rechnung"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Rechnungsvorlage PDF</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/de/brutto-netto-rechner"
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 font-semibold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group shadow-2xs"
            >
              <span>Brutto Netto 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


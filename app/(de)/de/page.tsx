import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { ArrowRight, Sparkles, ShieldCheck, Building2, Landmark, FileText, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portal Offizielle Rechner Deutschland 2026 : Steuern, Gehalt & Recht | Kagazo',
  description:
    'Vollständige Suite von 20 rechtssicheren Rechnern für Deutschland: Brutto-Netto, Firmenwagen 1%-Regelung, Abfindung § 34 EStG, Notarkosten GNotKG, Grunderwerbsteuer, Passfoto und Gewerbesteuer.',
  alternates: {
    canonical: `${SITE_URL}/de`,
  },
  openGraph: {
    title: 'Portal Offizielle Rechner Deutschland 2026 | Kagazo',
    description:
      'Präzisionsrechner nach deutschem Bundesrecht für Arbeitnehmer, Selbstständige, Mieter und Käufer.',
    url: `${SITE_URL}/de`,
    locale: 'de_DE',
    type: 'website',
  },
};

export default function GermanHubPage() {
  const categories = [
    {
      id: 'gehalt-steuern',
      title: '1. Gehalt, Steuern & Arbeitsrecht',
      description: 'Präzisionsrechner für Arbeitnehmer, Gehaltsabrechnungen und Kündigungen.',
      icon: Building2,
      tools: [
        {
          title: 'Brutto-Netto-Rechner 2026',
          desc: 'Nettogehalt nach Lohnsteuer § 32a EStG, Steuerklassen 1 bis 6 und allen Sozialversicherungsbeiträgen.',
          href: '/de/brutto-netto-rechner',
          tag: 'Gehalt',
        },
        {
          title: 'Abfindungsrechner (§ 34 EStG)',
          desc: 'Netto-Abfindung und Steuerersparnis durch die gesetzliche Fünftelregelung. Sozialversicherungsfrei.',
          href: '/de/abfindungsrechner',
          tag: 'Kündigung',
        },
        {
          title: 'Stundenlohnrechner & Mindestlohn 12,82 €',
          desc: 'Stundenlohn nach BAG-Formel, Minijob-Grenze (538 €) und Übergangsbereich (Midijob).',
          href: '/de/stundenlohnrechner',
          tag: 'Arbeitszeit',
        },
        {
          title: 'Firmenwagenrechner (1%-Regelung)',
          desc: 'Geldwerter Vorteil für Dienstwagen nach § 6 Abs. 1 Nr. 4 EStG (0,25% Elektro, 0,5% Hybrid, 1% Verbrenner).',
          href: '/de/firmenwagenrechner',
          tag: 'Dienstwagen',
        },
        {
          title: 'Kurzarbeitergeld-Rechner (KUG)',
          desc: 'Leistungssatz 60% bzw. 67% bei Arbeitsausfall nach § 105 SGB III der Bundesagentur für Arbeit.',
          href: '/de/kurzarbeitergeld-rechner',
          tag: 'SGB III',
        },
      ],
    },
    {
      id: 'immobilien-miete',
      title: '2. Immobilien, Miete & Notar',
      description: 'Rechner für Hauskauf, Notarkosten, Mietverhältnisse und Baufinanzierung.',
      icon: Landmark,
      tools: [
        {
          title: 'Notar- & Grundbuchkosten (GNotKG)',
          desc: 'Gebührentabelle B für Kaufvertrag, Grundschuldbestellung und Grundbuchamt beim Immobilienerwerb.',
          href: '/de/notar-und-grundbuchkostenrechner',
          tag: 'Kaufnebenkosten',
        },
        {
          title: 'Grunderwerbsteuer aller 16 Bundesländer',
          desc: 'Steuerbetrag nach GrEStG von 3,5% (Bayern, Sachsen) bis 6,5% (NRW, Hessen, Schleswig-Holstein).',
          href: '/de/grunderwerbsteuer-rechner',
          tag: 'Steuer',
        },
        {
          title: 'Mieterhöhung & Kappungsgrenze (§ 558 BGB)',
          desc: 'Zulässigkeit der Mieterhöhung nach Mietspiegel sowie 15% bzw. 20% Kappungsgrenze in 3 Jahren.',
          href: '/de/mieterhoehung-kappungsgrenze-rechner',
          tag: 'Mietrecht',
        },
        {
          title: 'Baufinanzierung & Tilgungsplan',
          desc: 'Monatsrate, Zins- und Tilgungsanteil sowie Restschuld nach Ablauf der Zinsbindung.',
          href: '/de/baufinanzierung-tilgungsrechner',
          tag: 'Finanzierung',
        },
        {
          title: 'Mietkautionsrechner (§ 551 BGB)',
          desc: 'Gesetzliche Obergrenze von 3 Nettokaltmieten und Anspruch auf Zahlung in 3 Monatsraten.',
          href: '/de/mietkautionsrechner',
          tag: 'Kaution',
        },
      ],
    },
    {
      id: 'behoerden-dokumente',
      title: '3. Behörden, Dokumente & Sprache',
      description: 'Amtlich konforme Werkzeuge für behördliche Anträge, Rechnungen und Ausweise.',
      icon: FileText,
      tools: [
        {
          title: 'Kleinunternehmer-Rechnung PDF (§ 19 UStG)',
          desc: 'Finanzamtkonforme Rechnungen ohne Mehrwertsteuer mit Pflichtangaben nach § 14 UStG im A4-Format.',
          href: '/de/kleinunternehmer-rechnung',
          tag: 'Rechnung',
        },
        {
          title: 'Der Die Das Finder & Grammatik',
          desc: 'Schnelle Erkennung des korrekten Artikels für deutsche Nomen inklusive Plural und Suffixregeln.',
          href: '/de/der-die-das-finder',
          tag: 'Grammatik',
        },
        {
          title: 'Biometrisches Passfoto (35×45 mm)',
          desc: 'Passbildschablone nach Bundesdruckerei-Norm für Personalausweis und Reisepass (10×15 cm Druckbogen).',
          href: '/de/passfoto-generator-biometrisch',
          tag: 'Ausweis',
        },
        {
          title: 'IBAN-Prüfer & BLZ-Finder Deutschland',
          desc: 'Prüfziffernvalidierung nach ISO 13616 / MOD-97 und Bankleitzahl-Auflösung via Bundesbank-Register.',
          href: '/de/iban-pruefer-bic-finder',
          tag: 'Bank',
        },
        {
          title: 'PDF-Kompressor für Behördenanträge (< 2 MB)',
          desc: 'Optimierung für Bundesagentur für Arbeit, BAföG Digital und ELSTER. 100% lokal im Browser.',
          href: '/de/pdf-kompressor-online-antraege',
          tag: 'Upload',
        },
      ],
    },
    {
      id: 'gewerbe-alltag',
      title: '4. Gewerbe, Finanzen & Alltag',
      description: 'Finanzielle Entscheidungshilfen für Betriebe, Studenten und Autofahrer.',
      icon: Wrench,
      tools: [
        {
          title: 'Gewerbesteuerrechner nach Hebesatz',
          desc: 'Steuermessbetrag (3,5%), 24.500 € Freibetrag und Anrechnung auf die Einkommensteuer (§ 35 EStG).',
          href: '/de/gewerbesteuerrechner',
          tag: 'Gewerbe',
        },
        {
          title: 'Skontorechner & Jahreszins-Formel',
          desc: 'Skontoabzug, Zahlbetrag und effektiver Jahreszins beim Vergleich von Skonto und Bankkredit.',
          href: '/de/skontorechner',
          tag: 'Skonto',
        },
        {
          title: 'Notenumrechner (Bayerische Formel)',
          desc: 'Offizielle Umrechnung ausländischer Zeugnisnoten in das deutsche Schul- und Hochschulnotensystem.',
          href: '/de/notenumrechner-bayerische-formel',
          tag: 'Studium',
        },
        {
          title: 'Rabatt- & Prozentrechner',
          desc: 'Ersparnis in Euro und Endpreis bei Schlussverkäufen, Rabattaktionen und Preisnachlässen.',
          href: '/de/rabatt-prozent-rechner',
          tag: 'Shopping',
        },
        {
          title: 'Spritkostenrechner für Fahrten & Pendler',
          desc: 'Benzin- und Dieselkosten, Kraftstoffverbrauch und faire Aufteilung für Fahrgemeinschaften.',
          href: '/de/spritkostenrechner-fahrtkosten',
          tag: 'Auto',
        },
      ],
    },
  ];

  const allTools = categories.flatMap((c) => c.tools);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Portal Offizielle Rechner Deutschland 2026',
        url: `${SITE_URL}/de`,
        description:
          '20 amtlich geprüfte Gesetzes- & Finanzrechner für Deutschland 2026: Brutto-Netto, Abfindung § 34 EStG, Notarkosten GNotKG, Bürgerliches Gesetzbuch (BGB).',
        inLanguage: 'de-DE',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Kagazo',
          url: SITE_URL,
        },
      },
      {
        '@type': 'ItemList',
        name: 'Gesetzes- und Steuerrechner Deutschland',
        numberOfItems: allTools.length,
        itemListElement: allTools.map((t, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: t.title,
          url: `${SITE_URL}${t.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Aktualisiert 2026 • 20 offizielle Rechner nach deutschem Recht</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Portal für Offizielle Präzisionsrechner in Deutschland
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Rechtssichere und fundierte Online-Rechner mit direkter Ausführung im Browser. Keine Speicherung Ihrer sensiblen Gehalts- oder Immobiliendaten und strikte Einhaltung der DSGVO.
          </p>
        </div>

        {/* 4 Pillars Categories */}
        <div className="space-y-16">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <section key={cat.id} id={cat.id} className="space-y-6">
                <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                    {cat.tools.length} Werkzeuge
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.tools.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="group p-6 rounded-3xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                            {t.tag}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {t.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-700">
                        <span>Zum Rechner</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  </>
  );
}

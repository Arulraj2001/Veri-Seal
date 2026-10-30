'use client';

import * as React from 'react';
import { Search, Sparkles, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

interface NounEntry {
  noun: string;
  article: 'der' | 'die' | 'das';
  plural: string;
  translation: string;
  ruleHint: string;
}

const COMMON_GERMAN_NOUNS: Record<string, NounEntry> = {
  // Feminine (-ung, -heit, -keit, -schaft, -ion, etc.)
  wohnung: { noun: 'Wohnung', article: 'die', plural: 'die Wohnungen', translation: 'apartment / flat', ruleHint: 'Endung auf -ung ist immer feminin (die).' },
  freiheit: { noun: 'Freiheit', article: 'die', plural: 'die Freiheiten', translation: 'freedom', ruleHint: 'Endung auf -heit ist immer feminin (die).' },
  moeglichkeit: { noun: 'Möglichkeit', article: 'die', plural: 'die Möglichkeiten', translation: 'possibility', ruleHint: 'Endung auf -keit ist immer feminin (die).' },
  wirtschaft: { noun: 'Wirtschaft', article: 'die', plural: 'die Wirtschaften', translation: 'economy', ruleHint: 'Endung auf -schaft ist immer feminin (die).' },
  information: { noun: 'Information', article: 'die', plural: 'die Informationen', translation: 'information', ruleHint: 'Endung auf -ion ist immer feminin (die).' },
  universitaet: { noun: 'Universität', article: 'die', plural: 'die Universitäten', translation: 'university', ruleHint: 'Endung auf -tät ist immer feminin (die).' },
  musik: { noun: 'Musik', article: 'die', plural: 'die Musiken', translation: 'music', ruleHint: 'Endung auf -ik ist meist feminin (die).' },
  baeckerei: { noun: 'Bäckerei', article: 'die', plural: 'die Bäckereien', translation: 'bakery', ruleHint: 'Endung auf -ei ist fast immer feminin (die).' },
  natur: { noun: 'Natur', article: 'die', plural: 'die Naturen', translation: 'nature', ruleHint: 'Endung auf -ur ist überwiegend feminin (die).' },
  sonne: { noun: 'Sonne', article: 'die', plural: 'die Sonnen', translation: 'sun', ruleHint: 'Himmelskörper / Naturerscheinung meist feminin (die).' },
  zeitung: { noun: 'Zeitung', article: 'die', plural: 'die Zeitungen', translation: 'newspaper', ruleHint: 'Endung auf -ung ist immer feminin (die).' },
  stadt: { noun: 'Stadt', article: 'die', plural: 'die Städte', translation: 'city', ruleHint: 'Einsilbige weibliche Substantive mit Umlaut im Plural.' },

  // Masculine (-ling, -ismus, -or, -ant, etc.)
  fruehling: { noun: 'Frühling', article: 'der', plural: 'die Frühlinge', translation: 'spring (season)', ruleHint: 'Jahreszeiten und Endung auf -ling sind maskulin (der).' },
  optimismus: { noun: 'Optimismus', article: 'der', plural: '—', translation: 'optimism', ruleHint: 'Endung auf -ismus ist immer maskulin (der).' },
  motor: { noun: 'Motor', article: 'der', plural: 'die Motoren', translation: 'engine / motor', ruleHint: 'Lateinische Endung auf -or ist maskulin (der).' },
  doktor: { noun: 'Doktor', article: 'der', plural: 'die Doktoren', translation: 'doctor', ruleHint: 'Berufsbezeichnungen auf -or sind maskulin (der).' },
  student: { noun: 'Student', article: 'der', plural: 'die Studenten', translation: 'male student', ruleHint: 'Personenbezeichnungen auf -ent sind maskulin (der).' },
  computer: { noun: 'Computer', article: 'der', plural: 'die Computer', translation: 'computer', ruleHint: 'Geräte / Werkzeuge auf -er sind meist maskulin (der).' },
  tag: { noun: 'Tag', article: 'der', plural: 'die Tage', translation: 'day', ruleHint: 'Tageszeiten und Tage sind maskulin (der).' },
  montag: { noun: 'Montag', article: 'der', plural: 'die Montage', translation: 'Monday', ruleHint: 'Wochentage sind immer maskulin (der).' },
  kaffee: { noun: 'Kaffee', article: 'der', plural: 'die Kaffees', translation: 'coffee', ruleHint: 'Kaffee / Tee / alkoholische Getränke sind maskulin (Ausnahme: das Bier).' },
  apfel: { noun: 'Apfel', article: 'der', plural: 'die Äpfel', translation: 'apple', ruleHint: 'Obstsorten auf -el oft maskulin (der).' },

  // Neuter (-chen, -lein, -ment, -um, -tum, etc.)
  maedchen: { noun: 'Mädchen', article: 'das', plural: 'die Mädchen', translation: 'girl', ruleHint: 'Verkleinerungsform auf -chen ist immer neutral (das).' },
  fräulein: { noun: 'Fräulein', article: 'das', plural: 'die Fräulein', translation: 'miss', ruleHint: 'Diminutiv auf -lein ist immer neutral (das).' },
  dokument: { noun: 'Dokument', article: 'das', plural: 'die Dokumente', translation: 'document', ruleHint: 'Fremdwörter auf -ment sind fast immer neutral (das).' },
  zentrum: { noun: 'Zentrum', article: 'das', plural: 'die Zentren', translation: 'center', ruleHint: 'Lateinische Endung auf -um ist immer neutral (das).' },
  museum: { noun: 'Museum', article: 'das', plural: 'die Museen', translation: 'museum', ruleHint: 'Endung auf -um ist immer neutral (das).' },
  eigentum: { noun: 'Eigentum', article: 'das', plural: 'die Eigentümer', translation: 'property', ruleHint: 'Endung auf -tum ist überwiegend neutral (das).' },
  auto: { noun: 'Auto', article: 'das', plural: 'die Autos', translation: 'car', ruleHint: 'Kurzwörter und Endung auf -o sind meist neutral (das).' },
  buch: { noun: 'Buch', article: 'das', plural: 'die Bücher', translation: 'book', ruleHint: 'Klassisches deutsches Neutrum (das).' },
  haus: { noun: 'Haus', article: 'das', plural: 'die Häuser', translation: 'house', ruleHint: 'Klassisches deutsches Neutrum (das).' },
  bier: { noun: 'Bier', article: 'das', plural: 'die Biere', translation: 'beer', ruleHint: 'Ausnahme bei Getränken: Das Bier ist neutral.' },
  leben: { noun: 'Leben', article: 'das', plural: 'die Leben', translation: 'life', ruleHint: 'Substantivierte Infinitive sind immer neutral (das Leben, das Essen).' },
};

export function GermanyGenderFinderEngine() {
  const [query, setQuery] = React.useState('Wohnung');

  const normalized = query.trim().toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

  const detectedResult = React.useMemo(() => {
    const rawClean = query.trim();
    if (!rawClean) return null;

    // Direct dictionary match
    const dictMatch = COMMON_GERMAN_NOUNS[normalized] || COMMON_GERMAN_NOUNS[rawClean.toLowerCase()];
    if (dictMatch) return dictMatch;

    // Suffix heuristic engine
    const lower = rawClean.toLowerCase();

    // Feminine suffixes
    if (
      lower.endsWith('ung') ||
      lower.endsWith('heit') ||
      lower.endsWith('keit') ||
      lower.endsWith('schaft') ||
      lower.endsWith('tät') ||
      lower.endsWith('ion') ||
      lower.endsWith('ik') ||
      lower.endsWith('ei') ||
      lower.endsWith('ur') ||
      lower.endsWith('ade')
    ) {
      return {
        noun: rawClean.charAt(0).toUpperCase() + rawClean.slice(1),
        article: 'die' as const,
        plural: `die ${rawClean}en`,
        translation: 'Heuristische Erkennung',
        ruleHint: `Regel: Substantive auf Suffixe wie -ung, -heit, -keit, -schaft, -tät, -ion sind zu 99% feminin (die).`,
      };
    }

    // Neuter suffixes
    if (
      lower.endsWith('chen') ||
      lower.endsWith('lein') ||
      lower.endsWith('ment') ||
      lower.endsWith('um') ||
      lower.endsWith('tum') ||
      lower.endsWith('ma')
    ) {
      return {
        noun: rawClean.charAt(0).toUpperCase() + rawClean.slice(1),
        article: 'das' as const,
        plural: `die ${rawClean}e`,
        translation: 'Heuristische Erkennung',
        ruleHint: `Regel: Verkleinerungsformen auf -chen, -lein sowie Fremdwörter auf -ment, -um sind neutral (das).`,
      };
    }

    // Masculine suffixes
    if (
      lower.endsWith('ling') ||
      lower.endsWith('ismus') ||
      lower.endsWith('or') ||
      lower.endsWith('ant') ||
      lower.endsWith('ent') ||
      lower.endsWith('ist')
    ) {
      return {
        noun: rawClean.charAt(0).toUpperCase() + rawClean.slice(1),
        article: 'der' as const,
        plural: `die ${rawClean}e`,
        translation: 'Heuristische Erkennung',
        ruleHint: `Regel: Personenbezeichnungen und Endungen auf -ling, -ismus, -or, -ist sind maskulin (der).`,
      };
    }

    return {
      noun: rawClean.charAt(0).toUpperCase() + rawClean.slice(1),
      article: 'der' as const,
      plural: `die ${rawClean}e`,
      translation: 'Reguläres Substantiv',
      ruleHint: 'Tipp: Wenn keine feste Endung vorliegt, im Duden-Wörterbuch verifizieren.',
    };
  }, [query, normalized]);

  const getArticleStyles = (art: 'der' | 'die' | 'das') => {
    switch (art) {
      case 'der':
        return {
          bg: 'bg-blue-600',
          text: 'text-blue-600',
          lightBg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Maskulin (Männlich)',
        };
      case 'die':
        return {
          bg: 'bg-rose-600',
          text: 'text-rose-600',
          lightBg: 'bg-rose-50',
          border: 'border-rose-200',
          label: 'Feminin (Weiblich)',
        };
      case 'das':
      default:
        return {
          bg: 'bg-emerald-600',
          text: 'text-emerald-600',
          lightBg: 'bg-emerald-50',
          border: 'border-emerald-200',
          label: 'Neutrum (Sächlich)',
        };
    }
  };

  const styles = detectedResult ? getArticleStyles(detectedResult.article) : getArticleStyles('das');

  return (
    <div className="space-y-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Search Input Column */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="space-y-2">
            <label htmlFor="german-noun-input" className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Deutsches Nomen eingeben:
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="german-noun-input"
                type="text"
                placeholder="z. B. Wohnung, Dokument, Frühling..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-base sm:text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Quick Click Suggestions */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Häufig gesuchte Wörter:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Wohnung', 'Dokument', 'Frühling', 'Mädchen', 'Motor', 'Universität', 'Zentrum', 'Kaffee'].map(
                (word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => setQuery(word)}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-xs text-slate-700 transition-colors cursor-pointer"
                  >
                    {word}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Big Display Result Column */}
        <div className="lg:col-span-6 space-y-6">
          {detectedResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Grammatisches Geschlecht
                </span>
                <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${styles.bg} text-white`}>
                  {styles.label}
                </span>
              </div>

              {/* Big Article + Noun Display */}
              <div className="space-y-2">
                <div className="text-4xl sm:text-6xl font-black tracking-tight text-white flex items-baseline gap-3">
                  <span className={`font-mono ${styles.text}`}>{detectedResult.article}</span>
                  <span className="text-white">{detectedResult.noun}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-3">
                  <span>Plural: <strong className="text-slate-200">{detectedResult.plural}</strong></span>
                </div>
              </div>

              {/* Rule Explanation */}
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Grammatik-Regel:
                </span>
                <p className="text-slate-400 leading-relaxed font-sans">{detectedResult.ruleHint}</p>
              </div>
            </div>
          )}

          {/* Quick Rules Cheat Sheet */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 text-xs">
            <span className="font-bold text-slate-900 block">Sichere Endungs-Regeln auf einen Blick:</span>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200/60 space-y-1">
                <strong className="text-blue-900 font-bold block">DER (Maskulin)</strong>
                <p className="text-blue-700 leading-tight">-ling, -ismus, -or, -ant, -ent, -ist</p>
              </div>
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200/60 space-y-1">
                <strong className="text-rose-900 font-bold block">DIE (Feminin)</strong>
                <p className="text-rose-700 leading-tight">-ung, -heit, -keit, -schaft, -tät, -ion</p>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/60 space-y-1">
                <strong className="text-emerald-900 font-bold block">DAS (Neutrum)</strong>
                <p className="text-emerald-700 leading-tight">-chen, -lein, -ment, -um, -tum, -ma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

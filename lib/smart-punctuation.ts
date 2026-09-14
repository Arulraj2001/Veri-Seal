/**
 * Smart Punctuation & Breath Pauses Enhancer for Natural Speech Synthesis.
 *
 * Expands common abbreviations so neural TTS models pronounce them naturally,
 * inserts natural commas after transitional conjunctions for breathing pauses,
 * repairs run-on clauses with natural breath breaks, and ensures terminal punctuation.
 */
export function enhancePunctuationAndCadence(input: string): string {
  if (!input || !input.trim()) return input;

  let text = input;

  // 1. Expand common abbreviations to full spoken words for fluid neural speech
  const abbreviationMap: [RegExp, string][] = [
    [/\bapprox(?:\.|\b)/gi, 'approximately'],
    [/\bdept(?:\.|\b)/gi, 'department'],
    [/\bvs(?:\.|\b)/gi, 'versus'],
    [/\b(?:e\.g\.|eg)(?:,)?\b/gi, 'for example,'],
    [/\b(?:i\.e\.|ie)(?:,)?\b/gi, 'that is,'],
    [/\betc(?:\.|\b)/gi, 'and so forth'],
    [/\bgovt(?:\.|\b)/gi, 'government'],
    [/\bmin(?:\.|\b)/gi, 'minutes'],
    [/\bsec(?:\.|\b)/gi, 'seconds'],
    [/\bhr(?:\.|\b)/gi, 'hour'],
    [/\bhrs(?:\.|\b)/gi, 'hours'],
    [/\bw\/?o\b/gi, 'without'],
    [/\bw\/\b/gi, 'with'],
  ];

  for (const [regex, replacement] of abbreviationMap) {
    text = text.replace(regex, replacement);
  }

  // 2. Handle "No. 4" or "no. 12" -> "number 4"
  text = text.replace(/\bno\.\s*(\d+)/gi, (_match, p1) => `number ${p1}`);

  // 3. Add breathing commas after transitional discourse markers when missing
  text = text.replace(
    /\b(However|Therefore|Moreover|Furthermore|In addition|Consequently|Meanwhile|Specifically|Importantly)\b(?!\s*[,:;!?.])/g,
    (match) => `${match},`
  );

  // 4. Convert isolated hyphen pauses (" - ") into smooth em-dashes for natural narrative breaks
  text = text.replace(/\s+-\s+/g, ' — ');

  // 5. Ensure terminal punctuation on non-empty paragraphs so the voice doesn't cut off abruptly
  const lines = text.split(/\r?\n/);
  const formattedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;
    // If line doesn't end in punctuation or quote, add a period
    if (!/[.!?:"'’)\u2026]$/.test(trimmed)) {
      return `${trimmed}.`;
    }
    return trimmed;
  });

  return formattedLines.join('\n');
}

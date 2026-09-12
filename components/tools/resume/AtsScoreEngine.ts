import { ResumeData, AtsAuditResult, AtsAuditCriterion } from './resume-types';

const ACTION_VERBS = [
  'accelerated',
  'achieved',
  'analyzed',
  'architected',
  'automated',
  'built',
  'centralized',
  'compiled',
  'constructed',
  'coordinated',
  'created',
  'decreased',
  'delivered',
  'deployed',
  'designed',
  'developed',
  'directed',
  'eliminated',
  'engineered',
  'established',
  'executed',
  'expanded',
  'formulated',
  'implemented',
  'improved',
  'increased',
  'initiated',
  'integrated',
  'launched',
  'lead',
  'led',
  'managed',
  'mentored',
  'migrated',
  'minimized',
  'modernized',
  'optimized',
  'orchestrated',
  'overhauled',
  'pioneered',
  'reduced',
  'refactored',
  'resolved',
  'revamped',
  'scaled',
  'slashed',
  'spearheaded',
  'streamlined',
  'supervised',
  'transformed',
  'unified',
  'upgraded',
];

const COMMON_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with', 'you', 'your', 'we', 'our', 'they', 'their', 'or', 'but',
  'not', 'this', 'have', 'had', 'been', 'would', 'could', 'should', 'about',
  'into', 'through', 'after', 'over', 'between', 'under', 'above', 'also',
  'role', 'job', 'work', 'responsibilities', 'requirements', 'must', 'candidate',
  'years', 'experience', 'team', 'ability', 'skills', 'good', 'strong',
]);

/**
 * Deterministic Client-Side ATS Compliance Audit Engine
 */
export function auditResumeAtsCompliance(data: ResumeData, targetJdText = ''): AtsAuditResult {
  const criteria: AtsAuditCriterion[] = [];
  let score = 0;

  // 1. Full Name & Headline
  const hasName = Boolean(data.fullName && data.fullName.trim().length >= 3);
  criteria.push({
    id: 'name',
    title: 'Candidate Name Clear & Prominent',
    passed: hasName,
    weight: 8,
    tip: hasName ? 'Clear name present' : 'Enter your full legal name at the top.',
    fixAction: 'Enter Full Name',
  });
  if (hasName) score += 8;

  // 2. Contact Information
  const hasEmail = Boolean(data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()));
  const hasPhone = Boolean(data.phone && data.phone.trim().length >= 8);
  const hasContact = hasEmail && hasPhone;
  criteria.push({
    id: 'contact',
    title: 'Valid Email & Contact Phone Number',
    passed: hasContact,
    weight: 12,
    tip: hasContact
      ? 'Email and phone verified for ATS reachability'
      : 'Provide a valid email address and phone number for recruiter contact.',
    fixAction: 'Fill Email & Phone',
  });
  if (hasContact) score += 12;

  // 3. Location / Domicile
  const hasLocation = Boolean(data.cityLocation && data.cityLocation.trim().length >= 3);
  criteria.push({
    id: 'location',
    title: 'Geographic City / State Location',
    passed: hasLocation,
    weight: 6,
    tip: hasLocation ? 'City/Location present' : 'Specify your city and state for geographic filtering.',
  });
  if (hasLocation) score += 6;

  // 4. Job Title / Role Target
  const hasJobTitle = Boolean(data.jobTitle && data.jobTitle.trim().length >= 2);
  criteria.push({
    id: 'job_title',
    title: 'Specific Target Role / Job Title',
    passed: hasJobTitle,
    weight: 8,
    tip: hasJobTitle
      ? 'Target role specified'
      : 'Add an explicit job headline (e.g. "Senior Full Stack Engineer").',
  });
  if (hasJobTitle) score += 8;

  // 5. Professional Summary Length
  const summaryWords = data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0;
  const hasIdealSummary = summaryWords >= 20 && summaryWords <= 120;
  criteria.push({
    id: 'summary',
    title: 'Optimal Professional Summary (20–120 words)',
    passed: hasIdealSummary,
    weight: 10,
    tip: hasIdealSummary
      ? `Summary is ${summaryWords} words (ideal length)`
      : summaryWords === 0
      ? 'Add a concise 2–4 sentence summary of your career impact.'
      : summaryWords < 20
      ? 'Your summary is too brief; aim for at least 25 words.'
      : 'Summary is too long; trim down to under 120 words for ATS readability.',
  });
  if (hasIdealSummary) score += 10;

  // 6. Experience or Projects
  const totalExperienceOrProjects = data.experiences.length + data.projects.length;
  const hasExperience = totalExperienceOrProjects >= 1;
  criteria.push({
    id: 'experience_count',
    title: 'Work Experience or Practical Projects Listed',
    passed: hasExperience,
    weight: 12,
    tip: hasExperience
      ? `${totalExperienceOrProjects} roles / projects documented`
      : 'Add at least 1 work experience or major technical project.',
  });
  if (hasExperience) score += 12;

  // 7. Quantifiable Metrics & Numbers in Bullets
  const allBullets = [
    ...data.experiences.flatMap((e) => e.bullets),
    ...data.projects.flatMap((p) => p.bullets),
  ];
  const metricRegex = /([0-9]+%|[0-9]+k|[0-9]+m|₹[0-9]+|\$[0-9]+|[0-9]+\+|reduced|increased|improved|saved)/i;
  const bulletsWithMetrics = allBullets.filter((b) => metricRegex.test(b));
  const hasQuantifiedMetrics = bulletsWithMetrics.length >= 2;
  criteria.push({
    id: 'metrics',
    title: 'Quantified Impact & Metrics (%, ₹, $, numbers)',
    passed: hasQuantifiedMetrics,
    weight: 14,
    tip: hasQuantifiedMetrics
      ? `${bulletsWithMetrics.length} bullets have measurable metrics (Excellent)`
      : 'Include numbers (e.g. "improved speed by 35%", "saved ₹4L", "served 10,000+ users").',
  });
  if (hasQuantifiedMetrics) score += 14;

  // 8. Strong Action Verbs
  const bulletsStartingWithActionVerb = allBullets.filter((b) => {
    const firstWord = b.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    return ACTION_VERBS.includes(firstWord);
  });
  const hasActionVerbs = bulletsStartingWithActionVerb.length >= 2;
  criteria.push({
    id: 'action_verbs',
    title: 'Power Action Verbs (Architected, Engineered, Led)',
    passed: hasActionVerbs,
    weight: 10,
    tip: hasActionVerbs
      ? `${bulletsStartingWithActionVerb.length} bullets start with dynamic action verbs`
      : 'Begin bullets with powerful verbs (e.g. "Spearheaded", "Engineered", "Automated").',
  });
  if (hasActionVerbs) score += 10;

  // 9. Technical Skills Density
  const totalSkillsCount =
    data.skills.length +
    data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const hasSufficientSkills = totalSkillsCount >= 5;
  criteria.push({
    id: 'skills_count',
    title: 'Technical Skills & Keyword Coverage (5+ skills)',
    passed: hasSufficientSkills,
    weight: 12,
    tip: hasSufficientSkills
      ? `${totalSkillsCount} skills indexed for search matching`
      : 'Add at least 5 skills using the quick-add chips or tag input.',
  });
  if (hasSufficientSkills) score += 12;

  // 10. Education Credentials
  const hasEducation = data.education.length >= 1;
  criteria.push({
    id: 'education',
    title: 'Formal Education & Degree Qualification',
    passed: hasEducation,
    weight: 8,
    tip: hasEducation
      ? 'Degree and institution verified'
      : 'Add your highest degree or college education qualification.',
  });
  if (hasEducation) score += 8;

  // Score Ceiling
  score = Math.min(100, Math.max(0, score));

  // Determine Grade
  let grade: AtsAuditResult['grade'] = 'Needs Work';
  if (score >= 90) grade = 'ATS Ready ★';
  else if (score >= 75) grade = 'Strong';
  else if (score >= 50) grade = 'Good';

  // Job Description Matcher Comparison
  let matchedKeywords: string[] = [];
  let missingKeywords: string[] = [];
  let densityNotes = '';

  if (targetJdText.trim()) {
    const resumeCorpus = [
      data.fullName,
      data.jobTitle,
      data.summary,
      ...data.skills,
      ...data.experiences.map((e) => `${e.role} ${e.company} ${e.bullets.join(' ')}`),
      ...data.projects.map((p) => `${p.title} ${p.technologies.join(' ')} ${p.bullets.join(' ')}`),
      ...data.education.map((e) => `${e.degree} ${e.fieldOfStudy} ${e.institution}`),
    ]
      .join(' ')
      .toLowerCase();

    // Extract potential tech and role keywords from JD (alphanumeric words >= 3 chars)
    const jdTokens = targetJdText
      .toLowerCase()
      .replace(/[^a-z0-9+#.-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !COMMON_STOPWORDS.has(w));

    // Deduplicate and get top frequent terms
    const termFreq: Record<string, number> = {};
    for (const term of jdTokens) {
      termFreq[term] = (termFreq[term] || 0) + 1;
    }

    const sortedTerms = Object.keys(termFreq)
      .sort((a, b) => termFreq[b] - termFreq[a])
      .slice(0, 24);

    for (const term of sortedTerms) {
      // Use word-boundary regex to avoid false positives (e.g. 'go' inside 'good')
      const wordBoundaryRe = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (wordBoundaryRe.test(resumeCorpus)) {
        matchedKeywords.push(term);
      } else {
        missingKeywords.push(term);
      }
    }

    const matchRate = Math.round(
      (matchedKeywords.length / Math.max(1, sortedTerms.length)) * 100
    );
    densityNotes = `Job Description Match: ${matchRate}% (${matchedKeywords.length}/${sortedTerms.length} core keywords present)`;
  }

  return {
    score,
    grade,
    criteria,
    matchedKeywords,
    missingKeywords,
    densityNotes,
  };
}

'use client';

import React from 'react';
import { ResumeData, TemplateId } from './resume-types';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Calendar,
  Briefcase,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  Languages,
} from 'lucide-react';

function GithubIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

interface ResumeTemplateProps {
  data: ResumeData;
  className?: string;
}

export function ResumeMasterRenderer({ data, className = '' }: ResumeTemplateProps) {
  // Common Font Family
  const fontClass =
    data.fontFamily === 'roboto'
      ? 'font-sans font-normal'
      : data.fontFamily === 'merriweather'
      ? 'font-serif'
      : data.fontFamily === 'outfit'
      ? 'font-sans tracking-tight'
      : data.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  // Common Font Size Scale
  const sizeClass =
    data.fontSize === 'compact'
      ? 'text-[10px] leading-[1.35]'
      : data.fontSize === 'spacious'
      ? 'text-[12px] leading-[1.6]'
      : 'text-[11px] leading-[1.45]';

  const props = { data, fontClass, sizeClass };

  switch (data.templateId) {
    case 'tech_modern':
      return <TechModernTemplate {...props} className={className} />;
    case 'executive_minimalist':
      return <ExecutiveMinimalistTemplate {...props} className={className} />;
    case 'modern_two_column':
      return <ModernTwoColumnTemplate {...props} className={className} />;
    case 'compact_one_page':
      return <CompactOnePageTemplate {...props} className={className} />;
    case 'corporate_formal':
      return <CorporateFormalTemplate {...props} className={className} />;
    case 'govt_psu_tabular':
      return <GovtPsuTabularTemplate {...props} className={className} />;
    case 'traditional_biodata':
      return <TraditionalBioDataTemplate {...props} className={className} />;
    case 'academic_cv':
      return <AcademicCvTemplate {...props} className={className} />;
    case 'creative_accent':
      return <CreativeAccentTemplate {...props} className={className} />;
    case 'ats_clean':
    default:
      return <AtsCleanTemplate {...props} className={className} />;
  }
}

// =========================================================================
// 1. ATS CLEAN TEMPLATE (Strictly Single Column, 100% Machine Parseable)
// =========================================================================
function AtsCleanTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#0F172A';

  return (
    <article
      className={`w-full bg-white text-slate-900 p-8 sm:p-10 shadow-sm print:shadow-none print:bg-transparent ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm', color: '#0F172A' }}
    >
      {/* Header */}
      <header className="border-b pb-4 mb-4 text-center" style={{ borderColor: '#E2E8F0' }}>
        <h1
          className="text-2xl sm:text-3xl font-bold uppercase tracking-wide"
          style={{ color: accent }}
        >
          {data.fullName || 'YOUR FULL NAME'}
        </h1>
        {data.jobTitle && (
          <p className="text-sm font-semibold tracking-wider uppercase mt-1 text-slate-700">
            {data.jobTitle}
          </p>
        )}

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
          {data.cityLocation && <span>{data.cityLocation}</span>}
          {data.cityLocation && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.email && <span>•</span>}
          {data.email && (
            <a href={`mailto:${data.email}`} className="text-slate-800 hover:underline">
              {data.email}
            </a>
          )}
          {data.linkedInUrl && (
            <>
              <span>•</span>
              <a href={`https://${data.linkedInUrl.replace(/^https?:\/\//, '')}`} className="text-slate-800 hover:underline">
                {data.linkedInUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
              </a>
            </>
          )}
          {data.githubUrl && (
            <>
              <span>•</span>
              <a href={`https://${data.githubUrl.replace(/^https?:\/\//, '')}`} className="text-slate-800 hover:underline">
                {data.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, 'github/')}
              </a>
            </>
          )}
          {data.portfolioUrl && (
            <>
              <span>•</span>
              <a href={`https://${data.portfolioUrl.replace(/^https?:\/\//, '')}`} className="text-slate-800 hover:underline">
                {data.portfolioUrl.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Professional Summary
          </h2>
          <p className="text-slate-700 text-justify leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experiences.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Work Experience
          </h2>
          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-wrap justify-between items-baseline">
                  <div className="font-bold text-slate-900 text-xs">
                    <span>{exp.role}</span>
                    <span className="font-normal text-slate-600"> — {exp.company}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    {exp.location && ` | ${exp.location}`}
                  </div>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {(data.skills.length > 0 || data.skillCategories.length > 0) && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Technical Skills
          </h2>
          {data.skillCategories.some((c) => c.skills.length > 0) ? (
            <div className="space-y-1 text-slate-700">
              {data.skillCategories.map(
                (cat, idx) =>
                  cat.skills.length > 0 && (
                    <div key={idx} className="flex flex-wrap gap-1">
                      <span className="font-bold text-slate-900 text-[11px] min-w-[140px]">
                        {cat.categoryName}:
                      </span>
                      <span>{cat.skills.join(', ')}</span>
                    </div>
                  )
              )}
            </div>
          ) : (
            <p className="text-slate-700">{data.skills.join(' • ')}</p>
          )}
        </section>
      )}

      {/* Key Projects */}
      {data.projects.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Key Projects
          </h2>
          <div className="space-y-2.5">
            {data.projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex flex-wrap justify-between items-baseline">
                  <div className="font-bold text-slate-900 text-xs">
                    <span>{proj.title}</span>
                    {proj.technologies.length > 0 && (
                      <span className="font-normal text-slate-500 text-[11px]">
                        {' '}
                        | {proj.technologies.join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 space-x-2">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} className="hover:underline font-medium text-slate-700">
                        [Live Demo]
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} className="hover:underline font-medium text-slate-700">
                        [Code Repo]
                      </a>
                    )}
                  </div>
                </div>
                {proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </div>
                  <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                </div>
                <div className="text-right text-[11px] text-slate-500 font-medium">
                  <div>
                    {edu.startDate ? `${edu.startDate} – ` : ''}
                    {edu.endDate}
                  </div>
                  {edu.gradeOrCgpa && <div className="font-bold text-slate-800">{edu.gradeOrCgpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Licences */}
      {data.certifications.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Certifications &amp; Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
            {data.certifications.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between text-[11px]">
                <span className="font-semibold text-slate-900">{c.name}</span>
                <span className="text-slate-500 font-mono text-[10px] shrink-0 ml-2">
                  {c.issuer} ({c.issueDate})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section>
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b"
            style={{ color: accent, borderColor: '#CBD5E1' }}
          >
            Languages
          </h2>
          <p className="text-slate-700 text-[11px]">
            {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(' • ')}
          </p>
        </section>
      )}
    </article>
  );
}

// =========================================================================
// 2. TECH MODERN TEMPLATE (High-Tech Matrix, Badge Headers, Modern Badges)
// =========================================================================
function TechModernTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#2563EB';

  return (
    <article
      className={`w-full bg-white text-slate-900 p-8 sm:p-10 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      {/* Top Header Card */}
      <header className="pb-5 mb-5 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-lg">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {data.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs sm:text-sm font-bold tracking-wide uppercase" style={{ color: accent }}>
              {data.jobTitle || 'SOFTWARE ENGINEER'}
            </p>
          </div>

          {/* Contact Badges */}
          <div className="flex flex-col sm:items-end gap-1 text-[11px] text-slate-600 font-medium">
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-slate-900">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.email}</span>
              </a>
            )}
            {data.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.phone}</span>
              </span>
            )}
            {data.cityLocation && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.cityLocation}</span>
              </span>
            )}
          </div>
        </div>

        {/* Links Bar */}
        {(data.githubUrl || data.linkedInUrl || data.portfolioUrl) && (
          <div className="flex flex-wrap items-center gap-2 pt-3 text-[11px]">
            {data.githubUrl && (
              <a
                href={`https://${data.githubUrl.replace(/^https?:\/\//, '')}`}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[10px] font-bold transition-colors"
              >
                <GithubIcon className="w-3 h-3" />
                <span>{data.githubUrl.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {data.linkedInUrl && (
              <a
                href={`https://${data.linkedInUrl.replace(/^https?:\/\//, '')}`}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10px] transition-colors"
              >
                <LinkedinIcon className="w-3 h-3" />
                <span>LinkedIn</span>
              </a>
            )}
            {data.portfolioUrl && (
              <a
                href={`https://${data.portfolioUrl.replace(/^https?:\/\//, '')}`}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px] transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>Portfolio</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span>Summary</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {/* Tech Stack Chips Matrix (Front and Center for Tech Resumes) */}
      {(data.skills.length > 0 || data.skillCategories.length > 0) && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span>Core Technical Competencies</span>
          </h2>
          {data.skillCategories.some((c) => c.skills.length > 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.skillCategories.map(
                (cat, idx) =>
                  cat.skills.length > 0 && (
                    <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="font-bold text-[10px] uppercase text-slate-500 mb-1">
                        {cat.categoryName}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-800 font-mono text-[10px] rounded font-bold"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[10px] font-bold border border-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Work Experience */}
      {data.experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span>Experience</span>
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: accent }}>
                <div className="flex flex-wrap justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-black text-slate-900 text-xs inline">{exp.role}</h3>
                    <span className="text-slate-600 font-semibold text-xs"> @ {exp.company}</span>
                    {exp.employmentType && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        {exp.employmentType}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Engineering Projects */}
      {data.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span>Key Software Projects</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs">{proj.title}</h3>
                  <div className="flex gap-2 text-[10px] font-mono">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} className="text-blue-600 hover:underline">
                        Live ↗
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} className="text-slate-700 hover:underline">
                        Repo ↗
                      </a>
                    )}
                  </div>
                </div>
                {proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.2 rounded bg-white text-[9px] font-mono font-semibold border border-slate-200 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-3 space-y-0.5 text-[10px] text-slate-600">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
              <span>Education</span>
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {edu.endDate} {edu.gradeOrCgpa ? `• ${edu.gradeOrCgpa}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
              <span>Certifications</span>
            </h2>
            <div className="space-y-1.5">
              {data.certifications.map((c) => (
                <div key={c.id} className="text-[11px]">
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {c.issuer} • {c.issueDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

// =========================================================================
// 3. EXECUTIVE MINIMALIST (Swiss Design, Ultra-Clean Whitespace)
// =========================================================================
function ExecutiveMinimalistTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#111827';

  return (
    <article
      className={`w-full bg-white text-slate-900 p-8 sm:p-12 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      <header className="mb-6">
        <h1 className="text-3xl font-light tracking-tight text-slate-950">
          {data.fullName || 'FULL NAME'}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: accent }}>
          {data.jobTitle}
        </p>
        <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 mt-2 font-mono">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.cityLocation && <span>{data.cityLocation}</span>}
          {data.linkedInUrl && <span>{data.linkedInUrl}</span>}
        </div>
      </header>

      {data.summary && (
        <div className="mb-6 pl-4 border-l border-slate-300">
          <p className="text-slate-700 italic leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Professional History
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-slate-900">{exp.role}</span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">{exp.company} • {exp.location}</div>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600">, {edu.institution}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            Areas of Expertise
          </h2>
          <p className="text-slate-700">{data.skills.join(' • ')}</p>
        </section>
      )}
    </article>
  );
}

// =========================================================================
// 4. MODERN TWO-COLUMN TEMPLATE (Left Rail Contact/Skills + Right Main)
// =========================================================================
function ModernTwoColumnTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#1E3A8A';

  return (
    <article
      className={`w-full bg-white text-slate-900 grid grid-cols-12 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      {/* Left Rail (4 cols) */}
      <aside className="col-span-4 bg-slate-50 border-r border-slate-200 p-6 space-y-5">
        {data.showPhoto && data.photoUrl && (
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-slate-300">
            <img src={data.photoUrl} alt="Candidate" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 text-[10px]">
          <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] border-b pb-1">
            Contact
          </h3>
          {data.email && <div className="break-all">{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.cityLocation && <div>{data.cityLocation}</div>}
          {data.linkedInUrl && <div className="break-all">{data.linkedInUrl}</div>}
          {data.githubUrl && <div className="break-all">{data.githubUrl}</div>}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] border-b pb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((s, idx) => (
                <span key={idx} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="space-y-2 text-[10px]">
            <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] border-b pb-1">
              Education
            </h3>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600">{edu.institution}</div>
                <div className="text-slate-400">{edu.endDate} {edu.gradeOrCgpa ? `• ${edu.gradeOrCgpa}` : ''}</div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="space-y-1 text-[10px]">
            <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] border-b pb-1">
              Languages
            </h3>
            {data.languages.map((l) => (
              <div key={l.id} className="flex justify-between">
                <span>{l.language}</span>
                <span className="text-slate-500">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right Main Rail (8 cols) */}
      <main className="col-span-8 p-6 sm:p-8 space-y-5">
        <header>
          <h1 className="text-2xl font-bold uppercase tracking-tight" style={{ color: accent }}>
            {data.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            {data.jobTitle}
          </p>
        </header>

        {data.summary && (
          <section>
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1 border-b pb-1">
              Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {data.experiences.length > 0 && (
          <section>
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2 border-b pb-1">
              Experience
            </h2>
            <div className="space-y-3">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span>{exp.role}</span>
                    <span className="text-[10px] font-normal text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] font-medium">{exp.company}</div>
                  <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2 border-b pb-1">
              Projects
            </h2>
            <div className="space-y-2">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold text-xs text-slate-900">{proj.title}</div>
                  <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-700">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
}

// =========================================================================
// 5. COMPACT 1-PAGE TEMPLATE (Tailored for Students & Freshers)
// =========================================================================
function CompactOnePageTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#1D4ED8';

  return (
    <article
      className={`w-full bg-white text-slate-900 p-6 sm:p-8 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      <header className="border-b pb-2 mb-3 text-center">
        <h1 className="text-xl font-bold uppercase tracking-wider" style={{ color: accent }}>
          {data.fullName || 'YOUR FULL NAME'}
        </h1>
        {data.jobTitle && <p className="text-[11px] font-bold text-slate-700">{data.jobTitle}</p>}
        <p className="text-[10px] text-slate-600 mt-1">
          {[data.phone, data.email, data.cityLocation, data.linkedInUrl, data.githubUrl]
            .filter(Boolean)
            .join(' • ')}
        </p>
      </header>

      {data.summary && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 border-b pb-0.5 mb-1" style={{ borderColor: accent }}>
            Summary
          </h2>
          <p className="text-slate-700 text-justify">{data.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 border-b pb-0.5 mb-1" style={{ borderColor: accent }}>
            Education
          </h2>
          <div className="space-y-1">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span> — {edu.institution}
                </div>
                <div className="text-[10px] font-mono text-slate-600 font-bold">
                  {edu.endDate} {edu.gradeOrCgpa ? `(${edu.gradeOrCgpa})` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 border-b pb-0.5 mb-1" style={{ borderColor: accent }}>
            Technical Skills
          </h2>
          <p className="text-slate-700 leading-snug">{data.skills.join(', ')}</p>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 border-b pb-0.5 mb-1" style={{ borderColor: accent }}>
            Academic &amp; Personal Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="font-bold text-slate-900 text-xs">
                  {p.title} {p.technologies.length > 0 && <span className="text-slate-500 font-normal">[{p.technologies.join(', ')}]</span>}
                </div>
                <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-700">
                  {p.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 border-b pb-0.5 mb-1" style={{ borderColor: accent }}>
            Experience &amp; Internships
          </h2>
          <div className="space-y-2">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-[10px] font-mono text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-700">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// =========================================================================
// 6. CORPORATE FORMAL (Navy/Burgundy Headers with Divider Ribbons)
// =========================================================================
function CorporateFormalTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#1E293B';

  return (
    <article
      className={`w-full bg-white text-slate-900 p-8 sm:p-10 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      <header className="border-b-2 pb-4 mb-4" style={{ borderColor: accent }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          {data.fullName || 'CANDIDATE NAME'}
        </h1>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mt-0.5">
          {data.jobTitle}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {[data.cityLocation, data.phone, data.email, data.linkedInUrl].filter(Boolean).join(' | ')}
        </p>
      </header>

      {data.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2" style={{ backgroundColor: accent }}>
            Executive Summary
          </h2>
          <p className="text-slate-700 text-justify leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2" style={{ backgroundColor: accent }}>
            Employment Record
          </h2>
          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs text-slate-900">
                  <span>{exp.role}, {exp.company}</span>
                  <span className="font-mono text-[10px] text-slate-600">{exp.startDate} to {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700 mt-1">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2" style={{ backgroundColor: accent }}>
            Academic Credentials
          </h2>
          <div className="space-y-1.5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold">{edu.degree}</span> — {edu.institution}
                </div>
                <span className="font-mono text-[10px] text-slate-600">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2" style={{ backgroundColor: accent }}>
            Key Competencies
          </h2>
          <p className="text-slate-700">{data.skills.join(' • ')}</p>
        </section>
      )}
    </article>
  );
}

// =========================================================================
// 7. INDIAN GOVT & PSU TABULAR FORMAT (Strict Sarkari Table Standard)
// =========================================================================
function GovtPsuTabularTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  return (
    <article
      className={`w-full bg-white text-black p-8 sm:p-10 shadow-sm print:shadow-none border border-slate-300 print:border-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm', color: '#000000' }}
    >
      {/* Official Header with Passport Photo Slot */}
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            CURRICULUM VITAE / BIO-DATA (PROFORMA)
          </h1>
          <p className="text-xs font-bold uppercase">Application for Public Sector / Government Recruitment</p>
          <div className="text-xs space-y-0.5 pt-1">
            <div><strong>1. Full Name (in Block Letters):</strong> {data.fullName?.toUpperCase() || '_______________________'}</div>
            <div><strong>2. Father&apos;s / Husband&apos;s Name:</strong> {data.biodata.fatherName || '_______________________'}</div>
            <div><strong>3. Date of Birth:</strong> {data.biodata.dateOfBirth || '____/____/________'}</div>
            <div><strong>4. Category / Community:</strong> {data.govt.category || 'General'}</div>
            <div><strong>5. Domicile State:</strong> {data.govt.domicileState || 'Indian National'}</div>
            <div><strong>6. Contact Details:</strong> Phone: {data.phone || 'N/A'} | Email: {data.email || 'N/A'}</div>
            <div><strong>7. Address for Correspondence:</strong> {data.biodata.permanentAddress || data.cityLocation || 'N/A'}</div>
          </div>
        </div>

        {/* Passport Photo Box */}
        <div className="w-24 h-32 border-2 border-dashed border-black flex items-center justify-center text-center p-1 shrink-0 bg-slate-50">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt="Photo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] font-bold">Affix Recent Passport Size Photograph</span>
          )}
        </div>
      </div>

      {/* Educational Qualifications Table (Mandatory for Indian Govt Jobs) */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase mb-1">8. Educational &amp; Technical Qualifications:</h2>
        <table className="w-full border-collapse border border-black text-xs text-left">
          <thead>
            <tr className="bg-slate-100 border-b border-black text-center font-bold">
              <th className="border border-black p-1">Sl.</th>
              <th className="border border-black p-1">Exam / Degree Passed</th>
              <th className="border border-black p-1">Board / University / Institute</th>
              <th className="border border-black p-1">Year</th>
              <th className="border border-black p-1">% Marks / Division</th>
            </tr>
          </thead>
          <tbody>
            {data.education.map((edu, idx) => (
              <tr key={edu.id} className="border-b border-black">
                <td className="border border-black p-1 text-center font-bold">{idx + 1}</td>
                <td className="border border-black p-1 font-semibold">{edu.degree}</td>
                <td className="border border-black p-1">{edu.institution}</td>
                <td className="border border-black p-1 text-center">{edu.endDate}</td>
                <td className="border border-black p-1 text-center font-bold">{edu.gradeOrCgpa || 'Pass'}</td>
              </tr>
            ))}
            {data.education.length === 0 && (
              <tr>
                <td colSpan={5} className="border border-black p-2 text-center text-slate-500">
                  No educational qualifications entered
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Experience & Employment Details */}
      {data.experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase mb-1">9. Details of Employment / Experience:</h2>
          <table className="w-full border-collapse border border-black text-xs text-left">
            <thead>
              <tr className="bg-slate-100 border-b border-black text-center font-bold">
                <th className="border border-black p-1">Office / Org</th>
                <th className="border border-black p-1">Post Held</th>
                <th className="border border-black p-1">From</th>
                <th className="border border-black p-1">To</th>
                <th className="border border-black p-1">Nature of Duties</th>
              </tr>
            </thead>
            <tbody>
              {data.experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-black">
                  <td className="border border-black p-1 font-semibold">{exp.company}</td>
                  <td className="border border-black p-1">{exp.role}</td>
                  <td className="border border-black p-1 text-center">{exp.startDate}</td>
                  <td className="border border-black p-1 text-center">{exp.isCurrent ? 'Present' : exp.endDate}</td>
                  <td className="border border-black p-1 text-[11px]">{exp.bullets.join('; ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Languages Known */}
      <div className="text-xs mb-4">
        <strong>10. Languages Known:</strong> {data.govt.languagesKnown || 'English, Hindi'}
      </div>

      {/* Declaration & Signature Block */}
      <section className="mt-8 pt-4 border-t border-black space-y-4">
        <h3 className="text-xs font-bold uppercase text-center">DECLARATION</h3>
        <p className="text-xs text-justify leading-relaxed">
          {data.biodata.declarationText ||
            'I hereby solemnly declare that all statements made in this application are true, complete, and correct to the best of my knowledge and belief. In the event of any information being found false or incorrect at any stage, my candidature/appointment may be cancelled.'}
        </p>
        <div className="flex justify-between items-end pt-8 text-xs font-bold">
          <div>
            <div>Date: {data.biodata.declarationDate || '____/____/________'}</div>
            <div>Place: {data.biodata.declarationPlace || '____________________'}</div>
          </div>
          <div className="text-center">
            <div className="w-44 border-b border-black mb-1" />
            <span>(Signature of the Candidate)</span>
          </div>
        </div>
      </section>
    </article>
  );
}

// =========================================================================
// 8. TRADITIONAL INDIAN BIO-DATA (Marriage & Personal Standard)
// =========================================================================
function TraditionalBioDataTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#854D0E'; // Indian Gold / Maroon

  return (
    <article
      className={`w-full bg-white text-slate-900 p-8 sm:p-12 shadow-sm print:shadow-none border-4 border-double border-amber-800/60 ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      <header className="text-center border-b-2 border-amber-800/40 pb-3 mb-5">
        <div className="text-amber-850 text-xs font-bold uppercase tracking-widest mb-1">
          || श्री गणेशाय नमः ||
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-900 uppercase">
          BIO - DATA
        </h1>
      </header>

      {/* Personal Information Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-1.5 text-xs">
            <h2 className="font-bold text-amber-900 text-xs uppercase border-b border-amber-300 pb-0.5">
              Personal Details
            </h2>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-bold text-slate-700">Full Name:</span>
              <span className="col-span-2 font-bold text-slate-900">{data.fullName || 'Candidate Name'}</span>

              <span className="font-bold text-slate-700">Date of Birth:</span>
              <span className="col-span-2">{data.biodata.dateOfBirth || 'DD/MM/YYYY'}</span>

              <span className="font-bold text-slate-700">Height:</span>
              <span className="col-span-2">{data.biodata.height || "5' 8\""}</span>

              <span className="font-bold text-slate-700">Blood Group:</span>
              <span className="col-span-2">{data.biodata.bloodGroup || 'B+'}</span>

              <span className="font-bold text-slate-700">Religion / Caste:</span>
              <span className="col-span-2">{data.biodata.religion || 'Hindu'} {data.biodata.casteOrCommunity ? `(${data.biodata.casteOrCommunity})` : ''}</span>

              <span className="font-bold text-slate-700">Marital Status:</span>
              <span className="col-span-2">{data.biodata.maritalStatus || 'Unmarried'}</span>

              <span className="font-bold text-slate-700">Profession / Role:</span>
              <span className="col-span-2 font-semibold text-slate-900">{data.jobTitle || 'Executive'}</span>
            </div>
          </div>

          {/* Photo Slot */}
          {data.photoUrl ? (
            <div className="w-28 h-36 rounded-lg overflow-hidden border-2 border-amber-700 shrink-0">
              <img src={data.photoUrl} alt="Photo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-32 border-2 border-dashed border-amber-700/60 rounded flex items-center justify-center text-[10px] text-center p-1 text-slate-400">
              Photo
            </div>
          )}
        </div>

        {/* Education & Employment */}
        <div className="space-y-1.5 text-xs">
          <h2 className="font-bold text-amber-900 text-xs uppercase border-b border-amber-300 pb-0.5">
            Education &amp; Occupation
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between">
              <span><strong>{edu.degree}:</strong> {edu.institution}</span>
              <span className="font-bold">{edu.gradeOrCgpa}</span>
            </div>
          ))}
          {data.experiences.map((exp) => (
            <div key={exp.id}>
              <strong>Working At:</strong> {exp.role} at {exp.company}, {exp.location}
            </div>
          ))}
        </div>

        {/* Family Details */}
        <div className="space-y-1.5 text-xs">
          <h2 className="font-bold text-amber-900 text-xs uppercase border-b border-amber-300 pb-0.5">
            Family Background
          </h2>
          <div className="grid grid-cols-3 gap-1">
            <span className="font-bold text-slate-700">Father&apos;s Name:</span>
            <span className="col-span-2">{data.biodata.fatherName || '_______________________'}</span>

            <span className="font-bold text-slate-700">Father&apos;s Occupation:</span>
            <span className="col-span-2">{data.biodata.fatherOccupation || 'Business / Service'}</span>

            <span className="font-bold text-slate-700">Mother&apos;s Name:</span>
            <span className="col-span-2">{data.biodata.motherName || 'Homemaker'}</span>

            <span className="font-bold text-slate-700">Permanent Address:</span>
            <span className="col-span-2">{data.biodata.permanentAddress || data.cityLocation}</span>

            <span className="font-bold text-slate-700">Contact Number:</span>
            <span className="col-span-2 font-bold">{data.phone} | {data.email}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// =========================================================================
// 9. ACADEMIC & RESEARCH CV TEMPLATE
// =========================================================================
// =========================================================================
// 9. ACADEMIC CV TEMPLATE (Education-First, Two-Column, Classic Scholar)
// =========================================================================
function AcademicCvTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#1E3A5F';

  return (
    <article
      className={`w-full bg-white text-slate-900 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm', display: 'flex', flexDirection: 'row' }}
    >
      {/* Left Sidebar — Identity & Meta */}
      <aside
        className="w-[34%] shrink-0 p-6 sm:p-8 text-white flex flex-col gap-5"
        style={{ backgroundColor: accent, minHeight: '297mm' }}
      >
        {/* Photo */}
        {data.showPhoto && data.photoUrl && (
          <div className="mb-1">
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30 mx-auto"
            />
          </div>
        )}

        {/* Name Block */}
        <div>
          <h1 className="text-lg sm:text-xl font-black leading-tight text-white">
            {data.fullName || 'Academic Name'}
          </h1>
          {data.jobTitle && (
            <p className="text-[10px] font-semibold tracking-wider uppercase text-white/70 mt-1">
              {data.jobTitle}
            </p>
          )}
        </div>

        {/* Contact Details */}
        <div className="space-y-1 text-[10px] text-white/80">
          {data.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-white/50 shrink-0" />
              <span className="break-all">{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-white/50 shrink-0" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.cityLocation && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-white/50 shrink-0" />
              <span>{data.cityLocation}</span>
            </div>
          )}
          {data.linkedInUrl && (
            <div className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3 h-3 text-white/50 shrink-0" />
              <span className="break-all">{data.linkedInUrl.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {data.portfolioUrl && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-white/50 shrink-0" />
              <span className="break-all">{data.portfolioUrl.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* Research Skills / Expertise */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-white/50 mb-2">
              Research Areas
            </h2>
            <div className="flex flex-col gap-1">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="text-[10px] text-white/90 leading-snug">
                  › {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-white/50 mb-2">
              Languages
            </h2>
            <div className="space-y-0.5">
              {data.languages.map((l) => (
                <div key={l.id} className="text-[10px] text-white/80">
                  <span className="font-bold text-white">{l.language}</span>{' '}
                  <span className="text-white/60">({l.proficiency})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-white/50 mb-2">
              Awards &amp; Honors
            </h2>
            <div className="space-y-1.5">
              {data.certifications.map((c) => (
                <div key={c.id} className="text-[10px] text-white/85">
                  <div className="font-semibold text-white leading-snug">{c.name}</div>
                  <div className="text-white/60">{c.issuer}, {c.issueDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Main Content */}
      <main className="flex-1 p-6 sm:p-8 flex flex-col gap-5 overflow-hidden">
        {/* Research Summary */}
        {data.summary && (
          <section>
            <h2
              className="text-[9px] font-extrabold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Research Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {/* Education — First & Most Prominent */}
        {data.education.length > 0 && (
          <section>
            <h2
              className="text-[9px] font-extrabold uppercase tracking-widest pb-1 mb-2.5 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Education &amp; Degrees
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="font-black text-slate-900 text-xs">
                      {edu.degree} {edu.fieldOfStudy ? `— ${edu.fieldOfStudy}` : ''}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold">{edu.institution}</div>
                  {edu.location && (
                    <div className="text-[10px] text-slate-400 italic">{edu.location}</div>
                  )}
                  {edu.gradeOrCgpa && (
                    <div className="text-[10px] font-bold mt-0.5" style={{ color: accent }}>
                      {edu.gradeOrCgpa} {edu.honors ? `• ${edu.honors}` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Research Projects / Publications (using Projects section) */}
        {data.projects.length > 0 && (
          <section>
            <h2
              className="text-[9px] font-extrabold uppercase tracking-widest pb-1 mb-2.5 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Research Projects &amp; Publications
            </h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-xs leading-snug flex-1">
                      {proj.title}
                    </h3>
                    <div className="flex gap-2 text-[10px] font-mono shrink-0">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} className="underline" style={{ color: accent }}>
                          [Paper]
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} className="underline text-slate-600">
                          [Code]
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.role && (
                    <div className="text-[10px] italic text-slate-500">{proj.role}</div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      <span className="font-bold text-slate-700">Keywords: </span>
                      {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.bullets.map((b, idx) => (
                    <p key={idx} className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                      {b}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic / Research Experience */}
        {data.experiences.length > 0 && (
          <section>
            <h2
              className="text-[9px] font-extrabold uppercase tracking-widest pb-1 mb-2.5 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Academic &amp; Professional Experience
            </h2>
            <div className="space-y-3.5">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <div>
                      <h3 className="font-black text-slate-900 text-xs inline">{exp.role}</h3>
                      <span className="text-slate-600 text-[11px] font-semibold"> — {exp.company}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="text-[10px] italic text-slate-400">{exp.location}</div>
                  )}
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 mt-1 text-slate-700">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-snug">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
}

// =========================================================================
// 10. CREATIVE ACCENT TEMPLATE (Bold Color Band Header, Soft Card Sections)
// =========================================================================
function CreativeAccentTemplate({
  data,
  fontClass,
  sizeClass,
  className,
}: {
  data: ResumeData;
  fontClass: string;
  sizeClass: string;
  className?: string;
}) {
  const accent = data.themeColor || '#7C3AED';
  // Derive a light tint from accent for bg elements
  const accentLight = `${accent}18`;

  return (
    <article
      className={`w-full bg-white text-slate-900 shadow-sm print:shadow-none ${fontClass} ${sizeClass} ${className}`}
      style={{ minHeight: '297mm' }}
    >
      {/* Bold Accent Header Band */}
      <header className="relative overflow-hidden px-8 sm:px-10 py-8" style={{ backgroundColor: accent }}>
        {/* Decorative circles */}
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: '#ffffff' }}
        />
        <div
          className="absolute top-4 right-20 w-20 h-20 rounded-full opacity-10"
          style={{ backgroundColor: '#ffffff' }}
        />

        <div className="relative flex flex-wrap items-center gap-6">
          {/* Photo */}
          {data.showPhoto && data.photoUrl && (
            <img
              src={data.photoUrl}
              alt={data.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white/40 shrink-0"
            />
          )}

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {data.fullName || 'Your Name'}
            </h1>
            {data.jobTitle && (
              <p className="text-sm font-bold text-white/70 tracking-wide mt-0.5">{data.jobTitle}</p>
            )}
          </div>

          {/* Contact Pill Cluster */}
          <div className="flex flex-col gap-1.5 text-[10px] font-medium text-white/80 shrink-0">
            {data.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-white/60" /> {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-white/60" /> {data.phone}
              </span>
            )}
            {data.cityLocation && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-white/60" /> {data.cityLocation}
              </span>
            )}
            {data.linkedInUrl && (
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3 h-3 text-white/60" />
                {data.linkedInUrl.replace(/^https?:\/\//, '')}
              </span>
            )}
            {data.githubUrl && (
              <span className="flex items-center gap-1.5">
                <GithubIcon className="w-3 h-3 text-white/60" />
                {data.githubUrl.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-8 sm:px-10 py-7 space-y-6">

        {/* Summary */}
        {data.summary && (
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                About
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed pl-4 border-l-2" style={{ borderColor: accentLight }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Skills — Tag Cloud */}
        {data.skills.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-4">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                  style={{ color: accent, borderColor: accent, backgroundColor: accentLight }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experiences.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                Experience
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                    <div>
                      <h3 className="font-black text-slate-900 text-xs inline">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-slate-500"> @ {exp.company}</span>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: accent, backgroundColor: accentLight }}
                    >
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                Key Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-xl border space-y-1"
                  style={{ borderColor: `${accent}30`, backgroundColor: accentLight }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 text-xs">{proj.title}</h3>
                    <div className="flex gap-2 text-[10px]">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} style={{ color: accent }} className="font-bold hover:underline">
                          Live ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} className="text-slate-600 font-bold hover:underline">
                          Repo ↗
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono font-bold text-slate-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.bullets.slice(0, 2).map((b, idx) => (
                    <p key={idx} className="text-[10px] text-slate-600 leading-snug">{b}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
                <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                  Education
                </h2>
              </div>
              <div className="space-y-2 pl-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900 text-xs">{edu.degree}</div>
                    <div className="text-[11px] text-slate-600">{edu.institution}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {edu.endDate} {edu.gradeOrCgpa ? `• ${edu.gradeOrCgpa}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
                <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                  Certifications
                </h2>
              </div>
              <div className="space-y-1.5 pl-4">
                {data.certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-semibold text-slate-900 text-[11px]">{c.name}</div>
                    <div className="text-[10px] text-slate-500">{c.issuer} • {c.issueDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 pl-4">
              {data.languages.map((l) => (
                <span key={l.id} className="text-[11px] font-semibold text-slate-700">
                  {l.language}
                  <span className="font-normal text-slate-400"> ({l.proficiency})</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

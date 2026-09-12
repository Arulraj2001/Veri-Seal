'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  FileText,
  Printer,
  Download,
  Upload,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Search,
  BookOpen,
  Briefcase,
  GraduationCap,
  Wrench,
  Code2,
  Award,
  Languages,
  User,
  ExternalLink,
  HelpCircle,
  Sliders,
  Maximize2,
} from 'lucide-react';
import {
  ResumeData,
  OperationalMode,
  TemplateId,
  FontFamily,
  FontSizeScale,
  LineSpacingScale,
  WorkExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  AtsAuditResult,
} from './resume/resume-types';
import {
  EMPTY_RESUME_DATA,
  TECH_LEAD_SAMPLE_DATA,
  FRESHER_CS_SAMPLE_DATA,
  GOVT_PSU_SAMPLE_DATA,
  TRADITIONAL_BIODATA_SAMPLE_DATA,
} from './resume/resume-sample-data';
import { auditResumeAtsCompliance } from './resume/AtsScoreEngine';
import { ResumeMasterRenderer } from './resume/ResumeTemplates';
import { printIsolatedDocument } from '@/lib/print-utils';
import { AdSlot } from '@/components/ads/AdSlot';

const QUICK_TECH_CHIPS = [
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'Python',
  'Go',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Tailwind CSS',
  'GraphQL',
  'CI/CD',
  'LLMs / LangChain',
  'Git',
  'Microservices',
];

const ACTION_VERB_SUGGESTIONS = [
  'Spearheaded',
  'Architected',
  'Engineered',
  'Automated',
  'Optimized',
  'Reduced',
  'Increased',
  'Scaled',
  'Developed',
  'Delivered',
  'Mentored',
];

const TEMPLATE_OPTIONS: { id: TemplateId; label: string; tag: string }[] = [
  { id: 'ats_clean', label: 'ATS Clean Simple ★', tag: '100% Parseable' },
  { id: 'tech_modern', label: 'Tech Modern SDE', tag: 'Skills Matrix' },
  { id: 'executive_minimalist', label: 'Executive Minimalist', tag: 'Leadership' },
  { id: 'modern_two_column', label: 'Modern Two-Column', tag: 'Sidebar' },
  { id: 'compact_one_page', label: 'Compact 1-Pager', tag: 'Freshers' },
  { id: 'corporate_formal', label: 'Corporate Formal', tag: 'Structured' },
  { id: 'academic_cv', label: 'Academic / Scholar CV', tag: 'Education-First' },
  { id: 'creative_accent', label: 'Creative Accent', tag: 'Bold Header' },
  { id: 'govt_psu_tabular', label: 'Indian Govt / PSU 🇮🇳', tag: 'Official Table' },
  { id: 'traditional_biodata', label: 'Traditional Bio-Data', tag: 'Family / Marriage' },
];

const COLOR_SWATCHES = [
  { id: '#0F172A', label: 'Slate Dark', color: '#0F172A' },
  { id: '#1E3A8A', label: 'Classic Navy', color: '#1E3A8A' },
  { id: '#047857', label: 'Emerald Green', color: '#047857' },
  { id: '#6D28D9', label: 'Royal Purple', color: '#6D28D9' },
  { id: '#991B1B', label: 'Burgundy', color: '#991B1B' },
  { id: '#0E7490', label: 'Deep Teal', color: '#0E7490' },
  { id: '#854D0E', label: 'Indian Gold', color: '#854D0E' },
];

export default function ResumeBuilderEngine() {
  const [mounted, setMounted] = useState<boolean>(false);
  const previewPaperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Master State initialized to Tech Lead Sample (or user can clear to empty)
  const [data, setData] = useState<ResumeData>(TECH_LEAD_SAMPLE_DATA);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [targetJdInput, setTargetJdInput] = useState<string>('');
  const [showJdModal, setShowJdModal] = useState<boolean>(false);
  const [showSamplesMenu, setShowSamplesMenu] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AtsAuditResult>(() =>
    auditResumeAtsCompliance(TECH_LEAD_SAMPLE_DATA)
  );

  const photoInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const samplesMenuRef = useRef<HTMLDivElement>(null);

  // Close samples menu on outside click
  useEffect(() => {
    if (!showSamplesMenu) return;
    const handleOutside = (e: MouseEvent) => {
      if (samplesMenuRef.current && !samplesMenuRef.current.contains(e.target as Node)) {
        setShowSamplesMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showSamplesMenu]);

  // Recalculate ATS Score whenever data or target JD changes
  useEffect(() => {
    const res = auditResumeAtsCompliance(data, targetJdInput);
    setAuditResult(res);
  }, [data, targetJdInput]);

  // Operational Mode Switcher
  const handleSwitchMode = (mode: OperationalMode) => {
    if (mode === 'govt') {
      setData((prev) => ({
        ...prev,
        mode: 'govt',
        templateId: 'govt_psu_tabular',
        showPhoto: true,
      }));
    } else if (mode === 'biodata') {
      setData((prev) => ({
        ...prev,
        mode: 'biodata',
        templateId: 'traditional_biodata',
        showPhoto: true,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        mode,
        templateId: prev.templateId === 'govt_psu_tabular' || prev.templateId === 'traditional_biodata' ? 'ats_clean' : prev.templateId,
      }));
    }
  };

  // Load Preset
  const handleLoadPreset = (presetKey: 'tech' | 'fresher' | 'govt' | 'biodata' | 'empty') => {
    if (presetKey === 'tech') setData(TECH_LEAD_SAMPLE_DATA);
    else if (presetKey === 'fresher') setData(FRESHER_CS_SAMPLE_DATA);
    else if (presetKey === 'govt') setData(GOVT_PSU_SAMPLE_DATA);
    else if (presetKey === 'biodata') setData(TRADITIONAL_BIODATA_SAMPLE_DATA);
    else setData(EMPTY_RESUME_DATA);
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid JPG or PNG photo.');
      return;
    }
    const url = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, photoUrl: url, showPhoto: true }));
    e.target.value = '';
  };

  // Experience Handlers
  const handleAddExperience = () => {
    const newExp: WorkExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    setData((prev) => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
    setActiveSection('experience');
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperienceItem, value: any) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const handleAddExpBullet = (expId: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      ),
    }));
  };

  const handleUpdateExpBullet = (expId: string, bulletIdx: number, val: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.map((b, i) => (i === bulletIdx ? val : b)),
            }
          : exp
      ),
    }));
  };

  const handleRemoveExpBullet = (expId: string, bulletIdx: number) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.filter((_, i) => i !== bulletIdx),
            }
          : exp
      ),
    }));
  };

  // Education Handlers
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gradeOrCgpa: '',
    };
    setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
    setActiveSection('education');
  };

  const handleUpdateEducation = (id: string, field: keyof EducationItem, value: any) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skills Handlers
  const handleAddSkill = (skill: string) => {
    const clean = skill.trim();
    if (!clean) return;
    if (data.skills.includes(clean)) return;
    setData((prev) => ({ ...prev, skills: [...prev.skills, clean] }));
  };

  const handleRemoveSkill = (skill: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // Projects Handlers
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      technologies: [],
      bullets: [''],
    };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
    setActiveSection('projects');
  };

  const handleUpdateProject = (id: string, field: keyof ProjectItem, value: any) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleRemoveProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Certifications Handlers
  const handleAddCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
    };
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
    setActiveSection('certifications');
  };

  const handleUpdateCertification = (id: string, field: keyof CertificationItem, value: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const handleRemoveCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  // Language Handlers
  const handleAddLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional Working',
    };
    setData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
    setActiveSection('languages');
  };

  const handleUpdateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }));
  };

  const handleRemoveLanguage = (id: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };
  // JSON Save & Load Handlers
  const handleSaveJson = () => {
    // Strip blob/object-URL photo before saving — they're session-scoped and
    // would become broken links if the file is loaded in a new browser session.
    const exportData = {
      ...data,
      photoUrl: data.photoUrl.startsWith('blob:') ? '' : data.photoUrl,
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = data.fullName.trim() ? data.fullName.toLowerCase().replace(/\s+/g, '_') : 'profile';
    link.download = `${cleanName}_veriseal_resume_backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleLoadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.fullName !== undefined) {
          setData(parsed);
          alert('Resume profile loaded successfully!');
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ─── PRINT: Native browser print dialog via Dedicated Print Portal ───────────
  const handlePrint = () => {
    const body = document.body;
    body.classList.add('printing-resume');

    // Micro-delay so browser paint loop applies print portal styles before dialog opens
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.print();
      }, 80);
    });

    const cleanup = () => {
      body.classList.remove('printing-resume');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => body.classList.remove('printing-resume'), 4000);
  };

  // ─── PDF DOWNLOAD: High-Resolution Client-Side A4 Vector / Canvas Generation ──
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    if (pdfGenerating) return;
    const sourceEl = previewPaperRef.current;
    if (!sourceEl) {
      alert('Resume preview is not ready. Please try again.');
      return;
    }

    setPdfGenerating(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      // Create an off-screen render clone with guaranteed 794px width (standard 210mm at 96 DPI)
      // This ensures consistent A4 proportion regardless of device/screen width
      const exportClone = sourceEl.cloneNode(true) as HTMLElement;
      exportClone.style.width = '794px';
      exportClone.style.maxWidth = '794px';
      exportClone.style.minHeight = '1123px';
      exportClone.style.position = 'fixed';
      exportClone.style.left = '0px';
      exportClone.style.top = '0px';
      exportClone.style.zIndex = '-99999';
      exportClone.style.opacity = '1';
      exportClone.style.pointerEvents = 'none';
      exportClone.style.background = '#ffffff';
      exportClone.style.boxShadow = 'none';
      exportClone.style.margin = '0';
      exportClone.style.transform = 'none';
      document.body.appendChild(exportClone);

      // Wait a moment for layout to settle in DOM
      await new Promise((resolve) => setTimeout(resolve, 150));

      const totalHeight = exportClone.scrollHeight;

      const canvas = await html2canvas(exportClone, {
        scale: 2, // 2x gives 1588px width (~200 DPI), crisp text and light file size
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: totalHeight,
        windowWidth: 794,
        windowHeight: totalHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Remove the off-screen clone immediately
      document.body.removeChild(exportClone);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const A4_W_MM = 210;
      const A4_H_MM = 297;
      const pxPerMm = canvas.width / A4_W_MM;
      const a4PageHeightPx = Math.round(A4_H_MM * pxPerMm);

      // If it fits in 1 single page (with 25px leeway)
      if (canvas.height <= a4PageHeightPx + 25) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = a4PageHeightPx;
        const pCtx = pageCanvas.getContext('2d');
        if (pCtx) {
          pCtx.fillStyle = '#ffffff';
          pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          pCtx.drawImage(canvas, 0, 0);
        }
        const pageImg = pageCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(pageImg, 'JPEG', 0, 0, A4_W_MM, A4_H_MM, undefined, 'FAST');
      } else {
        // Multi-page resume: tile slices across exact A4 pages
        let yOffsetPx = 0;
        let pageIndex = 0;

        while (yOffsetPx < canvas.height) {
          const sliceHeightPx = Math.min(a4PageHeightPx, canvas.height - yOffsetPx);

          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = a4PageHeightPx;
          const pCtx = pageCanvas.getContext('2d');
          if (pCtx) {
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            pCtx.drawImage(
              canvas,
              0,
              yOffsetPx,
              canvas.width,
              sliceHeightPx,
              0,
              0,
              canvas.width,
              sliceHeightPx
            );
          }

          const sliceImg = pageCanvas.toDataURL('image/jpeg', 0.98);

          if (pageIndex > 0) {
            pdf.addPage('a4', 'portrait');
          }

          pdf.addImage(sliceImg, 'JPEG', 0, 0, A4_W_MM, A4_H_MM, undefined, 'FAST');

          yOffsetPx += a4PageHeightPx;
          pageIndex++;
        }
      }

      const safeName = data.fullName.trim()
        ? data.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '_')
        : 'resume';

      pdf.save(`${safeName}_veriseal_resume.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Could not generate PDF image. Please click "Print A4" and select "Save as PDF" for instant vector output.');
    } finally {
      setPdfGenerating(false);
    }
  };

  // Magic 1-Page Fit Optimizer
  const handleFitToOnePage = () => {
    setData((prev) => ({
      ...prev,
      fontSize: 'compact',
      lineSpacing: 'tight',
    }));
  };

  return (
    <div className="w-full space-y-8">
      {/* Sovereign Studio Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-surface-darker/70 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Dark Header Bar */}
        <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  ATS Resume &amp; Bio-Data Studio
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  100% PRIVATE IN-RAM
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Workday &amp; Taleo compliant • Tech, Academic, Indian PSU &amp; Bio-Data formats • 0-byte cloud leak.
              </p>
            </div>
          </div>

          {/* Quick Format Mode Tabs & Master Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Format Mode Switcher */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              {(['resume', 'cv', 'govt', 'biodata'] as OperationalMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleSwitchMode(mode)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer capitalize ${
                    data.mode === mode
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === 'govt' ? 'Govt / PSU' : mode === 'biodata' ? 'Bio-Data 🇮🇳' : mode.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Load Preset Button — click-toggle, works on mobile & desktop */}
            <div className="relative" ref={samplesMenuRef}>
              <button
                type="button"
                onClick={() => setShowSamplesMenu((v) => !v)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Samples</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${showSamplesMenu ? 'rotate-180' : ''}`} />
              </button>

              {showSamplesMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 px-2.5 pb-1.5 pt-0.5">
                    Load Sample Profile
                  </p>
                  <button
                    onClick={() => { handleLoadPreset('tech'); setShowSamplesMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>💻</span>
                    <span>Senior Tech Engineer</span>
                  </button>
                  <button
                    onClick={() => { handleLoadPreset('fresher'); setShowSamplesMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>🎓</span>
                    <span>College SDE Fresher</span>
                  </button>
                  <button
                    onClick={() => { handleLoadPreset('govt'); setShowSamplesMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>🏛️</span>
                    <span>Indian Govt / PSU</span>
                  </button>
                  <button
                    onClick={() => { handleLoadPreset('biodata'); setShowSamplesMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>🕉️</span>
                    <span>Traditional Bio-Data</span>
                  </button>
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    onClick={() => { handleLoadPreset('empty'); setShowSamplesMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-950/40 text-rose-400 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>🧹</span>
                    <span>Clear / Blank Canvas</span>
                  </button>
                </div>
              )}
            </div>

            {/* Backup JSON */}
            <button
              type="button"
              onClick={handleSaveJson}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer shadow-xs"
              title="Save Profile Backup (JSON)"
            >
              <Download className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              type="button"
              onClick={() => jsonInputRef.current?.click()}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer shadow-xs"
              title="Load Profile Backup (JSON)"
            >
              <Upload className="w-4 h-4 text-blue-400" />
            </button>
            <input
              type="file"
              ref={jsonInputRef}
              onChange={handleLoadJson}
              accept=".json,application/json"
              className="hidden"
            />

            {/* Download PDF */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={pdfGenerating}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-400 text-white transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              {pdfGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* 1-Click Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4</span>
            </button>
          </div>
        </div>

        {/* Studio Body Grid (Left 40% / Right 60%) */}
        <div className="p-4 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
          {/* ============================================================= */}
          {/* LEFT COLUMN: Modular Resume Form Sections (40% - 4 cols)      */}
          {/* ============================================================= */}
          <div className="lg:col-span-4 space-y-4">
            {/* 1. PERSONAL DETAILS */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3.5">
              <div
                onClick={() => setActiveSection(activeSection === 'personal' ? '' : 'personal')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Personal Details &amp; Contact Header
                  </h3>
                </div>
                {activeSection === 'personal' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              {activeSection === 'personal' && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Job Title / Headline</label>
                      <input
                        type="text"
                        value={data.jobTitle}
                        onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                        placeholder="e.g. Senior Full Stack Engineer"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        placeholder="you@gmail.com"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">City / Location</label>
                      <input
                        type="text"
                        value={data.cityLocation}
                        onChange={(e) => setData({ ...data, cityLocation: e.target.value })}
                        placeholder="e.g. Bengaluru, India"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={data.linkedInUrl}
                        onChange={(e) => setData({ ...data, linkedInUrl: e.target.value })}
                        placeholder="linkedin.com/in/username"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">GitHub / Code URL</label>
                      <input
                        type="text"
                        value={data.githubUrl}
                        onChange={(e) => setData({ ...data, githubUrl: e.target.value })}
                        placeholder="github.com/username"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Portfolio / Personal URL</label>
                      <input
                        type="text"
                        value={data.portfolioUrl}
                        onChange={(e) => setData({ ...data, portfolioUrl: e.target.value })}
                        placeholder="yoursite.com"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Photo Toggle & Upload */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {data.photoUrl ? (
                        <img src={data.photoUrl} alt="Photo" className="w-10 h-10 rounded-full object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-white block">Passport / Candidate Photo</span>
                        <span className="text-[10px] text-slate-500">Recommended for Bio-Data &amp; Indian Govt applications. Hidden on strict ATS tech resumes.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Upload
                      </button>
                      <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                      {data.photoUrl && (
                        <button
                          type="button"
                          onClick={() => setData({ ...data, showPhoto: !data.showPhoto })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                            data.showPhoto ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {data.showPhoto ? 'Showing' : 'Hidden'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Professional Summary / Executive Objective
                    </label>
                    <textarea
                      rows={3}
                      value={data.summary}
                      onChange={(e) => setData({ ...data, summary: e.target.value })}
                      placeholder="2–4 impactful sentences summarizing your key technical competencies, production impact, and years of experience..."
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. WORK EXPERIENCE */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Work Experience ({data.experiences.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {activeSection === 'experience' && (
                <div className="space-y-3 pt-2">
                  {data.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-white">
                          Role #{idx + 1}: {exp.role || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(exp.id)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                          placeholder="Job Title / Role (e.g. Lead SDE)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Company Name"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                          placeholder="Start Date (e.g. Jan 2022)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={exp.isCurrent ? 'Present' : exp.endDate}
                          disabled={exp.isCurrent}
                          onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="End Date"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs disabled:opacity-50"
                        />
                        <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => handleUpdateExperience(exp.id, 'isCurrent', e.target.checked)}
                            className="accent-indigo-600 rounded"
                          />
                          <span>Currently Working</span>
                        </label>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500">Key Achievements &amp; Metrics</span>
                          <div className="flex gap-1">
                            {ACTION_VERB_SUGGESTIONS.slice(0, 4).map((verb) => (
                              <button
                                key={verb}
                                type="button"
                                onClick={() => handleAddExpBullet(exp.id)}
                                className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-bold hover:bg-slate-200"
                              >
                                + {verb}
                              </button>
                            ))}
                          </div>
                        </div>

                        {exp.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-1.5">
                            <span className="text-slate-400 text-xs">•</span>
                            <input
                              type="text"
                              value={b}
                              onChange={(e) => handleUpdateExpBullet(exp.id, bIdx, e.target.value)}
                              placeholder="e.g. Spearheaded microservice rebuild, slashing query latency by 45% for 120k users..."
                              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs text-slate-800 dark:text-slate-200"
                            />
                            {exp.bullets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveExpBullet(exp.id, bIdx)}
                                className="text-slate-400 hover:text-rose-500 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => handleAddExpBullet(exp.id)}
                          className="text-[11px] font-bold text-indigo-600 hover:underline pt-1 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add another bullet achievement</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {data.experiences.length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-3">
                      No work experiences added. Click &quot;Add Role&quot; above.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 3. EDUCATION */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setActiveSection(activeSection === 'education' ? '' : 'education')}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Education &amp; Qualifications ({data.education.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              {activeSection === 'education' && (
                <div className="space-y-3 pt-2">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800 dark:text-white">Degree Entry</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="Institution / University Name"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Degree (e.g. B.Tech, M.S., B.Sc)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => handleUpdateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                          placeholder="Major / Branch"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
                          placeholder="Year of Passing (e.g. 2024)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-mono"
                        />
                        <input
                          type="text"
                          value={edu.gradeOrCgpa}
                          onChange={(e) => handleUpdateEducation(edu.id, 'gradeOrCgpa', e.target.value)}
                          placeholder="CGPA / Percentage"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. TECHNICAL SKILLS & QUICK-ADD CHIPS */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3">
              <div
                onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Skills &amp; Tech Stack ({data.skills.length})
                  </h3>
                </div>
                {activeSection === 'skills' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              {activeSection === 'skills' && (
                <div className="space-y-3 pt-1">
                  {/* Quick-Add Tech Chips */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      ⚡ 1-Click Quick-Add Modern Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_TECH_CHIPS.map((chip) => {
                        const isAdded = data.skills.includes(chip);
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => (isAdded ? handleRemoveSkill(chip) : handleAddSkill(chip))}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                              isAdded
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-indigo-400'
                            }`}
                          >
                            {isAdded ? '✓ ' : '+ '}
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Skill Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(customSkillInput);
                          setCustomSkillInput('');
                        }
                      }}
                      placeholder="Type custom skill and press Enter..."
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleAddSkill(customSkillInput);
                        setCustomSkillInput('');
                      }}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  {/* Active Skills Cloud */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {data.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-200 font-mono text-[11px] font-bold border border-indigo-200 dark:border-indigo-800"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-indigo-400 hover:text-indigo-700 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. PROJECTS */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    5
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Projects ({data.projects.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {activeSection === 'projects' && (
                <div className="space-y-3 pt-2">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold">{proj.title || 'New Project'}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveProject(proj.id)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                          placeholder="Project Title"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={proj.liveUrl}
                          onChange={(e) => handleUpdateProject(proj.id, 'liveUrl', e.target.value)}
                          placeholder="Live Demo URL"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => handleUpdateProject(proj.id, 'githubUrl', e.target.value)}
                          placeholder="GitHub URL"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                        />
                      </div>

                      {proj.bullets.map((b, bIdx) => (
                        <input
                          key={bIdx}
                          type="text"
                          value={b}
                          onChange={(e) =>
                            handleUpdateProject(
                              proj.id,
                              'bullets',
                              proj.bullets.map((item, i) => (i === bIdx ? e.target.value : item))
                            )
                          }
                          placeholder="Project achievement / metrics bullet point..."
                          className="w-full px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6. CERTIFICATIONS & CREDENTIALS */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setActiveSection(activeSection === 'certifications' ? '' : 'certifications')}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    6
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Certifications &amp; Credentials ({data.certifications.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {activeSection === 'certifications' && (
                <div className="space-y-3 pt-1">
                  {data.certifications.length === 0 && (
                    <p className="text-[11px] text-slate-400 italic text-center py-2">
                      No certifications added. Click &quot;Add&quot; to get started.
                    </p>
                  )}
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate flex-1 mr-2">
                          {cert.name || 'New Certification'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCertification(cert.id)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-bold shrink-0 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => handleUpdateCertification(cert.id, 'name', e.target.value)}
                          placeholder="Certification Name (e.g. AWS SAA-C03)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-semibold w-full"
                        />
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => handleUpdateCertification(cert.id, 'issuer', e.target.value)}
                          placeholder="Issuing Organization"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs w-full"
                        />
                        <input
                          type="text"
                          value={cert.issueDate}
                          onChange={(e) => handleUpdateCertification(cert.id, 'issueDate', e.target.value)}
                          placeholder="Issue Date (e.g. Jun 2024)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs w-full"
                        />
                        <input
                          type="text"
                          value={cert.credentialUrl || ''}
                          onChange={(e) => handleUpdateCertification(cert.id, 'credentialUrl', e.target.value)}
                          placeholder="Credential URL (optional)"
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7. LANGUAGES */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setActiveSection(activeSection === 'languages' ? '' : 'languages')}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
                    7
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Languages ({data.languages.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {activeSection === 'languages' && (
                <div className="space-y-2 pt-1">
                  {data.languages.length === 0 && (
                    <p className="text-[11px] text-slate-400 italic text-center py-2">
                      No languages added. Click &quot;Add&quot; to get started.
                    </p>
                  )}
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <input
                        type="text"
                        value={lang.language}
                        onChange={(e) => handleUpdateLanguage(lang.id, 'language', e.target.value)}
                        placeholder="Language (e.g. Tamil, Hindi)"
                        className="flex-1 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-semibold"
                      />
                      <select
                        value={lang.proficiency}
                        onChange={(e) => handleUpdateLanguage(lang.id, 'proficiency', e.target.value)}
                        className="flex-1 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs cursor-pointer"
                      >
                        <option>Native / Bilingual</option>
                        <option>Fluent</option>
                        <option>Professional Working</option>
                        <option>Intermediate</option>
                        <option>Basic</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang.id)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 8. INDIAN GOVT / BIO-DATA SPECIAL FIELDS (Visible in Govt / Bio-Data Modes) */}
            {(data.mode === 'govt' || data.mode === 'biodata') && (
              <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
                    Indian Government / Bio-Data Attributes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={data.biodata.dateOfBirth}
                      onChange={(e) =>
                        setData({ ...data, biodata: { ...data.biodata, dateOfBirth: e.target.value } })
                      }
                      className="w-full p-2 bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Father&apos;s Name</label>
                    <input
                      type="text"
                      value={data.biodata.fatherName}
                      onChange={(e) =>
                        setData({ ...data, biodata: { ...data.biodata, fatherName: e.target.value } })
                      }
                      placeholder="Father's full name"
                      className="w-full p-2 bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Category / Domicile</label>
                    <input
                      type="text"
                      value={data.govt.category}
                      onChange={(e) =>
                        setData({ ...data, govt: { ...data.govt, category: e.target.value as any } })
                      }
                      placeholder="General / OBC / SC / ST"
                      className="w-full p-2 bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1">Permanent Residential Address</label>
                  <input
                    type="text"
                    value={data.biodata.permanentAddress}
                    onChange={(e) =>
                      setData({ ...data, biodata: { ...data.biodata, permanentAddress: e.target.value } })
                    }
                    placeholder="Full permanent residential address with PIN code"
                    className="w-full p-2 bg-white dark:bg-slate-900 border rounded-lg text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: Real-Time ATS Score & Live Preview (60% - 6 cols) */}
          {/* ============================================================= */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            {/* ATS Score Meter Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-sm">
                    {auditResult.score}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>ATS Readiness Score</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950">
                        {auditResult.grade}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">Deterministic Workday &amp; Taleo parser audit</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowJdModal(!showJdModal)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  {showJdModal ? 'Close JD' : 'Match with JD'}
                </button>
              </div>

              {/* JD Keyword Matcher Bar */}
              {showJdModal && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <textarea
                    rows={3}
                    value={targetJdInput}
                    onChange={(e) => setTargetJdInput(e.target.value)}
                    placeholder="Paste the target Job Description (JD) text here to check keyword overlap..."
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 placeholder:text-slate-600"
                  />
                  {auditResult.densityNotes && (
                    <div className="text-[11px] font-bold text-emerald-400">
                      {auditResult.densityNotes}
                    </div>
                  )}
                  {auditResult.missingKeywords.length > 0 && (
                    <div className="text-[10px] text-slate-400">
                      <span className="text-amber-400 font-bold">Missing Keywords: </span>
                      {auditResult.missingKeywords.slice(0, 8).join(', ')}
                    </div>
                  )}
                </div>
              )}

              {/* Actionable Missing Item Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {auditResult.criteria
                  .filter((c) => !c.passed)
                  .map((c) => (
                    <span
                      key={c.id}
                      className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[9px] font-bold flex items-center gap-1"
                    >
                      <span>⚠ {c.title}</span>
                    </span>
                  ))}
                {auditResult.criteria.every((c) => c.passed) && (
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All 10 institutional ATS criteria passed!</span>
                  </span>
                )}
              </div>
            </div>

            {/* Template, Palette & Spacing Configurator */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs">
              {/* Template Picker */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 text-[11px] block mb-1.5">
                  Select Resume Template
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-1.5">
                  {TEMPLATE_OPTIONS.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setData({ ...data, templateId: tmpl.id })}
                      className={`p-2 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer ${
                        data.templateId === tmpl.id
                          ? 'bg-white dark:bg-slate-900 border-indigo-600 text-indigo-700 dark:text-indigo-300 shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="truncate">{tmpl.label}</div>
                      <div className="text-[9px] text-slate-400 font-normal">{tmpl.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family + Size + Spacing Row */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Font</label>
                  <select
                    value={data.fontFamily}
                    onChange={(e) => setData({ ...data, fontFamily: e.target.value as FontFamily })}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] cursor-pointer"
                  >
                    <option value="inter">Inter</option>
                    <option value="roboto">Roboto</option>
                    <option value="merriweather">Merriweather</option>
                    <option value="outfit">Outfit</option>
                    <option value="mono">Mono</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Text Size</label>
                  <select
                    value={data.fontSize}
                    onChange={(e) => setData({ ...data, fontSize: e.target.value as FontSizeScale })}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] cursor-pointer"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Spacing</label>
                  <select
                    value={data.lineSpacing}
                    onChange={(e) => setData({ ...data, lineSpacing: e.target.value as LineSpacingScale })}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] cursor-pointer"
                  >
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Accent Color</span>
                <div className="flex items-center gap-1.5">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setData({ ...data, themeColor: swatch.id })}
                      style={{ backgroundColor: swatch.color }}
                      className={`w-5 h-5 rounded-full border border-white dark:border-slate-900 transition-transform cursor-pointer ${
                        data.themeColor === swatch.id ? 'ring-2 ring-indigo-600 ring-offset-1 scale-110' : ''
                      }`}
                      title={swatch.label}
                    />
                  ))}
                </div>
              </div>

              {/* Magic Fit to 1 Page Button */}
              <button
                type="button"
                onClick={handleFitToOnePage}
                className="w-full py-2 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Auto-Fit Content to 1 Single Page</span>
              </button>
            </div>

            {/* Live Paper Canvas Preview Card */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-200/50 dark:bg-slate-950/50 p-2.5 space-y-2">
              <div className="flex items-center justify-between px-2 text-[10px] font-bold text-slate-500">
                <span>A4 Live Print Sheet Preview (210 × 297 mm)</span>
                <span className="text-emerald-600 dark:text-emerald-400">Ready to Export</span>
              </div>

              {/* Scrollable preview (scaled for screen) */}
              <div
                id="veriseal-print-resume-canvas"
                className="max-h-[680px] overflow-y-auto rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-300 dark:bg-slate-900 p-2 sm:p-4 flex justify-center shadow-inner"
              >
                <div
                  ref={previewPaperRef}
                  className="w-full bg-white text-slate-900 shadow-2xl transition-all"
                  style={{ maxWidth: '210mm' }}
                >
                  <ResumeMasterRenderer data={data} />
                </div>
              </div>
            </div>

            {/* Sponsor / Agency Integration */}
            <AdSlot slot="post_download" />
          </div>
        </div>
      </div>

      {/* Dedicated Clean Print Portal — direct child of document.body for 100% pure A4 printing */}
      {mounted &&
        createPortal(
          <div id="veriseal-resume-print-mount" className="veriseal-resume-print-portal" aria-hidden="true">
            <div className="veriseal-resume-print-sheet">
              <ResumeMasterRenderer data={data} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

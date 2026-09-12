'use client';

import * as React from 'react';
import {
  FileEdit,
  Save,
  Languages,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  ListOrdered,
  FileCheck,
  Lock,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ContentTab = 'hero' | 'how_it_works' | 'faq' | 'supported_docs' | 'trust';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = React.useState<ContentTab>('hero');
  const [language, setLanguage] = React.useState<'en' | 'ta'>('en');
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [saveToast, setSaveToast] = React.useState<string | null>(null);

  // 4a. Hero Form State
  const [heroState, setHeroState] = React.useState({
    headline: 'Verify Indian Government PDF Digital Signatures Online',
    subheadline:
      'Instantly validate digital certificates on e-Aadhaar, e-PAN, Community, Income, and Parivahan documents against official CCA India Root Trust Authority.',
    badge1: '100% In-Memory RAM Validation',
    badge2: 'CCA India / RCAI PKI Verified',
    badge3: 'Zero File Retention Guarantee',
    counterLabel: 'Signatures Cryptographically Verified in India',
  });

  // 4b. How It Works State
  const [stepsState, setStepsState] = React.useState([
    {
      title: 'Upload Official Government PDF',
      description:
        'Drag and drop your digitally signed Aadhaar, PAN card, caste, income, or court order PDF. Password-protected files supported.',
    },
    {
      title: 'Cryptographic Root Audit',
      description:
        'pyHanko verification engine parses ByteRanges, digests SHA-256 hashes, and chains to Controller of Certifying Authorities (CCA) India.',
    },
    {
      title: 'Download LTV-Stamped PDF',
      description:
        'Inspect full signer DN, timestamp, and download your green-tick stamped PDF with embedded Long-Term Validation (LTV) dictionary.',
    },
  ]);

  // 4c. FAQ State
  const [faqState, setFaqState] = React.useState([
    {
      q: 'Why does Adobe Acrobat show a yellow question mark on my Aadhaar?',
      a: 'Adobe Reader does not pre-install Indian CCA root certificates. Kagazo includes the full CCA India trust store to validate the certificate.',
    },
    {
      q: 'Are my uploaded government documents stored on any server?',
      a: 'No. Kagazo operates strictly in volatile RAM. Once verification finishes, file buffers are permanently discarded.',
    },
    {
      q: 'Can I verify password-protected e-Aadhaar files?',
      a: 'Yes. Simply enter your 8-character Aadhaar password during upload.',
    },
  ]);

  // 4d. Supported Docs State
  const [docsState, setDocsState] = React.useState([
    { name: 'UIDAI e-Aadhaar Letter', state: 'All India', portal: 'myAadhaar Portal', active: true },
    { name: 'Income Tax Department e-PAN', state: 'All India', portal: 'Protean / UTIITSL', active: true },
    { name: 'Tamil Nadu Community Certificate', state: 'Tamil Nadu', portal: 'TNeGA e-Sevai', active: true },
    { name: 'Tamil Nadu Nativity Certificate', state: 'Tamil Nadu', portal: 'TNeGA e-Sevai', active: true },
    { name: 'Parivahan RC / Driving Licence', state: 'All India', portal: 'MoRTH Parivahan', active: true },
    { name: 'High Court Certified Orders', state: 'State Judiciaries', portal: 'e-Courts Services', active: true },
  ]);

  // 4e. Trust Cards State
  const [trustCardsState, setTrustCardsState] = React.useState([
    {
      icon: 'ShieldCheck',
      title: 'CCA India Root Authority',
      description: 'Audits against Root Certifying Authority of India (RCAI) 2014 & 2022 roots.',
    },
    {
      icon: 'Lock',
      title: 'Zero Document Storage',
      description: 'Documents are processed exclusively in volatile RAM and never saved to disk.',
    },
    {
      icon: 'Cpu',
      title: 'Native pyHanko Verification',
      description: 'Deterministic ASN.1 parsing and RFC 3161 cryptographic timestamp validation.',
    },
    {
      icon: 'FileCheck',
      title: 'LTV DSS Stamping',
      description: 'Embeds Long-Term Validation dictionaries compatible with Adobe Acrobat.',
    },
  ]);

  // Load content when tab or language changes
  React.useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch(`/api/admin/content?section=${activeTab}&language=${language}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && Object.keys(json.data).length > 0) {
            if (activeTab === 'hero') setHeroState(json.data);
            if (activeTab === 'how_it_works' && json.data.steps) setStepsState(json.data.steps);
            if (activeTab === 'faq' && json.data.items) setFaqState(json.data.items);
            if (activeTab === 'supported_docs' && json.data.docs) setDocsState(json.data.docs);
            if (activeTab === 'trust' && json.data.cards) setTrustCardsState(json.data.cards);
          }
        }
      } catch (e) {
        console.debug('Failed to load content for section:', e);
      }
    }
    loadContent();
  }, [activeTab, language]);

  // Save current section
  const handleSave = async () => {
    setIsSaving(true);
    let payload: any = {};
    if (activeTab === 'hero') payload = heroState;
    if (activeTab === 'how_it_works') payload = { steps: stepsState };
    if (activeTab === 'faq') payload = { items: faqState };
    if (activeTab === 'supported_docs') payload = { docs: docsState };
    if (activeTab === 'trust') payload = { cards: trustCardsState };

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: activeTab,
          language,
          data: payload,
        }),
      });

      if (res.ok) {
        setSaveToast(`${activeTab.toUpperCase()} section (${language.toUpperCase()}) saved.`);
        setTimeout(() => setSaveToast(null), 3000);
      }
    } catch (e) {
      console.error('Failed to save content:', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-text-main text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
            Live Content Editor
          </h1>
          <p className="text-xs sm:text-sm text-text-main/70 mt-1">
            Edit text, headings, FAQs, and supported document registries with live instant preview
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center bg-white border border-surface-darker rounded-xl p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
                language === 'en' ? 'bg-primary text-white' : 'text-text-main/60 hover:text-text-main'
              )}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
                language === 'ta' ? 'bg-primary text-white' : 'text-text-main/60 hover:text-text-main'
              )}
            >
              தமிழ் (Tamil)
            </button>
          </div>

          {/* Save Button */}
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Section'}</span>
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-darker">
        {[
          { id: 'hero', name: '4a. Hero Section', icon: Sparkles },
          { id: 'how_it_works', name: '4b. How It Works', icon: ListOrdered },
          { id: 'faq', name: '4c. FAQ Section', icon: HelpCircle },
          { id: 'supported_docs', name: '4d. Supported Docs', icon: FileCheck },
          { id: 'trust', name: '4e. Trust Section', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ContentTab)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all',
                isActive
                  ? 'bg-text-main text-white shadow-sm'
                  : 'bg-white border border-surface-darker text-text-main/70 hover:bg-surface'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* 4a. HERO SECTION EDITOR */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-surface-darker/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-text-main">Edit Hero Content ({language.toUpperCase()})</h2>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                H1 Main Headline
              </label>
              <input
                type="text"
                value={heroState.headline}
                onChange={(e) => setHeroState({ ...heroState, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Subheadline Paragraph
              </label>
              <textarea
                rows={3}
                value={heroState.subheadline}
                onChange={(e) => setHeroState({ ...heroState, subheadline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-text-main mb-1">Badge 1</label>
                <input
                  type="text"
                  value={heroState.badge1}
                  onChange={(e) => setHeroState({ ...heroState, badge1: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-main mb-1">Badge 2</label>
                <input
                  type="text"
                  value={heroState.badge2}
                  onChange={(e) => setHeroState({ ...heroState, badge2: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-text-main mb-1">Badge 3</label>
                <input
                  type="text"
                  value={heroState.badge3}
                  onChange={(e) => setHeroState({ ...heroState, badge3: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1">
                Counter Label Text
              </label>
              <input
                type="text"
                value={heroState.counterLabel}
                onChange={(e) => setHeroState({ ...heroState, counterLabel: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-surface/50 border border-surface-darker rounded-xl text-text-main"
              />
            </div>
          </div>

          {/* Right Live Preview (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-surface to-background border-2 border-primary/20 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-primary mb-3">
                <Eye className="w-4 h-4" />
                <span>Live Hero Preview</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-white border border-surface-darker text-[10px] font-bold text-text-main">
                    {heroState.badge1}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white border border-surface-darker text-[10px] font-bold text-text-main">
                    {heroState.badge2}
                  </span>
                </div>

                <h1 className="text-xl font-black text-text-main leading-tight">
                  {heroState.headline}
                </h1>

                <p className="text-xs text-text-main/70 leading-relaxed">
                  {heroState.subheadline}
                </p>

                <div className="p-3 bg-white rounded-2xl border border-surface-darker flex items-center justify-between">
                  <div className="text-2xl font-black text-primary">421,847+</div>
                  <div className="text-[10px] font-bold text-text-main/60 max-w-[140px] text-right">
                    {heroState.counterLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-[10px] text-text-main/50 font-medium">
              Updates to this section are cached with 60-second ISR revalidation.
            </div>
          </div>
        </div>
      )}

      {/* 4b. HOW IT WORKS EDITOR */}
      {activeTab === 'how_it_works' && (
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-text-main">
              Configure 3-Step Verification Flow ({language.toUpperCase()})
            </h2>
          </div>

          <div className="space-y-4">
            {stepsState.map((step, idx) => (
              <div
                key={idx}
                className="p-4 bg-surface/40 border border-surface-darker rounded-2xl flex items-start gap-4"
              >
                <div className="h-8 w-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center shrink-0 mt-1">
                  0{idx + 1}
                </div>

                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...stepsState];
                      updated[idx].title = e.target.value;
                      setStepsState(updated);
                    }}
                    placeholder="Step Title"
                    className="w-full px-3 py-2 text-xs font-bold bg-white border border-surface-darker rounded-xl text-text-main"
                  />
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...stepsState];
                      updated[idx].description = e.target.value;
                      setStepsState(updated);
                    }}
                    placeholder="Step Description"
                    className="w-full px-3 py-2 text-xs bg-white border border-surface-darker rounded-xl text-text-main"
                  />
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => {
                      const updated = [...stepsState];
                      const temp = updated[idx - 1];
                      updated[idx - 1] = updated[idx];
                      updated[idx] = temp;
                      setStepsState(updated);
                    }}
                    className="p-1 rounded-lg border border-surface-darker bg-white text-text-main disabled:opacity-30"
                    title="Move Step Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === stepsState.length - 1}
                    onClick={() => {
                      const updated = [...stepsState];
                      const temp = updated[idx + 1];
                      updated[idx + 1] = updated[idx];
                      updated[idx] = temp;
                      setStepsState(updated);
                    }}
                    className="p-1 rounded-lg border border-surface-darker bg-white text-text-main disabled:opacity-30"
                    title="Move Step Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4c. FAQ EDITOR */}
      {activeTab === 'faq' && (
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-text-main">
                Frequently Asked Questions ({language.toUpperCase()})
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">Edit questions and answers inline</p>
            </div>

            <button
              type="button"
              onClick={() => setFaqState([...faqState, { q: 'New Question?', a: 'Detailed answer here.' }])}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-surface-darker hover:bg-primary-light hover:text-primary text-xs font-bold text-text-main transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqState.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-surface/30 border border-surface-darker rounded-2xl space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase text-primary">Question {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setFaqState(faqState.filter((_, i) => i !== idx))}
                    className="p-1 text-error hover:bg-error-light rounded-lg transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={item.q}
                  onChange={(e) => {
                    const updated = [...faqState];
                    updated[idx].q = e.target.value;
                    setFaqState(updated);
                  }}
                  className="w-full px-3 py-2 text-xs font-bold bg-white border border-surface-darker rounded-xl text-text-main"
                />

                <textarea
                  rows={2}
                  value={item.a}
                  onChange={(e) => {
                    const updated = [...faqState];
                    updated[idx].a = e.target.value;
                    setFaqState(updated);
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-surface-darker rounded-xl text-text-main"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4d. SUPPORTED DOCS EDITOR */}
      {activeTab === 'supported_docs' && (
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-text-main">
                Supported Document Registry ({language.toUpperCase()})
              </h2>
              <p className="text-xs text-text-main/60 mt-0.5">Define certificates validated on the homepage</p>
            </div>

            <button
              type="button"
              onClick={() =>
                setDocsState([
                  ...docsState,
                  { name: 'New Certificate Title', state: 'All India', portal: 'Official Portal', active: true },
                ])
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-surface-darker hover:bg-primary-light hover:text-primary text-xs font-bold text-text-main"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Document</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-surface/50 border-b border-surface-darker text-text-main/50 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Document Name</th>
                  <th className="py-2.5 px-3">Jurisdiction / State</th>
                  <th className="py-2.5 px-3">Issuing Portal</th>
                  <th className="py-2.5 px-3">Active</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-darker/50 font-medium">
                {docsState.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-surface/30">
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={doc.name}
                        onChange={(e) => {
                          const updated = [...docsState];
                          updated[idx].name = e.target.value;
                          setDocsState(updated);
                        }}
                        className="px-2 py-1 bg-white border border-surface-darker rounded-lg text-xs font-bold text-text-main w-full"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={doc.state}
                        onChange={(e) => {
                          const updated = [...docsState];
                          updated[idx].state = e.target.value;
                          setDocsState(updated);
                        }}
                        className="px-2 py-1 bg-white border border-surface-darker rounded-lg text-xs text-text-main w-full"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={doc.portal}
                        onChange={(e) => {
                          const updated = [...docsState];
                          updated[idx].portal = e.target.value;
                          setDocsState(updated);
                        }}
                        className="px-2 py-1 bg-white border border-surface-darker rounded-lg text-xs text-text-main w-full"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="checkbox"
                        checked={doc.active}
                        onChange={(e) => {
                          const updated = [...docsState];
                          updated[idx].active = e.target.checked;
                          setDocsState(updated);
                        }}
                        className="rounded border-surface-darker text-primary focus:ring-primary w-4 h-4"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setDocsState(docsState.filter((_, i) => i !== idx))}
                        className="p-1 text-error hover:bg-error-light rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4e. TRUST SECTION EDITOR */}
      {activeTab === 'trust' && (
        <div className="bg-white border border-surface-darker/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-black text-text-main">
            4 Trust Badges &amp; Security Pillars ({language.toUpperCase()})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trustCardsState.map((card, idx) => (
              <div
                key={idx}
                className="p-4 bg-surface/30 border border-surface-darker rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-primary">Card 0{idx + 1}</span>
                  <select
                    value={card.icon}
                    onChange={(e) => {
                      const updated = [...trustCardsState];
                      updated[idx].icon = e.target.value;
                      setTrustCardsState(updated);
                    }}
                    className="px-2 py-1 text-xs bg-white border border-surface-darker rounded-lg text-text-main"
                  >
                    <option value="ShieldCheck">ShieldCheck</option>
                    <option value="Lock">Lock</option>
                    <option value="Cpu">Cpu</option>
                    <option value="FileCheck">FileCheck</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => {
                    const updated = [...trustCardsState];
                    updated[idx].title = e.target.value;
                    setTrustCardsState(updated);
                  }}
                  className="w-full px-3 py-2 text-xs font-bold bg-white border border-surface-darker rounded-xl text-text-main"
                />

                <textarea
                  rows={2}
                  value={card.description}
                  onChange={(e) => {
                    const updated = [...trustCardsState];
                    updated[idx].description = e.target.value;
                    setTrustCardsState(updated);
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-surface-darker rounded-xl text-text-main"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

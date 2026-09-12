'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function ApiOfferingBanner() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'curl' | 'node' | 'python'>('curl');
  const [copied, setCopied] = React.useState(false);

  const codeSnippets = {
    curl: `curl -X POST https://kagazo-api.onrender.com/verify \\
  -H "Authorization: Bearer kagazo_live_api_key" \\
  -F "file=@eAadhaar_document.pdf" \\
  -F "password=RAMA1995"`,
    node: `import { KagazoClient } from '@kagazo/sdk';

const kagazo = new KagazoClient({ apiKey: process.env.KAGAZO_API_KEY });
const result = await kagazo.verifyPdf({
  fileBuffer,
  password: 'RAMA1995',
});

console.log(result.status); // 'VALID'
console.log(result.signerName); // 'National Informatics Centre'`,
    python: `import requests

url = "https://kagazo-api.onrender.com/verify"
headers = {"Authorization": "Bearer kagazo_live_api_key"}
files = {"file": open("eAadhaar.pdf", "rb")}
data = {"password": "RAMA1995"}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.json())`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-offering" className="py-16 md:py-20 bg-text-main text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Prop & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-primary-light border border-white/15 backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span>{language === 'ta' ? 'டெவலப்பர் & கார்ப்பரேட் REST API' : 'Developer & Enterprise REST API'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {language === 'ta'
                ? 'உங்கள் தளத்தில் அரசு PDF சரிபார்ப்பை தானியங்குபடுத்துங்கள்'
                : 'Automate Government PDF Verification in Your Platform'}
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              {language === 'ta'
                ? 'உங்கள் FinTech, HRMS அல்லது சட்டப் பணிகளில் உடனடி டிஜிட்டல் கையொப்ப சரிபார்ப்பை இணைக்கவும். இ-ஆதார், சாதி சான்றிதழ்கள், பான் கார்டுகளை CCA இந்திய விதிமுறைகளின்படி நொடிகளில் சரிபார்க்கலாம்.'
                : 'Integrate instant digital signature validation into your FinTech onboarding, HRMS background checks, or legal workflows. Validates e-Aadhaar, TNeGA community certificates, and PAN cards with CCA India root authority compliance.'}
            </p>

            {/* Guarantees List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white/90">
                  <strong>{language === 'ta' ? '500ms-க்குள் விரைவு பதில்:' : 'Sub-500ms Response:'}</strong>{' '}
                  {language === 'ta' ? 'உயர் திறன் கொண்ட கட்டமைப்பு.' : 'High-throughput asynchronous parsing.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white/90">
                  <strong>{language === 'ta' ? '100% நினைவக செயலாக்கம்:' : '100% In-Memory:'}</strong>{' '}
                  {language === 'ta' ? 'சேமிப்பகம் இல்லை, DPDP & IT சட்டம் இணக்கமானது.' : 'Zero disk storage, DPDP & IT Act compliant.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white/90">
                  <strong>{language === 'ta' ? 'நிரந்தர பச்சை டிக்:' : 'Permanent Green Tick:'}</strong>{' '}
                  {language === 'ta' ? 'LTV DSS சான்றிதழ் தானாக இணைக்கப்படும்.' : 'Automatic LTV DSS certificate embedding.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white/90">
                  <strong>{language === 'ta' ? '99.9% இயக்க உத்தரவாதம்:' : '99.9% Uptime SLA:'}</strong>{' '}
                  {language === 'ta' ? 'பிரத்யேக API சாவி மற்றும் Webhook ஆதரவு.' : 'Dedicated API keys and webhook callbacks.'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <Link
                href="/contact?subject=api_access"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <span>{language === 'ta' ? 'API அணுகல் கோரிக்கை' : 'Request API Access & Keys'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-colors"
              >
                <span>{language === 'ta' ? 'கட்டமைப்பை அறிக' : 'Explore Architecture'}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Code Snippet Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
              {/* Code Header Tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('curl')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeTab === 'curl' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    cURL
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('node')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeTab === 'node' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Node.js
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('python')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeTab === 'python' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  title="Copy code snippet"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Body */}
              <div className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed bg-slate-900/90">
                <pre>{codeSnippets[activeTab]}</pre>
              </div>

              {/* Sample Response Box */}
              <div className="px-5 py-3.5 bg-slate-950/90 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HTTP 200 OK • status: &quot;VALID&quot; (CCA Verified)</span>
                </span>
                <span className="text-[11px] text-primary font-semibold">Latency: 280ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Lock, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SUPPORTED_DOCS, STATES } from '@/lib/constants';
import { getSeoSlugForDocType } from '@/lib/seo-store';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function SupportedDocs() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<string>('all-india');

  const filteredDocs = SUPPORTED_DOCS.filter((doc) => doc.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const getStateLabel = (stateId: string, defaultName: string) => {
    switch (stateId) {
      case 'all-india': return t.supportedDocs.allIndia;
      case 'tamil-nadu': return t.supportedDocs.tamilNadu;
      case 'ap-telangana': return t.supportedDocs.apTelangana;
      case 'karnataka': return t.supportedDocs.karnataka;
      case 'kerala': return t.supportedDocs.kerala;
      case 'more-states': return t.supportedDocs.moreStates;
      default: return defaultName;
    }
  };

  return (
    <section id="supported-docs" className="py-20 bg-surface/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            {t.supportedDocs.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-4 tracking-tight">
            {t.supportedDocs.heading}
          </h2>
          <p className="text-base sm:text-lg text-text-main/70 mt-3">
            {t.supportedDocs.subheading}
          </p>
        </div>

        {/* State / Region Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-surface border border-surface-darker shadow-sm">
            {STATES.map((state) => {
              const isActive = activeTab === state.id;
              return (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => setActiveTab(state.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-text-main/80 hover:text-primary hover:bg-surface-darker/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeStateTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{getStateLabel(state.id, state.name)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredDocs.map((doc) => (
              <motion.div
                key={doc.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-5 border border-surface-darker hover:border-primary/40 hover:shadow-card transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="primary" className="text-[11px] font-bold">
                      {doc.portal}
                    </Badge>

                    <span className="text-[11px] font-semibold text-text-main/60 bg-surface px-2 py-0.5 rounded-md border border-surface-darker/60">
                      {doc.state}
                    </span>
                  </div>

                  {/* Document Name */}
                  <h3 className="font-bold text-base text-text-main group-hover:text-primary transition-colors leading-snug mb-2">
                    <Link href={`/${getSeoSlugForDocType(doc.name)}`}>{doc.name}</Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-main/70 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>
                </div>

                {/* Footer of card: password tag + verify link */}
                <div className="mt-5 pt-4 border-t border-surface-darker/60 flex items-center justify-between">
                  {doc.isPasswordProtectedSupported ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Lock className="w-3 h-3 text-amber-600" />
                      <span>{language === 'ta' ? 'கடவுச்சொல் ஆதரிக்கப்படும்' : 'Password Ready'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-main/50">
                      <ShieldCheck className="w-3.5 h-3.5 text-success" />
                      <span>{language === 'ta' ? 'டிஜிட்டல் PKI' : 'Digital PKI'}</span>
                    </span>
                  )}

                  <Link
                    href={`/${getSeoSlugForDocType(doc.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-hover group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{language === 'ta' ? 'சரிபார்ப்பு வழிகாட்டி' : 'Verify Guide'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note below grid */}
        <div className="mt-12 text-center">
          <p className="text-xs text-text-main/60">
            {language === 'ta'
              ? 'பட்டியலிடப்படாத மாநிலத்தின் அரசு PDF உள்ளதா? அது இந்திய CCA கட்டமைப்பின் கீழ் கையொப்பமிடப்பட்டிருந்தால் (eMudhra, NIC, Capricorn போன்றவை), அது 100% ஆதரிக்கப்படும்.'
              : 'Have a government PDF issued by an unlisted state? If it is signed under the Indian CCA hierarchy (eMudhra, NIC, Capricorn, Pantasign, IDsign), it is 100% supported.'}
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import * as React from 'react';
import { SupportedLanguage } from '@/types';
import { translations, TranslationDictionary } from '@/lib/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'veriseal_selected_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<SupportedLanguage>('en');
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved === 'en' || saved === 'ta') {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const setLanguage = React.useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'ta' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const currentTranslations = React.useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: currentTranslations,
    }),
    [language, setLanguage, toggleLanguage, currentTranslations]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

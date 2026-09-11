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
  const language: SupportedLanguage = 'en';

  React.useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.documentElement.lang = 'en';
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const setLanguage = React.useCallback((_lang: SupportedLanguage) => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.documentElement.lang = 'en';
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    // Keep strictly English
  }, []);

  const currentTranslations = React.useMemo(() => {
    return translations.en;
  }, []);

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

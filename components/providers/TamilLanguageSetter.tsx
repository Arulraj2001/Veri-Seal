'use client';

import * as React from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function TamilLanguageSetter() {
  const { language, setLanguage } = useLanguage();

  React.useEffect(() => {
    if (language !== 'ta') {
      setLanguage('ta');
    }
  }, [language, setLanguage]);

  return null;
}

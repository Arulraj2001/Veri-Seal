'use client';

import * as React from 'react';
import { Monitor, Check } from 'lucide-react';

export function InstallPwaButton({ className }: { className?: string }) {
  const [isInstalled, setIsInstalled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }, []);

  const handleInstallClick = async () => {
    if (typeof window === 'undefined') return;
    const promptEvent = (window as unknown as { __kagazo_pwa_prompt?: { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> } }).__kagazo_pwa_prompt;

    if (!promptEvent) {
      alert('To install Kagazo on your desktop, look for the Install icon in your browser address bar (top right in Chrome/Edge).');
      return;
    }

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
    } catch {
      alert('To install Kagazo, click the Install icon in your browser address bar.');
    }
  };

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
        <Check className="w-4 h-4 text-emerald-600" />
        <span>Kagazo Desktop App Installed</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleInstallClick}
      className={
        className ||
        'inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md transition-all cursor-pointer'
      }
    >
      <Monitor className="w-4 h-4 text-primary-light" />
      <span>Install Kagazo Desktop App (1-Click Launch)</span>
    </button>
  );
}

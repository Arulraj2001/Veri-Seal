import * as React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { InternationalHeader } from '@/components/international/InternationalHeader';
import { InternationalFooter } from '@/components/international/InternationalFooter';

export const metadata: Metadata = {
  title: 'Calculadoras e Utilitários Estatutários Oficiais Brasil 2026 | Kagazo',
  description:
    'Suite estatutária oficial com 20 simuladores interativos para o Brasil: Salário Líquido CLT 2026, Rescisão Trabalhista, Décimo Terceiro, Férias, Simples Nacional, DAS MEI e Validador CPF/CNPJ.',
  alternates: {
    languages: {
      'pt-BR': `${SITE_URL}/br`,
      'pt': `${SITE_URL}/br`,
      'x-default': `${SITE_URL}/br`,
    },
  },
  openGraph: {
    title: 'Calculadoras e Utilitários Estatutários Oficiais Brasil 2026 | Kagazo',
    description:
      'Cálculos trabalhistas, fiscais e imobiliários em conformidade com a CLT, tabelas INSS/IRRF 2026 e Receita Federal. 100% no seu navegador com privacidade total.',
    url: `${SITE_URL}/br`,
    locale: 'pt_BR',
    siteName: 'Kagazo Brasil',
    type: 'website',
  },
};

export default function BrazilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 antialiased font-sans">
      <InternationalHeader country="br" />
      <main className="flex-1">{children}</main>
      <InternationalFooter country="br" />
    </div>
  );
}

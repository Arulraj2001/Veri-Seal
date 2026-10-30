import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calculator,
  Home,
  FileText,
  Percent,
  Coins,
  Scale,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Landmark,
} from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Utilitários e Calculadoras Oficiais do Brasil 2026 | CLT, MEI, Financiamento e PJe',
  description:
    'Portal de 20 calculadoras estatutárias gratuitas para o Brasil: Salário Líquido CLT 2026, Rescisão Trabalhista, DAS MEI, Financiamento SAC vs Price, CPF/CNPJ e Foto 3x4.',
  alternates: {
    canonical: `${SITE_URL}/br`,
  },
};

export default function BrazilHubPage() {
  const categories = [
    {
      id: 'trabalhista',
      title: '1. Trabalhista, Salários & CLT',
      description: 'Cálculos rigorosos segundo a CLT (Decreto-Lei 5.452/43), Súmulas do TST, tabela progressiva INSS e IRPF 2026.',
      icon: Briefcase,
      tools: [
        {
          title: 'Calculadora de Salário Líquido CLT 2026',
          desc: 'Simula o salário líquido a partir do salário bruto com descontos oficiais de INSS progressivo, IRRF com dedução simplificada e vale-transporte.',
          href: '/br/calculadora-salario-liquido-clt',
          badge: 'Top 250k+',
        },
        {
          title: 'Calculadora de Rescisão de Contrato CLT',
          desc: 'Cálculo exato de demissão sem justa causa, pedido de demissão e acordo mútuo (Art. 484-A CLT) com aviso prévio proporcional e multa FGTS.',
          href: '/br/calculadora-rescisao-clt',
          badge: 'Art. 477 CLT',
        },
        {
          title: 'Cálculo de Férias CLT e Abono Pecuniário',
          desc: 'Período aquisitivo e concessivo, 1/3 constitucional, venda de 10 dias de férias (abono) e adiantamento da primeira parcela do 13º.',
          href: '/br/calculo-ferias-clt',
          badge: 'Art. 143 CLT',
        },
        {
          title: 'Calculadora do Décimo Terceiro Salário (13º)',
          desc: 'Previsão exata da 1ª parcela (sem descontos até 30/11) e 2ª parcela (com tributação INSS e IRRF até 20/12) com meses trabalhados.',
          href: '/br/calculadora-decimo-terceiro',
          badge: 'Lei 4.090/62',
        },
        {
          title: 'Cálculo de Horas Extras e Reflexo no DSR',
          desc: 'Adicional de 50% em dias úteis, 100% em domingos e feriados, adicional noturno (20% com hora de 52min30s) e reflexo DSR (Súmula 172 TST).',
          href: '/br/calculo-horas-extras-dsr',
          badge: 'Súmula 172 TST',
        },
      ],
    },
    {
      id: 'tributario',
      title: '2. Tributário, MEI & Microempresas',
      description: 'Ferramentas para microempreendedores individuais, autônomos, Simples Nacional e retenções na fonte da Receita Federal.',
      icon: Building2,
      tools: [
        {
          title: 'Calculadora DAS MEI 2026 Atualizada',
          desc: 'Valor exato da guia mensal DAS: 5% Salário Mínimo (INSS) + R$ 1,00 ICMS + R$ 5,00 ISS para comércio, indústria e prestadores.',
          href: '/br/calculadora-das-mei',
          badge: 'MEI 2026',
        },
        {
          title: 'Simulador Carnê-Leão e IRPF Autônomo',
          desc: 'Apuração mensal de rendimentos de pessoas físicas e exterior com dedução de Livro Caixa e tabela progressiva do IRRF.',
          href: '/br/calculadora-carne-leao',
          badge: 'Receita Federal',
        },
        {
          title: 'Simulador de Alíquota Efetiva do Simples Nacional',
          desc: 'Cálculo da alíquota real nos Anexos I, II, III, IV e V da LC 123/2006 com receita bruta acumulada em 12 meses (RBT12).',
          href: '/br/calculadora-simples-nacional',
          badge: 'LC 123/2006',
        },
        {
          title: 'Cálculo de Retenção de Impostos em Nota Fiscal (PJ)',
          desc: 'Retenção na fonte de 4,65% (PIS 0,65%, COFINS 3,0%, CSLL 1,0%) para notas de serviços acima de R$ 10,00 e IRRF 1,5%.',
          href: '/br/retencao-impostos-nota-fiscal',
          badge: 'PIS/COFINS/CSLL',
        },
        {
          title: 'Calculadora de Reajuste Salarial por Dissídio / CCT',
          desc: 'Reajuste pelo índice sindical (INPC/IPCA) com cálculo de pagamento retroativo para convenções homologadas com atraso.',
          href: '/br/calculadora-dissidio-salarial',
          badge: 'Dissídio',
        },
      ],
    },
    {
      id: 'imobiliario',
      title: '3. Imobiliário, Financiamento & Crédito',
      description: 'Simulações de crédito habitacional Caixa, amortizações com FGTS, ITBI municipal e atualização de contratos de locação.',
      icon: Home,
      tools: [
        {
          title: 'Simulador de Financiamento: SAC vs Tabela Price',
          desc: 'Comparativo detalhado: parcelas decrescentes do Sistema de Amortização Constante (SAC) vs parcelas fixas da Tabela Price e juros totais.',
          href: '/br/simulador-financiamento-sac-price',
          badge: 'Caixa / SFH',
        },
        {
          title: 'Calculadora de ITBI e Custos de Cartório',
          desc: 'Estimativa de Imposto de Transmissão de Bens Imóveis (2% a 3%) e emolumentos de Escritura Pública e Registro de Imóveis (RGI).',
          href: '/br/calculadora-itbi-escritura',
          badge: 'Cartórios & ITBI',
        },
        {
          title: 'Reajuste de Aluguel por IPCA e IGP-M',
          desc: 'Atualização do valor do aluguel com base no acumulado de 12 meses dos índices FGV (IGP-M) e IBGE (IPCA) com trava não-negativa.',
          href: '/br/reajuste-aluguel-ipca-igpm',
          badge: 'Lei do Inquilinato',
        },
        {
          title: 'Amortização de Financiamento Imobiliário com FGTS',
          desc: 'Simula o impacto de amortizações extraordinárias pelo saldo de FGTS: redução do prazo de pagamento vs diminuição da parcela.',
          href: '/br/amortizacao-financiamento-fgts',
          badge: 'FGTS Habitação',
        },
        {
          title: 'Calculadora de Rendimento Locativo Líquido',
          desc: 'Rendimento real após taxa de administração imobiliária (8%-10%), IPTU, condomínio em vacância e carnê-leão IRPF mensal.',
          href: '/br/calculadora-rendimento-aluguel-liquido',
          badge: 'Cap Rate Real',
        },
      ],
    },
    {
      id: 'documentos',
      title: '4. Documentos, Cidadania & PJe Forense',
      description: 'Validação oficial de CPF/CNPJ, fotos padrão 3x4, otimização de petições para o PJe e prazos do Novo CPC.',
      icon: FileText,
      tools: [
        {
          title: 'Validador e Gerador de CPF e CNPJ (Módulo 11)',
          desc: 'Validação matemática com algoritmo oficial de dígitos verificadores DV1 e DV2 da Receita Federal e formatação de máscara.',
          href: '/br/validador-gerador-cpf-cnpj',
          badge: 'Módulo 11 Oficial',
        },
        {
          title: 'Criador de Foto 3×4 para Documentos, CNH e Passaporte',
          desc: 'Padrão brasileiro 30×40 mm (354×472 px a 300 DPI) com linhas biométricas do rosto e folha para impressão 10×15 cm com 6 fotos.',
          href: '/br/foto-3x4-documentos-passaporte',
          badge: 'Padrão 3x4 cm',
        },
        {
          title: 'Compressor de PDF para o PJe dos Tribunais (< 3 MB)',
          desc: 'Comprime peças e procurações para os limites rígidos dos portais do Processo Judicial Eletrônico (TRT, TRF, TJ) sem perder legibilidade.',
          href: '/br/compressor-pdf-pje-tribunais',
          badge: 'PJe < 3MB',
        },
        {
          title: 'Calculadora de Prazos Processuais em Dias Úteis (CPC)',
          desc: 'Contagem oficial exata conforme o Art. 219 do Novo CPC, prorrogando vencimentos em sábados, domingos e recesso forense (Art. 220).',
          href: '/br/calculadora-prazos-processuais-cpc',
          badge: 'Novo CPC 2015',
        },
        {
          title: 'Conversor de Moeda por Extenso para Recibos e Cheques',
          desc: 'Tradução automática de valores monetários em texto corrido oficial para contratos, notas promissórias e recibos de quitação.',
          href: '/br/valor-por-extenso-recibo',
          badge: 'Texto Formal',
        },
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Portal Oficial Brasil 2026</span>
          <span className="text-emerald-300">•</span>
          <span className="font-mono">20 Ferramentas Estatutárias</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
          Calculadoras Trabalhistas, Tributárias e Imobiliárias <br className="hidden sm:inline" />
          <span className="text-emerald-600">Conformes com a Legislação Federal Brasileira</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Suíte completa com 20 simuladores estatutários auditados para CLT, DAS MEI, Simples Nacional, financiamentos habitacionais SAC/Price e ferramentas de apoio ao Processo Judicial Eletrônico (PJe).
        </p>

        {/* Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% no Navegador (Privacidade Total)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tabelas Oficiais INSS & IRPF 2026</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>Acesso Gratuito e Ilimitado</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-14">
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <section key={category.id} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 flex items-center gap-3 tracking-tight">
                    <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                      <CategoryIcon className="w-6 h-6" />
                    </span>
                    <span>{category.title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-medium">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 w-fit">
                  {category.tools.length} Ferramentas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group bg-white p-6 rounded-3xl border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {tool.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-700 transition-colors leading-snug">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {tool.desc}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-emerald-700">
                      <span>Acessar Simulador Gratuito &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* SEO & Institutional Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Sobre o Portal Estatutário Kagazo Brasil
        </h3>
        <p>
          O <strong>Kagazo Brasil</strong> é um ecossistema independente de ferramentas utilitárias dedicadas a cidadãos, advogados, contadores, profissionais de Recursos Humanos e corretores imobiliários. Todas as fórmulas implementadas refletem fielmente os textos do <strong>Decreto-Lei nº 5.452/1943 (Consolidação das Leis do Trabalho)</strong>, <strong>Lei Complementar nº 123/2006 (Estatuto Nacional da Microempresa)</strong>, <strong>Lei nº 13.105/2015 (Código de Processo Civil)</strong> e instruções normativas da Receita Federal do Brasil.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="space-y-1">
            <strong className="text-slate-900 block font-bold">Privacidade Absoluta</strong>
            <p className="text-slate-500">
              Todos os cálculos e manipulação de arquivos PDF e fotos ocorrem na memória local do seu dispositivo (client-side), sem qualquer armazenamento em servidores.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 block font-bold">Rigor Matemático</strong>
            <p className="text-slate-500">
              Descontos de INSS progressivo por faixas, dedução simplificada da Receita Federal e tabelas SAC/Price calculadas com precisão contábil.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 block font-bold">Conformidade Legal</strong>
            <p className="text-slate-500">
              Artigos de lei, súmulas de tribunais superiores e convenções coletivas citados com transparência em cada ferramenta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

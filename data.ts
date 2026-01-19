import { ServiceTemplate, ServiceType } from './types';
import { v4 as uuidv4 } from 'uuid'; // We will use a simple generator function instead of library to keep it dependency free in this prompt context

const generateId = () => Math.random().toString(36).substr(2, 9);

export const SERVICE_TEMPLATES: Record<ServiceType, ServiceTemplate> = {
  [ServiceType.CERCA_ELETRICA]: {
    id: ServiceType.CERCA_ELETRICA,
    title: 'Cerca Elétrica',
    items: [
      { id: generateId(), name: 'HASTES DE 4 ISOLADORES FERRO', price: 19.50, quantity: 28 },
      { id: generateId(), name: 'ARAME AÇO INOX DE 60MM', price: 90.00, quantity: 1 },
      { id: generateId(), name: 'CABO ALTA ISOLAÇÃO', price: 1.40, quantity: 20 },
      { id: generateId(), name: 'CABO DOIS PARES', price: 1.20, quantity: 10 },
      { id: generateId(), name: 'SIRENE', price: 30.00, quantity: 2 },
      { id: generateId(), name: 'CENTRAL DE CHOQUE INTELBRAS WIFI', price: 539.00, quantity: 1 },
      { id: generateId(), name: 'BATERIA', price: 109.00, quantity: 1 },
      { id: generateId(), name: 'BARRA DE ATERRAMENTO', price: 49.00, quantity: 1 },
      { id: generateId(), name: 'PLACAS DE ADVERTÊNCIA', price: 4.00, quantity: 4 },
      { id: generateId(), name: 'MÃO DE OBRA', price: 600.00, quantity: 1 },
    ],
    footerNotes: [
      'Hastes em todo muro a cada 2.5m e onde o muro possui degrau utilizamos uma ao lado da outra;',
      'Central Intelbras com controle remoto.',
      'Valor a vista, dividimos no cartão até 6x com acréscimo de 4.99%;',
      'Garantia de 1 ano.'
    ]
  },
  [ServiceType.CFTV]: {
    id: ServiceType.CFTV,
    title: 'CFTV com câmeras Intelbras HD',
    items: [
      { id: generateId(), name: 'DVR DE 4 CANAIS INTELBRAS QUALIDADE HD', price: 539.00, quantity: 1 },
      { id: generateId(), name: 'CÂMERAS INTELBRAS INFRA 1120 QUALIDADE HD', price: 179.00, quantity: 4 },
      { id: generateId(), name: 'HD DE 1TB, HD 24/7 (próprio para DVR)', price: 499.00, quantity: 1 },
      { id: generateId(), name: 'FONTE DE 12V 5A', price: 99.00, quantity: 1 },
      { id: generateId(), name: 'CONECTORES BNC', price: 4.50, quantity: 8 },
      { id: generateId(), name: 'CONECTORES P4', price: 4.50, quantity: 5 },
      { id: generateId(), name: 'CABO CONDUTTI 80% MALHA', price: 1.40, quantity: 200 },
      { id: generateId(), name: 'CAIXAS DE PROTEÇÃO', price: 9.90, quantity: 4 },
      { id: generateId(), name: 'ACESSO REMOTO CORTESIA', price: 0.00, quantity: 1 },
      { id: generateId(), name: 'MÃO DE OBRA', price: 400.00, quantity: 1 },
    ],
    footerNotes: [
      'APP INTELBRAS NOS CELULARES',
      'NO CARTÃO ATÉ 6 VEZES COM ACRÉSCIMO DE 4.99%',
      'COBRIMOS QUALQUER ORÇAMENTO DA MESMA MARCA',
      'TODOS OS PRODUTOS SÃO INTELBRAS E COM GARANTIA DE UM ANO.',
      'O HD TEM GARANTIA DE 3 ANOS.'
    ]
  },
  [ServiceType.ALARME]: {
    id: ServiceType.ALARME,
    title: 'Alarme Intelbras',
    items: [
      { id: generateId(), name: 'CENTRAL ANM 24NET INTELBRAS', price: 439.00, quantity: 1 },
      { id: generateId(), name: 'SIRENE', price: 30.00, quantity: 1 },
      { id: generateId(), name: 'CABO DE REDE (CORTESIA)', price: 0.00, quantity: 1 },
      { id: generateId(), name: 'BATERIA', price: 119.00, quantity: 1 },
      { id: generateId(), name: 'CABO LAN ALARME', price: 1.20, quantity: 10 },
      { id: generateId(), name: 'SENSOR DE PORTA E JANELA INTELBRAS', price: 69.90, quantity: 5 },
      { id: generateId(), name: 'CONTROLE REMOTO', price: 35.00, quantity: 2 },
      { id: generateId(), name: 'MÃO DE OBRA', price: 300.00, quantity: 1 },
    ],
    footerNotes: [
      'Produtos intelbras',
      'Garantia de um ano e sem mensalidade',
      'Acesso via Aplicativo',
      'Não disca, toca o celular se tiver conectado a internet.',
      'Arma e desarma por controle remoto ou app exclusivo Intelbras',
      'Dividimos no cartão até 6x com acréscimo de 4.99%'
    ]
  },
  [ServiceType.CONCERTINA]: {
    id: ServiceType.CONCERTINA,
    title: 'Concertina',
    showTotal: false,
    items: [
      { id: generateId(), name: 'CONCERTINA (À VISTA)', price: 30.00, quantity: 39.6, unit: 'm' },
      { id: generateId(), name: 'CONCERTINA (NO CARTÃO)', price: 34.00, quantity: 0, unit: 'm' },
    ],
    footerNotes: [
      'Instalação Inclusa',
      'Material Galvanizado'
    ]
  }
};
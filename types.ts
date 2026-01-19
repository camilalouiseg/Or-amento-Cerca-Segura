export interface QuoteItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string; // e.g., 'm', 'un'
}

export interface ServiceTemplate {
  id: string;
  title: string;
  items: QuoteItem[];
  footerNotes: string[];
  showTotal?: boolean;
}

export enum ServiceType {
  CERCA_ELETRICA = 'CERCA_ELETRICA',
  CFTV = 'CFTV',
  ALARME = 'ALARME',
  CONCERTINA = 'CONCERTINA'
}
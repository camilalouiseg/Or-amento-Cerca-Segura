import React, { forwardRef } from 'react';
import { QuoteItem } from '../types';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

interface QuotePreviewProps {
  serviceTitle: string;
  items: QuoteItem[];
  customerName?: string;
  footerNotes: string[];
  showTotal?: boolean;
  showIndividualTotal?: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const QuotePreview = forwardRef<HTMLDivElement, QuotePreviewProps>(({ 
  serviceTitle, 
  items, 
  customerName, 
  footerNotes, 
  showTotal = true,
  showIndividualTotal = false
}, ref) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    /* 
      A4 Scale Container - Fixed width for PDF generation consistency 
      Removed external wrapper to allow parent to control scaling/scroll
    */
    <div 
      ref={ref} 
      className="bg-white shadow-2xl flex flex-col shrink-0 mx-auto"
      style={{ width: '794px', minHeight: '1123px' }} 
    >
      {/* Header */}
      <div className="bg-[#1a1f2c] text-white px-8 py-4 flex justify-between items-center h-40">
        <div className="h-full flex items-center py-2">
          {/* Logo da Empresa */}
          {/* A imagem deve estar na pasta pública (public/) ou na raiz do servidor de hospedagem com o nome exato "logo.png" */}
          <img 
            src="/logo.png" 
            alt="Logo Cerca Segura" 
            className="h-full w-auto object-contain max-w-[280px]"
          />
        </div>
        <h2 className="text-4xl font-bold tracking-wide uppercase leading-none">Orçamento</h2>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow">
        
        {/* Service Title */}
        <div className="text-center mb-8 mt-4">
            <h3 className="text-3xl font-medium text-slate-800">{serviceTitle}</h3>
            {customerName && <p className="text-slate-500 mt-2">Cliente: {customerName}</p>}
        </div>

        {/* Table replacement with flex grid to ensure 100% stability with html2canvas */}
        <div className="w-full mb-8 flex flex-col">
          {/* Header */}
          <div className="flex flex-nowrap w-full bg-[#2d3342] text-white font-bold uppercase text-sm rounded-t-sm">
            <div className={`${showIndividualTotal ? 'w-3/5' : 'w-4/5'} px-4 py-3 flex items-center`}>
              Produto
            </div>
            <div className="w-1/5 px-4 py-3 flex items-center justify-center text-center">
              QT
            </div>
            {showIndividualTotal && (
              <div className="w-1/5 px-4 py-3 flex items-center justify-center text-center">
                TOTAL
              </div>
            )}
          </div>
          
          {/* Body */}
          <div className="flex flex-col w-full text-sm">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex flex-nowrap w-full border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                <div className={`${showIndividualTotal ? 'w-3/5' : 'w-4/5'} px-4 py-3 font-medium text-slate-700 flex items-center`}>
                  {item.name}
                </div>
                <div className="w-1/5 px-4 py-3 font-medium text-slate-700 flex items-center justify-center text-center">
                  {item.quantity} {item.unit ? item.unit : ''}
                </div>
                {showIndividualTotal && (
                  <div className="w-1/5 px-4 py-3 font-medium text-slate-700 flex items-center justify-center text-center">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Total Bar */}
        {showTotal && (
          <div className="bg-[#3e4552] text-white h-14 px-8 flex justify-between items-center rounded-sm">
              <span className="text-lg font-medium leading-none">Valor Total</span>
              <span className="text-2xl font-bold leading-none">{formatCurrency(total)}</span>
          </div>
        )}

        {/* Footer Notes */}
        <div className="mt-12 text-slate-600 text-sm space-y-2 pl-4 border-l-4 border-yellow-400">
          {footerNotes.map((note, idx) => (
            <p key={idx} className="leading-relaxed flex items-start gap-2">
              <span className="text-slate-400">•</span> {note}
            </p>
          ))}
        </div>
      </div>

      {/* Footer Contact */}
      <div className="mt-auto border-t-2 border-slate-800 p-8">
        <div className="flex justify-center mb-6 gap-6 text-slate-800">
          <MapPin className="w-8 h-8" strokeWidth={1.5} />
          <Phone className="w-8 h-8" strokeWidth={1.5} />
          <div className="flex gap-2">
            <Instagram className="w-8 h-8" strokeWidth={1.5} />
            <Facebook className="w-8 h-8" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-sm text-slate-700">
          <div>
            <p className="font-semibold mb-1">Arlindo Pedro da Silva, 270</p>
            <p>Cons. Lafaiete - MG</p>
            <p className="text-xs text-slate-500 mt-1">CNPJ: 14.153.404/0001-20</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mb-1">WhatsApp: (31) 98707-1654</p>
            <p>Fixo: (31) 3939-1654</p>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-1">@cercaseguracl</p>
            <p>Cerca Segura-Sistemas de Segurança</p>
          </div>
        </div>
      </div>
    </div>
  );
});

QuotePreview.displayName = 'QuotePreview';
export default QuotePreview;
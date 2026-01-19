import React from 'react';
import { QuoteItem } from '../types';
import { Trash2, Plus, RefreshCw, ChevronLeft } from 'lucide-react';

interface QuoteEditorProps {
  items: QuoteItem[];
  setItems: React.Dispatch<React.SetStateAction<QuoteItem[]>>;
  customerName: string;
  setCustomerName: (name: string) => void;
  serviceTitle: string;
  setServiceTitle: (title: string) => void;
  onDownload: () => void;
  onBack: () => void;
  isDownloading: boolean;
  showTotal?: boolean;
}

const QuoteEditor: React.FC<QuoteEditorProps> = ({ 
  items, 
  setItems, 
  customerName, 
  setCustomerName, 
  serviceTitle,
  setServiceTitle,
  onDownload, 
  onBack,
  isDownloading,
  showTotal = true
}) => {

  const handleItemChange = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Novo Item',
      price: 0,
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
      {/* Header Actions */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <div className="flex items-center gap-3">
          {showTotal && (
            <div className="text-right mr-4 hidden md:block">
              <span className="text-xs text-slate-500 uppercase font-semibold">Total Estimado</span>
              <div className="text-lg font-bold text-slate-800">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
              </div>
            </div>
          )}
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
          >
            {isDownloading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                 Baixar PDF
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 custom-scrollbar">
        
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Título do Serviço</label>
            <input
              type="text"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all font-medium text-slate-700"
              placeholder="Ex: Cerca Elétrica"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nome do Cliente (Opcional)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Ex: João da Silva"
            />
          </div>
        </div>

        {/* Items Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Itens do Orçamento</label>
            <button
              onClick={handleAddItem}
              className="text-xs font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 uppercase tracking-wide bg-yellow-50 px-3 py-1.5 rounded-full hover:bg-yellow-100 transition-colors"
            >
              <Plus className="w-3 h-3" /> Adicionar Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col md:flex-row gap-3 items-start md:items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-yellow-200 transition-colors"
              >
                <div className="flex-grow w-full md:w-auto">
                  <span className="text-xs text-slate-400 font-medium mb-1 block md:hidden">Produto</span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-yellow-400 outline-none text-slate-700 font-medium transition-colors"
                    placeholder="Nome do produto"
                  />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  {/* Caixa de Preço com R$ Fixo */}
                  <div className="w-36 shrink-0">
                    <span className="text-xs text-slate-400 font-medium mb-1 block md:hidden">Preço</span>
                    <div className="flex items-stretch border border-slate-200 rounded-lg bg-slate-50 overflow-hidden hover:border-yellow-400 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all">
                      <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-200 text-slate-500 font-semibold text-sm select-none">
                        R$
                      </div>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-300"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="w-20 shrink-0">
                    <span className="text-xs text-slate-400 font-medium mb-1 block md:hidden">Qtd</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-yellow-400 outline-none text-center text-slate-700"
                      placeholder="1"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-end md:self-center"
                    title="Remover item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteEditor;
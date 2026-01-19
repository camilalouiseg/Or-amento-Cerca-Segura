import React from 'react';
import { ServiceType } from '../types';
import { Shield, Zap, Camera, ShieldAlert, ChevronRight, FileText } from 'lucide-react';

interface ServiceSelectorProps {
  onSelect: (type: ServiceType) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ onSelect }) => {
  const services = [
    { 
      type: ServiceType.CERCA_ELETRICA, 
      label: 'Cerca Elétrica', 
      description: 'Proteção perimetral ostensiva com eletrificação pulsativa.',
      icon: Zap 
    },
    { 
      type: ServiceType.CFTV, 
      label: 'Câmeras (CFTV)', 
      description: 'Sistemas de monitoramento, gravação e acesso remoto.',
      icon: Camera 
    },
    { 
      type: ServiceType.ALARME, 
      label: 'Sistema de Alarme', 
      description: 'Sensores de presença, abertura e centrais monitoradas.',
      icon: ShieldAlert 
    },
    { 
      type: ServiceType.CONCERTINA, 
      label: 'Concertina', 
      description: 'Barreira física cortante de alta resistência para muros.',
      icon: Shield 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-12 font-sans">
      <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Corporativo */}
        <div className="mb-10 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sistema Interno</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Gerador de Orçamentos
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Selecione a categoria de serviço para iniciar uma nova proposta comercial.
            </p>
          </div>
          <div className="hidden md:flex items-center text-slate-400 text-sm font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <FileText className="w-4 h-4 mr-2" />
            Cerca Segura Empresa
          </div>
        </div>
        
        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <button
              key={service.type}
              onClick={() => onSelect(service.type)}
              className="group relative flex items-start p-8 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-800 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative flex-1 flex items-start gap-6">
                {/* Icon Box */}
                <div className="shrink-0 p-4 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 mb-2">
                    {service.label}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 group-hover:text-slate-600">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-900 transition-colors">
                    Criar Proposta <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Discreto */}
        <div className="mt-12 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Cerca Segura - Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;
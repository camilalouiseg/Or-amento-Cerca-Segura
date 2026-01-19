import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ServiceType, QuoteItem } from './types';
import { SERVICE_TEMPLATES } from './data';
import ServiceSelector from './components/ServiceSelector';
import QuoteEditor from './components/QuoteEditor';
import QuotePreview from './components/QuotePreview';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [serviceTitle, setServiceTitle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [footerNotes, setFooterNotes] = useState<string[]>([]);
  const [showTotal, setShowTotal] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleSelectService = (type: ServiceType) => {
    const template = SERVICE_TEMPLATES[type];
    setSelectedService(type);
    setItems(template.items);
    setServiceTitle(template.title);
    setFooterNotes(template.footerNotes);
    // If showTotal is undefined in template, default to true
    setShowTotal(template.showTotal !== false);
  };

  const handleBack = () => {
    setSelectedService(null);
    setItems([]);
    setServiceTitle('');
    setCustomerName('');
    setShowTotal(true);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    setIsDownloading(true);
    try {
      const element = previewRef.current;
      
      // High quality capture
      const canvas = await html2canvas(element, {
        scale: 2, // Improves resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // A4 dimensions in mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      // Clean filename
      const safeTitle = serviceTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const dateStr = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
      pdf.save(`orcamento_${safeTitle}_${dateStr}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans">
      {!selectedService ? (
        <ServiceSelector onSelect={handleSelectService} />
      ) : (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
          {/* Editor Panel (Left/Top) */}
          <div className="w-full lg:w-5/12 h-1/2 lg:h-full p-4 lg:p-6 z-10 bg-slate-50 lg:border-r border-slate-200">
            <QuoteEditor
              items={items}
              setItems={setItems}
              customerName={customerName}
              setCustomerName={setCustomerName}
              serviceTitle={serviceTitle}
              setServiceTitle={setServiceTitle}
              onDownload={handleDownloadPDF}
              onBack={handleBack}
              isDownloading={isDownloading}
              showTotal={showTotal}
            />
          </div>

          {/* Preview Panel (Right/Bottom) */}
          <div className="w-full lg:w-7/12 h-1/2 lg:h-full bg-slate-200/50 overflow-auto relative">
             <div className="absolute inset-0 flex justify-center p-4 lg:p-12 min-h-max">
               <QuotePreview
                 ref={previewRef}
                 serviceTitle={serviceTitle}
                 items={items}
                 customerName={customerName}
                 footerNotes={footerNotes}
                 showTotal={showTotal}
               />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
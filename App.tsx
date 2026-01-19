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

  // Ref para o preview visível (para o usuário ver)
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Ref para a versão de impressão (invisível, mas perfeita para o PDF)
  const printRef = useRef<HTMLDivElement>(null);

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
    // Usamos o printRef (versão oculta full size) ao invés do previewRef (versão mobile escalada)
    if (!printRef.current) return;

    setIsDownloading(true);
    try {
      const element = printRef.current;
      
      // High quality capture
      // On mobile, capture strictly the hidden element which has correct dimensions
      const canvas = await html2canvas(element, {
        scale: 2, // Improves resolution (2x standard DPI)
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Force width/height to prevent mobile browser glitches
        width: 794, // approx 210mm in pixels at 96 DPI
        windowWidth: 1200 // Simulate desktop window width for font rendering
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
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
          <div className="w-full lg:w-5/12 h-[55%] lg:h-full p-4 lg:p-6 z-10 bg-slate-50 lg:border-r border-slate-200">
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

          {/* Preview Panel (Right/Bottom) - VISUAL ONLY */}
          <div className="w-full lg:w-7/12 h-[45%] lg:h-full bg-slate-200/50 relative overflow-hidden flex items-center justify-center">
             <div className="lg:w-full lg:h-full lg:overflow-auto lg:p-12 lg:flex lg:justify-center">
                <div className="transform scale-[0.35] sm:scale-[0.5] md:scale-[0.65] lg:scale-100 lg:transform-none origin-center lg:origin-top transition-all duration-300">
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

          {/* 
            HIDDEN PRINT CONTAINER 
            This is positioned off-screen but rendered at full A4 size without CSS scaling.
            This ensures the PDF is generated correctly even on small mobile screens.
          */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
             <QuotePreview
                ref={printRef}
                serviceTitle={serviceTitle}
                items={items}
                customerName={customerName}
                footerNotes={footerNotes}
                showTotal={showTotal}
              />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
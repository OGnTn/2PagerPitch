import { useState, useEffect, useRef } from 'react';
import { Editor } from './components/Editor';
import { DocumentPreview } from './components/DocumentPreview';
import { FormState, initialState } from './types';
import { Printer, ExternalLink, X, Download, Upload as UploadIcon } from 'lucide-react';
import { exportToXml, importFromXml } from './utils/xml';

export default function App() {
  const [data, setData] = useState<FormState>(initialState);
  const [showIframeWarning, setShowIframeWarning] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsInIframe(window !== window.parent);
  }, []);

  const handlePrint = () => {
    if (isInIframe) {
      setShowIframeWarning(true);
    } else {
      window.print();
    }
  };

  const handleExportXml = () => {
    const xml = exportToXml(data);
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2-pager-${data.gameName.replace(/\s+/g, '-').toLowerCase() || 'config'}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportXml = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const xmlString = event.target?.result as string;
        const newState = importFromXml(xmlString, data);
        setData(newState);
      } catch (err) {
        alert("Fout bij inladen van XML bestand.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#DED9D1] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Editor Sidebar */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-[#FAF9F6] border-r border-[#1A1A1A] flex-shrink-0 h-screen overflow-y-auto no-print shadow-xl z-10 relative">
        
        {/* Iframe Warning Toast */}
        {showIframeWarning && (
          <div className="absolute top-20 left-6 right-6 bg-[#1A1A1A] text-[#FAF9F6] p-4 rounded-sm shadow-2xl z-50 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif italic text-lg flex items-center gap-2">
                <ExternalLink size={18} /> Open in nieuw tabblad
              </h3>
              <button onClick={() => setShowIframeWarning(false)} className="opacity-50 hover:opacity-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <p className="text-sm opacity-80 leading-relaxed font-serif">
              De print/export functie wordt geblokkeerd in deze preview weergave. 
              Open de app in een nieuw tabblad (via het icoontje rechtsboven in de balk) om de PDF te kunnen exporteren.
            </p>
            <button 
                onClick={() => { setShowIframeWarning(false); window.print(); }}
                className="mt-4 text-[10px] uppercase tracking-widest font-bold opacity-60 hover:opacity-100 cursor-pointer underline underline-offset-4 decoration-1"
            >
                Probeer toch af te drukken
            </button>
          </div>
        )}

        <div className="p-6 border-b border-[#1A1A1A] sticky top-0 bg-[#FAF9F6]/90 backdrop-blur flex justify-between items-center z-20">
          <h1 className="text-xl font-serif italic text-[#1A1A1A]">2-Pager</h1>
          
          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportXml} 
              accept=".xml" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center bg-[#E5E2DD] hover:bg-[#DED9D1] text-[#1A1A1A] p-2 rounded-sm transition-colors cursor-pointer border border-[#1A1A1A]"
              title="Importeer XML config"
            >
              <UploadIcon size={16} />
            </button>
            <button 
              onClick={handleExportXml}
              className="flex items-center justify-center bg-[#E5E2DD] hover:bg-[#DED9D1] text-[#1A1A1A] p-2 rounded-sm transition-colors cursor-pointer border border-[#1A1A1A]"
              title="Exporteer XML config"
            >
              <Download size={16} />
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#4A4A4A] text-[#FAF9F6] px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm ml-1"
              title="Exporteer PDF"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
        <Editor data={data} onChange={setData} />
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#DED9D1] print-area relative h-screen">
        <div className="max-w-[210mm] mx-auto mb-6 text-center text-xs text-[#7A7067] uppercase tracking-widest font-bold no-print">
          A4 Preview &bull; Gebruik "Exporteer PDF" om op te slaan
        </div>
        <DocumentPreview data={data} />
      </div>
    </div>
  );
}

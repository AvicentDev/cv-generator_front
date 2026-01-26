'use client'

import React, { useEffect } from 'react';
import { Printer, FileText } from 'lucide-react';
import CVTemplateSidebarRight from './templates/CVTemplateSidebarRight';
import CVTemplateSidebarLeft from './templates/CVTemplateSidebarLeft';
import CVTemplateClassic from './templates/CVTemplateClassic';
import CVTemplateCreative from './templates/CVTemplateCreative';
import CVTemplateModern from './templates/CVTemplateModern';

interface CVPreviewProps {
  cvData?: any;
  data?: any;
  template?: string;
  initialTemplate?: string;
  customConfig?: any;
  isComplete?: boolean;
}

export function CVPreview({ 
  cvData, 
  data, 
  template, 
  initialTemplate,
  customConfig = null,
  isComplete 
}: CVPreviewProps) {
    // Debug: ver qué datos llegan
    useEffect(() => {
        console.log('CVPreview - cvData:', cvData);
        console.log('CVPreview - data:', data);
        console.log('CVPreview - template:', template);
        console.log('CVPreview - initialTemplate:', initialTemplate);
    }, [cvData, data, template, initialTemplate]);

    // Usar cvData o data, dependiendo de qué prop se pase
    const cvInfo = cvData || data;
    
    // Verificar si hay algún dato
    const hasData = cvInfo && (
        cvInfo.nombre || 
        cvInfo.perfil || 
        cvInfo.experiencia || 
        cvInfo.educacion || 
        cvInfo.habilidades || 
        cvInfo.contacto
    );

    if (!cvInfo || !hasData) {
        return (
            <div className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-12">
                <div className="flex flex-col items-center justify-center text-slate-400 min-h-[500px]">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-6">
                        <FileText className="h-10 w-10 opacity-30" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No hay datos de CV disponibles</h3>
                    <p className="text-sm text-slate-500 text-center max-w-sm">
                        Por favor, genera un CV primero usando el chat con IA
                    </p>
                    <div className="mt-4 text-xs text-slate-600">
                        <p>Debug: cvData existe? {cvInfo ? 'Sí' : 'No'}</p>
                        <p>Debug: hasData? {hasData ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    // Usar template o initialTemplate
    const selectedTemplate = template || initialTemplate || 'classic';

    const templates = {
        'sidebar-right': CVTemplateSidebarRight,
        'sidebar-left': CVTemplateSidebarLeft,
        'classic': CVTemplateClassic,
        'creative': CVTemplateCreative,
        'modern': CVTemplateModern,
        'minimal': CVTemplateClassic,
        'custom': CVTemplateModern,
        'minimalist': CVTemplateSidebarLeft,
    };

    const SelectedTemplate = templates[selectedTemplate as keyof typeof templates] || CVTemplateClassic;

    return (
        <div className="space-y-5">
            {/* Acciones */}
            <div className="flex justify-end gap-3 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm text-violet-300 bg-violet-600/20 border border-violet-500/30 rounded-xl hover:bg-violet-600/30 transition-all shadow-lg shadow-violet-900/20"
                >
                    <Printer className="w-4 h-4" />
                    Imprimir CV
                </button>
            </div>

            {/* CV con template seleccionado */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <SelectedTemplate data={cvInfo} config={customConfig} isPreview={true} />
            </div>
        </div>
    );
}

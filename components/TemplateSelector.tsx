import { Check } from 'lucide-react';
import React from 'react';
import { CVData } from './cv-chat';
import CVTemplateSidebarLeft from './templates/CVTemplateSidebarLeft';
import CVTemplateSidebarRight from './templates/CVTemplateSidebarRight';

interface Template {
    id: string;
    name: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<{ data: CVData; config?: any; isPreview?: boolean }>;
    color: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
}

const templates: Template[] = [
    {
        id: 'sidebar-right',
        name: 'Sidebar Rojo',
        description: 'CV profesional con barra lateral roja a la derecha',
        component: CVTemplateSidebarRight,
        color: 'from-red-600 to-red-700'
    },
    {
        id: 'sidebar-left',
        name: 'Sidebar Izquierda',
        description: 'CV moderno con barra lateral a la izquierda',
        component: CVTemplateSidebarLeft,
        color: 'from-slate-600 to-slate-800'
    }
];

interface TemplateSelectorProps {
    onSelectTemplate: (templateId: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cvData: any;
}

export default function TemplateSelector({ onSelectTemplate, cvData }: TemplateSelectorProps) {
    const [hoveredTemplate, setHoveredTemplate] = React.useState<string | null>(null);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Elige tu diseño</h2>
                <p className="text-slate-400 text-sm">Selecciona el estilo que mejor represente tu perfil profesional</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => {
                    const TemplateComponent = template.component;
                    const isHovered = hoveredTemplate === template.id;

                    return (
                        <button
                            key={template.id}
                            onClick={() => onSelectTemplate(template.id)}
                            onMouseEnter={() => setHoveredTemplate(template.id)}
                            onMouseLeave={() => setHoveredTemplate(null)}
                            className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/30"
                        >
                            {/* Preview Container */}
                            <div className="relative h-80 overflow-hidden bg-slate-900/50">
                                <div className="absolute inset-0 scale-[0.25] origin-top-left">
                                    <div className="w-[400%] h-[400%]">
                                       <TemplateComponent data={cvData} config={template.config} isPreview={true} />
                                    </div>
                                </div>

                                {/* Overlay gradiente en hover */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-60' : 'opacity-80'}`} />

                                {/* Badge del template */}
                                <div className="absolute top-4 left-4">
                                    <div className={`px-3 py-1.5 bg-gradient-to-r ${template.color} rounded-full text-white text-xs font-semibold shadow-lg`}>
                                        {template.name}
                                    </div>
                                </div>

                                {/* Icono de selección en hover */}
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                                    <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-900/50">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Info del template */}
                            <div className="p-5 text-left">
                                <h3 className="text-lg font-semibold text-slate-100 mb-1">{template.name}</h3>
                                <p className="text-sm text-slate-400">{template.description}</p>
                            </div>

                            {/* Indicador de hover */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${template.color} transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

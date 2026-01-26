import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function CVTemplateClassic({ data, isPreview = false }) {
    if (!data) return null;

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Clásico */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-12 py-8 text-white">
                <h1 className="text-4xl font-serif font-bold mb-1">{data.nombre || 'Nombre Completo'}</h1>
                <div className="h-1 w-24 bg-blue-400 mt-3"></div>
            </div>

            {/* Contenido en dos columnas */}
            <div className="grid grid-cols-3 gap-0">
                {/* Sidebar */}
                <div className="col-span-1 bg-blue-50 p-8 space-y-8">
                    <section>
                        <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <div className="w-6 h-0.5 bg-blue-900"></div>
                            Habilidades
                        </h3>
                        {data.habilidades ? (
                            <div className="space-y-2">
                                {data.habilidades.split(',').map((skill, index) => (
                                    <div key={index} className="text-slate-700 text-xs leading-relaxed">
                                        • {skill.trim()}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-xs">Sin información</p>
                        )}
                    </section>

                    <section>
                        <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <div className="w-6 h-0.5 bg-blue-900"></div>
                            Contacto
                        </h3>
                        <div className="space-y-2 text-xs text-slate-600">
                            <div className="flex items-start gap-2">
                                <Calendar className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-700" />
                                <span>{data.contacto || 'Sin información'}</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Main Content */}
                <div className="col-span-2 p-10 space-y-8">
                    {/* Perfil */}
                    <section>
                        <h2 className="text-lg font-serif font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
                            Perfil Profesional
                        </h2>
                        <p className="text-slate-700 text-sm leading-relaxed">
                            {data.perfil || 'Sin información'}
                        </p>
                    </section>

                    {/* Experiencia */}
                    <section>
                        <h2 className="text-lg font-serif font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
                            Experiencia Laboral
                        </h2>
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {data.experiencia || 'Sin información'}
                        </p>
                    </section>

                    {/* Formación */}
                    <section>
                        <h2 className="text-lg font-serif font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
                            Formación Académica
                        </h2>
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {data.educacion || 'Sin información'}
                        </p>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-blue-900 px-12 py-3">
                <p className="text-xs text-blue-200 text-center">
                    Currículum Vitae • {data.nombre}
                </p>
            </div>
        </div>
    );
}

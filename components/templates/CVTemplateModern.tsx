import React from 'react';
import { Printer, User, Briefcase, GraduationCap, Lightbulb, FileText } from 'lucide-react';

export default function CVTemplateModern({ data, isPreview = false }) {
    if (!data) return null;

    return (
        <div className={`bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden ${isPreview ? 'print:shadow-none print:border-none print:bg-white' : ''}`}>
            {/* Header del CV */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 px-10 py-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-3">{data.nombre || 'Nombre Completo'}</h1>
                    <div className="flex items-center gap-2 text-violet-100">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-medium">Currículum Vitae Profesional</span>
                    </div>
                </div>
            </div>

            {/* Contenido del CV */}
            <div className="p-10 space-y-10 print:text-black">
                {/* Perfil Profesional */}
                <section>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-900/50">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-100 print:text-slate-800">Perfil Profesional</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[15px] ml-[64px] print:text-slate-600">
                        {data.perfil || 'Sin información'}
                    </p>
                </section>

                <hr className="border-slate-700/50 print:border-slate-200" />

                {/* Experiencia Laboral */}
                <section>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-100 print:text-slate-800">Experiencia Laboral</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[15px] ml-[64px] whitespace-pre-wrap print:text-slate-600">
                        {data.experiencia || 'Sin información'}
                    </p>
                </section>

                <hr className="border-slate-700/50 print:border-slate-200" />

                {/* Estudios */}
                <section>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-100 print:text-slate-800">Formación Académica</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[15px] ml-[64px] whitespace-pre-wrap print:text-slate-600">
                        {data.educacion || 'Sin información'}
                    </p>
                </section>

                <hr className="border-slate-700/50 print:border-slate-200" />

                {/* Habilidades */}
                <section>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/50">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-100 print:text-slate-800">Habilidades</h2>
                    </div>
                    <div className="ml-[64px]">
                        {data.habilidades ? (
                            <div className="flex flex-wrap gap-2.5">
                                {data.habilidades.split(',').map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-slate-700/50 text-slate-200 border border-slate-600/50 rounded-xl text-sm font-medium shadow-lg print:bg-slate-100 print:text-slate-700 print:border-slate-300"
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 print:text-slate-600">Sin información</p>
                        )}
                    </div>
                </section>
            </div>

            {/* Footer del CV */}
            <div className="bg-slate-900/50 backdrop-blur-sm px-10 py-5 border-t border-slate-700/50 print:bg-slate-50 print:border-slate-200">
                <p className="text-xs text-slate-500 text-center print:text-slate-400">
                    Generado con CV Generator AI • {new Date().toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </p>
            </div>
        </div>
    );
}

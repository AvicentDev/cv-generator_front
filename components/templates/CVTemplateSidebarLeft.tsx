import { Briefcase, GraduationCap, User } from 'lucide-react';

export default function CVTemplateSidebarLeft({ data }) {
    if (!data) return null;

    return (
        <div id="cv-template-root" className="bg-white mx-auto shadow-lg" style={{ width: '794px', height: '1123px' }}>
            <div className="grid grid-cols-[200px_1fr] h-full">
                {/* Sidebar - Izquierda */}
                <div className="bg-gray-100 px-5 py-10 border-r-2 border-gray-300 overflow-hidden">
                    {/* Foto placeholder */}
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto flex items-center justify-center mb-8">
                        <User className="w-8 h-8 text-gray-500" />
                    </div>


                    {/* Habilidades */}
                    <section>
                        <h3 className="text-[9.5px] font-bold text-gray-900 mb-3 uppercase tracking-wider">
                            HABILIDADES
                        </h3>
                        <div className="space-y-2 text-[9.5px] text-gray-700 leading-relaxed">
                            {data.habilidades ? (
                                data.habilidades.split(',').map((skill, index) => (
                                    <div key={index}>
                                        {skill.trim()}
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400">Sin habilidades</div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Main Content - Derecha */}
                <div className="px-8 py-10 overflow-hidden">
                    {/* Header */}
                    <div className="border-b-2 border-gray-300 pb-4 mb-7">
                        <h1 className="text-[34px] font-bold text-gray-900 leading-none mb-1">
                            {data.nombre || 'Sin nombre'}
                        </h1>
                        <p className="text-[15px] text-gray-700">
                            {data.titulo || 'Sin título'}
                        </p>
                    </div>

                    {/* Resumen */}
                    <section className="mb-7">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-[15px] font-bold text-gray-900">Resumen</h2>
                        </div>
                        <p className="text-[10.5px] text-gray-800 leading-[1.7] text-justify">
                            {data.perfil || 'Sin información'}
                        </p>
                    </section>

                    {/* Experiencia Laboral */}
                    <section className="mb-7">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-[15px] font-bold text-gray-900">Experiencia laboral</h2>
                        </div>
                        {data.experiencia ? (
                            <p className="text-[9.5px] text-gray-800 leading-[1.6] whitespace-pre-wrap">
                                {data.experiencia}
                            </p>
                        ) : (
                            <p className="text-[9.5px] text-gray-400">Sin experiencia laboral</p>
                        )}
                    </section>

                    {/* Estudios */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-[15px] font-bold text-gray-900">Estudios</h2>
                        </div>
                        {data.educacion ? (
                            <p className="text-[9.5px] text-gray-800 leading-[1.6] whitespace-pre-wrap">
                                {data.educacion}
                            </p>
                        ) : (
                            <p className="text-[9.5px] text-gray-400">Sin formación académica</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

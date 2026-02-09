
export default function CVTemplateSidebarRight({ data }) {
    if (!data) return null;

    return (
        <div id="cv-template-root" className="bg-white mx-auto shadow-lg" style={{ width: '794px', height: '1123px' }}>
            <div className="grid grid-cols-[490px_304px] h-full">
                {/* Main Content - Izquierda */}
                <div className="bg-gray-50 px-8 py-12 overflow-hidden">
                    {/* Header */}
                    <div className="mb-7">
                        <h1 className="text-[30px] font-bold text-gray-900 leading-none mb-2">
                            {data.nombre || 'Sin nombre'}
                        </h1>
                        <p className="text-[14px] text-gray-700 font-medium">
                            {data.titulo || 'Sin título'}
                        </p>
                    </div>

                    {/* Perfil */}
                    <section className="mb-7">
                        <p className="text-[10.5px] text-gray-800 leading-[1.7] text-justify">
                            {data.perfil || 'Sin información'}
                        </p>
                    </section>

                    {/* Experiencia Laboral */}
                    <section className="mb-7">
                        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Experiencia laboral</h2>
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
                        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Estudios</h2>
                        {data.educacion ? (
                            <p className="text-[9.5px] text-gray-800 leading-[1.6] whitespace-pre-wrap">
                                {data.educacion}
                            </p>
                        ) : (
                            <p className="text-[9.5px] text-gray-400">Sin formación académica</p>
                        )}
                    </section>
                </div>

                {/* Sidebar - Derecha */}
                <div className="bg-[#8B3333] text-white px-6 py-12 overflow-hidden">
                    {/* Habilidades */}
                    <section>
                        <h3 className="text-[14px] font-bold mb-4 tracking-wide">
                            Habilidades
                        </h3>
                        <div className="space-y-2 text-[10.5px] leading-relaxed">
                            {data.habilidades ? (
                                data.habilidades.split(',').map((skill, index) => (
                                    <div key={index}>
                                        {skill.trim()}
                                    </div>
                                ))
                            ) : (
                                <div className="opacity-50">Sin habilidades</div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

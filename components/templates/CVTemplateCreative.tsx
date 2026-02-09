
export default function CVTemplateCreative({ data }) {
    if (!data) return null;

    return (
        <div id="cv-template-root" className="bg-white mx-auto shadow-lg" style={{ width: '794px', height: '1123px' }}>
            <div className="grid grid-cols-[490px_304px] h-full">
                {/* Main Content - Izquierda */}
                <div className="bg-gray-50 px-8 py-10 overflow-hidden">
                    {/* Header */}
                    <div className="mb-5">
                        <h1 className="text-[28px] font-bold text-gray-900 leading-none mb-1">
                            {data.nombre || 'Sin nombre'}
                        </h1>
                        <p className="text-[13px] text-gray-700 font-medium">
                            {data.titulo || 'Sin título'}
                        </p>
                    </div>

                    {/* Perfil */}
                    <section className="mb-5">
                        <p className="text-[10px] text-gray-800 leading-[1.5] text-justify">
                            {data.perfil || 'Sin información'}
                        </p>
                    </section>

                    {/* Experiencia Laboral */}
                    <section className="mb-5">
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Experiencia laboral</h2>
                        {data.experiencia ? (
                            <p className="text-[9px] text-gray-800 leading-[1.6] whitespace-pre-wrap">
                                {data.experiencia}
                            </p>
                        ) : (
                            <p className="text-[9px] text-gray-400">Sin experiencia laboral</p>
                        )}
                    </section>

                    {/* Estudios */}
                    <section>
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Estudios</h2>
                        {data.educacion ? (
                            <p className="text-[9px] text-gray-800 leading-[1.6] whitespace-pre-wrap">
                                {data.educacion}
                            </p>
                        ) : (
                            <p className="text-[9px] text-gray-400">Sin formación académica</p>
                        )}
                    </section>
                </div>

                {/* Sidebar - Derecha */}
                <div className="bg-[#8B3333] text-white px-6 py-10 overflow-hidden">
                    {/* Habilidades */}
                    <section>
                        <h3 className="text-[13px] font-bold mb-3 tracking-wide">
                            Habilidades
                        </h3>
                        <div className="space-y-1.5 text-[10px] leading-tight">
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

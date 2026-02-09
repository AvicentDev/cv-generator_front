
export default function CVTemplateMinimalist({ data }) {
    if (!data) return null;

    return (
        <div id="cv-template-root" className="bg-white mx-auto shadow-lg" style={{ width: '794px', height: '1123px' }}>
            <div className="grid grid-cols-[200px_1fr] h-full">
                {/* Sidebar - Izquierda */}
                <div className="bg-gray-100 px-5 py-8 border-r-2 border-gray-300 overflow-hidden">
                    {/* Información Personal */}
                    <section className="mb-6">
                        <h3 className="text-[9px] font-bold text-gray-900 mb-2 uppercase tracking-wider">
                            INFORMACIÓN PERSONAL
                        </h3>
                        <div className="space-y-1.5 text-[9px] text-gray-700 leading-tight">
                            {data.ubicacion ? <p>{data.ubicacion}</p> : <p className="text-gray-400">Sin ubicación</p>}
                            {data.telefono ? <p>{data.telefono}</p> : <p className="text-gray-400">Sin teléfono</p>}
                            {data.email ? <p className="break-all">{data.email}</p> : <p className="text-gray-400">Sin email</p>}
                        </div>
                    </section>

                    {/* Habilidades */}
                    <section>
                        <h3 className="text-[9px] font-bold text-gray-900 mb-2 uppercase tracking-wider">
                            HABILIDADES
                        </h3>
                        <div className="space-y-1.5 text-[9px] text-gray-700 leading-tight">
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
                <div className="px-8 py-8 overflow-hidden">
                    {/* Header */}
                    <div className="border-b-2 border-gray-300 pb-3 mb-5">
                        <h1 className="text-[32px] font-bold text-gray-900 leading-none mb-0.5">
                            {data.nombre || 'Sin nombre'}
                        </h1>
                        <p className="text-[14px] text-gray-700">
                            {data.titulo || 'Sin título'}
                        </p>
                    </div>

                    {/* Resumen */}
                    <section className="mb-5">
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Resumen</h2>
                        <p className="text-[10px] text-gray-800 leading-[1.5] text-justify">
                            {data.perfil || 'Sin información'}
                        </p>
                    </section>

                    {/* Experiencia Laboral */}
                    <section className="mb-5">
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Experiencia laboral</h2>
                        {data.experiencia ? (
                            <p className="text-[9px] text-gray-800 leading-[1.4] whitespace-pre-wrap">
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
                            <p className="text-[9px] text-gray-800 leading-[1.4] whitespace-pre-wrap">
                                {data.educacion}
                            </p>
                        ) : (
                            <p className="text-[9px] text-gray-400">Sin formación académica</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

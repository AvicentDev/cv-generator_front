import { Briefcase, GraduationCap, User } from 'lucide-react';

export default function CVTemplateSidebarLeft({ data }) {
    if (!data) return null;

    return (
        <div className="bg-white mx-auto shadow-lg" style={{ width: '794px', height: '1123px' }}>
            <div className="grid grid-cols-[200px_1fr] h-full">
                {/* Sidebar - Izquierda */}
                <div className="bg-gray-100 px-5 py-10 border-r-2 border-gray-300 overflow-hidden">
                    {/* Foto placeholder */}
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto flex items-center justify-center mb-8">
                        <User className="w-8 h-8 text-gray-500" />
                    </div>

                    {/* Información Personal */}
                    <section className="mb-8">
                        <h3 className="text-[9.5px] font-bold text-gray-900 mb-3 uppercase tracking-wider">
                            INFORMACIÓN PERSONAL
                        </h3>
                        <div className="space-y-2 text-[9.5px] text-gray-700 leading-relaxed">
                            <p>Alicante, España</p>
                            <p>+34 670 71 65 34</p>
                            <p className="break-all">avicent.dev@gmail.com</p>
                        </div>
                    </section>

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
                                <>
                                    <div>Java</div>
                                    <div>PHP</div>
                                    <div>C#</div>
                                    <div>JavaScript</div>
                                    <div>SQL</div>
                                    <div>Laravel (PHP)</div>
                                    <div>ASP.NET Core</div>
                                    <div>SQL Server</div>
                                    <div>MySQL</div>
                                    <div>Clean Code</div>
                                    <div>Principios SOLID</div>
                                    <div>Repository Pattern</div>
                                    <div>Git</div>
                                    <div>Docker</div>
                                </>
                            )}
                        </div>
                    </section>
                </div>

                {/* Main Content - Derecha */}
                <div className="px-8 py-10 overflow-hidden">
                    {/* Header */}
                    <div className="border-b-2 border-gray-300 pb-4 mb-7">
                        <h1 className="text-[34px] font-bold text-gray-900 leading-none mb-1">
                            {data.nombre || 'Alvaro Vicent'}
                        </h1>
                        <p className="text-[15px] text-gray-700">
                            Desarrollador Backend
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
                            {data.perfil || 'Desarrollador Backend especializado en la creación de APIs RESTful y sistemas escalables con Java y PHP (Laravel). Aplico principios de Clean Code y SOLID para desarrollar soluciones eficientes, seguras y mantenibles. Experiencia en autenticación y control de roles, modelado y optimización de bases de datos relacionales (MySQL, SQL Server) y uso de Docker y Git para entornos de desarrollo colaborativos. Complemento mi perfil con conocimientos en React y Next.js para el consumo de APIs. Busco seguir creciendo como Backend Developer en proyectos con buenas prácticas y enfoque en calidad de software.'}
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
                        <div>
                            <p className="font-bold text-[11.5px] text-gray-900 leading-tight">
                                Desarrollador Backend en Prácticas, Tainforma Consultoria Informática, Alicante, España
                            </p>
                            <p className="text-[9.5px] text-gray-600 mb-2 italic">marzo 2025 - junio 2025</p>
                            <ul className="space-y-1 ml-3">
                                <li className="text-[9.5px] text-gray-800 leading-[1.6] list-disc pl-1">
                                    Desarrollo de una plataforma de gestión de propiedades y apartamentos turísticos para automatizar reservas.
                                </li>
                                <li className="text-[9.5px] text-gray-800 leading-[1.6] list-disc pl-1">
                                    Diseño y optimización de la arquitectura de datos en SQL Server.
                                </li>
                                <li className="text-[9.5px] text-gray-800 leading-[1.6] list-disc pl-1">
                                    Implementación de autenticación y autorización con ASP.NET Core Identity.
                                </li>
                                <li className="text-[9.5px] text-gray-800 leading-[1.6] list-disc pl-1">
                                    Modularización de la lógica de negocio mediante Repository Pattern y Class Libraries.
                                </li>
                                <li className="text-[9.5px] text-gray-800 leading-[1.6] list-disc pl-1">
                                    Trabajo 100% remoto con gestión de tareas en Microsoft Teams.
                                </li>
                            </ul>
                            {data.experiencia && data.experiencia !== 'Sin información' && (
                                <p className="text-[9px] text-gray-800 leading-[1.4] mt-2 whitespace-pre-wrap">
                                    {data.experiencia}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Estudios */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <h2 className="text-[15px] font-bold text-gray-900">Estudios</h2>
                        </div>
                        <div>
                            <p className="font-bold text-[11.5px] text-gray-900 leading-tight">
                                Grado Superior, Desarrollo de Aplicaciones Web, IGFormacion
                            </p>
                            <p className="text-[9.5px] text-gray-600 mb-2 italic">mayo 2023 - junio 2025</p>
                            <ul className="space-y-1 ml-3">
                                <li className="text-[9.5px] text-gray-800 leading-[1.6] list-disc pl-1">
                                    Formación en Java y desarrollo de aplicaciones orientadas a objetos (1 año de experiencia práctica).
                                </li>
                            </ul>
                            {data.educacion && data.educacion !== 'Sin información' && (
                                <p className="text-[9px] text-gray-800 leading-[1.4] mt-2 whitespace-pre-wrap">
                                    {data.educacion}
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

import { Mail, MapPin, Phone } from 'lucide-react';

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
                            {data.nombre || 'Alvaro Vicent'}
                        </h1>
                        <p className="text-[14px] text-gray-700 font-medium">
                            Desarrollador Backend
                        </p>
                    </div>

                    {/* Perfil */}
                    <section className="mb-7">
                        <p className="text-[10.5px] text-gray-800 leading-[1.7] text-justify">
                            {data.perfil || 'Desarrollador Backend especializado en la creación de APIs RESTful y sistemas escalables con Java y PHP (Laravel). Aplico principios de Clean Code y SOLID para desarrollar soluciones eficientes, seguras y mantenibles. Experiencia en autenticación y control de roles, modelado y optimización de bases de datos relacionales (MySQL, SQL Server) y uso de Docker y Git para entornos de desarrollo colaborativos. Complemento mi perfil con conocimientos en React y Next.js para el consumo de APIs. Busco seguir creciendo como Backend Developer en proyectos con buenas prácticas y enfoque en calidad de software.'}
                        </p>
                    </section>

                    {/* Experiencia Laboral */}
                    <section className="mb-7">
                        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Experiencia laboral</h2>
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
                        <h2 className="text-[15px] font-bold text-gray-900 mb-3">Estudios</h2>
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

                {/* Sidebar - Derecha */}
                <div className="bg-[#8B3333] text-white px-6 py-12 overflow-hidden">
                    {/* Información Personal */}
                    <section className="mb-10">
                        <h3 className="text-[14px] font-bold mb-4 tracking-wide">
                            Información personal
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Phone className="w-[15px] h-[15px] flex-shrink-0" strokeWidth={2} />
                                <span className="text-[10.5px] leading-relaxed">+34 670 71 65 34</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="w-[15px] h-[15px] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                <span className="text-[10.5px] break-all leading-relaxed">avicent.dev@gmail.com</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-[15px] h-[15px] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                <span className="text-[10.5px] leading-relaxed">Alicante, España</span>
                            </div>
                        </div>
                    </section>

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
            </div>
        </div>
    );
}

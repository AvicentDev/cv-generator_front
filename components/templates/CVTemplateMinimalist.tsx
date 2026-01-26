import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function CVTemplateMinimalist({ data }) {
    if (!data) return null;

    return (
        <div className="bg-white mx-auto shadow-lg" style={{ width: '794px', height: '1123px' }}>
            <div className="grid grid-cols-[200px_1fr] h-full">
                {/* Sidebar - Izquierda */}
                <div className="bg-gray-100 px-5 py-8 border-r-2 border-gray-300 overflow-hidden">
                    {/* Información Personal */}
                    <section className="mb-6">
                        <h3 className="text-[9px] font-bold text-gray-900 mb-2 uppercase tracking-wider">
                            INFORMACIÓN PERSONAL
                        </h3>
                        <div className="space-y-1.5 text-[9px] text-gray-700 leading-tight">
                            <p>Alicante, España</p>
                            <p>+34 670 71 65 34</p>
                            <p className="break-all">avicent.dev@gmail.com</p>
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
                <div className="px-8 py-8 overflow-hidden">
                    {/* Header */}
                    <div className="border-b-2 border-gray-300 pb-3 mb-5">
                        <h1 className="text-[32px] font-bold text-gray-900 leading-none mb-0.5">
                            {data.nombre || 'Alvaro Vicent'}
                        </h1>
                        <p className="text-[14px] text-gray-700">
                            Desarrollador Backend
                        </p>
                    </div>

                    {/* Resumen */}
                    <section className="mb-5">
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Resumen</h2>
                        <p className="text-[10px] text-gray-800 leading-[1.5] text-justify">
                            {data.perfil || 'Desarrollador Backend especializado en la creación de APIs RESTful y sistemas escalables con Java y PHP (Laravel). Aplico principios de Clean Code y SOLID para desarrollar soluciones eficientes, seguras y mantenibles. Experiencia en autenticación y control de roles, modelado y optimización de bases de datos relacionales (MySQL, SQL Server) y uso de Docker y Git para entornos de desarrollo colaborativos. Complemento mi perfil con conocimientos en React y Next.js para el consumo de APIs. Busco seguir creciendo como Backend Developer en proyectos con buenas prácticas y enfoque en calidad de software.'}
                        </p>
                    </section>

                    {/* Experiencia Laboral */}
                    <section className="mb-5">
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Experiencia laboral</h2>
                        <div>
                            <p className="font-bold text-[11px] text-gray-900 leading-tight">
                                Desarrollador Backend en Prácticas, Tainforma Consultoria Informática, Alicante, España
                            </p>
                            <p className="text-[9px] text-gray-600 mb-1.5 italic">marzo 2025 - junio 2025</p>
                            <ul className="space-y-0.5 ml-3">
                                <li className="text-[9px] text-gray-800 leading-[1.4] list-disc pl-1">
                                    Desarrollo de una plataforma de gestión de propiedades y apartamentos turísticos para automatizar reservas.
                                </li>
                                <li className="text-[9px] text-gray-800 leading-[1.4] list-disc pl-1">
                                    Diseño y optimización de la arquitectura de datos en SQL Server.
                                </li>
                                <li className="text-[9px] text-gray-800 leading-[1.4] list-disc pl-1">
                                    Implementación de autenticación y autorización con ASP.NET Core Identity.
                                </li>
                                <li className="text-[9px] text-gray-800 leading-[1.4] list-disc pl-1">
                                    Modularización de la lógica de negocio mediante Repository Pattern y Class Libraries.
                                </li>
                                <li className="text-[9px] text-gray-800 leading-[1.4] list-disc pl-1">
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
                        <h2 className="text-[14px] font-bold text-gray-900 mb-2">Estudios</h2>
                        <div>
                            <p className="font-bold text-[11px] text-gray-900 leading-tight">
                                Grado Superior, Desarrollo de Aplicaciones Web, IGFormacion
                            </p>
                            <p className="text-[9px] text-gray-600 mb-1.5 italic">mayo 2023 - junio 2025</p>
                            <ul className="space-y-0.5 ml-3">
                                <li className="text-[9px] text-gray-800 leading-[1.4] list-disc pl-1">
                                    Formación en Java y desarrollo de aplicaciones orientadas a objetos (1 año de experiencia práctica).
                                </li>
                            </ul>
                            {data.estudios && data.estudios !== 'Sin información' && (
                                <p className="text-[9px] text-gray-800 leading-[1.4] mt-2 whitespace-pre-wrap">
                                    {data.estudios}
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

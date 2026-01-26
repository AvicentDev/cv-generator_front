import React from 'react';
import { User, Briefcase, GraduationCap, Lightbulb, FileText } from 'lucide-react';

const sectionIcons = {
    perfil: User,
    experiencia: Briefcase,
    estudios: GraduationCap,
    habilidades: Lightbulb
};

export default function CVTemplateCustom({ data, config = {}, isPreview = false }) {
    if (!data) return null;

    const {
        headerColor = '#7c3aed',
        accentColor = '#a855f7',
        backgroundColor = '#1e293b',
        textColor = '#e2e8f0',
        fontSize = 'medium',
        fontFamily = 'sans-serif',
        layout = 'modern',
        showIcons = true
    } = config;

    const fontSizeMap = {
        small: { base: '14px', lg: '28px', section: '16px' },
        medium: { base: '16px', lg: '32px', section: '20px' },
        large: { base: '18px', lg: '36px', section: '24px' }
    };

    const fontMap = {
        'sans-serif': 'sans-serif',
        'serif': 'Georgia, serif',
        'monospace': 'Courier New, monospace'
    };

    const sizes = fontSizeMap[fontSize] || fontSizeMap.medium;

    const containerStyle = {
        backgroundColor,
        color: textColor,
        fontFamily: fontMap[fontFamily],
        fontSize: sizes.base,
        lineHeight: '1.6'
    };

    const headerStyle = {
        background: `linear-gradient(135deg, ${headerColor} 0%, ${accentColor} 100%)`
    };

    const sectionTitleStyle = {
        color: headerColor,
        fontSize: sizes.section,
        fontWeight: 'bold'
    };

    const renderModernLayout = () => (
        <div style={containerStyle} className="p-10 space-y-10">
            {/* Perfil */}
            <section>
                <div style={{ ...sectionTitleStyle, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {showIcons && <User size={20} />}
                    Perfil Profesional
                </div>
                <p style={{ marginLeft: showIcons ? '32px' : '0', lineHeight: '1.8' }}>
                    {data.perfil || 'Sin información'}
                </p>
            </section>

            <div style={{ borderTop: `1px solid ${accentColor}`, opacity: 0.3 }}></div>

            {/* Experiencia */}
            <section>
                <div style={{ ...sectionTitleStyle, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {showIcons && <Briefcase size={20} />}
                    Experiencia Laboral
                </div>
                <p style={{ marginLeft: showIcons ? '32px' : '0', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {data.experiencia || 'Sin información'}
                </p>
            </section>

            <div style={{ borderTop: `1px solid ${accentColor}`, opacity: 0.3 }}></div>

            {/* Estudios */}
            <section>
                <div style={{ ...sectionTitleStyle, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {showIcons && <GraduationCap size={20} />}
                    Formación Académica
                </div>
                <p style={{ marginLeft: showIcons ? '32px' : '0', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {data.estudios || 'Sin información'}
                </p>
            </section>

            <div style={{ borderTop: `1px solid ${accentColor}`, opacity: 0.3 }}></div>

            {/* Habilidades */}
            <section>
                <div style={{ ...sectionTitleStyle, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {showIcons && <Lightbulb size={20} />}
                    Habilidades
                </div>
                <div style={{ marginLeft: showIcons ? '32px' : '0', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {data.habilidades ? (
                        data.habilidades.split(',').map((skill, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: accentColor,
                                    color: 'white',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                }}
                            >
                                {skill.trim()}
                            </span>
                        ))
                    ) : (
                        <p>Sin información</p>
                    )}
                </div>
            </section>
        </div>
    );

    const renderSidebarLayout = () => (
        <div style={containerStyle} className="grid grid-cols-3 gap-0">
            {/* Sidebar */}
            <div style={{ gridColumn: '1 / 2', backgroundColor: headerColor, color: 'white', padding: '40px 20px' }}>
                <h3 style={{ fontSize: sizes.section, fontWeight: 'bold', marginBottom: '16px' }}>Habilidades</h3>
                <div style={{ space: '8px' }}>
                    {data.habilidades ? (
                        data.habilidades.split(',').map((skill, index) => (
                            <div key={index} style={{ marginBottom: '8px', fontSize: '12px', lineHeight: '1.6' }}>
                                • {skill.trim()}
                            </div>
                        ))
                    ) : (
                        <p>Sin información</p>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ gridColumn: '2 / 4', padding: '40px' }}>
                <div style={{ ...sectionTitleStyle, marginBottom: '20px' }}>
                    Perfil Profesional
                </div>
                <p style={{ marginBottom: '30px', lineHeight: '1.8' }}>
                    {data.perfil || 'Sin información'}
                </p>

                <div style={{ ...sectionTitleStyle, marginBottom: '20px' }}>
                    Experiencia
                </div>
                <p style={{ marginBottom: '30px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {data.experiencia || 'Sin información'}
                </p>

                <div style={{ ...sectionTitleStyle, marginBottom: '20px' }}>
                    Formación
                </div>
                <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {data.estudios || 'Sin información'}
                </p>
            </div>
        </div>
    );

    const renderMinimalLayout = () => (
        <div style={containerStyle} className="p-10">
            <div style={{ ...sectionTitleStyle, fontSize: sizes.lg, marginBottom: '30px', borderBottom: `3px solid ${headerColor}`, paddingBottom: '15px' }}>
                {data.nombre}
            </div>

            <div style={{ space: '20px' }}>
                {/* Perfil */}
                <div style={{ marginBottom: '25px' }}>
                    <div style={{ ...sectionTitleStyle, textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px', letterSpacing: '2px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '8px' }}>
                        Perfil Profesional
                    </div>
                    <p style={{ lineHeight: '1.8', fontSize: sizes.base }}>
                        {data.perfil || 'Sin información'}
                    </p>
                </div>

                {/* Experiencia */}
                <div style={{ marginBottom: '25px' }}>
                    <div style={{ ...sectionTitleStyle, textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px', letterSpacing: '2px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '8px' }}>
                        Experiencia Laboral
                    </div>
                    <p style={{ lineHeight: '1.8', fontSize: sizes.base, whiteSpace: 'pre-wrap' }}>
                        {data.experiencia || 'Sin información'}
                    </p>
                </div>

                {/* Estudios */}
                <div style={{ marginBottom: '25px' }}>
                    <div style={{ ...sectionTitleStyle, textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px', letterSpacing: '2px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '8px' }}>
                        Formación Académica
                    </div>
                    <p style={{ lineHeight: '1.8', fontSize: sizes.base, whiteSpace: 'pre-wrap' }}>
                        {data.estudios || 'Sin información'}
                    </p>
                </div>

                {/* Habilidades */}
                <div>
                    <div style={{ ...sectionTitleStyle, textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px', letterSpacing: '2px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '8px' }}>
                        Habilidades
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {data.habilidades ? (
                            data.habilidades.split(',').map((skill, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                    <div style={{ width: '4px', height: '4px', backgroundColor: headerColor, borderRadius: '50%' }}></div>
                                    <span>{skill.trim()}</span>
                                </div>
                            ))
                        ) : (
                            <p>Sin información</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={headerStyle} className="rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div style={headerStyle} className="px-10 py-10 text-white relative overflow-hidden">
                <div style={{ position: 'absolute', inset: 0, background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)', opacity: 0.4 }}></div>
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <h1 style={{ fontSize: sizes.lg, fontWeight: 'bold', marginBottom: '8px' }}>
                        {data.nombre || 'Nombre Completo'}
                    </h1>
                    <div style={{ fontSize: '12px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={14} />
                        Currículum Vitae
                    </div>
                </div>
            </div>

            {/* Content */}
            {layout === 'modern' && renderModernLayout()}
            {layout === 'sidebar' && renderSidebarLayout()}
            {layout === 'minimal' && renderMinimalLayout()}
        </div>
    );
}
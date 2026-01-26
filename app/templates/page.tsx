'use client'

import CVTemplateCreative from '@/components/templates/CVTemplateCreative'
import CVTemplateMinimalist from '@/components/templates/CVTemplateMinimalist'
import { useCVContext } from '@/contexts/CVContext'
import { Check, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type TemplateType = 'minimalist' | 'creative'

interface Template {
  id: TemplateType
  name: string
  description: string
  gradient: string
  component: any
}

const templates: Template[] = [
  {
    id: 'minimalist',
    name: 'Sidebar Izquierda',
    description: 'CV moderno con barra lateral a la izquierda',
    gradient: 'from-slate-600 to-slate-800',
    component: CVTemplateMinimalist
  },
  {
    id: 'creative',
    name: 'Sidebar Rojo',
    description: 'CV profesional con barra lateral roja a la derecha',
    gradient: 'from-red-600 to-red-700',
    component: CVTemplateCreative
  },
]

// Datos de ejemplo para mostrar en la vista previa
const datosEjemplo = {
  nombre: 'Alvaro Vicent',
  titulo: 'Desarrollador Backend',
  email: 'alvaro@example.com',
  telefono: '+34 689 17 55 34',
  ubicacion: 'Alicante, España',
  perfil: 'Desarrollador Backend especializado en la creación de APIs RESTful y sistemas escalables con Java y PHP (Laravel). Aplico principios de Clean Code y SOLID para desarrollar soluciones eficientes.',
  experiencia: `Desarrollador Backend en Prácticas, Tainforma Consultoría Informática, Alicante, España
marzo 2025 - junio 2025

• Desarrollo de una plataforma de gestión de propiedades y apartamentos turísticos
• Diseño y optimización de la arquitectura de datos en SQL Server
• Implementación de autenticación y autorización con ASP.NET Core Identity`,
  educacion: `Grado Superior, Desarrollo de Aplicaciones Web, IGFormacion
mayo 2023 - julio 2025

• Formación en Java y desarrollo de aplicaciones orientadas a objetos`,
  habilidades: 'Java, PHP, C#, JavaScript, SQL, Laravel, ASP.NET Core, MySQL, SQL Server, Docker, Git',
  principios: 'Clean Code, Principios SOLID, Repository Pattern'
}

export default function TemplatesPage() {
  const router = useRouter()
  const { cvData, resetCV } = useCVContext()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null)
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateType | null>(null)

  // Usar datos reales si existen, si no usar los de ejemplo
  const dataToShow = cvData.nombre ? cvData : datosEjemplo

  const handleSelectTemplate = (id: TemplateType) => {
    setSelectedTemplate(id)

    // Auto-redirect después de seleccionar
    setTimeout(() => {
      router.push(`/preview?template=${id}`)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/80">
        <div className="max-w-7xl mx-auto py-6 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                CV Generator <span className="text-purple-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400">Crea tu curriculum en minutos</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres crear un nuevo CV? Se perderá la información actual.')) {
                resetCV()
                window.location.href = '/'
              }
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Nuevo CV
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12 pt-32">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Elige tu diseño
          </h2>
          <p className="text-slate-400 text-lg">
            Selecciona el estilo que mejor represente tu perfil profesional
          </p>
        </div>

        {/* Templates grid - 2 templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">
          {templates.map((template) => {
            const TemplateComponent = template.component
            const isHovered = hoveredTemplate === template.id
            const isSelected = selectedTemplate === template.id

            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                className="group relative overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-900/20"
              >
                {/* Preview Container */}
                <div className="relative h-[500px] overflow-hidden bg-slate-900/50">
                  {/* Vista previa real del template */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="origin-center pointer-events-none"
                      style={{
                        transform: 'scale(0.35)',
                        width: '794px',
                        height: '1123px'
                      }}
                    >
                      <TemplateComponent data={dataToShow} isPreview={true} />
                    </div>
                  </div>

                  {/* Overlay gradiente */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-60' : 'opacity-80'}`} />

                  {/* Badge del template */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`px-4 py-2 bg-gradient-to-r ${template.gradient} rounded-full text-white text-sm font-semibold shadow-lg`}>
                      {template.name}
                    </div>
                  </div>

                  {/* Icono de selección en hover o selected */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 ${isHovered || isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-900/50">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info del template */}
                <div className="p-6 text-left bg-slate-900/50">
                  <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-slate-400">{template.description}</p>
                </div>

                {/* Indicador de hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${template.gradient} transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            CV Generator AI • Powered by IA
          </p>
        </div>
      </div>
    </main>
  )
}

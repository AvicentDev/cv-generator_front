'use client'

import { CVPreview } from '@/components/cv-preview'
import { useCVContext } from '@/contexts/CVContext'
import { ArrowLeft, Download, Sparkles } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const template = searchParams.get('template') || 'classic'
  const { cvData, resetCV } = useCVContext()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/30">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/templates')}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors group"
              title="Volver a templates"
            >
              <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  CV Generator <span className="text-purple-400">AI</span>
                </h1>
                <p className="text-xs text-slate-400">Vista previa del CV</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres crear un nuevo CV? Se perderá la información actual.')) {
                  resetCV()
                  window.location.href = '/'
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-600/20 transition-all text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Nuevo CV
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all text-sm"
            >
              <Download className="h-4 w-4" />
              Descargar PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <CVPreview
          cvData={cvData}
          isComplete={true}
          initialTemplate={template as any}
        />
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-xs text-slate-600">
          CV Generator AI • Powered by IA
        </p>
      </div>
    </main>
  )
}

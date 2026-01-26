'use client'

import { CVChat } from '@/components/cv-chat'
import { useCVContext } from '@/contexts/CVContext'
import { Sparkles } from 'lucide-react'

export default function Home() {
  const { cvData, setCvData, isComplete, setIsComplete, resetCV } = useCVContext()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
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
              <p className="text-sm text-slate-400">Crea tu curriculum en minutos</p>
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

      {/* Main content - Chat que ocupa todo el espacio con padding-top para el header fijo */}
      <div className="flex-1 flex flex-col pt-[100px]">
        <CVChat
          cvData={cvData}
          onCvDataChange={setCvData}
          isComplete={isComplete}
          onCompleteChange={setIsComplete}
        />
      </div>

      {/* Footer */}
      <div className="py-6 text-center bg-slate-950/95">
        <p className="text-sm text-slate-500">
          CV Generator AI • Powered by IA
        </p>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { CVChat, type CVData } from '@/components/cv-chat'
import { Sparkles } from 'lucide-react'

export default function GeneratorPage() {
  const [cvData, setCvData] = useState<CVData>({
    nombre: '',
    perfil: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    contacto: '',
  })
  const [isComplete, setIsComplete] = useState(false)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Fixed */}
      <header className="flex-none border-b border-slate-800/50 backdrop-blur-md bg-slate-900/95">
        <div className="max-w-5xl mx-auto py-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                CV Generator <span className="text-purple-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400">Crea tu currículum en minutos</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all text-sm shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="h-4 w-4" />
            Nuevo CV
          </button>
        </div>
      </header>

      {/* Main content - scrollable */}
      <main className="flex-1 overflow-y-auto">
        <CVChat 
          cvData={cvData}
          onCvDataChange={setCvData}
          isComplete={isComplete}
          onCompleteChange={setIsComplete}
        />
      </main>
    </div>
  )
}

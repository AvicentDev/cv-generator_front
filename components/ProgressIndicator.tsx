'use client'

import { Check } from 'lucide-react'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
}

export function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  const defaultLabels = ['Nombre', 'Perfil', 'Experiencia', 'Educación', 'Habilidades']
  const labels = stepLabels || defaultLabels

  return (
    <div className="mb-8">
      {/* Texto de progreso */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300">
            Paso {currentStep} de {totalSteps}
          </span>
          {currentStep <= totalSteps && (
            <span className="text-xs text-slate-500">
              {labels[currentStep - 1]}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500">
          {Math.round(progress)}% completado
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="relative h-2 bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      {/* Indicadores de pasos */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isPending = stepNumber > currentStep

          return (
            <div
              key={stepNumber}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-900/50'
                    : isCurrent
                    ? 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-900/50 ring-4 ring-violet-500/30 scale-110'
                    : 'bg-slate-800/60 text-slate-500 border border-slate-700/50'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-300 ${
                  isCompleted || isCurrent
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {labels[index]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

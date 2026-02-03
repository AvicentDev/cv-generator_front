'use client'

import { Sparkles } from 'lucide-react'

interface QuickReplyButtonsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  disabled?: boolean
}

export function QuickReplyButtons({ suggestions, onSelect, disabled }: QuickReplyButtonsProps) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-3 h-3 text-violet-400" />
        <span className="text-xs text-slate-400 font-medium">Sugerencias rápidas:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="group relative px-4 py-2 bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 hover:border-violet-500/50 rounded-xl text-sm text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/40 disabled:hover:border-slate-700/50"
            style={{
              animation: `suggest-in 0.3s ease-out ${index * 0.1}s both`
            }}
          >
            <span className="relative z-10">{suggestion}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-purple-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
        ))}
      </div>
    </div>
  )
}

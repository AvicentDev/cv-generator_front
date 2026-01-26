'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export interface CVData {
  nombre: string
  titulo?: string
  email?: string
  telefono?: string
  ubicacion?: string
  perfil: string
  experiencia: string
  educacion: string
  habilidades: string
  contacto?: string
  principios?: string
  [key: string]: any
}

const questions = [
  '¡Hola! 👋 Soy tu asistente para crear tu CV. Vamos a empezar, ¿Cuál es tu nombre completo?',
  'Perfecto. Ahora cuéntame, ¿cuál es tu perfil profesional? (Ej: Desarrollador web con 5 años de experiencia...)',
  'Excelente. ¿Podrías describir tu experiencia laboral más relevante?',
  '¿Cuál es tu formación académica?',
  '¿Qué habilidades técnicas y blandas tienes?',
  '¿Cuál es tu información de contacto (email, teléfono)?',
]

const fields: (keyof CVData)[] = ['nombre', 'perfil', 'experiencia', 'educacion', 'habilidades', 'contacto']

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

interface CVChatProps {
  cvData: CVData
  onCvDataChange: (data: CVData) => void
  isComplete: boolean
  onCompleteChange: (complete: boolean) => void
}

export function CVChat({ cvData, onCvDataChange, isComplete, onCompleteChange }: CVChatProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: questions[0],
    },
  ])
  const [input, setInput] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isProcessing])

  // Focus en input
  useEffect(() => {
    inputRef.current?.focus()
  }, [messages])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isComplete || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    const updatedCvData = { ...cvData }
    updatedCvData[fields[currentStep]] = input
    onCvDataChange(updatedCvData)

    setIsProcessing(true)
    setInput('')

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: questions[currentStep + 1],
        }
        setMessages((prev) => [...prev, assistantMessage])
        setCurrentStep((prev) => prev + 1)
        setIsProcessing(false)
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '¡Perfecto! 🎉 Toda la información está completa. Ahora vamos a elegir el diseño para tu CV...',
        }
        setMessages((prev) => [...prev, assistantMessage])
        onCompleteChange(true)
        setIsProcessing(false)
        
        setTimeout(() => {
          router.push('/templates')
        }, 2000)
      }
    }, 600)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] px-6 max-w-4xl mx-auto w-full pt-8">
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-5">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                message.role === 'assistant'
                  ? 'bg-gradient-to-br from-violet-600 to-purple-600 shadow-violet-900/50'
                  : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-indigo-900/50'
              }`}
            >
              {message.role === 'assistant' ? (
                <Sparkles className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[75%] backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl ${
                message.role === 'assistant'
                  ? 'bg-slate-800/60 border border-slate-700/50 rounded-tl-md'
                  : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        
        {/* Indicador de escritura */}
        {isProcessing && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-900/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl rounded-tl-md px-5 py-3 shadow-xl">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl mb-6">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isComplete ? 'CV completado - Reinicia para crear otro' : 'Escribe tu respuesta...'}
            disabled={isProcessing || isComplete}
            className="flex-1 px-4 py-3.5 bg-transparent outline-none text-slate-100 placeholder:text-slate-500 disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isProcessing || isComplete}
            className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-violet-900/50 disabled:shadow-none"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

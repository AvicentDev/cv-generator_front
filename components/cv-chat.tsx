'use client'

import { sendAnswer, startConversation } from '@/lib/api/cv-api'
import { AlertCircle, Send, Sparkles, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { ProgressIndicator } from './ProgressIndicator'
import { QuickReplyButtons } from './QuickReplyButtons'

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

const STEP_LABELS = ['Nombre', 'Perfil', 'Experiencia', 'Educación', 'Habilidades']
const TOTAL_STEPS = 5

export function CVChat({ cvData: _cvData, onCvDataChange, isComplete, onCompleteChange }: CVChatProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentStepKey, setCurrentStepKey] = useState('name')
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Iniciar conversación al montar el componente
  useEffect(() => {
    const initConversation = async () => {
      try {
        setIsInitializing(true)
        const response = await startConversation()

        setConversationId(response.conversation_id)
        setMessages([{
          id: '1',
          role: 'assistant',
          content: response.message,
        }])
        setCurrentStepKey(response.step || 'name')
        setError(null)
      } catch (err) {
        console.error('Error al iniciar conversación:', err)
        setError('No se pudo conectar con el servidor. Por favor, verifica que el backend esté ejecutándose.')
      } finally {
        setIsInitializing(false)
      }
    }

    initConversation()
  }, [])

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isProcessing])

  // Focus en input
  useEffect(() => {
    if (!isProcessing && !isInitializing) {
      inputRef.current?.focus()
    }
  }, [messages, isProcessing, isInitializing])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleQuickReply = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isComplete || isProcessing || !conversationId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)
    setInput('')
    setError(null)

    try {
      const response = await sendAnswer(conversationId, input)

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Actualizar paso actual
      if (!response.finished) {
        setCurrentStep(response.step_number || currentStep + 1)
        setCurrentStepKey(response.step || currentStepKey)
        setCurrentSuggestions(response.suggestions || [])
      }

      // Si la conversación ha terminado
      if (response.finished && response.cv) {
        // Actualizar los datos del CV con la respuesta del backend
        onCvDataChange({
          nombre: response.cv.nombre || '',
          titulo: response.cv.titulo || '',
          perfil: response.cv.perfil || '',
          experiencia: response.cv.experiencia || '',
          educacion: response.cv.educacion || '',
          habilidades: response.cv.habilidades || '',
        })

        onCompleteChange(true)

        // Redirigir a la selección de templates
        setTimeout(() => {
          router.push('/templates')
        }, 2000)
      }
    } catch (err) {
      console.error('Error al enviar respuesta:', err)
      setError('Error al procesar tu respuesta. Por favor, intenta de nuevo.')
      setIsProcessing(false)
    } finally {
      if (!error) {
        setIsProcessing(false)
      }
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] px-6 max-w-4xl mx-auto w-full pt-8">
      {/* Indicador de progreso */}
      {!isInitializing && !isComplete && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          stepLabels={STEP_LABELS}
        />
      )}

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-5">
        {/* Mensaje de carga inicial */}
        {isInitializing && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="ml-2">Conectando con el asistente...</span>
            </div>
          </div>
        )}

        {/* Error de conexión */}
        {error && !isInitializing && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400 text-sm font-medium">Error</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Mensajes de la conversación */}
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
              <p className={`text-[15px] leading-relaxed whitespace-pre-wrap ${
                message.role === 'assistant' ? 'text-slate-100' : 'text-white'
              }`}>
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {/* Indicador de escritura */}
        {isProcessing && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br from-violet-600 to-purple-600 shadow-violet-900/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl bg-slate-800/60 border border-slate-700/50 rounded-tl-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Botones de sugerencias */}
      {!isComplete && !isProcessing && !isInitializing && currentSuggestions.length > 0 && (
        <QuickReplyButtons
          suggestions={currentSuggestions}
          onSelect={handleQuickReply}
          disabled={isProcessing || isComplete}
        />
      )}

      {/* Input de mensaje */}
      <div className="pt-4 pb-6">
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isComplete || isProcessing || isInitializing || !!error}
            placeholder={
              isInitializing
                ? "Conectando..."
                : error
                ? "Error de conexión"
                : isComplete
                ? "Conversación completada"
                : "Escribe de forma natural, como hablarías normalmente..."
            }
            className="w-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-6 py-4 pr-14 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || isComplete || isProcessing || isInitializing || !!error}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-violet-900/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  )
}

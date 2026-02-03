'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

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

interface CVContextType {
  cvData: CVData
  setCvData: (data: CVData) => void
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
  resetCV: () => void
}

const CVContext = createContext<CVContextType | undefined>(undefined)

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCvData] = useState<CVData>({
    nombre: '',
    titulo: '',
    email: '',
    telefono: '',
    ubicacion: '',
    perfil: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    contacto: '',
    principios: '',
  })
  const [isComplete, setIsComplete] = useState(false)

  const resetCV = () => {
    setCvData({
      nombre: '',
      titulo: '',
      email: '',
      telefono: '',
      ubicacion: '',
      perfil: '',
      experiencia: '',
      educacion: '',
      habilidades: '',
      contacto: '',
      principios: '',
    })
    setIsComplete(false)
    localStorage.removeItem('cvData')
    localStorage.removeItem('cvComplete')
  }

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('cvData')
    const savedComplete = localStorage.getItem('cvComplete')

    // Si el CV está completo, limpiamos todo para empezar de nuevo
    if (savedComplete && JSON.parse(savedComplete) === true) {
      localStorage.removeItem('cvData')
      localStorage.removeItem('cvComplete')
      // No cargamos nada, dejamos el estado inicial limpio
    } else if (savedData) {
      // Solo cargamos datos si el CV no está completo
      setCvData(JSON.parse(savedData))
    }
  }, [])

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData))
  }, [cvData])

  useEffect(() => {
    localStorage.setItem('cvComplete', JSON.stringify(isComplete))
  }, [isComplete])

  return (
    <CVContext.Provider value={{ cvData, setCvData, isComplete, setIsComplete, resetCV }}>
      {children}
    </CVContext.Provider>
  )
}

export function useCVContext() {
  const context = useContext(CVContext)
  if (context === undefined) {
    throw new Error('useCVContext must be used within a CVProvider')
  }
  return context
}

'use client'

import { CVPreview } from '@/components/cv-preview'
import { useCVContext } from '@/contexts/CVContext'
import { ArrowLeft, Download, Sparkles } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function PreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const template = searchParams.get('template') || 'classic'
  const { cvData, resetCV } = useCVContext()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Importar dinámicamente las librerías
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      // Buscar el elemento del CV directamente (sin márgenes del contenedor padre)
      const cvElement = document.getElementById('cv-template-root') as HTMLElement

      if (!cvElement) {
        alert('No se pudo encontrar el CV para descargar')
        return
      }

      // Capturar el CV como imagen con alta calidad
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Mayor calidad
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      // Crear PDF en formato A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
      })

      // Dimensiones de la página A4 en píxeles
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Dimensiones del canvas
      const imgWidth = canvas.width
      const imgHeight = canvas.height

      // Calcular el ratio para ajustar el ancho al A4 (sin márgenes)
      const widthRatio = pageWidth / imgWidth
      const scaledWidth = pageWidth
      const scaledHeight = imgHeight * widthRatio

      // Convertir canvas a imagen
      const imgData = canvas.toDataURL('image/png', 1.0)

      // Tolerancia de 5px para evitar crear páginas adicionales por diferencias mínimas
      const tolerance = 5

      // Si el contenido cabe en una página (con tolerancia)
      if (scaledHeight <= pageHeight + tolerance) {
        // Si es ligeramente más grande, ajustar para que quepa exactamente
        const finalHeight = Math.min(scaledHeight, pageHeight)
        const finalWidth = scaledWidth * (finalHeight / scaledHeight)
        pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight, undefined, 'FAST')
      } else {
        // Si necesita múltiples páginas
        let yPosition = 0
        let remainingHeight = scaledHeight

        while (remainingHeight > tolerance) {
          // Agregar la imagen en la posición actual
          pdf.addImage(imgData, 'PNG', 0, -yPosition, scaledWidth, scaledHeight, undefined, 'FAST')

          remainingHeight -= pageHeight
          yPosition += pageHeight

          // Si aún queda contenido significativo, agregar nueva página
          if (remainingHeight > tolerance) {
            pdf.addPage()
          }
        }
      }

      // Descargar el PDF
      const fileName = `CV_${cvData.nombre || 'Documento'}.pdf`.replace(/\s+/g, '_')
      pdf.save(fileName)
    } catch (error) {
      console.error('Error al generar PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor, intenta de nuevo.')
    } finally {
      setIsDownloading(false)
    }
  }

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
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              {isDownloading ? 'Generando PDF...' : 'Descargar PDF'}
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

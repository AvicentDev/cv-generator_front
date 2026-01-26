import type { Metadata } from 'next'
import './globals.css'
import { CVProvider } from '@/contexts/CVContext'

export const metadata: Metadata = {
  title: 'CV Generator AI',
  description: 'Genera tu CV profesional con inteligencia artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
        <CVProvider>
          {children}
        </CVProvider>
      </body>
    </html>
  )
}

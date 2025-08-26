'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

type ColorScheme = 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink'

interface ColorContextType {
  color: ColorScheme
  setColor: (color: ColorScheme) => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<ColorScheme>('blue')
  const { theme, setTheme } = useTheme()

  // Sauvegarder la couleur dans localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem('color-scheme') as ColorScheme
    if (savedColor) {
      setColor(savedColor)
    }
  }, [])

  // Appliquer les couleurs aux variables CSS
  useEffect(() => {
    const root = document.documentElement

    // Définir les couleurs pour chaque thème
    const colorMap = {
      red: {
        '--primary': '#ef4444',
        '--primary-foreground': '#ffffff',
        '--accent': '#fecaca',
        '--accent-foreground': '#991b1b',
      },
      blue: {
        '--primary': '#3b82f6',
        '--primary-foreground': '#ffffff',
        '--accent': '#dbeafe',
        '--accent-foreground': '#1e40af',
      },
      green: {
        '--primary': '#10b981',
        '--primary-foreground': '#ffffff',
        '--accent': '#d1fae5',
        '--accent-foreground': '#065f46',
      },
      purple: {
        '--primary': '#8b5cf6',
        '--primary-foreground': '#ffffff',
        '--accent': '#e9d5ff',
        '--accent-foreground': '#581c87',
      },
      orange: {
        '--primary': '#f97316',
        '--primary-foreground': '#ffffff',
        '--accent': '#fed7aa',
        '--accent-foreground': '#9a3412',
      },
      pink: {
        '--primary': '#ec4899',
        '--primary-foreground': '#ffffff',
        '--accent': '#fce7f3',
        '--accent-foreground': '#9d174d',
      },
    }

    // Appliquer les couleurs sélectionnées
    const selectedColors = colorMap[color]
    Object.entries(selectedColors).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }, [color])

  const handleColorChange = (newColor: ColorScheme) => {
    setColor(newColor)
    localStorage.setItem('color-scheme', newColor)
  }

  return (
    <ColorContext.Provider value={{ color, setColor: handleColorChange }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider')
  }
  return context
}
